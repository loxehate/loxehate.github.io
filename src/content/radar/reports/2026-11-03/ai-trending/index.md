---
title: "AI 开源趋势日报"
published: 2026-11-03
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-03

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-03 00:00 UTC

---

# AI 开源趋势日报（2026-11-03）

## 今日速览

今日 AI 开源生态呈现明显的“智能体基础设施”爆发态势。以 `agent-desktop`、`claude-mem` 为代表的 Agent 持久化与桌面操作工具单日新增星标破千，社区正加速构建 AI Agent 的“长期记忆”与“计算机使用”能力。本地大模型推理方向同样活跃，`FreeToken`、`colibri` 等纯 C/Rust 推理引擎试图将数据中心级模型下沉至消费级硬件。金融垂直领域出现 `Kronos` 这类面向市场语言的基础模型，显示垂直领域基础模型开始从通用大模型中分化。

## 各维度热门项目

### 🔧 AI 基础工具

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) | - / +2275 | AI Agent 的桌面计算机操作 CLI，让智能体能直接控制本地桌面环境，今日热榜增速最快。 |
| [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) | - / +653 | 将数据中心级模型服务能力带到桌面，支持在本地高效运行超大模型，降低推理门槛。 |
| [kornia/kornia](https://github.com/kornia/kornia) | - / +412 | 面向空间 AI 的几何计算机视觉库，提供可微分的计算机视觉算子，适合机器人与视觉场景。 |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | - / +675 | 纯 C 零依赖的 MoE 模型推理引擎，专家从磁盘流式加载，在普通硬件上运行前沿稀疏模型。 |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | - / +77 | 专为 AI Agent 并行工作流设计的 Git worktree 管理 CLI，解决多智能体并行开发的隔离问题。 |
| [p-e-w/heretic](https://github.com/p-e-w/heretic) | - / +420 | 无需训练的语言模型修改工具，可移除审查、抑制低质内容并减少奉承行为，适合模型对齐。 |

### 🤖 AI 智能体/工作流

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 110,722 / +1803 | 为每个 Agent 提供跨会话的持久化上下文，通过 AI 压缩会话内容并注入相关记忆，解决 Agent 遗忘问题。 |
| [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) | - / +1379 | 将 Claude Code 转化为完整游戏开发工作室，包含 49 个 AI Agent 与 72 项工作流技能，模拟真实工作室层级。 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | - / +858 | 面向工程师的 Agent 技能集，直接从 `.agents` 目录导出，便于在项目中复用 AI Agent 能力。 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | - / +412 | 开源的工作场景 Agent 管理应用，帮助团队在工作中统一管理与调度多个智能体。 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 44,344 / - | 构建有状态、可循环的多 Agent 工作流，是 LangChain 生态中 Agent 工程化的核心框架。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68,292 / - | AI Agent 的记忆层基础设施，提供可生产化的上下文持久化，适用于 Agent 和 AI 应用。 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 38,479 / - | Agent 与生成式 UI 的前端技术栈，支持 React/Angular/Mobile 等，推动 AG-UI 协议落地。 |

### 📦 AI 应用

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | - / +857 | 面向金融市场语言的基础模型，试图建模市场行为语言，代表垂直领域基础模型新方向。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 72,587 / - | AI 将文档或主题转换为原生 PowerPoint 文稿，支持图表、动画与数据可视化，垂直办公场景。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 67,456 / - | LLM 驱动的多市场股票智能分析系统，整合行情、新闻与决策看板，支持零成本定时运行。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 157,584 / - | 用户友好的 AI 界面，支持 Ollama、OpenAI API 等，是本地大模型交互的热门前端壳。 |
| [JeecgBoot](https://github.com/jeecgboot/JeecgBoot) | 48,364 / - | 企业级 AI 低代码平台，一句话生成系统，内置 AI 聊天、知识库与 MCP 插件，面向企业内部应用。 |

### 🧠 大模型/训练

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [karpathy/nanochat](https://github.com/karpathy/nanochat) | - / +321 | 号称“100 美元可构建的最佳 ChatGPT”，由 Andrej Karpathy 出品，适合学习与极小规模模型实验。 |
| [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) | - / +653 | 桌面级大模型推理引擎，支持高效运行超大参数模型，降低本地部署门槛。 |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | - / +675 | 纯 C 实现的前沿 MoE 模型推理引擎，专家按需从磁盘流式加载，极大降低硬件要求。 |

### 🔍 RAG/知识库

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 110,722 / +1803 | Agent 持久化记忆层，通过 AI 压缩会话并注入上下文，本质上是面向 Agent 的轻量 RAG 与记忆方案。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93,369 / - | Agent 原生数据库，从 RAG 引擎演进为上下文基础设施，适合构建复杂知识检索应用。 |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | 86,791 / - | 面向 LLM 和 AI Agent 的开源网络爬虫，将任意网站转换为 LLM 就绪的 Markdown，是 RAG 数据采集的首选。 |
| [pathwaycom/serviette](https://github.com/pathwaycom/serviette) | 58,730 / - | 无代码 RAG 服务器，支持 8 种向量数据库，可保持答案与文档同步，降低 RAG 部署门槛。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | 46,565 / - | 云原生高性能向量数据库，专为可扩展的向量近邻搜索（ANN）构建，是 RAG 系统的底层存储标准之一。 |

## 趋势信号分析

今日热榜显示，**AI Agent 基础设施**正获得社区爆发式关注，`agent-desktop` 与 `claude-mem` 单日新增星标均破千，反映开发者正从“单次对话”转向“长期记忆 + 桌面操作”的智能体范式。本地推理方向出现新兴技术栈，`colibri`（纯 C）与 `FreeToken` 试图将数据中心级模型下沉至消费级硬件，可能与近期端侧大模型发布及算力成本上升有关。垂直领域基础模型开始分化，`Kronos` 面向金融市场语言，暗示通用大模型之外，行业专用基础模型将成为新增长极。RAG 赛道持续活跃，`crawl4ai` 与 `serviette` 分别切中数据采集与无代码部署痛点，显示企业级 RAG 正从原型向工程化交付迈进。

## 社区关注热点

- **[vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop)**：今日热榜增速冠军，AI Agent 的“手脚”能力，值得关注桌面自动化新范式。
- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)**：解决 Agent 跨会话记忆断层，是构建长期运行智能体的关键基础设施。
- **[JustVugg/colibri](https://github.com/JustVugg/colibri)**：纯 C 零依赖 MoE 推理，若在普通硬件上表现优异，可能改变本地大模型部署成本。
- **[shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos)**：垂直金融基础模型尝试，观察行业大模型是否能从通用模型中分化出独立生态。
- **[langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)**：多 Agent 工作流工程化标杆，适合构建复杂、有状态的智能体应用。

---

## Trending top10项目

1. [vercel-labs/agent-desktop](https://github.com/vercel-labs/agent-desktop) [Rust]
   ⭐ 0 | 今日 +2275
   AI 代理的计算机使用 CLI
2. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) [TypeScript]
   ⭐ 0 | 今日 +1803
   为每个代理提供跨会话的持久上下文——记录会话中代理的所有操作，使用 AI 压缩，并将相关上下文注入未来会话。支持 Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot、OpenCode 等更多工具。
3. [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) [Python]
   ⭐ 0 | 今日 +706
   🕷️ 最佳 Web 抓取框架，从单次请求到大规模爬取全能搞定！加入 Discord：https://discord.gg/EMgGbDceNQ，关注 https://x.com/Scrapling_dev 获取每日技巧。
4. [hyprwm/Hyprland](https://github.com/hyprwm/Hyprland) [C++]
   ⭐ 0 | 今日 +509
   Hyprland 是一个独立的、高度可定制的动态平铺 Wayland 合成器，兼顾外观。
5. [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) [Shell]
   ⭐ 0 | 今日 +1379
   将 Claude Code 转变为完整的游戏开发工作室——包含 49 个 AI 代理、72 个工作流技能，以及模拟真实工作室层级的完整协调系统。
6. [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) [Python]
   ⭐ 0 | 今日 +653
   FreeToken 将数据中心级模型推理带到你的桌面。在本地快速高效地运行大型模型。
7. [pingdotgg/t3code](https://github.com/pingdotgg/t3code) [TypeScript]
   ⭐ 0 | 今日 +3229
8. [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) [Python]
   ⭐ 0 | 今日 +857
   Kronos：金融市场语言的基础模型
9. [kornia/kornia](https://github.com/kornia/kornia) [Python]
   ⭐ 0 | 今日 +412
   🐍 面向空间 AI 的几何计算机视觉库
10. [JustVugg/colibri](https://github.com/JustVugg/colibri) [C]
   ⭐ 0 | 今日 +675
   在你已有的硬件上运行前沿 MoE 模型——纯 C，零依赖，专家从磁盘流式加载。小型引擎，庞大模型。🐦
