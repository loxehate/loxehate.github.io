---
title: "AI 开源趋势日报"
published: 2026-11-16
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-16

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-16 00:00 UTC

---

# AI 开源趋势日报（2026-11-16）

## 今日速览

今日 GitHub AI 开源生态呈现明显的 **Agent 基础设施爆发** 态势。Trending 榜单被 Agent 交互协议（ag-ui）、Agent 技能库（stitch-skills、claude-trading-skills）、Agent 工作流（LoopForge、plannotator）及编码 Agent 工具（chrome-devtools-mcp、open-code-review）占据，显示社区正从大模型本体转向 Agent 编排、协议标准与垂直技能场景。RAG 与知识库方向保持高活跃度，ragflow、crawl4ai、llama_index 等项目持续获得关注。AI 边缘推理与本地部署（ggml、tiny-llm、picollm）亦是今日值得关注的细分赛道。

---

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [ggml-org/ggml](https://github.com/ggml-org/ggml) | - / +43 | 轻量级机器学习张量库，支持本地 LLM 推理，是边缘设备运行大模型的核心基础设施。 |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | - / +717 | 为编码 Agent 提供 Chrome DevTools 能力，让 AI 编程助手可直接调试前端页面，今日新增星标显著。 |
| [GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) | - / +1219 | 为编码 Agent 提供最新 Web 最佳实践指南，助力 AI 生成代码符合现代 Web 标准。 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | - / +691 | 阿里巴巴开源的代码审查工具，融合确定性流水线与 LLM Agent，支持行级精准评论，适合大规模工程落地。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9,154 / - | 用 Rust 构建模块化、可扩展的 LLM 应用框架，适合对性能与类型安全有要求的 AI 开发场景。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) | - / +355 | Agent-User Interaction 协议，旨在将 AI Agent 带入前端应用，定义 Agent 与用户界面的交互标准。 |
| [backnotprop/plannotator](https://github.com/backnotprop/plannotator) | - / +866 | Agent 协作工作空间，支持规划、决策、代码审查与团队反馈回传，今日新增星标最高。 |
| [Tencent/LoopForge](https://github.com/Tencent/LoopForge) | - / +423 | 面向编码 Agent 交付的自托管工作流，支持 CodeBuddy、Codex、Claude Code 编排与人工审批门禁。 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | - / +247 | 适配 Stitch MCP 服务器的 Agent 技能库，遵循 Agent Skills 开放标准，便于编码 Agent 复用能力。 |
| [Eigenwise/atomic-agents](https://github.com/Eigenwise/atomic-agents) | 6,329 / - | 原子化构建 AI Agent 的框架，强调模块化与可组合性，适合构建复杂多智能体系统。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,576 / - | Agent 工程平台，持续演进为 LLM 应用开发的事实标准框架之一。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [dream-num/univer](https://github.com/dream-num/univer) | - / +988 | 基于 Univer Office SDK 构建 AI 办公产品，支持文档、表格、协作与文件处理，面向人类与 AI Agent。 |
| [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | - / +706 | 面向股票投资者与交易者的 Claude Code 技能集，涵盖市场分析、技术图表、经济日历与策略开发。 |
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | - / +98 | Claude Code 漏洞猎杀技能包，包含 82 项技能、15 个斜杠命令及 681 个披露报告模式，适用于红队工作。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | 53,546 / - | AI 工作空间，整合模型、Agent 与生产力工具，提供本地优先的 Agent 体验。 |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | 59,479 / - | 终身个性化辅导系统，基于 LLM 构建教育垂直 AI 应用。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,743 / - | 针对 Apple Silicon 构建的微型 LLM 推理系统（类 vLLM + Qwen），适合系统工程师学习推理引擎原理。 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | 320 / - | 基于 X-Bit 量化的端侧 LLM 推理库，适合设备侧私有化部署。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,595 / - | LLM 评测平台，支持 OpenAI、Anthropic、Gemini、Qwen、GLM、DeepSeek 等 100+ 数据集，是模型能力评估的重要工具。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | 94,194 / - | Agent 原生数据库与 RAG 引擎，已发展为上下文基础设施，适合构建复杂检索增强应用。 |
| [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | 87,401 / - | 面向 AI Agent 的网页抓取、提取与搜索 API，提供免费额度，是 RAG 数据采集的热门开源选择。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | 52,912 / - | 文档处理平台与 RAG 框架，支持多种向量数据库与数据源，是构建知识助手的核心组件。 |
| [pathwaycom/serviette](https://github.com/pathwaycom/serviette) | 58,704 / - | 无代码 RAG 服务器，支持 8 种向量数据库，可随文档同步更新答案，降低 RAG 应用门槛。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | 117,367 / - | 为每个 Agent 提供跨会话持久化上下文，通过 AI 压缩会话内容并注入相关上下文，解决 Agent 记忆问题。 |

---

## 趋势信号分析

今日热榜显示，**Agent 基础设施与协议标准**正获得社区爆发式关注。ag-ui（Agent-User Interaction 协议）、stitch-skills（Agent 技能库）及 LoopForge（Agent 交付工作流）等项目集中登榜，表明开发者正从单点模型调用转向构建标准化、可编排的 Agent 体系。编码 Agent 工具（chrome-devtools-mcp、modern-web-guidance、open-code-review）的高增速，反映出 AI 原生开发流程（AI-Native SDLC）正在加速落地。垂直领域方面，Claude-BugHunter（安全）与 claude-trading-skills（金融）的出现，显示 Agent 技能正向专业场景深度渗透。RAG 方向则保持稳健，ragflow、crawl4ai、claude-mem 等聚焦“检索+记忆+上下文管理”，与近期大模型长上下文与多模态能力发布形成互补，社区正在补齐 Agent 生产环境所需的知识基础设施。

---

## 社区关注热点

- **[ag-ui](https://github.com/ag-ui-protocol/ag-ui)**：Agent 与前端交互的新协议，若被广泛采纳，有望成为 Web AI 应用的交互标准，前端开发者值得提前布局。
- **[LoopForge](https://github.com/Tencent/LoopForge)**：腾讯开源的编码 Agent 工作流，引入人工审批门禁，适合企业级 Agent 交付场景，自托管属性受关注。
- **[claude-mem](https://github.com/thedotmack/claude-mem)**：解决 Agent 跨会话记忆缺失的痛点，11.7 万星显示社区对持久化上下文的强烈需求。
- **[ggml](https://github.com/ggml-org/ggml)**：端侧推理引擎持续活跃，适合希望在 Apple Silicon 或边缘设备上部署 LLM 的开发者。
- **[open-code-review](https://github.com/alibaba/open-code-review)**：阿里巴巴的 LLM Agent 代码审查工具，混合架构（确定性流水线 + LLM）可直接参考用于企业代码质量治理。

---

## Trending top10项目

1. [dream-num/univer](https://github.com/dream-num/univer) [TypeScript]
   ⭐ 0 | 今日 +988
   使用 Univer Office SDK 构建自己的 AI 办公应用。将编辑、计算、协作和文件处理功能集成到您的产品中，供人类和 AI 代理使用。基于可扩展的开源核心构建。
2. [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui) [TypeScript]
   ⭐ 0 | 今日 +355
   AG-UI：代理-用户交互协议。将代理引入前端应用程序。
3. [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) [TypeScript]
   ⭐ 0 | 今日 +247
   专为与 Stitch MCP 服务器协作而设计的 Agent 技能库。每个技能均遵循 Agent 技能开放标准，兼容 Antigravity、Gemini CLI、Claude Code、Cursor 等编码代理。
4. [backnotprop/plannotator](https://github.com/backnotprop/plannotator) [TypeScript]
   ⭐ 0 | 今日 +866
   一个用于掌控代理的工作空间——塑造、决定、规划、标注、审查代码、与团队共享，并一键将所有反馈发送给代理。
5. [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) [TypeScript]
   ⭐ 0 | 今日 +717
   面向编码代理的 Chrome DevTools
6. [alibaba/open-code-review](https://github.com/alibaba/open-code-review) [Go]
   ⭐ 0 | 今日 +691
   安全、快速、高效，经阿里巴巴规模验证。混合架构代码审查工具：确定性流水线 + LLM 代理，精确行级注释，内置多语言规则集（NPE、线程安全、XSS、SQL 注入），兼容 OpenAI 和 Anthropic。
7. [Tencent/LoopForge](https://github.com/Tencent/LoopForge) [Go]
   ⭐ 0 | 今日 +423
   面向编码代理交付的自托管工作流。通过脚本和人工审批门禁编排 CodeBuddy、Codex 和 Claude Code。包含面向编码助手的本地工作流。
8. [ggml-org/ggml](https://github.com/ggml-org/ggml) [C++]
   ⭐ 0 | 今日 +43
   机器学习张量库
9. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python]
   ⭐ 0 | 今日 +98
   用于漏洞挖掘和外部红队工作的 Claude Code 技能包——82 个技能，15 个斜杠命令，涵盖 24 个核心漏洞类别的 681 个披露报告模式，外加企业身份与基础设施攻击矩阵。
10. [GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) [TypeScript]
   ⭐ 0 | 今日 +1219
   让您的编码代理始终掌握最新的 Web 最佳实践
