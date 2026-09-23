---
title: "AI 开源趋势日报"
published: 2026-09-23
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-09-23

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-23 00:00 UTC

---

# AI 开源趋势日报（2026-09-23）

> 数据来源：GitHub Trending + GitHub Search（topic: llm-model / ml）  
> 筛选说明：已剔除与 AI/ML 无关的 Trending 项目（如 `mvt-project/mvt` 移动取证工具），以及 Topic 搜索中的通用语言/通用课程列表（如 Julia、cs-video-courses）等非 AI 原生项目。

## 今日速览

今日 GitHub 热度几乎被「AI Agent」主导：Google 开源的 agentic 编排运行时 `google/ax` 单日新增 2,305 stars，成为最大热点。`substrate`、`treg`、`univer` 等 Agent 基础设施和工具协议项目同时上榜，显示社区关注点正在从「模型能力」转向「Agent 可运行、可调度、可交易的中间层」。应用侧，Anthropic 官方金融场景示例、视频编辑 Agent 也获得高热度。训练/教学类项目如 `minimind`、`LLMs-from-scratch` 继续沉淀大模型知识，属于长期基本盘。

---

## 各维度热门项目

### 🔧 AI 基础工具（框架 / SDK / 推理引擎 / 评测）

- [huggingface/transformers](https://github.com/huggingface/transformers) ⭐166,539  
  最主流的模型定义与推理框架，覆盖 text/vision/audio/multimodal。

- [pytorch/pytorch](https://github.com/pytorch/pytorch) ⭐103,182  
  动态神经网络计算框架，AI 研究和生产生态的核心底座。

- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) ⭐200,259  
  老牌机器学习框架，本期在 `topic:ml` 搜索中仍保持高活跃。

- [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) ⭐61,909  
  YOLO 系列目标检测/分割/姿态估计的一体化训练与推理套件。

- [roboflow/supervision](https://github.com/roboflow/supervision) ⭐50,995  
  可复用的计算机视觉后处理、评测与可视化工具库。

- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) ⭐8,699  
  Rust 生态的模块化 LLM 应用开发框架，类型安全、可扩展。

- [open-compass/opencompass](https://github.com/open-compass/opencompass) ⭐7,468  
  LLM 评测平台，支持 100+ 数据集和主流商用/开源模型。

- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) ⭐4,680  
  在 Apple Silicon 上从零构建微型 vLLM + Qwen 推理系统，是 LLM 推理学习的好范本。

---

### 🤖 AI 智能体 / 工作流

- [google/ax](https://github.com/google/ax) 今日 +2,305  
  Google 开源的 agentic orchestration runtime，单日 stars 暴涨，是今日最受关注的 Agent 基础设施项目。

- [agent-substrate/substrate](https://github.com/agent-substrate/substrate) 今日 +245  
  Agent Substrate 核心系统，面向智能体底层编排运行。

- [superdesigndev/treg](https://github.com/superdesigndev/treg) 今日 +230  
  定位是「Agent 工具的 OpenRouter」，正在把工具 API 做统一路由、计价与交易层。

- [browser-use/video-use](https://github.com/browser-use/video-use) 今日 +191  
  让 coding agent 直接编辑视频，是 Agent 从代码走向多模态内容创作的信号。

- [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) 今日 +64  
  Claude Code 的配置与监控 CLI，围绕编码 Agent 的工程化管理工具。

- [dream-num/univer](https://github.com/dream-num/univer) 今日 +255  
  面向 AI Agent 的「Office Harness」，把表格/文档/Slides/PDF 变成 Agent 可操作环境。

- [apache/casbin-gateway](https://github.com/apache/casbin-gateway) ⭐636  
  AI & MCP 安全网关，为 Agent 调用外部工具和数据提供 HTTP 鉴权。

- [samchon/nestia](https://github.com/samchon/nestia) ⭐2,180  
  NestJS 生态的 AI Chatbot / Agent 开发脚手架。

---

### 📦 AI 应用

- [anthropics/financial-services](https://github.com/anthropics/financial-services) 今日 +438  
  Anthropic 官方金融场景示例，展示 LLM 在合规、风控、金融分析中的落地方式。

- [acon96/home-llm](https://github.com/acon96/home-llm) ⭐1,441  
  用本地 LLM 控制智能家居，Home Assistant 集成方案。

- [asukaminato0721/telegram-summary-bot](https://github.com/asukaminato0721/telegram-summary-bot) ⭐200  
  用 AI/LLM 自动总结 Telegram 群聊，支持图片、链接、回复上下文和中文检索。

- [microsoft/qlib](https://github.com/microsoft/qlib) ⭐48,760  
  AI 驱动的量化投资研究平台，覆盖因子挖掘到生产落地。

- [zb614433612/CodeCraft](https://github.com/zb614433612/CodeCraft) ⭐10  
  基于 DeepSeek 的自然语言驱动终端编码 Agent，支持多 Agent 并行执行。

---

### 🧠 大模型 / 训练

- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) ⭐105,402  
  从零手写一个 ChatGPT-like LLM，是教学级代码库中的顶流。

- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) ⭐62,189  
  2 小时训练 64M 参数 LLM 的极简开源项目，降低大模型入门门槛。

- [testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io) ⭐112  
  LLM test-time scaling 方向综述仓库，反映「推理时计算」正在成为研究热点。

- [RyanLiu112/AttnRL](https://github.com/RyanLiu112/AttnRL) ⭐14  
  ICLR 2026 论文复现：将注意力机制用于过程监督强化学习中的高效探索。

- [R-D-BioTech-Alaska/Qelm](https://github.com/R-D-BioTech-Alaska/Qelm) ⭐27  
  量子增强语言模型实验项目，属于早期探索方向。

---

### 🔍 RAG / 知识库

> 注：本期抽样数据中没有出现典型的向量数据库/RAG 框架；以下是接近「知识管理/数据检索」的代表项目。

- [paperless-ngx/paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) ⭐45,902  
  文档扫描、索引、归档与全文检索，内置 ML 分类，是个人知识库基础设施。

- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) ⭐73,386  
  面向分析师、量化研究员和 AI Agent 的统一金融数据平台，可作为金融领域 Agent 的知识/数据层。

- [apache/casbin-gateway](https://github.com/apache/casbin-gateway) ⭐636  
  MCP/AI 安全网关，帮助 Agent 受控访问外部数据与工具，是知识检索链路中的安全组件。

---

## 趋势信号分析

今日最清晰的信号是 **Agent 基础设施成为流量中心**。`google/ax` 单日 2,305 stars，叠加 `substrate`、`treg`、`univer` 上榜，说明社区注意力正从单个模型 demo 转向可编排、可路由、可操作的智能体运行时。`treg` 想做 agent tools 的 OpenRouter，标志工具 API 正被标准化和「平台化」；`casbin-gateway` 的出现则说明 Agent 工具调用后的安全与鉴权需求开始爆发。

应用侧，Anthropic 官方 `financial-services` 与 `browser-use/video-use` 同时登榜，编码、办公、视频、金融都被 Agent 工作流快速包裹。训练/教学赛道依然稳定，`minimind`、`LLMs-from-scratch`、`tiny-llm` 保持高关注，说明「低门槛复现大模型」是长期流量基本盘。

整体来看，新基础模型不是今日主角；围绕 Claude、DeepSeek 等既有模型的 **Agent 中间层、工具协议与垂直应用**，正在成为开源 AI 生态最强劲的增量。

---

## 社区关注热点

- **google/ax**：今日 stars 增量断层第一，值得关注它是否会成为 Google 系 Agent 应用的开源底座。  
- **treg**：「OpenRouter for agent tools」的叙事很性感，若跑通，可能成为 Agent 工具分发与计费的新标准。  
- **univer**：把 Office 变成 AI Agent 的可操作环境，和「Agent 操控电脑/办公软件」这一波趋势高度契合。  
- **browser-use/video-use**：视频编辑是 Agent 从文本代码走向多模态创作的代表场景，具备强产品化想象力。  
- **anthropics/financial-services**：官方垂类示例，意味着 LLM 在金融合规等严肃场景的落地模式开始被平台方正式输出。

---

## Trending top10项目

1. [anthropics/financial-services](https://github.com/anthropics/financial-services) [Python]
   ⭐ 0 | 今日 +438
2. [agent-substrate/substrate](https://github.com/agent-substrate/substrate) [Go]
   ⭐ 0 | 今日 +245
   Agent Substrate：核心系统
3. [dream-num/univer](https://github.com/dream-num/univer) [TypeScript]
   ⭐ 0 | 今日 +255
   面向AI代理的办公套件——在一个运行时中提供电子表格、文档、幻灯片、画布、关系表格和PDF。
4. [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) [Python]
   ⭐ 0 | 今日 +64
   用于配置和监控Claude Code的命令行工具
5. [google/ax](https://github.com/google/ax) [Go]
   ⭐ 0 | 今日 +2305
   谷歌开放代理编排运行时
6. [mvt-project/mvt](https://github.com/mvt-project/mvt) [Python]
   ⭐ 0 | 今日 +441
   MVT（移动验证工具包）有助于对移动设备进行取证，以发现潜在入侵迹象。
7. [superdesigndev/treg](https://github.com/superdesigndev/treg) [Python]
   ⭐ 0 | 今日 +230
   面向代理工具的OpenRouter。加入社区：https://discord.gg/6mQYYfFMAn
8. [browser-use/video-use](https://github.com/browser-use/video-use) [Python]
   ⭐ 0 | 今日 +191
   使用编码代理编辑视频
