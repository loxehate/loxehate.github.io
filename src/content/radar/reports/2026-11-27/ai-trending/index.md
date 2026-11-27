---
title: "AI 开源趋势日报"
published: 2026-11-27
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-27

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-27 00:00 UTC

---

# AI 开源趋势日报（2026-11-27）

## 今日速览

今日 AI 开源生态呈现明显的“Agent 化基础设施”爆发态势。Claude Code、Cursor 等 AI 编辑器的技能插件（Skill）与 MCP 生态成为今日 Trending 最活跃领域，多个相关项目单日新增 stars 破千。轻量大模型从零训练（如 minimind）与本地化 AI 应用（如 AutoClip）保持高关注度，而 Firecrawl 等面向 Agent 的知识基础设施持续领涨。整体来看，开发者正从单一模型调用转向构建“Agent + 技能 + 外部知识”的完整工程化体系。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [ollama/ollama](https://github.com/ollama/ollama) | 188,241 / — | 本地大模型运行与管理工具，支持 Kimi、GLM、DeepSeek 等多模型，是当前本地 AI 推理的事实标准。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 169,371 / — | 机器学习模型定义与推理框架，覆盖文本、视觉、音频与多模态，持续是 AI 开发的核心基础设施。 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | — / +176 | 英特尔开源 AI 推理优化部署工具链，今日登榜反映边缘推理加速需求回升。 |
| [cursor/plugins](https://github.com/cursor/plugins) | — / +270 | Cursor 官方插件规范与插件集，标准化 AI 编辑器扩展生态，今日新增显著。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 210,922 / +1046 | 面向 Agent 的知识基础设施，统一搜索、抓取与 550+ 数据源访问，今日 Trending 涨幅最大项目之一。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9,280 / — | Rust 编写的模块化 LLM 应用构建框架，适合构建高性能 Agent 系统。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 150,038 / — | Agent 工程平台，提供构建 LLM 应用与工作流的标准组件，生态最成熟的 Agent 框架之一。 |
| [langgenius/dify](https://github.com/langgenius/dify) | 161,959 / — | 一体化 Agentic 工作流与 RAG 构建平台，支持云端/VPC/自建部署，面向团队协作场景。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 188,203 / — | 面向大众的可访问 AI Agent 工具，持续探索自主 Agent 与任务自动化边界。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 266,384 / — | 随用户成长的个人 AI Agent，强调长期记忆与个性化协作。 |
| [obra/superpowers](https://github.com/obra/superpowers) | — / +854 | Agentic 技能框架与软件开发方法论，主打“让软件具备 Agent 能力”，今日 Trending 新增突破 800。 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | — / +327 | 面向 CI/CD 可靠性的开源 Agent，将 AI 引入运维与发布流程，代表 DevOps 领域的 Agent 化趋势。 |
| [Eigenwise/atomic-agents](https://github.com/Eigenwise/atomic-agents) | 6,349 / — | 原子化 AI Agent 构建框架，主张通过微小可组合 Agent 实现复杂任务。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | — / +774 | 本地优先的 AI 视频剪辑桌面工具与 MCP Server，一键将长视频转短视频，开源 OpusClip 替代方案。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 145,867 / — | 基于 AI 大模型与自动化工作流一键生成高清短视频，内容创作垂直场景代表。 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 123,847 / — | 面向金融研究的 Agentic 系统，探索多智能体在投资决策与市场分析中的应用。 |
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | — / +1597 | Claude Code 漏洞猎杀与红队技能包，包含 85 项技能与 681 个披露报告模式，今日涨幅最高。 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | — / +759 | 跨平台（Reddit、X、YouTube 等）话题调研与总结的 AI Agent 技能，适合舆情与市场研究。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 71,614 / +702 | 两小时从零训练 64M 参数大模型，极低门槛的 LLM 从零教学与实践项目，今日持续高涨。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,645 / — | LLM 评测平台，覆盖 OpenAI、Anthropic、Qwen、DeepSeek 等超 100 个数据集，模型能力评估基础设施。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,815 / — | 针对 Apple Silicon 的微型 LLM 推理系统，面向系统工程师的 vLLM 学习与实践项目。 |
| [galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining) | 354 / — | 可靠、极简且可扩展的基础模型与世界模型预训练库，探索稳定的大规模预训练方法。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 210,922 / +1046 | 为 Agent 提供统一知识检索与网络数据接入，降低 RAG 系统构建的数据源复杂度。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 153,846 / — | 将代码库、文档、SQL 与 PDF 转换为可查询知识图谱，支持 Claude Code、Cursor 等编辑器技能集成。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 159,644 / — | 用户友好的 AI 界面，支持 Ollama、OpenAI API 等多后端，兼具知识管理与对话检索能力。 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | 565 / — | 通用 LLM 网关，提供 OpenAI/Anthropic 兼容端点与多供应商负载均衡，适合多模型知识检索场景。 |

## 趋势信号分析

今日热榜最显著的信号是 **AI Agent 技能化与编辑器原生化** 正在获得社区爆发式关注。Claude-BugHunter、superpowers、CLI-Anything、stitch-skills 等项目集中围绕 Claude Code、Cursor 等 AI 编辑器展开，通过“技能包（Skill）”与 MCP 协议将通用软件改造为 Agent-Native，单日新增 stars 普遍超过 700，表明开发者正从聊天式交互转向嵌入式工作流自动化。

新兴技术栈方面，**Rust 语言在 LLM 应用框架中的渗透**（如 rig）以及 **本地优先（local-first）AI 应用**（如 AutoClip）首次获得显著曝光，暗示社区对推理效率、数据隐私与端侧部署的需求在上升。与近期大模型发布的关联在于，轻量模型训练（minimind）与多模型网关（ollama、LLM-API-Key-Proxy）的持续热度，反映开发者在模型能力趋同后，更关注模型如何被工程化集成到具体场景。

## 社区关注热点

- **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)**：今日涨幅最大，作为 Agent 知识基础设施，其统一搜索与抓取能力正成为 RAG 系统的标准组件。
- **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)**：极低门槛的“两小时训练大模型”范式，适合希望快速理解 LLM 训练全流程的开发者。
- **[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)**：AI 安全与红队方向的技能包，单日涨超 1500，显示 LLM 在漏洞挖掘与安全测试中的实战化探索。
- **[zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip)**：本地优先 AI 视频剪辑工具，代表垂直内容创作场景的开源替代方案，值得内容产业开发者关注。
- **[ollama/ollama](https://github.com/ollama/ollama)**：本地模型运行的长青项目，持续高活跃度说明边缘/私有化部署仍是企业与个人开发者的核心需求。

---

## Trending top10项目

1. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python]
   ⭐ 0 | 今日 +1597
   面向漏洞挖掘与外部红队工作的 Claude Code 技能包——85 项技能、16 个斜杠命令、跨 24 类核心漏洞的 681 个已披露报告模式，外加企业身份与基础设施攻击矩阵。
2. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +854
   好用的智能体技能框架与软件开发方法论。
3. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) [Python]
   ⭐ 0 | 今日 +746
   "CLI-Anything：让所有软件皆具原生智能体能力" —— CLI-Hub: https://clianything.cc/
4. [jingyaogong/minimind](https://github.com/jingyaogong/minimind) [Python]
   ⭐ 0 | 今日 +702
   🧠 两小时从零训练出你的 64M 大模型。从零开始，两小时内训练你自己的 64M LLM。
5. [cursor/plugins](https://github.com/cursor/plugins) [TypeScript]
   ⭐ 0 | 今日 +270
   Cursor 插件规范与官方插件
6. [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript]
   ⭐ 0 | 今日 +1046
   让智能体更智能的知识基础设施。通过一个 API 搜索、抓取并访问 550+ 个数据提供商。
7. [nginx/nginx](https://github.com/nginx/nginx) [C]
   ⭐ 0 | 今日 +150
   NGINX 开源版官方仓库。
8. [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) [C++]
   ⭐ 0 | 今日 +176
   OpenVINO™ 是用于优化和部署 AI 推理的开源工具包。
9. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +955
   面向 Claude Code、Codex、GitHub Copilot、Cursor、Factory Droid、Qoder 和 Pi 的编辑式图表设计。52 种图表类型。自包含 HTML + SVG。无阴影。无 Mermaid 垃圾。
10. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) [Python]
   ⭐ 0 | 今日 +759
   AI 智能体技能，可在 Reddit、X、YouTube、HN、Polymarket 和网络上调研任何主题，然后合成有依据的摘要。
