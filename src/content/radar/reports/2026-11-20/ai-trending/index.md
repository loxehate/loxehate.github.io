---
title: "AI 开源趋势日报"
published: 2026-11-20
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-20

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-20 00:00 UTC

---

# AI 开源趋势日报（2026-11-20）

## 今日速览

今日 AI 开源生态呈现明显的“Agent 化基础设施”趋势，Claude Code 技能包、MCP 兼容技能库及 Agent-Native CLI 工具集中登榜，反映开发者正将大模型能力深度嵌入软件开发与运维全链路。轻量级模型训练（如 2 小时训练 64M 参数模型）与本地化推理（OpenVINO、Apple Silicon tiny-LLM）持续受关注，降低了模型落地门槛。垂直领域 AI 应用则在视频剪辑、股票分析、个人助理等方向快速涌现，体现“Agent + 垂直场景”的商业化探索正在加速。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | - / +246 | 英特尔开源 AI 推理优化与部署工具链，今日持续登榜，反映边缘端模型部署需求旺盛。 |
| [cursor/plugins](https://github.com/cursor/plugins) | - / +384 | Cursor AI 编辑器官方插件规范与生态，标志 AI IDE 插件体系开始形成开放标准。 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | - / +898 | 致力于让所有软件变成“Agent-Native”的 CLI 中心，今日新增星数极高，社区关注度爆发。 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | - / +302 | 基于 Stitch MCP Server 的 Agent 技能库，遵循 Agent Skills 开放标准，利于编码 Agent 互操作。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9,189 / - | 用 Rust 构建模块化、可扩展的 LLM 应用框架，适合追求性能与类型安全的 AI 工程师。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,789 / - | 在 Apple Silicon 上构建极简 vLLM + Qwen 推理系统，面向系统工程师学习 LLM 推理底层。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [obra/superpowers](https://github.com/obra/superpowers) | - / +2028 | Agentic 技能框架与软件开发方法论，今日新增星数登顶，体现 Agent 工作流范式的社区热度。 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | - / +954 | 跨 Reddit、X、YouTube 等多源信息的 AI Agent 调研技能，可生成有据可查的综合报告。 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | - / +38 | 面向 CI/CD 可靠性的开源 Agent，将 AI 引入软件交付与运维自动化。 |
| [Eigenwise/atomic-agents](https://github.com/Eigenwise/atomic-agents) | 6,342 / - | 原子化构建 AI Agent 的框架，强调模块拆分与可组合性。 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 38,824 / - | Agent 与生成式 UI 前端栈，支持 React/Angular/Mobile 等，并制定 AG-UI 协议。 |
| [trycua/cua](https://github.com/trycua/cua) | 32,684 / - | 面向计算机使用 2.0 的开源驱动、跨 OS 沙箱与训练/评测基准，推动桌面级 Agent 落地。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | - / +126 | 开源 AI 视频剪辑桌面工具，可将长视频一键剪辑为短视频并生成字幕、封面与发布文案。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 78,606 / - | AI 将文档或主题转换为原生 PowerPoint 幻灯片，支持图表、动画与音频。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 73,487 / - | LLM 驱动的多市场股票智能分析系统，集行情、新闻、决策看板与自动推送于一体。 |
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | - / +1349 | Claude Code 漏洞猎杀与红队技能包，内含 82 项技能与 681 个披露报告模式，面向安全测试场景。 |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | 38,542 / - | 个人交易 Agent，探索 AI 在量化/交易决策中的直接应用。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 66,838 / +238 | 两小时从零训练出 64M 参数大模型，极低门槛的 LLM 从零教学与实践项目，今日持续高增。 |
| [thinkwee/AwesomeOPD](https://github.com/thinkwee/AwesomeOPD) | 883 / - | On-Policy Distillation（在线策略蒸馏）精选列表，关注大模型蒸馏与对齐前沿。 |
| [EgoAlpha/prompt-in-context-learning](https://github.com/EgoAlpha/prompt-in-context-learning) | 2,252 / - | 提示词工程与上下文学习资源合集，涵盖 ChatGPT、GPT-3、FlanT5 等模型的最新实践。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | - / +825 | 面向 Agent 的知识基础设施，统一搜索、网页抓取与 550+ 数据源 API，使 Agent 更智能。 |
| [OpenSPG/KAG](https://github.com/OpenSPG/KAG) | 9,179 / - | 基于 OpenSPG 引擎与 LLM 的逻辑形式引导推理检索框架，用于构建事实问答与逻辑推理解决方案。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 47,290 / - | 隐私优先、自托管的知识工作空间，支持人与 AI Agent 协作，兼具笔记与知识管理能力。 |

## 趋势信号分析

今日热榜显示，**Agent 基础设施与技能化开发**获得社区爆发式关注，Claude-BugHunter、superpowers、CLI-Anything、stitch-skills 等项目集中登榜，表明开发者正从单一模型调用转向构建可复用、可组合的 Agent 技能体系，MCP 与 Agent Skills 开放标准开始显现。轻量化模型训练（minimind）与本地推理（OpenVINO、tiny-llm）并行发展，降低了模型定制与边缘部署门槛。在垂直应用层，AI 视频剪辑（autoclip）、股票分析（daily_stock_analysis）等工具体现“Agent + 垂直场景”的商业化探索加速。未见全新技术栈首次登榜，但 AI 红队安全（Claude-BugHunter）与 CI/CD 可靠性 Agent（opensre）等方向开始与 DevSecOps 趋势深度耦合，值得持续观察。

## 社区关注热点

- **[obra/superpowers](https://github.com/obra/superpowers)**：今日新增星数超 2000，登顶 Trending，是观察 Agentic 开发方法论风向的关键项目。
- **[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)**：主打“让所有软件 Agent-Native”，今日新增近 900 星，反映社区对将传统 CLI 工具改造为 Agent 可调用组件的强烈需求。
- **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)**：两小时训练 64M 模型，适合希望快速上手 LLM 从零训练的开发者与教育场景。
- **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)**：提供统一搜索与抓取 API，是构建知识增强型 Agent 的基础设施首选之一。
- **[openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino)**：持续登榜，适合关注英特尔生态下 AI 推理优化与边缘部署的工程师。

---

## Trending top10项目

1. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python]
   ⭐ 0 | 今日 +1349
   面向漏洞挖掘与外部红队工作的 Claude Code 技能包 - 82 个技能，15 个斜杠命令，跨 24 个核心漏洞类别策划的 681 个披露报告模式，加上企业身份 + 基础设施攻击矩阵。
2. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +2028
   好用的智能体技能框架与软件开发方法论。
3. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) [Python]
   ⭐ 0 | 今日 +898
   "CLI-Anything：让所有软件原生支持智能体" -- CLI-Hub: https://clianything.cc/
4. [jingyaogong/minimind](https://github.com/jingyaogong/minimind) [Python]
   ⭐ 0 | 今日 +238
   🧠 两小时从零训练出你的 64M 大模型。在 2 小时内从零训练你自己的 64M LLM。
5. [cursor/plugins](https://github.com/cursor/plugins) [TypeScript]
   ⭐ 0 | 今日 +384
   Cursor 插件规范与官方插件
6. [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript]
   ⭐ 0 | 今日 +825
   让智能体更智能的知识基础设施。通过一个 API 进行搜索、抓取以及连接 550 多个数据提供商。
7. [nginx/nginx](https://github.com/nginx/nginx) [C]
   ⭐ 0 | 今日 +73
   NGINX 开源版官方仓库。
8. [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) [C++]
   ⭐ 0 | 今日 +246
   OpenVINO™ 是用于优化和部署 AI 推理的开源工具包。
9. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +271
   面向 Claude Code、Codex、GitHub Copilot、Cursor、Factory Droid、Qoder 和 Pi 的编辑图表设计。45 种图表类型。自包含 HTML + SVG。无阴影。无 Mermaid 垃圾。
10. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) [Python]
   ⭐ 0 | 今日 +954
   AI 智能体技能，可在 Reddit、X、YouTube、HN、Polymarket 和网络上调研任何主题，然后合成有依据的摘要。
