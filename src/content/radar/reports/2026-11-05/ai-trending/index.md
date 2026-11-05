---
title: "AI 开源趋势日报"
published: 2026-11-05
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-05

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-05 00:00 UTC

---

# AI 开源趋势日报（2026-11-05）

## 今日速览

今日 AI 开源生态呈现明显的“智能体基础设施”爆发态势，NVIDIA、Vercel Labs 等大厂相继开源面向 AI Agent 的 CLI 与桌面操作工具，持久化记忆（claude-mem、mem0）与 RAG 基础设施（RAGFlow、Milvus）持续占据高星位置。端侧大模型推理方向出现突破，Kimi K3 在 C 语言实现下单 CPU 运行引发关注。整体来看，社区正从单一模型追逐转向 Agent 工作流、记忆层与轻量化推理工具的系统化构建。

## 各维度热门项目

### 🔧 AI 基础工具

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology) | 0 / +2050 | NVIDIA 开源的语义图推理框架，为数据构建确定性查询生成层，今日 Trending 涨幅最高。 |
| [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) | 0 / +2470 | 面向 AI Agent 的计算机操作 CLI，让 Agent 能直接桌面端交互，Vercel Labs 今日新增星数最多。 |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | 0 / +531 | 专为并行 AI Agent 工作流设计的 Git worktree 管理 CLI。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | 52,807 / — | 文档处理与 AI 应用构建平台，持续稳居 RAG/基础设施核心位置。 |
| [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) | 41,157 / — | 用 Rust 编写的开源终端 AI Agent，支持任意模型提供商，适合命令行开发场景。 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 38,518 / — | Agent 与生成式 UI 前端栈，提供 AG-UI 协议，支持 React、Angular 等多端集成。 |

### 🤖 AI 智能体/工作流

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 112,821 / +1172 | 跨会话持久化上下文，通过 AI 压缩会话内容并注入相关记忆，Trending 与主题搜索双榜高频出现。 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 44,472 / — | LangChain 官方 Agent 框架，用于构建有状态、可循环的多智能体工作流。 |
| [The-PR-Agent/pr-agent](https://github.com/The-PR-Agent/pr-agent) | 0 / +280 | 开源 PR 审查 Agent，自动化代码评审流程，今日持续受关注。 |
| [NousResearch/humus-agent](https://github.com/NousResearch/hermes-agent) | 260,555 / — | 可随用户成长的个人 AI Agent，主题搜索星数最高项目之一。 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 108,799 / — | 赋予 AI Agent 互联网浏览能力，支持 Twitter、Reddit、YouTube 等平台零 API 费用读取。 |
| [scenario-labs/skills](https://github.com/scenario-labs/skills) | 0 / +224 | 面向 AI Agent 的生成式媒体技能集，涵盖图像、视频、音频与 3D，含模型选型与成本预估。 |

### 📦 AI 应用

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 0 / +617 | 基于 AI 大模型与自动化工作流，一键从主题或关键词生成高清短视频。 |
| [Thysrael/Horizon](https://github.com/Thysrael/Horizon) | 0 / +121 | AI 驱动的个人新闻雷达，生成中英双语每日简报。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 73,497 / — | 将文档或主题转换为原生 PowerPoint 幻灯片，支持图表、动画与音频。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 67,561 / — | LLM 驱动的多市场股票智能分析系统，含行情、新闻与决策看板。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | 67,943 / — | 本地优先的全能 LLM 体验平台，整合聊天、知识库与 Agent 能力。 |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | 55,043 / — | 终身个性化 AI 导师，面向教育垂直场景。 |

### 🧠 大模型/训练

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c) | 0 / +351 | 2.78 万亿参数 Kimi K3 的 C99 纯 C 语言推理实现，单 CPU 8.24 GB 内存即可运行，无需 GPU 与框架。 |

### 🔍 RAG/知识库

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93,502 / — | Agent 原生数据库与 RAG 引擎，已发展为上下文基础设施。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | 46,595 / — | 云原生高性能向量数据库，支撑大规模向量近邻搜索。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68,410 / — | AI Agent 记忆层，提供可持久化的上下文基础设施，适合生产环境。 |
| [pathwaycom/serviette](https://github.com/pathwaycom/serviette) | 58,727 / — | 无代码 RAG 服务器，支持 8 种向量数据库，随文档同步更新答案。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 47,085 / — | 隐私优先的自托管知识工作空间，支持人与 AI Agent 协作。 |

## 趋势信号分析

今日热榜显示，面向 AI Agent 的基础设施工具正获得社区爆发式关注，Vercel Labs 的 `agent-desktop` 与 NVIDIA 的 `auto-ontology` 单日新增星数均破两千，表明“Agent 操作环境”与“语义推理层”成为新的竞争焦点。端侧轻量化推理方向首次登榜，`kimi-k3-in-c` 以纯 C 实现千亿参数模型单 CPU 推理，反映开发者对低资源模型部署的强烈需求。持久化记忆（`claude-mem`、`mem0`）与 RAG 基础设施（`RAGFlow`、`Milvus`）持续高位运行，验证了“上下文即基础设施”的行业共识。这些趋势与近期大模型向 Agent 化、多模态及边缘部署演进的方向高度关联，开源社区正从模型层向工具链与应用层深度下沉。

## 社区关注热点

- **[vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop)**：桌面端 AI Agent 操作 CLI，值得关注其对“计算机使用”能力的标准化探索。
- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)**：跨会话记忆压缩与注入，解决 Agent 会话断裂痛点，适合长周期自动化场景。
- **[FareedKhan-dev/kimi-k3-in-c](https://github.com/FareedKhan-dev/kimi-k3-in-c)**：极端低资源下的大模型推理实现，为边缘设备部署提供参考范式。
- **[langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)**：有状态多 Agent 工作流框架，适合构建复杂企业级自动化流程。
- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)**：Agent 原生 RAG 引擎，适合需要高频文档同步与上下文管理的知识库应用。

---

## Trending top10项目

1. [NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology) [Python]
   ⭐ 0 | 今日 +2050
   Auto Ontology 是一个用于在数据之上构建语义、图形化推理层的 Python 框架。支持确定性查询生成、更好的上下文检索，并为 LLM 和 Agent 工作流提供更可解释的 AI。
2. [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) [Rust]
   ⭐ 0 | 今日 +531
   Worktrunk 是一个用于 Git 工作树管理的 CLI，专为并行 AI Agent 工作流设计。
3. [mattpocock/skills](https://github.com/mattpocock/skills) [Shell]
   ⭐ 0 | 今日 +1379
   给真正工程师的技能。直接来自我的 .agents 目录。
4. [floci-io/floci](https://github.com/floci-io/floci) [Java]
   ⭐ 0 | 今日 +1090
   轻量、柔软且始终免费——AWS 本地模拟器的替代方案。
5. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) [TypeScript]
   ⭐ 0 | 今日 +1172
   为每个 Agent 提供跨会话的持久上下文——捕获会话中的所有操作，使用 AI 压缩，并将相关上下文注入未来会话。支持 Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot、OpenCode 等。
6. [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) [Rust]
   ⭐ 0 | 今日 +2470
   面向 AI Agent 的计算机使用 CLI。
7. [github/spec-kit](https://github.com/github/spec-kit) [Python]
   ⭐ 0 | 今日 +808
   💫 帮助你开始使用 SDD 或任何其他流程的工具包！
8. [The-PR-Agent/pr-agent](https://github.com/The-PR-Agent/pr-agent) [Python]
   ⭐ 0 | 今日 +280
   🚀 PR Agent：原始开源 PR 审查员。本项目不是 Qodo 免费版。
9. [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) [Python]
   ⭐ 0 | 今日 +617
   利用 AI 大模型和自动化工作流，根据主题或关键词一键生成高清短视频。
10. [garrytan/gstack](https://github.com/garrytan/gstack) [TypeScript]
   ⭐ 0 | 今日 +290
   使用 Garry Tan 的确切 Claude Code 配置：23 个带有观点的工具，分别充当 CEO、设计师、工程经理、发布经理、文档工程师和 QA。
