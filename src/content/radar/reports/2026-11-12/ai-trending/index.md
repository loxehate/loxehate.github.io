---
title: "AI 开源趋势日报"
published: 2026-11-12
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-12

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-12 00:00 UTC

---

# AI 开源趋势日报（2026-11-12）

## 今日速览

今日 AI 开源生态呈现明显的“AI 编程与智能体基础设施”爆发态势。Trending 榜单中，AI 编码 Agent 工具（shadcn/improve、addyosmani/agent-skills）、浏览器自动化（vercel-labs/agent-browser）及安全审计（openai/codex-security）集中登榜，反映开发者正将大模型深度嵌入软件工程全链条。与此同时，垂直领域应用如 LLM 驱动的股票分析系统（ZhuLinsen/daily_stock_analysis）和智能家居 MCP 集成（homeassistant-ai/ha-mcp）也获得显著关注，显示“Agent + 垂直场景”正成为落地热点。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [ollama/ollama](https://github.com/ollama/ollama) | 186,687 / — | 本地运行 Kimi、DeepSeek、Qwen 等大模型的推理引擎，持续是本地模型部署的事实标准。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 168,879 / — | 业界最广泛的模型定义与推理框架，覆盖文本、视觉、音频与多模态模型。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,378 / — | Agent 工程平台，提供构建 LLM 应用的基础抽象与集成生态。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 120,742 / — | 开源 Python 库，赋予 AI Agent 浏览器自动化能力，配套云端代理 API。 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | — / +787 | 面向 AI 编码 Agent 的生产级工程技能集，今日 Trending 榜单新增星标显著。 |
| [openai/codex-security](https://github.com/openai/codex-security) | — / +52 | OpenAI 官方 Codex 安全 CLI 与 TypeScript SDK，用于发现、验证并修复代码漏洞。 |
| [shadcn/improve](https://github.com/shadcn/improve) | — / +361 | 利用强大模型审计代码库，并为更便宜的模型生成执行计划，体现“强模型规划、弱模型执行”范式。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [langgenius/dify](https://github.com/langgenius/dify) | 160,993 / — | 一体化 Agentic 工作流与 RAG 平台，支持云端、VPC 与自托管部署。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 187,999 / — | 经典自主 AI Agent 项目，致力于让 AI 对大众可用并可构建。 |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | — / +708 | 面向 AI Agent 的浏览器自动化 CLI，由 Vercel Labs 推出，今日热度突出。 |
| [homeassistant-ai/ha-mcp](https://github.com/homeassistant-ai/ha-mcp) | — / +645 | 通过 Claude、ChatGPT 等 AI 助手配置与自动化 Home Assistant，落地智能家居 MCP 场景。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 262,737 / — | 随用户成长的 AI Agent，社区关注度极高。 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | 113,186 / — | 开源应用，用于工作场景中对 AI Agent 的统一管理。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | — / +278 | LLM 驱动的多市场股票智能分析系统，集行情、新闻、决策看板与自动推送，支持零成本定时运行。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 142,585 / — | 基于 AI 大模型与自动化工作流，一键从主题或关键词生成高清短视频。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 200,960 / — | 为 AI Agent 提供网页及更多数据源，构建超级智能所需的数据库。 |
| [acon96/home-llm](https://github.com/acon96/home-llm) | 1,495 / — | Home Assistant 集成与本地 LLM 模型，用于本地化控制智能家居。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,719 / — | 在 Apple Silicon 上构建微型 vLLM + Qwen 推理系统，面向系统工程师学习 LLM 推理。 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | 319 / — | 基于 X-Bit 量化的设备端 LLM 推理，适合边缘端部署。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,584 / — | LLM 评测平台，覆盖 OpenAI、Anthropic、Qwen、DeepSeek 等百余种模型与 100+ 数据集。 |
| [llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm) | 1,446 / — | 日语 LLM 资源汇总，反映非英语语种大模型本地化趋势。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 146,164 / — | 将代码库、文档、SQL 与 PDF 转换为可查询的知识图谱，提供 Claude Code/Cursor 等技能集成。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 158,416 / — | 用户友好的 AI 界面，支持 Ollama、OpenAI API 等，常作为本地 RAG 前端使用。 |
| [f/prompts.chat](https://github.com/f/prompts.chat) | 176,922 / — | 社区驱动的 Prompt 分享与发现平台，适合自托管组织级提示词管理。 |

## 趋势信号分析

今日热榜显示，**AI 编程 Agent 与软件工程基础设施**正获得社区爆发式关注，shadcn/improve、addyosmani/agent-skills、vercel-labs/agent-browser 及 openai/codex-security 密集登上 Trending，表明开发者正将大模型从“聊天助手”推向代码审计、漏洞修复、浏览器自动化等工程核心环节。技术栈方面，**MCP（Model Context Protocol）与本地模型运行**成为新兴方向，homeassistant-ai/ha-mcp 与 ollama/ollama 的持续热度反映出本地化、私有化部署需求上升。与近期大模型发布（如 GPT-OSS 系列、Qwen 等）的关联显著：ollama 等工具迅速适配新模型，而 Dify、LangChain 等工作流平台则在快速集成新模型能力，形成“新模型发布 → 基础设施适配 → 垂直应用落地”的快速循环。

## 社区关注热点

- **[vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)**：Vercel 官方出品的 AI Agent 浏览器自动化 CLI，今日 Trending 新增 +708 星，值得关注其对无头浏览器与 Agent 交互的新范式。
- **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)**：LLM 驱动的多市场股票分析系统，今日新增 +278 星，体现垂直金融场景对 LLM 自动化的强劲需求。
- **[homeassistant-ai/ha-mcp](https://github.com/homeassistant-ai/ha-mcp)**：将 Home Assistant 与 Claude、ChatGPT 等 AI 助手通过 MCP 打通，今日新增 +645 星，是智能家居本地化 AI 控制的代表方向。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)**：将代码库与文档转为可查询知识图谱，并提供多 IDE Agent 技能，适合关注代码理解与 RAG 落地的开发者。
- **[ollama/ollama](https://github.com/ollama/ollama)**：持续领跑本地大模型运行工具，适配 Kimi、GLM、DeepSeek、Qwen 等模型，是本地 AI 推理的首选基础设施。

---

## Trending top10项目

1. [meta/astryx](https://github.com/meta/astryx) [TypeScript]
   ⭐ 0 | 今日 +2776
   完全可定制且代理就绪的开源设计系统
2. [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) [Python]
   ⭐ 0 | 今日 +278
   LLM驱动的多市场股票智能分析系统，支持多源行情、实时新闻、决策看板、自动推送及零成本定时运行
3. [GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) [TypeScript]
   ⭐ 0 | 今日 +159
4. [shadcn/improve](https://github.com/shadcn/improve)
   ⭐ 0 | 今日 +361
   用最强模型审计代码库，为低成本模型制定执行计划
5. [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) [JavaScript]
   ⭐ 0 | 今日 +787
   Production-grade engineering skills for AI coding agents.
6. [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) [Rust]
   ⭐ 0 | 今日 +708
   AI代理的浏览器自动化CLI
7. [we-promise/sure](https://github.com/we-promise/sure) [Ruby]
   ⭐ 0 | 今日 +1078
   大众共建的个人理财应用
8. [homeassistant-ai/ha-mcp](https://github.com/homeassistant-ai/ha-mcp) [Python]
   ⭐ 0 | 今日 +645
   借助Claude、ChatGPT等AI助手配置和自动化Home Assistant
9. [openai/codex-security](https://github.com/openai/codex-security) [TypeScript]
   ⭐ 0 | 今日 +52
   OpenAI Codex安全CLI及TypeScript SDK，用于查找、验证和修复安全漏洞
10. [TheAlgorithms/Java](https://github.com/TheAlgorithms/Java) [Java]
   ⭐ 0 | 今日 +51
   Java实现的所有算法
