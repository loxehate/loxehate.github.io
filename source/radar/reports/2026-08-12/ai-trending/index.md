---
title: "AI 开源趋势日报"
date: 2026-08-12
categories:
  - AI
tags:
  - radar
---
<div class="markdown-body">

# AI 开源趋势日报 2026-08-12

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-08-12 01:52 UTC

---

# AI 开源趋势日报（2026-08-12）

## 今日速览

今日 AI 开源热榜几乎被智能体生态占领：17 个 Trending 仓库中 13 个与 AI 直接相关，其中多数围绕 Agent / Agent Skills。Anthropic 官方 `anthropics/skills` 仓库与 `addyosmani/agent-skills` 同日登榜，标志着“Agent Skills”正成为可复用的标准化能力单元。多智能体管理开始从概念走向生产：`orca`、`paperclip`、`agency-agents` 分别从 IDE、企业管理、全功能代理团队角度切入。RAG 也与知识图谱深度绑定，`code-graph-rag`、`semantica` 等正在把代码仓库和上下文变成可查询的图结构。

已剔除 `nvm`、`manim`、`awesome-mac`、`project-based-learning` 等非 AI/ML 项目；主题搜索结果中的 Julia 因属通用语言，不计入 AI 分类。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

- [ollama/ollama](https://github.com/ollama/ollama) — 178,298 stars。本地 LLM 推理/运行引擎，新模型支持持续扩充。
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — 165,904 stars。面向 LLM/Agent 的网页搜索、抓取与上下文 API。
- [langgenius/dify](https://github.com/langgenius/dify) — 152,126 stars。可视化构建 Agentic Workflow 与 RAG 管道的开发平台。
- [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) — 75,861 stars。经典开源 OCR 引擎。
- [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) — 66,953 stars。机器学习基础算法库。
- [roboflow/supervision](https://github.com/roboflow/supervision) — 49,272 stars。可复用的计算机视觉工具链。
- [apache/airflow](https://github.com/apache/airflow) — 46,448 stars。ML/数据工作流编排平台。
- [streamlit/streamlit](https://github.com/streamlit/streamlit) — 45,534 stars。快速构建数据/AI 应用的前端框架。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

- [PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent) — 今日新增 +1,138，Trending 第一。自我改进的 RLM 编码代理，面向长时运行任务。
- [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) — 今日新增 +958。把多个角色化 Agent 组成“AI 代理公司”。
- [stablyai/orca](https://github.com/stablyai/orca) — 今日新增 +875。Agent 开发环境（ADE），可并行调度多种编码 Agent。
- [paperclipai/paperclip](https://github.com/paperclipai/paperclip) — 今日新增 +748。面向职场的开源 Agent 管理应用。
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — 今日新增 +578。生产级 AI 编码工程技能集。
- [anthropics/skills](https://github.com/anthropics/skills) — 今日新增 +485。Anthropic 官方 Agent Skills 公共仓库。
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — 144,009 stars。Agent 工程平台，LLM 生态核心项目。
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — 239,490 stars。Agent 性能优化/harness 系统，整合技能、记忆、安全与研究。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

- [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) — 今日新增 +812。终身个性化 AI 辅导系统。
- [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) — 今日新增 +458。首个开源 agentic 视频制作系统，含 12 条生产管线。
- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) — 今日新增 +243。LLM 驱动的多市场股票智能分析系统。
- [harveyai/harvey-labs](https://github.com/harveyai/harvey-labs) — 今日新增 +28。面向法律工作的 Agent 能力评测基准。
- [open-webui/open-webui](https://github.com/open-webui/open-webui) — 148,513 stars。用户友好的自托管 LLM 聊天/管理界面。
- [MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — 102,648 stars。基于 AI 工作流一键生成短视频。
- [netdata/netdata](https://github.com/netdata/netdata) — 80,132 stars。AI 驱动的全栈可观测性平台。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

- [huggingface/transformers](https://github.com/huggingface/transformers) — 163,823 stars（今日 +80）。预训练模型定义、微调与推理的标准框架。
- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) — 196,955 stars。老牌深度学习框架。
- [pytorch/pytorch](https://github.com/pytorch/pytorch) — 102,325 stars。当前最主流的深度学习训练框架。
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) — 102,440 stars。从零实现 ChatGPT-like LLM 的经典教程。
- [keras-team/keras](https://github.com/keras-team/keras) — 64,222 stars。高层深度学习框架，适合快速实验。
- [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) — 60,528 stars。YOLO 系列模型训练与推理框架。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

- [semantica-agi/semantica](https://github.com/semantica-agi/semantica) — 今日新增 +893。图原生上下文基础设施，面向可审计 AI 系统。
- [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) — 今日新增 +341。面向 monorepo 的代码知识图谱 RAG。
- [browser-use/browser-use](https://github.com/browser-use/browser-use) — 108,833 stars。让网站可被 AI Agent 访问，是网页自动化/上下文获取的重要工具。
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) — 105,341 stars。把代码库、文档、SQL schema、PDF 转为可查询知识图谱。
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — 90,451 stars。Agent 跨会话持久记忆，自动压缩并注入上下文。
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) — 87,296 stars。深度 RAG 引擎，融合 Agent 能力。

## 趋势信号分析

Agent 类项目形成“基础设施—技能包—管理平台”三层爆发。`prime-agent` 以 +1,138 领涨，`agency-agents`、`orca`、`paperclip` 紧随其后，说明社区正从单个 Agent 演示转向长时运行、员工化/团队化部署。Agent Skills 成为新的分发单元：`anthropics/skills` 官方仓库上线，与 `addyosmani/agent-skills` 一起将工程知识打包成可插拔技能，这会降低跨 Agent 框架的迁移成本。RAG 走向图原生和代码级：`code-graph-rag`、`semantica` 与 `Graphify` 均围绕知识图谱构建可审计上下文，应对 monorepo 和复杂系统。垂直 Agentic 应用集中出现，教育、金融、法律、视频制作均有今日高增长项目，AI 正在从通用助手转向行业生产力工具。

## 社区关注热点

- **Agent Skills 标准化方向**：[anthropics/skills](https://github.com/anthropics/skills) + [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)。官方与社区同步定义可复用技能格式，值得紧跟。
- **自我改进编码 Agent**：[PrimeIntellect-ai/prime-agent](https://github.com/PrimeIntellect-ai/prime-agent)。RLM + 长时编码任务，可能是下一波 Coding Agent 形态。
- **多智能体团队/工作管理**：[stablyai/orca](https://github.com/stablyai/orca) + [paperclipai/paperclip](https://github.com/paperclipai/paperclip)。从“写代码”到“管 Agent”，企业级 Agent 运维开始显现。
- **代码知识图谱 RAG**：[vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) + [semantica-agi/semantica](https://github.com/semantica-agi/semantica)。解决大型代码库理解与编辑难题。
- **垂直 Agent 应用落地**：[HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) + [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage)。教育、视频等场景已出现完整 Agent 生产系统。

---

## Trending top10项目

1. [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) [Shell]
   ⭐ 0 | 今日 +958
   完整的AI代理机构尽在掌握——从前端专家到Reddit社区运营，从创意注入到现实校验。每个代理都具备个性、流程和成熟交付物。
2. [semantica-agi/semantica](https://github.com/semantica-agi/semantica) [Python]
   ⭐ 0 | 今日 +893
   面向上下文与可问责AI系统的图原生基础设施。
3. [nvm-sh/nvm](https://github.com/nvm-sh/nvm) [Shell]
   ⭐ 0 | 今日 +22
   Node版本管理器——兼容POSIX的bash脚本，用于管理多个活跃的node.js版本。
4. [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) [JavaScript]
   ⭐ 0 | 今日 +578
   面向AI编码代理的生产级工程技能。
5. [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) [Python]
   ⭐ 0 | 今日 +243
   LLM 驱动的多市场股票智能分析系统：多源行情、实时新闻、决策看板与自动推送，支持零成本定时运行。
6. [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) [Python]
   ⭐ 0 | 今日 +341
   面向monorepo的终极RAG。借助AI和知识图谱，查询、理解并编辑多语言代码库。
7. [anthropics/skills](https://github.com/anthropics/skills) [Python]
   ⭐ 0 | 今日 +485
   Agent Skills的公共仓库。
8. [3b1b/manim](https://github.com/3b1b/manim) [Python]
   ⭐ 0 | 今日 +197
   用于数学解说视频的动画引擎。
9. [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) [Python]
   ⭐ 0 | 今日 +812
   DeepTutor：终身个性化辅导。https://deeptutor.info/。
10. [stablyai/orca](https://github.com/stablyai/orca) [TypeScript]
   ⭐ 0 | 今日 +875
   Orca是用于管理并行代理集群的ADE。可使用自己的订阅运行任何编码代理。支持桌面、移动端和VPS。

</div>
