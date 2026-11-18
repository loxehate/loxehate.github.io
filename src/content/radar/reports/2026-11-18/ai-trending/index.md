---
title: "AI 开源趋势日报"
published: 2026-11-18
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-18

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-18 00:00 UTC

---

# AI 开源趋势日报（2026-11-18）

## 今日速览

今日 AI 开源领域呈现明显的 **Agent 技能化** 与 **协议标准化** 趋势。围绕 Claude Code、Cursor 等编程 Agent 的技能包（Skill Bundle）、插件规范与协议层项目集中登上 Trending 榜单，社区正在加速构建“Agent 操作系统”的基础设施。多智能体框架在科研写作、金融交易等垂直场景快速落地，AI Office 与代码审查工具获得爆发式关注。基础模型训练方面，小参数模型从零训练项目持续受到开发者追捧。

---

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) | - / +1,445 | Agent-User Interaction 协议，旨在将 AI Agent 原生带入前端应用，今日协议层项目登顶 Trending，反映前端与 Agent 交互标准化需求激增。 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | - / +763 | 阿里巴巴开源的代码审查工具，采用确定性流水线 + LLM Agent 混合架构，提供精确行级评论，适合大规模工程落地。 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | - / +350 | 适配 Stitch MCP Server 的 Agent 技能库，遵循 Agent Skills 开放标准，增强编程 Agent 能力。 |
| [cursor/plugins](https://github.com/cursor/plugins) | - / +201 | Cursor 官方插件规范与插件集，Cursor 作为 AI 原生编辑器，其插件生态今日持续受到关注。 |
| [ollama/ollama](https://github.com/ollama/ollama) | 187,431 / - | 本地大模型运行工具，支持 Kimi、GLM、DeepSeek、Qwen 等多模型，是 AI 基础设施中的长青项目。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [obra/superpowers](https://github.com/obra/superpowers) | - / +1,917 | Agentic 技能框架与软件开发方法论，今日 Trending 新增 stars 最高，体现社区对 Agent 工作流方法论的强烈需求。 |
| [google-research/paper-orchestra](https://github.com/google-research/paper-orchestra) | - / +1,072 | Google 研究级多智能体框架，用于自动化 AI 论文写作，标志着多智能体进入高价值科研场景。 |
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | - / +1,005 | Claude Code 漏洞猎杀技能包，含 82 项技能与 681 个漏洞报告模式，专为外部红队工作设计。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 305,483 / +883 | Agent 性能优化系统，涵盖技能、本能、记忆与安全，适配 Claude Code、Codex、Opencode、Cursor 等多平台。 |
| [Tencent/LoopForge](https://github.com/Tencent/LoopForge) | - / +591 | 腾讯开源的代码 Agent 交付工作流，支持 CodeBuddy、Codex、Claude Code 编排与人工审批门禁。 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | - / +696 | AI Agent 研究技能，可跨 Reddit、X、YouTube 等平台调研并生成有据可查的总结。 |
| [backnotprop/plannotator](https://github.com/backnotprop/plannotator) | - / +691 | Agent 工作空间，支持代码规划、标注、审查与团队反馈回传，强化人机协作闭环。 |
| [langgenius/dify](https://github.com/langgenius/dify) | 161,378 / - | 一体化 Agentic 工作流与 RAG 平台，支持云端/VPC/自建部署，是企级 Agent 开发的热门选择。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 121,327 / - | 开源 AI 浏览器 Agent 库，提供隐身浏览器与托管 Agent API，适合 Web 自动化场景。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [dream-num/univer](https://github.com/dream-num/univer) | - / +1,774 | 基于 Univer Office SDK 构建 AI 办公套件，将编辑、计算、协作与文件处理能力嵌入产品，今日新增 stars 破千。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 144,220 / - | 基于 AI 大模型与自动化工作流一键生成高清短视频，代表内容生成垂直应用方向。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 158,955 / - | 用户友好的 AI 界面，支持 Ollama、OpenAI API 等，是本地模型交互的热门前端。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 149,651 / - | 将代码库、文档、SQL 与 PDF 转化为可查询知识图谱，适配 Claude Code、Cursor 等编程 Agent。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | - / +192 | 仅需 2 小时即可从零训练 64M 参数 LLM，降低模型训练门槛，适合教学与快速实验。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | 105,809 / - | 张量与动态神经网络框架，GPU 加速深度学习的事实标准。 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 201,757 / - | 面向所有人的开源机器学习框架，工业级模型训练与部署基础设施。 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | 63,537 / - | YOLO 系列目标检测与分割框架，计算机视觉领域广泛采用的开源工具。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 202,640 / - | 面向 Agent 的知识基础设施，通过单一 API 提供搜索、抓取与 550+ 数据源接入，使 Agent 更智能。 |
| [openbq-org/OpenBB](https://github.com/openbq-org/OpenBB) | 75,496 / - | 面向分析师、量化交易员与 AI Agent 的开放数据平台，结合金融检索增强场景。 |
| [langgenius/dify](https://github.com/langgenius/dify) | 161,378 / - | 支持构建 RAG 流水线与 Agentic 工作流，知识管理与检索增强的核心组件之一。 |

---

## 趋势信号分析

今日热榜显示，**Agent 技能包（Skill）与协议层基础设施**正在获得社区爆发式关注。obra/superpowers、ag-ui、Claude-BugHunter 等项目集中登榜，表明开发者正从单一模型调用转向构建标准化、可复用的 Agent 能力库与交互协议。Cursor 插件规范、Stitch Skills 等项目进一步印证了“AI 原生编辑器生态”正在快速成形。

新兴技术栈方面，**MCP（Model Context Protocol）与 Agent Skills 开放标准**首次在 Trending 中形成集群，成为连接模型、工具与前端的关键粘合剂。与此同时，Google 发布的 paper-orchestra 等多智能体框架，将 Agent 推向自动化科研写作等高价值垂直领域。

与行业事件关联：Claude Code、Codex、Cursor 等编程 Agent 近期持续迭代，带动了围绕其的技能包、审计工具与工作流编排需求激增；AI Office 与代码审查工具的爆发，也呼应了企业对“AI 员工”自动化交付的落地诉求。

---

## 社区关注热点

- **[obra/superpowers](https://github.com/obra/superpowers)**：今日新增 stars 近 2000，Agentic 技能框架与开发方法论，值得关注其如何定义 Agent 工程化最佳实践。
- **[ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)**：Agent-User Interaction 协议，若被前端生态广泛采纳，可能成为 AI 应用交互的新标准。
- **[google-research/paper-orchestra](https://github.com/google-research/paper-orchestra)**：Google 出品的多智能体论文写作框架，观察其在自动化科研中的实际产出质量与可复用性。
- **[dream-num/univer](https://github.com/dream-num/univer)**：AI Office 方向黑马，今日新增 stars 破 1700，关注其 Office SDK 对 AI Agent 的文档处理能力。
- **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)**：低门槛从零训练 LLM，适合希望快速理解大模型训练全流程的开发者与学术研究者。

---

## Trending top10项目

1. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python]
   ⭐ 0 | 今日 +1005
   面向漏洞挖掘与外部红队工作的 Claude Code 技能包 - 82 个技能，15 个斜杠命令，涵盖 24 个核心漏洞类别的 681 个已披露报告模式，外加企业身份与基础设施攻击矩阵。
2. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) [Python]
   ⭐ 0 | 今日 +696
   AI 代理技能，可在 Reddit、X、YouTube、HN、Polymarket 和网络上研究任何主题，然后合成有依据的摘要。
3. [alibaba/open-code-review](https://github.com/alibaba/open-code-review) [Go]
   ⭐ 0 | 今日 +763
   安全、快速、高效，经阿里巴巴规模验证。混合架构代码审查工具：确定性流水线 + LLM 代理，精确行级评论，内置多语言规则集（NPE、线程安全、XSS、SQL 注入），兼容 OpenAI 与 Anthropic。
4. [Tencent/LoopForge](https://github.com/Tencent/LoopForge) [Go]
   ⭐ 0 | 今日 +591
   面向编码代理交付的自托管工作流。使用脚本和人工审批门禁编排 CodeBuddy、Codex 和 Claude Code。包含面向编码助手的本地工作流。
5. [dream-num/univer](https://github.com/dream-num/univer) [TypeScript]
   ⭐ 0 | 今日 +1774
   使用 Univer Office SDK 构建您自己的 AI 办公室。将编辑、计算、协作和文件处理引入您的产品，供人类和 AI 代理使用。构建在可扩展的开源核心之上。
6. [getarcaneapp/arcane](https://github.com/getarcaneapp/arcane) [Go]
   ⭐ 0 | 今日 +618
   面向所有人的现代 Docker 管理工具
7. [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) [TypeScript]
   ⭐ 0 | 今日 +350
   专为与 Stitch MCP 服务器协作而设计的 Agent 技能库。每个技能均遵循 Agent 技能开放标准，兼容 Antigravity、Gemini CLI、Claude Code、Cursor 等编码代理。
8. [cursor/plugins](https://github.com/cursor/plugins) [TypeScript]
   ⭐ 0 | 今日 +201
   Cursor 插件规范与官方插件
9. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +1917
   一套可落地的代理技能框架与软件开发方法论
10. [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) [TypeScript]
   ⭐ 0 | 今日 +1445
   AG-UI：代理-用户交互协议。将代理引入前端应用。
