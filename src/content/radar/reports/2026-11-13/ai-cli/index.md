---
title: "AI CLI 工具社区动态日报"
published: 2026-11-13
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-13

> 生成时间: 2026-11-13 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-13）

## 1. 生态全景

当前 AI CLI 工具生态正处于从“单轮对话”向“多代理编排与企业级工程化”深水区的转型期。主流工具普遍进入高频迭代阶段，但稳定性、跨平台兼容性与安全边界成为共性瓶颈。认证体验、子代理生命周期管理、细粒度权限沙箱以及成本可观测性已成为社区公认的五大核心痛点。部分产品（如 Reasonix Studio）开始出现生命周期终止信号，而新兴协议（ACP、MCP）与本地模型集成则正在重塑技术路线竞争格局。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues（今日更新） | PR（今日更新） | Release 情况 | 总体活跃度 |
|------|------|-------------------|---------------|-------------|-----------|
| **Gemini CLI** | google-gemini/gemini-cli | 50 条 | 25 条 | 无新版本 | 🔴 极高 |
| **OpenCode** | anomalyco/opencode | 19 条 | 50 条 | 无新版本 | 🔴 极高 |
| **OpenAI Codex** | openai/codex | 10+ 条（精选） | 20+ 个合并 | 3 个 alpha 版本（v0.170.0-alpha.2/3/4） | 🟠 高 |
| **Claude Code** | anthropics/claude-code | 49 条（近期更新） | 1 个 | v2.1.323（已发布） | 🟡 中等 |
| **Hermes** | NousResearch/hermes-agent | 9 条 | 50 条 | 无新版本 | 🟡 中等 |
| **OpenClaw** | openclaw/openclaw | 5 条 | 20 条 | v2026.11.5-beta.2（已发布） | 🟢 中低 |
| **DeepSeek Reasonix** | esengine/DeepSeek-Reasonix | 0 条 | 0 条 | v2.61.0（Studio 最终版） | ⚪ 低/维护期 |
| **Deepseek Harness** | deepseek-ai/deepseek-harness | 0 条 | 0 条 | 无 | ⚪ 无活动 |

> 注：Claude Code 的 Issues 数基于文中“近 49 条更新的 Issues”表述；OpenAI Codex 未披露 Issues 总数，仅列出 10 条精选热点。

## 3. 共同关注的功能方向

多个工具社区在以下五个方向上呈现高度共振，说明这些已成为 AI CLI 工程化的基础设施级需求：

| 功能方向 | 涉及工具 | 具体社区诉求 |
|---------|---------|------------|
| **子代理与多代理编排** | Claude Code、Gemini CLI、OpenCode | Claude Code 关注子代理 Prompt Cache 命中、批量停止与持久状态；Gemini CLI 聚焦子代理超时误报成功、挂起与轨迹可见性；OpenCode 提出子代理并发硬上限以防成本失控。 |
| **细粒度权限与沙箱** | Claude Code、OpenAI Codex、Gemini CLI | Claude Code 反映 `bypassPermissions` 失效、`denyWrite` 通配符忽略；Codex 报告 macOS 沙箱写入泄漏、Windows 沙箱清理被阻止；Gemini CLI 探讨破坏性操作（如 `git reset --force`）的安全拦截。 |
| **跨平台与远程开发稳定性** | OpenAI Codex、Hermes、OpenClaw | Codex 集中 Windows 系统级卡顿、SSH PAM 认证失败、WSL 启动问题；Hermes 关注 WSL2 网关崩溃、MSIX 安装静默失败；OpenClaw 报告 macOS 孤立 SSH 进程耗带宽、Windows 节点功能未宣传。 |
| **认证与身份安全** | Claude Code、OpenAI Codex | Claude Code 面临 User-Agent 泄露邮箱（最高优先级安全问题）、魔法链接延迟、缺乏 Passkey 支持；Codex 推进 SPIFFE JWT-SVID 工作负载身份认证，面向企业 CI/CD 场景。 |
| **成本与资源可观测性** | Claude Code、OpenCode | Claude Code 要求 Fast Mode 花费可见、子代理信用超支预警；OpenCode 社区反馈免费层限流误触及重置机制不透明。 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 插件引擎、Code Mode（JS 工具调用）、组织级权限管理 | 企业开发团队、插件生态构建者 | 基于插件元数据版本声明（`plugin.json` engines 字段），强调可扩展性与组织治理，但隐私合规压力大。 |
| **OpenAI Codex** | Rust CLI、SPIFFE 身份认证、Linux seccomp 沙箱、TUI 实时语音 | 云原生开发者、企业级 CI/CD 集成者 | Rust 技术栈，侧重系统级安全（seccomp/x32 syscall 限制）与可观测性，alpha 版本迭代极快。 |
| **Gemini CLI** | ACP（Agent Client Protocol）、AST 感知代码理解、浏览器子代理 | AI 原生应用开发者、多模态任务处理者 | 协议标准化导向（ACP session/close、钩子机制），AST 感知工具试图降低 Token 浪费，跨平台（Wayland）兼容性待提升。 |
| **OpenCode** | 子代理并发治理、多模态媒体附件、桌面端 TUI 体验 | 个人开发者、桌面端 AI 助手用户 | TypeScript/Node 生态，桌面端与 CLI 双轨并行，正处于 v2 重构期，稳定性问题集中。 |
| **Hermes** | 多平台 IM 集成（Telegram/微信/WhatsApp）、网关安全加固（sec-marathon） | 客服自动化、跨平台消息机器人开发者 | 网关 + 适配器架构，安全加固密集（SSRF 防护、日志脱敏、租赁所有权证明），国际化/RTL 适配不足。 |
| **OpenClaw** | OpenClaw ID 多租户权限、Gateway 启动可靠性、Rapid-MLX 本地推理 | 私有化部署用户、本地 AI 推理爱好者 | 强调本地模型嵌入（MLX）与身份体系解耦，Gateway 日志隔离与 Doctor 门控体现对可观测性的关注。 |
| **DeepSeek Reasonix** | Studio/CLI 双产品线、工作区交互细节（文件树宽度记忆、进程可视化） | 终端型 AI IDE 用户 | Studio 已宣布 v2.61.0 为最终版，进入维护/退出期，CLI 是否继续维护尚不明确。 |

## 5. 社区热度与成熟度

- **高热度、快速迭代**：Gemini CLI（50 Issues / 25 PR）、OpenCode（19 Issues / 50 PR）、OpenAI Codex（20+ 合并 PR + 3 个 alpha 版本）。这三类工具正处于功能扩张与架构重构的活跃期，适合追求前沿特性的早期采用者，但需承受较高的变更频率与潜在回归风险。
- **中等热度、稳步演进**：Claude Code（单个 PR 但 49 条 Issue 讨论）、Hermes（50 PR 集中在安全加固）、OpenClaw（20 PR 侧重 Gateway 与权限体系）。社区讨论深度高，但代码合并频率相对克制，适合对稳定性有中等要求的团队。
- **低热度/维护期**：DeepSeek Reasonix（Studio 宣布终止、24 小时无 Issue/PR）、Deepseek Harness（无活动）。这类工具不建议作为新项目的核心依赖，需评估迁移路径。

## 6. 值得关注的趋势信号

1. **多代理编排成为标配**：子代理并发控制、状态持久化、缓存命中率已从“锦上添花”变成“生产环境必选”。开发者在选型时应优先考察工具对多代理生命周期（启动、挂起、恢复、停止）的原生支持程度。
2. **安全边界下沉到 CLI 层**：User-Agent 隐私泄露、沙箱通配符失效、SSRF 防护、日志脱敏等问题频发，说明 AI CLI 不再是简单的“模型调用封装”，而是需要具备企业级安全治理能力的中间件。建议技术决策者将“安全合规”纳入工具评估的必检项。
3. **协议标准化加速**：ACP（Gemini CLI）、MCP（OpenClaw/OpenAI Codex）等协议在社区中获得关注，未来跨工具互操作性可能成为差异化竞争点。关注支持开放协议的工具可降低供应商锁定风险。
4. **本地模型与私有化部署兴起**：OpenClaw 引入 Rapid-MLX 本地聊天与内存嵌入，反映部分用户出于数据隐私与成本考虑，正在转向本地推理方案。对敏感数据场景的团队，应评估工具的本地模型支持能力。
5. **桌面端体验是下一战场**：OpenCode、Claude Code、Hermes 均集中反馈桌面端 TUI/WebView 同步、快捷键兼容、二维码渲染等问题。随着 AI CLI 从终端走向图形桌面，跨平台 GUI 质量将直接影响开发者采用意愿。

**决策建议**：若追求功能前沿与生态扩展性，可重点关注 Gemini CLI、OpenAI Codex、OpenCode；若侧重企业级安全与组织治理，Claude Code 和 Hermes 的安全加固方向值得跟进；若涉及私有化部署或本地模型，OpenClaw 的 Rapid-MLX 路线可作为参考；Reasonix Studio 及 Deepseek Harness 目前活跃度不足，建议谨慎纳入核心技术栈。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-13）

## 1. 热门 Skills 排行

| 排名 | Skill / PR | 功能简介 | 社区讨论热点 | 状态 | 链接 |
|------|-----------|---------|------------|------|------|
| 1 | **mcp-builder** (#1742) | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 的导入变更及自定义 HTTP 头配置，解决 MCP 连接脚本兼容性问题 | MCP 协议版本迁移导致现有 Skill 失效，社区关注官方 Skill 对新版 MCP SDK 的适配进度 | OPEN | https://github.com/anthropics/skills/pull/1742 |
| 2 | **skill-creator** (#1298) | 隔离触发器评估（trigger evals），修复 Windows 下 `select()` 管道失效及运行时失败误判问题 | 技能触发机制的可靠性直接影响 Skill 实用性，跨平台（尤其是 Windows）支持是社区痛点 | OPEN | https://github.com/anthropics/skills/pull/1298 |
| 3 | **notion-spec-to-implementation / quantitative-resume-auditor** (#1245) | 前者将 Notion 产品/技术规格拆解为可执行的 Claude Code 任务；后者对简历进行定量审计 | 企业知识库（Notion）到代码实现的自动化转换，以及简历筛选等 HR 自动化场景受到关注 | OPEN | https://github.com/anthropics/skills/pull/1245 |
| 4 | **webapp-testing** (#1980) | 移除 `with_server.py` 中 `shell=True` 的子进程调用，消除命令注入风险（CWE-78） | Web 应用测试 Skill 的安全加固，社区对 AI 生成测试脚本的安全性要求提高 | OPEN | https://github.com/anthropics/skills/pull/1980 |
| 5 | **docx** (#1792) | LibreOffice 超时时返回错误而非成功，并验证输出 DOCX 不再包含修订痕迹 | 文档自动化处理的鲁棒性，特别是办公文档格式转换与修订追踪的可靠性 | OPEN | https://github.com/anthropics/skills/pull/1792 |
| 6 | **proofcore-contract-auditor** (#1771) | Web3 智能合约静态审计（Solidity/Rust），并将密码学审计证明锚定至 TON 区块链 | 区块链/智能合约安全审计是新兴垂直领域，社区对去中心化审计证明感兴趣 | OPEN | https://github.com/anthropics/skills/pull/1771 |
| 7 | **md2video-audio** (#1703) | 基于 Marp 将 Markdown 文档编译为带人声旁白的专业 MP4 视频，零成本 | 文档到多媒体内容的自动化转换，适合教程、演示文稿自动生成场景 | OPEN | https://github.com/anthropics/skills/pull/1703 |
| 8 | **pyxel** (#525) | 复古游戏开发 Skill，支持 Python/Pyxel 游戏的实现、头less 运行、帧检测与状态验证 | 游戏开发垂直领域，社区对娱乐/教育类 Skill 的补充需求可见 | OPEN | https://github.com/anthropics/skills/pull/525 |

> 注：上述 PR 均处于 **OPEN** 状态，尚未合并；评论数在原始数据中未显示具体数值，按列表展示顺序及更新时间综合判断社区关注度。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向包括：

1. **工作流自动化与企业协作**
   - 组织内技能共享（Issue #228）：期望在 Claude.ai 内直接实现 org-wide 技能共享，避免手动下载/上传 `.skill` 文件。
   - Notion 规格到代码实现（PR #1245）：企业知识库与开发流程的自动化衔接。

2. **代码审查与安全治理**
   - 智能合约审计（PR #1771）：Solidity/Rust 静态分析 + 区块链存证。
   - Agent 治理模式（Issue #412）：策略执行、威胁检测、信任评分与审计追踪。
   - 文档技能安全（PR #1980）：消除测试脚本中的命令注入风险。

3. **测试生成与评估工具链**
   - `skill-creator` / `run_eval.py` 的触发率与并发评估修复（Issue #556、#1352、PR #1298）：社区亟需可靠的 Skill 触发验证与评估基础设施。
   - 文档技能同步状态澄清（PR #2108、Issue #189）：避免重复安装导致上下文窗口污染。

4. **文档与内容处理**
   - DOCX/XLSX/PPTX 文档的修订追踪、孤立注释检测、定义名解析等（PR #1792、#1734、#2019）。
   - 排版质量控制（PR #514）：孤行、寡妇段落、编号对齐等 AI 生成文档的排版问题。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新频繁，且修复了影响核心体验的问题，可能近期落地：

- **#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures**  
  直接影响所有 Skill 的触发可靠性，是 `skill-creator` 工具链的关键修复。  
  https://github.com/anthropics/skills/pull/1298

- **#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers**  
  解决 MCP 2.0 破坏性变更导致的连接失效，对依赖 MCP 的技能具有阻断性意义。  
  https://github.com/anthropics/skills/pull/1742

- **#1980 webapp-testing: avoid shell=True in with_server.py**  
  涉及命令注入安全漏洞（CWE-78），修复优先级高，合并可能性大。  
  https://github.com/anthropics/skills/pull/1980

- **#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills**  
  功能完整且覆盖企业级场景，社区讨论持续至 10 月，具备合并条件。  
  https://github.com/anthropics/skills/pull/1245

- **#1792 fix(docx): report LibreOffice timeout as an error and verify the output**  
  文档处理 Skill 的鲁棒性修复，已多次更新，接近可合并状态。  
  https://github.com/anthropics/skills/pull/1792

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：构建可信、可靠且可跨组织共享的技能基础设施——即修复触发评估与跨平台兼容性、消除安全隐患，并打通企业知识库（如 Notion）到代码实现的自动化闭环。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-13  
**数据来源**: github.com/anthropics/claude-code

---

## 1. 今日速览

Claude Code 发布 v2.1.323，引入实验性的 **Code Mode**（允许 Claude 编写 JavaScript 调用工具）并完善插件引擎声明。社区高度关注 **User-Agent 头泄露用户邮箱** 的隐私安全问题（#107757，796 个赞、118 条评论），同时认证体验、IDE 集成及子代理权限管理成为近期讨论的核心方向。

---

## 2. 版本发布

### v2.1.323

- **Code Mode（实验性，需手动开启）**：Claude 可编写 JavaScript 来调用其工具，详见 [Code Mode 文档](https://code.claude.com/docs/en/code-mode)。组织管理员可选择关闭。
- **插件元数据更新**：在 `plugin.json` 中新增 `engines["claude-code"]` 字段，用于声明插件适用的 Claude Code 版本范围，插件若超出声明范围将受限制。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心指标 | 为什么重要 | 链接 |
|---|------|---------|-----------|------|
| #107757 | User-Agent 头泄露用户邮箱（隐私违规） | 118 评论 / 796 👍 | **最高优先级安全问题**。Claude Code 在未经用户同意的情况下，在 Web 搜索请求的 User-Agent 头中携带用户邮箱，导致用户收到大量垃圾邮件。社区强烈要求直接移除而非设为可选项。 | [查看](https://github.com/anthropics/claude-code/issues/107757) |
| #84862 | Passkey (WebAuthn) 登录支持 | 37 评论 / 182 👍 | 社区长期期待的跨平台无密码认证方案，涉及所有 Claude 登录入口，属于高价值增强需求。 | [查看](https://github.com/anthropics/claude-code/issues/84862) |
| #82049 | Claude.ai 魔法链接登录邮件延迟 2–5 分钟 | 22 评论 / 41 👍 | 认证体验瓶颈。登录邮件延迟直接导致 Claude Code 会话过期后无法及时恢复，影响开发流程连续性。 | [查看](https://github.com/anthropics/claude-code/issues/82049) |
| #90471 | VS Code 扩展：webview 不支持 `advisor_tool_result` | 9 评论 / 10 👍 | IDE 集成缺陷。advisor 工具本身正常，但结果在 VS Code webview 中渲染为“不支持的内容类型”，影响协作类工作流的可视化体验。 | [查看](https://github.com/anthropics/claude-code/issues/90471) |
| #109397 | `bypassPermissions` 未真正绕过权限拦截 | 1 评论 / 0 👍 | 权限系统一致性问题。用户配置了 `bypassPermissions` 且跳过危险操作提示，但 `rm` 等命令在无人值守会话中仍被自动拒绝，仅可通过启动环境变量退出。 | [查看](https://github.com/anthropics/claude-code/issues/109397) |
| #108830 | 身份验证帮助表单重定向循环 | 4 评论 / 0 👍 | 新近出现的 macOS 认证缺陷，用户在身份验证流程中陷入重定向死循环，无法正常登录。 | [查看](https://github.com/anthropics/claude-code/issues/108830) |
| #92684 | `sandbox.filesystem.denyWrite` 忽略中路径通配符 | 3 评论 / 2 👍 | Linux 沙箱安全漏洞。拒绝写入规则中包含中路径通配符时被静默忽略，可能导致预期的文件系统隔离失效。 | [查看](https://github.com/anthropics/claude-code/issues/92684) |
| #94728 | 恢复后台子代理时丢失 Prompt Cache | 3 评论 / 3 👍 | Agent 性能问题。后台子代理恢复后未命中思考块缓存，导致重复推理和成本增加。 | [查看](https://github.com/claude-code/issues/94728) |
| #108947 | 二进制文件读取失败时 PreToolUse Hook 不触发 | 2 评论 / 0 👍 | Hook 机制缺陷。`Read` 二进制文件（如 `.heic`）在输入验证阶段即被拒绝，PreToolUse 无机会通过 `updatedInput` 重定向至可读格式。 | [查看](https://github.com/claude-code/issues/108947) |
| #106915 | Auto 模式切换工作区后 Edit/Write 权限分类器无判决 | 2 评论 / 0 👍 | 权限/工作区交互问题。`EnterWorktree(path)` 切换后，Auto 模式下的文件编辑操作收到“classifier gave no verdict”，阻断自动化流程。 | [查看](https://github.com/claude-code/issues/106915) |

---

## 4. 重要 PR 进展

过去 24 小时内仅有 **1 个 PR** 更新，但涉及插件系统底层修复，值得关注：

| # | 标题 | 作者 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #81672 | fix(hookify): 使包导入独立于安装目录名称 | @ozdemirsarman | 修复 `hookify` 包导入依赖插件目录必须命名为 `hookify` 的问题。通过 `os.path.dirname(CLAUDE_PLUGIN_ROOT)` 将目录加入 `sys.path`，但市场安装的插件目录名不固定，导致导入失败。该 PR 使插件导入更健壮。 | [查看](https://github.com/anthropics/claude-code/pull/81672) |

> 注：近期 PR 活动较少，社区讨论主要集中在 Issue 层面的 Bug 报告与功能需求上。

---

## 5. 功能需求趋势

从近 49 条更新的 Issues 中可提炼出以下社区关注方向：

1. **认证与身份安全**：Passkey/WebAuthn 登录（#84862）、登录邮件延迟（#82049）、身份验证重定向循环（#108830）。开发者希望登录流程更稳定、支持更多现代认证方式。
2. **IDE 与编辑器集成**：VS Code webview 内容类型支持（#90471）、桌面端 Git 分支显示（#109412）、移动端远程控制子代理监控（#92802）。IDE 插件的体验完善是持续需求。
3. **后台代理与多代理编排**：批量停止后台代理（#109414）、子代理持久状态管理（#92804）、Prompt Cache 命中（#94728）、信用额度自动暂停（#92800）。随着 Agent 工作流普及，对多代理生命周期管理的需求明显上升。
4. **权限与沙箱细粒度控制**：`bypassPermissions` 失效（#109397）、`denyWrite` 通配符失效（#92684）、PreToolUse Hook 触发时机（#108947）。开发者希望在自动化场景下拥有更可预测的权限行为。
5. **成本可见性**：Fast Mode 花费不可见（#92780）、子代理信用超支（#92800）。用户希望在会话中实时看到 Token/信用消耗并设置硬上限。

---

## 6. 开发者关注点（痛点与高频需求）

### 核心痛点
- **隐私安全**：User-Agent 头泄露邮箱是当前社区最愤怒的问题，建议 Anthropic 尽快发布补丁移除该行为，而非仅提供 opt-out 选项。
- **认证体验脆弱**：魔法链接延迟、重定向循环、缺乏 Passkey 支持，导致开发者频繁中断工作流重新登录。
- **权限系统不一致**：`bypassPermissions` 配置在特定场景（如 `rm`、无人值守会话）下不生效，Hook 在输入验证失败前不触发，增加了自动化脚本的脆弱性。

### 高频需求
- **批量操作命令**：如 `claude stop --all`，与现有 `respawn --all` 对齐，方便管理多个后台会话。
- **成本与资源可观测性**：Fast Mode 余额、子代理信用消耗的实时提示与预警。
- **插件与市场稳定性**：SSH 克隆失败、插件市场添加后找不到、前置解析脚本（`parse-frontmatter.sh`）对 `---` 边界处理错误等，影响插件生态可用性。

---

**报告生成时间**: 2026-11-13  
**数据覆盖范围**: 2026-11-12 至 2026-11-13 的 GitHub 仓库活动

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-11-13  
**数据来源**: github.com/openai/codex

---

## 1. 今日速览

OpenAI Codex 社区今日活跃度较高，Rust CLI 连续发布三个 alpha 版本（0.170.0-alpha.2/3/4），同时社区反馈集中在 Windows 平台稳定性、MCP 子代理内存泄漏、远程 SSH 认证以及沙箱权限等核心问题。开发团队通过 20+ 个合并 PR 持续推进身份认证（SPIFFE JWT-SVID）、Linux 安全沙箱（seccomp）、TUI 实时语音及云端会话管理等功能改进。

---

## 2. 版本发布

过去 24 小时内，Codex Rust CLI 连续发布三个预览版本：

- **rust-v0.170.0-alpha.4**  
- **rust-v0.170.0-alpha.3**  
- **rust-v0.170.0-alpha.2**

以上版本均为 alpha 预览，具体变更日志未在发布说明中详细列出，建议开发者通过 [GitHub Releases 页面](https://github.com/openai/codex/releases) 查看完整资产和安装说明。

---

## 3. 社区热点 Issues

以下选取 10 个评论数多、点赞高或代表性强的 Issue，供开发者重点跟进：

| # | 标题 | 状态 | 评论/👍 | 关注理由 | 链接 |
|---|------|------|---------|----------|------|
| #56941 | Windows Computer Use 使用后系统级 UI 卡顿，仅杀死 `codex-computer-use.exe` 可恢复 | OPEN | 24 / 2 | Windows 平台最严重的性能 bug 之一，影响整个图形界面，评论数最多 | [查看](https://github.com/openai/codex/issues/56941) |
| #25015 | app-server 为子代理泄漏 MCP 进程栈，导致 Linux 内存线性增长 | OPEN | 19 / 5 | 涉及长期运行的内存泄漏，对生产环境部署影响大 | [查看](https://github.com/openai/codex/issues/25015) |
| #59546 | 内置自动化限制阻断外部 Web 系统监控任务，与计划任务文档冲突 | OPEN | 15 / 18 | 社区点赞最高，涉及自动化功能与官方文档的不一致 | [查看](https://github.com/openai/codex/issues/59546) |
| #56620 | Windows 更新后组织设置无法加载，重装/修复/重认证均无效 | OPEN | 13 / 0 | 影响企业用户的核心配置功能，持续未解决 | [查看](https://github.com/openai/codex/issues/56620) |
| #23037 | 远程 SSH 连接在要求 keyboard-interactive/PAM 认证时失败 | OPEN | 11 / 9 | 跨平台远程开发场景的常见痛点，普通终端可连而 Codex 无法连接 | [查看](https://github.com/openai/codex/issues/23037) |
| #60974 | Windows WSL 启动策略检查跳过 CLI 重定位，执行非可执行 WindowsApps 二进制 | OPEN | 5 / 1 | 新提交（11-12），涉及 Windows 应用商店/MSIX 包的启动链问题 | [查看](https://github.com/openai/codex/issues/60974) |
| #60447 | 用量限制触发时不应终止活跃开发任务，建议增加安全检查点 | OPEN | 4 / 0 | 功能需求类 Issue，反映用户对长任务稳定性的担忧 | [查看](https://github.com/openai/codex/issues/60447) |
| #61193 | Windows 更新后无法使用，安装失败 | OPEN | 1 / 0 | 今日新增，反映最新版本在 Windows 上存在安装回归 | [查看](https://github.com/openai/codex/issues/61193) |
| #61204 | macOS 沙箱 `:minimal` 读取权限仍允许写入 `/tmp` 和 `/var/tmp` | OPEN | 0 / 0 | 新提交，涉及 macOS Seatbelt 沙箱配置与实际行为不一致 | [查看](https://github.com/openai/codex/issues/61204) |
| #61165 | Android 远程控制切换应用后出现重连循环、会话状态丢失 | OPEN | 1 / 0 | 移动端远程会话稳定性问题，影响跨设备开发体验 | [查看](https://github.com/openai/codex/issues/61165) |

---

## 4. 重要 PR 进展

以下选取 10 个近期合并的重要 PR，涵盖安全、性能、TUI、云端会话及构建基础设施：

| # | 标题 | 状态 | 主要内容 | 链接 |
|---|------|------|----------|------|
| #61207 | Add SPIFFE JWT-SVID support for workload identity authentication | CLOSED | 允许 Unix 工作负载直接从 SPIFFE Workload API 获取断言，用于现有 OpenAI 令牌交换，通过 `OPENAI_IDENTITY_TOKEN_SOURCE=spiffe` 选择 | [查看](https://github.com/openai/codex/pull/61207) |
| #61206 | Enforce Linux seccomp restrictions for x32 syscalls | CLOSED | 修复 x32 ABI 系统调用限制绕过问题，将现有 syscall 拒绝和 socket 条件应用于 x32 调用号 | [查看](https://github.com/openai/codex/pull/61206) |
| #61205 | Upgrade the Rust toolchain to 1.99.1 | CLOSED | 将工作区、Bazel 工具链、锁文件、CI 和 Windows 安装脚本从 Rust 1.95.0 升级至 1.99.1，并适配新 Clippy 检查 | [查看](https://github.com/openai/codex/pull/61205) |
| #61198 | Add graceful agent-tree suspension and recovery | CLOSED | 新增 `ThreadManager::suspend_agent_tree`，在挂起本地代理树时保留未完成的回合和子结果，支持恢复后继续使用 | [查看](https://github.com/openai/codex/pull/61198) |
| #61182 | Support renaming cloud threads | CLOSED | 云端后端处理 `ThreadSetName` 请求，支持重命名云端会话，重命名后更新本地状态 | [查看](https://github.com/openai/codex/pull/61182) |
| #61178 | Enable conversation-scoped speed selection for Cloud turns | CLOSED | 为云端回合引入会话级速度选择，与模型和努力度选择一起暂存，不改变本地默认值 | [查看](https://github.com/openai/codex/pull/61178) |
| #61172 | Negotiate realtime voice calls in the TUI | CLOSED | TUI 中通过 WebRTC 协商实时语音通话，并通过 `existingCall` 附加 app server，保留语音偏好设置 | [查看](https://github.com/openai/codex/pull/61172) |
| #61186 | Keep plan item IDs unique after completion | CLOSED | 为计划项生成 UUIDv7 ID，避免同一回合内多个完成计划在重试或工具续传中共享 ID | [查看](https://github.com/openai/codex/pull/61186) |
| #61195 | Preserve permission profiles across working directory updates | CLOSED | 仅更改工作目录时不再通过旧沙箱策略重建权限配置，保留配置、活跃选择和工作区根目录 | [查看](https://github.com/openai/codex/pull/61195) |
| #61187 | Add authenticated GCS caching for Bazel CI and releases | CLOSED | 为合格的 `main` 运行和 Rust 发布标签添加 GitHub OIDC 认证的 GCS 缓存，加速 CI 和发布构建 | [查看](https://github.com/openai/codex/pull/61187) |

---

## 5. 功能需求趋势

从近期 Issues 和 PR 中可观察到以下社区关注方向：

1. **跨平台远程开发与认证**  
   SSH PAM 认证（#23037）、远程会话状态恢复（#61165）、云端会话重命名（#61182）等反映开发者对多设备、多环境无缝切换的需求强烈。

2. **沙箱与权限模型细化**  
   macOS 沙箱写入泄漏（#61204）、Windows 沙箱清理被策略阻止（#61191）、权限配置跨目录保留（#61195）表明社区希望获得更精确、可审计的文件系统和资源访问控制。

3. **长任务与用量管理**  
   用量限制触发时的安全检查点（#60447）、内存生成上下文窗口失败（#36806）显示用户希望在长时间运行的代理任务中获得更好的容错和资源保护。

4. **自动化与浏览器控制**  
   内置自动化限制与文档冲突（#59546）、Computer Use 导致系统卡顿（#56941）、浏览器扩展测试支持（#61189）指向对自动化工作流和浏览器交互能力的更高期待。

5. **企业级身份与基础设施**  
   SPIFFE JWT-SVID 支持（#61207）、GCS 缓存认证（#61187）等 PR 显示团队正在强化面向企业和 CI/CD 场景的身份认证与构建基础设施。

---

## 6. 开发者关注点

**高频痛点：**
- **Windows 平台稳定性**：Computer Use 引发的系统级 UI 卡顿（#56941）、组织设置加载失败（#56620）、最新版安装失败（#61193）、WSL 启动策略问题（#60974）均集中在 Windows 桌面端。
- **内存与进程泄漏**：MCP 子代理进程栈未清理导致 Linux 内存线性增长（#25015）、macOS 自动更新残留旧应用副本（~1.5 GB/次，#49803）。
- **远程与移动端会话体验**：SSH 双重认证失败（#23037）、Android 切换应用后会话丢失与重连循环（#61165）、iOS 冷启动后项目列表为空（#60799）。

**开发者建议方向：**
- 增加长任务的检查点机制与用量限制优雅

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-13)

## 1. 今日速览

过去 24 小时内，Gemini CLI 仓库未发布新版本，但社区活跃度保持高位：50 个 Issue 和 25 个 PR 同步更新，核心围绕 **子代理（Subagent）稳定性**、**浏览器代理兼容性** 以及 **ACP（Agent Client Protocol）协议完善** 展开。P1 级别的多个 Bug 仍处于待重新测试状态，亟待维护者跟进。

## 2. 版本发布

过去 24 小时内无新版本发布。

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/类型 | 评论/👍 | 关注理由 | 链接 |
|---|------|------------|---------|----------|------|
| #22323 | Subagent recovery after MAX_TURNS 报告为 GOAL 成功，掩盖中断 | P1 / Bug | 13 / 2 | 子代理达到最大轮次后仍错误上报成功，导致上层任务误以为完成，严重影响任务可靠性，亟需修复。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22323) |
| #21409 | Generalist agent 挂起 | P1 / Bug | 8 / 8 | 通用代理在处理简单操作（如创建文件夹）时无限挂起，社区关注度高（8👍），影响日常使用体验。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21409) |
| #19873 | 基于零依赖 OS 沙箱利用模型 Bash 亲和力 | P2 / Enhancement | 9 / 1 | 探索让模型以原生 Bash 用户身份操作 POSIX 工具，同时保障安全，属于架构方向的重大增强提案。 | [查看](https://github.com/google-gemini/gemini-cli/issues/19873) |
| #22745 | 评估 AST 感知文件读取、搜索和映射的影响 | P2 / Feature | 7 / 1 | 涉及通过 AST 感知工具精确读取方法边界、减少 Token 浪费，对提升代码理解效率具有潜在价值。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22745) |
| #21968 | Gemini 使用技能和子代理不足 | P2 / Bug | 7 / 0 | 模型不会主动调用自定义技能和子代理，需显式指令才触发，限制了 Agent 工作流的自动化程度。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21968) |
| #22267 | Browser Agent 忽略 settings.json 覆盖（如 maxTurns） | P2 / Bug | 5 / 0 | 浏览器子代理未正确读取全局/项目级配置，导致用户自定义参数失效，配置体验不一致。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22267) |
| #21983 | Browser 子代理在 Wayland 下失败 | P1 / Bug | 4 / 1 | 特定 Linux 显示服务器（Wayland）环境下浏览器子代理不可用，影响部分开发者的跨平台体验。 | [查看](https://github.com/google-gemini/gemini-cli/issues/21983) |
| #24246 | 工具数量超过 128 个时遇到 400 错误 | P2 / Bug | 3 / 0 | 工具过多导致请求失败，提示需要更智能的工具作用域限制机制，影响大型代码库场景。 | [查看](https://github.com/google-gemini/gemini-cli/issues/24246) |
| #22186 | get-shit-done 输出钩子导致崩溃 | P1 / Bug | 3 / 0 | 输出接近完成时 CLI 崩溃，影响关键任务的交付流程，属于稳定性高优先级问题。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22186) |
| #22672 | Agent 应阻止/劝阻破坏性行为 | P2 / Feature | 3 / 1 | 涉及 `git reset --force` 等危险操作的安全防护，社区关注 Agent 在破坏性操作上的安全边界。 | [查看](https://github.com/google-gemini/gemini-cli/issues/22672) |

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 核心内容 | 链接 |
|---|------|------|----------|------|
| #30259 | fix(cli): 恢复工作区目录仅在 resumeChat 成功后执行 | CLOSED | 修复会话恢复失败后工作区目录仍保持激活的问题，恢复操作延迟至 resumeChat 成功后再执行。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30259) |
| #30253 | fix(core,cli): 报告准确的模型输出 Token 限制 | CLOSED | 修复 `gemini models` 等命令对所有模型硬编码 8192 输出限制，Gemini 2.5/3 现正确报告 65536。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30253) |
| #30258 | fix(core): 当请求超时超过 300s 默认值时缩放 undici bodyTimeout | CLOSED | 允许 `updateGlobalFetchTimeouts` 同时更新 `bodyTimeout`，解决长请求下的超时处理问题。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30258) |
| #30230 | fix(core): 保留合成二进制 ack，使注入的音频/视频保持在独立 turn 中 | OPEN | 修复 Gemini 3 模型下读取音频/视频文件时出现 400 错误，通过合成 model ack 隔离媒体 turn。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30230) |
| #30232 | feat(acp): 支持 session/close，让客户端释放会话 | OPEN | 实现 ACP 客户端通过 `session/close` 释放会话，解决会话配置、聊天和 MCP 连接无法释放的问题。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30232) |
| #29859 | fix(cli): 在任务树中显示执行中的子代理工具调用 | OPEN | 修复子代理工具调用在执行期间从任务树消失的问题，非根调度器现在保留 `executing` 状态。 | [查看](https://github.com/google-gemini/gemini-cli/pull/29859) |
| #30246 | fix(core): Windows 下 /ide install 时引用带空格的 IDE CLI 路径 | OPEN | 修复 Windows 上编辑器 CLI 路径包含空格时 `/ide install` 失败的问题，引用路径修复。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30246) |
| #30088 | fix(core): 将错误报告移出共享临时目录 | OPEN | 将包含完整聊天历史的错误报告从 `os.tmpdir()` 移至 `~/.gemini/tmp/error-reports/`，并限制为当前用户可读。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30088) |
| #30148 | fix(acp): ACP 模式下触发 SessionStart 和 Notification 钩子 | OPEN | 在 ACP 会话创建/恢复时触发 SessionStart 钩子，在工具请求确认时触发 Notification 钩子。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30148) |
| #30178 | fix(cli): IME 提交和 Enter 同 tick 时提交完整文本 | OPEN | 修复韩语输入法（IME）提交后立即按 Enter 时，最后一个音节被丢失的问题（如 `테스트` 提交为 `테스`）。 | [查看](https://github.com/google-gemini/gemini-cli/pull/30178) |

## 5. 功能需求趋势

从近期 Issue 和 PR 中可观察到以下社区关注方向：

1. **子代理（Subagent）稳定性与可见性**：多个 P1/P2 Bug 指向子代理在超时、挂起、配置继承及轨迹可见性方面的缺陷，社区期待更可靠的子代理生命周期管理。
2. **AST 感知的代码理解**：围绕 AST 感知的文件读取、搜索和代码库映射出现多个议题，旨在减少 Token 浪费并提升代码导航精度。
3. **浏览器代理跨平台兼容性**：Wayland 支持、持久会话锁恢复、settings.json 配置覆盖等问题集中反映浏览器子代理在不同环境下的脆弱性。
4. **ACP 协议生态完善**：`session/close`、钩子触发、错误上报等 ACP 相关 PR 表明社区正在推动 Agent 客户端协议的标准化与企业级可用性。
5. **安全与破坏性操作防护**：社区开始关注 Agent 在执行 `git reset --force` 等破坏性命令时的安全边界与用户确认机制。

## 6. 开发者关注点

- **高优先级 Bug 积压**：多个 P1 级 Issue（如 #22323、#21409、#22186）长期处于 `status/need-retesting` 或 `status/need-information` 状态，开发者期待维护者尽快复测并给出修复计划。
- **配置一致性问题**：Browser Agent 忽略 `settings.json` 覆盖（#22267）、Symlink 代理未被识别（#20079）等问题表明配置系统在不同代理类型间表现不一致。
- **大规模工具调用限制**：工具数量超过阈值时出现 400 错误（#24246），开发者希望 CLI 能更智能地限制工具作用域，而非直接报错。
- **本地化与输入体验**：IME 输入法导致文本丢失（#30178）等细节问题反映非英文输入环境下的体验仍需打磨。
- **文档与链接完整性**：多个 PR 专门修复断开的内部锚点和外部链接，说明文档可用性是社区持续关注的基础建设项。

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报
**日期：** 2026-11-13  
**数据来源：** [github.com/esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)

---

## 1. 今日速览

DeepSeek Reasonix 今日发布 **v2.61.0** 双版本更新，包括 Reasonix CLI 和 Reasonix Studio。其中 Reasonix Studio 宣布为**最后一个版本**，移除了反馈建议、崩溃报告上传及匿名统计，并修复了文件树、提交历史等一批问题。过去24小时内社区无新 Issues 和 Pull Requests 更新。

---

## 2. 版本发布

### Reasonix Studio v2.61.0（最终版）
- **发布标签：** [studio-v2.61.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/studio-v2.61.0)
- **重要声明：** 本版是 Reasonix Studio 的**最后一个版本**，后续不再维护。
- **主要变更：**
  - 移除软件内的反馈建议、崩溃报告上传和匿名统计功能。
  - 修复文件树、提交历史等一批已知问题。

### Reasonix CLI v2.61.0
- **发布标签：** [v2.61.0](https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v2.61.0)
- **主要变更：** CLI 归档基于 Studio 版本 [studio-v2.61.0] 构建，随同发布。

---

## 3. 社区热点 Issues

过去24小时内，**该仓库无新 Issues 更新（共 0 条）**，因此无法列出 10 个近期活跃的社区热点 Issue。

为参考起见，本次版本发布中涉及的相关 Issue 编号如下（均为已修复项，非新增热点）：

| 编号 | 标题/内容 | 状态 | 链接 |
|------|-----------|------|------|
| #15090 | 新增设置「允许模型直接打开工作区内的文件夹」，默认关闭 | 已修复 | [#15090](https://github.com/esengine/DeepSeek-Reasonix/issues/15090) |
| #15091 | 没有伪控制台的 Windows 上，终端会说明原因，而不是报"shell 启动失败" | 已修复 | [#15091](https://github.com/esengine/DeepSeek-Reasonix/issues/15091) |
| #15092 | 公式不再被裁掉上标的顶部 | 已修复 | [#15092](https://github.com/esengine/DeepSeek-Reasonix/issues/15092) |

---

## 4. 重要 PR 进展

过去24小时内，**该仓库无新 Pull Requests 更新（共 0 条）**，因此无法列出 10 个近期重要 PR。

本次版本中随提交附带的相关变更记录（非 PR，为直接 commit）：

| 提交 ID | 变更内容 | 链接 |
|---------|----------|------|
| `376376843` | 工作台文件树支持拖动边缘调整宽度，宽度会被记住，双击边缘恢复默认 | [376376843](https://github.com/esengine/DeepSeek-Reasonix/commit/376376843) |
| `3807e411d` | 新增「进程」按钮，列出本会话正在运行的后台任务和子智能体 | [3807e411d](https://github.com/esengine/DeepSeek-Reasonix/commit/3807e411d) |

---

## 5. 功能需求趋势

由于过去24小时内无新 Issues 产生，无法从社区新增需求中提炼趋势。基于本次发布说明可见的近期关注方向，可推断社区/开发团队当前的产品侧重点包括：

- **工作区交互体验优化**：文件树可拖拽调整宽度并记忆、双击恢复默认，体现对 IDE 布局灵活性的关注。
- **后台任务可视化**：新增「进程」按钮，列出会话中的后台任务和子智能体，符合 AI 开发工具对多智能体/异步任务管理的需求。
- **模型操作权限细化**：新增「允许模型直接打开工作区内的文件夹」设置（默认关闭），体现社区对 AI 自主操作本地文件的安全与审计需求。
- **跨平台终端稳定性**：修复 Windows 无伪控制台时的终端启动提示，说明跨平台兼容性仍是持续关注点。
- **数学公式渲染**：修复公式上标被裁剪问题，表明对技术文档/学术场景下的 Markdown/LaTeX 渲染有持续改进需求。

---

## 6. 开发者关注点

基于本次发布说明及版本性质，开发者反馈与关注点可归纳为：

1. **产品生命周期变更**：Reasonix Studio 宣布 v2.61.0 为最后一个版本，开发者需关注后续迁移方案或替代方案（如 CLI 是否继续维护）。
2. **隐私与遥测**：移除崩溃报告和匿名统计，可能反映部分用户对数据上传的敏感性，但也可能导致后续问题排查难度增加。
3. **本地文件操作安全**：新增模型打开文件夹的默认关闭设置，说明开发者担心 AI 模型越权访问本地工作区，期望更细粒度的授权控制。
4. **终端兼容性**：Windows 无伪控制台场景下的错误提示优化，显示跨平台终端启动仍是痛点。
5. **界面细节打磨**：文件树宽度记忆、公式渲染上标裁剪等修复，表明社区对编辑器基础交互细节有较高要求。

---

> **说明：** 本日报基于提供的 GitHub 数据生成。因过去24小时内 Issues 和 Pull Requests 更新数量均为 0，第 3、4 部分未能列出 10 个条目，仅列出了与本次发布相关的 Issue 和 commit 引用。如需完整历史 Issues/PR 列表，建议直接访问 [DeepSeek-Reasonix GitHub 仓库](https://github.com/esengine/DeepSeek-Reasonix)。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-13)

## 今日速览

OpenCode 社区今日活跃度较高，共记录 19 条 Issue 更新与 50 条 PR 更新。核心关注点集中在 **v2 桌面端与 CLI 的稳定性问题**（如模型状态不同步、响应延迟、终端快捷键失效）以及 **子代理并发控制** 的新功能开发。暂无新版本发布，社区正集中修复 2.2.x 系列遗留 Bug 并推进多模态与移动端支持。

---

## 版本发布

过去 24 小时内无新版本发布。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 关注点 | 链接 |
|---|------|------|--------|------|
| #49742 | Message timestamp option is missing in OpenCode CLI v2.0.8 | OPEN | 用户反映 v2.0.8 移除了 v1.18.31 中的消息时间戳开关（Ctrl+P 切换），影响会话审计与调试，已有 13 条评论与 10 个赞，社区关注度持续高涨。 | [查看](https://github.com/anomalyco/opencode/issues/49742) |
| #53756 | [V2] Bedrock application inference profile ARN gets Nova-format effort variants for Claude models | OPEN | AWS Bedrock 应用推理配置文件 ARN 会为 Claude 模型错误生成 Amazon Nova 格式的推理参数，导致 `reasoningConfig` 返回 400，是跨云厂商模型适配的典型兼容性问题。 | [查看](https://github.com/anomalyco/opencode/issues/53756) |
| #63506 | desktop: prompt footer keeps stale model after a command sets its own model | OPEN | 桌面端 TUI 底部状态栏在 slash command 切换模型后未刷新，仍显示旧模型名称，导致用户对当前会话模型产生误判，属于 v2 桌面端 UI 同步缺陷。 | [查看](https://github.com/anomalyco/opencode/issues/63506) |
| #48596 | [Feature]: Make Compaction Summary Collapsible by Default | OPEN | 会话自动压缩后的摘要默认展开，占用屏幕空间，社区请求默认折叠，已有 4 个赞与 5 条评论，属于 TUI 体验优化方向。 | [查看](https://github.com/anomalyco/opencode/issues/48596) |
| #63568 | rate limit bug | CLOSED | 用户长期未使用后发送简单消息即触发免费层限流，等待 7 天仍未恢复，反映免费额度重置机制可能存在 Bug，社区关注度集中在计费与限流透明度上。 | [查看](https://github.com/anomalyco/opencode/issues/63568) |
| #63626 | cli: `opencode upgrade` dumps raw npm EACCES... | CLOSED | Linux 下全局前缀为 root 所有时，`opencode upgrade` 抛出原始 npm EACCES 堆栈，且可能留下旧 v1 二进制遮挡新版本，影响升级体验。 | [查看](https://github.com/anomalyco/opencode/issues/63626) |
| #63576 | [Desktop] Even very short prompts take a very long time... | CLOSED | 桌面端 2.2.7 即使是单词提示也需极长时间才出现首个 token，跨提供商、跨会话、禁用插件均复现，指向核心推理链路性能问题。 | [查看](https://github.com/anomalyco/opencode/issues/63576) |
| #63567 | [FEATURE]: tui: image paste from clipboard does nothing on Wayland (GNOME) | CLOSED | Wayland 环境下 TUI 无法粘贴剪贴板图片（Ctrl+V 无反应），影响多模态输入体验，属于 Linux 桌面端适配空白。 | [查看](https://github.com/anomalyco/opencode/issues/63567) |
| #63150 | desktop: pairing QR code is inverted in dark theme... | CLOSED | 深色主题下配对二维码渲染为浅色-on-深色（反色），Android  App 无法扫描，阻断设备绑定流程，属于 UI 渲染 Bug。 | [查看](https://github.com/anomalyco/opencode/issues/63150) |
| #63629 | cli: Shift+Enter newline is ignored inside tmux with Kitty | OPEN | Kitty 终端内直接运行时 Shift+Enter 可换行，但在 tmux 中被忽略，Ctrl+J 正常，属于终端复用器下的按键映射兼容性问题。 | [查看](https://github.com/anomalyco/opencode/issues/63629) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #63227 | feat(core): bound subagent concurrency | OPEN | 为单个会话的子代理运行数量增加硬上限，解决无并发控制导致的成本失控问题，附带文档更新，由 @darkmatter2222 提交。 | [查看](https://github.com/anomalyco/opencode/pull/63227) |
| #63630 | revert(core): restore tool dispatch before nested repair | OPEN | 回滚 PR #63444 中的工具修复压缩提交 `c80548e800`，因该变更超出了请求范围，恢复工具分发顺序。 | [查看](https://github.com/anomalyco/opencode/pull/63630) |
| #63573 | fix(core): honor advertised tool names during direct call repair | OPEN | 修复直接调用时工具名不一致的问题（如广告为 `preview` 实际为 `bash`），复用工具库传递给修复钩子，防止错误执行 `shell`。 | [查看](https://github.com/anomalyco/opencode/pull/63573) |
| #63616 | fix(core): return write confirmations as strings | CLOSED | 内置 `write` 工具现在返回字符串确认消息（如 `"Created file successfully: src/a.ts"`），而非结构化对象，提升调用兼容性。 | [查看](https://github.com/anomalyco/opencode/pull/63616) |
| #63618 | fix(core): return empty structured output from patch | CLOSED | `patch` 工具成功时返回 `{}` 结构化输出，以符合多文件补丁契约，解决兼容性问题。 | [查看](https://github.com/anomalyco/opencode/pull/63618) |
| #63623 | refactor(core): return directory and content from the skill tool | CLOSED | `skill` 工具成功调用后返回 `{ directory, content }` 结构化输出，调用者需从 `output.output` 读取，属于代码重构。 | [查看](https://github.com/anomalyco/opencode/pull/63623) |
| #63612 | feat(tui): unload a local model on /clear and /exit | OPEN | `/clear` 和 `/exit` 重置聊天时请求服务器卸载本地模型，避免模型占用资源，由 @OmarAlaaeldein 提交。 | [查看](https://github.com/anomalyco/opencode/pull/63612) |
| #63619 | fix(script): honor grey exceptions on Windows | OPEN | 修复 Windows 上 `check-greys` 忽略样例表例外的问题，Bun glob 返回反斜杠路径导致正则匹配失败，现已规范化平台分隔符。 | [查看](https://github.com/anomalyco/opencode/pull/63619) |
| #63620 | test(tui): pin RGB off in the go-upsell-art test | OPEN | 修复 `COLORTERM=truecolor` 导致 TUI 艺术测试失败，将测试渲染器 RGB 固定为关闭，避免半块字符绘制问题。 | [查看](https://github.com/anomalyco/opencode/pull/63620) |
| #63002 | feat(desktop): one persistent browser profile... | OPEN | 桌面端浏览器改为全局持久化配置文件，支持导入登录态与扩展，侧边栏链接在同一配置中打开，替代原先每个面板独立内存分区的方案。 | [查看](https://github.com/anomalyco/opencode/pull/63002) |

---

## 功能需求趋势

从本日全部 Issues 与 PR 中提炼，社区最关注的功能方向如下：

1. **桌面端与 TUI 体验优化**
   - 模型状态同步（#63506）、压缩摘要折叠（#48596）、消息时间戳恢复（#49742）、Wayland 剪贴板图片粘贴（#63567）、深色主题二维码渲染（#63150）。
2. **多模态与媒体支持**
   - 音频/视频附件读取（#54496，已合并相关 PR）、Android 移动端发布（#62721）、浏览器工具命名空间稳定性（#63625）。
3. **跨平台终端兼容性**
   - tmux/Kitty 下快捷键映射（#63629）、Windows 样例表异常处理（#63615/#63619）、Linux 升级权限问题（#63626）。
4. **子代理与并发治理**
   - 子代理并发上限（#63227）、工具输入修复与 Schema 快照一致性（#53025、#63573）。
5. **计费与限流透明度**
   - 免费层限流误触及重置机制（#63568、#63617、#63622）。

---

## 开发者关注点

**高频痛点：**
- **v2 桌面端稳定性**：响应延迟（#63576）、模型状态不同步（#63506）、浏览器工具消失（#63625）、菜单模态框堆叠（#63624）等问题集中在 2.2.x 版本，表明桌面端仍处于快速迭代与不稳定期。
- **免费层限流体验**：多个用户反馈简单对话即触发每日限额，且等待后未恢复，社区对限流规则缺乏透明度表示不满。
- **CLI 升级体验**：`opencode upgrade` 在 Linux 权限受限环境下暴露原始 npm 错误，且可能留下旧版本二进制，影响平滑升级。

**开发者活跃领域：**
- 核心维护者 @rekram1-node

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报
**日期**: 2026-11-13  
**仓库**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

今日社区活动集中在 **桌面端稳定性**、**跨平台部署（Windows/WSL2）** 以及 **安全加固（sec-marathon）** 三个方向。共新增/更新 9 条 Issue 和 50 条 PR，其中多个安全相关 PR 正在解决会话附加、文件写入、SSRF 及日志泄露等问题；桌面端 WebSocket 断线重连和 Windows MSIX 安装问题成为今日最高优先级的 Bug。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 重要性说明 | 链接 |
|---|------|---------|-----------|------|
| #154326 | Desktop transcript collapses to stale anchor after WS disconnect storm | 桌面端 WebSocket 断线风暴后，聊天转录回退到数天前的旧片段，中间约 800 行消息丢失 | 直接影响桌面端核心体验，P2 优先级，已有 3 条评论跟进 | [查看](https://github.com/NousResearch/hermes-agent/issues/154326) |
| #154584 | Fatal Python error: Bus error (SIGBUS) on WSL2 | WSL2 部署下网关进程反复非正常退出，36 小时内发生 5 次，部分导致整个 WSL VM 崩溃 | 涉及服务器端稳定性，P2，WSL2 用户受影响显著 | [查看](https://github.com/NousResearch/hermes-agent/issues/154584) |
| #154335 | [Windows · MSIX] gateway auto-start silently fails | Microsoft Store/MSIX 安装下，`hermes gateway install` 注册的计划任务无法启动 bundled python.exe，错误被 wscript 吞掉 | Windows 商店版用户无法自动启动网关，P2，安装/部署类高频痛点 | [查看](https://github.com/NousResearch/hermes-agent/issues/154335) |
| #154336 | Windows v0.23.1: Kanban managed_worker never issues first API call (OAuth-pool provider) | Windows 下使用 OAuth 凭据池的 Kanban 托管工作器启动后从不发出首次 API 调用，CLI 和静态密钥提供商正常 | 涉及 OAuth 认证流程与任务调度，P2，影响自动化工作流 | [查看](https://github.com/NousResearch/hermes-agent/issues/154336) |
| #154736 | [Setup]: 微信会话未显示 Codex 图片生成工具 | 微信会话中未显示 Codex 图片生成工具，用户已尝试配置 `image_gen.provider` 为 `openai-codex`，但未验证实际出图 | 中文社区反馈，涉及多模态工具与即时通讯平台集成，P2 | [查看](https://github.com/NousResearch/hermes-agent/issues/154736) |
| #154733 | [Bug][Desktop]: clarify card shows question but not choice buttons (Arabic/RTL session) | 桌面端 clarify 卡片在阿拉伯语/RTL 会话中只显示问题文本，不显示选择按钮，用户被迫改用自由文本回答 | 国际化/RTL 适配问题，P2，影响非 LTR 语言用户体验 | [查看](https://github.com/NousResearch/hermes-agent/issues/154733) |
| #134252 | Run LLM middleware for auxiliary client calls | `llm_request`/`llm_execution` 中间件仅对主 Agent 循环生效，辅助客户端（标题生成、压缩、背景审查等）调用未被覆盖 | 功能完整性缺口，P2，影响插件和辅助功能的一致性 | [查看](https://github.com/NousResearch/hermes-agent/issues/134252) |
| #147623 | [Bug]: Telegram free-response chats/topics bypass bots_require_mention | Telegram 群组/话题配置为免响应时，`bots_require_mention: true` 被绕过 | 已关闭，但涉及多平台适配一致性，P3，社区关注机器人权限边界 | [查看](https://github.com/NousResearch/hermes-agent/issues/147623) |
| #154737 | [Feature]: Publish has_blocking_approval | 团队适配器和插件需导入 `tools.approval.has_blocking_approval`，但该函数不在公开列表中，验证器会报私有核心导入警告 | 插件开发者需求，P3，反映公开 API 边界不够清晰 | [查看](https://github.com/NousResearch/hermes-agent/issues/154737) |
| #154636 | fix(gateway): keep the /sethome nudge from non-admins on gated chats | WhatsApp 网关向每个首次联系的发送者发送一次性 `/sethome` 提示，客户面向机器人场景下会干扰正常对话 | 网关行为调优，P2，sec-marathon 相关，影响客服类场景 | [查看](https://github.com/NousResearch/hermes-agent/pull/154636) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 功能/修复说明 | 优先级/标签 | 链接 |
|---|------|--------------|------------|------|
| #153701 | fix(dashboard): guard /api/fs/write-text like the reads it saves | 仪表板文件写入接口此前跳过读取接口的所有守卫，可能导致覆盖 `config.yaml`、`.env`、`authorized_keys` 等敏感文件 | P1, sec-marathon | [查看](https://github.com/NousResearch/hermes-agent/pull/153701) |
| #154506 | fix(cli): prove lease ownership in session-attach handshake | 会话附加握手中不再仅回显 lease_id，改为证明租赁所有权，防止本地其他进程冒充会话 | P2, sec-marathon | [查看](https://github.com/NousResearch/hermes-agent/pull/154506) |
| #154614 | fix(gateway): keep user content and identities out of INFO+ logs (HX017) | 网关和适配器日志在 INFO+ 级别下逐字记录消息体，现进行脱敏，避免用户内容进入 `hermes debug share` 上传 | P3, sec-marathon | [查看](https://github.com/NousResearch/hermes-agent/pull/154614) |
| #154503 | fix(a2a): put push callbacks behind the shared SSRF guard | A2A 推送回调 URL 仅做字符串前缀匹配，未解析主机，可能绕过私有网段防护访问元数据服务 | P2, sec-marathon | [查看](https://github.com/NousResearch/hermes-agent/pull/154503) |
| #154509 | fix(plugin-catalog): pin live catalog redirects to catalog hosts | 实时目录获取会跟踪任意重定向，且在缓冲完整 body 后才检查大小上限，现限制重定向目标并流式检查大小 | P2, sec-marathon | [查看](https://github.com/NousResearch/hermes-agent/pull/154509) |
| #154574 | fix(config): treat HERMES_MANAGED_DIR (and HERMES_HOME) as launch-only | 环境变量可从用户可写层（`.env`、1Password 引用等）被覆写，现限制为仅启动时读取 | P2, sec-marathon | [查看](https://github.com/NousResearch/hermes-agent/pull/154574) |
| #154591 | fix(cron): expand profile_routes under primary's own secret scope | 卫星网关作用域下错误使用主目录的密钥作用域扩展路由，可能导致配置泄露或路由错误 | P2, sec-marathon | [查看](https://github.com/NousResearch/hermes-agent/pull/154591) |
| #141880 | fix(config): cache require_readable_config_before_write | 配置读取函数每次调用都严格解析 `config.yaml`，插件钩子频繁调用时造成重复开销，现增加缓存 | P2, area/config | [查看](https://github.com/NousResearch/hermes-agent/pull/141880) |
| #154635 | fix(git): run read-only diff and status views under repository-aware git env | Git diff/status 视图未屏蔽仓库自定义过滤器，可能导致意外执行用户定义的转换程序 | P2, comp/tools | [查看](https://github.com/NousResearch/hermes-agent/pull/154635) |
| #138887 | feat(desktop): opt-in transparent chat windows on Linux | Linux 桌面端新增可选透明聊天窗口，依赖窗口合成器（Hyprland/KWin/picom）的 alpha 通道支持 | P3, comp/desktop | [查看](https://github.com/NousResearch/hermes-agent/pull/138887) |

---

## 5. 功能需求趋势

从今日 Issues 和 PR 中可提炼出以下社区关注方向：

1. **跨平台部署稳定性**：Windows MSIX 安装、WSL2 网关崩溃、Windows OAuth 提供商集成等问题集中爆发，说明桌面端和本地网关在非 Linux 主流环境下的适配仍是短板。
2. **多平台即时通讯集成**：Telegram、微信（WeCom）、WhatsApp 等平台的权限模型（如 `bots_require_mention`）、工具显示（Codex 图片生成）等问题反复出现，社区希望 Hermes 在各 IM 平台上表现一致。
3. **辅助客户端与中间件覆盖**：#134252 指出辅助客户端（标题生成、压缩、背景审查等）缺少 LLM 中间件，反映用户希望 Agent 能力在主循环之外也能得到统一治理。
4. **国际化与可访问性**：#154733 的 RTL/Arabic 界面问题显示，非英语/非 LTR 语言用户的桌面端体验仍需改进。
5. **插件开发者体验**：#154737 要求公开 `has_blocking_approval`，说明插件生态正在扩张，对公开 API 边界和权限查询能力的需求在增加。

---

## 6. 开发者关注点

**高频痛点：**
- **安全加固（sec-marathon）**：今日大量 PR 集中在会话附加认证、文件写入守卫、SSRF 防护、日志脱敏等安全主题，说明社区和维护者正在集中解决信任边界和数据泄露风险。

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报
**日期**: 2026-11-13  
**数据来源**: github.com/openclaw/openclaw

---

## 1. 今日速览

OpenClaw 今日发布 **v2026.11.5-beta.2**，重点改进了长对话的分页历史浏览与归档读取，并修复了 macOS 端保存凭据的问题。社区活跃度集中在 OpenClaw ID 权限体系、Gateway 稳定性及跨平台客户端体验三个方向，今日更新的 5 个 Issue 和 20 个 PR 中，安全边界、角色管理与日志隔离成为开发者关注的核心。

---

## 2. 版本发布

### v2026.11.5-beta.2
- **长对话分页历史**：双向分页历史现已可浏览，包含可见的历史边界和受限的归档读取，提升大规模会话的可用性。（#188450 #188483 #188557 #188372 #190690，@steipete）
- **macOS 端凭据保留**：macOS 应用现可正确保存已保存的密钥/凭据。

[查看完整 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.11.5-beta.2)

---

## 3. 社区热点 Issues

今日共更新 5 个 Issue，全部列出如下：

| # | 标题 | 优先级/标签 | 核心问题 | 链接 |
|---|------|-------------|----------|------|
| #161885 | Talk 实时咨询忽略 per-model agentRuntime 与回退，报错 "No API key found for provider anthropic" | P1, 🦞 diamond lobster, impact:message-loss, impact:auth-provider | 实时 Talk 代理咨询忽略每模型 `agentRuntime` 设置及回退链，导致 Anthropic 密钥缺失失败。 | [查看](https://github.com/openclaw/openclaw/issues/161885) |
| #156548 | Plugin `toolContext.delivery.send` 媒体未在 Control UI 显示 | P2, 🦞 diamond lobster, impact:session-state, impact:ux-friction | 插件通过 `toolContext.delivery.send({ mediaUrl })` 发送的媒体到达出站通道，但未在 Control UI 中显示。 | [查看](https://github.com/openclaw/openclaw/issues/156548) |
| #197741 | macOS 孤立 SSH git-upload-pack 进程消耗 GB 级带宽 | P2, impact:other | macOS 上出现孤立的 `ssh git-upload-pack` 进程，来源调用方不明，导致异常带宽消耗。 | [查看](https://github.com/openclaw/openclaw/issues/197741) |
| #196836 | Windows Node 未宣传 `computer.act`，尽管已启用屏幕捕获 | bug, regression, P2, impact:ux-friction | Windows 节点在启用屏幕捕获后仍不宣传 `computer.act` 功能，属于回归问题。 | [查看](https://github.com/openclaw/openclaw/issues/196836) |
| #197938 | 心跳检查清单如何保持更新？文档缺失 | bug, docs, P3, 🦞 diamond lobster, impact:ux-friction | 默认心跳现作为自动化中的主动检查运行，但缺乏清晰说明用户或代理如何保持检查列表最新。 | [查看](https://github.com/openclaw/openclaw/issues/197938) |

**社区反应简述**：今日 Issue 均无点赞，评论数较少（1-6 条），但多个问题带有 `diamond lobster` 评级和 `P1/P2` 优先级，表明它们对核心功能（消息传递、身份认证、跨平台兼容性）有较高影响，建议维护团队优先跟进。

---

## 4. 重要 PR 进展

从今日更新的 20 个 PR 中，选取 10 个具有代表性的条目：

| # | 标题 | 类型/优先级 | 功能或修复说明 | 链接 |
|---|------|-------------|----------------|------|
| #162229 | fix(mcp): 不可达的远程 MCP 服务器不再阻塞 Doctor 门控的 Gateway 启动 | docs, gateway, agents, P1, size: L | 修复 Doctor 独立检查在远程 HTTP/SSE MCP 服务不可用时拒绝可用安装的问题，包括初始化但不响应工具目录请求的服务器。 | [查看](https://github.com/openclaw/openclaw/pull/162229) |
| #197739 | feat(openclaw-id): 成员角色来自 gateway.roles.definitions | docs, app: web-ui, gateway, P2, size: XL | 让 OpenClaw ID 成员角色（operator/viewer）的权限由网关角色定义控制，而非硬编码，所有者可自定义角色。 | [查看](https://github.com/openclaw/openclaw/pull/197739) |
| #197748 | feat(openclaw-id): 带沙盒会话工具的访客成员角色 | docs, app: web-ui, gateway, P2, size: XL | 新增访客角色，允许成员在沙盒环境中使用会话工具，填补操作者与查看者之间的权限空白。 | [查看](https://github.com/openclaw/openclaw/pull/197748) |
| #197712 | feat(gateway): 角色定义不再在没有默认角色时开启命名角色强制 | docs, gateway, scripts, commands, P2, size: L | 修复 Gateway 存在角色定义时强制所有操作者签名验证的问题，恢复设备令牌和设置码签名及浏览器代码配对。 | [查看](https://github.com/openclaw/openclaw/pull/197712) |
| #197978 | fix(logging): 按状态目录隔离 Gateway 日志 | docs, gateway, security, scripts, docker, size: S | 修复测试网关与真实网关因使用不同状态目录却追加到同一宿主机每日日志而导致诊断污染的问题。 | [查看](https://github.com/openclaw/openclaw/pull/197978) |
| #197975 | fix: 保持 Gateway 运行时检查不在主线程 | gateway, cli, scripts, size: XL | 修复就绪检查或子进程失败诊断期间的文件系统 I/O 阻塞，避免 Gateway 级停顿。 | [查看](https://github.com/openclaw/openclaw/pull/197975) |
| #197969 | fix(status): Ctrl-C 无法在 Gateway 探测期间停止 `openclaw status` | commands, size: XS, P2 | 修复 Gateway 探测等待期间 `Ctrl-C` 无法中断 `openclaw status` / `--json` 的问题，启动器会在约 2 秒后强制终止。 | [查看](https://github.com/openclaw/openclaw/pull/197969) |
| #197891 | feat(ui): 使用括号快捷键遍历会话 | docs, app: macos, app: web-ui, scripts, size: L, P3 | 新增直接上一个/下一个会话的快捷键操作，减少在命令面板搜索或鼠标操作的依赖。 | [查看](https://github.com/openclaw/openclaw/pull/197891) |
| #197954 | fix(ui): 保持反应容器中的表格展开状态 | app: web-ui, size: XS | 修复扁平聊天 Markdown 表格在更新后失去使用剩余转录宽度的能力，恢复表格展开行为。 | [查看](https://github.com/openclaw/openclaw/pull/197954) |
| #197572 | feat(rapid-mlx): 支持本地聊天和内存嵌入 | docs, size: XL, P3 | 为 Rapid-MLX 用户提供命名设置和内存搜索提供商，支持 `rapid-mlx/<model-id>` 或显式服务嵌入模型进行内存搜索。 | [查看](https://github.com/openclaw/openclaw/pull/197572) |

---

## 5. 功能需求趋势

从今日 Issues 与 PR 中提炼出的社区关注方向：

1. **OpenClaw ID 权限体系细化**：多个 PR 集中在成员角色定义、访客角色、沙盒会话工具及签名流程解耦，表明社区对多租户权限管理和安全边界控制的需求正在上升。
2. **Gateway 稳定性与启动可靠性**：MCP 服务器不可达时的启动阻塞、主线程 I/O 阻塞、日志目录隔离等修复，反映开发者希望在复杂网络和多实例环境下提升 Gateway 的鲁棒性。
3. **跨平台客户端体验**：macOS 孤立 SSH 进程带宽问题、Windows 节点 `computer.act` 未宣传、macOS 凭据保留等，显示跨平台一致性仍是痛点。
4. **实时通信与插件媒体支持**：Talk 实时咨询忽略模型运行时与回退、插件媒体未在 Control UI 显示，说明实时协作和多模态内容传输是当前体验短板。
5. **本地 AI 推理集成**：Rapid-MLX 本地聊天与内存嵌入支持的加入，显示社区对本地模型和私有化部署的兴趣增加。

---

## 6. 开发者关注点

- **安全边界与兼容性风险**：多个 P2 及以上 PR 标记了 `merge-risk: 🚨 security-boundary` 和 `merge-risk: 🚨 compatibility`，维护者在合并角色定义、访客角色及网关签名相关变更时需谨慎评估。
- **文档与可观测性缺失**：心跳检查清单缺乏更新说明（#197938）、Gateway 日志污染诊断困难（#197978），提示文档和可观测性建设滞后于功能迭代。
- **CI/测试环境依赖**：多个 PR 带有 `clawsweeper:intake:needs-environment` 和 `clawsweeper:intake:needs-repro` 标签，说明复现环境搭建成本较高，可能影响修复的及时性。
- **用户中断体验**：`Ctrl-C` 无法及时停止命令（#197969）等问题，提示 CLI 工具的信号处理和优雅退出机制仍需完善。

---

*本日报基于 GitHub 仓库 openclaw/openclaw 在 2026-11-13 的公开数据生成，仅供社区参考。*

:::
