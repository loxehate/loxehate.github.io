---
title: "AI 开源趋势日报"
published: 2026-11-04
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-04

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-04 00:00 UTC

---

# AI 开源趋势日报（2026-11-04）

## 今日速览

今日 AI 开源生态呈现明显的“智能体基础设施”爆发态势。Trending 榜单被 Agent 桌面控制、持久化上下文记忆、并行工作流管理等工具占据，单日新增 stars 普遍超过 400，其中 vercel-labs/agent-desktop 一日涨粉近 3800，成为最大增量。与此同时，MoE 推理引擎 colibri 与无需训练的模型修改工具 heretic 等推理层创新项目也获得高度关注，反映社区正从模型能力竞赛转向 Agent 部署、记忆管理与推理优化的工程化阶段。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) | - / +3791 | AI Agent 计算机使用 CLI，让模型能直接操作桌面环境，今日涨势最猛，标志着“Agent 操作系统”方向进入快车道。 |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | - / +802 | 用 C 编写的分层 MoE 推理引擎，支持 GPU/Vulkan 热专家与 NVMe 冷专家流式调度，为前沿稀疏模型落地提供低延迟方案。 |
| [p-e-w/heretic](https://github.com/p-e-w/heretic) | - / +701 | 无需训练的语言模型修改工具，可移除审查、抑制低质输出并降低奉承性，为模型对齐提供轻量化手段。 |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | - / +438 | 专为并行 AI Agent 工作流设计的 Git worktree 管理 CLI，解决多 Agent 并发开发的代码隔离问题。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 168,506 / - | 业界标准的模型定义与推理框架，持续覆盖文本、视觉、音频与多模态 SOTA 模型，是大模型开发的基础设施。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | 105,114 / - | 张量计算与动态神经网络框架，GPU 加速生态最成熟的深度学习底座之一。 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 201,290 / - | Google 开源的机器学习全栈框架，适合生产级模型训练与部署。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | - / +1139 | 为每个 Agent 提供跨会话持久化上下文，通过 AI 压缩会话内容并注入相关记忆，解决 Agent 遗忘问题。 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | - / +1164 | 面向工程师的 Agent 技能集合，直接从 .agents 目录扩展 AI 能力，强调实用主义的 Agent 工作流构建。 |
| [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) | - / +1182 | 将 Claude Code 转化为完整游戏开发工作室，包含 49 个 AI Agent 与 72 项工作流技能，模拟真实工作室层级协作。 |
| [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | 13,350 / - | JVM 生态的 LLM 应用开发库，提供统一 API 对接主流模型供应商，适合 Java 开发者构建 Agent 应用。 |
| [txtai/neuml/txtai](https://github.com/neuml/txtai) | 13,062 / - | All-in-one AI 框架，涵盖语义搜索、LLM 编排与语言模型工作流，适合快速构建智能应用。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [Usagi-org/ai-goofish-monitor](https://github.com/Usagi-org/ai-goofish-monitor) | - / +228 | 基于 Playwright 与 AI 的闲鱼多任务监控与智能分析系统，带后台管理 UI，垂直电商场景的 AI 应用典范。 |
| [spotify/portal-ai-plugins](https://github.com/spotify/portal-ai-plugins) | - / +91 | Spotify Portal 的 AI 插件生态，将 AI 能力扩展至内部平台工具，体现大厂对 AI 插件化的探索。 |
| [openbq-org/OpenBB](https://github.com/openbq-org/OpenBB) | 75,060 / - | 面向分析师、量化交易员与 AI Agent 的开放数据平台，结合金融数据与 AI 能力，垂直领域应用广泛。 |
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | - / +503 | 金融市场基础模型，定义“市场语言”，用于量化预测与交易决策，垂直领域大模型代表。 |
| [anomalyco/hex](https://github.com/anomalyco/hex) | - / +410 | 跨平台本地语音听写工具，桌面端 AI 语音输入的实用落地方案。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 107,770 / - | 逐步用 PyTorch 从零实现类 ChatGPT 大模型，适合深入理解 Transformer 与 LLM 训练原理。 |
| [labmlai/annotated_deep_learning_paper_implementations](https://github.com/labmlai/annotated_deep_learning_paper_implementations) | 67,672 / - | 60+ 篇深度学习论文的带注释实现，涵盖 Transformer 系列、ViT 等，是模型架构学习的首选资源。 |
| [keras-team/keras](https://github.com/keras-team/keras) | 64,415 / - | 面向人类的深度学习 API，模型构建与训练门槛低，适合快速原型验证。 |
| [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) | 68,000 / - | Python 机器学习经典库，涵盖监督与无监督学习算法，适合传统 ML 与特征工程。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | 52,795 / - | 文档处理平台与 RAG 框架，连接私有数据与 LLM，是构建企业知识助手的核心组件。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | 46,578 / - | 云原生高性能向量数据库，支持海量向量近邻搜索，广泛用于 RAG 与语义检索场景。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | 35,411 / - | Rust 编写的下一代向量数据库与搜索引擎，性能与可扩展性突出，适合大规模 AI 应用。 |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | 33,031 / - | 开源 AI 记忆平台，为 Agent 提供小模型下的长期记忆能力，侧重 Agent 记忆管理。 |
| [NirDiamant/RAG_Techniques](https://github.com/NirDiamant/RAG_Techniques) | 30,216 / - | RAG 进阶技术集合，包含详细 Notebook 教程，适合开发者快速掌握检索增强生成各类方案。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | 67,903 / - | 本地优先的 Agent 体验平台，集成向量数据库与 RAG，主打“拥有自己的智能”。 |

## 趋势信号分析

今日热榜显示，AI 开源关注重心已从“模型本体”转向“Agent 基础设施”与“推理工程化”。vercel-labs/agent-desktop、thedotmack/claude-mem、max-sixty/worktrunk 等项目集中登榜，反映社区对 AI Agent 操作桌面、持久化记忆、并行工作流管理的需求爆发，单日新增 stars 普遍破千，呈现爆发式增长。推理层方面，JustVugg/colibri 的分层 MoE 推理引擎与 p-e-w/heretic 的无训练模型修改工具双双入榜，表明开发者正寻求降低前沿模型部署成本与提升可控性的轻量化方案。技术栈上，Rust 在 agent-desktop、worktrunk、hex 等项目中频繁出现，成为构建高性能 AI 工具的新兴首选语言。与近期大模型能力持续提升的行业背景相关，开发者亟需配套的部署、记忆与编排工具将模型能力转化为可落地的自动化工作流，这也是今日榜单的核心驱动力。

## 社区关注热点

- **[vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop)**：单日涨粉近 3800，是目前最值得关注的 Agent 桌面控制工具，可能重塑 AI 与操作系统的交互范式。
- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)**：跨会话持久化上下文是 Agent 长期记忆的关键缺口，适合构建有状态的自动化助手。
- **[JustVugg/colibri](https://github.com/JustVugg/colibri)**：MoE 模型的分层推理引擎，为在消费级硬件上运行前沿稀疏模型提供了新思路。
- **[run-llama/llama_index](https://github.com/run-llama/llama_index)** 与 **[milvus-io/milvus](https://github.com/milvus-io/milvus)**：RAG 与向量数据库的组合仍是企业级知识库与 AI Agent 构建的标准技术栈，持续值得关注。
- **[shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos)**：金融领域基础模型，体现垂直行业大模型开始从通用模型中分化，适合量化与金融科技开发者跟进。

---

## Trending top10项目

1. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) [TypeScript]
   ⭐ 0 | 今日 +1139
   为每个代理提供跨会话的持久上下文 – 捕获代理在会话中做的一切，使用 AI 压缩，并将相关上下文注入到未来会话中。支持 Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot、OpenCode 等更多工具
2. [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) [Rust]
   ⭐ 0 | 今日 +3791
   面向 AI 代理的计算机使用命令行工具
3. [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) [Rust]
   ⭐ 0 | 今日 +438
   Worktrunk 是一个用于 Git 工作树管理的 CLI，专为并行 AI 代理工作流设计
4. [JustVugg/colibri](https://github.com/JustVugg/colibri) [C]
   ⭐ 0 | 今日 +802
   面向前沿 MoE 模型的分层推理引擎：热门专家在 GPU 上（CUDA、Vulkan），温专家在 RAM 中，冷专家从 NVMe 流式加载。使用 C 编写，可在您现有硬件上运行。
5. [mattpocock/skills](https://github.com/mattpocock/skills) [Shell]
   ⭐ 0 | 今日 +1164
   面向真正工程师的技能。直接来自我的 .agents 目录。
6. [p-e-w/heretic](https://github.com/p-e-w/heretic) [Python]
   ⭐ 0 | 今日 +701
   无需训练的语言模型修改：移除审查，抑制低质内容，减少阿谀奉承等
7. [spotify/portal-ai-plugins](https://github.com/spotify/portal-ai-plugins) [TypeScript]
   ⭐ 0 | 今日 +91
8. [floci-io/floci](https://github.com/floci-io/floci) [Java]
   ⭐ 0 | 今日 +482
   轻量、柔软且始终免费 - AWS 本地模拟器的替代方案
9. [Usagi-org/ai-goofish-monitor](https://github.com/Usagi-org/ai-goofish-monitor) [Python]
   ⭐ 0 | 今日 +228
   基于 Playwright 和 AI 实现的闲鱼多任务实时/定时监控与智能分析系统，配备功能完善的后台管理 UI。帮助用户从闲鱼海量商品中找到心仪产品。
10. [anomalyco/hex](https://github.com/anomalyco/hex) [Rust]
   ⭐ 0 | 今日 +410
   适用于 macOS、Windows 和 Linux 的本地语音输入
