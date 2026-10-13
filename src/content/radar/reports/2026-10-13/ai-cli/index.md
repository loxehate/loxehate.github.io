---
title: "AI CLI 工具社区动态日报"
published: 2026-10-13
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-13

> 生成时间: 2026-10-13 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具社区动态横向对比分析报告（2026-10-13）

## 1. 生态全景

当前 AI CLI 工具已从“模型接入与功能堆叠”进入**生产级可靠性竞争**阶段，核心矛盾集中在长会话上下文压缩、权限与沙箱、OAuth/provider 兼容、多代理成本治理、跨平台安装更新。Agent/子代理成为共同架构方向，但挂起、状态误报、配置静默忽略、升级失败等问题在多工具社区反复出现。发布节奏明显分化：Claude Code、Codex、OpenCode 当日无 Release；Gemini 保持 nightly；Reasonix、Hermes、OpenClaw 则以 patch/正式版修复升级与插件生态。社区对“静默行为”容忍度极低，要求可配置、可审计、可回滚、成本可见。MCP、插件、远程多端继续扩张，但治理与兼容正成为下一阶段瓶颈。

---

## 2. 各工具活跃度对比

> 口径说明：部分日报仅披露“热点/列示 Top10”，未给出当日 Issue/PR 总量，表中以“列示 10”或“未披露”标注。

| 工具 | Issues 更新 | PR 更新 | Release 情况 | 今日关键信号 |
|---|---:|---:|---|---|
| **Claude Code** | 50 条，展示 Top30 | 0 | 0 | #98747 idle compaction 静默丢上下文，22 评论/30 👍；权限、OAuth、多代理成本失控 |
| **OpenAI Codex** | 总数未披露，热点 10 | 列示 10，多由 bot 关闭 | 0 | #52407 Windows CUA/MXC 启动失败，66 评论；Windows 桌面与 Computer Use 是最大痛点 |
| **Gemini CLI** | 49 条 | 列示 10 | 1 个 nightly：v0.65.0-nightly | 子代理挂起、状态误报为 GOAL；沙箱、Ctrl+C、终端渲染密集修复 |
| **DeepSeek Reasonix** | 总数未披露，热点 10 | 列示 10 | 1 版本线/2 制品：studio/CLI v2.37.0 | UI/UX 信息架构、MCP 授权、Windows 插件更新、长对话性能 |
| **OpenCode** | 总数未披露，热点 10 | 列示 10+ | 0 | ChatGPT OAuth 上下文覆盖、token sharing 401、~1MiB 请求 503、GenUI |
| **Deepseek Harness** | 0 | 0 | 0 | 过去 24 小时无活动 |
| **Hermes** | 6 条，全部列出 | 列示 10；v0.21.7 汇总约 204 PR | v0.21.7 | 插件/更新兼容、本地工具竞态、SSE、MCP 认证、多代理视觉路由 |
| **OpenClaw** | 6 条，全部列出 | 列示 10 | 2：v2026.10.5-beta.2、v2026.10.2 | 升级恢复、P1 僵尸进程、Control UI Solid 迁移、NixOS hardlink |

---

## 3. 共同关注的功能方向

### 3.1 上下文压缩与长会话可控性
- **Claude Code**：#98747 长会话 idle compaction 静默丢弃 grounding；#100277 Opus 5.5 1M 上下文下 auto-compact 提前触发。
- **OpenCode**：#54972 建议 `/compact --with-derivation`，保留推理与否定性知识；#54648 compaction 仍逐字保留整段长对话。
- **Gemini CLI**：#19561 每轮基线约 36.6k token，大文件读取常 +15k/轮；#22745 AST 感知读取/搜索。
- **Codex**：#53451 将不完整响应视为终态错误，避免错误重试和 compaction 模型回退。
- **共同诉求**：压缩可配置、可退出、有警告；保留推导路径；避免提前触发；成本可见。

### 3.2 权限、沙箱与安全边界
- **Claude Code**：桌面内置浏览器忽略站点权限；Opus 5.5 safeguards 误报 `reasoning_extraction`。
- **Gemini CLI**：Agent 应阻止破坏性 git 命令；`sandbox.toml` per-command 规则因 trap 包装静默失效。
- **OpenCode**：`webfetch: deny` 对 Code Mode 注入的 fetch 无效，存在权限绕过。
- **Codex**：网络代理拒绝重复 Host 头；冷线程恢复网络授权、保存线程权限恢复。
- **Hermes / Reasonix / OpenClaw**：MCP OAuth park 状态、MCP 授权入口缺失、Discord channel-scoped allowlist 争议。
- **共同诉求**：安全规则必须真实生效，权限模型跨客户端一致，且可审计。

### 3.3 认证、OAuth 与 Provider 兼容
- **Claude Code**：Windows/VSCode OAuth refresh 竞态导致 400 强制重登；MCP OAuth `resource` 双重编码。
- **OpenCode**：ChatGPT OAuth 覆盖上下文上限为 400k；token sharing 返回 401；自定义 provider 无法保存。
- **Codex**：Windows ChatGPT Classic 登录回调失败。
- **Reasonix / OpenClaw / Hermes**：远程服务器模型不同步、OpenAI 兼容图像生成 URL 解析失败、MCP OAuth 认证失败唤醒逻辑。
- **共同诉求**：OAuth 并发安全、token 共享一致、provider 字段容错、模型元数据可信。

### 3.4 多代理编排与成本治理
- **Claude Code**：#101650 多代理忽略项目 6 并发限制，运行约 16 个代理，重试 2 小时，消耗约 12% 周 Max 配额。
- **Codex**：#33881 子代理忽略 agent TOML 模型与推理强度，继承父模型。
- **Gemini CLI**：#22323 子代理 MAX_TURNS 中断被上报为 GOAL 成功；#21409 generalist agent 永久挂起；#21968 模型不主动调用 skills/子代理。
- **Hermes / OpenClaw**：委派子代理图像路由、子代理 spawn 性能。
- **共同诉求**：硬并发限制、超时与健康检查、状态可信、成本护栏、模型继承可预期。

### 3.5 跨平台、安装与升级可靠性
- **Windows**：Claude Code MSIX/RTX 50 闪烁；Codex `HRESULT 0x80070003`、Git 网络失败；Reasonix 插件更新 rename 失败；OpenCode Windows ARM64 分发问题。
- **Linux/macOS**：Claude Code Linux JSC SIGILL；Codex macOS SIGTRAP、更新器保留旧版本约 1.8GB；Gemini Wayland/rootless Podman；OpenClaw NixOS hardlink；Hermes 安装器 Node 缺少 C++ symbols。
- **共同诉求**：升级完成而非回滚、旧版本清理、平台原生适配、包管理器兼容。

### 3.6 TUI/UI、可观测性与可访问性
- **Gemini CLI**：Ctrl+C 双击竞态、tmux 闪烁、resize 防抖。
- **OpenCode**：TUI 紧凑化、MCP 状态计数、上下文/成本阈值着色、GenUI、滚动保持。
- **Reasonix**：设置入口过多、状态栏与对话框信息重复、右侧面板不可关闭。
- **OpenClaw / Codex / Hermes**：Control UI Solid 迁移、WSL 剪贴板、屏幕阅读器友好输出。
- **共同诉求**：低闪烁、可定制、信息密度高、可访问、可审计。

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线与今日信号 |
|---|---|---|---|
| **Claude Code** | 企业级复杂工作流、桌面/CLI、权限、MCP、多代理 | 专业开发者、团队、企业 | 产品化程度高，但长会话可靠性、权限一致性、OAuth、成本治理问题突出 |
| **OpenAI Codex** | OpenAI 栈、桌面 Computer Use/浏览器、远程 App Server、CLI | OpenAI 生态用户、Windows 桌面用户 | 深度绑定 OpenAI 模型与桌面能力，Windows 与包分发是明显短板 |
| **Gemini CLI** | 开源 CLI Agent、Subagent、沙箱、AST/token 效率 | 开发者、Google/Gemini 生态 | 快速 nightly 迭代，Agent 可靠性与状态语义优先补课 |
| **DeepSeek Reasonix** | Studio+CLI、模型服务预设、主题、MCP、远程多端 | 桌面用户、多模型用户 | 产品化中，UI/UX 信息架构与 MCP 治理是当前重点 |
| **OpenCode** | 开源 TUI/桌面/Web、GenUI、provider 扩展、TUI 定制、传输压缩 | Power users、开源生态 | 功能创新快，认证、大请求、平台覆盖与配置容错仍需加固 |
| **Deepseek Harness** | 暂无社区动态 | 未知 | 过去 24 小时无活动，需观察是否暂停或低维护 |
| **Hermes** | Agent harness、桌面/云/Docker/Store、Kanban、群聊、插件、MCP | NousResearch 生态、自托管用户 | 快速迭代，v0.21.7 汇总约 204 PR；插件/更新兼容是主要摩擦 |
| **OpenClaw** | Gateway、Control UI、插件、cron/备份、跨端自动化 | 自托管、企业自动化 | 平台化推进，升级恢复与 P1 僵尸进程是生产部署风险点 |

---

## 5. 社区热度与成熟度

### 高活跃、大规模社区
- **Claude Code**：50 条 Issue 更新，最高 #98747 达 22 评论/30 👍，说明长会话可靠性是核心痛点。
- **Gemini CLI**：49 条 Issue 更新，#21409 获 8 👍，子代理挂起影响面广，官方以 P1 跟踪。
- **OpenAI Codex**：#52407 达 66 评论，Windows 桌面 Computer Use/浏览器工具问题热度最高。
- **OpenCode**：#47646 达 11 评论，OAuth 上下文覆盖、token sharing、大请求 503 形成技术链条，PR 侧 GenUI 与 TUI 增强密集。

### 快速迭代、平台化团队
- **OpenClaw**：当日 2 个 Release，但 P1 #97616 僵尸进程泄漏长期未关，稳定性风险与迭代速度并存。
- **Hermes**：v0.21.7 汇总约 204 PR，Issue 虽少但插件更新、安装器、SSE、MCP 认证问题集中，处于快速扩张期。
- **Reasonix**：v2.37.0 发布，10 条热点 Issue/PR，UI/UX 与 MCP 治理需求上升，产品化中。

### 低活跃或需观察
- **Deepseek Harness**：过去 24 小时无活动，需关注是否进入维护空窗。
- **成熟度判断**：Claude Code、Codex 用户规模大、产品成熟，但边缘与平台问题多；Gemini、OpenCode 开源迭代快；Hermes、OpenClaw 平台化加速；Reasonix 仍在补齐体验与治理；Deepseek Harness 活跃度最低。

---

## 6. 值得关注的趋势信号

1. **生产级可靠性成为选型硬指标**  
   模型能力不再是唯一差异点。升级回滚、OAuth 并发、权限生效、压缩策略、多代理成本，直接决定生产可用性。技术决策者应把“故障可恢复、状态可审计、成本可限制”纳入评估清单。

2. **静默失败是信任杀手**  
   Claude Code compaction 无警告、Gemini settings 被忽略、OpenCode `skip-title` 无效、OpenClaw 升级卡 recovery、Codex 子代理配置继承错误——均属于“不报错但不生效”。工具需要显式日志、dry-run、状态提示与回滚机制。

3. **多代理从 Demo 进入治理阶段**  
   Claude Code 多代理超并发消耗 12% 周配额，Gemini 子代理挂起 1 小时，Codex 子代理忽略模型配置。下一步竞争点是硬并发限制、超时健康检查、模型继承规则、成本可视化与配额护栏。

4. **认证与 Provider 兼容决定集成成本**  
   OAuth refresh 竞态、token sharing 401、MCP OAuth 参数编码、OpenAI 兼容 provider 响应差异，是企业部署和第三方生态扩展的主要摩擦。选型时应优先验证 SSO/OAuth/MCP 审计与 provider 容错能力。

5. **上下文压缩需从“压得下”转向“压得对”**  
   社区不满足于摘要压缩，而要求保留推导路径、否定性知识、工具调用原因。OpenCode、Claude Code、Gemini 的反馈一致指向：压缩策略应可配置、可观察、可回退。

6. **跨平台与安装更新仍是 Adoption 门槛**  
   Windows、ARM64、NixOS、Wayland、macOS、Linux musl 均出现阻塞性问题。对企业与团队用户，安装器、自动更新、包管理器兼容、旧系统支持应与核心功能同等优先级。

7. **TUI/UI 与可访问性成为差异化战场**  
   OpenCode 的 TUI 紧凑化与 GenUI、Gemini 的终端渲染修复、Hermes 的屏幕阅读器反馈，说明高频交互体验开始影响留存。对开发者工具而言，信息密度、低闪烁、可定制、无障碍不再是锦上添花。

8. **远程多端与 Gateway 状态同步是下一阶段架构焦点**  
   Codex 外部 App Server、OpenClaw Gateway ownership/睡眠恢复、Reasonix 远程模型同步、Hermes 跨 Desktop/Telegram 群聊，均指向“本地 CLI + 远程/多端协作”的架构演进。状态所有权、会话恢复、跨端一致性将成为平台能力分水岭。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

> 注：PR 数据中的“评论数”字段为 `undefined`，无法严格按评论数复现排序。以下 PR 排行按官方排序、更新时间、关联 Issue 讨论热度与影响面综合判断；所列 PR 均为 `OPEN`，未见 `merged/draft` 标记。

## 1. 热门 Skills 排行

| 排名 | Skill / PR | 功能 | 社区讨论热点 | 状态 |
|---|---|---|---|---|
| 1 | **skill-creator** [PR #1298](https://github.com/anthropics/skills/pull/1298)、[PR #1961](https://github.com/anthropics/skills/pull/1961)、[PR #1681](https://github.com/anthropics/skills/pull/1681) | 创建、打包、评估 Skill 的官方元技能 | trigger eval 0% 触发、并行 worker 误判、Windows 兼容、eval viewer XSS/DNS rebinding、直接执行失败。关联高评论 Issue：[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)、[#1383](https://github.com/anthropics/skills/issues/1383)、[#1394](https://github.com/anthropics/skills/issues/1394) | OPEN |
| 2 | **mcp-builder** [PR #1742](https://github.com/anthropics/skills/pull/1742) | 构建与评测 MCP Server 的 Skill | MCP >=2.0 中 `streamablehttp_client` 重命名、custom headers 配置变化；关联 [#1390](https://github.com/anthropics/skills/issues/1390) 评测对真实 MCP Server 得 0/N | OPEN |
| 3 | **docx** [PR #1734](https://github.com/anthropics/skills/pull/1734)、[PR #1792](https://github.com/anthropics/skills/pull/1792) | Word 文档生成、修订、评论处理 | 检测孤儿评论；LibreOffice 超时应报错而非成功；输出需校验 revision marks | OPEN |
| 4 | **document-typography** [PR #514](https://github.com/anthropics/skills/pull/514) | AI 生成文档的排版质检 | 孤词换行、寡段、编号错位等通用排版问题；长期 open，覆盖所有文档生成场景 | OPEN |
| 5 | **md2video-audio** [PR #1703](https://github.com/anthropics/skills/pull/1703) | Markdown 编译为带真人感配音的 MP4 | 零成本多媒体生成：Markdown → Marp 幻灯片 → 视频/配音 | OPEN |
| 6 | **proofcore-contract-auditor** [PR #1771](https://github.com/anthropics/skills/pull/1771) | Solidity/Rust 智能合约静态分析与审计证明 | Web3 安全审计、TON 区块链 Merkle 证明锚定、零存储审计 | OPEN |
| 7 | **notion-spec-to-implementation** [PR #1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品/技术 spec 转为实现任务 | 工作流自动化：spec 拆解、验收标准、进度跟踪；同 PR 还含简历量化审计 | OPEN |
| 8 | **webapp-testing** [PR #1980](https://github.com/anthropics/skills/pull/1980)、[PR #1976](https://github.com/anthropics/skills/pull/1976) | Web 应用测试脚本与元素发现 | 避免 `shell=True` 命令注入 CWE-78；textarea/select 元素识别修复 | OPEN |

## 2. 社区需求趋势

| 方向 | 代表 Issue / PR | 社区诉求 |
|---|---|---|
| 安全与信任边界 | [#492](https://github.com/anthropics/skills/issues/492) 46 评论、[#1394](https://github.com/anthropics/skills/issues/1394)、[PR #1980](https://github.com/anthropics/skills/pull/1980) | 社区 Skill 冒用 `anthropic/` 命名空间，eval viewer XSS，脚本命令注入；需要命名空间隔离、权限最小化、供应链审计 |
| Skill 创建/评估可靠性 | [#556](https://github.com/anthropics/skills/issues/556) 12 评论、[#1352](https://github.com/anthropics/skills/issues/1352)、[#1383](https://github.com/anthropics/skills/issues/1383)、[#202](https://github.com/anthropics/skills/issues/202) | trigger eval 不触发、benchmark 静默失败、Windows 不兼容；需要可复现的评估与优化闭环 |
| 组织级分发与共享 | [#228](https://github.com/anthropics/skills/issues/228) 16 评论、[#189](https://github.com/anthropics/skills/issues/189) 6 评论 | 组织内共享 Skill 库、直接分享链接、去重安装、版本管理 |
| MCP / API 集成可靠性 | [#1390](https://github.com/anthropics/skills/issues/1390)、[#1487](https://github.com/anthropics/skills/issues/1487)、[PR #1742](https://github.com/anthropics/skills/pull/1742) | MCP 2.x 兼容、真实 Server 评测、自定义 headers、上下文 token 控制 |
| 文档 / 办公 / 多媒体质量 | [PR #514](https://github.com/anthropics/skills/pull/514)、[PR #1792](https://github.com/anthropics/skills/pull/1792)、[PR #486](https://github.com/anthropics/skills/pull/486)、[PR #538](https://github.com/anthropics/skills/pull/538) | docx/pdf/ODT 格式兼容、排版质检、视频/音频合成 |
| 测试与 Web 自动化 | [PR #822](https://github.com/anthropics/skills/pull/822)、[PR #1980](https://github.com/anthropics/skills/pull/1980)、[#1362](https://github.com/anthropics/skills/issues/1362) | 零代码 E2E、浏览器控制、安全 shell、pnpm ≥10.1 构建兼容 |
| 垂直领域 / 治理 / 上下文 | [PR #1771](https://github.com/anthropics/skills/pull/1771)、[PR #1615](https://github.com/anthropics/skills/pull/1615)、[#1385](https://github.com/anthropics/skills/issues/1385)、[#1329](https://github.com/anthropics/skills/issues/1329) | Web3 审计、HPC 集群、AI 治理门禁、符号化记忆、token 压缩 |

## 3. 高潜力待合并 Skills

以下 PR 关联 Issue 讨论活跃或修复刚性较强，可能近期落地：

1. **skill-creator 修复系列**：[PR #1298](https://github.com/anthropics/skills/pull/1298)、[PR #1961](https://github.com/anthropics/skills/pull/1961)、[PR #1681](https://github.com/anthropics/skills/pull/1681)  
   关联 #556、#1352、#1383、#1394，涉及评估可靠性、安全加固、Windows 兼容，优先级最高。

2. **mcp-builder 兼容修复**：[PR #1742](https://github.com/anthropics/skills/pull/1742)  
   若不合并，MCP 2.x 下连接脚本和真实 Server 评测可能持续失效。

3. **webapp-testing 安全与元素发现修复**：[PR #1980](https://github.com/anthropics/skills/pull/1980)、[PR #1976](https://github.com/anthropics/skills/pull/1976)  
   修复命令注入和 textarea/select 识别，改动小、风险低，较易合并。

4. **docx 可靠性修复**：[PR #1792](https://github.com/anthropics/skills/pull/1792)、[PR #1734](https://github.com/anthropics/skills/pull/1734)  
   文档技能高频使用，修复超时误报和孤儿评论，实用性强。

5. **document-typography**：[PR #514](https://github.com/anthropics/skills/pull/514)  
   通用排版质检，长期 open 但覆盖所有生成文档，若官方扩展文档质量体系，可能被纳入。

6. **md2video-audio**：[PR #1703](https://github.com/anthropics/skills/pull/1703)  
   Markdown 转视频/配音属于高需求多媒体方向，新增品类潜力较大。

7. **proofcore-contract-auditor**：[PR #1771](https://github.com/anthropics/skills/pull/1771)  
   Web3 智能合约审计垂直 Skill，安全合规场景明确。

8. **notion-spec-to-implementation**：[PR #1245](https://github.com/anthropics/skills/pull/1245)  
   对接 Notion 工作流，代表社区对“spec → 任务 → 实现”自动化的期待。

## 4. Skills 生态洞察

**一句话总结：当前社区在 Skills 层面最集中的诉求是——官方元技能（skill-creator / mcp-builder）必须先解决评估可靠性、跨平台兼容与安全信任边界，同时向外扩展文档排版、测试自动化、组织共享和垂直领域审计，让 Skills 成为可治理的生产级能力包。**

---

# Claude Code 社区动态日报（2026-10-13）

> 数据窗口：过去 24 小时。Releases 0 条，PR 更新 0 条，Issues 更新 50 条（展示评论数最高的 30 条）。本期社区焦点集中在长会话自动压缩、权限失效、OAuth 并发竞态、Opus 5.5 行为异常与多代理成本失控。

## 1. 今日速览

过去 24 小时无新版本发布、无 PR 更新，但 Issue 讨论热度较高。最受关注的是 2.1.286 的 idle compaction 静默丢弃长会话上下文，以及桌面内置浏览器忽略站点权限。同时，Windows/VSCode OAuth 并发竞态、Opus 5.5 自动压缩提前触发与安全误报继续消耗开发者注意力。

## 2. 版本发布

过去 24 小时无新 Releases。

## 3. 社区热点 Issues

1. **[#98747 [CLOSED] 2.1.286 idle compaction 静默丢弃长会话工作上下文](https://github.com/anthropics/claude-code/issues/98747)**  
   状态：CLOSED | 评论 22 | 👍 30。2.1.286 在 prompt cache 过期前自动 compact idle 会话，无警告、无退出选项，长会话 grounding 被丢弃。这是本期评论和点赞最高的 Issue，说明长会话可靠性是社区核心痛点。

2. **[#91495 [OPEN] 桌面内置浏览器忽略站点权限 “Allow all websites”](https://github.com/anthropics/claude-code/issues/91495)**  
   状态：OPEN | 评论 19 | 👍 23。Claude Code Desktop 内置浏览器未遵守站点权限设置，涉及 permissions、browser-extension、desktop。权限模型失效会直接影响安全预期，社区反应强烈。

3. **[#68083 [OPEN] Desktop 全局 Auto-fix CI 开关不适用于本地 gh 创建的 PR，且不持久化](https://github.com/anthropics/claude-code/issues/68083)**  
   状态：OPEN | 评论 7 | 👍 8。桌面端全局 “Auto-fix CI and address comments” 对本地会话通过 `gh` 创建的 PR 不生效，也不写入 `claude_desktop_config.json`。配置跨路径不一致，影响自动化工作流。

4. **[#91708 [OPEN] Windows/VSCode 并发会话 OAuth refresh 竞态，导致 400 强制重登](https://github.com/anthropics/claude-code/issues/91708)**  
   状态：OPEN | 评论 7 | 👍 2。Windows 文件凭证存储下，并发 Claude Code 进程刷新 OAuth 时发生竞态，触发 400 并强制重新登录。属于认证基础设施问题，影响多窗口/多会话使用。

5. **[#96118 [OPEN] Opus 5.5 safeguards 因 reasoning_extraction 误报拦截消息](https://github.com/anthropics/claude-code/issues/96118)**  
   状态：OPEN | 评论 7 | 👍 2。用户请求展示 thinking 和检查内容时，Opus 5.5 1M context 的 safeguards 以 `reasoning_extraction` 标记并停止响应。安全误报影响正常调试和可解释性，社区期待更透明机制。

6. **[#79220 [OPEN] Windows MSIX：RTX 50 系严重闪烁，workaround 被 MSIX 打包阻止](https://github.com/anthropics/claude-code/issues/79220)**  
   状态：OPEN | 评论 7 | 👍 0。Claude Desktop Windows MSIX 版在 NVIDIA RTX 50 系上出现全窗口闪烁，`--disable-direct-composition` 可修复，但 MSIX 启动/打包限制无法应用。平台原生适配问题持续存在。

7. **[#100277 [OPEN] Opus 5.5 1M 上下文窗口下 Auto-Compact 提前触发](https://github.com/anthropics/claude-code/issues/100277)**  
   状态：OPEN | 评论 3 | 👍 0。在 preTokens 约 275,318、状态栏约 27% 时触发 auto-compact，用户认为阈值与 1M 上下文能力不匹配。与 #98747 共同指向压缩策略不可控。

8. **[#101650 [OPEN] 多代理编排忽略项目并发限制，重试自身超时 2 小时，消耗约 12% 周 Max 配额](https://github.com/anthropics/claude-code/issues/101650)**  
   状态：OPEN | 评论 1 | 👍 0，2026-10-12 新提交。Opus 协调会话未遵守项目写入的 6 个 implementer 并发限制，运行约 16 个代理，并因自身负载超时重试约 2 小时，最终无合并。多代理成本与约束治理成为新热点。

9. **[#101648 [OPEN] Linux x64 2.1.296 / Bun 1.4.3 在 “Compacting conversation…” 时主线程 SIGILL](https://github.com/anthropics/claude-code/issues/101648)**  
   状态：OPEN | 评论 1 | 👍 0，2026-10-12 新提交。SIGILL 发生在 JSC JIT 代码中，与 compaction 过程相关。属于严重运行时崩溃，可能影响 Linux 生产使用。

10. **[#101205 [CLOSED] MCP OAuth：服务器 URL 带 query 时 resource 参数双重编码，Supabase 返回 422](https://github.com/anthropics/claude-code/issues/101205)**  
    状态：CLOSED | 评论 2 | 👍 0。MCP OAuth 流程中 `resource` 参数被双重编码，导致 Supabase 等认证服务拒绝请求。虽已关闭，但反映 MCP 认证边缘场景仍需覆盖。

## 4. 重要 PR 进展

过去 24 小时 PR 更新为 0 条，因此无可挑选的重要 PR。社区动态主要集中在 Issue 反馈与缺陷跟踪。

## 5. 功能需求趋势

- **上下文与压缩可控性**：社区强烈要求 compaction 可配置、可退出、有警告。代表：#98747、#100277。
- **权限与安全边界**：桌面浏览器站点权限、MCP OAuth、安全误报是高频方向。代表：#91495、#96118、#101205。
- **多客户端状态一致性**：Desktop、VS Code、CLI 之间的会话归档、组织切换、CI auto-fix 配置不统一。代表：#68083、#94507、#88476。
- **认证可靠性**：OAuth 并发刷新、文件凭证存储、MCP OAuth 参数处理成为痛点。代表：#91708、#101205。
- **跨平台稳定性**：Windows MSIX/NVIDIA、路径大小写、Linux JSC SIGILL 等问题持续出现。代表：#79220、#90438、#101648。
- **自动化与调度可靠性**：scheduled task / routine 静默失败、恢复后立即触发、输出丢失。代表：#99527、#81931、#88408。
- **多代理与成本治理**：代理不遵守项目并发限制、超时重试浪费配额、缺乏批处理约束。代表：#101650。
- **远程控制与移动端**：iOS effort picker 回退 Ultracode 到 Extra，跨设备状态同步待完善。代表：#99489。
- **MCP 与企业集成**：Bedrock STS role session name、MCP 工具结果分离、OAuth 资源参数等。代表：#84504、#92509、#101205。

## 6. 开发者关注点

- **静默行为不可接受**：无警告、无 opt-out 的 idle compaction，以及调度任务静默失败，都会破坏长期工作会话信任。
- **配置与状态分散**：不同客户端、不同配置文件、不同 org 作用域之间不一致，导致自动化开关和会话记录丢失。
- **认证与权限边缘 case**：OAuth 并发、URL query 编码、桌面浏览器权限忽略，直接影响可用性与安全预期。
- **平台原生适配不足**：Windows MSIX/NVIDIA、路径大小写、Linux 运行时崩溃，说明跨平台质量仍需加强。
- **多代理成本失控**：代理忽略项目约束、重试自身超时、消耗周配额，开发者需要更硬的并发、批处理和成本护栏。
- **模型行为可解释性**：Opus 5.5 safeguards 误报和自动压缩阈值异常，使开发者希望获得更透明的状态、日志与调节能力。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报（2026-10-13）

数据来源：github.com/openai/codex。基于过去 24 小时更新数据整理。

## 今日速览

过去 24 小时无新 Release，社区热度集中在 Windows 桌面端 Computer Use/浏览器工具启动失败，`HRESULT 0x80070003` 相关 Issue 成为最高热度。CLI 侧大量安装、更新、崩溃旧 Issue 被关闭或更新，但 `gpt-5.6-sol` 模型不可用、macOS SIGTRAP、Linux 包缺失等问题仍是长期痛点。PR 侧主要由 `@copyberry[bot]` 提交并关闭，覆盖网络代理安全、WSL 剪贴板、TUI 路由、线程权限恢复和 Windows CI。

## 版本发布

过去 24 小时无新 Releases。

## 社区热点 Issues

1. **#52407 [OPEN] Windows Dots: CUA MXC launcher fails with HRESULT 0x80070003 after direct shell recovery**  
   66 评论 / 8 👍。Windows 桌面 Computer Use 启动链路核心故障，错误码指向路径或运行库问题，且发生在 shell recovery 后。社区热度最高，说明 Windows 用户受影响面较大。  
   https://github.com/openai/codex/issues/52407

2. **#53188 [OPEN] [Windows] Browser tools fail to initialize: MXC launcher HRESULT 0x80070003**  
   11 评论。与 #52407 同错误码，表明 MXC launcher 问题可能是系统性的，并进一步影响浏览器工具初始化。虽点赞少，但评论增长快，值得优先排查。  
   https://github.com/openai/codex/issues/53188

3. **#35898 [CLOSED] BLOCKER - Model not found gpt-5.6-sol**  
   18 评论 / 8 👍。模型不可用直接阻塞 CLI 使用，涉及 `codex-cli 0.146.0` 与 `gpt-5.6-sol high`。虽已关闭，但作为模型支持类阻塞问题，仍需确认是否彻底修复。  
   https://github.com/openai/codex/issues/35898

4. **#50919 [OPEN] [Windows][ChatGPT Classic] Sign-in fails at openai-sidetron callback with NextAuth GET error**  
   11 评论 / 5 👍。Windows 登录认证链路失败，Codex 和新 ChatGPT App 正常；清 Firefox cookies 仅个人 workaround，根因未明。  
   https://github.com/openai/codex/issues/50919

5. **#41268 [OPEN] Windows desktop: browser-process crash loop persists across 26.820.7780 → 26.825.3734**  
   8 评论 / 2 👍。Windows 桌面浏览器进程跨版本崩溃循环，Crashpad 记录 browser/main-process crash，但无 minidump，稳定性问题长期未解。  
   https://github.com/openai/codex/issues/41268

6. **#53501 [OPEN] Windows Work: Git networking fails with getaddrinfo() despite Local network access On**  
   3 评论。Codex 内 Git 网络失败，但普通 PowerShell 成功，指向沙箱、网络权限或代理策略问题，影响 Windows 下代码托管操作。  
   https://github.com/openai/codex/issues/53501

7. **#40134 [OPEN] Allow Codex Desktop to connect to an externally managed App Server**  
   3 评论 / 1 👍。社区希望 Desktop 支持接入已有 App Server，而 CLI 已支持 `codex --remote`。对自托管、远程和多客户端工作流很重要。  
   https://github.com/openai/codex/issues/40134

8. **#49209 [OPEN] [macOS Remote] Connected Mac's project names missing from sidebar while remote chats appear in Recents**  
   2 评论。Mac-to-Mac Remote 下，远程 Mac 已连接且聊天可见，但 Project 分组侧栏只显示本地项目，影响远程开发体验。  
   https://github.com/openai/codex/issues/49209

9. **#34740 [CLOSED] standalone updater retains every previous release (~1.8 GB after 8 updates)**  
   2 评论 / 5 👍。macOS Apple Silicon 上更新器保留所有旧版本目录，8 次更新后约 1.8 GB，缺少自动清理策略，属于高赞资源管理痛点。  
   https://github.com/openai/codex/issues/34740

10. **#33881 [CLOSED] codex exec: registered agent TOML model / model_reasoning_effort ignored — subagents inherit the parent model**  
   2 评论 / 4 👍。自定义 agent TOML 中的模型和推理强度被忽略，子代理继承父模型，破坏多代理与自动化工作流的可预期性。  
   https://github.com/openai/codex/issues/33881

## 重要 PR 进展

1. **#53506 [CLOSED] Reject duplicate Host headers in the network proxy**  
   网络代理拒绝重复 `Host` 头，避免策略评估与上游解析选择不同字段，提升代理安全性与一致性。  
   https://github.com/openai/codex/pull/53506

2. **#53453 [CLOSED] Prefer the Windows clipboard and bound copy attempts on WSL**  
   修复 WSLg 剪贴板初始化可能无限阻塞、PowerShell 写剪贴板可能卡住的问题，提升 TUI 复制请求可靠性。  
   https://github.com/openai/codex/pull/53453

3. **#53452 [CLOSED] Close input admission while a turn finishes recording**  
   在回合最终化期间关闭输入准入，避免输入被排到已 drain 的最终批次之后或提前记录。  
   https://github.com/openai/codex/pull/53452

4. **#53451 [CLOSED] Treat incomplete responses as terminal errors**  
   将 `max_output_tokens` 等不完整响应归类为终态错误，避免错误重试和 compaction 模型回退。  
   https://github.com/openai/codex/pull/53451

5. **#53436 [CLOSED] Route TUI request replies to their originating connection and thread**  
   TUI 请求回复和解决通知绑定到原连接与线程，避免会话切换后请求 ID 复用导致串扰。  
   https://github.com/openai/codex/pull/53436

6. **#53429 [CLOSED] Apply configuration toggles live and improve settings navigation**  
   配置开关支持实时生效，同时改进设置搜索和窄终端下的值、描述截断问题。  
   https://github.com/openai/codex/pull/53429

7. **#53419 [CLOSED] Restore saved thread permissions during configuration loading**  
   在配置加载阶段恢复已保存线程权限，确保网络代理初始化和权限校验使用正确默认值。  
   https://github.com/openai/codex/pull/53419

8. **#53424 [CLOSED] Add regression coverage for network grants on cold thread resume**  
   新增冷线程恢复网络授权的回归测试，验证默认权限改为 `:danger-full-access` 后，已保存只读线程仍遵守恢复的授权。  
   https://github.com/openai/codex/pull/53424

9. **#53443 [CLOSED] Use local MSVC toolchains for native Windows Bazel tests**  
   原生 Windows Bazel 测试改用本地 MSVC 工具链和 SDK，修复 Hermetic LLVM 在 MSVC 平台下的 ABI 问题。  
   https://github.com/openai/codex/pull/53443

10. **#53412 [CLOSED] Isolate arg0 helper directories by operating system**  
    按操作系统隔离 arg0 helper 目录，避免 Windows/WSL 共享 `CODEX_HOME` 时清理误删另一平台的活跃 helper。  
    https://github.com/openai/codex/pull/53412

## 功能需求趋势

- **Windows 桌面与 Computer Use 稳定性**：`HRESULT 0x80070003`、MXC launcher、浏览器工具初始化失败、浏览器进程崩溃循环、Git 网络失败集中出现。#52407、#53188、#41268、#53501  
- **CLI 安装、自更新与包分发可靠性**：Linux x64 musl 缺少 SHA-256、npm 平台产物缺失、`install.sh` 陈旧、更新失败等问题反复出现。#27194、#24672、#31766、#31608  
- **模型与多代理配置支持**：`gpt-5.6-sol` 模型不可用、子代理忽略 TOML 模型和推理强度配置，影响新模型和多代理工作流。#35898、#33881  
- **远程连接与 App Server 集成**：社区希望 Desktop 支持外部 App Server，并修复 macOS Remote 项目侧栏缺失。#40134、#49209  
- **网络代理、沙箱与权限恢复**：重复 Host 头、冷线程恢复网络授权、保存线程权限恢复等 PR 表明代理和权限模型正在被系统性加固。#53506、#53419、#53424  
- **TUI 与终端兼容体验**：WSL 剪贴板、状态行颜色、终端识别、配置热更新等改进密集。#53453、#53440、#53438、#53429  
- **资源管理与性能**：更新器保留旧版本、Chrome 进程残留、Windows 无进展忙等仍是高频资源类问题。#34740、#32462、#33090

## 开发者关注点

- **Windows 端问题优先级最高**：尤其是桌面端 Computer Use/浏览器工具启动失败，`HRESULT 0x80070003` 已在多个 Issue 中复现，建议官方给出统一诊断和修复进展。
- **安装与更新链路可信度不足**：Linux/macOS 多版本出现包缺失、校验缺失、安装脚本陈旧，影响新用户和企业部署。
- **CLI 崩溃与平台兼容性**：macOS x86_64、旧 macOS、Linux 等环境多次出现 SIGTRAP、trace trap、段错误，稳定性仍需加强。
- **配置系统一致性**：子代理模型、推理强度、线程权限等配置被忽略或恢复时机不正确，会直接影响自动化与多代理场景。
- **远程开发体验待完善**：Desktop 接入外部 App Server、远程 Mac 项目侧栏、远程聊天与项目分组联动是明确需求。
- **资源清理与可观测性**：更新器磁盘膨胀、Chrome 孤儿进程、Windows 卡死无进展、诊断信息不足等，是开发者长期反馈的运维痛点。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 · 2026-10-13

---

## 一、今日速览

今日无正式版本发布，仅有 v0.65.0 的 nightly 构建。社区最集中的声音仍指向 **Agent 子系统的可靠性**——子代理挂起、终止原因误报、工具/技能调用不主动，占据了今日更新 Issue 的绝大多数。PR 侧则聚焦于 **终端渲染稳定性（闪烁、resize）、Ctrl+C 中断竞态、以及沙箱跨平台兼容性** 的密集修复。

---

## 二、版本发布

**v0.65.0-nightly.20261012.g9b6e0265d**
仅夜间构建，官方未附变更说明。与前一 nightly（20261010）的完整对比见：
https://github.com/google-gemini/gemini-cli/compare/v0.65.0-nightly.20261010.g9b6e0265d...v0.65.0-nightly.20261012.g9b6e0265d

> 关注点：nightly 号已进入 v0.65 序列，说明 0.64 分支应已趋于稳定；建议生产用户继续留在稳定版。

---

## 三、社区热点 Issues（Top 10）

**1. #22323 [P1] 子代理 MAX_TURNS 中断被上报为 GOAL 成功**
https://github.com/google-gemini/gemini-cli/issues/22323
`codebase_investigator` 在触及最大轮次限制前什么都没做，却返回 `status: "success"` / `Termination Reason: "GOAL"`。这是**可信度级别的问题**：错误状态会污染自动化流水线与上层编排逻辑。13 条评论，维护者标记 need-retesting，说明修复已被验证但未收敛。

**2. #21409 [P1] Generalist agent 永久挂起**
https://github.com/google-gemini/gemini-cli/issues/21409
只要 CLI 委派给 generalist agent 就无限卡住（用户等待超 1 小时），明确指示不使用子代理即可绕过。**8 个 👍 是今日最高赞**，说明这是高发且影响面广的阻塞性缺陷。

**3. #19873 [P2] 零依赖 OS 沙箱 + 执行后意图路由**
https://github.com/google-gemini/gemini-cli/issues/19873
提案核心：Gemini 3 模型本质是"原生 bash 用户"，应通过轻量 OS 级沙箱释放其 `grep`/`sed`/`awk` 链路能力，同时不牺牲安全与 UX。这是**架构级方向性讨论**，9 条评论，影响后续 Agent 工具设计取向。

**4. #21968 [P2] Gemini 几乎不主动使用 skills 和子代理**
https://github.com/google-gemini/gemini-cli/issues/21968
用户自建 gradle/git skill 后，模型除非被显式指令，否则完全不调用。这直接削弱了 Skills 与 Subagent 两大扩展机制的实用价值，是**生态扩展性的关键堵点**。

**5. #22745 [P2] AST 感知的读取/搜索/代码库映射评估（EPIC）**
https://github.com/google-gemini/gemini-cli/issues/22745
跟踪以 AST 精确定位方法边界、减少错位读取轮次与 token 噪声的可行性。与 #22746、#22747 构成一组三连研究，代表官方在**上下文效率**上的系统性投入。

**6. #24246 [P2] 工具数超过 128 个时触发 400 错误**
https://github.com/google-gemini/gemini-cli/issues/24246
工具集膨胀直接撞上 API 上限，用户期望"agent 更聪明地裁剪已启用工具范围"。这是**扩展生态发展到一定规模后必然遇到的天花板**，需要工具筛选/优先级机制。

**7. #21983 [P1] Browser 子代理在 Wayland 下失败**
https://github.com/google-gemini/gemini-cli/issues/21983
输出 `Termination Reason: GOAL` 但实际失败，Linux 桌面（Wayland）用户受阻。与 #22323 呼应，反映**终止原因语义不可靠**是系统性问题。

**8. #22672 [P2] Agent 应阻止/劝阻破坏性行为**
https://github.com/google-gemini/gemini-cli/issues/22672
模型在复杂 git 操作中偶发使用 `git reset`、`--force` 等危险命令，数据库等资源维护场景同样存在风险。**安全护栏需求**，来自维护者 @abhipatel12。

**9. #22741 [P3] 允许本地子代理后台化（Ctrl+B）**
https://github.com/google-gemini/gemini-cli/issues/22741
探索、构建、lint 等非阻塞任务应可挂后台运行。2 个 👍、零反对，是**交互体验类需求中呼声最一致的一条**。

**10. #19561 [P3] "Tactful Extraction"——token 精简的外科式读取**
https://github.com/google-gemini/gemini-cli/issues/19561
当前每轮基线约 36.6k token，大文件读取常造成 +15k/轮 的上下文洪泛。提案建立 `grep_search` 优先的分层代码发现体系。代表了社区对**上下文成本**的持续焦虑。

> 补充观察：#22465（Vite 交互式提示卡死）、#20079（symlink agent 不被识别）、#22267（Browser Agent 忽略 settings.json）同样属于"配置/交互不按预期工作"类别，值得一并关注。

---

## 四、重要 PR 进展（Top 10）

**1. #29728 [P1] 修复快速双击 Ctrl+C 导致的会话污染**
https://github.com/google-gemini/gemini-cli/pull/29728
此前 `cancelOngoingRequest?.()` 是「即发即忘」的游离调用，第二次 Ctrl+C 会在取消完成前抢先触发 `/quit`，造成会话状态损坏。改为可等待的取消流程。

**2. #29725 [P2] 终端同步输出 + 隔离 spinner 渲染**
https://github.com/google-gemini/gemini-cli/pull/29725
为交互式 UI 帧写入包裹 terminal synchronized output，并隔离 spinner 状态，消除 **tmux 等终端复用器下的闪烁**。size/xl 大改动。

**3. #29644 [P1] 恢复终端宽度变化时的防抖静态刷新**
https://github.com/google-gemini/gemini-cli/pull/29644
为 `AppContainer.tsx` 的 `terminalWidth` 变更恢复 100ms 防抖 `refreshStatic()`，修复横向 resize 后显示错乱。

**4. #29568 [P1, 已关闭] ChatRecordingService 改为追加式增量补丁 + 有界历史窗口**
https://github.com/google-gemini/gemini-cli/pull/29568
用 append-only delta 替代全量 `{ $set: { messages } }` 重写，并限制内存中的消息保留量。对**长会话性能与内存占用**影响显著，虽已关闭但方向值得跟进。

**5. #29611 [P2] 支持带点号的 Gemini 3 模型与别名的多模态函数响应**
https://github.com/google-gemini/gemini-cli/pull/29611
修复 `gemini-3.8-flash` 等带点版本号下，`read_file` 读取的图片被当作非法 sibling parts 发出、导致 HTTP 错误的问题。**新模型适配**经典案例。

**6. #29726 沙箱：解析命令名时忽略 trap 包装层**
https://github.com/google-gemini/gemini-cli/pull/29726
POSIX 平台上 `wrapCommandForBackgroundPIDs` 包装后的命令被误识别为 `trap`，导致 `sandbox.toml` 的 per-command 规则**从未生效**。安全规则静默失效类 bug，优先级被低估。

**7. #29718 [P2] rootless Podman 沙箱增加 `--userns=keep-id`**
https://github.com/google-gemini/gemini-cli/pull/29718
解决非 root 用户下容器用户命名空间未映射调用者 UID 导致的 `EACCES`，仅在命令为 `podman` 时追加该参数。

**8. #29722 空白字符-only 的 UTF-16/UTF-32 文件应视为空**
https://github.com/google-gemini/gemini-cli/pull/29722
`isEmpty()` 剥离 BOM 后一律按 UTF-8 解码，导致 UTF-16/32 中的空白字符残留 NUL、`trim()` 无法清除，文件被误判非空。**编码处理类基础修复**。

**9. #29727 上报被忽略的目录条目**
https://github.com/google-gemini/gemini-cli/pull/29727
`list_directory` 此前在条目被路径校验拒绝时**静默返回零条**，模型与用户都看不到失败原因，易导致错误推断。

**10. #29719 安全机制修复：确认后重置已修改构建文件 + 文件名去重**
https://github.com/google-gemini/gemini-cli/pull/29719
修复 `sessionModifiedBuildFiles` 两项问题：用户批准执行后未清空追踪，导致后续每次构建都重复告警；以及文件名未去重。

> 另值得注意：#8154（P0 级 `/settings` 命令用明文覆盖 `$API_KEY` 并删除注释的安全漏洞）在长期搁置后于今日关闭，建议核对最终修复方式。

---

## 五、功能需求趋势

综合今日 49 条 Issue 更新，社区关注方向高度集中：

| 方向 | 代表 Issue | 说明 |
|---|---|---|
| **Agent/Subagent 可靠性** | #22323, #21409, #21983, #22267 | 挂起、状态误报、配置不生效，是当前最大痛点池 |
| **沙箱与安全护栏** | #19873, #22672, #22746 | 既要释放 bash 原生能力，又要防破坏性命令 |
| **上下文/token 效率** | #22745, #19561, #18836 | AST 感知工具、外科式读取、持久化任务跟踪替代 WriteToDo |
| **工具生态规模化** | #24246, #21968 | 工具数上限、skills/subagent 自动调用意愿低 |
| **可观测性与可分享性** | #22598, #21763 | 子代理轨迹需经 `/chat share` 暴露，bug report 需含子代理上下文 |
| **交互体验** | #22741, #21924, #21432 | 子代理后台化、resize 无闪烁、Agent 自我认知 |
| **多代理协作（前瞻）** | #18287 | 共享内存 / 并行子代理，当前 blocked |

可以看到，**IDE 集成类需求今天基本缺位**，重心已明显从"接入更多入口"转向"把已有的 Agent 架构做稳、做省、做安全"。

---

## 六、开发者关注点

1. **状态语义不可信是最伤信任的一类问题。** #22323 与 #21983 同源：失败被报成 `GOAL/success`。开发者无法依赖程序化返回值做编排判断，只能人工核查，自动化价值大打折扣。

2. **挂起无超时、无自救。** #21409 的 generalist agent 可挂一小时，靠用户手动禁用子代理绕过——缺少超时与健康检查机制。

3. **配置被静默忽略。** `settings.json` 覆盖无效（#22267）、symlink agent 不被识别（#20079）、`sandbox.toml` per-command 规则因 trap 包装而失效（#29726）。这类问题排查成本极高，因为既不报错也不生效。

4. **环境与启动顺序竞态。** #29678 显示 settings 中的环境变量占位符在 `.env` 加载前就被展开校验——典型的初始化顺序缺陷。

5. **中断与竞态处理薄弱。** Ctrl+C 相关的三个 PR（#29728、#29644、#29586）同日更新，说明终端输入路径的异步取消逻辑长期缺乏系统性梳理。

6. **token 成本焦虑持续。#19561 给出 36.6k/轮 基线与 +15k/轮 的洪泛数据，配合 AST 三连研究，说明"省上下文"已是官方与社区的共识议题。

7. **跨平台覆盖仍有盲区：** Wayland（#21983）、rootless Podman（#29718）、UTF-16/32 文件（#29722）、宽字符/Unicode（#29699）——细节兼容性正在成为下一阶段质量护城河。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报（2026-10-13）

## 今日速览
- Reasonix Studio v2.37.0 与 CLI v2.37.0 发布，新增常用服务预设库、主题包删除，并修复严格网关回放 HTTP 400、外壳探测卡内核等问题。
- 社区反馈集中在 UI/UX 信息架构、会话置顶/重复、MCP 授权与动态刷新、Windows 插件更新失败、长对话性能等方向。
- PR 侧重点包括 MCP 工具名长度限制、MCP 目录动态刷新、代理验证逻辑修复、会话置顶修复以及 Windows 插件发布流程改进。

## 版本发布
### studio-v2.37.0 / CLI v2.37.0
- **新增**
  - 添加模型服务时可从内核维护的常用预设开始：支持搜索、按域名分组，选中后整条预设（模型目录、识图模型、窗口、思考档）原样写入，名称重复由内核判断 (#12645)
  - 外观里可删除已安装主题包，需两次确认，内置主题无删除入口 (#12623)
- **变更**
  - 删除模型服务时会说明哪些角色改用了其他服务、哪些被清空，并从 `provider_access` 中去掉该服务 (#12589)
  - 带密钥的供应商请求（聊天、探测、余额、决策协议）相关变更描述在数据中截断
- **修复**
  - 严格网关回放无参数工具调用时的 HTTP 400
  - 卡住的外壳探测拖住内核
- 链接：https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.37.0

## 社区热点 Issues
1. **[#11734](https://github.com/esengine/DeepSeek-Reasonix/issues/11734) [CLOSED] Windows 更新已启用插件必然失败：rename staging 目录 Access is denied**  
   插件生态关键 bug，影响 Windows 用户更新插件。6 条评论，社区验证充分，已关闭。

2. **[#12820](https://github.com/esengine/DeepSeek-Reasonix/issues/12820) [CLOSED] 更新后出现重复工作会话**  
   v1.39.8 升级后会话列表从 13 条逻辑会话变为重复。涉及状态迁移与数据一致性，2 条评论。

3. **[#12834](https://github.com/esengine/DeepSeek-Reasonix/issues/12834) [OPEN] 界面选择文本时卡死，对话越长越明显**  
   长对话核心体验性能问题，前端资源体积大，随对话长度加剧。1 条评论，需前端渲染优化。

4. **[#12823](https://github.com/esengine/DeepSeek-Reasonix/issues/12823) [OPEN] MCP 工具有调整后显示禁用且无授权调整入口**  
   MCP 授权流程缺失，工具调整后无法重新授权，直接阻碍 MCP 工具使用。1 条评论。

5. **[#12827](https://github.com/esengine/DeepSeek-Reasonix/issues/12827) [OPEN] 切换远程端服务器后看不到配置的模型，只有默认 DeepSeek**  
   远程服务器模型配置同步问题，影响多端工作流。1 条评论。

6. **[#12840](https://github.com/esengine/DeepSeek-Reasonix/issues/12840) [OPEN] 侧边栏会话置顶无效；图标栏不显示时左上角留空白**  
   基础交互失效与布局细节问题。1 条评论，已有对应 PR #12845 修复置顶。

7. **[#12296](https://github.com/esengine/DeepSeek-Reasonix/issues/12296) [OPEN] 建议会话结束主动清理中间产物和临时文件**  
   资源管理需求，用户希望 agent 自主清理，减少磁盘垃圾堆积。1 条评论。

8. **[#12828](https://github.com/esengine/DeepSeek-Reasonix/issues/12828) [OPEN] 信息架构与组织建议：设置入口过多、状态栏与对话框信息重复、终端/浏览器不适合右侧**  
   长文 UI/UX 反馈，指出新设计语言不错但信息架构混乱，代表重度用户对界面组织的集中意见。

9. **[#12833](https://github.com/esengine/DeepSeek-Reasonix/issues/12833) [OPEN] 对话时右侧黑色栏目关不掉**  
   UI 遮挡问题，影响对话区域可用性。0 条评论，但属于直观体验缺陷。

10. **[#12838](https://github.com/esengine/DeepSeek-Reasonix/issues/12838) [OPEN] 左侧空白区域看着别扭**  
    UI 布局细节反馈，来自 Studio 内测用户，反映界面空间利用问题。

## 重要 PR 进展
1. **[#12849](https://github.com/esengine/DeepSeek-Reasonix/pull/12849) [OPEN] fix(mcp): 将模型可见工具名限制在供应商 128 字符内**  
   避免 `mcp__<server>__<tool>` 超长导致 Anthropic 等供应商拒绝整个请求。

2. **[#12138](https://github.com/esengine/DeepSeek-Reasonix/pull/12138) [OPEN] feat(plugin): 收到 tools/list_changed 后刷新 MCP 工具目录**  
   让 Studio 支持运行期 MCP 工具增删，解决工具目录停留在首次 `tools/list` 的问题。

3. **[#12848](https://github.com/esengine/DeepSeek-Reasonix/pull/12848) [CLOSED] fix(readiness): 未识别命令仅在未写入时清除待验证**  
   修复代理收尾验证被错误跳过，要求写入后每条未识别命令都未改动工作区才豁免。

4. **[#12845](https://github.com/esengine/DeepSeek-Reasonix/pull/12845) [CLOSED] fix(studio): 项目列表优先展示并标记置顶会话**  
   修复 #12840 第一点“会话置顶无效”，让置顶在完整列表中真实排序并标记。

5. **[#11822](https://github.com/esengine/DeepSeek-Reasonix/pull/11822) [CLOSED] fix(plugins): Windows 上发布替换插件目录不再重命名被监视树**  
   解决 Windows 插件更新失败问题，避免目录监视阻止替换。

6. **[#12843](https://github.com/esengine/DeepSeek-Reasonix/pull/12843) [CLOSED] fix(memory): 在轨迹中保留召回省略原因**  
   区分命中上限与字符预算导致的召回省略，提升记忆召回审计可解释性。

7. **[#12837](https://github.com/esengine/DeepSeek-Reasonix/pull/12837) [CLOSED] feat(studio): 增加共享发送快捷键偏好**  
   支持 Enter 或 Ctrl/Cmd+Enter 发送，应用于输入框、队列编辑和重发消息。

8. **[#12836](https://github.com/esengine/DeepSeek-Reasonix/pull/12836) [CLOSED] feat(studio): 从上下文菜单引用选中回复文本**  
   关闭 #12165，支持仅引用选中部分，并提供键盘访问路径。

9. **[#12841](https://github.com/esengine/DeepSeek-Reasonix/pull/12841) [CLOSED] fix(studio): 会话标签改为可选**  
   保留侧边栏默认切换器，新增“显示会话标签”开关，满足多面板用户需求。

10. **[#11978](https://github.com/esengine/DeepSeek-Reasonix/pull/11978) [CLOSED] feat(studio): 侧边栏会话每 10 条分页**  
    每个本地项目默认显示 10 条会话，点击“显示更多”再加载 10 条，改善长列表性能与可读性。

## 功能需求趋势
- **UI/UX 与信息架构**：左侧空白、右侧黑栏关不掉、设置入口分散、状态栏与对话框信息重复、终端/浏览器面板布局不合理。用户希望简化设置入口、整合状态信息、优化右侧空间。
- **会话管理**：置顶、重复会话、分页、标签可选、引用选中文本。基础会话操作的真实生效和列表性能是重点。
- **MCP/插件生态**：MCP 授权入口、工具目录动态刷新、工具名长度限制、Windows 插件更新。MCP 集成进入深水区，稳定性和可管理性需求上升。
- **远程/多端与模型服务**：远程服务器模型同步、常用服务预设、删除服务时角色说明、批量检查模型。多环境配置管理成为高频场景。
- **性能与资源**：长对话选择文本卡死、会话结束清理中间产物。前端渲染性能和磁盘垃圾清理受关注。
- **主题与个性化**：主题包删除、壁纸文字发光可配置、发送快捷键偏好。个性化配置需求持续增长。
- **代理与记忆**：验证逻辑、召回审计原因。开发者关注代理行为可解释性和测试稳定性。

## 开发者关注点
- **Windows 平台稳定性**：插件更新失败、会话重复、UI 卡顿在 Windows 上集中出现，需优先处理平台差异。
- **MCP 工具治理**：授权入口缺失、动态目录刷新、工具名长度限制，说明 MCP 工具链需要更完整的生命周期管理。
- **远程服务器配置同步**：切换远程端后模型不可见，影响多端协作与部署工作流。
- **长对话性能**：选择文本卡死随对话长度加剧，前端渲染需针对性优化。
- **临时文件与中间产物清理**：用户希望 agent 自主清理，减少磁盘垃圾，提升长期使用体验。
- **UI 信息架构**：设置入口过多、状态信息重复、右侧面板占用屏幕空间，需要重新组织界面层次。
- **基础交互可靠性**：会话置顶、标签、引用选中文本等细节功能需确保真实生效。
- **可配置性与可解释性**：主题、快捷键、记忆召回原因、代理验证证据等都需要更透明的配置和审计。

---
数据来源：github.com/esengine/DeepSeek-Reasonix

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 · 2026-10-13

## 1. 今日速览

今日无新版本发布，但社区讨论热度集中在**认证与网络传输可靠性**：ChatGPT OAuth 上下文上限被错误覆盖（#47646）和 token sharing 返回 401（#54950）持续发酵；同时针对 ~1 MiB 大请求体触发 503 的根因已被定位，相关 zstd 压缩方案已合并进编码设置（#54932、#54570）。PR 侧最引人注目的是 **GenUI（生成式 UI）能力**（#54747）以及一批由 @Nowaker 提交的 TUI 侧边栏/状态可视化增强。

---

## 2. 版本发布

过去 24 小时无新 Release。

---

## 3. 社区热点 Issues（10 条）

**1. #47646 [OPEN] ChatGPT OAuth 下长上下文模型被强制报告 400k tokens**
11 条评论、3 👍，是当日最热 Issue。OpenCode 在使用 ChatGPT OAuth 连接时会覆盖 OpenAI 模型的有效上下文上限为 400,000 tokens，而目录中实际约为 1.05M，导致 TUI 严重高估已用上下文。涉及成本与 compaction 判断的正确性，属于影响面较大的数据准确性缺陷。
https://github.com/anomalyco/opencode/issues/47646

**2. #54950 [OPEN] ChatGPT token sharing 返回 401 INVALID_API_KEY**
同一 access token 在 OpenCode 外调用 `POST /v1/responses` 正常，但在 `chatgpt-token-sharing` 登录方式下请求 `openai/gpt-6.1-sol` 全部失败。Windows + 2.0.26/2.0.27 环境复现，8 条评论，说明这是新登录路径的集成缺陷。
https://github.com/anomalyco/opencode/issues/54950

**3. #50650 [OPEN] Desktop 自定义 provider 保存必定失败**
4 👍、8 条评论。Settings → Providers 中的 "Custom OpenAI-compatible provider" 表单保存时无条件抛出 `provider.custom.unavailable`，连官方自带的本地 server 也无法保存，功能形同虚设。
https://github.com/anomalyco/opencode/issues/50650

**4. #54664 [CLOSED] OpenAI 网关对 >1 MiB 未压缩请求体返回 503**
由 #52269 延续而来，问题根因被明确定位为未压缩大请求体。该 Issue 直接催生了 #54570（zstd 压缩）与 #54932（编码设置）两个 PR，是今日技术链条上最关键的一环。
https://github.com/anomalyco/opencode/issues/54664

**5. #54974 [OPEN] [reproduced] TUI 在约 5 分钟丢弃长时间挂起的插件命令请求**
Bun fetch 存在超时上限，客户端放弃 `POST /api/session/:sessionID/command`，但服务端 `execute` 仍在孤儿式运行。对长耗时插件/工具是明确的架构级隐患，已被标记 reproduced。
https://github.com/anomalyco/opencode/issues/54974

**6. #54973 [OPEN] 单个畸形模型字段导致整个 provider 被静默丢弃**
V2 配置中某个 model 字段非法，会导致该 provider 下所有模型消失，绑定的 agent 无法解析，而用户只能从服务端日志看到一行 WARN。配置容错策略值得重新设计。
https://github.com/anomalyco/opencode/issues/54973

**7. #54917 [OPEN] [reproduced] 关闭标题自动生成配置不生效**
无论是模型级 `skip-title`、`agent.title.disabled` 还是 `small_model` 均无效，标题仍使用请求所用模型生成。涉及额外的 token 消耗与隐私预期，已复现。
https://github.com/anomalyco/opencode/issues/54917

**8. #54972 [OPEN] compact 丢失决策推导路径，建议 `/compact --with-derivation`**
当前 `/compact` 只保留终态摘要，丢弃了推理与否定性知识（"试过但不行"），导致重复调试。这是关于上下文压缩质量的前瞻性需求，2 条评论已展开讨论。
https://github.com/anomalyco/opencode/issues/54972

**9. #52345 [OPEN] iPadOS 16 / Safari 16 上 Web UI 完全不可用**
`URL.canParse` 未实现导致打开会话即抛 TypeError。这类设备已无法升级系统，属于长期兼容性负债，也提示构建目标的 browser target 需要下调。
https://github.com/anomalyco/opencode/issues/52345

**10. #54967 [OPEN] 所有读写与编辑都通过终端 + Python 完成**
用户反馈更新后模型（Big Pickle）不再使用原生文件工具，而是绕道 terminal 和 python。若属回归，会显著影响 diff 展示、权限控制与 ACP 集成体验，已进入 triage。
https://github.com/anomalyco/opencode/issues/54967

> 其他值得留意：#49554（winget 官方包，4 👍）、#44664（安装器拒绝 windows-arm64 但实际已发布该二进制，已关闭）、#54957（按语言着色插件/MCP 输出）、#52778（生态文档补充 Pushary 集成）、#54956（项目级 Rules/Instructions 配置）。

---

## 4. 重要 PR 进展（10 条）

**1. #54747 [OPEN] feat(app): 为 GUI 引入生成式 UI（GenUI）**
Agent 可通过 `genui_render` 调用在时间线中渲染交互式 UI，应用侧使用 OpenCode 自有组件实时绘制，并回传渲染结果让 Agent 感知。这是今日功能量级最大的 PR，可能改变会话交互形态。
https://github.com/anomalyco/opencode/pull/54747

**2. #54932 [CLOSED] feat(core): 新增请求体编码设置（zstd / gzip / none）**
修复 #54664，可在 provider、model 或变量级别配置压缩。基于 #54570 的诊断与实现，原始诊断者被列为 co-author，是解决大请求 503 的最终方案。
https://github.com/anomalyco/opencode/pull/54932

**3. #54570 [CLOSED] fix(core): 对 Codex 与 Responses API 请求做 zstd 压缩**
由 @esafak 提出并定位 ~1 MiB 上限问题，直接关闭 #54664 与 #52269，是编码设置 PR 的前置基础。
https://github.com/anomalyco/opencode/pull/54570

**4. #54976 [OPEN] fix(core): 让 Code Mode 的 fetch 受 webfetch 权限约束**
`"webfetch": "deny"` 此前对 Code Mode 注入的全局 `fetch` 无效，属权限绕过问题，修复后安全策略才能一致生效。
https://github.com/anomalyco/opencode/pull/54976

**5. #54979 [OPEN] fix(desktop): 按架构分别暂存内置 CLI**
x64 与 ARM64 NSIS 安装包共用安装目录与 `userData`，导致从 x64 切到 ARM64 后仍运行模拟的 x64 CLI。对 Windows ARM64 稳定性有直接收益。
https://github.com/anomalyco/opencode/pull/54979

**6. #54971 [CLOSED] feat(console): 提供 Windows ARM64 桌面版下载**
下载页此前只给 ARM64 用户 x64 安装包（走 Prism 模拟，崩溃记录最多），现已改为提供 `opencode-desktop-win-arm64.exe`，与 #44664 的安装器问题形成呼应。
https://github.com/anomalyco/opencode/pull/54971

**7. #54969 [CLOSED] feat(tui): 更新后展示 release highlights**
升级到新稳定版后，首页会一次性弹出 "What's new in X.Y.Z" 对话框，列出该版本亮点。改进版本感知与用户教育路径。
https://github.com/anomalyco/opencode/pull/54969

**8. #54966 / #54960 / #54965 [OPEN] TUI 侧边栏紧凑化三连**
由 @Nowaker 提交的一组配套 PR：`session.context` 将 Context 区块从四行压缩为紧凑显示；`session.mcp_summary` 提供按状态的 MCP 计数；`session.mcp_list` 用紧凑行替换重复的状态文本。整体方向是提升侧边栏信息密度与可定制性。
https://github.com/anomalyco/opencode/pull/54966 ｜ https://github.com/anomalyco/opencode/pull/54960 ｜ https://github.com/anomalyco/opencode/pull/54965

**9. #54975 [OPEN] fix(cli): 文件名破坏 patch header 时工具调用无法完成**
在 ACP 下，若文件名导致 patch header 解析失败，`withCompletedDiffs` 会中断整个工具调用的 diff 展示。属于特定但影响明显的边界修复。
https://github.com/anomalyco/opencode/pull/54975

**10. #54961 / #54963 [OPEN] TUI 交互状态与会话滚动修正**
`session.interrupt` 请求后立即显示中断进行中状态（#54961），以及新增 `session.keep_scroll_on_submit` 让发送 prompt 时保持阅读位置不被强制拉到底部（#54963），都是高频操作体验的针对性改进。
https://github.com/anomalyco/opencode/pull/54961 ｜ https://github.com/anomalyco/opencode/pull/54963

> 其他有价值改动：#54977（AnimatedNumber 无障碍读取顺序）、#54978（按阈值着色上下文用量与成本）、#51025（subagent picker 显示模型 token 成本与 shell 耗时）、#54802（插件 toast variant 越界钳制）、#54970（`opencode run` banner 使用模型显示名）、#54775（移动端时间线移除冗余的 agent/model 元信息）、#54641（Nix 构建禁用自更新器）。

---

## 5. 功能需求趋势

- **TUI 可定制化与信息可视化**：今日 PR 中占比最高的方向。侧边栏紧凑模式、MCP 状态计数、上下文与成本按阈值着色、subagent picker 显示 token 成本、中断状态提示、滚动位置保持——社区希望 TUI 从"能看"走向"可裁剪、可配置"。
- **上下文管理质量**：#54972 提出保留推导路径的 `/compact`，#54648 指出 compaction 在末条用户消息极早时仍逐字保留整段长对话。上下文压缩正从"压得下"转向"压得对"。
- **传输与网关健壮性**：~1 MiB 请求体 503、zstd/gzip 编码设置、Bun fetch 5 分钟超时导致插件命令请求被丢弃——大负载与长耗时场景的可靠性成为新的焦点。
- **平台与发行覆盖**：Windows ARM64（安装器 #44664、桌面下载 #54971、CLI 分架构暂存 #54979）、winget 官方包（#49554）、Nix 自更新器（#54641）、iPadOS 16/Safari 16 兼容（#52345）构成一条清晰的多平台补全线索。
- **认证与 Provider 集成**：ChatGPT OAuth 上下文覆盖、token sharing 401、自定义 provider 无法保存、Poe 模型列表陈旧、V2 配置中单个畸形 model 拖垮整个 provider——provider 层的正确性与容错是持续痛点。
- **可扩展性输出体验**：#54957 希望插件/MCP 返回的 JSON 按语言着色，#52778 希望生态文档收录第三方集成，反映社区对插件生态"可见性 + 可用性"的双重诉求。
- **项目级配置**：#54956 请求在项目属性中提供 Project Rules / Instructions，与标题生成开关、权限规则等一起指向"按项目差异化配置"的期望。

---

## 6. 开发者关注点

1. **模型元数据不可信**：上下文上限被 OAuth 路径覆盖（#47646）、模型列表陈旧（#54891）、provider 因单字段畸形整体消失（#54973）——三者叠加会让用户对"OpenCode 显示的模型能力"失去信任，建议统一元数据的来源与校验策略。
2. **认证路径的行为不一致**：同一 token 在 OpenCode 内外表现不同（#54950），是集成层最典型的可复现性问题。
3. **配置项被静默忽略**：`skip-title`、`agent.title.disabled` 等多种写法均无效（#54917），配置验证缺乏显式报错，用户只能靠试错。
4. **长耗时操作的边界处理**：5 分钟客户端超时导致服务端孤儿执行（#54974），以及大请求体 503（#54664），都指向传输层缺少统一的重试/压缩/续传约定。
5. **升级与迁移的数据安全**：V1 → V2 迁移后 94 条历史会话被挂到合成 `global` 项目并从列表隐藏（#54640），虽然已关闭，但升级路径的数据可见性仍是高风险区域。
6. **旧设备与旧系统的持续支持**：iPadOS 16 上的 Web UI 完全不可用（#52345）说明 browser target 设定需与用户实际设备范围对齐。
7. **工具调用路径的可预期性**：模型绕道 terminal + Python 编辑文件（#54967）若确认为回归，会同时影响 diff 呈现、权限审计与 ACP 集成，需要优先澄清。

---

*本日报基于 github.com/anomalyco/opencode 在 2026-10-13 前 24 小时的数据生成。*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报（2026-10-13）

> 数据来源：github.com/NousResearch/hermes-agent  
> 统计窗口：过去 24 小时 Releases / Issues / PRs 更新

## 1. 今日速览

v0.21.7 以 Patch release 形式发布，汇总了 v0.21.6 以来约 204 个 PR，覆盖桌面端、Microsoft Store/MSIX、安装器、Docker 与 Hermes Cloud。过去 24 小时 Issue 更新集中在本地工具竞态、Web 后端自动检测错误和更新/插件兼容性；PR 侧则大量围绕 Kanban、插件管理、SSE、MCP 认证和多代理视觉路由展开修复与增强。

## 2. 版本发布

### v0.21.7

- **发布日期**：2026-10-11
- **类型**：Patch release
- **内容**：将 v0.21.6 以来约 204 个 PR 汇总为稳定版本，面向桌面应用（macOS Apple silicon、Windows）、Microsoft Store 和 MSIX、安装器、Docker 以及 Hermes Cloud。
- **链接**：https://github.com/NousResearch/hermes-agent/releases/tag/v0.21.7

## 3. 社区热点 Issues

> 注：过去 24 小时内更新的 Issue 共 6 条，以下为全部条目，并按影响程度排序。

1. **#137476 [OPEN][P2] search_files 因 rg 退出竞态触发 ESRCH**
   - 作者 @peruvs。本地 POSIX 下间歇失败：`[Errno 3] No such process`，约 15 次/天，单文件或小搜索更常见。根因在 `_run_rg_native` 的 poll 与 process-group kill 之间 rg 已退出。相关修复 PR #137484。
   - 链接：https://github.com/NousResearch/hermes-agent/issues/137476

2. **#137475 [OPEN][P3] web autodetect 误选 openai-native，破坏 web_search/web_extract**
   - 作者 @peruvs。无 `web:` 配置且无 Web API key，但存在 Codex 凭据时，自动检测选择仅服务端的 `openai-native` 作为共享后端，直接导致 Web 工具不可用。相关修复 PR #137487。
   - 链接：https://github.com/NousResearch/hermes-agent/issues/137475

3. **#137483 [OPEN][P3] Hermes 更新后自动关闭 LCM 插件**
   - 作者 @avass。`hermes-lcm` 的 `pyproject.toml` 仅含 lint 配置，无 `[project]` 和 version；Hermes 0.21.5 后更新流程会生成只有 name 的 `[project]`，导致安装失败并禁用插件。相关修复 PR #137488。
   - 链接：https://github.com/NousResearch/hermes-agent/issues/137483

4. **#137491 [OPEN] 安装器 Node.js 验证失败：缺少 C++ symbols**
   - 作者 @saeed-mcu。官方安装器下载并解包 Node.js 成功，但执行 `node --version` 验证时失败，属于安装阻塞问题。当前无评论。
   - 链接：https://github.com/NousResearch/hermes-agent/issues/137491

5. **#137485 [CLOSED] 新本地 profile 是否应有默认 workspace？**
   - 作者 @javierkijano。原报告是 Desktop 退出重开后回到 `default`，并非新 profile 缺少 workspace；新 profile 已有 workspace。creation-time cwd policy 是独立变更，PR #137486 不修复重启选择症状。已关闭，1 条评论。
   - 链接：https://github.com/NousResearch/hermes-agent/issues/137485

6. **#137477 [OPEN][P3] 消息投递对屏幕阅读器不友好：markdown 和 emoji 被朗读**
   - 作者 @ateliernumerique37-tech。盲人用户使用 TalkBack/NVDA 阅读每日报告时，WhatsApp 等频道中的 markdown/emoji 被逐字朗读，属无障碍与消息格式问题。当前无评论。
   - 链接：https://github.com/NousResearch/hermes-agent/issues/137477

## 4. 重要 PR 进展

1. **#137484 fix(search): preserve rg process group across exit race**
   - 记录 rg spawn 后的进程组与启动时间基线，避免 rg 退出后被误判为 `ProcessLookupError`/ESRCH，直接回应 #137476。
   - 链接：https://github.com/NousResearch/hermes-agent/pull/137484

2. **#137487 fix(web): keep server-side-only providers out of client-side autodetect**
   - 阻止客户端 Web autodetect 选择仅服务端 provider，避免 Codex 凭据存在时破坏 `web_search`/`web_extract`。对应 #137475。
   - 链接：https://github.com/NousResearch/hermes-agent/pull/137487

3. **#137488 fix(pm): preserve lint-only plugin metadata during update**
   - 修复更新时对仅含 lint 配置的 `pyproject.toml` 生成不完整 workspace 成员的问题，避免插件被 uv 拒绝并禁用。对应 #137483。
   - 链接：https://github.com/NousResearch/hermes-agent/pull/137488

4. **#137490 fix(pm): PluginEviction removes plugin from enabled when disabling**
   - 修复插件驱逐时同时出现在 `enabled` 和 `disabled` 的矛盾状态，避免所有受影响 profile 静默禁用插件。
   - 链接：https://github.com/NousResearch/hermes-agent/pull/137490

5. **#137470 feat(delegation): children route images by their own model — delegation.image_input_mode**
   - 让委派子代理按自身模型路由图像，而不是继承主会话的 `auxiliary.vision` 全局 pin；新增 `delegation.image_input_mode`。对多模型、多代理视觉工作流重要。
   - 链接：https://github.com/NousResearch/hermes-agent/pull/137470

6. **#137429 feat(onboarding): first-run onboarding backend**
   - 首次运行 onboarding 后端，默认 profile 中以单次聊天完成，模型通过 `setup_beat` 工具驱动；目前为 Draft，等待设计确认。改善新用户首启体验。
   - 链接：https://github.com/NousResearch/hermes-agent/pull/137429

7. **#137460 fix(api): preserve session SSE events before terminal delivery**
   - 修复 `/api/sessions/{id}/chat/stream` 在 worker 早于 asyncio Future 完成时丢失 commentary、tool events 和 text deltas 的问题。流式 API 可靠性修复。
   - 链接：https://github.com/NousResearch/hermes-agent/pull/137460

8. **#136635 fix(mcp): keep auth-failure parks asleep until credentials change**
   - 修复 OAuth MCP 认证失败后 park 状态被意外唤醒的问题，保持休眠直到凭据变化。涉及认证边界与安全。
   - 链接：https://github.com/NousResearch/hermes-agent/pull/136635

9. **#105475 feat(groups): share gateway-owned rooms across Desktop and Telegram**
   - 让 gateway 拥有的 Group Chat 可从 Desktop 和私有 Telegram 群共享，Desktop 关闭时也可用；共享 canonical log、coordinator、成员会话、hold 和恢复状态。
   - 链接：https://github.com/NousResearch/hermes-agent/pull/105475

10. **#136750 feat(kanban): safely bind existing projectless tasks to projects**
   - 新增 `hermes kanban bind-project <task-id> --project <id-or-slug> [--json]`，用于安全修复已有但缺少 `project_id` 的 Kanban 任务，帮助项目感知代理恢复任务。
   - 链接：https://github.com/NousResearch/hermes-agent/pull/136750

## 5. 功能需求趋势

- **安装/更新与插件兼容**：更新后插件被禁用、pyproject 元数据处理、enabled/disabled 状态矛盾，是当前稳定性焦点。
- **本地工具可靠性**：`search_files`/ripgrep 进程生命周期、SSE 事件丢失、流式交付等底层稳定性问题受到关注。
- **Provider 路由与自动检测**：Web 后端、本地/自托管 provider 显示、OpenAI Codex 凭据与 server-side-only provider 的边界需要更清晰。
- **多代理与多模型**：委派子代理图像输入模式、辅助视觉后端隔离，说明复杂工作流需求上升。
- **跨端与群聊**：Desktop、Telegram、gateway 共享群房间与会话状态，是协作场景的重要方向。
- **无障碍与桌面体验**：屏幕阅读器友好输出、桌面拼写检查、右键菜单可访问性动作开始进入主线。
- **Kanban/任务编排**：项目绑定、born blocked 通知、自动心跳归属、PR completion contract 等持续完善。
- **插件扩展性**：`transform_session_title` 等插件钩子、插件生命周期管理需求增加。
- **Profile/workspace**：新 profile 默认工作区、Desktop 重启后 profile 选择与持久化策略仍有讨论。

## 6. 开发者关注点

- **高频可复现 bug 优先**：`search_files` ESRCH 每天约 15 次；Web autodetect 错误会直接让 `web_search`/`web_extract` 不可用。
- **更新路径兼容性风险**：lint-only pyproject、插件元数据、enabled/disabled 矛盾，容易在升级后静默破坏插件。
- **安装器阻塞**：Node.js 验证因缺少 C++ symbols 失败，是新装用户的首要障碍。
- **流式与会话状态**：SSE 事件可能丢失；MCP OAuth park 唤醒逻辑需更严格。
- **配置语义争议**：profile workspace 创建策略、Desktop 重启回 `default`、委派图像输入模式等需要明确决策。
- **无障碍需求上升**：消息投递需考虑屏幕阅读器，避免 markdown/emoji 被逐字朗读。
- **测试可信度**：桌面存储失败测试的 spy 未生效，存在“假覆盖”。
- **功能诉求持续增加**：Kanban、跨端群聊、onboarding、插件钩子等方向均有活跃 PR 和讨论。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报（2026-10-13）

## 1. 今日速览
- 版本线继续围绕“更新/升级恢复”推进：`v2026.10.5-beta.2` 处理陈旧 handoff lease、completed receipts 和旧恢复记录；`v2026.10.2` 修复从 2026.10.1 稳定版升级失败、回滚和 Windows/克隆文件系统路径问题。
- Issue 侧最值得警惕的是 P1 僵尸进程泄漏 #97616，以及新出现的 2026.9.9 升级失败 #170410。
- PR 侧重点集中在 Control UI Solid 迁移、插件会话上下文 fork、Gateway 状态 worker 化、模型 fallback 与工具调用跨 provider 兼容。

## 2. 版本发布
- **v2026.10.5-beta.2**  
  重点修复 `openclaw update` 的恢复流程：可清理 stale handoff leases、completed receipts、legacy 2026.9.8 recovery records，避免卡在 `update-recovery-pending`；同时保留 service heap limit、webhook listeners，并处理 Windows 相关更新路径。  
  链接：https://github.com/openclaw/openclaw/releases/tag/v2026.10.5-beta.2

- **v2026.10.2**  
  修复从稳定版 2026.10.1 首次升级无法完成的问题；就地更新不再以错误结束；Windows、cloned-filesystem、private-Node 更新路径不再停滞或回滚。  
  链接：https://github.com/openclaw/openclaw/releases/tag/v2026.10.2

## 3. 社区热点 Issues
> 过去24小时内仅 6 条 Issue 更新，以下为全部条目，未凑数填充。

1. **#97616 [OPEN] [P1] OpenClaw 泄漏未回收的 hook/tool 子进程，导致僵尸进程累积和运行时退化**  
   作者 @avp717，18 条评论，1 👍。这是回归问题，涉及 hook/tool 执行后 `openclaw-hooks`、`bash`、`codex` 等子进程未 reap，长期运行会累积僵尸进程并拖慢运行时。P1 + 长期未关闭，是当前稳定性风险最高的 Issue。  
   链接：https://github.com/openclaw/openclaw/issues/97616

2. **#170147 [OPEN] [P2] Agent 在工具已交付可见输出后，仍向源聊天发送额外回复**  
   作者 @obviyus，3 条评论。表现为消息工具向其他聊天发送内容后，源聊天仍收到额外回复，包括 “The tool run finished, but no final summary was produced.” 一类 fallback。属于高频 UX 摩擦，影响 agent 输出语义。  
   链接：https://github.com/openclaw/openclaw/issues/170147

3. **#160589 [CLOSED] [P2] Discord active thread-list 拒绝 channel-scoped allowlist**  
   作者 @PollyBot13，3 条评论。限制到单个频道的 Discord allowlist 无法列出该频道下的活跃线程，错误要求 wildcard allowlist。涉及权限模型、安全边界和产品决策，已关闭但值得关注后续结论。  
   链接：https://github.com/openclaw/openclaw/issues/160589

4. **#162717 [CLOSED] [P2] 图像生成：自定义 OpenAI 兼容 provider 需要支持 `response_format` 或 URL 响应解析**  
   作者 @lucthaobybgkw3232-eng，2 条评论。自定义 provider 返回 `url` 而非 `b64_json` 时报 “OpenAI image generation response malformed”。第三方 OpenAI 兼容生态兼容性问题，已关闭。  
   链接：https://github.com/openclaw/openclaw/issues/162717

5. **#170410 [OPEN] 更新失败：retired-state-format（2026.9.9）**  
   作者 @jinhuili-lab，0 条评论。用户从 2026.9.9 更新时遇到 retired-state-format 失败，平台 linux/x64，Node 24.19.0。与近期 release 的更新恢复主题高度相关，属于新出现的升级阻塞。  
   链接：https://github.com/openclaw/openclaw/issues/170410

6. **#170409 [OPEN] [Bug] 插件 Control UI 面板在 assets 被硬链接时不可用**  
   作者 @paulcam206，0 条评论。当插件构建资产为 hardlink（`nlink > 1`）时，Workboard 等 Control UI 面板显示无法加载资产。所有启用 `nix.settings.auto-optimise-store = true` 的 NixOS 主机都会触发，是平台兼容性痛点。  
   链接：https://github.com/openclaw/openclaw/issues/170409

## 4. 重要 PR 进展
1. **#168612 [OPEN] refactor(ui): 使用 Solid 渲染 app shell 和 retained routes**  
   作者 @steipete。将 Control UI 的 root、shell、sidebar、retained outlet 从 Lit 迁移到 Solid，同时保留 tags、CSS、路由、会话和草稿。Control UI 架构迁移的关键 PR。  
   链接：https://github.com/openclaw/openclaw/pull/168612

2. **#170146 [OPEN] feat(plugins): 为后台侧问题 fork 会话实时上下文**  
   作者 @obviyus。解决插件在后台审查/总结会话时只能看到有限 excerpt 的问题，允许 fork 会话 live context。XL 规模，标记安全边界、兼容风险，需补充证明。  
   链接：https://github.com/openclaw/openclaw/pull/170146

3. **#169539 [OPEN] [P1] fix: 解析 agent workspace 外的 plugin-discovered models**  
   作者 @ericcaiwx-star。修复用户在 agent workspace 外打开会话时，picker 中已列出的插件发现模型却显示 “This model was not found”。关闭 #169205，P1 级别。  
   链接：https://github.com/openclaw/openclaw/pull/169539

4. **#170141 [OPEN] feat: 上下文溢出恢复后使用模型 fallback**  
   作者 @steipete。请求经过压缩和超大工具结果恢复后，若仍超过主模型上下文窗口，将尝试配置的 fallback 模型，而不是直接失败。关闭 #9986，提升 agent 可靠性。  
   链接：https://github.com/openclaw/openclaw/pull/170141

5. **#169552 [OPEN] fix: Tool Search 跨 provider 使用统一 dispatcher 名称**  
   作者 @steipete。修复 Ollama parser 将通用 `tool_call` dispatcher 与 chat-template markers 混淆的问题，并避免 wire alias 引入第二名称干扰小模型。跨 provider 工具调用兼容性改进。  
   链接：https://github.com/openclaw/openclaw/pull/169552

6. **#169580 [OPEN] fix(state): 将 Gateway 状态消费者迁移到已有 workers**  
   作者 @steipete。Gateway 状态消费者此前通过 shared-state 和 SDK owner 同步访问 SQLite；该 PR 将 config/machine-state 操作迁移到 shared-state worker，profile policy 使用 catalog，减少同步阻塞。  
   链接：https://github.com/openclaw/openclaw/pull/169580

7. **#170020 [OPEN] [P1] fix(gateway): 睡眠导致 state ownership 过期后恢复**  
   作者 @jjjhenriksen。修复 Gateway 长时间睡眠后 ownership heartbeat 过期，仍在线却无法访问 state 的问题；授权恢复信号读取 stored restart intent 失败。P1，需补充证明。  
   链接：https://github.com/openclaw/openclaw/pull/170020

8. **#170336 [OPEN] fix: 原生应用会话在重启后恢复失败**  
   作者 @jjjhenriksen。修复认证原生应用会话在 Gateway 重启后，因 transcript input 无 provenance 或收到 steering 而被标记失败。关联 #170252、#170020。  
   链接：https://github.com/openclaw/openclaw/pull/170336

9. **#170407 [OPEN] perf(memory): 将已发布索引读取移出 writer FIFO**  
   作者 @steipete。已发布内存索引读取即使不能写也会占用 agent DB writer FIFO，延迟无关 session 工作。该 PR 减少 writer 占用，同时保留 private-shadow ordering 和 committed-read。  
   链接：https://github.com/openclaw/openclaw/pull/170407

10. **#170406 [OPEN] fix(cron): 为托管备份计划提供归档级执行预算**  
    作者 @wangmiao0668000666。`openclaw backup enable --to <location>` 生成的 managed cron job 没有执行预算，继承默认 10 分钟 deadline，导致整机归档容易超时。修复 #170241，提升备份可靠性。  
    链接：https://github.com/openclaw/openclaw/pull/170406

## 5. 功能需求趋势
- **更新/迁移与回滚可靠性**：release 连续修复升级路径，#170410 又报 retired-state-format 失败，#170020、#170336 处理 Gateway 重启/睡眠后的状态恢复。  
  链接：https://github.com/openclaw/openclaw/issues/170410 、 https://github.com/openclaw/openclaw/pull/170020
- **运行时稳定性与资源回收**：#97616 的僵尸进程泄漏是 P1 回归，说明 hook/tool 子进程生命周期管理是社区核心痛点。  
  链接：https://github.com/openclaw/openclaw/issues/97616
- **消息投递与 agent 输出语义**：#170147 反映工具已交付输出后源聊天仍收到额外回复，社区希望更清晰的 final summary/fallback 行为。  
  链接：https://github.com/openclaw/openclaw/issues/170147
- **第三方 provider 与模型兼容**：自定义 OpenAI 兼容图像生成 URL 解析 #162717、plugin-discovered models 解析 #169539、上下文溢出 fallback #170141、Tool Search 跨 provider 统一 #169552 都属于生态兼容方向。  
  链接：https://github.com/openclaw/openclaw/issues/162717 、 https://github.com/openclaw/openclaw/pull/169539
- **插件/Control UI 与平台兼容**：#170409 的 NixOS hardlink 问题、#168612 的 Solid 迁移、#170146 的插件上下文 fork，显示插件生态和 Control UI 正在快速演进，但平台边界仍需补齐。  
  链接：https://github.com/openclaw/openclaw/issues/170409 、 https://github.com/openclaw/openclaw/pull/168612
- **权限与安全边界**：#160589 的 Discord channel-scoped allowlist 与 #169580 的 Gateway state worker 化，都涉及权限模型和安全边界调整。  
  链接：https://github.com/openclaw/openclaw/issues/160589 、 https://github.com/openclaw/openclaw/pull/169580
- **性能与状态管理**：#169580、#170407、#170400、#170399 集中优化 SQLite 同步访问、writer FIFO 占用、后台投影和子代理 spawn，说明核心性能治理正在推进。  
  链接：https://github.com/openclaw/openclaw/pull/170407 、 https://github.com/openclaw/openclaw/pull/170400

## 6. 开发者关注点
- **升级路径仍然脆弱**：`retired-state-format`、`update-recovery-pending`、Windows/cloned-filesystem/private-Node 等路径反复出现，开发者希望 autoupdate 能“完成而不是回滚”。  
  链接：https://github.com/openclaw/openclaw/issues/170410
- **P1 稳定性问题优先级最高**：未 reap 的 hook/tool 子进程会导致僵尸累积和运行时退化，长期未关闭，会直接影响生产部署信心。  
  链接：https://github.com/openclaw/openclaw/issues/97616
- **工具调用与消息语义需要更确定**：工具已发送可见输出后，源聊天仍出现额外回复或 canned fallback，是典型 UX 摩擦。  
  链接：https://github.com/openclaw/openclaw/issues/170147
- **第三方 OpenAI 兼容 provider 适配不足**：图像生成返回 URL 而非 b64_json 即失败，说明 provider 响应解析需要更宽容或可配置。  
  链接：https://github.com/openclaw/openclaw/issues/162717
- **平台/包管理兼容性**：NixOS 的 hardlink 资产策略直接导致插件 Control UI 面板不可用，暴露了资产加载策略对真实部署环境覆盖不足。  
  链接：https://github.com/openclaw/openclaw/issues/170409
- **状态所有权与恢复机制**：Gateway sleep/restart 后的 state ownership、会话恢复、SQLite worker 化，是当前架构层高频关注点。  
  链接：https://github.com/openclaw/openclaw/pull/170020 、 https://github.com/openclaw/openclaw/pull/170336

:::
