---
title: "AI 开源趋势日报"
date: 2026-08-10
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# AI 开源趋势日报 2026-08-10

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-10 01:43 UTC

---

# AI 开源趋势日报（2026-08-10）

## 一、今日速览

今日 AI 开源社区的核心看点聚焦在 **Agent 工程化**：prime-agent 单日新增超 2,300 stars，Agent Skills 类项目（agent-skills、google/skills）集体上榜，说明“如何让 Agent 真正干活”正成为主流需求。同时，**RAG 从聊天问答走向代码库理解**，code-graph-rag、graphify 等项目让知识图谱与代码检索结合。垂直领域 AI 应用持续涌现，金融股票分析、法律智能、PPT 生成等均有高热度项目。另外，DeepMind 开源天气预测模型 weathernext，显示科学计算与 AI 的交叉领域也在吸引开发者关注。

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

- [ollama/ollama](https://github.com/ollama/ollama) ⭐178,143  
  本地运行大模型的最流行工具，支持 Kimi-K2.6、GLM-5.2、DeepSeek、Qwen 等模型，是大量 Agent 与 AI 应用的推理底座。

- [huggingface/transformers](https://github.com/huggingface/transformers) ⭐163,506  
  最主流的模型定义与推理框架，覆盖文本、视觉、音频和多模态，是 AI 开发的基础设施级项目。

- [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) ⭐今日 +365  
  模块化扩散模型 GUI 与后端，Stable Diffusion 等图像生成工作流的事实标准工具。

- [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) ⭐36,656  
  面向 Agent 与生成式 UI 的前端开发栈，支持 React、Angular、移动端，是 AG-UI 协议的主要推动者。

- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) ⭐164,218  
  为 LLM 提供网页搜索、爬取与结构化交互的“上下文 API”，是 Agent 获取实时信息的重要工具。

- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) ⭐143,814  
  Agent 工程化平台，统一封装模型、工具、记忆与编排逻辑，是构建复杂 AI 工作流的常用框架。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

- [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) ⭐0（今日 +2,356）  
  自改进的编码智能体，面向长时运行和自主任务，今日最受关注的 Agent 项目之一。

- [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) ⭐0（今日 +858）  
  用 Shell 实现的“AI 代理机构”，内置多种角色型 Agent，可快速组建多智能体团队。

- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) ⭐186,465  
  通用自主 Agent 的先行者，目标是为每个人提供可使用的 AI 自动化能力。

- [browser-use/browser-use](https://github.com/browser-use/browser-use) ⭐108,494  
  让 AI Agent 能真实操作浏览器、自动化完成网页任务，是 Agent 互联网交互的核心工具。

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐227,955  
  强调“与你一起成长”的 Agent 框架，突出长期记忆与自适应能力。

- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) ⭐46,794  
  超轻量、自托管的 Python Agent 框架，支持 WebUI、记忆、MCP、多 Agent 工作流。

- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) ⭐0（今日 +680）  
  面向 AI 编码 Agent 的“生产级工程技能”集合，帮助 Agent 更好地处理大型代码库任务。

- [google/skills](https://github.com/google/skills) ⭐0（今日 +528）  
  Google 官方发布的 Agent Skills，覆盖 Google 产品与技术栈，便于 Agent 与 Google 生态集成。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) ⭐61,228（今日 +306）  
  LLM 驱动的多市场股票智能分析系统，支持多源行情、实时新闻、可视化看板与自动推送。

- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) ⭐102,337  
  利用 AI 大模型与自动化工作流，根据主题或关键词一键生成高清短视频。

- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) ⭐50,184  
  AI 生产力工作室，提供智能聊天、自主 Agent 与 300+ 助手，统一接入前沿大模型。

- [santifer/career-ops](https://github.com/santifer/career-ops) ⭐63,316  
  开源 AI 求职工具：自动扫描职位、评分、定制简历并跟踪申请流程，本地运行。

- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) ⭐44,105  
  将文档或主题转换为原生 PowerPoint，支持动画、图表和表格等真实可编辑元素。

- [harveyai/harvey-labs](https://github.com/harveyai/harvey-labs) ⭐0（今日 +47）  
  专为法律领域 Agent 能力评估设计的基准项目，反映 Agent 在专业行业中的落地潜力。

- [iOfficeAI/AionUi](https://github.com/iOfficeAI/AionUi) ⭐31,772  
  开源 24/7 Agent 协作应用，可同时调度 Claude Code、Codex、OpenCode 等 20+ CLI Agent。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

- [google-deepmind/weathernext](https://github.com/google-deepmind/weathernext) ⭐0（今日 +86）  
  DeepMind 开源的天气预测模型，是科学 AI 与气象领域结合的重要开源案例。

- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) ⭐102,067  
  PyTorch 从零实现类 ChatGPT 大模型的教学项目，是理解 LLM 训练原理的必备资源。

- [ollama/ollama](https://github.com/ollama/ollama) ⭐178,143  
  不仅是推理工具，也可视作本地模型运行与分发的基础设施，让新模型发布后能快速被开发者在本地使用。

- [huggingface/transformers](https://github.com/huggingface/transformers) ⭐163,506  
  同时承担大量模型训练、微调与部署任务，是模型生态的核心枢纽。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

- [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) ⭐0（今日 +96）  
  面向大型 monorepo 的 RAG 系统，利用知识图谱实现对多语言代码库的查询、理解和编辑。

- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) ⭐104,629  
  将代码库、文档、SQL Schema 和 PDF 转化为可查询知识图谱，支持 Claude Code、Cursor 等 Agent。

- [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) ⭐45,689  
  开源、隐私优先、自托管的知识工作空间，支持人与 AI Agent 在笔记中协同。

- [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) ⭐131,769  
  收录 100+ AI Agent、Agent Skills 与 RAG 应用的开源合集，是快速上手检索增强应用的重要入口。

## 三、趋势信号分析

今日热榜最强烈的信号是 **Agent 技能（Skills）正在成为新的插件层**。agent-skills 与 google/skills 单日分别获得 680 和 528 stars，说明社区不再满足于通用 Agent 框架，而是更关注“Agent 能做哪些专业任务”。prime-agent 和 agency-agents 则分别代表自改进编码 Agent 与多智能体协作方向，显示出 Agent 正从 Demo 走向工程化。

同时，**RAG 与知识图谱结合代码库**是一个刚爆发的新方向。code-graph-rag、graphify 都主打“让 Agent 理解大型代码库”，这可能会显著提升 AI 编程工具在真实工程中的可用性。

DeepMind weathernext 上榜则提示 **科学 AI 开源化** 正在升温；而 ollama 描述中更新了 Kimi-K2.6、GLM-5.2 等新模型，说明新模型发布正在拉动本地推理与 Agent 应用工具链的活跃度。总体来看，AI 开源社区正从“模型热”转向“Agent 应用热”和“行业落地热”。

## 四、社区关注热点

- **prime-agent**：单日新增 2,356 stars，自改进编码 Agent 方向热度空前，值得重点关注其技术路线。
- **Agent Skills 生态**：google/skills 与 addyosmani/agent-skills 双双上榜，“技能”正在成为 Agent 能力复用的新范式。
- **代码库 RAG**：code-graph-rag 与 graphify 推动“代码知识图谱”类工具发展，可能引领下一波 AI 开发者工具革新。
- **科学 AI 开源**：DeepMind weathernext 首次登榜，天气/气候领域开源模型有望成为新的社区热点。
- **轻量自托管 Agent 框架**：nanobot、QwenPaw、openclaude 等持续活跃，反映开发者对低门槛、可私有部署 Agent 的强烈需求。

---

## Trending top10项目

1. [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) [TypeScript]
   ⭐ 0 | 今日 +2356
   用于编码工作流和长期自主任务的自我改进 RLM 智能体。
2. [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) [Python]
   ⭐ 0 | 今日 +96
   面向 monorepo 的终极 RAG。借助 AI 和知识图谱，查询、理解和编辑多语言代码库。
3. [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) [Shell]
   ⭐ 0 | 今日 +858
   触手可及的完整 AI 智能体机构——从前端奇才到 Reddit 社区忍者，从趣味注入者到现实核查者。每个智能体都是具有个性、流程和成熟交付物的专家。
4. [pranshuparmar/witr](https://github.com/pranshuparmar/witr) [Go]
   ⭐ 0 | 今日 +210
   为什么它在运行？将任何进程、端口、容器或文件追溯到其启动源头——CLI + TUI。
5. [google-deepmind/weathernext](https://github.com/google-deepmind/weathernext) [Python]
   ⭐ 0 | 今日 +86
6. [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) [JavaScript]
   ⭐ 0 | 今日 +680
   面向 AI 编码智能体的生产级工程技能。
7. [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) [Python]
   ⭐ 0 | 今日 +306
   LLM 驱动的多市场股票智能分析系统：多源行情、实时新闻、决策看板与自动推送，支持零成本定时运行。
8. [goauthentik/authentik](https://github.com/goauthentik/authentik) [Python]
   ⭐ 0 | 今日 +310
   你需要的身份验证粘合剂。
9. [google/skills](https://github.com/google/skills) [Python]
   ⭐ 0 | 今日 +528
   面向 Google 产品与技术的 Agent Skills。
10. [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) [Python]
   ⭐ 0 | 今日 +365
   最强大且模块化的扩散模型 GUI、API 和后端，采用图/节点接口。

</div>
