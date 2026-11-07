---
title: "AI 开源趋势日报"
published: 2026-11-07
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-07

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-07 00:00 UTC

---

# AI 开源趋势日报（2026-11-07）

## 今日速览

今日 AI 开源生态呈现明显的“Agent 化”与“技能化”趋势。Trending 榜单被多个 AI Agent 技能项目占据，cloudflare/security-audit-skill 单日新增 2548 颗星，mattpocock/skills 亦获 2070 颗星，显示开发者正将 LLM 能力封装为可复用的 Agent Skill。NVIDIA 发布 auto-ontology，进一步验证图推理与语义知识库在企业级 AI 基础设施中的地位。与此同时，RAG 与长期记忆方向持续活跃，mem0、ragflow 等项目在主题搜索中保持高关注度。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,139 / — | Agent 工程平台，持续作为 AI 应用开发的事实标准框架，今日在 RAG 主题搜索中保持高曝光。 |
| [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) | 41,156 / — | 用 Rust 编写的终端 AI Agent，支持任意模型供应商，适合 CLI 场景下的智能化开发工作流。 |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | 87,012 / — | 面向 AI Agent 的开源网页抓取与提取 API，为 Agent 提供结构化网络数据，降低数据采集门槛。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 79,021 / — | 在 LLM 输入前压缩工具输出、日志与 RAG 分块，显著降低 Token 消耗，适合成本敏感的 Agent 场景。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) | — / +2548 | Cloudflare 官方多阶段安全审计 Agent Skill，具备机器可读的独立验证发现，今日 Trending 增长最猛。 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | — / +2070 | 面向工程师的 Agent 技能集合，源自个人 .agents 目录，体现“私有技能库”向开源共享的转变。 |
| [google/skills](https://github.com/google/skills) | — / +534 | Google 官方针对自家产品与技术的 Agent Skill 集，标志着大厂开始以“技能”形式开源 AI 能力。 |
| [NousResearch/hersmes-agent](https://github.com/NousResearch/hermes-agent) | 261,203 / — | “与你一起成长”的 AI Agent，总星数遥遥领先，代表个人长期陪伴型 Agent 的社区关注度。 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 38,548 / — | Agent 与生成式 UI 的前端技术栈，推动 AG-UI 协议，连接 React/Angular 等前端与后端 Agent。 |
| [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) | 36,115 / — | 基于 Go 的复杂软件工程任务可靠编码 Agent，展示非 Python 语言在 Agent 开发中的新尝试。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | 109,681 / — | 赋予 AI Agent 浏览全网的能力（Twitter、Reddit、YouTube 等），零 API 费用，适合舆情与内容自动化。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 74,261 / — | 将文档或主题转换为原生 PowerPoint 幻灯片，支持图表、动画与音频，垂直办公场景代表。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 67,648 / — | LLM 驱动的多市场股票智能分析系统，集行情、新闻与决策看板，支持零成本定时运行。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | 80,722 / — | AI 求职 Agent，扫描招聘看板、匹配简历并生成 ATS 友好文书，垂直职场场景。 |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | 144,041 / — | 100+ AI Agent、技能与 RAG 应用的开源合集，适合快速调研垂直场景落地方案。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

今日 Trending 与主题搜索中未出现明显的模型权重或训练框架新增热点，社区注意力已从底层模型训练转向上层 Agent 应用与基础设施。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 157,953 / — | 支持 Ollama、OpenAI API 等的用户友好 AI 界面，是本地 RAG 应用的常用前端壳。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 93,694 / — | Agent 原生数据库与 RAG 引擎，已演进为上下文基础设施，适合构建复杂检索增强系统。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 68,531 / — | AI Agent 的记忆层，提供可持久化的上下文记忆基础设施，解决 Agent 会话状态丢失问题。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 143,543 / — | 将代码库、文档、SQL 与 PDF 转换为可查询的知识图谱，支持 Claude Code、Cursor 等主流工具。 |
| [NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology) | — / +2015 | NVIDIA 推出的基于语义图的推理层框架，支持确定性查询生成，今日 Trending 增长显著。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 47,107 / — | 隐私优先、自托管的知识工作空间，支持人与 AI Agent 协作，国产知识管理代表。 |

## 趋势信号分析

今日热榜最突出的信号是 **AI Agent “技能化”爆发**：cloudflare/security-audit-skill、mattpocock/skills 与 google/skills 占据 Trending 榜单前列，开发者不再仅关注通用聊天机器人，而是将 LLM 能力封装为可复用、可验证的垂直 Agent Skill（如安全审计、代码工程）。这表明社区正从“模型能力展示”转向“可落地的自动化工作流”。

在技术栈方面，**Go 语言在 Agent 基础设施中崭露头角**：ragflow、DeepSeek-Reasonix 均采用 Go，显示高并发与类型安全需求正推动 Agent 引擎向非 Python 生态扩展。NVIDIA 的 auto-ontology 首次登上 AI 相关 Trending，强化了“图推理 + 语义知识库”作为企业级 RAG 下一阶段方向的地位。

与近期大模型发布的关联上，多模态 Agent（Agent-Reach 赋予 Agent“上网看”的能力）与长期记忆（mem0、claude-mem）的组合，正在弥补当前模型在长上下文与实时交互上的短板，形成“模型 + 技能 + 记忆 + 工具”的完整 Agent 闭环。

## 社区关注热点

- **cloudflare/security-audit-skill**：大厂首个以“可独立验证发现”为卖点的安全审计 Agent Skill，值得安全与 DevOps 开发者重点关注。
- **mem0ai/mem0**：AI Agent 记忆层的代表项目，解决多会话上下文丢失痛点，适合构建有状态的个人助理与客服系统。
- **NVIDIA/auto-ontology**：图推理与确定性查询生成框架，适合企业级知识库与语义搜索场景，今日单日新增星数超 2000。
- **Panniantong/Agent-Reach**：零 API 费用的全网浏览 Agent，适合需要大规模公开数据采集与舆情监控的开发者。
- **infiniflow/ragflow**：Agent 原生 RAG 数据库，已从检索引擎演进为上下文基础设施，适合构建复杂企业知识问答系统。

---

## Trending top10项目

1. [zed-industries/zed](https://github.com/zed-industries/zed) [Rust]
   ⭐ 0 | 今日 +306
   按思考速度编码 – Zed 是 Atom 和 Tree-sitter 创作者打造的高性能多人代码编辑器。
2. [NVIDIA/auto-ontology](https://github.com/NVIDIA/auto-ontology) [Python]
   ⭐ 0 | 今日 +2015
   Auto Ontology 是用于构建数据语义图推理层的 Python 框架，支持确定性查询生成、上下文检索及 LLM/Agent 工作流的可解释 AI。
3. [rails/rails](https://github.com/rails/rails) [Ruby]
   ⭐ 0 | 今日 +142
   Ruby on Rails
4. [mpv-player/mpv](https://github.com/mpv-player/mpv) [C]
   ⭐ 0 | 今日 +37
   🎥 命令行媒体播放器
5. [rust-lang/rust](https://github.com/rust-lang/rust) [Rust]
   ⭐ 0 | 今日 +192
   让每个人都能构建可靠高效的软件。
6. [react/react](https://github.com/react/react) [JavaScript]
   ⭐ 0 | 今日 +248
   Web 和原生用户界面库。
7. [angular/angular](https://github.com/angular/angular) [TypeScript]
   ⭐ 0 | 今日 +135
   自信交付 Web 应用 🚀
8. [symfony/symfony](https://github.com/symfony/symfony) [PHP]
   ⭐ 0 | 今日 +128
   Symfony PHP 框架
9. [prometheus/prometheus](https://github.com/prometheus/prometheus) [Go]
   ⭐ 0 | 今日 +148
   Prometheus 监控系统与时序数据库。
10. [google/skills](https://github.com/google/skills) [Python]
   ⭐ 0 | 今日 +534
   Google 产品与技术的 Agent 技能
