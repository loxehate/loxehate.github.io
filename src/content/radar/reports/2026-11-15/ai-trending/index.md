---
title: "AI 开源趋势日报"
published: 2026-11-15
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-15

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-15 00:00 UTC

---

# AI 开源趋势日报（2026-11-15）

## 今日速览

今日 GitHub AI 开源生态呈现明显的“Agent 基础设施化”趋势，Trending 榜单被大量面向编码 Agent 的开发者工具占据，包括浏览器调试协议、代码审查流程、终端代理及 Token 压缩等。Alibaba 开源的 `open-code-review` 与 QwenLM 的 `qwen-code` 同步登榜，显示国内大模型厂商正加速向 AI Native 开发工具链延伸。与此同时，RAG 与知识库赛道保持高活跃度，`ragflow`、`llama_index` 等项目持续获得社区关注，检索增强已成为 AI 应用落地的标准范式。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | - / +664 | 为编码 Agent 提供 Chrome DevTools 能力，让 AI 编程助手可直接调试前端页面，今日 Trending 增幅显著。 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | - / +893 | 阿里巴巴开源的代码审查工具，融合确定性流水线与 LLM Agent，支持行级精准评论，工业级实践值得参考。 |
| [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | - / +64 | 通义千问团队推出的终端原生 AI 编程 Agent，开源代码助手在 CLI 场景的又一重要探索。 |
| [ashhart/TensorFold](https://github.com/ashhart/TensorFold) | - / +37 | 基于 Zig 编写的 LLM 推理引擎，支持 Metal、CUDA 与 Vulkan，面向多平台高性能推理的新兴技术栈。 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 201,604 / - | Google 机器学习框架，持续稳居 ML 主题榜首，是深度学习训练与部署的基础设施。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | 105,497 / - | PyTorch 动态神经网络框架，AI 研究与工业落地的核心计算后端。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [backnotprop/plannotator](https://github.com/backnotprop/plannotator) | - / +408 | 面向 AI Agent 的协作工作空间，支持规划、标注、代码审查与团队反馈回传，强调人机协同闭环。 |
| [Tencent/LoopForge](https://github.com/Tencent/LoopForge) | - / +33 | 腾讯开源的编码 Agent 交付工作流，可编排 CodeBuddy、Codex 与 Claude Code，并支持人工审批门禁。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,515 / - | Agent 工程平台，构建 LLM 应用与多智能体工作流的事实标准框架之一。 |
| [datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents) | 86,992 / - | 中文社区的“从零构建智能体”教程，适合开发者快速入门 Agent 原理与实践。 |
| [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) | - / +9 | Agent-User 交互协议，致力于将 AI Agent 能力带入前端应用，定义人机交互新接口。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | - / +553 | 面向股票投资者与交易员的 Claude Code 技能集，涵盖市场分析、技术图表与策略开发，垂直金融场景典型案例。 |
| [dream-num/univer](https://github.com/dream-num/univer) | - / +495 | 基于 Univer Office SDK 构建 AI 办公产品，支持文档、表格、协作与文件处理，面向 AI Agent 的办公自动化方案。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 158,660 / - | 用户友好的 AI 界面，支持 Ollama、OpenAI API 等多种后端，本地部署体验优秀。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | 68,283 / - | 本地优先的 AI 工作空间，整合模型、Agent 与知识库，适合希望自建智能助手的团队。 |
| [openbq-org/OpenBB](https://github.com/openbq-org/OpenBB) | 75,423 / - | 面向分析师、量化交易员与 AI Agent 的开源数据平台，金融垂直领域的 AI 应用基座。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [huggingface/transformers](https://github.com/huggingface/transformers) | 168,980 / - | 状态最先进的模型定义框架，覆盖文本、视觉、音频与多模态模型的推理与训练。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 108,414 / - | 使用 PyTorch 从零实现类 ChatGPT 大模型的分步教程，适合深入理解 LLM 内部机制。 |
| [keras-team/keras](https://github.com/keras-team/keras) | 64,426 / - | 面向人类的深度学习 API，提供简洁的模型构建与训练体验。 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | 63,412 / - | YOLO 系列目标检测与分割框架，计算机视觉领域的主流开源实现。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 94,156 / - | Agent 原生数据库与 RAG 引擎，已发展为上下文基础设施，适合构建复杂检索增强应用。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | 52,902 / - | AI 文档处理平台，连接非结构化数据与 LLM，是 RAG 应用开发的核心组件。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | 46,665 / - | 高性能云原生向量数据库，支撑大规模向量近邻搜索，RAG 系统的底层存储首选。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 117,117 / - | 为每个 Agent 提供跨会话持久上下文，通过 AI 压缩会话内容并注入相关记忆，解决上下文丢失问题。 |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | 87,359 / - | 面向 AI Agent 的网页抓取与提取 API，为 RAG 流程提供高质量网络数据来源。 |

## 趋势信号分析

今日热榜显示，**面向编码 Agent 的开发者工具链**正获得社区爆发式关注，Chrome DevTools MCP、阿里 Open Code Review、Qwen Code 等项目集中登榜，反映出 AI 编程助手正从“聊天对话”向“IDE 原生集成与自主代码交付”演进。新兴技术栈方面，Zig 语言编写的 LLM 推理引擎 TensorFold 以及基于 MCP 协议的浏览器调试工具，暗示社区开始探索除 Python 之外的系统级 AI 基础设施。与近期大模型发布的关联在于，各大模型厂商（如通义千问、Claude）纷纷开放代码能力与 Agent 技能，推动开源社区围绕模型构建配套的工具链与工作流，AI 原生开发范式正加速成型。

## 社区关注热点

- **[ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)**：Google 官方为 AI 编程 Agent 提供浏览器调试能力，前端 AI 自动化的关键基础设施。
- **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)**：阿里巴巴工业级 LLM 代码审查工具，确定性流水线与 Agent 结合的实践值得企业参考。
- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)**：Agent 原生 RAG 引擎，检索增强从“文档问答”向“上下文基础设施”演进。
- **[Tencent/LoopForge](https://github.com/Tencent/LoopForge)**：腾讯编码 Agent 工作流编排工具，支持多 Agent 协作与人工审批，适合企业级 AI 交付场景。
- **[ashhart/TensorFold](https://github.com/ashhart/TensorFold)**：基于 Zig 的多后端 LLM 推理引擎，关注非 Python 技术栈在 AI 推理领域的突破可能性。

---

## Trending top10项目

1. [backnotprop/plannotator](https://github.com/backnotprop/plannotator) [TypeScript]
   ⭐ 0 | 今日 +408
   与智能体保持同步并掌控局面的工作空间——塑造、决定、规划、标注、审查代码、与团队共享，并一键将所有反馈发送给智能体。
2. [GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) [TypeScript]
   ⭐ 0 | 今日 +1231
   让你的编码智能体始终掌握最新的 Web 最佳实践。
3. [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) [Python]
   ⭐ 0 | 今日 +553
   面向股票投资者和交易者的 Claude Code 技能——涵盖市场分析、技术图表、经济日历、选股器及交易策略开发。
4. [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) [TypeScript]
   ⭐ 0 | 今日 +664
   面向编码智能体的 Chrome DevTools
5. [alibaba/open-code-review](https://github.com/alibaba/open-code-review) [Go]
   ⭐ 0 | 今日 +893
   安全、快速、高效，经阿里巴巴规模验证。混合架构代码审查工具：确定性流水线 + LLM 智能体，精确行级注释，内置多语言规则集（NPE、线程安全、XSS、SQL 注入），兼容 OpenAI 与 Anthropic。
6. [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) [TypeScript]
   ⭐ 0 | 今日 +64
   运行在你终端中的开源 AI 编码智能体。
7. [dream-num/univer](https://github.com/dream-num/univer) [TypeScript]
   ⭐ 0 | 今日 +495
   使用 Univer Office SDK 构建你自己的 AI 办公产品。将编辑、计算、协作和文件处理引入你的产品，供人类和 AI 智能体使用。基于可扩展的开源核心构建。
8. [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) [TypeScript]
   ⭐ 0 | 今日 +9
   AG-UI：智能体-用户交互协议。将智能体引入前端应用。
9. [ashhart/TensorFold](https://github.com/ashhart/TensorFold) [Zig]
   ⭐ 0 | 今日 +37
   面向 Metal、CUDA 和 Vulkan 的 LLM 推理引擎。
10. [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) [Go]
   ⭐ 0 | 今日 +227
   🪨 少量 token 即可搞定，何必多用？面向编码智能体的病毒式技能 + 代理，通过像原始人一样说话削减 65% 的 token。
