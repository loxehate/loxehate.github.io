---
title: "AI 开源趋势日报"
published: 2026-09-27
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-09-27

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-27 00:00 UTC

---

## 筛选说明
已从 Trending 中剔除 VSCode、LLVM、Next.js、GitHub Actions runner-images、OpenBao、block/buzz 等与 AI/ML 无直接关联的通用项目；主题搜索中仅保留以 AI/ML/LLM/Agent 为核心的项目。

---

## 1. 今日速览

- 今日热榜被 **Agent 基础设施** 包揽：`paperclip`（+2608）和 `Hindsight`（+2147）分别切入企业级 Agent 管理与可学习记忆。
- NVIDIA 发布/登榜 **Model-Optimizer**，将量化、剪枝、蒸馏、投机解码等模型优化技术统一封装。
- Anthropic 官方 **claude-code-action** 进入热榜，标志 Claude Code 开始向 CI/CD 自动化场景延伸。
- MCP 生态继续扩展，**mobile-mcp** 将 iOS/Android 移动设备纳入 Agent 工具链。
- **Univer**（+849）提出“Office Harness for AI Agents”，办公文档正在成为 Agent 可操作环境。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具

- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) · ⭐200,446｜今日 +46  
  老牌通用机器学习框架，依然是 AI 基础设施的基石。

- [huggingface/transformers](https://github.com/huggingface/transformers) · ⭐166,698  
  模型定义、推理与训练的标准库，覆盖文本/视觉/音频/多模态。

- [pytorch/pytorch](https://github.com/pytorch/pytorch) · ⭐103,376  
  动态神经网络与 GPU 加速框架，研究到生产的核心工具。

- [ollama/ollama](https://github.com/ollama/ollama) · ⭐181,775  
  本地一键运行 LLM 的推理工具，支持 Kimi、DeepSeek、Qwen、Gemma 等。

- [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) · ⭐67,388  
  经典机器学习库，统计建模与数据处理的标准选择。

- [roboflow/supervision](https://github.com/roboflow/supervision) · ⭐51,054  
  可复用的计算机视觉工具集，适合检测/分割任务的工程化落地。

- [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) · ⭐58,356｜今日 +827  
  从零开始构建 AI 工程的实战学习路线，今日热度高涨。

---

### 🤖 AI 智能体/工作流

- [paperclipai/paperclip](https://github.com/paperclipai/paperclip) · 今日 +2608  
  开源的企业级 Agent 管理工作台，定位“工作中管理 Agent 的应用”。

- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) · ⭐147,117  
  Agent 工程化平台，提供工具调用、编排与记忆能力。

- [langgenius/dify](https://github.com/langgenius/dify) · ⭐157,285  
  可视化搭建 Agentic Workflow 与 RAG 管线的平台，支持云端或自托管。

- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) · ⭐187,580  
  通用 AI Agent 开发平台，强调“人人可构建和使用 AI”。

- [browser-use/browser-use](https://github.com/browser-use/browser-use) · ⭐116,411  
  让 Agent 自主操作浏览器，是 Web 自动化的热门基础设施。

- [affaan-m/ECC](https://github.com/affaan-m/ECC) · ⭐267,955  
  Agent Harness 性能优化系统，提供 Skills、Memory、Security 等能力。

- [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action) · 今日 +31  
  Claude Code 官方 GitHub Action，将 AI 编程接入 CI/CD 流水线。

- [mobile-next/mobile-mcp](https://github.com/mobile-next/mobile-mcp) · 今日 +168  
  MCP Server，支持 iOS/Android、模拟器与真机自动化及数据采集。

---

### 📦 AI 应用

- [dream-num/univer](https://github.com/dream-num/univer) · 今日 +849  
  集电子表格、文档、幻灯片于一体的“AI Agent 办公运行时”。

- [open-webui/open-webui](https://github.com/open-webui/open-webui) · ⭐153,267  
  自托管 LLM 用户界面，支持 Ollama、OpenAI API 等。

- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) · ⭐126,108  
  利用 AI 大模型与自动化工作流一键生成高清短视频。

- [microsoft/qlib](https://github.com/microsoft/qlib) · ⭐48,876  
  AI 量化投资平台，覆盖从因子研究到量化生产的全流程。

- [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) · ⭐108,770  
  基于多智能体 LLM 的金融交易框架。

- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) · ⭐73,488  
  面向分析师、Quant 与 AI Agent 的开放金融数据平台。

- [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) · 今日 +361  
  面向逆向工程/授权渗透测试的 AI 技能路由与工具链自举包。

---

### 🧠 大模型/训练

- [NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) · 今日 +357  
  统一 SOTA 模型优化技术：量化、剪枝、蒸馏、NAS、投机解码等。

- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) · ⭐105,621  
  用 PyTorch 从零实现 ChatGPT 级 LLM 的经典教学项目。

- [keras-team/keras](https://github.com/keras-team/keras) · ⭐64,345  
  高复用深度学习训练框架，适合快速原型与实验。

- [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) · ⭐62,028  
  YOLO 系列目标检测、分割、分类模型的训练与推理工具。

---

### 🔍 RAG/知识库

- [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) · 今日 +2147  
  可“学习”的 Agent 记忆系统，能对 Agent 会话内容进行压缩、检索与注入。

- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) · ⭐94,743  
  跨会话持久上下文记忆，让 Agent 在多次会话中保持连续状态。

- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) · ⭐121,672  
  将代码库、文档、SQL Schema、PDF 转化为可查询知识图谱。

- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) · ⭐185,131  
  面向 LLM 的网页搜索、抓取与交互数据 API。

- [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) · ⭐139,888  
  100+ AI Agent、Agent Skills 与 RAG 应用的开源合集。

---

## 3. 趋势信号分析

今日热榜释放出强烈信号：AI 基础设施正从“模型能力”转向“Agent 生产环境”。`paperclip` 与 `Hindsight` 包揽今日新增前二，说明企业级 Agent 管理和持续记忆是当下最痛需求；Anthropic 发布官方 `claude-code-action`，意味着 AI 编程助手开始进入正式软件交付流水线。MCP 生态继续外溢，`mobile-mcp` 把 iOS/Android 设备纳入 Agent 控制范围，移动自动化可能是下一波热点。NVIDIA `Model-Optimizer` 登榜，表明量化、剪枝、蒸馏、投机解码等部署优化手段正从散落脚本走向统一工具箱，与近期端侧模型和推理成本优化趋势相互呼应。Univer 提出“Office Harness for AI Agents”，显示办公文档正在被重构为 Agent 可操作、可编排的环境。

---

## 4. 社区关注热点

- **Agent 记忆/上下文工程**：`Hindsight`、`claude-mem` 等高热度项目说明，跨会话记忆是 Agent 从 Demo 走向生产的关键瓶颈。
- **Agent 治理与企业工作台**：`paperclip` 的爆发意味着企业需要统一管理 Agent 的权限、编排与审计，类似“Agent 时代的内部平台”。
- **MCP 设备自动化**：`mobile-mcp` 将 MCP 扩展到移动真机/模拟器，可重点关注其与 `browser-use` 等 Web 自动化工具的组合。
- **Claude Code 进入 CI/CD**：`claude-code-action` 是 Anthropic 官方动作，适合希望把 AI 编程能力嵌入 GitHub Actions 的团队。
- **模型优化与 token 成本**：NVIDIA `Model-Optimizer` 以及 `caveman` 这类 token 削减工具共同折射出“降本增效”已成为 2026 年 AI 工程主旋律。

---

## Trending top10项目

1. [paperclipai/paperclip](https://github.com/paperclipai/paperclip) [TypeScript]
   ⭐ 0 | 今日 +2608
   每个人在工作中管理智能体的开源应用
2. [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) [Python]
   ⭐ 0 | 今日 +2147
   Hindsight：具备学习能力的智能体记忆
3. [NVIDIA/Model-Optimizer](https://github.com/NVIDIA/Model-Optimizer) [Python]
   ⭐ 0 | 今日 +357
   统一的SOTA模型优化技术库，涵盖量化、蒸馏、剪枝、神经架构搜索、推测解码等，压缩深度学习模型以适配TensorRT-LLM、TensorRT、vLLM等部署框架，优化推理速度。
4. [dream-num/univer](https://github.com/dream-num/univer) [TypeScript]
   ⭐ 0 | 今日 +849
   面向AI代理的办公套件——在同一运行时中集成电子表格、文档、幻灯片、画布、关系表和PDF。
5. [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) [C++]
   ⭐ 0 | 今日 +46
   面向所有人的开源机器学习框架
6. [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) [Python]
   ⭐ 0 | 今日 +827
   学习它。构建它。为他人交付。
7. [openbao/openbao](https://github.com/openbao/openbao) [Go]
   ⭐ 0 | 今日 +364
   OpenBao是一种用于管理、存储和分发敏感数据（包括机密信息、证书和密钥）的软件解决方案。
8. [block/buzz](https://github.com/block/buzz) [Rust]
   ⭐ 0 | 今日 +339
   群体智慧通信平台
9. [microsoft/vscode](https://github.com/microsoft/vscode) [TypeScript]
   ⭐ 0 | 今日 +95
   Visual Studio Code
10. [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) [PowerShell]
   ⭐ 0 | 今日 +361
   逆向工程/授权渗透测试/安全研究技能路由包——AI驱动路由 + 按需工具链自举 + 自进化知识库，支持Claude Code、Kiro、Cursor、Cline等AI编码客户端。
