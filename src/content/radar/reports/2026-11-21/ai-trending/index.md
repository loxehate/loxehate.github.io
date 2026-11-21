---
title: "AI 开源趋势日报"
published: 2026-11-21
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-21

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-21 00:00 UTC

---

# AI 开源趋势日报（2026-11-21）

## 今日速览

今日 GitHub AI 开源生态呈现明显的“Agent 技能化”与“端侧小模型”双轮驱动态势。Claude Code、Cursor 等编程 Agent 的技能插件（Skill）爆发式增长，开发者正将 AI 能力以标准化技能包形式沉淀；与此同时，两小时训练 64M 大模型的 minimind 登上热榜，反映社区对极小型模型（SLM）与低成本训练的浓厚兴趣。Firecrawl 等 Agent 知识基础设施持续受关注，AI 视频剪辑、金融交易等垂直应用也保持高活跃度。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [ollama/ollama](https://github.com/ollama/ollama) | 187,762 / — | 本地运行 Kimi、DeepSeek、Qwen 等大模型的轻量工具，今日持续登榜，端侧模型部署需求旺盛。 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | — / +217 | Intel 开源 AI 推理加速工具包，优化模型部署与推理性能，适合边缘与数据中心场景。 |
| [cursor/plugins](https://github.com/cursor/plugins) | — / +299 | Cursor 官方插件规范与插件集，标准化 AI 编辑器扩展生态，今日新增近 300 颗星。 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | — / +773 | 将任意软件改造为 Agent-Native 的 CLI 工具，让传统程序可被 AI 智能体直接调用。 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | — / +315 | 基于 Stitch MCP 服务器的 Agent 技能库，遵循 Agent Skills 开放标准，提升编码 Agent 能力。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 169,331 / — | 业界领先的机器学习模型框架，覆盖文本、视觉、音频与多模态模型，持续稳居热榜。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [obra/superpowers](https://github.com/obra/superpowers) | — / +890 | Agentic 技能框架与软件开发方法论，今日新增 890 颗星，体现社区对 Agent 工作流标准化的追捧。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,987 / — | Agent 工程平台，构建 LLM 驱动的应用与工作流，生态最成熟的 Agent 框架之一。 |
| [langgenius/dify](https://github.com/langgenius/dify) | 161,580 / — | 一体化 Agentic 工作流与 RAG 流水线平台，支持云端/VPC/自托管，适合团队协作开发 AI 应用。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 121,616 / — | 开源 AI 浏览器 Agent 库，提供无头浏览器与云端 Agent API，实现网页自动化操作。 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | — / +466 | 面向 CI/CD 可靠性的开源 Agent，自动诊断与修复构建/部署故障，将 AI 引入 DevOps。 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | — / +681 | AI Agent 技能，可跨 Reddit、X、YouTube 等平台调研任意主题并生成有据可查的总结。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | — / +979 | 开源 AI 视频剪辑桌面工具，一键将长视频转为短视频并生成字幕、封面与发布文案，适配多平台。 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 123,294 / — | 基于多智能体 LLM 的金融交易框架，面向量化交易与投资决策场景。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 144,837 / — | 利用 AI 大模型与自动化工作流，根据主题或关键词一键生成高清短视频。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 78,864 / — | AI 将文档或主题转换为原生 PowerPoint 幻灯片，支持图表、动画与音频，适合办公自动化。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 73,564 / — | LLM 驱动的多市场股票智能分析系统，整合行情、新闻与决策看板，支持定时自动运行。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | — / +847 | 两小时从零训练出 64M 参数大模型，极低门槛让个人开发者也能体验完整预训练流程。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 264,986 / — | 随用户共同成长的 AI Agent，侧重个性化记忆与长期交互，模型与智能体深度结合。 |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 201,661 / — | 通用开源机器学习框架，支持模型训练与部署，仍是深度学习基础设施的重要基石。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 205,246 / +1241 | 面向 AI Agent 的知识基础设施，统一搜索、抓取与 550+ 数据源访问，今日新增超 1200 颗星。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 151,172 / — | 将代码库、文档、SQL 与 PDF 转为可查询的知识图谱，提供 Claude Code/Cursor 等技能集成。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 159,169 / — | 用户友好的 AI 界面，支持 Ollama、OpenAI API 等多种后端，适合自托管知识助手场景。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 47,312 / — | 隐私优先、自托管的知识工作空间，支持人与 AI Agent 协作，适合个人知识管理与 RAG。 |

## 趋势信号分析

今日热榜显示，**Agent 技能（Skill）与 MCP 生态**正获得社区爆发式关注。Claude-BugHunter、superpowers、stitch-skills 等项目集中体现了将 AI 能力以标准化技能包形式沉淀、跨编辑器（Claude Code、Cursor、Codex）复用的趋势，开发者不再只构建单一 Agent，而是构建“技能库”。**端侧小模型与极低成本训练**成为新兴方向，minimind 两小时训练 64M 大模型的登榜，与近期小模型（SLM）和边缘 AI 推理需求上升相关，降低了个人开发者参与模型训练的门槛。Firecrawl 持续高增速，说明**Agent 知识基础设施（联网搜索、网页抓取、多数据源统一访问）**是当前智能体落地的核心瓶颈之一。整体来看，今日热榜未出现全新底层技术栈，但“技能化 Agent”“端侧小模型”“AI 视频/金融垂直应用”三个方向与近期大模型发布后的应用层爆发高度关联。

## 社区关注热点

- **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)**：今日新增超 1200 颗星，是构建联网智能体的关键知识基础设施，值得重点关注其 550+ 数据源接入能力。
- **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)**：两小时训练 64M 大模型，适合想快速上手 LLM 预训练全流程的开发者，体现小模型趋势。
- **[obra/superpowers](https://github.com/obra/superpowers)**：Agentic 技能框架，今日新增 890 颗星，代表了 Agent 工作流标准化的新尝试。
- **[zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip)**：AI 视频剪辑一键出片工具，今日新增近 1000 颗星，垂直内容创作场景的 AI 应用值得关注。
- **[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)**：将传统软件改造为 Agent-Native CLI，有助于打通旧系统与 AI 智能体的交互层。

---

## Trending top10项目

1. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python]
   ⭐ 0 | 今日 +1622
   面向漏洞挖掘与外部红队工作的 Claude Code 技能包——涵盖 82 项技能、15 个斜杠命令，以及跨 24 个核心漏洞类别策划的 681 个披露报告模式，外加企业身份与基础设施攻击矩阵。
2. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +890
   一款好用的智能体技能框架与软件开发方法论。
3. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) [Python]
   ⭐ 0 | 今日 +773
   “CLI-Anything：让所有软件都具备智能体原生能力” —— CLI-Hub: https://clianything.cc/
4. [jingyaogong/minimind](https://github.com/jingyaogong/minimind) [Python]
   ⭐ 0 | 今日 +847
   🧠 两小时从零训练出你的 64M 大模型。
5. [cursor/plugins](https://github.com/cursor/plugins) [TypeScript]
   ⭐ 0 | 今日 +299
   Cursor 插件规范与官方插件
6. [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript]
   ⭐ 0 | 今日 +1241
   让智能体更智能的知识基础设施。通过一个 API 搜索、抓取并访问 550+ 个数据提供商。
7. [nginx/nginx](https://github.com/nginx/nginx) [C]
   ⭐ 0 | 今日 +246
   NGINX 开源版官方仓库。
8. [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) [C++]
   ⭐ 0 | 今日 +217
   OpenVINO™ 是一个用于优化和部署 AI 推理的开源工具包。
9. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +636
   面向 Claude Code、Codex、GitHub Copilot、Cursor、Factory Droid、Qoder 和 Pi 的编辑图表设计。45 种图表类型。自包含 HTML + SVG。无阴影。无 Mermaid 垃圾。
10. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) [Python]
   ⭐ 0 | 今日 +681
   AI 智能体技能，可在 Reddit、X、YouTube、HN、Polymarket 和网络上调研任何主题，然后合成有依据的摘要。
