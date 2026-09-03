---
title: AI 开源趋势日报
published: 2026-07-14
report: ai-trending
tags:
  - radar
  - AI
---
# AI 开源趋势日报 2026-07-14

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-07-14 00:34 UTC

---

# AI 开源趋势日报 — 2026-07-14

## 1. 今日速览

- 交易 Agent **Vibe-Trading** 与 AI 编码辅助技能 **Graphify** 分别揽获 1,153 和 1,095 个今日 Star，成为当日增长最快的两个项目，显示金融自动化与开发者工具仍是 AI Agent 两大热门落地方向。  
- **Hallmark**（反 AI-slop 设计规范）获得 794 Stars，说明社区对 AI 生成代码的质量控制与风格一致性关注度急剧上升。  
- RAG 赛道持续活跃，**LightRAG**、**anything-llm**、**claude-mem** 等项目在主题搜索中保持高星数，且 HKUDS 团队从 LightRAG 延伸至 Vibe-Trading，展示 RAG 技术向具体 Agent 场景迁移的清晰路径。  
- AI Agent 生态不断细化：**marketingskills** 为 Claude Code 等 Agent 提供专有技能，**claude-mem** 解决跨会话记忆问题，开发者正在围绕编码助手构建完整的工具链与规范层。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

- **[pytorch/pytorch](https://github.com/pytorch/pytorch)** ⭐101,790  
  最主流的深度学习框架，支撑绝大多数 AI 研究与生产。

- **[huggingface/transformers](https://github.com/huggingface/transformers)** ⭐162,573  
  模型定义与推理标准库，覆盖文本、视觉、多模态等预训练模型。

- **[tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)** ⭐196,300  
  老牌机器学习框架，生产部署生态庞大。

- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** ⭐84,686（今日+1,095）  
  通用 AI 编码助手技能，支持 Claude Code、Codex、Cursor 等多种工具，将一个文件夹转化为可消费的 Agent 上下文。

- **[Nutlope/hallmark](https://github.com/Nutlope/hallmark)** ⭐0（今日+794）  
  为 Claude Code、Cursor、Codex 设计的反 AI-slop 风格指南，帮助开发者约束 AI 生成代码的质量与一致性。

- **[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)** ⭐58,965  
  在 LLM 输入前压缩工具输出、日志、RAG 块等，减少 60–95% Token 消耗，显著降低推理成本。

- **[scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn)** ⭐66,674  
  经典机器学习工具包，持续在传统 ML 领域发挥基础作用。

---

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

- **[langchain-ai/langchain](https://github.com/langchain-ai/langchain)** ⭐141,695  
  Agent 工程核心框架，提供链式调用、工具集成、记忆管理等标准范式。

- **[langgenius/dify](https://github.com/langgenius/dify)** ⭐148,714  
  生产级 Agentic Workflow 开发平台，支持可视化编排与多模型接入。

- **[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)** ⭐87,111  
  为 AI Agent 提供跨会话持久上下文，自动压缩并注入相关记忆，解决 Agent “失忆” 痛点。

- **[mem0ai/mem0](https://github.com/mem0ai/mem0)** ⭐60,753  
  通用 Agent 内存层，可作为独立服务或 MCP Server 与主流框架集成。

- **[HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)** ⭐0（今日+1,153）  
  个人交易 Agent，结合市场数据分析与自动执行，是金融场景 Agent 的最新尝试。

- **[datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents)** ⭐65,901  
  系统性 Agent 入门教程与实践，从零构建智能体，社区学习资源标杆。

- **[coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)** ⭐0（今日+299）  
  为 Claude Code 等 Agent 提供市场营销、CRO、SEO 等专业技能，扩展 Agent 行业适用性。

---

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

- **[open-webui/open-webui](https://github.com/open-webui/open-webui)** ⭐145,316  
  用户友好的 LLM 交互界面，支持 Ollama、OpenAI API，是本地 AI 使用首选入口。

- **[Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps)** ⭐119,581（今日+996）  
  超过 100 个可运行 AI Agent 与 RAG 应用，涵盖客服、写作、数据分析等场景，快速验证起点。

- **[Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm)** ⭐63,243  
  本地优先的全功能 Agent 体验平台，整合文档、数据库、API 等多知识源。

- **[jeecgboot/JeecgBoot](https://github.com/jeecgboot/JeecgBoot)** ⭐47,049  
  融合 AI 的低代码平台，支持 “一句话生成系统”，内置聊天、知识库、流程编排等 AI 应用模块。

- **[moeru-ai/airi](https://github.com/moeru-ai/airi)** ⭐0（今日+78）  
  自托管的 Grok 伴侣虚拟角色，融合 Neuro‑sama 理念，探索个性化 AI 交互与陪伴体验。

- **[netdata/netdata](https://github.com/netdata/netdata)** ⭐79,636  
  AI 增强的全栈可观测性平台，通过 ML 实现异常检测与根因分析。

- **[f/prompts.chat](https://github.com/f/prompts.chat)** ⭐165,647  
  ChatGPT 提示词社区，收录海量高质量 Prompt，支持自部署，是提示工程的必争资源库。

- **[asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)** ⭐57,294  
  从 Claude、ChatGPT、Gemini 等主流模型中提取的 System Prompt，对 Agent 行为分析与安全研究具有重要参考价值。

---

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

- **[rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)** ⭐99,036  
  从零实现 ChatGPT 级 LLM 的 PyTorch 教程，兼顾理论与动手，是深度理解 LLM 原理的首选资源。

- **[ultralytics/ultralytics](https://github.com/ultralytics/ultralytics)** ⭐59,450  
  YOLO26/11/8 统一框架，集成目标检测、分割、跟踪、分类等，兼顾训练与部署。

- **[ultralytics/yolov5](https://github.com/ultralytics/yolov5)** ⭐57,676  
  经典 YOLOv5 实现，工业级视觉模型，仍被广泛使用。

---

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)** ⭐84,967  
  领先的 RAG 引擎，融合 Agent 能力，提供深度文档理解与多轮对话检索。

- **[run-llama/llama_index](https://github.com/run-llama/llama_index)** ⭐50,824  
  文档 Agent 与 OCR 平台，专注非结构化数据的索引与检索增强。

- **[milvus-io/milvus](https://github.com/milvus-io/milvus)** ⭐45,211  
  高性能云原生向量数据库，作为 RAG 底层的 ANN 搜索引擎，广泛部署于生产环境。

- **[HKUDS/LightRAG](https://github.com/HKUDS/LightRAG)** ⭐37,634  
  “简单快速” 的 RAG 方案，被 EMNLP 2025 收录，轻量且高效，迅速获得社区采用。

---

## 3. 趋势信号分析

今日热榜中，**AI Agent 的垂直化与工具化** 是最大主题。Vibe‑Trading 从金融场景切入 Agent 自动化，marketingskills 与 hallmark 分别从 “技能赋予” 和 “输出规范” 两个维度完善编码助手生态，表明开发者正从 “能否用 Agent” 转向 “如何高效、可控地使用 Agent”。RAG 领域，LightRAG 以轻量高效获得持续关注，但本轮更值得注意的是 HKUDS 团队从 RAG（LightRAG）向交易 Agent（Vibe‑Trading）的迁移，暗示 **RAG 作为 Agent 记忆组件的定位逐渐成熟**，模型无关的记忆层（如 mem0、claude‑mem）也开始上升为独立基建。此外，headroom 等 Token 压缩工具的新增 Star 说明成本优化已从 “工程技巧” 变为刚需工具。**这是一个 AI 应用从 “炫技” 走向 “工程化、产品化” 的明确信号。**

## 4. 社区关注热点

- **🌱 Agent 技能市场萌芽**：marketingskills 为 Agent 提供特定岗位技能，Hallmark 提供设计规范，未来可能出现 “Agent Skill Store” 式生态。
- **💰 金融 Agent 走热**：Vibe‑Trading 单日狂揽 1,153 Stars，结合 LightRAG 在 RAG 领域的积累，HKUDS 团队或引领金融 + AI Agent 新方向。
- **🧠 持续记忆与上下文管理**：claude‑mem 和 mem0 分别从浏览器插件和框架层解决 Agent 长期记忆，是提升 Agent 自主性的关键拼图。
- **🛠 编码助手质量管控**：Hallmark 的 “反 AI‑slop” 思路获得大量共鸣，说明社区不再满足于 “能生成代码”，转而追求代码风格一致与可维护性。
- **📦 RAG 基础设施分化**：向量数据库（Milvus）、RAG 引擎（RAGFlow）、轻量库（LightRAG）分工日益清晰，开发者可根据场景灵活选型。

---

## Trending top10项目

1. [OpenCut-app/OpenCut](https://github.com/OpenCut-app/OpenCut) [TypeScript]
   ⭐ 0 | 今日 +1229
   开源CapCut替代品
2. [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) [Python]
   ⭐ 0 | 今日 +1153
   Vibe-Trading：您的个人交易代理
3. [moeru-ai/airi](https://github.com/moeru-ai/airi) [TypeScript]
   ⭐ 0 | 今日 +78
   💖🧸 自托管的Grok伴侣，装载waifu灵魂，将数字生命带入现实，追求Neuro-sama的高度。支持实时语音聊天、Minecraft和Factorio游戏。支持Web/macOS/Windows。
4. [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) [Python]
   ⭐ 0 | 今日 +996
   100多个AI Agent和RAG应用，可直接运行——克隆、定制、发布。
5. [Nutlope/hallmark](https://github.com/Nutlope/hallmark) [CSS]
   ⭐ 0 | 今日 +794
   为Claude Code、Cursor和Codex设计的反AI敷衍设计技能。
6. [Raphire/Win11Debloat](https://github.com/Raphire/Win11Debloat) [PowerShell]
   ⭐ 0 | 今日 +118
   一个简单轻量的PowerShell脚本，可移除预装应用、禁用遥测，并进行其他调整以精简和自定义Windows体验。适用于Windows 10和Windows 11。
7. [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) [Python]
   ⭐ 0 | 今日 +1095
   AI编码助手技能（支持Claude Code、Codex、OpenCode、Cursor、Gemini CLI等）。将任意代码、SQL模式、R脚本、Shell脚本、文档、论文、图像或视频文件夹转化为可查询的知识图谱。应用代码+数据库模式+基础设施整合于一个图谱。
8. [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset) [HTML]
   ⭐ 0 | 今日 +451
   包含1,324个锻炼的健身数据集——动画GIF、180×180缩略图、肌肉群与设备数据，以及6种语言的分步指导。LogPress应用背后的锻炼数据层。
9. [github/spec-kit](https://github.com/github/spec-kit) [Python]
   ⭐ 0 | 今日 +543
   💫 帮助您开始规范驱动开发的工具包
10. [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) [JavaScript]
   ⭐ 0 | 今日 +299
   为Claude Code和AI代理提供的营销技能。包含转化率优化、文案写作、SEO、分析和增长工程。
