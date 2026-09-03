---
title: AI 开源趋势日报
published: 2026-09-02
report: ai-trending
tags:
  - radar
  - AI
---
# AI 开源趋势日报 2026-09-02

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-02 00:00 UTC

---

# AI 开源趋势日报 · 2026-09-02

---

## 今日速览

今日 AI 开源生态呈现 **"Agent Skills 化"** 的显著趋势，Claude Code、Cursor 等编程 Agent 的可复用技能包（Skills/Agent Harness）成为新增长极。**THU-MAIC/OpenMAIC** 以单日 +3,128 stars 领跑全榜，多智能体交互课堂引爆社区。与此同时，RAG 与向量检索基础设施持续高热，向量数据库领域的轻量化与无向量（Vectorless）方向成为技术分水岭。开源小模型训练（MiniMind）与本地化 AI 工具链形成"平民化 AI"的双线推进。

---

## 各维度热门项目

### 🤖 AI 智能体/工作流

| 项目 | Stars | 说明 |
|------|-------|------|
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | 0 → **+3,128 today** | 清华系多智能体交互课堂，一键开启沉浸式多角色协作学习，单日登顶全榜 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐239,510 | "The agent that grows with you"，强调 Agent 自进化与持续学习能力 |
| [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | **+912 today** | 将任意 AI Agent 改造为 AI 科学家，165 个即用技能，被 19 万+ 科研用户使用 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | **+623 today** | Agent Harness 性能优化系统，覆盖 Claude Code / Codex / Cursor 的 Skills + Memory + 安全 |
| [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) | **+193 today** | Claude Code 学术研究技能链：调研→写作→评审→修订→定稿，端到端覆盖 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | ⭐77,376 | 为 AI Agent 提供"全网之眼"，覆盖 Twitter/Reddit/B站/小红书等平台的零 API 费读写 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | ⭐69,754 | 开源 AI 求职 Agent，自动扫描职位 → 评分 → 简历定制 → 进度追踪 |

### 🔍 RAG / 知识库

| 项目 | Stars | 说明 |
|------|-------|------|
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | ⭐89,841 | RAG + Agent 融合引擎，开源 RAG 领域事实标杆 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | ⭐68,327 | Token 压缩层，JSON 节省 60-95%，直接降低 Agent 推理成本 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | ⭐35,479 | **Vectorless RAG** 代表作，基于推理的文档索引，挑战传统向量检索范式 |
| [topoteretes/cognee](https://github.com/topoteretes/cognee) | ⭐30,402 | 面向 Agent 的持久化记忆层，自托管知识图谱 |
| [NirDiamant/RAG_Techniques](https://github.com/NirDiamant/RAG_Techniques) | ⭐29,325 | 高级 RAG 技术教程合集，工程实践导向 |
| [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN) | ⭐12,880 | MLsys2026 最佳论文，RAG 存储节省 97%，100% 本地隐私 |
| [alibaba/zvec](https://github.com/alibaba/zvec) | ⭐15,590 | 阿里开源轻量级进程内向量数据库，主打极致速度 |

### 🔧 AI 基础工具（框架 / SDK / CLI）

| 项目 | Stars | 说明 |
|------|-------|------|
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | ⭐145,454 | Agent 工程平台事实标准 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | ⭐51,972 | 文档 Agent + OCR 平台领先者 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | ⭐40,875 | 构建弹性 Agent 的编排库 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ⭐64,535 | Agent 持久化记忆基础设施，即插即用 |
| [neuml/txtai](https://github.com/neuml/txtai) | ⭐12,919 | 全栈语义搜索 + LLM 编排框架 |
| [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) | **+323 today** | 精选 DESIGN.md 合集，让 Coding Agent 自动生成匹配品牌设计语言的 UI |

### 📦 AI 应用（垂直场景）

| 项目 | Stars | 说明 |
|------|-------|------|
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ⭐150,627 | 本地化 AI 对话前端事实标杆，兼容 Ollama / OpenAI |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | ⭐65,479 | "别租智力，买下它"——本地优先的 Agent 体验套件 |
| [jeecgboot/JeecgBoot](https://github.com/jeecgboot/JeecgBoot) | ⭐47,591 | 企业级 AI 低代码平台，"一句话生成整个系统" |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | ⭐135,634 | 100+ Agent 与 RAG 应用精选合集 |
| [handsomestWei/patent-disclosure-skill](https://github.com/handsomestWei/patent-disclosure-skill) | **+501 today** | 中文专利 Agent Skill：从点子挖掘到交底书撰写与审查答复 |
| [browser-use/video-use](https://github.com/browser-use/video-use) | **+472 today** | 用 Coding Agent 编辑视频，Agent 多模态创作新场景 |
| [The-Vibe-Company/quivr](https://github.com/The-Vibe-Company/quivr) | ⭐39,447 | "Opiniated RAG"——开箱即用的 GenAI 集成方案 |
| [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) | ⭐44,101 | 李博杰著《深入理解 AI Agent》中文开源主仓库 |

### 🧠 大模型 / 训练

| 项目 | Stars | 说明 |
|------|-------|------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | **+1,005 today** | **2 小时训练 64M 参数 LLM**，平民化大模型训练标杆，单日破千星 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐113,431 | 将任意代码库/SQL/文档构建为可查询知识图谱的 Claude Code Skill |

### 🚫 已筛除（非 AI 通用项目）

以下项目与 AI/ML 无直接关联，未纳入分析：
`iv-org/invidious`（YouTube 替代前端）、`3b1b/manim`（数学动画引擎）、`firecrawl/pdf-inspector`（PDF 处理库）、`averygan/reclip`（视频下载器）、`unclecode/crawl4ai`（边界项目——爬虫框架，仅具备 AI 友好性）

---

## 趋势信号分析

**Agent Skills 正在成为新的"插件经济"**。今日 Trending 前 8 名中有 4 个直接围绕 Skills / Harness 生态展开（OpenMAIC、K-Dense-AI、ECC、academic-research-skills），且均绑定 Claude Code / Cursor / Codex。这一波热潮呼应了 Anthropic 近期力推的 "Skills for AI Agents" 范式——将 Agent 能力从 Prompt 升级为可复用、可版本化、可组合的模块资产，标志着 LLM 应用开发正从"模型中心"向"技能中心"迁移。

**小型化与本地化成为开源主线**。MiniMind（2 小时训 64M 参数）单日 +1,005 stars，LEANN（97% 存储节省）、headroom（60-95% token 压缩）、anything-llm（本地优先）共同呈现一条清晰的平民化路径——降低 AI 训练与推理的资源门槛。这与近期端侧 LLM（Apple Foundation Model、Phi-5 系列）行业趋势高度共振。

**Vectorless RAG 开始挑战向量检索范式**。PageIndex 主张"无向量、纯推理"的文档索引方式登顶向量数据库主题，配合 LEANN 的极简索引与 cognee 的知识图谱路径，预示 RAG 基础栈正进入多范式并存期，传统"切块 + Embedding"的范式首次受到系统性挑战。

---

## 社区关注热点

- 🎯 **[K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills)（+912 today）** — 19 万科研用户背书的 Agent Skills 库，垂类 Agent 落地范本
- 🎯 **[THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC)（+3,128 today）** — 清华系多智能体教育产品，单日全榜冠军，产学研结合的标杆
- 🎯 **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)（+1,005 today）** — 极低门槛 LLM 训练教程，从零理解 Transformer 与预训练的"Hello World"
- 🎯 **[VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex)** — Vectorless RAG 理念代表作，值得关注 RAG 检索范式的代际切换
- 🎯 **[mem0ai/mem0](https://github.com/mem0ai/mem0) / [topoteretes/cognee](https://github.com/topoteretes/cognee)** — Agent 记忆层已成新基础设施赛道，押注"有记忆的 Agent"是未来 12 个月关键趋势

---

## Trending top10项目

1. [Gitlawb/openclaude](https://github.com/Gitlawb/openclaude) [TypeScript]
   ⭐ 0 | 今日 +80
   随处运行。兼容万物
2. [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) [Python]
   ⭐ 0 | 今日 +193
   Claude Code 学术研究技能：研究 → 撰写 → 审阅 → 修改 → 定稿
3. [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) [TypeScript]
   ⭐ 0 | 今日 +3128
   开放多智能体交互课堂——一键开启沉浸式多智能体学习体验
4. [iv-org/invidious](https://github.com/iv-org/invidious) [Crystal]
   ⭐ 0 | 今日 +577
   Invidious 是一个 YouTube 的替代前端
5. [jingyaogong/minimind](https://github.com/jingyaogong/minimind) [Python]
   ⭐ 0 | 今日 +1005
   🧠 仅需 2 小时，从零训练一个 6400 万参数的 LLM！
6. [3b1b/manim](https://github.com/3b1b/manim) [Python]
   ⭐ 0 | 今日 +86
   用于解释性数学视频的动画引擎
7. [firecrawl/pdf-inspector](https://github.com/firecrawl/pdf-inspector) [Rust]
   ⭐ 0 | 今日 +541
   使用 Rust 编写的快速 PDF 检测、分类与文本提取库。能够智能区分扫描件与文本型 PDF，助力智能路由决策。
8. [browser-use/video-use](https://github.com/browser-use/video-use) [Python]
   ⭐ 0 | 今日 +472
   使用编程代理编辑视频
9. [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) [Python]
   ⭐ 0 | 今日 +912
   将任意 AI 代理转变为 AI 科学家。全球 190,000+ 科学家信赖的顶级科学 Agent Skills 库。提供 165 个开箱即用且经过验证的技能，涵盖 100+ 科学数据库，覆盖生物学、化学、医学和药物发现领域。兼容 Cursor、Claude Code、Codex、Pi、Antigravity 以及开放式 Agent Skills 标准。
10. [handsomestWei/patent-disclosure-skill](https://github.com/handsomestWei/patent-disclosure-skill) [Python]
   ⭐ 0 | 今日 +501
   中国专利.skill：专利点挖掘与交底书（发明/实用新型/外观设计）编写，通俗解读专利，嗅探政策动向，辅助审查答复。
