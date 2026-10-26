---
title: "AI CLI 工具社区动态日报"
published: 2026-10-26
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-10-26

> 生成时间: 2026-10-26 00:00 UTC | 覆盖工具: 8 个

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

# AI CLI 工具生态横向对比分析报告（2026-10-26）

## 1. 生态全景

当前 AI CLI 工具正处于从“单轮对话助手”向“多代理编排平台”演进的关键期。各工具社区普遍将稳定性、长会话可靠性及跨平台集成作为首要修复方向，而非激进推新功能。Headless/自动化模式的成本可见性、子代理状态一致性、以及桌面端与 IDE 的深度集成已成为行业共性瓶颈。整体呈现“补丁密集、版本收敛”的特征，夜间构建与快速迭代成为主流发布节奏。

## 2. 各工具活跃度对比

| 工具 | 仓库 | Issues 更新数 | PR 更新数 | 24 小时内 Release | 主要活跃方向 |
|------|------|--------------|-----------|-------------------|-------------|
| Claude Code | anthropics/claude-code | 50 | 1（已关闭） | 无 | Headless 成本、多会话协作、安全策略、桌面/VS Code 集成 |
| OpenAI Codex | openai/codex | 50 | 0 | 无 | Windows Computer Use、VS Code 扩展兼容、MCP/插件生命周期 |
| Gemini CLI | google-gemini/gemini-cli | 未披露总数（热点 10 条） | 10（全部 Open） | 有（夜间版 v0.67.0-nightly.20261025） | Subagent 稳定性、AST 感知代码读取、跨平台浏览器代理 |
| DeepSeek Reasonix | esengine/DeepSeek-Reasonix | 16 | 10（多条已合并） | 无 | Studio UI 修复、主题系统、移动端体验、后台任务隔离 |
| OpenCode | anomalyco/opencode | 7 | 10（多条 Open） | 无 | V2 核心稳定性、媒体资源优化、权限交互、桌面端配对 |
| Deepseek Harness | deepseek-ai/deepseek-harness | 0 | 0 | 无 | 无活动 |
| Hermes | NousResearch/hermes-agent | 9（热点 10 条） | 10（多条已合并） | 无 | 统一网关合并后修复、多 Profile 正确性、跨平台 IM 集成 |

> 注：Deepseek Harness 过去 24 小时无社区活动，处于停滞或低频维护状态。

## 3. 共同关注的功能方向

多个工具社区在以下维度上存在高度重叠的诉求：

| 功能方向 | 涉及工具 | 具体社区诉求 |
|---------|---------|------------|
| **长会话与子代理稳定性** | Claude Code、Gemini CLI、Hermes | Claude Code 远程控制会话频繁断开、ListAgents 空闲降级；Gemini CLI Subagent 达到 MAX_TURNS 仍报告成功、通用代理挂起；Hermes 会话恢复字段缺失、多代理组卡在 stopping 状态 |
| **跨平台与桌面端集成** | Claude Code、OpenAI Codex、Gemini CLI、Hermes | Claude Code 桌面端字体/剪贴板/Wayland 问题；Codex Windows/macOS Computer Use 故障、MSIX 安装失败；Gemini CLI 浏览器子代理在 Wayland 下失败；Hermes Telegram/Discord/Slack 跨平台机器人可靠性 |
| **权限策略与开发者自主权** | Claude Code、OpenCode | Claude Code 密码输入被阻断、MCP 只读工具被拒，呼吁“开发环境 Opt-in”；OpenCode 提议只读工具预过滤自动允许，降低交互摩擦 |
| **媒体/上下文资源优化** | OpenCode、Gemini CLI | OpenCode media_blob 按需加载、图片载荷丢弃以降低长会话存储占用；Gemini CLI 超过 128 个工具时出现 400 错误，亟需工具范围智能限制 |
| **记忆系统与上下文持久化** | Claude Code、Gemini CLI | Claude Code 跨会话记忆写入但模型不可靠读取；Gemini CLI 子代理状态上报错误导致记忆/任务状态不可信 |

## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|------|---------|---------|------------|
| **Claude Code** | 自动化流程成本控制、多会话远程协作、企业级安全策略 | 专业开发者、CI/CD 自动化团队、企业用户 | Headless 优先，强调 `claude -p` 入口点，Token 预算可见性是核心竞争力 |
| **OpenAI Codex** | 计算机使用（Computer Use）、IDE 原生集成（VS Code）、MCP 插件生态 | Windows/macOS 桌面开发者、RPA 自动化场景 | 以视觉自动化为核心，跨平台窗口/截图/输入控制是技术护城河，但稳定性欠佳 |
| **Gemini CLI** | 代码库深度理解（AST 感知）、子代理编排、夜间快速迭代 | AI 原生开发者、复杂代码库维护者 | 夜间版发布节奏快，AST 感知文件读取和代码库映射是差异化技术路线 |
| **DeepSeek Reasonix** | Studio 桌面/移动端 UI 体验、主题定制、多模态输入（语音） | 移动端优先用户、注重个性化外观的开发者 | 以 Studio 客户端为载体，侧重跨端一致性与主题生态，后台任务隔离较强 |
| **OpenCode** | V2 核心稳定性、媒体资源按需加载、计费透明度 | 长会话重度用户、成本敏感型开发者 | V2 架构迁移期，媒体哈希寻址（media:<hash>）和离线 backfill 是存储优化特色 |
| **Hermes** | 统一网关（Unified Gateway）、多 Profile 多租户、跨平台即时通讯集成 | 多代理协作团队、跨平台机器人开发者 | 网关统一所有本地会话，Telegram/Discord/Slack 原生集成深，合并后长尾 Bug 多 |
| **Deepseek Harness** | （无活动） | — | 社区活动停滞，需关注是否停止维护 |

## 5. 社区热度与成熟度

- **高热度、快速迭代**：Gemini CLI（夜间版持续发布、10 条 Open PR）、Hermes（统一网关合并后 220 条评论的超大型 Tracking Issue、10 条 PR 同步推进）、Claude Code（50 条 Issue 更新，社区讨论密集）。
- **中热度、稳定修复**：OpenCode（PR 数量可观但 Issues 较少，集中在 V2 核心修复）、DeepSeek Reasonix（UI 和主题需求明确，PR 合并效率高）。
- **低热度、平台问题集中**：OpenAI Codex（50 条 Issue 但 0 条 PR，Windows 平台故障集中爆发，反映用户在“报问题”而维护方尚未给出代码修复）。
- **停滞/观察**：Deepseek Harness（24 小时无任何活动，成熟度或维护意愿存疑）。

## 6. 值得关注的趋势信号

1. **从“功能堆砌”转向“工程可靠性”**  
   各工具社区不再竞争新特性数量，而是集中修复长会话断连、子代理状态造假、跨平台输入失效等基础工程问题。这表明 AI CLI 工具已进入生产可用性验证期，稳定性成为采纳门槛。

2. **Headless/自动化模式成本透明度成为选型关键**  
   Claude Code 社区披露 `claude -p` 头less 模式 Token 消耗约为交互式 CLI 的 1.8 倍，直接影响 CI/CD 可行性。未来不同入口点的资源消耗差异将被纳入企业选型评估。

3. **多代理编排（Multi-Agent Orchestration）是下一战场**  
   Claude Code 的远程协作、Gemini CLI 的 Subagent、Hermes 的 Canonical Group 均指向多代理协作。但状态一致性、会话恢复、身份可达性等基础设施尚未成熟，短期内将是主要研发投入方向。

4. **桌面端与 IDE 集成体验决定日常留存**  
   VS Code 扩展启动失败、剪贴板失效、Wayland 兼容性等问题反复出现，说明开发者更希望 AI 能无缝嵌入现有开发环境，而非切换至独立客户端。

5. **权限模型亟需“开发环境豁免”机制**  
   Claude Code 和 OpenCode 社区均呼吁对只读工具、localhost 测试等合法场景提供细粒度豁免。过度严格的安全护栏正在成为开发效率瓶颈，未来“安全策略 vs 开发体验”的可配置平衡将成为产品差异化点。

**对开发者的参考建议**：若构建 CI/CD 自动化流程，优先关注 Claude Code 的 Headless 成本修复进度；若依赖视觉自动化，需谨慎评估 OpenAI Codex 在 Windows 平台的稳定性；若进行复杂代码库改造，Gemini CLI 的 AST 感知和子代理能力值得试用，但需留意 Subagent 状态可靠性问题。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-10-26）

## 1. 热门 Skills 排行

基于 PR 更新频度、社区关注度及技术影响力，以下为当前最受关注的 8 个 Skills 相关 PR：

| 排名 | PR | 功能简介 | 社区讨论热点 | 当前状态 | 链接 |
|------|------|----------|--------------|----------|------|
| 1 | #1245 | 新增 `notion-spec-to-implementation`（产品/技术规范转 Notion 实现任务）与 `quantitative-resume-auditor`（定量简历审计）两个技能 | 企业级文档转化与简历自动化审核需求强烈，更新持续至 10 月，社区关注度高 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1245) |
| 2 | #1742 | `mcp-builder` 适配 MCP ≥2.0：`streamable_http_client` 导入及自定义 HTTP 头配置 | MCP 协议版本迭代导致现有技能失效，兼容性修复是社区当前最紧迫的技术痛点 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1742) |
| 3 | #1298 | `skill-creator` 修复触发评估（trigger evals）误报、Windows 管道兼容及运行时失败处理 | 技能创建工具本身的稳定性直接影响新技能产出，跨平台支持受关注 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1298) |
| 4 | #1771 | 新增 `proofcore-contract-auditor`：Solidity/Rust 智能合约静态分析，并将审计证明锚定至 TON 区块链 | Web3/智能合约安全审计是新兴垂直领域，代表社区向区块链方向延伸 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1771) |
| 5 | #1703 | 新增 `md2video-audio`：基于 Marp 将 Markdown 转为带 AI 语音的 MP4 视频 | 零成本文档转视频，内容创作与多模态输出需求明显 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1703) |
| 6 | #1980 | `webapp-testing` 修复 `with_server.py` 中 `shell=True` 导致的命令注入风险（CWE-78） | 技能脚本安全性成为社区高度关注的合规与安全议题 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1980) |
| 7 | #525 | 新增 `pyxel` 复古游戏开发技能：Python 游戏实现、无头输入运行、帧检查与状态验证 | 游戏开发垂直领域技能，更新持续至 10 月，社区长期关注 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/525) |
| 8 | #1681 | `skill-creator` 支持 `package_skill.py` 直接执行并更新引用路径 | 技能打包与分发工具链完善，降低社区贡献门槛 | OPEN | [查看 PR](https://github.com/anthropics/skills/pull/1681) |

> 注：以上均为 OPEN 状态，尚未合并入主分支。

---

## 2. 社区需求趋势

从 Issues 中提炼，社区最期待的新 Skill 方向包括：

1. **工作流自动化与企业协作**
   - 组织内技能共享（Issue #228）：期待 Claude.ai 支持 org-wide 技能库，避免手动通过 Slack/Teams 传递 `.skill` 文件。
   - 规范转实现（Issue #1245 关联）：将产品/技术规范自动拆解为可执行任务，强调进度追踪与验收标准。

2. **代码审查与安全治理**
   - 智能合约审计（Issue #1771 关联）：Solidity/Rust 静态分析及区块链锚证。
   - AI Agent 治理（Issue #412）：策略 enforcement、威胁检测、信任评分与审计轨迹。
   - 技能本身的质量与安全分析（Issue #83）：`skill-quality-analyzer` 与 `skill-security-analyzer` 元技能，用于审计市场中的社区技能。

3. **测试生成与质量保障**
   - 技能触发评估可靠性（Issue #556）：`run_eval.py` 中 `claude -p` 无法触发技能，触发率为 0%，亟需修复评测工具链。
   - Web 应用测试安全（Issue #1980）：避免 `shell=True` 引入的命令注入漏洞。

4. **文档处理与多模态输出**
   - DOCX/ODT/PDF 文档操作（Issue #1734、#1792、#2018）：孤立评论检测、LibreOffice 超时处理、XML 命名空间修复等。
   - Markdown 转视频/音频（Issue #1703）：文档内容的多媒体化输出。

5. **长上下文与记忆优化**
   - 紧凑内存（Issue #1329）：`compact-memory` 使用符号化记法减少长期 Agent 会话中的上下文占用。

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、技术价值明确，且已近期更新，大概率在短期内落地：

1. **#1980 webapp-testing: avoid shell=True in with_server.py**
   - 安全修复（CWE-78），更新于 2026-10-25，属于高优先级合规补丁，合并概率极大。
   - [查看 PR](https://github.com/anthropics/skills/pull/1980)

2. **#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills**
   - 更新于 2026-10-15，功能完整且贴合企业文档自动化需求，社区关注度持续高涨。
   - [查看 PR](https://github.com/anthropics/skills/pull/1245)

3. **#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers**
   - 修复 MCP 2.0 破坏性变更，影响所有依赖 MCP 连接的技能，属于基础设施级修复，近期合并需求迫切。
   - [查看 PR](https://github.com/anthropics/skills/pull/1742)

4. **#1681 fix(skill-creator): support direct execution of package_skill.py and update usage paths**
   - 更新于 2026-10-24，改进技能打包工具链，降低社区贡献门槛，有助于加速后续技能落地。
   - [查看 PR](https://github.com/anthropics/skills/pull/1681)

5. **#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures**
   - 修复技能创建器的核心评测机制，跨平台稳定性是社区贡献新技能的前提。
   - [查看 PR](https://github.com/anthropics/skills/pull/1298)

---

## 4. Skills 生态洞察

**当前社区在 Skills 层面最集中的诉求是：在企业工作流自动化、代码/合约安全审计与文档多模态处理三个垂直领域快速落地实用技能，同时修复 MCP 兼容性、技能触发评测及脚本安全等基础工具链问题，以支撑社区规模化贡献与信任分发。**

---

# Claude Code 社区动态日报
**日期**: 2026-10-26  
**数据来源**: github.com/anthropics/claude-code

---

## 1. 今日速览

过去 24 小时内，Claude Code 仓库未发布新版本，但社区活跃度保持在较高水平，共更新 50 条 Issue 和 1 条 PR。核心讨论集中在 **Headless 模式 Token 消耗异常**、**密码输入权限限制**、**多会话/远程协作稳定性** 以及 **桌面端与 VS Code 集成体验** 四个方向。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 评论/👍 | 关注理由 |
|---|------|------|---------|----------|
| [#97074](https://github.com/anthropics/claude-code/issues/97074) | Headless `claude -p` 每 Token 占用约 1.8× 的 5 小时窗口，远高于交互式 CLI | OPEN | 29 / 50 | **最高关注度**。Headless/入口点 `sdk-cli` 在相同工作负载下消耗显著更多 Token 预算，直接影响自动化流程的成本与可行性，社区讨论激烈。 |
| [#78160](https://github.com/claude-code/issues/78160) | 密码输入被全面阻断，破坏合法开发/测试工作流，亟需权限门控 Opt-in | OPEN | 18 / 25 | 涉及安全与开发效率的平衡。开发者希望在 localhost/自有测试环境下可受控绕过默认拦截，是典型的“安全策略 vs 开发体验”矛盾。 |
| [#48805](https://github.com/claude-code/issues/48805) | 桌面应用 Terminal 字体族设置功能请求 | CLOSED | 14 / 63 | 虽已关闭，但 👍 数高达 63，反映桌面端 UI 个性化需求强烈，值得产品团队重新评估优先级。 |
| [#78795](https://github.com/claude-code/issues/78795) | 基于规则的前置元数据，实现自动记忆主题文件的触发式注入 | OPEN | 13 / 0 | 记忆系统增强方向。社区希望通过类似 Rules 的机制，让跨会话记忆更可控、更可触发。 |
| [#84981](https://github.com/claude-code/issues/84981) | macOS CLI 后台任务在精确 30 分钟定时器后被 SIGTERM，退出码 144 | CLOSED | 10 / 0 | 长时间运行的后台 Bash 任务被静默杀死，对长会话自动化场景是致命稳定性问题。 |
| [#104907](https://github.com/claude-code/issues/104907) | VS Code 扩展中 `/btw` 面板 Cmd+C 无效，会话名字段 Cmd+V 无效 | OPEN | 3 / 0 | IDE 集成体验问题。剪贴板操作在特定面板失效，影响日常编辑效率，属于高频交互痛点。 |
| [#104410](https://github.com/claude-code/issues/104410) | 远程控制会话频繁断开且不自动恢复，跨会话消息丢失、身份变更 | OPEN | 2 / 0 | 多会话协作的核心基础设施不稳定，直接影响“编排器 + 兄弟会话”架构的可用性。 |
| [#89882](https://github.com/claude-code/issues/89882) | 长时间多会话协作中，ListAgents 的对等身份/可达性在空闲后降级 | CLOSED | 3 / 0 | 反映代理发现与通信机制在长连接下的可靠性不足，是多 Agent 工作流的瓶颈。 |
| [#104760](https://github.com/claude-code/issues/104760) | 过期临时租赁导致孤立插件版本被固定（v2.1.233 确认） | OPEN | 1 / 0 | 插件生命周期管理缺陷，可能导致插件版本混乱，影响可扩展性。 |
| [#100897](https://github.com/claude-code/issues/100897) | 桌面端斜杠菜单中技能描述提示框重复悬停后永久卡住 | OPEN | 1 / 0 | 桌面 UI 细节缺陷，虽单条影响有限，但反映桌面端交互打磨仍有提升空间。 |

---

## 4. 重要 PR 进展

过去 24 小时内仅有 1 条更新的 PR：

| # | 标题 | 状态 | 作者 | 说明 |
|---|------|------|------|------|
| [#29757](https://github.com/anthropics/claude-code/pull/29757) | docs(plugin-dev): 明确技能开发指南中的技能命名 | CLOSED | @webwww123 | 将技能开发前置元表示例改为小写连字符命名，增加元数据说明与审核检查项，解决技能名与 kebab-case 目录标识不匹配问题。Closes #24556。 |

> **注**：PR 活动较少，社区近期以 Issue 反馈和讨论为主，代码贡献集中在文档与插件开发规范层面。

---

## 5. 功能需求趋势

从全部 Issue 中提炼出以下社区关注方向：

1. **记忆系统与上下文持久化**  
   多个 Issue（#78795、#75334、#84265）围绕自动记忆系统的可靠性、跨会话读取与触发式注入展开，是社区最希望增强的长期记忆能力。

2. **多会话协作与远程代理**  
   #89882、#89120、#104410、#81899 等反映 ListAgents 可达性、Cowork 工具缺失、远程控制断连、会话标题被覆盖等问题，说明多 Agent 编排与远程协作是当前重点痛点。

3. **IDE 与桌面端集成体验**  
   #104907（VS Code 剪贴板）、#104069（Linux Wayland 快捷入口）、#48805（桌面终端字体）、#100897（提示框卡死）表明，跨平台 IDE 插件与桌面应用的交互细节仍需打磨。

4. **安全策略与开发者自主权**  
   #78160（密码输入阻断）、#89951（MCP 只读工具被拒）、#89957（安全护栏过于侵入）显示开发者希望在受控环境下获得更细粒度的权限豁免与自定义选项。

5. **成本与性能可见性**  
   #97074 揭示 Headless 模式 Token 消耗差异，社区开始关注不同入口点的资源消耗差异及成本透明度。

---

## 6. 开发者关注点（痛点与高频需求）

- **Headless/自动化模式成本异常**：`claude -p` 入口点 Token 消耗约为交互式 CLI 的 1.8 倍，亟需官方解释或修复，否则将影响 CI/CD 与脚本化场景的采用。
- **长会话稳定性**：macOS 后台任务 30 分钟定时杀死、远程控制会话频繁断开、ListAgents 空闲后降级，均指向长时间运行会话的工程可靠性不足。
- **安全护栏过度严格**：默认策略在合法开发/测试场景（localhost、自有设备、只读 MCP）中产生误拦截，开发者呼吁增加“开发环境 Opt-in”机制。
- **记忆系统形同虚设**：文件级记忆写入但不被模型可靠读取或执行，跨会话行为约束失效，严重影响个性化工作流。
- **插件生命周期管理**：临时租赁文件残留导致孤立插件版本被固定，插件升级与回滚体验有待改进。

---

**日报生成完毕**。如需深入分析某个具体 Issue 或跟进 PR 状态，可访问上方 GitHub 链接查看完整讨论。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

# OpenAI Codex 社区动态日报
**日期**: 2026-10-26  
**数据来源**: github.com/openai/codex  

---

## 1. 今日速览

过去 24 小时内 OpenAI Codex 仓库未发布新版本，也无 Pull Request 更新。社区活动集中在 Issue 反馈上，共 50 条 Issue 获得更新，其中 Windows 平台的 Computer Use 功能故障、VS Code 扩展启动失败以及 MCP/插件连接问题成为讨论重心。开发者普遍关注跨平台稳定性与工具链可用性。

---

## 2. 版本发布

过去 24 小时内无新版本发布，该部分暂无内容。

---

## 3. 社区热点 Issues（精选 10 条）

以下按社区关注度（评论数、点赞数及问题严重性）筛选，涵盖 Windows/macOS 桌面端、VS Code 扩展、CLI 及 MCP 生态：

| # | 标题 | 核心内容 | 社区反应 | 链接 |
|---|------|---------|---------|------|
| #56691 | Codex 26.1021.22027 无法在 VS Code 1.143.1 (Windows) 上启动 UI | 最新版扩展在 Windows VS Code 中无法启动界面，影响 IDE 集成工作流 | 30 条评论，14 个 👍（热点中点赞最高），开发者反馈升级后无法使用 | [查看](https://github.com/openai/codex/issues/56691) |
| #51524 | Windows Computer Use 在 get_window_state 处停止，无法获取浏览器 URL | Chrome/Edge 窗口枚举正常，但 `sky.get_window_state({include_text:true})` 直接中断 Turn，导致 Computer Use 无法继续 | 39 条评论，核心功能受阻，Windows 用户集中反馈 | [查看](https://github.com/openai/codex/issues/51524) |
| #49383 | Windows Computer Use 截图捕获失败，FrameArrived 超时及 E_INVALIDARG | 窗口检测正常，但截图不可靠，影响基于视觉的自动化任务 | 37 条评论，与 #51524 形成 Windows Computer Use 双重故障 | [查看](https://github.com/openai/codex/issues/49383) |
| #53132 | Windows 11 MSIX 安装反复失败 0x80073CF6 / 0x80070005 |  stale packaged service registration 导致无法安装，中文 Windows 11 用户受影响明显 | 15 条评论，安装层面阻断新用户上手 | [查看](https://github.com/openai/codex/issues/53132) |
| #50737 | Windows 委派任务使用 workspace-write/auto_review，忽略用户级沙箱默认值 | 通过 dots 创建的新任务执行策略与用户设置不一致，控制设置不明确 | 12 条评论，涉及安全沙箱与权限模型，开发者关注数据隔离 | [查看](https://github.com/openai/codex/issues/50737) |
| #50728 | macOS Computer Use 出现输入/粘贴重复，Claude 键盘点击延迟 16–56s | 干扰手动输入，本地缓解措施无效，CoreGraphics 事件监测确认问题 | 11 条评论，macOS 平台输入控制稳定性问题 | [查看](https://github.com/openai/codex/issues/50728) |
| #54956 | 提升 Codex Plus 跨模型使用效率，支持更经济的模型实验 | 功能需求：希望降低模型调用成本，支持更多模型尝试 | 10 条评论，社区对费率与模型选择灵活性有明确诉求 | [查看](https://github.com/openai/codex/issues/54956) |
| #53177 | ChatGPT Work Cloud 中 list_threads 在本地执行时失败 | Mac 桌面端云端模式下线程列表接口不可用 | 9 条评论，Pro 订阅用户受影响，云端协作功能稳定性受质疑 | [查看](https://github.com/openai/codex/issues/53177) |
| #53854 | Windows Cloudflare 插件 OAuth 成功后消失，重连打开重复授权标签 | MCP 插件能力在成功调用后丢失，认证流程异常 | 4 条评论，4 个 👍，MCP 插件生命周期管理问题 | [查看](https://github.com/openai/codex/issues/53854) |
| #56873 | Windows Chrome 和内置浏览器不可用，26.1021.31345 重装后无浏览器路由 | 浏览器路由缺失，影响 Computer Use 中的网页自动化 | 5 条评论，新版本回归问题，浏览器控制模块失效 | [查看](https://github.com/openai/codex/issues/56873) |

---

## 4. 重要 PR 进展

过去 24 小时内仓库无 Pull Request 更新（共 0 条），暂无代码合并或功能提交可供报告。

---

## 5. 功能需求趋势

从近期 Issue 中可提炼出以下社区关注方向：

1. **跨平台 Computer Use 稳定性**  
   Windows 和 macOS 均出现窗口状态获取、截图捕获、输入控制失效等问题，社区亟需 Computer Use 模块在不同操作系统上的统一稳定性。

2. **IDE 集成与扩展兼容性**  
   VS Code 扩展在新版本下启动失败（#56691），反映开发者对 IDE 原生集成的依赖度高，对版本兼容性回归测试要求更严。

3. **MCP 与插件生态可用性**  
   Cloudflare 插件认证后消失（#53854）、MCP 工具在现有对话中不可用（#56985）、本地 MCP 初始化后取消等问题，表明开发者希望 MCP 服务器连接更可靠、支持在现有会话中刷新与重新发现工具（#56970）。

4. **模型费率与使用效率**  
   社区呼吁优化 Codex Plus 跨模型使用效率（#54956），降低实验成本，支持更多模型选择。

5. **沙箱与权限控制透明度**  
   Windows 委派任务的沙箱策略与用户设置不一致（#50737），开发者希望执行策略更透明、可控。

---

## 6. 开发者关注点

**高频痛点总结：**

- **Windows 平台问题集中**：Computer Use 窗口/截图功能失效、MSIX 安装失败、内置浏览器不可用、VS Code 扩展启动失败，Windows 成为当前反馈量最大的平台。
- **版本回归与兼容性**：多个 Issue 指向新版本（26.1021.x）引入的功能中断，如浏览器路由缺失、扩展 UI 无法启动，提示发布前回归测试不足。
- **MCP/插件生命周期脆弱**：OAuth 后插件消失、重复授权标签、工具在现有对话中不可用，影响开发者构建基于 Codex 的自定义工作流。
- **macOS 输入控制干扰**：Computer Use 与手动输入冲突，导致键盘/粘贴重复及高延迟，影响日常编辑体验。
- **云端与本地协作不一致**：ChatGPT Work Cloud 模式下 list_threads 失败、iPad 远程线程详情冻结，跨设备同步体验有待提升。

**建议后续跟踪**：重点关注 Windows Computer Use 相关 Issue 的修复进度，以及 VS Code 扩展兼容性补丁的发布时间表。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

# Gemini CLI 社区动态日报 (2026-10-26)

## 今日速览

Gemini CLI 昨日发布了夜间版本 `v0.67.0-nightly.20261025`，社区围绕子代理（Subagent）稳定性展开广泛讨论，多个 P1 级 Bug 指出子代理在达到最大轮次后仍错误报告成功、通用代理易挂起等核心问题。同时，AST 感知代码读取、浏览器代理跨平台兼容性（Wayland）以及扩展画廊收录成为社区关注的功能增强方向。

## 版本发布

**v0.67.0-nightly.20261025.gcd1b45c2d**  
- 发布时间：2026-10-25  
- 完整变更：https://github.com/google-gemini/gemini-cli/compare/v0.67.0-nightly.20261024.gcd1b45c2d...v0.67.0-nightly.20261025.gcd1b45c2d  
- 说明：这是一份夜间构建版本，具体变更详见上游比对链接。

---

## 社区热点 Issues（精选 10 条）

| # | 标题 | 核心内容 | 为何值得关注 | 链接 |
|---|------|---------|-------------|------|
| #22323 | Subagent recovery after MAX_TURNS is reported as GOAL success | 子代理在达到最大轮次前未做任何分析，却仍上报 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了中断事实。 | P1 级 Bug，直接影响子代理任务状态的可信度，可能导致上层编排逻辑误判。 | https://github.com/google-gemini/gemini-cli/issues/22323 |
| #21409 | Generalist agent hangs | 通用代理在处理简单操作（如创建文件夹）时会无限挂起，用户等待长达一小时仍无结果。 | P1 级 Bug，8 个 👍，严重影响日常交互体验，需优先修复。 | https://github.com/google-gemini/gemini-cli/issues/21409 |
| #19873 | Leverage model's bash affinity via Zero-Dependency OS Sandboxing | 提议利用 Gemini 3 模型对原生 Bash 工具的亲和性，通过零依赖 OS 沙箱和后执行意图路由增强代码库探索与编辑能力。 | P2 增强需求，9 条评论，涉及模型能力与安全隔离的架构设计。 | https://github.com/google-gemini/gemini-cli/issues/19873 |
| #22745 | Assess the impact of AST-aware file reads, search, and mapping | 探索 AST 感知的文件读取、搜索和代码库映射是否能减少 Token 浪费并提升定位精度。 | P2 功能 Epic，7 条评论，代表社区对代码理解精度的追求。 | https://github.com/google-gemini/gemini-cli/issues/22745 |
| #21968 | Gemini does not use skills and sub-agents enough | 模型在未被显式指令的情况下，极少主动调用自定义技能和子代理，导致专业能力闲置。 | P2 Bug，7 条评论，反映子代理调度与触发机制存在可用性问题。 | https://github.com/google-gemini/gemini-cli/issues/21968 |
| #29791 | holt-os/holt missing from Extensions Gallery | 符合所有文档要求并通过验证的扩展 `holt-os/holt` 长期未出现在扩展画廊中。 | P2 Bug，6 条评论，涉及扩展生态收录与爬取机制的可信度。 | https://github.com/google-gemini/gemini-cli/issues/29791 |
| #21983 | browser subagent fails in wayland | 浏览器子代理在 Wayland 显示服务器下失败，终止原因为 GOAL，但实际未完成任务。 | P1 Bug，4 条评论，1 个 👍，反映跨平台（Linux 桌面环境）兼容性不足。 | https://github.com/google-gemini/gemini-cli/issues/21983 |
| #22267 | Browser Agent ignores settings.json overrides | 浏览器代理完全忽略全局或项目级 `settings.json` 中的配置覆盖（如 `maxTurns`）。 | P2 Bug，4 条评论，配置层未生效会导致行为不可预期。 | https://github.com/google-gemini/gemini-cli/issues/22267 |
| #22186 | get-shit-done output hook causes crash | 在 `get-shit-done` 输出钩子打印用户摘要时，Gemini CLI 反复崩溃。 | P1 Bug，3 条评论，输出钩子稳定性问题可能导致会话中断。 | https://github.com/google-gemini/gemini-cli/issues/22186 |
| #24246 | Gemini CLI encounters 400 error with > 128 tools | 当可用工具超过 128 个时，CLI 遇到 400 错误，模型未能智能限制工具范围。 | P2 Bug，3 条评论，工具数量扩展时的上下文窗口与协议限制问题。 | https://github.com/google-gemini/gemini-cli/issues/24246 |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 变更说明 | 状态 | 链接 |
|---|------|---------|------|------|
| #29948 | fix(tools): respect cancellation during background output reads | 取消后台输出读取时立即中止，不再等待完整延迟，避免已取消的调用仍成功完成。 | OPEN | https://github.com/google-gemini/gemini-cli/pull/29948 |
| #29946 | fix(agents): isolate remote conversations by parent session and endpoint | 防止远程代理会话标识符在同一进程的独立父会话间泄漏，按 `(parent session, endpoint)` 元组作用域。 | OPEN | https://github.com/google-gemini/gemini-cli/pull/29946 |
| #29947 | fix(tools): preserve oversized background log tails | 当后台日志单行超过 64 KB 尾窗时，保留部分尾片段而非静默丢弃全部内容。 | OPEN | https://github.com/google-gemini/gemini-cli/pull/29947 |
| #29942 | fix(core): scan complete plan content and report read failures | 接受长空白前缀后的非空计划文件，将不可读计划报告为读取失败而非空文件。 | OPEN | https://github.com/google-gemini/gemini-cli/pull/29942 |
| #29940 | fix(scripts): run YAML lint without Unix shell pipelines | 在原生 Windows 上运行 YAML 预检，避免依赖 Unix 工具，并修复 Python 旧版 Windows 代码页下的 Unicode 解码错误。 | OPEN | https://github.com/google-gemini/gemini-cli/pull/29940 |
| #29933 | docs(readme): correct MCP examples and clarify checkpointing | 修正 README 中的 MCP 使用示例，区分检查点恢复与保存/恢复对话。 | OPEN | https://github.com/google-gemini/gemini-cli/pull/29933 |
| #29935 | fix(cli): preserve whitespace in referenced file content | 附加 `@file` 文本文件时保留有意义的前导和尾随空白，避免缩进和换行被意外修改。 | OPEN | https://github.com/google-gemini/gemini-cli/pull/29935 |
| #29931 | fix(cli): expand Windows home-relative paths | 展开 Windows 中的 `~\` 家目录相对路径，使自定义策略路径和本地扩展注册表路径正确解析。 | OPEN | https://github.com/google-gemini/gemini-cli/pull/29931 |
| #29871 | fix(core): keep the unsent request when loop recovery starts before a turn | 循环恢复开始前保留未发送的请求，避免工具响应被丢弃并报告为 "Response was lost or interrupted"。 | OPEN | https://github.com/google-gemini/gemini-cli/pull/29871 |
| #29912 | fix(core): strip trailing punctuation and unbalanced brackets from web_fetch URLs | 清理 `web_fetch` URL 中的尾随标点和不平衡括号，防止逗号分隔的 URL 产生污染地址。 | OPEN | https://github.com/google-gemini/gemini-cli/pull/29912 |

---

## 功能需求趋势

从近 24 小时的 Issues 和 PR 中可提炼出以下社区关注方向：

1. **子代理（Subagent）可靠性与调度**  
   多个 P1/P2 Issue 指出子代理状态上报错误、通用代理挂起、主动调用不足等问题，社区亟需更稳定的子代理生命周期管理和触发机制。

2. **代码理解精度提升（AST 感知）**  
   围绕 AST 感知的文件读取、搜索和代码库映射（如 #22745、#22746、#22747）出现多个 Epic，表明社区希望减少 Token 浪费、提升代码定位精度。

3. **跨平台与环境兼容性**  
   Wayland 下的浏览器子代理失败（#21983）、Windows 路径解析（#29931）、Android/Termux 下的 ripgrep 兼容（#29823）等，显示跨操作系统和桌面环境支持是持续痛点。

4. **扩展生态与 MCP 集成**  
   扩展画廊收录问题（#29791）、MCP 示例文档修正（#29933）、Windows 扩展更新文件锁（#19013）等，反映社区对扩展注册、发现与跨平台安装的关注度提升。

5. **配置覆盖与行为可控性**  
   浏览器代理忽略 `settings.json`（#22267）、防止破坏性 Git 操作（#22672）等需求，表明用户希望对代理行为有更细粒度的控制和安全边界。

---

## 开发者关注点

- **子代理状态不一致**：子代理在达到最大轮次（MAX_TURNS）后仍报告 `GOAL` 成功，导致中断被掩盖，上层编排逻辑难以感知真实失败。
- **通用代理挂起**：处理简单文件系统操作时易无限等待，严重影响 CLI 可用性，已有用户等待超一小时。
- **输出与日志稳定性**：`get-shit-done` 输出钩子导致崩溃、后台日志超大时内容丢失、计划文件读取误判为空，均影响会话完整性。
- **工具数量上限**：超过 128

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

# DeepSeek Reasonix 社区动态日报 (2026-10-26)

## 1. 今日速览

Reasonix Studio 社区今日围绕 UI 细节修复与主题系统扩展展开活跃讨论，共 16 条 Issue 更新，其中多条来自 Studio 移动端与桌面端的直接反馈；PR 侧则集中于设置导航精简、后台任务资源清理及语法高亮 Token 扩展，暂无新版本发布。

## 2. 版本发布

过去 24 小时内无新 Release 发布。

## 3. 社区热点 Issues（精选 10 条）

| # | 标题 | 状态 | 核心内容与重要性 | 社区反应 | 链接 |
|---|------|------|------------------|----------|------|
| #14343 | 会话窗口异常线条可选中不可拉动 | OPEN | Studio 会话窗口出现两条无法拖动的线条，影响实际会话体验，需彻底去除。 | 7 条评论，讨论较为集中，属高优先级 UI 缺陷 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14343) |
| #14451 | 竖线与行宽不一致挡住光标 | OPEN | 编辑器竖线未随缩放对齐行宽，导致无法勾选文字，用户期望参考 dsh 实现拖动位置显现提示。 | 5 条评论，涉及核心编辑体验 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14451) |
| #14358 | 主题包支持完整语法词汇 | CLOSED | Studio 主题包目前仅暴露 4 个语法 Token，需扩展至 9 类（comment/keyword/function/variable/string/number/type/operator/punctuation），为主题系统完善奠定基础。 | 2 条评论，已获批为优先事项 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14358) |
| #14359 | 引入 OpenCode 主题调色板 | OPEN | 提议在 Settings → Appearance 增加完整 OpenCode 主题集（含深色版与重新设计的浅色版），覆盖其余 32 套内置主题。 | 2 条评论，社区对主题定制需求强烈 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14359) |
| #14460 | 会话框宽度拉条导致 UI 失误及手机端不可用 | CLOSED | 指出 PR #14198 引入的会话框宽度拉条导致连续多日大量用户出现 UI 误操作，且手机端基本无法使用，建议移除该功能。 | 1 条评论，涉及跨端兼容性争议 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14460) |
| #14499 | 手机端远程操控缺少退出拦截提醒 | OPEN | 手机端误触易退回空白页，建议增加退出确认拦截。 | 1 条评论，移动端易用性痛点 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14499) |
| #14488 | 新增语音输入（语音转文字）功能 | OPEN | 用户希望在 Studio 中增加类似 Workbuddy 的语音输入能力，提升输入效率。 | 1 条评论，新增交互方式需求 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14488) |
| #14465 | 缺少默认文件夹/临时会话机制 | OPEN | 会话必须在文件夹中打开，用户建议增加默认隐藏式内置临时会话，避免每次手动添加工作区。 | 1 条评论，工作流便利性问题 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14465) |
| #14484 | 侧栏偶尔无法拉动 | OPEN | Studio 侧栏出现间歇性无法拖拽的情况，影响布局调整。 | 1 条评论，UI 稳定性反馈 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14484) |
| #14489 | Studio 设置精简导航提案 | OPEN | 提议在不牺牲可发现性的前提下精简 Studio 设置导航，已有原型提交，等待审核。 | 0 条评论，设计方向讨论 | [查看](https://github.com/esengine/DeepSeek-Reasonix/issues/14489) |

## 4. 重要 PR 进展（精选 10 条）

| # | 标题 | 状态 | 功能/修复摘要 | 链接 |
|---|------|------|--------------|------|
| #14483 | feat(theme): 五个可选语法 Token | CLOSED | 修复 #14358，新增 `synComment`、`synType`、`synOperator`、`synPunctuation`、`synVariable` 五个可选语法 Token，使主题包可覆盖全部 9 类代码类别。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14483) |
| #14487 | [desktop] 精简 Studio 设置并修复分类导航 | CLOSED | 综合 PR 被拆分为独立修复：#14492（本地文件备份路由）、#14491（分类滚动与异步搜索定位）、#14490（网络保存配置与草稿区分）。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14487) |
| #14490 | [desktop] 区分网络草稿与已保存配置 | CLOSED | 网络设置将保存配置与可编辑草稿分离，未发生实际更改时禁用保存，连接诊断明确描述保存配置。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14490) |
| #14491 | [desktop] 修复设置滚动与异步搜索定位 | CLOSED | 切换设置类别时从顶部开始；选择搜索结果后，当设置异步出现时自动滚动并高亮。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14491) |
| #14492 | Register file backups on machine settings routes | CLOSED | 修复本机配置备份接口 404，机器设置路由器现在提供备份目录/导出/预览/应用处理程序。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14492) |
| #14496 | fix(jobs): 防止任务 panic 被误报成功 | CLOSED | 恢复的任务或清理 panic 不能变为成功结果，修正现有调用/终结行为，避免错误状态误报。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14496) |
| #14464 | [config] 后台写入者可取消准入与身份清理 | CLOSED | 后台任务/舰队写入者注册可在调用取消时停止等待，注册表查询和无关退役不再在共享互斥锁下等待检查点准入。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14464) |
| #14469 | [config] 修复后台任务未启动时的资源清理 | CLOSED | 当 Manager 拒绝启动任务时，释放已准备的检查点预留、转录和进度资源，避免资源泄漏。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14469) |
| #14437 | feat(studio): 统一子代理执行与协作 | OPEN | Studio 用户可引导运行中的子代理、检查报告、交付选定上下文、分页历史并从详情面板预览/请求任务图恢复。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14437) |
| #14500 | [desktop] 让对话的旧页面无需按压即可到达 | OPEN | 长对话仍以分页栈形式打开，需逐页获取；该 PR 改进历史页面加载体验，减少用户按压次数。 | [查看](https://github.com/esengine/DeepSeek-Reasonix/pull/14500) |

## 5. 功能需求趋势

从近 24 小时的 Issue 与 PR 来看，社区关注点呈现以下趋势：

1. **主题与外观定制**：用户强烈要求 Studio 主题系统与 OpenCode 对齐，包括完整语法高亮 Token（9 类语义着色）及更多深色/浅色主题包，个性化需求明显提升。
2. **移动端与跨端体验**：手机端远程操控退出拦截、会话框宽度拉条导致手机端不可用、侧栏无法拖拽等问题集中暴露，跨端一致性与触控友好度成为短期重点。
3. **工作流便利性**：默认临时会话/文件夹机制、Todo 进度条常驻显示、审批解释按钮等功能请求，反映用户希望降低日常操作摩擦。
4. **新型交互输入**：语音输入（语音转文字）被提及，显示社区对多模态输入方式的兴趣。
5. **后台任务与隔离性**：开发者侧关注事务性写入、可恢复隔离代理、后台资源清理等底层稳定性与并发能力。

## 6. 开发者关注点

- **UI 稳定性痛点**：会话窗口异常线条、竖线遮挡光标、侧栏无法拖拽、设置分类滚动异常等反复出现，建议优先修复影响核心编辑体验的 UI 缺陷。
- **移动端优先级**：手机端远程操控误退出、会话框拉条导致不可用等问题直接影响移动端可用性，需尽快评估并修复。
- **主题系统完整性**：#14358/#14359 及已合并的 #14483 表明主题扩展已列入优先级，后续需尽快落地剩余语法 Token 与 OpenCode 主题包。
- **设置导航重构**：#14489 的精简设计提案与 #14487 的拆分修复显示，设置页的信息架构与导航逻辑正在接受社区审视，建议尽早敲定导航规范。

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

# OpenCode 社区动态日报 (2026-10-26)

## 今日速览

OpenCode 社区今日无新版本发布，但围绕 V2 核心稳定性与桌面端体验展开了密集活动。核心关注点集中在会话 shell 输出绕过限制导致会话卡死的严重缺陷、MCP 工具进度通知补完，以及桌面端配对链接被消耗的隐私/可用性问题。同时，多个与媒体资源优化（media_blob）、TUI 交互流畅度及 CI 流水线解耦相关的 PR 获得推进。

---

## 版本发布

过去 24 小时内无新版本 Release。

---

## 社区热点 Issues

以下选取 10 个最具代表性的 Issue（含已关闭的高价值讨论），按社区影响程度排序：

| # | 标题 | 状态 | 关注理由 | 链接 |
|---|------|------|----------|------|
| #45099 | core: session shell output bypasses tool limits and strands sessions | OPEN | **V2 严重缺陷**。shell 命令输出可绕过 50 KiB 工具输出限制，持续约 1 MiB 数据注入下一轮模型请求，易导致上下文窗口溢出并以 `provider.unknown` 失败，直接拖垮会话。核心稳定性问题，需优先修复。 | https://github.com/anomalyco/opencode/issues/45099 |
| #59106 | desktop: chat link previews consume one-time pairing links before they can be opened | OPEN | **桌面端可用性/安全问题**。WhatsApp、Slack 等消息应用的链接预览会提前抓取并兑配一次性 `/auth/connect/<code>` 链接，导致实际接收者打开时链接已失效，影响设备配对流程。 | https://github.com/anomalyco/opencode/issues/59106 |
| #27076 | Proposal: Auto-allow read-only tools in permission system | CLOSED | **权限体系优化提案**。建议对 read、glob、grep、todowrite 四类只读工具实施预过滤自动允许，减少无副作用操作的反复确认，提升开发效率。虽已关闭，但反映社区对权限交互摩擦的持续关注。 | https://github.com/anomalyco/opencode/issues/27076 |
| #57540 | Document free-tier accounting for free models | OPEN | **免费层计费透明度**。社区要求文档化免费模型的闲置时间、池作用域及剩余额度计算方式，属于典型的“计费/配额可解释性”需求。 | https://github.com/anomalyco/opencode/issues/57540 |
| #58827 | Usage limit hit before any prompts were submitted | CLOSED | **配额计算异常**。用户未提交任何提示即被告知已达使用上限，涉及计费/计数逻辑可能存在的误判，已关闭但值得关注其根因是否彻底修复。 | https://github.com/anomalyco/opencode/issues/58827 |
| #58826 | Please add USDC as a payment method for Go payments | CLOSED | **支付方式扩展**。请求在 OpenCode Go 订阅中增加 USDC 支付，反映部分用户对加密货币支付的需求，目前处于 triaging 待决状态。 | https://github.com/anomalyco/opencode/issues/58826 |
| #51282 | `agent.list` returns only built-in agents right after server start | CLOSED | **插件激活竞态**。服务器启动后立即调用 `agent.list` 因未等待插件激活而只返回内置 Agent，影响第三方插件可用性，已修复并关闭。 | https://github.com/anomalyco/opencode/issues/51282 |

> 注：今日 Issues 总量为 7 条，上表已囊括全部有效条目并按技术意义重新排序。

---

## 重要 PR 进展

选取 10 个具有代表性的 PR，涵盖性能、修复、功能与基础设施：

| # | 标题 | 状态 | 核心内容 | 链接 |
|---|------|------|----------|------|
| #58803 | perf(core): warm the model provider connection at prompt admission | OPEN | **性能优化**。在提示词入场时预热模型提供商连接（DNS/TCP/TLS），使真实请求复用 warm socket，支持切换提供商，可选开启。 | https://github.com/anomalyco/opencode/pull/58803 |
| #59102 | fix(core): publish MCP tool progress notifications | OPEN | **MCP 修复**。发布 MCP 工具进度通知（核心侧），对应 Issue #49929；TUI 工具卡片的进度绘制不在本 PR 范围内。 | https://github.com/anomalyco/opencode/pull/59102 |
| #58297 | fix(core): Fix Github Bot so it is supported in v2 | OPEN | **GitHub 集成迁移**。将 v1 的 `opencode github install` / `opencode github run` 移植到 v2，修复 GitHub Bot 在 V2 中的支持缺失。 | https://github.com/anomalyco/opencode/pull/58297 |
| #59104 | feat(app): opt into experimental-media-uri and keep draft media bytes local | OPEN | **媒体资源优化**。桌面端和 Web 端请求 `media:<hash>` 引用，避免长会话中反复以 base64 重发图片，按需通过缓存加载，需开启 `experimental.media_blob`。 | https://github.com/anomalyco/opencode/pull/59104 |
| #59103 | feat(server): add experimental GET /api/experimental/media/:hash | OPEN | **服务端媒体 API**。新增实验性媒体哈希 GET 接口，客户端可跳过内联 base64，仅在需要时获取附件字节，双端均需 opt-in。 | https://github.com/anomalyco/opencode/pull/59103 |
| #58742 | feat(core): add byte-preserving offline media_blob backfill for legacy rows | OPEN | **数据迁移工具**。为旧数据库行提供离线脚本，将内联 base64 媒体移入 `blob` 表，手动运行，不自动执行。 | https://github.com/anomalyco/opencode/pull/58742 |
| #59085 | fix(app): slide between questions instead of flashing the question dock | OPEN | **TUI 交互优化**。问答切换时旧题向外滑出、新题向内滑入，消除之前闪烁/空白卡顿问题。 | https://github.com/anomalyco/opencode/pull/59085 |
| #57224 | fix(app): smooth timeline row motion | OPEN | **TUI 交互优化**。平滑处理流式行、已发送/排队提示、工作中及后台工作提示的位置与身份保持，修复 beta e2e 回归。 | https://github.com/anomalyco/opencode/pull/57224 |
| #59101 | fix(client): let clients drop tool-result image payloads from the store | CLOSED | **客户端存储优化**。允许客户端从存储中丢弃工具结果图片载荷（base64），避免长会话占用数百 MB 存储空间。 | https://github.com/anomalyco/opencode/pull/59101 |
| #59046 | ci: separate release builds from signing and publishing | OPEN | **CI 基础设施**。将发布构建与签名/发布解耦，所有使用密钥的作业限定在 `release` 环境，采用最小权限，移除 VS Code 发布工作流。 | https://github.com/anomalyco/opencode/pull/59046 |

---

## 功能需求趋势

从今日全部 Issues 与 PR 中提炼出的社区关注方向：

1. **权限系统与交互摩擦降低**  
   社区持续希望减少对无副作用操作（只读工具）的重复确认，期待更智能的预允许机制（#27076）。

2. **媒体资源与会话存储优化**  
   多个 PR 围绕 `media_blob`、`media:<hash>` 引用及图片载荷丢弃展开，核心目标是降低长会话中 base64 图片对内存/存储和带宽的占用（#59104、#59103、#58742、#59101）。

3. **V2 核心稳定性与兼容性**  
   shell 输出绕过限制（#45099）、GitHub Bot v2 移植（#58297）、插件激活竞态（#51282）表明社区正在推动 V2 从功能完备走向生产级稳定。

4. **桌面端与客户端体验**  
   配对链接被预览消耗（#59106）、TUI 问答/时间轴动画优化（#59085、#57224）、GUI 插件导出（#55246）显示桌面端和 TUI 交互细节是当前改进重点。

5. **计费透明度与支付方式**  
   免费层会计文档（#57540）、配额误判（#58827）、USDC 支付（#58826）反映用户对订阅计费规则和支付多样性的关注。

---

## 开发者关注点

**高频痛点与需求总结：**

- **会话稳定性**：V2 中 shell 输出未受工具输出限制约束，易导致模型请求过大并中断会话，是开发者目前最核心的核心层痛点。
- **权限交互成本**：每次工具调用（即使是只读操作）都需要用户批准，开发者普遍希望引入只读工具自动允许机制以减少干扰。
- **媒体/图片存储膨胀**：长会话中截图和工具结果图片以 base64 形式保留，导致客户端存储占用异常高，亟需按需加载与本地缓存方案。
- **桌面端配对流程脆弱**：一次性配对链接被第三方消息应用的链接预览机制提前兑换，影响设备绑定可用性。
- **计费与配额透明度**：免费模型的闲置时间、池作用域及剩余额度缺乏清晰文档，且存在未使用即触达上限的误报情况，用户对计费逻辑可解释性要求较高。

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

过去24小时无活动。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

# Hermes 社区动态日报 (2026-10-26)

## 今日速览

Hermes 社区今日围绕**统一网关（Unified Gateway）合并后的修复**展开密集讨论，#134889 追踪 Issue 已积累 220 条评论，#143547 继续跟踪 main 分支上的遗留问题。开发者集中修复 CLI、Desktop、Gateway 及跨平台（Windows/Telegram/Discord/Slack）的多个 P2/P3 级 Bug，并推进插件目录与性能优化（Git 版本查找、启动速度提升约 1 秒）。今日无新版本发布。

---

## 版本发布

过去 24 小时内无新 Release。

---

## 社区热点 Issues（共 9 条，精选 10 条）

| # | 标题 | 状态 | 核心内容 | 为何值得关注 | 链接 |
|---|------|------|----------|--------------|------|
| #134889 | Tracking: one gateway owns every local session (#106742) — post-merge fixes | CLOSED | 统一网关运行时合并后的修复追踪，#106742 已于 10 月 14 日合并至 main | 评论数高达 220 条，是本周社区讨论最集中的核心议题，涉及所有本地会话的网管模型变更 | [查看](https://github.com/NousResearch/hermes-agent/issues/134889) |
| #143547 | Unified gateway (#106742): open post-merge problems on main, continuing #134889 | OPEN | 统一网关合并后 main 分支上的未解决问题，延续 #134889 | 直接承接上述 Tracking Issue，评论 23 条，反映合并后仍有 CLI/TUI/Desktop/Cron/认证等层面的开放问题 | [查看](https://github.com/NousResearch/hermes-agent/issues/143547) |
| #143379 | RFC: THE DOC-CHAIN SUBSTRATE'S NETWORK — the read, the governance, the compaction | OPEN | 关于文档链基础网络的 RFC，涉及耐久记录的读取、治理与压缩 | 社区对长期记忆与会话压缩机制的架构讨论，评论 20 条，属于前瞻性功能方向 | [查看](https://github.com/NousResearch/hermes-agent/issues/143379) |
| #144703 | profile delete: warns "Gateway is running — it will be stopped" for a profile served by the multiplexer, then stops nothing | OPEN | 多路复用网关下 `hermes profile delete` 误报网关运行并停止无效 | 影响 CLI 操作正确性，P3 级但直接影响用户体验，今日新开 | [查看](https://github.com/NousResearch/hermes-agent/issues/144703) |
| #144711 | hermes profile list warns that profiles share a push credential, but the push adapter works per profile | OPEN | `profile list` 错误提示多个 profile 共享推送凭证，实际推送适配器是按 profile 工作的 | v0.22.5 稳定版已出现误报，涉及认证与多 profile 管理，今日新开 | [查看](https://github.com/NousResearch/hermes-agent/issues/144711) |
| #144675 | Bot Mode hide toast points to a nonexistent 'eye button in the Bots header' | OPEN | 隐藏机器人后弹窗提示点击不存在的“眼图标按钮” | Desktop 端 UI/UX 缺陷，今日新开，评论 1 条 | [查看](https://github.com/NousResearch/hermes-agent/issues/144675) |
| #144728 | session.resume of a live, not-yet-persisted session omits running/status | OPEN | 未持久化的活跃会话恢复时缺少 `running`/`status` 字段，导致 Conduit 锁定 composer | 会话恢复路径的核心 Bug，P2 级，今日新开 | [查看](https://github.com/NousResearch/hermes-agent/issues/144728) |
| #144729 | Canonical group stuck in stopping after lost approval lease — queued admissions prevent recovery | OPEN | 多代理组在丢失审批租约后卡在 stopping 状态，排队入会阻止恢复 | 多代理协作（Canonical Group）的稳定性问题，P2 级，今日新开 | [查看](https://github.com/NousResearch/hermes-agent/issues/144729) |
| #144725 | [Feature]: (cron) Recreate a deleted named Telegram DM topic and redeliver | OPEN | Cron 任务应重建已删除的命名 Telegram DM 主题并重投递，而非回退到根 DM | Telegram 平台集成的功能需求，P3 级，今日新开 | [查看](https://github.com/NousResearch/hermes-agent/issues/144725) |
| #115272 | fix(gateway): reset the todo store on cross-session agent reuse | CLOSED | 跨会话复用代理时重置待办事项存储 | 9 月创建但今日更新，网关会话状态管理的历史 Bug 修复 | [查看](https://github.com/NousResearch/hermes-agent/issues/115272) |

---

## 重要 PR 进展（精选 10 条）

| # | 标题 | 作者 | 核心变更 | 链接 |
|---|------|------|----------|------|
| #144708 | fix(gateway): a chat handed off with /handoff keeps opening from Desktop and the Webapp | @teknium1 | 修复 `/handoff` 交接后的聊天在网关重启后仍从 Desktop/Webapp 重新打开的问题，涉及根 profile 与命名 profile | [查看](https://github.com/NousResearch/hermes-agent/pull/144708) |
| #144647 | Git version lookups stay fast: Hermes keeps the commit-graph fresh and clears stale commit-graph locks | @teknium1 | 启动与 `hermes update` 时的 Git 版本查找从 0.39s 降至 0.05s，后台维护 commit-graph 并清理锁文件 | [查看](https://github.com/NousResearch/hermes-agent/pull/144647) |
| #144640 | Hermes starts ~1 s faster from a git checkout: provider plugins and the restart check no longer run the git version walk | @teknium1 | 从 Git 工作树启动命令提速约 1 秒（如 `sessions list` 从 1.45s 降至 0.44s，Git 子进程从 15 个降至 2 个） | [查看](https://github.com/NousResearch/hermes-agent/pull/144640) |
| #144654 | fix(plugin-catalog): update index-search to a8d5221 | @TakeshiTGAL | 插件目录 `index-search` 从 v0.1.0 升至 v0.1.4，更新 `requires_hermes` 版本约束 | [查看](https://github.com/NousResearch/hermes-agent/pull/144654) |
| #144646 | fix(plugin-catalog): update event-read to 00e8aed | @TakeshiTGAL | 插件目录 `event-read` 从 v0.1.0 升至 v0.1.4，同步更新版本约束 | [查看](https://github.com/NousResearch/hermes-agent/pull/144646) |
| #144733 | fix(slack): Socket Mode reconnect policy, redelivery guards, and idle admit conflict handling | @trentknox | Slack Socket Mode 重连/健康策略、入站重投递与空闲入会冲突处理，17 个文件修改 | [查看](https://github.com/NousResearch/hermes-agent/pull/144733) |
| #144732 | plugin-catalog: add tide (context engine with no model summarizer) | @thomasscottbeck-sudo | 插件目录新增 `tide` 上下文引擎（v0.4.8），不依赖模型摘要 | [查看](https://github.com/NousResearch/hermes-agent/pull/144732) |
| #144661 | fix(webapp): return a clear error when the SSH file host is down | @Adolanium | Webapp SSH 文件主机不可用时返回明确错误 `SshWorkspaceFsError("ECONN")`，覆盖 5 条文件路由 | [查看](https://github.com/NousResearch/hermes-agent/pull/144661) |
| #144730 | windows, tools: membership-only containment job, trampoline detaches and SSH argv flags | @gpal7060 | Windows 本地终端作业隔离与杀进程扫除、守护进程分离、Desktop SSH 运行时所有权检查 | [查看](https://github.com/NousResearch/hermes-agent/pull/144730) |
| #144731 | agent, lsp, tui_gateway: route-scoped fast tiers, per-workspace LSP and bot-delivery queue | @gpal7060 | 快速模式回退路由、多根/Kanban 工作区 LSP 作用域、Desktop 提示队列在机器人投递后排队、pytest 家目录隔离 | [查看](https://github.com/NousResearch/hermes-agent/pull/144731) |

---

## 功能需求趋势

从今日 Issues 与 PR 中提炼，社区最关注的功能方向包括：

1. **统一网关（Unified Gateway）的稳定性与后续修复**  
   #106742 合并后，CLI、Desktop、TUI、Cron、认证等多个组件仍有遗留问题，社区持续跟踪 post-merge 修复（#134889、#143547）。

2. **多 Profile / 多路复用网关的正确性**  
   多个今日新开 Issue（#144703、#144711）集中在多 profile 场景下的 CLI 行为误报与凭证管理，表明多租户/多 profile 使用场景正在扩大。

3. **跨平台即时通讯集成（Telegram / Discord / Slack）**  
   Telegram DM 主题重建（#144725）、Discord 语音捕获重连（#144687）、Slack Socket Mode 重连与重投递（#144733），显示社区对跨平台机器人可靠性的需求旺盛。

4. **会话恢复与多代理协作（Canonical Group）**  
   会话恢复字段缺失（#144728）、多代理组卡在 stopping（#144729），反映用户对长会话、分布式代理组状态一致性的关注。

5. **插件生态与上下文引擎**  
   插件目录持续新增与更新（`tide`、`index-search`、`event-read`），社区倾向于通过插件扩展上下文处理能力，而非依赖模型摘要。

---

## 开发者关注点

- **统一网关合并后的“长尾”Bug**：#143547 明确指出 CLI、TUI、Desktop、Cron、认证、会话

:::

:::details{title="OpenClaw" repo="openclaw/openclaw"}

# OpenClaw 社区动态日报 (2026-10-26)

## 今日速览

今日社区围绕 **会话状态安全、跨数据库性能差距及 Workboard UX 恢复** 展开讨论，共 3 条待处理 Issue 和 50 条活跃 PR。核心开发者 @steipete 持续主导网关、会话与 Provider 层的性能优化；安全与稳定性相关的 P0/P1 问题（如内存根文件静默丢失、iMessage 自聊回环）成为社区最高优先级关注点。

## 版本发布

过去 24 小时内无新版本发布。

## 社区热点 Issues

目前过去 24 小时内更新的 Issue 共 3 条，全部列出如下：

| 编号 | 标题 | 重要性说明 | 链接 |
|------|------|-----------|------|
| #153426 | Curated memory roots (`MEMORY.md` / `USER.md`) 静默永久排除 | **P0 安全/会话状态阻塞**。 provenance ratchet 一旦将文件标记为 `"untrusted"`，即永久从 Bootstrap 注入中剔除，且无诊断、无 CLI、无恢复路径，直接影响 Agent 长期记忆与用户配置可靠性。11 条评论显示社区对修复方案讨论活跃。 | https://github.com/openclaw/openclaw/issues/153426 |
| #182810 | PostgreSQL turn commit 产生 24 次阻塞桥往返 | **P2 性能瓶颈**。单条会话转录持久化调用产生 25 条 SQL 语句，比 SQLite 慢约 6 倍，对 PostgreSQL Agent 引擎的吞吐与延迟构成直接威胁，需尽快评估批量写入或连接复用方案。 | https://github.com/openclaw/openclaw/issues/182810 |
| #183966 | Workboard：恢复会话菜单中的 "Add to Workboard" | **P2 UX 摩擦**。自 2026.9.2 版本后，Control UI 移除了将会话转为 Workboard 卡片的入口，且会话芯片仅能打开看板而非关联卡片，影响工作流衔接，社区期待恢复该功能。 | https://github.com/openclaw/openclaw/issues/183966 |

## 重要 PR 进展

从近 24 小时更新的 50 条 PR 中，选取以下 10 条代表性进展：

| 编号 | 标题 | 功能/修复说明 | 链接 |
|------|------|--------------|------|
| #183975 | perf(gateway): 减少重复采样、代理和签名工作 | 网关入口层优化：避免重复解析可信代理 CIDR、减少 CPU 采样中间数组、消除 Reef 请求签名中的重复 Ed25519 密钥派生，降低网关 CPU 开销。 | https://github.com/openclaw/openclaw/pull/183975 |
| #183974 | perf(sessions): 维护期间复用放置事实 | 会话维护优化：不再重复重建放置映射并深克隆受保护放置，降低会话维护期间的内存分配与 CPU 消耗。 | https://github.com/openclaw/openclaw/pull/183974 |
| #183383 | fix(imessage): 防止代理在自聊中回答自己的回复 | **P1 修复**。修复 iMessage 自聊场景下，代理将自身回复误判为新用户消息导致的回复循环问题，普通直接聊天不受影响。 | https://github.com/openclaw/openclaw/pull/183383 |
| #183807 | fix(agents): 拒绝的工具调用后继续可见进度文本 | Agent 执行修复：在工具完成后，后续格式错误的工具调用不再因助手先输出可见进度文本而中断整个轮次，保留有界续写能力。 | https://github.com/openclaw/openclaw/pull/183807 |
| #183393 | fix(database): 使用规范 CLI JSON 失败 | 数据库 CLI 修复：操作失败时返回 `ok: false` 及 `error.type: "cli_error"`，符合 CLI 统一 JSON 失败契约，便于脚本自动化处理。 | https://github.com/openclaw/openclaw/pull/183393 |
| #183959 | perf(providers): 移除冗余请求准备副本 | Provider 层优化：移除 Anthropic、Google、Ollama 请求准备中的重复拷贝与重复 Beta 标志解析，减少小额内存分配。 | https://github.com/openclaw/openclaw/pull/183959 |
| #182775 | fix(macos): 点击重叠时保留最新 Browser 切换 | macOS 修复：修复菜单中 Browser 按钮快速重叠点击导致保存旧状态的问题，确保用户最后一次选择生效。 | https://github.com/openclaw/openclaw/pull/182775 |
| #183956 | refactor: 解构 UI、SDK 和运行时所有者 | 重构：清理仅有一个生产消费者的内部实现与私有类型帧，公共 SDK、CLI、配置及网关契约保持不变，无用户可见变更。 | https://github.com/openclaw/openclaw/pull/183956 |
| #183969 | test: 移除低价值测试 (batch d575) | 测试清理：移除重复的测试设置与重叠断言，保留边界契约，不影响生产行为。 | https://github.com/openclaw/openclaw/pull/183969 |
| #181375 | feature(gateway): 添加 gateway lanes CLI | 新功能：为现有 `diagnostics.lanes` RPC 增加原生 CLI 动词，帮助运维人员排查饱和度、分组预算阻塞及主/辅通道问题。 | https://github.com/openclaw/openclaw/pull/181375 |

## 功能需求趋势

基于近期 Issue 与 PR 标签分析，社区关注度集中在以下方向：

1. **会话状态与记忆持久化安全**：`MEMORY.md` / `USER.md` 的 provenance 管理与恢复机制成为最高优先级，用户要求更透明的注入诊断与恢复 CLI。
2. **跨数据库性能对齐**：PostgreSQL 相对 SQLite 的 6 倍延迟差距引发关注，社区期待批量写入、连接池优化或异步桥接方案。
3. **Workboard 与会话工作流集成**：恢复会话转卡片入口、会话芯片直达关联卡片等 UX 改进需求明显，显示用户希望在 Agent 会话与任务看板之间建立更紧密的闭环。
4. **多渠道消息循环修复**：iMessage 自聊回环等渠道特定 Bug 被标记为 P1，说明社区对跨渠道消息路由的稳定性要求提高。
5. **Provider 与网关性能微优化**：大量 PR 集中在减少重复采样、签名密钥派生、请求拷贝等细节，体现对延迟敏感型推理网关的持续调优。

## 开发者关注点

- **安全与可恢复性**：P0 级的内存根文件静默丢失问题缺乏诊断与恢复手段，开发者呼吁增加 provenance 审计日志与强制恢复 CLI。
- **性能回归风险**：PostgreSQL 桥往返过多、会话维护深克隆等问题表明数据库与会话层仍存在性能隐患，需回归测试覆盖。
- **渠道特定稳定性**：iMessage 自聊、macOS Dashboard WebKit 崩溃后空白、X 账户配置键大小写敏感等渠道/平台 Bug 频现，开发者期待更完善的渠道适配与容错机制。
- **CLI 契约统一**：数据库命令返回字符串错误而非标准 JSON 失败结构，开发者希望所有 CLI 命令遵循统一的机器可读错误契约，便于自动化运维。

:::
