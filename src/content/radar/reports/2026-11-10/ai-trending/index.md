---
title: "AI 开源趋势日报"
published: 2026-11-10
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-10

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-10 00:00 UTC

---

# AI 开源趋势日报（2026-11-10）

## 今日速览

今日 AI 开源生态围绕 **AI Agent 基础设施** 呈现爆发式增长，Anthropic 官方发布的 `skills` 与 `claude-quickstarts` 双双登上 Trending，标志着大模型厂商正加速下沉至开发者工具层。浏览器自动化（`agent-browser`）、持久化记忆（`mem0`）与上下文压缩（`headroom`）等 Agent 基础设施获得社区高度关注，而 LLM 驱动的垂直应用（如股票分析、财务交易）则持续活跃。整体来看，"Agent-ready" 已成为今日热门仓库的核心标签。

## 各维度热门项目

### 🔧 AI 基础工具

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [ollama/ollama](https://github.com/ollama/ollama) | 186,444 / — | 本地运行 Kimi、DeepSeek、Qwen 等大模型的轻量工具，今日持续登榜，反映本地推理需求旺盛。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 168,710 / — | 业界标准的模型定义与推理框架，覆盖文本、视觉、音频与多模态模型，是 AI 开发的基础设施。 |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | — / +916 | 专为 AI Agent 设计的浏览器自动化 CLI，用 Rust 构建，今日 Trending 增幅显著，切中 Agent 交互痛点。 |
| [anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts) | — / +551 | Anthropic 官方 Claude API 快速上手项目集，帮助开发者快速构建可部署的 AI 应用，官方背书强劲。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 79,250 / — | 面向 LLM 的上下文压缩工具，对编码 Agent 可节省 20% Token，对 JSON 场景最高节省 95%，降本效果显著。 |

### 🤖 AI 智能体/工作流

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 44,708 / — | LangChain 官方多智能体编排框架，主打构建有韧性的 Agent 工作流，是当前 Agent 工程的事实标准之一。 |
| [langgenius/dify](https://github.com/langgenius/dify) | 160,777 / — | 一体化 Agentic 工作流与 RAG 平台，支持自托管与云端部署，适合团队协作构建 AI 应用。 |
| [anthropics/skills](https://github.com/anthropics/skills) | — / +1038 | Anthropic 官方 Agent Skills 公共仓库，今日新增超 1000 颗星，标志着大模型厂商开始直接输出 Agent 能力组件。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68,708 / — | AI Agent 的记忆层基础设施，支持跨会话持久化上下文，适合生产环境的智能体记忆管理。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 120,446 / — | 开源 AI 浏览器 Agent 库，提供隐身浏览器与托管 Agent API，是 Web 自动化 Agent 的热门选择。 |

### 📦 AI 应用

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | — / +506 | LLM 驱动的多市场股票智能分析系统，整合行情、新闻与决策看板，支持零成本定时运行，垂直金融场景代表。 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 121,615 / — | 基于多 Agent LLM 的金融交易框架，将 Agent 范式引入量化交易决策，今日在主题搜索中保持高热度。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 141,606 / — | 利用大模型与自动化工作流一键生成高清短视频，代表 AI 内容生成（AIGC）在垂直场景的落地。 |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | 57,607 / — | 终身个性化 AI 导师系统，面向教育垂直领域，体现大模型在个性化教学中的应用潜力。 |
| [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | — / +1587 | 开源 Grok 机器人替代方案，内置虚拟机供 Bot 使用，今日 Trending 新增近 1600 颗星，社区关注度高。 |

### 🧠 大模型/训练

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,699 / — | 针对 Apple Silicon 构建的微型 LLM 推理系统（类 vLLM + Qwen），适合系统工程师学习 LLM 推理原理。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,578 / — | LLM 评测平台，覆盖 OpenAI、Anthropic、Qwen、DeepSeek 等 100+ 数据集，是模型能力评估的重要工具。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9,102 / — | 用 Rust 构建模块化、可扩展的 LLM 应用框架，为 Rust 生态中的 AI 开发提供新选择。 |

### 🔍 RAG/知识库

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93,896 / — | Agent-native 数据库与 RAG 引擎，从检索增强演进为上下文基础设施，适合构建复杂 Agent 知识系统。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | 52,862 / — | AI 文档处理平台，支持将代码库、文档、PDF 转换为可查询的知识结构，是 RAG 应用的核心框架。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | 46,619 / — | 云原生高性能向量数据库，专为可扩展的向量近邻搜索（ANN）设计，是 RAG 系统的底层存储首选。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 145,023 / — | 将代码库、文档、SQL 与 PDF 转换为可查询知识图谱，并提供 Claude Code、Cursor 等技能集成。 |

## 趋势信号分析

今日热榜显示，**AI Agent 基础设施**正获得社区爆发式关注。Anthropic 官方连续发布 `skills` 与 `claude-quickstarts`，表明大模型厂商正从模型层向开发者工具层下沉，直接提供 Agent 能力组件与快速启动模板。浏览器自动化（`agent-browser`）、持久化记忆（`mem0`）与上下文压缩（`headroom`）等工具集中登榜，反映开发者正从“单次对话”转向“长周期自动化 Agent”，对工具链的完整性提出更高要求。

技术栈方面，**Rust 语言在 AI 工具链中崭露头角**，`agent-browser` 与 `rig` 均采用 Rust 构建，可能与其在系统级性能与内存安全方面的优势有关，值得后续关注。与近期大模型发布（如 Claude 系列、Grok 等）的关联显而易见：`OpenMausBot` 作为 Grok 替代方案今日暴涨，`claude-quickstarts` 紧跟 Anthropic 生态，说明新模型发布会直接带动其周边开源工具的社区热度。

## 社区关注热点

- **[anthropics/skills](https://github.com/anthropics/skills)**：Anthropic 官方 Agent Skills 仓库，今日新增超 1000 颗星，是大模型厂商下沉 Agent 能力层的重要信号。
- **[vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)**：Rust 构建的 AI Agent 浏览器自动化 CLI，今日 Trending 增幅突出，适合关注 Web Agent 交互方向。
- **[mem0ai/mem0](https://github.com/mem0ai/mem0)**：AI Agent 记忆层基础设施，解决跨会话上下文持久化问题，适合构建生产级智能体应用。
- **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)**：LLM 驱动的股票分析系统，今日新增 500+ 星，代表垂直金融场景的 AI 应用仍有活跃社区。
- **[0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig)**：Rust 编写的模块化 LLM 应用框架，为非 Python 生态的 AI 开发提供新路径，值得 Rust 开发者关注。

---

## Trending top10项目

1. [anthropics/skills](https://github.com/anthropics/skills) [Python]
   ⭐ 0 | 今日 +1038
   Agent技能公共仓库
2. [meta/astryx](https://github.com/meta/astryx) [TypeScript]
   ⭐ 0 | 今日 +3278
   完全可定制且面向代理的开源设计系统
3. [sherlock-project/sherlock](https://github.com/sherlock-project/sherlock) [Python]
   ⭐ 0 | 今日 +4267
   跨社交网络通过用户名追踪社交媒体账号
4. [google-deepmind/mujoco](https://github.com/google-deepmind/mujoco) [C++]
   ⭐ 0 | 今日 +574
   带接触的多关节动力学通用物理模拟器
5. [anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts) [Python]
   ⭐ 0 | 今日 +551
   使用Claude API快速构建可部署应用的项目集合
6. [garrytan/gbrain](https://github.com/garrytan/gbrain) [TypeScript]
   ⭐ 0 | 今日 +216
   Garry的OpenClaw/Hermes代理大脑
7. [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) [Rust]
   ⭐ 0 | 今日 +916
   AI代理浏览器自动化CLI
8. [ruvnet/RuView](https://github.com/ruvnet/RuView) [Rust]
   ⭐ 0 | 今日 +172
   将普通WiFi信号转为实时空间感知、生命体征监测和存在检测，无需视频像素
9. [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) [Python]
   ⭐ 0 | 今日 +506
   LLM驱动的多市场股票智能分析系统，支持多源行情、实时新闻、决策看板、自动推送及零成本定时运行
10. [homeassistant-ai/ha-mcp](https://github.com/homeassistant-ai/ha-mcp) [Python]
   ⭐ 0 | 今日 +31
   使用Claude、ChatGPT等AI助手配置和自动化Home Assistant
