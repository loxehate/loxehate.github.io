---
title: "AI 开源趋势日报"
published: 2026-11-24
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-24

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-24 00:00 UTC

---

# AI 开源趋势日报（2026-11-24）

## 今日速览

今日 GitHub AI 开源生态呈现明显的“Agent 化”趋势，Claude Code 技能包、MCP 技能库及 Agent 原生基础设施占据 Trending 榜单前列。大模型训练门槛持续降低，minimind 两小时训练 64M 模型的项目获得爆发式关注。RAG 与 Agent 记忆层（如 mem0、claude-mem、ragflow）成为社区核心赛道，多模态与垂直应用（AI 视频剪辑 autoclip）也开始涌现。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | - / +184 | 英特尔开源 AI 推理部署工具包，今日持续登榜，反映边缘推理优化需求旺盛。 |
| [cursor/plugins](https://github.com/cursor/plugins) | - / +397 | Cursor AI 编辑器官方插件规范与生态，标志 AI IDE 插件体系开始形成。 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | - / +790 | 致力于让所有软件变成 Agent-Native 的 CLI 中心，今日新增 stars 极高。 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | - / +422 | 基于 Stitch MCP Server 的 Agent Skills 开放标准库，推动 Agent 技能互操作。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9,240 / - | 用 Rust 构建模块化、可扩展的 LLM 应用框架，系统级开发者关注度高。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | 80,666 / - | 在 LLM 达到前压缩工具输出与日志，为编码 Agent 节省 20% 以上 Token。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | - / +2029 | Claude Code 漏洞猎杀与红队技能包，82 个技能、15 个斜杠命令，今日 Trending 冠军。 |
| [obra/superpowers](https://github.com/obra/superpowers) | - / +840 | Agentic 技能框架与软件开发方法论，强调 Agent 驱动的开发范式。 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | - / +797 | 跨 Reddit、X、YouTube 等平台的 AI Agent 调研技能，自动合成可靠摘要。 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | - / +436 | 面向 CI/CD 可靠性的开源 Agent，将 AI 引入运维与发布流程。 |
| [Eigenwise/atomic-agents](https://github.com/Eigenwise/atomic-agents) | 6,346 / - | 原子化构建 AI Agent，强调模块化与可组合的 Agent 工程实践。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,939 / - | Agent 工程平台，持续占据 RAG/Agent 生态核心位置。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | - / +907 | 开源 AI 视频剪辑桌面工具，长视频一键生成短视频并配字幕、封面与发布文案。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | 53,789 / - | 集模型、Agent 与生产力于一体的 AI 工作空间，本地优先体验。 |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | 61,936 / - | 终身个性化 AI 导师，垂直教育场景的 Agent 应用代表。 |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | 145,522 / - | 100+ AI Agent 与 RAG 应用开源清单，垂直场景落地参考。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | 68,561 / - | 本地优先的 Agent 体验平台，主打“拥有自己的智能”。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 69,435 / +828 | 两小时从零训练 64M 大模型，极低门槛的 LLM 从零开始教程与代码，今日热点。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,633 / - | LLM 评测平台，覆盖 OpenAI、Anthropic、Qwen、DeepSeek 等 100+ 数据集。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,805 / - | 针对 Apple Silicon 构建微型 vLLM + Qwen 推理系统，面向系统工程师。 |
| [galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining) | 354 / - | 可靠、极简且可扩展的基础模型与世界模型预训练库。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | - / +924 | 面向 Agent 的知识基础设施，统一 API 接入 550+ 数据提供商，今日新增 stars 破千。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 159,359 / - | 支持 Ollama、OpenAI API 等的用户友好型 AI 界面，RAG 知识管理热门入口。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 94,600 / - | Agent-native 数据库，从 RAG 引擎演进为上下文基础设施。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | 69,384 / - | AI Agent 记忆层，提供跨会话持久化上下文，生产级记忆基础设施。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 119,322 / - | 为每个 Agent 提供跨会话持久化上下文，AI 压缩并注入相关记忆。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | 46,726 / - | 云原生高性能向量数据库，支撑可扩展的向量近邻搜索。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | 52,986 / - | AI 文档处理平台，RAG 领域长青框架。 |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | 87,726 / - | 面向 AI Agent 的网页抓取、提取与搜索 API，开源且免费额度丰富。 |

## 趋势信号分析

今日热榜显示，**Agent 技能与技能标准化**获得社区爆发式关注，Claude-BugHunter、superpowers、stitch-skills 等项目集中登榜，表明开发者正从单一模型调用转向构建可复用、可组合的 Agent 技能体系。MCP（Model Context Protocol）相关技能库首次大规模出现，标志着 AI 应用与外部工具的连接层正在成型。

**大模型训练民主化**是另一明显信号，minimind 以“两小时训练 64M 模型”登顶，反映社区对极小模型（Small Language Model）与从零构建 LLM 的浓厚兴趣，可能与近期端侧模型和边缘 AI 发布有关。

在基础设施层，**RAG 与 Agent 记忆**持续受热，firecrawl、mem0、claude-mem、ragflow 等项目强调“上下文基础设施”，说明行业已从单次检索转向持久化、可压缩、可跨会话复用的记忆管理。此外，AI 视频剪辑（autoclip）等垂直应用开始进入 Trending，说明多模态生成式 AI 工具正从研究走向桌面级消费产品。

## 社区关注热点

- **Claude-BugHunter**：今日 Trending 冠军，红队与漏洞挖掘的 Agent 技能包，安全领域 AI Agent 化的风向标。
- **minimind**：极低门槛的 LLM 从零训练项目，适合希望快速理解大模型训练全流程的开发者。
- **firecrawl**：Agent 知识基础设施，今日新增 stars 破千，适合需要统一搜索/抓取 API 的 Agent 开发。
- **mem0 / claude-mem**：Agent 持久化记忆层，解决跨会话上下文丢失问题，是构建生产级 Agent 的关键组件。
- **autoclip**：开源 AI 视频剪辑工具，代表多模态 AI 垂直应用开始进入桌面端与内容创作者场景。

---

## Trending top10项目

1. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python]
   ⭐ 0 | 今日 +2029
   面向漏洞挖掘与外部红队工作的 Claude Code 技能包——涵盖 82 项技能、15 个斜杠命令，以及跨 24 个核心漏洞类别策划的 681 个披露报告模式，外加企业身份与基础设施攻击矩阵。
2. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +840
   好用的智能体技能框架与软件开发方法论。
3. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) [Python]
   ⭐ 0 | 今日 +790
   "CLI-Anything：让所有软件都具备智能体原生能力" —— CLI-Hub: https://clianything.cc/
4. [jingyaogong/minimind](https://github.com/jingyaogong/minimind) [Python]
   ⭐ 0 | 今日 +828
   🧠 两小时从零训练出你的 64M 大模型。在 2 小时内从零开始训练你自己的 64M 大语言模型。
5. [cursor/plugins](https://github.com/cursor/plugins) [TypeScript]
   ⭐ 0 | 今日 +397
   Cursor 插件规范与官方插件
6. [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript]
   ⭐ 0 | 今日 +924
   知识基础设施，让你的智能体更智能。通过一个 API 搜索、抓取并访问 550 多个数据提供商。
7. [nginx/nginx](https://github.com/nginx/nginx) [C]
   ⭐ 0 | 今日 +174
   NGINX 开源版官方仓库。
8. [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) [C++]
   ⭐ 0 | 今日 +184
   OpenVINO™ 是一个用于优化和部署 AI 推理的开源工具包。
9. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +620
   面向 Claude Code、Codex、GitHub Copilot、Cursor、Factory Droid、Qoder 和 Pi 的编辑图表设计。52 种图表类型。自包含 HTML + SVG。无阴影。无 Mermaid 垃圾。
10. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) [Python]
   ⭐ 0 | 今日 +797
   AI 智能体技能，可在 Reddit、X、YouTube、HN、Polymarket 和网络上研究任何主题，然后合成有依据的摘要。
