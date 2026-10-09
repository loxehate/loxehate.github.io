---
title: "AI CLI 工具社区动态日报"
published: 2026-10-09
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-09

> 生成时间: 2026-10-09 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具社区横向对比分析 · 2026-10-09

> 口径说明：各日报统计窗口均为过去 24 小时，但部分工具只披露“精选/样本”数量，并非全量；下表用“全部/精选/样本/未披露”标注。

---

## 1. 生态全景

当前 AI CLI 工具已从“能力扩张”进入“可靠性治理”阶段：Hooks、沙箱、权限、会话状态成为跨工具共同痛点，Windows 桌面端与长会话上下文是最大风险面。多账号、多 Provider、多 Agent 协调需求快速上升，社区对“静默失败、误报成功、更新即坏”的容忍度显著下降。发布节奏明显分化：Claude Code、Reasonix、OpenClaw 高频发版，Codex/Gemini 以正式版+预发布推进，OpenCode/Hermes 处于迁移或大版本收口期。企业合规、安全边界与可观测性正从边缘需求变为核心竞争点。

---

## 2. 各工具活跃度对比

| 工具 | Issues 数（过去 24h） | PR 数（过去 24h） | Release 情况 |
|---|---:|---:|---|
| Claude Code | 50（全部） | 2（全部） | v2.1.294 / v2.1.295，聚焦 Hooks 可靠性 |
| OpenAI Codex | 47（更新） | 10+（重要/镜像，未披露总数） | rust-v0.162.0 正式；0.163.0-alpha.1 等预发布 |
| Gemini CLI | 49（本批） | 10+（精选，含重复提交） | v0.65.0-nightly.20261008 |
| DeepSeek Reasonix | 8（全部） | 50（更新） | studio-v2.31.0 / v2.32.0；CLI 归档同步 |
| OpenCode | 10+（热点，未披露总数） | 10+（重要） | 无 |
| Deepseek Harness | 0 | 0 | 无 |
| Hermes | 5（全部） | 20（样本，非全量） | v0.21.6，聚合约 2,100 个 PR |
| OpenClaw | 11（本轮） | 50（本轮） | v2026.9.9 正式；v2026.10.1-beta.2 beta |

**简评**：Claude Code、Codex、Gemini CLI 的 Issue 量最大，说明用户基数与讨论密度高；OpenClaw、Reasonix、Hermes 的 PR 流更密集，处于快速迭代或补债阶段；OpenCode 无新 Release 但修复型 PR 集中；Deepseek Harness 完全停滞。

---

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求与代表 |
|---|---|---|
| **Windows/桌面沙箱稳定性** | Claude Code、Codex、OpenCode、OpenClaw、Gemini CLI | Claude Code MSIX/AppX 进程锁与内核池泄漏；Codex Windows 沙箱 `ERROR 32` 自锁；OpenCode Nix 自更新破坏会话；OpenClaw Windows 桌面内嵌 Bun；Gemini Wayland 子代理失败 |
| **会话生命周期与长上下文** | Claude Code、Codex、OpenCode、Hermes、OpenClaw、Gemini CLI | compaction/`/clear` 后状态丢失；远程压缩失败；idle eviction 驱逐运行中会话；sidecar 不写库；spillover 指针不诚实；Cron 失败被记为 ok |
| **权限/安全/策略可信** | Claude Code、Codex、Gemini CLI、Reasonix、Hermes、OpenClaw | Hooks `onFailure: "block"`；MCP 工具定义 pinning；凭证掩码；Guardian 信任开关；shell wrapper 绕过修复；破坏性操作护栏；Bedrock 鉴权失败 |
| **多账号/凭证/Provider 兼容** | Claude Code、Codex、Gemini CLI、OpenCode、OpenClaw | MCP/Google 多账号绑定；credential refresh 协调；Gemini schema/OpenAI-compatible tool args；Bedrock、Qianfan、Ollama 退役模型适配 |
| **多 Agent/跨端协调可观测** | Claude Code、Codex、Gemini CLI、Hermes、OpenClaw | 跨会话协调原语；子代理挂起/误报成功；后台化与轨迹查看；单一 gateway 统一本地会话；多 agent 规则冲突 |
| **上下文/Token 效率与 IDE 控制** | Claude Code、Gemini CLI、OpenCode、Hermes、OpenClaw | VS Code 自动附加文件/选区高赞反对；AST-aware 读取；避免二进制误读；cache-preserving compaction；Anthropic Context Editing；Gemini textSignature 膨胀 |
| **安装/更新/分发可靠性** | Claude Code、Codex、Reasonix、OpenCode、Hermes、OpenClaw | MSIX 更新失败；ARM64 增量更新不完整；Nix 只读环境；DEB/RPM 包；Docker 逐版本 tag；更新回执过期；registry 误判 |

---

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术/社区路线 |
|---|---|---|---|
| **Claude Code** | Hooks 策略执行、企业合规、权限模式、MCP/多账号 | 专业团队、企业合规、CI/自动化 | 官方主导，闭源商业化，强化 managed settings 与安全边界；Issue 热但外部 PR 少 |
| **OpenAI Codex** | 桌面沙箱、云端/远程、代码审查、Computer Use、Rust TUI | OpenAI 生态开发者、企业、OSS 维护者 | 内部镜像型 PR 为主，沙箱安全模型扩展快，但 Windows 回归跨多版本未修 |
| **Gemini CLI** | 多代理/子代理、AST-aware 上下文、Google 生态、nightly | Gemini/Google Cloud 开发者、扩展生态 | 开源+maintainer 主导，官方 workstream 明确，安全与上下文效率并行推进 |
| **DeepSeek Reasonix** | 桌面 Studio+CLI、TUI 交互、Windows ARM64、MCP 安全 | Reasonix 用户、桌面/TUI 重度用户 | 高频双版本发布，社区反馈闭环快；2.x TUI 重写后大量 1.x 行为回补 |
| **OpenCode** | 开源可自托管、v2 迁移、Session 生命周期、Provider 兼容 | 自托管/开源开发者 | 无新 Release，修复型 PR 集中；v2 认证、配置、持久化迁移缺口仍在 |
| **Hermes** | 多端统一 gateway、Docker/Cloud、插件/机器人/cron | 多端 agent、自动化、机器人集成 | v0.21.6 聚合 2,100 PR，架构向“单一 gateway 拥有所有本地会话”演进 |
| **OpenClaw** | 多渠道 gateway、多 Provider、插件/Control UI、Cron/消息渠道 | 自动化运维、群聊/渠道集成、长期运行场景 | 正式版+beta 双轨，PR 密度高；P1 僵尸进程与资源治理是当前瓶颈 |
| **Deepseek Harness** | 无活动 | — | 过去 24 小时无动态 |

---

## 5. 社区热度与成熟度

**第一梯队：高活跃、高讨论密度**
- **Claude Code**：Issue 50 条、2 个版本，Hooks 行为变更影响面大；官方响应偏集中，社区 Windows 痛点积压。
- **OpenAI Codex**：47 条 Issue，Windows 沙箱回归形成集群，`ERROR 32` 跨 3 个构建未修；正式版与 alpha 并行。
- **Gemini CLI**：49 条 Issue，P1 子代理挂起/误报成功最受关注；PR 侧安全与上下文修复密集。
- **OpenClaw**：11 Issue / 50 PR，正式版+beta 热修复；P1 僵尸进程 19 条评论，长期运行稳定性待补。
- **DeepSeek Reasonix**：8 Issue / 50 PR / 2 个版本；TUI 键位对齐与安全 RFC 并行，迭代最快之一。

**第二梯队：修复/迁移期**
- **OpenCode**：无 Release，Session 生命周期、v2 迁移、Provider 兼容问题集中；多个高优 PR 已跟进。
- **Hermes**：Issue 仅 5 条但 PR 样本 20 条；v0.21.6 聚合 2,100 PR 后出现 P1 回归，Docker tag 缺失影响 bisect。

**低活跃/停滞**
- **Deepseek Harness**：过去 24 小时无活动。

**成熟度判断**：Claude Code、Codex、Gemini CLI 产品成熟但平台与迁移问题突出；OpenClaw、Hermes 功能广但可靠性治理欠账；Reasonix、OpenCode 处于重写/迁移后的补债期；Deepseek Harness 已边缘化。

---

## 6. 值得关注的趋势信号

1. **“静默失败”比崩溃更致命**  
   子代理误报成功、Cron 失败记为 ok、消息不写库、告警不触发成为跨工具高频反馈。开发者选型时应优先验证失败可见性与告警链路，而非只看功能清单。

2. **Hooks/权限正从扩展点变为策略层**  
   Claude Code `onFailure: "block"`、MCP 工具定义 pinning、凭证掩码、shell wrapper 修复表明：安全边界开始可依赖化。但行为变更可能阻断存量工作流，建议先在非关键仓库回归。

3. **长会话上下文是结构性瓶颈**  
   compaction、cache-preserving、AST-aware、Context Editing 等方案密集出现。对开发者而言，Token 成本与“越跑越笨”将直接影响工具选择。

4. **多 Agent/跨端统一成为下一阶段竞争点**  
   Hermes 单 gateway、Claude 跨会话协调、Gemini 子代理可观测、Codex 只读工具并行——社区需要可协调、可追踪、可后台化的多代理体验。

5. **Windows/桌面沙箱是最大平台短板**  
   MSIX/AppX、`ERROR 32`、Nix 自更新、ARM64 增量更新不完整，集中暴露打包、文件锁、权限与分发链路问题。跨平台团队应预留验证成本。

6. **多 Provider 兼容成为日常运营负担**  
   Gemini schema、OpenAI-compatible tool args、Bedrock 鉴权、Ollama 退役模型、动态模型列表——模型接入层已成为 PR 最密集区域之一。

7. **企业合规与自建遥测上升**  
   HIPAA 示例、managed settings、OTLP metrics、WAF 识别、可审计审批链，说明 AI CLI 正进入受监管行业采购视野。

8. **AI 辅助贡献与维护流程需同步演进**  
   大量 PR 由 bot 镜像或 AI-assisted 完成，证据标准、评审吞吐与去重机制成为社区协作瓶颈。维护者需适应“代码产出速度 >> 人工评审速度”的新常态。

**对开发者的参考**：短期选型重点看更新路径是否尊重受管环境、Hooks/权限是否可依赖、长会话是否可恢复、Windows/远程端是否稳定；长期应关注上下文压缩效率、多 Agent 协调原语与可观测性。对工具团队，可靠性治理、平台沙箱、多 Provider 适配和迁移兼容性，将比新增功能更能决定留存。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-10-09｜来源：github.com/anthropics/skills

> 注：PR 数据的评论数字段为 `undefined`，无法还原真实评论数。以下“热门”依据原榜单顺序（按评论数排序）、更新时间、问题影响面综合判断；展示的 PR 当前均为 **OPEN**。

## 1. 热门 Skills 排行（PR）

1. **mcp-builder：MCP v2 兼容修复** — [#1742](https://github.com/anthropics/skills/pull/1742)  
   - 功能：修复 `mcp>=2.0.0` 中 `streamablehttp_client` 重命名为 `streamable_http_client`，并支持通过 `create_mcp_http_client` / `http_client` 配置自定义 headers。  
   - 热点：MCP 生态升级兼容性，关联 #1668。  
   - 状态：OPEN，2026-10-08 仍有更新。

2. **skill-creator：trigger eval 隔离与跨平台修复** — [#1298](https://github.com/anthropics/skills/pull/1298)  
   - 功能：隔离触发评测，修复 Windows 下 subprocess 探测失败和运行时错误被误判为“未触发”。  
   - 热点：Skill 评测假阴性/无效分数，与 #1352、#1383 等 issue 呼应。  
   - 状态：OPEN。

3. **proofcore-contract-auditor：智能合约审计** — [#1771](https://github.com/anthropics/skills/pull/1771)  
   - 功能：对 Solidity / Rust 智能合约做静态分析，并把审计证明锚定到 TON 区块链。  
   - 热点：Web3 安全审计与链上存证。  
   - 状态：OPEN。

4. **docx：孤立评论检测** — [#1734](https://github.com/anthropics/skills/pull/1734)  
   - 功能：检测 Word 文档中的 orphaned comments。  
   - 热点：文档协作清理、docx 工具链补全。  
   - 状态：OPEN。

5. **md2video-audio：Markdown 转视频** — [#1703](https://github.com/anthropics/skills/pull/1703)  
   - 功能：Markdown 经 Marp 转演示文稿，再编译为带配音的 MP4。  
   - 热点：零成本内容生产、视频自动化。  
   - 状态：OPEN。

6. **Notion 规格转实现 + 简历量化审计** — [#1245](https://github.com/anthropics/skills/pull/1245)  
   - 功能：把 Notion 规格拆成 Claude Code 可执行任务；另含 quantitative-resume-auditor。  
   - 热点：工作流自动化、招聘/简历场景。  
   - 状态：OPEN。

7. **docx：LibreOffice 超时与输出验证修复** — [#1792](https://github.com/anthropics/skills/pull/1792)  
   - 功能：`soffice` 超时时返回错误，并验证输出 DOCX 是否仍含修订标记。  
   - 热点：文档处理可靠性、避免“假成功”。  
   - 状态：OPEN。

8. **claude-api：替换死链** — [#1730](https://github.com/anthropics/skills/pull/1730)  
   - 功能：替换 `academy-guide` 与 `tool-use-concepts` 中的 404 URL。  
   - 热点：官方文档可用性与维护质量。  
   - 状态：OPEN。

## 2. 社区需求趋势

- **安全与信任边界成为第一优先级**：社区 skill 以 `anthropic/` 命名空间分发可能冒充官方 skill，引发权限信任问题；eval viewer 还存在 XSS、DNS rebinding、跨站 POST 等风险；`webapp-testing` 有 `shell=True` 命令注入风险。相关：[#492](https://github.com/anthropics/skills/issues/492)、[#1394](https://github.com/anthropics/skills/issues/1394)、[#1980](https://github.com/anthropics/skills/pull/1980)。
- **Skill 评测与触发可靠性是核心痛点**：`run_eval.py` 出现 0% trigger、并行 worker 交叉匹配、benchmark 静默失败、MCP evaluation 对真实 server 全 0 分等问题。社区期待更可靠的触发评测、跨平台支持和可复现 benchmark。相关：[#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)、[#1383](https://github.com/anthropics/skills/issues/1383)、[#1390](https://github.com/anthropics/skills/issues/1390)。
- **企业协作与共享机制需求上升**：用户希望组织内直接共享 skill，而不是手动传 `.skill` 文件；同时插件安装重复内容会污染上下文。相关：[#228](https://github.com/anthropics/skills/issues/228)、[#189](https://github.com/anthropics/skills/issues/189)、[#1175](https://github.com/anthropics/skills/issues/1175)。
- **上下文与 token 效率受关注**：`claude-api` 被指单次注入约 156k tokens；社区提出 compact-memory 等符号化记忆方案，希望降低长会话上下文成本。相关：[#1487](https://github.com/anthropics/skills/issues/1487)、[#1329](https://github.com/anthropics/skills/issues/1329)。
- **新 Skill 方向集中在治理、质量门、测试、文档与垂直工具**：agent-governance、Reasoning Quality Gate、AWT E2E 测试、document-typography、ODT、Pyxel、SCNet HPC 等均有提案或 PR。相关：[#412](https://github.com/anthropics/skills/issues/412)、[#1385](https://github.com/anthropics/skills/issues/1385)、[#822](https://github.com/anthropics/skills/pull/822)、[#514](https://github.com/anthropics/skills/pull/514)、[#486](https://github.com/anthropics/skills/pull/486)、[#525](https://github.com/anthropics/skills/pull/525)、[#1615](https://github.com/anthropics/skills/pull/1615)。

## 3. 高潜力待合并 Skills

以下 PR 均为 OPEN，但更新较近、修复目标明确，或关联高频 issue，近期落地概率较高：

- **#1742 mcp-builder MCP v2 兼容**：MCP 升级刚需，2026-10-08 更新。[链接](https://github.com/anthropics/skills/pull/1742)
- **#1681 skill-creator 支持直接执行 package_skill.py**：修复 `ModuleNotFoundError` 和过时路径，2026-10-08 更新。[链接](https://github.com/anthropics/skills/pull/1681)
- **#1961 skill-creator eval viewer 安全加固**：修复脚本逃逸、DNS rebinding、跨站 POST、转义不一致，2026-10-07 更新。[链接](https://github.com/anthropics/skills/pull/1961)
- **#1977 algorithmic-art：wrapAround 负值修复**：逻辑 bug 修复，关联 #1897，2026-10-07 更新。[链接](https://github.com/anthropics/skills/pull/1977)
- **#1980 webapp-testing：移除 shell=True**：修复 CWE-78 命令注入风险，2026-10-06 更新。[链接](https://github.com/anthropics/skills/pull/1980)
- **#1730 claude-api 死链修复**：文档维护型小修，2026-10-04 更新。[链接](https://github.com/anthropics/skills/pull/1730)
- **#1792 docx LibreOffice 超时修复**：文档处理可靠性问题，2026-09-25 更新。[链接](https://github.com/anthropics/skills/pull/1792)
- **#1298 skill-creator trigger eval 修复**：与多个评测可靠性 issue 直接相关，2026-09-16 更新。[链接](https://github.com/anthropics/skills/pull/1298)

## 4. Skills 生态洞察

一句话：当前社区最集中的诉求，是让 Skills 从“功能示例”升级为**可信、可评测、安全且低上下文成本的生产级组件**；其中**安全/信任边界**与 **eval/trigger 可靠性**是最强痛点。  
代表链接：[#492](https://github.com/anthropics/skills/issues/492)、[#556](https://github.com/anthropics/skills/issues/556)、[#1961](https://github.com/anthropics/skills/pull/1961)。

---

# Claude Code 社区动态日报 · 2026-10-09

> 数据来源：github.com/anthropics/claude-code（过去 24 小时）

---

## 1. 今日速览

今天 Claude Code 连续发布 **v2.1.294 / v2.1.295** 两个版本，核心都围绕 **Hooks 可靠性**：新增 `onFailure: "block"` 让 Hook 启动失败/超时不再"放行"，并修复了"指令式 Hook"（如 "Block commands that…"）被误判导致该拦没拦的问题。社区侧，**Windows 桌面端（MSIX）安装/重启失败**依旧是热度最高的痛点，多个独立 Issue 从进程锁、AppX 容器作业继承、内核分页池泄漏三个角度指向同一类根因；同时**多账号 MCP / Google 连接器**成为新的需求集中点。

---

## 2. 版本发布

### v2.1.295
- 新增 **command / HTTP Hook 的 `onFailure: "block"`**：当 Hook 无法启动、超时或以非预期退出码结束时，**阻断该操作**，而不是静默放行——这是把 Hook 从"尽力而为"提升为"可做安全边界"的关键改动。
- 新增 **Program Status Protocol（OSC 7501）支持**：实现该协议的终端可以显示 Claude Code 的运行状态（原文在此处截断）。
- 链接：https://github.com/anthropics/claude-code/releases

### v2.1.294
- 修复：以**自然语言指令**形式编写的 `prompt` / `agent` Hook（例如 "Block commands that…"）此前会**放行本应拦截的操作**。
- 改进：对 `Stop` / `SubagentStop` 上指令式 `prompt` Hook 的判定逻辑（例如 "Carry on if the build is broken"），减少误判（原文在此处截断）。
- 链接：https://github.com/anthropics/claude-code/releases

**解读**：两个版本连发说明官方正在把 Hooks 从"可编程扩展点"收紧为"可依赖的策略执行层"。这对把 Claude Code 接入 CI、企业合规流水线的团队是明确利好——但 `onFailure: "block"` 属于行为变更，**存量 Hook 若本身不稳定，升级后可能开始阻断正常工作流**，建议先在非关键仓库验证。

---

## 3. 社区热点 Issues（精选 10 条）

### ① #42776 Windows 桌面端因孤儿进程文件锁导致重启失败
- 202 条评论 / 98 👍（今日评论数最高）
- 链接：https://github.com/anthropics/claude-code/issues/42776
- 为什么重要：Windows Desktop 更新/重启失败的最长尾问题，评论量级远超其他 Issue，说明影响面广且长期未解。虽被标记 `invalid`，但社区持续在此汇聚。

### ② #24726 VS Code 扩展：增加"禁止自动附加当前文件/选中内容"设置
- 91 条评论 / **263 👍（今日点赞最高）**
- 链接：https://github.com/anthropics/claude-code/issues/24726
- 为什么重要：典型的"高赞低争议"需求。侧边栏自动把打开文件或选中内容塞进上下文，对大仓库用户是持续的隐式 token 消耗与上下文污染，社区诉求非常一致。

### ③ #91763 Windows/MSIX：`git fsmonitor--daemon` 继承 AppX 容器 Job，阻塞新版本启动（0x80070020）
- 20 条评论
- 链接：https://github.com/anthropics/claude-code/issues/91763
- 为什么重要：与 #42776 同源但**给出了完整根因分析与免重启 workaround**，是把"重启失败"从玄学变成可复现问题的一次突破，工程价值高。

### ④ #96870 Windows MSIX Desktop：会话派生的每个进程经 AppData junction 访问路径时泄漏内核非分页池（bindflt.sys）
- 3 条评论
- 链接：https://github.com/anthropics/claude-code/issues/96870
- 为什么重要：内存/句柄泄漏属于**长跑必炸**类缺陷，与 ③ 一起构成 MSIX 打包层的系统性风险拼图。

### ⑤ #76727 独立启动的多个 Claude Code 会话之间缺少跨会话协调机制
- 25 条评论
- 链接：https://github.com/anthropics/claude-code/issues/76727
- 为什么重要：重度用户在同一工作树并发跑多个会话，目前唯一原语是 `PreToolUse` deny hook"自己搭"，且存在静默漏洞。这直接关系到**多 Agent / 并行开发**这一主战场，属于能力缺失而非体验问题。

### ⑥ #70555 工作状态连续性：在 compaction 与 `/clear` 后存活
- 17 条评论
- 链接：https://github.com/anthropics/claude-code/issues/70555
- 为什么重要：精准命名了长会话"越跑越笨"的现象——压缩上下文后重新推导、遗忘在飞线程、重复劳动。这是当前 Agent 长任务的**结构性瓶颈**。

### ⑦ #98159 claude.ai：允许用户设置默认权限模式，包括 "Skip all approvals"
- 7 条评论 / 12 👍
- 链接：https://github.com/anthropics/claude-code/issues/98159
- 为什么重要：Web 端正缺 CLI 已有的权限模式选择，"跳过全部审批"是自动化重度用户的核心诉求。

### ⑧ #99596 定时任务在首次工具往返后被放弃；跟踪的 session id 与 transcript 永不匹配
- 5 条评论
- 链接：https://github.com/anthropics/claude-code/issues/99596
- 为什么重要：Scheduled Tasks / Routines 是"无人值守自动化"的入口，任务被中途丢弃 + 会话 ID 无法对账，会让所有依赖它的 CI/定时工作流不可信。

### ⑨ #100606 Opus 模型质量显著下降，疑似量化变更
- 1 条评论（今日新建，情绪强烈）
- 链接：https://github.com/anthropics/claude-code/issues/100606
- 为什么重要：模型质量观感类反馈一旦出现，通常会在数日内快速聚集；且报错环境为 v2.1.294，值得官方尽早澄清是否存在服务端变更。

### ⑩ #45525 `/buddy` 返回 "Unknown skill: buddy"（已关闭）
- 24 条评论 / 37 👍
- 链接：https://github.com/anthropics/claude-code/issues/45525
- 为什么重要：跨 macOS Skills 的可用性问题，被关闭说明已有结论/修复路径。与 #42704（companion 动画破坏复制粘贴）合看，`/buddy` 这类"氛围功能"在 TUI 中的副作用需要更谨慎的默认值。

**其他值得关注（今日更新）**：
- #100544 每个 MCP Server 支持多认证账号，并显示当前账号 → https://github.com/anthropics/claude-code/issues/100544
- #100407 Google 连接器支持一个 Claude 账号绑定多个 Google 账号 → https://github.com/anthropics/claude-code/issues/100407
- #99820 云端定时任务的权限分类器阻断所有者已授权的操作 → https://github.com/anthropics/claude-code/issues/99820
- #80123 Windows ConPTY 下窗口缩放后 Agent 视图使用过期终端宽度 → https://github.com/anthropics/claude-code/issues/80123
- #98820（系列 stale 关闭）大量 7 月 Issue 被批量标记 `stale` 并关闭，含 `/context` 计量失真（#82333）、后台子 Agent 通知错路由（#82342）等 → https://github.com/anthropics/claude-code/issues/82333

---

## 4. 重要 PR 进展

⚠️ **说明**：过去 24 小时内更新的 PR 仅 2 条，无法凑齐 10 条，以下为全部内容。

### ① #100293 为 examples/settings 增加 HIPAA 配置示例
- 作者：@sarahdeaton ｜ 状态：OPEN ｜ 更新：2026-10-08
- 链接：https://github.com/anthropics/claude-code/pull/100293
- 内容：新增 `settings-hipaa.json`、`managed-mcp-hipaa.json` 及 `README-hipaa.md`，面向已应用 HIPAA 配置的组织，用于**限制会话内容离开开发者本机**。
- 价值：这是官方示例库向**企业合规/受监管行业**延伸的信号。managed-settings + managed-mcp 的组合，正是企业 IT 集中管控 Claude Code 的落点。

### ② #41447 feat: open source claude code ✨
- 作者：@gameroman ｜ 状态：OPEN（自 2026-03-31 长期开放）｜ 更新：2026-10-08
- 链接：https://github.com/anthropics/claude-code/pull/41447
- 内容：请求将 Claude Code 开源，一次性关闭 #59、#456、#2846、#22002、#41434 等多个长期 Issue。
- 价值：从 3 月挂到 10 月仍保持 OPEN 且持续有更新，说明"开源"是社区情绪最持久的议题之一。虽然落地可能性低，但它是理解社区与官方张力的一把标尺。

---

## 5. 功能需求趋势

从今日全部 50 条 Issue 中可提炼出六条主线：

| 方向 | 代表 Issue | 社区诉求 |
|---|---|---|
| **身份与多账号** | #100544、#100407 | MCP OAuth 与 Google 连接器目前"一个服务只绑一个账号"，且不显示当前账号。个人 + 工作多身份场景是刚需 |
| **自动化与权限模型** | #98159、#99820、#81948 | 默认权限模式、"跳过全部审批"、定时任务不应重复弹已 allow 的权限、云端任务缺人工审批通道 |
| **长会话状态连续性** | #70555 | compaction / `/clear` 后保留工作状态，解决"越跑越笨" |
| **多会话 / 多 Agent 协调** | #76727、#82342 | 跨会话锁与协调原语、后台子 Agent 的通知路由正确性 |
| **Windows 平台稳定性** | #42776、#91763、#96870、#82345、#80123 | MSIX/AppX 容器、进程锁、内核池泄漏、ConPTY 尺寸——平台层问题最密集 |
| **Hooks 与策略可信度** | v2.1.294/295、#81959 | Hook 失败语义、指令式 Hook 判定、诊断提示准确性 |

值得注意的是：**今日被批量 `stale` 关闭的 Issue 中相当一部分是"计量与可观测性"类问题**（`/context` 计数偏差、速率限制诊断提示误导），暗示这部分积压正在被集中清理，但也意味着短期内相关反馈的"回声"会减少。

---

## 6. 开发者关注点

综合今日反馈，开发者痛点集中在以下五处：

1. **Windows 桌面端是最脆弱的一环。** 三个独立 Issue（重启锁、AppX Job 继承、内核池泄漏）从不同层次指向同一结论：MSIX 打包模型与 Claude Code 派生进程的方式不兼容。用户甚至自发提交了根因分析和免重启 workaround，说明官方响应节奏落后于社区排查速度。

2. **"隐式上下文注入"缺乏控制权。** #24726 以 263 👍 位居榜首，反映开发者对 IDE 扩展自动附加文件/选区的强烈不满——这既是 token 成本问题，也是上下文质量问题。

3. **权限系统与自动化任务相互打架。** 定时任务重复索要已授权权限、云端任务因权限分类器阻断且无人可审批、Web 端无法设置默认模式——自动化越深，权限模型的缺口越明显。

4. **Hook 语义必须"可依赖"。** 官方连续两个版本修 Hook，侧面说明此前 Hook 存在"看起来拦住了其实没拦"的静默失败。把 Hook 当作安全边界的团队应尽快升级并回归测试。

5. **模型质量的观感波动。** #100606 这类反馈通常会在 24–72 小时内快速聚集，是唯一可能影响"是否继续使用"的元问题，建议官方快速给出明确说明。

---

*本日报基于公开 GitHub 数据自动汇总，Release 说明中部分条目在数据源中被截断，请以官方 Release 页面为准。*

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 · 2026-10-09

> 数据来源：[github.com/openai/codex](https://github.com/openai/codex) ｜ 统计窗口：过去 24 小时

---

## 一、今日速览

1. **Windows 沙箱出现系统性回归**：过去 24 小时内更新的 47 条 Issue 中，超过 8 条集中指向同一类故障——Windows 桌面端在 ACL / 运行时校验阶段因 `ERROR 32`（sharing violation）或 `setup refresh had errors` 导致**所有命令执行失败**，涉及 26.1002.51308、26.1002.52244、26.1002.7124.0 等多个构建，已演变为社区第一热点。
2. **rust-v0.162.0 正式版发布**：带来托管 Git worktree 工具、Command Center 任务置顶（`p`）等能力；同时 0.163.0-alpha.1 及多条 0.162.0-alpha 预发布同步推进。
3. **PR 侧集中于内核能力打磨**：凭证掩码、Guardian 审查追踪、只读工具并行调度、gRPC code-mode 会话恢复等变更批量合入（均为 bot 提交的镜像型 PR，无社区评论）。

---

## 二、版本发布

### rust-v0.162.0（正式版）
- **托管 Git worktree 工具**：在受信任的本地项目中，当 worktree 功能启用时，可创建与列举受管理的 Git worktree。（#50148）
- **Command Center 任务置顶**：使用 `p` 键置顶任务，服务端支持时归入共享的 Pinned 分组。（#51500）
- 另含导航与复制相关改动（原文 release notes 在此处被截断）。

### 预发布通道
- `rust-v0.163.0-alpha.1` — 下一主线首个 alpha。
- `rust-v0.162.0-alpha.20` / `alpha.18.1` / `alpha.17.2` — 0.162 分支的补丁级预发布，官方未附详细说明。

Release 列表：https://github.com/openai/codex/releases

---

## 三、社区热点 Issues（10 条）

**1. [#51601](https://github.com/openai/codex/issues/51601) — Windows sandbox setup 因占用自身 runtime 而 sharing violation｜96 评论 · 25 👍**
本日热度最高的 Issue。更新到 26.1002.51308 后，任何命令在启动前即失败并抛出 `helper_unknown_error: setup ...`。核心矛盾在于沙箱在**校验自己正在使用的 runtime 文件**时触发文件占用冲突——这是典型的自锁设计缺陷，影响面为全体 Windows 用户，评论量呈爆发式增长。

**2. [#25826](https://github.com/openai/codex/issues/25826) — 多显示器下最大化窗口溢出到相邻屏幕｜51 评论 · 23 👍**
自 2026-06 创建、持续四个月仍未关闭的长尾问题，23 个 👍 显示其代表性强。窗口管理虽非核心功能，但直接破坏多屏开发者的日常体验，属于"低危高频"型积怨。

**3. [#51778](https://github.com/openai/codex/issues/51778) — 26.1002.52244 版 Windows 沙箱失败｜25 评论**
与 #51601 同源但版本更新，说明该回归在连续多个构建中**未被修复**。报告者明确表示 Codex 无法访问本地文件、无法运行命令，等于桌面端功能完全瘫痪。

**4. [#47577](https://github.com/openai/codex/issues/47577) — `@codex review` 静默忽略来自 fork 的 PR｜11 评论 · 33 👍**
全站 👍 最高的 Issue。同仓库分支的 PR 审查正常，fork PR 则无审查、无评论、无 reaction。报告者指出该能力自 2026-09-20 起失效——这是**开源协作场景的刚需**，对 OSS 维护者影响极大。

**5. [#51932](https://github.com/openai/codex/issues/51932) — 26.1002.7124.0 sandbox runtime 读/执行校验失败｜14 评论**
属于沙箱回归集群的最新受害者，报告质量较高（从 Windows 包清单验证版本号），进一步佐证问题并非单一构建的偶发缺陷。

**6. [#43373](https://github.com/openai/codex/issues/43373) — 受信任 Node 进程退出后 Computer Use 失效｜13 评论**
`setup refresh had errors` 导致原生 GUI API 不可用。与沙箱问题共享同一错误码，提示"setup refresh"链路可能是多类故障的公共根因。

**7. [#50538](https://github.com/openai/codex/issues/50538) — VS Code 扩展 Enter 间歇性无法提交｜9 评论**
IDE 集成路径上的高频交互故障，直接打断编码心流。对以 VS Code 为主入口的用户而言，其体感优先级高于多数崩溃类问题。

**8. [#38745](https://github.com/openai/codex/issues/38745) — 启动后严重鼠标卡顿，开关宠物浮层可恢复｜7 评论**
典型的渲染/合成层性能泄漏，且报告者已给出**可复现的临时绕过方案**（打开再关闭 avatar overlay）。这类"有 workaround 但未修复"的问题容易在社区内持续发酵。

**9. [#52033](https://github.com/openai/codex/issues/52033) — `node_repl.exe` 运行时校验 ERROR 32｜6 评论**
把沙箱回归的具体落点缩小到 `node_repl` 工具链上，为定位提供了有价值的线索：受影响的正是 Codex 自带的 Node 运行时校验环节。

**10. [#47310](https://github.com/openai/codex/issues/47310) — Astra 反复将良性防御性代码审查误判为网络安全内容｜6 评论**
安全策略与正常开发工作流的冲突：开发者被 `This content can't be shown` 阻断。随着安全审查日趋严格，这类**误报对信任度的侵蚀**值得警惕。

> 其他值得留意的同期 Issue：[#49234](https://github.com/openai/codex/issues/49234)（Windows 全命令失败，6 👍）、[#28480](https://github.com/openai/codex/issues/28480)（iOS 远程加载长会话超时且无重试）、[#52262](https://github.com/openai/codex/issues/52262) / [#52328](https://github.com/openai/codex/issues/52328) / [#52324](https://github.com/openai/codex/issues/52324)（沙箱集群新增案例）、[#50843](https://github.com/openai/codex/issues/50843)（远程上下文压缩连续失败）、[#44111](https://github.com/openai/codex/issues/44111)（请求恢复项目级 "Always allow"）。

---

## 四、重要 PR 进展（10 条）

> 说明：本批 PR 均由 `copyberry[bot]` 提交、状态均为 CLOSED、评论数据缺失，呈现为**内部变更的自动化投影 / 镜像**，而非社区外部贡献。以下按技术价值筛选。

**1. [#52302](https://github.com/openai/codex/pull/52302) — 代理沙箱会话的可选凭证掩码**
新增默认关闭的 `features.credential_masking` 开关，通过已启用的网络代理实现凭证代理（credential brokerage），同时保留自定义凭证提供方与管理配置的优先级。是沙箱安全模型的重要扩展。

**2. [#52250](https://github.com/openai/codex/pull/52250) — Guardian 对 orchestrator connector 身份的信任开关**
新增 `guardian_trust_orchestrator_connectors`（默认关闭）。启用后，Guardian V2 将来自宿主插件服务编排器的非空 ID connector 视为可信来源。安全边界与可扩展性的权衡点。

**3. [#52274](https://github.com/openai/codex/pull/52274) — 为 Guardian 审查与后台评分增加结构化追踪**
引入带 review / thread / turn / tool-call 标识的 debug span，并记录重试调度（失败详情、尝试上限、退避、剩余额度）。直接提升审批链路的可观测性。

**4. [#52245](https://github.com/openai/codex/pull/52245) — 只读工具并行执行**
允许技能列举/读取、记忆列举/读取/搜索、会话历史检索等只读工具并行执行，解决此前它们因占用独占调度锁而互相排队的问题。对多工具协作场景是明显的时延优化。

**5. [#52268](https://github.com/openai/codex/pull/52268) — 保留已执行工具调用中的大参数**
移除直接调用与 Code Mode 下 8 KiB / 32 KiB 的参数与输出截断限制，避免元数据本可容纳却被硬性裁剪。对长文件、大 diff 类工具调用体验改善显著。

**6. [#52235](https://github.com/openai/codex/pull/52235) — gRPC code-mode 会话在 missing-session 后恢复**
当宿主拒绝未知 session（含 `Execute` 场景）而 lease 流仍开启时，主动失效该会话绑定以允许后续执行恢复，修复了一处卡死态。

**7. [#52234](https://github.com/openai/codex/pull/52234) — exec-server WebSocket 握手支持 request ID**
为 `environment/add` 增加可选 `websocketRequestId`，在直连 WebSocket 升级（含重连）时以 `X-Request-ID` 发送，并要求安全传输或回环目标。提升请求可追踪性与重连可靠性。

**8. [#52278](https://github.com/openai/codex/pull/52278) — 关闭 analytics 时仍尊重自定义 OTLP metrics exporter**
修正了"禁用 OpenAI 分析即同时禁用用户自配 OTLP 采集器"的耦合缺陷，使企业可独立导出指标。对合规与自建可观测体系的企业用户有实际价值。

**9. [#52273](https://github.com/openai/codex/pull/52273) — TUI 可配置的持久 leader 快捷键**
新增 `tui.keymap.global.leader`（默认 `ctrl-x`）与 `leader c` 这类符号化绑定，默认前缀会让位于既有自定义快捷键。终端重度用户的操作效率改进。

**10. [#52241](https://github.com/openai/codex/pull/52241) — 子代理能力独立于 fork 历史保留**
无论 `fork_turns` 为 `none` 还是 `all`，子代理都应继承派生轮次所选技能与插件；能力选择不再依赖被复制的会话元数据。修复了子代理能力丢失的语义错误。

> 其他同批变更：[#52277](https://github.com/openai/codex/pull/52277)（域名通配符按 UTF-8 字节语义匹配）、[#52325](https://github.com/openai/codex/pull/52325)（Responses turn metadata 记录 history_initialization）、[#52304](https://github.com/openai/codex/pull/52304)（远程控制 RPC 偏好持久化到托管守护进程）、[#52299](https://github.com/openai/codex/pull/52299)（Bazel 发布任务降级为 advisory，Cargo 仍为发布主路径）、[#52295](https://github.com/openai/codex/pull/52295)（命名空间增量更新合并为单条开发者通知）、[#52270](https://github.com/openai/codex/pull/52270)（全屏 TUI footer 支持文本选择复制）、[#52329](https://github.com/openai/codex/pull/52329)（移除 per-content 来源归属元数据）。

---

## 五、功能需求趋势

从本轮 47 条 Issue 中可提炼出以下方向：

| 趋势方向 | 代表 Issue | 社区诉求强度 |
|---|---|---|
| **Windows 沙箱 / 权限模型稳定性** | #51601、#51778、#51932、#52033、#52262、#52328 | 🔥🔥🔥🔥🔥 压倒性 |
| **跨端与远程会话可靠性** | #28480（iOS）、#49209（macOS Remote）、#49456（输入队列卡死）、#50843（远程压缩失败） | 🔥🔥🔥🔥 |
| **代码审查自动化（尤其 fork 场景）** | #47577（33 👍） | 🔥🔥🔥🔥 |
| **IDE 集成体验** | #50538（VS Code Enter）、#52324（VS Code 扩展沙箱） | 🔥🔥🔥 |
| **权限授权粒度与可配置性** | #44111（项目级 Always allow）、PR #52302（凭证掩码） | 🔥🔥🔥 |
| **桌面端 UI / 窗口管理** | #25826（多显示器）、#52318（窗口消失重开）、#52300（聊天不刷新） | 🔥🔥🔥 |
| **性能与资源占用** | #38745（鼠标卡顿）、#52091（CrBrowserMain SIGTRAP，约 7800 条/秒 inactive-window resume） | 🔥🔥🔥 |
| **模型行为与安全策略误判** | #47310（Astra 拦截防御性审查）、#48939（Pro 档回答异常快且质量下降） | 🔥🔥 |
| **可观测性与自建遥测** | PR #52274、#52278 | 🔥🔥（来自内核侧而非社区） |
| **多模态内容渲染** | #26187（生成图片显示为破损占位符） | 🔥🔥 |

---

## 六、开发者关注点

1. **沙箱自锁是当前最大痛点，且带有系统性特征。** 多个 Issue 指向同一根因模式：Codex 在 ACL / 运行时校验阶段校验自身正在使用的 `node_repl.exe` 等文件，触发 Windows `ERROR 32`。表现为"应用一开就全废、关掉桌面端反而能用"（#52328），这意味着**问题可稳定复现且容易定位**，但已跨越至少三个构建版本（26.1002.51308 → 52244 → 7124.0）未获修复，社区耐心正在消耗。

2. **错误信息不透明加剧了排查成本。** `helper_unknown_error: setup refresh had errors` 这条无上下文的提示贯穿 #43373、#49234、#52262、#52317 等多个 Issue。开发者被迫自行拼凑环境信息（有的明确写出"无法收集 OS 版本，因为本地命令本身就不可用"），反映出**故障状态下的自诊断能力缺失**。

3. **长会话是脆弱环节。** 远程上下文压缩失败（#50843）、输入长期滞留队列（#49456）、iOS 远程加载超时且**无重试路径**（#28480）、macOS 远程项目名不显示（#49209）——四条独立问题共同勾勒出"会话越长、跨端越多、越容易断且越难恢复"的画像。

4. **权限交互出现回退，社区要求更细粒度控制。** #44111 指出"Always allow / 不再询问"选项在较新版本中消失；与之呼应，内核侧 PR #52302 正在构建更精细的凭证掩码机制。**UI 简化与专业用户效率诉求之间存在明显张力**。

5. **性能问题高度集中在非核心路径。** 鼠标卡顿由宠物/avatar 浮层引发（#38745），macOS 上约每秒 7800 条 inactive-window resume 消息引发反复 SIGTRAP 崩溃（#52091），多显示器窗口管理错位（#25826）。这些不影响"能不能用"，但持续损害**日常使用的流畅感与专业形象**。

6. **自动化审查的双向不信任。** 一边是 fork PR 完全不被审查（#47577，33 👍），一边是良性防御性代码被安全策略误拦（#47310）。社区真正需要的是**可预期、可解释、可申诉的审查行为**，而非在"漏审"与"误杀"之间摇摆。

---

*注：本日报基于 GitHub 公开数据自动汇总，Issue 与 PR 的评论数、点赞数为抓取时快照；Release notes 存在截断，完整内容请以官方页面为准。*

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 · 2026-10-09

> 数据来源：[github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)（过去 24 小时）

---

## 一、今日速览

今日社区重心明显偏向 **Agent/Subagent 的可靠性**：P1 级 issue 集中在子代理挂起、误报成功、配置不生效等"静默失败"问题上，累计讨论量最高。同时 PR 侧出现多组**安全加固与上下文膨胀修复**并行的局面，其中 shell wrapper 绕过与 `truncateString` 分别出现了重复提交，需要维护者去重。夜间版本 v0.65.0-nightly 继续以 CI 与 core 请求规范化修复为主。

---

## 二、版本发布

**v0.65.0-nightly.20261008.g44d764ee5**（nightly）
- `fix(ci)`：为 unassign-inactive-assignees workflow 补上缺失的循环逻辑（[#29609](https://github.com/google-gemini/gemini-cli/pull/29609)）
- `fix(core)`：强制 terminal user turn 不变量，并规范化请求内容

属于常规 nightly 维护版本，无面向用户的功能变更。

---

## 三、社区热点 Issues（精选 10 条）

1. **[#22323] Subagent 达到 MAX_TURNS 却被上报为 GOAL 成功**（P1 / 13 评论 / 👍2）
   `codebase_investigator` 在自述"已达最大轮次、未做任何分析"的情况下仍返回 `status: success`、`Termination Reason: GOAL`，把中断伪装成成功。这是最典型的**可观测性缺陷**，会误导下游自动化判断。
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **[#21409] Generalist agent 永久挂起**（P1 / 8 评论 / 👍8）
   一旦 CLI 转交给 generalist agent 就无限卡住（连建目录都挂），用户等待长达一小时。社区点赞数最高的 issue，直接阻断工作流。
   https://github.com/google-gemini/gemini-cli/issues/21409

3. **[#19873] 借助零依赖 OS 沙箱 + 执行后意图路由，释放模型的 bash 亲和性**（P2 / 9 评论）
   主张 Gemini 3 原生擅长 POSIX 工具链（grep/cat/sed/awk），应以沙箱而非限制的方式发挥其能力。属于 agent 架构层面最有分量的方向性提案。
   https://github.com/google-gemini/gemini-cli/issues/19873

4. **[#22745] 评估 AST-aware 文件读取、搜索与代码库映射的影响**（P2 / 7 评论 / EPIC）
   目标是用 AST 精确读取方法边界，减少错位读取带来的轮次与 token 噪声。是提升 agent 效率的长期主线。
   https://github.com/google-gemini/gemini-cli/issues/22745

5. **[#21968] Gemini 几乎不会主动使用 skills 和 sub-agents**（P2 / 7 评论）
   用户反馈只有在显式指令下才会调用自定义 skill/子代理，即使任务高度相关也不触发。这直接关系到扩展生态的价值兑现。
   https://github.com/google-gemini/gemini-cli/issues/21968

6. **[#21983] browser 子代理在 Wayland 下失败**（P1 / 4 评论 / 👍1）
   在 Wayland 会话中 browser subagent 直接以 `Termination Reason: GOAL` 结束但实际未完成，Linux 桌面用户受阻。
   https://github.com/google-gemini/gemini-cli/issues/21983

7. **[#22267] Browser Agent 完全忽略 settings.json 覆盖配置**（P2 / 4 评论）
   `AgentRegistry` 已正确合并配置，但 Browser Agent 不读取 `maxTurns` 等覆盖项，暴露 agent 配置链路的不一致。
   https://github.com/google-gemini/gemini-cli/issues/22267

8. **[#24246] 工具数超过 128 个时触发 400 错误**（P2 / 3 评论）
   期望 agent 能更聪明地收窄启用工具范围，而不是把全部工具塞进请求。对安装了大量 MCP/extensions 的用户影响明显。
   https://github.com/google-gemini/gemini-cli/issues/24246

9. **[#22672] Agent 应阻止/劝阻破坏性操作**（P2 / 3 评论 / 👍1）
   复杂 git 场景下模型倾向使用 `git reset`、`--force` 等危险命令，数据库等资源修改同样缺乏风险提示。安全护栏类需求。
   https://github.com/google-gemini/gemini-cli/issues/22672

10. **[#22741] 允许本地子代理后台化运行（Ctrl+B）**（P3 / 👍2）
    探索、构建、lint 等非阻塞任务目前会占用前台，社区希望能一键转入后台。属于高频期待的交互增强。
    https://github.com/google-gemini/gemini-cli/issues/22741

> 其他值得留意的：**[#22186] get-shit-done 输出 hook 导致崩溃**（P1）、**[#23571] 模型在随机目录生成临时脚本污染工作区**、**[#22598] 子代理轨迹应可通过 `/chat share` 查看**（可观测性）、**[#18836] 用持久化文件任务跟踪替换 WriteToDo**（应对 context rot）。

---

## 四、重要 PR 进展（精选 10 条）

1. **[#29582] perf(core)：优化 ignore 过滤并启用子树剪枝**（P1 / size L）
   通过目录级状态记忆化、通配符目录模式展开剪枝与 symlink/realpath 内存缓存，解决大型仓库上多秒级阻塞。性能类最关键的修复。
   https://github.com/google-gemini/gemini-cli/pull/29582

2. **[#29683] fix(a2a-server)：顺序批次中将工具拒绝隔离到当前调用**（P1 / size L）
   此前拒绝单个文件修改会让整批顺序工具调用一起失败，现改为仅作用于活跃调用。
   https://github.com/google-gemini/gemini-cli/pull/29683

3. **[#29688] fix(core)：阻止通过 shell wrapper 中间标志绕过命令替换防护**（area/security）
   修复 `stripShellWrapper()` 在 `-c` 前存在中间/链式标志时无法识别包装器、进而绕过命令替换守卫的问题。安全相关，建议优先合入。
   https://github.com/google-gemini/gemini-cli/pull/29688

4. **[#29476] fix(cli)：修复交互模式下回车键导致挂起**（P1）
   将用户确认事件发布与 IDE companion 集成解耦，解决集成终端中按 Enter 审批文件编辑无响应的问题（#23297）。
   https://github.com/google-gemini/gemini-cli/pull/29476

5. **[#29678] fix(cli)：在解析 settings 占位符前加载环境变量**（P2）
   修复 `_doLoadSettings` 与 `loadEnvironment` 的加载顺序竞态——`.env` 未载入时占位符已被展开校验，导致配置失效。
   https://github.com/google-gemini/gemini-cli/pull/29678

6. **[#29457] fix(core)：用 glob 匹配替换 read-many-files 中的模糊匹配**（P1 / size XL，已关闭）
   修掉因 `String.includes()` 模糊子串匹配把图片/PDF/音频当作"显式请求"而读入的严重上下文膨胀问题（#29045）。
   https://github.com/google-gemini/gemini-cli/pull/29457

7. **[#29459] fix(cli)：将取消信号传播进 shell 命令注入**（P1，已关闭）
   `!{...}` 注入此前使用全新的 AbortController，调用方取消无法传递、命令挂死也无法终止。
   https://github.com/google-gemini/gemini-cli/pull/29459

8. **[#29674] fix(vscode-ide-companion)：MCP 会话打开时 IdeServer.stop() 无法返回**（已关闭）
   原实现 `await http.Server.close()` 会等待长连接排空，导致 CLI 连接 VS Code companion 时无法正常关闭。
   https://github.com/google-gemini/gemini-cli/pull/29674

9. **[#29578] fix(mcp)：为 Google 端点请求 offline access 并在刷新时保留 clientSecret**
   修复对接 Google Workspace API 的远程 MCP 服务器首次登录拿不到 refresh token、后台刷新失败的问题。
   https://github.com/google-gemini/gemini-cli/pull/29578

10. **[#29643] fix(cli)：重新选择 Google 登录时清除缓存凭据**
    让用户能切换 Google 账号或重新认证，而不是被锁死在过期 token 上。
    https://github.com/google-gemini/gemini-cli/pull/29643

> 另有两组**重复提交**值得维护者处理：[#29684](https://github.com/google-gemini/gemini-cli/pull/29684) 与 #29688 针对同一 shell wrapper 绕过；[#29563](https://github.com/google-gemini/gemini-cli/pull/29563) 与 [#29673](https://github.com/google-gemini/gemini-cli/pull/29673) 均修复 `truncateString` 丢失行终止符。

---

## 五、功能需求趋势

从本批 49 条 issue 的标签分布与内容看，社区关注方向高度集中在五条主线：

| 方向 | 代表 Issue / PR | 趋势判断 |
|---|---|---|
| **Agent / Subagent 可靠性** | #22323、#21409、#21983、#22267 | 最热主线，问题从"能否工作"转向"失败是否被正确暴露" |
| **上下文与 Token 效率** | #22745、#22746、#22747、#19561、#29457 | AST-aware 读取 + 精准提取成为系统性方案，而非零散优化 |
| **安全与破坏性操作护栏** | #22672、#19873、#29688、#29672 | 一边收紧命令执行绕过，一边消除安全误报导致的确认中断 |
| **多代理协作与可观测性** | #22598、#22741、#18287、#21763 | 子代理轨迹可见、后台化、并行协作开始进入产品化清单 |
| **平台兼容与 IDE 集成** | #21983（Wayland）、#21924（resize 闪烁）、#29476/#29674（VS Code companion） | 终端渲染与 IDE 联动是长期短板 |

值得注意的是，本批高优先级 issue 中有相当比例由 maintainer 自己创建（如 `@gundermanc`、`@abhipatel12`、`@anj-s`、`@jacob314`），并带有 `workstream-rollup` 标签，说明 Agent 质量与上下文效率已被列入官方内部工作流，而非仅社区诉求。

---

## 六、开发者关注点

1. **静默失败比崩溃更致命**：子代理挂起（#21409）、误报 GOAL 成功（#22323、#21983）、bug report 不含子代理上下文（#21763）构成一条完整的可观测性缺口——用户无法判断任务是真的完成还是已经死掉。

2. **配置不生效的信任问题**：Browser Agent 忽略 `settings.json`（#22267）、环境变量加载顺序竞态（#29678）表明配置链路存在多处不一致，用户"改了没用"的体验会直接侵蚀对工具的信任。

3. **上下文膨胀仍是首要性能成本**：从 `read-many-files` 误读二进制（#29457）到"36.6k tokens/轮"的基线（#19561），再到大型仓库的多秒阻塞（#29582），token 与 I/O 效率是开发者感知最强的痛点。

4. **Agent 主动性不足**：skills 与 sub-agents 几乎不被自主调用（#21968），与官方"多代理协作"路线图形成落差，扩展生态的投入产出比因此打折。

5. **安全与效率的两难**：一边是命令替换守卫被绕过（#29688），一边是无害 POSIX 标志触发误报中断（#29672）——社区需要的是"精准的护栏"，而非简单的收紧或放宽。

---

*本日报由 AI 工具链自动汇总生成，数据截止 2026-10-08 更新。*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报

**日期：2026-10-09** ｜ 数据来源：[github.com/esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)

---

## 一、今日速览

Reasonix 在过去 24 小时内连发 Studio v2.31.0 与 v2.32.0 两个版本：前者带来首个**原生 Windows ARM64** 构建与运行时保持唤醒能力，后者让**可开关图标栏**回归并新增版本更新内容内联阅读。社区侧，安全 RFC（MCP 工具定义固定）与 Windows 放置压缩文件崩溃问题最受关注；PR 流则以**大量 TUI 键位向 1.x 行为对齐**为主线，同时推进手机配对持久化、写租约模式化等能力。

---

## 二、版本发布

### studio-v2.32.0 — Reasonix Studio v2.32.0（[发布页](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.32.0)）
**新增**
- **图标栏回归且可开关**：设置 → 外观新增「显示图标栏」，默认开启、立即生效；手机宽度下自动隐藏，加宽窗口后恢复用户选择（[#12377](https://github.com/esengine/DeepSeek-Reasonix/issues/12377)）
- **版本页内联「更新内容」**：点击即在版本行内阅读该版本说明，从本版起发布的版本会附带说明，首次查看后缓存本机（[#12404](https://github.com/esengine/DeepSeek-Reasonix/issues/12404)、[#12406](https://github.com/esengine/DeepSeek-Reasonix/issues/12406)）

**修复**
- 删除侧栏中被折叠的会话行时，同步删除其隐藏的恢复副本，避免"删完又被顶上来"的错觉（[#12372](https://github.com/esengine/DeepSeek-Reasonix/issues/12372)）
- 修复旧版 Reasonix 导入、队列、子代理显示等问题

### studio-v2.31.0 — Reasonix Studio v2.31.0（[发布页](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.31.0)）
**新增**
- **首个原生 Windows ARM64 版**：提供 ARM64 安装程序与便携 zip，外壳与内核均为 ARM64，不再依赖 x64 模拟；ARM64 按自身平台更新（增量更新暂仅 x64，ARM64 会下载完整安装包）（[#12272](https://github.com/esengine/DeepSeek-Reasonix/issues/12272)、[#12286](https://github.com/esengine/DeepSeek-Reasonix/issues/12286)、[#12270](https://github.com/esengine/DeepSeek-Reasonix/issues/12270)）
- **任务运行期间保持电脑唤醒**：设置 → 外观 → 「窗口」新增开关，默认开启，仅阻止系统空闲睡眠；合盖行为仍由系统决定，后台作业不计入
- 反馈面板新增等级显示

**修复**：链接标签、压缩、队列重试、钩子放行等问题。

### CLI 归档
- `v2.32.0`、`v2.31.0` 两个 CLI 归档版本基于对应的 Studio 版本构建（[v2.32.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.32.0)、[v2.31.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.31.0)）

---

## 三、社区热点 Issues

> 过去 24 小时内更新的 Issue 共 **8 条**，以下为全部条目。

1. **[[Bug] 放置压缩格式文件会崩溃](https://github.com/esengine/DeepSeek-Reasonix/issues/12412)** — `#12412` OPEN ｜ 4 评论 ｜ Windows 11
   拖入压缩文件即**无提示崩溃**，属最高优先级稳定性问题（tag: bug/desktop/windows/crash/v3）。评论数最多，说明可复现性引发多人跟进。

2. **[[RFC] 在审批时固定 MCP 工具定义，变更需用户确认](https://github.com/esengine/DeepSeek-Reasonix/issues/12356)** — `#12356` OPEN ｜ 3 评论
   首次授权某 MCP 服务器工具时记录其定义摘要，之后若定义发生**任何变更即视为安全事件**，变更/新增工具默认不进入目录，需用户显式接受。这是对 MCP 供应链攻击面的直接回应，安全价值高。

3. **[[Bug] 图标栏位置与交互方式](https://github.com/esengine/DeepSeek-Reasonix/issues/12427)** — `#12427` OPEN ｜ 2 评论 ｜ v2.32.0
   用户建议图标栏应置于侧栏最左侧、侧栏展开时隐藏、收起时显示，并指出「发送反馈」图标未出现在图标栏中。属于新功能发布后的快速体验反馈。

4. **[[Studio feedback] 希望在文件管理器中直接点击打开 HTML 文件](https://github.com/esengine/DeepSeek-Reasonix/issues/12434)** — `#12434` CLOSED ｜ 1 评论
   来自 Studio 内反馈（回执 FB-3F53-V6Q0），反映当前在侧边栏工作台打开 HTML 很不方便。

5. **[[Studio feedback] 希望在工作台侧边栏直接打开 HTML 并告知 AI 修改点（类似 MIMO 桌面端）](https://github.com/esengine/DeepSeek-Reasonix/issues/12431)** — `#12431` OPEN ｜ 1 评论
   同一用户（回执 FB-15VP-WWYB）提出的进阶诉求：不仅打开，还要能与 AI 联动修改。与上一条合并看，HTML/预览类工作流是明确的缺口。

6. **[[Enhancement] 用户消息附件应为结构化字段，而非仅 `@path` 文本](https://github.com/esengine/DeepSeek-Reasonix/issues/12441)** — `#12441` OPEN ｜ 0 评论
   目前图片预览靠匹配宿主自己写入的 `@.reasonix/attachments/clipboard-*` 令牌实现，虽然不靠猜测散文，但仍属**约定式识别**。提出把附件提升为消息的结构化字段，是从"能跑"到"语义正确"的架构级改进。

7. **[[Research] Daily research 2026-10-09](https://github.com/esengine/DeepSeek-Reasonix/issues/12433)** — `#12433` OPEN ｜ 0 评论
   近一周（2026-10-02 ~ 10-08）的研究报告，明确仅限研究与报告，不产出构建物。代码结论基于 `studio` 分支 `d779d89` 的 depth-20 克隆，可作为了解项目技术依据的入口。

8. **[[CLOSED] 回退已发送消息时应把文本放回输入框](https://github.com/esengine/DeepSeek-Reasonix/issues/11902)** — `#11902` CLOSED ｜ 0 评论
   2.27.0 反馈：从队列撤回消息已能恢复到输入框，但 **rewind（重绕会话）路径缺失该行为**，用户期望回退后可编辑重发。已于 2026-10-08 关闭，对应 PR #11589 相关工作。

---

## 四、重要 PR 进展

> 过去 24 小时内更新的 PR 共 **50 条**，以下挑选 10 条最具代表性。

1. **[#12440] feat(serve): 手机配对跨重启保留 + 设置开关**（OPEN）
   `[serve] remember_paired_devices` 默认 **false**，开启后已配对手机在 Studio 重启后仍保持配对，并在手机访问面板提供开关（Fixes #11834，Refs #11878）。
   https://github.com/esengine/DeepSeek-Reasonix/pull/12440

2. **[#12068] feat(serve): 跨重启保留配对的 opt-in 开关（已关闭，被 #12440 承接）**（CLOSED）
   同一能力的早期实现，因 #11878 范围不含 LAN 配对持久化而单独发版，现已被 #12440 取代/推进。
   https://github.com/esengine/DeepSeek-Reasonix/pull/12068

3. **[#12417] feat(config): 单一写租约设置，三种模式**（OPEN）
   `[agent] write_lease` 定义跨会话写租约的覆盖范围：`strict`（现状默认）、`optimistic`、`off` 为新增选项，面向写范围可能重叠的多会话场景（Fixes #12052，Refs #11531）。
   https://github.com/esengine/DeepSeek-Reasonix/pull/12417

4. **[#11589] fix(studio): 从后端恢复撤销入口并持久化撤销失效状态**（OPEN）
   把后端作为撤销可用性的**唯一真相来源**，覆盖仅代码、仅会话、代码+会话三种 rewind 组合，而非此前的仅代码路径。
   https://github.com/esengine/DeepSeek-Reasonix/pull/11589

5. **[#12437] fix(tui): Ctrl+Enter 引导正在运行的回合**（OPEN）
   `docs/GUIDE.md` 明确列出 `Ctrl+Enter` / `/steer <text>`，但 2.x TUI 未绑定；此 PR 恢复 1.x 的回合中持续 steer 能力。
   https://github.com/esengine/DeepSeek-Reasonix/pull/12437

6. **[#12436] fix(tui): 无选中时右键粘贴剪贴板文本**（OPEN）
   2.x 在开启应用内鼠标捕获后，右键只在有选区时复制、否则无动作；1.x 在无选区时粘贴剪贴板文本，此 PR 补齐。
   https://github.com/esengine/DeepSeek-Reasonix/pull/12436

7. **[#12435] fix(tui): 历史回溯可越过跨多行条目**（OPEN）
   2.x 仅在输入框单行时支持上下键回溯；一旦召回条目为多行，Up 移到首行后即失效，导致更早历史无法访问。
   https://github.com/esengine/DeepSeek-Reasonix/pull/12435

8. **[#12288] feat(studio): 点击标题栏文件夹标记打开项目文件夹**（OPEN）
   将项目名旁的文件夹图标从纯装饰变为按钮，调用平台文件管理器打开当前焦点窗格的项目目录（Fixes #12007）。
   https://github.com/esengine/DeepSeek-Reasonix/pull/12288

9. **[#12429] fix(studio): 解释 Internet device access 不可用的原因**（OPEN）
   把远程云主机保留的真实失败原因（登出 / 中继不可达 / 中继拒绝）以类型化方式传到设备面板并本地化渲染，不再解析错误文本。
   https://github.com/esengine/DeepSeek-Reasonix/pull/12429

10. **[#12332] fix(studio): 在用户消息中预览已保存的图片附件**（OPEN）
    让 `UserCard` 通过现有工作区图片端点投影 `@.reasonix/attachments/clipboard-…` 引用，并改善图片加载失败的表现（Refs #11639）。与 Issue #12441 的结构化附件提案直接相关。
    https://github.com/esengine/DeepSeek-Reasonix/pull/12332

**其他值得一看的 TUI 键位对齐批次（多已关闭）**：
[#12421](https://github.com/esengine/DeepSeek-Reasonix/pull/12421) MCP 管理器支持 q/h/l 与左右键 ｜ [#12420](https://github.com/esengine/DeepSeek-Reasonix/pull/12420) 问答卡支持 j/k/h/l ｜ [#12419](https://github.com/esengine/DeepSeek-Reasonix/pull/12419) 审批卡支持 j/k 与 Ctrl+N/P

**Studio 细节修复**：
[#12411](https://github.com/esengine/DeepSeek-Reasonix/pull/12411) 队列编辑选择竞态（A 的异步读取覆盖 B 的草稿）｜ [#12423](https://github.com/esengine/DeepSeek-Reasonix/pull/12423) 截图归属反馈草稿 ｜ [#12439](https://github.com/esengine/DeepSeek-Reasonix/pull/12439) 环境提交后焦点落入正文 ｜ [#12405](https://github.com/esengine/DeepSeek-Reasonix/pull/12405) 标记来自 1.x store 的会话行

---

## 五、功能需求趋势

1. **TUI 与 1.x 行为全面对齐（当日最大主题）**
   本日 PR 中至少 6 条集中在终端 UI 键位：`Ctrl+Enter` steer、右键粘贴、多行历史回溯、MCP 管理器 `q/h/l`、问答卡 `j/k/h/l`、审批卡 `j/k` 与 `Ctrl+N/P`。指向一个共性判断：**2.x TUI 重写后丢失了大量 1.x 的肌肉记忆型交互**，社区与维护者正在系统性回补。

2. **文件/工作台集成与预览能力**
   HTML 文件在工作台侧边栏的打开体验被同一用户在两条反馈中重复提出（#12434、#12431），并提出"打开后能直接告诉 AI 改哪里"的 MIMO 式联动。加上 #12288（点击 chrome 文件夹标记打开项目目录），**"编辑器/文件管理器 → AI 上下文"的路径打通**是当前最清晰的功能缺口。

3. **安全边界与信任模型**
   #12356（MCP 工具定义 pinning）与 #12417（写租约三模式）分别从**外部工具供应链**与**内部并发写入**两个方向收紧信任。这类提案多由维护者 `@esengine` 本人发起，说明安全设计正从被动修复转向制度化。

4. **跨设备与移动端体验**
   #12440 / #12068 围绕"扫码配对的手机在重启后是否还记得"反复迭代，默认值刻意设为 false（opt-in）。移动端作为远程入口，其**持久化与再连接体验**正在被认真对待。

5. **附件与消息的结构化建模**
   #12441 提出附件不应只是 `@path` 文本约定，而应为结构化字段；#12332 的图片预览实现正是靠匹配该约定令牌。二者构成"先跑通、再重构"的典型演进路径。

6. **平台覆盖扩展**
   studio-v2.31.0 落地原生 Windows ARM64（外壳+内核均为 ARM64），但增量更新暂仅 x64 提供——**ARM64 的分发与更新链路**仍是不完整状态，预计后续还会迭代。

---

## 六、开发者关注点

- **崩溃优先于一切**：#12412 中"拖入压缩文件即崩溃"是当日唯一带 crash 标签且评论最多的 Issue，且发生在 Studio 主分支（v3 开发线）。文件类型输入校验与异常兜底是刚需。
- **状态一致性焦虑**：会话删除（#12372 折叠行删除残留）、rewind 后撤销入口（#11589）、rewind 后文本回填（#11902）、队列编辑竞态（#12411）、截图归属草稿（#12423）——大量问题本质都是**"界面显示的状态 ≠ 后端真实状态"**。维护者的应对思路也一致：让后端成为唯一真相来源、把异步竞态显式化。
- **新功能发布后的即时体验反噬**：v2.32.0 图标栏刚回归，#12427 当天就提出位置与显隐逻辑的重构建议（移到最左侧、展开时隐藏、反馈图标缺失）。说明图标栏的**默认布局假设与用户直觉存在偏差**。
- **文档与实现脱节**：多个 TUI PR 明确引用 `docs/GUIDE.md`、`docs/CLI.md` 中已写明但 2.x 未实现的行为，属于**文档先行、实现欠账**。
- **测试可靠性被显式修复**：#12438 指出测试中 `kernel().emit` 早于窗格订阅注册，导致断言时序不稳。这类基础设施级修复虽不显眼，但对后续 TUI 键位批量改动是必要前提。
- **反馈闭环运转良好**：Studio 内反馈经 `github-actions[bot]` 自动转为 Issue（#12431、#12434 带 receipt 编号），且同一诉求短期内被重复提交——**说明存在真实且未被满足的用户工作流**，而非偶发抱怨。

---

*本日报基于 GitHub 公开数据自动整理，时间窗口为 2026-10-08 至 2026-10-09。*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 — 2026-10-09

## 今日速览
过去 24 小时无新 Release。社区焦点集中在**会话生命周期与数据持久化**：idle eviction、sidecar 不写库、回滚误伤共享工作树等问题讨论集中。与此同时，v2 认证/配置迁移、Gemini/OpenAI-compatible 模型兼容和 Zen 计费额度仍有高热度反馈，多个高优问题已有 PR 跟进，如 [#54031](https://github.com/anomalyco/opencode/pull/54031)、[#54030](https://github.com/anomalyco/opencode/pull/54030)、[#54023](https://github.com/anomalyco/opencode/pull/54023)。

## 社区热点 Issues

1. **[#14273](https://github.com/anomalyco/opencode/issues/14273) [CLOSED] Zen 免费模型误报 “Free usage exceeded”**  
   使用 Kimi K2.5 / MiniMax2.5 免费版时提示额度超限，但用户 Zen 账户仍有 3 美元余额。涉及 Zen 计费/额度判断，影响免费模型可用性与信任。社区反应最强：42 条评论、2 👍，已关闭但仍为今日最高热度。

2. **[#51343](https://github.com/anomalyco/opencode/issues/51343) [OPEN] 60 分钟 idle location eviction 中断运行中会话**  
   长时间无持久事件的会话会在 Location 过期后被驱逐， parked 在 question 状态的任务尤其容易受影响。属于核心会话生命周期缺陷，可能丢失长任务上下文。9 评论、6 👍，是今日最高赞 Issue。

3. **[#45856](https://github.com/anomalyco/opencode/issues/45856) [OPEN] v2 serve 配置 Basic Auth 始终返回 401**  
   `OPENCODE_SERVER_USERNAME` / `OPENCODE_SERVER_PASSWORD` 提供的凭证被拒绝，浏览器陷入无限登录提示。阻碍 v2 serve 在固定认证环境中的部署。6 条评论。

4. **[#53991](https://github.com/anomalyco/opencode/issues/53991) [OPEN] [reproduced] NUL-byte project ID 破坏项目解析并阻塞 TUI 模型选择**  
   项目 ID 含 NUL 字节后，`Project.fromDirectory` 报 `ERR_INVALID_ARG_VALUE`，且 `migrateProjectId` 无法自修复。已有修复 PR [#54030](https://github.com/anomalyco/opencode/pull/54030)。4 条评论。

5. **[#51020](https://github.com/anomalyco/opencode/issues/51020) [OPEN] v2 sidecar 启动后 message/part 静默不写入数据库**  
   LLM 请求仍发出，`session_v2` 行也更新，但消息与片段持久化失败，会话看起来未保存。属于 v2 桌面数据持久化严重缺陷。3 条评论。

6. **[#54026](https://github.com/anomalyco/opencode/issues/54026) [OPEN] [reproduced, severity:high] 回滚消息恢复整个工作树，丢弃其他会话未提交修改**  
   回滚未限定到被回滚消息改动的文件，而是恢复整个共享工作树，存在数据丢失风险。已复现，标记高危。

7. **[#54025](https://github.com/anomalyco/opencode/issues/54025) [OPEN] OpenAI-compatible 自定义提供商间歇 400：tool call arguments 必须为 JSON 对象**  
   长工具会话中最新 tool-call 参数以非对象形式发送，重试可自愈。影响自定义兼容提供商的工具调用稳定性。

8. **[#54035](https://github.com/anomalyco/opencode/issues/54035) [OPEN] 桌面端长问题文本无法滚动，回答按钮不可达**  
   多段 markdown 问题面板不滚动，发送/忽略按钮被推到可视区域外，用户无法完成回答。10-09 仍有更新，属于交互阻塞问题。

9. **[#54022](https://github.com/anomalyco/opencode/issues/54022) [OPEN] [reproduced] Nix store 安装仍提示应用内更新，接受后破坏运行中会话**  
   通过 Nix flake 安装的只读存储无法被自更新替换，接受更新后进程停止响应。影响 Nix 用户的升级路径与运行稳定性。

10. **[#54033](https://github.com/anomalyco/opencode/issues/54033) [OPEN] Gemini schema error: invalid value (TYPE_STRING), false**  
    opencode 1.18.35 使用 Gemini 模型时，工具参数 enum 类型不符合 Gemini API，导致无法通信。已有 PR [#54031](https://github.com/anomalyco/opencode/pull/54031) 尝试修复。

## 重要 PR 进展

1. **[#54031](https://github.com/anomalyco/opencode/pull/54031) fix(llm): stringify non-string gemini enum values**  
   将发送给 Gemini 的非字符串 enum 值转为字符串，并补充测试，直接针对 #54033 的 Gemini schema 错误。

2. **[#54030](https://github.com/anomalyco/opencode/pull/54030) fix(core): ignore a corrupt cached project id**  
   忽略 `.git/opencode` 缓存中的控制字节/NUL project ID，修复 #53991 导致的项目解析失败与 TUI 模型选择阻塞。

3. **[#53387](https://github.com/anomalyco/opencode/pull/53387) fix(desktop): prevent background service SIGKILL loops and tune SQLite WAL concurrency**  
   解决 Windows/高 I/O 环境下桌面端频繁杀死自身后台服务的问题，并调整 SQLite WAL 并发参数。

4. **[#54023](https://github.com/anomalyco/opencode/pull/54023) fix(core): coordinate credential refreshes across locations**  
   通过进程级 Effect 服务按凭证 ID 协调刷新，避免多个 Location 并发刷新，并确保轮换 token 在返回前持久化。

5. **[#53876](https://github.com/anomalyco/opencode/pull/53876) feat(core): continue responses after output token limits**  
   当响应因 `length` 结束时保留部分输出，并自动追加指令继续生成，减少手动续写。

6. **[#46369](https://github.com/anomalyco/opencode/pull/46369) feat(opencode): add cache-preserving compaction**  
   新增可选压缩方式，在 compaction 时保留稳定 prompt 前缀，避免破坏 prompt cache。

7. **[#51422](https://github.com/anomalyco/opencode/pull/51422) fix(core): resolve configured instructions**  
   V2 恢复旧运行时的 `instructions` 配置解析，关闭 #51341 / #51262，修复配置迁移缺口。

8. **[#53802](https://github.com/anomalyco/opencode/pull/53802) fix(core): preserve env prefixes in saved shell patterns**  
   保存 shell 模式时正确处理前导环境变量赋值，修复保存规则无法匹配的问题 #52720。

9. **[#54024](https://github.com/anomalyco/opencode/pull/54024) feat(cli): add DEB and RPM system packages for Linux**  
   为 Linux amd64 等平台增加 `.deb` 和 `.rpm` 系统包，推进更规范的发行渠道。

10. **[#54017](https://github.com/anomalyco/opencode/pull/54017) fix(session-ui): reuse complete patch diffs instead of re-diffing**  
    复用完整上下文 patch，避免在渲染线程用 Myers 算法二次 diff，优化长 diff 场景性能。

## 功能需求趋势

- **会话生命周期与稳定性**：idle eviction、server 重启、sidecar 持久化失败、回滚作用域是当前最集中方向。代表：[#51343](https://github.com/anomalyco/opencode/issues/51343)、[#51020](https://github.com/anomalyco/opencode/issues/51020)、[#54026](https://github.com/anomalyco/opencode/issues/54026)。
- **v2 迁移与部署兼容**：Basic Auth、instructions 配置解析、sidecar 消息持久化仍存在迁移缺口。代表：[#45856](https://github.com/anomalyco/opencode/issues/45856)、[#51422](https://github.com/anomalyco/opencode/pull/51422)。
- **模型/提供商兼容**：Gemini enum/schema、OpenAI-compatible tool call arguments、Zen 免费模型额度是高频阻断点。代表：[#54033](https://github.com/anomalyco/opencode/issues/54033)、[#54025](https://github.com/anomalyco/opencode/issues/54025)、[#14273](https://github.com/anomalyco/opencode/issues/14273)。
- **工作区与项目隔离**：NUL project ID、嵌套目录独立项目身份、回滚仅影响自身改动。代表：[#53991](https://github.com/anomalyco/opencode/issues/53991)、[#54034](https://github.com/anomalyco/opencode/issues/54034)。
- **桌面/TUI 体验**：长问题滚动、会话列设计、subagent 图标、footer 细节、skill slash 默认值。代表：[#54035](https://github.com/anomalyco/opencode/issues/54035)、[#54020](https://github.com/anomalyco/opencode/pull/54020)。
- **安装分发与性能**：Nix 自更新、DEB/RPM 包、SQLite WAL、diff 复用、cache-preserving compaction。代表：[#54022](https://github.com/anomalyco/opencode/issues/54022)、[#54024](https://github.com/anomalyco/opencode/pull/54024)、[#54017](https://github.com/anomalyco/opencode/pull/54017)。
- **插件扩展上下文**：`shell.env` hook 需要 `messageID` 和 `agent` 等更细粒度上下文。代表：[#21767](https://github.com/anomalyco/opencode/issues/21767)、[#54032](https://github.com/anomalyco/opencode/pull/54032)。

## 开发者关注点

- **会话不能因空闲驱逐、server 重启、持久化失败或误回滚而丢失/污染工作树**：[#51343](https://github.com/anomalyco/opencode/issues/51343)、[#51020](https://github.com/anomalyco/opencode/issues/51020)、[#54026](https://github.com/anomalyco/opencode/issues/54026)。
- **v2 认证、配置、数据写入的迁移缺口仍在阻断生产使用**：[#45856](https://github.com/anomalyco/opencode/issues/45856)、[#51422](https://github.com/anomalyco/opencode/pull/51422)、[#51020](https://github.com/anomalyco/opencode/issues/51020)。
- **计费/额度错误会快速消耗用户信任**：Zen free 误报与上游资金错误需更透明的错误信息和自恢复：[#14273](https://github.com/anomalyco/opencode/issues/14273)、[#53827](https://github.com/anomalyco/opencode/issues/53827)。
- **模型兼容是高频阻断点**：Gemini schema、OpenAI-compatible 工具调用参数需优先修复：[#54033](https://github.com/anomalyco/opencode/issues/54033)、[#54025](https://github.com/anomalyco/opencode/issues/54025)。
- **安装方式必须尊重只读/受管环境**：Nix 自更新不应破坏运行会话：[#54022](https://github.com/anomalyco/opencode/issues/54022)。
- **桌面/TUI 的 UI 阻塞与性能问题直接影响可用性**：[#54035](https://github.com/anomalyco/opencode/issues/54035)、[#54017](https://github.com/anomalyco/opencode/pull/54017)。
- **项目 ID 等本地状态损坏需要自愈能力**：[#53991](https://github.com/anomalyco/opencode/issues/53991)、[#54030](https://github.com/anomalyco/opencode/pull/54030)。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 — 2026-10-09

> 数据来源：[github.com/NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

- **v0.21.6 正式打标**：聚合了自 v0.21.5 以来约 **2,100 个 PR**，作为 Docker / Hermes Cloud 的稳定版本发布，但完整发布说明要留到 v0.22.0。
- **0.21.6 出现 P1 回归**：零消息平台配置下 `api_server` 启动不再连接（#135298），同时大量 P0 级修复 PR 集中在会话状态、发布请求 WAF 识别、scratch 清理等底层面。
- **架构方向信号明确**：PR #106742 提出“单一 gateway 拥有所有本地会话”，将 CLI / TUI / Desktop / ACP / 机器人 / cron 统一到一个 live conversation，是本期最重量级的架构演进。

---

## 2. 版本发布

### v0.21.6（2026-10-08）

- **性质**：补丁版本（patch release），将 v0.21.5 之后合并的 **约 2,100 个 PR** 打包成一个稳定 tag，面向 Docker 与 Hermes Cloud 分发。
- **说明**：完整、经过精选的变更说明将随 **v0.22.0** 一并发布；本 tag 主要用于稳定发布通道。
- **注意**：本版本 **首次引入逐版本 Docker tag**（0.21.5 及以前没有），这可能影响用户回滚/bisect，见 #135298。
- 🔗 [Releases](https://github.com/NousResearch/hermes-agent/releases)

---

## 3. 社区热点 Issues

> 过去 24 小时内更新的 Issue 共 **5 条**，以下全部列出（数量有限，暂不足 10 条）。

1. **#135298 [P1][bug] 未配置任何消息平台时 api_server 启动不连接（0.21.6 回归）**
   用户 @dasunsrule32 在 5 个环境中复现，影响 `latest-desktop` Docker 镜像。这是本期唯一的 **P1 回归**，且因缺少 0.21.5 的逐版本 Docker tag 而无法 bisect，社区反应迅速（1 天内 3 评论）。
   🔗 https://github.com/NousResearch/hermes-agent/issues/135298

2. **#125727 [invalid] 自动化 Nous 集成被阻塞**
   评论数最高（34 条）。`Nous-to-Enterkey` 计划合并冲突涉及 `agent/` 下大量核心文件（`agent_init.py`、`conversation_loop.py`、`context_compressor.py`、`credential_pool.py` 等），反映出主分支演进速度极快、下游集成难以跟进。
   🔗 https://github.com/NousResearch/hermes-agent/issues/125727

3. **#526 [feature] Anthropic Context Editing API 集成**
   长期跟踪的功能需求（创建于 3 月）。希望利用 Anthropic 服务端 beta 接口，自动清理旧 tool use / result 与 thinking 块，实现**缓存友好的上下文压缩**。与 Hermes 的 `area/compression` 方向高度契合。
   🔗 https://github.com/NousResearch/hermes-agent/issues/526

4. **#135347 [bug] mem0 OSS + pgvector 每次更新都会损坏**
   `pgvector` 所需的 `postgres` extra 由插件声明，但升级流程中没有任何环节启用它，导致每次更新后驱动丢失。典型“更新即坏”的插件依赖管理问题。
   🔗 https://github.com/NousResearch/hermes-agent/issues/135347

5. **#135357 [bug][needs-repro] Curator 在启用 skill 审批时只做暂存写入**
   当 `curator.consolidate: true` 且 `skills.write_approval: true` 时，合并流程结束但**未生成完整的技能退役提案**，只留下不完整的编辑与引用文件写入，属于 agent 内部工作流一致性问题。
   🔗 https://github.com/NousResearch/hermes-agent/issues/135357

---

## 4. 重要 PR 进展

1. **#106742 [P2] 单一 gateway 拥有所有本地会话** — @teknium1
   让所有本地后端表面（CLI、TUI、本地 Desktop、ACP 编辑器、机器人频道、cron）共享同一个 gateway 会话，而非各自在 `state.db` 上跑独立 agent。**本期最具架构影响力的 PR**。
   🔗 https://github.com/NousResearch/hermes-agent/pull/106742

2. **#129863 [P0] 修正 persisted-output 指针的错误承诺** — @salch-cred
   工具结果超过阈值时写入 spillover 文件，但指针却告诉模型“完整结果已在磁盘上、不要重新请求”。当 spill 文件其实不持久时有丢数据风险，属 P0 级会话状态问题。
   🔗 https://github.com/NousResearch/hermes-agent/pull/129863

3. **#134173 [P0] 抢救清理过程中被写入的 scratch 条目** — @justinsharpe
   24 小时 scratch 清理基于旧快照决策，会把用户正在写入的新文件一起删掉。本 PR 引入候选列表并在删除前重新校验。
   🔗 https://github.com/NousResearch/hermes-agent/pull/134173

4. **#128305 [P0] 为 WAF 识别发布/更新请求** — @dskwe
   为 release/update 资源请求加上统一的 updater 身份标识，降低被地区性 Cloudflare/WAF 策略拦截的概率，同时修补生产者—消费者之间的安全缺口。
   🔗 https://github.com/NousResearch/hermes-agent/pull/128305

5. **#134586 [P0] 转发的 Discord interaction 携带文本通道的 chat/user 标签** — @unsupportedpastels
   原先转发的 interaction（slash command / 组件点击）丢失 `chat_name`、`chat_topic`、`user_display_name`，导致会话状态与缓存归属错误。
   🔗 https://github.com/NousResearch/hermes-agent/pull/134586

6. **#135340 [P1] scratch/test home 不得改写真实 gateway 服务单元** — @teknium1
   从其他 `HERMES_HOME` 启动的 gateway 不再覆盖真实安装的 systemd unit / launchd plist，修复“真实 gateway 下次重启即挂”的问题（salvage #133476）。
   🔗 https://github.com/NousResearch/hermes-agent/pull/135340

7. **#98703 [P3] 新增安全的 pre-agent 轮次路由中间件** — @oleg-koval
   引入 `turn_route` 插件钩子，在构建 agent 之前允许插件为本轮对话选择模型/供应商（Veto 已用于自动路由）。当前插件只能“观察”，此 PR 让其可“决策”。
   🔗 https://github.com/NousResearch/hermes-agent/pull/98703

8. **#135356 [CLOSED] 将浏览器控制绑定到已授权发言人** — @max-7189
   为消息适配器提供 opt-in 的浏览器控制主体绑定，principal 由已认证的 `SessionSource.user_id` 派生，涉及安全边界。虽已关闭，但设计值得关注。
   🔗 https://github.com/NousResearch/hermes-agent/pull/135356

9. **#135334 [P2] Docker 首个 PM 代际保留镜像自带 extras** — @MohamadKanso
   记录镜像中实际存在的 extras，使首次可写的 PM 代际在插件/适配器添加依赖时不会丢掉它们（对应 #135329）。
   🔗 https://github.com/NousResearch/hermes-agent/pull/135334

10. **#129844 [P2] 所有 bridge 统一使用一份 terminal env map** — @ericcurtin
    CLI、gateway、独立 bridge 各自维护 `terminal.* → TERMINAL_*` 映射且已漂移（`home_mode` 缺失导致 `hermes serve`/dashboard/TUI 忽略该配置），现统一。
    🔗 https://github.com/NousResearch/hermes-agent/pull/129844

**其他值得留意**：#135359（Anthropic 计费提示按凭证 auth 模式判断）、#135360（ACP 暴露有界子 agent 进度快照）、#135358（kanban specify 容忍原始换行）、#108334（gateway 结果持久化避开进程注册表锁）、#56787（复活非 agentic 定时自动更新）。

---

## 5. 功能需求趋势

- **上下文与压缩管理**：Anthropic Context Editing API（#526）是代表，配合 `area/compression` 标签，社区希望把“清理旧 tool use / thinking 块”从客户端移到服务端，以获得缓存友好性。
- **统一会话 / 多端一致性**：#106742 把 CLI、TUI、Desktop、ACP、bot、cron 收敛到同一 gateway 会话，反映社区对“所有表面看到同一个 live conversation”的强烈诉求。
- **安装与更新健壮性**：多条 Issue/PR 围绕更新不损坏依赖（mem0+pgvector #135347、Docker extras #135334、逐版本 tag 缺失）与发布请求被 WAF 拦截（#128305）。
- **插件与扩展机制**：`turn_route` 钩子（#98703）表明社区希望插件从“观察者”升级为“决策者”，插件/工作区依赖管理（#125272）也持续活跃。
- **安全边界收紧**：浏览器控制主体绑定（#135356）、sudo 危险标志扫描（#122267）、WAF 身份识别（#128305），安全相关 PR 密度明显上升。
- **可观测性**：ACP 子 agent 进度快照（#135360）反映多 agent / 并发委派场景下对进度可见性的需求。

---

## 6. 开发者关注点

- **“升级即坏”体验**：mem0 pgvector 驱动（#135347）与 Docker extras（#135334）都指向同一痛点——插件的依赖选择在更新后无法存活，且 0.21.5 之前**没有逐版本 Docker tag**，导致回归无法 bisect（#135298）。
- **合并/集成冲突成本高**：`agent/` 核心文件频繁变动，使下游集成（#125727）与长期 PR（#526 跨 7 个月、#98703 跨 1 个月）反复 rebase，维护成本显著。
- **会话状态与数据持久性**：spillover 文件指针不诚实（#129863）、scratch 清理误删在写文件（#134173）、Discord relay 标签错误（#134586）——P0 级问题集中在“状态在哪个表面、是否真的持久”。
- **锁与性能**：gateway 结果持久化持有 `ProcessRegistry._lock` 会阻塞无关查询（#108334），说明慢文件系统下的锁竞争已成为实际瓶颈。
- **模型解析的严格性**：kanban specify 因一个原始换行就整段降级为任务正文（#135358），以及 `reasoning_effort` 拒绝识别的枚举变体（#115308），都提示开发者对 LLM 输出的**非严格解析**存在普遍需求。
- **配置漂移**：每个 bridge 各自维护环境变量映射（#129844）导致同一配置在不同入口行为不一致，是长期存在的“隐性 bug 温床”。

---

*备注：本期 Issues 样本仅 5 条、PR 样本 20 条，均由过去 24 小时更新记录筛选得到，非全量统计。*

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 · 2026-10-09

> 数据来源：[github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)

---

## 一、今日速览

今日社区焦点集中在**稳定性与资源管理**上：一个与 hook/tool 子进程僵尸堆积相关的 P1 缺陷（#97616）持续发酵，已积累 19 条讨论；同时 Gateway 启动卡顿、更新回执过期、Tailscale 残留进程等一串运行时问题在本周集中被修复。版本层面，正式版 v2026.9.9 落地（185 commits / 92 位贡献者），另有 v2026.10.1-beta.2 作为 40 提交量级的热修复 beta 发布。

---

## 二、版本发布

### v2026.9.9（正式版）
- **规模**：185 commits · 112 PRs · 92 contributors
- **内容**：发布说明与 changelog 内容一致，仅以两种格式呈现，详见 [docs.openclaw.ai/releases](https://docs.openclaw.ai/releases/2026)
- 链接：https://github.com/openclaw/openclaw/releases

### v2026.10.1-beta.2（beta 通道热修复）
- 相对 `v2026.10.1-beta.1` 的**热修复**版本，覆盖 40 个中间提交，**并非 10 月累计说明的重复**
- Highlights 提及「Updates and Doc…」（更新与文档相关改进）
- 链接：https://github.com/openclaw/openclaw/releases/tag/v2026.10.1-beta.2

> 小结：秋季版本节奏保持在「正式版 + beta 热修复」双轨并行，beta 通道被用于快速收敛回归问题。

---

## 三、社区热点 Issues（Top 10）

### 1. #97616 · [P1] hook/tool 子进程未回收，僵尸进程堆积导致运行时退化
- 作者 @avp717 | 评论 **19** | 👍 1 | 标签含 `clawsweeper:needs-live-repro`、`impact:crash-loop`
- **为何重要**：这是当前列表中最严重的缺陷——`openclaw-hooks`、`bash`、`codex` 等子进程在主进程下持续堆积僵尸，属于典型的**长时运行慢性退化**，影响所有重度使用 hooks/tools 的用户。
- **社区反应**：19 条评论为全场最高，且被标记为需要 live repro，说明复现门槛较高、排查仍在进行。
- 链接：https://github.com/openclaw/openclaw/issues/97616

### 2. #41165 · [P2] Telegram 私信仍落入 `agent:main:main`，污染主会话
- 作者 @ZemonVunter | 评论 10 | 👍 2
- **为何重要**：在 #40519 修复之后问题**依然存在**，DM 未正确隔离到 `agent:main:telegram:direct:<id>`，直接污染 heartbeat / 主会话上下文。
- 链接：https://github.com/openclaw/openclaw/issues/41165

### 3. #41366 · [P3] 持久化自然语言规则学习 + 多 @提及回复语义
- 作者 @wantano54 | 评论 9 | 👍 1
- **为何重要**：当前自然语言规则训练只作用于 session 层，会与 workspace 规则（`AGENTS.md` / `SOUL.md`）冲突，导致同一模型在不同 agent 间行为不稳定。这是**多 agent 群聊场景**的核心痛点，但需要产品决策。
- 链接：https://github.com/openclaw/openclaw/issues/41366

### 4. #48709 · [P2] Gemini 2.5 Pro：textSignature 膨胀 + think 标签 + 混合文本/工具调用导致会话失败
- 作者 @jarvis-playrockets | 评论 8
- **为何重要**：三个问题叠加造成上下文快速膨胀、运行中断、Telegram 静默投递失败。属于典型的**模型适配层缺陷**，且带 `stale` 标签迟迟未推进。
- 链接：https://github.com/openclaw/openclaw/issues/48709

### 5. #71452 · [P3] `list chat` / `list messages` 硬编码 25 条上限，需支持分页
- 作者 @JerryTao-AI | 评论 7 | 👍 1
- **为何重要**：`renderMessageList` 中 `.slice(0, 25)` 使 `message(action=read)` / `list-pins` 无论用户请求多少都只能返回 25 条；MS Teams 的 `channel-list` 疑似同样受限。
- 链接：https://github.com/openclaw/openclaw/issues/71452

### 6. #96660 · [P2] 工作区面板：根路径丢失前导点、已存在文件夹误报 "Missing"、布局错乱
- 作者 @mmhzlrj | 评论 5 | 👍 1 | 评级 🦞 diamond lobster
- **为何重要**：自 2026.6.10 起「展开会话工作区」侧栏同时存在三个 P0/P1 渲染缺陷，只是**纯 UI 层**问题，修复路径清晰（`clawsweeper:fix-shape-clear`、`queueable-fix`），是低风险快速收益项。
- 链接：https://github.com/openclaw/openclaw/issues/96660

### 7. #163006 · [P1] Amazon Bedrock Mantle 在 `auth: "aws-sdk"` 下返回 401 Invalid bearer token
- 作者 @netcrazed | 评论 1 | 评级 🦞 diamond lobster | `impact:auth-provider`
- **为何重要**：标准 `amazon-bedrock` provider 文档支持的 ambient IAM 凭证链，在 Mantle provider 上直接失败，企业用户走 AWS 原生鉴权路径被阻断。
- 链接：https://github.com/openclaw/openclaw/issues/163006

### 8. #111405 · [P2] Cron：自报 `===DONE_ERR===` 的 agent run 被记为 `ok`，failureAlert 永不触发
- 作者 @MrNozz | 评论 2 | 评级 🦞 diamond lobster
- **为何重要**：**静默失败掩盖 + 告警被抑制**，严重程度中高。定时任务失败不告警，对依赖 Cron 做自动化运维的用户风险很大。
- 链接：https://github.com/openclaw/openclaw/issues/111405

### 9. #150253 · [P2] 反向代理后插件 Control-UI 面板不可用（loopback 直连正常）
- 作者 @jaserNo1 | 评论 3
- **为何重要**：Workboard 等内置插件面板在反向代理后提示「Plugin panel unavailable」，直连 loopback 却渲染正常——这是**网关与前端连接上下文判定**的部署级问题。
- 链接：https://github.com/openclaw/openclaw/issues/150253

### 10. #167436 · [P1] **[已关闭]** 启动期间重启 Gateway，残留 root `tailscale serve` 导致 exit 78 持续不可用
- 作者 @pandysp | 评论 1 | `impact:crash-loop` | `maturity:stable`
- **为何重要**：需要 sudo 抢占 Tailscale 路由时，中断的启动会留下 root 权限的 `tailscale serve` 进程占用 HTTPS 端口，导致后续启动全部以 exit 78 失败。**已被 PR #167514 修复关闭**，是今日闭环最快的 P1 项。
- 链接：https://github.com/openclaw/openclaw/issues/167436

> 另可见已关闭的 #167527（微信渠道 402 支付场景报 `SYSTEM_ERROR: service not found`，Web Control UI 正常），属渠道侧回归。
> 链接：https://github.com/openclaw/openclaw/issues/167527

---

## 四、重要 PR 进展（Top 10）

### 1. #167531 · [P1] 修复 Gateway 启动因插件依赖树过大而停顿数分钟
- 作者 @obviyus | 状态：👀 ready for maintainer look | `proof: sufficient`
- **内容**：外部插件依赖树庞大时，`plugins.runtime-post-bind` 阶段每个被捕获文件都付出约 2ms 的 guarded-clone 开销（即便小文件克隆无收益），导致主线程阻塞数分钟。改为按文件规模决策克隆策略。
- 链接：https://github.com/openclaw/openclaw/pull/167531

### 2. #167514 · [已关闭] 中断启动时终止 Tailscale serve 进程
- 作者 @steipete | Closes #167436
- **内容**：被中断的 Gateway 启动会释放其持有的前台进程，避免残留 root 进程导致后续启动 refuse with exit 78。
- 链接：https://github.com/openclaw/openclaw/pull/167514

### 3. #167459 · [P2] 修复过期更新回执阻塞有效更新
- 作者 @roboclaw-bot | Closes #167441 | `merge-risk: 🚨 compatibility`
- **内容**：修复 Git 更新与 Mac 更新协调在回执缺失 / 过期 / 无法写入时被跳过、阻断或误报的问题；dev 更新必须遵循当前 Git 配置并保留用户自定义项。
- 链接：https://github.com/openclaw/openclaw/pull/167459

### 4. #167462 · [P2] 让已登录 provider 列表中的每个 chat 模型都可见
- 作者 @obviyus | 涉及 openai / xai 扩展 | `merge-risk: 🚨 compatibility`
- **内容**：此前用 API key 登录 OpenAI，或 xAI 等使用共享实时模型列表的 provider，其新列出的 chat 模型在 OpenClaw 发版前不会出现在模型选择器中。改为动态展示。
- 链接：https://github.com/openclaw/openclaw/pull/167462

### 5. #165486 · [DRAFT] 为 Windows 桌面准备捆绑 Bun
- 作者 @steipete | 规模 XL | `merge-risk: 🚨 compatibility / security-boundary` | `status: 📣 needs proof`
- **内容**：为 Windows Tauri companion 在 x64/ARM64 上内嵌 fork 版 Bun，并显式接管现有的启动文件夹或 S4U 计划任务 Gateway。**明确标注 DRAFT，请勿合并或发布 Windows 构建**。
- 链接：https://github.com/openclaw/openclaw/pull/165486

### 6. #166720 · [P2] Bedrock：完成工具动作后 settled-turn finalization 失败
- 作者 @he-yufeng | Closes #166651 | `status: 📣 needs proof`
- **内容**：修复 Bedrock 上「消息-工具动作完成 → 进入 settled-turn finalization」时报 `The toolConfig field must be defined when using toolUse and toolResult content blocks` 的问题。
- 链接：https://github.com/openclaw/openclaw/pull/166720

### 7. #160047 · [P1] 停止把退役 Ollama 模型当作超时反复重试
- 作者 @Irish-Joseph | 状态：👀 ready for maintainer look | `proof: sufficient`
- **内容**：Ollama 对已退役模型返回 HTTP 410 及退役说明，现有分类器误判为 timeout，导致同模型重试耗尽 turn 预算而非切换到配置的 fallback。
- 链接：https://github.com/openclaw/openclaw/pull/160047

### 8. #163698 · [P2] 修复 Qianfan DeepSeek 回复不流式、整块到达
- 作者 @he-yufeng | Closes #163657 | `merge-risk: 🚨 compatibility`
- **内容**：即便开启 block streaming，千帆服务的 DeepSeek 模型仍会等待完整生成后一次性投递；Issue 中提供了 Windows/Linux 双平台复现与 cURL 对照。
- 链接：https://github.com/openclaw/openclaw/pull/163698

### 9. #125913 · [P1] Codex：命名空间容量满时清理已废弃的 cleared bindings
- 作者 @he-yufeng | 规模 XL | 多个 `merge-risk`
- **内容**：Codex app-server 的 thread-binding 命名空间在累计 50,000 行后拒绝新绑定，导致后续会话失败。由 AI 辅助完成调查与实现。
- 链接：https://github.com/openclaw/openclaw/pull/125913

### 10. #167528 / #167530 · 发布与 triage 工具链两组修复
- #167528 [P2] `fix(release)`：不再把完整畸形的 registry 响应与永久性 fetch 失败当作临时不可用；ClawHub 校验同时遵循服务端重试指引。→ https://github.com/openclaw/openclaw/pull/167528
- #167530 [P3] `feat`：`openclaw triage --agent agy` 支持 Google Antigravity CLI 作为本地修复代理。→ https://github.com/openclaw/openclaw/pull/167530

> 其他值得留意：#167532（会议转写导出移至 read worker，避免 Gateway 主线程执行 SQLite 及快照截断）、#150641（JSONL transcript 用量估算限定在活跃窗口）、#156484（QA 离线比对 Decision 答案）、#82105（Docker 默认镜像捆绑 channel voice 插件依赖）。

---

## 五、功能需求趋势

从本轮 11 个 Issue 与 50 个 PR 的标签分布看，社区关注方向可归纳为六条主线：

| 方向 | 代表条目 | 说明 |
|---|---|---|
| **会话状态与路由隔离** | #41165、#41366、#48709、#125913 | `impact:session-state` 出现频率最高。Telegram DM 误入主会话、多 agent 规则冲突、上下文膨胀，均指向「会话边界」这一系统性课题 |
| **长时运行稳定性 / 资源治理** | #97616、#167531、#167436、#150641 | 僵尸进程、启动停顿、残留特权进程、transcript 全量计量——都是「跑了很久才出问题」的慢性缺陷 |
| **多 Provider / 新模型适配** | #163006、#48709、#166720、#163698、#160047、#167462 | Bedrock（含 Mantle 与 aws-sdk 鉴权）、Gemini 2.5 Pro、Qianfan DeepSeek、Ollama 退役模型、OpenAI/xAI 动态列表。模型接入层是当前 PR 最密集的区域 |
| **跨平台与部署形态** | #165486、#82105、#150253 | Windows 桌面内嵌 Bun、Docker 镜像默认依赖、反向代理后的 Control UI，反映部署场景正在快速扩散 |
| **消息接口能力补全** | #71452 | 分页缺失这类「硬编码 25」的小切口，实际卡住了自动化脚本与大频道运营 |
| **可观测性与告警可信度** | #111405、#97616 | Cron 失败被记为 ok、子进程异常无告警——用户需要「失败必须可见」 |

---

## 六、开发者关注点

1. **静默失败是最不受容忍的一类问题**
   Cron 自报 `===DONE_ERR===` 却记录 `ok`（#111405）、Telegram 投递静默失败（#48709）、微信渠道 402 报 `SYSTEM_ERROR`（#167527）——共同点是**没有崩溃、没有报错，但结果错误或未送达**。开发者对这类「看不见的失败」反馈最强烈，尤其当其与 failureAlert 机制失效叠加时。

2. **资源泄漏与慢性退化是 P1 的重灾区**
   #97616 的 19 条评论说明僵尸进程问题既难复现又影响面广。与 #167531（启动停顿数分钟）、#150641（用量估算把归档当活跃窗口）共同指向同一诉求：**主线程/子进程的生命周期管理需要系统性审计**，而非逐个打补丁。

3. **Provider 鉴权路径的「文档支持 ≠ 实际可用」**
   #163006 中 `auth: "aws-sdk"` 在标准 `amazon-bedrock` 上有文档支持，在 Mantle provider 上却直接 401。企业用户走 AWS 原生凭证链是刚需，这类**provider 间语义不一致**会显著提高接入成本。

4. **发布 / 更新链路自身的可靠性被反复质疑**
   #167459（过期回执阻塞有效更新）、#167528（registry 读回失败被误判为临时不可用）、#163357/#163356（安全审查 notice 的瞬时失败导致 workflow 挂掉）——多条 PR 同时指向「元工具链比业务代码更脆」的问题。

5. **大量修复停留在「ready for maintainer look」等待评审**
   当日 20 条高热度 PR 中，多条带着 `proof: sufficient` / `rating: 🐚 platinum hermit` 却仍是 `status: 👀 ready for maintainer look` 或 `⏳ waiting on author`。**评审吞吐**而非修复产出，可能是当前社区协作的主要瓶颈；同时 #41366、#71452、#111405 等均带 `needs-product-decision`，说明相当一批需求在等产品侧结论而非代码。

6. **AI 辅助贡献正在成为常态**
   #125913、#166720 等多条 PR 显式标注 `[AI-assisted]` / 说明使用了 AI 编码 agent 进行调查与实现，并附完整验证记录。这提示维护流程中的「证据充分性」标准需要与 AI 生成代码的规模同步演进。

---

*本日报基于 GitHub 公开数据自动整理，时间窗口为 2026-10-08 至 2026-10-09。*

:::
