---
title: "AI 开源趋势日报"
published: 2026-11-09
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-09

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-09 00:00 UTC

---

# AI 开源趋势日报（2026-11-09）

## 今日速览

今日 AI 开源领域呈现明显的 **Agent 基础设施爆发** 态势，浏览器自动化、持久化记忆、上下文压缩等围绕智能体的周边工具在 Trending 榜单占据显著位置。Anthropic 连续发布 Claude Quickstarts 与 Agent Skills 两个开源项目，进一步夯实其开发者生态。RAG 与向量数据库赛道持续活跃，Crawl4AI、RAGFlow 等检索增强项目保持高关注度，而 GPU 算力管理工具 NVKE 的登榜则反映出社区对 AI 基础设施运维的需求正在上升。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,218 / — | LLM 应用开发的事实标准框架，持续主导 Agent 工程化范式。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | 52,848 / — | 面向 AI 应用的文档处理与数据连接平台，适合构建复杂 RAG 流程。 |
| [dsx-ai-factory/nvke](https://github.com/dsx-ai-factory/nvke) | — / +345 | NVIDIA GPU Kubernetes 裸机管理平台，填补 AI 算力集群运维的开源工具空白。 |
| [anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts) | — / +32 | 官方 Claude API 快速入门集合，降低开发者构建可部署 LLM 应用的门槛。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,692 / — | 针对 Apple Silicon 的轻量级 LLM 推理系统，适合系统工程师学习与实践。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 44,662 / — | LangChain 官方 Agent 框架，支持构建有状态、可循环的多智能体工作流。 |
| [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) | — / +815 | 专为 AI Agent 设计的浏览器自动化 CLI，让智能体能直接操作网页交互。 |
| [anthropics/skills](https://github.com/anthropics/skills) | — / +792 | Anthropic 官方 Agent 技能库，标准化智能体能力描述与复用。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68,647 / — | AI Agent 的持久化记忆层，支持跨会话上下文记忆，适合生产环境。 |
| [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | — / +1439 | 开源 Grok Bot 替代方案，内置可供 Bot 使用的虚拟机环境，今日关注度爆发。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 114,889 / — | 为各类 Agent 提供跨会话持久化上下文，通过 AI 压缩注入相关记忆。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 158,138 / — | 功能丰富的 AI 聊天界面，支持 Ollama、OpenAI 等多种后端，社区首选本地 UI。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | 68,070 / — | 本地优先的全栈 AI 应用平台，整合聊天、知识库与 Agent 能力。 |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | 56,980 / — | 基于 LLM 的终身个性化辅导系统，垂直教育场景的代表性开源应用。 |
| [jeecgboot/JeecgBoot](https://github.com/jeecgboot/JeecgBoot) | 48,403 / — | 企业级 AI 低代码平台，内置 AI 知识库、MCP 与工作流，面向业务系统快速构建。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [google-deepmind/mujoco](https://github.com/google-deepmind/mujoco) | — / +41 | 通用多刚体物理仿真器，广泛用于强化学习与机器人策略训练。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,577 / — | 支持 100+ 数据集与多家模型的 LLM 评测平台，模型能力比对的基础设施。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9,096 / — | Rust 编写的模块化 LLM 应用框架，面向高性能与类型安全场景。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93,781 / — | Agent 原生数据库与 RAG 引擎，从检索增强演进为上下文基础设施。 |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | 87,103 / — | 面向 AI Agent 的开源网页抓取与信息提取 API，为 RAG 提供高质量数据源。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | 46,609 / — | 云原生高性能向量数据库，支撑大规模向量近邻搜索。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | 35,476 / — | 下一代高性能向量搜索引擎，支持结构化过滤与云服务。 |
| [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) | — / +460 | 月度会话上下文压缩插件，小上下文窗口下实现数十亿 Token 记忆，今日登榜。 |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | 33,143 / — | 开源 AI 记忆平台，为 Agent 提供低成本长期记忆能力。 |

## 趋势信号分析

今日热榜显示，**围绕 AI Agent 的基础设施层正在获得社区爆发式关注**。vercel-labs/agent-browser、anthropics/skills、mem0 等项目集中登榜，说明开发者正从单一模型调用转向构建具备浏览器操作、持久记忆与技能编排能力的自主智能体。与此同时，ranxianglei/billion-context 的上榜凸显了**上下文压缩与长记忆**成为当前 RAG 领域的热点，试图在小上下文窗口限制下实现超长会话记忆。技术栈方面，Rust 语言在 AI 工具链中的渗透进一步加深（agent-browser、qdrant、lancedb 均采用 Rust），追求高性能与内存安全。Anthropic 连续开源 Claude Quickstarts 与 Skills，与近期大模型厂商加速构建开发者生态、降低 Agent 应用门槛的行业趋势高度关联，预示未来智能体开发将更加模块化与标准化。

## 社区关注热点

- **[vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)**：AI Agent 浏览器自动化，今日 +815 Stars，是智能体与 Web 交互的关键入口，值得前端与 Agent 开发者重点跟进。
- **[anthropics/skills](https://github.com/anthropics/skills)**：Anthropic 官方 Agent 技能库，今日 +792 Stars，可能成为未来智能体能力标准化的重要参考。
- **[ranxianglei/billion-context](https://github.com/ranxianglei/billion-context)**：上下文压缩插件，今日 +460 Stars，针对长会话场景的 Token 节省方案，适合 RAG 与客服类应用优化。
- **[dsx-ai-factory/nvke](https://github.com/dsx-ai-factory/nvke)**：GPU Kubernetes 管理平台，今日 +345 Stars，反映企业级 AI 算力运维对开源工具的迫切需求。
- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)**：93k Stars 的 Agent 原生 RAG 引擎，持续领跑检索增强赛道，适合构建生产级知识库。

---

## Trending top10项目

1. [sherlock-project/sherlock](https://github.com/sherlock-project/sherlock) [Python]
   ⭐ 0 | 今日 +2373
   通过用户名在社交网络中追踪社交媒体账号
2. [dsx-ai-factory/nvke](https://github.com/dsx-ai-factory/nvke) [Go]
   ⭐ 0 | 今日 +345
   NVIDIA Kubernetes Engine (NVKE)。裸机上 GPU Kubernetes 的管理平面。
3. [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) [TypeScript]
   ⭐ 0 | 今日 +1439
   开源 Grok Bot 替代方案，附带机器人可用的虚拟机
4. [anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts) [Python]
   ⭐ 0 | 今日 +32
   帮助开发者快速使用 Claude API 构建可部署应用的项目集合
5. [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser) [Rust]
   ⭐ 0 | 今日 +815
   面向 AI 代理的浏览器自动化命令行工具
6. [meta/astryx](https://github.com/meta/astryx) [TypeScript]
   ⭐ 0 | 今日 +875
   完全可定制且面向代理的开源设计系统
7. [anthropics/skills](https://github.com/anthropics/skills) [Python]
   ⭐ 0 | 今日 +792
   代理技能公共仓库
8. [google-deepmind/mujoco](https://github.com/google-deepmind/mujoco) [C++]
   ⭐ 0 | 今日 +41
   带接触的多关节动力学。通用物理模拟器。
9. [ranxianglei/billion-context](https://github.com/ranxianglei/billion-context) [TypeScript]
   ⭐ 0 | 今日 +460
   月级长会话、小窗口和节省 token 的上下文压缩插件。billion-context is all you need
