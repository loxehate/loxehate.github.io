---
title: "AI 开源趋势日报"
published: 2026-11-28
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-28

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-28 00:00 UTC

---

# AI 开源趋势日报（2026-11-28）

## 今日速览

今日 GitHub AI 开源生态呈现明显的“Agent 技能化”与“本地化小模型”双轮驱动态势。Trending 榜单被大量 AI Agent 技能包、MCP 插件及 CLI 类开发工具占据，Claude-BugHunter 单日增涨 1608 星，体现安全红队与代码审计场景对智能体的快速采纳。与此同时，minimind 以“两小时训练 64M 大模型”再次登榜，反映社区对极小参数模型从零训练的实验热情未减。Firecrawl、OpenVINO 等基础设施项目持续获得关注，表明 Agent 时代对知识检索与推理部署层的需求正在集中爆发。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [CLI-Anything](https://github.com/HKUDS/CLI-Anything) | - / +666 | 致力于让所有软件变为 Agent 原生的 CLI 集成中心，今日热度显著。 |
| [cursor/plugins](https://github.com/cursor/plugins) | - / +243 | Cursor 官方插件规范与生态，标志 AI 编辑器插件体系开始形成开放标准。 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | - / +151 | Intel 开源 AI 推理加速工具包，持续在边缘与服务器部署场景获得关注。 |
| [ollama/ollama](https://github.com/ollama/ollama) | 188,337 / - | 本地运行大模型的事实标准工具，支持 Kimi、GLM、DeepSeek 等多模型，是本地 AI 基础设施核心。 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 39,017 / - | Agent 前端技术栈与 AG-UI 协议制定者，帮助开发者快速构建生成式 UI 与智能体交互。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | - / +1608 | 面向 Claude Code 的漏洞挖掘与红队技能包，含 85 项技能与 681 个漏洞报告模式，今日涨幅最高。 |
| [superpowers](https://github.com/obra/superpowers) | - / +922 | Agentic 技能框架与软件开发方法论，主打通过技能组合提升开发效率。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 211,671 / +822 | 面向 Agent 的知识基础设施，统一搜索、抓取与 550+ 数据源访问，使智能体“更聪明”。 |
| [last30days-skill](https://github.com/mvanhorn/last30days-skill) | - / +675 | 跨 Reddit、X、YouTube 等多平台话题调研与总结的 AI Agent 技能。 |
| [stitch-skills](https://github.com/google-labs-code/stitch-skills) | - / +311 | Google Labs 推出的适配 Stitch MCP 服务器的 Agent 技能库，遵循开放技能标准。 |
| [opensre](https://github.com/Tracer-Cloud/opensre) | - / +328 | 面向 CI/CD 可靠性的开源 Agent，将智能体引入运维与发布流程。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 266,606 / - | 社区高星 Agent 项目，主打“随你一起成长”的个人智能体。 |
| [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) | 41,217 / - | Rust 编写的开源代码 Agent，支持多 Agent 舰队、MCP 与系统沙箱。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [autoclip](https://github.com/zhouxiaoka/autoclip) | - / +718 | 本地优先的 AI 视频剪辑桌面工具，一键将长视频转短视频，Opensource OpusClip 替代方案。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | 85,231 / - | AI 求职 Agent，可扫描招聘看板、根据简历评分并定制 ATS 友好简历与求职信。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 75,008 / - | LLM 驱动的多市场股票智能分析系统，支持行情、新闻、决策看板与自动推送。 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 123,936 / - | 面向金融研究的 Agentic 框架，探索多智能体在交易决策中的应用。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 146,001 / - | 基于大模型与自动化工作流的一键高清短视频生成工具。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 72,202 / +660 | 两小时从零训练出 64M 参数大模型，极小模型从零训练的教学与实验范例。 |
| [huggingface/transformers](https://github.com/huggingface/huggingface/transformers) | 169,393 / - | 机器学习模型定义框架的事实标准，覆盖文本、视觉、音频与多模态模型。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 150,097 / - | Agent 工程平台，持续演进为构建 LLM 应用的核心编排框架。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 211,671 / +822 | 为 Agent 提供统一搜索、抓取与数据接入能力，是 RAG 管线的上游知识基础设施。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 47,437 / - | 隐私优先、自托管的知识工作空间，支持人与 AI Agent 协作。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 154,268 / - | 将代码库、文档、SQL 与 PDF 转换为可查询知识图谱，并提供 Claude Code/Cursor 等技能。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 159,700 / - | 用户友好的 AI 界面，支持 Ollama、OpenAI API 等，常作为本地知识库前端。 |

## 趋势信号分析

今日热榜显示，**Agent 技能包与 MCP 插件生态**正在获得社区爆发式关注，Claude-BugHunter、superpowers、stitch-skills 等项目集中体现了“将大模型能力拆解为可组合技能”的范式转变。与此同时，**极小参数模型本地训练**（minimind）与**本地模型运行**（ollama）持续受追捧，说明开发者正在寻求低成本、可私有化的模型落地路径。Firecrawl 与 OpenVINO 的持续上榜，则印证了 Agent 时代对“知识接入层”与“推理部署层”基础设施的强烈需求。

从技术栈看，TypeScript 与 Python 依然主导 Agent 工具链，Shell 脚本类框架（superpowers）则暗示轻量化、可嵌入的 Agent 工作流开始受到关注。首次高频登榜的“AI Agent 技能包”形态，与近期 Claude Code、Cursor 等 AI 编程工具开放插件系统的行业事件高度相关，社区正在从单一聊天界面向“工具原生智能体”迁移。

## 社区关注热点

- **[Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)**：今日涨幅冠军，安全红队与代码审计场景的 Agent 实践值得关注。
- **[minimind](https://github.com/jingyaogong/minimind)**：极小模型从零训练的低门槛方案，适合教育与边缘设备实验。
- **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)**：Agent 知识基础设施，为 RAG 与智能体提供统一数据入口，持续高热度。
- **[cursor/plugins](https://github.com/cursor/plugins)**：AI 编辑器插件标准化的早期信号，关注未来 IDE-Agent 交互范式。
- **[autoclip](https://github.com/zhouxiaoka/autoclip)**：本地优先的 AI 视频剪辑工具，垂直多媒体应用的代表性开源尝试。

---

## Trending top10项目

1. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python]
   ⭐ 0 | 今日 +1608
   面向漏洞挖掘与外部红队工作的 Claude Code 技能包——85 项技能、16 个斜杠命令、跨 24 个核心漏洞类别的 681 个披露报告模式，外加企业身份与基础设施攻击矩阵。
2. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +922
   好用的智能体技能框架与软件开发方法论。
3. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) [Python]
   ⭐ 0 | 今日 +666
   “CLI-Anything：让所有软件原生支持智能体”——CLI-Hub: https://clianything.cc/
4. [jingyaogong/minimind](https://github.com/jingyaogong/minimind) [Python]
   ⭐ 0 | 今日 +660
   🧠 两小时从零训练出你的 64M 大模型。
5. [cursor/plugins](https://github.com/cursor/plugins) [TypeScript]
   ⭐ 0 | 今日 +243
   Cursor 插件规范与官方插件。
6. [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript]
   ⭐ 0 | 今日 +822
   让智能体更智能的知识基础设施。通过单一 API 搜索、抓取并访问 550+ 个数据提供商。
7. [nginx/nginx](https://github.com/nginx/nginx) [C]
   ⭐ 0 | 今日 +146
   官方 NGINX 开源仓库。
8. [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) [C++]
   ⭐ 0 | 今日 +151
   OpenVINO™ 是用于优化和部署 AI 推理的开源工具包。
9. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +725
   面向 Claude Code、Codex、GitHub Copilot、Cursor、Factory Droid、Qoder 和 Pi 的编辑图表设计。52 种图表类型。自包含 HTML + SVG。无阴影。无 Mermaid 垃圾。
10. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) [Python]
   ⭐ 0 | 今日 +675
   AI 智能体技能，可在 Reddit、X、YouTube、HN、Polymarket 和网络上调研任何主题，然后合成有依据的摘要。
