---
title: "AI CLI 工具社区动态日报"
published: 2026-10-08
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-08

> 生成时间: 2026-10-08 00:00 UTC | 覆盖工具: 8 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Deepseek Harness](https://github.com/deepseek-ai/deepseek-harness)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [OpenClaw](https://github.com/openclaw/openclaw)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# 2026-10-08 AI CLI 工具生态横向对比分析

> 口径说明：Issues/PR 数来自各日报“纳入分析/过去 24h 更新”口径，部分工具未披露全量；因此更适合看相对活跃度，而非绝对平台总量。

## 1. 生态全景

当前 AI CLI 工具已从“能否生成代码”进入“能否可信执行”的阶段：新模型、沙箱、多 Agent、远程控制仍是发布主线，但社区痛点集中转向静默失败、权限精度、上下文治理、成本控制与跨平台稳定性。官方大厂工具继续强化模型与沙箱体系，开源/多模型工具则围绕插件、网关、桌面端和发布工程快速迭代。整体生态呈现“功能扩张与可靠性欠账并行”的特征，Windows、桌面端、自动更新与远程协同是最普遍的短板。企业合规、可观测性和权限可配置化正在从加分项变成平台级门槛。

## 2. 各工具活跃度对比

| 工具 | Release 情况 | Issues 数 | PR 数 | 今日状态摘要 |
|---|---|---:|---:|---|
| Claude Code | v2.1.293 | 45（全量趋势分析；12 条热点） | 8（24h 更新） | Haiku 5.5 默认；桌面/权限/成本热点集中 |
| OpenAI Codex | rust-v0.161.0 正式；0.162 alpha | 43 | 50（多为 bot CLOSED） | Windows 沙箱 error 32 爆发；热度最高 |
| Gemini CLI | v0.65.0-nightly | 10（Top10，未披露全量） | 10（Top10，未披露全量） | 子代理 P1 可靠性；沙箱/认证/渲染密集修复 |
| DeepSeek Reasonix | Studio v2.30.0；v1.39.8 | 18 | 50 | 双线发布；工作区租约、压缩 RFC、多端问题 |
| OpenCode | 无 | 8（24h 更新） | 10（日报纳入） | 服务稳定性、错误可见性、插件契约 |
| Deepseek Harness | 无 | 0 | 0 | 过去 24h 无活动 |
| Hermes | 无 | 7（24h 更新） | 50（24h 更新） | Gateway 重构、会话一致性、桌面稳定性 |
| OpenClaw | 无 | 7（24h 更新） | 10+（另有 FRV 批量） | P0 Windows 更新阻塞；质量收敛期 |

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **静默失败与错误可见性** | Claude Code、Codex、Gemini CLI、Reasonix、OpenCode、OpenClaw | routines 不触发无日志、hook 异常放行、`codex doctor` 误报、子代理“假成功”、会话错误不进时间线。失败必须可见、可诊断。 |
| **权限/沙箱精度** | Claude Code、Codex、Gemini CLI、OpenCode、Reasonix、Hermes | 既要安全默认，也要可配置例外：deny 规则绕过、密码输入 opt-in、Windows 沙箱 ACL 自锁、MCP fail-open、`permission.ask` 文档契约不一致。 |
| **上下文/长会话治理** | Claude Code、Codex、Gemini CLI、Reasonix、OpenCode、OpenClaw | compaction 后状态丢失、auto-compaction 循环、图像负载膨胀、doom loop、CJK 大库查询、AST 感知检索。长会话需要架构级方案。 |
| **子代理/多 Agent 可靠性** | Claude Code、Gemini CLI、Codex、Reasonix、OpenClaw | MAX_TURNS 误报 GOAL、Generalist Agent 挂起、Dot 任务缺 Computer Use、subagent 模型优先级、worker 目标校验。 |
| **Agent 成本与推理强度控制** | Claude Code、OpenCode、Reasonix | per-call `effort`、昂贵 agent 生成前确认、自定义 cost tiers、模型切换与任务生命周期解耦。从“能用”转向“可控成本”。 |
| **跨平台/桌面/远程协同** | Claude Code、Codex、Gemini CLI、Reasonix、OpenCode、Hermes、OpenClaw | Remote Control 会话丢失、Windows 进程泄漏、iPad 冻结、Wayland 失败、macOS 闪烁、Windows Control UI 更新阻塞。 |
| **更新/发布回归** | Claude Code、Codex、Reasonix、OpenClaw、Gemini CLI | 自动更新后启动失败、沙箱崩溃、会话离线、主程序弹错。自动更新正在成为信任消耗点。 |
| **插件/MCP/Skills 生态治理** | Claude Code、Gemini CLI、OpenCode、Hermes、OpenClaw | MCP 隐私改写、工具数超 128、插件 Effect 实例分裂、skills 安装源标识符、Skill Workshop 自学习闭环。 |
| **可观测性与诊断** | Codex、Gemini CLI、Claude Code、OpenClaw | OTLP 自定义头、tool 注册直方图、prompt 前缀兼容测试、subagentStatusLine、QA/FRV 流水线。 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线/生态特征 |
|---|---|---|---|
| Claude Code | 企业级 Agent 编排、权限/MCP/远程控制、成本护栏 | 专业开发者、企业团队 | 官方闭源 CLI + managed settings/HIPAA + hook/plugin；强调安全与合规 |
| OpenAI Codex | OpenAI 模型生态、Computer/Browser Use、多 Agent V2、Bedrock | OpenAI 企业用户、跨平台开发者 | Rust CLI + 沙箱完整性体系 + Bazel/Cargo 双构建；平台稳定性承压 |
| Gemini CLI | 开源 CLI、AST 代码理解、子代理/Skills、bash 亲和 | Google/Gemini 开发者、开源社区 | 夜间版快速迭代 + EPIC 研究线；沙箱、认证、渲染同步加固 |
| DeepSeek Reasonix | 多端 Studio/Desktop/CLI、服务商管理、图表、并发租约 | 中文/多 provider/桌面用户 | Studio+桌面+CLI 一体化；RFC 驱动，压缩与租约治理突出 |
| OpenCode | 多 provider、插件、TUI/Web/语音、成本 tier | 极客、多模型用户 | 开源插件化，终端与 Web 并重；强调错误可见与插件契约 |
| Hermes | Gateway 统一会话、远程/多 profile、ACP、SQLite 大库、Vault | 本地优先、自动化高级用户 | Gateway 重构 + ACP external-runtime 契约；会话强一致与大库性能 |
| OpenClaw | 编排自动化、Control UI、cron/hooks/skills、发布 QA | 团队自动化、运维用户 | 发布工程与 Skill Workshop 改造；P0 更新阻塞需优先解决 |
| Deepseek Harness | 暂无动态 | — | 过去 24h 无活动，社区/迭代信号缺失 |

## 5. 社区热度与成熟度

- **最高热度**：OpenAI Codex 与 Claude Code。Codex 出现 64 评论、50 评论级 Issue，且 50 个 PR 集中更新；Claude Code 45 条 Issue 全量分析，热点评论 15–20 条，但 PR 侧仅 8 条，更多是问题暴露而非修复落地。
- **快速迭代**：Gemini CLI 夜间版持续发布，P1 子代理问题密集；Reasonix 双线发布 + 50 PR，Studio/Desktop/CLI 同步推进；Hermes 50 PR 更新，Gateway 所有权和会话状态重构明显。
- **质量收敛期**：OpenClaw 出现 P0 Windows 更新阻塞和会话创建全量失败回归，PR 多为 FRV/QA 修复，处于发布前清理阶段。OpenCode 无 Release，围绕服务稳定性、错误呈现和插件契约做补强，体量较小但方向清晰。
- **成熟度判断**：Claude Code、Codex 用户规模和生态成熟度领先，但桌面端、跨平台、自动更新可靠性尚未收敛；Gemini CLI、Reasonix、Hermes、OpenClaw 处于高迭代/架构调整期；Deepseek Harness 当前无活动。整体看，**没有工具在“多端协同 + 权限沙箱 + 长会话治理”上完全闭环**。

## 6. 值得关注的趋势信号

1. **“假成功”比崩溃更危险**：Gemini 子代理 MAX_TURNS 误报 GOAL、Claude routines 静默失败、Codex safety-pause 失步说明，Agent 可信度取决于状态语义是否真实。选型时应重点看终止原因、错误日志和可自证诊断。
2. **权限与沙箱成为平台核心能力**：安全默认值必须支持受控例外，同时 deny/hook/MCP 不能静默失效。企业部署需审计权限规则、hook 异常策略和 MCP 数据链路。
3. **上下文治理从优化项变成架构项**：compaction、doom loop、AST 检索、大库查询限制表明，长会话不能只靠“塞更多 token”，需要外置任务状态、分层记忆和可控制的压缩策略。
4. **多 Agent 进入成本与强度控制阶段**：per-call `effort`、昂贵 agent 确认、subagent 模型优先级、cost tier 等需求集中出现。开发者应设置预算、模型分级和人工审批点。
5. **自动更新是信任高危区**：Codex、Reasonix、OpenClaw、Claude Code 均出现更新后会话丢失、启动失败或沙箱崩溃。生产环境建议固定版本、灰度发布并保留回滚。
6. **跨平台一致性决定采用门槛**：Windows 沙箱、Remote Control、iPad、Wayland、macOS 渲染等问题跨工具重复出现。企业评估时不能只看 macOS/Linux 演示环境。
7. **插件/MCP/Skills 需要供应链治理**：工具数量上限、安装源标识、文档化 hook 未生效、MCP 隐私改写，说明生态扩张后必须锁定版本、最小权限、明确契约。
8. **可观测性成为一等公民**：OTLP、tool 注册指标、prompt 前缀兼容测试、错误时间线等正在进入核心 PR。对开发者而言，优先选择能导出遥测、能解释失败、能追踪子代理轨迹的工具。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> **数据说明（重要）**：本次 PR 数据中评论数与点赞数均为 `undefined`/`0`，无法按评论量直接排序。因此"热度"采用综合推断口径：**与高讨论度 Issue 的关联强度 + 更新活跃度 + 影响范围（安全/平台/基础设施）**。Issues 的评论/点赞数据完整可用，是本次分析的主要信源。

---

## 一、热门 Skills 排行（Top 8）

| 排名 | Skill / PR | 功能 | 讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 加固套件** [#1298](https://github.com/anthropics/skills/pull/1298) · [#1961](https://github.com/anthropics/skills/pull/1961) · [#1681](https://github.com/anthropics/skills/pull/1681) | 修复触发评测隔离、Windows 运行时失败；加固 eval viewer（脚本逃逸、DNS 重绑定、跨站 POST）；支持脚本直接执行 | 与 Issue [#1383](https://github.com/anthropics/skills/issues/1383)、[#1394](https://github.com/anthropics/skills/issues/1394)、[#556](https://github.com/anthropics/skills/issues/556) 形成"评测链路全面失真"议题群，是当前**最密集的缺陷修复带** | OPEN |
| 2 | **mcp-builder 兼容修复** [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2.0.0` 的 `streamable_http_client` 改名与自定义 header 传参方式 | 对应 Issue [#1390](https://github.com/anthropics/skills/issues/1390)（评测对真实 MCP server 恒判 0/N）——MCP 是 Skills 能力扩展的关键路径，修复优先级高 | OPEN |
| 3 | **文档技能矩阵扩展** [#1734](https://github.com/anthropics/skills/pull/1734) · [#1792](https://github.com/anthropics/skills/pull/1792) · [#486](https://github.com/anthropics/skills/pull/486) · [#514](https://github.com/anthropics/skills/pull/514) · [#538](https://github.com/anthropics/skills/pull/538) | docx 孤立批注检测、LibreOffice 超时上报、ODT 读写、排版质量控制（孤行/寡行/编号对齐）、pdf 大小写引用修复 | 官方文档技能（docx/pdf）稳定性问题集中爆发，同时社区在补 ODT、排版等**官方未覆盖的格式与质量维度** | OPEN |
| 4 | **notion-spec-to-implementation** [#1245](https://github.com/anthropics/skills/pull/1245) | 把产品/技术规格文档转化为 Notion 可执行任务，含验收标准与进度追踪 | 命中"规格→实现"这一**工作流自动化主赛道**，同 PR 还捆绑了 quantitative-resume-auditor | OPEN |
| 5 | **md2video-audio** [#1703](https://github.com/anthropics/skills/pull/1703) | Markdown 经 Marp 生成幻灯片 + 拟真配音，零成本产出 MP4 | "文档 → 富媒体"的内容再加工方向，社区对**多模态输出**兴趣明显 | OPEN |
| 6 | **AWT (AI Watch Tester)** [#822](https://github.com/anthropics/skills/pull/822) | 赋予 Claude 视觉与浏览器控制能力，零代码生成并执行 E2E 测试 | E2E 测试生成是长期空白，但自 3 月开启后更新缓慢，属**高价值低推进** | OPEN |
| 7 | **scnet-hpc** [#1615](https://github.com/anthropics/skills/pull/1615) | 通过 profile 化 SSH + Slurm 操作 SCNet 超算集群 | 垂直行业基础设施技能，反映社区希望 Skills **触达生产环境而非仅本地脚本** | OPEN |
| 8 | **proofcore-contract-auditor** [#1771](https://github.com/anthropics/skills/pull/1771) | Solidity/Rust 合约静态分析 + TON 链上审计存证 | Web3 垂直领域首个成规模提案，但带商用协议绑定，**官方纳入意愿存疑** | OPEN |

---

## 二、社区需求趋势（来自 Issues）

**1. 信任边界与供应链安全 —— 绝对第一诉求**
[#492](https://github.com/anthropics/skills/issues/492)（43 条评论，全场最高）指出社区技能以 `anthropic/` 命名空间分发构成**官方身份仿冒**，用户可能对非官方技能授予高权限。配套问题包括 eval viewer XSS（[#1394](https://github.com/anthropics/skills/issues/1394)）、`shell=True` 命令注入 CWE-78（[#1980](https://github.com/anthropics/skills/pull/1980)）。

**2. 组织级分发与协作**
[#228](https://github.com/anthropics/skills/issues/228)（16 评论 / 8 👍）要求 Claude.ai 内支持企业共享技能库，取代"下载 .skill → Slack 传文件 → 手动上传"的原始流程；[#189](https://github.com/anthropics/skills/issues/189)（9 👍，全场最高赞）则抱怨 `document-skills` 与 `example-skills` 内容重复污染上下文窗口。

**3. 评测与触发机制不可信**
[#556](https://github.com/anthropics/skills/issues/556)（12 评论 / 7 👍）报告 `run_eval.py` 触发率为 **0%**；[#1383](https://github.com/anthropics/skills/issues/1383) 列出六项基准静默失败（布局不匹配、增量反转、Windows 触发失效、技能遮蔽）。**元工具自身不可验证**是生态最大隐患。

**4. 上下文窗口经济学**
[#1487](https://github.com/anthropics/skills/issues/1487) 指出 `claude-api` 技能单次工具调用即注入约 **156k tokens** 直接耗尽上下文；[#1329](https://github.com/anthropics/skills/issues/1329) 提出 compact-memory（符号化压缩代理状态）——社区正从"能做什么"转向"**上下文成本是多少**"。

**5. 垂直与企业集成**
SharePoint 权限内嵌 SKILL.md 的安全质疑（[#1175](https://github.com/anthropics/skills/issues/1175)）、Notion 规格落地、HPC/Slurm 调度、前端构建链（pnpm ≥10.1 失效，[#1362](https://github.com/anthropics/skills/issues/1362)）。

**6. 元技能（Meta-Skills）**
[#83](https://github.com/anthropics/skills/pull/83) 提交 skill-quality-analyzer 与 skill-security-analyzer；[#1385](https://github.com/anthropics/skills/issues/1385) 提出三阶段推理质量门；[#412](https://github.com/anthropics/skills/issues/412) 提案 agent-governance（已 CLOSED）。**"用 Skills 治理 Skills"** 成为稳定子主题。

---

## 三、高潜力待合并 Skills

| 优先级 | PR | 理由 |
|---|---|---|
| ★★★★★ | [#1977](https://github.com/anthropics/skills/pull/1977) algorithmic-art `wrapAround()` | 单行取模修复，明确关闭 Issue [#1897](https://github.com/anthropics/skills/issues/1897)，零争议，**最可能近期合并** |
| ★★★★★ | [#1730](https://github.com/anthropics/skills/pull/1730) claude-api 死链替换 | 纯文档修正，已 `curl -sI -L` 验证 HTTP 200，3 处 404，风险极低 |
| ★★★★☆ | [#1980](https://github.com/anthropics/skills/pull/1980) webapp-testing 去 `shell=True` | 安全修复（CWE-78），改动局部于 `with_server.py`，符合官方安全偏好 |
| ★★★★☆ | [#1742](https://github.com/anthropics/skills/pull/1742) mcp-builder 兼容 | 解决主线阻塞（评测恒 0/N），Fixes #1668，但涉及依赖版本策略需维护者拍板 |
| ★★★☆☆ | [#1681](https://github.com/anthropics/skills/pull/1681) skill-creator 独立执行 | 修复 `ModuleNotFoundError` + 陈旧 docstring，与 #1298/#1961 构成同一文件的修复簇，可能被合并处理 |
| ★★★☆☆ | [#1298](https://github.com/anthropics/skills/pull/1298) + [#1961](https://github.com/anthropics/skills/pull/1961) | 改动面大、涉及 Windows 与安全模型，需更多评审，但议题热度最高 |
| ★★☆☆☆ | [#538](https://github.com/anthropics/skills/pull/538) pdf 大小写引用 | 8 处 `REFERENCE.md`→`reference.md`，修复大小写敏感文件系统，但已开放 7 个月无进展 |
| ★★☆☆☆ | [#525](https://github.com/anthropics/skills/pull/525) pyxel 复古游戏 | 作者为 Pyxel 原作者（kitao），权威性高，但自 3 月开放至今更新稀疏 |

> **观察**：修复类 PR 的合并概率显著高于新增 Skill 类。新增 Skill（#1245、#1703、#1771、#486、#822）普遍存在"开放时间长、更新停滞"特征，反映官方对**第三方 Skill 纳入标准尚未明确**——这与 #492 的信任边界争议互为因果。

---

## 四、Skills 生态洞察

> **当前社区最集中的诉求，是"可信赖的 Skill 治理"：既要官方给出命名空间、组织分发与评审准入的信任规则（#492/#228），也要让评测、触发、打包等元工具链从"静默失真"走向可验证（#556/#1383/#1298）——安全与可验证性，已取代功能数量成为 Skills 生态的第一瓶颈。**

---

**附：数据局限提示**
本报告未能使用 PR 评论数排序（字段缺失），且所有 PR👍均为 0，可能存在平台侧数据采集不全。若需精确定位"评论最多"的 PR，建议补充抓取 GraphQL `comments.totalCount` 与 `reactions` 字段。

---

# Claude Code 社区动态日报 · 2026-10-08

> 数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)

---

## 一、今日速览

1. **v2.1.293 发布**，Claude Haiku 5.5 正式成为 Anthropic API 默认 Haiku 模型，1M 上下文 + 极低定价，同时 `subagentStatusLine` 增加 `agentType` 字段。
2. 社区焦点集中在**桌面端可靠性**：Remote Control 会话丢失、计划任务（routines）静默失败、Windows 进程堆积三条独立问题持续发酵。
3. **Agent 成本与权限控制**成为新趋势：`Agent` 工具缺少 per-call `effort` 参数（24 👍）、昂贵 agent 缺少用户确认（8 评论）成为高票需求。

---

## 二、版本发布

### v2.1.293

| 项目 | 内容 |
|---|---|
| **新模型** | 新增 Claude Haiku 5.5（`claude-haiku-5-5`），成为 Anthropic API 上的默认 Haiku 模型 |
| **规格** | 1M 上下文窗口；$0.10 / $0.50 每 Mtok；超过 100K token 的 prompt 按 $0.50 / $2.50 计费 |
| **可观测性** | `subagentStatusLine` payload 新增 `agentType` 字段，脚本可区分自定义 subagent 类型 |

**分析**：Haiku 5.5 的分层定价（100K 以下与以上两档）明显是为长上下文场景设计的成本护栏；`agentType` 字段则为多 agent 编排的外部工具链补齐了身份识别能力，属于对 agent 生态的实用性补强。

---

## 三、社区热点 Issues

### 🔥 高热度（评论数 Top）

**1. #66010 [OPEN] GMail MCP 将 URL 重写为 Google 跟踪链接（隐私）**
- 作者 @potiuk | 20 评论 | 7 👍
- 自 6 月 5 日起，GMail MCP 会在处理过程中把 URL 替换为 Google 跟踪 URL。被标记为 `[PRIVACY]`，是当前评论数最高的开放 Issue，说明企业用户对 MCP 数据链路中的隐式改写高度敏感。
- 🔗 https://github.com/anthropics/claude-code/issues/66010

**2. #57286 [OPEN] Remote Control 初始化失败**
- 作者 @gamsy1 | 16 评论 | 4 👍 | macOS
- 报错 `Remote Control failed to connect: Remote Control initialization failed`。尽管被标记 duplicate，仍持续有人跟进，反映远程控制是移动端/多端协同的核心链路。
- 🔗 https://github.com/anthropics/claude-code/issues/57286

**3. #70555 [OPEN] 工作状态无法跨 context compaction 与 `/clear` 存活**
- 作者 @alfmarkel | 15 评论 | 0 👍
- 长会话中助手「越用越笨」：重复推导、遗忘进行中的线程、`/clear` 后完全不知道上下文。这是 LLM Agent 领域的**结构性痛点**，也是 15 条评论仍无人给出官方方案的原因。
- 🔗 https://github.com/anthropics/claude-code/issues/70555

**4. #78160 [OPEN] 硬性阻止输入密码，破坏合法开发/测试流程**
- 作者 @kauki42 | 13 评论 | **21 👍** | Windows
- 即使是在开发者自己的本地应用、自己的测试服务器、使用文档化的测试账号，Claude Code 也拒绝在登录表单中输入密码。作者要求提供「权限门控的 opt-in」开关。高赞说明这是**安全默认值与可用性的经典冲突**。
- 🔗 https://github.com/anthropics/claude-code/issues/78160

### ⭐ 高价值需求（👍 最多）

**5. #77298 [OPEN] 为 Agent (Task) 工具增加 per-call `effort` 参数**
- 作者 @riptscripts | 8 评论 | **24 👍**（本批次最高赞）
- 现状：`Agent` 工具支持 per-call `model` 覆盖，但不支持 `effort`；想调整单个 subagent 的推理强度必须预写完整 agent 定义文件。这是多 agent 编排场景下非常具体的效率诉求。
- 🔗 https://github.com/anthropics/claude-code/issues/77298

**6. #95313 [OPEN] 请求：生成昂贵 agent 前需用户确认**
- 作者 @burneramina-stack | 8 评论
- 涉及 `area:cost`、`area:agents`、`area:permissions` 三个领域——成本失控正在成为 agent 自主编排的副作用，社区希望有前置确认机制。
- 🔗 https://github.com/anthropics/claude-code/issues/95313

### 🖥️ 桌面端与计划任务

**7. #95967 [OPEN] 计划任务（routine）运行不再出现在桌面侧边栏或 Remote Control**
- 作者 @mannyb223 | 8 评论 | 6 👍 | macOS
- 原本每次 routine 运行都会作为一个正常 session 出现，现在完全不可见，导致无法接管或继续该运行。
- 🔗 https://github.com/anthropics/claude-code/issues/95967

**8. #95966 [OPEN] 计划任务静默跳过触发窗口**
- 作者 @Bryan0172 | 8 评论 | Windows
- 持续 5 天（9/17–9/21）的观测：任务未按时触发，无报错、运行历史无记录、`nextRunAt` 与宿主机器和调度引擎均显示正常。**静默失败**是最难排查的一类问题。
- 🔗 https://github.com/anthropics/claude-code/issues/95966

**9. #100106 [OPEN] 桌面端自动更新重启后丢弃所有 Remote Control 会话**
- 作者 @shwankim7 | 1 评论 | macOS | 2026-10-07 新提
- 夜间自动更新重启后，所有已连接 Remote Control 的 Code 会话全部离线，除非本地逐个打开否则不会重连。与 #96220（Windows 平台同类问题）形成跨平台印证。
- 🔗 https://github.com/anthropics/claude-code/issues/100106

**10. #96299 [OPEN] Windows：`claude.exe` 会话进程持续累积、永不终止**
- 作者 @moshehik | 7 评论 | `perf:memory`
- 会话结束或关闭后，后台进程仍在堆积，占用 RAM 与磁盘，一个工作日下来影响显著。
- 🔗 https://github.com/anthropics/claude-code/issues/96299

### 🔐 权限与安全（新提交）

**11. #100349 [OPEN] `permissions.deny` Bash 规则在双引号内含反斜杠时停止匹配**
- 作者 @vendeesign | 0 评论 | `has repro` | Windows | v2.1.293
- 命令中出现反斜杠（即使规则模式本身不含反斜杠）会导致 deny 规则失效，**命令被直接放行**。属于安全绕过类缺陷，值得优先关注。
- 🔗 https://github.com/anthropics/claude-code/issues/100349

**12. #96662 [OPEN] Auto Mode 分类器在多 agent 仓库工作流中误报**
- 作者 @JeffreyBai | 3 评论 | 2 👍 | Windows | `area:permissions`
- 近期更新后误报率上升，正当的多 agent 操被拦截。
- 🔗 https://github.com/anthropics/claude-code/issues/96662

> 注：本批次另有大量 7 月底提交的 Issue 在 10-07 被批量标记为 `stale` 并关闭（#82605 / #82606 / #82607 / #82617 / #82622 / #82625 / #82634 / #82638 等），涵盖 subagent 中段终止、Bash 大输出 token 有损重写、org marketplace 插件更新非原子化、compact 后文件补全损坏等问题。这些关闭**并非因为已修复**，需留意其中的长期隐患。

---

## 四、重要 PR 进展

> 过去 24 小时内更新的 PR 共 8 条，以下为全部条目。

**1. #82320 [OPEN] 修复 `examples/gateway/aws/setup.sh` 在 macOS 自带 bash 3.2 上中止**
- 作者 @Yyunozor
- 第 66 行使用 `${DIST_SHA256,,}`（bash 4 大小写改写展开），macOS 的 `/bin/bash` 为 3.2，脚本在参数检查前就崩溃。
- 🔗 https://github.com/anthropics/claude-code/pull/82320

**2. #86746 [OPEN] fix(security-guidance)：保留 Python 探测错误信息**
- 作者 @aayush598
- `sg-python.sh` 此前把探测 stderr 重定向到 `/dev/null`，当 `python3` / `python` / `py -3` 全部失败时用户只看到泛化错误。修复 #86709。
- 🔗 https://github.com/anthropics/claude-code/pull/86746

**3. #85323 [OPEN] fix(plugin-dev)：解析 YAML block scalar 形式的 agent description**
- 作者 @erichanwang
- `validate-agent.sh` 现可正确测量多行 `description: |` / `description: >` 的缩进内容，而非把标量标记当作完整描述。
- 🔗 https://github.com/anthropics/claude-code/pull/85323

**4. #84364 [OPEN] fix(hookify)：PretoolUse hook 异常时 fail closed**
- 作者 @alifakbxr | **安全相关**
- 修复一个漏洞：规则求值抛异常（如 ImportError）时 hook 以 status 0 退出，导致被门控的工具**被放行**。改为返回 `permissionDecision: 'deny'`。
- 🔗 https://github.com/anthropics/claude-code/pull/84364

**5. #85716 [OPEN] fix(hookify)：从祖先 `.claude` 目录加载规则，防止静默绕过**
- 作者 @alifakbxr | 修复 #85613
- 解决 hookify 插件的静默失效模式，确保上层目录的安全规则不会被跳过。
- 🔗 https://github.com/anthropics/claude-code/pull/85716

**6. #100293 [OPEN] 新增 HIPAA managed-settings 示例**
- 作者 @sarahdeaton | 2026-10-07 新提
- 新增 `examples/managed-settings/`：包含 `hipaa-baseline.json`、`managed-mcp.lockdown.json` 及 README，用于限制会话内容离开开发者机器的路径。**呼应 Issue #66010 的隐私关切**，说明企业合规配置正在成为官方示例的一等公民。
- 🔗 https://github.com/anthropics/claude-code/pull/100293

**7. #41447 [OPEN] feat: open source claude code ✨**
- 作者 @gameroman
- 3 月底提交、持续有人推动的长期 PR，一次性关闭 #59 / #456 / #2846 / #22002 / #41434 等多个早期 Issue。虽落地可能性低，但反映了社区对开源/自托管的持续呼声。
- 🔗 https://github.com/anthropics/claude-code/pull/41447

**8. #99206 [CLOSED] diff：停靠面板起始行偏移修正**
- 作者 @poteat
- 修复停靠模式下 `/diff` 面板头部上方多出的空白行——引擎现为停靠面板保留首行作为关闭标记。
- 🔗 https://github.com/anthropics/claude-code/pull/99206

---

## 五、功能需求趋势

从全部 45 条 Issue 中提炼，社区关注方向排序如下：

| 方向 | 代表 Issue | 趋势解读 |
|---|---|---|
| **多端协同可靠性** | #57286, #100106, #96220, #95967 | Remote Control 在自动更新/重启后状态丢失是**跨平台通病**（macOS + Windows 均有报告），已成为桌面端最高频抱怨 |
| **计划任务（routines）健壮性** | #95967, #95966, #100317 | 三类独立故障：不显示、不触发、模型配置被忽略。核心问题是**静默失败**——无日志、无错误、无痕迹 |
| **上下文与内存连续性** | #70555 | 长会话「变笨」、compaction 与 `/clear` 后状态全失，是最接近 AI Agent 本质的架构级需求 |
| **Agent 控制粒度** | #77298, #95313 | 从「能不能用 subagent」转向「如何精确控制 subagent 的成本与推理强度」，per-call `effort` + 成本确认是明确诉求 |
| **安全默认值与可用性平衡** | #78160, #100349, #350, #84364 | 一边是过度拦截（密码输入、Cyber Safeguards 误报），一边是拦截失效（deny 规则绕过、hook 异常放行），**权限系统的精度**成为焦点 |
| **隐私与数据链路可见性** | #66010, #100293 | MCP 代理链路中的 URL 改写引发隐私质疑；官方 meanwhile 补充 HIPAA managed-settings 示例 |
| **跨平台一致性** | #96299, #82320, #82622 | Windows 进程泄漏、macOS bash 3.2 兼容、Windows 插件 MCP server 不启动——**平台差异仍是主要 bug 来源** |
| **文档完整性** | #100347 | 文档遗漏 Agent 工具 per-invocation 的 `effort` 与 `model` 取值，与 #77298 需求互为印证 |

---

## 六、开发者关注点

**1. 静默失败是第一大痛苦源**
计划任务不触发却无任何记录（#95966）、hook 异常静默放行（#84364）、插件更新时 skill 已注册但文件缺失（#82607）——这类问题**无报错、无日志**，排查成本远高于崩溃类 bug。

**2. 成本可见性与可预测性不足**
Haiku 5.5 的分层定价（100K 阈值）说明官方已意识到 token 成本敏感度；但社区侧仍在要求「昂贵 agent 生成前确认」（#95313）与「per-call effort 控制」（#77298）。开发者希望**调用前**控制成本，而非事后看账单。

**3. 长会话的「智能衰减」被反复提及**
#70555 描述的「re-deriving、忘记在途线程、重复劳动、`/clear` 后失忆」被 15 条评论持续讨论但缺乏官方方案。这是当前 Agent 产品普遍存在的体验断层。

**4. 安全策略需要「可配置的例外」**
#78160 的 21 个 👍 很说明问题：开发者并不反对默认安全，反对的是**无法为自己的本地环境开例外**。与之相对，#100349 暴露的 deny 规则绕过则说明例外机制一旦实现，匹配精度必须可靠。

**5. 桌面端与远程协同是活跃开发面**
本批次中桌面端相关 Issue（`area:desktop`）占比最高，且多为 9 月底至 10 月初的新报告，说明该功能仍在快速迭代期，稳定性尚未收敛。

**6. 存量 Issue 被批量 stale 关闭**
多条 7 月底提交的实质性问题在 10-07 被统一关闭，其中包含 subagent 中段终止（#82605）、Bash 输出 token 有损重写（#82606）、org 插件更新非原子化（#82607）等。**关闭 ≠ 修复**，社区对这批问题的真实状态仍需跟踪。

---

*日报生成时间：2026-10-08 · 数据窗口：过去 24 小时*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 · 2026-10-08

---

## 一、今日速览

今日主线是 **0.161.0 正式版发布**：GPT-6.1 Sol 成为内置与 Amazon Bedrock 目录的默认模型，Bedrock 侧新增多智能体 V2 与 Ultra reasoning 支持。与此同时，社区侧 **Windows 沙箱共享冲突（os error 32）集中爆发**，形成当日最高热度问题簇。PR 侧则密集落地了跨平台「沙箱完整性校验」体系与 Bazel 构建链路。

---

## 二、版本发布

**rust-v0.161.0（正式版）**
- **GPT-6.1 Sol 成为默认模型**：内置模型目录与 Amazon Bedrock 目录同步切换（#49318、#49339）。
- **Amazon Bedrock 能力扩展**：兼容模型支持多智能体 V2 与 Ultra reasoning；Bedrock Mantle 开始接受 AWS GovCloud 区域（#49345、#49813）。
- 支持从应用内登录 MCP 服务器（release notes 在此截断）。

**预发布通道**：`rust-v0.162.0-alpha.18` 与 `rust-v0.162.0-alpha.17.1` 相继打出，无附加说明，属于 0.162 迭代的常规 alpha 推进。

> 值得注意：部分 Windows 用户报告应用内嵌 CLI 已到 `0.162.0-alpha.2`（见 #51725），即桌面端已在使用 alpha 通道，这可能与下文沙箱问题的爆发有关联。

---

## 三、社区热点 Issues

1. **[#49458] Windows 下 "dot 启动的本地任务" 缺失 Computer Use 工具**（64 评论 / 👍24）
   https://github.com/openai/codex/issues/49458
   今日热度最高。普通本地 Codex 会话可用 Computer Use，但通过 Dot 启动的本地任务却拿不到该工具集，属于能力路由不一致。高评论数说明可复现面广，且已持续一周未收敛。

2. **[#51601] Windows 应用 26.1002.51308 沙箱 setup 失败：验证自身 runtime 时触发 sharing violation**（50 评论 / 👍18）
   https://github.com/openai/codex/issues/51601
   所有命令在执行前即失败（`helper_unknown_error: setup ...`）。这是今日「error 32」问题簇的源头之一，也是影响面最大的**阻断级**故障。

3. **[#33493] 本地压缩 v2 保留无界 input_image 负载，导致反复自动压缩**（28 评论）
   https://github.com/openai/codex/issues/33493
   7 月即创建、至今仍在更新，属于长期未修的上下文管理缺陷：图像密集型长会话会陷入 auto-compaction 循环。体现社区对**长会话内存/上下文治理**的持续不满。

4. **[#51590] Windows 沙箱打开运行中的 node_repl.exe 失败（error 32），Computer Use 与 shell 同时被阻塞**（19 评论）
   https://github.com/openai/codex/issues/51590
   与 #51601 同源，进一步定位到 `node_repl.exe` 的 ACL 更新环节，是定位根因的关键样本。

5. **[#41695] iPad App 访问远程 Codex 会话时持续冻结**（17 评论）
   https://github.com/openai/codex/issues/41695
   远程会话 + iPadOS 组合下的稳定性问题，跨端体验是当前明显短板。

6. **[#49873] Dot 安全暂停状态失步：自主执行继续，但人工控制/恢复被阻断**（12 评论 / 👍1）
   https://github.com/openai/codex/issues/49873
   **安全性优先级最高的 Issue**：safety-pause 生效但执行未真正停止，同时人类无法接管，属于「安全机制本身失效」而非普通 bug，需要官方尽快给出结论。

7. **[#41608] `codex doctor` 对合法分页 rollout 报 rollout_db_parity 警告**（12 评论）
   https://github.com/openai/codex/issues/41608
   诊断工具误报会削弱用户对 `codex doctor` 输出的信任度，也说明 rollout DB 一致性校验逻辑存在边界缺陷。

8. **[#50608] / [#50254] Windows「Organization settings could not be loaded」阻断启动**（6 + 5 评论）
   https://github.com/openai/codex/issues/50608 · https://github.com/openai/codex/issues/50254
   先于 UI 加载失败、app-server 守护进程无法拉起（`os error 5`），并伴有多例「旧版本正常、自动更新后损坏」的回归报告，指向发布流程的回归测试缺口。

9. **[#51707] Windows Chrome 扩展控制反复丢失 debugger/focus**（5 评论）
   https://github.com/openai/codex/issues/51707
   Browser Use 与 Computer Use 双通道同时受阻，浏览器自动化在 Windows 上的可靠性仍未达可用标准。

10. **[#32081] 为 Codex 内置浏览器增加 1Password 安全支持**（4 评论 / 👍6）
    https://github.com/openai/codex/issues/32081
    唯一进入前 30 的**功能需求类** Issue，且点赞数相对突出：用户希望在不必把凭据粘进 prompt 的前提下完成登录认证。

**其他值得留意的长尾**：#43158（macOS diff SIGKILL 遗留临时 Git 对象致磁盘耗尽）、#51725（更新后频繁卡死 + sandbox ACL 刷新失败）、#51869（建议用 gzip 检测输出 doom loop / dirty tokens）、#51201（托管 daemon 自动更新重启杀死进行中的 turn，并把线程权限从 Full access 回退为默认）。

---

## 四、重要 PR 进展

> 观察：过去 24 小时更新的 50 个 PR 几乎全部由 `copyberry[bot]` 提交且状态为 CLOSED，评论数缺失，呈现明显的**内部同步/批量合入**特征，而非社区外部贡献。以下为本批中技术含量最高的条目。

1. **[#51843] 在命令与文件系统操作前运行沙箱完整性检查**
   https://github.com/openai/codex/pull/51843
   将既有完整性检查接入本地命令准备、exec-server 进程准备、沙箱文件助手与文件打开路径，并把执行请求准备改为异步。这是今日沙箱系列 PR 的**总装线**。

2. **[#51842] 新增沙箱完整性 runner 及结果/耗时指标**
   https://github.com/openai/codex/pull/51842
   导出 `run_integrity_checks`，在 Linux/macOS/Windows 上检查当前文件系统策略是否允许写入「承载依赖」文件，并在阻塞线程上执行 —— 直接针对 Windows error 32 类故障的可观测性。

3. **[#51841] macOS Seatbelt 后端**
   https://github.com/openai/codex/pull/51841
   启用 `sandbox_integrity` 模块的 Seatbelt 后端，将 Codex 可执行文件与系统 Seatbelt 可执行文件列为关键依赖盘点对象。

4. **[#51840] Linux bubblewrap 后端**
   https://github.com/openai/codex/pull/51840
   新增依赖发现与策略准备逻辑，盘点 bundled/系统 `bwrap` 候选及 deny-glob 扫描器。

5. **[#51831] Windows MXC 沙箱完整性依赖与策略准备**
   https://github.com/openai/codex/pull/51831
   盘点 Codex 可执行文件、沙箱启动器与可用 `rg` 扫描器，复用 MXC 临时目录机制准备文件系统策略 —— 与 Windows 问题簇正面相关。

6. **[#51822] 修复 Windows runtime ACL 修复过程中的共享冲突**
   https://github.com/openai/codex/pull/51822
   限制对活跃 EXE/DLL 的 `MAXIMUM_ALLOWED` 打开范围，仅对需要抑制子进程继承的目录使用。**这是对今日最高热度 Issue 的直接修复尝试**，值得跟踪是否进入正式版。

7. **[#51835] 默认启用 code mode 中断**
   https://github.com/openai/codex/pull/51835
   将 `code_mode_interrupt` 标记为 stable 并默认开启：中断一个 turn 会终止活跃的 code mode cell 与嵌套工具调用。对用户体验是明显改善。

8. **[#51856] / [#51855] / [#51850] Bazel 与 Cargo 构建并行发布**
   https://github.com/openai/codex/pull/51856 · https://github.com/openai/codex/pull/51855 · https://github.com/openai/codex/pull/51850
   为 Linux/macOS/Windows 增加 Cargo + Bazel 双构建矩阵，Bazel 产物以 `-bazel` 后缀发布，覆盖签名、打包与产物校验全链路。属于构建基础设施的长期投入。

9. **[#51857] 新增 app-server prompt 前缀兼容性测试**
   https://github.com/openai/codex/pull/51857
   通过 `prompt_prefix_matches_release` 比对 instructions / tools 与已发布 CLI 的默认模型可见前缀，要求变更必须藏在默认关闭的 feature key 后面 —— 从工程上防止 prompt 静默漂移。

10. **[#51865] / [#51866] / [#51868] 交互与可观测性细节**
    https://github.com/openai/codex/pull/51865 · https://github.com/openai/codex/pull/51866 · https://github.com/openai/codex/pull/51868
    插件 mention 改用可读显示名（`@Postman`）且不再屏蔽同名 skill；多行异步提问按逻辑行分别换行并修正超链接范围；新增 `codex.tools.registered` 直方图，按 exposure / tool_mode 统计工具注册。

---

## 五、功能需求趋势

从全部 43 条 Issue 的标签分布与内容看，社区关注方向集中在：

1. **平台稳定性（尤其 Windows）压倒一切**：`windows-os` + `sandbox` + `app` 标签组合占据前 30 中的近半数，讨论焦点从「功能缺失」转向「应用根本无法执行命令」。
2. **Computer Use / Browser Use 的工具可用性**：Dot 任务、Chrome 扩展、Edge/ARM64 多路径均出现工具集缺失或控制丢失，工具暴露的一致性成为新的质量议题。
3. **远程与跨端体验**：iPad/iPhone 访问远程 Codex 会话冻结，说明远程执行的产品化程度仍不足。
4. **上下文与压缩治理**：图像负载导致的反复 compaction、输出 doom loop / dirty token 检测等需求浮现，社区开始要求模型输出层的「健康检查」。
5. **凭据与集成**：1Password 等密码管理器与内置浏览器的安全集成是唯一获得正向投票的功能请求。
6. **可观测性与诊断**：`codex doctor` 误报、tool 注册指标、prompt 前缀兼容性测试，反映维护者与用户都在推动「问题可自证」。

---

## 六、开发者关注点

- **升级回归是最大的信任消耗**：多个 Issue 呈现同一模式 —— 旧版本正常、自动更新后启动失败或沙箱崩溃（#50254、#49204、#51725）。**发布前的 Windows 回归验证缺口**是最紧迫的工程问题。
- **Windows 沙箱自锁**：Codex 进程自己持有 `node_repl.exe` 句柄，再尝试为其更新 ACL，导致 error 32，进而 Computer Use、shell、browser 全线不可用。用户已能精准指出根因并互相引用（#51590、#51851、#51862、#51875、#51879），修复压力明显（对应 PR #51822、#51843）。
- **权限与配置的持久性**：daemon 自动更新重启会把线程从 Full access 悄悄降级为默认权限（#51201），全局配置还会受启动目录影响（PR #51872），这类静默状态变更对自动化工作流风险很高。
- **安全机制自身的可信度**：#49873 中 safety-pause 未真正暂停且人工接管被阻断，是比普通崩溃更需优先澄清的问题。
- **长期未修的历史包袱**：如 #33493（7 月）、#14577（3 月，Windows ClearType 渲染模糊）仍在更新，说明部分体验类问题缺乏排期信号。
- **构建与发布链路正在重构**：Cargo → Bazel 双轨 + 沙箱完整性体系的大批合并，意味着后续几个版本可能出现新的平台兼容性波动，建议使用方留意 0.162 通道。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报
**日期：2026-10-08** | 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 一、今日速览

今日社区焦点集中在 **子代理（Subagent）可靠性与状态上报准确性** 上：多个 P1 级 Issue 反映子代理在达到 MAX_TURNS 后仍上报 "GOAL/success"、Generalist Agent 无限挂起等问题，严重误导用户判断。同时，围绕 **沙箱化执行、AST 感知代码检索、认证与会话持久化** 的 PR 密集提交，显示官方正系统性推进底层能力加固。夜间版 v0.65.0-nightly 已合入不受信任目录只读保护与会话恢复去重两个关键修复。

---

## 二、版本发布

### v0.65.0-nightly.20261007.gef59c532f

夜间构建版，包含两项修复：

- **fix(cli): 在不受信任文件夹中强制只读工作区设置**（[@jvargassanchez-dot](https://github.com/google-gemini/gemini-cli/pull/29583)）
  — 增强安全边界，避免在低信任度目录下加载可写工作区配置。
- **fix(core): 恢复会话时避免重复的工具响应轮次**（[@diegogodinezr](https://github.com/google-gemini/gemini-cli/pull/29583)）
  — 解决 session 恢复场景下工具调用响应重复、污染上下文的问题。

---

## 三、社区热点 Issues（Top 10）

### 1. 🔴 [P1] #22323 子代理 MAX_TURNS 恢复被误报为 GOAL 成功
[链接](https://github.com/google-gemini/gemini-cli/issues/22323) | 评论 13 | 👍 2

`codebase_investigator` 子代理在**尚未进行任何分析**、仅因触达最大轮次限制而中断时，却上报 `status: "success"` 和 `Termination Reason: "GOAL"`。这是本期讨论热度最高的问题——虚假的成功信号会掩盖真实失败，使用户误以为任务已完成。状态机语义错误是可信度级别的 Bug。

### 2. 🔴 [P1] #21409 Generalist Agent 无限挂起
[链接](https://github.com/google-gemini/gemini-cli/issues/21409) | 评论 8 | 👍 8

用户反馈只要 CLI 委派给通用代理，即便只是创建文件夹也会永久卡死（等待长达一小时）。**手动禁用子代理可绕过**。该问题 👍 数高，属高痛点、高复现率，是当前 Agent 架构最受关注的问题。

### 3. 🟠 [P2] #19873 通过零依赖 OS 沙箱化释放模型的 Bash 亲和力
[链接](https://github.com/google-gemini/gemini-cli/issues/19873) | 评论 9 | 👍 1

提出 Gemini 3 原生擅长 bash 工作流（grep/cat/sed/awk 链式操作），需在**不牺牲安全与 UX** 的前提下释放此能力，配合"执行后意图路由"。这是一份架构级提案，关乎 Agent 能力上限的设计方向。

### 4. 🔴 [P1] #21983 Browser Subagent 在 Wayland 下失败
[链接](https://github.com/google-gemini/gemini-cli/issues/21983) | 评论 4 | 👍 1

Linux Wayland 环境下 Browser Agent 直接报 `Termination Reason: GOAL` 后失败，反映浏览器代理在非 X11 桌面环境的兼容性缺口。

### 5. 🟠 [P2] #22745 评估 AST 感知的文件读取、搜索与代码库映射
[链接](https://github.com/google-gemini/gemini-cli/issues/22745) | 评论 7 | 👍 1

EPIC 级跟踪问题，探索 AST 感知工具能否：① 一次调用精确读取方法边界，减少轮次与 token 噪声；② 精准代码导航。与 #22746、#22747 构成一组 AST 工具链研究线，代表 Agent 检索范式的下一步演进。

### 6. 🟠 [P2] #21968 Gemini 主动使用 Skills 与子代理不足
[链接](https://github.com/google-gemini/gemini-cli/issues/21968) | 评论 7

用户反馈：即便注册了 gradle、git 等描述清晰的技能，模型**几乎不会主动调用**，除非显式指令。这直接影响自定义扩展体系的实用价值。

### 7. 🟠 [P2] #22267 Browser Agent 忽略 settings.json 覆盖
[链接](https://github.com/google-gemini/gemini-cli/issues/22267) | 评论 4

`AgentRegistry` 初始化时正确读取合并了配置，但 Browser Agent 运行时完全忽略 `maxTurns` 等全局/项目级覆盖项，属配置系统与实际执行层不一致的 Bug。

### 8. 🟠 [P2] #24246 工具数超过 128 时触发 400 错误
[链接](https://github.com/google-gemini/gemini-cli/issues/24246) | 评论 3

工具数量超限导致 API 400。随着 MCP Server 与 Skills 生态膨胀，工具集裁剪策略成为必须解决的扩展性瓶颈。

### 9. 🟠 [P2] #22672 Agent 应停止/劝阻破坏性行为
[链接](https://github.com/google-gemini/gemini-cli/issues/22672) | 评论 3 | 👍 1

模型在复杂 git 操作中倾向使用 `git reset`、`--force` 等危险命令，即使存在更安全的替代方案；在维护数据库资源时同样缺乏风险意识。属安全护栏类需求。

### 10. 🟠 [P2] #21924 终端 resize 场景下的高性能与抗闪烁
[链接](https://github.com/google-gemini/gemini-cli/issues/21924) | 评论 2

提出迁移至 `RenderStatic`、小批量更新历史项、配合 Ink RenderWorker 改造。终端渲染体验是高频日常痛点，与今日 PR #29629 呼应。另可关注 [#29669 登录认证成功却无法访问 CLI](https://github.com/google-gemini/gemini-cli/issues/29669) 的新增用户认证反馈。

---

## 四、重要 PR 进展（Top 10）

### 1. [OPEN] #29671 fix(cli): 持久化沙箱认证与会话
[链接](https://github.com/google-gemini/gemini-cli/pull/29671) | area/platform | size/l

跨沙箱容器调用持久化认证、目录信任与 session 状态，修复 #29461 中反复弹出的认证请求、会话丢失与信任重启循环。这是沙箱用户体验的关键补丁。

### 2. [OPEN] #29670 fix(core): 使流中重试退避可感知中止信号
[链接](https://github.com/google-gemini/gemini-cli/pull/29670) | area/agent | size/m

修复 ESC 取消请求后，`GeminiChat` 仍继续重试、仍发射 RETRY 事件与遥测的问题，让退避 sleep 响应 abort 信号。

### 3. [OPEN] #29672 修复 untrusted 标志误报
[链接](https://github.com/google-gemini/gemini-cli/pull/29672) | area/security | size/l

消除 shell 变量展开误判，以及 `ls -ld`、`grep -rn`、`git status` 等无害 POSIX 导航/检查命令触发的安全告警与确认中断——直接影响日常命令执行流畅度。

### 4. [CLOSED] #29655 fix(auth): 阻止无限验证与 OAuth 重试循环
[链接](https://github.com/google-gemini/gemini-cli/pull/29655) | priority/p2 | area/core

用户完成浏览器认证并回车后仍陷入验证/OAuth 无限循环。通过限制验证重试次数收敛该路径。与 Issue #29669 症状一致。

### 5. [OPEN] #29668 fix(core): 剥离前缀时保留 functionResponse 与 functionCall 元数据
[链接](https://github.com/google-gemini/gemini-cli/pull/29668) | area/core | size/m

修复 `stripToolCallIdPrefixes()` 丢失多模态 `parts`、`partialArgs` 及流式元数据的问题，避免工具调用链路信息在 ID 规范化时被破坏。

### 6. [OPEN] #29674 fix(vscode-ide-companion): 使 IdeServer.stop() 在 MCP 会话开启时正常返回
[链接](https://github.com/google-gemini/gemini-cli/pull/29674) | size/l

`stop()` 因等待 `http.Server.close()` 排空而永不 resolve，根因是 CLI 的 StreamableHTTPClientTransport 持有长连接。属 IDE 集成稳定性修复。

### 7. [OPEN] #29629 fix(cli): 限制待处理纯文本高度以减少流式闪烁
[链接](https://github.com/google-gemini/gemini-cli/pull/29629) | priority/p2 | area/core

在 `MarkdownDisplay` 中限制流式文本高度不超过终端高度，消除每次更新触发的全屏清屏重绘。与 Issue #21924 同源。

### 8. [CLOSED] #29641 feat(telemetry): 遥测配置支持自定义 OTLP Headers
[链接](https://github.com/google-gemini/gemini-cli/pull/29641) | priority/p2

支持向 OTLP HTTP/gRPC 端点传递自定义鉴权头，可对接 Grafana Cloud、Honeycomb、Datadog 及带鉴权的 OTel Collector，企业可观测性接入能力显著增强。

### 9. [OPEN] #29673 fix(core): 在 truncateString 中保留行终止符
[链接](https://github.com/google-gemini/gemini-cli/pull/29673) | area/core | size/s

修复 `truncateString` 丢弃 `\n`、`\r\n`、`\u2028` 及复杂 Unicode 字素簇的问题，同时将其计入 `maxLength` 预算。

### 10. [CLOSED] #29445 区分 MCP 启用配置"损坏"与"缺失"
[链接](https://github.com/google-gemini/gemini-cli/pull/29445) | priority/p1 | area/core

修复 `mcp-server-enablement.json` 损坏时 fail-open 的安全缺陷——用户主动禁用的 MCP Server 会被当作启用并暴露工具给模型。

**其他值得关注**：`#29638` 移除 VS Code 扩展启动时市场更新检查（加速激活）；`#29665` 为 gVisor 沙箱给出明确的网络隔离错误提示；`#29449` 新增 PkgDiet 技能，在 `npm install` 前自动检查依赖健康度与包体积；`#29612` 强制会话历史以非空 user turn 结尾并规范化请求内容。

---

## 五、功能需求趋势

| 方向 | 代表 Issue / PR | 说明 |
|---|---|---|
| **子代理可靠性** | #22323、#21409、#22267、#22232 | 状态上报失真、挂起、配置失效、锁恢复，是当前最高密度的痛点簇 |
| **沙箱与安全执行** | #19873、#29671、#29672、#29445 | 从 OS 级沙箱设计到信任边界、配置 fail-open 修复，安全加固持续升温 |
| **AST 感知的代码理解** | #22745、#22746、#22747 | 一组 EPIC 研究线，探索以 AST 替代文本级读取/搜索以提效降噪 |
| **上下文与 Token 经济** | #19561、#18836 | "Tactful Extraction" 分层检索、以持久化文件任务跟踪替代 WriteToDo |
| **终端渲染体验** | #21924、#29629 | resize 抗闪烁、流式渲染性能优化 |
| **IDE / 编辑器集成** | #29674、#29638、#29665 | VS Code Companion 启动速度、停机语义、沙箱提示 |
| **认证与会话持久化** | #29655、#29669、#29643 | OAuth 循环、缓存凭据、跨沙箱 session 丢失 |
| **Agent 自我认知与可观测性** | #21432、#22598、#21763 | 让 Agent 准确知道自身 CLI 参数/热键，并让子代理轨迹可分享、可调试 |
| **可扩展性治理** | #24246 | 工具数量膨胀触发的 API 上限问题，呼唤动态工具裁剪 |

---

## 六、开发者关注点

1. **"假成功"比失败更危险** — #22323 与 #21983 中，中断/失败被统一标为 `Termination Reason: GOAL`，掩盖了真实中断。开发者强烈要求终止原因细化与状态语义真实化，这是决定 Agent 输出是否可信的基础。

2. **子代理调用链缺乏透明度** — Bug 报告不含子代理上下文（#21763）、轨迹无法通过 `/chat share` 查看（#22598），调试与评估子代理行为极其困难。

3. **模型对自身工具/技能的"主动性"不足** — 不主动调用 Skills 与子代理（#21968）、不了解自身 CLI 参数与热键（#21432），暴露出系统提示与工具描述层面的优化空间。

4. **沙箱与配置文件的双重信任困境** — 沙箱内认证/会话不持久（#29671）、配置文件损坏时 fail-open（#29445）、无害命令被误报为不可信（#29672），安全机制在"过严"与"过松"之间尚未找到平衡点。

5. **交互式命令阻塞** — 创建 vite app 卡在交互式 prompt（#22465）、通用代理无限挂起（#21409），说明 Agent 对交互式 TTY 场景的处理仍不成熟。

6. **破坏性操作缺乏护栏** — `git reset` / `--force` / 数据库修改等高风险操作缺少主动劝阻（#22672），是企业级采用前必须解决的信任问题。

---

*本日报由 AI 工具自动整理，数据截至 2026-10-08。*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报
**日期：2026-10-08** · 数据来源：[github.com/esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)

---

## 一、今日速览

今日双线发布：**Studio v2.30.0** 完成服务商编辑表单重做并让 `render_chart` 可直接在对话中绘图，**稳定版 v1.39.8**（Desktop / CLI）集中修复了图片卡死会话、中断后会话无法打开、与 Studio 共用项目删除归档失败等一批长期问题。社区侧，**上下文压缩（context compaction）RFC #12309** 发布引发对长会话机制的讨论，同时**工作区写入租约 / 权限询问互相阻塞**成为今日最集中的痛点，已有 PR #12298、#11993 直接回应。

---

## 二、版本发布

### 1. Reasonix Studio v2.30.0（活跃开发线）
对应 CLI 归档 `v2.30.0` 由本版本构建。核心变更：

- **服务商表单重做**：编辑页新增未保存提示、还原按钮、「已保存」回执；测试结果显示在对应按钮旁，新增「测试已启用模型」按钮与汇总行；底部固定保存栏支持 `Ctrl/Cmd+S`（#12189、#12193、#12196、#12202）
- **表单安全网**：有未保存修改时切换服务或新增会询问；连接检查失败时给出分类原因（#12185、#12191）
- **新能力**：模型调用的 `render_chart` 可在对话内直接渲染为图表；新增「已完成未查看」标记与技能 `paths` 门控
- **修复**：多会话并发卡顿、压缩触发偏晚、一批设置面板草稿丢失

### 2. Reasonix v1.39.8 —— 稳定版（Desktop + CLI 同步）
修复清单较为硬核，多数为用户长期反馈：

- 未声明读图能力的模型被图片卡住后，**后续所有消息一并卡死**
- 回复被中断后**会话无法打开**
- QQ 审批请求收不到
- 与 Studio 共用的项目里，**删除和归档会话反复失败**
- 旧版恢复链一次归档
- 子代理工具调用错误地出现在主对话中
- Command Code 的一个偶发错误

> 🔗 [English changelog](https://reasonix.io/changelog/v1.39.8/?lang=en) · [完整更新日志](https://reasonix.io/changelog/v1.39.8/)

---

## 三、社区热点 Issues

1. **[#12309](https://github.com/esengine/DeepSeek-Reasonix/issues/12309) RFC: context compaction — 与同类 Agent 的对比与改进方向** `[rfc, agent, research]`
   作者 @esengine。横向调研 Claude Code、Codex CLI、Gemini CLI、opencode、Aider、Cline/Roo、OpenHands、Kimi CLI、Qwen Code、Cursor 等 12+ 个 Agent 的压缩策略，与 Reasonix 现状对比后提出改进清单。这是当前**唯一触及核心 Agent 架构**的正式 RFC，也是理解后续 compaction 相关 PR 的入口。

2. **[#11338](https://github.com/esengine/DeepSeek-Reasonix/issues/11338) 1.39.5 工具不能折叠** `[bug, desktop, v2, windows]`
   17 条评论，是本期**讨论最活跃**的问题（自 9-29 持续至今）。用户贴出「查看执行过程」时好时坏的表现，反映工具调用展示层的状态不一致，直接影响长任务的可读性。

3. **[#11693](https://github.com/esengine/DeepSeek-Reasonix/issues/11693) v1.39.7 项目级 session-catalog reconcile 循环（ready↔scanning 每 ~3s，WAL 94 MB）导致所有会话删除/归档失败** `[desktop, v2, config, windows]`
   已关闭。触发条件涉及 Studio 2.25.0 共用项目，现象是任何会话（含空闲、新建）删除/归档都报「该会话正在执行相同操作」。属于**数据层状态机 + 跨端共享目录**的复合缺陷，影响面极大。

4. **[#11581](https://github.com/esengine/DeepSeek-Reasonix/issues/11581) v1.39.6 归档 legacy 行会导入另一个恢复快照为新会话** `[desktop, windows, data-loss]`
   已关闭，标记 `data-loss`。#11309 的修复未覆盖该路径，用户描述为「产生 ~2.1 MB 重复」。这是**旧版会话迁移链**上的又一漏洞，涉及数据正确性。

5. **[#12337](https://github.com/esengine/DeepSeek-Reasonix/issues/12337) 任务 A 因权限询问卡住时，任务 B 的「当前写入被其他任务占用」不会解锁** `[bug, from-studio]`
   Studio 内反馈。用户进一步指出：工作空间默认是项目文件夹的**上级目录**而非项目本身，并发两个项目时理论上不该锁住整个工作空间。这是**租约粒度设计问题**的第一手证据，与今日 PR #12298、#11993 直接对应。

6. **[#12335](https://github.com/esengine/DeepSeek-Reasonix/issues/12335) 后台任务中无法切换模型** `[bug, from-studio]`
   Studio 内反馈。提示「任务正在运行，请先停止再切换模型」——当当前模型额度耗尽且后台有不可中断任务时，用户被彻底锁死。反映**模型切换与任务生命周期耦合过紧**。

7. **[#12315](https://github.com/esengine/DeepSeek-Reasonix/issues/12315) Studio 2.x 系列每次更新后启动主程序都会弹错，主程序启动失败** `[bug, from-studio]`
   版本 `v2.30.0`。属于**更新即不可用**级别的问题，对稳定版用户信心冲击最大。

8. **[#12312](https://github.com/esengine/DeepSeek-Reasonix/issues/12312) 进行中的会话完成后就消失了** `[bug, from-studio]`
   用户建议「进行中」列表应设置空闲阈值（如 1h 无动作才退出），而非任务完成立即退出。属于**会话列表语义**的体验设计争议。

9. **[#11859](https://github.com/esengine/DeepSeek-Reasonix/issues/11859) 未配置图像理解模型时提交被拒（submission not accepted）** `[bug, provider, windows, v3]`
   已关闭。用户尝试 `view_image` 本地截图时收到「no image understanding model is configured」，错误暴露时机晚、提示不指向根因。该问题已在 v1.39.8 中被修复。

10. **[#11617](https://github.com/esengine/DeepSeek-Reasonix/issues/11617) Command Code 反复报「请求格式错误 HTTP 400」** `[bug, v2, provider, windows]`
   持续对话即复现，用户判断为程序缺陷。与 v1.39.8 中「Command Code 的一个偶发错误」修复互相印证，说明该 provider 通道仍偏脆弱。

> 其他值得扫一眼：#12253（权限不询问且拒绝，建议改为请求时不下发 tool）、#12330（脑图任务走向展示板）、#12316（计划列表移到右上角）、#12321（内置浏览器打不开本地 HTML，已由 PR #12326 修复）、#12320（壁纸主题文字光晕）。

---

## 四、重要 PR 进展

1. **[#12341](https://github.com/esengine/DeepSeek-Reasonix/pull/12341) docs(release): Studio 2.31.0 notes** — @esengine
   为 2.31.0 打 tag 前补齐发布说明，确认本版含 native Windows ARM64、keep-awake、feedback levels 等功能，按 runbook P3 走版本小版本号。

2. **[#12340](https://github.com/esengine/DeepSeek-Reasonix/pull/12340) feat(studio): 拖拽本地文件夹到侧边栏即可添加项目** — @KHG420
   复用现有 workspace 流程，刷新目录树并基于 kernel 规范 root 打开空会话；侧边栏提供放置提示，并对被拒文件、多路径、浏览器拖入给出明确反馈。**工作区入口体验的重要补齐**。

3. **[#12322](https://github.com/esengine/DeepSeek-Reasonix/pull/12322) fix(compaction): 非简报式的摘要回复判定为失败摘要** — @esengine
   直指 #12309 的 F1 项。原因是 summarizer 请求只有 `[system, user]` 且以最后一条工具输出结尾，缺少收尾指令，导致模型有时「代入 Agent 角色」作答——真实运行样本中 **92 次摘要响应里有 12 次**出现该问题。

4. **[#12298](https://github.com/esengine/DeepSeek-Reasonix/pull/12298) fix(lease): 在等待 ask/审批时释放工作区写声明** — @esengine
   修 #11531。此前会话的写声明会一直持有到所有参与 run 结束，而审批提示会阻塞在 run 内部，等于**用户思考多久就锁多久**，其他会话全部被挡住。

5. **[#11993](https://github.com/esengine/DeepSeek-Reasonix/pull/11993) feat(lease): 为无声明路径的写入者提供跳过工作区租约的开关** — @keeyangyy
   回应 #8990、#8746。长构建或 CI 类写入者无法声明路径，此前只能干等；本 PR 增加可选开关，是**锁粒度细化**的关键一步。

6. **[#11996](https://github.com/esengine/DeepSeek-Reasonix/pull/11996) feat(memory): 按作用域开关跳过 remember 确认** — @keeyangyy
   `remember` / `forget` 属于需人工批准集合，此前唯一的豁免是基于内容的隐式规则。现提供用户可配置的分作用域开关，减少高频打断。

7. **[#12326](https://github.com/esengine/DeepSeek-Reasonix/pull/12326) fix(browser): 磁盘路径按文件打开，而非把盘符当作主机名** — @esengine
   修 #12321。原因是地址栏把非 `scheme://` 输入一律拼成 `http://`，`D:/DevCode/x.html` 变成主机名 `d` 从而 DNS 报错。

8. **[#12328](https://github.com/esengine/DeepSeek-Reasonix/pull/12328) feat(studio): 在会话导航右侧展示当前计划** — @KHG420
   回应 #12316。可在保持对话可见的前提下展开当前目标与实时计划，复用现有 Plan 渲染组件，同时保留 composer 中的计划入口。

9. **[#12336](https://github.com/esengine/DeepSeek-Reasonix/pull/12336) fix(tui): 在交互式终端中补回遥测同意与上报** — @esengine
   `42fff96b5` 移除旧交互会话后，首次运行的遥测同意与上报链路一并丢失，`runTUI` 从未调用 `startCLITelemetry`，导致 TUI 用户数据完全缺失。

10. **[#12329](https://github.com/esengine/DeepSeek-Reasonix/pull/12329) fix(studio): 已安装技能按来源分组** — @KHG420
    修 #11770。技能列表从混合展示改为 Mine / Project / Built-in 分组，自定义与未标注来源保留在各自分组，组内维持目录顺序（含已禁用技能）。

> 其他已合入/待审：#12103（在会话列表标记 1.x 来源会话）、#12327（composer 模型选择器当前模型置顶）、#12332（用户消息中预览已保存图片附件）、#12306（提示 `subagent_models` 条目优先级高于 Settings 行）、#12333（每日匿名 ping 重试与跨 UTC 日重发）、#12339（触摸设备上重写框与队列编辑器 Enter 换行）、#11991（按主机开关远程机器拨号与侧栏显示）、#12331（手机端未输入时压缩 composer 高度）。

---

## 五、功能需求趋势

从本期 18 条 Issue 与 50 条 PR 的标签分布看，社区关注集中在五个方向：

| 方向 | 代表 Issue / PR | 说明 |
|---|---|---|
| **并发与资源锁** | #12337、#11693、#12335 / #12298、#11993 | 工作区租约粒度过粗、审批期间长期持锁、跨项目误锁，是当前最集中的工程矛盾 |
| **上下文/长会话治理** | #12309 / #12322 | 从横向调研到具体修复，压缩质量被正式纳入架构议题 |
| **计划与任务可视化** | #12330（脑图）、#12316 / #12328 | 用户希望「任务走向」可被直观观察，而非埋在对话里 |
| **多模态与附件** | #11859 / #12332 | 图片理解的模型配置校验与附件回显是短板 |
| **跨端一致性与迁移** | #11581、#11693 / #12103 | Studio、Desktop、1.x/2.x 共用项目目录引发的状态与数据问题反复出现 |
| **移动端/触控体验** | #12338 / #12339、#12331 | 触摸设备上 Enter 行为、composer 高度等细节被持续打磨 |
| **服务商配置管理** | #11617 / #12189-#12202、#12306、#12327 | 表单、默认模型、子代理模型优先级、Command Code 通道稳定性 |

---

## 六、开发者关注点

1. **锁与阻塞是头号痛点。** 三条独立反馈指向同一根因：写声明跨越审批等待（#12337）、reconcile 循环让所有会话操作 `operation_busy`（#11693）、运行中任务锁死模型切换（#12335）。今日两个 lease PR 是正确方向，但**工作空间默认取项目上级目录**这一设定仍需重新评估。

2. **数据正确性问题的复现路径很隐蔽。** #11581 的 legacy 行归档复制快照、#11693 的 WAL 膨胀到 94 MB，都属于「看起来是 UI 报错、实际是数据层问题」。这类问题一旦进入稳定版，用户信任成本极高。

3. **更新即失败不可接受。** #12315 反映 2.x 系列每次更新后主程序启动弹错。对采用自动更新的桌面端产品，这是发布流程必须前置拦截的场景。

4. **权限交互设计存在明确分歧。** #12253 提出「不询问且拒绝，不如请求时干脆不下发 tool」，指向一个更本质的问题：当前审批流程既打断了任务，又没有给出可预期的结果。

5. **错误提示的时机与定位仍偏晚。** #11859 在发送后才告知「未配置图像理解模型」，#11617 的 HTTP 400 只说「通常是程序缺陷」。用户期望在配置阶段或提交前就得到可执行的指引。

6. **后台任务生命周期需解耦。** #12335 与 #12312 从两个角度提出同一诉求：任务运行状态不应反向决定用户可操作项（切模型、会话归属列表），而应设置超时或允许在受限模式下操作。

---

*日报生成时间：2026-10-08 · 数据窗口：过去 24 小时*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报（2026-10-08）

> 数据来源：github.com/anomalyco/opencode

---

## 一、今日速览

过去 24 小时无新版本发布，社区讨论集中在**服务稳定性与错误可见性**两条主线：Issue 侧出现了 OpenAI Provider 间歇性上游连接失败、`serve` 文件监听风暴导致进程终止、Windows 平台启动挂起等可用性问题；PR 侧则有一批由核心贡献者（kitlangton、Hona、rekram1-node）提交的 core/TUI/desktop 修复，重点围绕启动恢复、配置容错与错误呈现。

---

## 二、版本发布

过去 24 小时内无新 Release。

---

## 三、社区热点 Issues

> 说明：过去 24 小时内更新的 Issue 共 **8 条**，以下为全部条目并按重要性排序。

### 1. OpenAI Provider 间歇性 Service Unavailable（评论 10、👍 2）
[#52269](https://github.com/anomalyco/opencode/issues/52269) · OPEN · @pedrommone

跨模型、跨会话随机出现 `upstream connect error or disconnect/reset before headers`，部分请求成功、部分反复失败并触发自动重试，重启可暂时缓解。这是典型的**基础可用性**问题，影响面最广，10 条评论说明运维与推理链路仍在排查中。

### 2. serve 模式文件监听重注册风暴导致服务进程终止（评论 7）
[#50594](https://github.com/anomalyco/opencode/issues/50594) · OPEN · @caimf1991

当 skills 目录发生批量写入（约 1 分钟内覆盖 7 个 `SKILL.md` 并重建 `~/.claude/skills`）时，后台服务进入 file-watcher 重注册风暴并最终终止进程。涉及**长驻服务健壮性**与 skills 同步场景，对 CI/批处理用户影响明显。

### 3. 会话内切换模型时报 reasoning `encrypted_content` 错误（评论 7、👍 7）
[#48805](https://github.com/anomalyco/opencode/issues/48805) · OPEN · @Joelincn

`muse-spark-1.3-contributor-free` 在会话中途切换模型时抛 `invalid_request_error: reasoning encrypted_content was not issued to this caller`。👍 数最高（7），说明**多模型混用工作流**中的状态隔离问题是社区普遍痛点。

### 4. Rate limit exceeded 报错（评论 6）
[#53773](https://github.com/anomalyco/opencode/issues/53773) · OPEN · 标签 `needs:compliance, triaging`

用户贴图反馈遭遇限流，信息量有限但已进入 triage 流程，需结合合规标签进一步核实是否为额度策略变更。

### 5. Windows v2 重装后卡在 "Starting background server..."（评论 5、👍 7）
[#41746](https://github.com/anomalyco/opencode/issues/41746) · OPEN · @antigravity-unleashed

`opencode2 serve` 手动可正常运行（4096 端口），但 CLI 入口悬挂。典型的**平台特定启动路径差异**缺陷，从 8 月持续至今仍未闭环，Windows 用户积怨较深。

### 6. Amazon Bedrock 单个工具名超 64 字符即整包拒绝（评论 1）
[#53828](https://github.com/anomalyco/opencode/issues/53828) · OPEN · @EricOHansen5 · `triaging`

Bedrock Converse API 限制 `toolSpec.name` ≤ 64 字符；opencode 将内置工具、MCP 工具、subagent 调度工具全部序列化进 `toolConfig.tools[]`，**任一名称越界就会静默丢弃整批工具**。定位精准、修复价值高，属于隐藏很深的静默失败。

### 7. Toggle Sidebar 在 2.0.24 仍不可用（已关闭，评论 3）
[#53631](https://github.com/anomalyco/opencode/issues/53631) · CLOSED · @chullpowersync

`sidebar.toggle` 缺少 webapp command，且 Linux 无原生菜单（菜单安装仅 macOS 执行），导致 View → Toggle Sidebar 无法触达。作为 #28971 的 follow-up 再次被关闭但无关联修复，**桌面端跨平台一致性**问题值得持续跟踪。

### 8. Insufficient account funds 持续报错（评论 3）
[#53827](https://github.com/anomalyco/opencode/issues/53827) · OPEN · @osaka27 · `pending close`

日文用户反馈：用量与额度均正常，却持续提示账户余额不足、完全无法使用，并直接表达解约意向。虽标记 pending close，但反映了**计费状态与实际用量不一致**的信任风险。

---

## 四、重要 PR 进展

### 1. 在 Desktop 与 TUI 时间线中呈现会话执行错误
[#53826](https://github.com/anomalyco/opencode/pull/53826) · @Hona · OPEN

为 desktop 与 TUI 的时间线补充错误可视化（含前后对比截图）。直接回应"错误被静默吞掉"的核心体验问题，是本批 PR 中用户感知最强的一项。

### 2. 让插件共享宿主进程的 Effect 实例
[#53422](https://github.com/anomalyco/opencode/pull/53422) · @kitlangton · CLOSED

当插件或依赖解析出各自副本的 `effect` / `@opencode/plugin` 时，模块私有符号、fiber 内部结构与 `Schema` AST sentinel 无法共享，导致插件加载异常。修复后插件运行时与宿主对齐，是**插件生态地基级**改动。

### 3. 真正调用文档中声明的 `permission.ask` 插件钩子
[#47675](https://github.com/anomalyco/opencode/pull/47675) · @Atmostone · OPEN

`packages/plugin/src/index.ts` 声明了 `permission.ask`，但 `trigger` 的六个调用点均未包含它——文档承诺与实际行为脱节。修复后权限类插件才真正可用。

### 4. 启动期故障后恢复 well-known 源与登录插件
[#53823](https://github.com/anomalyco/opencode/pull/53823) · @kitlangton · OPEN

若持久化的 `.well-known/opencode` 源在启动时不可达，则 manifest 发现失败并使 `wellknown.snapshot()` 长期为空，且 10 分钟刷新循环提前退出，进程生命周期内无法自愈。属于**冷启动可用性**关键修复。

### 5. 刷新失败时保留已验证的 remote config
[#53821](https://github.com/anomalyco/opencode/pull/53821) · @kitlangton · OPEN

当 `remote_config` 返回 503 / 401 或被重定向到 HTML 登录页时，当前实现会连同 remote providers 与 `enabled_providers` 策略一并丢弃。改为保留最后一次验证通过的配置，显著降低远端抖动对本地的影响。

### 6. TUI 保留暂时不可用的已存会话模型选择
[#53822](https://github.com/anomalyco/opencode/pull/53822) · @kitlangton · OPEN

会话保存的模型在目录重载/不可达时被 `isModelValid` 过滤并回退到默认模型，用户提交后会静默换模型。修复后保留用户选择，与 #48805 的模型切换问题形成呼应。

### 7. 拒绝畸形工具参数并结算未完成的调用
[#53685](https://github.com/anomalyco/opencode/pull/53685) · @rekram1-node · OPEN

流式参数若无法解码为完整 JSON，则发出 `tool-input-error` 而非继续等待，同时保证合法调用不被延迟。含 mermaid 流程图，是 **tool-calling 鲁棒性**的重要补强。

### 8. 为 Vertex 增加 Google Cloud 凭证配置
[#53798](https://github.com/anomalyco/opencode/pull/53798) · @rekram1-node · OPEN

`/connect → Vertex` 新增 `external` 类型，支持 gcloud auth 或环境变量、Google Cloud project 与 gcloud configuration 选择。推进企业级 GCP 接入路径。

### 9. 终端与 Web 客户端语音输入
[#53492](https://github.com/anomalyco/opencode/pull/53492) · @moesuito · OPEN

新增可选的语音输入能力，关联历史请求 #18226 与仍在开放的 #29663。属于**交互形态扩展**，若合入将显著改变终端使用方式。

### 10. 支持自定义 cost tiers
[#50717](https://github.com/anomalyco/opencode/pull/50717) · @richardsun0713 · CLOSED

在 legacy provider 模型配置中加入 `cost.tiers`，并贯通 v1 迁移与两条 provider 路径。与近期大量计费/额度类 Issue 直接相关。

---

## 五、功能需求趋势

| 方向 | 代表条目 | 说明 |
|---|---|---|
| **服务稳定性与启动可靠性** | #52269、#41746、#53823、#53821 | 上游连接抖动、Windows 启动挂起、冷启动无法自愈，是当前最集中的问题簇 |
| **多 Provider / 新模型接入** | #53828、#53798、#53820、#48805 | Bedrock 工具名校验、Vertex GCP 凭证、Claude Bedrock family 元数据识别、跨模型会话状态 |
| **错误可见性与可观测性** | #53826、#53685 | 把静默失败变成显式错误提示，成为 UI 与 core 双线推动的方向 |
| **桌面端 / TUI 体验打磨** | #53631、#53822、#53825、#53641、#51575 | 侧边栏、SegmentedControl 动画、时间线文件链接、worktree 目录选择器 |
| **插件系统能力补齐** | #53422、#47675、#53824 | 运行时实例共享、文档化 hook 落地、按客户端 API 版本做能力门控 |
| **成本与配额透明度** | #50717、#53773、#53827 | 自定义 cost tier、限流与余额错误信息的准确性 |
| **上下文与会话管理** | #32089、#53233 | 跨消息 doom loop 检测、compaction 保留文本预算 |
| **语言/工具链覆盖** | #53754 | `.cppm` C++20 模块接口文件未被 LSP 识别 |

---

## 六、开发者关注点

1. **上游依赖的抖动被直接暴露给终端用户**。#52269 的自动重试既未收敛失败率，也缺少明确的降级提示，用户只能靠重启缓解。
2. **静默失败是最被诟病的一类缺陷**。#53828（工具名越界导致整批工具被丢弃）、#53822（保存的模型被静默替换）、#53826（会话执行错误不进时间线）指向同一个诉求：**失败必须可见**。
3. **计费与配额状态与实际用量不一致**。#53827 与 #53773 显示用户对"余额/限流"提示的信任度下降，已有用户明确表达解约意愿，需要产品侧给出可自证的用量视图。
4. **插件契约与文档不一致**。#47675 指出 `permission.ask` 声明存在但从未被调用，#53422 则揭示 Effect 实例分裂，插件作者面临"按文档写却无法工作"的困境。
5. **Windows 平台长期体验缺口**。#41746 从 8 月延续至今，叠加 Linux 无原生菜单（#53631），跨平台一致性仍是桌面端短板。
6. **长会话与多模型工作流的状态隔离**。#48805 的 `encrypted_content` 错误与 #32089 的 doom loop 检测共同说明：会话越长、模型切换越频繁，状态管理风险越高。

---

*本日报基于 2026-10-08 抓取的 GitHub 公开数据自动生成，Issue 与 PR 状态可能随后续提交发生变化。*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报（2026-10-08）

> 数据来源：github.com/NousResearch/hermes-agent

## 今日速览

今日无新版本发布。社区讨论集中在稳定性与架构债务：更新器递归 fetch、桌面渲染闪烁、Gateway 自重启与审批别名等 Issue 持续更新；PR 侧则推进会话状态一致性、长库 CJK 搜索限时、远程 profile 后端共享、CLI/网关所有权重构以及插件目录扩充。

## 版本发布

过去 24 小时无新 Releases。

## 社区热点 Issues

过去 24 小时共 7 条 Issue 更新，以下全部纳入并标注重要性：

1. **#124794 [OPEN][P2] 更新器在 tree:0 partial clone + git < 2.44 下产生无界递归 fetch 进程树**  
   重要性：安装/更新链路可导致资源耗尽，甚至在 8GB ARM 设备上耗尽 swap、拖垮 gateway。社区已有 8 条评论。  
   链接：https://github.com/NousResearch/hermes-agent/issues/124794

2. **#126501 [OPEN][P3] Gateway Agent 无 sanctioned 方式在配置变更后请求优雅自重启**  
   重要性：agent 修改 `config.yaml` 后只能依赖用户手动 `/restart`，生命周期 guard 还会按文本意外拦截。3 条评论。  
   链接：https://github.com/NousResearch/hermes-agent/issues/126501

3. **#121910 [OPEN][P3] macOS Desktop 底部区域在状态动画下频闪**  
   重要性：透明聊天表面 + `backdrop-filter` 合成器闪烁，影响桌面端日常使用体验。3 条评论。  
   链接：https://github.com/NousResearch/hermes-agent/issues/121910

4. **#134822 [OPEN][P3] 标准 config.yaml 出现两条误报配置警告**  
   重要性：Windows 11 Electron → `tui_gateway` 路径下产生日志噪音，虽为 cosmetic，但影响配置校验信任。1 条评论。  
   链接：https://github.com/NousResearch/hermes-agent/issues/134822

5. **#130554 [CLOSED][P2] Desktop bundle 首次启用插件会重建整个 venv（约 2 分钟）**  
   重要性：MSIX 桌面包缺少 venv fact，导致即使无 Python 依赖的插件也触发全量重建，拖慢插件安装。1 条评论。  
   链接：https://github.com/NousResearch/hermes-agent/issues/130554

6. **#134826 [OPEN][Feature] 为 o8 等编排器提供 ACP external-runtime 一致性契约**  
   重要性：社区希望将 Hermes 作为一等 worker runtime 集成，需要明确兼容契约，避免集成方自行猜测。暂无评论。  
   链接：https://github.com/NousResearch/hermes-agent/issues/134826

7. **#134817 [OPEN][P3] Gateway pending approvals 不识别精确短语 “session approval”**  
   重要性：用户希望用自然语言别名批准会话剩余动作，当前审批语义与聊天体验不一致。暂无评论。  
   链接：https://github.com/NousResearch/hermes-agent/issues/134817

## 重要 PR 进展

过去 24 小时共有 50 条 PR 更新，以下按架构影响、优先级和修复面选取 10 条：

1. **#106742 [OPEN][P1] 一个 gateway 管理所有本地会话**  
   CLI、TUI、Desktop、API、ACP、bots 和 cron 都附加到同一个 live conversation，替代各自在同一 `state.db` 上跑 agent。  
   链接：https://github.com/NousResearch/hermes-agent/pull/106742

2. **#125028 [OPEN][P3] CLI Ownership Refactor Phase 2：Gateway 控制面与拓扑**  
   将 Gateway 控制面和拓扑所有权从 `hermes_cli` 移到 `gateway/`，分离迁移领域逻辑与 CLI 展示/编排。  
   链接：https://github.com/NousResearch/hermes-agent/pull/125028

3. **#133748 [OPEN][P0] Desktop regenerate 不再静默归档后续轮次**  
   若 regenerate/edit 会归档超过一个用户轮次，将先确认；未确认的深回退先记录日志，之后版本拒绝。  
   链接：https://github.com/NousResearch/hermes-agent/pull/133748

4. **#134799 [OPEN][P1] 会话 durable-uid flush guard：恢复行不得重复插入**  
   修复从 durable rows 重建消息时缺少 `_DB_PERSISTED_MARKER` 导致的重复插入风险。  
   链接：https://github.com/NousResearch/hermes-agent/pull/134799

5. **#134823 [OPEN][P2] Remote primary：每个 “This device” profile 共享一个固定本地后端**  
   避免远程主设备下每个 profile 各起本地后端、slot 耗尽并被 idle-kill 成 “Backend offline”。  
   链接：https://github.com/NousResearch/hermes-agent/pull/134823

6. **#134816 [OPEN][P2] 用协作式 SQLite deadline 限制 CJK LIKE 扫描**  
   针对约 41GB `state.db` 上单字 CJK 查询可能卡住数分钟的问题，为 `_like_rows` 增加截止时间。  
   链接：https://github.com/NousResearch/hermes-agent/pull/134816

7. **#134815 [OPEN][P2] 辅助 Responses 调用在路由拒绝 include 时重试**  
   自托管 OpenAI 兼容 `/responses` 服务未支持 encrypted-reasoning replay 时，去掉 `include` 后重试，提升兼容性。  
   链接：https://github.com/NousResearch/hermes-agent/pull/134815

8. **#134820 [OPEN][P2] Desktop managed-SSH 每个 profile scope 使用独立 remote profile**  
   修复连接级 `remoteProfile` 固定值覆盖所有 `(connection, profile)` pool scope 的问题。  
   链接：https://github.com/NousResearch/hermes-agent/pull/134820

9. **#134813 [OPEN][P2] 阻止官方 skills 源捕获其他 registry 标识符**  
   修复 `hermes skills install skills-sh/...` 可能静默安装同名官方 optional skill，而非用户指定 skills.sh skill。  
   链接：https://github.com/NousResearch/hermes-agent/pull/134813

10. **#120388 [OPEN][P3] Vault 支持跨域 iframe 登录表单填充**  
    在跨域 OOPIF 中定位密码控件并填登录，同时限制为 login-only，避免扩大凭证权限。  
    链接：https://github.com/NousResearch/hermes-agent/pull/120388

## 功能需求趋势

- **安装/更新与插件管理可靠性**：更新器进程隔离、Desktop bundle venv 缓存、插件在线卸载/更新、skills 安装源标识符正确性。  
  相关：#124794、#130554、#134824、#134813
- **Gateway 生命周期与自动化**：agent 自主请求重启、自然语言审批别名、CLI/网关所有权重构、单一 gateway 管理所有本地会话。  
  相关：#126501、#134817、#125028、#106742
- **桌面/TUI 稳定性与渲染性能**：透明背景合成器闪烁、配置误报、深回退确认、SSH profile 作用域。  
  相关：#121910、#134822、#133748、#134820
- **会话状态一致性与大库性能**：durable-uid 去重、steer 行持久化、CJK LIKE 扫描限时、长 `state.db` 查询保护。  
  相关：#134799、#134816、#132186
- **互操作与外部运行时**：ACP external-runtime conformance contract、OpenAI 兼容 Responses 路由降级。  
  相关：#134826、#134815
- **插件与记忆生态**：hyatlas 本地优先 7 层记忆 provider、Frihet 插件与 ERP connector 进入 Catalog。  
  相关：#134419、#134792
- **配置与上下文管理**：global context files、减少 stock config 误报。  
  相关：#53766、#134822
- **桌面生产力与安全**：MoA preset 显式保存编辑、选中文本朗读/翻译/查询、Vault 跨域登录填充安全边界。  
  相关：#70228、#68287、#120388

## 开发者关注点

- **更新链路边缘环境风险高**：tree:0 partial clone + 旧 git 会产生失控递归进程，需要进程组隔离、超时和资源上限。  
  https://github.com/NousResearch/hermes-agent/issues/124794
- **Gateway 配置变更后的重启体验是自动化缺口**：agent 无法 sanctioned 地请求自重启，用户只能手动 `/restart`。  
  https://github.com/NousResearch/hermes-agent/issues/126501
- **桌面端“表面小问题”影响信任**：渲染闪烁、配置误报、深回退静默归档，都会直接破坏日常使用信心。  
  https://github.com/NousResearch/hermes-agent/issues/121910、https://github.com/NousResearch/hermes-agent/issues/134822、https://github.com/NousResearch/hermes-agent/pull/133748
- **插件生态第一印象受安装性能拖累**：首次启用插件重建 venv 约 2 分钟，且后续安装排队显示 “Downloading…”。  
  https://github.com/NousResearch/hermes-agent/issues/130554
- **会话状态必须强一致**：恢复行重复插入、mid-turn steer 持久化错误、深回退误归档都是高风险会话数据问题。  
  https://github.com/NousResearch/hermes-agent/pull/134799、https://github.com/NousResearch/hermes-agent/pull/132186
- **大数据量存储需要硬性 deadline**：41GB `state.db` 上短 CJK 查询可能拖垮系统，搜索路径必须有协作式截止。  
  https://github.com/NousResearch/hermes-agent/pull/134816
- **外部集成需要明确契约**：o8 等编排器集成 Hermes 时缺少 ACP external-runtime 兼容契约，自托管模型端点也需要优雅降级。  
  https://github.com/NousResearch/hermes-agent/issues/134826、https://github.com/NousResearch/hermes-agent/pull/134815
- **远程/多 profile 后端作用域需可预测**：SSH profile 与 “This device” profile 共享后端问题会导致 Backend offline。  
  https://github.com/NousResearch/hermes-agent/pull/134820、https://github.com/NousResearch/hermes-agent/pull/134823
- **自然语言审批别名缺失**：`session approval` 这类短语无法触发 pending approval，聊天与自动化审批体验不一致。  
  https://github.com/NousResearch/hermes-agent/issues/134817
- **安全边界需持续收紧**：跨域 iframe 登录填表必须严格限制为 login-only，不能把发现能力变成凭证授权。  
  https://github.com/NousResearch/hermes-agent/pull/120388

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 · 2026-10-08

> 数据来源：github.com/openclaw/openclaw

---

## 一、今日速览

今日无新版本发布，社区活动集中在 Issue 与 PR 的“稳定性清理”上。Issues 侧最突出的三条主线是**进程/会话资源泄漏**（僵尸子进程、超时 cron 残留任务）、**Windows Control UI 更新阻塞（P0）**，以及**会话创建全量失败的回归**。PR 侧则密集修复 Beta 发布验证（FRV）失败用例、Web/移动端 UI 细节，并推进 Skill Workshop 自学习闭环与 Codex 提示词溯源等较大改动。整体看，社区当前处于“为下个发布候选做质量收敛”的阶段。

---

## 二、版本发布

过去 24 小时内无新 Release。

---

## 三、社区热点 Issues

> 说明：过去 24 小时内更新的 Issue 共 7 条，以下全部覆盖并按优先级排序。

**1. #97616 [OPEN][P1] 钩子/工具子进程未被回收，僵尸进程累积导致运行时劣化**
`impact:message-loss` + `impact:crash-loop`，银贝壳评级。作者 @avp717，18 条评论，是今日讨论量最高的 Issue。`openclaw-hooks`、`bash`、`codex` 等子进程在主编排进程下堆积为僵尸进程，属于典型的长期运行稳定性缺陷，且被标记为 Regression。
https://github.com/openclaw/openclaw/issues/97616

**2. #138560 [OPEN][P0] Windows Control UI 更新在安装前中止：`managed-service-handoff-failed`**
钻石龙虾评级 + `ux-release-blocker`。从健康的 2026.8.2 计划任务安装通过 Control UI 升级时，托管服务交接失败直接中断更新流程，Gateway 日志给出了更具体的失败原因。这是当前唯一的 P0 级发布阻塞项。
https://github.com/openclaw/openclaw/issues/138560

**3. #166826 [OPEN] `sessions.create` 恒定失败：“Session creation publication owner is no longer current”**
今日新建的回归缺陷。Control UI 新建会话按钮、`/new` 命令、网关侧 `sessions.spawn` 全部失败——影响面覆盖所有会话创建路径，严重程度高，但尚未获得维护者分流标签。
https://github.com/openclaw/openclaw/issues/166826

**4. #138499 [OPEN][P1] 超时 cron 会话遗留会话级 CLI 任务长时间处于 running**
钻石龙虾评级，`impact:session-state` + `impact:crash-loop`。超时的 `agentTurn` 在所属 cron 会话结束后，其后台 CLI 任务仍运行超过五小时。与 #97616 同属“生命周期与清理”问题族，是维护者 @jalehman 亲自提交的报告。
https://github.com/openclaw/openclaw/issues/138499

**5. #48709 [OPEN][P2][stale] Gemini 2.5 Pro：textSignature 膨胀 + think 标签 + 混合文本/工具调用导致会话失败**
三个问题叠加引发上下文快速膨胀、运行中止以及 Telegram 静默投递失败。该 Issue 自 2026-03 创建、已有 8 条评论，但被标记 stale，说明长期缺少修复 PR，是模型集成侧的历史欠账。
https://github.com/openclaw/openclaw/issues/48709

**6. #138355 [CLOSED][P1] Browser Talk 丢失确认 ID 并重复生成审批提案**
今日唯一关闭的 Issue。语音确认后受保护动作未完成，反而创建新的审批提案——涉及权限确认链路的正确性。关闭状态为本周少见的正向信号。
https://github.com/openclaw/openclaw/issues/138355

**7. #138761 [OPEN][P3] Control UI 网页/移动端：已登录用户头像无法隐藏，助手消息留空头像槽**
`impact:ux-friction`，off-meta tidepool 评级，属于纯视觉体验问题，优先级最低但影响日常观感。
https://github.com/openclaw/openclaw/issues/138761

---

## 四、重要 PR 进展

**1. #165825 [OPEN][XL] 彻底移除实验性 fleet 管理**
涉及 docs、gateway、cli、security、docker 等多模块，`security-sensitive-changed` + `merge-risk: compatibility`。退役 `openclaw fleet` 命令及其租户容器管理能力，已有容器/网络/注册表数据不受影响，但运维方需自行接管生命周期。属于方向性决策级变更。
https://github.com/openclaw/openclaw/pull/165825

**2. #161057 [OPEN][XL] refactor(skills)：将 Skill Workshop 改造为直接、版本化的自学习闭环**
当前学习成果需排队等待无人审阅的审批队列，且 per-agent 技能白名单会隐藏智能体自己学到的技能。该 PR 移除提案队列/周度 AI curator/合集评审等环节，让智能体真正实现自我改进，是本次最值得关注的能力演进。
https://github.com/openclaw/openclaw/pull/161057

**3. #166613 [OPEN][XL] feat：dispatch 前强制校验必需的 worker 目标**
带 `merge-risk: compatibility` 与 `session-state` 双重风险标记。要求 profile 在派发或会话变更前拒绝冲突的执行选择（含持久化 Move 与失败放置恢复），同时不阻塞 Stop 清理。
https://github.com/openclaw/openclaw/pull/166613

**4. #166787 [OPEN][L] fix：通过数据库别名保留原生提示词溯源**
修复 Codex 消息分支经数据库别名后丢失已验证的原生溯源、目录续接丢失上游链接、以及无托管搜索提供商时的搜索策略不匹配问题。
https://github.com/openclaw/openclaw/pull/166787

**5. #157739 [OPEN] fix(build)：`pnpm build` 在 tsdown-unified 步骤峰值逼近 9.5GB**
在约 10GB 内存的主机上会剧烈换页甚至被 OOM 杀掉。对 CI 与本地开发者体验都是直接的痛点修复（声明生成阶段的内存问题另行跟踪）。
https://github.com/openclaw/openclaw/pull/157739

**6. #166269 [OPEN] fix(gateway)：保留排队中的 abort 元数据**
已进入 `automerge armed` 状态。修复 `sessions.abort` 与 agent 执行终态发布之间的竞态——补充性 payload 曾丢失 `timeoutPhase` 与 provenance 字段。
https://github.com/openclaw/openclaw/pull/166269

**7. #166824 [OPEN] fix(ui)：按 Enter 发送后输入预览仍然残留**
修复共享会话中键盘提交后协作者草稿预览残留或重新出现在已发送消息旁的问题，覆盖 Enter、Ctrl/Cmd+Enter、目标提交与命令菜单提交四条路径。
https://github.com/openclaw/openclaw/pull/166824

**8. #163943 [OPEN] feat：新增设置开关以禁用 Archive 直连快捷键**
`Ctrl+Shift+A` / `⌘⇧A` 会被浏览器或扩展占用（如 Chrome 标签页搜索），此前会无条件归档当前会话。该 PR 提供更细粒度的用户控制。
https://github.com/openclaw/openclaw/pull/163943

**9. #166789 [OPEN] chore(catalog)：更新推荐模型（2026-10-07），纳入 Mistral Large 4**
将 Mistral 新公开的旗舰级模型加入推荐目录，85 条既有条目及顺序保持不变，不涉及 picker 行为变更。
https://github.com/openclaw/openclaw/pull/166789

**10. #117122 [OPEN][L][stale] feat(imessage)：加入有界原生历史读取**
允许 owner 或 `operator.admin` 通过 `message(action="read", channel="imessage", target="chat_id:...")` 读取指定私聊的近期历史窗口，带 `merge-risk: compatibility`，自 8 月起长期待审。
https://github.com/openclaw/openclaw/pull/117122

> 另有一批发布验证（FRV）修复值得留意：#166825、#166823、#166790、#166811、#162650、#166821 均围绕 Beta 候选验证、QA 目录校验、Doctor 套接字路径长度、媒体契约加载失败暴露等测试与发布工程问题。

---

## 五、功能需求趋势

从本轮 Issue 与 PR 标签分布看，社区关注方向可归纳为六类：

1. **进程与会话生命周期治理**（最高频）：僵尸子进程泄漏、超时 cron 残留任务、abort 竞态、会话创建 owner 失效——`impact:session-state` 与 `impact:crash-loop` 标签在 Issue 中反复出现。
2. **跨平台发布可靠性**：Windows 托管服务交接、Control UI 移动端与网页端一致性，`ux-release-blocker` 已出现。
3. **模型集成与溯源**：Gemini 2.5 Pro 的签名/think 标签兼容、Mistral Large 4 目录收录、Codex 原生提示词溯源保留。
4. **构建与资源占用**：`pnpm build` 内存峰值、声明生成阶段内存，直接影响开发者与 CI 环境。
5. **自学习与技能体系**：Skill Workshop 从“审批队列”转向“版本化直接生效”，代表产品理念层面的调整。
6. **QA/发布工程自动化**：大量 `extensions: qa-lab`、`clawsweeper:*` 标签的 PR 表明测试夹具与验证流水线正在被系统性加固。

---

## 六、开发者关注点

- **回归与阻塞项优先级失衡**：#166826 是当日新建、影响全部会话创建路径的回归，但尚无维护者分流；相比之下 #138560 已是 P0 但自 9 月 4 日创建至今未闭环，社区对“发布阻塞项长期悬挂”有隐忧。
- **缺少修复 PR 的问题积压**：`clawsweeper:no-new-fix-pr` 在 #138560、#138499 等高评级 Issue 上反复出现，说明高价值缺陷存在“已定位但无人认领”的断层。
- **僵尸/残留资源是长期稳定性主因**：#97616 评论数达 18、#138499 由维护者亲自提交，二者指向同一类清理逻辑缺陷，建议作为专项合并处理。
- **陈旧的模型兼容问题**：#48709 涉及 Gemini，自 3 月起已 8 条评论却仍为 `stale`，多模型接入的兼容性维护缺少持续投入。
- **测试基础设施脆弱**：多个 PR 描述提到“FRV 失败”“文件顺序导致断言差异”“深层临时目录导致 socket 路径超长”，测试对执行环境高度敏感，增加了发布噪音。
- **贡献门槛**：今日仍有 README 贡献者名单类 PR（#164564）在流动，配合大量 `triage: docs-discoverability` 标签，说明新贡献者的文档可发现性仍是改进点。

---

*本日报基于 GitHub 公开数据自动汇总，如需跟踪特定 Issue/PR 进展，请点击对应链接。*

:::
