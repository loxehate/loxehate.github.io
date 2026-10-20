---
title: "AI CLI 工具社区动态日报"
published: 2026-10-12
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-12

> 生成时间: 2026-10-12 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具横向对比分析报告（2026-10-12）

> 口径说明：以下“Issues/PR 数”优先采用各日报披露的过去 24 小时更新量；若日报仅列示热点 Top 10，则标记为“列示”，不代表仓库全量。PR 的 CLOSED 状态未区分“已合并/未合并关闭”。

## 1. 生态全景

AI CLI 工具正从“模型接入与代码生成”进入“生产级代理平台”竞争阶段，可靠性、权限安全、上下文成本和跨平台体验成为核心议题。官方三强 Claude Code、Codex、Gemini CLI 仍拥有最高社区声量，但 Windows、MCP、沙箱权限和静默失败等工程化短板密集暴露。开源/自托管阵营如 OpenCode、Reasonix、OpenClaw、Hermes 迭代速度更快，版本、迁移、更新恢复和安全审查成为高频战场。整体看，MCP/插件、子代理、TUI/IDE 集成已从差异化功能变成基础能力，但协议合规、状态一致性和可观测性仍远未成熟。

## 2. 各工具活跃度对比

| 工具 | Release | Issues（窗口内） | PR（窗口内） | 今日主要信号 |
|---|---:|---:|---:|---|
| Claude Code | 无 | 列示 10（热点） | 1 条更新 | MCP Issue 集中关闭；账户级设置同步 #22648 仍高热度（26 评论/48👍）；Windows 进程泄漏 |
| OpenAI Codex | 无 | 49 条更新 | 11 条，全部 CLOSED | `/undo` #9203 达 92 评论/477👍；Windows Dots/CUA、权限显示不一致问题突出 |
| Gemini CLI | 无 | 列示 10 | 10 条 | 企业 Workspace 认证 #29101 达 61 评论；Agent 假成功、挂起、Wayland 浏览器失败 |
| DeepSeek Reasonix | v2.36.0 / v2.35.0 | 列示 10 | 10 条 | 发布密集；白屏崩溃、存储迁移卡死、provider 密钥重定向、MCP trust |
| OpenCode | v1.19.0 | 列示 10 | 10 条 | V2 迁移问题爆发；文件索引陈旧、ChatGPT OAuth 误用、自动压缩失效 |
| Deepseek Harness | 无活动 | 0 | 0 | 过去 24 小时无活动 |
| Hermes | 无 | 8 条更新（全部列出） | 50 条更新，列示 10 | Windows PATH 污染、工具错误静默、kanban 停止提示失效、CLI 所有权重构 |
| OpenClaw | v2026.10.5-beta.1 | 8 条更新（全部列出） | 列示 10，未披露总数 | 更新恢复可靠性、Gateway 启动 60 秒、OOM、消息历史一致性 |

## 3. 共同关注的功能方向

1. **权限与沙箱一致性**
   - Codex：UI 显示 Full Access，实际以 `workspace-write` 执行；显式放行后仍被历史拒绝阻断。
   - Claude Code：MCP OAuth 不符合 RFC 9728，企业 Okta 等 IdP 集成失败。
   - Gemini CLI：需要零依赖 OS 沙箱、防止 `git reset --force` 等破坏性命令。
   - Reasonix：provider 请求重定向可能泄露密钥；引入 `write_lease` 控制跨会话写入。
   - Hermes/OpenClaw：危险命令模式覆盖不足，文件编辑需校验当前内容。

2. **MCP / 插件生态成熟度**
   - Claude Code：MCP schema 方言、可选参数、OAuth、连接器状态问题集中。
   - OpenCode：桌面端 MCP 设置和连接测试需求高赞；v2 插件文本转换 API 缺失。
   - Reasonix：MCP 工具定义批准后固定，变更需 `reasonix mcp trust`。
   - Gemini CLI：skills/sub-agents 不主动使用，扩展机制实际价值受限。

3. **Windows 与跨平台稳定性**
   - Claude Code：`claude.exe` 会话进程累积且不终止，RAM/磁盘高占用。
   - Codex：Dots/CUA 启动器失败、WSL 引导失败、剪贴板粘贴异常、配置非原子写。
   - Gemini CLI：Windows 子进程命令注入加固。
   - Reasonix/Hermes/OpenClaw：Windows 更新、通知、PATH 注册、权限提升、Store 提交键名等问题密集。

4. **上下文、成本与性能治理**
   - Claude Code：请求可配置 `compactModel`，避免 Opus/Fable 会话压缩成本失控。
   - OpenCode：自动压缩从未触发，导致 token/credit 失控；压缩保留策略边界错误。
   - Gemini CLI：AST-aware 读取/搜索、工具数量过多触发 400、历史/快照/转录线性化优化。
   - Codex：配额异常消耗与计费口径不一致，形成跨报告 Meta Issue。
   - OpenClaw：Gateway 启动慢、Gemini `textSignature` 膨胀导致会话失败。

5. **Agent 可靠性与可观测性**
   - Gemini CLI：子代理 MAX_TURNS 后仍报 GOAL success；generalist agent 永久挂起；Wayland 浏览器失败仍报成功。
   - Hermes：`execute_code` 吞工具错误；`write_file` 拒绝无日志；kanban 拒绝被误判为交接。
   - OpenCode：附件持久化失败成为未处理 rejection。
   - OpenClaw：失败 turn 无原因、更新阻塞原因晚报。
   - Codex/Claude：hooks 静默失效、routines 静默跳过触发窗口。

6. **更新、迁移与恢复可靠性**
   - Reasonix：Studio 2.36.0 无会话工作区白屏；存储迁移静默卡死；npm 升级后版本显示旧。
   - OpenCode：V1→V2 迁移后历史会话隐藏、配置失效、认证错乱。
   - OpenClaw：更新恢复被硬链接阻塞；`update repair` 空操作却退出 0。
   - Hermes：Store 提交读取 CLI PascalCase 键失败。
   - Claude Code：账户级设置跨设备同步长期缺失。

7. **TUI / IDE / 交互体验**
   - Codex：`/undo` 社区共识级需求；剪贴板、快捷键、文本选中复制、Vim 草稿恢复。
   - OpenCode：终端快捷键、RTL 文本、命令面板、附件渲染。
   - Reasonix：侧栏、滚动条热区、会话状态同步。
   - OpenClaw/Gemini：本地 TUI 模型可用性、IDE Companion、ACP `session/load` 合规。

8. **跨设备、远程与移动端**
   - Claude Code：Remote Control、桌面 routines 跨设备续跑。
   - Codex：远程 SSH 在 public-key + keyboard-interactive/PAM 下失败。
   - Reasonix：手机页面添加到主屏、WSL 发行版发现。
   - OpenClaw：companion app 连接后 OOM。

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|---|---|---|---|
| Claude Code | 桌面 routines、账户生态、MCP 连接器、Remote Control | 企业/专业开发者、Anthropic 生态用户 | 本地 `~/.claude/` + 桌面端 + MCP/远程控制 |
| OpenAI Codex | TUI、沙箱权限、Computer Use、Windows 自动化 | 终端重度用户、自动化团队 | TUI + app-server + hooks + sandbox + CUA |
| Gemini CLI | 企业 Workspace、子代理、IDE Companion、ACP、AST | Google 生态、企业、IDE 用户 | 多代理 + ACP + AST 感知 + 安全沙箱 |
| DeepSeek Reasonix | Studio + CLI、安全可控、多 provider、跨平台 | 本地/自托管、高阶开发者 | MCP trust + write lease + 安全审查 + WSL/移动 |
| OpenCode | 开源编码 Agent、多 provider、插件、V2 架构 | 开源社区、多模型用户 | V2 架构 + 插件 + SQLite + provider 适配 |
| Hermes | Agent 平台、gateway、skills、kanban、多集成 | 研究/自托管、多集成场景 | gateway + runtime + skills + 工具审批 |
| OpenClaw | 多频道 gateway、更新安全、Control UI | 自托管/运维、消息路由 | updater + gateway + Solid UI + channels |
| Deepseek Harness | 无活动 | — | — |

官方三强更偏向“模型厂商官方入口 + 企业/IDE 集成”，开源阵营更偏向“多模型、自托管、可插拔与快速迭代”。Codex 与 Claude Code 在 TUI/桌面自动化上最激进，Gemini CLI 在企业认证与子代理/IDE 协议上投入明显，Reasonix/Hermes/OpenClaw 则更像面向高阶用户的“可控代理基础设施”。

## 5. 社区热度与成熟度

- **高热度第一梯队：Codex、Claude Code、Gemini CLI。**  
  Codex `/undo` 达 477👍，Gemini 企业认证 #29101 达 61 评论，Claude 设置同步 #22648 达 48👍。用户规模大、反馈强度高，但平台缺陷和集成问题也最集中。

- **快速迭代第二梯队：OpenCode、Reasonix、OpenClaw、Hermes。**  
  OpenCode 发布 v1.19.0 后 V2 迁移问题爆发；Reasonix 24 小时内发布两个版本并集中修复安全/启动问题；OpenClaw 发布 beta 更新但更新恢复问题同步暴露；Hermes 有 50 条 PR 更新，处于 CLI 所有权重构期。迭代快，但稳定性风险高。

- **低活动：Deepseek Harness。**  
  过去 24 小时无活动，暂不具备横向对比热度。

成熟度判断：官方工具核心功能稳定，但 MCP、权限、Windows、更新迁移等外围工程仍不成熟；开源工具架构演进快，但版本迁移、数据安全和可观测性代价更明显。

## 6. 值得关注的趋势信号

1. **“可逆性”成为 Agent 信任底线。**  
   Codex `/undo` 477👍 是本期最强信号。开发者需要撤销误删、回滚未提交修改、审计 Agent 操作。选型时应优先关注回滚、版本校验和写入租约能力。

2. **权限模型必须 UI 与执行一致。**  
   Codex 显示 Full Access 实际降级、显式放行仍被历史拒绝阻断，说明权限优先级和持久化逻辑需要统一重构。企业部署前应验证沙箱、审批、OAuth 和审计链路。

3. **MCP 正在成为事实标准，但合规性不足。**  
   Claude 的 RFC 9728、draft-07 schema，OpenCode 的桌面 MCP 管理，Reasonix 的 MCP trust 都指向同一方向：MCP 生态需要更严格的协议兼容和信任模型。

4. **Windows 是 AI CLI 的明显短板。**  
   进程泄漏、CUA/Dots 启动失败、WSL、PATH 污染、剪贴板、命令注入横跨多个工具。若团队以 Windows 为主，短期应重点评估目标工具在该平台的闭环程度。

5. **上下文成本治理从“优化”变为“产品能力”。**  
   Claude `compactModel`、OpenCode 自动压缩、Gemini AST 读取、Codex 配额对账，均说明 token 成本透明与压缩策略可控是刚需。

6. **“静默失败”是排障效率杀手。**  
   hooks 被忽略、工具错误被吞、更新 repair 空操作返回 0、routines 无历史无错误。开发者应优先选择日志完整、状态可查、失败响亮的工具。

7. **更新与迁移可靠性决定生产可用性。**  
   Reasonix 迁移卡死、OpenCode V2 会话隐藏、OpenClaw 更新恢复阻塞，提示企业用户应 pin 版本、备份配置/会话库，并避免在关键节点自动跨大版本升级。

8. **多代理/子代理进入工程化阶段。**  
   社区不再满足于“能调用子代理”，而要求终止语义、轨迹可见、权限隔离、假成功检测。Gemini 的 MAX_TURNS 误报、generalist 挂起是典型反面案例。

9. **TUI/IDE 成为主界面，交互成熟度影响留存。**  
   Codex 的剪贴板/快捷键/Vim 恢复、OpenCode 的 RTL/终端快捷键、Gemini 的 ACP/IDE Companion，说明 CLI 工具正被当作主力开发环境来要求。

对技术决策者的建议：若重视企业认证与官方生态，优先评估 Claude Code、Codex、Gemini CLI 的权限、MCP、Windows 和审计能力；若重视多模型、自托管与可插拔，关注 OpenCode、Reasonix、Hermes、OpenClaw，但需接受更快的迭代节奏和更高的稳定性验证成本。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
数据截止：2026-10-12  
说明：PR 列表中的评论数字段缺失，以下“热门 Skills”按仓库返回顺序、关联 Issue 热度、更新活跃度与修复范围综合判断；所列 PR 均为 `OPEN`。

## 1. 热门 Skills 排行（PR）

1. **mcp-builder：兼容 MCP >= 2 的 streamable_http_client 与自定义 headers**  
   - PR：#1742 [OPEN]  
   - 功能：修复 `mcp>=2.0.0` 中 `streamablehttp_client` 更名为 `streamable_http_client`、自定义 HTTP headers 需通过 `create_mcp_http_client / http_client` 配置的问题。  
   - 热点：MCP 工具链向 v2 迁移的兼容性，关联 #1668。  
   - 链接：https://github.com/anthropics/skills/pull/1742

2. **skill-creator：隔离 trigger evals，处理 Windows 与运行时失败**  
   - PR：#1298 [OPEN]  
   - 功能：修复触发评估误报/无效分数、Windows 下子进程 `select()` 失败、运行时失败被误判为“未触发”等问题。  
   - 热点：Skill 评估可信度、跨平台稳定性。  
   - 链接：https://github.com/anthropics/skills/pull/1298

3. **proofcore-contract-auditor：智能合约审计与区块链存证**  
   - PR：#1771 [OPEN]  
   - 功能：为 Web3 开发者提供 Solidity / Rust 合约静态分析，并将审计证明锚定至 TON 区块链。  
   - 热点：Web3 安全审计、零存储 Merkle 证明、TON 生态。  
   - 链接：https://github.com/anthropics/skills/pull/1771

4. **检测 docx 孤立评论**  
   - PR：#1734 [OPEN]  
   - 功能：从标题看，用于检测 Word 文档中失去锚点的孤立评论。  
   - 热点：文档处理质量与批注清理，摘要未提供更多细节。  
   - 链接：https://github.com/anthropics/skills/pull/1734

5. **md2video-audio：Markdown 转视频与语音旁白**  
   - PR：#1703 [OPEN]  
   - 功能：将 Markdown 文档经 Marp 转为演示幻灯片，再编译为带拟真语音旁白的 MP4。  
   - 热点：零成本内容自动化、视频生成工作流。  
   - 链接：https://github.com/anthropics/skills/pull/1703

6. **Notion 规格到实现 + 量化简历审计**  
   - PR：#1245 [OPEN]  
   - 功能：一个 Skill 将产品/技术规格转成 Notion 任务与实施计划；另一个用于简历量化审计。  
   - 热点：工作流自动化、规格落地、招聘场景。  
   - 链接：https://github.com/anthropics/skills/pull/1245

7. **skill-creator：加固 eval viewer**  
   - PR：#1961 [OPEN]  
   - 功能：修复 eval viewer 的脚本突破、DNS rebinding、跨站 POST、转义不足等安全问题。  
   - 热点：Skill 开发工具自身安全、本地 HTTP 服务与 XSS 风险。  
   - 链接：https://github.com/anthropics/skills/pull/1961

8. **docx：LibreOffice 超时应报错并验证输出**  
   - PR：#1792 [OPEN]  
   - 功能：`accept_changes.py` 在 `soffice` 超时时返回错误，并检查输出 DOCX 是否仍含修订标记。  
   - 热点：文档转换可靠性、避免“假成功”。  
   - 链接：https://github.com/anthropics/skills/pull/1792

## 2. 社区需求趋势

- **安全与信任边界最受关注**  
  #492 有 44 条评论，指出社区 Skill 以 `anthropic/` 命名空间分发，可能冒充官方 Skill 并诱导用户授予高权限。  
  链接：https://github.com/anthropics/skills/issues/492

- **组织内 Skill 共享与分发**  
  #228 获 8 个 👍，希望 Claude.ai 支持组织级 Skill 库或直接分享链接，而不是手动下载 `.skill` 再上传。  
  链接：https://github.com/anthropics/skills/issues/228

- **Skill 评估与触发机制可靠性**  
  #556 指出 `run_eval.py` 中 `claude -p` 几乎 0% 触发 Skill；#1352 指出并行 worker 会错配 UUID；#1383、#1390 继续暴露 benchmark 与 MCP 评估失败。  
  链接：  
  https://github.com/anthropics/skills/issues/556  
  https://github.com/anthropics/skills/issues/1352  
  https://github.com/anthropics/skills/issues/1383  
  https://github.com/anthropics/skills/issues/1390

- **上下文窗口占用与重复 Skill**  
  #1487 报告 `claude-api` Skill 单次工具调用注入约 156k tokens；#189 报告 `document-skills` 与 `example-skills` 安装内容重复，获 9 个 👍。  
  链接：  
  https://github.com/anthropics/skills/issues/1487  
  https://github.com/anthropics/skills/issues/189

- **新 Skill 方向集中在自动化与专业场景**  
  社区提案包括：compact-memory、agent-governance、reasoning quality gate、AWT E2E 测试、document-typography、ODT、SCNet HPC、Web3 合约审计、Markdown 转视频、Notion 规格到实现等。  
  链接示例：  
  https://github.com/anthropics/skills/issues/1329  
  https://github.com/anthropics/skills/issues/412  
  https://github.com/anthropics/skills/issues/1385  
  https://github.com/anthropics/skills/pull/822

- **基础工具链质量修复需求强烈**  
  大量 PR 集中在 `skill-creator`、`mcp-builder`、`docx`、`webapp-testing`、`algorithmic-art`，涉及 Windows 支持、超时处理、XSS、命令注入、评估误判等。  
  链接示例：  
  https://github.com/anthropics/skills/pull/1980  
  https://github.com/anthropics/skills/pull/1977  
  https://github.com/anthropics/skills/pull/1976

## 3. 高潜力待合并 Skills

以下 PR 更新较近、修复目标明确，且多与高热度 Issue 或安全/兼容性问题相关，近期落地概率较高：

1. **#1961 skill-creator eval viewer 安全加固**  
   更新于 2026-10-11，安全优先级高。  
   https://github.com/anthropics/skills/pull/1961

2. **#1742 mcp-builder 兼容 MCP >= 2**  
   更新于 2026-10-08，直接修复 #1668，影响 MCP 工具链可用性。  
   https://github.com/anthropics/skills/pull/1742

3. **#1681 skill-creator 支持直接执行 package_skill.py**  
   更新于 2026-10-08，修复 `ModuleNotFoundError` 和过时路径。  
   https://github.com/anthropics/skills/pull/1681

4. **#1980 webapp-testing 避免 shell=True**  
   更新于 2026-10-06，修复 CWE-78 命令注入风险。  
   https://github.com/anthropics/skills/pull/1980

5. **#1977 algorithmic-art：wrapAround() 正确环绕**  
   更新于 2026-10-07，修复 #1897，改动小且明确。  
   https://github.com/anthropics/skills/pull/1977

6. **#1976 webapp-testing：正确报告 textarea 与 select**  
   更新于 2026-10-07，修复 #1891，改善元素发现准确性。  
   https://github.com/anthropics/skills/pull/1976

7. **#1792 docx：LibreOffice 超时报错并验证输出**  
   更新于 2026-09-25，针对文档处理可靠性。  
   https://github.com/anthropics/skills/pull/1792

8. **#1298 skill-creator：隔离 trigger evals 与 Windows 修复**  
   更新于 2026-09-16，关联评估机制可信度。  
   https://github.com/anthropics/skills/pull/1298

## 4. Skills 生态洞察

当前社区最集中的诉求是：**在安全可信的命名与分发边界内，让 Skills 可被可靠评估、跨平台稳定运行，并继续扩展文档、自动化、Web3、视频与治理等专业能力。**

---

# Claude Code 社区动态日报（2026-10-12）

## 今日速览
过去24小时无新版本发布。社区讨论集中在桌面端计划任务（routines）的可靠性、Windows 会话进程资源泄漏，以及大量 MCP 相关 Issue 被集中关闭；长期功能请求“账户级设置同步”仍保持高热度（26 评论 / 48 👍）。

## 版本发布
无。

## 社区热点 Issues（10 个）

1. **#22648 [OPEN] 账户级设置跨设备同步**  
   https://github.com/anthropics/claude-code/issues/22648  
   作者 @wesleyfolly | 26 评论 | 48 👍  
   长期高赞功能请求：`~/.claude/` 本地配置无法跨设备同步，多机用户需手动维护。社区多次呼吁（#6037、#19634 等），官方尚未回应。

2. **#95967 [OPEN] 计划任务不再显示在桌面侧边栏或 Remote Control**  
   https://github.com/anthropics/claude-code/issues/95967  
   作者 @mannyb223 | 10 评论 | 6 👍  
   macOS 桌面端 routines 运行后不再以会话形式出现，导致无法从手机或桌面继续任务。影响自动化工作流可见性。

3. **#96299 [OPEN] Windows：claude.exe 会话进程累积且永不终止**  
   https://github.com/anthropics/claude-code/issues/96299  
   作者 @moshehik | 9 评论 | 0 👍  
   Windows 桌面端后台进程随会话关闭不释放，工作日累积导致 RAM/磁盘高占用。平台性能问题突出。

4. **#95966 [OPEN] 计划任务静默跳过触发窗口**  
   https://github.com/anthropics/claude-code/issues/95966  
   作者 @Bryan0172 | 9 评论 | 0 👍  
   持续 5 天观察：routines 未按计划触发，无错误、无运行历史、`nextRunAt` 异常。主机与调度引擎均正常，可靠性受质疑。

5. **#94718 [CLOSED] MCP 客户端拒绝省略可选参数的调用；互斥参数组死锁**  
   https://github.com/anthropics/claude-code/issues/94718  
   作者 @jamescra | 8 评论 | 7 👍  
   MCP 工具调用省略可选参数时报 Zod `invalid_type`，互斥参数组导致死锁。已关闭，可能已修复，但影响面广。

6. **#83694 [CLOSED] claude.ai 账户连接器不附加到新会话**  
   https://github.com/anthropics/claude-code/issues/83694  
   作者 @dawnpatrol04 | 4 评论 | 1 👍  
   新会话在收到首条入站消息前不加载连接器工具，自主后台会话无 MCP 工具可用。已关闭。

7. **#96316 [OPEN] 上下文压缩模型可配置（compactModel）**  
   https://github.com/anthropics/claude-code/issues/96316  
   作者 @JayIsCoding | 1 评论 | 3 👍  
   请求增加 `compactModel` / `CLAUDE_CODE_COMPACT_MODEL`，避免 Opus/Fable 会话自动压缩时强制使用高成本模型。成本控制痛点。

8. **#100340 [OPEN] 桌面分屏视图继承项目/会话颜色**  
   https://github.com/anthropics/claude-code/issues/100340  
   作者 @justfinethanku | 1 评论 | 1 👍  
   分屏运行多个会话时缺少颜色标识，易混淆。UI/UX 改进请求。

9. **#90549 [CLOSED] MCP 客户端拒绝 outputSchema 声明 draft-07 方言**  
   https://github.com/anthropics/claude-code/issues/90549  
   作者 @laundry-netizen | 3 评论 | 3 👍  
   任何声明 `$schema: draft-07` 的 MCP 连接器工具调用立即失败。多个连接器（如 Obsidian、文件系统）受影响，已关闭。

10. **#97282 [CLOSED] MCP OAuth 客户端不符合 RFC 9728 发现链**  
    https://github.com/anthropics/claude-code/issues/97282  
    作者 @zekth | 2 评论 | 0 👍  
    客户端直接拼接 `<gateway-origin>/authorize`，未解析 `authorization_servers` → AS 元数据。企业级 Okta 等授权服务器无法使用。已关闭。

## 重要 PR 进展

过去24小时仅 1 条 PR 更新：

- **#79150 [OPEN] docs: align code-review README with the current validation-based command**  
  https://github.com/anthropics/claude-code/pull/79150  
  作者 @Codeturion | 2026-07-19 创建 | 2026-10-11 更新  
  **内容**：更新 `code-review` 命令的 README，移除已不存在的 git blame/history agent、0-100 置信度评分（阈值 80）等过时描述，使文档与当前基于验证的命令实现一致。  
  **意义**：减少开发者因文档过时产生的误用，提升代码审查命令的可发现性与准确性。

## 功能需求趋势

从近 24 小时更新的 Issues 中提炼：

- **跨设备配置同步**：账户级设置同步（#22648）持续高热度，多机用户需求强烈。
- **桌面端与计划任务（routines）**：可见性、触发可靠性、跨设备续跑成为焦点（#95967、#95966）。
- **平台性能**：Windows 进程生命周期管理、内存/磁盘占用（#96299）被频繁提及。
- **MCP 生态成熟度**：Schema 方言兼容、OAuth 规范合规、连接器状态、多连接器支持、按会话隔离与性能优化（#94718、#90549、#97282、#82952 等）。
- **成本控制**：上下文压缩模型可选（#96316），避免高成本模型在压缩环节被动消耗。
- **UI/UX 细化**：桌面分屏颜色标识（#100340）、会话视觉区分。

## 开发者关注点

- **MCP 工具调用兼容性差**：draft-07 outputSchema、可选参数省略、嵌套 array/object 序列化为字符串等问题频繁导致调用失败（#94718、#90549、#87361、#93179）。
- **MCP OAuth 不符合规范**：redirect_uri 端口/主机不一致、未走 RFC 9728 发现链，导致企业 IdP（Okta 等）集成失败（#97282、#90370）。
- **连接器状态与实际不符**：显示“已连接”但 routines/MCP 授权不可见，或显示“需认证”但实际可用（#89665、#89880、#92999）。
- **Windows 桌面资源泄漏**：`claude.exe` 进程不终止，长时间工作后 RAM/磁盘飙升（#96299）。
- **计划任务静默失败**：无错误、无历史、不触发，自动化可靠性存疑（#95966、#95967）。
- **设置同步缺失**：多设备用户需手动维护 `~/.claude/`，长期未解决（#22648）。
- **上下文压缩成本不可控**：压缩强制使用会话模型，Opus/Fable 会话成本高（#96316）。
- **文档滞后**：`code-review` README 与实现脱节，PR #79150 正在修正。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期：2026-10-12** ｜ 数据源：github.com/openai/codex
（数据窗口：过去 24 小时内更新，截至 2026-10-11 的仓库状态）

---

## 1. 今日速览

今日无新版本发布，社区注意力集中在 **Windows 平台下的 Dots / Computer Use / 沙箱权限** 三大类问题上——相关 Issue 占据了评论区前四席中的三席。呼声最高的仍是 **TUI 的 `/undo` 回滚能力**（#9203，477 👍、92 条评论），反映出用户对"Codex 误删 / 误改未提交文件"的强烈不安。PR 侧，一批 TUI 交互与权限恢复相关的改动（#53224、#53150、#53148 等）集中进入关闭状态，显示团队正在系统性打磨终端交互与会话权限持久化。

---

## 2. 版本发布

过去 24 小时内 **无新 Release**。当前社区反馈多集中在 `codex-cli 0.162.x` / 桌面端 `26.1002.x` 系列构建上。

---

## 3. 社区热点 Issues（Top 10）

### ① #9203 请恢复 `/undo` 功能 ｜ 92 评论 · 477 👍
[l链接](https://github.com/openai/codex/issues/9203) ｜ `enhancement, TUI, session`
**为什么重要**：这是本期互动量最高的议题，远超其他任何条目。用户明确指出两大高风险场景：Codex 误删未被 git 跟踪的文件、以及修改尚未提交的代码，且"最近几天已被咬了多次"。`/undo` 的存在被视为最后一道安全网。
**社区反应**：477 个 👍 表明这已成为事实上的社区共识级需求，而非个别诉求。

---

### ② #49458 [Windows] dot 启动的本地任务缺失 Computer Use 工具 ｜ 75 评论 · 26 👍
[链接](https://github.com/openai/codex/issues/49458) ｜ `bug, windows-os, app, computer-use, remote, dots`
**为什么重要**：普通本地 Codex 会话可用 Computer Use，但经由 dot 启动的本地任务却不可用——属于典型的"路径不一致导致能力降级"缺陷，直接影响 Windows 自动化工作流。
**社区反应**：评论数第二高，说明受影响面较广且复现稳定。

---

### ③ #41220 [Meta] 配额异常消耗与计费口径不一致（跨报告追踪） ｜ 59 评论 · 18 👍
[链接](https://github.com/openai/codex/issues/41220) ｜ `bug, rate-limits`
**为什么重要**：作者将多个独立报告归纳为同一"症状族"——订阅额度或购买额度消耗速度显著快于历史基线或本地 token 证据，且可能在配置未变的情况下突变。这是一个**追踪型 Meta Issue**，价值在于聚合证据。
**社区反应**：持续的跨帖汇总说明这不是孤立事件，商业化信任风险较高。

---

### ④ #52407 [Windows Dots] CUA MXC 启动器 HRESULT 0x80070003 ｜ 56 评论 · 7 👍
[链接](https://github.com/openai/codex/issues/52407) ｜ `bug, windows-os, sandbox, app, app-server, computer-use, dots`
**为什么重要**：附带完整环境信息（Windows 25H2 / build 26200.9457、桌面包 26.1002.7124.0、内置 core 0.162.0-alpha.2），属于高可复现度的 Windows Computer Use 阻断性故障。与 #53188、#51659 同源，构成一条清晰的 Windows CUA 故障链。
**社区反应**：56 条评论显示用户在自行排查与交叉验证。

---

### ⑤ #25590 桌面端恢复线程时实际使用 workspace-write，UI 却显示 Full Access ｜ 18 评论 · 3 👍
[链接](https://github.com/openai/codex/issues/25590) ｜ `bug, sandbox, app, session`
**为什么重要**：**UI 展示的权限与实际执行的权限不一致**，这是最危险的一类不一致——用户以为已授权，实际被降级，反复弹出授权请求。反复停止/重启线程后问题持续复现。
**社区反应**：虽然 👍 不多，但属于长期未闭环（6 月创建、10 月仍在更新）的信任类缺陷。

---

### ⑥ #48500 受管 app-server 使用首个客户端的 TMUX_PANE 运行 hooks（0.157 回归） ｜ 15 评论 · 19 👍
[链接](https://github.com/openai/codex/issues/48500) ｜ `bug, CLI, hooks, app-server`
**为什么重要**：0.157 引入"每个 CODEX_HOME 共享一个 `codex app-server --managed-daemon`"后，daemon 继承了首个 TUI 的环境变量，导致后续所有终端的生命周期 hooks 被错误归属到第一个 pane。对依赖 hooks 做编排/审计的团队是硬伤。
**社区反应**：19 👍 与 15 条评论比接近 1:1，属于"懂的都懂"的高质量 bug 报告。

---

### ⑦ #15355 交互式 CLI/TUI 提供 opt-in 本地入口，避免 PTY 输入模拟 ｜ 13 评论 · 3 👍
[链接](https://github.com/openai/codex/issues/15355) ｜ `enhancement, TUI`
**为什么重要**：希望让受信任的本地进程通过**真实会话语义**（而非 PTY/键盘模拟）向运行中的交互式会话投递输入。这是编辑器集成、自动化编排等上层工具的关键基础设施诉求。
**社区反应**：定位精准（明确"比广播式更窄"），属于长期架构型需求。

---

### ⑧ #27133 在 git worktree 中运行时，项目级 `.codex/hooks.json` 被静默忽略 ｜ 12 评论 · 3 👍
[链接](https://github.com/openai/codex/issues/27133) ｜ `bug, CLI, hooks, config`
**为什么重要**：**静默失败**是最难排查的失败模式。worktree 是现代 Git 工作流的常态，hooks 不生效意味着团队级自动化策略形同虚设。
**社区反应**：附带了完整的版本、订阅、模型、平台与 `codex doctor` 信息，属规范报告。

---

### ⑨ #49453 明确允许站点后，浏览器访问仍被聊天级历史拒绝记录阻断 ｜ 11 评论 · 1 👍
[链接](https://github.com/openai/codex/issues/49453) ｜ `bug, windows-os, app, browser`
**为什么重要**：权限决策的"粘性"过强——用户显式放行后，旧的聊天级拒绝记录仍优先生效，导致本地服务（127.0.0.1:18960）无法访问。属权限优先级设计问题，而非单纯 UI bug。
**社区反应**：与 #52503 的"Always allow 后仍反复弹审批"形成同类问题簇。

---

### ⑩ #23037 远程 SSH 在服务器要求 public-key + keyboard-interactive/PAM 时失败 ｜ 10 评论 · 8 👍
[链接](https://github.com/openai/codex/issues/23037) ｜ `bug, auth, app, remote`
**为什么重要**：普通终端 SSH 可正常连接同一端点，但 Codex 桌面端远程 SSH 在认证协商阶段失败。这是企业环境中非常常见的双因子认证配置，直接阻断远程开发场景。
**社区反应**：👍/评论比偏高，说明"遇到但懒得发言"的用户不少。

> 其他值得留意：#18723（Windows CLI 会话在 WebSocket 断开后 37–40 分钟不可恢复）、#17800（TUI 启动 `account/read failed`）、#50919（ChatGPT Classic 登录回调失败，作者已通过清 Firefox Cookie 绕过）、#53221（正常的 Web 开发被 safety-check 判定为"网络安全工作"）。

---

## 4. 重要 PR 进展（Top 10）

> 说明：本期 11 条 PR 全部标记为 `CLOSED`，且作者均为 `copyberry[bot]`，未标注是否已合并。从内容看，这是一组围绕 **TUI 交互体验 + 会话权限/事件可靠性** 的集中提交。

| # | PR | 内容与价值 |
|---|---|---|
| 1 | [#53224](https://github.com/openai/codex/pull/53224) | **修复 Windows 剪贴板文本粘贴**：此前 `Ctrl+V` 只走图像粘贴路径，纯文本剪贴板会报"无图像"错误；`Shift+Insert` 也未接入粘贴通道。直接回应 #51040、#53220。 |
| 2 | [#53150](https://github.com/openai/codex/pull/53150) | **冷恢复时还原线程自有权限**：避免冷启动用当前配置默认值覆盖已保存的匿名权限，也避免从可能早于设置确认的 turn context 中恢复执行器权限。与 #25590 强相关。 |
| 3 | [#53148](https://github.com/openai/codex/pull/53148) | **修复 Vim `Replace` 待处理按键下的草稿恢复**：把 `abcd` 首字符替换为 `X` 应恢复为 `Xbcd` 而非 `Xabcd`，属细节但影响 Vim 用户信任。 |
| 4 | [#53155](https://github.com/openai/codex/pull/53155) | **保证关闭期间远程 app-server 事件仍可投递**：过早丢弃事件接收端会让在途通知投递失败并提前终止 worker，导致 WebSocket close frame 发不出去。 |
| 5 | [#53173](https://github.com/openai/codex/pull/53173) | **支持在 TUI 内重启受管后台服务**：配置修正后无需离开 TUI 即可让服务重新加载，解决"启动期配置警告滞后"问题。 |
| 6 | [#53049](https://github.com/openai/codex/pull/53049) | **为 app-server 请求引入连接绑定的回复句柄**：请求 ID 可跨连接复用，保留的回复必须指向发起请求的那条连接，而非当前 UI 选中项。 |
| 7 | [#53201](https://github.com/openai/codex/pull/53201) | **线程归档后仍保留 agents 导航**：修复已归档线程下按左方向键无法打开 agents 视图的问题。 |
| 8 | [#53152](https://github.com/openai/codex/pull/53152) | **允许选中并复制 TUI turn tips**：turn tips 渲染在 transcript 之外，此前无法被选中复制，现纳入鼠标选择范围。 |
| 9 | [#53153](https://github.com/openai/codex/pull/53153) | **在 TUI 帮助中展示子代理导航快捷键**：在 Session 分组补充 `Alt+Left` / `Alt+Right`，提升可发现性。 |
| 10 | [#53109](https://github.com/openai/codex/pull/53109) | **插件列表输出优雅处理 broken pipe**：`codex plugin list \| head` 提前关闭 stdout 会 panic，现改为可失败写入并妥善处理。 |

**另**：[#53156](https://github.com/openai/codex/pull/53156) 简化自定义终端绘制 API（移除 `Terminal::autoresize` 与可失败的 `try_draw` 辅助函数），属内部重构，为后续 TUI 改动减负。

---

## 5. 功能需求趋势

综合全部 49 条更新 Issue，社区关注方向可归纳为六类：

1. **TUI / CLI 交互体验打磨（最热）**
   撤销能力（#9203）、本地会话入口（#15355）、剪贴板粘贴、快捷键可发现性、文本选中复制。社区正把 Codex TUI 当作一个"需要成熟度的主力编辑器"来要求。

2. **Windows 平台稳定性与能力对齐（问题最密集）**
   Dots/CUA 启动器失败（#52407、#53188、#51659）、WSL 模式引导失败（#50779）、`config.toml` 非原子写导致 NUL 填充（#26421）、WSL 下 `/mnt` cwd 被小写化破坏项目信任（#38591）、桌面端项目视图缺失（#32102）、项目子菜单溢出屏幕（#51873）。**Windows 几乎是当前缺陷密度最高的平台。**

3. **沙箱与权限模型一致性**
   #25590（UI 显示与实际执行不符）、#50737（dot 任务忽略用户级沙箱默认值）、#50120（定时心跳丢失命名权限配置）。核心诉求是：**权限配置必须可预测、可持久、UI 与执行一致**。

4. **Computer Use / 浏览器自动化可靠性**
   Windows 浏览器工具初始化失败、聊天级拒绝记录压过显式放行、`create_blob` 重复审批（#52503）。自动化链路的"授权语义"是主要摩擦点。

5. **配额与用量计费透明度**
   #41220 作为聚合追踪帖长期存在，用户需要可信的 token/额度对账机制。

6. **Hooks / 配置在多环境下的可靠性**
   git worktree 中 hooks 静默失效（#27133）、共享 daemon 导致 hook 事件误归属（#48500）。团队级自动化（CI 前置检查、审计、通知）被这些缺陷直接影响。

---

## 6. 开发者关注点（痛点与高频诉求）

- **"误操作不可逆"是最大焦虑源**。`/undo` 需求以 477 👍 远超其他议题，说明用户对 Codex 直接改动工作区文件（尤其未纳入 git 的部分）缺乏安全感。这是产品信任层面的核心问题，而非"锦上添花的功能"。
- **UI 与真实执行状态不一致，正在侵蚀信任**。权限显示为 Full Access 却实际以 `workspace-write` 执行（#25590）、显式放行后仍被历史拒绝阻断（#49453）、"Always allow"后仍反复弹窗（#52503）——同类问题反复出现，指向权限决策的持久化与优先级逻辑需要统一重构。
- **Windows 是明显的"二等公民"体验区**。从安装包元数据、WSL 引导、原子写入、Dots/CUA 启动器到剪贴板与登录回调，缺陷横跨多个子系统，且多条已持续数周至数月未闭环。
- **静默失败难以排查**。worktree 下 hooks 被忽略（#27133）、配置被 NUL 填充（#26421）、云任务标签掩盖本地执行宿主（#51197）——用户希望失败是"响亮的"，而非悄悄降级。
- **长会话稳定性不足**。Windows 上 WebSocket 断开后会话在约 37–40 分钟后不可恢复（#18723），对长任务型工作流是硬阻断。
- **安全审查出现误伤**。正常的 Web 应用开发被 `safety-check` 判定为"网络安全工作"（#53221），以及 macOS VM 更新后消息被阻断（#51667）——过度拦截正在制造新的 friction。
- **钩子/守护进程的生命周期语义需要明确**。共享 app-server 的环境继承问题（#48500）说明多终端并发场景下的隔离设计尚未收敛。

---

*注：本日报基于该时间段内的公开 Issue / PR 标题与摘要生成，PR 的"CLOSED"状态未区分"已合并"与"未合并关闭"，后续建议结合 commit 记录进一步核实落地情况。*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报（2026-10-12）

> 数据来源：[github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)  
> 统计窗口：过去 24 小时更新；本期无新 Release。

## 1. 今日速览

- 今日无新版本发布，Issue 与 PR 是主要动态来源。
- 企业 Workspace 认证失败 [#29101](https://github.com/google-gemini/gemini-cli/issues/29101) 以 61 条评论成为最热 P1 问题，持续阻断 Enterprise 用户。
- Agent / Subagent 稳定性与可观测性问题密集更新：MAX_TURNS 误报成功、generalist agent 挂起、browser agent 在 Wayland 下失败、工具数量过多触发 400 等。
- PR 侧集中在 IDE Companion、ACP 协议合规、Windows 命令注入加固、路径处理、子代理多模态响应保留，以及多项历史/快照/转录性能线性化优化。

## 2. 社区热点 Issues

1. **[#29101](https://github.com/google-gemini/gemini-cli/issues/29101) Authentication failure blocking Enterprise Workspace accounts — P1，61 评论**  
   企业 Workspace 账户在配置 Google Cloud Project ID 后出现认证失败，且此前可正常工作。这是当前评论数最高的 P1 问题，直接影响企业用户落地。

2. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) Subagent recovery after MAX_TURNS is reported as GOAL success — P1，13 评论，2 👍**  
   `codebase_investigator` 子代理在达到最大轮次后仍报告 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了中断事实。该问题会误导用户对子代理执行结果的判断。

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) Generalist agent hangs — P1，8 评论，8 👍**  
   Gemini CLI 一旦转交 generalist agent 就可能永久挂起，连创建文件夹等简单操作也会卡住。用户反馈禁用子代理可规避，说明问题集中在 agent 调度/恢复路径。

4. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) 零依赖 OS 沙箱与执行后意图路由 — P2，effort/large，9 评论**  
   提案利用 Gemini 3 模型对 bash/POSIX 工具链的亲和性，在保证安全与 UX 的前提下释放模型原生能力。属于 agent 执行架构层面的长期增强。

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) AST-aware 文件读取、搜索与代码库映射 EPIC — P2，7 评论**  
   跟踪 AST 感知工具能否减少错位读取、降低 token 噪声并提升代码导航精度。若落地，可能显著改善大仓库场景下的 agent 效率。

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) Gemini 不主动使用 skills 和 sub-agents — P2，7 评论**  
   用户反馈 Gemini 几乎不会自主调用自定义 skills 和子代理，即使任务高度相关，必须显式指令才会使用。这削弱了扩展机制的实际价值。

7. **[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) Browser Agent 忽略 settings.json 覆盖（如 maxTurns）— P2，4 评论**  
   `AgentRegistry` 正确读取并合并了配置，但 Browser Agent 完全忽略全局或项目级 `settings.json` 覆盖。配置一致性问题是开发者高频痛点。

8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) browser subagent 在 Wayland 下失败 — P1，4 评论，1 👍**  
   Browser Agent 在 Wayland 环境失败，输出 `Termination Reason: GOAL` 但实际未完成目标。与 #22323 类似，存在“失败被报告为成功”的可观测性缺陷。

9. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 工具数量过多时遇到 400 错误 — P2，3 评论**  
   标题称超过 128 个工具即触发 400，正文提到超过 400 个工具。开发者期望 agent 能更智能地限制启用工具范围，避免上下文/工具集膨胀导致请求失败。

10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) Agent 应停止/劝阻破坏性行为 — P2，3 评论，1 👍**  
    模型在复杂 git 操作、分支管理等场景可能使用 `git reset` 或 `--force`，而存在更安全替代方案。该问题关系到 agent 在生产仓库中的安全边界。

## 3. 重要 PR 进展

1. **[#29709](https://github.com/google-gemini/gemini-cli/pull/29709) fix(vscode-ide-companion): 跟踪 activate() 中所有 disposables**  
   修复 `activate()` 中因多余括号形成逗号表达式，导致命令注册未真正进入 `context.subscriptions` 的问题。修复 #27790。

2. **[#29708](https://github.com/google-gemini/gemini-cli/pull/29708) fix(acp): session/load 历史回放完成后才响应**  
   `session/load` 之前在历史回放仍在写入时就返回响应，导致 ACP 客户端收到乱序的 `session/update` 通知，违反 ACP 规范。

3. **[#29510](https://github.com/google-gemini/gemini-cli/pull/29510) fix(editor): 加固 Windows 子进程参数引用并防止命令注入 — CLOSED**  
   为 `shell: true` 调用引入 `quoteCmdArg` 引用助手，修复 Windows 下 diff 命令的路径参数注入风险。

4. **[#29517](https://github.com/google-gemini/gemini-cli/pull/29517) perf(core): 线性化 truncateHistoryToBudget 数组重建 — CLOSED**  
   用 `push()` + 最终反转替代逐元素 `unshift()`，避免重复移动数组元素，同时保留消息顺序和最新优先的 token 预算策略。

5. **[#29515](https://github.com/google-gemini/gemini-cli/pull/29515) linearize-state-snapshot-id-lookups — CLOSED**  
   在快照路径中用 `Set` 做已消费 ID 查找，本地合成基准从 291.95 ms 降至 10.26 ms，快照 ID、来源和节点顺序不变。

6. **[#29516](https://github.com/google-gemini/gemini-cli/pull/29516) cache-transcript-turn-indexes — CLOSED**  
   用 `Map` 缓存 turn 索引，替代对每个节点调用 `indexOf()`。10,000 个文本节点基准从 414.20 ms 降至 17.91 ms。

7. **[#29512](https://github.com/google-gemini/gemini-cli/pull/29512) linearize-chat-compression-history-reconstruction — CLOSED**  
   用 `push()` + 反转替代重复 `unshift()`，保留消息顺序与最新优先 token 预算，基准从 18.97 ms 降至 5.01 ms。

8. **[#29622](https://github.com/google-gemini/gemini-cli/pull/29622) fix(core): 将 tildeifyPath 限制在路径段边界**  
   修复与 home 目录共享前缀的兄弟目录被错误显示为 `~` 下的问题；现在仅当路径等于 home 或从路径分隔符边界开始时才替换。

9. **[#29621](https://github.com/google-gemini/gemini-cli/pull/29621) fix(core): 保留子代理多模态工具响应部分**  
   本地子代理将工具结果回传给模型时，此前会丢弃作为 function response 兄弟节点发出的图像数据；该 PR 按 call ID 跟踪并追加完整响应部分。

10. **[#28781](https://github.com/google-gemini/gemini-cli/pull/28781) chore/release: 版本 bump 至 0.56.0-nightly.20260812.g5024443c7 — OPEN / Stale**  
    自动化 nightly 版本 bump，当前标记为 Stale，未包含功能性变更。

## 4. 功能需求趋势

- **Agent / Subagent 可靠性与可观测性**：挂起、MAX_TURNS 误报、浏览器代理跨平台失败、bugreport 缺少子代理上下文，是当前最集中的问题簇。代表：#21409、#22323、#21983、#21763。
- **企业级认证与权限**：Workspace 账户认证失败直接影响企业采用，优先级最高。代表：#29101。
- **安全沙箱与破坏性命令防护**：社区希望释放模型 bash 能力的同时，避免 `git reset --force` 等危险操作，并加固 Windows 命令注入。代表：#19873、#22672、#29510。
- **上下文与工具效率**：AST-aware 读取/搜索/映射、token 节省式“外科手术读取”、工具数量过多导致 400、持久化任务追踪替代上下文内 todo。代表：#22745、#19561、#24246、#18836。
- **IDE / 协议集成**：VS Code IDE Companion 生命周期管理、ACP `session/load` 协议合规，是提升编辑器内体验的关键。代表：#29709、#29708。
- **性能与终端渲染**：历史截断、快照查找、转录索引缓存等多项线性化优化被关闭；终端 resize 闪烁和高性能渲染仍是开放需求。代表：#29517、#29515、#29516、#21924。
- **多代理协作与轨迹可见性**：共享内存、并行子代理、通过 `/chat share` 查看子代理轨迹等需求开始出现。代表：#18287、#22598。

## 5. 开发者关注点

- **认证阻断企业用户**：#29101 持续 61 条评论，说明企业 Workspace 场景的认证兼容性仍是高优痛点。
- **Agent 挂起与“假成功”**：generalist agent 永久挂起、subagent 达到轮次上限却报告 GOAL success、Wayland 下 browser agent 失败仍报 GOAL，严重影响信任与调试效率。
- **配置不生效**：Browser Agent 忽略 `settings.json` 覆盖，导致用户无法通过配置控制 maxTurns 等行为。
- **工具集膨胀**：工具数量过多触发 400，开发者期望 agent 自动收敛工具范围，而不是让请求直接失败。
- **安全边界**：Windows 子进程命令注入、复杂 git 操作中的破坏性命令，是生产环境采用前必须解决的问题。
- **子代理可观测性不足**：bugreport 不包含子代理上下文，子代理轨迹也不易通过 `/chat share` 查看，增加了排障成本。
- **性能优化持续推进**：多个 PR 通过替换 `unshift()`/`indexOf()` 等实现数量级提速，说明历史压缩、快照与转录渲染仍是性能敏感路径。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报  
**日期：2026-10-12**

## 今日速览

Reasonix Studio 发布 v2.36.0 与 v2.35.0，带来提问超时、回合时长、Linux rpm 包、MCP 工具固定等更新，同时修复多项启动与更新问题。社区侧，Studio 2.36.0 在无会话工作区启动即白屏的崩溃问题被提出并已有修复 PR；存储迁移静默卡死、npm 升级后版本显示异常等痛点持续受到关注。安全与 Agent 可靠性方面，provider 请求重定向、后台任务写入检查、write lease 设置等成为开发者讨论焦点。

## 版本发布

### studio-v2.36.0 / v2.36.0 CLI
- **新增**：提问等待超时（默认关闭），可通过设置、`[agent] ask_timeout_seconds` 或 `/ask-timeout` 开启；每回合结束后显示运行时长，重载历史后仍可见；可选提示音、折叠中间过程、改动文件条、工作区额外文件夹、编辑连接时更改协议、回执卡默认隐藏。
- **修复**：1M 窗口每轮 400、存储迁移卡在校验、滚轮抖动、模型切换被后台任务挡住、Linux 与 Windows 更新等问题。
- 链接：https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.36.0

### studio-v2.35.0 / v2.35.0 CLI
- **新增**：首个含 Linux `.rpm` 安装包（minisign 校验，暂不自动更新）；MCP 工具定义批准后固定，后续变更或新增工具会被扣留并拒绝调用，直到 `reasonix mcp trust`；闲置会话自动归档、硬件加速开关、反馈回复通知。
- **修复**：信任库无限增长、新会话默认模型被跳过时无提示等问题。
- 链接：https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.35.0

## 社区热点 Issues

1. **#12743 [OPEN] Studio 2.36.0 无会话工作区启动即白屏**  
   `/tree` 返回 `sessions:null` 导致前端 `TypeError: n.sessions is not iterable`，Windows 11 + Electron 44.5.1 冷启动崩溃。影响面大，已有修复 PR #12744。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12743

2. **#12726 [CLOSED] Storage 迁移静默卡死与目标目录判定过严**  
   Studio 2.35.0 下从 C: 迁移至 D: 时，verifying 阶段无超时无报错卡死；目标目录判定过严。数据迁移属高危操作，社区反馈强烈。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12726

3. **#12577 [CLOSED] `reasonix upgrade` 后 `npm outdated -g` 仍显示旧版本**  
   npm 全局安装时二进制被替换但 `package.json` 未更新，导致版本管理混乱。已由 PR #12578 修复。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12577

4. **#12566 [CLOSED] Readiness 检查通过后，仍在运行的后台任务可继续写入代码**  
   Agent 核心可靠性问题：readiness 决策未考虑运行中的后台任务，可能导致检查通过后代码被意外修改。由 #12560 审查发现。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12566

5. **#12548 [CLOSED] Provider 探测使用默认重定向策略，未经过重定向与出口守卫**  
   携带 API Key 的“测试连接”请求可能跟随重定向至非配置源，存在密钥泄露风险。已由 PR #12570 修复。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12548

6. **#12676 [CLOSED] Windows 端 ask 弹窗和会话完成无提示音/通知**  
   用户设置后仍无提示信息或提示音，每个任务需手动查询状态。影响多任务并行体验，v2.35.0 后续已加入可选提示音。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12676

7. **#12253 [CLOSED] 执行权限“不询问且拒绝”，建议改为发送请求时不给 tool**  
   权限模型与工具暴露策略的讨论，评论 4 条，涉及 Agent 安全与用户体验的平衡。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12253

8. **#12467 [CLOSED] 右侧侧边栏收起时，滚动条与拖拽热区重叠**  
   鼠标无法拖动滚动条，虽可用滚轮替代，但属核心操作效率问题。UI 交互细节的典型代表。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12467

9. **#12722 [CLOSED] 消息框按键为箭头但无法发消息，发送后进入 steer 状态且无法导入**  
   左侧无进行中 session，任务却在后台运行，状态显示脱节。反映会话状态同步与 UI 反馈的严重 bug。  
   https://github.com/esengine/DeepSeek-Reasonix/issues/12722

10. **#12473 [CLOSED] Studio 2.x 更新后启动主程序弹出错误，启动失败**  
    Windows 更新路径问题，已由 PR #12615 修复（shell discovery 整体超时绑定）。  
    https://github.com/esengine/DeepSeek-Reasonix/issues/12473

## 重要 PR 进展

1. **#12744 [OPEN] 修复 `/tree` 返回 `sessions:null` 导致的白屏**  
   工作区无会话时改为返回 `"sessions": []`，直接解决 #12743 的启动崩溃。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12744

2. **#12578 [CLOSED] 将 npm 安装的二进制交给 npm 管理**  
   修复 `replaceBinary` 重写 `os.Executable()` 导致 npm 版本记录不一致的问题。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12578

3. **#12570 [CLOSED] 保持携带密钥的 Provider 请求在配置源上**  
   为携带 API Key 的请求增加重定向策略，防止密钥随重定向泄露。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12570

4. **#12615 [CLOSED] 为 shell discovery 增加整体超时，避免内核握手阻塞**  
   修复启动时 shell 探测卡死导致主程序无法启动（#12473），触及 `internal/safety/sandbox/**`，已请求安全审查。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12615

5. **#12560 [CLOSED] Readiness 修复：检查通过后写的说明文字不应触发二次运行**  
   避免修改 `CHANGELOG.md` 或 `README.md` 后代理重新运行测试，减少无效回合。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12560

6. **#12598 [CLOSED] 在回合尾部告知模型日历日期，每天一次**  
   解决会话长期运行后模型仍按启动日期推理的问题，引用 #12504、#12445。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12598

7. **#12645 [CLOSED] 添加源时提供内核精选的 Provider 预设**  
   选择预设后保存为完整连接（含 catalog、vision models 等），而非普通连接。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12645

8. **#12591 [OPEN] 让手机页面可添加到主屏幕并全屏打开**  
   仅第一切片：支持添加到主屏幕；重新配对上次主机留待后续。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12591

9. **#12595 [OPEN] WSL 发行版发现与探测（RFC #12225 切片 1）**  
   新增代码启动 `wsl.exe`，只读且用户发起，但涉及进程启动边界，需安全审查。  
   https://github.com/esengine/DeepSeek-Reasonix/pull/12595

10. **#12417 [OPEN] 新增 `[agent] write_lease` 三模式设置**  
    跨会话写租约范围：`strict`（默认）、`optimistic`、`off`，为高级用户提供更灵活的并发写入控制。  
    https://github.com/esengine/DeepSeek-Reasonix/pull/12417

## 功能需求趋势

- **UI/UX 精细化**：侧栏按钮功能重复（#12459）、图标栏会话按钮占位（#12460）、滚动条热区重叠（#12467）、侧栏开关位置变动（#12461）、工作台应内嵌打开而非跳浏览器（#12481）等，社区对界面一致性与交互细节要求提升。
- **稳定性与数据安全**：白屏崩溃（#12743）、存储迁移卡死（#12726）、更新后启动失败（#12473）、shell 发现卡死（#12615）等，启动与数据迁移路径的健壮性是高频痛点。
- **更新与版本管理**：npm 升级后版本显示旧（#12577）、Windows 更新残留（#12493）、rpm 暂不自动更新，跨包管理器版本一致性受关注。
- **权限与安全**：执行权限不询问且拒绝（#12253）、MCP 工具定义固定（v2.35.0）、provider 重定向携带密钥（#12548）、write lease 多模式（#12417），安全边界与可控性成为核心议题。
- **Agent 可靠性与可观测性**：提问等待超时（#12661）、每回合运行时长、日历日期（#12598）、readiness 后台任务检查（#12566），开发者希望 Agent 行为更可预测、状态更透明。
- **平台扩展**：Linux rpm 包、WSL 发现（#12595）、手机页面添加到主屏幕（#12591），跨平台与移动端访问需求显现。

## 开发者关注点

- **更新后版本不一致**：npm 全局安装与二进制替换冲突，导致 `npm outdated` 显示旧版本，影响升级判断。
- **启动与迁移缺乏超时/错误反馈**：存储迁移静默卡死、shell 探测阻塞启动，用户无法定位问题，需显式超时与错误提示。
- **通知与状态同步缺失**：Windows 端 ask 弹窗和会话完成无提示音/通知，任务状态需手动查询；消息框无法发送、状态脱节（#12722）进一步加剧不信任感。
- **权限模型行为不明确**：“不询问且拒绝”与“不给 tool”的取舍引发讨论，需更清晰的安全策略与用户预期管理。
- **UI 交互细节影响效率**：滚动条、侧栏按钮、会话按钮占位等看似小问题，但直接拖慢日常操作，社区反馈密集。
- **安全与可靠性并重**：provider 密钥重定向、MCP 工具变更扣留、后台任务写入检查，表明开发者对 Agent 安全边界与运行时可靠性的关注度持续升高。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 2026-10-12

## 今日速览
- **v1.19.0 发布**：引入 `opencode upgrade --major` 升级到 OpenCode 2，并修复 OpenAI `ultrafast` 服务层级和 PTY 连接验证。
- **V2 迁移问题集中爆发**：会话隐藏、配置失效、认证错乱等 Issue 密集出现，社区修复 PR 同步跟进。
- **文件索引、OpenAI 认证、上下文压缩成为修复焦点**：多个高热度 Issue 对应的 PR 已提交，进入审查阶段。

## 版本发布
### v1.19.0
- **Core 改进**：支持 `opencode upgrade --major` 升级到 OpenCode 2。
- **Core 修复**：允许 OpenAI `ultrafast` 服务层级；在检查 PTY 是否存在前验证 PTY 连接来源和票据。
- **TUI 改进**：`/update` 命令可用于安装 OpenCode 更新。
- 链接：https://github.com/anomalyco/opencode/releases/tag/v1.19.0

## 社区热点 Issues（10 个）
1. **#32747 [CLOSED] @ 文件提及不包含启动后创建的文件**  
   21 评论 | 17 👍 | 作者 @ovftank  
   文件索引陈旧导致新文件无法通过 `@` 提及，必须重启才能出现。高热度且高赞，直接影响日常编码效率。  
   https://github.com/anomalyco/opencode/issues/32747

2. **#52269 [CLOSED] OpenAI 服务间歇性不可用**  
   17 评论 | 3 👍 | 作者 @pedrommone  
   OpenAI provider 间歇性上游连接失败，跨模型和会话出现，自动重试有时也无法恢复。核心编码体验受损。  
   https://github.com/anomalyco/opencode/issues/52269

3. **#49050 [CLOSED] AI 在写入 `</｜DSML｜tool_calls>` 后中止**  
   17 评论 | 4 👍 | 作者 @Tythuser  
   特定工具调用标记导致 AI 流式中止，影响 1.18.30 用户，涉及工具调用解析兼容性。  
   https://github.com/anomalyco/opencode/issues/49050

4. **#49847 [OPEN] ChatGPT OAuth 请求使用 Zen API key**  
   9 评论 | 3 👍 | 作者 @jhsu  
   OpenAI OAuth 凭证被错误替换为 Zen API key，导致 ChatGPT Codex 端点拒绝请求。认证绑定逻辑存在严重缺陷。  
   https://github.com/anomalyco/opencode/issues/49847

5. **#45249 [CLOSED] 原生上下文自动压缩从未触发，导致 token/credit 失控**  
   5 评论 | 1 👍 | 作者 @LeonardoX77  
   `session_context_epoch` 始终为 0，自动压缩失效，在 GitHub Copilot 上造成 token 和信用点异常消耗。  
   https://github.com/anomalyco/opencode/issues/45249

6. **#40335 [OPEN] [FEATURE] 在桌面端添加 MCP 服务器设置和连接测试**  
   2 评论 | 5 👍 | 作者 @solcoteh  
   桌面用户管理 MCP 仍需 CLI 或手动编辑配置，社区期待图形化设置和连接测试。高赞功能需求。  
   https://github.com/anomalyco/opencode/issues/40335

7. **#53019 [OPEN] [FEATURE] v2 插件无法转换助手文本用于显示**  
   2 评论 | 6 👍 | 作者 @ualtinok  
   插件生态关键 API 缺失，v2 中插件无法在显示或完成时修改助手文本，限制上下文管理等插件的实现。  
   https://github.com/anomalyco/opencode/issues/53019

8. **#54471 [OPEN] [reproduced] 桌面端嵌套 Markdown 块渲染为 LTR**  
   3 评论 | 作者 @majiabdol  
   双向文本在嵌套 Markdown 块中方向错误，打乱波斯语/阿拉伯语/希伯来语内容，影响国际化用户体验。  
   https://github.com/anomalyco/opencode/issues/54471

9. **#53867 [OPEN] [reproduced] 附件持久化失败变成未处理的 rejection**  
   3 评论 | 作者 @sdivyanshu90  
   附件粘贴/拖放持久化失败时，UI 调用点 fire-and-forget，导致未处理 rejection 且 `onError` 回调未触发。  
   https://github.com/anomalyco/opencode/issues/53867

10. **#54640 [OPEN] V1 迁移会话在全局项目中孤立并在升级 V2 后隐藏**  
    1 评论 | 作者 @WilliamSantos96  
    从 V1 升级到 V2 后，94 个历史会话仍在数据库但不在 TUI 列表，影响升级用户数据可见性。  
    https://github.com/anomalyco/opencode/issues/54640

## 重要 PR 进展（10 个）
1. **#54398 [OPEN] feat(core): 为自定义 OpenAI-compatible providers 发现上下文限制**  
   作者 @woodsonl | 解决 #53235  
   这些 provider 不在 models.dev 中，模型保持内置占位限制；PR 移植 #53236 到 V2。  
   https://github.com/anomalyco/opencode/pull/54398

2. **#54396 [OPEN] fix(core): SQLite 语句在锁超时时重试**  
   作者 @woodsonl | 解决 #47566  
   在 `busy_timeout` 后遇到 `SQLITE_BUSY` 的语句使用抖动退避重试，避免终止不相关的提示。  
   https://github.com/anomalyco/opencode/pull/54396

3. **#54643 [OPEN] fix(core): 每次搜索会话重新验证文件搜索索引**  
   作者 @Hona | 修复 #32747 及重复问题  
   解决 `ripgrepLayer` 最多 10 秒重新扫描、查询仍得到旧索引导致 `@new-file` 缺失的问题。  
   https://github.com/anomalyco/opencode/pull/54643

4. **#54649 [CLOSED] fix(core): 限制压缩保留的最近部分**  
   作者 @superbiche | 修复 #54648  
   `recentStart` 会回溯到切割之前的最新用户消息，导致整个长交换被保留；PR 增加边界限制。  
   https://github.com/anomalyco/opencode/pull/54649

5. **#43719 [CLOSED] feat(desktop): 添加 MCP 服务器设置和连接测试**  
   作者 @sentryshub | 实现 #40335  
   在桌面应用中添加 MCP 设置页面，无需手动编辑配置文件即可管理服务器。  
   https://github.com/anomalyco/opencode/pull/43719

6. **#54639 [OPEN] fix(core): 当 Console BYOK 列出 openai 时使用 ChatGPT OAuth token**  
   作者 @sahiljagtap08 | 修复 #49847  
   当组织在 Console 设置 BYOK OpenAI 时，Console 插件错误重绑定 provider，导致 Zen API key 发往 OAuth 端点。  
   https://github.com/anomalyco/opencode/pull/54639

7. **#54612 [OPEN] fix(core): 将内联思维链拆分为推理部分**  
   作者 @ashaker20 | 解决 #54599  
   部分 OpenAI-compatible 模型将思维链内联在文本中并以 `think` 闭合标签结束，PR 将其拆分到 reasoning 部分。  
   https://github.com/anomalyco/opencode/pull/54612

8. **#51482 [OPEN] fix(core): 支持 AI SDK v4 媒体输入**  
   作者 @Ethereal49 | 修复 #50960  
   版本化 AI SDK v4 provider 目前将工具图像序列化为 null，PR 使用加载模型的 lower file data 和 tool content。  
   https://github.com/anomalyco/opencode/pull/51482

9. **#54372 [OPEN] fix(core): 将 provider 白名单/黑名单迁移到模型覆盖**  
   作者 @cleardevice | 修复 #49986  
   文档中的 `whitelist`/`blacklist` 在 V2 归一化时被丢弃，PR 迁移到模型覆盖以保持配置兼容。  
   https://github.com/anomalyco/opencode/pull/54372

10. **#54641 [OPEN] fix(nix): 在 flake 构建中禁用自更新器**  
    作者 @fabiob | 解决 #54022  
    通过此仓库 flake 安装的 opencode 位于只读 Nix 存储中，但 TUI 仍提供应用内更新。PR 禁用自更新器。  
    https://github.com/anomalyco/opencode/pull/54641

## 功能需求趋势
- **V2 迁移与兼容性**：会话迁移、配置形状、共享服务认证等大量 V2 相关 bug，社区急需平滑升级体验。
- **Provider 与模型兼容性**：OpenAI OAuth/BYOK 认证、自定义 OpenAI-compatible provider、GLM PDF、AI SDK v4 媒体输入、内联思维链等。
- **文件系统与搜索性能**：`@` 文件提及实时索引、inotify watch 重复、SQLite 锁重试。
- **UI/UX 与国际化**：终端快捷键、帮助菜单、命令面板、附件渲染、RTL 文本方向。
- **MCP 与插件生态**：桌面端 MCP 管理、插件文本转换 API。
- **上下文管理**：自动压缩触发、保留策略、token 消耗控制。
- **跨平台打包**：Nix flake 自更新器冲突。

## 开发者关注点
- **文件索引陈旧**：新文件无法被 `@` 提及，需重启（#32747，21 评论 17 赞）。
- **Provider 认证与稳定性**：OAuth/API key 混用（#49847）、stale well-known wiring（#54645）、OpenAI 间歇性 503（#52269）。
- **上下文压缩与 token 消耗**：自动压缩不触发（#45249）、压缩保留过多（#54648）。
- **V2 迁移问题**：历史会话隐藏（#54640）、配置兼容（#54372、#52667）。
- **错误处理与国际化**：附件持久化未处理 rejection（#53867）、RTL 渲染错误（#54471）。
- **Web 端工作目录与快捷键**：目录选择器起始于 home（#54626）、子目录打开会话到仓库根（#54647）、终端快捷键失效（#54559）。
- **性能**：inotify watches 重复（#50966）。
- **功能需求**：桌面 MCP 管理（#40335）、插件文本转换（#53019）。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报（2026-10-12）

## 1. 今日速览
过去24小时无新版本发布。社区焦点集中在 **Windows 安装路径污染、`execute_code` 错误静默、kanban 停止提示失效** 等 P2 级缺陷上；同时多个关键 PR 已提交修复，并推进 CLI 所有权重构、Photon 探活、技能写入预算等中长期改进。

## 2. 版本发布
无。

## 3. 社区热点 Issues
今日 Issue 更新共 8 条，以下为全部值得关注条目（按重要性排序）：

1. **#135037 [OPEN] Windows 用户 PATH 注册写入共享环境变量**  
   沙箱/外部检出的 `bin` 目录被写入 `HKCU\Environment\Path`，导致宿主机上所有 `hermes` 命令解析到错误路径。评论 5 条，讨论最活跃。  
   https://github.com/NousResearch/hermes-agent/issues/135037

2. **#17873 [OPEN] 为 DANGEROUS_PATTERNS 增加反向 shell、下载执行、凭据读取模式**  
   当前 `tools/approval.py` 覆盖 47 种模式，但缺少常见危险命令类别，属于安全边界增强。评论 2 条。  
   https://github.com/NousResearch/hermes-agent/issues/17873

3. **#66393 [CLOSED] 非交互会话中 browser 工具未安装时应返回安装提示**  
   在 gateway / `hermes chat` 等非交互场景，若 `agent-browser` 未安装，应门控或提示安装，而非直接暴露工具。评论 3 条，已关闭。  
   https://github.com/NousResearch/hermes-agent/issues/66393

4. **#69776 [CLOSED] 异步委托派发说明导致弱模型编造结果**  
   子代理异步返回结果前，弱模型会在同一轮伪造任务结果（如 Redis 计数器值）。评论 3 条，已关闭。  
   https://github.com/NousResearch/hermes-agent/issues/69776

5. **#136843 [OPEN] 被拒绝的 `kanban_complete` 被视为终端交接，静默禁用停止提示**  
   `kanban_stop.py` 检查的是“尝试”而非“成功”，导致 worker 在卡片仍运行时停止。新提交，0 评论。  
   https://github.com/NousResearch/hermes-agent/issues/136843

6. **#136842 [OPEN] `write_file` 相对路径解析继承 `TERMINAL_CWD`，文件落入启动 shell 的 HOME**  
   从 `W` 启动但 `TERMINAL_CWD=D` 时，相对路径写入 `D`，而 `sessions.cwd` 却报告项目目录。新提交，0 评论。  
   https://github.com/NousResearch/hermes-agent/issues/136842

7. **#136835 [OPEN] `write_file` 守卫拒绝未记录日志**  
   拒绝写入 `read_file` 显示文本时直接返回 `tool_error`，`agent.log` / `errors.log` 无任何记录，排查困难。新提交，0 评论。  
   https://github.com/NousResearch/hermes-agent/issues/136835

8. **#136834 [OPEN] `execute_code` 的 `hermes_tools` 桩吞掉工具错误**  
   工具失败以 dict 返回而不抛异常，脚本忽略返回值时表现为成功，导致代理报告未发生的工作。新提交，0 评论。  
   https://github.com/NousResearch/hermes-agent/issues/136834

## 4. 重要 PR 进展
从过去24小时更新的 50 条 PR 中，挑选 10 条关键进展：

1. **#136846 [OPEN] fix(release): Store 提交读取 CLI 的 PascalCase 提交键**  
   修复 rc.13-v0.21.7 在 Store 提交阶段因键名格式失败的问题。  
   https://github.com/NousResearch/hermes-agent/pull/136846

2. **#99053 [OPEN] feat(agent): 允许 `pre_llm_call` 插件运行时覆盖模型**  
   插件钩子可返回 `runtime_override` 字典，仅覆盖当前轮次的 LLM 模型，不涉及 provider/api_key 等。  
   https://github.com/NousResearch/hermes-agent/pull/99053

3. **#125029 [OPEN] CLI Ownership Refactor — Phase 3: 运行时与持久化原语**  
   将进程身份、子进程、SQLite 所有权等从 CLI 模块抽离到 `runtime/` 和 `storage/` 包，保留兼容门面。  
   https://github.com/NousResearch/hermes-agent/pull/125029

4. **#136848 [OPEN] fix(photon): 暴露探针往返与就绪状态**  
   分类 Spectrum 服务端探针响应为 wire-alive，保留 RFC UUID 探针 ID，新增 `stream.ready` 字段。  
   https://github.com/NousResearch/hermes-agent/pull/136848

5. **#134673 [OPEN] feat(skills): 强制可配置的写入大小预算**  
   新增 `skills.max_skill_md_chars` 等设置，防止 SKILL.md 无限制增长导致加载成本过高。  
   https://github.com/NousResearch/hermes-agent/pull/134673

6. **#136845 [OPEN] fix(kanban): 拒绝交接后保留停止提示**  
   对应 Issue #136843，结构化错误响应不再被误判为已完成交接。  
   https://github.com/NousResearch/hermes-agent/pull/136845

7. **#136838 [OPEN] fix(tools): `execute_code` 桩收到错误结果时抛出 `ToolCallError`**  
   对应 Issue #136834，工具失败不再被静默吞掉，脚本无法忽略错误继续执行。  
   https://github.com/NousResearch/hermes-agent/pull/136838

8. **#136837 [OPEN] fix(tools): 记录被拒绝的 `write_file` 显示文本**  
   对应 Issue #136835，拒绝写入时增加 WARNING 日志，记录守卫原因和目标路径。  
   https://github.com/NousResearch/hermes-agent/pull/136837

9. **#136836 [OPEN] fix(tools): 缺少必需参数的工具调用被拒绝并指明参数名**  
   工具调用遗漏 schema 必需参数时，返回 `<tool> was not run: missing required argument(s): <keys>`，不再运行默认值。  
   https://github.com/NousResearch/hermes-agent/pull/136836

10. **#126167 [OPEN] fix(gateway): 在合成轮次中保留 prompt pins**  
    P0 级会话状态问题，修复非内部合成 goal/heartbeat/resume/steer 轮次导致 prompt pin 丢失。  
    https://github.com/NousResearch/hermes-agent/pull/126167

## 5. 功能需求趋势
从 Issues 与 PR 中可提炼出以下社区关注方向：

- **平台兼容性与安装更新**：Windows PATH 注册、Store 提交键名、持久 shell 设置、`HERMES_KANBAN_*` 环境变量排除。
- **工具安全与可靠性**：扩充危险命令模式、工具错误传播、参数校验、拒绝操作日志化。
- **会话与状态管理**：kanban 终止判定、`TERMINAL_CWD` 相对路径、prompt pins 保留、会话快照隔离。
- **插件与模型运行时控制**：`pre_llm_call` 模型覆盖、技能路由规则、技能写入预算。
- **新集成与本地化**：Photon 本地 iMessage、Composio 桌面集成、浏览器工具安装提示。

## 6. 开发者关注点
- **静默失败与可观测性不足**：`execute_code` 将工具失败返回为 dict、`write_file` 拒绝无日志，导致问题难以复现和排查。
- **Windows 平台细节**：沙箱检出污染共享 PATH、Store 提交键名大小写敏感，影响发布与多环境使用。
- **会话状态一致性**：kanban 基于“尝试”判断终止、相对路径依赖 `TERMINAL_CWD`，造成行为与预期不符。
- **安全边界**：危险命令模式覆盖不全，社区主动要求增加反向 shell、下载执行、凭据读取等检测。
- **模型行为控制**：弱模型在异步委托未返回时编造结果，需要更强的派发说明或约束。
- **配置生效问题**：`terminal.persistent_shell` 等设置自 spawn-per-call 重写后失效，用户配置未被尊重。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报（2026-10-12）

> 数据来源：github.com/openclaw/openclaw  
> 统计窗口：过去 24 小时更新

## 1. 今日速览

今天 OpenClaw 社区的主线仍是**更新与恢复可靠性**：v2026.10.5-beta.1 主打 safer updates，但社区同时出现更新恢复被阻塞、receipt/lease 报错延迟、更新器自替换兼容等多条反馈。其次，**Gateway 启动性能、会话/消息一致性、OOM 与资源回收**继续活跃。UI 与存储架构方面，Solid 2 迁移、shared-state JSON 字段提升等 PR 也在推进。

---

## 2. 版本发布

### v2026.10.5-beta.1

- **发布内容**：OpenClaw 2026.10.5-beta.1。
- **核心亮点**：更安全的更新流程。更新可跨设备、文件系统、Windows 权限提升和中断激活完成；可从陈旧 lease 或变化后的 evidence 中恢复，避免安装搁浅或阻塞后续更新。
- **备注**：数据中的 release 文本被截断，引用了 #164636、#164769、#165257、#165863 等。
- **链接**：https://github.com/openclaw/openclaw/releases/tag/v2026.10.5-beta.1

---

## 3. 社区热点 Issues

过去 24 小时内更新的 Issues 共 8 条，以下按重要性全部纳入。

1. **#169463 更新恢复被阻塞：activation database 被硬链接进保留的 updater runtime**  
   - 状态：OPEN，2026-10-12 新建/更新，0 评论。  
   - 重要性：2026.9.8 → 2026.9.9 更新失败，手动安装后升级 2026.10.1 仍报 `update-recovery-pending`，直接冲击更新可靠性。  
   - 链接：https://github.com/openclaw/openclaw/issues/169463

2. **#169462 Updater 阻塞 receipt 早知但晚报，`update repair` 空操作却退出 0**  
   - 状态：OPEN，0 评论。  
   - 重要性：阻塞 receipt 在验证前已知，却约 30 分钟后才在 package-swap 阶段失败；`update repair` 没有实际修复但返回成功，严重损害恢复信任。  
   - 链接：https://github.com/openclaw/openclaw/issues/169462

3. **#166020 Gateway 启动慢：约 60 秒/次重新验证插件生成源树**  
   - 状态：OPEN，P2，platinum hermit，5 评论。  
   - 重要性：每次启动都对 `node_modules` 做完整文件系统遍历和身份比较，且与缓存冷热无关，影响开发与生产启动体验。  
   - 链接：https://github.com/openclaw/openclaw/issues/166020

4. **#99659 OpenClaw 在 companion app 连接后被 OOM kill**  
   - 状态：OPEN，bug/crash，P2，7 评论，👍1。  
   - 重要性：连接 companion Windows app 后内存异常峰值，最终被 Kubernetes OOM kill。属于稳定性/内存泄漏类关键问题。  
   - 链接：https://github.com/openclaw/openclaw/issues/99659

5. **#48709 Gemini 2.5 Pro：textSignature 膨胀、think tags、混合 text/tool 导致会话失败**  
   - 状态：OPEN，stale，P2，8 评论。  
   - 重要性：长期存在的 Gemini 兼容问题，会导致会话上下文快速膨胀、运行中止、Telegram 静默投递失败。  
   - 链接：https://github.com/openclaw/openclaw/issues/48709

6. **#159215 `edit`、`apply_patch`、`write` 允许 agent 不验证文件当前内容就提交修改**  
   - 状态：OPEN，P2，platinum hermit，2 评论。  
   - 重要性：agent 可能基于不存在的 `oldText` 执行修改，导致内存文件损坏或状态不一致；涉及 agent 文件编辑安全边界。  
   - 链接：https://github.com/openclaw/openclaw/issues/159215

7. **#169459 本地 TUI 模型目录缺少可用性与服务等级**  
   - 状态：OPEN，2026-10-11，1 评论。  
   - 重要性：`openclaw chat` / `openclaw tui --local` 不评估模型可用性和 service tiers，用户可能选择不可用模型。  
   - 链接：https://github.com/openclaw/openclaw/issues/169459

8. **#169455 已撤回：来自未授权账户的提交**  
   - 状态：CLOSED，2026-10-11。  
   - 重要性：流程/权限类噪声，无技术影响，但反映 Issue 提交权限控制。  
   - 链接：https://github.com/openclaw/openclaw/issues/169455

---

## 4. 重要 PR 进展

以下挑选 10 条过去 24 小时内更新的重要 PR。

1. **#169330 fix(update): 更新器替换自身文件后仍保持更新可用**  
   - 重要性：修复 updater 自更新后 lazy import 旧 hashed chunk 失败的问题，直接关系更新链路可靠性。  
   - 链接：https://github.com/openclaw/openclaw/pull/169330

2. **#169436 fix(doctor): recovery 副本遗漏 Canvas 和 Memory Core 文件**  
   - 重要性：Doctor/updater 创建恢复副本时，状态迁移可能删除或移动原始 Canvas/Memory Core 文件，导致恢复数据不完整。  
   - 链接：https://github.com/openclaw/openclaw/pull/169436

3. **#169365 perf(gateway): 缓存 direct-entry 模块编译**  
   - 重要性：通过 `dist/index.js` 启动的 Gateway 未启用 Node compile cache，每次重启重复编译；该 PR 改善启动性能。  
   - 链接：https://github.com/openclaw/openclaw/pull/169365

4. **#163685 fix(channels): 为队列中的回复保留频道所有权**  
   - 重要性：P1，修复队列/回合中频道回复丢失调用插件 owner，包括 Mattermost block replies，影响消息投递正确性。  
   - 链接：https://github.com/openclaw/openclaw/pull/163685

5. **#121204 fix(discord): 防止陈旧 ambient backlog 饿死实时 mention**  
   - 重要性：Gateway 恢复后，durable ingress queue 重放大量旧 guild 消息，可能挤占 live `@bot` 的 agent turn。  
   - 链接：https://github.com/openclaw/openclaw/pull/121204

6. **#169137 fix(gateway): 无关 pairing 更新不再中止 operator turns**  
   - 重要性：P1，涉及 security-boundary；活跃 Control UI operator turns 会因无关配对设备更新而被中止。  
   - 链接：https://github.com/openclaw/openclaw/pull/169137

7. **#169438 fix: 在目标会话中记录已投递消息**  
   - 重要性：修复消息投递到其他聊天后可见但不在模型历史中的问题，覆盖 message-tool、失败告警、cron、heartbeat 等路径。  
   - 链接：https://github.com/openclaw/openclaw/pull/169438

8. **#169414 refactor(storage): 提升 shared-state JSON 查询字段**  
   - 重要性：把 meeting-transcript selectors、overview search、delivery-receipt retention 从 SQL 内 JSON 谓词提升为普通列，利于索引和未来 PostgreSQL 适配。  
   - 链接：https://github.com/openclaw/openclaw/pull/169414

9. **#168632 fix(gateway): 关闭失败不再遗留 agent database leases**  
   - 重要性：Gateway 关闭时任意 final-owner close 步骤失败，都会导致 agent DB lease 残留，下次启动需作为 dead-owner 恢复。  
   - 链接：https://github.com/openclaw/openclaw/pull/168632

10. **#169394 refactor(ui): 用 Solid 渲染 chat sidebar 区域**  
    - 重要性：Control UI 迁移的一部分，将聊天侧边栏、详情内容、文件视图和编辑器菜单从 Lit 迁到 Solid 2。  
    - 链接：https://github.com/openclaw/openclaw/pull/169394

---

## 5. 功能需求趋势

从本日 Issues 与 PR 标签看，社区关注方向集中在：

- **更新/恢复可靠性**：safer updates、update repair、receipt/lease、硬链接阻塞、恢复副本完整性。代表：#169463、#169462、#169330、#169436。
- **Gateway 启动与运行时性能**：插件源树全量校验、模块编译缓存、SQL JSON 查询索引化。代表：#166020、#169365、#169414。
- **会话与消息一致性**：队列回复 owner、Discord backlog、目标会话历史、重复用户轮次、Gemini session bloat。代表：#121204、#163685、#169438、#48709。
- **稳定性与资源回收**：OOM、模型 catalog 旧 inventory、DB lease 残留。代表：#99659、#168632、#158986。
- **Agent 文件编辑安全**：`edit` / `apply_patch` / `write` 需要验证文件当前内容，避免盲目修改。代表：#159215。
- **模型目录与 TUI 体验**：模型可用性、服务等级、`/fast ultrafast` 自动补全。代表：#169459、#169456。
- **UI 架构现代化**：Control UI 从 Lit 向 Solid 2 迁移，覆盖 sidebar、config forms 等。代表：#169394、#169046。
- **安全边界与权限**：operator turns 与 pairing updates 解耦、Windows elevation、update security review。代表：#169137、v2026.10.5-beta.1。

---

## 6. 开发者关注点

1. **更新流程“失败晚、恢复难、repair 不可信”**  
   开发者遇到更新阻塞时，往往要等约 30 分钟才看到失败；`update repair` 甚至空操作返回 0。相关：#169462、#169463、#169330。

2. **Gateway 启动性能被插件源树校验拖慢**  
   每次 boot 全量遍历 `node_modules` 并比较文件身份，约 60 秒，且缓存无用。相关：#166020、#169365。

3. **会话状态与消息投递容易分裂**  
   消息在目标聊天可见但不在模型历史；队列回复丢失频道 owner；Discord 旧 backlog 饿死实时 mention。相关：#169438、#163685、#121204。

4. **内存与租约资源回收仍脆弱**  
   companion app 连接后 OOM；Gateway 关闭失败遗留 agent DB lease；旧模型 catalog 不释放。相关：#99659、#168632、#158986。

5. **Agent 文件修改缺少内容校验**  
   `edit`/`apply_patch`/`write` 允许基于不存在或过期内容提交修改，开发者希望有版本校验或 CAS 语义。相关：#159215。

6. **失败原因可观测性不足**  
   失败 turn 只显示通用提示，Gateway 日志无原因；更新阻塞原因早已知道却延迟报出。相关：#169399、#169462。

7. **TUI 与模型选择体验仍需打磨**  
   本地 TUI 不显示模型可用性/服务等级，`/fast ultrafast` 不被接受也未出现在自动补全。相关：#169459、#169456。

:::
