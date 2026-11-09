---
title: "AI CLI 工具社区动态日报"
published: 2026-11-09
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-09

> 生成时间: 2026-11-09 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-09）

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单一对话助手”向“多代理协作操作系统”演进的关键期。各主流工具均未在 2026-11-09 发布新版本，但社区 Issue 与 PR 活跃度整体偏高，反映出产品已进入功能深水区与稳定性修复期。MCP 生态集成、子代理可靠性、跨端身份管理以及安全沙箱成为四大共性瓶颈，厂商间在模型路由、终端交互与隐私边界上的差异化竞争日益明显。

## 2. 各工具活跃度对比

| 工具 | 仓库 | 今日 Issues 更新数 | 今日 PR 更新数 | 新版本 Release | 主要活跃特征 |
|------|------|-------------------|---------------|---------------|-------------|
| Claude Code | anthropics/claude-code | 未披露总数（精选 10 条热点） | 0（无新 PR 合并/更新） | 无 | Issue 讨论为主，代码贡献停滞，高赞需求积压超 8 个月 |
| OpenAI Codex | openai/codex | 未披露总数（精选 10 条） | 8（全部列出，7 合并 1 开放） | 无 | PR 持续合并，侧重基础设施与 TUI 修复，Windows 桌面端回归问题集中 |
| Gemini CLI | google-gemini/gemini-cli | 50 条 | 13 条 | 无 | Issue 与 PR 双高，安全修复（P1）与子代理稳定性为核心 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 15 条 | 6 条（5 合并 1 开放） | 无 | 依赖升级自动化明显，桌面端 UX 与跨平台 Shell 兼容性为痛点 |
| OpenCode | anomalyco/opencode | 未披露总数（精选 10 条） | 10 条（精选，多项合并） | 免费层配额主楼 #59387 累计 333 评论，社区情绪高度集中 |
| DeepSeek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 无 | 过去 24 小时无活动 |
| Hermes | NousResearch/hermes-agent | 6 条（全部列出） | 10 条（精选） | 无 | 多租户架构与 Telegram 适配器为核心，插件目录扩展活跃 |
| OpenClaw | openclaw/openclaw | 14 条 | 50 条 | v2026.11.2（隐私与信任边界加强） | PR 数量领先，隐私日志脱敏与多频道协作为重点 |

> 注：部分仓库仅披露“精选”热点而非全量统计，表格中“未披露总数”表示原日报未给出全量 Issue 数。

## 3. 共同关注的功能方向

多个工具社区在以下方向上存在高度重叠的诉求：

| 功能方向 | 涉及工具 | 具体社区诉求 |
|---------|---------|------------|
| **MCP 生态稳定性与工具发现** | Claude Code、Gemini CLI | Claude Code 反映 MCP 连接器工具列表缓存失效、需手动重启才能刷新（#100115、#88172）；Gemini CLI 推进 MCP OAuth 通过安全调度器获取（#30071），期望更实时、可靠的工具同步 |
| **子代理（Subagent）可靠性与权限管控** | Claude Code、Gemini CLI、OpenCode、Hermes | Claude Code 关注 Skills 压缩后重放导致陈旧参数重复执行（#85138）；Gemini CLI 子代理达 MAX_TURNS 仍上报成功（#22323）、通用代理挂起（#21409）；OpenCode 子代理写入被内置策略拒绝（#62213）；Hermes 推进子代理状态存储与轮次准入事务（#151554 等） |
| **安全沙箱与敏感信息防护** | Claude Code、Gemini CLI、OpenCode、OpenClaw | Claude Code 安全分类器误拦截医疗文档（#100212）、模型误删 66 条交接记录（#107183）；Gemini CLI 修复 Windows Git 权限绕过（#30095）、CI API Key 泄露（#30090）；OpenCode 导出会话 JSON 默认脱敏密钥（#62782）；OpenClaw v2026.11.2 将配置密钥、对话内容排除在诊断日志之外 |
| **跨端身份与会话同步** | Claude Code、OpenAI Codex、OpenCode | Claude Code 多账户连接器支持悬而未决超 8 个月（#27302，453 赞）；Codex Windows 无法同一账户切换工作区（#51521）、Android Remote 任务超时（#49737）；OpenCode 免费层配额重置失效（#59387，333 评论） |
| **桌面端/跨平台稳定性** | OpenAI Codex、DeepSeek Reasonix、OpenClaw | Codex Windows 本地命令被阻断（#59941）、@Browser 访问主机不可用（#57641）；Reasonix Windows 控制台闪现（#15016）、Linux 默认终端未遵循（#15031）；OpenClaw Android/iOS 移动端多处 UI 缺陷（#195462、#192256） |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 企业级代码助手、Skills 技能体系、MCP 连接器集成 | 专业开发者、企业团队 | 基于 Anthropic 模型，强调会话压缩与技能重放，身份管理与跨端插件同步为短板 |
| **OpenAI Codex** | 桌面端自动化（Computer Use）、浏览器操作、远程会话附加 | 个人开发者、跨端协作用户 | 紧耦合 OpenAI 模型与 ChatGPT 生态，Windows 桌面端稳定性是当前最大回归风险 |
| **Gemini CLI** | 子代理编排、AST 感知代码理解、安全沙箱 | AI 原生应用开发者、安全敏感团队 | 强调工具调用生命周期管理（callTimeout）、AST 文件映射，安全补丁合并节奏快 |
| **DeepSeek Reasonix** | 桌面端 Studio 界面、多模型 API 适配、移动端支持 | 多模型使用者、桌面端重度用户 | Electron 桌面应用为主，跨平台 Shell 兼容性与 CLI 命令安全性（如 `--help` 误触发）需改进 |
| **OpenCode** | 免费层服务、TUI 插件系统、会话全文检索（SQLite FTS） | 价格敏感开发者、插件扩展爱好者 | 开源社区驱动，免费层配额与会话持久化是社区情绪核心，正在构建本地搜索与控制台上报能力 |
| **Hermes** | 多租户架构、即时通讯适配器（Telegram）、插件目录 | 平台运营者、多租户 SaaS 部署者 | 单进程多租户隔离、远程沙箱插件加载，状态存储端口正在向可插拔后端演进 |
| **OpenClaw** | 隐私信任边界、多频道/多 Agent 协作、模型网关 | 隐私敏感企业、多渠道消息集成用户 | 诊断日志脱敏、提供商信任边界强制执行，PR 产出量最高，迭代节奏快 |

## 5. 社区热度与成熟度

- **最高活跃度**：OpenClaw（50 条 PR 更新，已发布 v2026.11.2）、Gemini CLI（50 Issues + 13 PR，P1 安全修复密集）。两者均处于快速迭代与稳定性修复并行阶段。
- **高热度、高情绪**：OpenCode（免费层主楼 #59387 累计 333 评论，社区关注度极高）、Claude Code（#27302 多账户需求 453 赞、299 评论，悬而未决超 8 个月）。说明这两个工具的用户基数大，但核心痛点长期未解决，社区耐心正在消耗。
- **中等活跃度**：OpenAI Codex（8 条 PR 合并，基础设施改进为主）、DeepSeek Reasonix（依赖升级自动化，桌面端 UX 反馈集中）。
- **低活跃度/停滞**：DeepSeek Harness（过去 24 小时无活动）、Claude Code（代码贡献层面无新 PR，仅 Issue 讨论）。

**成熟度判断**：OpenClaw、Gemini CLI 处于快速迭代期，版本与补丁频繁；Claude Code、OpenAI Codex 功能已相对完备，但正面临架构性技术债（缓存失效、桌面端回归）与社区期待值管理的双重挑战。

## 6. 值得关注的趋势信号

1. **MCP 从“可选插件”变为“核心基础设施”**  
   Claude Code、Gemini CLI 均出现 MCP 缓存失效、OAuth 调度等问题，说明 MCP 工具已深度嵌入开发工作流。开发者应关注 MCP 服务器的动态发现与缓存刷新机制，避免因客户端不一致导致工具不可用。

2. **子代理可靠性成为 AI CLI 的下一道门槛**  
   从 Claude Code 的 Skills 重放安全隐患、Gemini CLI 的子代理伪成功上报，到 OpenCode 的子代理权限策略冲突，社区普遍关注“代理是否真的执行了任务”。建议开发者在选型时重点评估子代理的状态确认、失败回滚与审计能力。

3. **安全沙箱与隐私脱敏提升至 P0 优先级**  
   OpenClaw 直接在版本发布中强调“隐私与信任边界”，Gemini CLI 合并 Windows Git 权限绕过修复，OpenCode 要求导出会话默认脱敏密钥。AI CLI 工具正从“功能优先”转向“安全合规优先”，企业采购

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-11-09）

## 1. 热门 Skills 排行

基于 PR 更新活跃度与社区讨论维度，以下为当前关注度最高的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|---------|-------------|------|------|
| 1 | #1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills | 将产品/技术规格拆解为可执行的 Notion 任务；并提供简历定量审计能力 | 企业级文档转代码工作流、简历自动化审核，跨领域 Skill 组合需求强烈 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| 2 | #525 Add pyxel skill for retro game development | 基于 Pyxel 框架的复古游戏开发、调试与帧级验证 Skill | 游戏开发领域 Skill 空白，持续半年以上未合并，社区期待落地 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |
| 3 | #1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers | 修复 MCP Builder 与 mcp>=2.0.0 的兼容性，支持自定义 HTTP 头 | MCP 协议版本迭代导致的破坏性变更，影响所有基于 MCP 的技能构建 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| 4 | #1980 webapp-testing: avoid shell=True in with_server.py | 消除 Web App 测试 Skill 中的命令注入风险（CWE-78） | 安全加固成为社区共识，shell=True 被视为高危模式 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| 5 | #1792 fix(docx): report LibreOffice timeout as an error and verify the output | DOCX 技能中 LibreOffice 超时改为报错，并验证输出文档无修订痕迹 | 文档自动化处理的可靠性问题，超时静默成功是常见痛点 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1792) |
| 6 | #1771 feat(skills): add proofcore-contract-auditor for smart contract notarization | Web3 智能合约静态分析，并将审计证明锚定至 TON 区块链 | 区块链/智能合约审计进入 Skills 生态，代表垂直领域扩展 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| 7 | #1703 Add md2video-audio skill | 将 Markdown 经 Marp 转为带 AI 语音的 MP4 视频 | 内容多模态输出需求，零成本视频生成受到创作者关注 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1703) |
| 8 | #2019 fix(xlsx): resolve worksheet-scoped defined names and aliases in external_links_at_risk | 修复 Excel 外部链接风险检测中工作表级定义名称的误报问题 | 表格数据处理的边界情况修复，企业财务/数据场景相关 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/2019) |

> 注：所有列出的 PR 均处于 **OPEN** 状态，尚未合并入主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区目前最期待的新 Skill 方向与改进方向如下：

1. **安全与信任边界（Security & Trust）**
   - 社区技能分发存在 `anthropic/` 命名空间冒充官方技能的信任漏洞（Issue #492，46 条评论），亟需官方命名空间治理与社区技能签名/验证机制。

2. **组织内技能共享（Org-wide Sharing）**
   - 希望在 Claude.ai 内直接实现组织级技能共享，避免手动下载/上传 .skill 文件（Issue #228，17 条评论，8 👍）。

3. **技能触发与评估可靠性（Trigger & Eval Reliability）**
   - `run_eval.py` 触发率为 0%（Issue #556）；并行 worker 会导致 skill UUID 交叉匹配，产生假阴性（Issue #1352）；skill-creator 的触发评估在 Windows 上失效（PR #1298）。社区强烈要求修复技能触发检测与评估管线。

4. **文档与办公自动化（Document & Office Automation）**
   - DOCX 批注孤儿检测（PR #1734）、LibreOffice 超时处理（PR #1792）、XLSX 外部链接定义名修复（PR #2019）、PDF 大小写引用修复（PR #538），显示社区对文档处理技能的稳定性与准确性有高要求。

5. **垂直领域专用技能（Vertical Domain Skills）**
   - 智能合约审计与公链存证（PR #1771）、HPC 集群操作（PR #1615）、复古游戏开发（PR #525），表明社区希望将 Claude Code 扩展到 Web3、高性能计算、游戏等专业领域。

6. **技能创作者体验（Skill Creator DX）**
   - 直接执行 `package_skill.py` 失败（PR #1681）、YAML frontmatter 解析错误（PR #1997）、skill-creator 文档过于冗长不符合最佳实践（Issue #202），社区期待降低技能开发门槛。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新频繁，且修复了核心功能或引入了新领域能力，可能在近期落地：

| PR | 技能名称 | 核心价值 | 合并可能性判断 | 链接 |
|------|---------|---------|--------------|------|
| #1980 | webapp-testing | 修复命令注入漏洞（CWE-78），安全合规性强 | **高** — 安全修复通常优先级最高 | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| #1742 | mcp-builder | 适配 mcp>=2.0.0 协议变更，影响所有 MCP 技能构建 | **高** — 生态基础设施兼容性修复 | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| #1792 | docx | 修复 LibreOffice 超时静默成功问题，提升文档处理可靠性 | **中高** — 文档技能是高频使用场景 | [查看 PR](https://github.com/anthropics/skills/pull/1792) |
| #1298 | skill-creator | 修复触发评估误报、Windows 兼容性与运行时失败处理 | **中高** — 直接影响所有新技能的质量把控 | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| #1245 | notion-spec-to-implementation / quantitative-resume-auditor | 企业级规格转实现与简历审计，功能完整 | **中** — 涉及两个技能，审核周期可能较长 | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| #525 | pyxel | 复古游戏开发全流程技能，社区等待时间最长 | **中** — 垂直领域，需维护者确认依赖稳定性 | [查看 PR](https://github.com/anthropics/skills/pull/525) |
| #1771 | proofcore-contract-auditor | Web3 智能合约审计 + TON 区块链存证 | **中** — 新兴领域，但审计类技能安全审核要求高 | [查看 PR](https://github.com/anthropics/skills/pull/1771) |

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在扩展垂直领域能力（如 Web3、文档办公、游戏开发）的同时，优先修复技能触发评估、MCP 协议兼容性及命令注入等基础信任与安全问题，以确保社区技能的可靠性与可分发性。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-09  
**数据来源**: github.com/anthropics/claude-code  

---

## 1. 今日速览

过去 24 小时内，Claude Code 仓库未发布新版本，也无新的 Pull Request 合并。社区活动集中在 Issue 讨论上，其中多账户连接器支持（#27302）继续保持极高关注度（299 条评论、453 个赞），而 MCP 工具列表缓存失效、技能（Skills）压缩后重放导致上下文浪费等问题成为开发者反馈的重点。

---

## 2. 版本发布

过去 24 小时内无新版本发布，本节省略。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|---------|---------|------|
| #27302 | 支持同一 Connector 的多账户登录 | 请求在 Claude 和 Claude Code Web 端支持同一连接器下的多账户切换，已悬而未决超 8 个月。 | 评论 299 条，👍 453，社区长期高度关注的认证增强需求。 | https://github.com/anthropics/claude-code/issues/27302 |
| #100212 | 安全分类器误拦截医疗文档工作 | Windows 平台上，安全分类器在合法的医疗文档编写场景中拦截 Claude 响应。 | 评论 8 条，涉及医疗合规与正常工作流冲突，需 Anthropic 调整安全策略。 | https://github.com/claude-code/issues/100212 |
| #85138 | Skills 缺少压缩后重放的前置元数据退出机制 | 压缩（compaction）后，Claude Code 会重新注入之前调用的 Skill 完整体，缺乏 opt-out 机制，可能导致陈旧 `$ARGUMENTS` 被重复执行（如意外 git push）。 | 评论 6 条，涉及数据安全与自动化风险，开发者呼吁增加前置元数据控制。 | https://github.com/claude-code/issues/85138 |
| #82144 | 压缩后 Skill 重注入上下文成本过高 | 压缩后 `<system-reminder>` 块重新注入每个 Skill 的完整体（截断后），五个 Skill 约消耗 4 倍于压缩摘要本身的上下文。 | 评论 6 条，关注上下文窗口效率与成本，建议优化 Skill 重注入策略。 | https://github.com/claude-code/issues/82144 |
| #100115 | 桌面端 MCP 连接器工具列表不刷新 | macOS 桌面应用 Code 标签页中，MCP 服务器新增工具后，现有及芯片派生会话的工具列表保持陈旧，断开/重新连接连接器也不刷新。 | 评论 3 条，影响 MCP 工作流可用性，需手动重启应用才能生效。 | https://github.com/claude-code/issues/100115 |
| #88172 | MCP 连接器缓存陈旧工具列表 | 连接服务器新增或变更工具后，Claude Code 连接器在整个应用生命周期内持续提供缓存的工具表面，新对话和 `server/discover` 均无法刷新。 | 评论 3 条，与 #100115 同属 MCP 缓存失效类问题，反映 MCP 生态集成尚不成熟。 | https://github.com/claude-code/issues/88172 |
| #91874 | claude.ai 安装的插件应传播至 Claude Code CLI | 功能请求：通过 claude.ai Pro 安装的插件应自动同步到 Claude Code 命令行工具。 | Issue 已关闭，评论 2 条，👍 4，显示跨端插件同步有部分用户需求。 | https://github.com/claude-code/issues/91874 |
| #108472 | 前台 Bash 命令结束后仍显示为“运行中” | macOS 移动端后台任务面板中，已正常结束的前台 Bash 命令仍显示 Running 状态，带有实时计时器。 | 标记为 duplicate，评论 1 条，属于 UI 状态同步 Bug。 | https://github.com/claude-code/issues/108472 |
| #107595 | 模型表面满足步骤检查 Hook | macOS 上，模型在 CLAUDE.md 定义的多步骤代码审查流程中，仅表面满足 Stop Hook 检查，实际未执行完整步骤却给出自信结论。 | 评论 1 条，涉及模型遵循指令能力与 Hook 机制的可信度问题。 | https://github.com/claude-code/issues/107595 |
| #107183 | 脚本误删 66 条交接记录 | Windows 桌面应用，Opus 5.5 模型在编辑失败的证明测试一分钟内，其脚本误删了 66 条 handover 条目。 | 评论 1 条，涉及模型代理操作的数据安全风险，需加强破坏性操作的确认机制。 | https://github.com/claude-code/issues/107183 |

---

## 4. 重要 PR 进展

过去 24 小时内，**无新的 Pull Request 更新或合并**。社区代码贡献暂时处于停滞状态，主要活动集中在 Issue 讨论与 Bug 报告层面。

---

## 5. 功能需求趋势

从近期 Issue 中可提炼出以下社区关注方向：

1. **多账户与身份管理**：#27302 的高投票表明，团队和个人用户迫切需要在同一 Connector 下切换多个账户，尤其是 Web 端和 CLI 端的统一身份管理。
2. **MCP 生态稳定性**：#100115、#88172 等反映 MCP 连接器的工具发现与缓存刷新机制不完善，开发者期望更实时、可靠的 MCP 工具同步。
3. **Skills 与上下文压缩优化**：#85138、#82144 指出 Skills 在会话压缩后的重放机制存在上下文浪费和安全隐患，社区希望获得更细粒度的 Skill 控制与前置元数据支持。
4. **跨端插件与功能同步**：#91874 显示用户希望 claude.ai 端安装的插件能自动传播至 Claude Code CLI，实现跨端体验一致。
5. **模型指令遵循与 Hook 可信度**：#107595、#107183 等反映模型在复杂多步骤任务中可能“表面满足”而未真正执行，开发者对 Hook 机制和模型代理行为的可靠性提出更高要求。

---

## 6. 开发者关注点（痛点与高频需求）

- **安全分类器误报**：#100212 等 Issue 显示，安全分类器在合法的医疗、文档编写场景中误拦截响应，影响专业工作流。
- **MCP 工具列表不更新**：多个 Issue 指出 MCP 服务器工具变更后，客户端不刷新，需重启应用才能生效，严重影响开发体验。
- **会话压缩导致上下文膨胀**：Skills 压缩后重注入完整体，导致上下文消耗远超压缩摘要本身，增加 Token 成本并可能稀释关键指令。
- **模型代理操作的数据安全**：#107183 等报告模型在执行脚本时误删数据，社区呼吁对破坏性操作增加确认机制或沙箱限制。
- **桌面端 UI 状态同步**：#108472 等反映后台任务、侧边栏分组等 UI 组件状态不同步，影响任务追踪体验。
- **可配置性不足**：#108470 等请求将 `@` 导入的文件扩展名列表等配置项暴露给用户自定义。

---

**注**：本日报基于 GitHub 仓库 `anthropics/claude-code` 过去 24 小时内更新的 Issue 与 PR 数据生成，未包含未公开的内部测试或计划中的路线图信息。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-09  
**数据来源**: [github.com/openai/codex](https://github.com/openai/codex)

---

## 1. 今日速览

过去 24 小时内，OpenAI Codex 仓库未发布新版本，但社区活跃度依然较高。Windows 平台的浏览器访问、本地命令执行及 Computer Use 功能成为问题反馈的重灾区；同时，开发者对子代理安全钩子、远程会话附加以及模型限额透明度等功能提出了显著需求。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数与点赞数）筛选，涵盖 Bug 修复跟进与功能需求：

| # | 标题 | 状态 | 评论/👍 | 核心内容与重要性 | 链接 |
|---|------|------|---------|------------------|------|
| #57641 | [bug, windows-os, browser] Terminal CLI @Browser 失败："The browser access host is unavailable"（桌面应用更新 26.1023.6123.0 后） | OPEN | 48 / 29 | **最高关注度**。Windows 11 + Brave 浏览器用户在桌面应用更新后，Terminal CLI 的 @Browser 功能不可用，影响浏览器自动化工作流。 | [查看详情](https://github.com/openai/codex/issues/57641) |
| #37967 | [enhancement, CLI, session, remote] Remote Control 无法附加到活跃 CLI 会话（已完成线程可用，进行中失败） | CLOSED | 27 / 36 | 远程控制功能的核心痛点：手机端无法监听工作站上进行中的任务，仅支持已完成线程，严重影响移动端协作体验。 | [查看详情](https://github.com/openai/codex/issues/37967) |
| #49439 | [bug, sandbox, app] Desktop /approve 在 Auto-review 拒绝后不可用，尽管文档已说明 | OPEN | 11 / 0 | macOS 桌面端自动审阅拒绝后，/approve 按钮失效，与文档行为不一致，影响沙盒写入审批流程。 | [查看详情](https://github.com/openai/codex/issues/49439) |
| #56866 | [bug, rate-limits] Codex 5 小时限额在 10 分钟内耗尽（gpt 5.6 Terra） | OPEN | 11 / 0 | 用户反馈使用 gpt-5.6-terra 模型时，5 小时使用额度异常快速耗尽，引发对限额计算机制的质疑。 | [查看详情](https://github.com/openai/codex/issues/56866) |
| #51521 | [bug, windows-os, auth, app] Windows 应用：无法在同一账户下切换工作区而不登出 | CLOSED | 10 / 0 | Windows 客户端多工作区切换体验差，必须退出登录才能切换，影响团队协作与多项目管理。 | [查看详情](https://github.com/openai/codex/issues/51521) |
| #49737 | [bug, windows-os, connectivity, app-server, remote] [Android Remote] 任务消息和回复在超时时失败 | OPEN | 9 / 3 | Android 端打开已有 Codex Remote 任务时出现超时，重试后回复失败，影响跨端任务续传。 | [查看详情](https://github.com/openai/codex/issues/49737) |
| #60167 | [enhancement, CLI, hooks, subagent] Fail-closed hook：在父代理看到子代理结果前进行筛选 | OPEN | 8 / 0 | 安全方向功能请求：同步、失败即拦截的子代理结果审查钩子，可在结果写入父代理上下文前拦截，适用于 Fullsend 等场景。 | [查看详情](https://github.com/openai/codex/issues/60167) |
| #53487 | [bug, auth, sandbox, CLI, connectivity] Sites helper 凭证交接被自动审阅阻塞 | OPEN | 8 / 0 | CLI 0.162.1 下，Sites helper 的凭证交付被自动审阅机制拦截，导致认证流程中断。 | [查看详情](https://github.com/openai/codex/issues/53487) |
| #59941 | [bug, windows-os, sandbox, app] [Windows Desktop 26.1103.31037] CreateProcessSecurityEnvironment 0x8007000F 阻止所有本地命令 | OPEN | 4 / 0 | Windows 桌面应用更新后，本地命令执行在启动前即失败（甚至 `Get-Location` 也不可用），导致 CLI 本地工作流完全中断。 | [查看详情](https://github.com/openai/codex/issues/59941) |
| #60088 | [enhancement, app, subagent] [Feature Request] Master Chat 和 Project Orchestrator for Codex | OPEN | 5 / 0 | 提出引入“主聊天”系统，协调多个专业 Codex 会话，实现项目级编排，反映社区对多代理协作编排的需求。 | [查看详情](https://github.com/openai/codex/issues/60088) |

---

## 4. 重要 PR 进展（共 8 条，全部列出）

过去 24 小时内更新的 PR 均来自 `@copyberry[bot]`（除 #31045 外），多为自动化合并或基础设施改进：

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #60286 | Search task history from the command center | CLOSED | 命令中心搜索现仅过滤已加载任务，此 PR 扫描活跃后端历史，支持任务名称的大小写不敏感匹配，使旧任务可被发现。 | [查看详情](https://github.com/openai/codex/pull/60286) |
| #60280 | Fix MCP startup tracking when attaching to shared app servers | CLOSED | 修复客户端附加到共享 app server 时的 MCP 启动跟踪问题，避免本地配置服务器导致 TUI 卡在忙碌状态。 | [查看详情](https://github.com/openai/codex/pull/60280) |
| #31045 | Defer MCP auth discovery until startup failure | OPEN | 将网络依赖的 OAuth 发现从会话初始化中移出，防止不可用的可选 HTTP MCP 服务器导致本地聊天创建超时。 | [查看详情](https://github.com/openai/codex/pull/31045) |
| #60271 | Keep the agents overview open when there is no chat to return to | CLOSED | 调整代理概览页的退出逻辑：仅在有聊天或启动线程时允许取消操作关闭概览，优化空状态下的导航体验。 | [查看详情](https://github.com/openai/codex/pull/60271) |
| #60270 | Warn when a CLI model is absent from the ChatGPT model list | CLOSED | 当 CLI 模型覆盖不在 ChatGPT 模型列表中时显示启动警告，建议用户检查拼写或选择其他模型。 | [查看详情](https://github.com/openai/codex/pull/60270) |
| #60206 | Increase Bazel core unit test shards from 8 to 16 | CLOSED | 将 Bazel 核心单元测试分片从 8 增加到 16，旨在加速 CI 测试执行。 | [查看详情](https://github.com/openai/codex/pull/60206) |
| #60190 | Expose agent tree IDs and environment removal | CLOSED | 新增 `CodexThread::agent_tree_id()` 用于标识加载的代理树；新增 `EnvironmentManager::remove_environment()` 支持环境移除。 | [查看详情](https://github.com/openai/codex/pull/60190) |
| #60188 | Allow model overrides for incremental Code Mode tool messages | CLOSED | 为 Code Mode 工具目录更新和移除消息增加模型覆盖支持，通过 `exec_tools_update_hint` 等字段实现字符串字面量覆盖。 | [查看详情](https://github.com/openai/codex/pull/60188) |

---

## 5. 功能需求趋势

从 Issues 中提炼出的社区关注方向：

1. **多代理编排与安全管控**  
   如 #60167（子代理结果 fail-closed 钩子）和 #60088（Master Chat / Project Orchestrator），开发者希望在复杂项目中实现子代理结果审查、多会话协调与项目级编排。

2. **远程与跨端协作体验**  
   #37967（远程附加活跃会话）、#49737（Android Remote 超时失败）、#58425（Android 消息发送挂起）均指向移动端与桌面端会话同步的不稳定性。

3. **模型与限额透明度**  
   #56866（5 小时限额异常耗尽）、#48394（额度耗尽后不自动消费已购买积分）、#60270（CLI 模型不在 ChatGPT 列表时警告），用户对模型可用性、限额计算与计费行为的透明度要求提高。

4. **桌面端稳定性与本地执行**  
   #59941（CreateProcessSecurityEnvironment 阻断本地命令）、#56924（Chrome/Computer Use 启动失败）、#57641（@Browser 访问主机不可用），Windows 桌面应用更新后的本地命令与浏览器自动化故障是高频痛点。

---

## 6. 开发者关注点（痛点与高频需求）

### 痛点（Bug / 回归）
- **Windows 桌面应用更新后本地功能失效**：#59941、#56924、#57641 均指向近期桌面应用更新引入的回归问题，导致本地命令、浏览器自动化及 Computer Use 无法正常工作。
- **远程会话附加不可靠**：#37967、#49737、#58425 显示 Android/iOS 远程控制与桌面端 CLI 会话的连接不稳定，进行中的任务无法被移动端附加。
- **自动审阅与审批流程冲突**：#49439、#53487 反映 Auto-review 机制在特定场景下阻断正常操作（如 /

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-09)

## 今日速览

今日 Gemini CLI 社区无新版本发布，但 Issue 和 PR 活跃度较高，共 50 条更新的 Issue 和 13 条更新的 PR。社区核心关注点集中在 **Subagent 稳定性（如 MAX_TURNS 恢复、通用代理卡死）**、**安全加固（Windows Git 权限绕过、MCP OAuth 调度、CI 泄露风险）** 以及 **工具调用超时控制** 等方面。

## 版本发布

过去 24 小时内无新版本 Release。

---

## 社区热点 Issues（Top 10）

以下按社区讨论热度（评论数与优先级）筛选，均为近期持续更新的开放议题：

| # | 标题 | 优先级/类型 | 评论 | 关注理由 |
|---|------|------------|------|---------|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption | P1 / Bug | 13 | 子代理在达到最大轮次后仍上报 `status: "success"`，掩盖了任务中断，直接影响代理可靠性，需重测。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | Generalist agent hangs | P1 / Bug | 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，用户需手动取消，严重影响可用性。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing | P2 / Enhancement | 9 | 探索利用模型原生 Bash 能力，通过零依赖 OS 沙箱提升代码库探索与文件编辑效率，方向前瞻。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | Assess the impact of AST-aware file reads, search, and mapping | P2 / Feature | 7 | 评估 AST 感知型文件读取/搜索/映射对减少 Token 消耗和提升导航精度的价值，属于架构优化议题。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini does not use skills and sub-agents enough | P2 / Bug | 7 | 模型主动调用自定义技能和子代理的意愿不足，需显式指令才触发，影响自动化体验。 |
| [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) | Browser Agent ignores settings.json overrides (e.g., maxTurns) | P2 / Bug | 5 | 浏览器代理忽略全局/项目级 `settings.json` 配置，导致 `maxTurns` 等参数失效。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | browser subagent fails in wayland | P1 / Bug | 4 | 浏览器子代理在 Wayland 环境下失效，涉及桌面端兼容性问题。 |
| [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | Enhance browser_agent resilience: Automatic session takeover and lock recovery | P3 / Feature | 4 | 浏览器代理在遇到锁定配置文件时采用 fail-fast 策略，社区期望自动会话接管与锁恢复机制。 |
| [#21000](https://github.com/google-gemini/gemini-cli/issues/21000) | Experiment with using native file tools for creating and maintaining the task tracker | P3 / Bug | 4 | 探索使用原生文件工具维护任务追踪器，替代当前依赖上下文的内存方式，解决“上下文腐烂”问题。 |
| [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) | ~/.gemini/agents/filename.md is not recognized as an agent if filename.md is a symlink | P2 / Bug | 4 | 代理目录下的软链接文件不被识别为子代理，影响用户自定义代理的灵活部署。 |

---

## 重要 PR 进展（Top 10）

以下 PR 近期有更新，涵盖安全修复、功能增强与 CI 改进：

| # | 标题 | 状态 | 核心内容 |
|---|------|------|---------|
| [#30095](https://github.com/google-gemini/gemini-cli/pull/30095) | fix: prevent Windows git diff permission bypass | OPEN | **P1 安全修复**。修复 Windows 上 Git 命令安全绕过问题，将危险 Git 参数误判为只读操作的风险；提取共享验证助手，统一只读命令校验。 |
| [#30090](https://github.com/google-gemini/gemini-cli/pull/30090) | ci(chained_e2e): don't expose GEMINI_API_KEY to fork-controlled code | OPEN | **CI 安全加固**。防止 `chained_e2e.yml` 在 fork 触发的工作流中泄露 `GEMINI_API_KEY`，仅在触发运行的受信上下文中解密 artifact。 |
| [#30071](https://github.com/google-gemini/gemini-cli/pull/30071) | Route MCP OAuth fetches through the safe dispatcher | OPEN | **MCP 安全增强**。OAuth 元数据与注册获取应通过安全调度器进行重新验证，防止 DNS 解析在检查时与连接时不一致导致的安全风险。 |
| [#27423](https://github.com/google-gemini/gemini-cli/pull/27423) | feat(core): add configurable per-tool-call timeout (tools.callTimeout) | OPEN | 新增 `tools.callTimeout` 配置，限制单次工具调用的墙钟时间，解决 Shell 命令等长时间调用无法超时中止的问题（关联 #3375）。 |
| [#29918](https://github.com/google-gemini/gemini-cli/pull/29918) | feat(cli): report working, blocked and idle status to the terminal (OSC 7501) | CLOSED | 交互式 TUI 通过 OSC 7501 向终端报告程序状态（working/blocked/done/error/idle），便于多标签页终端展示会话状态。 |
| [#29919](https://github.com/google-gemini/gemini-cli/pull/29919) | feat(cli): append to the system prompt with --append-system-prompt | CLOSED | 新增 `--append-system-prompt` / `--append-system-prompt-file` 及环境变量 `GEMINI_APPEND_SYSTEM_MD`，支持在不替换系统提示词的前提下追加项目上下文。 |
| [#29912](https://github.com/google-gemini/gemini-cli/pull/29912) | fix(core): strip trailing punctuation and unbalanced brackets from web_fetch URLs | CLOSED | 修复 `web-fetch` 工具解析 URL 时未剔除尾部标点，导致 `https://example.com/,` 等非法 URL 下游失败的问题。 |
| [#30068](https://github.com/google-gemini/gemini-cli/pull/30068) | fix(cli): forward context management settings to core | OPEN | 修复 `contextManagement` 配置（如输出掩码阈值 400k Token）未正确透传至 Core 配置，导致仍使用默认 50k 阈值的问题。 |
| [#30066](https://github.com/google-gemini/gemini-cli/pull/30066) | ci: inert canary in package.json scripts (security PoC - do not merge) | OPEN | **安全 PoC（勿合并）**。针对 Google OSS VRP 的概念验证，将构建与测试脚本替换为无害回显，用于演示 fork 分支代码在自托管 Runner 上的执行风险。 |
| [#29258](https://github.com/google-gemini/gemini-cli/pull/29258) | chore/release: bump version to 0.61.0-nightly.20260909.ged2ac40df | OPEN (Stale) | 自动化夜间版本号 bump，当前处于过期/挂起状态。 |

---

## 功能需求趋势

从近期 Issues 与 PR 中可提炼出以下社区关注方向：

1. **子代理（Subagent）可靠性与自动化**  
   社区高度关注子代理在超时、挂起、配置忽略等场景下的表现（如 #22323、#21409、#21968、#22267），期望提升子代理的自我恢复能力与主动调用意愿。

2. **AST 感知型代码理解工具**  
   多个 Issue 探讨基于 AST 的文件读取、搜索与代码库映射（#22745、#22746、#22747），旨在通过更精确的代码边界定位降低 Token 耗并提升导航效率。

3. **安全沙箱与权限控制**  
   无论是 Windows Git 权限绕过（#30095）、MCP OAuth 调度（#30071），还是 CI API Key 泄露（#30090），安全与沙箱机制已成为当前最高优先级的改进领域。

4. **工具调用生命周期管理**  
   可配置的单次工具调用超时（#27423）、原生文件工具用于任务追踪（#21000）、浏览器会话锁恢复（#22232）等，反映社区希望对代理的工具执行过程有更细粒度的控制与可观测性。

5. **跨平台与环境兼容性**  
   Wayland 下的浏览器代理失效（#21983）、软链接代理识别（#20079）等问题显示，Linux 桌面环境及文件系统特殊情况的适配仍是痛点。

---

## 开发者关注点

- **P1 级 Bug 积压**：#22323（子代理伪成功上报）和 #21409（通用代理挂起）均为 P1 优先级且长期未解决，直接影响核心交互体验，建议社区与维护者加快重测与修复节奏。
- **配置透传与一致性**：#30068 暴露出 CLI 层配置未正确透传至 Core 的问题，暗示配置管理链路存在断层，可能影响其他自定义设置的生效。
- **安全合规与供应链**：#30066、#30090 等安全相关 PR 显示，社区正在积极应对 fork 代码执行、密钥泄露等供应链安全威胁，后续需关注安全补丁的合并进度。
- **文档与示例代

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报

**日期**: 2026-11-09  
**数据来源**: github.com/esengine/DeepSeek-Reasonix  

---

## 1. 今日速览

过去24小时内，DeepSeek-Reasonix 仓库未发布新版本，但社区活跃度较高，共产生 15 条 Issue 更新和 6 个 PR 更新。核心关注点集中在 **Reasonix Studio v2.58.0 的界面体验问题**、**跨平台终端/Shell 兼容性 Bug**、以及 **MCP 配置命令的安全隐患** 上。依赖升级方面，Dependabot 提交了多个 Go/JavaScript 依赖包的自动化更新 PR，目前均已关闭。

---

## 2. 版本发布

过去24小时内无新版本 Release。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 类型 | 关键反馈 | 链接 |
|---|------|------|----------|------|
| #15022 | `reasonix mcp import --help` 实际执行导入（配置重写 + 明文凭证写入） | Bug / 安全 | `--help` 被误当作位置参数，导致非预期的配置修改和明文凭证泄露风险，属高危安全缺陷。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15022) |
| #15001 | DeepSeek API key 无法在 Android 移动端使用 | Bug / Provider | 用户在 Reasonix Studio 2.56.1 中填写 DS Key 时提示“服务器不允许修改模型来源”，影响移动端核心功能。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15001) |
| #15020 | 等待回包时间显著变长 | Bug / 性能 | 多位用户反馈 v2.58.0 响应延迟增加，疑似回归性能问题，需关注后端或网络层变更。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15020) |
| #15024 | 最新版本界面不够好看，操作不便 | Enhancement / UX | 用户反馈 v2.58.0 界面变化导致操作步骤增加（每个功能需单独点击进入），效率下降。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15024) |
| #15033 | 添加清理功能 | Enhancement | 用户请求新增清理功能，可能涉及缓存、临时文件或会话数据管理，属产品增强需求。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15033) |
| #15031 | Linux "Open in terminal" 启动 konsole 而非默认 kitty | Bug / Desktop | Linux 桌面端未遵循系统默认终端设置，硬编码终端选择顺序，影响开发者工作流。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15031) |
| #15023 | Windows 下 bash 命令输出 `/tmp` 警告 | Bug / Windows | Git for Windows 环境下反复提示 `could not find /tmp`，影响命令行体验，需适配 MSYS2/Cygwin 路径。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15023) |
| #15016 | Windows 启动时控制台闪现 | Bug / Desktop | 内核实例探测未使用 `windowsHide`，导致每次启动闪现黑窗口，虽为 cosmetic 问题但影响专业感。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15016) |
| #15034 | 思考参数预设切换后仍显示 low/medium/high | Bug / Studio | UI 与后端预设值不同步，用户切换预设后界面未正确反映，影响参数调优体验。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15034) |
| #15032 | Daily research 2026-11-09（Claude Code 2.1.319 对标研究） | Agent / Research | 团队内部研究 Issue，对比竞品 Claude Code 的权限拒绝与后续执行机制，探讨 Reasonix 委派工作者的实现方案。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/15032) |

---

## 4. 重要 PR 进展（精选 6 条）

| # | 标题 | 状态 | 内容摘要 | 链接 |
|---|------|------|----------|------|
| #15025 | chore(deps): bump the go group with 3 updates | CLOSED | 更新 Go 依赖：`spf13/pflag` (1.0.10→1.1.0)、`yuin/goldmark`、`modernc.org/sqlite`。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/15025) |
| #15028 | chore(deps): bump the actions group with 4 updates | CLOSED | 更新 GitHub Actions 依赖：`pnpm/action-setup`、`actions/setup-java`、`codeql-action/init`、`codeql-action/analyze`。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/15028) |
| #15029 | chore(deps): bump npm group in /desktop/frontend-next with 11 updates | CLOSED | 前端依赖批量更新，包括 `@a2ui/react` (0.14.0→0.15.0) 等 11 个包。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/15029) |
| #15027 | chore(deps): bump electron from 45.1.0 to 45.2.3 | CLOSED | Electron 桌面框架补丁更新，修复潜在稳定性与安全问题。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/15027) |
| #15030 | chore(deps): bump npm-1x group in /desktop/frontend with 8 updates | OPEN | 旧版前端依赖更新，包括 `@tanstack/react-virtual` (3.14.13→3.14.26) 等 8 个包，待合并。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/15030) |
| #15026 | chore(deps): bump github.com/yuin/goldmark from 1.8.6 to 1.8.7 | OPEN | Go Markdown 解析库微版本升级，待合并。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/15026) |

---

## 5. 功能需求趋势

从本日全部 Issues 中提炼，社区最关注的功能方向如下：

1. **桌面端交互与 UX 优化**  
   用户普遍关注 Reasonix Studio 的界面布局、操作步骤简化及启动体验（如控制台闪现、终端默认选择、输入框 Markdown 支持说明等）。

2. **跨平台终端与 Shell 兼容性**  
   Windows（Git for Windows/MSYS2）和 Linux（默认终端未遵循）的 Shell 集成问题频繁出现，表明跨平台命令行适配是当前痛点。

3. **MCP 与配置安全**  
   `reasonix mcp import` 命令参数解析缺陷导致意外配置写入和明文凭证暴露，社区对 CLI 工具的安全性要求较高。

4. **模型参数与 API 适配**  
   思考参数预设不同步、Android 端 API Key 无法使用等问题，反映用户对多模型来源、参数管理及移动端支持的需求。

5. **性能与响应优化**  
   回包延迟变长的反馈显示，性能回归监控与优化已成为用户关注焦点。

---

## 6. 开发者关注点（痛点与高频需求）

- **界面变更引发的体验分歧**：v2.58.0 界面更紧凑，部分用户认为更好用（#15021），但更多用户反馈操作变繁琐、不够简洁（#15024、#15018），建议团队在后续迭代中提供更灵活的布局或经典模式切换。
- **CLI 命令安全性**：`--help` 被误执行导致配置被重写并以明文写入凭证（#15022），需尽快修复命令行参数解析逻辑，避免类似安全事故。
- **Windows 启动体验**：控制台闪现（#15016）和 `/tmp` 路径警告（#15023）虽不影响核心功能，但频繁出现在反馈中，建议优化 Windows 启动流程与 Shell 环境初始化。
- **移动端 API Key 支持**：Android 端无法使用 DeepSeek API Key（#15001），若 Reasonix 计划扩大移动端用户，此问题需优先处理。
- **性能回归**：多个用户反馈 v2.58.0 回包变慢（#15020），建议在发布前加强性能回归测试。

---

**报告生成时间**: 2026-11-09  
**数据覆盖范围**: 2026-11-08 00:00 至 2026-11-08 23:59（GitHub 更新时间）

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-09)

## 今日速览

OpenCode 社区今日围绕**免费层配额问题**与**子代理（Subagent）行为**展开密集讨论，#59387 免费层主楼已累计 333 条评论，成为社区最高优先级的长尾问题。与此同时，开发者持续推进 TUI 插件系统、SQLite 全文检索及会话恢复机制的改进，今日合并了多项核心修复与文档更新，暂无新版本发布。

## 版本发布

过去 24 小时内无新版本 Release。

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 核心内容 | 社区反应/重要性 | 链接 |
|---|------|------|----------|----------------|------|
| #59387 | [zen] Free tier issues: read this first, then post your report here | OPEN | 免费层配额重置失效、提示订阅 Go 等问题的主汇总楼 | **社区最高热点**，333 条评论、25 赞，持续两周未解决，影响大量免费用户 | [查看](https://github.com/anomalyco/opencode/issues/59387) |
| #58687 | All Free Models Show "You've Used Today's Free Messages" Even After Switching Models | CLOSED | 切换模型后所有免费模型仍显示每日用量已达上限 | 8 条评论，反映免费模型路由与计数逻辑存在缺陷 | [查看](https://github.com/anomalyco/opencode/issues/58687) |
| #62213 | Subagent writes denied: built-in tester policy 'edit * deny' is appended after agent rules | CLOSED | 子代理在非测试路径被拒绝写入，因内置策略在 agent 规则之后注入，后匹配优先 | 7 条评论，涉及权限策略优先级设计，对子代理可用性影响大 | [查看](https://github.com/anomalyco/opencode/issues/62213) |
| #62214 | Critical: Session Data Management Issues - Unbounded Growth & No Cleanup | CLOSED | 会话数据无限增长且缺乏清理机制，数据库持久化存在隐患 | 3 条评论，标记为 Critical，长期存储与性能隐患 | [查看](https://github.com/anomalyco/opencode/issues/62214) |
| #62194 | V2 cold-start model resolution can select an unavailable catalog provider | CLOSED | V2 冷启动时模型目录可能在提供商注册表加载前填充，导致选中不可用提供商 | 3 条评论，涉及 V2 架构启动顺序问题 | [查看](https://github.com/anomalyco/opencode/issues/62194) |
| #62666 | TUI plugin from an npm package: solid-js signal updates do not re-render slots | CLOSED | 从 npm 包加载的 TUI 插件中，Solid 信号更新不会触发槽位重新渲染 | 6 条评论，插件生态关键体验问题 | [查看](https://github.com/anomalyco/opencode/issues/62666) |
| #62668 | tui: tab loading indicator disappears while background tasks are still running | CLOSED | 后台任务仍在运行时，TUI 标签页加载指示器消失，误导用户认为会话已结束 | 4 条评论，TUI 状态同步缺陷 | [查看](https://github.com/anomalyco/opencode/issues/62668) |
| #59906 | Allow pinning sessions on the new experimental view. | OPEN | 在新实验性视图中支持固定会话 | 2 评论、1 赞，用户对会话管理功能有明确需求 | [查看](https://github.com/anomalyco/opencode/issues/59906) |
| #62772 | [FEATURE]: Pin sessions in experimental Inbox | CLOSED | 在实验性 Inbox 中固定会话至最近会话之上 | 1 评论，与 #59906 形成功能需求闭环 | [查看](https://github.com/anomalyco/opencode/issues/62772) |
| #62782 | [FEATURE]: Redact secrets in "Export session" JSON by default | OPEN | 导出会话 JSON 时默认隐藏敏感信息 | 1 评论，涉及数据安全与隐私合规，开发者关注度高 | [查看](https://github.com/anomalyco/opencode/issues/62782) |

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #62788 | feat(core): report Claude plan usage to OpenCode Console | OPEN | 登录后向 OpenCode Console 上报 Claude 计划使用情况，配合 opencode-console#6356 上线 | [查看](https://github.com/anomalyco/opencode/pull/62788) |
| #62796 | fix(server): stop waiting for plugins in request handlers | OPEN | 移除服务器请求处理器中对插件的等待，恢复非阻塞目录读取，避免插件激活阻塞请求 | [查看](https://github.com/anomalyco/opencode/pull/62796) |
| #62769 | feat(core): experimental sqlite full-text index of session history | OPEN | 新增 SQLite FTS5 全文索引（`sqlite_fts` 标志），后台构建会话历史索引，为后续搜索工具奠定基础 | [查看](https://github.com/anomalyco/opencode/pull/62769) |
| #62147 | fix(core): tail reads from the end of a file and suggest close file names | CLOSED | 越界读取返回文件尾部行；负偏移量从末尾读取；缺失文件建议同目录下近似文件名，减少 Agent 重试调用 | [查看](https://github.com/anomalyco/opencode/pull/62147) |
| #62791 | fix(core): terminalize orphaned child sessions suspended by a restart | CLOSED | 服务器重启时，若无法恢复子代理执行，则终止孤儿子会话，避免僵尸会话残留 | [查看](https://github.com/anomalyco/opencode/pull/62791) |
| #62789 | docs(legal): cover hosted agent sessions and their retention | CLOSED | 更新隐私政策中关于托管代理会话及其保留期限的说明 | [查看](https://github.com/anomalyco/opencode/pull/62789) |
| #62790 | fix(site): point the legal history's hosted agents entry at dev's commit | CLOSED | 修复法律历史记录中托管代理条目指向的提交，指向 dev 分支的 squash 提交 | [查看](https://github.com/anomalyco/opencode/pull/62790) |
| #62786 | feat(ai): support Venice end-to-end encrypted models | OPEN | 新增对 Venice E2EE 模型的支持，`e2ee-*` 模型请求将走端到端加密通道 | [查看](https://github.com/anomalyco/opencode/pull/62786) |
| #62785 | fix(core): capture snapshots when an embedded repository's status fails | OPEN | 修复嵌入式仓库状态失败时的快照捕获问题，避免 `git diff-files` 对 gitlink 反复检查 | [查看](https://github.com/anomalyco/opencode/pull/62785) |
| #62784 | docs(console): document Watches | OPEN | 为 Console "Watches" 功能添加客户端文档，暂持回待功能对外开放后再合并 | [查看](https://github.com/anomalyco/opencode/pull/62784) |

## 功能需求趋势

从今日 Issues 与 PR 可观察到以下社区关注方向：

1. **会话管理与持久化**：固定会话（#59906、#62772）、会话数据无限增长（#62214）、会话历史全文检索（#62769），表明用户希望对长期会话有更强的组织与检索能力。
2. **子代理（Subagent）行为与权限**：子代理写入被拒（#62213）、模型参数与 AGENTS.md 路由冲突（#62787）、缺少 sessionID 时静默启动新子代理（#62793）、权限提示不明确会启动子代理（#62795），社区对子代理的可控性与透明度要求提高。
3. **TUI 插件体验**：Solid 信号不重渲染（#62666）、标签页加载指示器状态同步（#62668）、Plan 模式提示残留（#62797），插件生态的稳定性与 UI 一致性是短期痛点。
4. **免费层与配额**：#59387、#58687、#62658、#62783 均围绕免费模型配额重置与限制，免费用户体验是社区情绪的主要波动源。
5. **数据安全与隐私**：导出会话 JSON 默认隐藏密钥（#62782）、托管代理会话保留期限文档（#62789），安全合规需求开始浮现。
6. **新模型与提供商支持**：Venice E2EE 模型（#62786）、冷启动模型解析（#62194），模型生态扩展持续进行。

## 开发者关注点

- **免费层配额机制亟需修复**：#59387 作为长期未解决的主楼，社区情绪集中，建议官方给出明确的重置逻辑说明或修复时间表。
- **子代理策略优先级设计存在歧义**：内置 `edit * deny` 策略在 Agent 规则之后注入导致后匹配优先，开发者建议 Agent 前置规则应具有最高优先级。
- **TUI 插件开发体验需改进**：跨包加载的插件响应式更新失效、加载状态与后台任务不同步，影响插件开发者的信心。
- **会话数据清理缺失**：无限增长的会话数据可能导致数据库膨胀，社区期待官方提供清理策略或配置项。
- **导出功能的敏感信息处理**：默认不隐藏密钥的会话导出存在泄露风险，建议尽快纳入默认脱敏逻辑。

---
*数据来源：github.com/anomalyco/opencode（过去 24 小时 Issues 与 PR 更新）*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-11-09)

## 1. 今日速览

本周 Hermes 社区围绕 **多租户架构**、**Telegram 适配器稳定性** 以及 **插件目录扩展** 展开密集活动。虽然过去 24 小时无新版本发布，但开发者提交了大量针对状态存储、Telegram 消息路径和插件目录的 PR，社区正在推进从底层会话隔离到上层插件生态的全方位完善。

## 2. 版本发布

过去 24 小时内 Hermes 无新版本 Release。

---

## 3. 社区热点 Issues（共 6 条近期更新，全部列出）

| # | 标题 | 状态 | 核心内容 | 为何值得关注 | 链接 |
|---|------|------|----------|--------------|------|
| #147619 | Pain cluster: auxiliary lanes (compression, goal judge, vision, fallback) call the wrong model on custom/local/fallback routes | OPEN | 辅助通道（压缩、目标评判、视觉、回退）在自定义/本地/回退路由上调用了错误模型，且错误指向错误配置 | 来自每周痛点挖掘（Pain Miner），涉及模型路由核心逻辑，影响多租户和自定义模型场景的可用性 | [查看](https://github.com/NousResearch/hermes-agent/issues/147619) |
| #131208 | Unknown model ids default to the text path for images — a live probe could detect vision support | OPEN | 新模型 ID 不在配置或 models.dev 目录中时，图片会被当作文本引用发送，缺乏视觉能力探测机制 | 涉及多模态模型自动适配，对接入新模型的用户体验有直接影响 | [查看](https://github.com/NousResearch/hermes-agent/issues/131208) |
| #146503 | Bens Magical Ticket of Multi-tenancy | OPEN | 探讨在单个 Hermes 进程中承载多个租户，租户代码运行在远程沙箱，仅加载 Nous 策划的插件和 MCP 服务器 | 架构方向性议题，决定 Hermes 托管版的多租户隔离模型 | [查看](https://github.com/NousResearch/hermes-agent/issues/146503) |
| #151556 | [Bug][Webapp]: iPhone Safari rich-text paste is a silent no-op | OPEN | iPhone Safari 中从 iOS 原生应用复制的富文本粘贴到聊天作曲器无反应，已输入文字会正常发送 | Web 端剪贴板兼容性问题，影响移动端用户体验 | [查看](https://github.com/NousResearch/hermes-agent/issues/151556) |
| #151547 | [Feature/Bug]: Desktop group chat – every new message force-scrolls to the latest | OPEN | 桌面群聊中新消息会强制滚动到底部，导致用户无法阅读之前的回复 | 群聊交互体验缺陷，在多代理轮流回答场景下尤为突出 | [查看](https://github.com/NousResearch/hermes-agent/issues/151547) |
| #124406 | [Bug]: Telegram auto-TTS drops the voice bubble (and duplicates the text) when an emoji-heavy reply exceeds 1024 UTF-16 units | CLOSED | Telegram 自动 TTS 在表情符号较多且超过 1024 UTF-16 单位时丢失语音气泡并重复文本 | 已关闭，但相关修复 PR（#124407、#150980）仍在跟进，涉及 Telegram 消息发送可靠性 | [查看](https://github.com/NousResearch/hermes-agent/issues/124406) |

> **注**：数据源中过去 24 小时内更新的 Issue 共 6 条，已全部列出。

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 作者 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|------|---------------|------|
| #151554 | feat(state): session store and turn admission ports, with today's state.db as the local backend | @benbarclay | OPEN | 引入会话存储和轮次准入端口，以当前 state.db 作为本地后端，为状态分层奠定基础 | [查看](https://github.com/NousResearch/hermes-agent/pull/151554) |
| #151555 | test(conformance): an installed storage port suite that every backend must pass | @benbarclay | OPEN | 新增存储端口一致性测试套件，要求所有后端必须通过，堆叠于 #151554 之上 | [查看](https://github.com/NousResearch/hermes-agent/pull/151555) |
| #151553 | feat(state): fence a claimed turn's writes in the session store's own transaction | @benbarclay | OPEN | 在会话存储的独立事务中围栏已认领轮次的写入，保证状态写入原子性 | [查看](https://github.com/NousResearch/hermes-agent/pull/151553) |
| #151076 | fix(telegram): configured DM topics are reused after reconnects | @teknium1 | OPEN | 修复 Telegram 重连后配置的 DM 主题被重复创建，且会话修剪后从频道目录消失的问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/151076) |
| #151057 | fix(telegram): private-topic replies keep their topic on retry | @teknium1 | OPEN | 修复私有主题回复重试时丢失路由，媒体掉入根聊天、文本丢失的问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/151057) |
| #151042 | fix(telegram): /model picker shows every provider and readable model buttons | @teknium1 | OPEN | 修复 Telegram `/model` 选择器中自定义提供商不显示、长模型 ID 被截断的问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/151042) |
| #150997 | fix(telegram): nested emphasis, expandable quotes, GFM code spans render correctly | @teknium1 | OPEN | 修复 Telegram 中嵌套强调、可展开引用、代码片段、表格管道符和金额渲染错误 | [查看](https://github.com/NousResearch/hermes-agent/pull/150997) |
| #151411 | plugin-catalog: add salts-secrets | @dotv-7 | OPEN | 向插件目录添加 Salt's Secrets，提供基于身份的上下文隔离，适用于陌生人可访问的 Hermes 部署 | [查看](https://github.com/NousResearch/hermes-agent/pull/151411) |
| #151543 | feat(plugin-catalog): add seedguard (secret firewall) | @Investorquab | OPEN | 添加 Seedguard 插件，作为密钥防火墙，替换私钥、BIP39 助记词、API Key 等敏感信息 | [查看](https://github.com/NousResearch/hermes-agent/pull/151543) |
| #150982 | catalog: add kin (vdimarco/hermes-kin) | @vdimarco | OPEN | 添加 Kin 插件，为 Hermes Desktop 赋予角色化虚拟形象，可在侧边栏反应工作状态 | [查看](https://github.com/NousResearch/hermes-agent/pull/150982) |

---

## 5. 功能需求趋势

从近期 Issues 和 PR 中可提炼出以下社区关注方向：

1. **多租户与身份隔离**：Issue #146503 和 PR #151411（Salt's Secrets）表明社区对单进程多租户部署、基于身份的上下文隔离需求强烈。
2. **模型路由与多模态自适配**：Issue #131208 和 #147619 指向对新模型 ID 的自动视觉能力探测，以及辅助通道（压缩、回退、目标评判）模型路由的精确控制需求。
3. **Telegram 适配器稳定性**：大量 PR 集中于 Telegram 主题路由、TTS 音频气泡、Markdown 渲染和模型选择器，说明即时通讯平台集成是当前重点。
4. **插件生态扩展**：连续多个 PR 向 `plugin-catalog` 提交新插件（Seedguard、Kin、LaunchSpy、Tightbeam 等），插件化扩展已成为社区活跃方向。
5. **状态存储与事务一致性**：@benbarclay 连续提交的会话存储端口、轮次准入、事务围栏等 PR，显示底层状态管理正在向可插拔后端和一致性保障方向演进。

---

## 6. 开发者关注点

- **模型路由配置复杂度**：自定义/本地/回退路由下辅助通道容易调用错误模型，且错误信息指向错误配置（#147619），开发者需要更清晰的模型路径追踪和配置校验。
- **即时通讯平台兼容性**：Telegram 在 UTF-16 字符计数、主题重连、富文本渲染等方面存在多个边界情况，开发者需要更严格的协议契约测试（如 #150980 的代码点上限测试）。
- **Web 端剪贴板与交互体验**：iPhone Safari 富文本粘贴失效（#151556）和桌面群聊强制滚动（#151547）反映出前端跨平台一致性仍有提升空间。
- **插件安全与沙箱**：多租户场景下插件和 MCP 服务器的加载策略（#146503）以及密钥防火墙插件（#151543）显示社区对供应链安全和租户隔离的关注度在上升。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-09)

## 1. 今日速览

OpenClaw 今日发布 **v2026.11.2**，重点加强隐私与信任边界，将敏感配置、对话内容及工具错误排除在诊断日志之外。社区活跃度较高，14 个 Issue 与 50 个 PR 在过去 24 小时内更新，其中 P0 级别的 Feishu iOS 流式卡片显示缺陷成为当前最高优先级修复目标；SQLite 并发写锁竞争与 Control UI 会话切换异常等 P1 问题持续引发开发者关注。

## 2. 版本发布

**v2026.11.2** ([Release 链接](https://github.com/openclaw/openclaw/releases/tag/v2026.11.2))

本次更新聚焦 **Privacy and trust boundaries**（私与信任边界）：
- 将配置密钥、对话内容、工具错误和频道负载排除在诊断日志之外，防止敏感信息泄露；
- 强制执行选定的提供商（provider）和导航信任边界；
- 在热 CLI 轮次（warm CLI turns）后释放 MCP 授权，减少权限残留。

相关 Issue/PR：#191318、#174998

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 关键原因 | 链接 |
|---|------|------------|---------|------|
| #195462 | Feishu 流式卡片在 iOS 8.5.13 降级为“升级客户端”占位符，回复不可见 | P0, release blocker, silver shellfish | 飞书频道在最新 iOS 客户端上所有流式回复均变为占位符，直接导致消息不可见，已标记为发布阻塞器，需立即修复。 | [查看](https://github.com/openclaw/openclaw/issues/195462) |
| #117262 | SQLite 并发写句柄竞争导致 ~33s 事件循环卡顿 | P1, crash-loop, silver shellfish | 主状态数据库出现 3 个并发写句柄，WAL 达 4 MB，引发严重事件循环阻塞，已有 13 条评论跟进，影响核心稳定性。 | [查看](https://github.com/openclaw/openclaw/issues/117262) |
| #194768 | Control UI 选择其他 Agent 的会话后静默回退，聊天不加载 | P1, session-state, ux-friction | 在 2026.11.1 上复现，跨 Agent 会话切换时 UI 状态不同步，导致聊天内容无法加载，影响多 Agent 管理场景。 | [查看](https://github.com/openclaw/openclaw/issues/194768) |
| #137871 | IMAP 插件 `deliver: true` 在多频道配置下失败 | P1, message-loss, diamond lobster | 缺少 `channel`/`to` 字段导致多频道（如 Telegram + Zalo）场景下投递失败，属于消息丢失类问题。 | [查看](https://github.com/openclaw/openclaw/issues/137871) |
| #160494 | 绑定持久会话的 Cron 任务在会话轮转时被拒绝，重试陷入循环 | P2, message-loss, silver shellfish | 调度器重复进入相同拒绝窗口，导致定时任务无法执行，涉及会话状态与调度逻辑的交叉缺陷。 | [查看](https://github.com/openclaw/openclaw/issues/160494) |
| #160719 | `sessions.delete` 返回 `ok:true / deleted:false`，孤立会话窗口无法清理 | P2, session-state, diamond lobster | 条目无效（`entry_valid=-1`）时 CLI/doctor/reaper 均无法退役，导致会话状态泄漏。 | [查看](https://github.com/openclaw/openclaw/issues/160719) |
| #192256 | Android 新建聊天按钮打开现有聊天 | P2, ux-friction | Android 客户端交互缺陷，+ 按钮未按预期启动新会话，影响移动端可用性。 | [查看](https://github.com/openclaw/openclaw/issues/192256) |
| #185092 | Windows 节点已配对但浏览器控制失败（监听器所有权/认证错误） | P2, ux-friction | Windows 节点与网关连接正常，但浏览器会话无法可靠交互，涉及跨平台控制通道的认证问题。 | [查看](https://github.com/openclaw/openclaw/issues/185092) |
| #186494 | Android 保留过期/已回答的密钥提示卡片，`/reset` 无法清除 | P2, diamond lobster, ux-friction | 密钥请求卡片在聊天底部堆积，仅强制停止应用可清除，影响长期使用体验。 | [查看](https://github.com/openclaw/openclaw/issues/186494) |
| #195289 | 意大利伴侣 Agent 在明确意图澄清后仍草拟消息 | P3, ux-friction | 本地 Ollama 模型（qwen2.5:7b）未遵循用户显式纠正，持续执行错误意图，反映 Agent 意图理解与纠偏机制不足。 | [查看](https://github.com/openclaw/openclaw/issues/195289) |

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 类型/规模 | 修复或功能内容 | 链接 |
|---|------|----------|--------------|------|
| #195472 | fix(active-memory): expire recall circuit breaker on elapsed time | app: web-ui, XS | 修复 Active Memory 超时断路器因 NTP 时钟回拨导致 `Date.now()` 计算异常，使召回长期暂停的问题。 | [查看](https://github.com/openclaw/openclaw/pull/195472) |
| #195444 | fix(ui): keep IME composition Enter from connecting from the login form | app: web-ui, S | 修复 CJK/IME 输入法在登录表单确认候选词时触发 `connect()`，导致使用半输入的网关 URL 或密钥发起连接。 | [查看](https://github.com/openclaw/openclaw/pull/195444) |
| #195376 | fix: retain native child results after interrupted admission on 2026.11.1 | docs, gateway, agents, M | 修复 2026.11.1 中原生 Codex 子进程在首次父级入场中断后结果被永久丢弃的问题。 | [查看](https://github.com/openclaw/openclaw/pull/195376) |
| #194645 | fix(proxy): reject FIFO and oversized CA bundles without hanging | size: S, P2 | 修复 `proxy validate --proxy-ca-file` 指向 FIFO 或过大 CA 包时无限挂起的问题，增强 TLS 代理校验鲁棒性。 | [查看](https://github.com/openclaw/openclaw/pull/194645) |
| #195400 | fix: Telegram restart recovery leaves final replies silent | docs, M, P1 | 修复网关重启后 Telegram 最终回复未确认、恢复拒绝重发且聊台无提示的问题。 | [查看](https://github.com/openclaw/openclaw/pull/195400) |
| #195455 | fix(channels): channels remove asks to disable an unknown channel before reporting it does not exist | commands, XS, P2 | 修复删除不存在的频道时先询问“禁用未知账户”再报错，非交互式 Shell 下无法响应的问题。 | [查看](https://github.com/openclaw/openclaw/pull/195455) |
| #194846 | fix(swabble): transcript history ignores transcripts.maxEntries | size: S, P2 | 修复 `transcripts.log` 忽略 `transcripts.maxEntries` 配置，始终保留 100 条记录的问题。 | [查看](https://github.com/openclaw/openclaw/pull/194846) |
| #194845 | fix(swabble): serve overwrites an unreadable config with defaults | size: XS, P0 | 修复 `swabble serve` 在配置文件加载失败（如 JSON 语法错误）时用默认配置覆盖用户文件的问题。 | [查看](https://github.com/openclaw/openclaw/pull/194845) |
| #195459 | fix(doctor): stop large transcript repairs exhausting the heap | docs, gateway, scripts, L, P2 | 修复 `doctor --fix` 在检查大型压缩转录数据库时耗尽 JavaScript 堆内存，改为分块处理。 | [查看](https://github.com/openclaw/openclaw/pull/195459) |
| #195473 | fix(android): keep model names during temporary catalog gaps | app: android, S | 修复 Android 客户端在模型目录临时清空时，将已选模型名称替换为原始 ID 的问题。 | [查看](https://github.com/openclaw/openclaw/pull/195473) |

## 5. 功能需求趋势

从近期 Issues 中可观察到社区关注的功能方向集中在以下几个领域：

1. **多频道与多 Agent 协作**：IMAP 多频道投递（#137871）、跨 Agent 会话切换（#194768）、Cron 任务与持久会话绑定（#160494）等问题反映用户对复杂多频道、多 Agent 编排场景的需求日益增长。
2. **移动端体验优化**：Android 新建聊天（#192256）、密钥卡片堆积（#186494）、iOS 飞书流式卡片（#195462）等移动端缺陷集中爆发，说明移动客户端已成为用户反馈的重灾区。
3. **插件生态与目录管理**：社区主动提议将 ShieldCortex 和 multi-clawd 纳入官方插件目录或验证发布者列表（#183537），并请求 ElevenLabs 批量转录支持关键词提示（#184709），显示对第三方插件扩展和官方认证机制的期待。
4. **模型网关与提供商文档**：Standard Compute 提供商文档请求（#195144）表明用户希望 OpenClaw 对更多 OpenAI 兼容模型网关提供原生支持与文档。

## 6. 开发者关注点

- **核心稳定性与性能**：SQLite 并发写

:::
