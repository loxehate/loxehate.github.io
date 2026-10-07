---
title: "AI 开源趋势日报"
published: 2026-10-07
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-10-07

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-10-07 00:00 UTC

---

# 《AI 开源趋势日报》｜2026-10-07

> 筛选口径：Trending 中已排除 `tester-army/e2e`、`boykopovar/AnyPS5`、`DuarteSantos8/openGym` 等非 AI 项目；`Front-End-Checklist` 主要是一般前端清单，不计入 AI 核心。Trending 原始总 stars 显示为 0，因此 Trending-only 项目以“今日新增”为主；主题搜索项目使用其总 stars。

## 1. 今日速览

1. 今日 AI 热榜由“智能体工程化”主导：`rea` 以 +2956 成为 AI 相关新增最高项目，`claude-mem`、`agency-agents`、`skills` 等围绕 agent 记忆、技能封装与组织协作集中上榜。
2. 编码智能体工具链继续细分：设计语言、输出可读性、token 压缩、CAD/图表技能等“非模型层”创新密集出现。
3. 基础设施侧，`DeepGEMM`、`Transformers`、`Ollama` 代表训练/推理底座仍获稳定关注；Ollama 已覆盖 Kimi、GLM、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等模型。
4. RAG 正从向量检索扩展到知识图谱与网页/代码数据供给，`Graphify`、`Firecrawl`、`claude-mem` 成为 agent 记忆与数据供给关键。
5. 垂直应用继续向金融、招聘、PPT、CAD、视频、交易、逆向工程扩散，LLM 正从通用聊天进入可计价工作流。

## 2. 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

- [ollama/ollama](https://github.com/ollama/ollama) — ⭐182,396 — 本地运行 Kimi、GLM、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等模型的入口，是开发者快速试跑新模型的首选 CLI。
- [huggingface/transformers](https://github.com/huggingface/transformers) — ⭐167,000 — 模型定义/推理/训练框架，覆盖文本、视觉、音频和多模态，仍是模型生态底座。
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — ⭐147,500 — Agent 工程平台，连接模型、工具、RAG 与工作流。
- [deepseek-ai/DeepGEMM](https://github.com/deepseek-ai/DeepGEMM) — ⭐0（Trending 展示；今日 +199）— 面向 GPU 的高效 BLAS kernel 库，服务大模型训练/推理性能优化。
- [open-webui/open-webui](https://github.com/open-webui/open-webui) — ⭐154,097 — 用户友好的自托管 AI 界面，兼容 Ollama、OpenAI API。
- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) — ⭐52,401 — AI 生产力工作台，统一接入前沿 LLM，含智能聊天、自主 agent、300+ 助手。
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — ⭐274,288 — Agent harness 性能优化系统，覆盖技能、本能、记忆、安全与研究优先开发。
- [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) — ⭐110,214 — 通过“原始人语言”压缩编码 agent token，宣传节省 65% token，直击 agent 成本痛点。

### 🤖 AI 智能体/工作流

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — ⭐251,691 — “伴随你成长”的 agent，代表长期记忆与个性化智能体方向。
- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) — ⭐187,672 — 自主 agent 鼻祖，仍是大规模自动化与 agent 可访问性的参照项目。
- [langgenius/dify](https://github.com/langgenius/dify) — ⭐157,970 — Agentic 工作流与 RAG 管线协作平台，支持多模型、云/自托管部署。
- [browser-use/browser-use](https://github.com/browser-use/browser-use) — ⭐117,285 — 让 agent 操作浏览器，是 Web 自动化与联网数据获取的热门基座。
- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) — ⭐48,827 — 超轻量自托管个人 agent 框架，含 WebUI、工具、记忆、MCP、多 agent 工作流。
- [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) — ⭐47,252 — 个人 AI 助手与 Agent Harness，支持任务规划、工具技能、记忆知识自进化。
- [morluto/rea](https://github.com/morluto/rea) — ⭐0（Trending 展示；今日 +2956）— 用 agent 逆向工程应用行为乃至原生二进制，今日新增最高的 AI 相关 Trending。
- [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) — ⭐0（Trending 展示；今日 +623）— 一键组成 AI agency，覆盖前后端、社区运营、创意与现实检查等专业 agent。

### 📦 AI 应用

- [f/prompts.chat](https://github.com/f/prompts.chat) — ⭐172,198 — 老牌 ChatGPT Prompts 社区，支持分享、发现与组织自托管提示词库。
- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — ⭐128,848 — 利用 AI 大模型和自动化工作流，根据主题/关键词一键生成高清短视频。
- [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) — ⭐73,640 — 开源 AI 求职 agent，扫描职位、按 CV 评分、定制 ATS 简历与求职信。
- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) — ⭐65,971 — LLM 驱动多市场股票分析，含多源行情、实时新闻、决策看板与自动推送。
- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) — ⭐57,878 — 把文档或主题转为原生 PowerPoint，含形状、转场、动画、图表与音频。
- [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) — ⭐34,872 — 个人交易 agent，代表金融垂直场景中的 LLM 自动化。
- [earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad) — ⭐0（Trending 展示；今日 +619）— 给 agent 增加 CAD 超能力，文本到工程建模方向值得关注。
- [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) — ⭐0（Trending 展示；今日 +228）— 面向 Claude Code、Codex、Copilot 等的编辑级图表设计，42 种图类型，HTML+SVG。

### 🧠 大模型/训练

- [huggingface/transformers](https://github.com/huggingface/transformers) — ⭐167,000 — 模型定义框架，训练、推理、微调生态核心。
- [deepseek-ai/DeepGEMM](https://github.com/deepseek-ai/DeepGEMM) — ⭐0（Trending 展示；今日 +199）— GPU BLAS kernel 库，提升大模型矩阵计算效率。
- [ollama/ollama](https://github.com/ollama/ollama) — ⭐182,396 — 本地运行 Kimi、GLM、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等模型，连接模型发布与开发者试跑。

### 🔍 RAG/知识库

- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — ⭐189,204 — 为 AI agent 抓取网站与网页数据，是 RAG/联网数据供给层。
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) — ⭐124,413 — 将代码库、文档、SQL schema、配置、PDF 转成可查询知识图谱，支持 Claude Code、Cursor、Codex、Gemini。
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — ⭐97,155（RAG 搜索）；今日 +534（Trending）— 跨会话持久上下文，捕获会话、AI 压缩并注入相关记忆。
- [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) — ⭐46,654 — 隐私优先、自托管知识工作空间，强调人与 AI agent 协作。
- [langgenius/dify](https://github.com/langgenius/dify) — ⭐157,970 — 也可作为 RAG 管线与知识库编排平台，与智能体维度交叉。
- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) — ⭐48,827 — 内置记忆、MCP、工具，适合轻量知识增强 agent。

## 3. 趋势信号分析

今日最显著信号是 AI 智能体从“会调用工具”转向“工程化 harness”：`rea`、`claude-mem`、`agency-agents`、`skills`、`i-have-adhd`、`impeccable` 等密集上榜，分别解决逆向操作、跨会话记忆、组织分工、技能封装、输出可读性与设计规范。编码智能体工具链进一步细分为记忆、token 压缩、IDE 集成和安全分析，`Caveman`、`oh-my-pi`、`Codewhale`、`DeepSeek-Reasonix`、`openclaude` 代表多语言、多终端竞争。基础设施侧，`DeepGEMM`、`Transformers`、`Ollama` 显示训练/推理效率与本地模型入口仍是刚需；Ollama 对 Kimi、GLM、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 的覆盖，反映模型发布后开发者快速试跑需求。RAG 则从向量检索扩展到知识图谱与网页/代码数据供给，`Graphify`、`Firecrawl`、`claude-mem`、`SiYuan` 值得关注。垂直应用继续向金融、招聘、PPT、CAD、视频和交易扩散，说明 LLM 正从通用聊天进入可计价工作流。

## 4. 社区关注热点

- [morluto/rea](https://github.com/morluto/rea)：今日 +2956，用 agent 做应用行为与原生二进制逆向，可能开辟安全分析与逆向工程新场景。
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)：跨会话记忆与上下文压缩，直击 coding agent 长期记忆痛点。
- [deepseek-ai/DeepGEMM](https://github.com/deepseek-ai/DeepGEMM)：高性能 GPU BLAS kernel，直接关系大模型训练/推理成本。
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)：代码库、文档、SQL、PDF 转知识图谱，RAG 从文本切片升级为结构化知识。
- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) / [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent)：轻量自托管个人 agent，支持记忆、MCP、多模型与自动化，适合开发者搭建私有助手。

---

## Trending top10项目

1. [tester-army/e2e](https://github.com/tester-army/e2e) [TypeScript]
   ⭐ 0 | 今日 +1725
   下一代 Web 与移动应用端到端测试框架
2. [mattpocock/skills](https://github.com/mattpocock/skills) [Shell]
   ⭐ 0 | 今日 +889
   真正工程师的技能，直接来自我的 .agents 目录
3. [earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad) [Python]
   ⭐ 0 | 今日 +619
   赋予你的智能体 CAD 超能力
4. [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) [C++]
   ⭐ 0 | 今日 +949
   将 PS5 可执行文件自动移植到 Linux 和 Windows 的工具
5. [pbakaus/impeccable](https://github.com/pbakaus/impeccable) [JavaScript]
   ⭐ 0 | 今日 +616
   让 AI 工具更擅长设计的设计语言
6. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) [TypeScript]
   ⭐ 0 | 今日 +534
   为每个智能体提供跨会话持久上下文——捕获会话中的一切操作，用 AI 压缩，并将相关上下文注入未来会话。支持 Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot、OpenCode 等
7. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) [Python]
   ⭐ 0 | 今日 +326
   防止编码智能体埋没答案的技能，ADHD 友好输出
8. [morluto/rea](https://github.com/morluto/rea) [TypeScript]
   ⭐ 0 | 今日 +2956
   用智能体逆向工程一切，从应用行为到原生二进制
9. [deepseek-ai/DeepGEMM](https://github.com/deepseek-ai/DeepGEMM) [Cuda]
   ⭐ 0 | 今日 +199
   DeepGEMM：简洁高效的 GPU BLAS 内核库
10. [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) [Shell]
   ⭐ 0 | 今日 +623
   触手可及的完整 AI 机构——从前端巫师到 Reddit 社区忍者，从奇思妙想注入者到现实检查员。每个智能体都是拥有个性、流程和可靠交付的专业专家
