---
title: AI 开源趋势日报
published: 2026-08-08
report: ai-trending
tags:
  - radar
  - AI
---
# AI 开源趋势日报 2026-08-08

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-08 01:27 UTC

---

# 📊 AI 开源趋势日报（2026-08-08）

> **过滤说明**：已剔除与 AI/ML 无关的 Trending 项目（goauthentik/authentik、jdx/mise、google/guava、denoland/celld、K2SOsint/Legendary_OSINT、pranshuparmar/witr 等）。Trending 仓库标注今日新增 ⭐；主题搜索项目标注总 ⭐。

---

## 一、今日速览

1. **Agent/Skills 项目霸榜今日 Trending**：前五名（prime-agent、agent-skills、computer、mattpocock/skills、obra/superpowers）全部为 AI Agent 或 Agent Skills 项目，Google 官方同步推出 `google/skills`，技能工程成为绝对热点。
2. **Agent 自主性再升级**：Prime Intellect 的 prime-agent 以今日 +2,293⭐ 登顶，主打"自我改进 RLM 智能体"；Cloudflare 发布 `computer`，把"计算机操控"能力直接交给 agent。
3. **记忆与上下文层加速基础设施化**：mem0（62.8k⭐）、claude-mem（90k⭐）、headroom（65.4k⭐）等持续走热，跨会话记忆与 token 压缩成为 RAG 之后的新刚需。
4. **图原生 AI 与群智能等新范式登榜**：semantica（图原生上下文基础设施）、Graphify（104k⭐ 知识图谱 RAG）、MiroFish（群体智能引擎）集中出现，值得关注。
5. **RAG 赛道头部稳固**：ragflow、dify、llama_index、milvus 仍是检索增强方向的主流选择，Rust 在 AI 基础设施中的渗透（rig、aarambh-studio）也在加速。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架 / SDK / 推理引擎 / 开发工具）

- [semantica-agi/semantica](https://github.com/semantica-agi/semantica) · Python · 今日 +122⭐  
  图原生（Graph-Native）的上下文与可问责 AI 系统基础设施，今日首次登榜。

- [chenyme/grok2api](https://github.com/chenyme/grok2api) · Go · 今日 +55⭐  
  Grok Build / Web / Console 的多账号统一 API 网关，反映 xAI 生态的社区配套需求。

- [666ghj/MiroFish](https://github.com/666ghj/MiroFish) · Python · 今日 +141⭐  
  简洁通用的群体智能预测引擎，主打"预测万物"的通用 Swarm Intelligence 方案。

- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) · Rust · ⭐8,206  
  Rust 生态中构建模块化、可扩展 LLM 应用的主流框架，类型安全是其核心卖点。

- [open-compass/opencompass](https://github.com/open-compass/opencompass) · Python · ⭐7,283  
  支持 100+ 数据集与主流模型（Llama、Qwen、GPT-4、Claude 等）的 LLM 评估平台。

- [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) · Python · ⭐65,405  
  在到达 LLM 之前压缩工具输出、日志与 RAG 片段，可为 coding agent 节省约 20% token。

- [Picovoice/picollm](https://github.com/Picovoice/picollm) · Python · ⭐316  
  基于 X-Bit 量化的端侧 LLM 推理引擎，面向离线与边缘设备场景。

- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) · Python · ⭐4,446  
  面向系统工程师的 LLM 推理 Serving 课程，在 Apple Silicon 上从零构建微型 vLLM + Qwen。

### 🤖 AI 智能体 / 工作流（Agent 框架 / 自动化 / 多智能体）

- [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) · TypeScript · 今日 +2,293⭐  
  可自我改进的 RLM 编码智能体，面向长时自主任务，今日 Trending 榜首。

- [cloudflare/computer](https://github.com/cloudflare/computer) · TypeScript · 今日 +872⭐  
  "Give your agent a computer"：让 agent 获得真实计算机/GUI 操控能力的新范式。

- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) · JavaScript · 今日 +1,131⭐  
  生产级工程技能集；同赛道 **mattpocock/skills**（+2,152⭐）、**google/skills**（+327⭐）、**obra/superpowers**（+782⭐）今日齐登榜，形成"技能库"发布潮。

- [langgenius/dify](https://github.com/langgenius/dify) · TypeScript · ⭐151,729  
  Agentic 工作流 + RAG 管道的一体化协作平台，支持云端/私有化部署。

- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) · Python · ⭐143,653  
  Agent 工程平台的事实标准，围绕 LLM 应用提供组件化开发能力。

- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) · Python · ⭐39,152  
  用于构建可恢复、有状态 Agent 的低层编排框架，支撑复杂生产级工作流。

- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) · Python · 今日 +355⭐  
  老牌通用自主 Agent 平台，持续迭代"人人可用的 AI"愿景。

- [mem0ai/mem0](https://github.com/mem0ai/mem0) · Python · ⭐62,785  
  通用 AI Agent 记忆层，为智能体提供跨会话的持久化记忆能力。

### 📦 AI 应用（具体应用产品 / 垂直场景解决方案）

- [open-webui/open-webui](https://github.com/open-webui/open-webui) · Python · ⭐148,180  
  最受欢迎的本地自托管 AI 交互界面，支持 Ollama、OpenAI API 等主流后端。

- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) · JavaScript · ⭐64,471  
  本地优先的一站式 AI Agent 桌面应用，强调"拥有自己的智能"。

- [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) · Python · ⭐131,332  
  100+ 可运行的 AI Agents、Agent Skills 与 RAG 应用开源合集。

- [genieincodebottle/generative-ai](https://github.com/genieincodebottle/generative-ai) · Jupyter Notebook · ⭐2,589  
  覆盖路线图、项目实战与面试准备的生成式 AI 综合资源库。

- [kennethleungty/Finance-LLMs](https://github.com/kennethleungty/Finance-LLMs) ·

---

## Trending top10项目

1. [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) [TypeScript]
   ⭐ 0 | 今日 +2293
   用于编码工作流和长时间自主任务的自我改进RLM代理。
2. [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) [JavaScript]
   ⭐ 0 | 今日 +1131
   面向AI编程代理的生产级工程技能。
3. [cloudflare/computer](https://github.com/cloudflare/computer) [TypeScript]
   ⭐ 0 | 今日 +872
   给你的代理一台电脑 👾
4. [mattpocock/skills](https://github.com/mattpocock/skills) [Shell]
   ⭐ 0 | 今日 +2152
   为真正的工程师准备的技能，直接来自我的.agents目录。
5. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +782
   一个有效的代理技能框架和软件开发方法论。
6. [goauthentik/authentik](https://github.com/goauthentik/authentik) [Python]
   ⭐ 0 | 今日 +530
   你需要的身份验证粘合剂。
7. [semantica-agi/semantica](https://github.com/semantica-agi/semantica) [Python]
   ⭐ 0 | 今日 +122
   面向上下文和可问责AI系统的图原生基础设施。
8. [666ghj/MiroFish](https://github.com/666ghj/MiroFish) [Python]
   ⭐ 0 | 今日 +141
   简洁通用的群体智能引擎，预测万物
9. [chenyme/grok2api](https://github.com/chenyme/grok2api) [Go]
   ⭐ 0 | 今日 +55
   适用于Grok Build、Grok Web和Grok Console的多账户API网关。
10. [jdx/mise](https://github.com/jdx/mise) [Rust]
   ⭐ 0 | 今日 +135
   开发工具、环境变量、任务运行器。
