---
title: "AI 开源趋势日报"
published: 2026-11-25
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-25

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-25 00:00 UTC

---

# AI 开源趋势日报（2026-11-25）

## 今日速览

今日 AI 开源生态呈现明显的“Agent 化基础设施”爆发态势，Claude Code 技能包、MCP 兼容技能库及 Agent-Native CLI 工具集中登榜，反映社区正从单一模型调用转向可编排、可外接的智能体工作流。轻量级大模型训练与推理工具（如 minimind、tiny-llm）保持高增速，降低了从零构建模型的门槛。垂直领域 AI 应用在视频剪辑、PPT 生成、金融交易等方向活跃，显示 Agent 技术正快速下沉至具体场景。

## 各维度热门项目

### 🔧 AI 基础工具

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | - / +185 | Intel 开源 AI 推理加速工具包，今日持续获得社区关注，适合边缘与云端模型部署。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,807 / - | 针对 Apple Silicon 构建的微型 LLM 推理系统，适合系统工程师学习 vLLM 类推理引擎原理。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | - / +991 | 面向 AI Agent 的知识基础设施 API，统一接入 550+ 数据源，今日新增 stars 近千，是 Agent 数据层的热门选择。 |
| [cursor/plugins](https://github.com/cursor/plugins) | - / +360 | Cursor 官方插件规范与插件集，标志 AI 编辑器生态正在向插件化扩展。 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | - / +403 | 适配 Stitch MCP 服务器的 Agent 技能库，遵循 Agent Skills 开放标准，便于编码 Agent 复用能力。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9,253 / - | 用 Rust 构建模块化、可扩展的 LLM 应用框架，适合追求类型安全与性能的 AI 工程师。 |

### 🤖 AI 智能体/工作流

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | - / +1826 | Claude Code 漏洞挖掘技能包，含 84 项技能与 681 个漏洞报告模式，今日 Trending 增速最高，体现安全红队 Agent 化趋势。 |
| [obra/superpowers](https://github.com/obra/superpowers) | - / +1003 | Agentic 技能框架与软件开发方法论，主打可组合的智能体能力。 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | - / +1074 | 主张“让所有软件 Agent-Native”的 CLI-Hub 项目，今日热度极高，代表终端即 Agent 接口的方向。 |
| [Eigenwise/atomic-agents](https://github.com/Eigenwise/atomic-agents) | 6,346 / - | 原子化构建 AI Agent 的框架，强调模块化与可组合的智能体设计。 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | - / +398 | 面向 CI/CD 可靠性的开源 Agent，将智能体引入 DevOps 运维场景。 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 38,953 / - | Agent 与生成式 UI 前端栈，支持 React/Angular/Mobile 等，并推动 AG-UI 协议。 |

### 📦 AI 应用

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | - / +980 | 开源 AI 视频剪辑桌面工具，一键将长视频转短视频并生成字幕、封面与发布文案，适配多平台。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 79,883 / - | AI 将文档或主题转换为原生 PowerPoint 幻灯片，支持图表、动画与音频，适合办公自动化场景。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 74,320 / - | LLM 驱动的多市场股票智能分析系统，整合行情、新闻与决策看板，支持零成本定时运行。 |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | 38,774 / - | 个人 AI 交易代理，将 LLM 能力应用于金融交易决策。 |
| [toeverything/AFFiNE](https://github.com/toeverything/AFFiNE) | - / +584 | 下一代私有化知识工作空间，融合规划、排版与创作，人机协作定位明确。 |

### 🧠 大模型/训练

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 70,158 / +727 | 两小时从零训练 64M 参数大模型，今日 Trending 与主题榜双重登榜，是小模型快速入门的代表项目。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,636 / - | LLM 评测平台，覆盖 OpenAI、Anthropic、Qwen、DeepSeek 等主流模型及 100+ 数据集。 |
| [galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining) | 355 / - | 可靠、极简且可扩展的基础模型与世界模型预训练库，适合研究稳定预训练范式。 |
| [testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io) | 113 / - | 大模型 Test-Time Scaling 调研仓库，梳理“何、如何、何处、效果”四个维度，前沿方向值得关注。 |

### 🔍 RAG/知识库

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [OpenSPG/KAG](https://github.com/OpenSPG/KAG) | 9,190 / - | 基于 OpenSPG 引擎与 LLM 的逻辑形式引导推理检索框架，用于构建事实问答与逻辑推理解决方案。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 47,372 / - | 隐私优先、自托管的知识工作空间，支持人与 AI Agent 协作，兼具笔记与知识库属性。 |

## 趋势信号分析

今日热榜最显著的信号是 **AI Agent 基础设施的爆发式关注**。Claude-BugHunter（+1826）、CLI-Anything（+1074）、superpowers（+1003）等项目集中登榜，表明社区正从“调用模型”转向“构建可编排、可外接的智能体工作流”，MCP 兼容技能库（stitch-skills）与 Agent-Native CLI 成为新范式。轻量级模型训练（minimind、tiny-llm）持续受追捧，降低了自建模型门槛，与近期端侧小模型和边缘推理需求上升相呼应。火狐（firecrawl）等面向 Agent 的数据基础设施单日新增近千 stars，说明检索增强与外部知识接入正成为 Agent 落地的瓶颈与机会点。暂未见全新技术栈首次登榜，但“Agent 即接口”的理念正渗透至编辑器插件（cursor/plugins）、CI/CD（opensre）与金融交易（Vibe-Trading）等垂直领域，与大模型能力向工具使用与自动化延伸的行业趋势高度一致。

## 社区关注热点

- **Claude-BugHunter**：今日 Trending 增速冠军，适合安全研究员与红队工作者快速构建基于 Claude Code 的自动化漏洞挖掘流程。
- **firecrawl**：Agent 时代的统一数据入口，支持 550+ 数据源，值得构建 RAG 或智能体应用的开发者重点评估。
- **minimind**：极低门槛的小模型训练项目，适合希望在短时间内理解完整 LLM 训练流程的开发者与学生。
- **KAG**：逻辑推理导向的 RAG 框架，适合需要事实准确性与复杂推理的企业级知识问答场景。
- **autoclip**：垂直 AI 应用代表，展示了生成式 AI 在视频内容再创作中的实用价值，适合内容创作者与自媒体团队。

---

## Trending top10项目

1. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python]
   ⭐ 0 | 今日 +1826
   面向漏洞挖掘与外部红队工作的 Claude Code 技能包——包含 84 项技能、15 条斜杠命令，以及跨 24 个核心漏洞类别策划的 681 个披露报告模式，外加企业身份与基础设施攻击矩阵。
2. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +1003
   一款好用的智能体技能框架与软件开发方法论。
3. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) [Python]
   ⭐ 0 | 今日 +1074
   “CLI-Anything：让所有软件都具备智能体原生能力”——CLI-Hub：https://clianything.cc/
4. [jingyaogong/minimind](https://github.com/jingyaogong/minimind) [Python]
   ⭐ 0 | 今日 +727
   🧠 两小时从零训练出你的 64M 大模型。从零开始在 2 小时内训练你自己的 64M LLM。
5. [cursor/plugins](https://github.com/cursor/plugins) [TypeScript]
   ⭐ 0 | 今日 +360
   Cursor 插件规范与官方插件
6. [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript]
   ⭐ 0 | 今日 +991
   让智能体更智能的知识基础设施。通过一个 API 搜索、抓取并访问 550 多个数据提供商。
7. [nginx/nginx](https://github.com/nginx/nginx) [C]
   ⭐ 0 | 今日 +158
   NGINX 开源版官方仓库。
8. [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) [C++]
   ⭐ 0 | 今日 +185
   OpenVINO™ 是一个用于优化和部署 AI 推理的开源工具包。
9. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +802
   面向 Claude Code、Codex、GitHub Copilot、Cursor、Factory Droid、Qoder 和 Pi 的编辑型图表设计。52 种图表类型。自包含 HTML + SVG。无阴影。无 Mermaid 垃圾。
10. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) [Python]
   ⭐ 0 | 今日 +703
   AI 智能体技能，可在 Reddit、X、YouTube、HN、Polymarket 和网络上调研任何主题，随后合成有依据的摘要。
