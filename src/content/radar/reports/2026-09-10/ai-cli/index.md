---
title: "AI CLI 工具社区动态日报"
published: 2026-09-10
report: "ai-cli"
tags:
  - radar
---
# AI CLI 工具社区动态日报 2026-09-10

> 生成时间: 2026-09-10 00:44 UTC | 覆盖工具: 7 个

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

**AI CLI 工具生态横向对比分析**
*2026‑09‑10*

---

### 1. 生态全景
当前 AI CLI 市场正经历 **高速功能扩展与稳定性修复并行** 的阶段。各大工具均在推动插件/钩子系统（Claude Code、OpenCode）、实验性工作流（OpenAI Codex 工作区、Gemini 子代理）和安全加固（提示注入防护、沙盒边界）方面加速。同时，**跨平台（尤其是 Windows）桌面应用回归问题** 和**会话/状态持久化**已成为普遍关注点，反映出用户对生产环境可靠性的更高期待。

---

### 2. 各工具活跃度对比

| 工具 | 今日 Issues 数 | 今日 PR 数 | 今日 Release 数 |
|------|--------------|------------|----------------|
| **Claude Code** | **15** | **2** | **1** (v2.1.267) |
| **OpenAI Codex** | **10** | **10** | **4** (rust‑v0.154.0 等) |
| **Gemini CLI** | **10** | **10** | **1** (v0.61.0‑nightly) |
| **DeepSeek Reasonix** | **10** | **10** | **1** (v1.38.3) |
| **OpenCode** | **10** | **10** | **1** (v1.18.30) |
| **Deepseek Harness** | **0** | **0** | **1** (dsh‑v0.1.5‑alpha.2) |
| **Hermes** | **11** | **10** | **0** |

*注：Issues/PRs 计数基于今日摘要中明确提及的项目；Release 计数包括稳定版和预发布版本。*

---

### 3. 共同关注的功能方向

| 功能方向 | 关注工具 | 具体诉求 |
|--------------|----------------|------------------|
| **Windows 平台稳定性** | Claude Code、OpenAI Codex、DeepSeek Reasonix、Hermes | Cowork 沙盒故障、宠物 UI 点击透传/拖拽失败、read‑evidence 拦截、transcript 抖动、YouTube 嵌入播放错误等。 |
| **macOS 特定问题** | Claude Code、OpenAI Codex、Gemini CLI | 认证令牌丢失、UI 滑块无响应、浏览器代理崩溃、远程控制状态失败。 |
| **会话与状态管理** | Claude Code、OpenAI Codex、Gemini CLI、OpenCode | 会话解档、视图模式持久化、事件日志无限制增长、Goal 模式轮次回收、子代理状态报告错误。 |
| **插件/钩子系统增强** | Claude Code、OpenCode | Function Hooks 增强计划、插件验证工具、技能索引过期、MCP 服务器集成。 |
| **模型支持与集成** | Claude Code、OpenAI Codex、DeepSeek Reasonix、OpenCode | GPT‑6 “Astra”、deepseek‑v4.1‑flash、Mantle GPT‑OSS、Bedrock DeepSeek 模型 ID 保留、模型版本排序。 |
| **安全与沙盒强化** | Gemini CLI、OpenCode、Hermes | 提示注入防护、沙盒边界隔离、MCP `allowed_tools` 生效、approvals 安全上下文。 |
| **UI/UX 优化** | OpenCode、Hermes、DeepSeek Reasonix | 自动权限开关 bug、PWA Android 白条、桌面端 UI 卡顿、滚动恢复、技能文档预览。 |
| **远程控制与移动端支持** | OpenAI Codex、OpenCode | 跨平台远程连接失败、移动端主机显示、远程 MCP 作用域提取异常。 |

---

### 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|--------------|------------|------------------|
| **Claude Code** | 企业级插件生态、系统提示快照、供应商统一配置 | 构建复杂 AI 工作流的开发者/团队 | Rust + 云后端（Bedrock/Vertex/Foundry） |
| **OpenAI Codex** | 代码仓库导航、实验性工作区、宠物式 UI、远程控制 | 终端开发者、Git 工作流用户 | Rust，深度集成 Git 和终端仿真 |
| **Gemini CLI** | 代理驱动工作流、安全沙盒、文件处理（AST、BOM） | 需要强安全保障的代理用户 | Go，强调运行时安全和代理编排 |
| **DeepSeek Reasonix** | YOLO 模式快速操作、模型特定优化（deepseek-*）、桌面端浮动启动器 | 偏好一键式交互的终端用户 | Electron 桌面应用 + 后端 Reasonix 服务 |
| **OpenCode** | PWA 支持、桌面端 UI、技能/插件目录、会话成本可视化 | 跨端一致的 IDE 风格用户 | TypeScript + Electron，强调 UI 一致性 |
| **Deepseek Harness** | 文件预览、会话级交付、便捷反馈命令 | 需要快速文件查看和协作的模型团队 | 轻量级 CLI + 前端侧边栏 |
| **Hermes** | Kanban 任务编排、集体智慧代理、MCP 集成 | 复杂任务分解和团队协作用户 | Rust，专注于任务派发和工作流编排 |

---

### 5. 社区热度与成熟度

| 成熟度指标 | 高分工具 | 原因 |
|-------------------|--------------|-----|
| **社区活跃度** | Claude Code（15 个 Issues） | 广泛的 Windows/macOS 平台反馈，插件生态讨论热烈。 |
| **迭代频率** | DeepSeek Reasonix、OpenCode、Hermes | 每周发布多个 PR，显示快速开发周期和持续功能补充。 |
| **发布成熟度** | Claude Code、Gemini CLI、DeepSeek Reasonix、OpenCode | 每月至少 1 个稳定版本，版本号递增，功能逐步稳定。 |
| **生态广度** | OpenAI Codex、Gemini CLI | 丰富的 PR 数量和多维功能（工作区、代理、MCP、UI），表明生态系统正在扩展。 |

---

### 6. 值得关注的趋势信号

| 趋势 | 体现工具 | 对开发者的参考价值 |
|-------|-------------------|--------------------------------|
| **跨平台桌面应用回归修复** | 全部 Windows/macOS 工具 | 优先修复沙盒、UI 事件处理和认证流程，以减少用户流失。 |
| **插件/钩子系统标准化** | Claude Code、OpenCode | 设计统一的验证和调试工具可降低插件开发门槛，加速生态繁荣。 |
| **会话状态持久化与压缩** | OpenAI Codex、Gemini CLI、OpenCode | 实现可靠的会话存档和压缩逻辑可直接提升用户工作连续性。 |
| **安全加固（提示注入、沙盒逃逸）** | Gemini CLI、OpenCode、Hermes | 主动安全设计正成为市场竞争点；尽早融入安全审查可降低后期修复成本。 |
| **模型集成自动化** | Claude Code、OpenAI Codex、DeepSeek Reasonix | 统一的模型发现和版本排序逻辑可减少用户在新模型上的学习成本。 |
| **PWA 与桌面端融合** | OpenCode、OpenAI Codex | 提供一致的离线体验和系统集成功能正成为用户期望。 |
| **MCP 集成与代理协同** | Hermes、OpenCode、Gemini CLI | 将 MCP 服务器与代理工作流无缝结合将成为未来代理系统的核心能力。 |

**总结：** 当前 AI CLI 市场正从功能扩展转向 **质量稳定和生态健康**。开发者应关注跨平台稳定性、插件安全、会话持久化和模型集成等领域，这些是用户体验提升的关键因素，也是未来竞争的制高点。

---

## 各工具详细报告

:::details{title="Claude Code" repo="anthropics/claude-code"}

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

## 1. 热门 Skills 排行

**1. 安全与信任验证**
- **技能质量分析器与安全分析器** (#83) - 评估技能的结构、文档、功能和安全维度
- **社区安全风险** (#492) - 社区技能冒充官方技能导致信任边界滥用，43 条评论
- **链接**: https://github.com/anthropics/skills/pull/83, https://github.com/anthropics/skills/issues/492

**2. 工作流自动化与多代理协作**
- **Hivemind: 零成本多代理编排技能** (#1628) - 让 Claude Code 委托机械工作给免费模型的 headless opencode 工人
- **Buffer API Agent 技能** (#1627) - 社交媒体排期的 GraphQL 自动化工具
- **SCNet HPC 技能** (#1615) - 基于 SSH 和 Slurm 的高性能计算集群操作
- **链接**: https://github.com/anthropics/skills/pull/1628, https://github.com/anthropics/skills/pull/1627, https://github.com/anthropics/skills/pull/1615

**3. 文档与内容处理**
- **文档排版技能** (#514) - 控制 AI 生成文档中的孤行、孤句和编号对齐问题
- **ODT 技能** (#486) - OpenDocument 文本创建、模板填充和 HTML 转换
- **DOCX 技能修复** (#541, #538) - 解决文档注释 ID 冲突和大小写敏感文件引用问题
- **链接**: https://github.com/anthropics/skills/pull/514, https://github.com/anthropics/skills/pull/486, https://github.com/anthropics/skills/pull/541, https://github.com/anthropics/skills/pull/538

**4. 开发工具与质量保证**
- **自我审计技能** (#1367) - 机械验证 + 四维推理质量门控（v1.3.0）
- **测试模式技能** (#723) - 完整的测试栈：哲学、单元测试、组件测试、集成测试
- **技能创建器修复** (#1298, #1099, #1050) - Windows 兼容性和评估脚本问题
- **链接**: https://github.com/anthropics/skills/pull/1367, https://github.com/anthropics/skills/pull/723, https://github.com/anthropics/skills/pull/1298, https://github.com/anthropics/skills/pull/1099, https://github.com/anthropics/skills/pull/1050

**5. 模型与 API 管理**
- **Claude API 技能更新** (#1607) - 标记四种已废弃模型 ID
- **MCP Builder 评估更新** (#1724) - 默认模型更新为 claude-sonnet-5
- **链接**: https://github.com/anthropics/skills/pull/1607, https://github.com/anthropics/skills/pull/1724

## 2. 社区需求趋势

**A. 安全与治理优先**
- 社区强烈关注技能验证和信任边界 (#492, 43 条评论)
- 对技能质量分析和安全分析的需求迫切 (#83)
- 对代理治理模式的提案 (#412) 表明对安全模式的需求

**B. 协作与组织工作流**
- 对组织范围技能共享的需求 (#228, 16 条评论)
- 对多代理编排和协作的需求 (#1628, #1327)
- 对工作流自动化的持续兴趣 (Buffer API, SCNet HPC)

**C. 文档与内容质量**
- 对文档排版控制的需求 (#514) 表明对内容质量的关注
- 对 Office 文档处理的一致性需求 (ODT, DOCX 修复)
- 对前端设计清晰度和可操作性的关注 (#210)

**D. 测试与质量保证**
- 对测试模式的全面关注 (#723)
- 对自我审计和质量门控的需求 (#1367)
- 对技能创建器工具的可靠性关注 (Windows 问题修复)

## 3. 高潜力待合并 Skills

**A. 即将合并的热门技能**
1. **自我审计技能** (#1367) - 机械验证 + 四维推理质量门控，已发布 v1.3.0
2. **Hivemind 多代理技能** (#1628) - 零成本代理编排，社区热议
3. **Buffer API 技能** (#1627) - 社交媒体自动化，功能全面
4. **测试模式技能** (#723) - 完整的测试栈覆盖所有阶段

**B. 待解决的技术债务**
1. **run_eval.py 触发问题** (#556, #1298) - 技能评估核心功能故障，12+ 条评论和独立复现
2. **Windows 兼容性问题** (#1099, #1050) - 技能创建器在 Windows 上的崩溃
3. **MCP Builder 评估问题** (#1390) - 评估 harness 对真实 MCP 服务器的错误处理

## 4. Skills 生态洞察

**社区当前核心诉求：构建可信赖、高质量的自动化工作流生态系统** - 安全验证、多代理协作和文档处理技能主导社区关注，表明用户希望 Skills 不仅功能强大，而且安全可靠，内容质量高，同时支持复杂的工作流编排和组织级协作。

---

# Claude Code 社区动态日报
**2026-09-10**

## 1. 今日速览
Anthropic 发布了 v2.1.267 版本，新增了 `maxEffortLevel` 设置和系统提示快照控制功能。同时，Function Hooks 增强计划引发了高度关注，社区就 Windows 平台多项 Cowork 沙盒问题展开了激烈讨论。

## 2. 版本发布

### v2.1.267 发布
- **新增 `maxEffortLevel` 设置**：可全局或按模型配置，限制 Bedrock、Vertex 和 Foundry 等所有供应商的努力级别，用户仍可选择更低级别
- **新增 `--system-prompt-snapshot off` 选项**：每次请求时重新渲染系统提示

## 3. 社区热点 Issues

### 3.1 Function Hooks 增强计划 (#91870)
**为什么重要**：这是插件系统的一次重大升级，旨在将插件功能提升 10 倍，标志着 Claude Code 向更强大的插件生态系统迈进
**社区反应**：154 条评论，90 个点赞，显示极高关注度，开发者热切期待这一功能

### 3.2 Windows 平台 Cowork 沙盒问题 (#92958, #92984, #92977, #93071, #93233)
**为什么重要**：多项 Windows 更新导致 Plan9 共享、沙盒挂载和工作文件夹功能失效，影响大量 Windows 用户
**社区反应**：多个问题报告，尽管点赞数不高，但显示了广泛的用户影响

### 3.3 会话管理功能 (#30869, #76577)
**为什么重要**：用户希望桌面应用支持会话解档和视图模式持久化，这关系到用户体验和数据管理
**社区反应**：#30869 获得 61 个点赞，显示强烈需求

### 3.4 macOS 平台问题 (#64568, #88583, #91495, #93219)
**为什么重要**：涉及认证、UI 交互和权限控制等核心功能，影响 macOS 用户的使用体验
**社区反应**：多个问题并存，显示平台特定的挑战

### 3.5 模型和技能问题 (#92007, #92436, #93229)
**为什么重要**：影响用户模型选择和技能使用效率的核心功能问题
**社区反应**：#92007 获得 6 个点赞，显示模型问题备受关注

## 4. 重要 PR 进展

### 4.1 validate-agent.sh 修复 (#89404)
**内容**：修复插件开发技能的验证脚本问题，解决了 `set -euo pipefail` 交互导致的误报问题
**影响**：使验证脚本不会在遇到警告时立即中止，提高了插件开发体验

### 4.2 模块化插件系统 (#93215)
**内容**：新增三个内置钩子模块插件：sec-default（组织默认 outermost 插件）、diff（`/diff` 命令）、telemetry（`$.telemetry`），均为源代码形式发布
**状态**：已合并，提供功能钩子早期访问功能

## 5. 功能需求趋势

### 5.1 平台兼容性增强
- Windows 平台问题频发，用户希望更稳定的 Cowork 沙盒和 Plan9 共享功能
- macOS 平台需要更好的认证和权限管理

### 5.2 会话和持久化功能
- 会话解档和视图模式持久化需求强烈
- 移动端应用需要更好的会话管理和恢复功能

### 5.3 插件和钩子系统增强
- Function Hooks 增强计划引发广泛关注
- 需要更好的插件验证和调试工具

### 5.4 模型和技能优化
- 用户希望更灵活的模型选择和默认模型设置
- 技能级别的努力控制需要更精确的实现

## 6. 开发者关注点

### 6.1 Windows 平台稳定性问题
- 多项 Windows 更新导致沙盒和共享功能失效，急需修复
- 设备_bash 进程异常终止，影响开发体验

### 6.2 UI/UX 交互问题
- macOS 桌面应用努力滑块无响应
- `/btw` 模式下 Esc 键行为异常
-  goal 循环检测失败导致重复调用

### 6.3 认证和权限管理
- macOS 认证令牌因并发问题丢失
- 浏览器权限设置未生效
- OAuth 重定向 URI 配置错误

### 6.4 移动端和远程控制
- 移动端应用需要更好的会话管理和远程控制功能
- 用户希望从手机端直接启动机器上的新会话

### 6.5 文档和生态系统支持
- 需要文档化 `CLAUDE_SECURESTORAGE_CONFIG_DIR` 等环境变量
- 插件开发工具需要更好的支持和验证

本日报显示，Claude Code 社区在 Windows 平台稳定性、macOS 特定问题、插件系统增强和移动端功能方面关注度最高。开发者们迫切希望解决这些痛点，以获得更流畅的使用体验。

:::

:::details{title="OpenAI Codex" repo="openai/codex"}

**OpenAI Codex 社区动态日报 (2026-09-10)**

---

### 1. 今日速览
- **GPT-6-Astra** 正式登陆模型选择器和 Amazon Bedrock 目录，扩展了用户可选模型范围。
- **实验性工作区功能**（`--worktree`/`/worktree`）发布，允许创建隔离的检出会话并支持浏览/恢复。
- Windows 版 Codex 应用遭遇多起 UI 和远程控制 bug，导致宠物无法拖拽、Composer 卡死、远程连接失败等，引发社区高度关注。

---

### 2. 版本发布
| 版本 | 更新内容 |
|------|------------|
| **rust-v0.154.0** | 新增 GPT-6-Astra 模型支持、实验性工作区功能（`--worktree`/`/worktree`）。 |
| **rust-v0.154.0-alpha.6.1 / -alpha.11 / -alpha.10.2** | 预发布补丁，修复相关 Rust 依赖问题。 |

*GitHub 标签: [releases](https://github.com/openai/codex/releases)*

---

### 3. 社区热点 Issues (按讨论热度排序)

| # | 标题 | 为什么重要 | 社区反应 |
|---|-------|----------------|--------------|
| **#28756** | `[bug] unexpected 404` 后台 API 异常 | 影响 Codex 应用核心会话建立流程，用户报告频繁失败。 | **1123 条评论 / 83 👍**，讨论持续不断。 |
| **#41465** | `[bug] Windows 宠物无法拖拽` | Windows 用户普遍遇到的 UI 交互问题，影响使用体验。 | **25 条评论 / 41 👍**，截图比对普遍。 |
| **#29343** | `[bug] 浏览器插件无法与特定站点交互` | 插件权限沙盒问题，制约了计算机使用功能。 | **22 条评论 / 9 👍**，用户分享排除步骤。 |
| **#41501** | `[bug] Windows 宠物点击区域丢失` | 拖拽后 hit-region 失效，导致宠物完全不可用。 | **16 条评论**，用户反馈一致。 |
| **#15643** | `[bug] Remote MCP scopes_supported 提取异常` | 认证流程漏洞，可能导致权限扩大。 | **10 条评论 / 17 👍**，安全社区关注。 |
| **#35351** | `[bug] macOS 远程控制状态更新失败` | “Control this Mac” 启用后无法正常工作。 | **9 条评论**，用户寻求官方修复。 |
| **#41986** | `[bug] Windows 任务历史记录丢失` | 滚动更新导致持久化数据丢失，影响工作连续性。 | **9 条评论 / 1 👍**，用户表示数据不可恢复。 |
| **#36953** | `[bug] 浏览器权限删除后仍生效` | 权限管理逻辑有缺陷，导致用户无法正常访问站点。 | **7 条评论 / 3 👍**，用户提供具体域名。 |
| **#44035** | `[bug] Windows 历史记录同步异常` | 客户端与服务端读线程状态不同步，新消息无法显示。 | **5 条评论**，用户报告版本 26.901.6511.0。 |
| **#42945** | `[bug] Windows 宠物重启后点击透传` | 跨进程事件传递机制有缺陷，影响所有宠物（内置及自定义）。 | **5 条评论**，用户截图对比。 |

*所有链接: https://github.com/openai/codex/issues*

---

### 4. 重要 PR 进展 (已合并)

| # | 标题 | 核心改进 |
|---|-------|--------------|
| **#44350** | *添加线程附件操作及协调删除* | 附件变更与线程删除联动，避免残留元数据，提供幂等化创建/分页列表接口。 |
| **#44349** | *区分分叉会话的启动钩子* | 分叉线程不再重复执行 `startup` 钩子，恢复时正确标记为 `resume`。 |
| **#44346** | *MCP 工具延续中的原生验证支持* | 路由 OpenAI 表单和原生用户验证到 MCP 2026-07-28 输入协议，填补自定义方法空白。 |
| **#44344** | *通过右键在 agents 概览中打开任务* | 保留编辑器按键绑定，防止输入挂起和离线状态，修复共享服务器归档后 TUI 退出问题。 |
| **#44341** | *将远程控制会话绑定到认证所有者* | 隔离跨用户状态，令牌刷新时保持同一身份的实时中继连接。 |
| **#44337** | *共享服务器归档后返回命令中心* | 本地/远程归档时保留 TUI 运行状态，避免任务访问中断。 |
| **#44336** | *执行工具调用时添加有限元数据支持* | 主机记录 `tool_result_metadata` 快照，带尺寸限制和脱敏处理，防止反序列化攻击。 |
| **#44332** | *在线程设置中持久化禁用插件 ID* | 禁用插件列表随线程状态保存，重启后自动恢复。 |
| **#44331** | *将语音对话功能移入实验品类* | 标记 `realtime_conversation` 为实验功能，默认禁用，提供启用公告。 |
| **#44325** | *上传响应中返回提示哈希* | 响应体新增 `promptHash`，方便客户端校验会话指令的白影子化 SHA-256 值。 |

*PR 链接: https://github.com/openai/codex/pull*

---

### 5. 功能需求趋势 (基于 Issues 提炼)

| 趋势方向 | 体现问题 |
|------------|-------------------|
| **Windows 应用稳定性** | 宠物 UI 点击透传/拖拽失败、Composer 卡死、历史记录丢失、权限删除后仍生效。 |
| **跨平台远程控制可靠性** | macOS/Windows/Linux 远程控制配对成功后连接失败、WebSocket 503、认证 incomplete、移动端无法显示主机。 |
| **沙盒权限精细化管理** | Windows 沙盒 `:root` 拒绝策略失效、MCP scopes_supported 提取异常、Full Access 下“Never ask” 误判。 |
| **CLI 输出格式优化** | 表格布局在终端调整大小时错位、列对齐丢失、换行 unpredictable。 |
| **速率限制透明度** | 每周限额无故从 90% 骤降至 0%，用户无法追溯原因。 |
| **多代理与会话管理** | 分叉会话启动钩子重复、已完成代理驻留导致无法替换、SessionStart 上下文重复。 |
| **插件/扩展生态完善** | 浏览器插件与特定站点交互失败、计算机使用插件权限异常、禁用插件状态持久化请求。 |
| **新模型与实验功能** | GPT-6-Astra 可用性、语音对话实验功能需显式启用、worktree 支持进入实验阶段。 |

---

### 6. 开发者关注点 (高频痛点)

1. **Windows 宠物 UI 交互** – 点击透传、拖拽失效、hit-region 丢失，重启后问题复现，影响日常使用流畅度。
2. **远程控制连接故障** – 配对成功后 WebSocket 握手 503、认证 incomplete 错误、移动端无法显示主机，跨平台普遍。
3. **沙盒权限配置误导** – `:root` 拒绝策略在 Windows 高权限沙盒下仍可读取，MCP scopes 读取异常，Full Access 下“Never ask” 实际仍弹窗。
4. **CLI 终端输出不稳定** – 表格布局在调整窗口大小时错位，列对齐丢失，影响阅读体验。
5. **速率限制不可预测** – 订阅额度无故突降，用户无法获取具体配额明细及异常原因。
6. **会话状态丢失** – Windows 任务历史记录因滚动更新导致持久化数据丢失，macOS 远程控制状态更新失败。
7. **Composer 响应卡顿** – 特定版本下 Composer 完全无响应，需重启应用才能恢复。
8. **多代理任务管理** – 已完成代理驻留导致后续任务无法生成，启动钩子在分叉时重复执行。

*社区呼声强烈，需优先修复以提升用户满意度。*

---

**数据来源:** GitHub `openai/codex` 仓库 (Issues & PRs 更新截止 2026-09-10)。

:::

:::details{title="Gemini CLI" repo="google-gemini/gemini-cli"}

**Gemini CLI 社区动态日报**  
*日期：2026-09-10*

---

### 1. 今日速览
- 发布了一个新的 nightly 版本（v0.61.0-nightly.20260909.ged2ac40df），修复了 NTFS 短文件名路径处理和沙盒设置隔离问题。
- 社区热点集中在代理稳定性、安全加固和文件处理 bug 上，包括代理无限挂起、子代理恢复逻辑错误、浏览器代理在 Wayland 下崩溃等。
- 一批安全相关 PR 正在推进，涵盖了提示注入防护、沙盒边界强化、Git 仓库认证崩溃防护等。

---

### 2. 版本发布
**v0.61.0-nightly.20260909.ged2ac40df** – 核心修复：
- **fix(core)** – 缓解 NTFS 8.3 短文件名（SFN）路径问题（PR #29116）。
- **fix(cli)** – 在沙盒容器内隔离设置目录（PR #29216）。
- 其他内部修复（详见提交记录）。

---

### 3. 社区热点 Issues（按关注度排序）

| # | 标题 | 重要性 | 社区反应 |
|---|-------|--------------|--------------|
| **22323** | 子代理在达到 MAX_TURNS 后仍报告“GOAL”成功，导致中断隐藏 | 代理状态报告严重失真，可能导致任务被错误标记为完成 | 13 条评论，2 个点赞 |
| **21409** | 通用代理无限挂起 | 直接影响用户体验，简单任务（如创建文件夹）都会卡死 | 8 条评论，**8 个点赞** |
| **25166** |  shell 命令执行完成后卡在“等待输入”状态 | 破坏了 shell 工具的正常使用，反复出现 | 4 条评论，**3 个点赞** |
| **21983** | 浏览器代理在 Wayland 下崩溃 | 影响 Linux 用户的使用，代理无法正常工作 | 4 条评论，1 个点赞 |
| **22186** | get-shit-done 输出钩子导致崩溃 | 影响特定工作流的稳定性，出现服务端错误 | 3 条评论 |
| **20079** | `~/.gemini/agents/filename.md` 是符号链接时不被识别为代理 | 限制了代理文件的灵活管理 | 4 条评论 |
| **22745** | 评估 AST 感知文件读取、搜索和映射的影响 | 潜在的高效代码导航功能，但需验证实际价值 | 7 条评论，1 个点赞 |
| **22598** | 子代理轨迹应通过 `/chat share` 可见 | 提升调试和评估能力 | 2 条评论，1 个点赞 |
| **18836** | 替换 WriteToDo 为持久化的文件级任务跟踪（CRUD） | 解决上下文丢失和 token 浪费问题 | 3 条评论 |
| **21335** | `/compress` 命令不持久化保存到会话文件 | 压缩历史记录后重启会话失效 | 2 条评论，**2 个点赞** |

*链接：* https://github.com/google-gemini/gemini-cli/issues/22323 等（点击编号访问）。

---

### 4. 重要 PR 进展

| # | 标题 | 类别 | 主要修复/功能 |
|---|-------|----------|-------------------|
| **29250** | 防止通过构建文件修改和未信任的标志进行间接提示注入 | 安全（core） | 重构了 shell、edit、write_file 等内置执行路径，强化了受限工作区的边界验证。 |
| **29214** | 强化沙盒文件系统边界，隔离运行时状态 | 安全（sandbox） | 用已清理的配置替换主机目录挂载，统一 realpath 解析逻辑，降低逃逸风险。 |
| **29265** | 防止因中断（SIGINT/超时）导致会话上下文污染 | 代理（p2） | 修复了主动代理流被中断后破坏聊天历史的问题，确保后续提示能正常执行。 |
| **29248** | 避免确认操作后出现重复的历史记录和遥测数据 | 核心（cli） | 抑制了确认操作期间新消息插入时的重复历史记录和遥测记录。 |
| **29163** | 防止在 Git 仓库内启动时因认证导致崩溃 | 安全（cli） | 修复了在 macOS Seatbelt 等受限权限环境下，`useGitBranchName` 钩子因 `.git` 访问权限问题导致 CLI 崩溃。 |
| **29156** | 停止在 shell 执行时清空用户 Git 配置 | 核心 | 恢复了用户的全局和系统 Git 配置，使 `user.name`、`user.email` 等信息在 shell 工具中可见。 |
| **29155** | 正确解码 BOM 编码文件内容（isEmpty 方法） | 核心 | 修复了 UTF-16/UTF-32 编码的空计划文件被误判为非空的 bug。 |
| **29151** | 按大小写不敏感处理技能优先级和激活状态 | 代理（p1） | 修复了 SkillManager 中大小写相关的技能覆盖和激活跟踪 bug。 |
| **29088** | 解决 VS Code 插件伴生进程在 MCP 流打开时无法停止 | 核心（vscode-ide-companion） | 避免了 `IdeServer.stop()` 因长时流导致永久挂起的问题。 |
| **29087** | 防止两个进程同时安装/更新同一扩展 | 扩展 | 使用 `proper-lockfile` 协调扩展安装，避免文件拷贝和元数据写入冲突。 |

*链接：* https://github.com/google-gemini/gemini-cli/pull/29250 等（点击编号访问）。

---

### 5. 功能需求趋势

1. **代理稳定性和可靠性** – 代理无限挂起、子代理状态报告错误、浏览器代理崩溃等 bug 占比较高，表明社区迫切需要更健壮的代理行为。
2. **安全加固** – 提示注入防护、沙盒边界隔离、Git 仓库认证崩溃防护等安全相关议题频现，反映了对运行时安全性的重视。
3. **文件和代码导航增强** – AST 感知文件读取、BOM 文件处理、符号链接代理识别等，旨在提升文件操作的准确性和性能。
4. **IDE 集成优化** – VS Code 伴生进程的停止处理、MCP 流管理等问题，说明社区对 IDE 工具链的关注度不断提高。
5. **内存和任务跟踪系统** – Auto Memory 的重试逻辑、低信号会话处理、持久化任务跟踪（WriteToDo 替代方案）等，反映了对会话持久化和上下文管理的关注。
6. **子代理管理和可见性** – 子代理轨迹的分享、技能使用不足、子代理上下文在 bug 报告中的缺失等，表明社区希望获得更透明、可控的子代理行为。

---

### 6. 开发者关注点

- **代理行为 bug** 频发：无限挂起、状态报告错误、浏览器代理崩溃等，导致用户体验严重受损。
- **shell 命令处理 bug**：执行完成后卡在“等待输入”状态，影响日常使用。
- **安全相关问题**：提示注入风险、沙盒逃逸可能性、Git 仓库认证崩溃，需立即修复。
- **配置和识别 bug**：符号链接代理文件未识别、BOM 文件处理错误、Git 配置被清空等，影响了工具的灵活使用。
- **持久化问题**：`/compress` 命令不持久化、Auto Memory 的低信号会话无限重试，影响长期会话质量。
- **技能和子代理利用不足**：模型似乎不主动使用自定义技能和子代理，限制了高级工作流的自动化。

*社区期待*：更稳定的代理、更严格的安全控制、更智能的文件处理、更完善的 IDE 集成，以及更透明的子代理管理和任务跟踪能力。

---

*以上就是今日 Gemini CLI 社区动态简报。欢迎关注后续更新，我们将持续跟踪这些议题的进展。*

:::

:::details{title="DeepSeek Reasonix" repo="esengine/DeepSeek-Reasonix"}

**DeepSeek Reasonix 社区动态日报 (2026-09-10)**

---

### 1. 今日速览
- **v1.38.3 正式发布**，包含模型设置持久化、运行时状态一致性、读取证据处理优化及桌面端 UI 修复。
- **Windows 平台 bug 高发**：read‑evidence 守卫意外拦截 bash 命令，compact 操作消耗异常 token，C 盘存储告急。
- **桌面端功能迭代**：新增浮动工作区启动器、硬件加速设置持久化、工具中断持久恢复及远程 Serve 版本同步按钮。
- **模型支持呼声不断**：社区迫切希望接入 deepseek‑v4.1‑flash（到期日 2026‑09‑10）并解决 v4‑flash 循环输出问题。

---

### 2. 版本发布
**Reasonix CLI / Desktop v1.38.3** (稳定版)
- 改进模型设置持久化机制，提升运行时状态一致性。
- 优化读取证据处理逻辑，修复因只读守卫导致的 bash 命令拦截问题。
- 桌面端 UI 优化，修复关闭窗口、布局抖动及技能诊断等 bug。
- 完整更新日志：[English](https://reasonix.io/changelog/v1.38.3/?lang=en) | [网页版](https://reasonix.io/changelog/v1.38.3/)

---

### 3. 社区热点 Issues (共 10 条)

| # | 标题 | 为什么重要 | 社区反应 |
|---|-------|----------------|--------------|
| [#9995](https://github.com/esengine/DeepSeek-Reasonix/issues/9995) | **read‑evidence 守卫在同一轮内持续拦截 bash 写命令**（含只读 git 命令） | Windows 平台 v2 代理用户遇到了文件编辑后无法执行任何 bash 操作的问题，影响日常工作流。 | 3 条评论，1 个点赞 |
| [#10037](https://github.com/esengine/DeepSeek-Reasonix/issues/10037) | **执行 `/compact` 消耗大量 token** | 直接导致用户费用突增，性能问题突出。 | 1 条评论，0 个点赞 |
| [#10004](https://github.com/esengine/DeepSeek-Reasonix/issues/10004) | **deepseek v4 flash 出现循环输出 / “废话连篇”** | 模型行为不稳定，影响用户体验。 | 1 条评论，0 个点赞 |
| [#10031](https://github.com/esengine/DeepSeek-Reasonix/issues/10031) | **图片验证失败导致 HTTP 400 并污染会话** | API 集成用户遇到无效 PNG 文件被拒绝的问题，造成会话状态异常。 | 1 条评论，0 个点赞 |
| [#10036](https://github.com/esengine/DeepSeek-Reasonix/issues/10036) | **桌面端 UI 响应卡顿（longtask 81ms）** | 用户体验下降，尤其在资源有限的机器上。 | 0 条评论，0 个点赞 |
| [#10035](https://github.com/esengine/DeepSeek-Reasonix/issues/10035) | **桌面端更新远端 Serve（版本同步提示 + 更新按钮）** | 现有自动升级逻辑不够透明，用户希望手动触发版本同步。 | 0 条评论，0 个点赞 |
| [#10034](https://github.com/esengine/DeepSeek-Reasonix/issues/10034) | **deepseek‑v4.1‑flash（到期日 2026‑09‑10）何时可以接入？** | 社区迫切需要支持即将到期的实验模型。 | 0 条评论，0 个点赞 |
| [#10030](https://github.com/esengine/DeepSeek-Reasonix/issues/10030) | **模型不可用时切换模型仍导致对话不可用** | Windows 用户在代理环境中遇到模型切换后对话卡住的问题。 | 0 条评论，0 个点赞 |
| [#10023](https://github.com/esengine/DeepSeek-Reasonix/issues/10023) | **todo_write 状态机死锁（指纹去重吞掉状态迁移）** | 目标模式长任务中 auto‑compaction 触发后，模型与宿主状态永久分歧，任务无法推进。 | 0 条评论，0 个点赞 |
| [#10021](https://github.com/esengine/DeepSeek-Reasonix/issues/10021) | **C 盘直冒红（缓存占用过大）** | 存储空间不足影响使用，用户希望优化缓存管理。 | 0 条评论，0 个点赞 |

---

### 4. 重要 PR 进展 (共 10 个)

| # | 标题 | 功能 / 修复简介 |
|---|-------|-------------------|
| [#9491](https://github.com/esengine/DeepSeek-Reasonix/pull/9491) | **YOLO 模式下数字键直接选择模型/提供方/恢复会话行** | 实现“一次性”数字选择，取代原有的过滤行为，提升 CLI 操作效率。 |
| [#9769](https://github.com/esengine/DeepSeek-Reasonix/pull/9769) | **YOLO 模式下自动提交已全部作答的问题批次** | 完成多问批次后，提交页按 Enter 自动提交，跳过额外确认。 |
| [#9132](https://github.com/esengine/DeepSeek-Reasonix/pull/9132) | **精简文档，避免直接引用 `reasonix.toml`** | 将配置文件统一称为“项目本地配置”，提升文档维护性。 |
| [#9770](https://github.com/esengine/DeepSeek-Reasonix/pull/9770) | **受管配置文件写入始终需人工确认** | 任何位置的 `config.toml` 等文件写入均需 fresh `config_write` 审批。 |
| [#9417](https://github.com/esengine/DeepSeek-Reasonix/pull/9417) | **新增半页与单行转录滚动快捷键** | `Shift+PgUp/Dn` 半页，`Shift+Up/Down` 单行，文档已更新。 |
| [#9705](https://github.com/esengine/DeepSeek-Reasonix/pull/9705) | **ACP 会话内支持 `/clear` 命令** | 修复 `/clear` 在 ACP 会话中被当作普通文本发送的问题。 |
| [#9704](https://github.com/esengine/DeepSeek-Reasonix/pull/9704) | **修复问答选择器数字键无法选中“输入其他内容”与“直接聊天”行** | 数字键映射已扩展到所有选项行。 |
| [#9163](https://github.com/esengine/DeepSeek-Reasonix/pull/9163) | **CacheContext 配置路径基础 + 按项目用户归属 ID + 自动默认值** | 实现 DeepSeek KV‑cache 的按项目归属，默认配置自动生成。 |
| [#10041](https://github.com/esengine/DeepSeek-Reasonix/pull/10041) | **浮动工作区启动器与右侧工作区标签容器** | 将固定五向视图切换改为可增删/重排/关闭的标签页容器，并补齐折叠态启动器入口。 |
| [#10039](https://github.com/esengine/DeepSeek-Reasonix/pull/10039) | **工具中断持久恢复（桌面端 ↔ 远程端一致）** | 共享证据回退机制，确保工具执行中断后可可靠恢复。 |

*(其他已合并 PR 包括 read/write 守卫解耦、硬件加速设置、OpenCode Go v10 核心接入、测试辅助代码迁移、文档更新及缩放测试修复等。)*

---

### 5. 功能需求趋势

- **性能与资源管理**
  - 缓存占用过大 → C 盘告急。
  - `/compact`  token 消耗异常。
  - 桌面端 UI 卡顿（longtask、JS 堆压力）。
- **模型支持与兼容性**
  - 迫切需要 deepseek‑v4.1‑flash（到期日 2026‑09‑10）。
  - 解决 v4‑flash 循环输出 / “废话连篇” 问题。
- **桌面端功能增强**
  - 远程 Serve 版本同步 UI（提示 + 更新按钮）。
  - 硬件加速设置持久化与恢复机制。
  - 浮动启动器 + 可配置标签页工作区。
- **可靠性与错误处理**
  - read‑evidence 守卫导致的 bash 命令拦截。
  - 图片验证失败引发 HTTP 400 与会话污染。
  - 模型切换后对话不可用。
  - todo_write 状态机死锁（指纹去重问题）。
- **开发者体验优化**
  - YOLO 模式数字键选择与自动提交。
  - 配置文件写入安全确认流程。
  - 文档中移除对 `reasonix.toml` 的硬编码引用。
  - 滚动快捷键丰富化（半页/单行）。

---

### 6. 开发者关注点

- **Windows 平台 bug 集中爆发**：read‑evidence 守卫、compact token 消耗、模型切换问题及 C 盘存储压力。
- **桌面端 UI 稳定性**：longtask 导致 UI 响应卡顿，缩放同步测试失败，硬件加速设置缺失。
- **工具中断恢复机制**：当前 Electron 与 Remote 端缺乏共享的证据回退，导致工具状态不一致。
- **配置与安全流程**：社区希望更透明地看到远程 Serve 版本更新，配置写入需人工确认以防误改。
- **模型生态扩展**：deepseek‑v4.1‑flash 即将到期，用户迫切需要支持与文档指导。

---

*以上就是今日 DeepSeek Reasonix 社区的主要动态。欢迎关注后续更新，我们将持续跟踪社区讨论与实现进展。*

:::

:::details{title="OpenCode" repo="anomalyco/opencode"}

**OpenCode 社区动态日报** · 2026-09-10

---

### 1. 今日速览
v1.18.30 发布，新增 GPT‑6 “Astra” 系统提示词，并修复 Bedrock DeepSeek 模型 ID、Azure/OpenAI SDK 兼容性问题。社区焦点集中在自动权限开关 bug、会话摘要膨胀、Windows 桌面端代理拦截、Mantle GPT‑OSS 对话重播修复及终端工具等主题。

### 2. 版本发布
**v1.18.30** – 核心改进与 bug 修复
- **核心** – 新增 GPT‑6 “Astra” 系统提示词。
- **Bug 修复** – 保留 Bedrock DeepSeek 模型 ID（含 ARN 格式）以确保正确解析；更新 Azure 提供商 SDK 以修复兼容性问题；更新 OpenAI 提供商 SDK 以获取最新修复。

### 3. 社区热点 Issues（按评论数排序）

| # | 标题 | 重要性 | 社区反应 |
|---|-------|--------------|------------------|
| [42739](https://github.com/anomalyco/opencode/issues/42739) | `[Bug] Provider.list` 在存在 Cloudflare 环境变量但无 `CLOUDFLARE_API_TOKEN` 时崩溃 | TUI 启动失败的严重问题，影响用户入门。 | 5 条评论，0 👍 |
| [25701](https://github.com/anomalyco/opencode/issues/25701) | `[needs:compliance] PWA: Android 独立模式顶端白条问题` | PWA 用户体验 bug，在 Android 设备上可见 UI 污染。 | 4 条评论，0 👍 |
| [48237](https://github.com/anomalyco/opencode/issues/48237) | `fix(app): 自动权限开关在无会话时被禁用` | 设置中自动同意权限的 UI 状态不正确，导致用户无法使用。 | 4 条评论，0 👍 |
| [48239](https://github.com/anomalyco/opencode/issues/48239) | `Goal‑mode 轮次驱动在错误/取消后盲目回收，导致孤立轮次` | Goal 模式状态泄漏，可能导致资源浪费。 | 3 条评论，0 👍 |
| [48252](https://github.com/anomalyco/opencode/issues/48252) | `[FEATURE] 桌面端环境面板 – 技能、插件、MCP、已加载指令 + 会话成本` | 用户希望可视化会话内部状态，减少对配置文件 `opencode.json` 的依赖。 | 2 条评论，0 👍 |
| [48247](https://github.com/anomalyco/opencode/issues/48247) | `Model‑ID 版本门户排除无点号 ID，导致 gpt‑6‑astra 被视为旧版本` | 模型版本排序错误，影响用户对新模型的访问。 | 2 条评论，0 👍 |
| [48246](https://github.com/anomalyco/opencode/issues/48246) | `显式缓存断点仅应用于 Anthropic 系列模型，其他系列依赖隐式缓存` | 缓存策略不均衡，导致非 Anthropic 模型缺少精确控制。 | 2 条评论，0 👍 |
| [48240](https://github.com/anomalyco/opencode/issues/48240) | `[needs:compliance] [extend] Goal 模式：同会话自主长程循环` | 社区对自主长程任务模式的需求，扩展 Goal 模式功能。 | 2 条评论，0 👍 |
| [48241](https://github.com/anomalyco/opencode/issues/48241) | `[fix] 每次运行都会将完整工作区 diff 写入消息摘要 + 事件日志（GB 级膨胀）` | 会话事件存储无限制增长，严重影响存储空间。 | 2 条评论，0 👍 |
| [48238](https://github.com/anomalyco/opencode/issues/48238) | `[needs:compliance] fix(app): 自动权限开关在无会话时被禁用` | 与 #48237 重复，表明问题普遍存在。 | 2 条评论，0 👍 |

### 4. 重要 PR 进展

| # | 标题 | 功能/修复内容 |
|---|-------|-------------------|
| [48251](https://github.com/anomalyco/opencode/pull/48251) | `fix(ai): 修复 Mantle GPT‑OSS 对话重播` | 修复 Bedrock Mantle 上的 `openai.gpt‑oss‑120b` 和 `openai.gpt‑oss‑20b` 多请求对话重播问题。 |
| [48249](https://github.com/anomalyco/opencode/pull/48249) | `[needs:issue, needs:compliance] fix(ai): 保留空完成检查点的流式输出` | 修复 Codex WebSocket 在流式输出后返回空 `response.output` 时丢失内容的 bug。 |
| [48228](https://github.com/anomalyco/opencode/pull/48228) | `feat(api): 按类型过滤会话消息` | 为 `GET /api/session/{sessionID}/message` 端点新增可选 `type` 查询参数。 |
| [48248](https://github.com/anomalyco/opencode/pull/48248) | `[contributor] fix(session-ui): 统计工具摘要中的补丁文件数` | 在分组工具摘要中统计成功补丁元数据中的不同文件路径，保留工具调用回退逻辑。 |
| [48223](https://github.com/anomalyco/opencode/pull/48223) | `fix(app): 减少冷启动和热加载会话的工作量` | 复用最多 16 个渲染的 timeline，增加非活动视图保护和滚动恢复功能。 |
| [48244](https://github.com/anomalyco/opencode/pull/48244) | `[needs:compliance] fix(app): 自动权限开关在无会话时的回退目录` | 为自动权限开关提供回退目录（优先使用会话血统，否则使用路由目录）。 |
| [48243](https://github.com/anomalyco/opencode/pull/48243) | `fix(app): 切换会话时隐藏外部浏览器` | 捕获浏览器注册以实现清理效果，切换会话时隐藏外部原生视图。 |
| [48235](https://github.com/anomalyco/opencode/pull/48235) | `fix(tui): 保护启动时位置刷新的竞态条件` | 保护 TUI 数据提供者在启动时并发触发 8 次位置刷新的竞态条件。 |
| [46670](https://github.com/anomalyco/opencode/pull/46670) | `feat(app): 添加会话历史侧边栏` | 为 v2 布局新增持久化项目和会话侧边栏，替代浮动会话标签页。 |
| [41449](https://github.com/anomalyco/opencode/pull/41449) | `[automated-pr-cleanup] feat(tool): 添加交互式终端工具及 VS Code 自动附加` | 新增 `terminal` 工具，支持代理驱动真实 PTY，并提供 VS Code 扩展自动附加功能。 |

### 5. 功能需求趋势
- **模型支持与版本处理** – 社区关注 GPT‑6 “Astra”、DeepSeek V4、Mantle GPT‑OSS 等新模型的兼容性与版本识别逻辑。
- **UI/UX 优化** – 自动权限开关、会话历史侧边栏、Mission Control、设置面板布局裁剪等用户界面改进持续收到关注。
- **性能与存储优化** – 会话摘要膨胀问题（GB 级事件增长）及冷启动/热加载会话的性能瓶颈成为高优先级。
- **权限与安全** – 权限模式在 `-s` 模式下的应用、MCP 服务器信任配置、自动权限开关状态 bug 等安全相关问题频现。
- **桌面端与 PWA 问题** – Windows 桌面端代理拦截、Android PWA 独立模式白条、项目导入/编辑问题等平台特定 bug 引发关注。
- **工具链与集成** – 终端工具、VS Code 自动附加、Go 模型使用文档 Clarification、Ecosystem 插件目录扩展等集成功能持续推进。
- **Goal 模式扩展** – Goal 模式的轮次回收、孤立轮次及同会话自主长程循环等功能成为讨论热点。

### 6. 开发者关注点
- **自动权限开关 bug** – 多位开发者报告设置中自动同意权限的开关在无会话时被禁用，影响用户体验。
- **会话摘要膨胀** – 每次运行都会写入完整工作区 diff，导致事件日志无限制增长（GB 级），严重影响存储。
- **权限模式在 `-s` 模式下未生效** – 配置的 `ask`/`deny` 模式在 `opencode -s` 会话中未生效。
- **格式化器在代理编辑操作中引发不可见格式化混乱** – 全局配置的格式化器应用于代理 Edit‑tool 写入操作，导致未提交的格式化变化。
- **Windows 桌面端代理拦截** – AdGuard 等本地代理导致桌面端渲染器连接失败，出现“无法连接本地服务器”错误。
- **PWA Android 独立模式白条** – 安装为 PWA 后在 Android 设备上出现顶端白条 UI 污染。
- **模型版本识别 bug** – 版本正则表达式要求点号，导致 `gpt‑6‑astra` 等无点号 ID 被错误分类。
- **缓存策略不均衡** – 仅 Anthropic 系列模型获得显式缓存断点，其他系列依赖隐式前缀缓存。
- **Goal 模式状态泄漏** – 轮次驱动在错误/取消后无条件回收，导致孤立轮次积累。
- **大型会话加载缓慢** – 用户报告进入大会话时冷启动/热加载耗时过长。

---

*以上内容根据 GitHub 仓库 anomalyco/opencode 上的最新 Issues、Pull Requests 及社区讨论总结而成。*

:::

:::details{title="Deepseek Harness" repo="deepseek-ai/deepseek-harness"}

**Deepseek Harness 社区动态日报**  
*日期：2026-09-10*  
*来源：github.com/deepseek-ai/deepseek-harness*

---

### 1. 今日速览
今日 Deepseek Harness 发布 **v0.1.5-alpha.2** 版本，新增侧边栏文档预览、模型文件会话级交付及反馈命令等功能，进一步提升了文件的查看和交互体验。仓库在过去 24 小时内暂无 Issues 或 PR 的更新。

---

### 2. 版本发布

**🚀 dsh-v0.1.5-alpha.2** 发布  
[查看 Release](https://github.com/deepseek-ai/deepseek-harness/releases/tag/dsh-v0.1.5-alpha.2)

**更新亮点**

| 功能 | 描述 | 贡献者 |
|------|------|--------|
| **侧边栏文档预览** | 新增常见文档类型预览支持，包括 Markdown、代码高亮、HTML、PDF、图片等。 | @imccyu, @Yifffan, @yixiangihsiang, @CreatixChu, @yudshj |
| **模型文件会话交付** | 支持模型在会话中显式交付文件，可在侧边栏预览、调用默认应用打开或在文件管理器中定位。 | @yudshj, @CreatixChu |
| **反馈命令** | 新增 `/feedback` 命令，方便用户直接提交意见或问题。 | — |

---

### 3. 社区热点 Issues

> **过去 24 小时内无新 Issues 更新**。  
> *持续关注仓库整体动态，请参阅 Issues 列表：* [GitHub Issues](https://github.com/deepseek-ai/deepseek-harness/issues)

---

### 4. 重要 PR 进展

> **过去 24 小时内无新 PR 更新**。  
> *关注 Pull Request 进展，请参阅 PR 列表：* [GitHub Pull Requests](https://github.com/deepseek-ai/deepseek-harness/pulls)

---

### 5. 功能需求趋势

基于当前 Release 及历史 Issue 分析，社区对以下功能方向表现出的较高兴趣：

1. **UI/UX 优化** – 侧边栏文档预览、文件查看体验。
2. **文件管理增强** – 会话级文件交付、系统集成（打开/定位文件）。
3. **用户反馈机制** – 便捷的反馈命令和问题收集流程。
4. **模型集成支持** – 更灵活的文件交付方式以适应多模型场景。

---

### 6. 开发者关注点

* **文件查看痛点** – 开发者多次反馈在 Harness 中无法快速预览各类文档格式，尤其 Markdown、PDF、图片等。
* **文件交付不便** – 模型生成的文件需要手动查找，缺乏直接的会话级交付路径。
* **反馈渠道缺失** – 此前用户需通过繁琐方式提交问题，`/feedback` 命令的引入受到欢迎。
* **性能与兼容性** – 部分用户关注侧边栏预览功能的性能开销及跨平台兼容性。

---

**总结**：今日 Deepseek Harness 发布了一个以文件处理和用户体验为核心的功能增强版，解决了社区在文档预览和文件交付方面的痛点。未来可关注 UI 性能优化、更多模型文件支持及反馈流程的完善。

:::

:::details{title="Hermes" repo="NousResearch/hermes-agent"}

**Hermes 社区动态日报 (2026-09-10)**

---

### 1. 今日速览
今日 Hermes 项目聚焦于**会话压缩修复**、**桌面 UI 回归修复**和**Windows 平台稳定性**。核心团队修复了导致超限会话永久不可压缩的 bug，并解决了 kanban 任务派发中的死锁问题，同时修复了 Windows 桌面应用中 transcript 抖动和 YouTube 嵌入播放失败等 UI 回归问题。Wisdom Agent V1 和“桌面渲染器浏览器化”功能持续推进，MCP 代理环境变量支持和 approvals 安全边界优化也进入代码检出阶段。

---

### 2. 版本发布
**无**（今日无正式版本发布）

---

### 3. 社区热点 Issues (共 12 条)

| # | 标题 | 重要性 | 社区反馈 |
|---|-------|--------------|--------------|
| **66616** | Skills index 过期/降级（degraded） | 影响 `/docs/skills` 文档的构建，索引超过 26 小时限制（当前 29.8h） | **187 条评论**，无点赞 |
| **78647** | 仓库级 godfile 清除：残留 2K 任务 | 架构重构工作，符合“神文件模块化”规范 | **82 条评论**，无点赞 |
| **106459** | 超限会话永久不可压缩（已关闭） | 会话压缩流程核心 bug，导致用户会话永久失败 | **4 条评论**，已修复 |
| **106596** | Windows 桌面应用 YouTube 嵌入播放失败（错误 153） | 影响桌面用户视频播放体验 | **4 条评论**，无点赞 |
| **106994** | Worker 创建子任务死锁：recompute_ready 阻塞 | 影响 kanban 任务派发，设计缺陷 | **1 条评论**，无点赞 |
| **107000** | Windows 桌面 transcript 每敲击一次闪烁/重绘 | v0.21.0 → v0.21.1 回归，影响用户体验 | **0 条评论** |
| **107002** | Windows `hermes update` 成功但网关重启验证失败 | 更新流程不完整，可能导致版本不一致 | **0 条评论** |
| **106993** | Kanban 派发 worker 继承 `single_query_mode: deny`，阻塞 `execute_code` | 安全边界设计缺陷，影响任务执行 | **0 条评论** |
| **106983** | `mcp_servers.<name>.allowed_tools` 配置未生效 | MCP 安全控制失效 | **0 条评论** |
| **106984** | Stdio MCP 子进程丢失 `http_proxy`/`https_proxy`/`no_proxy` | 影响 MCP 服务器的网络访问 | **0 条评论** |
| **106985** | Kanban 派发器 `auto_decompose` 同步阻塞派发循环 | 慢分解任务阻塞其他任务 | **0 条评论** |
| **106987** | `prompt.submit` 错误 5072 导致会话状态异常 | 会话状态管理 bug | **0 条评论** |

*链接：* https://github.com/NousResearch/hermes-agent/issues/[number]

---

### 4. 重要 PR 进展 (共 50 条，精选 10 个)

| # | 标题 | 功能/修复内容 |
|---|-------|-----------------|
| **106543** | fix(sessions): 防止过期关闭标志导致会话永久不可压缩 | 会话压缩流程健壮性修复 |
| **106998** | fix(kanban): 将 `auto_decompose` 转为后台任务 | 避免慢分解阻塞就绪任务派发 |
| **106999** | fix(approvals): 为派发 worker 添加 `kanban_mode` | 解决 approvals 安全上下文问题 |
| **107001** | fix(kanban): 修复创建者父任务对子任务就绪的错误阻塞 | 消除 fan-out 死锁 |
| **107003** | fix(desktop): 忽略仅 composer 调整的 transcript 滚动恢复 | 修复 v0.21.1 滚动状态回归 |
| **107004** | fix(desktop): Glass 模式下保持设置搜索框不透明 | UI 美化，防止背景透出 |
| **94266** | feat(wisdom): 添加 Hermes Collective Wisdom Agent V1 | 核心功能升级，支持显式登出检查点 |
| **93508** | feat(webapp): 通过浏览器提供桌面渲染器服务 | 新功能，浏览器化桌面环境 |
| **106459** | fix(sessions): 超限会话永久不可压缩（已修复） | 会话压缩流程 bug 修复（已合并） |
| **106596** | fix(desktop): Windows 桌面 YouTube 嵌入播放失败（错误 153） | 桌面媒体播放修复 |

*链接：* https://github.com/NousResearch/hermes-agent/pull/[number]

---

### 5. 功能需求趋势

1. **会话管理和压缩** – 关注超限会话处理、压缩状态恢复和去重算法。
2. **桌面 UI 稳定性和平台支持** – Windows 平台特定 bug（transcript 抖动、YouTube 嵌入、设置搜索、滚动恢复）成为热点。
3. **Kanban 任务派发和工作流** – 死锁、异步分解、approvals 安全上下文和 creator-parent 关系成为关注焦点。
4. **MCP 集成和环境支持** – MCP 服务器工具白名单生效、代理环境变量传递等安全边界问题频繁出现。
5. **权限和安全控制** – `single_query_mode`、`allowed_tools`、`kanban_mode` 等配置项的生效成为关注点。
6. **新功能推进** – Wisdom Agent V1 和桌面渲染器浏览器化持续推进，体现产品向“集体智慧”和“全平台”方向发展。

---

### 6. 开发者关注点

- **痛点：** 核心流程 bug 频发（会话压缩、任务派发死锁），影响用户体验和系统稳定性。
- **高频需求：** Windows 桌面应用回归修复、MCP 环境变量支持、approvals 安全上下文优化。
- **社区焦点：** 技能索引过期、godfile 模块化、会话状态异常等架构性问题引发广泛讨论。
- **安全边界：** MCP 工具白名单、proxy 环境变量、approvals 配置生效成为持续关注点。

---

*数据来源：GitHub NosResearch/hermes-agent 仓库（2026-09-10）。*

:::
