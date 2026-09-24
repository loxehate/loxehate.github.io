---
title: "AI 开源趋势日报"
published: 2026-09-24
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-09-24

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-24 00:00 UTC

---

# AI 开源趋势日报（2026-09-24）

> 筛选说明：Trending 17 个仓库中，排除 `mvt-project/mvt`（移动设备取证，通用安全工具）和 `Open-Dev-Society/OpenStock`（通用行情/市场平台，描述无 AI 能力），其余 15 个均与 AI/Agent/ML 明确相关。主题搜索 30 个仓库均纳入候选。

## 一、今日速览

今日 GitHub 趋势显示，AI 开源社区的重心正在从“模型能力展示”转向“Agent 生产基础设施”。Google 的 agentic orchestration runtime（`google/ax`）单日 +1,543 星成为最大热点，Agent 运行时、SDK、工具路由、设计语言等基础设施集中上榜。`Univer` 以 +1,142 星把 Office 套件重新定义为 AI Agent 的“操作台”，`browser-use/video-use` 则将 coding agents 带入视频编辑场景。MCP 生态继续向代码智能与安全网关延伸，RAG/向量数据库侧则出现 `PageIndex`、`LEANN` 等“去向量化/极简存储”新尝试。

## 二、各维度热门项目

### 🔧 AI 基础工具

- [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) — Python | 今日 +389  
  Claude Code 配置与监控 CLI，降低 Claude Code 的工程化使用门槛。

- [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) — C | 今日 +190  
  高性能代码智能 MCP 服务器，将代码库索引为知识图谱，支持 158 种语言、亚毫秒级查询。

- [pbakaus/impeccable](https://github.com/pbakaus/impeccable) — JavaScript | 今日 +304  
  面向 AI harness 的设计语言，从 UI/UX 层面提升 Agent 交互质量。

- [harry7557558/spirula-studio](https://github.com/harry7557558/spirula-studio) — C++ | 今日 +69  
  跨厂商 3D Gaussian Splatting 训练器，覆盖视频→Splat→Mesh 全流程。

- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) — Rust | ⭐8,712  
  Rust 生态的模块化 LLM 应用框架，适合追求性能与类型安全的开发者。

- [open-compass/opencompass](https://github.com/open-compass/opencompass) — Python | ⭐7,471  
  LLM 评测平台，支持 OpenAI、Anthropic、Gemini、Qwen、DeepSeek 等主流模型。

- [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) — Java | ⭐13,155  
  JVM 上构建 LLM 应用的 Java 库，企业级 Java 技术栈首选。

- [apache/casbin-gateway](https://github.com/apache/casbin-gateway) — Go | ⭐636  
  AI 与 MCP 安全网关，为 Agent HTTP 流量提供认证、授权与审计能力。

### 🤖 AI 智能体/工作流

- [google/ax](https://github.com/google/ax) — Go | 今日 +1,543  
  Google 开源的 agentic orchestration runtime，今日增长最快的项目。

- [dream-num/univer](https://github.com/dream-num/univer) — TypeScript | 今日 +1,142  
  将文档、表格、幻灯片、PDF 等整合进一个 runtime，成为 AI Agent 的“办公室操作台”。

- [browser-use/video-use](https://github.com/browser-use/video-use) — Python | 今日 +746  
  用 coding agents 编辑视频，Agent 从文本/代码走向富媒体内容生产。

- [agent-substrate/substrate](https://github.com/agent-substrate/substrate) — Go | 今日 +558  
  Agent Substrate 核心系统，提供 Agent 运行所需的基础设施层。

- [superdesigndev/treg](https://github.com/superdesigndev/treg) — Python | 今日 +506  
  被称为“OpenRouter for agent tools”，为 Agent 工具提供统一路由与交易层。

- [obra/superpowers](https://github.com/obra/superpowers) — Shell | 今日 +474  
  Agentic skills 框架与软件开发方法论，强调将可复用技能打包给 Agent。

- [strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk) — Python | 今日 +115  
  生产级 Agent harness SDK，支持任意模型、任意云，端到端控制 Agent。

- [BuilderIO/agent-native](https://github.com/BuilderIO/agent-native) — TypeScript | 今日 +87  
  用于构建 agentic apps 的框架，帮助开发者快速搭建 Agent 原生应用。

### 📦 AI 应用

- [anthropics/financial-services](https://github.com/anthropics/financial-services) — Python | 今日 +664  
  Anthropic 发布的金融行业 AI 示例，展示 Claude 在金融场景的落地路径。

- [TNT-Likely/PanWatch](https://github.com/TNT-Likely/PanWatch) — Python | 今日 +95  
  自托管 AI 盯盘助手，集成 TradingAgents 多 Agent 投资决策，覆盖 A/港/美股。

- [acon96/home-llm](https://github.com/acon96/home-llm) — Python | ⭐1,442  
  本地 LLM 控制智能家居的 Home Assistant 集成，主打隐私与离线控制。

- [Event-AHU/Medical_Image_Analysis](https://github.com/Event-AHU/Medical_Image_Analysis) — Python | ⭐241  
  基于基础模型的医学影像分析，聚焦 AI 医疗垂直场景。

- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) — JavaScript | ⭐66,380  
  Local-first 的 AI 助手与知识库应用，提供开箱即用的 Agent 体验。

- [zi-yue-1129/DATAGEN](https://github.com/zi-yue-1129/DATAGEN) — Python | ⭐1,806  
  多智能体科研助手，自动完成假设生成、数据分析和报告写作。

### 🧠 大模型/训练

- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) — Python | ⭐62,330  
  从零训练 64M 参数 LLM 仅需 2 小时，是学习 LLM 预训练流程的热门项目。

- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) — Python | ⭐4,707  
  在 Apple Silicon 上构建微型 vLLM + Qwen，帮助系统工程师理解 LLM 推理系统。

- [thinkwee/AwesomeOPD](https://github.com/thinkwee/AwesomeOPD) — ⭐869  
  On-Policy Distillation（在线策略蒸馏）方向的开源精选清单。

- [testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io) — HTML | ⭐112  
  Test-Time Scaling 综述，系统梳理 LLM 测试时扩展的 what/how/where/how well。

- [RyanLiu112/AttnRL](https://github.com/RyanLiu112/AttnRL) — Python | ⭐14  
  ICLR 2026 论文代码：将 Attention 作为指南针，提升推理模型 Process-Supervised RL 的探索效率。

- [R-D-BioTech-Alaska/Qelm](https://github.com/R-D-BioTech-Alaska/Qelm) — Python | ⭐27  
  量子增强语言模型实验项目，探索量子计算与 LLM 的结合。

### 🔍 RAG/知识库

- [run-llama/llama_index](https://github.com/run-llama/llama_index) — Python | ⭐52,304  
  AI 文档处理平台，是 RAG 应用最流行的数据索引与检索框架。

- [milvus-io/milvus](https://github.com/milvus-io/milvus) — Go | ⭐46,241  
  云原生向量数据库，面向大规模向量 ANN 检索。

- [qdrant/qdrant](https://github.com/qdrant/qdrant) — Rust | ⭐34,770  
  高性能向量数据库与检索引擎，支持云端与自托管。

- [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) — Python | ⭐35,829  
  主打“Vectorless, Reasoning-based RAG”，探索去掉向量检索的新范式。

- [topoteretes/cognee](https://github.com/topoteretes/cognee) — Python | ⭐30,947  
  开源 AI 记忆平台，基于知识图谱为 Agent 提供跨会话持久记忆。

- [NirDiamant/RAG_Techniques](https://github.com/NirDiamant/RAG_Techniques) — Jupyter Notebook | ⭐29,587  
  系统性展示 RAG 各阶段进阶技术的 notebook 教程。

- [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) — Python | ⭐12,958  
  MLsys2026 Best Paper，号称 97% 存储节约、100% 隐私保护的 RAG 方案。

- [lancedb/lancedb](https://github.com/lancedb/lancedb) — Rust | ⭐11,511  
  开发者友好的嵌入式多模态检索库。

## 三、趋势信号分析

今日最强烈的信号是 Agent 基础设施从“单体框架”走向“运行时 + 协议 + 工具路由”的分层生态。`google/ax` 单日 +1,543 星，`agent-substrate`、`harness-sdk`、`treg` 分别覆盖底层调度、运行控制与工具交易，Agent 工程化链条趋于完整。“Agent-native”成为高频关键词：`univer` 将 Office 套件改造为 Agent 工作台，`CLI-Anything` 主张让所有软件 Agent-Native，`impeccable` 从设计语言层面对齐这一趋势。MCP 生态从模型上下文协议延伸至代码智能与安全网关（`codebase-memory-mcp`、`casbin-gateway`）。`video-use` 表明 coding agents 开始进入视频编辑等富媒体场景。主题端 RAG 不再只拼向量数据库，`PageIndex` 的 vectorless 与 `LEANN` 的存储压缩代表“去向量化/极简存储”的新方向。金融领域应用（`Anthropic financial-services`、`PanWatch`）也在加速落地。

## 四、社区关注热点

- **google/ax**：单日 +1,543 星，Google 背书的 Agent 编排运行时，可能成为下一代 Agent 系统底座。
- **dream-num/univer**：+1,142 星，把文档/表格/PDF 做成 Agent 可操作环境，办公软件与 AI 的融合拐点。
- **browser-use/video-use**：+746 星，用 coding agents 编辑视频，是 Agent 进入多模态内容生产的重要信号。
- **DeusData/codebase-memory-mcp**：MCP 生态 + 代码知识图谱，158 语言、亚毫秒查询，值得所有 LLM 工具链开发者跟进。
- **VectifyAI/PageIndex 与 StarTrail-org/LEANN**：代表 RAG 正从“向量检索依赖”转向推理式或高压缩存储，可能影响下一轮知识库架构选型。

---

## Trending top10项目

1. [anthropics/financial-services](https://github.com/anthropics/financial-services) [Python]
   ⭐ 0 | 今日 +664
2. [google/ax](https://github.com/google/ax) [Go]
   ⭐ 0 | 今日 +1543
   谷歌的开放智能体编排运行时
3. [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) [Python]
   ⭐ 0 | 今日 +389
   配置和监控 Claude Code 的 CLI 工具
4. [BuilderIO/agent-native](https://github.com/BuilderIO/agent-native) [TypeScript]
   ⭐ 0 | 今日 +87
   用于构建智能体应用的框架
5. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +474
   一套行之有效的智能体技能框架与软件开发方法论
6. [dream-num/univer](https://github.com/dream-num/univer) [TypeScript]
   ⭐ 0 | 今日 +1142
   AI 智能体的 Office 套件——在一个运行时中集成电子表格、文档、幻灯片、画布、关系表和 PDF
7. [Open-Dev-Society/OpenStock](https://github.com/Open-Dev-Society/OpenStock) [TypeScript]
   ⭐ 0 | 今日 +344
   OpenStock 是昂贵市场平台的开源替代品。追踪实时价格、设置个性化提醒、探索详细公司洞察——开放构建，人人可用，永久免费
8. [agent-substrate/substrate](https://github.com/agent-substrate/substrate) [Go]
   ⭐ 0 | 今日 +558
   Agent Substrate：核心系统
9. [strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk) [Python]
   ⭐ 0 | 今日 +115
   构建智能体封装并实现端到端控制。面向生产环境 AI 智能体的开源 SDK，支持 Python 和 TypeScript——任意模型，任意云
10. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) [Python]
   ⭐ 0 | 今日 +57
   CLI-Anything：让所有软件成为智能体原生——CLI-Hub: https://clianything.cc/
