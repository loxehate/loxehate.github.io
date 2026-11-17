---
title: "AI 开源趋势日报"
published: 2026-11-17
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-17

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-17 00:00 UTC

---

# AI 开源趋势日报（2026-11-17）

## 今日速览

今日 GitHub AI 开源生态呈现明显的“智能体工程化”趋势，Agent 技能（Skill）、交互协议（如 AG-UI、MCP）与评估框架（如 NVIDIA SkillEvaluator）集中爆发，开发者正从大模型调用转向构建可落地的 Agent 工作流。办公、交易、代码审查等垂直场景的 AI Agent 技能登上今日热榜，显示“Agent 化”正快速渗透至专业领域。与此同时，TensorFlow、PyTorch、Transformers 等经典 ML 基础框架依然保持高关注度，社区对模型训练与推理基础设施的需求持续稳固。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | 201,606 / — | Google 官方开源机器学习框架，今日依然位列 ML 主题搜索前茅，是工业级模型训练与部署的基础设施。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | 169,078 / — | 状态最前沿的模型定义框架，支持文本、视觉、音频与多模态模型，是大模型微调与推理的事实标准。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | 105,582 / — | 张量计算与动态神经网络库，GPU 加速能力强大，今日在 ML 主题搜索中保持高热度。 |
| [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) | 68,205 / — | Python 机器学习经典库，涵盖分类、回归、聚类等常用算法，适合传统 ML 与快速原型开发。 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | 0 / +951 | 阿里巴巴开源的代码审查工具，采用“确定性流水线 + LLM Agent”混合架构，提供精确行级评论，今日 Trending 增幅显著。 |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | 0 / +841 | 面向编码 Agent 的 Chrome DevTools MCP 服务器，让 AI 编程助手能直接调用浏览器开发者工具能力，今日新增 841 颗星。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) | 0 / +791 | Agent-User Interaction 协议，旨在将 AI Agent 带入前端应用，今日 Trending 新增 791 颗星，标志着 Agent 与前端交互协议开始受到社区关注。 |
| [backnotprop/plannotator](https://github.com/backnotprop/plannotator) | 0 / +696 | Agent 工作空间，支持规划、决策、代码审查与团队协作反馈，今日新增 696 颗星，体现对 Agent 协作环境的需求。 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | 0 / +529 | 适配 Stitch MCP 服务器的 Agent 技能库，遵循 Agent Skills 开放标准，今日新增 529 颗星，推动 Agent 技能标准化。 |
| [NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator) | 0 / +873 | 多层级 AI Agent 技能与插件评估框架，支持质量门禁、语义重叠检测与合成数据集生成，今日新增 873 颗星。 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 38,739 / — | Agent 与生成式 UI 的前端技术栈，支持 React、Angular、Mobile 等，是 AG-UI 协议的背后推手，连接 Agent 与前端界面。 |
| [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale) | 41,184 / — | 用 Rust 编写的终端开源编码 Agent，支持任务拆分与多模型协作，适合终端原生 AI 开发工作流。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [dream-num/univer](https://github.com/dream-num/univer) | 0 / +1828 | AI 办公 SDK，支持文档编辑、计算、协作与文件处理，今日 Trending 新增 1828 颗星，是办公场景 AI 化的代表项目。 |
| [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | 0 / +837 | 面向股票投资者与交易员的 Claude Code 技能集，涵盖市场分析、技术图表、经济日历与筛选器，今日新增 837 颗星。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 77,524 / — | AI 将文档或主题转换为原生 PowerPoint 幻灯片，支持形状、动画、数据图表与音频，属于垂直内容生成应用。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 72,797 / — | LLM 驱动的多市场股票智能分析系统，支持多源行情、实时新闻与自动推送，适合零成本定时运行。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 47,264 / — | 隐私优先、自托管的知识工作空间，支持人与 AI Agent 协作，兼具笔记与知识管理能力。 |
| [kajisho5/ffmpeg-skill](https://github.com/kajisho5/ffmpeg-skill) | 0 / +367 | 面向编码 Agent 的本地视频编辑器，提供 42 个 FFmpeg 工具与 MCP 服务器，适用于 Claude Code、Cursor 与 Codex，今日新增 367 颗星。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | 63,495 / — | YOLO 系列目标检测与分割框架（YOLOv8–YOLO27），今日在 ML 主题搜索中保持高热度，适合计算机视觉模型训练与部署。 |
| [roboflow/supervision](https://github.com/roboflow/supervision) | 51,641 / — | 可复用的计算机视觉工具集，简化目标检测、分割与跟踪的工程化落地，适合视觉模型训练后处理。 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | 79,159 / — | AI 工程从零到一的教程与实践指南，涵盖模型构建、训练与部署，适合开发者快速入门大模型工程化。 |
| [microsoft/AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners) | 70,927 / — | 微软官方 AI 入门课程，12 周 24 课时，面向初学者系统讲解 AI 基础概念与实践。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 47,264 / — | 隐私优先自托管知识工作空间，支持人机协作，适合构建个人知识库与 RAG 应用底座。 |
| [openbq-org/OpenBB](https://github.com/openbq-org/OpenBB) | 75,472 / — | 面向分析师、量化交易员与 AI Agent 的开源数据平台，支持金融数据检索与增强分析，具备 RAG 场景潜力。 |
| [f/prompts.chat](https://github.com/f/prompts.chat) | 177,674 / — | 社区驱动的 Prompt 分享与发现平台，可用于优化 RAG 检索提示词与 Agent 指令工程。 |

## 趋势信号分析

今日热榜显示，**AI Agent 技能与交互协议**正获得社区爆发式关注。AG-UI 协议、Stitch Skills、NVIDIA SkillEvaluator 等项目集中登榜，表明开发者正从单一大模型调用转向构建可评估、可编排、可前端交互的 Agent 工作流。**MCP（Model Context Protocol）与 Agent Skills 标准**成为新兴技术栈，多个项目（如 chrome-devtools-mcp、ffmpeg-skill）围绕此展开，标志着 AI Agent 与外部工具、浏览器、多媒体能力的深度集成开始成型。在垂直应用层，AI 办公（Univer）、交易分析（claude-trading-skills、daily_stock_analysis）与代码审查（open-code-review）等领域的 Agent 技能项目今日增幅显著，与近期大模型在代码理解、金融推理与多模态处理能力的提升密切相关。整体来看，2026 年下半年的 AI 开源热点已从“模型本身”向“Agent 工程化与垂直场景落地”显著偏移。

## 社区关注热点

- **[ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)**：Agent 与前端交互的开放协议，今日新增 791 颗星，值得前端与 AI 全栈开发者重点关注，可能成为下一代 AI 原生应用的接口标准。
- **[NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator)**：NVIDIA 推出的 Agent 技能评估框架，今日新增 873 颗星，为企业级 Agent 落地提供质量门禁与合成数据能力，适合构建可信 AI Agent 的团队。
- **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)**：阿里巴巴开源的 LLM Agent 代码审查工具，今日新增 951 颗星，混合架构（确定性流水线 + LLM）兼顾精度与可控性，适合工程团队落地 AI 辅助代码审查。
- **[dream-num/univer](https://github.com/dream-num/univer)**：AI 办公 SDK，今日新增 1828 颗星，是 Trending 榜单增幅最大的 AI 项目，预示着 AI 原生办公协作正成为高增长赛道。
- **[tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) / [pytorch/pytorch](https://github.com/pytorch/pytorch)**：经典 ML 框架依然保持极高关注度，适合需要稳定训练与推理基础设施的开发者持续跟踪。

---

## Trending top10项目

1. [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) [TypeScript]
   ⭐ 0 | 今日 +791
   AG-UI：代理-用户交互协议。将代理引入前端应用。
2. [backnotprop/plannotator](https://github.com/backnotprop/plannotator) [TypeScript]
   ⭐ 0 | 今日 +696
   与代理保持同步并掌控局面的工作空间——塑造、决定、规划、标注、审查代码、与团队共享，并一键将所有反馈发送给代理。
3. [dream-num/univer](https://github.com/dream-num/univer) [TypeScript]
   ⭐ 0 | 今日 +1828
   使用 Univer Office SDK 构建您自己的 AI 办公室。将编辑、计算、协作和文件处理引入您的产品，供人类和 AI 代理使用。基于可扩展的开源核心构建。
4. [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) [Python]
   ⭐ 0 | 今日 +837
   面向股票投资者和交易者的 Claude Code 技能——市场分析、技术图表、经济日历、筛选器和交易策略开发。
5. [getarcaneapp/arcane](https://github.com/getarcaneapp/arcane) [Go]
   ⭐ 0 | 今日 +46
   面向所有人的现代 Docker 管理工具
6. [DeanChensj/jiangshan-map](https://github.com/DeanChensj/jiangshan-map) [JavaScript]
   ⭐ 0 | 今日 +288
   江山时序 · 中国历史交互地图时间轴（公元前 403 年 – 至今）| 中国历史交互地图集，涵盖 18 个朝代、198 个疆域快照、古今地名谱系及古典诗词路线
7. [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) [TypeScript]
   ⭐ 0 | 今日 +529
   专为与 Stitch MCP 服务器协作而设计的代理技能库。每项技能均遵循代理技能开放标准，兼容 Antigravity、Gemini CLI、Claude Code、Cursor 等编码代理。
8. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) [Python]
   ⭐ 0 | 今日 +135
   AI 代理技能，可在 Reddit、X、YouTube、HN、Polymarket 和网络上研究任何主题，然后综合生成有依据的摘要。
9. [NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator) [Python]
   ⭐ 0 | 今日 +873
   多层框架，用于评估 AI 代理技能和插件，包含质量门控、语义重叠检测、合成评估数据集生成，以及可衡量技能对代理行为影响的实时代理评估。
10. [alibaba/open-code-review](https://github.com/alibaba/open-code-review) [Go]
   ⭐ 0 | 今日 +951
   安全、快速、高效，经阿里巴巴规模验证。混合架构代码审查工具：确定性流水线 + LLM 代理，精确行级注释，内置多语言规则集（NPE、线程安全、XSS、SQL 注入），兼容 OpenAI 与 Anthropic。
