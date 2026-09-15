---
title: "AI 开源趋势日报"
published: 2026-09-15
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-09-15

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-15 09:46 UTC

---

# 《AI 开源趋势日报》2026-09-15

> 已过滤与 AI/ML 无关的通用工具（如 localsend、vaultwarden、ever-gauzy、flowsint、opendisplay 等），以下均为 AI 相关项目。

## 一、今日速览

今日 GitHub Trending 上 AI 项目约占三分之二，本地推理与 Agent 技能生态是最强主线。colibri 以纯 C 实现 MoE 流式推理，首日新增 2173 stars，让“在已有硬件上跑前沿模型”更近一步；VoiceStudio 单日新增 2776 stars，联合 YuE、VoxCPM 让音频生成赛道集中爆发。Agent 方向不再只谈框架，Agent-Reach 打通零 API 费全网访问，agent-skills 与 Claude-Red 分别从工程安全与攻防两侧建立技能规范。system_prompts_leaks 泄露 Claude Opus 5、GPT-6-Astra、Gemini 3.8 Flash 等前沿系统提示词，成为当日最受关注的模型透明性事件。

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

- [huggingface/transformers](https://github.com/huggingface/transformers) — ⭐166,146（今日 +536）  
  文本、视觉、音频、多模态统一建模框架，仍是 AI 基础设施的基石。

- [ollama/ollama](https://github.com/ollama/ollama) — ⭐181,014  
  本地运行 LLM 的首选工具，支持 Kimi、GLM、DeepSeek、Qwen、Gemma 等主流模型。

- [JustVugg/colibri](https://github.com/JustVugg/colibri) — ⭐N/A（今日 +2173）  
  纯 C、零依赖的 MoE 推理引擎，从磁盘流式加载专家权重，让前沿 MoE 模型跑在现有硬件上。

- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — ⭐180,596  
  面向 Agent/LLM 的网页搜索、抓取与交互 Context API。

- [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) — ⭐37,367  
  面向 Agent 与 Generative UI 的前端栈，支持 React、Angular、Mobile、Slack 等，是 AG-UI 协议的主要推动者。

- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — ⭐146,362  
  Agent 工程化平台，提供上下文管理、工具调用与工作流编排能力。

- [alibaba/open-code-review](https://github.com/alibaba/open-code-review) — ⭐N/A（今日 +1571）  
  阿里规模验证的混合架构代码评审工具：确定性流水线 + LLM Agent，可产出行级精准评论。

- [666ghj/MiroFish](https://github.com/666ghj/MiroFish) — ⭐N/A（今日 +560）  
  简洁通用的群体智能引擎，定位“预测万物”。

### 🤖 AI 智能体/工作流

- [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) — ⭐106,443（今日 +745）  
  多智能体 LLM 金融交易框架，今日热榜中最受关注的垂直 Agent 项目。

- [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) — ⭐N/A（今日 +651）  
  一个 CLI 让 Agent 读取/搜索 Twitter、Reddit、YouTube、GitHub、Bilibili、小红书，零 API 费用。

- [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) — ⭐N/A（今日 +512）  
  面向专业 AI 编码 Agent 的安全、可信技能注册中心，支持 Antigravity、Claude Code、Cursor、Copilot 等。

- [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) — ⭐N/A（今日 +579）  
  为 Claude 技能体系设计的攻击性安全技能库，每个技能均为结构化 SKILL.md，可用于红队和安全性研究。

- [affaan-m/ECC](https://github.com/affaan-m/ECC) — ⭐258,647  
  Agent Harness 性能优化系统，为 Claude Code、Codex、Cursor 等提供技能、记忆、安全与研究支持。

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — ⭐245,669  
  主打“与你一起成长”的 Agent 框架，社区影响力极高。

- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) — ⭐187,360  
  Agent 领域标杆项目，致力于让 AI Agent 对每个人可访问、可构建。

- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) — ⭐48,168  
  超轻量、自托管的个人 AI Agent 框架，支持 WebUI、工具、记忆、MCP 与多智能体工作流。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

- [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) — ⭐N/A（今日 +2776）  
  开源、完全本地的 ElevenLabs 替代品，支持语音克隆、语音设计、视频配音、转写与有声书生成。

- [open-webui/open-webui](https://github.com/open-webui/open-webui) — ⭐152,110  
  用户友好的自托管 AI 对话界面，兼容 Ollama、OpenAI API 等后端。

- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — ⭐123,796  
  利用 AI 大模型和自动化工作流，根据主题/关键词一键生成高清短视频。

- [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) — ⭐71,679  
  开源 AI 求职助手：扫描招聘平台、结构化评估职位、定制简历并跟踪申请。

- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) — ⭐65,092  
  LLM 驱动的多市场股票智能分析系统，支持多源行情、实时新闻、决策看板与自动推送。

- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) — ⭐54,476  
  AI 将文档或主题直接转为原生 PowerPoint，保留形状、动画、图表与动画效果。

- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) — ⭐51,809  
  AI 生产力工作台，集成智能聊天、自主 Agent 与 300+ 助手，统一接入前沿 LLM。

- [ruvnet/RuView](https://github.com/ruvnet/RuView) — ⭐N/A（今日 +383）  
  将普通 WiFi 信号转化为实时空间智能、生命体征监测与存在感知，无需摄像头。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

- [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) — ⭐N/A（今日 +559）  
  YuE2 前沿音乐生成模型，支持符号化规划、零样本翻唱与 Agent 化音乐编辑。

- [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) — ⭐N/A（今日 +216）  
  VoxCPM2 无 Tokenizer TTS 模型，支持多语言语音生成、创意语音设计与高保真克隆。

- [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) — ⭐N/A（今日 +764）  
  从 Anthropic（Claude Opus 5、Claude Code）、OpenAI（GPT-6-Astra、Codex）、Google（Gemini 3.8 Flash）等提取的系统提示词数据集。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

- [langgenius/dify](https://github.com/langgenius/dify) — ⭐155,796  
  在统一工作空间中构建 Agentic 工作流与 RAG 流水线，支持云、VPC 或自托管部署。

- [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) — ⭐138,268  
  收录 100+ 开源 AI Agents、Agent Skills 与 RAG 应用，是 LLM 应用开发的资源宝库。

- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) — ⭐116,856  
  将代码库、文档、SQL Schema、配置和 PDF 转换为可查询知识图谱，并支持 Claude Code、Cursor、Codex、Gemini 的 /graphify 技能。

- [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) — ⭐46,370  
  开源、隐私优先、自托管的知识工作空间，让人类与 AI Agent 在同一笔记/知识库中协作。

## 三、趋势信号分析

今日社区爆发性关注集中在两个方向：一是本地化/边缘化推理，二是 Agent 的“可执行技能”层。colibri 的纯 C 推理引擎和 VoiceStudio 的本地语音工作室说明，降低对云端 API 的依赖已成为主流诉求；Agent-Reach 进一步将全网数据接入成本降到零。另一个信号是技能注册表与安全技能包首次大面积登榜，agent-skills、Claude-Red 等让 Agent 从通用对话走向专业可复用工具。值得注意，system_prompts_leaks 这类“模型提示词泄露”内容成为新的开源数据品类，直接对应近期 Claude Opus 5、GPT-6-Astra、Gemini 3.8 Flash 的密集发布。多智能体金融交易（TradingAgents 今日 +745）继续验证 LLM Agent 在垂直场景的落地能力。

## 四、社区关注热点

- **本地 MoE 推理**：colibri 用纯 C/零依赖流式加载专家权重，是“消费级硬件跑大模型”的重要新尝试。
- **语音/音乐生成应用**：VoiceStudio、YuE2、VoxCPM2 集中发布，音频创作链正被重新定义。
- **Agent 技能标准化**：agent-skills 与 Claude-Red 分别从工程安全和攻防两端定义 Agent 技能的交付与安全规范。
- **系统提示词泄露**：system_prompts_leaks 为研究前沿模型行为、prompt 注入风险提供了稀有数据。
- **多智能体金融**：TradingAgents 单日 +745 stars，说明 LLM 多智能体框架在垂直金融领域仍有极高热度。

---

## Trending top10项目

1. [JustVugg/colibri](https://github.com/JustVugg/colibri) [C]
   ⭐ 0 | 今日 +2173
   在现有硬件上运行前沿MoE模型——纯C语言，零依赖，专家从磁盘流式加载。小巧引擎，庞大模型。🐦
2. [alibaba/open-code-review](https://github.com/alibaba/open-code-review) [Go]
   ⭐ 0 | 今日 +1571
   快速高效，在阿里巴巴规模下经受过实战考验。混合架构代码审查工具：确定性流水线+LLM智能体，精确到行的注释，内置多语言规则集（NPE、线程安全、XSS、SQL注入），兼容OpenAI和Anthropic。
3. [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) [Python]
   ⭐ 0 | 今日 +559
   YuE2：前沿音乐生成，支持符号规划、零样本翻唱和智能体音乐编辑。
4. [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) [Python]
   ⭐ 0 | 今日 +2776
   VoiceStudio 是开源、完全本地的 ElevenLabs 替代品——支持语音克隆、语音设计、视频配音、听写、转录及646种语言的有声书创作。
5. [666ghj/MiroFish](https://github.com/666ghj/MiroFish) [Python]
   ⭐ 0 | 今日 +560
   简洁通用的群体智能引擎，预测万物
6. [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) [Python]
   ⭐ 0 | 今日 +651
   让你的AI智能体拥有观察整个互联网的眼睛。读取和搜索Twitter、Reddit、YouTube、GitHub、Bilibili、小红书——一个命令行工具，零API费用。
7. [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) [JavaScript]
   ⭐ 0 | 今日 +764
   从Anthropic提取的系统提示词——Claude Fable 5.1、Opus 5、Claude Design、Claude Code。OpenAI——ChatGPT GPT-6-Astra、Codex。Google——Gemini 3.8 Flash、3.1 Pro、Antigravity。xAI——Grok、Grok Bot、Cursor、Kimi等！定期更新。
8. [rlaope/oh-my-hermes](https://github.com/rlaope/oh-my-hermes) [Python]
   ⭐ 0 | 今日 +77
   Hermes Agent 的全能插件 ⚚ 编码智能、长期记忆系统和模型优化的工作流包。
9. [localsend/localsend](https://github.com/localsend/localsend) [Dart]
   ⭐ 0 | 今日 +251
   AirDrop 的开源跨平台替代方案。
10. [dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden) [Rust]
   ⭐ 0 | 今日 +115
   非官方的 Bitwarden 兼容服务器，用 Rust 编写，前身为 bitwarden_rs。
