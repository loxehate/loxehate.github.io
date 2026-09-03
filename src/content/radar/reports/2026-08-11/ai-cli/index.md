---
title: AI CLI 工具社区动态日报
published: 2026-08-11
report: ai-cli
tags:
  - radar
  - AI
---
# AI CLI 工具社区动态日报 2026-08-11

> 生成时间: 2026-08-11 01:40 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具横向对比分析报告（2026-08-11）

## 1. 生态全景

当前 AI CLI 工具已从"能跑通任务"进入"为长会话、多智能体与跨端工作流负责"的工程化阶段。各主流工具均在同一天发布修复版本或关键迭代，说明社区反馈正在快速驱动版本更新。Windows 平台稳定性与上下文管理成为全行业共通的薄弱环节，而子代理可靠性、安全边界与 IDE/桌面端集成则是下一阶段竞争焦点。值得注意的是，工具间功能差距正在收窄，差异化开始向记忆系统、评估基础设施、无痕模式等深层能力迁移。

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 重要 PR | Release | 迭代节奏 |
|------|------------|---------|---------|----------|
| Claude Code | 10 | 2 | v2.1.227（修复版） | 稳定迭代，社区声量大 |
| OpenAI Codex | 10 | 10 | 2 个 Rust alpha | 高频迭代，修复压力大 |
| Gemini CLI | 10 | 10 | 1 个 nightly | 快速修复，p1 Bug 密集 |
| DeepSeek Reasonix | 10 | 10 | v1.23.0（架构级） | 大版本后集中修回归 |
| OpenCode | 10 | 10 | v1.18.16（补丁版) | V2 重构期，PR 活跃 |
| Qwen Code | 2 | 10 | v0.21.9（正式版） | 工程驱动，Issue 量少 |
| Hermes | 10 | 10 | 无 | 深度修复，覆盖多平台 |

## 3. 共同关注的功能方向

- **Windows 桌面端稳定性**：Claude Code（GPU 崩溃 #83744）、Codex（卡顿 #20214、崩溃耗配额 #35606）、Reasonix（安装失败 #7278）、OpenCode（PATH 不识别 #14074）、Hermes（更新自锁 #83569、看门狗误报 #83583）、Qwen（桌面回归修复 #8896）——6/7 工具同日出现 Windows 相关问题，是全行业最大痛点。

- **上下文管理与压缩行为透明化**：Claude Code（Opus 大上下文异常 #41984）、Reasonix（压缩未生效 #7935、阈值滑块 PR #8256）、Gemini（Auto Memory 重试 #26522）——用户不再接受黑盒压缩，要求可观测、可干预、可恢复。

- **子代理/多智能体可靠性**：Claude Code（Agent 静默切换 teammate #71723）、Gemini（MAX_TURNS 误报 #22323、通用代理挂起 #21409）、Codex（subagent 模型未知 #37910）——误报成功、静默切换、无限挂起直接摧毁自动化信任。

- **跨端会话同步与远程接管**：Claude Code（CLI↔桌面对话同步 #28791）、Codex（远程线程恢复 #37403）、Reasonix（CLI 幽灵会话 #8262）、Qwen（WebBridge 浏览器控制 #8707）——"移动端开启、桌面端续跑、远程主机执行"是高频期望。

- **安全边界强化**：Claude Code（伪造 system-reminder #74636）、Gemini（SSRF 修复 #28557）、Hermes（凭据继承 EPIC #83565）、Reasonix（记忆脱敏 #26525）——从防注入到防泄漏、防破坏性命令，安全诉求全面升级。

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线 |
|------|----------|----------|----------|
| **Claude Code** | 通用企业级 AI CLI，长上下文+合规 | 企业团队/受监管行业 | 深度绑定 Claude 模型，hook/skill 插件体系，跨端（CLI/桌面/移动） |
| **OpenAI Codex** | IDE 集成 + 远程控制中枢 | IDE 重度用户/远程开发团队 | Rust 核心 + VS Code 扩展 + 桌面应用 + Remote Control 多端矩阵 |
| **Gemini CLI** | 多子代理架构与评估驱动开发 | AI agent 研究者/安全敏感团队 | 通用子代理 + 组件级评估基础设施 + 安全加固（SSRF/OAuth） |
| **DeepSeek Reasonix** | 上下文管理与长会话稳定性 | 深度处理大型代码库的开发者 | 内容驱动压缩系统 + 多协议兼容（ACP/Responses）+ 持久化收件箱 |
| **OpenCode** | 开源可自托管的模块化 CLI | 开源社区/自托管开发者 | V2 架构重构，将文件系统/插件发现彻底剥离至 config 侧 |
| **Qwen Code** | Web 端 + 浏览器控制扩展 | Web 开发者/浏览器自动化场景 | 多端覆盖（Web Shell/Chrome/桌面/CLI）+ Qoder 插件生态 |
| **Hermes** | 记忆系统 + 隐私安全 | 知识工作者/隐私敏感团队 | Supermemory 记忆插件 + no-store 无痕模式 + 多平台修复 |

## 5. 社区热度与成熟度

- **高活跃、高成熟**：Claude Code 版本号已达 v2.1.x，功能需求获得 120👍（#28791），社区讨论深度（CVP 合规、伪造提醒）反映企业级用户比例高；Codex 的 #20214 有 93 条评论，Windows 卡顿是当前声量最大的单点问题。
- **快速迭代、修复驱动**：Gemini CLI 与 Hermes 处于"Issue 密集 → 快速 PR 跟进"的高速循环（Gemini 10 PR/日，Hermes 10 PR/日），但 p1 Bug 反复出现表明架构稳定性仍在爬坡。
- **架构转型期**：Reasonix 刚发布 v1.23.0 架构级更新，社区反馈集中在压缩系统实际行为与新功能回归，属于"大版本兴奋期后的打磨阵痛"；OpenCode 处于 V2 重构中期，PR 集中在模块解耦，功能开发暂缓。
- **高效但低声量**：Qwen Code 仅 2 条活跃 Issue 却有 10 个 PR，属于典型的"工程驱动、社区反馈滞后"模式，适合关注代码而非讨论区的开发者。

## 6. 值得关注的趋势信号

- **Windows 支持已从"加分项"变成"否决项"**：6/7 个工具同日遭遇 Windows 问题，且多为日常使用级 bug（安装失败、卡顿、更新自锁）。对技术决策者而言，评估工具时务必先验证 Windows 环境，这一维度将成为未来半年的竞争焦点。

- **上下文管理能力==实际可用性**：多个工具的内存管理逻辑（压缩阈值、自动压缩、上下文清理）在真实长会话场景下表现不佳（Reasonix 显示 30-40% 却触发压缩、Claude Code 1M 上下文异常）。上下文生命周期管理正在成为核心竞争力，建议关注压缩策略是否可配置、结果是否可观测。

- **子代理状态误报是自动化工作流的隐形杀手**：Gemini 的 MAX_TURNS 被误报为 GOAL 成功、Claude Code 的 Agent 静默切换协议——这些 bug 在交互模式下容易暴露，但在无人值守 CI 中会静默污染结果。若你计划用 AI CLI 构建自动化流水线，请优先验证子代理的失败语义和错误传播机制。

- **安全需求从"防外部攻击"扩展到"防自身 Agent"**：Hermes 的凭据继承 EPIC、Qwen 的 Git 跨工作树防护、社区对破坏性命令（git reset --force）的担忧——模型生成的子进程需要被隔离、被审计。安全边界能力（无痕模式、凭据隔离、命令防护）已从企业定制需求演变为通用功能。

- **记忆系统成为新的差异化战场**：Hermes 的 Supermemory 插件系列（遗忘、节流、脱敏）、Gemini 的 Auto Memory（召回、重试），说明工具开始从"会话内智能"走向"跨会话记忆"。记忆质量、隐私处理方式和遗忘机制将决定长期用户体验。

- **IDE 集成正在从"侧边栏聊天"进化为"一等公民"**：Codex 用户要求会话以完整编辑器标签页打开（#20951），OpenCode 在 CLI 中嵌入 Web UI（#41525），Qwen 为 Web Shell 补齐文件上传。终端不再是唯一界面，多界面统一体验将成为标配。

---

*报告基于 2026-08-11 各工具 GitHub 社区公开数据整理，数据量：约 62 个热点 Issue + 62 个重要 PR + 6 个版本发布。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据范围：github.com/anthropics/skills 仓库 PR / Issues（数据截止 2026-08-11）。PR 按评论数排序，本文选取前 8 个进行热点分析。

---

## 1. 热门 Skills 排行

### #1298 修复 skill-creator 评估脚本（recall 恒为 0%）
- **功能**：修复 `run_eval.py` 在下游 `run_loop.py` / `improve_description.py` 中始终报 `recall=0%` 的问题，安装 eval 产物为真实 skill，并修复 Windows 流读取、触发检测与并行 worker 异常。
- **讨论热点**：skill-creator 的评估循环在“优化噪音”而非真实信号，多个独立复现（关联 #556），社区高度关注开发者工具链可靠性。
- **状态**：OPEN
- **链接**：https://github.com/anthropics/skills/pull/1298

### #514 新增 document-typography 文档排版技能
- **功能**：用于 AI 生成文档的排版质量控制，解决孤儿词、寡行标题、编号错位等常见问题。
- **讨论热点**：所有 Claude 生成文档都会遇到此类排版缺陷，但用户很少主动要求；社区认为该技能可无感提升交付质量。
- **状态**：OPEN
- **链接**：https://github.com/anthropics/skills/pull/514

### #538 修复 PDF 技能文件引用大小写不匹配
- **功能**：修复 `skills/pdf/SKILL.md` 中 8 处 `REFERENCE.md`/`FORMS.md` 大写引用与实际小写文件名不一致的问题。
- **讨论热点**：在大小写敏感文件系统（如 Linux）上文档链接全部失效，属于基础性兼容修复。
- **状态**：OPEN
- **链接**：https://github.com/anthropics/skills/pull/538

### #486 新增 ODT / OpenDocument 技能
- **功能**：支持创建、填充、读取、转换 OpenDocument 格式（.odt/.ods），并可将 ODT 解析为 HTML。
- **讨论热点**：社区对开源 / ISO 标准文档格式有明确需求，尤其是 LibreOffice 生态用户。
- **状态**：OPEN
- **链接**：https://github.com/anthropics/skills/pull/486

### #210 改进 frontend-design 技能清晰度与可操作性
- **功能**：重构前端设计 skill，确保每条指令都能在单次对话中被 Claude 执行，并细化行为约束。
- **讨论热点**：反应出社区对“SKILL.md 读起来像文档而非操作指南”的普遍不满，与 issue #202 的批评一致。
- **状态**：OPEN
- **链接**：https://github.com/anthropics/skills/pull/210

### #83 新增 skill-quality-analyzer 与 skill-security-analyzer 元技能
- **功能**：添加两个“元技能”，前者从结构、文档、示例等五维评估技能质量，后者分析技能的安全风险。
- **讨论热点**：社区开始关注技能生态的自我治理，需要用工具化方式保证技能质量和安全。
- **状态**：OPEN（创建较早，2025-11-06）
- **链接**：https://github.com/anthropics/skills/pull/83

### #541 修复 DOCX 技能 w:id 冲突导致文档损坏
- **功能**：修复 DOCX 技能在存在书签的文档中添加修订时，因 `w:id` 共享 ID 空间冲突而损坏文档的问题。
- **讨论热点**：OOXML 中 `w:id` 跨书签、修订、批注共享，硬编码 ID 极易冲突，属于高影响的正确性修复。
- **状态**：OPEN
- **链接**：https://github.com/anthropics/skills/pull/541

### #539 修复 skill-creator 对未加引号描述中的 YAML 特殊字符无警告
- **功能**：在 `quick_validate.py` 增加预解析校验，检测 frontmatter 中未加引号且包含 `:` 的 description 字段。
- **讨论热点**：YAML 静默解析失败会导致描述被截断或拆分，影响技能触发，社区需要更早的校验反馈。
- **状态**：OPEN
- **链接**：https://github.com/anthropics/skills/pull/539

---

## 2. 社区需求趋势

从 Issues（按评论数排序）可以看出当前社区最期待的 Skill 方向：

1. **安全与信任治理**  
   - #492：社区技能被放在 `anthropic/` 命名空间下分发，造成信任边界滥用，用户可能给非官方技能授予过高权限（43 条评论）。  
   - #1175：处理 SharePoint Online 文档时，对 SKILL.md 内嵌权限逻辑的安全担忧。  
   - #412：agent-governance 技能提案，覆盖策略执行、威胁检测、信任评分与审计。

2. **企业级协作与平台集成**  
   - #228：组织级技能共享（16 条评论，8 👍），要求企业内直接共享 skill 文件，而不是手动下载分发。  
   - #16：将 Skills 暴露为 MCP，成为标准化 AI 软件接口。  
   - #29：支持 AWS Bedrock 使用这些技能。

3. **技能开发工具链的质量与可靠性**  
   - #556（12 条评论，7 👍）：`run_eval.py` 全部查询 0% 触发率，使技能描述优化失效。  
   - #1169：`run_loop.py` 每次迭代 recall=0%，包括字面 slash 命令查询。  
   - #202：skill-creator 自身不符合最佳实践，应被更新为可操作指令而非概念文档。

4. **上下文窗口与内存效率**  
   - #1487：`claude-api` 技能单次调用注入约 156k tokens，直接耗尽上下文窗口。  
   - #1329：compact-memory 技能提案，用符号化表示压缩 agent 长期记忆。

5. **文档处理细节质量**  
   - #12：docx 技能添加批注导致格式破坏（额外空白），需要避免空白改写的指导。  
   - #189：document-skills 与 example-skills 插件包含重复技能，浪费上下文。

---

## 3. 高潜力待合并 Skills

以下 PR 均为 OPEN 状态，但功能完整、关注度高，近期有较大概率合入官方仓库：

- **#514 document-typography**：通用文档排版质检，直接影响所有文档类输出，需求面广。  
  https://github.com/anthropics/skills/pull/514

- **#486 ODT skill**：补齐开源文档格式空白，服务于 LibreOffice / 政府与企业用户，多次更新表明活跃维护。  
  https://github.com/anthropics/skills/pull/486

- **#723 testing-patterns**：覆盖完整测试栈（Trophy 模型、单元测试、React 组件测试），是社区常青需求。  
  https://github.com/anthropics/skills/pull/723

- **#1302 color-expert**：提供系统的色彩专业知识（ISCC-NBS、OKLCH、CAM16 等），设计 / 数据可视化场景通用性高，最近更新至 2026-07-21。  
  https://github.com/anthropics/skills/pull/1302

- **#1367 self-audit**：先做机械性文件验证，再做四维推理质量审计（按危害优先级），与 #1385 提案形成呼应。  
  https://github.com/anthropics/skills/pull/1367

- **#525 pyxel**：为 Pyxel 复古游戏引擎提供 MCP 驱动的开发闭环，面向具体开发者社区，更新活跃。  
  https://github.com/anthropics/skills/pull/525

---

## 4. Skills 生态洞察

社区最集中的诉求是：**从“技能数量扩张”转向“质量、安全与治理”——迫切修复 skill-creator 评估链路（run_eval 全面失效）这一根基问题，同时建立安全评审、元技能、组织级共享等可信分发机制，并持续补充文档排版、ODT、测试、设计等垂直场景技能。**

---

# Claude Code 社区动态日报（2026-08-11）

## 今日速览

今日发布修复版本 v2.1.227，解决了订阅层级误判与 `claude-code-action` 中 Bash 命令失败问题。社区讨论热度高度集中在三个方向：CVP 安全误判（#84352，32 条评论）、CLI 与桌面端对话历史同步需求（#28791，120 👍）、以及 Agent 工具在 team 配置下的行为异常（#71723）。此外，Fable 5 模型相关的配额与 hook 兼容性问题开始密集出现。

## 版本发布

**v2.1.227** [查看 Release](https://github.com/anthropics/claude-code/releases)
- 修复了会话以过期登录令牌启动时，feature flags 未按用户订阅层级评估的问题——该问题可能错误地提示 Max 套餐用户为 Fable 启用 usage credits。
- 修复了 `claude-code-action` 下所有 Bash 命令因 `allowed_no` 相关错误而失败的问题。

## 社区热点 Issues

1. **CVP 批准的 Claude.ai 组织仍被 cyber safeguard 拦截** [#84352](https://github.com/anthropics/claude-code/issues/84352)  
   32 条评论 | 👍 1。已通过 Cyber Verification Program 的组织在 Claude Code 中仍持续收到安全拦截，Verification Portal 却显示"审查中"。这是受监管团队的安全合规痛点，讨论热度居首。

2. **【Feature】CLI 与桌面应用同步对话历史** [#28791](https://github.com/anthropics/claude-code/issues/28791)  
   31 条评论 | 👍 120。CLI 与桌面端会话数据不互通，用户希望跨端无缝恢复工作流。本期最高赞功能需求，社区共鸣强烈。

3. **Agent 工具 `name` 参数静默切换为 teammate 协议，后台 Agent 结果丢失** [#71723](https://github.com/anthropics/claude-code/issues/71723)  
   11 条评论 | 👍 1。在配置过 team 的会话中，带 `name` 参数的 Agent 调用会走 teammate 路径而非后台 agent 路径，导致调用会话永远收不到结果。多智能体场景的严重行为异常。

4. **`--continue` 无法找回 `-p` 创建的会话** [#82536](https://github.com/anthropics/claude-code/issues/82536)  
   10 条评论 | 👍 0。非交互模式创建的会话无法通过 `--continue` 交互式恢复，直接打断"从 CI 排障到本地接管"的工作流。

5. **Opus 4.6 在 1M 上下文下频繁提前压缩 + 无限循环 + 提示冻结** [#41984](https://github.com/anthropics/claude-code/issues/41984)  
   7 条评论 | 👍 3（已关闭）。大上下文窗口的稳定性问题，涉及压缩策略与循环保护逻辑，虽然标记关闭但讨论仍在继续。

6. **Cowork stale-cache 损坏：宿主写盘正常但沙箱读视图截断（附完整诊断）** [#67585](https://github.com/anthropics/claude-code/issues/67585)  
   7 条评论 | 👍 1。Windows + Cowork 场景的缓存一致性问题，报告含完整诊断与修复方案，对团队开发场景影响直接。

7. **claude-in-chrome 的 file_upload 工具失败：`paths: expected array, received undefined`** [#84627](https://github.com/anthropics/claude-code/issues/84627)  
   7 条评论 | 👍 1。浏览器 MCP 工具对有效文件输入反复失败，阻塞 Chrome 自动化测试场景。

8. **Claude Desktop（Windows）GPU 进程崩溃（exitCode 101457950）导致整个应用退出** [#83744](https://github.com/anthropics/claude-code/issues/83744)  
   6 条评论 | 👍 0。Windows 桌面端 GPU 进程崩溃，影响日常稳定使用，社区等待官方跟进。

9. **发布的 Claude Code artifacts 在移动 App 中不显示** [#78792](https://github.com/anthropics/claude-code/issues/78792)  
   5 条评论 | 👍 20。Web 和桌面端显示正常，但 iOS 移动应用缺失，跨端一致性问题引发较多用户共鸣。

10. **伪造的 "Note: file was modified... don't tell the user" 系统提醒出现** [#74636](https://github.com/anthropics/claude-code/issues/74636)  
    5 条评论 | 👍 0。工具结果流中冒出的虚假 system-reminder，疑似 prompt injection 或渲染 bug，涉及安全可信边界。

## 重要 PR 进展

1. **feat: 为 /code-review 添加自动 GitHub/GitLab 检测及 GitLab 支持** [#34951](https://github.com/anthropics/claude-code/pull/34951)  
   作者 @jangel97 | 状态: OPEN。自动识别平台类型，使 `/code-review` 兼容 GitHub 与 GitLab（含自托管实例），减少重复逻辑。关联 issue #26932。因存量 PR，近期更新重新进入活跃视野。

2. **plugins: 添加 entroly-context，实现预算感知的上下文管理** [#85464](https://github.com/anthropics/claude-code/pull/85464)  
   作者 @juyterman1000 | 状态: CLOSED。新增社区插件，代码库超出上下文窗口时基于 Entroly 进行预算感知的上下文选择（注意：该 PR 未被合并）。

## 功能需求趋势

- **跨端一致性与无缝衔接**：#28791（CLI↔桌面对话同步）、#78792（移动端 artifacts 可见性）表明用户强烈期望 CLI、桌面、移动端统一的体验与数据互通。
- **多智能体可预期性**：#71723 等 Agent bug 显示，社区对后台 agent 与 teammate 的调度行为需要更清晰、更稳定的语义，而不是"静默切换"。
- **订阅与配额透明化**：#82797（Fable 5 在 Team Premium 下仍被 model picker 拦截）、#85446（正常使用中 usage limit 快速消耗）说明配额计算和 entitlement 展示必须准确可解释。
- **键盘交互可配置性**：#74655（Enter = 换行 / Mod+Enter = 提交）、#85013（Code 标签页 Enter 行为）指向桌面/TUI 输入模式的灵活性需求。

## 开发者关注点

- **会话恢复与状态管理**：`--continue` 无法恢复 `-p` 会话（#82536）、`--resume` 列出 bg 会话却拒绝恢复（#85657）、超限后后台会话丢失（#85676）——"随时接续工作"是高频诉求。
- **上下文压缩策略**：autocompact 抖动（#85668）、Opus 4.6 大上下文异常（#41984）显示压缩算法直接决定实际体验，用户需要更可靠的 chunked reading 与压缩频率控制。
- **安全边界与权限控制**：伪造 system-reminder（#74636）、PreToolUse hook 无法辨别人工批准（#85606）暴露安全自动化之间的信任鸿沟。
- **沙箱兼容性**：WSL 下 deny-list 路径被伪装成设备节点（#76558）、Windows Cowork 缓存损坏（#67585）说明沙箱实现与真实工具链仍存在兼容性摩擦。
- **CI/自动化边缘情况**：v2.1.227 刚修复 `claude-code-action` 的 Bash 失败问题；今天新增的 #85671（headless `-p` 被良性 hook 触发 Fable 5 refusal）说明 CI 场景仍存在不少 edge case。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-11

## 1. 今日速览

今日社区焦点集中在 **Windows 桌面应用性能问题**与 **VS Code 扩展「无法加载资源」的回归故障**上，两者均有多起高热度 Issue 持续发酵。代码方面，官方发布了两个 Rust 核心 alpha 版本（0.148.0-alpha.6 与 0.147.0-alpha.6.6），并密集合并了 20 余个涉及 Windows 沙箱、图像处理与配置刷新机制的 PR，整体工程重心偏向稳定性修复。

## 2. 版本发布

过去 24 小时发布两个 Rust 核心 alpha 版本：

- **rust-v0.148.0-alpha.6** — 最新 alpha 构建（2026-08-11）
  链接：https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.6
- **rust-v0.147.0-alpha.6.6** — 上一代 alpha 补丁版
  链接：https://github.com/openai/codex/releases/tag/rust-v0.147.0-alpha.6.6

两者均为 Rust 核心的迭代版本，目前尚未附带详细的变更说明。

## 3. 社区热点 Issues（10 个）

### ① Windows 11 上 Codex App 频繁卡顿/冻结
**#20214** | 评论 93 | 👍 81 | 状态：开启  
用户反馈在系统资源充足（Ryzen 5 5600 + 32GB RAM）情况下，Microsoft Store 版 Codex App 仍频繁卡顿和掉帧。这是当前社区声量最大的性能问题。  
链接：https://github.com/openai/codex/issues/20214

### ② VS Code 扩展启动失败：「The extension couldn't load its resources」
**#37458** | 评论 32 | 👍 1 | 状态：开启  
Windows 用户更新扩展后 Codex 面板无法启动，报「无法加载资源」。与 #37517、#37543 等多条 Issue 疑似同源，指向 26.803.41515 版本回归。  
链接：https://github.com/openai/codex/issues/37458

### ③ Windows 版缺少「控制其他设备」选项卡
**#28919** | 评论 28 | 👍 31 | 状态：开启  
Windows 版 Codex App 的 Settings > Connections 中缺失「控制其他设备」入口，导致用户无法通过桌面端管理远程设备，功能与 macOS 端不对齐。  
链接：https://github.com/openai/codex/issues/28919

### ④ Windows Computer Use 复用失效的 node_repl 执行上下文
**#37013** | 评论 18 | 👍 4 | 状态：开启  
Windows 桌面端 Computer Use 功能在首次 JS 执行结束后，下一次调用仍复用已失效的 `@oai/sky` 传输上下文，导致后续所有调用直接失败。这是影响自动化流程的阻断性问题。  
链接：https://github.com/openai/codex/issues/37013

### ⑤ 支持将 Codex 会话打开为完整编辑器标签页
**#20951** | 评论 15 | 👍 38 | 状态：开启（增强请求）  
社区希望 Codex 会话能以完整 VS Code 编辑器标签页的形式打开（类似 Claude Code），而非局限于侧边栏，以便更灵活地管理多任务上下文。高 👍 数表明该需求在 IDE 用户中相当强烈。  
链接：https://github.com/openai/codex/issues/20951

### ⑥ 0.147.0 回归：Azure Responses 拒绝空的 functions namespace 描述
**#37380** | 评论 12 | 👍 27 | 状态：开启  
0.147.0 起，通过 Azure API Management 自定义 Responses Provider 时，空 `functions` namespace 描述会被服务端拒绝，导致使用 Azure OpenAI 的企业用户无法正常发起请求。  
链接：https://github.com/openai/codex/issues/37380

### ⑦ Plus 账户五小时使用限制消失，仅显示周限制
**#32791** | 评论 11 | 👍 3 | 状态：开启  
Plus 用户反馈桌面端只显示每周 Codex 限制，原本的五小时/五轮限制不再展示，导致用户无法判断实时可用额度，造成使用预期混乱。  
链接：https://github.com/openai/codex/issues/32791

### ⑧ 远程连接时 Codex App 不发送任务完成通知
**#20930** | 评论 10 | 👍 16 | 状态：开启  
macOS 桌面端连接远程 Linux 主机时，Codex 任务完成不会触发系统通知，用户必须保持前台关注才能感知结果，影响远程开发效率。  
链接：https://github.com/openai/codex/issues/20930

### ⑨ macOS 桌面端更新后无法恢复远程 CLI 线程
**#37403** | 评论 5 | 👍 4 | 状态：开启  
8 月 7 日更新后，macOS 桌面端在通过移动端 Remote Control 接管同一 CLI 线程时会报 `already has an active writer` 错误，导致「移动端开启、桌面端续跑」的现有工作流中断。  
链接：https://github.com/openai/codex/issues/37403

### ⑩ Windows App 卡顿/崩溃消耗掉全部 Pro 周配额
**#35606** | 评论 3 | 👍 0 | 状态：开启  
Pro 用户反映 Codex App 在 Windows 上卡顿、崩溃后，仍在后台消耗配额，24 小时内烧光整周用量。虽评论数不多，但「崩溃 + 配额消耗」组合对用户伤害极大。  
链接：https://github.com/openai/codex/issues/35606

## 4. 重要 PR 进展（10 个）

### ① 将刷新后的云配置 bundle 应用到后续会话
**#37908** | 状态：已合并  
修复后台刷新只更新磁盘缓存、当前进程内新会话仍使用启动快照的问题，使新会话能立刻拿到最新配置。  
链接：https://github.com/openai/codex/pull/37908

### ② 让 gRPC code-mode 通知变为 fire-and-forget
**#37906** | 状态：已合并  
通知事件不再等待客户端 ACK，避免未确认通知阻塞 cell 完成，降低 code-mode 交互延迟。  
链接：https://github.com/openai/codex/pull/37906

### ③ 添加 Windows SDK 与 MSVC 运行时 hermetic 仓库
**#37896** | 状态：已合并  
为 x64/arm64 引入固定版本的 Windows SDK/MSVC 运行时依赖，需显式接受 EULA 才可 materialize，提升 Windows 构建可复现性。  
链接：https://github.com/openai/codex/pull/37896

### ④ 添加可配置的 Responses API 请求元数据
**#37895** | 状态：已合并  
新增 `responses_api_metadata` 配置，可在每次 Responses API turn（含父/子代理请求）中注入产品自有键值元数据，上限 16 条。  
链接：https://github.com/openai/codex/pull/37895

### ⑤ 在返回 `view_image` 输出前校验图像
**#37892** | 状态：已合并  
`view_image` 处理程序现在会先解码图像数据，对无效/不支持的输入返回明确错误；code-mode 图像统一重新编码为 PNG。  
链接：https://github.com/openai/codex/pull/37892

### ⑥ 延迟 `view_image` 处理到历史插入阶段
**#37902** | 状态：已合并  
图像字节不再在处理时立即解码，而是原样传给共享历史插入路径做统一解码与缩放，减少重复逻辑与中间态。  
链接：https://github.com/openai/codex/pull/37902

### ⑦ 为 `app/read` 使用线程配置
**#37891** | 状态：已合并  
`app/read` 新增可选 `threadId` 参数，加载线程的实际配置后再应用功能开关、工作区策略与插件归属，使读取结果更符合线程上下文。  
链接：https://github.com/openai/codex/pull/37891

### ⑧ Windows 上忽略 Unix socket 代理设置
**#37889** | 状态：已合并  
Unix socket 代理权限本为 macOS-only，但在 Windows 上仍会触发配置警告并错误钳制代理监听范围；此 PR 在 Windows 运行时中排除相关配置。  
链接：https://github.com/openai/codex/pull/37889

### ⑨ 添加可配置的 goal token 预算上限
**#37878** | 状态：已合并  
新增 `goals.max_goal_token_budget` 配置，用于限制新建 goal 的默认 token 预算，并拒绝超出配置上限的创建/更新请求。  
链接：https://github.com/openai/codex/pull/37878

### ⑩ 让托管网络遵守 Windows 沙箱级别配置
**#37875** | 状态：已合并  
此前托管网络会隐式选择 elevated Windows 沙箱后端；现在改为完全由 `WindowsSandboxLevel` 决定，支持受限 token 沙箱搭配托管网络。  
链接：https://github.com/openai/codex/pull/37875

## 5. 功能需求趋势

- **IDE 集成稳定性成为首要诉求**：多条 Issue（#37458、#37517、#37543、#37508）集中报告 VS Code 扩展「无法加载资源」，涉及 Windows、Linux Remote-SSH、macOS 11.7 等多个环境。扩展方向的需求正从「加功能」转向「先修稳定」。
- **Windows 桌面端体验亟待改善**：#20214（卡顿）、#35606（崩溃耗配额）、#30906（Windows 10 崩溃）等组成一个密集的 Windows 性能/崩溃问题集群。值得注意的是，#28919（缺少“控制其他设备”选项卡）说明 Windows 端与 macOS 端在远程控制能力上尚不对齐。
- **远程控制/Remote 工作流是高频场景**：Android 配对失败（#37897）、远程通知缺失（#20930）、macOS 无法恢复远程线程（#37403）等 Issue 说明跨设备衔接（手机 ↔ 桌面 ↔ 远程主机）仍是薄弱环节。
- **新模型与子代理支持**：#37910 报告调用 subagent 时出现 `Unknown model gpt-5.6-luna`，提示模型白名单/路由可能存在滞后，社区对新模型上线的敏感度较高。
- **会话管理增强**：#20951（会话作为编辑器标签页）、#37814（子代理执行状态显示）反映用户希望 Codex 会话像代码文件一样可被灵活组织与跟踪。

## 6. 开发者关注点

- **VS Code 扩展 26.803.41515 版本疑似存在系统性回归**：至少 5 条独立 Issue 指向该版本「无法加载资源」，涉及不同 OS/Remote 环境，另有 CSP `font-src` 阻塞字体（#37517）与身份请求死锁（#37521）等边界问题。建议该版本用户暂时固定到先前版本。
- **Windows 应用卡顿/崩溃已成高频词**：用户尤其不满「崩溃后仍消耗配额」（#35606）这类双重伤害，且 #20214 在硬件配置充足的情况下仍复现，说明问题大概率出在应用层而非系统资源。
- **远程开发链路脆弱**：Android 与 Linux Codex CLI 配对失败（#37897）、手机 Remote Control 与桌面端线程冲突（#37403）、远程会话完成无通知（#20930）——远程场景的连贯性是被最多不同 Issue 共同涉及的痛点。
- **配额/限制可见性混乱**：#32791（五小时限制消失）与 #36170（未收到 7 月 29 日重置）说明账户级配额状态的同步与展示存在延迟或丢失，影响用户对额度的判断。
- **安全审核误报困扰中文用户**：#28066 指出合法中文开发提示会被安全系统误判并中断任务，提示内容安全策略需要针对多语言场景做更精细的调优。
- **MCP 与 Azure 企业链路回归**：#37373（MCP app-server 剥离 Issuer 尾部斜杠）与 #37380（Azure Responses 拒绝空 namespace）都是企业级集成在 0.147 系版本引入的回归，影响面虽集中但后果严重。

---

*本日报根据 github.com/openai/codex 公开数据自动整理，仅供参考。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-11）

> 数据来源：[github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

## 1. 今日速览

- 发布 `v0.56.0-nightly.20260811.geef19f25c`，修复 MCP OAuth token 刷新失败问题。
- 社区对 Agent/子代理可靠性的关注持续升温，多个 p1 级 Bug 仍在活跃讨论（如 `MAX_TURNS` 误报、通用代理挂起）。
- 安全与 IDE 集成 PR 密集推进：SSRF 漏洞修复、macOS 沙箱崩溃修复、VSCode Companion 资源泄漏修复等均在本日更新。

## 2. 版本发布

**v0.56.0-nightly.20260811.geef19f25c**  
[Release 链接](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260811.geef19f25c)

- 修复：刷新 MCP OAuth token 时使用存储的 client ID（PR [#28481](https://github.com/google-gemini/gemini-cli/pull/28481)，感谢新贡献者 @ParthivNaresh）。

## 3. 社区热点 Issues

1. [**#22323 Subagent 达到 MAX_TURNS 被误报为 GOAL 成功**](https://github.com/google-gemini/gemini-cli/issues/22323)  
   p1 / Bug，评论 12，👍 2  
   `codebase_investigator` 在触发最大轮数后仍返回 `status: "success"`，实际未完成分析。该问题会掩盖真实中断，影响自动化流程的可信度。

2. [**#21409 通用代理（Generalist agent）无限挂起**](https://github.com/google-gemini/gemini-cli/issues/21409)  
   p1 / Bug，评论 8，👍 8  
   一旦任务被转交给 generalist agent 就会卡死，简单建文件夹也可能等待一小时。用户只能通过提示词禁止使用子代理来规避。

3. [**#25166 Shell 命令执行后卡在 “Waiting input”**](https://github.com/google-gemini/gemini-cli/issues/25166)  
   p1 / Core Bug，评论 4，👍 3  
   CLI 执行完简单命令后仍显示命令活动并等待输入，实际进程已退出，严重干扰交互和自动化。

4. [**#21983 Browser 子代理在 Wayland 下失败**](https://github.com/google-gemini/gemini-cli/issues/21983)  
   p1 / Bug，评论 4，👍 1  
   浏览器子代理在 Wayland 会话中无法正常工作，且终止原因显示为 `GOAL`，与实际情况不符。

5. [**#24353 组件级评估体系建设（EPIC）**](https://github.com/google-gemini/gemini-cli/issues/24353)  
   p1 / EPIC，评论 7  
   在行为评估基础上推进组件级评估，目前已有 76 个行为测试、覆盖 6 个 Gemini 模型，是提升 Agent 质量的重要基础设施。

6. [**#26522 Auto Memory 对低信号会话无限重试**](https://github.com/google-gemini/gemini-cli/issues/26522)  
   p2 / Bug，评论 5  
   提取代理跳过低信号会话后，该会话仍留在索引中，导致反复被取出处理，浪费计算资源。

7. [**#26525 Auto Memory 需要确定性脱敏并减少日志**](https://github.com/google-gemini/gemini-cli/issues/26525)  
   p2 / Security，评论 4  
   本地转录内容在发送给模型后才提示脱敏，且现有日志会记录技能内容，存在敏感信息泄漏风险。

8. [**#24246 工具数量超过 128 个触发 400 错误**](https://github.com/google-gemini/gemini-cli/issues/24246)  
   p2 / Bug，评论 3  
   工具过多时 API 直接返回 400，社区期望 Agent 能主动裁剪或合并工具以限制上下文。

9. [**#22093 v0.33.0 后子代理无视配置自动运行**](https://github.com/google-gemini/gemini-cli/issues/22093)  
   p2 / Bug，评论 3  
   用户已在配置中禁用 agents，但更新后子代理仍会被调用，引发权限和预期行为失控的担忧。

10. [**#22672 Agent 应主动阻止破坏性行为**](https://github.com/google-gemini/gemini-cli/issues/22672)  
    p2 / Feature，评论 3，👍 1  
    模型在复杂 git 操作或数据库修改时可能使用 `git reset` / `--force` 等危险命令，社区期望 Agent 能识别风险并选择更安全方案或请求确认。

## 4. 重要 PR 进展

1. [**#28481 修复 MCP OAuth token 刷新**](https://github.com/google-gemini/gemini-cli/pull/28481)  
   p1 / security，已关闭  
   修复 OAuth discovery + 动态客户端注册的 MCP 服务器在刷新 token 时失败并删除凭据的问题，已随今日 nightly 发布。

2. [**#28730 修复错误的模型容量耗尽提示**](https://github.com/google-gemini/gemini-cli/pull/28730)  
   size/m / size/l  
   修正 CLI 端误报模型容量不足的消息，并修复 core 包中配额查询的模型映射；在容量临时高峰时保留“Keep trying”选项。

3. [**#28557 修复 web-fetch SSRF 漏洞**](https://github.com/google-gemini/gemini-cli/pull/28557)  
   p1 / security  
   将 `isBlockedHost` 中的同步 IP 检查改为异步 DNS 解析，防止域名指向内网地址（如云元数据 `169.254.169.254`）时绕过校验。

4. [**#28734 修复 macOS 沙箱下 EACCES 导致崩溃**](https://github.com/google-gemini/gemini-cli/pull/28734)  
   p1 / platform  
   `resolveToRealPath` 未处理 `EACCES` 错误，在 macOS Seatbelt 沙箱 + CWD 位于 Git 仓库时会导致 CLI 启动崩溃。

5. [**#28764 VSCode IDE Companion 资源泄漏修复**](https://github.com/google-gemini/gemini-cli/pull/28764)  
   p2 / area/core  
   修复 `activate()` 中 `context.subscriptions.push` 逗号表达式导致的 Disposable 追踪缺失，避免 `gemini.diff.accept` 等命令无法正确清理。

6. [**#28688 Cloud Workstations OAuth 重定向 URI 动态化**](https://github.com/google-gemini/gemini-cli/pull/28688)  
   p3 / security  
   解决云工作站 VM 中 OAuth 流程固定重定向到 `localhost` 而失败的问题，适配远程开发场景。

7. [**#28729 修复 IDE 连接目录不匹配**](https://github.com/google-gemini/gemini-cli/pull/28729)  
   size/m / size/l  
   解决 Cider 或 VS Code 远程工作区使用虚拟/FUSE 路径时，Gemini CLI 无法连接 IDE Companion 的问题。

8. [**#28305 评估失败时输出工具调用时间线**](https://github.com/google-gemini/gemini-cli/pull/28305)  
   p3 / core，help wanted  
   当 eval 失败时，控制台会自动打印带编号的工具调用时间线，包含参数、状态和错误详情，大幅降低调试成本。

9. [**#28344 新增 `eval:validate` 静态校验命令**](https://github.com/google-gemini/gemini-cli/pull/28344)  
   p3 / core，help wanted  
   校验 eval 源文件是否符合 9 条规则，并支持以退出码 1 作为 CI 门禁，提升评估脚本的可维护性。

10. [**#28624 防止布尔 thought 泄漏为 `[Thought: true]` 文本**](https://github.com/google-gemini/gemini-cli/pull/28624)  
    p2 / area/agent  
    修复内部思考部分（`thought: true`）被错误显示为 `[Thought: true]` 文本的问题，改善输出可读性。

## 5. 功能需求趋势

从近期 Issues 中可以提炼出社区最关注的几个方向：

- **子代理行为可观测性与控制**：要求子代理轨迹可通过 `/chat share` 分享（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）、Bugreport 包含子代理上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)），以及准确上报失败/中断状态（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)）。
- **安全性强化**：Auto Memory 脱敏逻辑前移（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)）、Web 请求 SSRF 防护（[#28557](https://github.com/google-gemini/gemini-cli/pull/28557)）、Agent 主动规避破坏性命令（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）。
- **评估与测试基础设施**：组件级评估体系（[#24353](https://github.com/google-gemini/gemini-cli/issues/24353)）、AST 感知文件读取与代码库映射（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)）、eval 校验工具（[#28344](https://github.com/google-gemini/gemini-cli/pull/28344)）。
- **IDE 与远程开发集成**：VSCode Companion 稳定性（[#28764](https://github.com/google-gemini/gemini-cli/pull/28764)）、Cloud Workstations OAuth（[#28688](https://github.com/google-gemini/gemini-cli/pull/28688)）、IDE 虚拟目录匹配（[#28729](https://github.com/google-gemini/gemini-cli/pull/28729)）。
- **记忆系统可靠性**：Auto Memory 重试策略（[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)）、无效补丁隔离（[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)）、记忆质量整体改进（[#26516](https://github.com/google-gemini/gemini-cli/issues/26516)）。
- **性能与底层稳定性**：解决 Shell 命令卡死（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)）、终端 resize 性能（[#21924](https://github.com/google-gemini/gemini-cli/issues/21924)）、大量工具导致的 API 限制（[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)）。
- **对子代理自主性的反思**：子代理默认激活/权限不可控（[#22093](https://github.com/google-gemini/gemini-cli/issues/22093)）、技能与子代理使用率不足（[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)）。

## 6. 开发者关注点

- **子代理可靠性是最大痛点**：挂起、误报成功、不遵循配置等问题频繁出现，导致部分开发者被迫完全禁用 subagents。
- **状态误判影响自动化**：`MAX_TURNS` 被报告为 `GOAL` 成功，掩盖真实失败，对无人值守和 CI 场景极不友好。
- **简单 Shell 操作卡死**：命令已完成但界面仍显示“等待输入”，严重影响交互体验。
- **安全与权限意识**：开发者担心模型执行破坏性命令，以及 Auto Memory 等在后台处理本地数据时泄露敏感信息。
- **OAuth 与远程环境认证脆弱**：本地 `localhost` 重定向在云工作站、远程开发容器及 MCP OAuth 场景中频繁失败。
- **评估调试困难**：eval 失败时难以定位是工具调用问题还是模型决策问题，社区期待更多诊断工具和时间线输出。

---
*以上为 2026-08-11 Gemini CLI 社区动态日报，基于 GitHub 公开数据整理。*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报 — 2026-08-11

## 1. 今日速览

昨日 **v1.23.0 稳定版正式发布**，核心是统一的内容驱动上下文维护系统、结构化计划合约与持久化会话收件箱，是近期在上下文管理和长会话稳定性方面最重大的一次架构更新。社区反馈高度集中在 **v1.23.0 的压缩/桶系统实际行为**上：多条 Issue 指出“上下文显示 30-40% 就触发压缩”“反复提示 snip 却未真正压缩”“压缩失败导致会话永久卡死”等问题，说明新架构在真实长会话场景下仍需打磨。此外，**ACP 模式图片被静默丢弃**、**Responses 流式响应 premature EOF 判定过严**等协议兼容性问题受到关注，桌面端 Windows 平台依然是 bug 高发区。

## 2. 版本发布

### v1.23.0（稳定版）
**Release 链接：** https://github.com/esengine/DeepSeek-Reasonix/releases

本次更新是近期最大的一次功能迭代，核心变更：

- **统一内容驱动的上下文维护系统**：重构上下文管理机制，使长会话更可预测且更具成本效益
- **结构化计划合约**：带验收标准执行，强化 Plan/Goal 的可验证性
- **有界对话轮次 + 持久化会话收件箱**：控制对话轮次上限，收件箱状态跨会话持久化
- **桌面端新特性**：跨消息逻辑选区、工作区实时刷新、三模式思考过程展示（思维链可视化的三种粒度切换）
- **CLI 改进**：启动时询问上下文窗口大小、失败报告更清晰
- **修复**：大量压缩、令牌估算和委托相关缺陷

发布说明（中/英）：[v1.23.0 完整更新日志](https://reasonix.io/changelog/v1.23.0/) · [English](https://reasonix.io/changelog/v1.23.0/?lang=en)

另：v1.22.0 的修复（桌面端会话持久性、CLI Web 交接、提供商输出预算修复）已合并入主线。

## 3. 社区热点 Issues（精选 10 条）

### 上下文压缩相关（高频焦点）

**#7935 [Bug] 反复显示 "snipped N stale tool results before compaction" 但上下文从未真正压缩**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/7935
- 作者：@AFunDog ｜ 更新：08-10 ｜ 评论：9
- 重要性：日志显示清理了约 206 条过期工具结果（约 34K tokens），但压缩实际未生效，**上下文压力并未释放**。9 条评论表明多个用户遇到同类行为，直指 v1.23.0 内容驱动压缩系统的核心逻辑缺陷。

**#8266 [Bug] 单次大工具输出(web_fetch 几十KB)即触发压缩，UI 显示 30-40% 却实际已达阈值**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/8266
- 作者：@kira4094 ｜ 更新：08-11 ｜ 评论：2
- 重要性：UI 显示的上下文占用与实际压缩触发阈值严重不一致，且**单次工具返回即可压垮上下文预算**。关键反例证明问题与 MCP schema 开销无关，指向单次工具输出处理和预算计算的真实缺陷。

**#8226 [Bug] context exceeds provider limit and compaction failed: context deadline exceeded**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/8226
- 作者：@lishidongol ｜ 更新：08-11 ｜ 评论：1（已关闭）
- 重要性：仅对话 3 轮即触发“上下文超限但压缩失败”，压缩超时导致会话无法继续。v1.23.0 的 PR #8119 正是针对此问题（“failed summary must not strand the turn”），说明该问题已被官方确认为严重缺陷并着手修复。

### v1.23.0 新功能（收件箱/引导队列）问题

**#8276 [Bug] 发送引导后反复出现 "inbox item state does not allow this operation"，待处理引导永久卡死**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/8276
- 作者：@Amengclass ｜ 更新：08-11 ｜ 评论：0
- 重要性：**v1.23.0 新引入的持久化收件箱存在状态机缺陷**——引导条目卡死，无法删除/重试/发送，每次操作都伴随报错。属于新功能最严重的功能性 bug，直接阻断工作流。

### 桌面端/Windows 平台问题

**#8267 [Bug] 会话内滚动浏览历史/新消息输出时，视图跳动到相邻老消息**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/8267
- 作者：@kira4094 ｜ 更新：08-11 ｜ 评论：5
- 重要性：长会话滚动阅读时视图频繁跳位，严重损害阅读体验。5 条评论已形成讨论，PR #8264（修复原生滚动跳页与卡顿）和 #7916（批处理遥测检查点）都与此相关，属于桌面端高优 UX 问题。

**#7278 [Bug] 安装 Windows 桌面端直接失败**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/7278
- 作者：@jiliangsui ｜ 更新：08-11 ｜ 评论：2
- 重要性：从 v1.18.0 应用内更新失败到卸载后官网安装包仍失败，**Windows 安装/更新管道持续存在问题**。同类问题 #7188 已被引用但未解决，说明安装器缺陷跨版本存在。

**#6838 [Bug] 切换、归档会话卡顿严重，偶发界面显示异常**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/6838
- 作者：@HaoyueQin ｜ 更新：08-11 ｜ 评论：3
- 重要性：该 Issue 自 07-22 创建，持续近三周仍在更新。归档会话时界面严重卡顿并出现错误会话内容渲染，且该问题“已存在很长时间”。Windows 桌面端性能与渲染正确性问题长期未解。

**#8262 [Bug] 使用 CLI 一次会话后，再打开桌面端会话会出现很多且删除不了**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/8262
- 作者：@ChenZeiShuai ｜ 更新：08-10 ｜ 评论：0
- 重要性：**CLI 与桌面端会话数据未正确隔离或同步**，CLI 会话后桌面端出现幽灵会话且无法删除。跨端数据一致性是新架构（SQLite 会话目录）必须解决的集成问题。

### 协议兼容性

**#8271 [Bug] ACP 模式下嵌入式 resource(图片)内容被静默丢弃；image 块会导致会话挂起**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/8271
- 作者：@btiger ｜ 更新：08-11 ｜ 评论：0
- 重要性：Reasonix 在 ACP Initialize 中声明支持 `embeddedContext`，但实际**静默丢弃图片资源**，模型回复“没有收到图片”，且 image 块还会导致会话挂起。这是 ACP 生态互操作性的核心协议缺陷，影响所有 ACP 客户端（codeg 等）。

**#8272 [Bug] Responses 流式响应在上游缺少 [DONE] 时被判定为 premature EOF**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/8272
- 作者：@zyxtoworld ｜ 更新：08-11 ｜ 评论：0
- 重要性：**Responses 协议分支的流式终止判定过严**——OpenAI Chat 分支已兼容无 `[DONE]` 的情况，但 Responses 分支仍要求显式终止事件，导致协议中转场景下任务中断。属于协议健壮性问题，影响第三方客户端集成。

### 功能请求

**#8258 [Feature] ability to redefine what is injected in system prompt and context**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/issues/8258
- 作者：@zmn28hgbn59kcmlpio8unfh7fdre523esd28q9a ｜ 更新：08-10 ｜ 评论：1
- 重要性：用户希望自定义**哪些内置技能、工具和斜杠命令的使用说明与描述被注入上下文**，以减少上下文噪声。这是高级用户对上下文精细化控制的需求，与当前“内容驱动上下文维护”方向相呼应。

## 4. 重要 PR 进展（精选 10 条）

**#8119 [fix] a failed summary must not strand the turn（压缩失败不得卡死回合）**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/8119
- 作者：@esengine（官方） ｜ 更新：08-11
- 重要性：直接修复 #8226——当物理溢出或压力超限且压缩失败时，当前逻辑会导致每条后续消息都被阻塞。该 PR 确保压缩失败时有逃生通道，是高优先级的核心修复。

**#7488 [feat] local knowledge cache + server-side web_search retrieval system（本地知识缓存 + 服务端搜索检索系统）**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/7488
- 作者：@clearnature ｜ 更新：08-11
- 重要性：实现 #7410 的完整检索系统，包括 `retrieve_info` 工具、本地知识缓存、护栏机制和服务端 web_search 蒸馏。这是 RAG/检索方向的大型功能 PR，基于 #7466（服务端搜索控制）构建。

**#8257 [feat] Integrate disposable SQLite catalogs（整合可丢弃 SQLite 目录投影）**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/8257
- 作者：@SivanCola ｜ 更新：08-11
- 重要性：多域可丢弃 SQLite 目录栈落地，覆盖会话/历史/用量/任务四个域。包含非阻塞式会话发现、损坏隔离的 `projectiondb` 生命周期管理，是桌面端性能和稳定性的基础架构升级。

**#8275 [feat] light/balanced/delivery role settings with unified tools（角色设定与统一工具面）**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/8275
- 作者：@SivanCola ｜ 更新：08-11
- 重要性：将 economy/full/delivery 工作模式重构为三种会话角色设置（`light | balanced | delivery`，默认 balanced），共享同一个对 provider 可见的工具面，仅通过宿主 TaskPolicy 区分（规划路线、验证强度、独立审查）。简化了配置模型。

**#8264 [fix] stabilize native transcript scrolling（修复聊天区原生滚动跳页与卡顿）**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/8264
- 作者：@SivanCola ｜ 更新：08-11
- 重要性：针对 #8267 的修复。当原生滚动与 TanStack 测量补偿、流式尾部追踪、resize 重固定重叠时，长可变高度消息会出现粘滞、反向或整页跳动。该 PR 让原生输入成为一等滚动所有者，同时保持补偿写入。

**#8256 [feat] compaction threshold slider, real-occupancy thresholds and live context capacity pins（压缩阈值滑块与实时上下文容量指示）**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/8256
- 作者：@complyue ｜ 更新：08-11
- 重要性：将单一的 `compact_ratio` 配置旋钮拆分为四个独立的压缩阈值（soft / snip / compact / force），并在桌面端上下文仪表盘上以**可拖拽滑块**实时展示。直接回应社区对压缩行为不可预测的抱怨。

**#8164 [fix] pair tool results within assistant turns（在同一助手回合内配对工具结果）**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/8164
- 作者：@Nath-Vikky ｜ 更新：08-11
- 重要性：某些 OpenAI 兼容网关不返回 tool_call ID，导致跨回合的 ID 冲突。该 PR 将调用和结果局限在所属助手回合内命名空间隔离，修复 todo 和会话证据重建时的 ID 碰撞问题。

**#8023 [fix] prevent stale Plan and Goal results after reasoning-only stops（防止仅推理停止后 Plan/Goal 结果过期）**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/8023
- 作者：@Nath-Vikky ｜ 更新：08-11
- 重要性：扩展 #7817 的“可见最终结果”合约到 Plan 和 Goal 工作流。防止仅推理停止导致 Plan 审批、Goal 评估或 Stop 钩子复用前一轮的可见文本，属于会话状态一致性的关键修复。

**#7916 [perf] batch session telemetry checkpoints（批处理会话遥测检查点）**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/7916
- 作者：@Nath-Vikky ｜ 更新：08-11
- 重要性：当前每次 `TurnStarted`、`Usage`、`read_file` 成功及 `TurnDone` 都会完整重写 `.telemetry.json`，序列化开销随会话增长。该 PR 批处理检查点写入，直接改善长会话桌面端性能。

**#7653 [perf] accumulate streamed tool arguments linearly（流式工具参数线性累积）**
- 链接：https://github.com/esengine/DeepSeek-Reasonix/pull/7653
- 作者：@Nath-Vikky ｜ 更新：08-11
- 重要性：OpenAI/Anthropic/Responses 流解析器当前用 `arguments += fragment` 追加，每次都是 O(n²) 复制。改为线性累积后，对长 tool call 参数（如大文件写入）可显著降低 CPU 开销。

## 5. 功能需求趋势

从全部 Issue 和 PR 中提炼的社区关注方向：

- **上下文管理精细化**（最突出）：v1.23.0 推出统一内容驱动上下文维护系统后，用户对**压缩阈值可配置**（#8256）、**触发机制透明化**（#8266）、**上下文内容选择性注入**（#8258）、**压缩失败恢复**（#8119）的需求集中爆发。社区不再满足于黑盒自动压缩，而是要求可观测、可干预、可预测的上下文生命周期管理。
- **ACP/多协议互操作性**：ACP 模式下图片资源静默丢弃（#8271）、Responses 流式 premature EOF 判定过严（#8272）、OpenAI 兼容网关缺失 tool_call ID（#8164）等协议边界问题密集出现，说明 Reasonix 作为多种客户端/网关的中枢，协议健壮性是生态扩展的关键瓶颈。
- **桌面端体验优化**：滚动跳动（#8267）、会话切换卡顿（#6838）、更新横幅过期误导（#8273）、待处理引导可编辑性（#8274）等占了近半数 Issue，且集中在 Windows 平台。桌面端稳定性与交互细节仍是社区最直接的痛点。
- **工具/技能系统的可组合性**：Mise 集成（#8245）、RTK 兼容的 bash 输出压缩（#8260）、自定义系统提示注入内容（#8258）、统一工具面（#8275）等需求表明，用户希望更灵活地控制工具暴露面和上下文占用。
- **检索能力扩展**：本地知识缓存 + 服务端 web_search 检索系统（#7488）的推进，配合 Parallel Search MCP 示例（#8268），显示社区对 RAG/检索增强方向的持续兴趣。

## 6. 开发者关注点

- **压缩系统可信度问题**：多条 Issue 指向“显示压缩但实际未压缩”“达到阈值却不触发（或过早触发）”等行为，压缩行为的**可观测性**（UI 百分比与实际阈值的偏差）和**可恢复性**（失败后会话卡死）是当前最大的信任危机。
- **Windows 平台的老大难**：安装/更新失败（#7278）、会话归档卡顿（#6838）、滚动渲染异常（#8267）长期存在且跨版本复发，Windows 桌面的稳定性投入明显不足。CLI 与桌面端会话数据互相污染（#8262）是新增的跨端一致性问题。
- **v1.23.0 新功能引入的回归**：持久化会话收件箱（#8276）和引导队列（#8274、#8273）连续出现状态机缺陷和交互设计缺失，提醒新功能在发布前需更充分的边界条件测试（尤其是状态流转的异常路径）。
- **流式与长会话的工程细节**：流式参数 O(n²) 累积（#7653）、遥测全量重写（#7916）、流式响应终止判定（#8272）等技术债虽不显眼，但在长会话高频场景下直接影响体验和成本，开发者对此类深水区问题的关注度在提升。

---

*本日报由 AI 自动生成，数据来源：[esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 2026-08-11

## 今日速览

今日 OpenCode 发布 v1.18.16 补丁，修复了配置解析失败与桌面端「从 Home 打开项目」未被注册的问题。社区围绕 V2 兼容性缺口（#40474）、DeepSeek V4 Flash 上下文元数据错误（#40958）以及桌面 Git 项目会话卡顿（#41636）展开密集讨论。核心团队仍在系统性推进架构重构，将文件系统访问从核心服务中剥离至 config 插件侧。

## 版本发布

### v1.18.16

🔗 [GitHub Releases](https://github.com/anomalyco/opencode/releases)

- **Core 修复**：忽略未知的顶层配置字段，不再导致 config 解析直接失败；注册从 Home 打开的项目，使其在应用其余部分可用。
- **Desktop 改进**：在 Home 中可通过右键打开项目菜单。
- **Desktop 修复**：回退到列出可用项目（原文截断，待补全）。

## 社区热点 Issues

### 1. DeepSeek V4 Flash 上下文元数据错误（#40958）
🔗 [github.com/anomalyco/opencode/issues/40958](https://github.com/anomalyco/opencode/issues/40958)

作者 @abhisheksharma611 指出，OpenCode Zen 上 DeepSeek V4 Flash Free 在 models.dev 中被标记为 200K context，而模型原生支持 **1M context**。这不是硬件限制，而是元数据配置问题，削弱了长上下文 coding 任务的实用性。社区 4 条评论、1 个 👍，讨论热度较高。

### 2. V2 中 agent/mode 切换对模型不可见（#40474）
🔗 [github.com/anomalyco/opencode/issues/40474](https://github.com/anomalyco/opencode/issues/40474)

V2 中切换 Build ↔ Plan 或自定义 agent 时，模型无法感知当前模式：`agent-switched` 消息在历史转 LLM 上下文时被静默丢弃，plan agent 没有系统提示词。这是 V1 parity 的重大缺口，获得 1 个 👍，被认为严重影响 V2 下 agent 的指令遵循质量。

### 3. chunkTimeout 对非 SSE 流无效（AWS Bedrock EventStream）（#26487）
🔗 [github.com/anomalyco/opencode/issues/26487](https://github.com/anomalyco/opencode/issues/26487)

`provider.options.chunkTimeout` 对 AWS Bedrock 等非 SSE 流协议完全失效，无法保护请求免受挂起。影响范围可能波及 Google Vertex 等同样使用 EventStream 的 provider，属于流式传输稳定性隐患。

### 4. TUI 草稿应与会话绑定（#41614）
🔗 [github.com/anomalyco/opencode/issues/41614](https://github.com/anomalyco/opencode/issues/41614)

用户反馈在 TUI 中切换到其他会话时，未提交的草稿会被带到新会话，而回到原会话时草稿丢失。该 issue 目前已 **closed**，说明官方已接受此行为并着手修复，草稿按会话隔离是社区明确期望。

### 5. 切换会话后输入框内容被清空（#36203）
🔗 [github.com/anomalyco/opencode/issues/36203](https://github.com/anomalyco/opencode/issues/36203)

与 #41614 密切相关的交互问题：当其他会话完成工作或请求授权，用户切换过去处理再切回原会话时，未提交的长输入内容被清空。对多会话工作是高频痛点，已有 2 条评论。

### 6. Windows 下 opencode 命令在终端中不被识别（#14074）
🔗 [github.com/anomalyco/opencode/issues/14074](https://github.com/anomalyco/opencode/issues/14074)

作者 @YuldShah 描述首次命令可用、退出后命令消失，即使将 opencode.exe 加入 PATH 后问题依旧。该 issue 有 **9 条评论**，是跨版本的 Windows 环境长期问题，直到今日仍在更新。

### 7. Anthropic 模型经 LLM 代理失败（#40797）
🔗 [github.com/anomalyco/opencode/issues/40797](https://github.com/anomalyco/opencode/issues/40797)

仅通过 OpenCode 请求经 Bifrost 代理的 Bedrock Anthropic 模型时全部失败，而 Claude Code 不受影响，怀疑与 provider key 处理方式有关。企业代理架构用户会受影响，值得关注。

### 8. Desktop 端 Git 项目新会话模型无输出（#41636）
🔗 [github.com/anomalyco/opencode/issues/41636](https://github.com/anomalyco/opencode/issues/41636)

当前日新增：桌面应用打开 Git 项目并启动新会话时，模型没有任何输出（疑似卡死），终端版正常。通过 `/new` 命令可规避。这是桌面端严重的功能 bug，官方尚未定位。

### 9. 提案：AGENTS.md 向上发现扩展到项目根目录之外（#41633）
🔗 [github.com/anomalyco/opencode/issues/41633](https://github.com/anomalyco/opencode/issues/41633)

来自 @kitlangton 的设计提案：当前 `InstructionDiscovery` 从会话目录到 project root 即停止，但 root 与 `$HOME` 之间的目录（如 monorepo 上级约定）不会被咨询。建议向上继续查找至 `$HOME` 为止，属配置能力增强。

### 10. Session wait 端点始终返回不可用（#33605）
🔗 [github.com/anomalyco/opencode/issues/33605](https://github.com/anomalyco/opencode/issues/33605)

`POST /api/session/:sessionID/wait` 在 OpenAPI 中描述为等待会话 agent 循环 idle，但当前实现恒返回 `OperationUnavailableError`。服务端 API 可用性缺口，影响自动化编排场景。

## 重要 PR 进展

### 1. feat(cli): 在 CLI 中嵌入 Web UI（#41525）
🔗 [github.com/anomalyco/opencode/pull/41525](https://github.com/anomalyco/opencode/pull/41525)

@Brendonovich 将 Web 应用嵌入 Bun/Node CLI 发行包，使 `opencode serve` 同时提供 Web UI 与 API，新增 `opencode web` 和 TUI `/web` 命令。托管服务与 stdio 模式保持 API-only。

### 2. fix(cache): 提升 Anthropic prompt cache 命中率（#14743）
🔗 [github.com/anomalyco/opencode/pull/14743](https://github.com/anomalyco/opencode/pull/14743)

@bhagirathsinh-vaghela 修复跨仓库、跨会话的 Anthropic prompt cache miss，通过 system split 与 tool 稳定性提升命中率并 closes #5416/#5224。该 PR 自 2026-02 创建至今仍在活跃更新。

### 3. feat(desktop): 发布 v2 beta 构建（#41626）
🔗 [github.com/anomalyco/opencode/pull/41626](https://github.com/anomalyco/opencode/pull/41626)

@Hona 为 v2 分支构建 beta 桌面版本（捆绑 V2 CLI），V2 npm 保持在 next 频道，并避免 Nix hash 污染 beta 分支。同系列 #41627 负责从 v2 运行 beta 同步。

### 4. feat: 每用户工作区目录（#41639）
🔗 [github.com/anomalyco/opencode/pull/41639](https://github.com/anomalyco/opencode/pull/41639)

@xingyun0812 引入 `DataRootConfig`，支持通过 `OPENCODE_DATA_ROOT` 环境变量实现会话隔离，默认回退到 XDG 规范路径，并已在 V1/V2 路由层注册。

### 5. refactor(core): instruction discovery 移至 config 侧（#41629）
🔗 [github.com/anomalyco/opencode/pull/41629](https://github.com/anomalyco/opencode/pull/41629)

@kitlangton 将 AGENTS.md 文件系统采集逻辑从 `InstructionDiscovery` 移到 config 侧内部插件，核心只保留按路径排序的指令状态。延续 #40954 的 core-service 方向。

### 6. fix(acp): 尊重默认 agent variant（#41634）
🔗 [github.com/anomalyco/opencode/pull/41634](https://github.com/anomalyco/opencode/pull/41634)

对应 #41628：新 ACP 会话此前只保留默认 model 而丢失匹配的 agent variant，导致初始 effort 回退。@apcooley 修复此问题。

### 7. fix(session): 恢复孤立 reasoning stream parts（#41630）
🔗 [github.com/anomalyco/opencode/pull/41630](https://github.com/anomalyco/opencode/pull/41630)

AI SDK 在缺失 reasoning/text 起始标记时会以 `part not found` 错误继续流，OpenCode 却提升为致命错误。@bvolpato 改为恢复孤立流式部分，避免会话中断。

### 8. fix(tui): 默认折叠 execute 子详情（#41624）
🔗 [github.com/anomalyco/opencode/pull/41624](https://github.com/anomalyco/opencode/pull/41624)

Code Mode 下每个 execute 子操作默认只占一行，点击展开完整输入与错误信息。优化长输出场景的 TUI 可读性。

### 9. refactor(core): 插件发现与监听移至 config 侧（#41618）
🔗 [github.com/anomalyco/opencode/pull/41618](https://github.com/anomalyco/opencode/pull/41618)

@kitlangton 让 `PluginSupervisor` 只负责 import、选择、生命周期与激活；目录发现、目标解析和变化通知全部移入 config 侧。与 #41622（skill service）、#41632（Global path）、#41619（消除模块级 FS 副作用）共同构成近期架构主线。

### 10. fix(desktop): 处理 process.stderr 的异步 EPIPE（#37834）
🔗 [github.com/anomalyco/opencode/pull/37834](https://github.com/anomalyco/opencode/pull/37834)

@kagura-agent 修复桌面应用在父终端关闭时因未捕获 EPIPE 而崩溃的问题（之前存在 ignore 但仍会崩）。提升桌面端关闭流程的健壮性。

## 功能需求趋势

- **模型/Provider 支持**：上下文长度元数据应基于模型原生能力而非外部配置（#40958）；流协议差异性（SSE vs EventStream）需要更精细的超时控制（#26487）。
- **会话交互**：TUI 草稿按会话隔离、切换后输入内容保留，是多会话工作流的基础体验（#41614、#36203）；AGENTS.md 向上发现扩展至 `$HOME`（#41633）。
- **桌面应用**：Git 项目新会话可用性（#41636）、菜单快捷键接入 Renderer 命令（#41625）、v2 beta 桌面构建（#41626）表明桌面端正在加速追赶 CLI 功能。
- **架构方向**：核心服务与文件系统彻底解耦，config 插件负责外部世界（#41618、#41622、#41629、#41632、#41619），为 Cloudflare workerd 等受限环境铺路。
- **性能优化**：Anthropic prompt cache 命中率提升仍是社区持续关注的性能主题（#14743）。

## 开发者关注点

- **Windows 环境痛点**：opencode 命令 PATH 漂移（#14074）、npm 全局安装权限错误（#1945）长期存在，Windows 开发者需要更稳定的安装与命令解析方案。
- **网络/连接稳定性**：SSE 流中途关闭（#38458）、Go 付费计划网络拥塞（#41635）、session wait 端点不可用（#33605）等多条链路问题被反复提及。
- **V2 迁移兼容性**：agent/mode 切换对模型不可见（#40474）是当前最大的 V1 parity 缺口，社区期待 V2 尽快补齐。
- **高频自动化 API**：SSE 持久化与 wait 端点的不可用直接影响社区基于 OpenCode 构建自动化编排的可行性。
- **本地化质量**：zh locale 中「token」被译为「令牌」引发争议（#40977、#41532），开发者更接受直接使用英文术语或更贴合 LLM 上下文的译法。

---
*本日报由 OpenCode 社区数据自动生成，数据截至 2026-08-11 24:00 UTC。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-11

## 今日速览

今日 Qwen Code 发布正式版 v0.21.9，核心亮点是支持从目录、归档、Git 仓库、URL 及 npm 包原生安装 Qoder 插件，并新增二维码本地控制配对功能。社区活跃度集中在 Web Shell 功能增强（文件上传、推理控制、渠道策略）与一系列 CLI/桌面端体验修复，同时一个新的 Qwen WebBridge 浏览器控制能力值得关注。

---

## 版本发布

### v0.21.9（正式版）
- **Qoder 插件安装扩展**：支持从本地目录、压缩归档、Git 仓库、URL 和 npm 包安装 Qoder 插件，并自动加载系统提示词（[#8661](https://github.com/QwenLM/qwen-code/pull/8661)）。
- **Local Control 配对**：可通过二维码快速完成本地控制设备配对。

### v0.21.9-nightly.20260811.8c90697ace
- 新增内存上下文刷新标记继承场景的测试覆盖（[#8809](https://github.com/QwenLM/qwen-code/pull/8809)）。

---

## 社区热点 Issues

当前过去 24 小时更新的 Issue 仅 2 条，均列示如下：

1. **[#7167] Fleet Shepherd Dashboard（OPEN）**  
   由机器人自动维护的 CI/CD 看板，用于持续监控各 PR 的合并冲突、分发状态等。最近一次 tick 更新于 2026-08-11T01:32:16Z，指出 PR #8830（`0e161990b`）处于冲突状态，已发起冲突分发。  
   关注价值：该项目当前采用机器人驱动 CI 监控工作流，对 PR 提交者可了解自动化流转机制。  
   🔗 https://github.com/QwenLM/qwen-code/issues/7167

2. **[#8898] API Error: 检测到重复工具调用（CLOSED）**  
   用户反馈会话中反复出现相同名称和参数的重复工具调用，导致 API 报错并中断对话。该问题以 P2 优先级被关闭，标记为欢迎贡献（welcome-pr）。社区 3 条评论，说明已有初步讨论和解决方案建议。  
   关注价值：涉及大模型工具调用一致性与对话历史管理，是 agent 类应用常见痛点。  
   🔗 https://github.com/QwenLM/qwen-code/issues/8898

---

## 重要 PR 进展

以下挑选 10 个近期活跃且影响面较大的 PR：

1. **[#8900] fix(core): sync loaded-skill state with history eviction; add user /unskill command**  
   核心修复：当对话历史被驱逐时同步清理已加载技能状态，并新增用户侧 `/unskill` 命令便于主动卸载技能。解决长会话中技能残留问题。  
   🔗 https://github.com/QwenLM/qwen-code/pull/8900

2. **[#8874] feat(web-shell): support workspace file uploads**  
   Web Shell 编辑器支持拖拽/选择工作区文件上传，具备进度提示、取消操作、冲突自动重命名等能力。补齐了 Web 端文件交互短板。  
   🔗 https://github.com/QwenLM/qwen-code/pull/8874

3. **[#8872] feat(web-shell): improve thinking and tool progress display**  
   优化 Web Shell 中思考过程与工具调用进度的视觉展示：Ctrl+O 可切换显示/隐藏思考内容，隐藏时并合相邻工具调用组，持久化用户偏好。  
   🔗 https://github.com/QwenLM/qwen-code/pull/8872

4. **[#8675] feat(web-shell): add model-specific reasoning controls**  
   引入模型推理控制注册表，并贯通 Core/ACP/daemon/SDK/WebShell 全链路。首个适配模型为 `qwen3...`，支持独立的 Thinking/Effort 控制和默认档位，为细分模型调优奠定基础。  
   🔗 https://github.com/QwenLM/qwen-code/pull/8675

5. **[#8894] feat(review): capture-tui — rendering claims get pixels, not prose**  
   `qwen review` 新增 `capture-tui` 子命令，可在私有 tmux 服务器中驱动被审查代码，并真实捕获终端渲染像素，解决“面板截断在 80 列”这类可视化 claim 的证据问题。审查工具进入第二阶段的“用图说话”。  
   🔗 https://github.com/QwenLM/qwen-code/pull/8894

6. **[#8687] feat(daemon): guard cross-worktree Git mutations**  
   为 `qwen serve` 增加主机侧防护：识别通过 `-C`、`--work-tree`、`--git-dir` 等参数逃逸会话工作区的 Git 变更命令并予以拦截。增强模型执行 shell 命令时的安全性。  
   🔗 https://github.com/QwenLM/qwen-code/pull/8687

7. **[#8831] fix(cli): eliminate banner duplication and drag flicker on resize/wake**  
   修复终端尺寸变化/唤醒时渲染屏闪和 banner 重复叠加问题，源自旧宽度行数与新宽度回流不一致。提升 CLI 长时使用体验。  
   🔗 https://github.com/QwenLM/qwen-code/pull/8831

8. **[#8848] feat(web-shell): redesign Channel policy and workspace management**  
   重新设计 Web Shell 的渠道管理：统一暴露直连消息、群组访问、会话路由和工作区所有权控制，支持批量选择发送者/群组策略及 allowlist 管理。面向多适配器运维场景。  
   🔗 https://github.com/QwenLM/qwen-code/pull/8848

9. **[#8896] fix(desktop): close 0.1.1 regression gaps**  
   修复桌面版 0.1.1 三个回归：按住录音手势在连接态未提交时松手即停止、SSE 正常结束时不再误报重连错误、macOS 发布构建重新生成签名。  
   🔗 https://github.com/QwenLM/qwen-code/pull/8896

10. **[#8707] feat(chrome): add Qwen WebBridge direct browser control**  
    新增 Qwen WebBridge，为 `qwen serve` 提供直达 Chrome 扩展/真实 Chromium 配置的浏览器控制路径，兼容 Kimi WebBridge 的 `/command` 和 `/status` 接口，覆盖 17 种操作，支持任务级资源追踪。  
    🔗 https://github.com/QwenLM/qwen-code/pull/8707

---

## 功能需求趋势

从近期 Issue 与 PR 动态中，可提炼出以下社区关注方向：

- **Web Shell 能力补齐**：文件上传、思考/工具进度可视化、渠道与工作区策略管理占据当前 PR 主力，Web 端正在向桌面级体验靠拢。
- **模型与提供商生态扩展**：除 qwen3 系列推理控制外，社区正积极加入 Kimi、小米 MiMo 等第三方提供商预设（[#8368](https://github.com/QwenLM/qwen-code/pull/8368)），反映用户对多模型接入的明确需求。
- **跨端控制与集成**：Chrome 浏览器控制（WebBridge）、二维码配对本地控制，显示项目正构建“桌面 ⇄ 浏览器 ⇄ 本地服务”互通能力。
- **深度审查与可观测性**：`capture-tui` 用像素级证据验证终端渲染 claim，说明代码审查工具正走向更实证化的方向。
- **插件与技能管理**：Qoder 插件多来源安装、`/unskill` 命令等，技能生态管理被持续加强。

---

## 开发者关注点

- **重复工具调用导致的 API 错误**：短时间内对话中相同工具被反复调用会触发终端报错，社区已有人提出需在请求侧或模型侧加以约束。
- **CLI 渲染稳定性**：resize/唤醒时 banner 重复、黑屏闪烁等问题虽已修复，但说明终端交互的鲁棒性仍是高频痛点。
- **技能/会话状态一致性**：历史驱逐时技能易残留、cron 计划任务提示未持久化，开发者对长会话状态管理要求愈发严格。
- **安全边界**：模型执行 Git 命令需防穿越工作树，官方新增守护进程防护是对 agent 安全性的重要补强。
- **会话恢复体验**：WebUI 会话加载超时后无法重试的问题得到修复（[#8883](https://github.com/qwenlm/qwen-code/pull/8883)），连不上时能主动重连对远程开发场景很关键。

---

> 数据来源：GitHub QwenLM/qwen-code（2026-08-11 抓取）

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

## Hermes 社区动态日报 — 2026-08-11

### 1. 今日速览

今日社区动态高度活跃，共更新 15 个 Issue 和 50 个 PR。焦点集中在 **Windows 平台更新自锁**（#83569）、**桌面端崩溃与消息状态同步**（#83578/#83583/#83587）以及 **curator 技能管理不可恢复**（#83580）等 P2 级缺陷上。PR 侧则以 **Windows 更新修复**（#83590）、**Cron 作业修复**（#83594）和 **Supermemory 记忆插件系列优化**为主要看点。今日无新版本 Release。

---

### 2. 版本发布

今日无新版本发布。

---

### 3. 社区热点 Issues（10 个）

#### 🔴 3.1 Windows 更新自锁 `cryptography._rust.pyd` — #83569
- **标签**: P2 / Windows / 安装与更新
- **现象**: `hermes update` 在 Windows 上 100% 失败——更新进程自身导入 `cryptography` 并映射 `_rust.pyd`，导致任何相关升级均报 `os error 5`，即使无网关/桌面/REPL 运行。
- **影响**: Windows 用户无法通过 CLI 完成自更新，且无替代方案。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83569

#### 🔴 3.2 子进程凭据继承问题 Campaign EPIC — #83565
- **标签**: 安全 / 需要决策 / 后端进程
- **内容**: 该 EPIC 锚定 #77027，汇总所有“Hermes 可信凭据泄漏到不受信任/模型生成的子进程”的修复 PR 与 Issue。属于安全边界类核心问题，社区关注度高。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83565

#### 🔴 3.3 curator 存档技能不可恢复 — #83580
- **标签**: P2 / 技能管理 / 兼容性风险
- **现象**: `curator restore <name>` 对 LLM 整合流程归档的技能报“not found in archive”，作者反馈 **62 个存档技能中 51 个无法通过 CLI 恢复**，且 `list-archived` 输出不可回填。
- **影响**: 技能数据存在丢失风险，直接影响用户长期积累的技能资产。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83580

#### 🟠 3.4 全息记忆中文混合内容无法搜索 — #83593
- **标签**: P3 / 记忆 / i18n
- **现象**: FTS5 `unicode61` tokenizer 导致包含英文词汇的中文内容（如 `watchdog`、`GitHub`）无法被检索，纯中文查询也失效。
- **影响**: 中文用户的记忆功能基本不可用，i18n 缺口明显。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83593

#### 🟠 3.5 TUI 剪贴板图像监视器循环注入 — #83577
- **标签**: P2 / TUI / 需要复现
- **现象**: 自更新后首次启动 TUI 时，剪贴板图像监视器重复读取 macOS 剪贴板并循环注入到输入框（v0.20.0）；同时 `osascript` 探测可能阻塞网关主线程。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83577

#### 🟠 3.6 桌面端在 Wayland + amdgpu 下 GPU 进程崩溃 — #83578
- **标签**: P3 / 桌面端 / 需要复现
- **现象**: 原生 Wayland + AMD GPU 环境下 `hermes desktop` 数秒内崩溃（`error_code=1002`），根因为未显式启用 `--ozone-platform=wayland`，错误回退到 XWayland。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83578

#### 🟠 3.7 Windows 桌面后端因父进程死亡看门狗误报自退出 — #83583
- **标签**: P2 / Windows / 桌面端
- **现象**: Electron 拉起的 `hermes serve` 几乎每次启动立即以 code 0 退出，桌面端误判为崩溃并循环修复重装。疑似看门狗 PID 比对逻辑（而非身份验证）存在误报。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83583

#### 🟠 3.8 辅助标题生成忽略“使用主模型”设置 — #83588
- **标签**: P3 / 插件 / 配置
- **现象**: UI 暴露“auto / use main model”设置，但 `title_generation` 被 `_FAST_MODEL_TASKS` 硬切换，用户选择被忽略。opencode-zen/go 插件硬编码 `default_aux_model=gemini-3-flash`，导致标题质量差。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83588

#### 🟡 3.9 Cron 任务字面 `auto` 模型/提供商引脚透传 — #83596
- **标签**: P3 / Cron
- **现象**: 通过 `cronjob action=create model=auto provider=auto` 创建的任务，将字面量 `"auto"` 直接发送到供应商 API，而非执行默认模型解析，导致请求被拒绝。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83596

#### 🟡 3.10 npm audit 报告 8 个构建依赖漏洞 — #83586
- **标签**: P3 / 安全 / 桌面端
- **内容**: `npm audit fix` 报告 8 个未解决漏洞（3 moderate / 5 high），涉及 dompurify、mermaid、js-yaml、nanoid、undici；`--force` 因版本冲突失败。
- **影响**: 构建链安全风险，需人工介入升级策略。
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83586

---

### 4. 重要 PR 进展（10 个）

#### 🔧 4.1 修复 Windows 更新自锁 + 修复 uv 管理 venv — #83590
- **修复**: #83569 的根因——自更新进程排除逻辑导致自锁无法检测；同时修复 uv 管理的虚拟环境在 Windows git 检出上的损坏恢复。
- **标签**: P1 / Windows / 安装与更新
- **链接**: https://github.com/NousResearch/hermes-agent/pull/83590

#### 🔧 4.2 Cron 作业应用层缺陷修复 — #83594
- **修复**: 三个应用层 bug，包括 `skills-index-freshness.yml` 缺少 `actions/checkout` 导致看门狗崩溃、字面 `auto` 模型引脚透传、以及另一项未具名 RCA 修复。
- **标签**: P2 / Cron / 自动化
- **链接**: https://github.com/NousResearch/hermes-agent/pull/83594

#### 🔧 4.3 更新时同时重启 `hermes-serve` systemd 单元 — #83595
- **修复**: #83438。`hermes update` 之前只重启 `hermes-gateway*` 和 dashboard，现补上桌面后端依赖的 `hermes-serve*` 单元，避免更新后旧代码持续运行。
- **链接**: https://github.com/NousResearch/hermes-agent/pull/83595

#### 🔧 4.4 桌面 Messaging 请求作用域限定到活动配置文件 — #83591
- **修复**: 将 Desktop Messaging 的读、更新、测试请求限定到当前活动 profile，并补充回归测试；共享远程后端刷新限制另在 #83587 跟踪。
- **标签**: P3 / 桌面端 / 配置
- **链接**: https://github.com/NousResearch/hermes-agent/pull/83591

#### 🔧 4.5 阻止不可读的受管 Node 目录进入 PATH — #83589
- **修复**: `with_hermes_node_path()` 和 `_managed_runtime_path_entries()` 仅用 `is_dir()` 判断，导致 ACL 拒绝遍历的目录被加入 PATH，引发连锁错误。
- **标签**: P2 / Windows / 兼容性
- **链接**: https://github.com/NousResearch/hermes-agent/pull/83589

#### 🔧 4.6 技能指令在 agent 忙碌时静默排队 — #83538
- **修复**: #83209。带指令的技能命令（如 `/my-skill review this PR`）在 agent 运行时被打入 `_pending_input`，用户零反馈，重发还会造成 N 份副本。现在补上明确的入队反馈。
- **标签**: P2 / CLI / 技能
- **链接**: https://github.com/NousResearch/hermes-agent/pull/83538

#### 🔧 4.7 kimi 凭据池 stale base_url 重新解析 — #83537
- **修复**: #5908。早期写入的 `kimi-coding` / `kimi-coding-cn` 凭据池条目保留 Moonshot 默认 base_url，导致 `sk-kimi-` 密钥被 401 拒绝。现在加载时重新解析前缀 URL。
- **标签**: P2 / 认证 / 兼容性
- **链接**: https://github.com/NousResearch/hermes-agent/pull/83537

#### ⭐ 4.8 新增 private no-store 无痕 Agent 模式 — #83570
- **功能**: 构造期启用 `private_no_store=True` 即可强制内存-only 运行：禁用会话 DB/JSON 快照、轨迹/请求转储、检查点、工具、记忆、第三方上下文引擎、生命周期钩子、外部记忆同步及后台审查。
- **标签**: P3 / 新功能 / 会话
- **链接**: https://github.com/NousResearch/hermes-agent/pull/83570

#### 🔧 4.9 Supermemory：按支撑文档遗忘混合搜索结果 — #59827
- **修复**: `forget_by_query` 收到的混合搜索生成 `id` 不被 `memories.forget` 接受；现改用 `documents[0].id` 作为权威回退，并兼容文本位于 `chunk` 而非 `memory` 的数据结构。
- **标签**: P3 / 记忆插件
- **链接**: https://github.com/NousResearch/hermes-agent/pull/59827

#### ⭐ 4.10 桌面端新会话头部显示目标项目 — #70505
- **功能**: 新会话草稿的标题栏展示目标项目；使用与 `session.create` 相同的 profile 解析规则（含切换中状态）；只接受属于草稿 profile 的项目树，拒绝迟到响应。
- **标签**: P3 / 桌面端 / 会话
- **链接**: https://github.com/NousResearch/hermes-agent/pull/70505

---

### 5. 功能需求趋势

从今日 Issue 与 PR 中可提炼出社区最关注的功能方向：

1. **记忆系统深化**（Supermemory）
   - 多项 PR 围绕记忆插件展开：按文档删除（#59827）、生命周期 flush 尊重 `auto_capture`（#78656）、额度耗尽安全提示（#78825）、自动召回节流（#78835）。记忆正成为 Hermes 的核心差异化能力，社区投入显著。

2. **隐私与安全默认值**
   - `private_no_store` 无痕模式（#83570）和子进程凭据继承 EPIC（#83565）体现用户对敏感信息隔离的强烈诉求，安全边界预计成为后续版本重点。

3. **跨平台稳定性**（Windows / Wayland）
   - 多个 P2 缺陷集中在 Windows 更新链路（#83569）和桌面后端生命周期（#83583）；Wayland 原生支持（#83578）也成为 Linux 桌面用户的高频诉求。

4. **个性化控制**
   - 用户希望每个生成环节（如标题生成）都能遵循“主模型”偏好（#83588），而非被插件硬编码覆盖——“统一设置 + 插件可覆盖”的模式需要更严格分层。

5. **可观测性与诊断**
   - `curator adopt --dry-run` 应真实反映已管理状态（#83573）、CLI 终端标题可识别（#83592）等小改进，反映用户对可诊断性和操作反馈的需求上升。

---

### 6. 开发者关注点

汇总开发者反馈中的痛点与高频需求：

- **Windows 更新链路脆裂**：`hermes update` 在 Windows 上因更新进程自身映射 `.pyd` 锁定而失败（#83569），且旧版代码无任何规避提示。开发者期待更新器使用裸进程或延迟导入策略。
- **技能数据资产不可逆**：curator 归档后无法通过官方 CLI 路径恢复（#83580），51/62 的失败率令开发者担忧自动整合流程的安全性，建议 dry-run 与 restore 命令补充真实状态查询。
- **静默失败类 bug 集中**：Langfuse SDK 占位 key 无报错（#60961）、技能指令入队无反馈（#83538 / #83209）、cron 把字面 `auto` 透传上线（#83596）——开发者普遍要求“失败也要可见”。
- **中文/多语言搜索短板**：FTS5 `unicode61` tokenizer 导致中文混合内容完全不可搜（#83593），i18n 分词器（如 trigram / ICU）呼声上升。
- **桌面端生命周期管理**：看门狗 PID 误报（#83583）与更新后 systemd 单元不重启（#83595）组合出现，提示桌面后端与 CLI 更新流程的集成深度不足。
- **依赖安全治理滞后**：npm audit 报告 8 个高危/中危漏洞且 `--force` 被依赖约束阻断（#83586），开发者希望 CI 门禁能提供更细粒度升级路径，而非一刀切 force。

---

> 本日报由 Hermes 社区数据自动生成，覆盖 2026-08-11 全天 GitHub 动态。所有链接均可点击跳转至对应 Issue/PR。

</details>
