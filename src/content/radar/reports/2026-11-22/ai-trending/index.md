---
title: "AI 开源趋势日报"
published: 2026-11-22
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-22

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-22 00:00 UTC

---

# AI 开源趋势日报（2026-11-22）

## 今日速览

今日 GitHub AI 生态呈现明显的“Agent 技能化”与“端侧小模型”双轮驱动态势。Claude Code、Cursor 等编程助手的技能插件（Skill）爆发式增长，开发者正将 AI 能力以标准化技能形式沉淀；与此同时，两小时训练 64M 大模型的 minimind 登上热榜，反映社区对极低成本模型训练与本地化部署的浓厚兴趣。Firecrawl 等知识基础设施持续受关注，AI 正从单一对话模型向“检索+技能+工作流”的复合系统演进。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [ollama/ollama](https://github.com/ollama/ollama) | 187,790 / — | 本地大模型运行与管理工具，支持 Kimi、GLM、DeepSeek 等多模型，是端侧 AI 推理的事实标准。 |
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | — / +200 | Intel 开源 AI 推理加速工具包，今日热榜上榜，反映企业级模型部署与优化需求持续升温。 |
| [cursor/plugins](https://github.com/cursor/plugins) | — / +260 | Cursor 官方插件规范与插件集，标准化 AI 编辑器扩展生态，今日新增 260 星。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 206,168 / +1006 | 面向 AI Agent 的知识基础设施，统一搜索、抓取与 550+ 数据源访问，今日新增破千星。 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | — / +769 | 将任意软件改造为 Agent-Native 的 CLI 工具，致力于让传统软件可被智能体直接操作。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 169,311 / — | 机器学习模型定义与推理框架，涵盖文本、视觉、音频与多模态，持续是 LLM 开发核心基础设施。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | — / +1803 | Claude Code 漏洞挖掘与红队技能包，含 82 项技能与 681 个漏洞报告模式，今日新增星数榜首。 |
| [obra/superpowers](https://github.com/obra/superpowers) | — / +883 | Agentic 技能框架与软件开发方法论，主张通过技能组合提升开发效率，今日新增 883 星。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,951 / — | Agent 工程平台，提供构建 LLM 应用与多智能体工作流的标准组件，生态最成熟的 Agent 框架之一。 |
| [langgenius/dify](https://github.com/langgenius/dify) | 161,626 / — | 一体化 Agentic 工作流与 RAG 平台，支持云端、VPC 与自托管，适合团队协作构建 AI 应用。 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | — / +450 | 面向 CI/CD 可靠性的开源 AI Agent，将智能体引入运维与发布流程，今日新增 450 星。 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | — / +560 | 跨 Reddit、X、YouTube 等多源信息的 AI Agent 技能，自动合成可靠主题摘要，今日新增 560 星。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 188,127 / — | 面向大众的可访问 AI Agent 平台，提供构建与运行自主智能体的工具集。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | — / +683 | 开源 AI 视频剪辑桌面工具，将长视频一键剪辑为短视频并生成字幕、封面与发布文案，适配多平台。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 144,986 / — | 基于 AI 大模型与自动化工作流，从主题或关键词一键生成高清短视频，内容创作自动化代表。 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | 123,392 / — | 多智能体 LLM 金融交易框架，面向量化交易与投资决策的垂直 Agent 应用。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 79,076 / — | AI 将文档或主题转换为原生 PowerPoint 幻灯片，支持图表、动画与音频，办公自动化场景典型。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 73,638 / — | LLM 驱动的多市场股票智能分析系统，整合行情、新闻与决策看板，支持定时自动运行。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | — / +488 | 两小时从零训练 64M 大模型，极低门槛的 LLM 从零教学与训练项目，今日新增 488 星。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | 265,201 / — | 随用户成长的 AI Agent，兼具模型与智能体能力，星级超 26 万。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 169,311 / — | 业界领先的模型定义与训练框架，支持 SOTA 文本、视觉、音频与多模态模型。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 206,168 / +1006 | 为 Agent 提供统一知识检索与数据接入，连接 550+ 数据源，今日新增破千星。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | 151,612 / — | 将代码库、文档、SQL 与 PDF 转换为可查询知识图谱，适配 Claude Code、Cursor 等编程助手。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 47,331 / — | 隐私优先、自托管的知识工作空间，支持人与 AI Agent 协作，国产知识管理代表。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 159,225 / — | 用户友好的 AI 界面，支持 Ollama、OpenAI API 等，常作为本地知识库与模型的前端壳。 |

## 趋势信号分析

今日热榜显示，**AI Agent 技能化（Skillization）** 正获得社区爆发式关注。Claude-BugHunter、superpowers、CLI-Anything 等项目集中上榜，核心逻辑是将 AI 能力封装为标准化技能与插件，供 Claude Code、Cursor、Codex 等编程助手直接调用，这标志着 AI 开发正从“提示词工程”转向“技能工程”。同时，**极小模型训练**成为新兴热点，minimind 主打两小时训练 64M 大模型，降低了模型训练门槛，可能与近期端侧模型与小参数模型（如 gpt-oss 系列）的发布有关，反映社区对低成本、可本地化部署模型的需求。Firecrawl 今日新增破千星，再次印证**知识基础设施**对 Agent 智能化的关键作用。未见全新技术栈首次登榜，但 MCP（Model Context Protocol）与 Agent Skills 开放标准正在快速渗透，成为连接模型、工具与数据的粘合层。

## 社区关注热点

- **[elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)**：今日新增 1803 星登顶热榜，红队与漏洞挖掘是 AI 安全测试的高价值垂直场景，值得安全开发者重点跟进。
- **[jingyaogong/minimind](https://github.com/jingyaogong/minimind)**：两小时训练 64M 模型，适合希望快速理解 LLM 训练全流程的开发者与教育机构。
- **[firecrawl/firecrawl](https://github.com/firecrawl/firecrawl)**：新增 1006 星，作为 Agent 知识基础设施，其 550+ 数据源接入能力对构建复杂 RAG 系统具有参考价值。
- **[HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything)**：主张让所有软件 Agent-Native，是传统 CLI 工具与智能体交互的重要探索方向。
- **[zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip)**：AI 视频自动剪辑与内容再利用工具，今日新增 683 星，体现多模态内容生产在垂直应用层的落地热度。

---

## Trending top10项目

1. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python]
   ⭐ 0 | 今日 +1803
   面向漏洞挖掘与外部红队工作的 Claude Code 技能包 - 82 项技能，15 个斜杠命令，涵盖 24 个核心漏洞类别的 681 个已披露报告模式，外加企业身份与基础设施攻击矩阵。
2. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +883
   好用的智能体技能框架与软件开发方法论。
3. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) [Python]
   ⭐ 0 | 今日 +769
   "CLI-Anything：让所有软件原生支持智能体" -- CLI-Hub: https://clianything.cc/
4. [jingyaogong/minimind](https://github.com/jingyaogong/minimind) [Python]
   ⭐ 0 | 今日 +488
   🧠 两小时从零训练你的 64M 大模型。在两小时内从零开始训练你自己的 64M 大语言模型。
5. [cursor/plugins](https://github.com/cursor/plugins) [TypeScript]
   ⭐ 0 | 今日 +260
   Cursor 插件规范与官方插件
6. [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript]
   ⭐ 0 | 今日 +1006
   让智能体更智能的知识基础设施。通过一个 API 搜索、抓取并访问 550 多个数据提供商。
7. [nginx/nginx](https://github.com/nginx/nginx) [C]
   ⭐ 0 | 今日 +189
   官方 NGINX 开源仓库。
8. [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) [C++]
   ⭐ 0 | 今日 +200
   OpenVINO™ 是用于优化和部署 AI 推理的开源工具包。
9. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +583
   面向 Claude Code、Codex、GitHub Copilot、Cursor、Factory Droid、Qoder 和 Pi 的编辑图表设计。45 种图表类型。自包含 HTML + SVG。无阴影。无 Mermaid 垃圾。
10. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) [Python]
   ⭐ 0 | 今日 +560
   AI 智能体技能，可在 Reddit、X、YouTube、HN、Polymarket 和网络上研究任何主题，然后合成有依据的摘要。
