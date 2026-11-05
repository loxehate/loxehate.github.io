---
title: "AI CLI 工具社区动态日报"
published: 2026-11-05
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-11-05

> 生成时间: 2026-11-05 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-11-05）

## 1. 生态全景

当前 AI CLI 工具正处于从“单轮对话助手”向“多 Agent 编排与企业级开发平台”的关键转型期。各主流工具普遍进入高频小版本迭代与 Alpha 阶段，安全沙箱、跨平台兼容性、MCP/ACP 协议标准化成为共性瓶颈。社区反馈呈现明显分层：成熟工具侧重稳定性与权限治理，新兴工具则聚焦多模态模型适配与移动端体验。整体来看，AI 原生开发工作流正从“代码生成”扩展至“端到端任务自动化”，但破坏性操作防护与会话状态一致性仍是行业共性短板。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues（24h 更新） | PR（24h 更新） | Release 情况 | 迭代节奏 |
|------|------|-------------------|---------------|-------------|---------|
| Claude Code | anthropics/claude-code | 10 条精选（未披露总数） | 2 个 | v2.1.318（小版本，增量特性） | 稳定增量 |
| OpenAI Codex | openai/codex | 10 条精选（未披露总数） | 10 个精选（多为自动化 bot 提交） | 4 个 Rust Alpha 版本（0.168/0.167 系列） | 快速 Alpha 迭代 |
| Gemini CLI | google-gemini/gemini-cli | 10 条精选（未披露总数） | 10 个 | v0.68.0-preview.0 / v0.67.0-nightly | 预览/夜间双线发布 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 11 条 | 3 个 | 无新版本 | 以 Issue/PR 维护为主 |
| OpenCode | anomalyco/opencode | 14 条 | 50 条 | 无新版本 | PR 活跃度最高 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 条 | 0 条 | v0.2.2-rc.1（移动端适配） | 低频发布，以 RC 为主 |
| Hermes | NousResearch/hermes-agent | 17 条 | 50 个 | 无新版本 | Issue 与 PR 双高活跃 |
| OpenClaw | openclaw/openclaw | 10 条精选（未披露总数） | 10 个精选 | v2026.11.5-beta.1（Knowledge Scribes + PostgreSQL） | Beta 阶段功能扩张 |

**数据读取**：OpenCode 与 Hermes 的 PR 更新量均达 50 条，属于当日最活跃的两个仓库；Deepseek Harness 近 24 小时无 Issue/PR 更新，仅发布 RC 版本，活跃度最低；Claude Code 虽 PR 数量少，但发布了正式小版本，侧重稳定性打磨。

## 3. 共同关注的功能方向

多个工具社区在以下方向上存在高度重叠的需求：

| 功能方向 | 涉及工具 | 具体社区诉求 |
|---------|---------|------------|
| **安全沙箱与破坏性操作防护** | Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix | Claude Code 反映 macOS/Linux 沙箱权限误报与目录污染（#99728、#101946）；Codex 出现模型误操作销毁 systemd 导致 $10,000+ 损失（#59060），社区强烈要求破坏性命令确认与回滚；Gemini CLI 呼吁在 Git 重置等场景增加安全引导（#22672）；Reasonix 暴露配置解码失败导致安全规则静默失效（#14973）。 |
| **MCP / ACP 协议与可观测性** | Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix | Claude Code 要求 `get_mcp_status` 增加诊断输出（#107289）；Codex 需要 MCP 资源读取转发调用方元数据（#59509）；Gemini CLI 围绕 ACP 钩子与输出监听快速迭代（#30148、#30144）；Reasonix 官方跟进 ACP v2 “background work” 特性（#14977）。 |
| **跨平台稳定性（macOS/Windows/Linux）** | Claude Code、OpenAI Codex、Gemini CLI、Hermes、OpenClaw | Claude Code 面临 macOS 安装器签名缺陷（#70647）与 Ubuntu 26.04 seccomp 失败（#101946）；Codex 反复出现 Windows EPERM 文件锁定与更新器循环下载（#40182、#42484）；Hermes 出现 macOS TCC/EPERM 导致文件拖拽失败（#149139）；OpenClaw Windows Gateway 端口绑定失败为 P0 发布阻塞（#142559）。 |
| **会话状态与后台任务生命周期** | Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix | Claude Code 反映空闲压缩误杀后台 Agent（#106402）；Codex 需要 CLI 后台执行的事件驱动唤醒（#32188）；Gemini CLI Subagent 达到 MAX_TURNS 后错误上报成功（#22323）；Reasonix 设计回合结束与后台作业唤醒机制（#14976）。 |
| **模型能力声明与多模态一致性** | OpenAI Codex、OpenCode、Gemini CLI | OpenCode 反复出现 DeepSeek 免费模型宣称支持图像但实际拒绝（#61842）；Codex 需要向不支持工具的模型发送 `tools` 字段的能力校验（#61843）；Gemini CLI 工具数超过 128 个时触发 400 错误（#24246）。 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 会话 Mod 管理、AWS 跨账号成本归属、企业级权限审计 | 企业开发团队、AWS 深度用户 | 基于 `mantle` 上游，强调 Mod 努力度细粒度控制与会话确认机制，侧重合规与成本可追溯性 |
| **OpenAI Codex** | 计算机使用（Computer Use）、Rust 核心组件、云端线程发现 | 端到端 AI Agent 开发者、桌面自动化场景 | Rust 组件 Alpha 迭代，强调本地浏览器控制与 VS Code 扩展集成，正在从 CLI 向“计算机使用”平台演进 |
| **Gemini CLI** | Subagent 编排、浏览器子代理、AST 感知代码操作 | 复杂代码库导航开发者、多 Agent 任务编排用户 | 预览/夜间双线发布，重点在 ACP 协议层与工具作用域限制（128 工具阈值），探索 AST 感知以降低 Token 消耗 |
| **DeepSeek Reasonix** | Reasonix Studio 桌面端 UX、Agent/MCP 架构演进（ACP background work） | 桌面端 AI IDE 用户、多 Agent 编排研究者 | 以 Studio 客户端为核心，正在从 v2 向 v3 架构过渡，关注会话区域布局、模型切换与配置容错 |
| **OpenCode** | 模型能力重构（@opencode/ai）、TUI 时间轴交互、MCP 外部服务集成 | 命令行重度用户、多模型提供商适配者 | 正在将七个模型类统一为单一 `Model`，端点支持标志迁移至模型能力，强调模型元数据精确声明与流式解析容错 |
| **Deepseek Harness** | 移动端适配、聊天文本引用插入、紧凑预览 | 移动端对话用户、轻量级客户端场景 | 0.2.2 系列 RC 版本，侧重窄屏布局与软键盘交互，发布频率较低 |
| **Hermes** | 插件生态（SerpKite、Onda MCP、FAL 多模态）、隐私/隐身会话、跨 Profile 会话一致性 | 插件开发者、隐私敏感场景用户、多模态内容创作者 | 插件目录驱动，强调 Web 搜索、图像/视频生成与语音设计能力，正在探索“无痕”会话模式 |
| **OpenClaw** | Knowledge Scribes 知识捕获、PostgreSQL 数据平面、多渠道 IM（WhatsApp/Matrix/Telegram/Zalo） | 企业知识管理、多租户运营商、即时通讯集成者 | Beta 阶段，状态存储从 SQLite 向 PostgreSQL 扩展，侧重知识工作流与区域性 IM 渠道适配 |

## 5. 社区热度与成熟度

- **最高活跃度**：OpenCode（50 条 PR 更新）与 Hermes（50 个 PR、17 个 Issue）在当日代码提交与问题讨论上最为密集，处于快速功能扩张阶段。
- **快速迭代阶段**：OpenAI Codex（4 个 Rust Alpha 版本）与 Gemini CLI（预览 + 夜间双线发布）仍处于预发布/Alpha 阶段，版本号频繁跳变，适合早期采用者与贡献者。
- **稳定维护阶段**：Claude Code 虽 PR 数量少，但发布了正式小版本 v2.1.318，社区问题集中在安装签名、沙箱兼容等“最后一公里”稳定性问题，整体趋向成熟。
- **低活跃度/发布驱动**：Deepseek Harness 近 24 小时无 Issue/PR 更新，仅发布 RC 版本，社区讨论度较低，更多依赖官方发布节奏推进。

## 6. 值得关注的趋势信号

1. **安全沙箱从“可选”变为“刚需”**  
   Codex 出现模型误操作导致 $10,000+ 损失（#59060），Reasonix 暴露配置回退导致安全规则失效（#14973），表明 AI CLI 工具的权限模型正从“默认信任”转向“默认拒绝 + 显式确认”。开发者在选型时应优先评估工具的破坏性操作防护、会话隔离与凭据存储（OS 密钥链

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-11-05）

## 1. 热门 Skills 排行

基于 PR 讨论活跃度与更新频率，以下为社区关注度最高的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简述 | 社区讨论热点 | 状态 | 链接 |
|------|------|---------|-------------|------|------|
| 1 | #1742 `fix(mcp-builder)` | 修复 `mcp>=2.0.0` 中 `streamable_http_client` 导入路径变更及自定义 HTTP 头配置问题 | MCP 协议版本兼容性是社区痛点，直接影响技能与外部服务器的连接稳定性 | OPEN | [#1742](https://github.com/anthropics/skills/pull/1742) |
| 2 | #1298 `fix(skill-creator)` | 修复触发器评估误报/漏报，解决 Windows 子进程管道兼容及运行时失败误判 | 技能触发机制的可靠性直接决定自动化体验，跨平台支持受到广泛关注 | OPEN | [#1298](https://github.com/anthropics/skills/pull/1298) |
| 3 | #1245 `Add notion-spec-to-implementation...` | 新增 Notion 规格转实现技能与定量简历审计技能 | 产品规格到代码任务的自动化拆解，以及简历审计等垂直场景技能需求旺盛 | OPEN | [#1245](https://github.com/anthropics/skills/pull/1245) |
| 4 | #1980 `webapp-testing` | 移除 `with_server.py` 中 `shell=True`，消除命令注入风险（CWE-78） | Web 应用测试技能的安全加固成为社区高频讨论话题 | OPEN | [#1980](https://github.com/anthropics/skills/pull/1980) |
| 5 | #1792 `fix(docx)` | LibreOffice 超时改为报错，并验证输出 DOCX 无修订痕迹 | 文档自动化流程中的容错与结果校验机制引发关注 | OPEN | [#1792](https://github.com/anthropics/skills/pull/1792) |
| 6 | #1771 `feat(skills): proofcore-contract-auditor` | 新增智能合约公证技能，对 Solidity/Rust 合约做静态分析并将审计证明锚定至 TON 区块链 | Web3/智能合约安全审计是新兴技能方向，社区对去中心化审计证明感兴趣 | OPEN | [#1771](https://github.com/anthropics/skills/pull/1771) |
| 7 | #1703 `Add md2video-audio skill` | 基于 Markdown 通过 Marp 生成带真人感语音的 MP4 视频 | 零成本文档转视频的内容创作工作流技能受到创作者关注 | OPEN | [#1703](https://github.com/anthropics/skills/pull/1703) |
| 8 | #525 `Add pyxel skill` | 复古游戏开发技能，支持 Pyxel 游戏实现、头less 运行、帧检测与状态校验 | 游戏开发垂直领域技能拥有长期稳定的社区追随 | OPEN | [#525](https://github.com/anthropics/skills/pull/525) |

> 注：上述全部 PR 均处于 **OPEN** 状态，尚未合并入主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向包括：

1. **工作流自动化与组织协作**
   - 组织内技能直接共享，避免手动下载/上传 `.skill` 文件（#228）
   - 跨团队技能分发与权限边界管理（#492）

2. **代码审查与安全治理**
   - 智能合约静态审计与链上公证（#1771）
   - AI Agent 治理模式：策略执行、威胁检测、审计追踪（#412）
   - 推理质量管道：预校准 → 对抗评审 → 交付验证（#1385）

3. **测试生成与质量保证**
   - Web 应用测试安全加固（避免 `shell=True` 注入风险，#1980）
   - 技能触发评估可靠性（Windows 兼容、运行时失败处理，#1298）

4. **文档与内容处理**
   - DOCX/XLSX/PDF 文档自动化修复与校验（#1792、#2019、#2018）
   - Markdown 转视频/音频内容生产（#1703）
   - 排版质量控制（孤行、寡妇段、编号对齐等，#514）

5. **开发者工具链增强**
   - 复古游戏开发（Pyxel，#525）
   - HPC 集群操作（SCNet/Slurm，#1615）
   - 技能创建与打包工具链完善（#1298、#1681、#1997）

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、更新频繁，且修复或新增功能明确，可能近期落地：

- **#1742 `fix(mcp-builder)`** — MCP 2.0 兼容性修复，影响所有基于 MCP 的技能连接，优先级高  
  [https://github.com/anthropics/skills/pull/1742](https://github.com/anthropics/skills/pull/1742)

- **#1298 `fix(skill-creator)`** — 触发器评估与跨平台稳定性修复，关系到技能创建工具链的核心可用性  
  [https://github.com/anthropics/skills/pull/1298](https://github.com/anthropics/skills/pull/1298)

- **#1245 `Add notion-spec-to-implementation...`** — 新增两个实用技能（Notion 规格转实现、定量简历审计），社区关注度持续  
  [https://github.com/anthropics/skills/pull/1245](https://github.com/anthropics/skills/pull/1245)

- **#1980 `webapp-testing`** — 安全漏洞修复（CWE-78 命令注入），属于高优先级安全补丁  
  [https://github.com/anthropics/skills/pull/1980](https://github.com/anthropics/skills/pull/1980)

- **#1771 `proofcore-contract-auditor`** — 新兴 Web3 安全审计技能，技术新颖且有明确落地场景  
  [https://github.com/anthropics/skills/pull/1771](https://github.com/anthropics/skills/pull/1771)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在文档自动化、代码/合约审计及 Web 应用测试等垂直场景中构建可信、可落地的自动化技能，同时亟待解决技能触发可靠性、跨平台兼容性及社区技能信任边界等基础设施问题。**

---

# Claude Code 社区动态日报
**日期**: 2026-11-05  
**数据来源**: github.com/anthropics/claude-code

---

## 1. 今日速览

Claude Code 发布 v2.1.318 小版本更新，主要围绕会话 mod 确认机制、AWS 跨账号角色假设（assume_role）及 mod 努力度（effort）配置进行增强。社区方面，macOS 原生安装器签名缺陷、API 凭据明文存储、Linux 沙箱兼容性等问题持续引发关注，安全与跨平台稳定性成为当前开发者反馈的核心主题。

---

## 2. 版本发布

### v2.1.318

- **会话 Mod 确认记录**：当 Claude Code 询问是否开启其在会话中写入的 mod 时，现在会记录用户的回答，避免重复询问。
- **AWS 跨账号访问**：`mantle` 上游新增 `assume_role` 支持，可用于访问其他 AWS 账号中的角色，并实现按开发人员的 AWS 成本归属。
- **Mod 努力度选项**：为 mod 新增 `effort` 选项，允许更细粒度地控制模型推理强度。

[查看完整 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.318)

---

## 3. 社区热点 Issues

以下选取过去 24 小时内更新、评论数或关注度较高的 10 个 Issue：

| # | 标题 | 状态 | 评论/👍 | 关注理由 | 链接 |
|---|------|------|---------|----------|------|
| #70647 | macOS 原生安装器生成未签名的 App Bundle，被系统拒绝打开 | OPEN | 18 / 10 | 影响 macOS 用户核心安装体验，涉及代码签名与 Gatekeeper，属高优先级安装缺陷。 | [查看](https://github.com/anthropics/claude-code/issues/70647) |
| #73582 | 建议将 API 凭据存储在 OS 密钥链而非明文文件 | OPEN | 6 / 11 | 涉及 API Key、OAuth Token 等敏感凭据的安全存储，社区关注度高，属长期安全增强需求。 | [查看](https://github.com/anthropics/claude-code/issues/73582) |
| #99728 | macOS 沙箱在嵌套子目录中创建空的 `.claude/.cc-writes/` 目录 | OPEN | 4 / 10 | 沙箱机制污染项目目录结构，已出现多个嵌套目录，影响仓库整洁度与 CI 体验。 | [查看](https://github.com/anthropics/claude-code/issues/99728) |
| #101946 | Linux 沙箱在 Ubuntu 26.04 上因 `apply-seccomp setgroups` 失败 | OPEN | 4 / 7 | 新发行版（Ubuntu 26.04）兼容性问题，涉及未特权用户的沙箱权限，影响 Linux 部署。 | [查看](https://github.com/anthropics/claude-code/issues/101946) |
| #106402 | 后台 Agent 仍在运行时，空闲压缩（Idle Compaction）仍会触发 | OPEN | 4 / 0 | 新近报告（10-31），涉及核心 Agent 调度与会话压缩逻辑冲突，可能导致后台任务中断。 | [查看](https://github.com/anthropics/claude-code/issues/106402) |
| #87741 | JetBrains 终端中 X11 PRIMARY 选择粘贴重复 | OPEN | 6 / 6 | Linux 桌面集成细节缺陷，影响日常编辑体验，体现 TUI 与 IDE 终端的适配不足。 | [查看](https://github.com/anthropics/claude-code/issues/87741) |
| #107330 | Claude Desktop 无法添加文件夹 | OPEN | 1 / 0 | 极新报告（11-04），桌面端核心功能缺失，可能影响 Windows/macOS 桌面用户工作流。 | [查看](https://github.com/anthropics/claude-code/issues/107330) |
| #107289 | `get_mcp_status` 省略 MCP 配置诊断，解析失败时无错误提示 | OPEN | 1 / 0 | 极新报告（11-04），MCP 工具链可观测性缺陷，对构建自定义 MCP 服务器的开发者影响直接。 | [查看](https://github.com/anthropics/claude-code/issues/107289) |
| #58952 | macOS Tahoe 26.x 终端进程树在 `~/Documents` 下触发 EPERM | CLOSED | 6 / 5 | 沙箱权限回归问题，已关闭但标记 stale，反映 macOS 新系统版本适配仍有隐患。 | [查看](https://github.com/anthropics/claude-code/issues/58952) |
| #86478 | `bypassPermissions` 默认模式与 `--permission-mode` 标志被忽略 | CLOSED | 5 / 1 | 权限系统回归 Bug，自动模式强制开启导致绕过权限设置失效，影响自动化场景。 | [查看](https://github.com/anthropics/claude-code/issues/86478) |

---

## 4. 重要 PR 进展

过去 24 小时内仅有 2 个 PR 更新，均为开源社区贡献或机器人提交：

| # | 标题 | 作者 | 状态 | 核心内容 | 链接 |
|---|------|------|------|----------|------|
| #37084 | fix: 为 GitHub API 脚本添加重试、超时和速率限制处理 | @WYSIATI | OPEN | 提取共享 `githubRequest` 工具，统一封装 `fetch()` 的重试/超时/速率限制逻辑，迁移 4 个脚本并新增 52 个单元/集成测试。 | [查看](https://github.com/anthropics/claude-code/pull/37084) |
| #95698 | fix(plugins): 通过 bash 与引用路径运行 ralph-wiggum 和 output-style .sh 钩子 | @claude[bot] | OPEN | 修复 3 个内置插件的钩子路径未加引号问题，解决路径含空格时的执行失败，关联 #95673 和 #78490。 | [查看](https://github.com/anthropics/claude-code/pull/95698) |

> 注：过去 24 小时内仓库仅记录到上述 2 个 PR 更新，未出现核心运行时或 CLI 的大规模合并。

---

## 5. 功能需求趋势

从近期 Issues 中可提炼出以下社区关注方向：

1. **安全与凭据管理**：多个 Issue 指出 API Key/OAuth Token 明文存储（#73582）、数据库凭据绕过（#91144）、权限建议与实际对话框不一致（#91216），社区强烈要求将敏感信息迁移至操作系统密钥链并加强权限审计。
2. **跨平台沙箱稳定性**：macOS Seatbelt（#99728、#70647、#58952）与 Linux seccomp/bubblewrap（#101946）在新系统版本上的兼容性问题频发，沙箱写入目录污染和权限误报成为高频痛点。
3. **MCP 与插件生态**：MCP 配置诊断缺失（#107289）、插件市场刷新横幅重复触发（#79776）、插件钩子路径引用（#95698）表明开发者正在深度使用 MCP 与自定义插件，对工具链可观测性和稳定性要求提升。
4. **IDE 与终端集成**：JetBrains 终端粘贴重复（#87741）、WSL2 启动扫描卡死（#91119）、Windows 浏览器调用失败（#91127）等反映 IDE/终端嵌入场景的适配仍需加强。
5. **Agent 调度与后台任务**：空闲压缩误杀后台 Agent（#106402）、子进程死亡未检测（#89416）、后台桥接进程孤儿（#91143）显示多 Agent 并发与生命周期管理是核心稳定性挑战。

---

## 6. 开发者关注点

**高频痛点：**
- **安装与签名**：macOS 原生安装器产生未签名 App Bundle，导致 Gatekeeper 拦截，用户无法直接打开应用。
- **权限系统回归**：`bypassPermissions` 配置与 CLI 标志在自动模式下被忽略，自动化脚本和 CI 场景受影响。
- **项目目录污染**：沙箱在嵌套子目录中生成大量空的 `.cc-writes/` 目录，干扰 Git 仓库与构建产物。
- **反馈提示过频**：Windows/Linux 上每 2 分钟弹出反馈提示，严重打断开发流程（#91132、#91177）。

**待跟进需求：**
- 将 API 凭据迁移至 OS 原生密钥存储（Keychain/Secret Service）。
- 提供 MCP 配置解析错误的明确诊断输出，避免静默返回空服务器列表。
- 优化 macOS Tahoe 及 Ubuntu 26.04 等新操作系统版本的沙箱兼容性。
- 完善 Claude Desktop 的文件夹添加与窗口标题显示等桌面端基础交互。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报 (2026-11-05)

## 今日速览

Codex 社区今日围绕 **CLI Rust 组件的连续 Alpha 迭代** 与 **Windows 平台稳定性问题** 展开激烈讨论。最引人关注的是一起因模型误操作导致系统级破坏及超万美元损失的高危 Issue，引发社区对 AI 代理安全边界与权限控制的广泛担忧。同时，开发者持续反馈 Windows 端浏览器控制、VS Code 扩展启动及资源泄露等痛点。

## 版本发布

过去 24 小时内，Codex 发布了 4 个 Rust 相关 Alpha 版本，均处于早期迭代阶段：

- **rust-v0.168.0-alpha.2** / **rust-v0.168.0-alpha.1**：连续发布两个 0.168.0 Alpha 版本，说明 Rust 核心组件（可能为 CLI 或底层运行时）正在快速迭代。
- **rust-v0.167.0-alpha.5** / **rust-v0.167.0-alpha.3.1**：0.167.x 系列的补丁式 Alpha 发布，可能修复前序版本的回归问题。

> 注：以上均为预发布版本，生产环境建议谨慎升级。

## 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|----------|----------|------|
| #59060 | 模型误操作摧毁 systemd/容器，造成 $10,000+ 损失 | 用户要求重启服务器，Codex 却销毁了 systemd、容器并运行随机脚本。涉及 gpt-6-sol medium 模型，Linux 环境。 | 评论 309，点赞 329，社区最高关注度，集中讨论 AI 代理的破坏性操作权限与安全沙箱。 | [查看](https://github.com/openai/codex/issues/59060) |
| #51524 | Windows Computer Use 无法获取浏览器 URL | Chrome/Edge 窗口枚举正常，但 `sky.get_window_state` 立即中断，无法读取当前浏览器 URL。 | 评论 67，Windows 桌面端“计算机使用”功能的核心瓶颈。 | [查看](https://github.com/openai/codex/issues/51524) |
| #56655 | VS Code 扩展 UI 无法启动 | 升级至 26.51021.22027 后，VS Code 扩展界面不启动，Windows 平台。 | 评论 45，点赞 68，IDE 集成稳定性问题受开发者广泛关注。 | [查看](https://github.com/openai/codex/issues/56655) |
| #54841 | Work mode 在 BYOK 模式下阻止消息提交 | 启用本地浏览器/计算机工具时，Work mode 与 BYOK 订阅冲突，导致无法提交消息。 | 评论 40，点赞 28，企业级部署与自定义模型场景的兼容性痛点。 | [查看](https://github.com/openai/codex/issues/54841) |
| #56645 | Windows 本地浏览器在 Work 设置中被禁用 | ChatGPT 桌面端在 Windows 上，Work 设置下本地浏览器功能不可用，新聊天可恢复。 | 评论 29，与 #54841 形成同一领域的不同维度反馈。 | [查看](https://github.com/openai/codex/issues/56645) |
| #32188 | CLI 后台执行会话完成需事件驱动唤醒 | 长时间运行命令目前需轮询或长连接占用，建议增加事件驱动唤醒机制以节省模型 Token。 | 评论 26，点赞 26，CLI 性能与交互体验的典型功能需求。 | [查看](https://github.com/openai/codex/issues/32188) |
| #40182 | Windows 运行时更新器每小时重新下载 501.8 MB | EPERM 激活失败后，更新器进入非可重试循环，每小时重复下载巨量数据。 | 评论 17，Windows 端带宽与磁盘资源浪费问题。 | [查看](https://github.com/openai/codex/issues/40182) |
| #42484 | cua_node EPERM 无限循环导致 UI 冻结及 59 GB 内存占用 | Windows 11 上重命名暂存目录失败，导致桌面 UI 冻结并异常消耗内存。 | 评论 13，严重的客户端资源泄露与稳定性缺陷。 | [查看](https://github.com/openai/codex/issues/42484) |
| #59262 | 严重性能回归与每周配额异常耗尽 | 30–90 分钟任务耗时异常，伴随每周配额被异常快速消耗。 | 评论 4，点赞 1，近期新出现的性能与计费相关疑虑。 | [查看](https://github.com/openai/codex/issues/59262) |
| #17543 | 支持向 Codex 会话注入 MCP 自定义通知 | 希望将 MCP 自定义通知作为用户提交转发到活跃会话，增强外部工作流控制能力。 | 评论 10，点赞 2，MCP 生态扩展与头less 自动化方向的需求。 | [查看](https://github.com/openai/codex/issues/17543) |

## 重要 PR 进展（精选 10 条）

今日合并的 PR 多由 `copyberry[bot]` 自动化提交，侧重于内部稳定性、协议对齐与客户端体验优化：

1. **#59520** Populate the local secrets cache after successful saves  
   保存本地密钥后填充解密缓存，避免下次读取重复解密，提升凭据访问性能。[查看](https://github.com/openai/codex/pull/59520)

2. **#59518** Validate UI trees at decode time and simplify display elements  
   在渲染前校验整个 UI JSON 树，拒绝超出预算的超大输入，防止内容被静默丢弃。[查看](https://github.com/openai/codex/pull/59518)

3. **#59517** Simplify pending interactive request tracking in the TUI  
   用单个按到达顺序排列的列表替换并行查找集，简化 TUI 中交互式请求的匹配、重放过滤与清理。[查看](https://github.com/openai/codex/pull/59517)

4. **#59514** Add paginated cloud thread discovery to the cloud client  
   为云客户端新增 `list_threads`，支持游标分页、排序、发起者过滤及读取状态，改善云端会话发现。[查看](https://github.com/openai/codex/pull/59514)

5. **#59510** Use server model defaults for fresh TUI sessions on every connection  
   将服务器端的新会话模型默认值扩展到嵌入式连接，并要求 `config/read` 成功后才能启动新线程。[查看](https://github.com/openai/codex/pull/59510)

6. **#59509** Forward caller metadata on MCP resource reads  
   在 MCP 资源读取中转发调用方元数据（`_meta`），更新协议模板与 TypeScript/Python 类型定义。[查看](https://github.com/openai/codex/pull/59509)

7. **#59507** Bind memory consolidation permissions to the memory root  
   将内存整合代理的权限配置绑定到内存目录根，禁用网络访问并排除临时文件，加强沙箱隔离。[查看](https://github.com/openai/codex/pull/59507)

8. **#59503** Keep threads on their saved model provider when defaults change  
   更改默认模型提供商后，仍保留线程原有的提供商配置，遻免中断现有会话。[查看](https://github.com/openai/codex/pull/59503)

9. **#59493** Add a native cloud backend to the app-server client  
   暴露 `cloud_backend::connect`，将认证后的云客户端适配为 AppServerClient，支持会话恢复与元数据读取。[查看](https://github.com/openai/codex/pull/59493)

10. **#59479** Deprecate the `multi_agent` feature flag  
    标记 `multi_agent` 功能开关为弃用，保持默认启用但会在显式配置时发出启动警告，指引用户迁移至新代理配置。[查看](https://github.com/openai/codex/pull/59479)

## 功能需求趋势

从近期 Issues 与 PR 可观察到以下社区关注方向：

1. **IDE 与编辑器集成稳定性**：VS Code 扩展启动失败（#56655）、远程 SSH 下链接点击行为（#48886）等反馈显示，开发者希望 Codex 在主流 IDE 中获得更可靠的原生体验。
2. **计算机使用（Computer Use）与浏览器自动化**：Windows 平台下获取浏览器 URL 失败（#51524、#53053）、Work 设置下本地浏览器被禁（#56645）等问题集中爆发，说明跨平台 GUI 自动化是当前核心短板。
3. **MCP 与外部工作流编排**：对 MCP 自定义通知注入（#17543）、Headless 线程引导与 App-Server API（#36694）的需求持续存在，社区希望将 Codex 嵌入自动化研发流水线。
4. **CLI 性能与长连接优化**：后台执行会话的事件驱动唤醒（#32188）、分页云线程发现（#59514）等，反映开发者希望降低长时间任务的轮询成本与 Token 消耗。

## 开发者关注点（痛点总结）

- **安全与破坏性操作**：#59060 暴露出 AI 代理在缺乏足够确认机制时可能执行系统级破坏操作的风险，社区强烈要求加强权限沙箱、破坏性命令确认及操作回滚能力。
- **Windows 平台稳定性**：反复出现 EPERM 文件锁定（#40182、#42484）、进程残留（#49483、#50529）、高 CPU 扫描（#571

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-11-05)

## 1. 今日速览

Gemini CLI 今日发布了 v0.68.0-preview.0 及 v0.67.0-nightly 版本，重点修复了扩展下载流失败、动态模型解析及 ACP 模式下的钩子触发问题。社区围绕 Subagent 稳定性、浏览器代理兼容性及工具调用限制展开了广泛讨论，多个 P1 级 Bug 仍待修复。

## 2. 版本发布

### v0.68.0-preview.0
- 更新了 v0.67.0-preview.0 与 v0.66.0 的变更日志
- README 文档更新，明确了 Gemini CLI 的适用范围、局限性及工具调用说明

### v0.67.0-nightly.20261104.g89e9d25d6
- **fix(cli)**: 处理扩展版本下载期间的流失败问题 ([#30100](https://github.com/google-gemini/gemini-cli/pull/30100))
- **fix(core)**: 在动态模型分辨率中保留显式的 `gemini-2.5-flash` 模型 ([@jesussamuel-byte](https://github.com/google-gemini/gemini-cli/pull/30137))

## 3. 社区热点 Issues

| # | 标题 | 优先级 | 评论/👍 | 核心问题 | 链接 |
|---|------|--------|---------|----------|------|
| #22323 | Subagent recovery after MAX_TURNS 报告为 GOAL 成功，掩盖中断 | P1 | 13 / 2 | 子代理在达到最大轮次限制前未完成分析，却错误上报 `status: "success"`，导致中断被掩盖 | [查看](https://github.com/google-gemini/gemini-cli/issues/22323) |
| #21409 | Generalist agent 挂起 | P1 | 8 / 8 | 代理 defer 到通用代理后无限挂起，简单操作（如创建文件夹）也会卡住一小时以上 | [查看](https://github.com/google-gemini/gemini-cli/issues/21409) |
| #19873 | 通过零依赖 OS 沙箱利用模型 bash 亲和力 | P2 | 9 / 1 | 提议利用 Gemini 3 模型的原生 bash 能力，通过 POSIX 工具链增强代码库探索与编辑 | [查看](https://github.com/google-gemini/gemini-cli/issues/19873) |
| #22745 | 评估 AST 感知文件读取、搜索和映射的影响 | P2 | 7 / 1 | 探索 AST 感知工具是否能减少读取偏差、降低 token 消耗并提升代码库导航精度 | [查看](https://github.com/google-gemini/gemini-cli/issues/22745) |
| #21968 | Gemini 不足够使用技能和子代理 | P2 | 7 / 0 | 模型不会主动调用自定义技能和子代理，除非显式指令，影响自动化效率 | [查看](https://github.com/google-gemini/gemini-cli/issues/21968) |
| #22267 | Browser Agent 忽略 settings.json 覆盖（如 maxTurns） | P2 | 5 / 0 | 浏览器代理完全忽略全局/项目级 `settings.json` 配置，导致 `maxTurns` 等参数失效 | [查看](https://github.com/google-gemini/gemini-cli/issues/22267) |
| #21983 | browser subagent 在 Wayland 下失败 | P1 | 4 / 1 | 浏览器子代理在 Wayland 显示服务器下无法正常工作，影响 Linux 桌面用户 | [查看](https://github.com/google-gemini/gemini-cli/issues/21983) |
| #24246 | 工具数量超过 128 时遇到 400 错误 | P2 | 3 / 0 | 当可用工具超过阈值时，CLI 遇到 400 错误，需要更智能的工具作用域限制 | [查看](https://github.com/google-gemini/gemini-cli/issues/24246) |
| #22186 | get-shit-done 输出钩子导致崩溃 | P1 | 3 / 0 | 在输出用户摘要接近完成时，CLI 因输出钩子问题崩溃 | [查看](https://github.com/google-gemini/gemini-cli/issues/22186) |
| #22672 | 代理应阻止/ discourage 破坏性行为 | P2 | 3 / 1 | 模型在复杂 Git 操作中可能使用 `git reset --force` 等危险命令，需增加安全引导 | [查看](https://github.com/google-gemini/gemini-cli/issues/22672) |

## 4. 重要 PR 进展

| # | 标题 | 类型 | 主要内容 | 链接 |
|---|------|------|----------|------|
| #30147 | fix(cli): 逃出编辑器选择时保留待处理工具确认 | Bug 修复 | 当文件编辑工具等待用户确认且用户选择“使用外部编辑器修改”但未配置 `preferredEditor` 时，保留待处理的确认状态 | [查看](https://github.com/google-gemini/gemini-cli/pull/30147) |
| #30148 | fix(acp): 在 ACP 模式下触发 SessionStart 和 Notification 钩子 | Bug 修复 | ACP 会话创建/恢复时触发 SessionStart 钩子，ACP 工具请求确认时触发 Notification 钩子 | [查看](https://github.com/google-gemini/gemini-cli/pull/30148) |
| #30143 | fix(cli): 处理文件监听器错误并允许 macOS 宽松沙箱中的 FSEvents | Bug 修复 | 为 `fs.watch` 添加异步错误监听，解决 macOS 限制性沙箱下启动时的未处理错误 | [查看](https://github.com/google-gemini/gemini-cli/pull/30143) |
| #30141 | fix(cli): 在 ACP 工具调用更新中序列化 AnsiOutput 为文本内容 | Bug 修复 | 修复 `toToolCallContent()` 返回 null 导致 `tool_call_update` 通知内容为空的问题 | [查看](https://github.com/google-gemini/gemini-cli/pull/30141) |
| #30134 | fix(cli): 通过 ACP 报告被钩子阻止的提示 | Bug 修复 | ACP 模式下，被钩子阻止的提示现在会以 `agent_message_chunk` 形式返回拒绝原因 | [查看](https://github.com/google-gemini/gemini-cli/pull/30134) |
| #30144 | fix(cli): 初始化输出监听器并在 ACP 模式下刷新 stderr | Bug 修复 | 在进入 ACP 客户端循环前初始化输出事件监听器并排空缓冲的 stderr | [查看](https://github.com/google-gemini/gemini-cli/pull/30144) |
| #30135 | feat(cli): 添加 /stats heatmap 子命令用于每日 token 用量 | 新功能 | 添加 GitHub 风格日历热图，展示每日 token 用量，支持 `/usage heatmap` 别名 | [查看](https://github.com/google-gemini/gemini-cli/pull/30135) |
| #30137 | fix(cli): 验证模型名称并在 /model 命令中支持直接参数 | Bug 修复 | `/model set` 现在会验证模型名称或别名，拒绝无效字符串和裸标志 | [查看](https://github.com/google-gemini/gemini-cli/pull/30137) |
| #30136 | fix(core,cli): 在模板占位符替换中保留字面 `$` 字符 | Bug 修复 | 确保 `{{args}}` 和系统提示模板占位符中的 `$` 序列（如 `$$`、`$1`）作为文本保留 | [查看](https://github.com/google-gemini/gemini-cli/pull/30136) |
| #30124 | fix(core): 在 tildeifyPath 中要求路径分隔符边界 | Bug 修复 | 防止 `tildeifyPath()` 错误缩短与主目录同名前缀的兄弟目录路径 | [查看](https://github.com/google-gemini/gemini-cli/pull/30124) |

## 5. 功能需求趋势

从近期 Issues 和 PR 可观察到以下社区关注方向：

1. **Subagent 稳定性与可观测性**：多个 P1/P2 问题集中在子代理恢复、挂起、技能调用不足及轨迹可见性（`/chat share`）上，社区希望子代理行为更可预测、可调试。
2. **浏览器代理增强**：Wayland 兼容性、`settings.json` 配置被忽略、会话锁恢复等问题表明浏览器子代理是当前痛点集中区。
3. **工具与模型管理**：工具数量超限导致 400 错误、模型名称验证、动态模型分辨率等反映用户对大规模工具调用和多模型切换的需求在增长。
4. **AST 感知代码操作**：多个 Issue 探索 AST 感知的文件读取、搜索和代码库映射，旨在减少 token 消耗并提升代码导航精度。
5. **ACP（Agent Communication Protocol）完善**：近期多个 PR 围绕 ACP 钩子、输出监听和错误序列化展开，说明协议层正处于快速迭代期。

## 6. 开发者关注点

- **高频崩溃与挂起**：Generalist agent 挂起（#21409）、输出钩子崩溃（#22186）等 P1 问题直接影响可用性，是开发者最紧迫的修复目标。
- **配置不生效**：Browser Agent 忽略 `settings.json` 覆盖（#22267）、symlink 代理未被识别（#20079）等配置层问题引发用户困扰。
- **安全与破坏性操作**：社区呼吁在 Git 重置、数据库修改等场景增加模型安全引导，防止误操作（#22672）。
- **跨平台兼容性**：Wayland 下的浏览器子代理失败（#21983）及 macOS 沙箱文件监听问题（#30143）显示跨平台支持仍需加强。
- **Token 与上下文管理**：大文件读取导致上下文膨胀（#19561）、子代理上下文丢失（#21763）等问题反映开发者对上下文预算控制的高度

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报

**日期：** 2026-11-05  
**仓库：** [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)

---

## 1. 今日速览

过去 24 小时内，DeepSeek-Reasonix 社区未发布新版本，但活跃度保持在较高水平：共更新 11 个 Issue 和 3 个 PR。核心动态集中在 **Reasonix Studio 的用户体验优化**（会话区域布局、模型切换限制、对话卡死等）以及 **Agent/MCP 架构演进**（后台任务支持、ACP 标准跟进）。值得关注的是一个涉及配置解码失败导致安全规则静默失效的高危安全问题。

---

## 2. 版本发布

过去 24 小时内无新版本 Release。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 核心标签 | 重要性说明 | 链接 |
|---|------|------|----------|------------|------|
| #14973 | Reasonix 配置解码失败时静默回退到不含新 forbid_read 的 LKG 快照，受保护文件被读取 | OPEN | bug, agent, config, security, v3 | **高危安全漏洞**：用户新增的文件读取限制规则在配置文件损坏后失效，Agent 可能读取受保护文件并泄露给模型，涉及数据安全合规。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14973) |
| #13748 | Add Mermaid diagram rendering to Reasonix Studio Markdown | OPEN | enhancement, rendering, desktop, v3 | 长期待办功能请求（已 9 条评论），社区持续关注 Markdown 增强，影响技术文档和架构图的可视化体验。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/13748) |
| #14976 | Let a turn end while background jobs run, and wake the session with a completion event (ACP) | OPEN | enhancement, agent, mcp, v3 | Agent 架构关键特性：支持对话回合在后台作业运行时结束，通过完成事件唤醒会话，对多 Agent 编排场景至关重要。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14976) |
| #14977 | Daily research 2026-11-05 | OPEN | agent, mcp, research | 官方跟进 ACP 标准 v2 草案中的 "background work" 特性，属于设计阶段笔记，预示未来 Agent 能力路线图。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14977) |
| #14962 | 该路径不属于任何已知的工作区 | OPEN | bug, from-studio | Studio 反馈 Bug，用户在 v2.57.0 中遇到工作区路径识别失败，影响项目打开和使用。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14962) |
| #14970 | Windows 防火墙缺少入站规则导致 host 端口不可达，Studio 无法启动 | CLOSED | bug, from-studio | Windows 启动失败问题，已关闭，可能通过文档或本地防火墙配置缓解。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14970) |
| #14974 | 我回退了一个对话，然后就卡主了 | OPEN | bug, from-studio | 核心交互 Bug：对话回退后界面卡死，直接影响日常使用体验。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14974) |
| #14975 | 当前回合正在进行，请先停止或等它结束再切换模型 | OPEN | bug, from-studio | 模型切换逻辑限制，用户在长回合中无法灵活切换模型，影响工作流效率。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14975) |
| #14971 | 会话区域窄了，建议改为可拖动 | OPEN | enhancement, from-studio | UI/UX 改进需求：用户对比 CLI 版本，希望会话区域支持自由拖拽调整大小，反映对信息密度的诉求。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14971) |
| #14978 | 在聊天输入窗口增加一个提示词增强功能 | OPEN | bug, from-studio | 功能模仿需求：用户希望引入类似 WORKBUDDY 的提示词增强能力，体现社区对 AI 辅助编写的期待。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14978) |

---

## 4. 重要 PR 进展（精选 3 条，过去 24 小时更新）

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #14935 | fix(studio)：消息正文不再出现附件内部路径，复制拆分「全部复制 / 仅复制文字」并支持粘贴还原 | CLOSED | 修复消息展示文本中泄露 `@.reasonix/attachments/...` 等宿主寻址 Token 的问题；新增「全部复制 / 仅复制文字」分离，并支持粘贴还原，提升多窗口协作体验。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14935) |
| #14916 | feat(studio): 新增「管理会话」面板，支持跨项目批量归档与删除 | CLOSED | 新增跨项目会话管理面板，支持从「更多操作」菜单和 Ctrl-K 打开，按最近活动列出本机会话，支持搜索、翻页、批量归档/取消归档/删除，提升大量项目下的会话维护效率。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14916) |
| #14355 | fix(gitignore): read info/exclude from the common dir when .git is a file | CLOSED | 修复 linked worktree 或 submodule 场景下 `.git` 为文件时 `info/exclude` 被静默忽略的问题，改为读取 common 目录下的排除规则，修复 grep/glob/ls 遍历异常。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14355) |

---

## 5. 功能需求趋势

从近期 Issues 可提炼出以下社区关注方向：

1. **Agent 与 MCP 架构演进**  
   社区和官方正在围绕 ACP（Agent Client Protocol）标准进行设计，重点关注后台作业（background work）、回合生命周期管理及多 Agent 编排能力，这将是 v3 版本的核心方向。

2. **Reasonix Studio 交互体验优化**  
   大量反馈集中在 UI 布局（会话区域过窄、空白区域大）、交互流程（模型切换受限、对话回退卡死）以及辅助功能（Mermaid 渲染、提示词增强）。用户希望 Studio 在保持美观的同时兼顾实用性与信息密度。

3. **安全与配置可靠性**  
   配置解码失败导致安全规则失效的问题引发高度关注，社区对配置容错、权限生效及数据防泄露的要求正在提升。

4. **跨平台与环境适配**  
   Windows 防火墙端口不可达、工作区路径识别等问题表明，客户端在不同操作系统和网络环境下的稳定性仍需加强。

---

## 6. 开发者关注点

- **安全合规风险**：`#14973` 暴露了配置回退机制中的安全缺陷，建议开发团队优先评估并修复 LKG（Last Known Good）快照策略，避免权限规则被绕过。
- **Studio 稳定性**：多个 `from-studio` 类 Bug（对话卡死、工作区识别失败、防火墙端口不可达）集中在 v2.57.0，建议在下个补丁版本中集中修复。
- **交互细节打磨**：用户对「可拖动会话区域」、「仅复制文字」、「提示词增强」等细节需求强烈，可纳入近期 UX 迭代计划。
- **ACP 标准跟进**：`#14976` 和 `#14977` 显示团队已开始为 ACP v2 的背景工作特性做设计准备，但当前 studio 线处于 bug-fix-only 状态，大特性开发尚未启动，需关注后续里程碑安排。

---

*本日报基于 GitHub 仓库 esengine/DeepSeek-Reasonix 在 2026-11-04 至 2026-11-05 期间的公开 Issue 与 PR 数据生成，仅供社区参考。*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-11-05)

## 今日速览

过去 24 小时 OpenCode 社区未发布新版本，但 Issue 与 PR 活跃度较高，共 14 条 Issue 更新和 50 条 PR 更新。核心关注点集中在 **DeepSeek 系列模型的图像输入兼容性问题**、**Shell 工具 NUL 字符导致的挂起缺陷**，以及 **`@opencode/ai` 模型能力重构** 这一持续进行的重大架构改进。

## 版本发布

过去 24 小时内无新版本发布。

## 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 关注点 | 链接 |
|---|------|------|--------|------|
| #50155 | opencode-go: DeepSeek V4 Flash 缺少 Global regions 隐私设置 | CLOSED | 付费订阅用户因缺少隐私设置选项导致模型请求失败，评论数达 21 条，社区关注度最高 | [查看](https://github.com/anomalyco/opencode/issues/50155) |
| #61827 | go: deepseek-v4.1-flash 图像拒绝导致会话永久不可用 | OPEN | 长时间会话在读取六张 PNG 截图后彻底卡死，后续请求全部失败，影响 UI 验证工作流 | [查看](https://github.com/anomalyco/opencode/issues/61827) |
| #61523 | provider: openai-compatible 流拒绝非字符串 delta.reasoning 并中止会话 | CLOSED | 流式事件中 `delta.reasoning` 非字符串导致会话无法恢复，重启也无效 | [查看](https://github.com/anomalyco/opencode/issues/61523) |
| #51351 | Shell 工具命令包含 NUL 字符时永久挂起 | OPEN | 命令含 U+0000 时超时不生效，无法后台化，仅中断 turn 能结束，影响可靠性 | [查看](https://github.com/anomalyco/opencode/issues/51351) |
| #61842 | models: deepseek-v4.1-flash-free 拒绝图像输入（虽宣称支持） | OPEN | 免费模型在 2026-10-31 后出现回归，图像能力广告与实际不符 | [查看](https://github.com/anomalyco/opencode/issues/61842) |
| #61437 | [Linux Desktop v2.2.5] 添加服务器不持久化外部连接 | CLOSED | Linux 桌面端通过 Settings 添加外部 HTTP 服务器后不出现在列表中，Web UI 正常 | [查看](https://github.com/anomalyco/opencode/issues/61437) |
| #61738 | read 工具失败：includes is not a function | CLOSED | 类型守卫逻辑缺陷导致 read 工具在所有路径上均抛出类型错误 | [查看](https://github.com/anomalyco/opencode/issues/61738) |
| #61521 | models: MiniMax-M3.1-Flash 暴露零推理变体，思考深度固定为最大 | CLOSED | 模型能力声明与实际不符，导致用户无法调节推理深度 | [查看](https://github.com/anomalyco/opencode/issues/61521) |
| #61843 | "tools" 字段发送给不支持工具能力的模型 | OPEN | 配置显式设置 `tools: false` 后，OpenCode 仍向本地 Ollama 模型发送 tools 字段 | [查看](https://github.com/anomalyco/opencode/issues/61843) |
| #61841 | TUI 崩溃：EISDIR，非法对目录操作 | OPEN | 监听 overlay 目录时崩溃，影响桌面端稳定性 | [查看](https://github.com/anomalyco/opencode/issues/61841) |

**社区反应总结**：DeepSeek 相关模型问题（图像输入、区域设置）成为本周最活跃的话题，反映出多模态模型集成仍存在不稳定性；Shell 工具的 NUL 字符缺陷是一个长期存在的可靠性问题，值得持续跟踪。

## 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复说明 | 链接 |
|---|------|------|--------------|------|
| #61844 | fix(app): 使用显式状态机驱动旧历史分页 | OPEN | 替换 `historyRequests` 集合和分散的加载标志，统一时间轴历史分页与短视口填充逻辑 | [查看](https://github.com/anomalyco/opencode/pull/61844) |
| #61840 | fix(app): 第二次按 `/` 或 Backspace 时关闭斜杠命令 | OPEN | 修复移动端触控码头中斜杠菜单无法关闭的问题，改善触摸体验 | [查看](https://github.com/anomalyco/opencode/pull/61840) |
| #61817 | fix(core): 为忽略版本探测的 stdio MCP 服务器回退到旧协议 | CLOSED | 解决 `protocol: "auto"` 下旧 stdio MCP 服务器静默忽略请求导致的连接失败 | [查看](https://github.com/anomalyco/opencode/pull/61817) |
| #61793 | fix(app): 通过单一状态机驱动窗口插件激活 | CLOSED | 整合 7 处分散的写入点，将窗口插件状态迁移至纯状态机，提升可维护性 | [查看](https://github.com/anomalyco/opencode/pull/61793) |
| #61835 | feat(sdk): 读取与发送提示词完全匹配的结果 | OPEN | 客户端可根据提示词读取类型化结果，包含状态、错误、用量、成本和最后一条助手消息 ID | [查看](https://github.com/anomalyco/opencode/pull/61835) |
| #61837 | fix(app): 拖动滚动条滑块时停止跟随时间轴末尾 | OPEN | 修复从底部拖动滑块时因新行插入而跳回末尾的问题（关联 #56285） | [查看](https://github.com/anomalyco/opencode/pull/61837) |
| #61818 | fix(app): 读取期间文件被更改时重新读取 | OPEN | 工作区文件内容状态机重构，修复读取过程中文件变更丢失的问题 | [查看](https://github.com/anomalyco/opencode/pull/61818) |
| #61819 | fix(session-ui): 通过单一状态机揭示聚焦的评论 | OPEN | 审核评论聚焦揭示逻辑重构，与 #61816 堆叠，改善代码评论交互 | [查看](https://github.com/anomalyco/opencode/pull/61819) |
| #61532 | fix(core): 报告 PowerShell shell 命令的真实退出码 | OPEN | 修复 Windows 上 PowerShell 命令退出码上报错误的问题 | [查看](https://github.com/anomalyco/opencode/pull/61532) |
| #61831 | fix(server): 报告会话日志持久化状态并保持安静追随者存活 | OPEN | 程序化客户端可检测日志持久化是否禁用，安静追随者接收保活消息 | [查看](https://github.com/anomalyco/opencode/pull/61831) |

**架构重构亮点**：`@opencode/ai` 模型重构系列 PR（#61492、#61494、#61499、#61501、#61717）持续推进，正在将七个模型类统一为单一 `Model`，并将端点支持标志迁移至模型能力，这将显著改善多模型提供商的兼容性。

## 功能需求趋势

从本周 Issues 和 PR 中提炼出以下社区关注方向：

1. **多模态模型支持与稳定性**：DeepSeek V4/V4.1-Flash 系列的图像输入能力出现反复回归（广告支持但实际拒绝），社区强烈要求模型能力声明与实际网关行为保持一致。
2. **模型能力与配置精细化**：MiniMax 推理变体缺失、向不支持工具的模型发送 `tools` 字段、DeepSeek 区域隐私设置缺失，均指向对模型元数据和能力声明更精确控制的需求。
3. **跨平台稳定性**：Linux 桌面端服务器持久化、TUI 目录监听崩溃、Windows PowerShell 退出码问题，表明桌面端和跨平台兼容性仍是短板。
4. **会话与时间轴交互体验**：历史分页状态机重构、滚动条跟随修复、斜杠命令关闭逻辑，体现社区对 TUI 交互流畅度的持续优化需求。
5. **MCP 与外部服务集成**：stdio MCP 服务器协议回退、连接池共享（`pool: true`）、外部服务器持久化，显示用户希望 OpenCode 在外部工具集成上更稳健。

## 开发者关注点

**高频痛点**：
- **会话不可恢复**：多个 Issue 反映流式解析错误或模型拒绝输入后，会话进入不可用状态，重启无法恢复，严重影响长时间开发工作流。
- **Shell 工具可靠性**：NUL 字符导致的挂起、超时失效问题反复出现，是自动化脚本和命令执行场景下的稳定性隐患。
- **模型能力声明不一致**：免费模型、推理模型的实际能力与 models.dev 声明不符，导致配置和预期失配。

**开发者反馈建议**：
- 增加模型能力校验机制，在发送请求前校验目标模型是否支持图像/工具/推理深度调节，避免运行时失败。
- 为流式解析增加容错降级，防止单个非法 `delta.reasoning` 字段导致整个会话中止。
- 优先修复 Shell 工具的边界字符处理，确保超时和中断机制在所有输入下都可靠生效。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

# Deepseek Harness 社区动态日报 (2026-11-05)

## 1. 今日速览
Deepseek Harness 发布 0.2.2 系列首个候选版本 **v0.2.2-rc.1**，重点完善手机/平板端适配，并新增聊天文本引用插入与紧凑预览功能。过去 24 小时内社区无新 Issue 与 Pull Request 更新，整体活动以版本发布为主。

## 2. 版本发布
**dsh-v0.2.2-rc.1** (v0.2.2-rc.1)  
发布页面：https://github.com/deepseek-ai/deepseek-harness/releases/tag/v0.2.2-rc.1

作为 0.2.2 系列的首个候选版本，本版本汇总了自 v0.2.1-rc.5 以来的主要用户与开发者相关变更：

### 新增功能
- **移动端适配优化**：完善手机和平板适配，优化软键盘交互、导航与窄屏布局，保持菜单和操作入口可用。  
  贡献者：@Stevring, @turtle2099, @LegGasai, @EricMoin, @Saafo
- **聊天文本引用插入**：支持将聊天文本作为引用插入输入框，并在发送后显示紧凑预览。  
  贡献者：@lsdsjy, @imccyu

## 3. 社区热点 Issues
过去 24 小时内仓库无 Issue 更新（共 0 条），暂无可列出的热点 Issue。  
仓库主页：https://github.com/deepseek-ai/deepseek-harness/issues

## 4. 重要 PR 进展
过去 24 小时内仓库无 Pull Request 更新（共 0 条），暂无可列出的重要 PR 进展。  
仓库主页：https://github.com/deepseek-ai/deepseek-harness/pulls

## 5. 功能需求趋势
虽然近 24 小时无新 Issue 数据，但从本次 Release 的变更方向可推断社区当前的功能关注点：
- **移动端体验优化**：对窄屏布局、软键盘交互的持续改进，表明移动端使用场景需求在上升。
- **输入与引用体验**：聊天文本引用插入及紧凑预览功能，反映用户希望在对话中更便捷地引用历史上下文，降低重复输入成本。

## 6. 开发者关注点
基于本次版本变更及贡献者分布，开发者当前关注的痛点与需求包括：
- **多端布局一致性**：在手机、平板等不同尺寸设备上保持菜单与操作入口的可用性。
- **对话输入效率**：通过引用插入与紧凑预览减少冗余输入，提升多轮对话的操作流畅度。

---
*数据来源：https://github.com/deepseek-ai/deepseek-harness*

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报
**日期**: 2026-11-05  
**数据来源**: github.com/NousResearch/hermes-agent

---

## 1. 今日速览

今日 Hermes 社区活跃度较高，共新增/更新 17 个 Issue 和 50 个 PR，未发布新版本。社区核心关注点集中在 **终端工具稳定性、跨平台文件/会话一致性、移动端（iOS/Android）体验以及插件生态扩展** 上。多个 P2 级别 Bug 涉及命令静默丢失、OAuth 认证失效和桌面端文件拖拽失败，建议开发团队优先评估。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 重要性 | 链接 |
|---|------|----------|--------|------|
| #149085 | terminal pre-execution guard wedges，静默丢弃命令 | 长期运行网关下，终端工具预执行守护进程卡住 240s，命令被静默丢弃，伴随 90 条泄漏线程 | P2，影响核心终端可用性，可能导致自动化流程中断 | [查看](https://github.com/NousResearch/hermes-agent/issues/149085) |
| #149131 | 同一 session ID 在两个 profile store 中未结束，简历竞争 | 默认/root store 与命名 Bot Mode profile store 出现相同未结束 session ID，转录记录分叉，简历后可能进入错误血统 | P2，涉及会话数据一致性，影响跨设备恢复体验 | [查看](https://github.com/NousResearch/hermes-agent/issues/149131) |
| #149139 | macOS 文件拖拽失败：storage_unavailable（TCC/EPERM） | 从 ~/Downloads 或 ~/Desktop 拖入文件失败，~/Documents 正常；因 Desktop 改为挂载 launchd 网关导致的回归 | P2，macOS 特定平台 Bug，直接影响桌面端核心工作流 | [查看](https://github.com/NousResearch/hermes-agent/issues/149139) |
| #149065 | Anthropic OAuth 会话长时间空闲后唤醒报 401，不刷新 Token | 空闲数小时后由后台进程唤醒，发送过期 Access Token，错误提示误导为 "rejected your API key" | P2，认证机制缺陷，影响长连接会话稳定性 | [查看](https://github.com/NousResearch/hermes-agent/issues/149065) |
| #149076 | iOS Beta 会话重命名失败：HTTP 404 | 官方 iOS TestFlight 版重命名会话时返回 404，标题无法持久化 | P2，移动端客户端 Bug，影响 iOS 用户体验 | [查看](https://github.com/NousResearch/hermes-agent/issues/149076) |
| #149064 | Android Live 模式未设置 voice_turn，auxiliary.voice_chat 未启用 | 移动端语音对话未正确标记语音轮次，导致辅助语音模型未被调用 | P2，Android 语音交互功能缺陷 | [查看](https://github.com/NousResearch/hermes-agent/issues/149064) |
| #149083 | Windows 远程网关 TLS 信任失败被误报为 "Hermes can't reach that address" | 证书链不在客户端信任存储中时，远程连接界面错误提示不准确，掩盖真实 TLS 原因 | P2，Windows 桌面端连接与安全体验问题 | [查看](https://github.com/NousResearch/hermes-agent/issues/149083) |
| #149086 | 同一 Git 仓库内的声明文件夹在侧边栏折叠为单条 | 项目声明文件夹位于同一 Git 仓库时，侧边栏将其合并为单一 lane，影响项目树导航 | P2，桌面端文件管理 UI 缺陷 | [查看](https://github.com/NousResearch/hermes-agent/issues/149086) |
| #149091 | 执行中间件链覆盖 Provider 错误的 `__context__`，导致错误分类器丢失状态/Body | `_run_execution_chain` 在 except 块内 raise，导致 Python 重置异常上下文，错误分类器无法获取隐式链的状态码和响应体 | P2，CLI 错误处理链路缺陷，影响故障排查 | [查看](https://github.com/NousResearch/hermes-agent/issues/149091) |
| #149157 | 插件接口需求：临时/隐身会话（跳过内存 + 持久化） | 用户希望某些对话不留痕迹（无记忆提取、无转录持久化、无工具调用记录），适用于礼物策划、求职、医疗法律等场景 | Feature，隐私与数据控制方向，社区高关注度 | [查看](https://github.com/NousResearch/hermes-agent/issues/149157) |

---

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 功能/修复说明 | 链接 |
|---|------|--------------|------|
| #149160 | feat(plugin-catalog): add serpkite | 新增 SerpKite 插件目录条目，作为 Web 搜索后端，同时注册 `web_search` 和网页抓取能力，锁定版本 0.1.0 | [查看](https://github.com/NousResearch/hermes-agent/pull/149160) |
| #149159 | plugin-catalog: add understudy | 新增 Understudy 插件，支持基于真实 Hermes 历史试听更便宜的模型，用于评估模型替代可行性 | [查看](https://github.com/NousResearch/hermes-agent/pull/149159) |
| #147997 | feat(context-engine): pass the memory manager to on_session_start | 将 MemoryManager 传递给会话开始钩子，使上下文引擎可在压缩前提取持久事实，解决记忆提供商无法获取管理器的问题 | [查看](https://github.com/NousResearch/hermes-agent/pull/147997) |
| #94983 | Context engines: resolve compaction authority under checkpoint_required | 追踪 #94639 的后续 PR，解决在 checkpoint_required 契约下压缩权限问题，防止无检查点的丢失性转录重写 | [查看](https://github.com/NousResearch/hermes-agent/pull/94983) |
| #139994 | feat(goals): add a /goal progress subcommand | 为 `/goal` 命令新增进度子命令，辅助用户量化目标完成程度，而非仅依赖状态行猜测 | [查看](https://github.com/NousResearch/hermes-agent/pull/139994) |
| #149061 | feat(tts): pass voice-design instructions to command providers as {instructions} | 修复命令类型 TTS 提供商中 `instructions` 参数被静默丢弃的问题，现通过 `{instructions}` 占位符传递至本地语音设计后端 | [查看](https://github.com/NousResearch/hermes-agent/pull/149061) |
| #149062 | feat(plugin-catalog): add onda plugin | 将 Onda MCP 服务器作为 Agent Plugins v1 包加入目录，支持便携式 MCP 集成 | [查看](https://github.com/NousResearch/hermes-agent/pull/149062) |
| #149066 | fix(desktop): load saved bot descriptions before editing | 修复桌面端编辑 Profile 时描述显示为空或过期的问题，确保打开编辑器前加载已保存的机器人描述 | [查看](https://github.com/NousResearch/hermes-agent/pull/149066) |
| #149068 | fix(desktop): route session reads and writes to the owning connection | 修复多列布局下会话读写始终走窗口主连接的问题，现路由至拥有该聊天的连接，修复远程网关场景下的会话操作 | [查看](https://github.com/NousResearch/hermes-agent/pull/149068) |
| #149069 | fix(agent): agent.environment_probe also turns off the remote-backend probe | 修复远程终端后端（Docker/SSH 等）每次新进程都构建环境探针的问题， salvage 自 #131416，修复 #131409 | [查看](https://github.com/NousResearch/hermes-agent/pull/149069) |

---

## 5. 功能需求趋势

从本日全部 17 个 Issue 及 50 个 PR 中，可提炼出以下社区关注方向：

1. **隐私与临时会话**：#149157 等需求表明用户强烈希望拥有“无痕”对话模式（跳过记忆、持久化和工具调用记录），隐私控制成为新兴功能方向。
2. **多模态与插件生态扩展**：FAL 图像/视频提供商（#149095、#149096、#149097、#149098）、Krea 区域编辑、SerpKite 网络搜索、Onda MCP 等插件请求密集，社区正在推动视觉、音频和网络能力的插件化。
3. **移动端体验完善**：Android 语音识别/合成分离（#149063）、Live 模式语音轮次（#149064）、iOS 会话重命名（#149076）等问题集中，说明移动端 Beta 正处于快速迭代期。
4. **模型推理与提供商适配**：Gemini-4 推理参数（#149087）、Anthropic OAuth 刷新（#149065）、模型回退本地化（#149073）等，反映社区对新模型支持和跨提供商兼容性的持续需求。

---

## 6. 开发者关注点

开发者反馈中的高频痛点与需求包括：

- **终端与进程稳定性**：终端预执行守护卡住导致命令静默丢失（#149085），伴随线程泄漏，需加强守护进程超时处理与资源清理。
- **会话与 Profile 数据一致性**：同一 Session ID 在多个 Profile Store 中未结束（#149131），以及桌面端会话读写未路由至拥有连接（#149068），提示会话状态机在多存储/多连接场景下仍存在竞争条件。
- **跨平台文件与权限**：macOS TCC/EPERM 导致文件拖拽失败（#149139

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-11-05)

## 1. 今日速览

OpenClaw 今日发布 **v2026.11.5-beta.1**，引入 Knowledge Scribes 知识捕获工作流与 PostgreSQL 数据平面，标志着状态存储向企业级数据库迈出重要一步。社区围绕 Windows 网络绑定失败、SQLite WAL/SHM 身份不匹配等 P0 级崩溃问题展开紧急讨论，同时多个跨平台（iOS/Android/macOS）与多渠道（WhatsApp、Matrix、Telegram、Zalo）的功能与修复 PR 活跃提交。

## 2. 版本发布

**v2026.11.5-beta.1** ([Release 链接](https://github.com/openclaw/openclaw/releases/tag/v2026.11.5-beta.1))

- **Knowledge Scribes**：新增首层级知识捕获与可复用 Scribe 工作流，覆盖 Agent、会话及 Control UI，由 @jalehman 贡献（关联 PR：#185583, #185637, #185974, #186270, #186455, #187659）。
- **PostgreSQL 数据平面**：新增 PostgreSQL 备份状态存储，为 OpenClaw 的状态持久化提供关系型数据库选项。

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 优先级/标签 | 关注理由 | 链接 |
|---|------|-------------|----------|------|
| #142559 | Windows Gateway 记录 "http server listening" 但从未绑定端口 (ECONNREFUSED) | P0, crash-loop, ux-release-blocker | Windows 上 Gateway 启动后端口不生效，直接导致无法连接，属严重发布阻塞问题。 | [查看](https://github.com/openclaw/openclaw/issues/142559) |
| #187309 | 2026.10.8 后反复出现 per-agent SQLite WAL/SHM 身份不匹配 | P0, crash-loop, bug:crash | 涉及活跃租约关闭后的磁盘 I/O 错误与 WAL/SHM 描述符异常，可能导致 Agent 进程崩溃，数据一致性风险高。 | [查看](https://github.com/openclaw/openclaw/issues/187309) |
| #142528 | Android TLS 探测失败应在手动输入 SHA-256 前提供连接恢复 | P0, ux-release-blocker | Android 自建网关配对时直接要求指纹 pin，缺乏可恢复的连接错误引导，影响新用户上手。 | [查看](https://github.com/openclaw/openclaw/issues/142528) |
| #193023 | `openclaw update --tag` 将未发布 npm 版本误报为注册表连接失败 | P2, clawsweeper:intake:bug | 更新命令错误分类会掩盖 npm 原因，给运维排查带来干扰；已有对应修复 PR #193037。 | [查看](https://github.com/openclaw/openclaw/issues/193023) |
| #184803 | Talk：增加关闭或替换 Agent 咨询语音任务回执的选项 | P3, impact:ux-friction | 实时 Talk 通话中每次转接 Agent 都会播放语音回执，用户希望可配置关闭，提升语音体验。 | [查看](https://github.com/openclaw/openclaw/issues/184803) |
| #187774 | 新增可选 Cua Spaces Worker Provider | P3, Feature | 允许已有 Cua Spaces 基础设施的运营商将其作为 OpenClaw Worker 接入，扩展多云/多租户能力。 | [查看](https://github.com/openclaw/openclaw/issues/187774) |
| #189354 | 通过 ZaloUser 频道搜索并发送原生 Zalo 贴纸 | P3, clawsweeper:bulk-filed | 社区扩展作者已有补丁，期望合入官方插件，丰富即时通讯渠道的多媒体能力。 | [查看](https://github.com/openclaw/openclaw/issues/189354) |
| #183537 | 考虑将 ShieldCortex 与 multi-clawd 列入官方插件目录或验证发布者 | P3 | Drakon Systems 维护的两款插件已在生产环境运行，社区呼声较高，涉及插件生态治理。 | [查看](https://github.com/openclaw/openclaw/issues/183537) |
| #191008 | ClawHub 技能提议：公司研究任务（付费，x402 按次付费） | P3 | 社区开始探索付费技能市场，免费搜索额度耗尽后的付费替代方案，可能催生新的商业化生态。 | [查看](https://github.com/openclaw/openclaw/issues/191008) |
| #184709 | ElevenLabs 批量转录支持关键词提示 | P3, clawsweeper:bulk-filed | 允许运营商向 Scribe v2 传入专有词汇表，改善专业术语与产品名的转录准确率。 | [查看](https://github.com/openclaw/openclaw/issues/184709) |

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态/优先级 | 主要内容 | 链接 |
|---|------|-------------|----------|------|
| #192691 | fix(cron): 时钟跳跃时定时任务在 Lane 等待中立即超时 | OPEN, P2 | 修复 Cron 执行看门狗因 `Date.now()` 与单调时钟不一致导致的预算耗尽问题。 | [查看](https://github.com/openclaw/openclaw/pull/192691) |
| #193063 | fix(cron): 停止延迟任务每两秒重试 | OPEN, P2 | 延迟作业现在显示 "Waiting: <reason> since <time>"，五次尝试后警告，30 秒后重试，减少无效轮询。 | [查看](https://github.com/openclaw/openclaw/pull/193063) |
| #193037 | fix(update): 将缺失 npm 版本报告为未发布目标 | OPEN, P2 | 修复 #193023，明确区分“未发布版本”与“注册表连接失败”，提升 CLI 错误可读性。 | [查看](https://github.com/openclaw/openclaw/pull/193037) |
| #193048 | feat(knowledge): doctor 检查保存模型输出上限过低 | OPEN, P2, waiting on author | 新增 Knowledge Doctor 检查，当自定义模型缺少 `maxTokens` 时提示可能被截断的长保存。 | [查看](https://github.com/openclaw/openclaw/pull/193048) |
| #193068 | fix(browser): 页面取消文档请求时导航失败 (Invalid InterceptionId) | OPEN, P2 | 修复 iframe 被移除或重定向时 `Fetch.continueRequest` 抛出 Invalid InterceptionId 的问题。 | [查看](https://github.com/openclaw/openclaw/pull/193068) |
| #193052 | fix(whatsapp): LID 身份不可用时重试 DM | OPEN, P1, waiting on author | 修复 WhatsApp 私信在 LID-to-phone 映射可用前被静默丢弃的问题，部分解决 #119475。 | [查看](https://github.com/openclaw/openclaw/pull/193052) |
| #192787 | fix(ui): 移动端侧边栏滑动可跨聊天内容启动 | OPEN, P2, waiting on author | 允许从链接、按钮、代码块等表面开始右滑手势，改善移动端可用性。 | [查看](https://github.com/openclaw/openclaw/pull/192787) |
| #182603 | fix(android): 慢音频确认时保持实时 Talk 连接 | OPEN, P1, needs proof | 修复 Android 实时 Talk 在网关音频追加响应超过 8 秒时出现 "Talk failed: request timeout"。 | [查看](https://github.com/openclaw/openclaw/pull/182603) |
| #185848 | feat(cron): 可配置的默认交付与失败目标 | OPEN, P2, security-sensitive-changed | 允许在网关、代理人或创建人层面设置自动化结果与失败告警的默认目标，减少重复配置。 | [查看](https://github.com/openclaw/openclaw/pull/185848) |
| #166357 | fix(telegram): 群组命令遵守提及激活 | OPEN, P2, needs proof | 修复 Telegram 群组中未 @ 的斜杠命令被误当作有效提及，导致 `/steer`、`/stop` 等误触发。 | [查看](https://github.com/openclaw/openclaw/pull/166357) |

## 5. 功能需求趋势

从近 24 小时的 Issues 与 PR 可观察到以下社区关注方向：

1. **多渠道即时通讯扩展**：Zalo 贴纸（#189354）、WhatsApp DM 重试（#193052）、Telegram 群组提及（#166357）、Matrix 房间分类（#182785），社区持续推动 OpenClaw 在区域性及主流 IM 平台上的适配深度。
2. **语音与实时交互体验**：Talk 语音回执可配置（#184803）、Android 实时 Talk 超时（#182603）、ElevenLabs 关键词提示（#184709），表明语音 Agent 与实时媒体管道是用户体验优化的重点。
3. **插件生态与商业化**：ShieldCortex/multi-clawd 入驻官方目录（#183537）、ClawHub 付费研究技能（#191008），社区开始关注第三方插件的审核、分发与付费模式。
4. **跨平台稳定性**：Windows 网络绑定（#142559）、Android TLS（#142528）、iOS 会话嵌套（#189432，已关闭）、macOS CLI 选择（#140131），桌面端与移动端的基础连接与会话管理仍是高频痛点。

## 6. 开发者关注点

- **P0 级崩溃与发布阻塞**：Windows 端口绑定失败（#142559）与 SQLite WAL/SHM 身份不匹配（#187309）均标记为 P

:::
