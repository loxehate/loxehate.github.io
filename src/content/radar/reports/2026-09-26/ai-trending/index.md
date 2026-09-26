---
title: "AI 开源趋势日报"
published: 2026-09-26
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-09-26

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-26 00:00 UTC

---

# AI 开源趋势日报（2026-09-26）

## 筛选说明
已从 Trending 中剔除 `derv82/wifit3`（WiFi 审计）、`kubernetes-the-hard-way`（K8s 教程）、`openbao`（密钥管理）等非 AI 项目；主题搜索中的 `netdata`、`JuliaLang/julia`、`apache/airflow`、`oceanbase/oceanbase` 等因不属于 AI/ML 核心项目也未纳入。以下展示与 AI/ML 明确相关的代表项目。

## 今日速览

今日 Trending 几乎被 Agent 生态占领：[paperclip](https://github.com/paperclipai/paperclip)（+2.1k）、[google/ax](https://github.com/google/ax)（+1.4k）、[hindsight](https://github.com/vectorize-io/hindsight)（+1.7k）分别对应 Agent 管理、编排与记忆三个方向。Anthropic 官方 [Skills](https://github.com/anthropics/skills) / [Claude Plugins](https://github.com/anthropics/claude-plugins-official) 仓库与社区 skills 仓库集体上榜，Agent Skills 标准化信号强烈。RAG/向量数据库方向在主题搜索中仍最活跃，并出现 [PageIndex](https://github.com/VectifyAI/PageIndex)、[LEANN](https://github.com/StarTrail-org/LEANN) 这类降低存储成本的新范式。模型优化方面，[NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) 获得关注，部署侧效率成为焦点。

## 各维度热门项目

### 🔧 AI 基础工具
- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) · C++ · ⭐200,315  
  经典工业级 ML 框架，仍是 AI 工程的地基。
- [pytorch/pytorch](https://github.com/pytorch/pytorch) · Python · ⭐103,325  
  动态图深度学习框架，研究/生产环境的主力。
- [huggingface/transformers](https://github.com/huggingface/transformers) · Python · ⭐166,657  
  Hugging Face 模型定义、微调与推理的标准入口。
- [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) · Python · ⭐67,368  
  经典传统机器学习库，覆盖主流算法与工具链。
- [keras-team/keras](https://github.com/keras-team/keras) · Python · ⭐64,341  
  高层深度学习 API，适合快速建模与实验。
- [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) · Python · ⭐62,006  
  YOLO 系列训练/推理套件，覆盖检测、分割、姿态估计等。
- [roboflow/supervision](https://github.com/roboflow/supervision) · Python · ⭐51,046  
  可复用计算机视觉工具集，帮助快速构建视觉流水线。
- [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) · Java · ⭐13,156  
  JVM 生态上构建 LLM 应用与 Agent 的 Java 框架。

### 🤖 AI 智能体/工作流
- [paperclipai/paperclip](https://github.com/paperclipai/paperclip) · TypeScript · ⭐0（今日 +2,109）  
  企业管理 AI Agent 的办公侧应用，今日增速第一。
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) · Python · ⭐0（今日 +83）  
  Anthropic 官方 Claude Code 插件目录，插件生态走向官方化。
- [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) · Python · ⭐0（今日 +1,653）  
  Agent Memory That Learns，提供跨会话自主学习与记忆能力。
- [obra/superpowers](https://github.com/obra/superpowers) · Shell · ⭐0（今日 +468）  
  Agentic Skills 框架与软件开发方法论。
- [mattpocock/skills](https://github.com/mattpocock/skills) · Shell · ⭐0（今日 +583）  
  从真实 `.agents` 目录中提炼的工程师 Agent Skills。
- [anthropics/skills](https://github.com/anthropics/skills) · Python · ⭐0（今日 +189）  
  Anthropic 官方公开的 Agent Skills 仓库。
- [google/ax](https://github.com/google/ax) · Go · ⭐0（今日 +1,379）  
  Google 开源的 Agent 编排运行时，是多 Agent 自动化的底层设施。
- [pbakaus/impeccable](https://github.com/pbakaus/impeccable) · JavaScript · ⭐0（今日 +306）  
  面向 AI harness 的设计语言，让 Agent 界面更擅长设计表达。

### 📦 AI 应用
- [dream-num/univer](https://github.com/dream-num/univer) · TypeScript · ⭐0（今日 +1,050）  
  为 AI Agent 提供办公套件运行时，可操作表格、文档、幻灯片与 PDF。
- [androoAGI/starnet](https://github.com/androoAGI/starnet) · JavaScript · ⭐0（今日 +93）  
  本地优先的桌面 Agent harness，可视化展示真实 AI Agent 工作过程。
- [shy3130/tick-stock-panel](https://github.com/shy3130/tick-stock-panel) · Python · ⭐0（今日 +44）  
  自托管 A 股量化工作台，LLM 驱动策略定制、个股分析与复盘。
- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) · Python · ⭐73,464  
  面向分析师、量化研究员与 AI Agent 的开放金融数据平台。
- [microsoft/qlib](https://github.com/microsoft/qlib) · Python · ⭐48,855  
  微软开源的 AI 量化投资平台，覆盖研究到生产。
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) · JavaScript · ⭐66,469  
  本地优先的全能 AI 对话/文档 Agent 应用，支持多模型与私有知识库。

### 🧠 大模型/训练
- [NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) · Python · ⭐0（今日 +359）  
  模型优化统一库，覆盖量化、蒸馏、剪枝、NAS、投机解码等 SOTA 技术。
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) · Jupyter Notebook · ⭐105,574  
  从零实现类 ChatGPT LLM 的经典教程，社区常青项目。
- [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) · Python · ⭐57,467（今日 +1,177）  
  AI 工程从学习、构建到交付的完整路线图，今日增长强劲。

### 🔍 RAG/知识库
- [run-llama/llama_index](https://github.com/run-llama/llama_index) · Python · ⭐52,322  
  LlamaIndex 是文档处理与 RAG 应用开发的核心平台。
- [milvus-io/milvus](https://github.com/milvus-io/milvus) · Go · ⭐46,255  
  云原生向量数据库，专为大规模向量 ANN 检索设计。
- [qdrant/qdrant](https://github.com/qdrant/qdrant) · Rust · ⭐34,827  
  高性能、大规模向量数据库与检索引擎。
- [lancedb/lancedb](https://github.com/lancedb/lancedb) · Rust · ⭐11,532  
  开发者友好的嵌入式多模态检索库，主打“Search More; Manage Less”。
- [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) · Python · ⭐35,854  
  “Vectorless RAG”代表，从向量检索转向基于推理的文档索引。
- [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) · Python · ⭐12,966  
  MLSys 2026 Best Paper，宣称在 RAG 场景节省 97% 存储。
- [topoteretes/cognee](https://github.com/topoteretes/cognee) · Python · ⭐30,986  
  开源 AI Agent 记忆平台，用知识图谱提供跨会话长期记忆。
- [NirDiamant/RAG_Techniques](https://github.com/NirDiamant/RAG_Techniques) · Jupyter Notebook · ⭐29,600  
  覆盖多种高级 RAG 技术的 notebook 教程，适合系统学习。

## 趋势信号分析

今日最显著的趋势是：AI Agent 生态正从“对话框架”走向“技能、记忆和治理”三层基础设施。[Paperclip](https://github.com/paperclipai/paperclip) 以 +2.1k 星领跑，定位企业中多 Agent 的管理；[Google Ax](https://github.com/google/ax) 的 +1.4k 星显示大厂正在将工作流编排做成通用运行时；[Hindsight](https://github.com/vectorize-io/hindsight) 则让 Agent Memory 独立成基础设施品类。Anthropic 官方与社区同步热推 Agent Skills，说明“技能包”正成为类似插件的标准化分发单元。RAG 领域出现 [PageIndex](https://github.com/VectifyAI/PageIndex)、[LEANN](https://github.com/StarTrail-org/LEANN) 两个“轻检索/少存储”方向的代表，指向生产环境对成本和延迟的敏感。[NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) 的走红则说明量化、剪枝、投机解码等部署优化是当前大模型落地最紧迫的环节之一。

## 社区关注热点

- **企业级 Agent 治理**：[Paperclip](https://github.com/paperclipai/paperclip) 今日 +2.1k 星，说明多 Agent 进入办公场景后，“管理、权限、审计”需求正在成为新风口。
- **Agent Skills 标准化**：[Anthropic Skills](https://github.com/anthropics/skills) 与 [superpowers](https://github.com/obra/superpowers)、[mattpocock/skills](https://github.com/mattpocock/skills) 同步上榜，预示 Agent 技能包将像插件/函数一样被分发与复用。
- **Agent 记忆层**：[Hindsight](https://github.com/vectorize-io/hindsight) 以 +1.6k 星成为黑马，跨会话持久记忆正在成为 Agent 应用的重要基建。
- **低成本 RAG**：[PageIndex](https://github.com/VectifyAI/PageIndex) 与 [LEANN](https://github.com/StarTrail-org/LEANN) 分别代表“去向量化”和“存储压缩”方向，值得做生产 RAG 的同学重点跟进。
- **模型部署优化**：[NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) 统一了量化、剪枝、蒸馏、投机解码等优化方法，适合推理团队重点关注。

---

## Trending top10项目

1. [paperclipai/paperclip](https://github.com/paperclipai/paperclip) [TypeScript]
   ⭐ 0 | 今日 +2109
   每个人在工作中管理代理的开源应用
2. [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) [Python]
   ⭐ 0 | 今日 +83
   Anthropic 官方管理的高质量 Claude Code 插件目录
3. [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) [Python]
   ⭐ 0 | 今日 +1653
   Hindsight：会学习的智能体记忆
4. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +468
   一套有效的智能体技能框架和软件开发方法论
5. [mattpocock/skills](https://github.com/mattpocock/skills) [Shell]
   ⭐ 0 | 今日 +583
   面向真实工程师的技能，直接来自我的 .agents 目录
6. [dream-num/univer](https://github.com/dream-num/univer) [TypeScript]
   ⭐ 0 | 今日 +1050
   面向 AI 代理的办公套件——电子表格、文档、幻灯片、画布、关系表和 PDF，统一运行时
7. [anthropics/skills](https://github.com/anthropics/skills) [Python]
   ⭐ 0 | 今日 +189
   Agent Skills 的公开仓库
8. [androoAGI/starnet](https://github.com/androoAGI/starnet) [JavaScript]
   ⭐ 0 | 今日 +93
   一个生动的像素艺术站，真实 AI 代理在此执行真实工作。本地优先的桌面代理框架——自带密钥，观看你的团队实际运行
9. [derv82/wifit3](https://github.com/derv82/wifit3) [Python]
   ⭐ 0 | 今日 +183
   Wifite 的 USB 专用且跨平台版本
10. [kelseyhightower/kubernetes-the-hard-way](https://github.com/kelseyhightower/kubernetes-the-hard-way)
   ⭐ 0 | 今日 +119
   以困难方式引导 Kubernetes，无脚本
