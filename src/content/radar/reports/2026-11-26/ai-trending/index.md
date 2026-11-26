---
title: "AI 开源趋势日报"
published: 2026-11-26
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-26

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-26 00:00 UTC

---

# AI 开源趋势日报（2026-11-26）

## 今日速览

今日 GitHub AI 开源生态呈现明显的“Agent 技能化”与“端侧小模型”双轮驱动态势。Claude Code、Cursor 等编程 Agent 的技能插件（Skill）爆发式增长，开发者正将 AI 能力以标准化技能包形式沉淀；与此同时，Minimind 等“两小时训练 64M 大模型”项目持续登榜，表明极小参数模型的快速训练与本地部署正成为社区关注焦点。Firecrawl 作为 Agent 知识基础设施保持高增速，RAG 与知识检索领域仍是投资热点。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [ollama/ollama](https://github.com/ollama/ollama) | 188,135 / - | 本地大模型运行与管理工具，支持 Kimi、GLM、DeepSeek 等多模型，今日持续受关注。 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | - / +191 | Intel 开源 AI 推理加速工具链，优化端侧与服务器端模型部署。 |
| [cursor/plugins](https://github.com/cursor/plugins) | - / +416 | Cursor 官方插件规范与生态库，标准化 AI 编辑器扩展能力。 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | - / +355 | 基于 Stitch MCP 服务器的 Agent 技能库，遵循 Agent Skills 开放标准。 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | - / +1106 | 将任意软件改造为 Agent 原生 CLI，推动传统工具与智能体对接。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | - / +1652 | Claude Code 漏洞挖掘与红队技能包，含 85 项技能与 681 个披露报告模式，今日增势最猛。 |
| [obra/superpowers](https://github.com/obra/superpowers) | - / +903 | Agentic 技能框架与软件开发方法论，助力构建智能化开发流程。 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | - / +945 | 跨平台话题调研 AI Agent 技能，支持 Reddit、X、YouTube 等多源信息综合。 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | - / +348 | 面向 CI/CD 可靠性的开源 Agent，自动化运维与故障处理。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,996 / - | Agent 工程平台，持续主导 LLM 应用开发框架赛道。 |
| [langgenius/dify](https://github.com/langgenius/dify) | 161,907 / - | 协作式 Agent 工作流与 RAG 流水线构建平台，支持云端与自建部署。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | - / +880 | AI 视频剪辑桌面工具，长视频一键生成短视频并配套字幕、封面与发布文案。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 145,699 / - | 基于大模型与自动化工作流的一键高清短视频生成工具。 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 123,771 / - | 面向金融研究的 Agentic 框架，探索智能体驱动的交易决策。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 70,929 / +826 | 两小时从零训练 64M 大模型，极小参数模型快速入门与实验首选。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 169,329 / - | 文本、视觉、音频与多模态 SOTA 模型定义框架，生态基础设施。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | 105,757 / - | 张量计算与动态神经网络框架，AI 训练与推理的核心底座。 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 201,827 / - | 面向所有人的开源机器学习框架，工业级模型训练与部署。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 109,052 / - | 逐步在 PyTorch 中从零实现类 ChatGPT 大模型，教学与研究价值高。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 210,011 / +1135 | Agent 知识基础设施，统一接口检索、抓取 550+ 数据源，使智能体更智能。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 153,376 / - | 将代码库、文档、SQL 与 PDF 转换为可查询知识图谱，支持多编程 Agent。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 159,568 / - | 用户友好的 AI 界面，兼容 Ollama、OpenAI API 等，适合知识交互场景。 |

## 趋势信号分析

今日热榜显示，**Agent 技能（Skill）标准化**正获得社区爆发式关注，Claude-BugHunter、superpowers、stitch-skills 等项目集中体现了将 AI 能力以插件化、可复用技能包形式交付的趋势，降低了将大模型集成到软件开发流程的门槛。**端侧小模型快速训练**成为新兴方向，Minimind 登榜反映开发者对低成本、可快速迭代的小参数模型兴趣浓厚，可能与近期边缘侧大模型发布及设备端部署需求上升相关。Firecrawl 持续高增，说明 RAG 与多源知识检索仍是 Agent 智能化的关键瓶颈，社区对统一数据接口的需求旺盛。未见全新技术栈首次登榜，但 MCP（Model Context Protocol）与 Agent Skills 开放标准正在从概念落地为具体工具库，与 Cursor、Claude Code 等 AI 编辑器生态的快速扩张密切相关。

## 社区关注热点

- **Claude-BugHunter**：今日新增星标破千，红队与漏洞挖掘 Agent 技能包，安全领域 AI 应用值得重点跟进。
- **Minimind**：两小时训练 64M 大模型，适合希望快速验证小模型训练流程的开发者与研究者。
- **Firecrawl**：Agent 知识基础设施，今日增势强劲，适合构建需要多源数据检索的智能体应用。
- **CLI-Anything**：将传统软件改造为 Agent 原生 CLI，探索“软件即技能”的新范式。
- **AutoGPT / Dify / LangChain**：成熟 Agent 框架持续占据高星位置，适合作为企业级 Agent 工作流的技术选型参考。

---

## Trending top10项目

1. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python]
   ⭐ 0 | 今日 +1652
   面向漏洞挖掘与外部红队工作的 Claude Code 技能包——涵盖 85 项技能、16 个斜杠命令，以及跨 24 个核心漏洞类别策划的 681 个披露报告模式，外加企业身份与基础设施攻击矩阵。
2. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +903
   一套好用的智能体技能框架与软件开发方法论。
3. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) [Python]
   ⭐ 0 | 今日 +1106
   “CLI-Anything：让所有软件都具备智能体原生能力”——CLI-Hub：https://clianything.cc/
4. [jingyaogong/minimind](https://github.com/jingyaogong/minimind) [Python]
   ⭐ 0 | 今日 +826
   🧠 两小时从零训练出你的 64M 大模型。从零开始，2 小时内训练自己的 64M LLM。
5. [cursor/plugins](https://github.com/cursor/plugins) [TypeScript]
   ⭐ 0 | 今日 +416
   Cursor 插件规范与官方插件
6. [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript]
   ⭐ 0 | 今日 +1135
   让智能体更智能的知识基础设施。通过一个 API 搜索、抓取并访问 550+ 个数据提供商。
7. [nginx/nginx](https://github.com/nginx/nginx) [C]
   ⭐ 0 | 今日 +176
   NGINX 开源版官方仓库。
8. [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) [C++]
   ⭐ 0 | 今日 +191
   OpenVINO™ 是一个用于优化和部署 AI 推理的开源工具包。
9. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +1141
   面向 Claude Code、Codex、GitHub Copilot、Cursor、Factory Droid、Qoder 和 Pi 的编辑式图表设计。52 种图表类型。自包含 HTML + SVG。无阴影。无 Mermaid 垃圾。
10. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) [Python]
   ⭐ 0 | 今日 +945
   AI 智能体技能，可在 Reddit、X、YouTube、HN、Polymarket 和网络上调研任何主题，然后合成有依据的摘要。
