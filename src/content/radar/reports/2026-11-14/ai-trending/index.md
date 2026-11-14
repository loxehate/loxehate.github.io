---
title: "AI 开源趋势日报"
published: 2026-11-14
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-14

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-14 00:01 UTC

---

# AI 开源趋势日报（2026-11-14）

## 今日速览

今日 AI 开源生态呈现明显的“Agent 基础设施化”趋势，安全审查、浏览器自动化、终端编码助手等垂直 Agent 工具在 Trending 榜单中爆发，OpenAI 与 Google 等大厂相继开源面向 Coding Agent 的 CLI 与 MCP 组件。股票分析、交易等垂直金融 Agent 保持高增速，体现开发者正将 LLM 能力下沉至具体业务场景。同时，Dify、LangChain 等工作流平台与 Ollama、Transformers 等模型引擎继续稳居核心基础设施位置。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [ollama/ollama](https://github.com/ollama/ollama) | 186,895 / — | 本地大模型运行引擎，支持 Kimi、DeepSeek、Qwen 等多模型一键部署，是本地 AI 开发的事实标准 CLI。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | 149,470 / — | Agent 工程平台，提供构建 LLM 应用的完整抽象层与生态集成，持续是社区最活跃的 AI 框架之一。 |
| [openai/codex-security](https://github.com/openai/codex-security) | — / +751 | OpenAI 官方安全 CLI 与 TypeScript SDK，用于自动发现、验证并修复代码漏洞，标志着大厂开始输出面向安全 Agent 的工程化组件。 |
| [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp) | — / +67 | 为 Coding Agent 提供 Chrome DevTools 能力的 MCP 服务器，让 AI 编程助手可直接操作浏览器调试工具。 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | — / +215 | 阿里开源的代码审查工具，采用“确定性流水线 + LLM Agent”混合架构，实现行级精准评论，适合大规模工程落地。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | 120,953 / — | 开源 Python 浏览器 Agent 库，提供无头浏览器自动化与云端 Agent API，是构建 Web 操作类 Agent 的核心底层库。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [NousResearch/here­mes-agent](https://github.com/NousResearch/hermes-agent) | 263,222 / — | 可随用户成长的个人 AI Agent，主打长期记忆与个性化协作，社区关注度极高。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | 302,454 / — | Agent Harness 性能优化系统，为 Claude Code、Codex、Cursor 等提供技能、本能与记忆增强，侧重 Agent 工程性能。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | 201,583 / — | 为 AI Agent 提供网页数据采集库，支持从互联网提取结构化信息，是 Agent 联网能力的关键基础设施。 |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 38,692 / — | 前端 Agent 与生成式 UI 栈，推动 AG-UI 协议，支持 React、Angular、Mobile 等多端 Agent 嵌入。 |
| [backnotprop/plannotator](https://github.com/backnotprop/plannotator) | — / +108 | Agent 工作空间，支持规划、决策、代码审查与团队反馈回传给 Agent，强调人机协作闭环。 |
| [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | 47,918 / — | 开源个人 AI 助手与 Agent 框架，支持多模型、多智能体、任务规划与自我进化记忆。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | 71,573 / +256 | LLM 驱动的多市场股票智能分析系统，整合行情、新闻与决策看板，支持零成本定时运行，今日 Trending 双榜并列。 |
| [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) | — / +69 | 面向股票投资者与交易员的 Claude Code 技能集，涵盖市场分析、K线图表、经济日历与选股策略。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 76,586 / — | AI 将文档或主题转换为原生 PowerPoint 幻灯片，支持图表、动画与音频，适合办公自动化场景。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 143,296 / — | 基于大模型与自动化工作流一键生成高清短视频，面向内容创作者与自媒体垂直场景。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | 68,249 / — | 本地优先的全能 AI 应用，集成 Agent 体验与知识管理，适合希望自建私有智能助手的团队。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [huggingface/transformers](https://github.com/huggingface/transformers) | 168,951 / — | 业界领先的模型定义与推理框架，覆盖文本、视觉、音频与多模态模型，是 NLP/AI 开发的核心基础库。 |
| [f/prompts.chat](https://github.com/f/prompts.chat) | 177,092 / — | 社区驱动的 Prompt 收集与共享平台，支持自托管，为大模型调优与应用开发提供提示词资产。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日） | 一句话说明 |
|------|-------------------|-----------|
| [langgenius/dify](https://github.com/langgenius/dify) | 161,118 / — | 一体化 Agentic 工作流与 RAG 流水线平台，支持云端/VPC/自托管，是企级构建 AI 应用的热门协作工作空间。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | 158,585 / — | 用户友好的 AI 界面，兼容 Ollama 与 OpenAI API，提供本地模型管理与对话体验，适合自建知识助手。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | 47,216 / — | 隐私优先的自托管知识工作空间，支持人与 AI Agent 协作，兼具笔记、知识库与 Agent 集成功能。 |

## 趋势信号分析

今日热榜显示，**面向 Coding Agent 的基础设施组件**正获得社区爆发式关注：OpenAI 发布 codex-security、GoogleChrome 发布面向 coding agent 的 Web 指导源、ChromeDevTools 推出 DevTools MCP，三者均指向同一方向——将大模型能力以 CLI、MCP 和协议形式标准化输出，供 AI 编程助手直接调用。这反映出行业已从“聊天机器人”转向“工具使用型 Agent”，安全审查、浏览器自动化与终端编码成为首批落地场景。

在技术栈方面，**MCP（Model Context Protocol）与 Agent Harness** 成为新兴关键词，多个项目明确提及与 Claude Code、Codex、Cursor 的集成，暗示标准化 Agent 接口正在形成。与近期大模型发布（如 gpt-oss、Qwen、DeepSeek 等模型在 Ollama 中被快速支持）相关联，开发者正迅速将新模型接入本地推理与 Agent 工作流，形成“模型即插即用 + Agent 即服务”的闭环。

## 社区关注热点

- **[openai/codex-security](https://github.com/openai/codex-security)**：OpenAI 官方下场做安全 Agent CLI，值得关注其漏洞自动修复能力在真实工程中的表现。
- **[ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)**：首个将浏览器调试能力以 MCP 形式暴露给 Agent 的项目，可能重塑 AI 编程助手与前端调试的交互方式。
- **[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)**：今日 Trending 双榜并列，LLM 驱动的垂直金融分析在零成本自动化运行上的探索值得参考。
- **[langgenius/dify](https://github.com/langgenius/dify)**：持续高热度的 RAG + Agent 工作流平台，适合企业快速构建内部 AI 应用，是落地场景的风向标。
- **[ollama/ollama](https://github.com/ollama/ollama)**：本地模型运行的事实标准，新模型（gpt-oss、Qwen 等）的快速适配使其成为个人与团队私有化 AI 的首选入口。

---

## Trending top10项目

1. [alibaba/open-code-review](https://github.com/alibaba/open-code-review) [Go]
   ⭐ 0 | 今日 +215
   安全、快速、高效，经阿里巴巴规模验证。混合架构代码评审工具：确定性流水线 + LLM Agent，精确行级评论，内置多语言规则集（NPE、线程安全、XSS、SQL 注入），兼容 OpenAI 与 Anthropic。
2. [GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src) [TypeScript]
   ⭐ 0 | 今日 +1925
   让你的编码代理始终掌握最新 Web 最佳实践
3. [openai/codex-security](https://github.com/openai/codex-security) [TypeScript]
   ⭐ 0 | 今日 +751
   OpenAI Codex Security CLI 和 TypeScript SDK，用于查找、验证和修复安全漏洞。npm: https://www.npmjs.com/package/@openai/codex-security
4. [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) [Python]
   ⭐ 0 | 今日 +256
   LLM 驱动的多市场股票智能分析系统：多源行情、实时新闻、决策看板与自动推送，支持零成本定时运行。
5. [we-promise/sure](https://github.com/we-promise/sure) [Ruby]
   ⭐ 0 | 今日 +925
   所有人的个人理财应用（由所有人共建）
6. [backnotprop/plannotator](https://github.com/backnotprop/plannotator) [TypeScript]
   ⭐ 0 | 今日 +108
   与代理协同的工作区：塑造、决定、规划、标注、评审代码、与团队共享，并一键将所有反馈发送给代理。
7. [louislam/uptime-kuma](https://github.com/louislam/uptime-kuma) [JavaScript]
   ⭐ 0 | 今日 +71
   一款精美的自托管监控工具
8. [block/buzz](https://github.com/block/buzz) [Rust]
   ⭐ 0 | 今日 +97
   蜂群思维通信平台
9. [tradermonty/claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) [Python]
   ⭐ 0 | 今日 +69
   面向股票投资者和交易者的 Claude Code 技能：市场分析、技术图表、经济日历、筛选器和交易策略开发。
10. [tailscale/tailcat](https://github.com/tailscale/tailcat) [Go]
   ⭐ 0 | 今日 +256
   类似 netcat，但通过 Tailscale 数据平面传输，无需 Tailscale 控制平面
