---
title: AI CLI 工具社区动态日报
published: 2026-08-31
report: ai-cli
tags:
  - radar
  - AI
---
# AI CLI 工具社区动态日报 2026-08-31

> 生成时间: 2026-08-31 01:47 UTC | 覆盖工具: 7 个

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

# AI CLI 工具生态横向对比分析报告
**报告日期：** 2026-08-31  
**数据来源：** GitHub 公开社区动态  

---

## 1. 生态全景

当前 AI CLI 工具生态呈现“高速迭代、痛点趋同、差异化初显”的态势。各主流工具日均处理数十至百级 Issue/PR，社区活跃度极高，表明用户反馈驱动开发的模式已成为主流。核心痛点高度集中在 **Windows 平台兼容性、安全过滤器误报、会话/上下文管理可靠性及 Agent 行为可控性** 上，反映出从“能用”到“好用”的共性挑战。同时，各工具开始在特定方向（如 Web Shell、分布式 Bot、AST 感知工具链）上形成差异化探索，生态正从单点工具竞争向能力矩阵演化。

---

## 2. 各工具活跃度对比

| 工具 | Issues 数 (今日) | PR 数 (今日) | Release 情况 |
| :--- | :--- | :--- | :--- |
| **Claude Code** | 50 | 1 (已合并) | 无新版本 |
| **OpenAI Codex** | 47 | 10 (合并) | rust-v0.152.0-alpha.5 & alpha.4 |
| **Gemini CLI** | 48 | 10 (列出) | v0.59.0-nightly.20260831... |
| **DeepSeek Reasonix** | 9 | 47 | v1.34.0 (稳定版) |
| **OpenCode** | 11 | 50 | 无新版本 (v1.18.25 有签名问题) |
| **Qwen Code** | 3 | 50 | 无新版本 |
| **Hermes** | 5 | 10 (列出) | 无新版本 |

> **说明：** PR 数包含 Open/Closed 状态，反映代码活跃度；Issues 数反映社区反馈密度。

---

## 3. 共同关注的功能方向

多个工具社区都在密集反馈以下需求，表明这是行业级共性挑战：

| 关注方向 | 涉及工具 | 具体诉求 |
| :--- | :--- | :--- |
| **Windows 平台稳定性** | Claude Code, OpenAI Codex, Hermes | 桌面应用启动失败、静默重启破坏会话、DWM 句柄泄漏、PowerShell 路径继承、GBK 编码死循环、浏览器覆盖层异常等底层修复。 |
| **会话 / 上下文 / 状态管理** | Claude Code, DeepSeek Reasonix, OpenCode, Hermes | 会话配额异常耗尽、跨机器续会困难、多会话切换卡顿、Agent loop 静默卡死、上下文投影在模型切换时失效、压缩计数器分歧、持久化重复写入。核心诉求是更透明、可预测、一致的会话生命周期管理。 |
| **安全与权限管控** | Claude Code, OpenAI Codex, Gemini CLI, Qwen Code | AUP/Cyber 过滤器误报合法工作流、废弃 `untrusted` 审批策略缺乏平滑迁移、Auto Memory 密钥泄露风险、钩子系统信任边界漏洞。诉求是更精细的上下文感知、白名单机制、权限变更的透明度与平滑过渡。 |
| **Agent 行为可靠性与自知** | Gemini CLI, OpenCode, DeepSeek Reasonix | Subagent 在 `MAX_TURNS` 后误报成功、Generalist agent 挂死、V2 协议字段在请求构造阶段被静默丢弃、MCP 能力目录缓存导致工具不可用。核心诉求是 Agent 需准确感知自身状态和能力边界，避免“不知道自己不知道”的失败。 |
| **插件 / 生态扩展性** | Claude Code, OpenAI Codex, OpenCode, Qwen Code | 插件 shebang 可移植性、包风格 MCP server 名称、类型化 RPC 与自定义事件、OpenTUI 迁移。诉求是更标准化、类型化、跨平台的插件 API 和生态集成。 |

---

## 4. 差异化定位分析

各工具在功能侧重、目标用户和技术路线上已形成初步差异：

| 工具 | 定位与侧重 | 目标用户 | 技术路线特点 |
| :--- | :--- | :--- | :--- |
| **Claude Code** | **高反馈密度的开发助手**。社区活跃，用户对交互细节（Enter 键）和安全策略（AUP）极其敏感。 | 广泛开发者，尤其高强度使用者。 | 正集中解决配额透明度和 Windows 体验，社区驱动感强。 |
| **OpenAI Codex** | **全桌面体验的 AI 代理**。与 GPT 模型深度绑定，桌面端功能丰富（Remote Control, Computer Use）。 | 追求桌面端一体化体验的开发者。 | 当前正经历 Windows 桌面端稳定性的阵痛期，模型与工具调用可靠性是焦点。 |
| **Gemini CLI** | **面向复杂 Agent 工流的开发工具**。强调 Agent 架构（Subagent, Auto Memory, Hooks）和 AST 感知工具链。 | 需要构建复杂、可组合 Agent 工作流的开发者。 | 关注点在 Agent 的自我意识和行为可控性，技术栈偏向底层架构创新。 |
| **DeepSeek Reasonix** | **高会话智能的 AI 开发环境**。核心优势在于会话全生命周期管理和细粒度权限控制。 | 注出会话管理、多任务并行的开发者。 | 技术路线围绕会话调度、上下文预算透明化、跨模型一致性展开。 |
| **OpenCode** | **可扩展的 AI 开发平台**。聚焦 V2 协议和插件生态，强调类型化 RPC 和跨平台 Shell。 | 需要深度定制和扩展的开发者/企业。 | 当前重点是 V2 协议的稳定性和 Provider 兼容性，架构清晰但处于收敛期。 |
| **Qwen Code** | **面向 Web 和自动化流程的 AI 开发工具**。Web Shell 和 CI/CD 是其特色。 | Web 开发者、运维工程师、自动化流程构建者。 | 正从终端向完整 IDE 级产品演进，技术路线偏向工程化和自动化。 |
| **Hermes** | **面向长会话和分布式场景的 AI Agent**。关注压缩机制、分布式 Bot 和测试覆盖率。 | 需要长时间运行、跨设备协作的 Agent 场景用户。 | 技术栈偏向底层稳定性和测试驱动，架构探索（如去中心化 Bot 编排）较为前沿。 |

---

## 5. 社区热度与成熟度

| 工具 | 社区热度 | 成熟度 / 迭代阶段 |
| :--- | :--- | :--- |
| **Claude Code** | 🔥🔥🔥🔥🔥 (最热问题 838 评论) | **痛点解决 / 体验优化期**。用户基数大，当前首要任务是解决历史遗留的体验痛点（配额、Windows）。 |
| **OpenAI Codex** | 🔥🔥🔥🔥 (38 评论) | **快速迭代 / 收敛期**。Windows 桌面端稳定性问题集中爆发，正在经历核心链路的修复阵痛。 |
| **Gemini CLI** | 🔥🔥🔥🔥 (48 Issues) | **快速迭代 / 收敛期**。Subagent 可靠性、Auto Memory 安全等核心链路正在强化，为下一阶段发布做准备。 |
| **DeepSeek Reasonix** | 🔥🔥🔥 (9 Issues, 47 PR) | **稳定发布 / 功能深化期**。已进入 v1.34.0 稳定版本周期，重点在深化会话管理和权限控制等特色能力。 |
| **OpenCode** | 🔥🔥🔥 (11 Issues, 50 PR) | **快速迭代 / 收敛期**。V2 协议缺陷正在集中收敛，Provider 兼容性和 Shell 稳定性是当前重点。 |
| **Qwen Code** | 🔥🔥 (3 Issues, 50 PR) | **稳定发布 / 功能深化期**。Web Shell 功能迭代密集，CI/CD 和自动化流程优化持续，工程化体系成熟。 |
| **Hermes** | 🔥🔥 (5 Issues, 10 PR) | **快速迭代 / 收敛期**。压缩核心链路强化、分布式 Bot 架构探索，技术方向前沿但社区规模相对较小。 |

---

## 6. 值得关注的趋势信号

从社区反馈中提炼出以下行业趋势，对开发者和决策者具有参考价值：

1.  **从“功能可用”到“行为可信”**  
    社区对 Agent“误报成功”、“静默丢弃字段”、“不知道自己不知道”的容忍度降至冰点。**建议：** 优先确保 Agent 的状态反馈、错误处理和能力边界声明的准确性，这是建立用户信任的基石。

2.  **Windows 平台仍是 AI CLI 工具的“阿克琉斯之踵”**  
    几乎所有主流工具都在 Windows 上暴露出严重问题（启动、渲染、进程管理、编码）。**建议：** 投入资源进行 Windows 专项测试和底层修复，是扩大用户基数和提升口碑的关键。

3.  **会话智能成为新的竞争焦点**  
    DeepSeek Reasonix 和 Hermes 的密集更新表明，如何管理、压缩、恢复和跨设备同步会话上下文，正成为区分工具能力的关键维度。**建议：** 将会话生命周期管理视为一等公民来设计。

4.  **安全与权限的“精细化”与“透明化”**  
    AUP 误报、权限策略硬性变更、密钥泄露风险等问题，推动社区要求更智能、更透明的安全机制。**建议：** 提供可配置的过滤规则、清晰的权限变更日志和用户确认流程，而非“一刀切”的拦截。

5.  **生态插件的“标准化”与“类型化”**  
    OpenCode 的类型化 RPC、Claude Code 的 shebang 修复、Qwen Code 的 OpenTUI 迁移，都指向插件生态的标准化需求。**建议：** 在设计插件 API 时，优先考虑跨平台兼容性、类型安全和明确的契约。

6.  **自动化治理与社区互动的平衡**  
    OpenCode 的自动清理机制误关高价值 PR、Qwen Code 的 Autofix 流程延期，表明自动化工具在提升效率的同时，也可能阻塞社区贡献。**建议：** 设计更智能的自动化流程，并保留清晰的人工介入通道。

---

**报告结束**  
*基于 2026-08-31 各工具 GitHub 社区动态生成，旨在为技术决策者和开发者提供生态级洞察。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

**数据来源**: github.com/anthropics/skills  
**数据截止**: 2026-08-31

---

## 1. 热门 Skills 排行

根据 PR 创建/更新活跃度及 Issue 关联热度，筛选出社区关注度最高的 Skills：

| 排名 | PR # | Skill 名称 | 状态 | 核心功能 | 社区热点 |
|:---:|:---:|:---|:---:|:---|:---|
| 1 | #514 | **document-typography** | OPEN | 排版质量控制（孤行、寡夫、编号对齐） | AI 生成文档的通用痛点，覆盖所有用户 |
| 2 | #83 | **skill-quality-analyzer + skill-security-analyzer** | OPEN | 元技能：质量分析（五维度）+ 安全分析 | 生态基础设施需求，meta-skill 概念引领 |
| 3 | #568 | **ServiceNow** | OPEN | 覆盖 ITSM/ITOM/ITAM/FSM 等企业模块 | 企业级深度集成，scope 最广的垂直平台 skill |
| 4 | #525 | **pyxel** | OPEN | 复古游戏引擎（Python + 像素画） | 新兴开发者工具生态，与 MCP 服务器联动 |
| 5 | #723 | **testing-patterns** | OPEN | 全栈测试（单元/组件/集成/E2E） | Testing Trophy 模型落地，填补官方空白 |
| 6 | #1628 | **Hivemind** | OPEN | 多智能体编排（opencode workers 委托） | 成本优化思路，免费模型承担机械任务 |
| 7 | #1367 | **self-audit** | OPEN | 输出自审：机械验证 + 四维推理审计 | 质量门控 v1.3.0，damage-severity 优先级 |
| 8 | #486 | **ODT** | OPEN | OpenDocument 读写/转换 | 开放标准文档支持，补充 docx/pdf 生态 |

**🔗 链接汇总**:
- #514: https://github.com/anthropics/skills/pull/514
- #83: https://github.com/anthropics/skills/pull/83
- #568: https://github.com/anthropics/skills/pull/568
- #525: https://github.com/anthropics/skills/pull/525
- #723: https://github.com/anthropics/skills/pull/723
- #1628: https://github.com/anthropics/skills/pull/1628
- #1367: https://github.com/anthropics/skills/pull/1367
- #486: https://github.com/anthropics/skills/pull/486

---

## 2. 社区需求趋势

从 Issues 数据提炼出以下核心需求方向：

### 🔴 高优先级（评论 ≥ 10）
| Issue # | 主题 | 评论 | 核心诉求 |
|:---:|:---|:---:|:---|
| [#492](https://github.com/anthropics/skills/issues/492) | 安全：信任边界滥用 | **43** | 社区 skill 滥用 `anthropic/` 命名空间，用户误判为官方 |
| [#556](https://github.com/anthropics/skills/issues/556) | eval 框架失效 | **12** | `run_eval.py` 始终报告 0% recall，技能优化无法进行 |

### 🟠 中优先级（评论 6~16）
| Issue # | 主题 | 评论 | 核心诉求 |
|:---:|:---|:---:|:---|
| [#228](https://github.com/anthropics/skills/issues/228) | 组织级技能共享 | **16** | 企业场景下 skill 分发依赖手动上传/下载 |
| [#1329](https://github.com/anthropics/skills/issues/1329) | compact-memory | **9** | 符号化记忆表示，减少长程 agent 的上下文开销 |
| [#189](https://github.com/anthropics/skills/issues/189) | 插件重复安装 | **6** | `document-skills` 和 `example-skills` 内容重叠 |

### 🟡 探索性需求（评论 4）
- **MCP 暴露** (#16)：将 Skill 封装为 MCP 协议接口
- **Bedrock 兼容** (#29)：AWS Bedrock 环境下的 skills 使用
- **SharePoint 安全** (#1175)：企业文档权限控制嵌入 SKILL.md 的风险
- **claude-api 上下文膨胀** (#1487)：~156k tokens 单次注入问题

**📊 趋势总结**:
1. **安全与信任** 是最高热度话题（43 评论远超其他）
2. **企业协作** 需求显著（组织共享、ServiceNow 集成）
3. **eval/质量验证** 工具链不完善阻碍社区贡献
4. **跨平台兼容**（尤其 Windows）是持续痛点

---

## 3. 高潜力待合并 Skills

以下 PR 具备高质量实现 + 明确问题解决 + 近期活跃更新，预计短期内合并：

| PR # | Skill | 创建时间 | 最新更新 | 亮点 |
|:---:|:---|:---:|:---:|:---|
| [#1615](https://github.com/anthropics/skills/pull/1615) | **scnet-hpc** | 2026-08-20 | 2026-08-24 | 5天内更新，Slurm/SSH 完整工作流 |
| [#1607](https://github.com/anthropics/skills/pull/1607) | **claude-api 更新** | 2026-08-18 | 2026-08-26 | 关联 Issue #1603，修复 retired 模型标记 |
| [#1595](https://github.com/anthropics/skills/pull/1595) | **UIZZE 合作伙伴** | 2026-08-17 | 2026-08-29 | 合作伙伴生态扩展 |
| [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit v1.3.0** | 2026-06-28 | 2026-07-02 | 机械验证 + 四维审计，已达 v1.3.0 成熟度 |
| [#538](https://github.com/anthropics/skills/pull/538) | **pdf 大小写修复** | 2026-03-06 | 2026-04-29 | 小而确定的 bugfix，8处引用修正 |

---

## 4. Skills 生态洞察

> **当前社区最集中的诉求是：在保障安全信任边界的前提下，通过完善 eval 框架和企业级集成能力，推动 Skills 从「工具集合」向「可信赖的生产力平台」演进。**

---

## 附录：关键 Issue 链接

| 类型 | 链接 |
|:---|:---|
| 安全信任问题 | https://github.com/anthropics/skills/issues/492 |
| eval 框架失效 | https://github.com/anthropics/skills/issues/556 |
| 组织共享需求 | https://github.com/anthropics/skills/issues/228 |
| compact-memory 提案 | https://github.com/anthropics/skills/issues/1329 |
| 插件重复问题 | https://github.com/anthropics/skills/issues/189 |
| claude-api 上下文膨胀 | https://github.com/anthropics/skills/issues/1487 |

---

*报告生成时间: 2026-08-31 | 数据覆盖: 50 PRs + 16 Issues*

---

# Claude Code 社区动态日报

**日期：** 2026-08-31

---

## 1. 今日速览

今日 Claude Code 社区活跃度较高，共更新 50 条 Issues。**最大热点**是关于 Claude Max 计划会话限制异常耗尽的投诉（Issue #38335），已积累 838 条评论，引发大量用户共鸣。同时，大量 AUP（使用政策）误拦截问题在今日得到集中关闭处理，显示出官方对安全过滤器的调整动向。Windows 平台问题依然突出，涉及桌面应用启动失败和静默重启破坏会话等问题。

---

## 2. 版本发布

**本日无新版本发布。**

---

## 3. 社区热点 Issues

### 🔥 Top 10 最值得关注的问题

| # | Issue | 评论 | 点赞 | 关键信息 |
|---|-------|------|------|----------|
| 1 | [#38335](https://github.com/anthropics/claude-code/issues/38335) - Max 计划会话限制异常耗尽 | 838 | 476 | **最热问题** - 自 2026 年 3 月 23 日起，CLI 使用量异常快速消耗会话限额 |
| 2 | [#53247](https://github.com/anthropics/claude-code/issues/53247) - Windows 桌面应用启动失败 | 36 | 20 | AppModel-Runtime 错误 (0x80070020)，需注销或重启恢复 |
| 3 | [#2054](https://github.com/anthropics/claude-code/issues/2054) - Enter 键插入换行而非发送消息 | 33 | 148 | CJK 用户强烈需求，Enter 键在中文输入中用于确认，当前行为易误发送不完整消息 |
| 4 | [#90172](https://github.com/anthropics/claude-code/issues/90172) - 桌面应用静默重启破坏运行会话（8 个缺陷） | 5 | 2 | Windows 自动更新机制导致 "Can't reach your computer" 错误 |
| 5 | [#89632](https://github.com/anthropics/claude-code/issues/89632) - 本地计划任务仍以交互权限运行 | 5 | 0 | 计划任务被标记为无人值守，但仍触发每次工具调用授权提示 |
| 6 | [#74486](https://github.com/anthropics/claude-code/issues/74486) - 网络安全过滤器误拦截游戏后端对抗性加固测试 | 3 | 0 | **AUP 误报** - 合法安全测试被阻止，影响防御性加固工作 |
| 7 | [#74461](https://github.com/anthropics/claude-code/issues/74461) - ClAudit 对 root 设备 pentest 场景误报 | 3 | 0 | **AUP 误报** - 开发者在自有 root 设备上进行安全测试被拦截 |
| 8 | [#74477](https://github.com/anthropics/claude-code/issues/74477) - Cyber 分类器误拦游戏后端 auth 测试 | 3 | 0 | **Cyber 误报** - 授权的安全测试被错误标记为恶意活动 |
| 9 | [#74470](https://github.com/anthropics/claude-code/issues/74470) - AUP 过滤器误拦交易机器人 ROI 计算 | 3 | 0 | **AUP 误报** - 用户情绪化表达后正常计算任务被阻止 |
| 10 | [#74459](https://github.com/anthropics/claude-code/issues/74459) - 安全块误拦交易应用访问控制加固 | 3 | 0 | **AUP 误报** - 部署系统的合法安全改进被阻止 |

**📊 热点分析：**
- **会话配额问题** 是当前社区最大痛点，838 条评论表明大量用户受影响
- **AUP/Cyber 过滤器误报** 呈集群式爆发，涉及游戏开发、UI 设计、安全测试等多场景
- **Windows 平台支持** 问题持续，用户反馈桌面应用稳定性不佳

---

## 4. 重要 PR 进展

### ✅ 已合并 PR

| PR | 作者 | 状态 | 说明 |
|----|------|------|------|
| [#35350](https://github.com/anthropics/claude-code/pull/35350) | @letanure | Closed | **修复插件 shebang 可移植性** - 将 11 个仍使用 `#!/bin/bash` 的插件脚本改为 `#!/usr/bin/env bash`，解决 NixOS 等系统上 bash 路径非标准的问题 |

**技术细节：** 原始问题源于 `/bin/bash` 路径硬编码，在 NixOS 等使用 `/nix/store` 路径的发行版上无法找到 bash。修复采用 POSIX 兼容写法，提升插件跨平台兼容性。

---

## 5. 功能需求趋势

基于 50 条 Issues 分析，社区最关注的功能方向如下：

### 🏆 高优先级需求

| 方向 | 证据 | 说明 |
|------|------|------|
| **会话配额管理** | #38335 (838 评论) | 用户强烈要求更透明、可预测的配额消耗机制 |
| **Enter 键行为自定义** | #2054 (148 点赞) | CJK 用户群体对键盘绑定有强烈定制需求 |
| **Windows 稳定性** | #53247, #90172 | 桌面应用在 Windows 上的启动、更新、会话恢复问题 |

### 📈 中等优先级需求

| 方向 | 证据 | 说明 |
|------|------|------|
| **计划任务权限** | #89632 | 本地计划任务应支持真正的无人值守模式 |
| **安全过滤器调优** | 多条 AUP/Cyber 误报 | 需要更精细的上下文感知，避免误拦合法工作流 |
| **插件跨平台兼容** | #35350 | 社区已提交修复，需求明确 |

---

## 6. 开发者关注点

### 🔴 核心痛点

1. **配额消耗不透明**
   - 用户反映 CLI 使用量与实际工作量不成比例
   - 缺乏实时配额监控和预警机制
   - **影响：** 所有付费用户，尤其是高强度使用者

2. **Windows 平台体验差**
   - 桌面应用崩溃后无法恢复（需重启）
   - 自动更新静默重启破坏会话
   - **影响：** Windows 用户流失风险

3. **安全过滤器过度敏感**
   - 大量 AUP/Cyber 误报涌入 Issue 区
   - 用户情绪化表达（甚至"frustrated exclamation"）触发误拦
   - **影响：** 游戏开发者、安全研究人员、特定语言用户

### 🟡 高频反馈

| 反馈类型 | 示例 | 诉求 |
|----------|------|------|
| 跨平台一致性 | #35350 | bash 路径、路径分隔符等细节需统一处理 |
| 配置灵活性 | #2054 | 键盘绑定、权限模式等应可自定义 |
| 文档缺失 | 多条 Issue | MCP 工具、计划任务等功能的预期行为不明确 |

### 💡 建议关注

1. **配额系统透明化** - 推出用量仪表板或 API，让用户实时了解消耗情况
2. **Windows 专项修复** - 桌面应用的进程隔离、会话持久化机制需要加固
3. **AUP 调优** - 考虑引入白名单或上下文学习，减少误报对开发者的干扰

---

**📅 报告生成时间：** 2026-08-31  
**数据来源：** github.com/anthropics/claude-code  
**下次更新：** 2026-09-01

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-08-31**

---

### 1. 今日速览
今日社区动态主要集中在 Windows 桌面端的稳定性反馈与核心工具链的调整。Windows 平台爆发了多起 GPT-5.6 模型在 tool-calls 阶段握手失败及 DWM 合成器状态被破坏的严重 Bug，严重影响桌面端体验。同时，团队在 PR 层面将 `update_plan` 工具默认关闭，并增强了 TUI 的速率限制提示与 MCP 生态的兼容性。

### 2. 版本发布
- **rust-v0.152.0-alpha.5** & **rust-v0.152.0-alpha.4**：过去24小时内连续发布了两个 Alpha 版本，具体更新日志暂未在 Release 中详述，推测为 CLI 运行时与工具链的迭代修复。

### 3. 社区热点 Issues
从 47 条 Issues 中筛选出 10 个最值得关注的焦点：

1. **[#41049](https://github.com/openai/codex/issues/41049)** [OPEN] code-mode host exited during handshake; the 5.6 model is not working properly
   - **重要性**：今日评论最多（38条），Windows 用户在升级后使用 GPT-5.6 模型时，本地命令执行通道在握手阶段异常退出，直接导致工具调用失效。
2. **[#39973](https://github.com/openai/codex/issues/39973)** [OPEN] Retiring approval_policy="untrusted" without deprecation weakens the execution-approval boundary
   - **重要性**：社区点赞最高（34赞）。团队废弃 `untrusted` 审批策略但未提供平滑迁移方案，导致旧配置无法启动，引发对安全边界与变更规范的担忧。
3. **[#27117](https://github.com/openai/codex/issues/27117)** [OPEN] Windows standalone update from pwsh inherits PSModulePath into powershell.exe, causing Get-FileHash to fail
   - **重要性**：点赞 18。PowerShell 7 升级 PowerShell 时，子进程继承路径导致哈希计算失败，影响了独立更新流程。
4. **[#37967](https://github.com/openai/codex/issues/37967)** [OPEN] Remote Control cannot attach to a live CLI session on the workstation
   - **重要性**：点赞 18。远程控制功能无法附加到工作站上正在运行的 CLI 会话，破坏了“桌面端发起/手机端监控”的核心工作流。
5. **[#33192](https://github.com/openai/codex/issues/33192)** [OPEN] [Windows 10] DWM Composition handles accumulate after Codex tasks with tool calls
   - **重要性**：点赞 10。Windows 桌面端在执行工具调用后 DWM 合成句柄持续泄漏，导致严重的性能退化。
6. **[#21804](https://github.com/openai/codex/issues/21804)** [OPEN] Add TUI option to preserve Vim mode after submitting prompts
   - **重要性**：点赞 16。CLI 用户强烈需求在提交提示后保留 Vim 插入模式，而非强制返回普通模式。
7. **[#37104](https://github.com/openai/codex/issues/37104)** [CLOSED] [Windows][WSL] Integrated terminal silently fails before PTY/WSL startup
   - **重要性**：评论 23。WSL 集成终端在启动前静默失败，导致侧边栏和底部面板无法打开，严重影响 Linux 开发体验。
8. **[#41290](https://github.com/openai/codex/issues/41290)** [OPEN] [Windows][WSL] Project creation and removal fail after switching Agent Environment to WSL
   - **重要性**：评论 16。切换 Agent 环境至 WSL 后，项目的创建与删除功能失效。
9. **[#37043](https://github.com/openai/codex/issues/37043)** [OPEN] Windows Computer Use fails at EnumWindows with 0x80070003
   - **重要性**：Computer Use 功能在 Windows 上因枚举窗口 API 报错而完全不可用，且重启无法修复。
10. **[#33282](https://github.com/openai/codex/issues/33282)** [OPEN] Codex Desktop create_thread does not inherit auto-approval mode for worktree tasks
    - **重要性**：桌面端创建线程时未继承自动审批模式，导致 worktree 任务频繁弹出审批框，阻断自动化流程。

### 4. 重要 PR 进展
过去 24 小时合并的 10 个 PR 涵盖了工具链控制、终端渲染与生态兼容：

1. **[#41744](https://github.com/openai/codex/pull/41744)** [CLOSED] Make the update_plan tool opt-in
    - **内容**：将 `update_plan` 工具默认关闭（`enabled: false`），用户需显式开启，并从模型提示词中移除相关引导。
2. **[#41743](https://github.com/openai/codex/pull/41743)** [CLOSED] Mark history ingestion requests in turn metadata
    - **内容**：在 Responses turn metadata 中设置 `history_ingest_requested` 标志，保留历史摄入请求的核心所有权。
3. **[#41742](https://github.com/openai/codex/pull/41742)** [CLOSED] Show actionable rate-limit banners in the TUI
    - **内容**：在 TUI 作曲器上方渲染可操作的速率限制横幅，并携带后端账户身份信息。
4. **[#41700](https://github.com/openai/codex/pull/41700)** [CLOSED] Support package-style MCP server names
    - **内容**：允许 MCP 服务器名称包含 `:`、`@`、`/` 和 `.`（如 `npm:@modelcontextprotocol/server-sequential.thinking`），增强生态兼容性。
5. **[#41683](https://github.com/openai/codex/pull/41683)** [CLOSED] Set working directories for environment MCP tests
    - **内容**：为环境支持的 stdio MCP 服务器测试明确提供工作目录作为 `cwd`。
6. **[#41673](https://github.com/openai/codex/pull/41673)** [CLOSED] Repair cursor-style rendering on older JediTerm terminals
    - **内容**：修复旧版 JediTerm 终端在处理 `DECSCUSR` 时光标样式渲染覆盖字形的问题。
7. **[#41666](https://github.com/openai/codex/pull/41666)** [CLOSED] Approve the first Node REPL execution without a Guardian wait
    - **内容**：在 Node REPL 首次执行时快速放行，无需等待异步 Guardian 分类完成。
8. **[#41660](https://github.com/openai/codex/pull/41660)** [CLOSED] Preserve Guardian authorization across history compaction
    - **内容**：在历史压缩和上下文注入时保留用户原有的 Guardian 授权，避免无效重审。
9. **[#41630](https://github.com/openai/codex/pull/41630)** [CLOSED] Update tests for default-enabled update_plan
    - **内容**：补充 `update_plan` 在默认、显式开启和显式关闭状态下的测试用例。
10. **[#41613](https://github.com/openai/codex/pull/41613)** [CLOSED] Move Vim history tests into the history search module
    - **内容**：重构测试目录，将 Vim 历史导航测试移至历史搜索模块并共享辅助函数。

### 5. 功能需求趋势
从 Issues 提炼出社区最关注的五个功能方向：

*   **Windows 桌面端稳定性与性能优化**：高居榜首。用户集中反馈 DWM 合成器句柄泄漏、鼠标闪烁、浮动宠物不可用以及 WSL 集成终端静默失败等问题，亟需底层渲染与系统调用层面的修复。
*   **模型与工具调用的可靠性**：GPT-5.6 模型在 tool-calls 阶段的握手失败（code-mode host exited）成为最严重的阻断性 Bug，社区对模型与本地执行环境的兼容性要求极高。
*   **CLI/TUI 交互体验增强**：开发者强烈希望在 TUI 中保留 Vim 模式、获得更清晰的速率限制提示，以及更流畅的历史搜索体验。
*   **生态集成与扩展性**：支持包风格的 MCP 服务器名称、修复 GitHub @codex 工作流无法推送 PR 的问题，以及 Remote Control 附加 CLI 会话的需求，反映了生态互联的迫切性。
*   **安全与权限管控的平滑过渡**：废弃 `untrusted` 审批策略和子代理用量重置缺乏用户确认，凸显了社区对权限变更透明度和安全边界的关注。

### 6. 开发者关注点
开发者反馈中的核心痛点与高频需求：

*   **Windows 平台兼容性差**：今日绝大多数严重 Bug 集中在 Windows 端（握手失败、DWM 破坏、PowerShell 路径继承、Chrome 侧边栏失控），Windows 用户的容错率与体验亟待提升。
*   **权限与审批机制变更缺乏平滑过渡**：从废弃 `untrusted` 策略到子代理擅自重置用量，开发者对“硬性切断”旧有配置和缺乏确认机制的变更非常反感，要求更完善的 Deprecation 周期与授权确认。
*   **长时运行任务的稳定性**：自动继续循环（Automatic continuation loop）无进展消耗 Token、聊天历史随机消失、重启后会话丢失等问题，严重影响了开发者对长时 Agent 任务的信任度。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**日期**：2026-08-31
**项目**：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 📌 今日速览

Gemini CLI 仓库今日活跃度保持高位，发布新 Nightly 版本 **v0.59.0-nightly.20260831.g0bd1d4397**。社区讨论聚焦于 **Subagent 可靠性**（MAX_TURNS 误报为成功、Generalist agent 挂死、Browser agent Wayland 兼容性）与 **Auto Memory 系统缺陷**（重试循环、无效 patch 静默丢弃、密钥泄露风险）两大方向，叠加 CRLF 行尾、终端渲染、Hook 迁移等若干 P1 级别核心修复 PR 推进。

---

## 🚀 版本发布

### v0.59.0-nightly.20260831.g0bd1d4397

Nightly 自动化发版，相比上一夜间版本无独立公告，更新由自动化机器人触发。

- 📦 关联 PR：[#29139](https://github.com/google-gemini/gemini-cli/pull/29139) — `chore/release: bump version`
- 🔗 对比变更：[Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.59.0-nightly.20260830.g0bd1d4397...v0.59.0-nightly.20260831.g0bd1d4397)

---

## 🔥 社区热点 Issues

> 以下挑选自过去 24 小时评论数 / 优先级 / 影响面最显著的 10 个 Issue。

| # | Issue | 优先级 / 主题 | 摘要 |
|---|-------|--------------|------|
| 1 | [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | **P1 / Bug** | `codebase_investigator` 子代理在命中 `MAX_TURNS` 后仍报告 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖中断。**评论 13 / 👍 2** |
| 2 | [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | **P1 / Bug** | 委派给 generalist agent 时 CLI 永久挂起，连简单建文件夹操作都要等超 1 小时。**评论 8 / 👍 8**（高认同） |
| 3 | [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | **P2 / Enhancement** | 通过"零依赖 OS 沙箱 + 后置意图路由"释放 Gemini 3 模型的 bash 偏好能力。**评论 8** |
| 4 | [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | **P2 / Feature EPIC** | 评估引入 AST 感知的文件读取 / 搜索 / 代码库映射对 Agent 性能的影响。**评论 7** |
| 5 | [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | **P2 / Bug** | 模型"几乎从不主动"调用自定义 skill 和子代理；只有在用户显式提示时才会。**评论 6** |
| 6 | [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | **P2 / Security** | Auto Memory 把本地会话内容发往后端 LLM 时缺乏确定性脱敏，存在密钥泄露路径。**评论 5** |
| 7 | [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | **P1 / Bug** | 简单 CLI 命令执行完成后仍卡在 "Waiting input"，shell 实际已退出。**评论 4 / 👍 3** |
| 8 | [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | **P3 / Feature** | `browser_agent` 当前对锁定的持久化 profile "快速失败"，需引入自动接管与锁恢复。**评论 4** |
| 9 | [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) | **P1 / Bug** | Browser subagent 在 Wayland 环境下失败，终止原因仍误报为 GOAL。**评论 4 / 👍 1** |
| 10 | [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | **P2 / Bug** | 当可用工具数 > 400 时 Gemini CLI 报 400 错误，工具过滤策略需要智能化。**评论 3** |

### 为什么这些 Issue 重要？

- **可靠性集群（#22323, #21409, #21983, #25166）**：都涉及 Agent **错误地将失败状态报告为成功**或在交互中无响应，这是阻碍 CLI 进入生产工作流的核心痛点。
- **架构演进（#19873, #22745）**：前者解锁 Gemini 3 的原生 bash 能力，后者引入 AST 感知，是中长期能力跃迁的两个杠杆。
- **安全合规（#26525）**：Auto Memory 将本地转写内容外发，需要确定性脱敏，已被标记为 P2。

---

## 🛠️ 重要 PR 进展

| # | PR | 状态 / 规模 | 修复 / 功能 |
|---|----|--------------|-------------|
| 1 | [#29137](https://github.com/google-gemini/gemini-cli/pull/29137) | OPEN / **XL** | dependabot 批量升级 npm 依赖（77 个包，含 `simple-git 3.28→3.36`、MCP SDK） |
| 2 | [#28889](https://github.com/google-gemini/gemini-cli/pull/28889) | OPEN / **M (P1)** | 修复 `detectCapabilities()` 检测后未恢复 stdin 的 paused 状态，避免后续输入丢失 |
| 3 | [#29132](https://github.com/google-gemini/gemini-cli/pull/29132) | OPEN / **S** | 修复 CRLF/CR 行尾导致 `getDiffContextSnippet` 退化为全文件 diff（与 #29131 互为替代） |
| 4 | [#29125](https://github.com/google-gemini/gemini-cli/pull/29125) | OPEN / **S (P2)** | 修复 `gemini hooks migrate` 将 Claude Code 的"秒"单位超时错误地按毫秒解读的 bug |
| 5 | [#29124](https://github.com/google-gemini/gemini-cli/pull/29124) | OPEN / **XS (P2)** | 修复 `SubagentStop` 事件键大小写不匹配，导致 hook 迁移时被静默丢弃 |
| 6 | [#29110](https://github.com/google-gemini/gemini-cli/pull/29110) | OPEN / **M-L** | 让 `read_file` 也通过 `FileSystemService` 路由 I/O，与 `write_file` / `replace` 对齐（ACP 远程 FS 支持） |
| 7 | [#28967](https://github.com/google-gemini/gemini-cli/pull/28967) | OPEN / **S (P2)** | 修复标准终端模式下 `refreshStatic()` 调用 `clearTerminal` 清空回滚区的问题（Linux 终端闪烁） |
| 8 | [#28960](https://github.com/google-gemini/gemini-cli/pull/28960) | OPEN / **M (P1)** | 移除 Antigravity OAuth URL 显示时的尾随句号（小但困扰用户的体验问题） |
| 9 | [#29099](https://github.com/google-gemini/gemini-cli/pull/29099) | **CLOSED** / **M-L** | 在不可信/受限环境下对 `@google/gemini-cli-a2a-server` 强制 fail-closed 工作区信任并过滤 `mcpServers`（安全加固） |
| 10 | [#28688](https://github.com/google-gemini/gemini-cli/pull/28688) | **CLOSED** / **M-L (P3)** | 动态解析 Cloud Workstations 代理重定向 URI，修复 VM 内 OAuth 回调到 `localhost` 失败的问题 |

---

## 📈 功能需求趋势

从过去 24 小时的 48 条 Issue 中提炼出的社区方向：

1. **🧠 Agent 自我意识 & 行为可控性**（#21432, #22672）
   - 期望 Agent 准确知晓自己的 CLI flag、快捷键，并能主动规避 `git reset --force` 等破坏性操作。

2. **🧰 AST 感知工具链**（#22745, #22746, #22747）
   - 社区 / 维护者共同推动用 `tilth`、`glyph`、`ast-grep` 等工具替换或增强朴素的 read/grep，减少 token 噪音。

3. **🌐 浏览器子代理稳健性**（#22232, #22267, #21983）
   - 关注持久化 session 接管、Wayland 兼容、配置覆盖三大问题。

4. **💾 Auto Memory 安全与质量**（#26516, #26522, #26523, #26525）
   - 一组高密度 issue 集中整治重试循环、无效 patch 静默丢弃、密钥泄露等系统性问题。

5. **🪝 Claude Code 钩子迁移一致性**（#29124, #29125）
   - 反映出用户从 Claude Code 迁移配置时对兼容性的强需求。

6. **📟 终端渲染性能**（#21924, #28967, #29138）
   - 终端 resize 闪烁、scrollback 清空、README 精简等 UX 体验持续被关注。

---

## 👨‍💻 开发者关注点

从 Issue 与 PR 反馈中识别的高频痛点：

- **"子代理状态报告失真"是当前最尖锐问题**：`MAX_TURNS`、`GOAL`、Wayland 失败、Generalist 挂死 — Agent **不知道它不知道**自己失败了，导致 bug 报告 / 调试链路断裂（#22323, #21409, #21983）。
- **Hook 迁移是迁移体验短板**：单位混淆（秒 vs 毫秒）、事件名大小写不匹配都让 `gemini hooks migrate` 用户踩坑（#29124, #29125）。
- **跨平台行尾 / 终端行为差异**：CRLF 导致全文件 diff、Linux 终端 `clearTerminal` 副作用说明 Windows + Linux 双向 QA 仍需加强（#29131, #29132, #28967）。
- **远程/虚拟工作区 I/O 一致性**：`read_file` 未走 `FileSystemService`、Cider IDE 目录路径不匹配、Cloud Workstations OAuth 回调 — 反映"非本地开发"场景覆盖率仍低（#29110, #28729, #28688）。
- **工具注册膨胀**：> 400 个工具时 API 返回 400，开发者期望有更智能的"作用域内工具过滤"（#24246）。
- **Memory 系统的可观测性**：用户希望看到 patch 被保留 / 丢弃的原因，而不是"silent skip"（#26523, #26522）。

---

*日报基于 GitHub 公开数据自动生成。点击各条目链接可直达对应 Issue / PR。*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

**DeepSeek Reasonix 社区动态日报 – 2026‑08‑31**

---

### 1️⃣ 今日速览  
- **v1.34.0 正式发布**：在安全加固、MCP 2026 交互、缓存稳定性以及桌面端多项崩溃修复方面取得显著改进。  
- 社区热度居高不下：过去 24 小时内出现 9 条开放 Issue 与 47 条 PR，主要围绕 **会话管理、文件访问权限、上下文预算与模型切换** 三大痛点展开。

---

### 2️⃣ 版本发布  
**v1.34.0 (稳定版)**  
- **安全加固**：`serve` 与 `git` 操作的权限检查与异常处理得到加强。  
- **MCP 2026 交互**：对 MCP 2026 协议的兼容性与错误处理进行了优化。  
- **缓存与能力控制**：缓存失效与能力使用的边界更明确，防止因缓存不一致导致的异常。  
- **桌面端稳定性**：多项崩溃、卡顿和会话切换异常的修复，提升了日常使用的流畅度。  

> 完整变更日志：<https://reasonix.io/changelog/v1.34.0/>

---

### 3️⃣ 社区热点 Issues（挑选 10 条最值得关注）

| Issue | 关键痛点 | 社区反应 | 链接 |
|-------|----------|----------|------|
| **#9477** | `resume` 找不到其他会话历史（跨机器续会困难） | 用户抱怨在不同机器之间无法继续同一会话，期待更智能的会话追踪。 | <https://github.com/esengine/DeepSeek-Reasonix/issues/9477> |
| **#9516** | MCP 能力目录被缓存/截断，导致调用的工具不可见 | 影响 MCP 与本地工具（如 bfexplorer）的无缝集成，需实时刷新目录。 | <https://github.com/esengine/DeepSeek-Reasonix/issues/9516> |
| **#9626** | 1.34.0 解决滚动与多数体验 Bug，社区表示感谢 | 正面反馈，表明最近的改动已显著提升稳定性。 | <https://github.com/esengine/DeepSeek-Reasonix/issues/9626> |
| **#9628** | V1.34.0 多会话切换后无法直接打开会话，需二次点击恢复 | 影响多任务工作流，导致上下文切换成本上升。 | <https://github.com/esengine/DeepSeek-Reasonix/issues/9628> |
| **#9623** | 「已授权写目录」面板仅能操作当前 tab，缺乏跨会话管理 | 多会话下文件权限管理混乱，需统一入口。 | <https://github.com/esengine/DeepSeek-Reasonix/issues/9623> |
| **#9629** | Session 看板排序不便，需手动查找目标会话 | 多会话项目交叉进行时，定位耗时，建议自动归类至对应项目文件夹。 | <https://github.com/esengine/DeepSeek-Reasonix/issues/9629> |
| **#9627** | TUI 状态栏始终显示完整余额，影响屏幕录制/分享隐私 | 隐私泄露风险，呼吁在 UI 中对敏感数字做遮罩。 | <https://github.com/esengine/DeepSeek-Reasonix/issues/9627> |
| **#9621** | 切换模型时上下文投影失效，导致上下文占比骤增并触发压缩失败 | 用户在模型切换后上下文占用率瞬间飙升，影响长任务顺畅度。 | <https://github.com/esengine/DeepSeek-Reasonix/issues/9621> |
| **#9617** | 健康会话跨重启后无法关闭或归档，内存 lease 持久导致自持阻塞 | 会话残留占用资源，影响资源回收与系统整体健康。 | <https://github.com/esengine/DeepSeek-Reasonix/issues/9617> |
| **#9624** | 为每 turn 注入上下文预算行并在系统提示中文档化压缩契约 | 让模型感知上下文使用上限，防止盲目耗尽上下文，提升长任务稳定性。 | <https://github.com/esengine/DeepSeek-Reasonix/pull/9624> |

> **共计 10 条**，覆盖了会话管理、MCP 整合、权限控制、UI/UX、上下文预算与模型切换等核心需求。

---

### 4️⃣ 重要 PR 进展（挑选 10 条）

| PR | 核心贡献 | 社区/作者反馈 | 链接 |
|----|----------|--------------|------|
| **#9624** | 为每 turn 注入上下文预算行，并在系统提示中明确压缩契约，解决模型“盲目”使用上下文的问题。 | 通过 per‑turn 预算可显著降低因上下文溢出导致的拒绝率。 | <https://github.com/esengine/DeepSeek-Reasonix/pull/9624> |
| **#9618** | 统一会话目录路径身份（original session / directory / workspace‑root），实现 SQLite唯一性、路径扫描、权限校验等统一逻辑。 | 消除路径歧义，提升多平台一致性。 | <https://github.com/esengine/DeepSeek-Reasonix/pull/9618> |
| **#9476** | 实现会话级 + 用户全局两层已授权写目录管理，完成 #9167 的后端基座。 | 为多会话下文件写入提供清晰、可配置的权限体系。 | <https://github.com/esengine/DeepSeek-Reasonix/pull/9476> |
| **#9620** | 在桌面端 Settings → Sandbox 新增已授权写目录管理面板（会话级查看/增删、实时刷新）。 | UI 交互更友好，用户可直观管理跨会话权限。 | <https://github.com/esengine/DeepSeek-Reasonix/pull/9620> |
| **#9619** | 后端实现已授权写目录的查询/增删（会话内存态 + 项目持久化），为前端面板提供数据源。 | 完成 #9167 的后端基础，使前端管理具备完整 CRUD 能力。 | <https://github.com/esengine/DeepSeek-Reasonix/pull/9619> |
| **#9591** | 让失败的会话可归档，并停止 recovery‑failed 标签循环，防止因 lease 未失效导致的 archiving 阻塞。 | 提升会话回收的可靠性，减少无效 tab 循环。 | <https://github.com/esengine/DeepSeek-Reasonix/pull/9591> |
| **#9587** | 将 `kill_shell` 归类为 **host‑state‑only** 证据，防止因工作路径 lease 自身阻塞导致的自持死锁。 | 消除因 `kill_shell` 产生的自我阻塞，提高后台任务结束的可靠性。 | <https://github.com/esengine/DeepSeek-Reasonix/pull/9587> |
| **#9628** | 修复 V1.34.0 多会话切换后无法直接打开会话的 Bug，加入状态恢复逻辑。 | 解决用户反馈的高频卡顿，提升会话切换流畅度。 | <https://github.com/esengine/DeepSeek-Reasonix/pull/9628> |
| **#9623** | 为已授权写目录面板加入会话选择器（默认当前 tab），实现跨会话目录管理。 | 让用户能够在不同会话之间自由切换并管理各自的写入目录。 | <https://github.com/esengine/DeepSeek-Reasonix/pull/9623> |
| **#9621** | 实现上下文投影跨模型保留（`promptCacheKey` 去除 `modelRef` 依赖），防止模型切换导致上下文折叠失效。 | 解决用户在切换模型后上下文占比骤增、压缩失败的痛点。 | <https://github.com/esengine/DeepSeek-Reasonix/pull/9621> |

> 以上 PR 均为 **open** 或 **closed** 但已合入的关键改动，直接影响会话管理、文件权限、上下文预算与模型兼容性等核心功能。

---

### 5️⃣ 功能需求趋势  

| 趋势 | 说明 |
|------|------|
| **会话统一管理** | 多会话间的历史查找、切换、权限管理（#9477、#9628、#9623、#9629）是社区最频繁的诉求，期待“会话看板自动归类”“跨会话写目录选择”等功能。 |
| **MCP 与工具目录实时同步** | 目录缓存失效导致的工具不可用（#9516）以及跨机器会话续接（#9477）表明 MCP 与文件系统的实时感知是关键痛点。 |
| **上下文预算与压缩策略** | 为避免模型因上下文溢出而频繁压缩或拒绝，社区提出 per‑turn 预算行、自动收敛 recovery 分支（#9624、#9470、#9469）以及跨模型上下文投影保留（#9621）。 |
| **文件访问权限细化** | 会话级与用户全局双层已授权写目录（#9476、#9619、#9620、#9623）显示出对细粒度权限控制的强需求，尤其在多会话协作场景下。 |
| **UI/UX 与隐私** | TUI 中敏感信息（如余额）的遮罩（#9627）以及会话面板的可配置视图（#9629）表明用户对隐私与操作便利性的关注度提升。 |
| **会话归档与资源回收** | 健康会话跨重启无法关闭（#9617）以及失败会话循环（#9591）显示出对会话生命周期管理的迫切需求。 |

**总体来看**，社区正在向 **更智能的会话调度、细粒度权限管理、上下文预算透明化以及跨模型一致性** 方向发展。

---

### 6️⃣ 开发者关注点（痛点与高频需求）

1. **会话历史与跨设备续接** – 无法在不同机器间继续同一会话（#9477），需要更强的会话标识与持久化机制。  
2. **MCP 能力目录同步** – 缓存/截断导致的工具不可用（#9516），期待实时刷新或自动同步机制。  
3. **多会话切换的可用性** – 切换后需二次点击才能打开会话（#9628），影响工作流效率。  
4. **已授权写目录的跨会话管理** – 当前仅能对当前 tab 进行操作（#9623），缺乏统一的会话选择入口。  
5. **上下文投影在模型切换时失效** – 切换模型后上下文占比骤增、压缩失败（#9621），需要保持投影一致性。  
6. **会话归档与资源回收** – 健康会话跨重启仍被锁定（#9617），以及失败会话循环阻塞系统（#9591），亟需自动回收机制。  
7. **TUI 隐私保护** – 余额等敏感信息在录屏时裸露（#9627），呼吁在 UI 层做遮罩或隐藏。  
8. **依赖升级与桌面端稳定性** – 多次出现依赖（wails、go、npm）升级导致的间歇性崩溃，社区关注模块间兼容性。  

> 这些痛点表明，**会话全生命周期管理、细粒度权限、上下文透明化以及跨平台稳定性** 是当前开发者最迫切希望得到解决的方向。

--- 

*报告结束*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：2026-08-31**

---

## 一、今日速览

今天 OpenCode 社区的关注重点集中在 **2.0 (V2) 协议的稳定性** 与 **协议层缺陷修复** —— 多个高价值 Issue 直指模型变体（variants）字段在请求构建阶段被静默丢弃，导致自定义 Provider 与 Anthropic SDK 兼容性问题。与此同时，**Shell 进程挂起、macOS 代码签名验证失败、MCP OAuth 资源参数缺失** 等"阻塞级"缺陷持续暴露，社区明显已进入 2.0 版本发布前的高强度缺陷收敛期。

---

## 二、版本发布

**过去 24 小时内无新版本发布。**

> ⚠️ 提示：现有桌面端 v1.18.25 在 macOS 上存在 `codesign --verify` 验证失败问题（#46313），建议暂缓在 macOS 生产环境直接下载二进制。

---

## 三、社区热点 Issues

以下按"对核心功能影响 × 社区反馈强度"筛选：

### 1. [V2] MCP OAuth 静默重连缺少 RFC 8707 `resource` 参数 — Sentry 拒绝授权
- **编号**：[#46316](https://github.com/anomalyco/opencode/issues/46316)
- **重要性**：合规级别问题。OAuth 2.0 资源指示符（RFC 8707）是 MCP 远程服务器日益普及场景下的硬性要求；非交互式重连路径未携带该参数，导致 `mcp.sentry.dev` 等服务器直接拒绝请求。这是 V2 协议 MCP 子系统的结构性缺陷。
- **状态**：OPEN，`[needs:compliance]` 标签

### 2. macOS v1.18.25 发布二进制代码签名验证失败
- **编号**：[#46313](https://github.com/anomalyco/opencode/issues/46313)
- **重要性**：发布流程级缺陷。`opencode-darwin-arm64.zip` 与 `opencode-darwin-x64.zip` 均无法通过 `codesign --verify`，嵌入式签名与文件内容不匹配——是 release pipeline 严重告警。
- **状态**：OPEN

### 3. [V2] Agent loop 静默随机卡死（持续 working 不退出）
- **编号**：[#46310](https://github.com/anomalyco/opencode/issues/46310)
- **重要性**：用户可见的核心功能故障。在长会话（隔夜运行）中，session 陷入"perpetual working state"卡在 toolcall，且 Tab 栏出现 `!` 警告符号。受影响模型：GLM-5.3-Flash。
- **状态**：OPEN

### 4. ACP 路由忽略 per-agent model 配置（始终回退到 session 默认）
- **编号**：[#46311](https://github.com/anomalyco/opencode/issues/46311)
- **重要性**：协议一致性问题。ACP 提示处理硬编码传递 session 级 model 作为 `input.model`，短路了 per-agent 模型优先级，与 CLI 行为不一致。
- **状态**：OPEN

### 5. Anthropic 协议 `effort` 变体负载丢失（构建后展示正常，请求构造阶段丢弃）
- **编号**：[#46314](https://github.com/anomalyco/opencode/issues/46314)
- **重要性**：自定义 Provider 的关键 regression。变体已生成并 UI 正确显示，但选择后请求体既无 `effort` 也无 `thinking` 字段——典型的"feature flag 已展示但未下发到 wire"问题。
- **状态**：CLOSED（已解决）

### 6. Variant body-level 字段（如 `chat_template_kwargs`）在请求前被丢弃
- **编号**：[#42876](https://github.com/anomalyco/opencode/issues/42876)
- **重要性**：影响所有自定义模型变体定义。变体被正确合并入 `options`，但在 wire 序列化前丢失。经反向代理日志确认。
- **状态**：OPEN，👍 2

### 7. 桌面端 UI 缩放与滚动问题（传统布局与新界面）
- **编号**：[#46315](https://github.com/anomalyco/opencode/issues/46315)
- **重要性**：桌面端 UX 缺陷。Ctrl + 滚轮缩放体验差，线性缩放不足，影响 Desktop v1.18.25。
- **状态**：OPEN

### 8. Session 标题生成读取注入的 memory/system context 而非真实用户消息
- **编号**：[#23114](https://github.com/anomalyco/opencode/issues/23114)
- **重要性**：长期存在的老 Issue（2026-04 创建）。`MessageV2.toModelMessagesEffect` 把渲染后的完整历史传给标题模型，导致 Memory MCP server 注入的合成消息污染标题生成。
- **状态**：OPEN，👍 2，5 条评论

### 9. [compliance] Desktop 应用无法启动（仅发出提示音）
- **编号**：[#46317](https://github.com/anomalyco/opencode/issues/46317)
- **状态**：OPEN（疑似误报，标签 `needs:compliance`）

### 10. macOS / Linux 上点击图标后无响应
- **编号**：[#46299](https://github.com/anomalyco/opencode/issues/46299)
- **状态**：CLOSED

---

## 四、重要 PR 进展

### 1. feat(plugin): 添加类型化 RPC 与自定义事件
- **编号**：[#46105](https://github.com/anomalyco/opencode/pull/46105)
- **内容**：为插件引入执行中立的 RPC 契约，包含类型化输入/输出、声明式错误、自定义事件；Promise 与 Effect 插件统一接口。
- **影响**：扩展插件生态的核心 API 增强。
- **状态**：CLOSED（已合并）

### 2. fix(core): 限制 session shell 输出大小
- **编号**：[#45136](https://github.com/anomalyco/opencode/pull/45136)
- **内容**：Session shell 命令采用与常规 shell 一致的 50 KiB 预览上限，大输出仍由文件承载。
- **状态**：CLOSED

### 3. fix(shell): 限制 Windows post-exit pipe draining
- **编号**：[#46085](https://github.com/anomalyco/opencode/pull/46085)
- **内容**：修复 Windows 上前台进程退出后，stdout/stderr 句柄仍被长生命周期后代占用导致 shell 不结束的问题。覆盖 `bunx agent-browser`、`dotnet build`、`dotnet test` 等场景。
- **状态**：OPEN

### 4. fix(core): 进程退出后停止 bash 挂起
- **编号**：[#42756](https://github.com/anomalyco/opencode/pull/42756)
- **内容**：修复 `exit` 应正常工作的多个长期 Issue（#20902, #25038, #28697, #36342, #37838, #42044, #42524），共关闭 7 个 bug 报告。
- **状态**：OPEN

### 5. fix(opencode): 终止本地 MCP 进程树
- **编号**：[#46312](https://github.com/anomalyco/opencode/pull/46312)
- **内容**：修复本地 stdio MCP 启动器在断开/替换后留下孤儿进程的问题。关联 #46253、#46035。
- **状态**：OPEN

### 6. fix(app): 在设置对话框面板中显示滚动条
- **编号**：[#46260](https://github.com/anomalyco/opencode/pull/46260)
- **内容**：修复设置面板滚动条被隐藏、内容溢出无提示的问题（重新提交被自动清理关闭的 #35555）。
- **状态**：OPEN

### 7. docs(ecosystem): 添加 dejavu — 跨 session 错误门控插件
- **编号**：[#44509](https://github.com/anomalyco/opencode/pull/44509)
- **内容**：将 [opencode-dejavu](https://github.com/WhiteBite/opencode-dejavu) 加入 Plugins 生态表。
- **状态**：OPEN

### 8. fix(opencode): debug info 显示 file:// 插件的基本名称
- **编号**：[#40301](https://github.com/anomalyco/opencode/pull/40301)
- **内容**：`opencode debug info` 将本地自动发现的插件打印为 `file:///` URL，改为显示 basename 以提高可读性。
- **状态**：OPEN

### 9. feat(app): 在"Open in"选项中添加 VS Code Insiders 与 Antigravity
- **编号**：[#40872](https://github.com/anomalyco/opencode/pull/40872)
- **内容**：在 session 头部的 "Open in" 下拉菜单中加入 VS Code Insiders 与 Antigravity 编辑器选项。
- **状态**：OPEN

### 10. fix(opencode): 在 unscoped 扫描错误时不崩溃技能发现
- **编号**：[#46298](https://github.com/anomalyco/opencode/pull/46298)
- **内容**：`scan()` 仅在 `scope`（global/project）错误时记录并继续；修复非 scope 错误导致整个 skill 发现流程崩溃的问题。
- **状态**：CLOSED

---

## 五、功能需求趋势

通过对全部 11 条活跃 Issue 与 50 条 PR 的聚类分析，社区关注度集中在以下方向：

| 趋势方向 | 代表 Issue / PR | 占比观察 |
|---------|----------------|---------|
| **🔌 V2 协议合规性** | #46316 (RFC 8707), #46311 (ACP routing), #46319 系列 | 占比最高，是当前最大热点 |
| **🛠 Provider / 自定义模型变体** | #46314, #42876 | 反映社区大量使用自定义 Provider |
| **🐚 Shell 进程稳定性** | #46085, #42756, #45136 | Windows + 后台进程场景的长期痛点 |
| **📦 MCP 生态可靠性** | #46316 (OAuth), #46312 (进程清理), #39717 (插件 server URL) | MCP 子系统全方位收敛 |
| **🖥 桌面端 UX** | #46315 (滚动), #46313 (签名), #46317 (启动崩溃), #46260 (滚动条) | Desktop 版本质量是新增焦点 |
| **🤖 新模型 / 定价** | #39720 (GPT-5.6 定价) | Zen 模型目录持续扩展 |
| **🧩 插件扩展性** | #46105 (类型化 RPC), #44509 (dejavu) | 插件生态进入 API 稳定期 |
| **⚡ 长会话性能** | #39721 (TUI 分页), #46310 (agent loop 卡死) | 大消息历史场景下的体验优化 |

---

## 六、开发者关注点

总结社区反馈的高频痛点：

1. **🔴 "已构建但未下发" 问题成体系**  
   多个 Issue 反映同一模式：UI/配置层正确生成了 variant、option 或 OAuth 参数，但在请求构造或序列化阶段被静默丢弃（#46314、#42876、#46316）。这类缺陷隐蔽但严重影响自定义模型与远程 MCP 用户。

2. **🪟 Windows Shell 是长期重灾区**  
   PR #42756 一次性关闭 7 个相关 Issue，#46085 又新增 Windows 后台进程句柄泄漏修复——说明 Windows shell 仍是 OpenCode 跨平台兼容性的最大短板。

3. **🔐 供应链信任问题**  
   macOS 二进制签名验证失败（#46313）直接削弱了 release 的可信度，对依赖下载校验的企业用户是阻塞项。

4. **🧩 V2 协议与 V1 行为漂移**  
   ACP per-agent model 失效（#46311）、V2 provider API 字段提取不完整（#39719），表明 V2 在迁移过程中存在与 V1 行为不一致的回归。

5. **🤖 长会话可靠性下降**  
   Agent loop 静默卡死（#46310）+ 标题生成被 memory 污染（#23114）反映出长任务、记忆增强场景下的状态机健壮性不足。

6. **📋 自动化清理机制的副作用**  
   大量 PR 标题带 `[automated-pr-cleanup]` 标签（#39712 ~ #39759 等）显示项目启用了自动关闭 stale PR 的机制，部分高价值贡献因此被误关（#46260 即为此情况重提）。社区建议优化该机制的提示与复活通道。

---

*日报生成基于 2026-08-30 ~ 2026-08-31 的 GitHub 数据，共追踪 11 条 Issue、50 条 PR。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**日期：2026-08-31**

---

### 1. 今日速览

今日 Qwen Code 社区无新版本发布，但有大量 PR 更新与合并，核心动态集中在 Web Shell 功能迭代、CI/CD 流程优化以及多项安全与稳定性修复。自动化审查与修复流程持续高效运转，多个 `autofix/takeover` PR 顺利推进，显著降低了人工维护成本。

### 2. 版本发布

无新版本发布。

### 3. 社区热点 Issues

过去24小时内 Issues 库仅更新 3 条，以下为全部热点：

*   **[#7167 Fleet Shepherd Dashboard](https://github.com/QwenLM/qwen-code/issues/7167)**：基础设施可观测性需求。该 Issue 由 Fleet Shepherd 机器人自动维护，用于追踪机器人舰队状态（PR、Dispatch、Cleanup 等指标），当前处于 `need-information` 状态，需社区补充 CI/CD 相关信息。
*   **[#10566 Main CI failed: E2E Tests](https://github.com/QwenLM/qwen-code/issues/10566)**：构建稳定性问题。Main 分支的 E2E 测试在特定 Commit 上失败且未产出结果，已被自动追踪并关闭，需开发者介入排查底层运行环境或测试脚本问题。
*   **[#10588 Deferred review findings from PR #10543](https://github.com/QwenLM/qwen-code/issues/10588)**：代码审查流程自动化。PR #10543 的部分审查发现因超出原 PR 范围被 autofix 循环延期，需维护者手动将其转化为独立 Issue/PR 或启用 `ready-for-agent` 流程。

### 4. 重要 PR 进展

从过去24小时更新的 50 条 PR 中，挑选 10 个最具代表性的进展：

*   **[#10590 ci: split the static checks out of the Linux Test job](https://github.com/QwenLM/qwen-code/pull/10590)**：将 Linux 测试任务拆分为独立的 `static_checks` 任务，涵盖依赖审计、Lint 校验等，大幅提升 CI 执行效率与失败定位速度。
*   **[#10146 feat(cli): OpenTUI migration foundation batch](https://github.com/QwenLM/qwen-code/pull/10146)**：OpenTUI 迁移基础架构批量引入，新增主题、无障碍（a11y）、剪贴板、键映射等渲染层模块，为底层 UI 替换奠定基础。
*   **[#10589 feat(web-shell): add a Workspaces overview panel](https://github.com/QwenLM/qwen-code/pull/10589)**：Web Shell 新增工作区概览面板，以全页表格形式展示工作区状态、活跃会话数及 MCP 健康度，提升多工作区管理体验。
*   **[#10514 feat(web-shell): Add standalone chats](https://github.com/QwenLM/qwen-code/pull/10514)**：实现独立会话功能，使“独立聊天”成为 Web Shell 的一等公民产品形态，与项目、Goals 等工作区级会话解耦。
*   **[#10543 feat(config): let operators size or disable the Goal token budget](https://github.com/QwenLM/qwen-code/pull/10543)**：新增 `model.goalTokenBudget` 配置项，允许运营者自主控制 Goal 的 Token 消耗上限或直接关闭该限制。
*   **[#10427 fix(hooks): close four trust-boundary holes in hook execution](https://github.com/QwenLM/qwen-code/pull/10427)**：安全修复。关闭钩子系统中的四个信任边界漏洞，修复了 HTTP 钩子不遵循重定向、仓库配置触发的代码执行与网络出口风险。
*   **[#10429 fix(ci): recover /resolve requests lost to moved heads](https://github.com/QwenLM/qwen-code/pull/10429)**：CI/审查可靠性修复。恢复因 Force Push、Fork Push 或 503 错误导致的 `/resolve` 请求丢失问题，确保审查任务不因底层引用变动而中断。
*   **[#10344 fix(serve): add prompt-settled close grace for poll-based SSE clients](https://github.com/QwenLM/qwen-code/pull/10344)**：稳定性修复。为轮询式 SSE 客户端增加提示词完成后的关闭宽限期，避免会话被强制重同步（`epoch_reset`），改善长连接体验。
*   **[#10489 fix(web-shell): persist model reasoning preferences](https://github.com/QwenLM/qwen-code/pull/10489)**：状态持久化修复。复用 `model.reasoningEffort` 设置，将 Web Shell 的模型与推理偏好跨守护进程会话持久化，避免用户每次重新配置。
*   **[#10221 feat(review): add the prose-execution audit and the counter-frame audit](https://github.com/QwenLM/qwen-code/pull/10221)**：代码审查质量增强。新增 prose-execution 审计与 counter-frame 审计两个审查维度，替代旧 PR 并完善审查罗盘体系。

### 5. 功能需求趋势

从 Issues 与 PRs 的综合分析，社区当前的功能迭代集中在以下方向：

*   **Web Shell / IDE 集成深化**：工作区概览、独立会话、状态持久化、脏工作树处理等 PR 密集落地，表明 Web Shell 正从单一终端向完整的 IDE 级产品演进。
*   **代码审查自动化与智能化**：Autofix 流程接管（#10489, #10458, #10429）、审查维度扩展（#10221）以及请求丢失恢复，体现出社区对构建高可用、零人工干预的自动化审查流水线的强烈需求。
*   **基础设施与可观测性**：CI 任务拆分（#10590）、会话生命周期绑定（#8927）以及 Fleet Shepherd 仪表盘（#7167），反映出对系统稳定性与运维效率的重视。
*   **开发者体验与配置灵活性**：输出风格定制（#10283）、Goal Token 预算控制（#10543）、会话附件存储路径可配置（#10066），均指向更精细化的运行时控制与个性化偏好。

### 6. 开发者关注点

从反馈与修复内容来看，开发者当前的痛点与高频需求如下：

*   **审查流程的健壮性**：开发者高度关注 Autofix 流程在复杂边界条件下的表现，如 PR 范围外延期项的处理机制（#10588），以及 CI 在分支移动、服务抖动时的请求恢复能力（#10429）。
*   **Web Shell 的边界场景处理**：脏工作树更新（#10390）、SSE 断连重同步（#10344）、会话与 PR/Issue 的自动绑定（#10425）等修复，说明多会话并发与状态一致性是当前 Web Shell 的核心痛点。
*   **启动与配置的容错性**：CLI 在只读环境或配置不可写时的崩溃问题（#10455）受到关注，强调了在多样化部署环境下，异常处理与降级策略的必要性。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报 | 2026-08-31

---

## 1. 今日速览

今日无新版本发布。社区核心聚焦于 **上下文压缩机制的稳定性修复**（双计数器不一致、死循环、重复写入）、**Desktop 客户端的 Windows 兼容性与渲染问题**（GBK 编码、浏览器覆盖层、内部通知渲染）、**多平台 Bot 群聊的会话持久化设计**，以及 **测试覆盖率的系统性提升**（skills_hub、video_gen、vision_tools 等模块）。多个 P0/P1 级修复已提交 PR，显示核心链路正在经历“强化收敛期”。

---

## 2. 版本发布

> 过去 24 小时无新 Release。

---

## 3. 社区热点 Issues（Top 5）

| # | Issue | 优先级 | 核心看点 | 社区反应 |
|---|-------|--------|----------|----------|
| [#98975](https://github.com/NousResearch/hermes-agent/issues/98975) | **压缩计数器分歧 2.3×**：Hygiene 使用陈旧跨模型快照，粗略估算双计数持久化 reasoning blob | P2 | 直接影响自动压缩触发时机，导致上下文异常膨胀或过早压缩，关联 `session_entry.last_prompt_tokens` 与 wire-truth 不一致 | 1 条评论，技术细节极深，核心维护者 @teknium1 已在 #98998 提交修复 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | **Bot Group Chats 在 Desktop 关闭后应继续工作**：当前 Desktop 控制下一 Bot 选择，关闭即停群聊 | P3 / innovation | 涉及分布式会话状态、成员轮转保证、跨设备（laptop/homelab/VPS）一致性，属架构级创新需求 | 4 条评论，标记 `needs-decision`，需架构评审 |
| [#99003](https://github.com/NousResearch/hermes-agent/issues/99003) | **CN Desktop 0.19.0-cn.7 仍含 GBK `auth.json` 解析死循环**：修复 #71078 未回港至 CN 分支，导致图片上传链路断裂 | P2 / Windows | 典型的“修复未随发布流转”问题，影响中文 Windows 用户核心功能，需补丁版本或热修复 | 0 评论，但标记 `sweeper:risk-platform-windows`，风险扫描器已捕获 |
| [#98994](https://github.com/NousResearch/hermes-agent/issues/98994) | **Dashboard i18n 缺失**：Config Schema 描述硬编码英文，绕过 `agent.i18n` | P3 | 非翻译缺失，而是架构旁路，修复需统一配置元数据国际化管线 | 0 评论，新增 Issue，待排期 |
| [#36586](https://github.com/NousResearch/hermes-agent/issues/36586) | **`tools/skills_hub.py` 覆盖率仅 13.87%**，远低 70% 阈值 | P3 | 长期技术债（创建于 6 月），2142 语句大量未测，阻碍重构信心 | 1 评论，持续跟踪中 |

---

## 4. 重要 PR 进展（Top 10）

| # | PR | 类型 | 核心变更 | 影响面 |
|---|----|------|----------|--------|
| [#98997](https://github.com/NousResearch/hermes-agent/pull/98997) | fix(compression) | **P1** | 原地批量压缩提交打 `_DB_PERSISTED_MARKER`，阻止下一轮持久化重复 INSERT 整段转录（~58K → ~512K token 回弹） | 核心压缩链路，直接解决内存/Token 泄漏 |
| [#98998](https://github.com/NousResearch/hermes-agent/pull/98998) | fix(compression) | **P2** | 统一“wire-truth”谓词为唯一思维 token 计费源，终结 codex_responses 死循环（触发 406K → 走查 9.7K → 每轮重触发） | 修复 #98975 根因，兼容 OpenAI/DeepSeek/Kimi/Xiaomi |
| [#98858](https://github.com/NousResearch/hermes-agent/pull/98858) | fix(compaction) | **P2** | `resolve_native_compaction_capabilities()` 感知 `custom_providers.openai_native_compaction` 信任代理，允许代理走原生压缩 | 解锁企业代理/私有化部署的压缩能力 |
| [#98995](https://github.com/NousResearch/hermes-agent/pull/98995) | fix(codex) | **P2** | Codex app-server 运行时：轮次连续性、仓库级作用域、截止时间界定、仅凭有效终端协议事件判成功 | 仅影响 `model.openai_runtime: codex_app_server`，默认运行时不变 |
| [#98811](https://github.com/NousResearch/hermes-agent/pull/98811) | fix(cache) | **P0** | 亲和键路径尊重宿主声明的 `conversation_key`，修复 Hermes Studio 群聊缓存错位 | 关联 #96811，标记 `needs-decision`，涉及 Portal/会话一致性 |
| [#98807](https://github.com/NousResearch/hermes-agent/pull/98807) | fix(doctor) | **P2** | 四项诊断修正：`doctor --live` 不再凭任意 key 通过 FAL；`.env` 检查区分“配置缺失”与“探测失败”；代理探活区分网络/认证错误 | 运维可观测性，减少误报干扰 |
| [#98720](https://github.com/NousResearch/hermes-agent/pull/98720) | fix(telegram) | **P2** | 流式预览被裁剪时上报预览而非裸露“成功”，修复 #98552 消息投递确认竞态 | Telegram 网关流式投递可靠性 |
| [#98996](https://github.com/NousResearch/hermes-agent/pull/98996) | fix(cron) | **P1** | 定时任务隔离易共演化的辅助模块至叶子模块，规避进程内模块缓存陈旧导致的 `ImportError` | Docker/Singularity 后端定时任务稳定性 |
| [#99001](https://github.com/NousResearch/hermes-agent/pull/99001) / [#99002](https://github.com/NousResearch/hermes-agent/pull/99002) | test(video_gen/vision) | **P3** | `video_generation_tool.py` 70%→100%；`vision_tools.py` 60%→95%（新增 131 测试） | 工具链测试基线大幅跃升，支撑后续重构 |
| [#98792](https://github.com/NousResearch/hermes-agent/pull/98792) | fix(desktop) | **P3** | 内部通知（`display_kind=internal_notification`）渲染为系统行而非用户消息，修复 #82888 遗留 | Desktop 消息列表语义正确性 |

> 🔴 **已合并**：[#73715](https://github.com/NousResearch/hermes-agent/pull/73715) `fix(agent): enable context compression for codex_app_server runtime` — 解决该运行时压缩完全不触发的长期缺陷。

---

## 5. 功能需求趋势（从 Issues 提炼）

| 趋势方向 | 代表 Issue/PR | 社区呼声强度 | 备注 |
|----------|---------------|--------------|------|
| **会话/压缩核心链路强化** | #98975, #98997, #98998, #73715 | ⭐⭐⭐⭐⭐ | 连续 3 个 P1/P2 压缩修复，Token 计费一致性、持久化幂等、死循环终结成三大主线 |
| **跨设备/分布式 Bot 编排** | #97681 | ⭐⭐⭐⭐ | 从“单机 Desktop 控制”向“去中心化群聊调度”演进，涉及会话状态同步、成员轮转共识 |
| **Windows / CN 本地化补全** | #99003, #97235 | ⭐⭐⭐ | Electron 40 兼容、GBK 编码遗留、CN 分支回港机制缺失 |
| **国际化架构补齐** | #98994 | ⭐⭐ | 配置 Schema 国际化管线缺位，非单纯翻译任务 |
| **测试覆盖率系统性提升** | #36586, #99001, #99002, #98714, #98712 | ⭐⭐⭐⭐ | 多模块并行冲刺 70%→95%+，工具链、CLI、OAuth、Web 依赖全覆盖 |
| **平台适配细节打磨** | #98720 (Telegram), #98796 (Discord), #98719 (Browser) | ⭐⭐⭐ | 流式预览、线程活动指示器、覆盖层生命周期等 UX 细节 |

---

## 6. 开发者关注点（痛点与高频需求）

1. **压缩计数器的“多源不一致”**  
   - Hygiene 读取 `last_prompt_tokens`（Provider 报告）vs. 粗略估算双计数持久化 blob → 2.3× 差异导致自动压缩误触发/漏触发。  
   - **诉求**：单一 wire-truth 计费源，跨模型/跨运行时一致。

2. **“修复未随发布流转”**  
   - #71078 修复 GBK 解析 7/25 入主干，但 0.19.0-cn.7 (7/20 构建) 未含修复 → 中文用户图片上传全链路断裂。  
   - **诉求**：CN 分支自动回港/热修复机制，或统一构建流水线。

3. **Desktop 关闭即停群聊的架构单点**  
   - Desktop 充当“调度器”角色，关闭即丧失 Bot 轮转能力。  
   - **诉求**：去中心化会话状态机，支持 laptop/homelab/VPS 任意节点接管。

4. **诊断工具的“误报噪音”**  
   - `doctor --live` 凭任意 key 通过 FAL；`.env` 检查不区分“缺配置”与“探测失败”。  
   - **诉求**：诊断结论必须可信，区分“组件故障”与“探测器故障”。

5. **测试覆盖率门槛与遗留债务**  
   - `skills_hub.py` 13.87% 覆盖率存活 3 个月，2142 语句大面积裸奔。  
   - **诉求**：建立覆盖率回滚阻断、遗留模块专项攻坚机制。

6. **国际化架构旁路**  
   - Config Schema 硬编码英文绕过 `agent.i18n`，非翻译缺失而是管线缺位。  
   - **诉求**：统一元数据国际化抽象，避免新增配置项重复踩坑。

---

> **下一关注点**：#98997/#98998 合并后压缩链路是否收敛；#97681 架构评审结论；CN Desktop 补丁版本发布节奏。

</details>
