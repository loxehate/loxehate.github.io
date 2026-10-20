---
title: "AI 开源趋势日报"
published: 2026-10-08
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-10-08

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-10-08 00:00 UTC

---

# AI 开源趋势日报｜2026-10-08

> 筛选口径：Trending 中 `AnyPS5`、`raddebugger`、`tester-army/e2e`、`openGym` 与 AI/ML 无明确关联，已略去；其余 Trending 项目多属于 AI coding agent、Agent 技能与计算机使用方向。主题搜索均带 `llm/llm-model` 标签，以下选取代表项目分析。Trending 的星标总量源数据为 0/未展示，本文保留“今日新增”字段。

## 1. 今日速览

今日 AI 开源最强信号是 **AI coding agent 从“模型调用”走向“技能包 + 记忆 + 安全 + 验证”的工程化基建**：`rea` 单日 +4655，`mattpocock/skills`、`agent-skills`、`claude-mem`、`security-audit-skill` 等几乎包揽 Trending 前列。其次，执行型 Agent 继续向真实系统操作扩展，`trycua/cua`、`browser-use`、`AutoGPT` 推动 computer-use 与浏览器自动化。RAG 侧则从单纯向量检索转向“知识图谱化”，`Graphify`、`firecrawl`、`dify` 值得关注。大模型侧，本地/端侧推理仍是主线，`ollama`、`picollm`、`transformers` 及视频 LLM 推理加速项目保持活跃。

## 2. 各维度热门项目

### 🔧 AI 基础工具

- [ollama/ollama](https://github.com/ollama/ollama) — ⭐182,499。本地/自托管运行 Kimi、GLM、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等模型，是本地推理入口。
- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) — ⭐8,824。Rust 构建模块化、可扩展 LLM 应用，适合高性能 Agent 与服务端场景。
- [Picovoice/picollm](https://github.com/Picovoice/picollm) — ⭐318。基于 X-Bit 量化的端侧 LLM 推理，代表低成本、隐私友好的边缘 AI 方向。
- [samchon/nestia](https://github.com/samchon/nestia) — ⭐2,179。NestJS 辅助工具 + AI Chatbot 开发，服务端 TypeScript AI 集成方案。
- [manaflow-ai/cmux](https://github.com/manaflow-ai/cmux) — ⭐0（+44 today）。面向 AI coding agents 的 Ghostty macOS 终端，带垂直标签与通知，体现 Agent 开发环境终端化。

### 🤖 AI 智能体/工作流

- [morluto/rea](https://github.com/morluto/rea) — ⭐0（+4655 today）。用 agents 做逆向工程，从 App 行为到原生二进制，今日 Trending 最高，安全/逆向 Agent 需求突出。
- [mattpocock/skills](https://github.com/mattpocock/skills) — ⭐0（+1403 today）。来自 `.agents` 目录的工程技能集，AI coding agent 可复用技能包。
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — ⭐0（+677 today）。生产级 AI coding agent 工程技能，强调可落地工程实践。
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — ⭐0（+578 today）。跨会话持久上下文，压缩并注入相关记忆，解决 Agent 记忆断层。
- [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) — ⭐0（+576 today）。多阶段安全审计 coding-agent skill，机器可读、可验证发现。
- [trycua/cua](https://github.com/trycua/cua) — ⭐0（+228 today）。计算机使用 2.0 驱动、跨 OS 机群与 benchmark，服务训练、评测与数据生成。
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — ⭐274,928。Agent harness 性能优化系统，覆盖技能、直觉、记忆、安全与研究型开发。
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — ⭐147,544。Agent engineering platform，仍是 Agent 工作流生态核心底座。

### 📦 AI 应用

- [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) — ⭐129,127。根据主题或关键词一键生成高清短视频，AI 自动化内容生产代表。
- [open-webui/open-webui](https://github.com/open-webui/open-webui) — ⭐154,165。用户友好的 AI 界面，支持 Ollama、OpenAI API 等，自托管入口。
- [f/prompts.chat](https://github.com/f/prompts.chat) — ⭐172,311。开源提示词分享与自托管社区，Prompt 资产化与组织级管理。
- [zi-yue-1129/DATAGEN](https://github.com/zi-yue-1129/DATAGEN) — ⭐1,808。多智能体研究助手，自动假设生成、数据分析与报告写作。
- [asukaminato0721/telegram-summary-bot](https://github.com/asukaminato0721/telegram-summary-bot) — ⭐202。用 LLM 总结与检索 Telegram 群聊，轻量社群 AI 应用。
- [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) — ⭐0（+825 today）。面向 Claude Code、Codex、Copilot 等 42 类图表设计，自包含 HTML + SVG。

### 🧠 大模型/训练

- [huggingface/transformers](https://github.com/huggingface/transformers) — ⭐167,034。文本、视觉、音频、多模态模型定义与推理框架，模型生态底座。
- [zchoi/Awesome-Embodied-Robotics-and-Agent](https://github.com/zchoi/Awesome-Embodied-Robotics-and-Agent) — ⭐1,897。具身智能/机器人结合 LLM 的研究清单，反映 Embodied AI 热度。
- [llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm) — ⭐1,438。日本 LLM 生态总览，区域模型与本地语言模型方向。
- [chrisliu298/awesome-llm-unlearning](https://github.com/chrisliu298/awesome-llm-unlearning) — ⭐628。LLM 机器遗忘资源集合，涉及合规、安全与训练后处理。
- [xuyang-liu16/VidCom2](https://github.com/xuyang-liu16/VidCom2) — ⭐132。EMNLP 2025 视频大模型推理加速，插件式提升 Video LLM 效率。
- [testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io) — ⭐113。Test-time scaling 综述，关注推理时扩展这一关键方向。
- [genieincodebottle/generative-ai](https://github.com/genieincodebottle/generative-ai) — ⭐2,643。生成式 AI 路线图、项目、用例与面试资源集合。

### 🔍 RAG/知识库

- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — ⭐189,491。为 AI agents 提供网页与外部数据，RAG/Agent 数据入口。
- [langgenius/dify](https://github.com/langgenius/dify) — ⭐158,040。构建 Agentic workflows 与 RAG pipelines，一站式 AI 应用开发平台。
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) — ⭐124,678。将代码库、文档、SQL、配置、PDF 转为可查询知识图谱，RAG 图谱化信号。
- [ScrapeGraphAI/Scrapegraph-ai](https://github.com/ScrapeGraphAI/Scrapegraph-ai) — ⭐31,612。基于 AI 的 Python 爬虫，适合 RAG 数据采集与自然语言抽取。
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — ⭐0（+578 today）。跨会话持久记忆，压缩并注入相关上下文，属于 Agent 知识管理基础设施。

## 3. 趋势信号分析

今日最强烈的信号是 Agent 工程化从模型调用转向“技能包 + 记忆 + 安全 + 验证”。Trending 前列几乎被 AI coding agent skills 占据：`rea` 用 Agent 做逆向工程单日 +4655，`mattpocock/skills`、`agent-skills`、`claude-mem`、`security-audit-skill` 都在解决可复用能力、跨会话记忆与可验证安全审计。其次，执行型 Agent 继续扩展边界，`trycua/cua`、`browser-use`、`AutoGPT` 推动 computer-use 与浏览器操作，Rust 在 `cua`、`rig` 中出现，说明性能与跨 OS 部署受重视。第三，RAG 正从向量检索走向知识图谱：`Graphify` 将代码、文档、SQL、PDF 转为可查询图谱，`firecrawl`、`dify` 巩固数据入口与工作流。大模型侧，`ollama` 对 Kimi、GLM、DeepSeek、Qwen 等的本地支持，以及 `picollm` 的 X-Bit 端侧量化、`VidCom2` 的视频 LLM 推理加速，显示本地/边缘/低成本推理仍是主线。

## 4. 社区关注热点

- **AI coding agent skills 成为新分发格式**：关注 [mattpocock/skills](https://github.com/mattpocock/skills)、[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)、[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)、[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)。理由：技能包正成为扩展 Agent 能力、优化输出体验的标准载体。
- **Agent 记忆与 token 效率**：关注 [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)、[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)、[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)、[affaan-m/ECC](https://github.com/affaan-m/ECC)。理由：上下文窗口、成本与跨会话连续性成为 Agent 落地瓶颈。
- **Computer-use / 浏览器 / 逆向执行**：关注 [trycua/cua](https://github.com/trycua/cua)、[browser-use/browser-use](https://github.com/browser-use/browser-use)、[morluto/rea](https://github.com/morluto/rea)。理由：Agent 正从“生成答案”进入“操作真实系统”，安全与评测需求同步上升。
- **RAG 知识图谱化**：关注 [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)、[firecrawl

---

## Trending top10项目

1. [morluto/rea](https://github.com/morluto/rea) [TypeScript]
   ⭐ 0 | 今日 +4655
   用智能体逆向分析任何事物，从应用行为到原生二进制文件。
2. [mattpocock/skills](https://github.com/mattpocock/skills) [Shell]
   ⭐ 0 | 今日 +1403
   面向真正工程师的技能。直接来自我的 .agents 目录。
3. [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) [C++]
   ⭐ 0 | 今日 +2716
   自动将 PS5 可执行文件移植到 Linux 和 Windows 的工具。
4. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) [Python]
   ⭐ 0 | 今日 +619
   防止编码智能体埋没答案的技能。ADHD 友好输出。
5. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +825
   为 Claude Code、Codex、GitHub Copilot、Factory Droid 和 Pi 提供的编辑级图表设计。42 种图表类型。自包含 HTML + SVG。无阴影。无 Mermaid 垃圾图。
6. [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) [JavaScript]
   ⭐ 0 | 今日 +677
   面向 AI 编码智能体的生产级工程技能。
7. [EpicGames/raddebugger](https://github.com/EpicGames/raddebugger) [C]
   ⭐ 0 | 今日 +90
   原生、用户态、多进程、图形化调试器。
8. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) [TypeScript]
   ⭐ 0 | 今日 +578
   为每个智能体提供跨会话持久上下文——捕获智能体会话中的所有操作，用 AI 压缩，并将相关上下文注入未来会话。适用于 Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot、OpenCode 等。
9. [manaflow-ai/cmux](https://github.com/manaflow-ai/cmux) [Swift]
   ⭐ 0 | 今日 +44
   基于 Ghostty 的开源 macOS 终端，带垂直标签页和 AI 编码智能体通知。为多任务、组织和可编程性而构建。
10. [trycua/cua](https://github.com/trycua/cua) [Rust]
   ⭐ 0 | 今日 +228
   以开源驱动、跨操作系统机群和基准，扩展 computer-use 2.0，覆盖训练、评估与数据生成。
