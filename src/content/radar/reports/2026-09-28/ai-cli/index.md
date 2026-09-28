---
title: "AI CLI 工具社区动态日报"
published: 2026-09-28
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-28

> 生成时间: 2026-09-28 00:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-09-28）

## 一、生态全景

当前 AI CLI 工具正在从“能用”快速走向“稳定、可控、安全、可观测”。各工具社区普遍承受三类压力：**Windows/WSL 平台支持落后、长会话状态一致性与资源回收、MCP/插件生态的安全与可靠性**。头部工具（Claude Code、Codex、Gemini CLI）在 agent 可靠性和企业级成本控制上竞争；新锐工具（Reasonix、OpenCode、Hermes）则通过远程协同、跨模型支持、供应链安全加固寻找差异化。整体看，高频发版与 PR 响应成为常态，但回归问题和静默失败仍是社区信任的主要威胁。

## 二、各工具活跃度对比

| 工具 | Issues 更新 | PR 更新 | Release | 关键信号 |
|---|---:|---:|---:|---|
| Claude Code | 49 | 3 | 0 | 无新发版；#76694 达 35 评论 / 28👍，回归问题集中 |
| OpenAI Codex | 44 | 10+（重点） | 6 个 alpha | Windows 控制台闪窗 73👍，迭代节奏最快 |
| Gemini CLI | 48 | 12 | 0 | bot 批量 triage；安全加固为 PR 主线 |
| DeepSeek Reasonix | 27（16 已关闭） | 50 | 5 | 版本密集；Studio 远程协同打通 |
| OpenCode | 未披露总数（精选 10） | 50 | 0 | TUI 复制粘贴问题持续 8 个月未解 |
| Hermes | 4 | 50 | 0 | 2 个 P0 网关修复当日提 PR |
| Deepseek Harness | 0 | 0 | 0 | 无社区活动 |

## 三、共同关注的功能方向

| 方向 | 涉及工具与具体诉求 |
|---|---|
| **会话生命周期与状态一致性** | Claude Code（多终端 fork、线程不释放、SendMessage 假成功）、Codex（会话 JSONL 被 NUL 损坏）、Gemini（--resume 选错会话）、Reasonix（上下文压缩丢数据）、Hermes（重启后 pin 丢失）、OpenCode（location 关闭不回收 MCP 进程） |
| **Windows / WSL 平台平权** | Claude Code（Windows OAuth 403、WSL2 bwrap 沙箱不可用）、Codex（终端闪烁、Desktop 启动卡死）、Reasonix（WSL/SSH 工作区报错、Windows 渲染问题）、Hermes（venv 错选、.cmd 子进程挂起） |
| **MCP / 插件生态稳定** | Claude Code（channels 模式杀死 MCP server）、Codex（单服务器 MCP 状态发现、连接复用）、Reasonix（接入 ACP registry）、OpenCode（MCP 进程泄漏）、Hermes（plugin-catalog 供应链校验） |
| **安全与供应链** | Gemini（环境变量泄露、glob/checkpoint 路径穿越）、Hermes（pinned-source 校验、容器销毁审批）、Claude Code（sec-default 记录不可覆盖）、Reasonix（远程会话权限持久化、配置加密备份） |
| **成本可观测性** | Claude Code（后台 API 活动激增 30 倍、prompt cache 失效）、Gemini（Auto Memory 低信号无限重试）、Reasonix（子代理 TPS 实时显示）、Codex（历史感知线程预热降首字延迟） |
| **TUI / 交互精细度** | OpenCode（复制粘贴失灵、Tab 键行为反直觉、悬停延迟 2 秒）、Codex（JetBrains 鼠标序列乱码）、Claude Code（/color 仅 8 色）、Reasonix（vi 命令模式、LaTeX 重叠）、Hermes（/s 别名、双击 Esc） |

## 四、差异化定位分析

| 工具 | 功能侧重 | 目标用户 / 场景 | 技术路线特征 |
|---|---|---|---|
| **Claude Code** | Anthropic 模型深度绑定，桌面 Cowork 与 CLI 融合，安全默认 | 企业级长会话、桌面端项目管理 | TypeScript/Node 双端；注重安全策略与 MCP 生态，但 2.1.x 回归问题引发担忧 |
| **OpenAI Codex** | OpenAI 生态 + Rust 重写，桌面端与订阅打通 | OpenAI/ChatGPT 重度用户，Windows 开发者 | 高频 alpha 发版；Windows/TUI 修复优先级高；MCP 与 Guardian 审查同步演进 |
| **Gemini CLI** | Gemini 模型驱动，subagent / Browser Agent / Auto Memory | Google 生态开发者，自动化与多 agent 场景 | 维护者主导批量 triage；近期 PR 集中在安全加固（环境变量、路径穿越、checker） |
| **DeepSeek Reasonix** | DeepSeek 模型 + Studio 多端远程协同 | 远程/多设备开发者，追求快速迭代 | Web Studio 与桌面打通，ACP/社区市场；子代理步数与上下文可靠性为当前痛点 |
| **OpenCode** | Provider 无关，models.dev 目录集成，TUI 优先 | 多模型切换、Linux/Nix/Termux 用户 | 社区驱动；功能诉求集中但复制粘贴等长期 bug 未解，影响基础体验 |
| **Hermes** | 网关架构，多渠道（TUI/Desktop/Slack），会话状态一致 | 需要统一网关与多端会话管理的团队 | 小型但 P0 响应快；供应链安全和审批门槛补齐快 |

## 五、社区热度与成熟度

- **迭代最激进**：OpenAI Codex 24 小时内发布 6 个 alpha；DeepSeek Reasonix 同日发布 5 个版本并合入 50 个 PR。两者均处于快速打磨期，但 Reasonix 的“上下文压缩丢数据”和 Codex 的“Windows 控制台闪烁”都说明稳定性仍是短板。
- **社区关注度最高**：Claude Code 以“Cowork 丢失 Choose a folder”收获 35 条评论，Codex 的 Windows 闪窗问题收获 73👍，均反映出桌面端和 Windows 用户已成重要反馈群体。
- **成熟但回归压力大**：Claude Code 功能最全面，但多个 issue 被标注 regression，社区对 2.1.x 稳定性担忧明显。
- **后台流程主导**：Gemini CLI 大量 issue/PR 由 bot 批量 triage，社区主动讨论较少，更像维护者驱动的项目。
- **开源社区韧性**：OpenCode 的问题反馈最具体（用户直接给出源码行号），但“复制粘贴 8 个月未解决”显示核心交互 bug 修复速度与社区期待存在落差。
- **安全响应最快**：Hermes 两个 P0 网关问题均在当日提 PR，供应链校验问题从 issue 到 PR 不足 1 天。

## 六、值得关注的趋势信号

1. **Windows 支持已从“可选”变成“必选”**：多个工具在同一周内集中出现 Windows 专属故障。开发者若在 Windows/WSL 环境使用 CLI，需在选型时重点验证认证、沙箱、终端渲染和 Desktop 稳定性。
2. **长会话的成本与状态一致性成为企业采纳门槛**：后台 API 调用激增、prompt cache 失效、上下文压缩丢数据等反馈密集出现，说明工具必须具备透明的成本观测和可靠的会话恢复能力。
3. **Agent 控制粒度成为新竞争点**：OpenCode 的 queue/steer 讨论（84👍）、Hermes 的事件 pin 持久化、Reasonix 的子代理步数上限，均指向用户希望更精细地控制 agent 的注意力与执行边界。
4. **安全边界从“沙箱”扩展到“供应链”**：Gemini 修复 checker 环境变量泄露、Hermes 修复 plugin-catalog 校验、Claude Code 强化安全默认记录不可覆盖，第三方插件和 MCP server 已成为新的攻击面。
5. **CLI 正在演变为“平台层”**：远程协同（Reasonix Studio）、无头服务模式（OpenCode --no-open）、多端状态同步（Hermes 网关）表明，AI CLI 不再只是终端工具，而是开发工作流的基础设施。
6. **模型目录与 Provider 集成直接影响可用性**：OpenCode 的 models.dev 目录失效、Codex 的自定义 provider 被订阅限流误伤，说明“模型接入”的健壮性和架构解耦将决定多模型工具的实际价值。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
（数据截止 2026-09-28｜来源：github.com/anthropics/skills）

## 1. 热门 Skills 排行

| # | Skill / PR | 核心功能 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator 触发器评估修复** [PR #1298](https://github.com/anthropics/skills/pull/1298) | 隔离 per-worker 触发器探测、修复 Windows `select()` 管道失败、避免运行时失败被误判为非触发 | 评估假阴性直接扭曲 Skill 优化信号，是 skill-creator 被讨论最多的问题 | Open（更新至 09-16） |
| 2 | **proofcore-contract-auditor** [PR #1771](https://github.com/anthropics/skills/pull/1771) | Web3 智能合约静态审计，零存储 Merkle 协议将审计证明锚定到 TON 区块链 | 区块链场景与密码学证明上链的 Skill 集成方式 | Open（09-16） |
| 3 | **md2video-audio** [PR #1703](https://github.com/anthropics/skills/pull/1703) | 零成本将 Markdown 经 Marp 编译为含拟人配音的 MP4 | 文档→视频的内容生产自动化，社区关注度高的新方向 | Open（09-15） |
| 4 | **pyxel 复古游戏开发** [PR #525](https://github.com/anthropics/skills/pull/525) | Python 复古游戏创建/调试/验证，支持无头输入驱动与逐帧检查 | AI 生成内容的可验证性，长生命周期 PR 持续活跃 | Open（更新至 09-22） |
| 5 | **mcp-builder 兼容性修复** [PR #1742](https://github.com/anthropics/skills/pull/1742) | 适配 mcp≥2.0 的 `streamable_http_client` 重命名与自定义请求头配置 | MCP 生态版本演进带来的 Skill 兼容压力 | Open（更新至 09-27） |
| 6 | **document-typography** [PR #514](https://github.com/anthropics/skills/pull/514) | 生成文档排版质控：孤行换行、寡段标题滞留页底、编号错位 | AI 文档生成的「最后一公里」细节质量 | Open（03-13 后无更新） |
| 7 | **AWT 端到端测试** [PR #822](https://github.com/anthropics/skills/pull/822) | 视觉+浏览器控制的零代码 E2E 测试生成 | AI 驱动测试自动化的落地形态 | Open（更新至 09-19） |
| 8 | **testing-patterns** [PR #723](https://github.com/anthropics/skills/pull/723) | 全栈测试方法论：测试奖杯模型、AAA 模式、React Testing Library 指南 | 将最佳实践沉淀为可执行 Skill 的范式 | Open（更新至 09-21） |

> 注：展示的 50 条 PR 均处于 Open 状态；评论数最高的 20 条中，修复类 PR（skill-creator、docx、pdf、mcp-builder）约占一半，反映社区对既有 Skill 稳定性的强关注。

## 2. 社区需求趋势

- **安全与信任边界**：社区自制 Skill 在 `anthropic/` 命名空间下伪装官方、诱导提权（[#492](https://github.com/anthropics/skills/issues/492)，43 评论）；eval-viewer 存在 attribute XSS（[#1394](https://github.com/anthropics/skills/issues/1394)）→ 强烈呼吁官方信任标识与安全审查机制。
- **组织级分发与共享**：要求在 Claude.ai 内实现组织级 Skill 库/分享链接，替代手动下载传输（[#228](https://github.com/anthropics/skills/issues/228)，16 评论、8👍）；同时 document-skills 与 example-skills 重复内容导致上下文重复注入（[#189](https://github.com/anthropics/skills/issues/189)，9👍）。
- **工具链可靠性**：`run_eval.py` 对 `claude -p` 全部查询 0% 触发率（[#556](https://github.com/anthropics/skills/issues/556)）；skill-creator 基准测试静默失败、Windows 触发器评估损坏、Skill 遮蔽（[#1383](https://github.com/anthropics/skills/issues/1383)）；mcp-builder 评估器对真实服务器 0/N 误报（[#1390](https://github.com/anthropics/skills/issues/1390)）。
- **上下文窗口效率**：`claude-api` 单次调用注入约 156k token 直接耗尽上下文（[#1487](https://github.com/anthropics/skills/issues/1487)）→ 社区要求对大型 Skill 做 token 预算审计。
- **新方向提案**：符号化记忆管理 compact-memory（[#1329](https://github.com/anthropics/skills/issues/1329)）、Agent 治理/安全模式（[#412](https://github.com/anthropics/skills/issues/412)）、推理质量门禁三阶段流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）。

## 3. 高潜力待合并 Skills

以下 PR 均为近期活跃更新、功能完整且贴合明确需求的 Open 状态新增 Skill，近期落地概率较高：

- **notion-spec-to-implementation + quantitative-resume-auditor** [PR #1245](https://github.com/anthropics/skills/pull/1245) — 将 Notion 产品/技术规格拆解为可执行任务；量化简历审计。**更新时间 09-28，为全仓库最新**。
- **blast-radius** [PR #1776](https://github.com/anthropics/skills/pull/1776) — 批量/破坏性写入（删除行、撤销权限、群发邮件）前的安全检查清单，覆盖「查询行正确」与「操作世界正确」之间的鸿沟。09-18 更新。
- **AWT（AI Watch Tester）** [PR #822](https://github.com/anthropics/skills/pull/822) — 零代码 E2E 测试，已自带开源项目背书，09-19 更新。
- **md2video-audio** [PR #1703](https://github.com/anthropics/skills/pull/1703) — 零成本 Markdown→视频，直接命中内容生产需求。09-15 更新。
- **scnet-hpc** [PR #1615](https://github.com/anthropics/skills/pull/1615) — HPC 集群 SSH/Slurm 运维工作流，面向科研计算垂直场景。08-24 更新。
- **skill-quality-analyzer / skill-security-analyzer** [PR #83](https://github.com/anthropics/skills/pull/83) — 元 Skill：五维质量评估与安全分析，回应 #492 的信任危机。01-07 更新，但方向与社区诉求高度吻合。

## 4. Skills 生态洞察

社区最集中的诉求是：**先为 Skill 生态补上「工程化」这层地基——修复触发器评估、安装分发、上下文预算、安全边界等工具链顽疾，再以测试生成、Web3、文档排版、HPC 等垂直场景 Skill 扩张版图**；一句话概括，即「从能用的 Skill 走向可信、可靠、可治理的 Skill 生态」。

---

# Claude Code 社区动态日报

**2026-09-28** | 数据源: github.com/anthropics/claude-code


## 📌 今日速览

今日无新版本发布。社区最热议题是 #76694：Chat/Cowork 合并后桌面端丢失「Choose a folder」入口，以 35 条评论、28 👍 持续发酵。此外，2.1.283 的 channels 回归 bug（#97701）与长会话后台 API 活动激增 30 倍（#97218）也引发了对稳定性和成本问题的关注。


## 🔥 社区热点 Issues（10 个）

### 1. #76694 [OPEN] Cowork 新项目丢失「Choose a folder」菜单
- **评论 35 | 👍 28** | 平台: Windows / macOS
- Chat/Cowork 合并后，新项目的上下文菜单被替换为 Chat 风格的上传式知识菜单，「Choose a folder」入口消失，影响桌面端项目创建工作流。当前社区关注度最高的 issue。
- 🔗 https://github.com/anthropics/claude-code/issues/76694

### 2. #97701 [OPEN] claude-bin --channels 反复杀死插件 MCP 服务器
- **评论 1** | 2.1.283 回归 | 创建于 09-27
- 以 `--channels` 长驻运行 telegram 插件（stdio）时，进程持续 churn 会话并反复 kill 掉插件 MCP server，导致 channels 模式几乎不可用。
- 🔗 https://github.com/anthropics/claude-code/issues/97701

### 3. #97218 [OPEN] 长会话后台 API 活动激增 ~30 倍
- **评论 1** | 平台: Web / Android
- 用户报告长运行 Web 会话中 API 分钟数达墙钟分钟的 ~30 倍（实测有周级基线对比），并伴随响应质量下降，属于显著的成本与性能问题。
- 🔗 https://github.com/anthropics/claude-code/issues/97218

### 4. #89938 [OPEN] SendMessage 返回 success 但消息从未送达
- **评论 3** | 版本 2.1.234
- 长生命周期会话实例出现双向「失聪」：`SendMessage` 返回 `{"success":true}` 但消息未投递，且 stale bridge-pointer 导致 host 显示 "Connected" 但 workers 为 0。Agent 间通信可靠性堪忧。
- 🔗 https://github.com/anthropics/claude-code/issues/89938

### 5. #93967 [OPEN] Windows 上 claude auth login 报 OAuth 403
- **评论 3** | 平台: Windows
- `claude auth login` / `setup-token` 在 Windows 上因缺少 `user:profile` scope 返回 403，而 Claude Desktop 登录正常。CLI 认证在 Windows 上完全不可用。
- 🔗 https://github.com/anthropics/claude-code/issues/93967

### 6. #97058 [OPEN] Desktop 已完成 Project 线程不释放进程配额
- **评论 1** | 平台: macOS
- 已完成的 Project 线程仍保持 live 会话，逐步填满进程 cap，导致新 Project 会话被拒绝启动（"Couldn't start in ~/Project..."）。
- 🔗 https://github.com/anthropics/claude-code/issues/97058

### 7. #93845 [OPEN] WSL2 下 bwrap 沙箱完全不可用
- **评论 1** | 平台: WSL
- read-deny 路径若是指向 `/mnt/c` 的符号链接，所有沙箱化 Bash 命令在 bwrap 阶段失败；且该路径来自 managed settings 时无法移除。与已关闭的 #45122 同源。
- 🔗 https://github.com/anthropics/claude-code/issues/93845

### 8. #80427 [OPEN] 多终端恢复会话静默 fork 而非 interleave
- **评论 1** | 版本 2.1.218
- 从第二个终端窗口恢复同一会话时，CLI 静默创建 fork 而不是按文档进行 interleave，导致会话状态分裂。
- 🔗 https://github.com/anthropics/claude-code/issues/80427

### 9. #76606 [CLOSED] Prompt cache 因消息重写反复失效
- **评论 7** | 平台: macOS / VS Code
- 长会话中 Claude Code 会重写旧消息导致 prompt cache 失效，整个对话被重新处理，引发成本尖峰。用户通过 diff `/v1/messages` 定位到两个重写原因。虽已关闭，讨论仍具参考价值。
- 🔗 https://github.com/anthropics/claude-code/issues/76606

### 10. #74447 [CLOSED] /color 命令仅支持 8 种命名颜色
- **评论 5 | 👍 2** | area: TUI
- 现代终端普遍支持 24-bit truecolor（VS Code、iTerm2、Kitty 等），但 `/color` 仅接受 8 个命名色。社区希望扩展 hex 颜色支持。
- 🔗 https://github.com/anthropics/claude-code/issues/74447


## 🔧 重要 PR 进展（全部 3 条）

### 1. #97688 [OPEN] sec-default: collector 记录越过 user tier 继续保留
- **作者:** @poteat | 更新于 09-27
- 安全默认增强：组织启用 sec-default 后，个人插件无法再丢弃或重写发送给 collector 的记录。`telemetry.log` 的 collector 流与 `classic.*`、`settings.read` 一样持续记录，组织的 `prepend` / `append` 钩子不再被用户层覆盖。
- 🔗 https://github.com/anthropics/claude-code/pull/97688

### 2. #94847 [OPEN] diff: 首次编辑仅在有文件可列出时才打开面板
- **作者:** @bcherny | 更新于 09-27
- 修复 diff 面板自动打开时机问题：当写入发生在仓库外、被忽略文件或不同 worktree 时，不再弹出空面板（"No tracked changes"），避免无效 UI 干扰。
- 🔗 https://github.com/anthropics/claude-code/pull/94847

### 3. #95587 [CLOSED] diff: 恢复会话时面板行为统一
- **作者:** @poteat | 更新于 09-27
- 统一三处 diff mod 与内置面板的行为差异：恢复含编辑记录的会话时在宽度可用即打开面板；`/clear` 后不再残留面板；会话行跟随引擎实际起始位置。
- 🔗 https://github.com/anthropics/claude-code/pull/95587


## 📊 功能需求趋势

从今日 49 条 Issue 更新中提炼出社区最关注的六个方向：

1. **会话生命周期管理**
   多终端恢复语义（#80427）、线程/进程配额释放（#97058）、消息投递可靠性（#89938）——用户对会话状态一致性的要求明显提升。

2. **成本可观测与控制**
   Prompt cache 失效（#76606）、后台 API 活动异常激增（#97218）——长会话场景下的成本透明度成为企业用户核心诉求。

3. **桌面端（Cowork）体验完善**
   项目文件夹选择（#76694）、安装权限（#76510）、Google Drive 保护路径（#76233）——Chat/Cowork 合并后桌面端仍在消化回归。

4. **MCP 生态稳定性**
   Allowlist 权限提示（#76238）、自定义 MCP 授权状态丢失（#76453）、channels 模式杀死 MCP 进程（#97701）——MCP 从「能用」迈向「稳定」。

5. **跨平台一致性与权限**
   Windows 认证失败（#93967）、WSL2 沙箱不可用（#93845）、Windows 路径权限匹配（#76490）——Windows/WSL 用户期望与 macOS/Linux 平权。

6. **终端 UI/UX 增强**
   Truecolor 支持（#74447）、检查清单进度刷新滞后（#76495）——CLI 颜值与交互细节被更多用户提及。


## 💬 开发者关注点

1. **回归问题频发**
   多个 issue 标注 "regression"：SDK MCP 启动（#76239）、Google Drive 路径（#76233）、channels 模式（#97701）。社区对 2.1.x 系列的稳定性表示明显担忧。

2. **长会话资源失控**
   Headless 会话内存泄漏至 10–15GB（#76185）、后台 API 活动 30 倍激增（#97218）——长期运行场景的资源管理亟待优化。

3. **权限系统行为不一致**
   Allowlist 的 MCP 工具仍触发权限提示（#76238）、Plan 模式未授权删除目录（#75794）、Windows 路径 allow-list 不匹配（#76490）。

4. **静默失败难以排查**
   SendMessage 假成功（#89938）、网络路径变化后 HTTP 永久挂起（#75572）、超时命令的部分 stdout 被记录为成功（#76584）——「无声错误」比报错更让开发者头疼。

5. **Windows/WSL 支持滞后**
   认证（#93967）、沙箱（#93845）、路径权限（#76490）多个环节与 macOS/Linux 存在明显差距，Windows 用户正成为不可忽视的反馈群体。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 — 2026-09-28

## 今日速览

Windows 平台稳定性问题持续占据社区焦点，多起关于控制台窗口闪烁、启动卡死及 Desktop 应用消息发送失败的 issue 获得高热度关注。版本层面，过去 24 小时内密集发布了 6 个 Rust alpha 版本（0.158.x/0.159.x 系列），修复节奏明显加快。PR 方面，TUI 交互优化和 MCP 协议增强成为主要改进方向，并修复了多个 Linux 测试环境下的 ETXTBSY 竞态问题。

## 版本发布

过去 24 小时共发布 6 个预发布版本，均为 Rust 实现：

| 版本 | 发布说明 |
|------|----------|
| `rust-v0.159.0-alpha.10` | Release 0.159.0-alpha.10 |
| `rust-v0.159.0-alpha.9` | Release 0.159.0-alpha.9 |
| `rust-v0.159.0-alpha.8` | Release 0.159.0-alpha.8 |
| `rust-v0.159.0-alpha.7` | Release 0.159.0-alpha.7 |
| `rust-v0.158.0-alpha.15.3` | Release 0.158.0-alpha.15.3 |
| `rust-v0.158.0-alpha.15.2` | Release 0.158.0-alpha.15.2 |

版本号推进集中在 0.158 和 0.159 两个 minor 版本线，推测与近期 Windows 问题修复和 TUI 改进相关。

## 社区热点 Issues

### 1. Windows 终端反复闪烁问题（#48074）
**40 条评论 | 73 👍 | 热度最高**
[链接](https://github.com/openai/codex/issues/48074)

安装 Codex daemon 后，Windows 终端在请求期间反复弹出控制台窗口。这是当前社区反馈最强烈的问题，73 个 👍 表明大量用户受影响。

### 2. Windows Desktop 首轮对话后无法发送后续消息（#44102）
**29 条评论**
[链接](https://github.com/openai/codex/issues/44102)

Windows 桌面版在完成第一轮对话后无法发送后续消息，与 #47855（第二条消息无限挂起）高度相关，可能是同一底层 bug 的不同表现。

### 3. Windows Desktop 启动卡在 spinner（#48333）
**22 条评论 | 7 👍**
[链接](https://github.com/openai/codex/issues/48333)

Codex Desktop 26.924.1866.0 在启动时卡在加载界面，直到手动终止 app-server 的 codex.exe 进程才能恢复。

### 4. Linux 桌面版 SIGCHLD handler 被覆盖（#48554）
**20 条评论 | 12 👍**
[链接](https://github.com/openai/codex/issues/48554)

Electron 运行时用空函数替换了 libuv 的 SIGCHLD handler，导致子进程无法回收，进而引发 shell 环境超时、"Git is unavailable" 等问题。这是今日少见的 Linux 专属严重 bug。

### 5. Windows shell 子进程控制台窗口闪烁（#48422）
**16 条评论 | 16 👍**
[链接](https://github.com/openai/codex/issues/48422)

与 #48074 同属 Windows 控制台窗口闪烁问题，但作用域更具体——每次 session/turn 时 shell 子进程都会弹出可见控制台窗口。

### 6. 作用域内存管理需求（#18343）
**14 条评论 | 12 👍**
[链接](https://github.com/openai/codex/issues/18343)

社区持续呼吁 Codex 内存支持明确的作用域管理（全局/项目/混合/线程级），而非仅依赖全局存储。

### 7. 事件驱动的 session 唤醒原语（#20312）
**13 条评论 | 6 👍**
[链接](https://github.com/openai/codex/issues/20312)

请求为 Codex 增加原生的事件驱动唤醒机制，使空闲 session 能响应外部事件（聊天提及、文件变化、MCP 资源推送等）。

### 8. JetBrains Rider 终端鼠标序列乱码（#48030）
**6 条评论 | 9 👍**
[链接](https://github.com/openai/codex/issues/48030)

Codex CLI 0.157.0 在 JetBrains Rider 集成终端中输出原始 `[M...` 鼠标上报序列，影响 TUI 使用体验。

### 9. 会话 JSONL 被 NUL 字节损坏（#48067）
**5 条评论**
[链接](https://github.com/openai/codex/issues/48067)

长时间运行的 Desktop 会话因本地 JSONL 文件被 NUL 字节破坏而无法读取，对会话持久化和数据完整性构成威胁。

### 10. 自定义 provider 被订阅限流误伤（#48816）
**1 条评论 | 最新 issue**
[链接](https://github.com/openai/codex/issues/48816)

即使模型流量已路由到自定义 provider（`openai_base_url`），ChatGPT 订阅的速率限制仍会禁用 Composer，架构上存在不合理耦合。

## 重要 PR 进展

### 1. 修复 Windows 终端 SGR 鼠标上报（#48799）
[链接](https://github.com/openai/codex/pull/48799)

通过单独写入并刷新 SGR 编码请求，让 ConPTY 能将旧式鼠标报告翻译为鼠标记录。直接响应 #48030 等 TUI 兼容性问题。

### 2. Mermaid 标签保留标点与分号（#48814）
[链接](https://github.com/openai/codex/pull/48814)

修复 Mermaid 渲染中分号分割和标签标点被拒绝的问题，支持 `A["Go []; &"]` 这类合法标签。

### 3. 基于历史感知的空闲线程预热（#48812）
[链接](https://github.com/openai/codex/pull/48812)

新增 `prewarm_with_history()`，允许空闲线程预生成带有会话历史的 WebSocket 响应，下一轮可直接复用，降低首字延迟。

### 4. TUI 完成页脚显示短耗时（#48807）
[链接](https://github.com/openai/codex/pull/48807)

此前不足 60 秒的 turn 不显示耗时，现改为展示所有已知耗时，亚秒级渲染为 "Worked for Xs"。

### 5. 弹窗打开时允许转录滚动（#48805）
[链接](https://github.com/openai/codex/pull/48805)

"Implement this plan?" 弹窗不再阻塞背景转录的鼠标滚轮滚动，方便审阅长计划的早期步骤。

### 6. Guardian 断路器结构化错误（#48796）
[链接](https://github.com/openai/codex/pull/48796)

为 Guardian denial-limit 中断添加可选的结构化错误，旧客户端可兼容忽略。

### 7. 单服务器 MCP 状态发现（#48783）
[链接](https://github.com/openai/codex/pull/48783)

`mcpServerStatus/list` 支持可选 `serverName` 参数，避免检查单个服务器时执行全量发现或新建连接。

### 8. 长符号链接路径的 Unix socket 修复（#48772）
[链接](https://github.com/openai/codex/pull/48772)

当控制 socket 路径超过 Unix 路径限制时，解析符号链接后重试连接，解决长路径场景下的连接失败。

### 9. 修复 Linux ETXTBSY 竞态（#48727 / #48724）
[链接](https://github.com/openai/codex/pull/48727) · [链接](https://github.com/openai/codex/pull/48724)

集中管理可执行 fixture 的创建方式，避免并发测试继承可写描述符导致的 ETXTBSY 启动失败。

### 10. 保留 Code Mode 消息供 Guardian 审查（#48725）
[链接](https://github.com/openai/codex/pull/48725)

嵌套 Code Mode 工具发送的消息现会保留为 Guardian 审查上下文，且基于旧上下文的批准在新增消息时会失效。

## 功能需求趋势

- **事件驱动与跨会话通信**：#20312（事件驱动唤醒）与 #16447（跨会话 UDS 消息）表明社区不满足于轮询式交互，期待 Codex 具备实时响应外部信号的能力。
- **作用域化内存管理**：#18343 持续获得关注，用户希望内存管理能从"全局一桶"演进为按项目/线程/混合模式隔离。
- **Windows 稳定性压倒一切**：44 条 issue 中近 20 条与 Windows 相关，覆盖 CLI 窗口闪烁、Desktop 启动失败、sandbox 无法创建、浏览器工具失灵等。这是当前影响面最大的方向。
- **MCP 协议持续深化**：多個 PR 围绕 MCP 单服务器发现、资源 URI 保留、线程连接复用展开，MCP 正在成为 Codex 扩展能力的核心协议。
- **TUI 体验精细化**：有序列表颜色、状态栏 shimmer 时机、`/status` 布局、隐藏输出行数等细节优化密集落地，CLI 交互品质进入打磨期。

## 开发者关注点

- **Windows 控制台窗口闪烁是最大痛点**：#48074（73 👍）和 #48422（16 👍）都指向同一现象——每次请求时弹出可见控制台窗口。该问题影响面广、反馈强烈，建议优先关注官方修复进度。
- **重复出现的 Desktop 消息发送失败**：#44102、#47855 等多条 issue 描述相近的现象：第一轮消息正常、后续消息挂起。存在同一根因的可能性较高。
- **sandbox 与浏览器工具可靠性**：Windows 上 Agent sandbox 创建失败（#47418）、Chrome 运行时无法加载（#41055、#48813、#48573）等反复出现，且"修复后仍复发"，用户已出现明显的挫败感。
- **会话数据完整性隐患**：#48067 显示会话 JSONL 可能被 NUL 字节破坏，这对依赖长期会话的用户是严重风险，也影响审计与调试。
- **订阅限流与自定义 provider 的冲突**：#48816 中用户将模型流量路由到自定义 provider 仍被订阅限流禁用 Composer，说明限流判断逻辑应区分流量来源，而非一刀切。

---

*本日报数据来自 [github.com/openai/codex](https://github.com/openai/codex)，统计窗口为 2026-09-27 至 2026-09-28。*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报（2026-09-28）

## 今日速览

今日社区更新以维护者内部工作流为主，48 条 Issue 与 12 条 PR 均在过去 24 小时被批量更新（bot-triaged / rollup）。安全加固成为 PR 主线：多项修复聚焦环境变量泄露、路径穿越等安全问题；Issue 方面，子代理（Subagent）的可靠性、Auto Memory 行为以及浏览器代理的配置一致性是社区最集中的讨论点。

## 社区热点 Issues

### 1. Subagent 达到 MAX_TURNS 后误报为 GOAL 成功（#22323）
- **标签**: p1 / bug / 需重新测试
- **动态**: 13 条评论，2 👍
- **要点**: `codebase_investigator` 子代理在达到最大轮次被中断时，外部却报告 `status: "success"` 与 `Termination Reason: "GOAL"`，实际未完成任何分析，掩盖了真实的中断原因。
- **关注理由**: 误导性状态报告会破坏用户对 Agent 执行结果的信任，且影响自动化流程的准确性。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22323)

### 2. 利用模型 bash 亲和力：零依赖沙箱执行与意图路由（#19873）
- **标签**: p2 / enhancement / effort/large
- **动态**: 9 条评论，1 👍
- **要点**: 提议利用 Gemini 3 模型原生擅长 POSIX 工具链的特性，在不牺牲安全性的前提下提供零依赖 OS 沙箱，并在命令执行后进行意图路由。
- **关注理由**: 该方案若落地，可显著减少模型对自定义工具的依赖，提高代码库探索与编辑效率。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/19873)

### 3. Generalist Agent 调用后永久挂起（#21409）
- **标签**: p1 / bug / 需重新测试
- **动态**: 8 条评论，8 👍（社区共鸣度最高）
- **要点**: 当 CLI 委派任务给 generalist agent 时，即使是创建文件夹这类简单操作也会永久挂起（用户等待长达 1 小时），手动指示模型不要使用 subagent 可绕过问题。
- **关注理由**: 高 👍 表明大量用户受此影响，属于阻断性（P1）故障。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21409)

### 4. AST 感知的文件读取、搜索与代码库映射评估（#22745）
- **标签**: p2 / feature / EPIC
- **动态**: 7 条评论，1 👍
- **要点**: 跟踪多项调研：利用 AST 感知工具精确读取方法边界、减少 token 噪声、改进代码库导航，推荐从 `tilth` 或 `glyph` 工具入手。
- **关注理由**: 属于系统性改进代码理解能力的 EPIC，可能影响后续工具链设计方向。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22745)

### 5. Gemini 不会主动使用 skills 和 sub-agents（#21968）
- **标签**: p2 / bug
- **动态**: 6 条评论
- **要点**: 用户反馈 Gemini 几乎不会主动调用自定义 skills 与 sub-agents，即使任务高度相关，必须显式手动指示才会使用。
- **关注理由**: 直接关系到自定义扩展的实际价值，若模型不主动采用，用户投入配置的成本将难以回收。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21968)

### 6. Auto Memory：添加确定性脱敏并减少日志输出（#26525）
- **标签**: p2 / security / bug
- **动态**: 5 条评论
- **要点**: Auto Memory 在提取时会将本地 transcript 原始内容发送给模型后才提示脱敏，且服务可能记录已有 skill 数据，存在敏感信息暴露风险。
- **关注理由**: 涉及隐私与密钥泄露的潜在风险，安全影响面大。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/26525)

### 7. 阻止 Auto Memory 无限重试低信号会话（#26522）
- **标签**: p2 / bug
- **动态**: 4 条评论
- **要点**: 低信号 session 因未被 `read_file` 读取而永远不会被标记为已处理，导致后台提取器反复重试同一批会话，浪费模型调用。
- **关注理由**: 资源浪费问题在多会话工作流下会持续累积，增加用户成本。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/26522)

### 8. Browser Agent 忽略 settings.json 覆盖配置（#22267）
- **标签**: p2 / bug / 需重新测试
- **动态**: 4 条评论
- **要点**: Browser Agent 完全忽略全局/项目级 `settings.json` 中的 `maxTurns` 等覆盖配置，尽管 `AgentRegistry` 初始化时已正确读取并合并了设置。
- **关注理由**: 配置不生效意味着用户无法按需控制浏览器代理的资源使用，且 bug 位于配置合并与执行链路之间，排查成本较高。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22267)

### 9. Browser Agent 韧性增强：自动会话接管与锁恢复（#22232）
- **标签**: p3 / feature
- **动态**: 4 条评论
- **要点**: 建议 `BrowserManager.ts` 在遇到锁定的浏览器 profile 时自动接管会话或恢复孤儿进程，避免“快速失败”策略中断用户工作流。
- **关注理由**: 持久化会话模式下锁冲突是高频场景，增强韧性可直接改善用户体验。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/22232)

### 10. Browser 子代理在 Wayland 环境失败（#21983）
- **标签**: p1 / bug / agent/browser
- **动态**: 4 条评论，1 👍
- **要点**: Wayland 下 browser subagent 执行失败，即使显示 `Termination Reason: GOAL`，但实际功能未正确完成。
- **关注理由**: Wayland 是 Linux 主流显示协议，P1 级别且影响面较大。
- [查看 Issue](https://github.com/google-gemini/gemini-cli/issues/21983)

---

## 重要 PR 进展

### 1. 修复请求以模型 turn 结尾导致的 400 错误（#29527）
- **状态**: OPEN
- **要点**: 解决 `/rewind`、流中断或空 user turn 等场景下请求 `history` 以模型消息结尾引发的 `400 Bad Request`。
- **影响**: 直接修复多个操作后的崩溃问题，提升会话恢复稳定性。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29527)

### 2. Headless 模式文件夹信任状态传播修复（#29528）
- **状态**: OPEN
- **要点**: 修复 `useFolderTrust` 在 headless 模式下即使工作区未受信任也向上层回报 `onTrustChange(true)` 的“脑裂”状态。
- **影响**: 保证无人值守模式下的信任逻辑与历史日志一致。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29528)

### 3. A2A Server 不再信任请求中的 agentSettings.isTrusted（#29525）
- **状态**: OPEN
- **要点**: `CoderAgentExecutor.createTask()` 之前直接透传调用方提供的 `isTrusted` 设置到隔离环境，共三个入口中的两个已规范化，本 PR 补齐最后一个。
- **影响**: 修复潜在的不信任工作区被提升为可信的安全漏洞。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29525)

### 4. 外部安全检查器最小化环境变量与限制输出（#29523）
- **状态**: OPEN
- **要点**: `CheckerRunner` 之前将完整 CLI 环境变量（含 `GEMINI_API_KEY`）传递给第三方 checker，且 stdout 无上限；修复后最小化 env 并对输出做上限控制。
- **影响**: 显著降低第三方插件导致敏感凭据泄露与磁盘耗尽的风险。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29523)

### 5. Glob 工具匹配限制在验证目录内（#29522）
- **状态**: OPEN
- **要点**: `GlobToolInvocation` 在 glob 12 中，绝对模式会忽略 `cwd` 直接基于文件系统根解析，导致如 `/etc/*.conf` 可越界读取；修复后强制限制在已验证目录内。
- **影响**: 修复一个可被恶意 prompt 利用的任意文件读取漏洞。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29522)

### 6. 修复 checkpoint 路径穿越漏洞（#29521）
- **状态**: OPEN
- **要点**: 旧版 checkpoint 路径用原始 tag 拼接，`x/../../secret` 可解析到 checkpoint 目录之外；修复后严格限制在 checkpoint 目录内。
- **影响**: 防止通过构造 tag 读取或删除任意文件。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29521)

### 7. 修复终端闪烁：stdout 竞争与光标焦点（#29294）
- **状态**: CLOSED
- **要点**: 定位到双重渲染瓶颈：stdout 写入竞争与光标管理冲突；修复后高频率输入时不再闪烁、撕裂。
- **影响**: 显著改善交互式终端使用体验，是高质量体验优化。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29294)

### 8. 新增 `gemini models list` 子命令（#29404）
- **状态**: OPEN
- **要点**: 提供 JSON 输出格式，使外部集成可动态发现 `-m/--model` 的合法值，无需硬编码模型 ID（目前交互式 `/model` 对话框无法被脚本解析）。
- **影响**: 对构建自动化工具链的开发者有直接价值。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29404)

### 9. `--resume` 修复：恢复最近活跃会话而非最新创建（#29411）
- **状态**: OPEN
- **要点**: 当存在长期主会话 + 短期 spike 会话时，旧逻辑按 start time 选择会错误恢复；改为按最活跃时间排序。
- **影响**: 修复多会话场景下的恢复错乱问题。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29411)

### 10. JSON 序列化保留共享引用（#29407）
- **状态**: OPEN
- **要点**: 将进程级 `WeakSet` 循环检测改为活跃递归路径跟踪，避免 OpenTelemetry 重复数组被误判为 `[Circular]` 而丢失数据。
- **影响**: 对依赖结构化日志导出（如企业可观测性集成）的用户非常重要。
- [查看 PR](https://github.com/google-gemini/gemini-cli/pull/29407)

---

## 功能需求趋势

| 趋势方向 | 相关 Issues | 说明 |
|---------|------------|------|
| **Auto Memory 系统迭代** | #26525、#26522、#26523、#26516 | 集中反馈脱敏机制、低信号重试、无效 patch 隔离等问题，该功能正处于密集打磨期 |
| **AST 感知工具链** | #22745、#22746、#22747 | 多个 issue 构成 EPIC，评估利用 AST 优化代码读取、搜索、映射，是明确的技术探索方向 |
| **Browser Agent 增强** | #22267、#22232、#21983 | 包括 Wayland 兼容性、配置覆盖、锁恢复、会话接管，说明浏览器代理在真实场景中故障率较高 |
| **Subagent 主动使用与可见性** | #21968、#20195、#22598、#22741 | 社区希望模型能更自主地调用子代理，同时要求子代理轨迹可通过 `/chat share` 分享并支持后台运行 |
| **安全加固** | #26525、#22672、#24246 | 涉及密钥脱敏、危险命令劝阻、工具数量控制等，安全与沙箱边界是持续主题 |

## 开发者关注点

- **子代理可靠性是最大痛点**：#21409（挂起）、#22323（误报成功）等 P1 问题直接阻断开发流程，社区反映强烈（高 👍）。
- **配置一致性**：Browser Agent 忽略 `settings.json` 覆盖（#22267）不是个例，配置在初始化后未正确传递到执行层的问题需要系统性排查。
- **安全敏感性上升**：Auto Memory 模型上下文暴露 secret、外部 checker 获取完整环境变量、glob 与 checkpoint 路径穿越——社区对供应链与凭据安全越来越敏感。
- **模型行为可控性**：开发者希望模型“该用工具时用工具”而非乱用：讨论集中在技能自主动用（#21968）、临时脚本清理（#23571）以及危险命令劝阻（#22672）。

总体来看，Gemini CLI 团队正在**安全加固**与**子代理可靠性**双线推进，Auto Memory 和浏览器代理则是当前迭代最活跃的子系统。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 — 2026-09-28

## 今日速览

Reasonix 昨日密集发布 5 个版本更新：稳定版 v1.39.2 集中修复桌面端与 CLI 的会话管理、流式显示等关键问题；Studio 2.20.4 正式打通 Web Studio 与桌面 Studio 远程协同。社区方面，子代理 8 轮步数上限（#9652）和上下文压缩丢失（#11104）成为最受关注的话题。

## 版本发布

### v1.39.2（稳定版）
**桌面端与 CLI 修复**：修复会话无法打开或归档、切换会话后实时流式显示异常、手动调用技能失败、设置向导中 API Key 变量名错误，以及中文 Windows 上的输出乱码问题。
[更新日志](https://reasonix.io/changelog/v1.39.2/) · [English](https://reasonix.io/changelog/v1.39.2/?lang=en)

### Studio v2.20.4（稳定版）
**Web Studio 与桌面 Studio 全面打通**：手机或其他浏览器可通过同一账号经端到端加密远程通道安全连接家中电脑，操作同一套内核、工作区、会话与模型配置。桌面端会明确显示远程控制者身份，并支持随时断开连接。

### Studio v2.20.3
为内置浏览器工具增加独立开关，工作台支持宽屏拉宽至 1600px，模型服务可调整顺序（Alt+↑/↓ 移动），并修复行内技能调用时发送给模型的内容。

### Studio v2.20.2
修复三处影响数据可信度的问题：Studio 开始使用独立的匿名遥测标识（此前 2.20.0/2.20.1 使用量未被统计）、大量图片的会话不再撑爆事件日志、评测报告保留导致分歧的宿主义务类型。

### Studio v2.20.1
集中修复统一登录、可信执行证据链、长任务与多模型稳定性，并包含供应商兼容性修复（如中国节假日按 DeepSeek 低谷计费等）。

## 社区热点 Issues（10 条）

### 1. [Bug] 上下文丢失（#11104）— 严重数据丢失
**链接**：https://github.com/esengine/DeepSeek-Reasonix/issues/11104
**标签**：bug / data-loss / windows / agent
**摘要**：v1.38.10 中自动或手动压缩上下文后出现严重内容丢失，且重启 CLI 后无法加载已保存会话（提示没有可恢复会话）。
**关注点**：数据完整性类问题，影响长会话可靠性。这是社区最不能接受的故障类型，虽然当前评论数不多，但严重级别高，需密切关注修复进度。

### 2. [Feature] sub-agent 步数保护机制 8 轮太少（#9652）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/issues/9652
**标签**：enhancement / agent
**摘要**：sub-agent 在执行 review 等任务时达到 8 轮上限即暂停，社区希望可配置或提高上限（为 0 时不限）。
**关注点**：收到 3 条评论共鸣。该问题与 PR #11093（修复 review 子代理 8 轮上限）直接对应，社区的抱怨已转化为实际修复。

### 3. [Feature] 视觉模型应直接接收图片而非仅 OCR 摘要（#9671）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/issues/9671
**标签**：enhancement / agent
**摘要**：附加图片时仅生成 OCR 文本摘要注入 prompt，`deepseek-v4-flash-vision-exp` 等视觉模型看不到实际图像（`image_url` 未被传递）。
**关注点**：直接影响视觉模型使用体验，属于功能不完整问题。对依赖视觉能力的用户是重要痛点。

### 4. [Bug] WSL 工作区 SSH 连接成功但一直报错（#11105）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/issues/11105
**标签**：bug / windows / v2 / config
**摘要**：设置 WSL 为远程工作区时 SSH 连接成功，但持续报错无法正常使用，附有错误截图。
**关注点**：新提交的 issue，覆盖 WSL + SSH 远程开发场景。Windows 用户的远程工作流受阻，属于兼容性回归问题。

### 5. [Feature] 子代理任务实时显示 TPS（#9521）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/issues/9521
**标签**：enhancement / desktop / agent
**摘要**：子代理运行时无法判断是正常推理还是已卡死，建议以 ~3 秒刷新频率实时显示 tokens/sec。
**关注点**：提升长任务运行的可见性，对排查子代理卡死问题很有价值，评论区有 1 条讨论。

### 6. [Bug] 对话时视窗出现空白、滑块位置错误（#9562）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/issues/9562
**标签**：bug / rendering / windows
**摘要**：v1.33 中思考过程中文字消失、出现大片空白，滑块定位异常，对话结束时恢复。附有前端诊断 JSON。
**关注点**：Windows 端渲染问题，影响对话阅读体验，与 #11104 等渲染类 bug 一并构成 Windows 平台的稳定性隐忧。

### 7. [Bug] 多行 LaTeX 公式渲染重叠（#9225）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/issues/9225
**标签**：bug / rendering
**摘要**：含 `\underbrace` + `\substack` 的多行公式渲染时行间垂直重叠、无法阅读，同一公式在 Typora 中显示正常。
**关注点**：影响数学/技术文档场景，KaTeX display 公式的 line-height 问题需修复。

### 8. [Bug] ask 卡片原因标签硬编码中文（#11101）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/issues/11101
**标签**：bug / desktop / windows
**摘要**：英文界面下 ask 卡片上显示“需要你决定”等中文字符串，未走翻译函数。已由 PR #11102/#11103 修复。
**关注点**：国际化质量问题。该 issue 一天内被关闭，团队响应迅速。

### 9. [Bug] 展开分组内拖拽会话入组不生效（#9029）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/issues/9029
**标签**：bug / desktop
**摘要**：拖拽未分组会话到已展开分组的成员区域不生效，必须悬停在标题行才能入组，拖放命中区域过小。
**关注点**：桌面端项目树交互细节问题，影响多分组场景下的操作效率。

### 10. [Feature] 添加到 acp-registry（#3540）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/issues/3540
**标签**：enhancement / mcp / v2
**摘要**：建议将 Reasonix 的 agent 能力注册到 [agentclientprotocol/registry](https://github.com/agentclientprotocol/registry)，以接入 ACP 生态。
**关注点**：虽然创建较早（6 月），但涉及 ACP 协议生态建设，对 Reasonix 作为 AI 开发工具融入更广泛生态具有重要意义。

## 重要 PR 进展（10 条）

### 1. [feat] 为 Studio 添加社区市场标签页（#11107）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/pull/11107
**状态**：OPEN
**摘要**：设置 → 扩展中新增 Discover 标签页，可浏览社区注册表并安装技能、插件和 MCP 服务器。市场主机固定为 `crash.reasonix.io`，带超时和体积限制。
**意义**：构建插件生态的重要一步，将提升 Reasonix 的可扩展性。

### 2. [feat] 配置备份到登录账户（#11109 + #11099）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/pull/11109
**状态**：OPEN
**摘要**：将 Studio 加密配置备份上传到用户账户，客户端使用 Argon2id + XChaCha20 口令密封后再上传，配套服务端 API（#11099）。
**意义**：提升配置安全性与跨设备恢复能力，是 Web/桌面打通后数据一致性的关键补充。

### 3. [fix] 修复 review 子代理 8 轮上限（#11093）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/pull/11093
**状态**：OPEN
**摘要**：修复 review、security-review、team-architect 等子代理在读取多个文件后即被限制暂停的问题，不再硬编码 8 轮上限。
**意义**：直接回应社区 issue #9652 的诉求，解决长 review 任务无法完成的问题。

### 4. [fix] 为智能体 shell 中的 git 提供确定性环境（#11106）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/pull/11106
**状态**：CLOSED
**摘要**：用户的 git config 中 `diff.external`（difftastic/delta）等设置会破坏 `git diff` 的输出格式（去掉 +/- 标记），导致模型误读。现在为 agent 的 git 提供一个确定性的环境。
**意义**：消除用户本机 git 配置对智能体行为的意外干扰，提升工具链可靠性。

### 5. [feat] 为输入框加入 vi 命令模式（#11074）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/pull/11074
**状态**：CLOSED
**摘要**：新增可选 `ui.commandmode = "vi"` 配置，Esc 进入命令模式，支持 `h/l/j/k/0/$/^/i/a/x/I/A/p` 等键位，且不影响中断功能。
**意义**：服务 vim 用户群体的核心诉求，提升 CLI 编辑体验。

### 6. [fix] 修复 ask 卡片英文界面显示中文的问题（#11102 + #11103）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/pull/11102
**状态**：CLOSED
**摘要**：将 ask 卡片中的中文字面量改为通过 `t()` 翻译，补充英文词条 “Need your decision” / “Need more information from you”，并将未知 reason 降级为默认翻译而非暴露枚举值。
**意义**：由 issue #11101 驱动的快速修复，体现团队对国际化质量的重视。

### 7. [fix] 远程会话权限预设持久化（#11086）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/pull/11086
**状态**：OPEN
**摘要**：修复 SSH 远程会话中修改权限预设会串扰其他会话、且切换/重启后预设丢失的问题，现在按会话存储显式选择。
**意义**：提升远程协作中权限管理的安全性，避免越权或权限错误。

### 8. [fix] 计划检查不被“无法分类”的命令作废（#11090 + #11100）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/pull/11090
**状态**：CLOSED
**摘要**：修复 inline 计划检查（如 `python -c "..."`）被误判为变更操作导致检查结果作废的问题（#11090）；同时修复计划检查自身的“残留输出”不会使检查失效（#11100）。
**意义**：提升 plan 评审机制的判断准确性，减少误报。

### 9. [fix] Web Studio 无设备访问时跳转设备选择器（#11098）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/pull/11098
**状态**：CLOSED
**摘要**：直接打开 `studio.reasonix.io`（无 `?device=` 参数）时，不再在静态主机上探测 `/runtimes` 导致报错，部署流程声明了正确的 `VITE_REMOTE_HOME` 并跳转设备选择器。
**意义**：修复 Web Studio 首次访问的体验问题。

### 10. [fix] 桌面端远程会话上下文显示为空（#11092）
**链接**：https://github.com/esengine/DeepSeek-Reasonix/pull/11092
**状态**：OPEN
**摘要**：SSH 远程标签页的右侧会话概览可能显示空上下文，原因是前端抑制了远程标签 ID，导致 ContextPanel 无法请求该标签；桌面宿主进程也只读取本地标签数据。
**意义**：完善远程会话的上下文可视化，与 2.20.4 的远程打通相辅相成。

## 功能需求趋势

1. **子代理/Agent 深度可控性**：社区强烈要求调整 sub-agent 的步数上限（#9652）并获得实时进度反馈（#9521），反映用户对 agent 自动化深度的更高期待。
2. **视觉模型多模态输入**：要求将图片直接传给视觉模型而非仅 OCR 文本摘要（#9671），是一个明确的功能缺口。
3. **远程/多设备协同**：Web Studio 与桌面的打通（v2.20.4）、远端 Serve 版本同步（#10035）、WSL/SSH 远程工作区（#11105）说明远程开发是社区重点关注的方向。
4. **项目/会话管理增强**：项目分组（#9222）、颜色筛选排序（#9221）、会话级授权目录管理（#9623）、拖拽交互（#9029）等桌面端管理体验需求集中。
5. **会话可靠性与数据安全**：上下文压缩丢失（#11104）、乐观并发写入（#9213）、压缩后刷新记忆段（#9447）等问题说明长会话稳定性和数据一致性正在成为社区关注焦点。
6. **国际化与本地化**：硬编码中文字符串（#11101）反映 Reasonix 的英文用户群正在增长，翻译覆盖度需要跟上。

## 开发者关注点

1. **上下文压缩数据丢失问题（#11104）** 是最严重的反馈，自动/手动压缩都可能导致 AI 上下文截断，且会话恢复不可靠，直接冲击核心使用场景。
2. **子代理 8 轮上限（#9652）** 引发共鸣，review 等任务动辄需要更多轮次，社区认为该限制过于保守且不可配置。
3. **视觉模型无法直接读图（#9671）** 是一个功能设计缺陷，OCR 摘要方式对视觉模型而言是信息的“降维传递”。
4. **Windows 平台渲染问题频发**：空白视窗（#9562）、LaTeX 重叠（#9225）、输出乱码（v1.39.2 修复）等问题表明 Windows 端的渲染与兼容性需要更多投入。
5. **WSL/SSH 远程工作区支持不完善（#11105）**：连接成功但持续报错的体验让远程开发无法落地。
6. **国际化翻译遗漏（#11101）**：虽然修复迅速，但暴露了 UI 字符串硬编码的架构问题，需要从流程上避免。

> 注：本期日报数据截止 2026-09-27 23:59 UTC。共追踪 27 条 Issue（其中 16 条已关闭）、50 条 PR。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 — 2026-09-28

## 今日速览

过去 24 小时无新版本发布，社区焦点集中在三大方向：多个 provider 模型解析失败问题（#51737、#51739）引发对 models.dev 目录集成的质疑；TUI/桌面端交互细节持续成为高频反馈区（复制粘贴、Tab 键、悬停延迟等）；此外 "queue vs steer" 会话内提示投递方式的高赞功能需求（#32157）仍在发酵。PR 方面无重大合并，但自动化清理了大量历史 PR，并有一个新功能 PR `--no-open` 值得关注。

---

## 社区热点 Issues

挑选过去 24 小时更新中最值得关注的 10 个 Issue，涵盖长期痛点与新上报问题。

### 1. CLI 中无法复制粘贴（64 评论 · 32 👍）— #13984
[链接](https://github.com/anomalyco/opencode/issues/13984)
自 2026-02 创建以来持续近 8 个月，是目前评论数最高的未解决问题。现象为 TUI 右上角提示 "copied to clipboard"，但 `Ctrl+V` 时无内容可粘贴。@hongyesuifeng 原始报告后，大量用户在多个终端环境复现。

### 2. [2.0] 可配置的会话中提示投递方式：queue vs steer（84 👍）— #32157
[链接](https://github.com/anomalyco/opencode/issues/32157)
84 个 👍 是本期最高赞 Issue。请求将 `queue`、`steer`、`break` 作为用户提示在 Agent 运行中投递的一等公民语义区分，并支持压缩（compaction）感知的 steer 行为。这反映了用户在长会话中希望更精细控制 Agent 注意力的强烈诉求。

### 3. Tab 键无法切换 Agents，Shift+Tab 反而循环（16 评论）— #49133
[链接](https://github.com/anomalyco/opencode/issues/49133)
v2.0.3 中 Tab 键对 Agent 切换无响应，而 Shift+Tab 能循环切换，与用户预期相反。该 Issue 已关闭，但 16 条评论表明键位设计对 TUI 效率影响明显。

### 4. env 认证的 google/groq/openrouter 模型全部 "Model unavailable" — #51737
[链接](https://github.com/anomalyco/opencode/issues/51737)
v2.0.18 下 `google`、`groq`、`openrouter` 等非 Zen provider 在 `opencode models` 列表中完全缺失，API key 已存在环境变量且 `opencode auth list` 显示已认证，但请求模型时仍报 `Model unavailable`。该问题直接阻断上述 provider 的日常使用。

### 5. models.dev 目录对除内置 opencode 外的所有 provider 不生效 — #51739
[链接](https://github.com/anomalyco/opencode/issues/51739)
与 #51737 同根同源的高优先级问题：models.dev 的模型目录数据未应用到任何第三方 provider，导致整个目录功能形同虚设。作者 @tonmoydutta111-star 指出这是 "entire catalog" 级别的失败，且已被打上 `needs:compliance` 标签。

### 6. Zellij + Ghostty 组合下 OSC 8 链接不可点击 — #51735
[链接](https://github.com/anomalyco/opencode/issues/51735)
Markdown 链接在 Zellij + Ghostty 嵌套环境中不渲染为可点击链接，且显示完整 URL 而非标签文本。相同 Ghostty 窗口单独使用 opencode 时无此问题，说明是 TUI 与终端复用层的兼容性缺陷。

### 7. Location 关闭时未关闭 MCP 服务器导致进程残留 — #51731
[链接](https://github.com/anomalyco/opencode/issues/51731)
`LocationLifecycle` 在关闭时未结束 stdio MCP 服务器连接，只有 layer scope 最终化时才会关闭。配置变更、插件重载或 `opencode reload` 后，旧 stdio 进程持续运行，属于资源泄漏类工程问题。

### 8. 桌面端 Session 标签悬停预览显示错误项目名 — #51740
[链接](https://github.com/anomalyco/opencode/issues/51740)
悬停任意 Session 标签时弹出的项目名始终相同，未按会话所在目录区分；同一卡片中的路径行是正确的。对多项目开发流会造成误导。

### 9. Tab 预览弹窗延迟 2 秒，"慢得像是坏了" — #51738
[链接](https://github.com/anomalyco/opencode/issues/51738)
桌面端标签悬停预览的 `OPEN_DELAY = 2_000` 毫秒，对比 v2 Tooltip 的 `400ms` 慢 5 倍。作者直接给出了代码位置（`packages/app/src/components/titlebar-tab-popover.tsx:6`），属于明确的体验缺陷。

### 10. Steering 或 Queueing 应作为单次 prompt 决策，而非全局设置 — #51728
[链接](https://github.com/anomalyco/opencode/issues/51728)
请求将 prompt 投递方式（steer/queue）从全局配置下放到每次提交 prompt 时单独决定，类似 Codex 的交互模型。该 Issue 已被关闭并标记 `needs:compliance`，但结合 #32157 的 84 个 👍 可见，会话控制粒度是当前社区最重要的功能诉求之一。

---

## 重要 PR 进展

过去 24 小时共 50 个 PR 有更新，其中大量为自动化清理（automated-pr-cleanup）。以下挑选 10 个对社区有实质影响的 PR。

### 1. feat(opencode): 为 `opencode web` 增加 `--no-open` 参数 — #51736
[链接](https://github.com/anomalyco/opencode/pull/51736)
允许以服务模式（systemd、容器、WSL 自启动）运行 Web 服务时不弹出浏览器，解决每次重启都打开浏览器的问题。Closes #43636。目前唯一新提交的功能 PR。

### 2. docs: 添加 Bee by HEOSSI provider 配置文档 — #51734
[链接](https://github.com/anomalyco/opencode/pull/51734)
补充 Bee by HEOSSI 作为 OpenAI 兼容 provider 的接入文档，替代此前被合规自动化关闭的 #44547。对集成新模型提供方有直接帮助。

### 3. chore(nix): 更新 nixpkgs 以支持 Bun 1.4 — #50221
[链接](https://github.com/anomalyco/opencode/pull/50221)
更新 flake.lock 中的 nixpkgs 输入，使 Nix 环境获得 Bun 1.4.2+，解决 node_modules 哈希计算兼容性问题。Closes #47332。对 Nix 用户属于环境基础修复。

### 4. fix(core): Console 启动失败后自动恢复远端模型 — #45759
[链接](https://github.com/anomalyco/opencode/pull/45759)
如果服务启动时 Console DNS 或配置端点不可访问，插件加载后模型的远端清单为空，且网络恢复后不会自动重试。该 PR 使模型清单在启动失败后自动恢复，避免 `ModelUnavailableError`。

### 5. fix(tui): 最近使用的模型保留在 provider 分组中 — #45754
[链接](https://github.com/anomalyco/opencode/pull/45754)
模型选择器中，Favorite 或 Recent 中的模型会从 provider 分组中被过滤掉——模型一旦被使用，就只能从 Recent 中找到。该 PR 修复了分组过滤逻辑，Closes #40592。

### 6. fix(ui): 选择后重新挂载 kobalte select — #45749
[链接](https://github.com/anomalyco/opencode/pull/45749)
设置页面的主题、配色、语言等下拉框在选择第一项后无法再次打开。通过重新挂载组件解决。Closes #40047。

### 7. feat(CLI): 为 Termux 环境添加通知适配器 — #45676
[链接](https://github.com/anomalyco/opencode/pull/45676)
在 Termux 上运行时通知无法正常展示，该 PR 新增 Termux 专用的通知适配器。Closes #45599。移动端 / 安卓 Linux 环境用户受益。

### 8. fix(core): 修复 Node 下 npm provider 入口解析 — #45608
[链接](https://github.com/anomalyco/opencode/pull/45608)
V1 Desktop Node 运行时加载自定义 npm provider 时，解析器返回目录 URL，Node 以 `ERR_UNSUPPORTED_DIR_IMPORT` 拒绝。该 PR 改用 `resolve.exports` 回填 V2 入口解析方式。

### 9. fix(client): 区分 location 同步失败原因 — #45601
[链接](https://github.com/anomalyco/opencode/pull/45601)
此前 `location.sync()` 中任一副资源请求失败，TUI 都会将提示替换为 "Session location unavailable"——即使目录本身存在且信息已成功加载。该 PR 新增 `LocationSyncError` 细分错误类型，避免误报。

### 10. fix(desktop): 保留所有窗口的 Electron 权限 — #45598
[链接](https://github.com/anomalyco/opencode/pull/45598)
Electron 权限处理器此前只对最新窗口生效，导致其他主窗口访问系统权限异常。该 PR 在共享 session 上统一配置权限处理器，并保留通知与剪贴板白名单的安全边界。

---

## 功能需求趋势

从过去 24 小时的 Issues 和 PR 中可以提炼出以下功能方向：

- **Provider 与模型生态稳定性**（#51737、#51739）：models.dev 目录与第三方 provider 模型解析是当前最大痛点。两个 Issue 均指向 "环境变量已认证，但模型不可用" 系统性问题，社区对模型目录功能的完整性有较高期待。
- **会话内控制粒度**（#32157、#51728）：queue、steer、break 三级投递语义 + 按 prompt 单独决策。84 👍 的高赞说明用户希望从"全局配置"走向"单次决策"，这是类似 Codex 交互模型在 OpenCode 社区的自然延伸。
- **桌面端与 TUI 体验打磨**（#51738、#51740、#13984、#49133）：从复制粘贴失灵、Tab 键行为反直觉，到悬停预览延迟 2 秒、项目名显示错误，说明基础交互细节正在成为用户留存的关键因素。
- **终端兼容性**（#51735）：Zellij、Ghostty 等现代终端组合下的 OSC 8 支持欠缺。
- **资源生命周期管理**（#51731）：MCP 服务器进程随 Location 生命周期正确回收，属于平台级工程债，影响长时间运行的可靠性。

---

## 开发者关注点

综合以上数据，OpenCode 社区开发者当前最关心的几个共性问题：

1. **剪贴板与复制粘贴在 TUI 中不可用**是最持久、最广泛的痛点。64 条评论且持续 8 个月未解决，已直接影响用户对 CLI 产品的基础信任。
2. **模型不可用类问题集中在配置生效链路**：`opencode auth list` 正常、API key 在环境中，但模型列表缺失或报错，说明 provider 注册与 models.dev 目录的加载/合并存在系统性 bug，而非单点配置问题。
3. **桌面端 UI 细节频繁被点名**：悬停预览延迟、项目名错误等低难度但高感知度的缺陷，社区反应迅速且愿意提供具体代码定位（如 #51738 直接给出源码行号），期望维护团队快速修复。
4. **后台服务场景意识增强**：无论是 `opencode web --no-open`（#51736）还是 Nix 环境更新（#50221），都显示出用户正将 OpenCode 集成到 systemd、容器、WSL 等自动化工作流中，对"无头运行"能力的需求在增长。

---

> 以上日报基于 GitHub 数据生成，数据时间范围：2026-09-27 至 2026-09-28。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-09-28

> 数据来源：github.com/NousResearch/hermes-agent

## 1. 今日速览

今日社区聚焦两项 P0 级网关修复：内部事件 pin 在重启后丢失导致 system prompt 翻转（#125793），以及事件缺失时后续 channel prompt 被丢弃（#125763，PR #125783），两者均已提 PR 修复。此外，会话生命周期管理成为热门方向，PR #125827 为 TUI/Desktop 引入真正的“关闭但不删除”语义，社区讨论活跃。

## 2. 版本发布

过去 24 小时无新 Release。

## 3. 社区热点 Issues

过去 24 小时更新的公开 Issue 共 4 条，以下按关注度排序。

- **#125793 [P0/bug] 网关重启后内部事件 pin 丢失，首次内部事件仍翻转 system prompt**  
  作者：@aidiffuser | 更新：09-27 | 评论：4  
  链接：https://github.com/NousResearch/hermes-agent/issues/125793  
  这是 #125763 的 follow-up。`ConversationState.ephemeral_pin` 和 `channel_pin` 仅存于进程内存，重启后首次内部事件会错误地重放一遍 system prompt。P0 级状态一致性问题，直接影响长会话稳定性。PR #125832 已提交修复。

- **#107232 [P2/bug] Windows 上 `_agent_browser_session_cmd` 直接执行 .cmd 文件导致子进程挂起**  
  作者：@mysoul12138 | 创建 09-10 | 更新 09-27 | 评论：6  
  链接：https://github.com/NousResearch/hermes-agent/issues/107232  
  Windows 11 下通过 `subprocess` 直接运行 `agent-browser.CMD` 时进程挂起。虽 6 条评论但点赞为 0，说明影响面可能局限在 Windows + 真实浏览器配置的组合用户。多条 Windows 相关 PR（#123974 等）可部分缓解。

- **#125841 [bug] plugin-catalog pinned-source 校验可能验证 pinned commit 之外的文件**  
  作者：@beardthelion | 创建/更新：09-27 | 评论：0  
  链接：https://github.com/NousResearch/hermes-agent/issues/125841  
  供应链安全类问题：CI 中的 `pinned-source-validate` 任务使用 PR 可控的 `subdir` 字段拼接路径，且信任 `repo`/`sha` 字段，攻击者可通过恶意 catalog 条目绕过供应链校验。修复 PR #125842 已提交。

- **#124279 [P1/bug] Cron 外部 worker 使用原始解释器，丢失运行时依赖**  
  作者：@JoseMatos1970 | 创建 09-26 | 更新 09-28 | 评论：3  
  链接：https://github.com/NousResearch/hermes-agent/issues/124279  
  外部 cron worker 通过 `sys.executable -m cron.scheduler` 启动，绕过了 Hermes 托管的依赖环境，导致 `ModuleNotFoundError: No module named ruamel`。已标记 duplicate，修复方向在 PM（包管理器）层面的环境选择逻辑。

## 4. 重要 PR 进展

过去 24 小时更新 PR 共 50 条，以下为最值得关注的 10 条。

- **#125832 [P0/fix] fix(gateway): 持久化内部 prompt pins，重启后不丢失**  
  作者：@JoaoMarcos44 | 更新：09-28  
  链接：https://github.com/NousResearch/hermes-agent/pull/125832  
  直接修复 #125793。将 `ConversationState.ephemeral_pin` 和 `channel_pin` 持久化到网关重启边界之外，阻止首次内部事件重复翻转 system prompt。

- **#125827 [feature] feat: 关闭会话但不删除——end-reasoned session.close、边界关闭、End session**  
  作者：@OutThisLife | 更新：09-28  
  链接：https://github.com/NousResearch/hermes-agent/pull/125827  
  解决核心痛点：此前关闭聊天要么删历史、要么仅隐藏 UI，运行时会话槽位直到进程退出才释放。该 PR 在 Gateway 和 TUI/Desktop 两层补齐“关闭”语义，是今日社区最关注的功能型 PR。

- **#125783 [P0/fix] fix(gateway): 保留无事件后续 channel prompt**  
  作者：@JoaoMarcos44 | 更新：09-27  
  链接：https://github.com/NousResearch/hermes-agent/pull/125783  
  修复 #125763。`_run_agent_drain_pending()` 中有两种不带 `MessageEvent` 的合法 follow-up 形式（interrupt_message 和 pending_steer），此前会被 `pending_event=None` 路径误丢弃。

- **#123974 [P2/fix] fix(gateway): 绝不将 foreign-minor venv 发布为网关环境**  
  作者：@zfz154 | 更新：09-27  
  链接：https://github.com/NousResearch/hermes-agent/pull/123974  
  修复 Windows 上通过 `bin/hermes.cmd` 启动时 supervisor worker 崩溃循环（`ModuleNotFoundError: No module named 'pydantic_core'`）。根因是错误选择了 Python 其他 minor 版本的 venv。

- **#125842 [fix] fix(ci): 将 plugin-catalog 准入 gate 限制在 pinned clone 内**  
  作者：@beardthelion | 更新：09-27  
  链接：https://github.com/NousResearch/hermes-agent/pull/125842  
  修复 #125841。`pinned-source-validate` 现在真正在 pinned commit 的克隆目录内执行校验，并验证 repo/sha/subdir 字段，阻断目录穿越和伪造 sha 的供应链攻击路径。

- **#125843 [fix] fix(approval): 为容器/VM 和数据集销毁操作增加审批门槛**  
  作者：@bertheto | 更新：09-27  
  链接：https://github.com/NousResearch/hermes-agent/pull/125843  
  来自 #100532 的第三项议题。`tools/approval_detection.py` 原无针对 `pct`、`qm`、`virsh`、`lxc`、`zfs destroy`、`zpool destroy` 等破坏性动词的规则，本 PR 补齐。

- **#125797 [feature] feat(tui_gateway): session.archive RPC + inline_images=false 历史读取**  
  作者：@OutThisLife | 更新：09-27  
  链接：https://github.com/NousResearch/hermes-agent/pull/125797  
  为 TUI 网关补齐 Desktop 已有的归档能力，支持 `PATCH /api/sessions/{id}` 等效的 JSON-RPC 方法，并允许历史读取时控制内联图片。与 #125827 构成会话管理组合拳。

- **#124522 [P2/fix] fix(vision): 在字节预算减半前应用尺寸上限**  
  作者：@Wenfengcheng | 更新：09-27  
  链接：https://github.com/NousResearch/hermes-agent/pull/124522  
  修复 #124509 的一部分。原生视觉嵌入在尺寸预算上过早减半图像：3539×2499 JPEG 被压到 884×624，而 1568px 长边编码完全在字节预算内。优化前后端视觉 token 效率。

- **#125803 [feature] feat(tui): /s 别名、双击 Esc 中断、PTT 切断 TTS**  
  作者：@OutThisLife | 更新：09-27  
  链接：https://github.com/NousResearch/hermes-agent/pull/125803  
  三个 TUI 交互改进：`/s` 是 `/steer` 的快捷别名（与 `/q` 对应 `/queue` 的模式一致）；双击 Esc 中断当前操作；按下即讲（PTT）时自动切断 TTS 播放。

- **#125840 [fix] fix(slack): 阻止同线程内无休止的 bot 互回**  
  作者：@auroracapital | 更新：09-27  
  链接：https://github.com/NousResearch/hermes-agent/pull/125840  
  一个 bot 回答另一个 bot 可能在无人在场时无限循环。本 PR 将单线程单方向限制为 10 分钟内最多 6 条回复，有人 @ 机器人时重置计数，不同线程独立计数。

## 5. 功能需求趋势

从 Issue/PR 标签与内容提炼出当前社区最关注的五个方向：

- **会话生命周期管理**（sessions 相关 PR 密集）：关闭不删除（#125827）、归档 RPC（#125797）、Pin 持久化（#125832），说明 Desktop/TUI 用户对会话组织与资源释放有强烈需求。
- **重启后状态一致性**：两次 P0 修复（#125793、#125763）直指网关重启后内存态丢失问题，覆盖面包括 prompt pins、channel prompt、follow-up 信息。
- **Windows 平台修复**：浏览器子进程挂起（#107232）、venv 环境错选（#123974）、cron 依赖丢失（#124279），显示 Windows 是当前兼容性短板。
- **供应链与审批安全**：plugin-catalog pin 校验（#125842）、容器/VM 销毁审批（#125843），社区对第三方插件和破坏性工具调用的安全边界要求提升。
- **TUI/CLI 交互效率**：`/s` 别名、双击 Esc、PTT 行为（#125803）、通知铃铛（#125791），小步快跑优化终端用户体验。

## 6. 开发者关注点

- **Windows 兼容性仍是最大痛点**：从 Python venv 误选到 .cmd 子进程挂起，多位 Windows 用户和贡献者在短时间内提交多条修复。建议 Windows 用户验证自己的启动路径（Desktop / `bin/hermes.cmd` / npx）是否受影响。
- **重启即丢状态是高危信号**：两个 P0 issue 均与网关重启相关。虽然都有修复 PR，但评论数不高（4 条），说明此问题更多影响长会话或自动恢复场景，而非日常单次会话。
- **依赖环境选择逻辑需透明**：cron worker 和 venv 环境错选均涉及“哪个 Python/哪个环境被使用”的判断，开发者在排查时应先确认 `sys.executable`、`PYTHONPATH` 和 PM 环境的实际指向。
- **安全类修复得到快速响应**：#125841（供应链）从 issue 创建到修复 PR 提交不足 1 天，#125843（审批）同样当天处理。说明维护者对安全边界问题优先级较高。
- **持续集成/工具链**：多个 PR（#125655、#125726）针对 `atexit` 不执行、`os._exit` 等进程退出路径清理租约文件，对依赖生成、缓存一致性有影响的场景需关注。

:::
