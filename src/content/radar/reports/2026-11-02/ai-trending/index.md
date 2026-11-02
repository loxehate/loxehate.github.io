---
title: "AI 开源趋势日报"
published: 2026-11-02
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-02

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-02 00:00 UTC

---

# AI 开源趋势日报（2026-11-02）

## 今日速览

今日 AI 开源生态呈现“智能体记忆与端侧部署”双轮驱动态势。Agent 持久化上下文（claude-mem、mem0）与本地语音/推理工具（Handy、FreeToken、anomalyco/hex）在 Trending 榜单中爆发，反映开发者正从单次对话转向长周期、多会话的智能体工程化。同时，金融垂直基础模型（Kronos）与 AI 浏览器自动化（Lightpanda）等新兴方向首次登榜，显示垂直领域大模型与 AI 原生基础设施正加速落地。

## 各维度热门项目

### 🔧 AI 基础工具

| 项目 | Stars（总量 / 今日新增） | 一句话说明 |
|------|------------------------|-----------|
| [lightpanda-io/browser](https://github.com/lightpanda-io/browser) | — / +825 | 用 Zig 编写的专为 AI 与自动化设计的无头浏览器，为 AI Agent 提供原生网页交互环境。 |
| [cjpais/Handy](https://github.com/cjpais/Handy) | — / +339 | 完全离线运行的开源语音转文字应用，基于本地推理，适合隐私敏感场景。 |
| [anomalyco/hex](https://github.com/anomalyco/hex) | — / +1179 | 跨平台本地语音听写工具，支持 macOS/Windows/Linux，强调端侧语音处理。 |
| [FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken) | — / +242 | 将数据中心级模型服务能力带到桌面，支持本地高效运行大规模模型。 |
| [kornia/kornia](https://github.com/kornia/kornia) | — / +101 | 面向空间 AI 的几何计算机视觉库，提供可微分的计算机视觉算子。 |

### 🤖 AI 智能体 / 工作流

| 项目 | Stars（总量 / 今日新增） | 一句话说明 |
|------|------------------------|-----------|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 109,209 / +1526 | 为每个 Agent 提供跨会话持久化上下文，通过 AI 压缩会话内容并注入相关记忆，解决 Agent 遗忘问题。 |
| [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) | — / +967 | 将 Claude Code 转化为完整游戏开发工作室，包含 49 个 AI 代理与 72 项工作流技能，模拟真实工作室层级。 |
| [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot) | — / +175 | 为每个 AI 同事分配独立计算机（浏览器、文件、工具），所有动作预先决策并事后记录，面向自主协作。 |
| [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) | — / +922 | 开源 Grok 机器人替代方案，提供可供机器人使用的虚拟机环境，适合自动化任务编排。 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 44,286 / — | 构建有韧性的 AI Agent 框架，支持有状态、可编排的多步骤工作流，是 LangChain 生态的核心组件。 |

### 📦 AI 应用

| 项目 | Stars（总量 / 今日新增） | 一句话说明 |
|------|------------------------|-----------|
| [beenuar/AiSOC](https://github.com/beenuar/AiSOC) | — / +446 | 开源 AI 安全运营中心，集成告警融合、LLM Agent 分流与 MITRE ATT&CK 调研，面向安全运营场景。 |
| [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) | — / +630 | 金融市场语言基础模型，面向量化交易与市场语义理解，代表垂直领域大模型应用。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 157,482 / — | 用户友好的 AI 界面，支持 Ollama、OpenAI API 等，是本地大模型交互的热门前端应用。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | 67,830 / — | 本地优先的完整 Agent 体验平台，集成知识库与多模型支持，适合自建私有智能助手。 |
| [asusminato0721/telegram-summary-bot](https://github.com/asukaminato0721/telegram-summary-bot) | 204 / — | 基于 LLM 的 Telegram 群聊总结机器人，支持图片、链接元信息与中文检索，适合社区运营。 |

### 🧠 大模型 / 训练

| 项目 | Stars（总量 / 今日新增） | 一句话说明 |
|------|------------------------|-----------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 64,734 / — | 仅需 2 小时即可从零训练一个 64M 参数 LLM，降低大模型训练门槛，适合教学与快速实验。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,507 / — | 在 Apple Silicon 上构建微型 vLLM + Qwen 推理系统，面向系统工程师学习 LLM 推理原理。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9,039 / — | 用 Rust 构建模块化、可扩展的 LLM 应用，强调类型安全与性能，适合系统级 AI 开发。 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | 319 / — | 基于 X-Bit 量化的端侧 LLM 推理引擎，专为设备本地运行大语言模型优化。 |
| [datamllab/OpenEBFM](https://github.com/datamllab/OpenEBFM) | 230 / — | 能量基础模型的训练与规模化开源代码，探索非自回归的大模型新范式。 |

### 🔍 RAG / 知识库

| 项目 | Stars（总量 / 今日新增） | 一句话说明 |
|------|------------------------|-----------|
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68,242 / — | AI Agent 的记忆层，提供可生产化的上下文持久化基础设施，支持跨会话记忆管理。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93,302 / — | 领先的开源 RAG 引擎，融合前沿检索增强与 Agent 能力，构建优质上下文窗口。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | 46,551 / — | 云原生高性能向量数据库，支持可扩展的向量近邻搜索，是 RAG 系统的核心存储组件。 |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | 86,722 / — | 面向 LLM 和 AI Agent 的开源网页爬虫，将任意网站转换为 LLM 就绪的 Markdown 格式。 |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | 40,468 / — | EMNLP 2025 接收论文，主打简单快速的检索增强生成，适合轻量级知识增强场景。 |

## 趋势信号分析

今日热榜显示，**Agent 长期记忆与端侧部署**获得社区爆发式关注。claude-mem 单日新增超 1500 星，mem0 等记忆层项目持续高热，反映开发者正从“无状态对话”转向“有记忆的自主代理”，解决多会话上下文丢失问题。与此同时，Handy、anomalyco/hex、FreeToken 等本地语音与模型服务工具集中登榜，端侧 AI 推理正从实验室走向桌面级日常使用。

新兴技术栈方面，**AI 原生浏览器自动化**（Lightpanda）与**垂直领域基础模型**（Kronos 金融模型）首次跻身热榜，表明 AI 基础设施正向“浏览器即 Agent 操作环境”及“行业大模型”两个方向延伸。与近期大模型发布的关联在于：随着模型能力趋于平台化，社区关注重心已从模型本身转向围绕模型的工程化支撑——记忆、工具调用、端侧推理与垂直场景适配。

## 社区关注热点

- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)**：单日涨势极猛，Agent 持久化记忆是当前智能体工程化的核心痛点，值得重点跟进。
- **[lightpanda-io/browser](https://github.com/lightpanda-io/browser)**：用 Zig 构建的 AI 原生浏览器，可能成为下一代 Web 自动化与 Agent 交互的基础设施。
- **[FlashML-org/FreeToken](https://github.com/FlashML-org/FreeToken)**：主打桌面端大规模模型高效服务，适合关注本地 AI 部署与算力优化的开发者。
- **[shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos)**：金融领域基础模型，代表垂直行业大模型从通用模型中分化出的新趋势。
- **[mem0ai/mem0](https://github.com/mem0ai/mem0)**：生产级 AI 记忆层，适合需要构建长周期智能体应用的团队参考。

---

## Trending top10项目

1. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) [TypeScript]
   ⭐ 0 | 今日 +1526
   为每个代理提供跨会话的持久上下文 – 捕获代理在会话期间的所有操作，使用 AI 压缩，并将相关上下文注入到未来会话中。支持 Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot、OpenCode 等更多工具
2. [lightpanda-io/browser](https://github.com/lightpanda-io/browser) [Zig]
   ⭐ 0 | 今日 +825
   Lightpanda：专为 AI 和自动化设计的无头浏览器
3. [shiyu-coder/Kronos](https://github.com/shiyu-coder/Kronos) [Python]
   ⭐ 0 | 今日 +630
   Kronos：金融市场语言的基础模型
4. [pingdotgg/t3code](https://github.com/pingdotgg/t3code) [TypeScript]
   ⭐ 0 | 今日 +3094
5. [milind-soni/OpenMausBot](https://github.com/milind-soni/OpenMausBot) [TypeScript]
   ⭐ 0 | 今日 +922
   开源的 Grok Bot 替代方案，提供机器人可用的虚拟机
6. [public-apis/public-apis](https://github.com/public-apis/public-apis) [Python]
   ⭐ 0 | 今日 +324
   免费 API 集合列表
7. [cjpais/Handy](https://github.com/cjpais/Handy) [Rust]
   ⭐ 0 | 今日 +339
   免费、开源且可扩展的完全离线语音转文字应用程序
8. [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) [Shell]
   ⭐ 0 | 今日 +967
   将 Claude Code 转变为完整的游戏开发工作室 — 包含 49 个 AI 代理、72 个工作流技能以及模拟真实工作室层级的完整协调系统。
9. [kornia/kornia](https://github.com/kornia/kornia) [Python]
   ⭐ 0 | 今日 +101
   🐍 面向空间 AI 的几何计算机视觉库
10. [beenuar/AiSOC](https://github.com/beenuar/AiSOC) [Python]
   ⭐ 0 | 今日 +446
   开源 AI 安全运营中心：告警融合、LLM 代理分流、MITRE ATT&CK 调查，以及每个代理步骤的可重放决策账本。支持自托管，无需 API 密钥即可运行，MIT 许可。附带适用于 Claude、Cursor 和 Continue 的 MCP 服务器。
