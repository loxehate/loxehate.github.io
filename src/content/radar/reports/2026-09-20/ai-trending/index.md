---
title: "AI 开源趋势日报"
published: 2026-09-20
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-09-20

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-20 00:00 UTC

---

# AI 开源趋势日报 · 2026-09-20

> 数据源：GitHub Trending + GitHub Search API（topic: llm-model / ai-agent）  
> 说明：Trending 仓库本次未显示可靠存量星标，以下仅列今日新增；主题搜索项目列出当前总星标。

## 过滤说明

从 Trending 中剔除了与 AI/ML 无关的项目：`cloudflare/quiche`（QUIC 协议）、`asciimoo/hister`（搜索引擎）、`Open-Dev-Society/OpenStock`（行情平台）、`ruanyf/weekly`（科技周刊）、`ZuodaoTech/everyone-can-use-english`（英语学习）。  
主题搜索项目已按 `llm-model` / `ai-agent` 标签筛选，均视为 AI 相关项目。

---

## 1. 今日速览

今日 AI 开源社区最突出的信号是 **Agent 生态从“单点 Coding Agent”走向“技能/插件基础设施”**：Cloudflare、Anthropic、Addy Osmani 等在同一天发布或更新 Agent Skills / Plugins 类项目，且冲上 Trending。其次，**Computer-Use 2.0 和端侧小模型**成为新热点：`trycua/cua` 试图定义跨 OS 的计算机操作智能体基础设施，`cactus-compute/needle` 则把自动化模型压缩到 8-29MB。大模型训练/推理领域依然活跃，`minimind`、`tiny-llm`、`higgsfield` 等持续吸引开发者。主题搜索中，AI Agent 框架和垂直应用（求职、股票、PPT、医疗）占据大量席位，RAG 与知识管理类项目作为数据底座保持高热。

---

## 2. 各维度热门项目

### 🔧 AI 基础工具

- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) ⭐ 8,677  
  Rust 生态的模块化 LLM 应用框架，适合构建可扩展的 Agent / LLM 服务。

- [open-compass/opencompass](https://github.com/open-compass/opencompass) ⭐ 7,457  
  LLM 评测平台，支持 Llama、Qwen、GLM、InternLM 等模型与 100+ 数据集。

- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) ⭐ 4,580  
  Apple Silicon 上从零搭建 mini vLLM + Qwen，是系统工程师学习 LLM 推理的优秀教材。

- [apache/casbin-gateway](https://github.com/apache/casbin-gateway) ⭐ 635  
  Apache 推出的 AI 与 MCP 安全网关，为 Agent 工具调用增加鉴权与安全策略层。

- [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) ⭐ 554  
  统一 LLM API 网关：一个 endpoint 接入多家模型，支持智能路由与负载均衡。

- [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) ⭐ 37,419  
  Agent 与 Generative UI 的前端框架，覆盖 React、Angular、Mobile、Slack 等终端。

- [yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X) ⭐ 今日 +32  
  OpenAI Codex 桌面/CLI 可视化管理工具，支持 Provider/API 切换、Skills/MCP 管理与 TOML 配置可视化。

- [coder/coder](https://github.com/coder/coder) ⭐ 今日 +402  
  为开发者和 AI Agent 提供安全远程开发环境，解决 Agent 运行环境的隔离与一致性问题。

### 🤖 AI 智能体/工作流

- [anthropics/claude-code](https://github.com/anthropics/claude-code) ⭐ 今日 +483  
  Anthropic 官方终端 Agent 编码工具，能够理解代码库并自动执行常规开发任务。

- [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) ⭐ 今日 +3155  
  Cloudflare 开源的多阶段安全审计 Agent Skill，输出可验证、机器可读的审计结果。

- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) ⭐ 今日 +556  
  Addy Osmani 维护的生产级工程 Skills，面向 AI 编程 Agent 直接复用。

- [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) ⭐ 今日 +281  
  Anthropic 开源的 Claude Cowork 知识工作者插件集，扩展 Agent 在办公/知识场景的能力。

- [trycua/cua](https://github.com/trycua/cua) ⭐ 今日 +859  
  开源 Computer-Use 2.0 驱动与跨 OS 设备集群，提供训练、评估和数据生成的 benchmark。

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) ⭐ 247,156  
  “与你一起成长”的 Agent 框架，社区热度极高。

- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) ⭐ 48,363  
  超轻量、自托管的个人 AI Agent 框架，支持 WebUI、工具、记忆、MCP 与多 Agent 工作流。

- [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) ⭐ 47,040  
  开源超级 AI 助手与 Agent Harness，支持多 Agent、多模型、多模态，并具备记忆与自我进化能力。

### 📦 AI 应用

- [zi-yue-1129/DATAGEN](https://github.com/zi-yue-1129/DATAGEN) ⭐ 1,804  
  AI 驱动的多智能体科研助手，自动完成假设生成、数据分析和报告撰写。

- [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) ⭐ 72,171  
  开源 AI 求职工具：扫描职位、结构化评分、定制简历并追踪申请进度。

- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) ⭐ 65,305  
  LLM 驱动的多市场股票分析系统，整合行情、新闻、决策看板与自动推送。

- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) ⭐ 55,340  
  将文档或主题一键转为原生 PowerPoint，支持动画、图表和数据表格。

- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) ⭐ 52,001  
  AI 生产力工作室：智能对话、自主 Agent、300+ 助手，统一接入前沿 LLM。

- [Event-AHU/Medical_Image_Analysis](https://github.com/Event-AHU/Medical_Image_Analysis) ⭐ 240  
  基于基础模型的医学图像分析项目，聚焦垂直医疗 AI 应用。

- [asukaminato0721/telegram-summary-bot](https://github.com/asukaminato0721/telegram-summary-bot) ⭐ 200  
  可自部署的 Telegram 群聊 AI 摘要机器人，支持图片、链接、回复上下文与中文检索。

- [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) ⭐ 33,693  
  个人交易智能体，主打对话式投资助手体验。

### 🧠 大模型/训练

- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) ⭐ 61,706  
  从零训练 64M 参数 LLM，官方声称仅需 2 小时，是低门槛 LLM 训练经典项目。

- [higgsfield-ai/higgsfield](https://github.com/higgsfield-ai/higgsfield) ⭐ 今日 +196  
  容错、高可扩展的 GPU 编排与机器学习框架，目标训练数十亿至数万亿参数模型。

- [cactus-compute/needle](https://github.com/cactus-compute/needle) ⭐ 今日 +234  
  面向手机、可穿戴、机器人、汽车的 2-bit 自动化基础模型，体积仅 8-29MB，支持工具调用与结构化抽取。

- [penberg/titania](https://github.com/penberg/titania) ⭐ 108  
  从 transformer 到 transistor 的完整 LLM 系统，强调“一人可理解”的极简实现。

- [thinkwee/AwesomeOPD](https://github.com/thinkwee/AwesomeOPD) ⭐ 866  
  On-Policy Distillation（在线策略蒸馏）精选资源列表，聚焦模型自我改进与蒸馏方向。

- [testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io) ⭐ 112  
  LLM 测试时计算（test-time scaling）综述仓库，适合追踪推理侧扩展的最新研究。

- [zchoi/Awesome-Embodied-Robotics-and-Agent](https://github.com/zchoi/Awesome-Embodied-Robotics-and-Agent) ⭐ 1,887  
  具身智能与机器人大模型研究精选清单。

- [thinkwee/AgentsMeetRL](https://github.com/thinkwee/AgentsMeetRL) ⭐ 1,844  
  Agentic RL（智能体强化学习）精选列表，反映“Agent + RL”技术趋势。

### 🔍 RAG/知识库

- [docling-project/docling](https://github.com/docling-project/docling) ⭐ 今日 +129  
  文档解析与准备工具，让 PDF、Office 等文档变成 GenAI / RAG 可用的结构化数据。

- [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) ⭐ 46,434  
  开源、隐私优先、自托管的知识工作空间，支持人类与 AI Agent 在同一知识库中协作。

- [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) ⭐ 83,452  
  让 Agent 获得“看互联网”的能力：统一读取/搜索 Twitter、Reddit、YouTube、GitHub、B 站、小红书等平台，且零 API 费用。

---

## 3. 趋势信号分析

今日最明显的信号是 **Agent 生态正在从“单体 Coding Agent”走向“技能/插件 + 基础设施”的分工**。Cloudflare 的 `security-audit-skill`、Addy Osmani 的 `agent-skills`、Anthropic 的 `knowledge-work-plugins` 同一天登上 Trending，说明 Agent 能力开始以可复用的 Skills/Plugins 方式分发。`trycua/cua` 将 Computer-Use 2.0 与开源驱动、跨 OS 设备集群和 benchmark 绑定，标志着智能体正在从代码仓库扩展到 GUI 操作。`needle` 与 `higgsfield` 分别代表“端侧小模型”与“大规模训练”两个极端：前者用 8-29MB 实现工具调用，后者面向万亿参数训练。`minimind`、`tiny-llm`、`titania` 等教学/极简实现继续受到关注，说明低门槛理解训练与推理仍是社区刚需。主题搜索中大量 AI Agent 框架与垂直应用（求职、股票、PPT、医疗）涌现，RAG/知识管理类项目则作为“数据底座”保持稳定热度。整体来看，今日热榜与 Claude Code / Claude Cowork 插件开放、OpenAI Codex 生态工具化等方向相互印证。

---

## 4. 社区关注热点

- **Agent Skills / Plugins 正在成为“新标准”**：重点关注 [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)、[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) 和 [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins)。它们分别代表安全审计、工程编码、知识工作三个高价值场景。

- **Computer-Use 2.0 基础设施**：[trycua/cua](https://github.com/trycua/cua) 提供开源驱动、跨 OS 设备编排与 benchmark，可能是 GUI Agent 训练与评测的重要起点。

- **端侧自动化基础模型**：[cactus-compute/needle](https://github.com/cactus-compute/needle) 体积仅 8-29MB，却支持工具调用、结构化抽取和 Embedding，值得关注手机/机器人/车机等隐私敏感、低延迟场景。

- **Rust/Go 高性能 Coding Agent**：[Hmbown/Codewhale](https://github.com/Hmbown/Codewhale)（⭐ 41,001）与 [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)（⭐ 35,629）分别用 Rust 和 Go 实现终端编码 Agent，代表“非 Python 系” Agent 工程化趋势。

- **自托管 AI 助手与知识库**：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)、[CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) 和 [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) 正在把“个人 AI + 私有知识”整合为可自主部署的日常工具，适合开发者优先跟进。

---

## Trending top10项目

1. [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) [JavaScript]
   ⭐ 0 | 今日 +3155
   用于多阶段安全审计的编码代理技能，提供独立验证、机器可读的结果。
2. [trycua/cua](https://github.com/trycua/cua) [HTML]
   ⭐ 0 | 今日 +859
   通过开源驱动、跨操作系统集群以及用于训练、评估和数据生成的基准，扩展计算机使用2.0。
3. [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) [JavaScript]
   ⭐ 0 | 今日 +556
   面向AI编码代理的生产级工程技能。
4. [coder/coder](https://github.com/coder/coder) [Go]
   ⭐ 0 | 今日 +402
   为开发者及其代理提供安全环境。
5. [anthropics/claude-code](https://github.com/anthropics/claude-code) [TypeScript]
   ⭐ 0 | 今日 +483
   Claude Code 是一款驻留在终端中的代理式编码工具，能理解你的代码库，并通过自然语言命令执行日常任务、解释复杂代码和处理 Git 工作流，从而帮助你更快地编码。
6. [Open-Dev-Society/OpenStock](https://github.com/Open-Dev-Society/OpenStock) [TypeScript]
   ⭐ 0 | 今日 +472
   OpenStock 是昂贵市场平台的开源替代品。跟踪实时价格、设置个性化提醒、探索详细公司洞察——开放构建，人人可用，永远免费。
7. [higgsfield-ai/higgsfield](https://github.com/higgsfield-ai/higgsfield) [Jupyter Notebook]
   ⭐ 0 | 今日 +196
   容错、高度可扩展的GPU编排，以及为训练数十亿至数万亿参数模型而设计的机器学习框架。
8. [docling-project/docling](https://github.com/docling-project/docling) [Python]
   ⭐ 0 | 今日 +129
   让你的文档为生成式AI做好准备。
9. [cloudflare/quiche](https://github.com/cloudflare/quiche) [Rust]
   ⭐ 0 | 今日 +31
   🥧 QUIC传输协议和HTTP/3的美味实现。
10. [asciimoo/hister](https://github.com/asciimoo/hister) [Go]
   ⭐ 0 | 今日 +420
   你自己的搜索引擎。
