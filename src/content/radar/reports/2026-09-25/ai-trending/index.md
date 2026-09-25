---
title: "AI 开源趋势日报"
published: 2026-09-25
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-09-25

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-25 00:00 UTC

---

# AI 开源趋势日报（2026-09-25）

**筛选说明**：Trending 榜中剔除了 3 个非 AI/ML 项目：`FxEmbed/FxEmbed`（社交嵌入修复）、`mvt-project/mvt`（移动取证工具）、`julyx10/lap`（离线相册管理）。主题搜索 30 个仓库均带 `llm` / `llm-model` 标签，全部纳入。共筛选出 **41 个 AI 相关项目**。

---

## 1. 今日速览

- 今日热榜几乎被 **AI Agent 基础设施** 霸屏：Hindsight 的“记忆层”、Google ax 的“编排运行时”、harness-sdk 与 superpowers 的“技能/开发方法”分别从不同环节补齐 Agent 生产化拼图。
- “Agent-Native”成为新关键词：CLI-Anything 试图让所有软件都变成 Agent 可调用的原生接口，treg 则要做 Agent 工具层面的“OpenRouter”，工具调用标准化趋势明显。
- 本地推理和模型优化同步升温：stable-diffusion.cpp 坚持纯 C/C++ 做端侧扩散模型，NVIDIA Model-Optimizer 把量化/蒸馏/投机解码等优化手段统一成库。
- 大模型“从零训练”和推理时扩展是教育与研究方向双热点：LLMs-from-scratch、minimind、tiny-llm 以及 test-time scaling 综述、AttnRL 都在热榜/主题搜索中活跃。
- 金融、科研、内容生成等垂直场景开始出现可跑的 Agent 应用，例如 anthropics/financial-services、TradingAgents、DATAGEN、MoneyPrinterTurbo。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

- [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch)（⭐0，今日 +347）  
  一个“从零开始做 AI 工程”的学习/实战仓库，强调学完即构建并交付，契合今天 AI 工程师的技术成长需求。

- [ollama/ollama](https://github.com/ollama/ollama)（⭐181,641）  
  本地运行 LLM 的最流行入口，支持 DeepSeek、Qwen、Kimi、Gemma 等主流模型，是 Agent 应用落地的基础依赖。

- [huggingface/transformers](https://github.com/huggingface/transformers)（⭐166,616）  
  模型定义与推理的事实标准框架，覆盖文本/视觉/音频/多模态，仍是开源模型生态的地基。

- [NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer)（⭐0，今日 +44）  
  NVIDIA 推出的统一模型优化库，覆盖量化、蒸馏、剪枝、NAS、投机解码等 SOTA 技术，面向高效推理部署。

- [leejet/stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp)（⭐0，今日 +36）  
  纯 C/C++ 实现的扩散模型推理，支持 SD/Flux/Wan/Qwen Image，适合端侧和低资源部署。

- [open-compass/opencompass](https://github.com/open-compass/opencompass)（⭐7,472）  
  LLM 评测平台，覆盖 100+ 数据集和主流模型 API，帮助社区标准化模型能力对比。

- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm)（⭐4,723）  
  面向系统工程师的 LLM 推理学习项目，从零构建 mini vLLM + Qwen，深入理解推理系统内部机制。

- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig)（⭐8,720）  
  Rust 生态的模块化 LLM 应用开发框架，为高性能、低资源消耗的 Agent 提供底层能力。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

- [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight)（⭐0，今日 +1,668）  
  让 Agent 拥有“可学习记忆层”的项目，是今日热榜中增速最快的项目之一，直击 Agent 长期记忆短板。

- [google/ax](https://github.com/google/ax)（⭐0，今日 +1,373）  
  Google 开源的 agentic orchestration runtime，用 Go 构建，今天在热榜引发大量关注。

- [strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk)（⭐0，今日 +455）  
  生产级 Agent harness 的 SDK，支持 Python/TypeScript、任意模型、任意云，是 Agent 工程化的重要基础设施。

- [obra/superpowers](https://github.com/obra/superpowers)（⭐0，今日 +611）  
  Agentic skills 框架与软件开发方法，强调让 Agent 具备可复用的“技能栈”。

- [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)（⭐0，今日 +413）  
  “让所有软件都变成 Agent-Native”——把命令行工具改造成 Agent 可直接调用的接口，是工具层标准化的一次大胆尝试。

- [superdesigndev/treg](https://github.com/superdesigndev/treg)（⭐0，今日 +468）  
  “OpenRouter for agent tools”，试图在 Agent 工具调用层建立统一路由和计费/访问控制。

- [affaan-m/ECC](https://github.com/affaan-m/ECC)（⭐266,888）  
  Agent harness 性能优化系统，为 Claude Code、Codex、Cursor 等编码 Agent 提供技能、记忆、安全等能力。

- [langchain-ai/langchain](https://github.com/langchain-ai/langchain)（⭐147,014）  
  Agent 工程平台，已从编排框架演变为覆盖开发、部署、运维的 Agent 基础设施。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

- [dream-num/univer](https://github.com/dream-num/univer)（⭐0，今日 +1,082）  
  AI Agent 的“Office 基座”，将表格、文档、幻灯片、PDF 统一到一个运行时，是办公 Agent 的交互层。

- [anthropics/financial-services](https://github.com/anthropics/financial-services)（⭐0，今日 +509）  
  Anthropic 推出的金融行业解决方案，代表头部 AI 厂商在垂直金融场景的落地探索。

- [open-webui/open-webui](https://github.com/open-webui/open-webui)（⭐153,078）  
  本地优先的 AI 聊天与管理界面，支持 Ollama、OpenAI API 等，是自托管 LLM 用户最常用的前端。

- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)（⭐125,533）  
  AI 一键生成高清短视频的应用，利用大模型与自动化工作流，是内容创作赛道的热门项目。

- [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)（⭐108,473）  
  多智能体 LLM 金融交易框架，展示 Agent 在量化投研与交易决策中的应用。

- [zi-yue-1129/DATAGEN](https://github.com/zi-yue-1129/DATAGEN)（⭐1,806）  
  AI 驱动的多智能体科研助手，自动完成假设生成、数据分析和报告撰写，是科研自动化代表。

- [acon96/home-llm](https://github.com/acon96/home-llm)（⭐1,442）  
  本地 LLM 控制智能家居的 Home Assistant 集成，端侧 AI 与 IoT 结合。

- [Event-AHU/Medical_Image_Analysis](https://github.com/Event-AHU/Medical_Image_Analysis)（⭐241）  
  基于基础模型的医学影像分析，AI 医疗垂直场景的参考实现。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)（⭐105,513）  
  从零手写 ChatGPT-like LLM 的 PyTorch 教程，是深入理解大模型原理的必读项目。

- [jingyaogong/minimind](https://github.com/jingyaogong/minimind)（⭐62,484）  
  只需 2 小时即可训练 64M 参数 LLM，极大降低大模型入门门槛。

- [testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io)（⭐112）  
  LLM test-time scaling 综述仓库，系统梳理“what/how/where/how well”，反映推理时计算扩展研究热点。

- [RyanLiu112/AttnRL](https://github.com/RyanLiu112/AttnRL)（⭐14）  
  ICLR 2026 官方代码库，用“注意力作为罗盘”改进 Reasoning Model 的 process-supervised RL，是前沿训练方法。

- [R-D-BioTech-Alaska/Qelm](https://github.com/R-D-BioTech-Alaska/Qelm)（⭐27）  
  量子增强语言模型 Qelm，探索量子计算与 LLM 结合的前瞻方向。

- [llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm)（⭐1,432）  
  日本語 LLM 资源汇总，反映多语言/本地化模型的生态建设。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)（⭐184,303）  
  面向 LLM 的 Web 数据 API，负责搜索、爬取和交互，是 RAG 与 Agent 获取外部知识的重要管道。

- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)（⭐121,214）  
  将代码库、文档、SQL、PDF 转为可查询知识图谱，为编码 Agent 提供可检索的项目知识。

- [langgenius/dify](https://github.com/langgenius/dify)（⭐157,120）  
  同时覆盖 Agentic Workflow 与 RAG Pipeline 的一体化平台，是知识库应用和 Agent 工作流常用的底座。

---

## 3. 趋势信号分析

今日热榜释放的最强信号是 **Agent 基础设施取代单一模型成为焦点**。Hindsight（+1,668）、Google ax（+1,373）、superpowers（+611）、harness-sdk（+455）等项目的快速增长，说明社区正在从“能跑通 demo”转向“生产可用的记忆、编排、技能与可观测性层”。

CLI-Anything 与 treg 分别从“Agent 调用软件接口”和“Agent 工具路由”两个角度探索工具层标准化，可类比 LLM 时代的 API 网关，是值得关注的新兴技术方向。与此同时，NVIDIA Model-Optimizer 与 stable-diffusion.cpp 代表推理优化与端侧部署持续升温；test-time scaling 综述和 AttnRL 则指向推理时扩展与过程监督强化学习，这与大模型参数增长放缓后向 inference-time compute 要效果的行业趋势一致。

应用层由金融、科研、内容生成等垂直 Agent 领跑，Anthropic 推出 financial-services 也表明头部厂商正在加速将 Agent 带入高价值行业。

---

## 4. 社区关注热点

- **Agent 记忆层**：[vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) 今日新增 1,668 stars，Agent 记忆是长期上下文与个性化运行的关键短板，值得所有 Agent 开发者跟进。
- **Google 入场 Agent 运行时**：[google/ax](https://github.com/google/ax) 用 Go 实现开源 agentic orchestration runtime，说明大厂正在把 Agent 运行时当成云原生基础设施来推。
- **Agent 工具互操作标准**：[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) 与 [superdesigndev/treg](https://github.com/superdesigndev/treg) 一个让软件 Agent-Native，一个做 Agent 工具路由，二者结合会加速 Agent 工具生态标准化。
- **本地化/低成本推理**：[leejet/stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp) 与 [NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) 表明模型压缩和纯 C++ 推理会在边缘设备上打开更多场景。
- **推理时扩展与 RL 新范式**：[testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io) 与 [RyanLiu112/AttnRL](https://github.com/RyanLiu112/AttnRL) 聚焦推理时计算扩展和过程监督强化学习，是下一代推理模型训练的重要方向。

---

## 附：完整筛选分类清单

| 维度 | 项目 |
|---|---|
| 🔧 AI 基础工具 | [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch)、[NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer)、[leejet/stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp)、[ollama/ollama](https://github.com/ollama/ollama)、[huggingface/transformers](https://github.com/huggingface/transformers)、[open-compass/opencompass](https://github.com/open-compass/opencompass)、[0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig)、[skyzh/tiny-llm](https://github.com/skyzh/tiny-llm)、[samchon/nestia](https://github.com/samchon/nestia)、[mikahama/uralicNLP](https://github.com/mikahama/uralicNLP)、[LancerLab/croqtile](https://github.com/LancerLab/croqtile)、[aramisfacchinetti/streaming-json-parser](https://github.com/aramisfacchinetti/streaming-json-parser) |
| 🤖 AI 智能体/工作流 | [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight)、[google/ax](https://github.com/google/ax)、[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)、[obra/superpowers](https://github.com/obra/superpowers)、[strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk)、[superdesigndev/treg](https://github.com/superdesigndev/treg)、[affaan-m/ECC](https://github.com/affaan-m/ECC)、[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)、[Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)、[langchain-ai/langchain](https://github.com/langchain-ai/langchain)、[browser-use/browser-use](https://github.com/browser-use/browser-use)、[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) |
| 📦 AI 应用 | [dream-num/univer](https://github.com/dream-num/univer)、[anthropics/financial-services](https://github.com/anthropics/financial-services)、[open-webui/open-webui](https://github.com/open-webui/open-webui)、[harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo)、[TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents)、[zi-yue-1129/DATAGEN](https://github.com/zi-yue-1129/DATAGEN)、[acon96/home-llm](https://github.com/acon96/home-llm)、[Event-AHU/Medical_Image_Analysis](https://github.com/Event-AHU/Medical_Image_Analysis) |
| 🧠 大模型/训练 | [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch)、[jingyaogong/minimind](https://github.com/jingyaogong/minimind)、[testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io)、[RyanLiu112/AttnRL](https://github.com/RyanLiu112/AttnRL)、[R-D-BioTech-Alaska/Qelm](https://github.com/R-D-BioTech-Alaska/Qelm)、[llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm) |
| 🔍 RAG/知识库 | [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)、[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)、[langgenius/dify](https://github.com/langgenius/dify) |

---

## Trending top10项目

1. [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) [Python]
   ⭐ 0 | 今日 +347
   学习它。构建它。为他人交付。
2. [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) [Python]
   ⭐ 0 | 今日 +1668
   Hindsight：会学习的智能体记忆
3. [dream-num/univer](https://github.com/dream-num/univer) [TypeScript]
   ⭐ 0 | 今日 +1082
   AI智能体的办公平台——在一个运行时中集成表格、文档、幻灯片、画布、关系表和PDF。
4. [google/ax](https://github.com/google/ax) [Go]
   ⭐ 0 | 今日 +1373
   谷歌开放智能体编排运行时
5. [NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) [Python]
   ⭐ 0 | 今日 +44
   一个统一的SOTA模型优化技术库，包含量化、蒸馏、剪枝、神经架构搜索、推测解码等。压缩深度学习模型，用于TensorRT-LLM、TensorRT、vLLM等下游部署框架，优化推理速度。
6. [FxEmbed/FxEmbed](https://github.com/FxEmbed/FxEmbed) [TypeScript]
   ⭐ 0 | 今日 +182
   修复X/Twitter和Bluesky嵌入！在Discord、Telegram等平台上使用多图、视频、投票、翻译等功能。
7. [anthropics/financial-services](https://github.com/anthropics/financial-services) [Python]
   ⭐ 0 | 今日 +509
8. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) [Python]
   ⭐ 0 | 今日 +413
   CLI-Anything：让所有软件原生适配智能体 —— CLI-Hub: https://clianything.cc/
9. [mvt-project/mvt](https://github.com/mvt-project/mvt) [Python]
   ⭐ 0 | 今日 +272
   MVT（移动验证工具包）帮助对移动设备进行取证，以发现潜在入侵迹象。
10. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +611
   一个行之有效的智能体技能框架与软件开发方法论。
