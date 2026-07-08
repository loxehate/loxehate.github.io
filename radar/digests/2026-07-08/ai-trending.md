# AI 开源趋势日报 2026-07-08

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-07-08 00:37 UTC

---

# AI 开源趋势日报 — 2026-07-08

---

## 1. 今日速览

- **AI Agent 技能生态爆发**：多个专门为 Agent 提供“生产级技能”的仓库（`agent-skills`、`dotnet/skills`）登上热榜，社区开始为编码助手系统化地构建工程能力。
- **系统提示词泄露引发热议**：`system_prompts_leaks` 集中公开了 Anthropic、OpenAI 最新模型的系统提示词，今日增长 1691 stars，反映出开发者对前沿模型内部配置的强烈好奇。
- **本地优先、隐私保护的 AI 应用备受青睐**：`meetily`（全本地会议转录）、`RuView`（WiFi 信号感知）、`pocket-tts`（CPU 级 TTS）等强调“离线可用”的项目增长迅猛。
- **AI 垂直自动化场景落地加速**：`ai-job-search`（AI 求职）与 `OfficeCLI`（AI 操作 Office）展示了 Agent 具体解决真实工作流的价值，分别获得 2500+ 和 900+ 今日 stars。
- **RAG / 向量数据库生态持续成熟**：虽然今日热榜焦点在 Agent 工具，但 Dify、Milvus、Qdrant 等项目仍维持超大规模社区，说明检索增强仍是 AI 基础设施的核心。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、CLI 工具）

- **[langchain-ai/langchain](https://github.com/langchain-ai/langchain)**
  ⭐ 141,220 | LLM 应用开发的事实标准框架，Agent 编排、RAG、工具调用等能力持续迭代，生态最为丰富。

- **[ollama/ollama](https://github.com/ollama/ollama)**
  ⭐ 175,670 | 本地运行大模型的首选工具，最新已支持 Kimi、GLM、DeepSeek、Qwen 等数十种模型，一键部署推理。

- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)**
  ⭐ 57,537 | 在到达 LLM 之前压缩工具输出、日志和 RAG 分块，减少 60–95% token，同等答案质量。大幅降低推理成本。

- **[kyutai-labs/pocket-tts](https://github.com/kyutai-labs/pocket-tts)**
  ⭐ 0 (+531 today) | 能够在 CPU 上实时运行的轻量 TTS 模型，适合边缘设备和离线场景。

- **[asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)**
  ⭐ 0 (+1,691 today) | 泄露的 Claude、GPT、Codex 等模型系统提示词集合，是近期理解下一代模型行为的宝贵资源。

- **[steipete/CodexBar](https://github.com/steipete/CodexBar)**
  ⭐ 0 (+376 today) | macOS 菜单栏工具，实时显示 Codex 和 Claude Code 的用量统计，无需登录。

- **[neuml/txtai](https://github.com/neuml/txtai)**
  ⭐ 12,712 | 一体化 AI 框架，整合语义搜索、LLM 编排、知识图谱工作流，轻量且功能全面。

---

### 🤖 AI 智能体 / 工作流（Agent 框架、自动化、多智能体）

- **[Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)**
  ⭐ 185,423 | 自主 Agent 先驱，推动“给任务、看执行”范式，现已集成多模型和工具链。

- **[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**
  ⭐ 210,979 | 自称“与你一起成长的 Agent”，支持技能订阅、记忆演化，强调长期自适应。

- **[affaan-m/ECC](https://github.com/affaan-m/ECC)**
  ⭐ 227,056 | Agent 性能优化系统，为 Claude Code、Codex、OpenCode 等提供技能、本能、记忆和安全能力。

- **[langgenius/dify](https://github.com/langgenius/dify)**
  ⭐ 148,083 | 生产级 Agentic Workflow 开发平台，兼具 RAG、工具调用、对话管理，是企业级首选。

- **[FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise)**
  ⭐ 54,392 | 可视化构建 AI Agent 和 RAG 工作流，降低开发门槛，支持拖拽式编排。

- **[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)**
  ⭐ 0 (+1,317 today) | 为 AI 编码 Agent 提供生产级技能集（测试、安全、文档等），是 Agent 工程最佳实践参考。

- **[mem0ai/mem0](https://github.com/mem0ai/mem0)**
  ⭐ 60,329 | Agent 通用记忆层，跨会话保持上下文，自动压缩和注入相关记忆。

- **[TencentCloud/CubeSandbox](https://github.com/TencentCloud/CubeSandbox)**
  ⭐ 0 (+664 today) | 腾讯云开源的即时、高并发、安全 Agent 沙箱，专为 AI Agent 执行环境设计。

---

### 📦 AI 应用（具体产品、垂直场景解决方案）

- **[open-webui/open-webui](https://github.com/open-webui/open-webui)**
  ⭐ 144,601 | 最流行的自托管 AI 聊天界面，支持 Ollama、OpenAI 兼容 API，可扩展 RAG、工具。

- **[MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search)**
  ⭐ 0 (+2,514 today) | 基于 Claude Code 的 AI 求职助手：自动评估职位、定制简历、写求职信，攻占招聘场景。

- **[Zackriya-Solutions/meetily](https://github.com/Zackriya-Solutions/meetily)**
  ⭐ 0 (+1,777 today) | 隐私优先的会议助手，100% 本地转录（Whisper）+ 说话人分离 + Ollama 总结，基于 Rust 构建。

- **[iOfficeAI/OfficeCLI](https://github.com/iOfficeAI/OfficeCLI)**
  ⭐ 0 (+893 today) | 首个为 AI Agent 打造的 Office 套件 CLI，让 Agent 读、写、自动化 Word / Excel / PPT。

- **[bradautomates/claude-video](https://github.com/bradautomates/claude-video)**
  ⭐ 0 (+965 today) | 赋予 Claude 视频理解能力——自动下载、抽帧、转录，全部交给 Claude 分析。

- **[ruvnet/RuView](https://github.com/ruvnet/RuView)**
  ⭐ 0 (+1,129 today) | 无需摄像头，利用商用 WiFi 信号实现空间感知、生命体征监测和存在检测，AI 传感器新范式。

- **[jeecgboot/JeecgBoot](https://github.com/jeecgboot/JeecgBoot)**
  ⭐ 46,959 | AI 低代码平台：内置 AI 聊天、知识库、流程编排，一句话生成整套系统。

---

### 🧠 大模型 / 训练（模型权重、训练框架、微调工具）

- **[kyutai-labs/pocket-tts](https://github.com/kyutai-labs/pocket-tts)**
  ⭐ 0 (+531 today) | 可在 CPU 上实时推理的轻量 TTS 模型，适合端侧部署。

- **[ollama/ollama](https://github.com/ollama/ollama)**
  ⭐ 175,670 | 本地大模型运行与分发工具，支持最新开源模型的导入、推理和 API 暴露。

> 今日热榜中纯粹的模型训练/微调框架较少，pocket-tts 和 ollama 代表了**轻量化推理与本地部署**的突出趋势。

---

### 🔍 RAG / 知识库（向量数据库、检索增强、知识管理）

- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)**
  ⭐ 84,536 | 领先的开源 RAG 引擎，深度融合 Agent 能力，提供企业级上下文理解。

- **[milvus-io/milvus](https://github.com/milvus-io/milvus)**
  ⭐ 45,123 | 高性能云原生向量数据库，支撑大规模 ANN 搜索，是 AI 应用的基础设施。

- **[qdrant/qdrant](https://github.com/qdrant/qdrant)**
  ⭐ 33,014 | 高可用向量搜索引擎和数据库，专为 AI 应用打造，提供全托管云服务。

- **[meilisearch/meilisearch](https://github.com/meilisearch/meilisearch)**
  ⭐ 58,451 | 极速搜索引擎，最新版本内置 AI 混合搜索，让全文搜索与向量检索兼得。

- **[run-llama/llama_index](https://github.com/run-llama/llama_index)**
  ⭐ 50,712 | 以文档为中心的数据 Agent 框架，支持多模态 RAG 和 OCR，已被大量生产采用。

- **[Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm)**
  ⭐ 62,796 | “停止租赁你的智力”——全功能本地 Agent 体验，自带 RAG、工作区、多模型支持。

- **[NirDiamant/RAG_Techniques](https://github.com/NirDiamant/RAG_Techniques)**
  ⭐ 28,400 | 系统化 RAG 进阶技术教程集合，覆盖分块、重排、多模态等实战方法。

---

## 3. 趋势信号分析

今日 Trending 集中释放了几个明确信号：

**Agent 技能工程成为新热点。** `addyosmani/agent-skills`、`dotnet/skills`、`Graphify-Labs/graphify` 同时登榜，表明社区不再只满足于大模型本身，而是开始系统性建设“Agent 的能力技能库”，涵盖测试、安全、文件操作等生产级要求。这标志 AI 编码助手进入工程化阶段。

**系统提示词泄露揭示模型进化方向。** `system_prompts_leaks` 以 1691 日增星冲到前列，泄露的 Claude Opus 4.8、ChatGPT 5.5 Thinking 等提示词体现了厂商如何引导模型行为。这种“反向工程”行为反映开发者从“用 API”到“理解模型内部逻辑”的深入需求。

**垂直场景 Agent 应用快速落地。** `ai-job-search` 和 `OfficeCLI` 分别针对求职和办公自动化，获得极高关注。这证明 Agent 正在从通用对话转向解决高重复性的具体工作流，且“模板化 + 一键部署”的模式容易引发传播。

**本地 / 边缘 AI 持续升温。** `meetily`（本地转录）、`pocket-tts`（CPU TTS）、`RuView`（WiFi 感知）都强调不依赖云端、保护隐私。随着模型小型化与硬件进步，“运行在自己的设备上”不再是口号。

**RAG 基础设施成熟化。** 虽然今日 Trending 以 Agent 应用为主，但主题搜索中 Dify、Milvus、Qdrant 等长期维持超高星数，说明 RAG/向量数据库已成为 AI 应用的标配层，正向“开箱即用、云原生、混合搜索”演进。

---

## 4. 社区关注热点

- **✨ `addyosmani/agent-skills`**：生产级 Agent 技能集，值得开发者 fork 并贡献自己的最佳实践，是 Agent 工程化的样板仓库。
- **🔍 `asgeirtj/system_prompts_leaks`**：唯一系统级泄漏最新 Claude/GPT 提示词的资源，对研究模型行为、设计 Agent prompt 有极高参考价值。
- **📡 `ruvnet/RuView`**：WiFi 感知 + AI，开辟了非视觉传感的新 AI 应用方向，有可能影响智能空间和健康监测领域。
- **💼 `MadsLorentzen/ai-job-search`**：展示 Agent 如何端到端处理求职长流程，其“Fork + 配置”模式或将推广到更多垂直场景。
- **⚙️ `TencentCloud/CubeSandbox`**：腾讯云开源的 Agent 沙箱，强调安全与高并发，为 Agent 执行环境提供了基础设施参考。

---

*报告基于 2026-07-08 GitHub Trending 及 Topic Search（rag / vector-db / llm）数据，AI 相关项目已全部纳入，非 AI 项目已排除。*

---

## Trending top10项目

1. [MadsLorentzen/ai-job-search](https://github.com/MadsLorentzen/ai-job-search) [TypeScript]
   ⭐ 0 | 今日 +2514
   AI-powered job application framework built on Claude Code. Fork it, fill in your profile, and let Claude evaluate jobs, tailor CVs, write cover letters, and prepare you for interviews.
2. [Zackriya-Solutions/meetily](https://github.com/Zackriya-Solutions/meetily) [Rust]
   ⭐ 0 | 今日 +1777
   Privacy first, AI meeting assistant with 4x faster Parakeet/Whisper live transcription, speaker diarization, and Ollama summarization built on Rust. 100% local processing. no cloud required. Meetily (Meetly Ai - https://meetily.ai) is the #1 Self-hosted, Open-source Ai meeting note taker for macOS &amp; Windows.
3. [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) [JavaScript]
   ⭐ 0 | 今日 +1317
   Production-grade engineering skills for AI coding agents.
4. [ruvnet/RuView](https://github.com/ruvnet/RuView) [Rust]
   ⭐ 0 | 今日 +1129
   π RuView turns commodity WiFi signals into real-time spatial intelligence, vital sign monitoring, and presence detection — all without a single pixel of video.
5. [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) [JavaScript]
   ⭐ 0 | 今日 +1691
   Extracted system prompts from Anthropic - Claude Fable 5, Opus 4.8, Claude Code, Claude Design. OpenAI - ChatGPT 5.5 Thinking, GPT 5.5 Instant, Codex. Google - Gemini 3.5 Flash, 3.1 Pro, Antigravity. xAI - Grok, Cursor, Copilot, VS Code, Perplexity, and more. Updated regularly.
6. [TencentCloud/CubeSandbox](https://github.com/TencentCloud/CubeSandbox) [Rust]
   ⭐ 0 | 今日 +664
   Instant, Concurrent, Secure &amp; Lightweight Sandbox for AI Agents.
7. [AhmadIbrahiim/Website-downloader](https://github.com/AhmadIbrahiim/Website-downloader) [HTML]
   ⭐ 0 | 今日 +140
   💡 Download the complete source code of any website (including all assets). [ Javascripts, Stylesheets, Images ] using Node.js
8. [steipete/CodexBar](https://github.com/steipete/CodexBar) [Swift]
   ⭐ 0 | 今日 +376
   Show usage stats for OpenAI Codex and Claude Code, without having to login.
9. [dotnet/skills](https://github.com/dotnet/skills) [C#]
   ⭐ 0 | 今日 +64
   Repository for skills to assist AI coding agents with .NET and C#
10. [iOfficeAI/OfficeCLI](https://github.com/iOfficeAI/OfficeCLI) [C#]
   ⭐ 0 | 今日 +893
   OfficeCLI is the first and best Office suite purpose-built for AI agents to read, edit, and automate Word, Excel, and PowerPoint files. Free, open-source, single binary, no Office installation required.