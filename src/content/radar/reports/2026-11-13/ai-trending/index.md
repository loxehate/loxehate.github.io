---
title: "AI 开源趋势日报"
published: 2026-11-13
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-13

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-13 00:00 UTC

---

# AI 开源趋势日报（2026-11-13）

## 今日速览

今日 GitHub AI 开源生态呈现明显的“AI 编程 Agent 与基础设施双轮驱动”格局。OpenAI 官方安全工具 `codex-security` 与 Qwen 系列终端 Agent `qwen-code` 登上 Trending 榜单，显示代码安全与本地化编码 Agent 成为社区爆发点；`llama.cpp`、`TensorFold` 等推理引擎持续获得关注，边缘与多后端 LLM 推理正成为基础设施标配。与此同时，RAG 与知识库领域以 `ragflow`、`milvus`、`llama_index` 为代表的项目稳居高位，企业级知识检索需求持续升温。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) | - / +176 | C/C++ 语言实现的 LLM 推理引擎，今日持续登榜，验证了轻量化本地推理的刚性需求。 |
| [openai/codex-security](https://github.com/openai/codex-security) | - / +643 | OpenAI 官方 Codex 安全 CLI 与 TypeScript SDK，用于发现、验证和修复安全漏洞，标志着大厂开始将 AI 安全工具链开源化。 |
| [ashhart/TensorFold](https://github.com/ashhart/TensorFold) | - / +54 | 基于 Zig 语言的 LLM 推理引擎，支持 Metal、CUDA 和 Vulkan，代表了新兴系统语言在 AI 推理栈中的探索。 |
| [ollama/ollama](https://github.com/ollama/ollama) | 186,813 / - | 一键运行 Kimi、GLM、DeepSeek、Qwen 等模型的本地模型管理工具，是开发者本地化大模型体验的入口级基础设施。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 201,288 / - | 为 AI Agent 提供网页数据抓取与提取库，解决 Agent 访问互联网信息的“最后一公里”数据工程问题。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 168,923 / - | 业界标准的机器学习模型定义框架，覆盖文本、视觉、音频与多模态模型，持续是模型微调与推理的核心依赖。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | 105,458 / - | 张量计算与动态神经网络框架，GPU 加速深度学习的基石，今日在 ML 主题搜索中保持高活跃度。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | - / +151 | 阿里 Qwen 系列开源 AI 编码 Agent，运行在终端中，今日 Trending 表现亮眼，体现国产模型在 Agent 形态上的快速跟进。 |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | - / +816 | 面向 AI 编码 Agent 的生产级工程技能集，今日新增 stars 破 800，反映开发者对 Agent 工程化能力的强烈需求。 |
| [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | - / +298 | 开源 AI 同事，每个 Agent 拥有独立浏览器、文件与工具，动作执行前决策、执行后记录，强调可审计的自动化工作流。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,418 / - | Agent 工程平台，构建 LLM 驱动应用的事实标准框架，持续在 RAG/LLM 主题搜索中领跑。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 120,850 / - | 开源 AI 浏览器 Agent 库，提供隐身浏览器与云端 Agent API，是 Web 自动化 Agent 的重要基础设施。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 188,013 / - | 面向大众的可访问 AI 工具与构建平台，早期自主 Agent 的代表项目，社区影响力依然显著。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 158,505 / - | 用户友好的 AI 界面，支持 Ollama、OpenAI API 等，是本地大模型对话的首选前端应用。 |
| [langgenius/dify](https://github.com/langgenius/dify) | 161,058 / - | 一体化协作工作空间，构建 Agentic 工作流与 RAG 管道，支持云端、VPC 与自托管部署，适合团队快速落地 AI 应用。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | 68,224 / - | 本地优先的 Agent 体验平台，主打“拥有自己的智能”，适合数据敏感场景下的私有化 AI 应用部署。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 142,911 / - | 基于 AI 大模型与自动化工作流的一键高清短视频生成工具，代表垂直内容生成场景的 AI 应用爆发。 |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | 58,642 / - | 终身个性化 AI 导师，面向教育垂直领域，体现大模型在个性化教学中的落地探索。 |
| [jeecgboot/JeecgBoot](https://github.com/jeecgboot/JeecgBoot) | 48,446 / - | AI 低代码开源平台，内置 AI 知识库与应用平台，主打“一句话生成完整系统”，面向企业复杂业务系统构建。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 201,586 / - | 面向所有人的开源机器学习框架，工业级训练与部署基础设施，今日在 ML 主题搜索中保持可见度。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 108,313 / - | 逐步用 PyTorch 从零实现类 ChatGPT 的 LLM，是开发者理解大模型底层原理的经典教学项目。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 94,092 / - | Agent 原生数据库与 RAG 引擎，已成长为上下文基础设施，强调检索增强与 Agent 原生架构的结合。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | 46,649 / - | 高性能云原生向量数据库，构建于可扩展向量 ANN 搜索之上，是 RAG 系统中向量存储的主流选择。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | 52,884 / - | 面向 AI 的文档处理平台，连接非结构化数据与 LLM，是构建 RAG 应用的核心编排框架。 |
| [pathwaycom/serviette](https://github.com/pathwaycom/serviette) | 58,707 / - | 无代码 RAG 服务器，支持 8 种向量数据库，随文档同步更新答案，降低 RAG 工程门槛。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 146,747 / - | 将代码库、文档、SQL 与 PDF 转化为可查询知识图谱，提供面向 Claude Code、Cursor 等的 /graphify 技能，代表知识图谱与 RAG 的融合趋势。 |

## 趋势信号分析

今日热榜显示，**AI 编码 Agent 与代码安全工具**正在获得社区爆发性关注。OpenAI 官方开源 `codex-security` 与 Qwen 终端 Agent `qwen-code` 双双登上 Trending，说明开发者不仅需要能写代码的 Agent，更需要可审计、可安全修复的工程级 Agent 能力。`agent-skills` 今日新增 stars 破 800，进一步印证了“Agent 工程化”成为核心痛点。

在技术栈方面，基于 Zig 语言的 `TensorFold` 首次登榜，代表新兴系统语言正在尝试切入 LLM 推理引擎领域，挑战 C/C++ 的传统统治地位。`llama.cpp` 持续热度则表明边缘侧与多后端（Metal/CUDA/Vulkan）推理已成为基础设施标配。

与行业事件关联方面，各大模型厂商（OpenAI、Qwen、Kimi、DeepSeek 等）近期频繁发布模型与编程 Agent，直接拉动了 `ollama`、`llama.cpp` 等本地推理工具的需求。同时，RAG 领域以 `ragflow`、`milvus`、`llama_index` 为代表的项目稳居高位，企业级知识检索与上下文工程需求持续升温，知识图谱与 RAG 的融合（如 `graphify`）开始显现。

## 社区关注热点

- **[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**：国产模型在终端编码 Agent 方向的快速跟进，值得国内开发者重点关注其本地化部署与中文代码理解能力。
- **[openai/codex-security](https://github.com/openai/codex-security)**：OpenAI 官方下场做 AI 驱动的代码安全工具，可能成为未来 DevSecOps 流程中的标准组件。
- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)**：主打“Agent 原生数据库”，试图将 RAG 从检索增强升级为上下文基础设施，适合构建复杂企业知识应用。
- **[ashhart/TensorFold](https://github.com/ashhart/TensorFold)**：Zig 语言编写的多后端推理引擎，若社区活跃度持续上升，或将成为边缘 AI 推理的轻量级新选择。
- **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)**：面向 AI 编码 Agent 的生产级技能集，适合希望将 Agent 能力落地到实际工程流程的团队。

---

## Trending top10项目

1. [GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) [TypeScript]
   ⭐ 0 | 今日 +739
   让你的编码代理始终掌握最新的 Web 最佳实践
2. [openai/codex-security](https://github.com/openai/codex-security) [TypeScript]
   ⭐ 0 | 今日 +643
   OpenAI 的 Codex Security CLI 和 TypeScript SDK，用于查找、验证和修复安全漏洞。npm: https://www.npmjs.com/package/@openai/codex-security
3. [nvm-sh/nvm](https://github.com/nvm-sh/nvm) [Shell]
   ⭐ 0 | 今日 +63
   Node 版本管理器 - 符合 POSIX 标准的 bash 脚本，用于管理多个活跃的 Node.js 版本。
4. [pookjw/HermesEnabler](https://github.com/pookjw/HermesEnabler) [Objective-C]
   ⭐ 0 | 今日 +218
   在任何 Apple Watch 设备上启用 Hermès 表盘
5. [we-promise/sure](https://github.com/we-promise/sure) [Ruby]
   ⭐ 0 | 今日 +967
   所有人的个人理财应用（由所有人共建）
6. [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) [TypeScript]
   ⭐ 0 | 今日 +151
   一款运行在终端中的开源 AI 编码代理。
7. [ashhart/TensorFold](https://github.com/ashhart/TensorFold) [Zig]
   ⭐ 0 | 今日 +54
   面向 Metal、CUDA 和 Vulkan 的 LLM 推理引擎。
8. [nodejs/node](https://github.com/nodejs/node) [JavaScript]
   ⭐ 0 | 今日 +62
   Node.js JavaScript 运行时 ✨🐢🚀✨
9. [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) [JavaScript]
   ⭐ 0 | 今日 +816
   面向 AI 编码代理的生产级工程技能。
10. [meta/astryx](https://github.com/meta/astryx) [TypeScript]
   ⭐ 0 | 今日 +1830
   完全可定制且适配代理的开源设计系统
