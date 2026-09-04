---
title: "AI CLI 工具社区动态日报"
published: 2026-09-04
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-04

> 生成时间: 2026-09-04 02:08 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告
**报告日期：2026-09-04**

---

## 1. 生态全景

2026年9月的 AI CLI 工具生态已进入**多极化成熟期**：头部三强（Claude Code、OpenAI Codex、Gemini CLI）形成稳定的迭代节奏，垂直工具（OpenCode、Hermes、DeepSeek Reasonix）通过差异化能力切入细分场景，而 DeepSeek Harness 等新兴项目仍处于早期验证阶段。**可观测性、安全边界、多 Agent 编排、Windows 平台兼容性**成为本周期社区反馈的四大共性痛点。GPT-6-Astra、Gemini 3.8 Flash 等新模型的快速接入反映出**模型-工具协同发布**已成为主流节奏，0.x 与 2.x 版本号混杂显示生态尚未形成统一的成熟度标准。

---

## 2. 各工具活跃度对比

| 工具 | Issues 数（24h） | PR 数（24h） | Release（24h） | 社区信号 |
|------|------------------|--------------|----------------|----------|
| **Claude Code** | 10+（Top 10 列出） | 5 | **v2.1.260** | Windows 痛点爆发，Function Hooks 提案热议 |
| **OpenAI Codex** | 10（Top 10 列出） | 10 | **0.153.1 / 0.153.2 / 0.154.0-α.1~.3** | 0.154 高频迭代，GPT-6-Astra 多线落地 |
| **Gemini CLI** | 10（Top 10 列出） | 10 | **v0.60.0-nightly.20260904** | P1 安全/稳定性集中修复 |
| **DeepSeek Reasonix** | 10（Top 10 列出） | 30+（精选 10） | **v2.12.0** | 缓存命中率跃升，PR 活跃度极高 |
| **OpenCode** | 10（Top 10 列出） | 10 | 无 | 2.0 体验收敛期 |
| **DeepSeek Harness** | 0（无新增） | 0（无新增） | **v0.1.2-rc.1** | 静默期 |
| **Hermes** | **11** | **50** | 无 | PR 活跃度全场最高，重构 + 安全修复双线并进 |

**观察**：Hermes 以 50 条 PR 居首，DeepSeek Reasonix 以 30+ 条 PR 紧随其后，反映两者处于**快速迭代期**；Claude Code、OpenAI Codex、Gemini CLI 三强在 Issues 数上接近（均 10 条左右），但**PR 节奏**差异明显——Gemini CLI 与 Codex 的 PR 推进更密集。

---

## 3. 共同关注的功能方向

### 3.1 可观测性增强（4/7 工具）
- **Claude Code**：`/cost` 暴露 prompt-cache 未命中原因
- **OpenAI Codex**：附件存储解耦（#42634）、TUI markup 解析强化
- **DeepSeek Harness**：Token 用量 + 耗时可视化
- **DeepSeek Reasonix**：出站请求添加 User-Agent（#9690）

**共性诉求**：Token 成本透明化、请求链路可追踪、错误原因可诊断。

### 3.2 Windows 平台兼容性（5/7 工具）
- **Claude Code**：窗口置顶、安装失败、升级循环、Bash 工具 POSIX 破坏
- **OpenAI Codex**：5.6 模型握手失败、WSL 路径解析、8 分钟首启
- **Gemini CLI**：NTFS 8.3 短名、长路径、ACL 校验（形成体系化修复）
- **DeepSeek Reasonix**：滚动条乱跑、中文编码 TUI 框选乱码
- **Hermes**：ACP 终端 hang

**共性诉求**：Windows 已成为**系统性短板**，Gemini CLI 的体系化安全加固是当前最佳实践。

### 3.3 存储治理与持久化（4/7 工具）
- **OpenAI Codex**：会话日志膨胀至 100+ GiB（#34268、#24948）
- **Claude Code**：跨会话持久化内存（#91913）
- **DeepSeek Reasonix**：Agent 跨 Turn 持久化 PTY（#9755）
- **Hermes**：cron/kanban 持久化

**共性诉求**：长会话、多会话、跨重启的**状态保留**与**存储放大抑制**。

### 3.4 安全边界与权限模型（5/7 工具）
- **Claude Code**：安全过滤器误报 session-halted（#79065 系列）
- **Gemini CLI**：路径遍历、硬编码 API key、ACL 校验
- **Hermes**：`hermes serve` hooks 黑洞（P1，#102504）
- **OpenCode**：2.0 Code Mode 权限绕过（#47177）
- **OpenAI Codex**：OAuth token exchange 失败

**共性诉求**：扩展系统的**信任边界**、插件权限的**确定性执行**。

### 3.5 子 Agent / 多 Agent 编排（5/7 工具）
- **Claude Code**：Per-agent 模型路由（#38698）
- **Gemini CLI**：子代理状态报告失真、不会主动调用 subagent
- **DeepSeek Reasonix**：Agent turn 截断（21–30 轮高频）
- **OpenAI Codex**：Multi-agent V2 存储放大
- **Hermes**：MoA 多模型仲裁

**共性诉求**：子 agent 的**状态语义一致性**、**模型混合路由**、**可靠性保障**。

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线特征 |
|------|----------|----------|--------------|
| **Claude Code** | IDE-like 体验 + 插件生态 | 追求深度定制的中高级开发者 | 全屏 Diff、prompt-cache、Function Hooks 提案 |
| **OpenAI Codex** | 模型先行 + 多云目录 | 早期采用者、企业多云用户 | GPT-6-Astra 快速接入、embeddable 架构 |
| **Gemini CLI** | 安全优先 + 多模态探索 | 企业用户、安全敏感场景 | RFC 9207 合规、NTFS 加固、Flash 系列默认化 |
| **DeepSeek Reasonix** | 高缓存命中 + 远程工作区 | 成本敏感型开发者、跨设备用户 | 缓存前缀优化、持久化 PTY、YOLO 模式 |
| **OpenCode** | 2.0 浏览器/插件平台 | 插件开发者、Web 用户 | Code Mode 权限模型、桌面/Web 一致性 |
| **DeepSeek Harness** | 会话流可读性 | 早期尝鲜者 | 折叠/自适应宽度/Token 可视化 |
| **Hermes** | Hooks/Plugins 安全边界 | 企业/多 Profile 重度用户 | `_prepare_agent_startup` 统一钩子、MoA 仲裁 |

**关键差异**：
- **Claude Code** vs **OpenAI Codex**：前者侧重 IDE 体验演进，后者侧重模型/云生态扩张。
- **Gemini CLI** vs **Hermes**：两者都将**安全**作为核心卖点，但 Gemini 聚焦平台层（NTFS、ACL），Hermes 聚焦应用层（hooks、plugins）。
- **OpenCode** 与 **DeepSeek Reasonix**：均在追赶 2.0 / 2.x 主线，前者押注浏览器/插件，后者押注缓存与远程。

---

## 5. 社区热度与成熟度

### 高活跃度（PR/Issue 密集）
- **Hermes**：50 PR + 11 Issue，**全场最高**，且包含 −35.6% LOC 大型重构（#102117），处于**产品级成熟冲刺期**。
- **DeepSeek Reasonix**：30+ PR + 10 Issue，缓存优化与前端稳定性双线推进，**快速迭代期**。

### 中等活跃度（稳定迭代）
- **Claude Code**：v2.1.260 发布，Top 10 Issues 涉及多平台，**成熟稳定但 Windows 拖后腿**。
- **OpenAI Codex**：0.153.x 维护 + 0.154.0-α 收尾，**版本节奏健康**。
- **Gemini CLI**：nightly 版本 + 10 PR 密集修复，**安全加固成体系**。

### 低活跃度（早期/静默期）
- **OpenCode**：无 Release，PR 集中在 2.0 体验打磨，**收敛阶段**。
- **DeepSeek Harness**：v0.1.2-rc.1，Issues/PR 静默，**早期验证期**。

**成熟度信号**：版本号 > 2.0 的工具（Claude Code、DeepSeek Reasonix）已进入**功能深度优化**阶段；版本号在 0.1x–0.6x 的工具（Gemini CLI、DeepSeek Harness、OpenAI Codex）仍处于**快速演进**阶段；Hermes 与 OpenCode 介于两者之间。

---

## 6. 值得关注的趋势信号

### 6.1 **"模型-工具协同发布"成为标准节奏**
GPT-6-Astra 通过 Codex 4 条 PR（#42607、#42605、#42619、#42638）同步落地，Gemini 3.8 Flash 通过 #29172 直接默认化。这对开发者意味着：**模型升级将带动 CLI 工具的快速版本更新**，需要关注版本兼容性矩阵。

### 6.2 **存储治理成为长会话工具的系统性挑战**
OpenAI Codex 出现 100+ GiB 级别的存储放大（#34268），根因指向 compaction 写放大与 multi-agent fork。这预示着**存储架构（DAG、增量、归档）将成为下一代 CLI 的核心竞争力**，而非简单的功能叠加。

### 6.3 **Windows 平台从"加分项"变为"决胜项"**
5/7 工具在 Windows 上有显著痛点，Gemini CLI 的体系化修复（NTFS 8.3、ACL、长路径）是当前最佳实践。**对工具选型者**：Windows 体验应纳入评估权重；对工具开发者：**NTFS 路径处理与权限校验是必修课**。

### 6.4 **Hooks/Plugins 安全边界成为差异化卖点**
Hermes 的 #102504（P1）、OpenCode 的 #47177、Claude Code 的 Function Hooks 提案共同指向一个事实：**扩展系统的安全语义是工具能否进入企业市场的关键门槛**。"统一钩子注册 + 权限断言 + 副作用追踪"是正在形成的事实标准。

### 6.5 **多 Agent 编排进入"可靠性瓶颈期"**
从 Gemini CLI 的子代理状态失真（#22323）到 DeepSeek Reasonix 的 turn 截断（#9766），再到 Claude Code 的 Per-agent 路由（#38698），社区已从"能不能做多 agent"转向"多 agent 怎么稳定"。**Per-agent 模型路由 + 子 agent 状态语义统一**是下一个突破点。

### 6.6 **可观测性从"可选"变为"标配"**
`/cost` 诊断（Claude Code）、Token 展示（DeepSeek Harness）、User-Agent 注入（DeepSeek Reasonix #9690）、LLM 消息日志器（OpenCode #43165）共同表明：**开发者不再接受黑盒推理**，成本、延迟、缓存命中率、请求链路必须可观测。

### 对开发者的参考价值

1. **选型维度**：除功能对比外，应将 **Windows 体验、存储治理、可观测性、安全边界** 纳入评估清单。
2. **贡献机会**：Hermes、DeepSeek Reasonix 的 PR 活跃度高，是参与开源的良好切入点；Gemini CLI 的安全加固方向有持续贡献空间。
3. **架构启示**：若自研 AI CLI，**钩子注册统一化、附件存储解耦、缓存前缀设计、NTFS 路径加固**是已被验证的关键决策。
4. **风险预警**：长会话存储放大、Windows 升级路径断裂、子 agent 状态失真是**当前生态的系统性风险**，使用时应建立监控与降级方案。

---

*报告基于 2026-09-04 各工具 GitHub 公开数据整理，覆盖 7 个项目、约 60 条 Issues、100+ 条 PR。*

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
*数据截止：2026-09-04*

---

## 1. 热门 Skills 排行（按 Issues 评论热度）

| 排名 | Skill / 主题 | 类型 | 状态 | 关注度 | 核心看点 |
|---|---|---|---|---|---|
| 1 | **trust boundary / 命名空间滥用** | 安全 | Issue #492 OPEN | 43 评论 / 2 👍 | 社区技能冒用 `anthropic/` 官方命名空间，存在信任边界滥用风险 |
| 2 | **org-wide 技能共享** | 平台功能 | Issue #228 OPEN | 16 评论 / 8 👍 | 企业内一键共享技能，免去手动下载/上传流程 |
| 3 | **skill-creator 评测失效 (0% recall)** | 工具链 | Issue #556 + PR #1298 | 12 评论 / 7 👍 | `run_eval.py` 全面失效，描述优化循环跑在噪声上 |
| 4 | **Skill 莫名消失** | 稳定性 | Issue #62 OPEN | 10 评论 / 2 👍 | 用户上传的 12 个自定义技能凭空消失，疑似路径/索引问题 |
| 5 | **compact-memory（符号化代理状态）** | 新能力 | Issue #1329 OPEN | 9 评论 / 0 👍 | 用符号记法压缩长会话的 agent 笔记，节省上下文 |
| 6 | **skill-creator 最佳实践重构** | 元能力 | Issue #202 CLOSED | 8 评论 / 1 👍 | 把"开发者文档"重写为"操作指令"，提升 token 效率 |
| 7 | **document-skills 与 example-skills 重复** | 打包 | Issue #189 OPEN | 6 评论 / 9 👍 | 两个插件装出同一份 skill，污染上下文窗口 |
| 8 | **agent-governance（AI 代理安全治理）** | 合规 | Issue #412 CLOSED | 6 评论 / 0 👍 | 策略执行、威胁检测、信任评分、审计日志 |

**配套 PR 焦点（按讨论密度）：**
- PR #1298：彻底修 `run_eval.py` 0% recall（Windows 流读取、并行 worker、eval artifact 真正安装为 skill）
- PR #514：document-typography —— 治理 AI 生成文档的"孤儿词/寡妇段/编号错位"
- PR #486：odt —— OpenDocument 读写与模板填充，填补 LibreOffice 链路空白
- PR #1628：Hivemind —— 把机械任务委派给免费 headless worker，Claude Code 只做规划/审阅/合并
- PR #1367：self-audit —— 先做机械文件核验，再做四维推理质量门禁
- PR #568：servicenow —— 覆盖 ITSM/ITOM/SecOps/FSM/SPM/CSDM 的全平台助手

---

## 2. 社区需求趋势

按 Issues 议题聚类，社区最强烈的诉求集中在五条主线：

**① 安全与信任（最高优先级）**
- 命名空间防冒用（#492，43 评论，Top 1）
- 治理与审计模式（#412 agent-governance，6 评论）

**② 平台/分发能力（企业级刚需）**
- 组织内技能共享 #228
- 技能作为 MCP 暴露 #16
- 与 AWS Bedrock 等平台的兼容 #29

**③ 工具链可靠性（影响所有作者）**
- skill-creator 评测管线全面失效 #556 / #1298 / #1099 / #1050
- mcp-builder 评估器 0/N 静默失败 #1390
- claude-api 技能贪婪注入 ~156k token #1487
- web-artifacts-builder 与 pnpm ≥10.1 不兼容 #1362

**④ 上下文与状态管理**
- compact-memory 符号化压缩 #1329
- self-audit / Reasoning Quality Gate 流水线 #1385 / PR #1367
- 插件重复安装 #189

**⑤ 新场景技能**
- 文档工程：typography (#514)、ODT (#486)、DOCX 修订冲突 (#541)
- 垂直平台：ServiceNow (#568)、SCNet HPC (#1615)
- 多代理编排：Hivemind (#1628)
- 创意工具：pyxel 复古游戏 (#525)、testing-patterns (#723)
- 元能力：skill-quality-analyzer / skill-security-analyzer (#83)

---

## 3. 高潜力待合并 PR

以下 PR 暂未合并，但议题热度高、修复痛点明确，是近期最可能落地的候选：

| PR | 主题 | 预计影响 | 关键链接 |
|---|---|---|---|
| #1298 | 修 `run_eval.py` 0% recall（含 Windows 并行） | 解锁整个 description 优化闭环 | [link](https://github.com/anthropics/skills/pull/1298) |
| #514 | document-typography 排版质量门 | 所有生成文档即刻受益 | [link](https://github.com/anthropics/skills/pull/514) |
| #1615 | scnet-hpc 高性能集群作业流 | 填补 HPC 垂直空白 | [link](https://github.com/anthropics/skills/pull/1615) |
| #486 | ODT 读写与模板填充 | 补齐开源文档链路 | [link](https://github.com/anthropics/skills/pull/486) |
| #538 | pdf SKILL.md 大小写引用错误 | 8 处小修，立竿见影 | [link](https://github.com/anthropics/skills/pull/538) |
| #541 | docx tracked-change 与 bookmark id 冲突 | 修复文档损坏 | [link](https://github.com/anthropics/skills/pull/541) |
| #539 | skill-creator YAML 特殊字符预检 | 防 silent parse 失败 | [link](https://github.com/anthropics/skills/pull/539) |
| #1628 | Hivemind 多代理编排（免费模型执行） | 大幅降低 token 成本 | [link](https://github.com/anthropics/skills/pull/1628) |
| #1367 | self-audit 四维质量门禁 | 输出可靠性提升 | [link](https://github.com/anthropics/skills/pull/1367) |
| #1099 / #1050 | skill-creator Windows 兼容 | 解锁 Windows 创作者 | [#1099](https://github.com/anthropics/skills/pull/1099) / [#1050](https://github.com/anthropics/skills/pull/1050) |
| #83 | skill-quality/security-analyzer 上架 marketplace | 元能力可用化 | [link](https://github.com/anthropics/skills/pull/83) |
| #210 | frontend-design 清晰度与可执行性 | 老牌技能焕新 | [link](https://github.com/anthropics/skills/pull/210) |

---

## 4. Skills 生态洞察（一句话）

> **社区最集中的诉求是"让 Skills 既可信又可量化"—— 一手抓命名空间治理与权限边界，一手把 skill-creator / 评估器 / 质量门禁这条工具链从"跑在噪声上"修成"真能优化"。** 围绕这条主线，文档工程、垂直平台（ServiceNow / HPC）、多代理编排（Hivemind）和上下文压缩（compact-memory）构成了下一波落地的四个明确方向。

---

# Claude Code 社区动态日报

**📅 2026-09-04**

---

## 🔥 今日速览

今日 v2.1.260 发布带来**全屏 Diff 面板**与 **prompt-cache 命中诊断**两项重磅改进，显著提升开发体验。社区焦点仍集中在 Windows 平台的长期遗留 bug（窗口置顶、安装器失败），同时**插件 Function Hooks**提案成为最受瞩目的扩展性方向。

---

## 📦 版本发布

### v2.1.260（今日发布）

| 类别 | 更新内容 |
|------|---------|
| **新功能** | 全屏模式下新增 Diff 面板，在对话旁实时展示 Claude 编辑产生的未提交变更，可通过 `/diff` 切换 |
| **可观测性** | `/cost` 命令新增 prompt-cache 未命中的可能原因（如工具定义/系统提示变更、超过 TTL 空闲等） |

**开发者点评**：Diff 面板解决了"看不到模型改了哪些代码"的核心痛点，是向 IDE-like 体验演进的重要一步；`/cost` 的诊断信息则让 token 成本优化从黑盒走向透明。

🔗 https://github.com/anthropics/claude-code/releases/tag/v2.1.260

---

## 🌟 社区热点 Issues（Top 10）

### 1. [#85891](https://github.com/anthropics/claude-code/issues/85891) — Windows 11 窗口强制置顶（167 👍 / 75 评论）
**类型**：BUG `[invalid]` | 平台：Windows
Claude Desktop 在 Win11 上始终置顶且无关闭选项，是 macOS [#66516](https://github.com/anthropics/claude-code/issues/66516) 的对应版本。**热度断层第一**，反映 Windows 桌面端体验打磨的紧迫性。
> ⚠️ 标记为 `[invalid]`，但社区反响说明官方处理方式值得商榷。

### 2. [#91870](https://github.com/anthropics/claude-code/issues/91870) — Function Hooks：让插件强大 10 倍（31 👍 / 56 评论）
**类型**：Enhancement / area:hooks, plugins
**今日最热门提案**。通过参数化 `$` 对象 + 副作用追踪 + Express/Koa 风格的 `next` 续传模型，在保证安全的前提下实现深度扩展。**评论密度最高**，是插件生态进化的关键提案。

### 3. [#12346](https://github.com/anthropics/claude-code/issues/12346) — 添加 GitLab 集成（131 👍 / 51 评论）
**类型**：Feature Request
呼声最高的集成需求之一，涵盖 MR、移动端访问。**长期未解决**（2025-11 提出），对比 GitHub 集成的成熟度，社区期待值持续累积。

### 4. [#49917](https://github.com/anthropics/claude-code/issues/49917) — Windows 安装器 AddPackage 0x80073CF6 失败（8 👍 / 37 评论）
**类型**：BUG | 平台：Windows
旧版"成功"安装后包状态不一致导致新安装失败，无干净修复路径。**Windows 桌面端第二大痛点**。

### 5. [#38698](https://github.com/anthropics/claude-code/issues/38698) — Per-agent 模型路由（43 👍 / 12 评论）
**类型**：Feature / area:agents, providers
允许 orchestrator 用 Opus、子 agent 用本地 Ollama 等，**降低大项目成本的关键能力**，是 hybrid agent 架构的基础设施。

### 6. [#71603](https://github.com/anthropics/claude-code/issues/71603) — Pixel 8 Pro 输入草稿被静默丢弃
**类型**：BUG | 平台：Android
Agent 运行时用户输入的内容切后台后消失，**移动端数据丢失问题**。

### 7. [#91251](https://github.com/anthropics/claude-code/issues/91251) — Sticky prompt header 在 fullscreen 渲染下不显示
**类型**：BUG `[regression]` | 平台：macOS
2.1.252 起回归，iTerm2 + 无 tmux 环境下无法滚动定位 prompt。**TUI 体验细节**但影响日常工作流。

### 8. [#88561](https://github.com/anthropics/claude-code/issues/88561) — Bash 工具静默吞掉 `\\`
**类型**：BUG `[has repro]` | 平台：Windows
单/双引号、heredoc 内的 `\\` 均被折叠为 `\\`，**破坏 POSIX 语义**，对正则和路径处理是严重隐患。

### 9. [#81961](https://github.com/anthropics/claude-code/issues/81961) — Windows 升级后陷入"有新版本"循环
**类型**：BUG `[has repro]` | 平台：Windows
错误码 1XAF0WC，更新后无法启动 Desktop。**升级路径断裂**类问题对生产环境影响大。

### 10. [#91939](https://github.com/anthropics/claude-code/issues/91939) — Fable 5.1 模型最终回答被吞（new）
**类型**：BUG `[has repro]` | 平台：Windows
Fable 5.1 模型在 `AskUserQuestion` 前的解释文本以 thinking block 形式输出，用户看不到。**新模型兼容性问题**初现。

---

## 🛠 重要 PR 进展（Top 10）

> 注：今日 PR 更新量较少（5 条），完整列示如下：

### 1. [#87079](https://github.com/anthropics/claude-code/pull/87079) — `**` glob 模式应匹配零深度路径
修复 `security-patterns.json` 中 `**/*.ts` 静默漏掉顶层文件的**安全规则缺陷**，fnmatch 行为与文档承诺不一致。

### 2. [#89404](https://github.com/anthropics/claude-code/pull/89404) — validate-agent.sh 不再因首个 warning 中止
修复 plugin-dev 自家 agent 文件都过不了验证器的尴尬问题，根因是 `set -e` + `((x++))` 交互。**修复 #83803**。

### 3. [#66416](https://github.com/anthropics/claude-code/pull/66416) — 插件校验脚本在 `set -e` 下首遇错误即中止
覆盖 `validate-agent.sh` / `hook-linter.sh` / `validate-hook-schema.sh` 三个脚本，与 #89404 **同源问题不同修复路径**。

### 4. [#79150](https://github.com/anthropics/claude-code/pull/79150) — code-review README 与实际命令对齐
文档描述的 git blame/0-100 评分/80 阈值流水线已不存在，**消除新用户误导**。

### 5. [#91894](https://github.com/anthropics/claude-code/pull/91894) — 更新 /frontend-design SKILL.md ⚠️ 已关闭
未通过合并，可能是误提交或描述缺失。

### 6-10. 历史 PR 暂无其他更新。
**观察**：今日 PR 活跃度偏低，建议关注插件/hooks 工具链相关的几个并行修复何时落地。

---

## 📈 功能需求趋势

按主题聚合过去 24 小时讨论最热的方向：

| 方向 | 代表 Issue | 热度信号 |
|------|------------|----------|
| **🧩 插件/扩展体系增强** | [#91870](https://github.com/anthropics/claude-code/issues/91870) Function Hooks | 56 评论，单日最强提案 |
| **🔀 多 Provider/模型路由** | [#38698](https://github.com/anthropics/claude-code/issues/38698) Per-agent 路由 | 43 👍，hybrid agent 趋势明确 |
| **🪟 Windows 桌面端稳定性** | [#85891](https://github.com/anthropics/claude-code/issues/85891), [#49917](https://github.com/anthropics/claude-code/issues/49917), [#81961](https://github.com/anthropics/claude-code/issues/81961) | 累计 200+ 👍，最高频痛点 |
| **🔗 第三方平台集成** | [#12346](https://github.com/anthropics/claude-code/issues/12346) GitLab | 131 👍，呼声持续 |
| **🛡️ 安全过滤器误报** | #79065/79068/79069/79070/79074/79075 等系列 | 批量关闭，session-halted 影响真实工作流 |
| **💾 跨会话持久化内存** | [#91913](https://github.com/anthropics/claude-code/issues/91913) | 多会话开发工作流的核心需求 |
| **📱 移动端可靠性** | [#71603](https://github.com/anthropics/claude-code/issues/71603), [#63975](https://github.com/anthropics/claude-code/issues/63975) | 输入丢失/草稿丢失问题 |
| **🆕 新模型兼容** | [#91939](https://github.com/anthropics/claude-code/issues/91939) Fable 5.1 | 模型迭代带来的回归点 |

---

## 💡 开发者关注点

### 🔴 高频痛点

1. **Windows 桌面端系统性失稳**：置顶、安装失败、升级循环三大问题并存，**单个产品体验连贯性**已被社区多次诟病。官方将 #85891 标为 invalid 引发反弹。
2. **Bash 工具语义破坏**（[#88561](https://github.com/anthropics/claude-code/issues/88561)）：在 Windows 平台违背 POSIX 引号转义规则，对自动化脚本是**信任危机级**问题。
3. **安全过滤器的过度敏感**（#79065 系列）：开发者在 Android 调试、WinRM 排障、构建系统等合法场景被误判为 cyber 威胁并 session-halted，反映**误报成本过高**。

### 🟢 高频需求

1. **更深的可观测性**：v2.1.260 在 `/cost` 暴露 cache 命中原因是**正确方向**，开发者希望更多 token 行为可解释。
2. **Diff 可视化原生集成**：v2.1.260 的 `/diff` 面板验证了社区多年诉求，建议推广至非全屏模式。
3. **插件安全扩展能力**：Function Hooks 提案表明社区**愿意用工程化约束换取能力**，希望官方推出"安全版扩展 API"。
4. **多模型/多 Provider 混合架构**：从 Sonnet/Opus 路由到 Ollama 本地模型，**降本与隐私**双重驱动。
5. **持续会话记忆**：跨重启、跨项目的上下文保留是 **multi-session workflow** 的核心瓶颈。

---

*数据时间窗口：2026-09-03 ~ 2026-09-04 UTC | 数据源：GitHub `anthropics/claude-code`*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**2026-09-04**

---

## 1. 今日速览

今日 Codex 社区的焦点集中在 **GPT-6-Astra 模型目录更新** 和 **0.153.x 维护版本** 上，连续发布 0.153.1/0.153.2 修复版本并并行推进 0.154.0-alpha 系列。Issue 侧最突出的矛盾是 **会话/rollout 存储失控增长**（个别用户达 100+ GiB）以及 **Windows 平台的多类严重回归**；同时 `/rewind` 真正撤销工作区编辑这一长期呼声（👍211）仍在等待落地。

---

## 2. 版本发布

| 版本 | 类型 | 关键内容 |
|---|---|---|
| **rust-v0.153.2** | Patch | 修正 GPT-6-Astra Fast 层描述文案 "1.5x → 2x speed"（仅文本，不影响实际行为） [#42632](https://github.com/openai/codex/pull/42632) |
| **rust-v0.153.1** | Patch | 通过 API 隐藏方式接入 GPT-6-Astra（不进入模型选择器，不改变默认） [#42605](https://github.com/openai/codex/pull/42605) |
| **rust-v0.154.0-alpha.1 / .2 / .3** | Alpha | 0.154 主线预发布版本密集迭代 |

> 三个 alpha 版本说明 0.154 进入快速收尾阶段，值得关注其稳定版发布窗口。

---

## 3. 社区热点 Issues

1. **#41049 — Windows 下 code-mode host 握手失败，5.6 模型不可用**（💬45，👍1）  
   现象为本地命令执行通道初始化握手阶段异常退出，GPT-5.6 在 Windows 上实质不可用；评论密集但 👍 较低，说明是长期未解的硬性故障。  
   🔗 https://github.com/openai/codex/issues/41049

2. **#11626 — CLI 增加 `/rewind` 同时回滚对话与工作区编辑**（💬40，👍211）  
   当前 `Esc` 仅回退对话，不撤销 Codex 实际改动的代码；作为长期 enhancement，👍 极高，反映这是**开发者的核心痛点**。  
   🔗 https://github.com/openai/codex/issues/11626

3. **#24948 — 会话日志膨胀至 700MB–2GB**（💬31）  
   compaction 历史与原始 tool 输出重复落盘，是 storage 系列问题的代表性案例。  
   🔗 https://github.com/openai/codex/issues/24948

4. **#41463 — Windows + WSL 项目创建失败（AbsolutePathBuf 缺 base path）**（💬23，👍12）  
   Desktop 在 WSL 场景下的路径反序列化 bug，影响企业用户最常见的环境组合。  
   🔗 https://github.com/openai/codex/issues/41463

5. **#39954 — Windows + Android Remote Control 重连死循环**（💬23）  
   409 Conflict 残留连接状态已清理，但 app-server 与 websocket 间仍陷入 reconnect 循环，远程控制功能在该组合下"不可用"。  
   🔗 https://github.com/openai/codex/issues/39954

6. **#34268 — Multi-agent V2 全历史 fork 导致 >100 GiB 存储增长**（💬13，👍6）  
   极端但可复现：长会话 + Ultra 推理 + multi-agent V2 触发 ~110 GiB session 文件，是存储放大问题的"天花板级"案例。  
   🔗 https://github.com/openai/codex/issues/34268

7. **#41960 — Windows Pets 完全不响应点击/拖拽**（💬10，👍10）  
   体验型 bug 但交互完全失效，且高赞数显示用户对装饰性体验的容忍度正在快速下降。  
   🔗 https://github.com/openai/codex/issues/41960

8. **#34337 — CLI/Desktop rollout 静默吞噬数十至数百 GiB**（💬10）  
   与 #24948、#34268、#41806、#22593 共同构成**存储放大主题群**，是当前社区最系统性的痛点。  
   🔗 https://github.com/openai/codex/issues/34337

9. **#41822 — Windows PerformanceCUA 启动后约 8 分钟才可用**（💬7）  
   update 后 runtime materializer 重试 4,680 次失败加密拷贝，主进程事件循环被同步阻塞。  
   🔗 https://github.com/openai/codex/issues/41822

10. **#42642 — 反馈提交失败**（💬2，今日新开）  
    看似边缘，但属于"基础可用性"层面故障，需关注是否大面积出现。  
    🔗 https://github.com/openai/codex/issues/42642

---

## 4. 重要 PR 进展

1. **#42654 — Stable exec-server 兼容测试指向 0.153.1**（OPEN）  
   锁定 Linux x86_64 版本与 checksum，确保 0.153.1 在生产兼容矩阵中的稳定性。  
   🔗 https://github.com/openai/codex/pull/42654

2. **#42652 — `codex exec` 增加 managed worktrees**（CLOSED）  
   为新/派生 session 提供实验性 `--worktree`，在独立 Git worktree 中运行，副作用隔离显著增强。  
   🔗 https://github.com/openai/codex/pull/42652

3. **#42650 — Assistant 文件引用渲染为本地链接**（CLOSED）  
   支持含 Markdown 特殊字符、Unicode、Windows 分隔符的路径，与引用位置后缀保持一致。  
   🔗 https://github.com/openai/codex/pull/42650

4. **#42641 — 全屏 overlay 退出后恢复 inline TUI**（CLOSED）  
   修复离开 alternate screen 时残留 stale cell、对话历史被滚出视口的渲染问题。  
   🔗 https://github.com/openai/codex/pull/42641

5. **#42640 — 强化 TUI 对 assistant markup 的解析**（CLOSED）  
   统一解析器处理引号属性、嵌套花括号、转义引号，修复 Git action receipt 与 code comment 解析不一致。  
   🔗 https://github.com/openai/codex/pull/42640

6. **#42638 — GPT-6-Astra Fast 层文案更新**（CLOSED）  
   描述从 "1.5x speed" 改为 "2x speed, increased usage"，与 0.153.2 同步。  
   🔗 https://github.com/openai/codex/pull/42638

7. **#42634 — 为 ThreadManager 注入可替换的 attachment store**（CLOSED）  
   新增 `codex-attachment-store` crate，将附件元数据与持久化逻辑解耦，便于后续扩展与测试。  
   🔗 https://github.com/openai/codex/pull/42634

8. **#42623 — Noise 握手受 exec server 初始化超时约束**（CLOSED）  
   握手与 JSON-RPC `initialize` 共享同一超时配置，避免启动卡死。  
   🔗 https://github.com/openai/codex/pull/42623

9. **#42619 — Amazon Bedrock 模型目录加入 GPT-6-Astra**（CLOSED）  
   包含 `openai.gpt-6-astra` 及其 global / US 跨区域变体。  
   🔗 https://github.com/openai/codex/pull/42619

10. **#42605 — GPT-6-Astra 模型目录回移植入 0.153**（CLOSED）  
    通过 hidden + API-only 的方式让 0.153.x 用户可通过 API 调用该模型，但模型选择器中不显示。  
    🔗 https://github.com/openai/codex/pull/42605

---

## 5. 功能需求趋势

- **TUI 编辑能力补齐**：`/rewind` 真正撤销工作区改动（#11626，👍211）、输入框 undo/redo（#2379，👍32）—— 长期高赞，社区对"对话级 vs 文件级"操作边界的需求日益明确。
- **存储治理（storage amplification）**：#22593 / #24948 / #34268 / #34337 / #41806 形成主题群，需求集中在 **delta/DAG 存储、定期归档清理、compaction 不再 re-embed 完整历史**。
- **新模型接入**：GPT-6-Astra 通过 #42607（bundled catalog）、#42605（0.153 回 port）、#42619（Bedrock）、#42638/42632（文案）四步落地，OpenAI 在多版本线、多云目录同步推进。
- **Windows / WSL 体验**：本周 Windows 平台相关 bug 占 Issue 主流，集中在 MSIX 自动更新、性能、安全通道、WSL 路径解析。
- **Voice / Realtime 与 Computer-Use**：voice host 引入 GStreamer 运行时（#42631）、CUA 启动性能回归（#41822、#41539）反映该方向投入加深但稳定性欠佳。
- **Embeddable 能力扩展**：ThreadManager 注入式 attachment store、trusted headers 注入 remote exec WebSocket——便于宿主嵌入。

---

## 6. 开发者关注点

1. **存储爆炸是当前最尖锐的系统性问题**：从 42 GB / 月（#41806）到 110 GiB（#34268），多名用户独立复现，根因都指向 compaction 与 session fork 的写放大。
2. **Windows 体验正在拖累口碑**：从 8 分钟首启、12 分钟 headless、Pets 失灵、Reconnecting 死循环、WSL 项目无法创建，到 Pets 点击/拖拽失效——更新后的回归密度高于 macOS/Linux。
3. **"回滚"语义不一致**：`Esc` 仅回退对话不撤销代码，导致用户对 Codex 改动心存顾虑，`/rewind` checkpoint 是被反复提起的解法。
4. **OAuth / 登录链路的边缘 case**：CLI 0.151.0 token exchange 失败（#41847）、Android 多 Google 账户下 Credential Manager `TransactionTooLargeException`（#38717）——企业/多账户场景仍是薄弱点。
5. **多 agent 协作可靠性**：sol 调度 luna 子 agent 后出现整 session exec 失败（#42653），说明 gpt-5.6 系列子 agent 间的健壮性仍需打磨。
6. **会话恢复可靠性**：`codex resume <thread-id>` 在 paginated 库残留 `inProgress` 时找不到 session（#42483），影响中断后继续工作流。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报
**2026-09-04**

---

## 今日速览

今日 Gemini CLI 发布了 **v0.60.0-nightly.20260904** 版本，重点强化了 MCP OAuth 流程的 RFC 9207 安全合规。社区讨论热度集中在 **Auto Memory 系统稳定性**、**子代理(Subagent)状态报告失真** 以及 **Windows 平台路径与权限安全** 三大方向，多个 P1 级安全与稳定性 Bug 正在被集中修复。

---

## 版本发布

### v0.60.0-nightly.20260904.g87a9c71d5
- 🔒 **MCP OAuth 安全加固**：在 MCP OAuth 流程中强制实施 RFC 9207 发行方识别规范，防止授权服务器伪造攻击
- PR：[#29117](https://github.com/google-gemini/gemini-cli/pull/29117)（@jvargassanchez-dot）
- 发布机器人：[#29196](https://github.com/google-gemini/gemini-cli/pull/29196)

---

## 社区热点 Issues

| # | Issue | 优先级 | 关键内容 |
|---|-------|--------|---------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | **P1** | `codebase_investigator` 子代理在达到 `MAX_TURNS` 上限后，仍错误上报 `status: "success"` 和 `GOAL` 终止原因，掩盖了中断事实。13 条评论，2 个 👍 |
| 2 | [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | **P1** | Shell 命令执行完成后，CLI 仍卡在 "Waiting input" 状态，shell 已结束但 UI 未更新。3 个 👍，体验影响严重 |
| 3 | [#27738](https://github.com/google-gemini/gemini-cli/issues/27738) | **P1** | 大量工具输出（如 24MB 单行 JSON）未经截断直接传入模型，超出 1M token 上限导致会话永久卡死 |
| 4 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | **P1** | `browser` 子代理在 Wayland 环境下失败，需要厘清 Linux 桌面协议适配 |
| 5 | [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) | **P1** | `get-shit-done` 输出 hook 在打印用户摘要时几乎必现崩溃 |
| 6 | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | **P2** | Auto Memory 向背景提取 agent 发送本地转录内容时缺乏确定性脱敏，存在敏感信息泄露风险 |
| 7 | [#26523](https://github.com/google-gemini/gemini-cli/issues/26523) | **P2** | Auto Memory 收件箱静默跳过无效 patch，缺乏对损坏文件的告警机制 |
| 8 | [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) | **P2** | Auto Memory 对低信号会话无限重试，缺乏去重与重试上限 |
| 9 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | **P2** | 模型在缺乏明确指令时几乎不会主动调用自定义 skills 和 sub-agents，能力利用率低 |
| 10 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | **P2** | 当可用工具超过 128 个时遇到 400 错误，缺乏智能裁剪机制（标题与实际数 400 有出入，需复核） |

---

## 重要 PR 进展

| # | PR | 重点内容 |
|---|-----|---------|
| 1 | [#29172](https://github.com/google-gemini/gemini-cli/pull/29172) | 🚀 **新增 `gemini-3.8-flash` 默认 Flash 模型支持**，同时注册 3.5/3.6/3.7/3.8 全系列 Flash 变体（@mr8lu） |
| 2 | [#29192](https://github.com/google-gemini/gemini-cli/pull/29192) | 🔒 **P1 安全修复**：`/chat delete <tag>` 中 `../` 路径遍历可删除 checkpoints 目录外文件（@soroush5） |
| 3 | [#29115](https://github.com/google-gemini/gemini-cli/pull/29115) | 🔒 强制系统级配置文件的权限与所有权校验，Windows 通过 PowerShell 做 ACL 验证 |
| 4 | [#29116](https://github.com/google-gemini/gemini-cli/pull/29116) | 🛡️ NTFS 8.3 短文件名（`git~1.exe`）路径遍历绕过拦截的缓解方案 |
| 5 | [#29195](https://github.com/google-gemini/gemini-cli/pull/29195) | 🐛 Checkpoint 损坏时优雅降级：非数组 `history` 不再让 `/resume` 直接 TypeError |
| 6 | [#29106](https://github.com/google-gemini/gemini-cli/pull/29106) | 🐛 修复 SSE 解析器在流末尾缺少空行时静默丢失 `finishReason` 与 usage 元数据 |
| 7 | [#29110](https://github.com/google-gemini/gemini-cli/pull/29110) | 🔧 `read_file` 改走 `FileSystemService`，与 `write_file`/`replace` 一致，便于 ACP 客户端的远程文件系统接入 |
| 8 | [#29170](https://github.com/google-gemini/gemini-cli/pull/29170) | 🛡️ 跨平台工作区边界与符号链接解析强化，覆盖 POSIX/Windows 命令安全与文件发现 |
| 9 | [#29158](https://github.com/google-gemini/gemini-cli/pull/29158) | 🔑 移除 `chrome-devtools-mcp` 中硬编码的 Google CrUX API key |
| 10 | [#28863](https://github.com/google-gemini/gemini-cli/pull/28863) | 🛡️ 扩展更新场景下强制环境变量变更的用户同意流程，并清理运行时注入的 env 变量 |

---

## 功能需求趋势

| 方向 | 代表 Issue | 热度信号 |
|------|-----------|---------|
| **多模态终端体验** | [#27855](https://github.com/google-gemini/gemini-cli/issues/27855) | 9 条评论，对标 Claude Code 的拖拽上传能力，社区呼声高 |
| **AST 感知代码理解** | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) / [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) | 官方 EPIC 追踪，探讨精确读取方法边界、降低噪声 token |
| **新模型接入** | [#29172](https://github.com/google-gemini/gemini-cli/pull/29172) | 3.8 Flash 默认化推进中 |
| **子代理可观测性** | [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) | 希望 `/chat share` 能查看子代理完整轨迹 |
| **Browser Agent 鲁棒性** | [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) / [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | 自动接管 session、读取 `settings.json` 覆盖 |
| **Slash 命令性能** | [#28257](https://github.com/google-gemini/gemini-cli/issues/28257) | 用预计算 Map 替代两遍线性扫描 |

---

## 开发者关注点

1. **Auto Memory 系统是当前最大痛点**：`#26516` 作为 tracking issue 串联起 5+ 个相关问题，涵盖脱敏、无效 patch 隔离、低信号重试、内存泄漏等，是 P2 集群中讨论最密集的方向。

2. **子代理状态语义不一致**：`#22323` 揭示了终止原因与实际结果脱节的问题，叠加 `#21968` 的"不会主动调用 subagent"，说明多 agent 编排的可信度与自动化程度均有较大提升空间。

3. **Windows 平台安全加固成体系**：从 NTFS 8.3 短名（`#29116`）、长路径（`#28926`）、ACL 校验（`#29115`）到 NTFS 符号链接（`#29170`），构成了本周期最完整的 Windows 兼容性 + 安全加固合集。

4. **大输出截断与上下文保护**：超过 1M token 导致的会话永久卡死（`#27738`）和 `read_file` 绕过 `FileSystemService`（`#29110`）共同指向一个诉求——需要对超大输出做确定性截断与降级。

5. **MCP/扩展安全边界**：`#29158`（硬编码 API key）、`#28863`（环境变量注入）、`#29192`（路径遍历）三个 PR 集中暴露出第三方依赖与扩展系统仍存在多个信任边界漏洞。

---

*数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) · 报告生成时间：2026-09-04*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报

**日期**：2026-09-04

---

## 一、今日速览

Reasonix Studio v2.12.0 正式发布，远程工作区首次端到端可用，缓存命中率从 4.2% 跃升至 54.7%。与此同时，社区正在集中反馈 **v1.34–v1.36 系列的 Agent turn 截断与回滚问题**，开发者侧多个滚动条、Markdown 渲染相关 PR 已陆续合入，前端稳定性明显改善。

---

## 二、版本发布

### Reasonix Studio v2.12.0

- **远程工作区**：首次发布远端可装的 CLI 内核，"在另一台机器上开工作区"不再因缺少内核而失败并误报无关错误码。
- **缓存优化**：将项目自身状态移出跨项目共享缓存前缀，**首轮缓存命中率从 4.2% → 54.7%**。
- **架构重构**：Controller 按生命周期拆分为多个协作者。
- **自 2.11.0 起累计 56 个 commit**。

升级方式：三平台照旧自更新（Linux `.deb` / Windows 安装器 / macOS 替换 bundle），无需人工介入。

---

## 三、社区热点 Issues

| # | Issue | 关注点 | 链接 |
|---|-------|--------|------|
| 1 | [#8946](https://github.com/esengine/DeepSeek-Reasonix/issues/8946) | `provider omitted reasoning required to replay this tool turn` 频繁中断 | 🐛 高频 Agent turn 截断根因之一，涉及 reasoning 必传字段，**12 评论 / 5 👍** |
| 2 | [#9766](https://github.com/esengine/DeepSeek-Reasonix/issues/9766) | v1.34/v1.36 在 21–30 轮后频繁 turn 截断 | **👍1** 报告精准定位——"只读不执行导致长时间无 tool call 触发 watchdog"，已被 #9762 / #9764 多个 PR 命中 |
| 3 | [#9758](https://github.com/esengine/DeepSeek-Reasonix/issues/9758) | Interactive TUI 半回合停摆，必须再发消息唤醒 | 长会话场景下 agent 在 "答应要输出结果" 之前停步，与上面 issue 形成证据链 |
| 4 | [#9750](https://github.com/esengine/DeepSeek-Reasonix/issues/9750) | `content[].thinking` 400 报错 | DeepSeek thinking 模式多回合回传校验失败，已被 #9762 直接修复 |
| 5 | [#9732](https://github.com/esengine/DeepSeek-Reasonix/issues/9732) | Windows 对话框右侧滚动条乱跑 | 前端滚动条家族问题，已被 #9759 / #9760 闭环 |
| 6 | [#9765](https://github.com/esengine/DeepSeek-Reasonix/issues/9765) | Windows 中文环境 TUI 框选中文复制→粘贴乱码 | 编码层 UTF-8/GBK 互转，区域性 bug，影响中文用户体验 |
| 7 | [#9575](https://github.com/esengine/DeepSeek-Reasonix/issues/9575) | macOS 输出反复被打断、回滚、视图乱跳 | 队列插入打断思考、滚动定位错乱，与 #9711 大报告同源 |
| 8 | [#9771](https://github.com/esengine/DeepSeek-Reasonix/issues/9771) | macOS v1.36.0 对话偶然断开 | 偶发性连接丢失，缺乏稳定复现路径，需补充日志 |
| 9 | [#9744](https://github.com/esengine/DeepSeek-Reasonix/issues/9744) | Windows 桌面版任务进行中无法移除未使用接入商 | 接入商管理并发锁问题，影响多账号/多服务方切换 |
| 10 | [#9747](https://github.com/esengine/DeepSeek-Reasonix/issues/9747) | macOS 桌面版"逐模型上下文窗口"卡片错位 | 长模型名溢出布局问题，可视化质量细节 |

**整体观察**：Agent 行为可预测性（turn 截断、回滚）已上升为 v2 线最集中的痛点，跨 Windows / macOS 普遍出现。

---

## 四、重要 PR 进展

| # | PR | 说明 | 链接 |
|---|----|------|------|
| 1 | [#9762](https://github.com/esengine/DeepSeek-Reasonix/pull/9762) | **DeepSeek thinking 全轮回传 + 400 自愈**：所有携带 reasoning 的回合均回传 `reasoning_content`，遇 stale-thinking 400 自动重试。直接修复 #8946/#9750/#9766 |  |
| 2 | [#9767](https://github.com/esengine/DeepSeek-Reasonix/pull/9767) | **fallback 回合即时流式输出 + 会话内恢复 thinking**：修复 fallback 模式下因 reasoning chunk 永不来导致"回合末一次性倾倒"问题 |  |
| 3 | [#9764](https://github.com/esengine/DeepSeek-Reasonix/pull/9764) | **completion eval 验证请求关闭 thinking**：避免评估器耗尽 256 token/30s 预算后空判定误停任务 |  |
| 4 | [#9770](https://github.com/esengine/DeepSeek-Reasonix/pull/9770) | **受管配置写入始终需人工确认**：`config.toml`、兼容性 TOML、legacy `config.json` 不论路径均走 `config_write` 审批 |  |
| 5 | [#9755](https://github.com/esengine/DeepSeek-Reasonix/pull/9755) | **持久化 PTY 终端**：跨平台长寿命全双工伪终端，支持 REPL 状态、`venv`、env 跨 Turn 驻留 |  |
| 6 | [#9754](https://github.com/esengine/DeepSeek-Reasonix/pull/9754) | **稳定 transcript 滚动与 Markdown 展示**：闭合 #9711 上滚跳位、滚动条漂移、问题导航错位、空 Markdown 卡片 |  |
| 7 | [#9769](https://github.com/esengine/DeepSeek-Reasonix/pull/9769) | **YOLO 模式自动提交已全部作答的 ask 批次**：YOLO 即"无确认承诺"，全答完的 Submit Tab 多余 Enter 直接跳过 |  |
| 8 | [#9768](https://github.com/esengine/DeepSeek-Reasonix/pull/9768) | **i18n 收编 host 提示文案**：~25 条用户可见 host notice 迁入 en/zh/zh-TW 目录，修复"半中半英"问题 |  |
| 9 | [#9751](https://github.com/esengine/DeepSeek-Reasonix/pull/9751) | **精选供应商独立多账号**：DeepSeek official / OpenCode Go 等可维护多 API key，按账号派生 route，项目配置可锁定 |  |
| 10 | [#9690](https://github.com/esengine/DeepSeek-Reasonix/pull/9690) | **出站 LLM 请求加 User-Agent**：便于上游服务识别 Reasonix 流量，解决默认 `Go-http-client/1.1` 难以追踪的问题 |  |

另有 #9705（ACP `/clear` 支持）、#9491（YOLO 数字键直选）、#9417（半页/单行滚动快捷键）、#9704（chooser 数字键可命中 "输入其他" / "直接聊天"）等多项 CLI/TUI 体验增强。

---

## 五、功能需求趋势

从过去 24 小时活跃 Issues/PR 中提炼出的社区关注方向：

1. **Agent 回合可靠性（最高优先级）**——turn 截断、回滚、thinking 必传、watchdog 误判构成 v2 体验核心痛点。
2. **多账号 / 多供应商管理**——独立账号、并发切换、移除未用接入商（火山引擎等新供应商也在被请求 #9761）。
3. **前端滚动与渲染稳定性**——上滚跳位、滚动条漂移、Markdown 卡片空渲染、输入抖动。
4. **持久化交互式终端（PTY）**——社区强烈需要长寿命 REPL / `venv` / env 跨 Turn 驻留。
5. **区域化体验**——中文环境编码、TUI 中英文混排、i18n 全量覆盖。
6. **配置安全 / 自动化边界**——受管配置文件的人工审批门、YOLO 模式下的无感提交。
7. **Provider 生态扩展**——火山引擎、官方多模态已支持，多模态能力正在纳入 (#9237)。

---

## 六、开发者关注点

- **痛点 #1：Agent 长会话不可靠**——21–30 轮后 turn 截断高发，根因集中在 DeepSeek thinking 多轮回传缺失 + watchdog 误判"长时间无 tool call"。这是 v2 用户最迫切的诉求。
- **痛点 #2：前端的"幽灵跳动"**——上滚跳位、滚动条漂移、思考展开卡顿、输入框抖动等渲染抖动在 Windows / macOS / Linux 三端均有报告，是 #9711 系列 issue 的总称。
- **高频需求：PTY / REPL / venv 持久化**——Agent 不能保留 shell 状态让真实开发流（Python/Node REPL、`source venv/bin/activate`）支离破碎，#9755 的引入回应了这一长期呼声。
- **高频需求：YOLO 模式的"真无感"**——YOLO 是显式无确认承诺，但部分流程仍要求额外 Enter / 数字键；社区希望尽量"承诺即执行"。
- **高频需求：可观测性**——出站请求缺少 User-Agent、远端工作区错误码语义不清晰，开发者难以做日志关联与故障定位。
- **高频需求：多账号/多供应商并发**——精选供应商（DeepSeek official、OpenCode Go）独立账号、并发切换、清理流程需要更顺畅。

---

*数据来源：github.com/esengine/DeepSeek-Reasonix · 覆盖 22 条 Issues、30 条 PR、1 个 Release*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报

**日期：2026-09-04**

---

## 📌 今日速览

今日社区动态以 **TUI/Desktop 体验打磨** 与 **2.0 核心功能** 双线并进为主轴：@Hona 主导的浏览器标签页与诊断能力（#44838、#46531）持续推进，@kitlangton 提交了仿真模块的鼠标输入支持（#47194），同时多位贡献者集中修复 Ctrl-C 误退出（#7957）、LSP 在嵌套子项目失效（#47181）、设置页滚动溢出（#47190）等高频痛点，显示出 2.0 版本进入体验收敛阶段。

---

## 🚀 版本发布

过去 24 小时内无新 Release。

---

## 🔥 社区热点 Issues

| # | Issue | 👍 | 重要性 |
|---|-------|-----|--------|
| [#7957](https://github.com/anomalyco/opencode/issues/7957) | **[UX] Ctrl+C 不应退出 OpenCode** | 53 | 跨平台高频痛点，Windows 用户复制文本意外终止进程 |
| [#2999](https://github.com/anomalyco/opencode/issues/2999) | **提供禁用 Ctrl-C 的方式** | 27 | 与 #7957 同源问题，呼声已久 |
| [#13626](https://github.com/anomalyco/opencode/issues/13626) | **Web UI 自动从服务器同步项目** | 16 | 多设备用户体验关键缺口 |
| [#47177](https://github.com/anomalyco/opencode/issues/47177) | **[2.0] Code Mode 插件权限绕过** | 0（新增）| 2.0 安全模型重要回归 |
| [#29953](https://github.com/anomalyco/opencode/issues/29953) | **Desktop 项目图标发现阻塞 sidecar** | 0 | 大型仓库性能瓶颈 |
| [#47174](https://github.com/anomalyco/opencode/issues/47174) | **LSP 在嵌套 TS 子项目返回空结果** | 0（新增）| monorepo 用户核心痛点 |
| [#44160](https://github.com/anomalyco/opencode/issues/44160) | **Desktop deep link 无法创建会话** | 0 | 影响系统级集成 |
| [#47167](https://github.com/anomalyco/opencode/issues/47167) | **误操作归档项目且无法恢复** | 0 | 数据安全风险 |
| [#47172](https://github.com/anomalyco/opencode/issues/47172) | **`--model` 在 TUI 入口被静默忽略** | 0（新增）| CLI/UX 一致性问题 |
| [#47192](https://github.com/anomalyco/opencode/issues/47192) | **Zen 模型 muse-spark-1.3 HTTP 500** | 0（新增）| 模型提供商可用性问题 |

**社区反应观察**：#7957 的 👍 53 + 38 条评论表明 Ctrl-C 问题已从单点抱怨升级为 UX 共识；#13626 反映出 Web 用户对"多端一致"的强烈期待；#47177 的安全回归（权限绕过）虽是新增但 2.0 关键，需高度关注。

---

## 🛠️ 重要 PR 进展

| PR | 作者 | 内容 |
|----|------|------|
| [#44838](https://github.com/anomalyco/opencode/pull/44838) | @Hona | **Desktop 浏览器标签页 + Chromium 诊断**：在 Review 面板引入多标签管理、跨域 frame 检查、快照、输入动作等能力 |
| [#46531](https://github.com/anomalyco/opencode/pull/46531) | @Hona | **浏览器插件公开 API**：为 Code Mode 暴露 44 个命名空间方法，客户端通过 `@opencode-ai/plugin-browser/rpc` 接入 |
| [#46530](https://github.com/anomalyco/opencode/pull/46530) | @Hona | **插件权限断言**：在 Effect/Promise 插件中暴露 `ctx.permission.assert()`，统一权限引擎 |
| [#47194](https://github.com/anomalyco/opencode/pull/47194) | @kitlangton | **仿真模块真实鼠标输入**：支持悬停/离开状态、拖拽时按住按钮，并记录鼠标坐标供 Drive 回放 |
| [#47187](https://github.com/anomalyco/opencode/pull/47187) | @Kai-Liu001 | **shell 工具后台执行**：为长任务（dev server、watch、test）提供 `run_in_background` + 自动通知 |
| [#47186](https://github.com/anomalyco/opencode/pull/47186) | @gmhelmold | **后台任务面板**：在 session 侧栏新增 Tasks 标签，实时展示子 agent 与 shell 工具的执行状态 |
| [#47181](https://github.com/anomalyco/opencode/pull/47181) | @joao-jlcm | **修复嵌套 TS 子项目 LSP**：闭合 #47174，并顺带解决 tsserver.js 解析、`$/progress` 等待等历史问题 |
| [#47193](https://github.com/anomalyco/opencode/pull/47193) | @MacroModel | **持久化心跳监控**：跨重启保留调度策略与待处理检查，Web 端以可折叠时间线卡片呈现 |
| [#43165](https://github.com/anomalyco/opencode/pull/43165) | @bornmw | **LLM 消息日志器**：通过 `experimental.log_messages` 记录请求/响应，便于调试（闭合 #29186）|
| [#47159](https://github.com/anomalyco/opencode/pull/47159) | @rekram1-node | **重试临时压缩失败**：使用现有 session 重试策略，拒截断摘要，用户取消时不重试 |

---

## 📈 功能需求趋势

从近 24 小时更新的 13 条 Issue 提炼，社区关注点呈以下分布：

1. **🚦 终端与 TUI 体验**（约 35%）
   - Ctrl-C 冲突（#7957、#2999）
   - 模型选择器排序（#47183、#47179）
   - TUI `--model` 参数被吞（#47172）
   - 多行命令显示异常（#47185）

2. **🖥️ Desktop / Web 一致性**（约 25%）
   - Web 端项目同步（#13626）
   - 桌面图标阻塞（#29953）
   - deep link 失效（#44160）
   - Windows 标题栏图标对齐（#47189）

3. **🔌 2.0 核心能力**（约 25%）
   - Code Mode 权限模型（#47177）
   - 浏览器/插件公开 API（#46530、#46531、#44838）
   - 后台任务执行（#47186、#47187）

4. **🧰 LSP 与语言工具链**（约 15%）
   - 嵌套 TS 子项目（#47174、#47181）

---

## 💡 开发者关注点

汇总 Issue 与 PR 中的高频反馈，开发者当前最关心的痛点：

- **🔁 重复循环与无响应**（#47184、#47188）：近两日多条报告指向"模型陷入循环"和"消息发出但无输出"，疑似与最近的核心/重试逻辑改动相关，运维团队应优先排查。
- **⌨️ Ctrl-C 与复制冲突**（#7957 / #2999）：Windows + WezTerm/Terminal 用户长期受阻，建议通过区分"空输入时退出"与"非空输入时复制"缓解。
- **📦 monorepo LSP 失效**（#47174）：嵌套 `tsconfig.json` 场景下 `lsp` 工具完全不可用，是 monorepo 用户的关键工作流障碍，已被 #47181 修复。
- **🗂️ 误操作不可逆**（#47167）：归档/删除等破坏性操作缺乏二次确认与回收站机制，UI 安全设计需要补强。
- **🤖 模型可用性**（#47192）：Zen 平台 `muse-spark-1.3-contributor-free` 返回 500，而 1.2 正常，提示模型灰度发布应提供回退路径。
- **🖱️ 长任务阻塞 turn**（#47187、#47186）：dev server、watch mode、build 等同步 shell 任务占据整个 turn，"后台执行 + 任务面板"是社区共识方向，已有两路实现同时推进。
- **🔍 CLI 一致性**（#47172）：`--model` 在 `run` 路径有校验，在 TUI 路径被静默丢弃，开发者希望所有入口行为一致。

---

*数据来源：GitHub `anomalyco/opencode` Issues & Pull Requests · 采样窗口：2026-09-03 → 2026-09-04*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# DeepSeek Harness 社区动态日报

**日期：** 2026-09-04
**数据来源：** github.com/deepseek-ai/deepseek-harness

---

## 1. 今日速览

今日社区最为关注的动态是 **v0.1.2-rc.1** 候选版本的发布，聚焦于会话流交互体验优化，包括过程内容折叠、正文宽度自适应及 token 用量可视化等实用功能改进。Issues 与 PR 板块在过去 24 小时内无新增更新，社区进入版本验证与静默期。

---

## 2. 版本发布

### 📦 dsh-v0.1.2-rc.1（首个 0.1.2 候选版本）

作为 0.1.2 系列的首个候选版本，本版本汇总了自 v0.1.1-rc.2 以来的主要用户与开发者相关变更，重点改善会话流的交互与可读性。

**🆕 新增功能**

| 功能 | 描述 | 贡献者 |
|------|------|--------|
| 过程内容默认折叠 | 会话流默认在每个已完成回答前折叠过程内容，并默认折叠 "System prompt" | @07akioni, @lsdsjy |
| 正文宽度自适应 | 会话流正文宽度可自适应屏幕或拖拽手动调整 | @yixiangihsiang |
| Token 用量展示 | 回答末尾显示 token 用量与耗时，可展开查看精确用量与详细统计 | @hypatiamay |

🔗 [查看完整 Release Notes](https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.1.2-rc.1)

---

## 3. 社区热点 Issues

> ⚠️ 过去 24 小时内 Issues 板块无新增或更新条目。

由于缺乏新数据，本期日报暂不列出具体 Issue。建议持续关注 [Issues 列表](https://github.com/deepseek-ai/deepseek-harness/issues) 获取最新动态。

---

## 4. 重要 PR 进展

> ⚠️ 过去 24 小时内 PR 板块无新增或更新条目。

由于缺乏新数据，本期日报暂不列出具体 PR。建议持续关注 [Pull Requests 列表](https://github.com/deepseek-ai/deepseek-harness/pulls) 获取最新进展。

---

## 5. 功能需求趋势

基于本次 v0.1.2-rc.1 的更新方向，可观察出社区当前关注的功能趋势：

| 趋势方向 | 具体体现 |
|----------|----------|
| 🎯 **交互体验优化** | 折叠过程内容、可调正文宽度、Token 显式展示 |
| 📊 **可观测性增强** | 用量统计、耗时可视化、精确 Token 消耗展示 |
| 👁️ **界面可定制化** | 自适应布局与拖拽调节支持 |
| 🧹 **信息密度管理** | 默认折叠降低噪音，按需展开获取细节 |

**核心洞察：** 当前社区的核心诉求集中在「让会话流更清爽、更可控」，通过默认折叠与按需展开的方式平衡信息密度与可访问性。

---

## 6. 开发者关注点

综合本版本更新与社区反馈，开发者当前关注点可归纳为以下几类：

1. **🔕 噪音控制**：默认折叠推理过程与 System prompt，减少长会话下的视觉干扰
2. **📐 布局灵活性**：正文宽度支持自适应与手动拖拽，适配不同屏幕与阅读习惯
3. **📈 透明度提升**：实时展示 Token 消耗与耗时，便于成本与性能调优
4. **🧪 候选版本稳定性**：作为首个 rc 版本，社区将重点验证上述新功能的稳定性与兼容性

---

*📌 日报由 AI 自动生成，基于 GitHub 公开数据整理。*

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 · 2026-09-04

> 数据来源：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) · 统计窗口：过去 24 小时

---

## 一、今日速览

今天社区活跃度极高，**11 个 Issue** 与 **50 个 PR** 在过去 24 小时内集中更新。最值得关注的焦点是 **`hermes serve` / `dashboard` 启动时未注册 config.yaml 中配置的 shell hooks 与插件 hooks** 这一安全边界缺陷——它同时被多个 Issue (#69825、#102504、#102592) 和一个老牌 PR (#69832) 反复命中,影响所有使用 desktop / web-chat 后端的用户的 outbound-send guard、destructive-command guard 等防护措施。Desktop 端的 composer 误拖拽问题也有两个相关 Issue + 一个修复 PR (#102609) 形成闭环。

---

## 二、版本发布

过去 24 小时内无新 Release。

---

## 三、社区热点 Issues(11 条,精选 10 条)

| # | Issue | 优先级 | 重要原因 |
|---|---|---|---|
| [#102504](https://github.com/NousResearch/hermes-agent/issues/102504) | **[P1]** `hermes serve` 从不注册 config.yaml 的 shell hooks | **P1** | 安全边界缺陷。`hermes serve`(Desktop 后端)完全跳过 `_prepare_agent_startup`,导致用户配置的所有 outbound-send、destructive-command、tenant guards **在 desktop 会话中静默失效**,而同一 guard 在 `hermes -z` 中正常。这是今天最严重的 issue。 |
| [#102592](https://github.com/NousResearch/hermes-agent/issues/102592) | **[P2]** 插件注册的 hooks(pre_llm_call 等)在 `serve` / `dashboard` 从不触发 | P2 | 与 #102504 同根因的"插件侧"症状——`hermes dashboard` / `hermes serve` 启动时跳过 plugin discovery,导致插件生态中的 hook 系统对 web-chat / desktop-backend 用户彻底失效。 |
| [#69825](https://github.com/NousResearch/hermes-agent/issues/69825) | **[P2]** `serve` 命令从不注册 shell hooks | P2 | 这个老 issue(7 月 23 日)已经在社区被讨论近 6 周仍未合并,根因被新 issue #102504 重申。社区耐心正在消耗。 |
| [#102608](https://github.com/NousResearch/hermes-agent/issues/102608) | TUI 覆盖终端 pane/tab 标题(破坏 tmux/zellij pane 名) | bug | TUI 唯一性问题,影响所有 tmux/zellij 重度用户;无 opt-out 配置项,体验较差。 |
| [#102593](https://github.com/NousResearch/hermes-agent/issues/102593) | Local Models 误判 Strix Halo AMD APU 显存 | bug | 影响所有 Strix Halo(96G carve / 32G RAM)用户——本来能跑的中等模型被误标为"超出显存",Local Models 面板基本不可用。 |
| [#70422](https://github.com/NousResearch/hermes-agent/issues/70422) | Desktop 选中文本时误触 composer 拖出 | bug | 5 条评论,1 个 👍,被 #101318 标记为重复。日常使用中触发频率极高,体验痛点。 |
| [#101318](https://github.com/NousResearch/hermes-agent/issues/101318) | macOS Desktop 底部 composer 拖拽仍过于敏感 | bug | #70422 的重复 issue,但提供更具体的复现——16px 上滑即可触发,需要"disable drag"开关。 |
| [#97296](https://github.com/NousResearch/hermes-agent/issues/97296) | macOS 27 下 Kanban dispatcher SIGSEGV | P3 | macOS 27 beta + Tailscale Network Extension 组合下的 crash,worker 日志为 0 字节、60s 后变 `crashed {pid not alive}`,定位困难。 |
| [#102597](https://github.com/NousResearch/hermes-agent/issues/102597) | All-profiles 会话列表每行显示 profile 标记 | feature | 多 profile 用户(个人助手 + 工作 bot)的核心诉求,合并视图下当前标记显示不一致,严重影响识别效率。 |
| [#99793](https://github.com/NousResearch/hermes-agent/issues/99793) | Desktop 暴露 reasoning block 排版到主题设置 | feature | reasoning-model 重度用户的真实痛点:Thinking 块是用户最常阅读的部分,排版却硬编码在三层 Tailwind 工具类中,主题系统无法触达。 |

---

## 四、重要 PR 进展(精选 10 条)

| # | PR | 类型 | 说明 |
|---|---|---|---|
| [#102609](https://github.com/NousResearch/hermes-agent/pull/102609) | **fix(desktop): 默认锁定 composer 到 dock** | bug fix | 解决 #70422 / #101318。新的"Lock Composer"设置取代了隐藏的 Floating Composer 开关,并默认开启。属于今日值得测试的 UX 修复。 |
| [#102610](https://github.com/NousResearch/hermes-agent/pull/102610) | **test(desktop): 锁定 #79231 的 steer 插入位置** | test | 当 `streamId` 为 null 时,mid-turn 用户的纠正消息被插到原始 prompt 上方——本 PR 用 fixture 锁定 #79231 的修复行为,防止回退。 |
| [#102607](https://github.com/NousResearch/hermes-agent/pull/102607) | **feat(desktop): reasoning 排版升级为可主题化 token** | feature | 把 reasoning 块从硬编码的 Tailwind 工具类(`text-xs leading-snug ...`)抽出为三个 CSS 变量,主题系统终于可以触达。对应 #99793。 |
| [#102518](https://github.com/NousResearch/hermes-agent/pull/102518) | **fix(darwin): 线程父进程的 Popen 保持 CPython 3.11 posix_spawn** | bug fix | 修复 #97296。macOS 27 + Tailscale 下,从线程(gateway / desktop serve / cron scheduler)发出的 `Popen(start_new_session=True, ...)` 触发 Network.framework atfork SIGSEGV——本 PR 强制走 `posix_spawn` 慢路径绕开问题。 |
| [#102117](https://github.com/NousResearch/hermes-agent/pull/102117) | **refactor: 全代码库简化 −35.6% LOC,上帝文件拆分,零行为变更** | refactor | 1,063,826 → ~676k 行,37 个超过 5k LOC 的文件拆分到 6 个,无人超过 ~7.1k。**P1 大型重构**,但 risk-sweeper 标记覆盖 session/message/security/caching/install-update 等几乎所有子系统——需重点 review。 |
| [#69832](https://github.com/NousResearch/hermes-agent/pull/69832) | **fix(serve): 为 dashboard/serve 启动注册 shell hooks** | bug fix | 修复 #69825。根因:`serve` 和 `dashboard` 不在 `_AGENT_COMMANDS` 中,导致 `_prepare_agent_startup()` 跳过 `register_from_config()`。已开放近 6 周,**今天终于和 #102504、#102592 形成 hot discussion**。 |
| [#102602](https://github.com/NousResearch/hermes-agent/pull/102602) | **fix(relay): 4401 关闭前重拨一次新 token** | bug fix | 解决"握手成功后收到 4401 被无条件判为 secret 撤销"的过激反应——先用新 token 重拨一次再判定,避免连接器被错误 opt-out、relay 长期 disabled。 |
| [#102604](https://github.com/NousResearch/hermes-agent/pull/102604) | **fix(sanitizer): 递归清洗 multipart / structured 消息中的代理对和非 ASCII** | bug fix | 修复上游 LLM API 的 `UnicodeEncodeError`(未配对 UTF-16 代理对)。原清洗函数只处理顶层,multipart 嵌套中的代理对仍会 crash。 |
| [#102606](https://github.com/NousResearch/hermes-agent/pull/102606) | **fix(cron): 拒绝未支持的继承模型** | bug fix | 阻止 `model: test` 这类 providerless 占位模型在配置加载阶段进入 cron,避免后续 resolve 失败。 |
| [#102601](https://github.com/NousResearch/hermes-agent/issues/102501) | **feat(desktop): All-profiles 会话行显示 profile 标记** | feature | 关闭 #102597。修复主 recents 区域未传 `showProfileTags={showAllProfiles}` 的问题,与 Pinned / 搜索结果行为对齐。 |

> 此外,50 条 PR 中还包括 [#102605](https://github.com/NousResearch/hermes-agent/pull/102605)(Windows ACP 终端 hang)、[#102600](https://github.com/NousResearch/hermes-agent/pull/102600)(Kanban 任务转移时终止 live worker)、[#102598](https://github.com/NousResearch/hermes-agent/pull/102598)(ntfy cron 路由修复)、[#99776](https://github.com/NousResearch/hermes-agent/pull/99776)(TUI 视觉重构)、[#58540](https://github.com/NousResearch/hermes-agent/pull/58540)(skills 写权限的 only/exclude 粒度) 等,体现 Hermes 在多平台兼容性、cron/kanban 可靠性、权限粒度上的持续打磨。

---

## 五、功能需求趋势

从所有 Issue / PR 中提炼的社区方向:

1. **Desktop UX 精细化** — 占比最高。Composer 拖拽行为锁定、steer 消息插入位置、reasoning 块排版主题化、All-profiles 标记显示,反映 Desktop 已进入"功能可用、体验待打磨"阶段,用户开始关注每一个交互细节。
2. **Hooks/Plugins 安全边界** — #102504(P1)、#102592、#69825 三连击 + PR #69832。社区对 `serve` / `dashboard` 不走 `register_from_config()` 的安全语义高度敏感,这是 Hermes 区别于"普通聊天客户端"的核心卖点。
3. **本地/异构硬件支持** — Strix Halo APU 显存识别(#102593)显示社区对 AMD 高端集显 + Apple Silicon 之外的硬件越来越关注,Local Models 面板需要更智能的"carved unified memory"感知。
4. **多 Profile 场景** — #102597 显示企业/个人多 profile 已是真实用例,但 UI 还停留在"合并后只标 Pinned"的初级状态。
5. **TUI 生态兼容性** — #102608(tmux/zellij pane 名)与 [#99776](https://github.com/NousResearch/hermes-agent/pull/99776)(视觉重构)双线推进,TUI 在终端党中的地位正在被 Hermes 认真对待。
6. **大型代码健康** — PR #102117 的 −35.6% LOC 重构表明项目进入"功能收敛、代码整理"阶段,长期可维护性成为重点。
7. **MoA / 多模型协作** — #102603、#102599 持续完善 `hermes moa configure` 的粒度控制(per-reference token cap、slot 重新调参),多模型仲裁(Mixture-of-Agents)是产品差异化方向。

---

## 六、开发者关注点

1. **🔴 优先级最高的痛点:`hermes serve` / `dashboard` 的 hooks 黑洞**
   - #102504、#102592、#69825 同时指向 `_prepare_agent_startup()` 跳过 serve/dashboard 这一根因,所有"安全/审计/租户隔离"配置在 desktop 用户侧静默失效——这是 24 小时内 P1 级安全议题,强烈建议在下一个 patch release 修复。PR #69832 已经就位等待 review。

2. **🟠 Desktop 体验仍有"最后一公里"问题**
   - Composer 默认行为不当(必须主动 lock)、steer 消息插错位置、reasoning 排版不可主题化——这些问题单个不致命,但叠加后让 Desktop 在重度用户群中口碑承压。今天的 PR #102609、#102610、#102607 集中回应,是好的信号。

3. **🟡 macOS 27 + 第三方扩展的兼容性**
   - #97296 + PR #102518 显示,当 Hermes 跑在 macOS 新版本 + Tailscale Network Extension / 其他 sys ext 下,子进程派发有真实 crash 风险。Hermes 团队被迫回退到 CPython 3.11 的 `posix_spawn` 慢路径——属于"知道问题、临时绕开、长期方案待定"的典型案例。

4. **🟢 重构信心**
   - PR #102117 的全代码库 −35.6% LOC 拆分是 Hermes 走向"产品级成熟"的重要里程碑,值得开发者关注:这意味着 bug 修复、PR review、新功能接入的边际成本都在下降。

5. **🟡 终端党/TUI 用户的边缘体验**
   - TUI 覆盖 tmux pane 标题、Composer 默认状态、视觉密度——这些"对老手致命、对新手无感"的问题正在被 PR #99776、#102609 等系统性解决,社区需要的是"主动提报 + 提供 PR",抱怨期已过、建设期来临。

---

*日报生成时间:2026-09-04 · 数据来源:GitHub REST API · Hermes Agent Community Pulse*

:::
