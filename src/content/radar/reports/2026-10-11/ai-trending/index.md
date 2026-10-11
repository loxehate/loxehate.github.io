---
title: "AI 开源趋势日报"
published: 2026-10-11
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-10-11

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-10-11 00:00 UTC

---

# AI 开源趋势日报｜2026-10-11

> 数据口径：Trending 榜单总 star 字段均显示为 0，以下按原文标注，并以“今日新增 stars”判断热度；主题搜索为总 stars。已过滤 AnyPS5、artcraft、Flutter 等非 AI/通用项目。

## 1. 今日速览

今日 AI 开源热榜的核心信号是“智能体上下文工程”继续爆发：围绕 Claude Code、Codex、Copilot、Cursor 的技能包、上下文压缩和会话记忆项目集中上榜，说明开发者正从模型接入转向工程化落地。RAG/知识库方向同样强势，从代码库图谱、文档检索到向量数据库与爬虫，形成完整的数据接入与记忆层生态。Agent 工程平台与教程类项目热度高，多智能体开发、可恢复编排和中文教程持续吸引新增关注。应用层出现 AI PPT、知识工作者插件、本地 AI 助手与教育辅导等垂直产品，AI 正加速进入具体工作流。基础模型框架仍有稳定新增，但今日热度明显被上层 Agent 工具与应用盖过。

## 2. 各维度热门项目

### 🔧 AI 基础工具

- [mksglu/context-mode](https://github.com/mksglu/context-mode) [TypeScript] ⭐0（今日 +178）— 面向 AI coding agent 的上下文窗口优化，沙箱化工具输出并持久化会话记忆。
- [mattpocock/skills](https://github.com/mattpocock/skills) [Shell] ⭐0（今日 +1,736）— 来自 `.agents` 目录的工程技能集，代表 Agent Skills 正在模板化。
- [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) ⭐0（今日 +278）— 用单个 `CLAUDE.md` 改进 Claude Code 行为，聚焦 LLM 编码陷阱。
- [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML] ⭐0（今日 +1,190）— 面向多个 AI 编程助手的编辑级图表设计技能，44 种图表类型。
- [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) [Python] ⭐74,928 — 在 LLM 前压缩工具输出、日志、文件和 RAG 块，降低 token 成本。
- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) [Rust] ⭐8,845 — Rust 生态的模块化 LLM 应用框架，适合高性能 Agent/LLM 服务。
- [Picovoice/picollm](https://github.com/Picovoice/picollm) [Python] ⭐318 — 基于 X-Bit 量化的端侧 LLM 推理，端侧部署方向信号。
- [samchon/nestia](https://github.com/samchon/nestia) [TypeScript] ⭐2,176 — NestJS Helper + AI Chatbot 开发，后端框架与 AI 聊天集成。

### 🤖 AI 智能体/工作流

- [morluto/rea](https://github.com/morluto/rea) [TypeScript] ⭐0（今日 +25,793）— 用 agents 逆向工程应用行为到原生二进制，今日 Trending 最大 AI 相关新增。
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) [Python] ⭐147,565 — Agent 工程平台，仍是入口级框架。
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) [Python] ⭐43,027 — 构建可恢复、有状态 Agent 的编排框架。
- [Eigenwise/atomic-agents](https://github.com/Eigenwise/atomic-agents) [Python] ⭐6,282 — 原子化构建 AI Agent，强调可组合。
- [datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents) [Python] ⭐82,451 — 从零构建智能体的中文教程与实战。
- [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) [Python] ⭐53,375 — 《深入理解 AI Agent》开源书与配套代码。
- [zi-yue-1129/DATAGEN](https://github.com/zi-yue-1129/DATAGEN) [Python] ⭐1,807 — 多智能体研究助理，自动假设生成、数据分析和报告写作。

### 📦 AI 应用

- [open-webui/open-webui](https://github.com/open-webui/open-webui) [Python] ⭐154,224 — 用户友好的 AI 界面，支持 Ollama、OpenAI API。
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) [JavaScript] ⭐66,904 — 本地优先的 Agent 体验，一站式私有 AI 应用。
- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) [Python] ⭐0（今日 +461）— AI 将文档或主题转为原生 PowerPoint，办公自动化热门。
- [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) [Python] ⭐41,098 — 终身个性化辅导，教育垂直场景。
- [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) [Python] ⭐0（今日 +625）— Claude Cowork 知识工作插件，官方生态信号。
- [asukaminato0721/telegram-summary-bot](https://github.com/asukaminato0721/telegram-summary-bot) [TypeScript] ⭐202 — LLM 群聊总结与检索，轻量部署。
- [acon96/home-llm](https://github.com/acon96/home-llm) [Python] ⭐1,455 — 用本地 LLM 控制智能家居的 Home Assistant 集成。

### 🧠 大模型/训练

- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) [C++] ⭐0（今日 +26）— 通用 ML 框架，稳定基本盘。
- [pytorch/pytorch](https://github.com/pytorch/pytorch) [Python] ⭐0（今日 +84）— 动态神经网络与 GPU 加速。
- [huggingface/transformers](https://github.com/huggingface/transformers) [Python] ⭐0（今日 +96）— 文本、视觉、音频、多模态模型定义框架。
- [open-compass/opencompass](https://github.com/open-compass/opencompass) [Python] ⭐7,508 — LLM 评估平台，覆盖 100+ 数据集与多模型。
- [genieincodebottle/generative-ai](https://github.com/genieincodebottle/generative-ai) [Jupyter Notebook] ⭐2,643 — 生成式 AI 路线图、项目与面试资源。
- [thinkwee/AgentsMeetRL](https://github.com/thinkwee/AgentsMeetRL) [HTML] ⭐1,863 — Agentic RL 论文清单。
- [thinkwee/AwesomeOPD](https://github.com/thinkwee/AwesomeOPD) ⭐874 — On-Policy Distillation 资源。
- [chrisliu298/awesome-llm-unlearning](https://github.com/chrisliu298/awesome-llm-unlearning) ⭐629 — LLM 机器遗忘资源。

### 🔍 RAG/知识库

- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) [Python] ⭐125,306 — 代码库、文档、SQL、PDF 转可查询知识图谱，适配 Claude Code 等。
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) [TypeScript] ⭐99,236 — 跨会话持久上下文，捕获、压缩并注入 Agent 记忆。
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) [Go] ⭐91,970 — 融合 RAG 与 Agent 的上下文引擎。
- [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) [Python] ⭐85,163 — 为 LLM/Agent 提供网页到 Markdown 的爬虫。
- [mem0ai/mem0](https://github.com/mem0ai/mem0) [Python] ⭐66,955 — AI Agent 记忆层，生产级持久上下文。
- [run-llama/llama_index](https://github.com/run-llama/llama_index) [Python] ⭐52,462 — 文档处理与 RAG 平台。
- [milvus-io/milvus](https://github.com/milvus-io/milvus) [Go] ⭐46,349 — 云原生向量数据库，ANN 检索底座。
- [ScrapeGraphAI/Scrapegraph-ai](https://github.com/ScrapeGraphAI/Scrapegraph-ai) [Python] ⭐31,676 — 基于 AI 的 Python 爬虫，结构化数据抽取。

## 3. 趋势信号分析

今日热榜最明确的变化，是 AI 编程智能体的竞争焦点从“模型接入”转向“上下文工程”。上下文窗口压缩、跨会话记忆、`CLAUDE.md` 技能包、图表/PPT 生成技能等集中获得新增 stars，且明确适配 Claude Code、Codex、Copilot、Cursor 等多平台，说明技能格式与路由层正在成为新的基础设施。RAG 方向从传统文档问答扩展到代码库知识图谱、会话记忆、工具输出压缩和 JSON token 优化，记忆层与检索层边界进一步融合。另一个信号是后训练/评估相关清单集中出现，包括 Agentic RL、On-Policy Distillation、LLM Unlearning，显示社区对智能体强化学习、蒸馏与模型安全治理的兴趣升温。整体上，上层 Agent 工具与应用明显盖过底层框架的日常热度，但底层框架仍保持稳定基本盘。

## 4. 社区关注热点

- [mksglu/context-mode](https://github.com/mksglu/context-mode) 与 [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)：上下文窗口仍是 Agent 成本与效果瓶颈，压缩/沙箱化工具输出是刚需。
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) 与 [mem0ai/mem0](https://github.com/mem0ai/mem0)：跨会话持久记忆正从插件能力演变为独立基础设施。
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) 与 [infiniflow/ragflow](https://github.com/infiniflow/ragflow)：代码库/文档知识图谱与企业 RAG 仍高速增长，Graph RAG 值得重点跟踪。
- [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) 与 [Eigenwise/atomic-agents](https://github.com/Eigenwise/atomic-agents)：Agent 编排框架继续分化，轻量、可组合、可观测是竞争重点。
- [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) 与 [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)：知识工作流垂直应用开始抢占办公场景，插件化是落地路径。

---

## Trending top10项目

1. [morluto/rea](https://github.com/morluto/rea) [TypeScript]
   ⭐ 0 | 今日 +25793
   用智能体逆向分析任何目标，从应用行为到原生二进制。
2. [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) [C++]
   ⭐ 0 | 今日 +5805
   自动将 PS5 可执行文件移植到 Linux 和 Windows 的工具
3. [storytold/artcraft](https://github.com/storytold/artcraft) [Rust]
   ⭐ 0 | 今日 +3222
   ArtCraft 是面向艺术家、设计师和电影人的专注创作引擎
4. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +1190
   面向 Claude Code、Codex、GitHub Copilot、Cursor、Factory Droid 和 Pi 的编辑级图表设计。44 种图表类型。自包含 HTML + SVG。无阴影。拒绝 Mermaid 粗制滥造。
5. [mksglu/context-mode](https://github.com/mksglu/context-mode) [TypeScript]
   ⭐ 0 | 今日 +178
   面向 AI 编程智能体的上下文窗口优化。隔离工具输出（减少 98%）、持久化会话记忆，并通过 MCP + hooks 在 17 个平台上强制路由。
6. [mattpocock/skills](https://github.com/mattpocock/skills) [Shell]
   ⭐ 0 | 今日 +1736
   面向真正工程师的技能。直接来自我的 .agents 目录。
7. [flutter/flutter](https://github.com/flutter/flutter) [Dart]
   ⭐ 0 | 今日 +88
   Flutter 让构建移动端及其他平台的精美应用变得轻松快捷
8. [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) [C++]
   ⭐ 0 | 今日 +26
   面向所有人的开源机器学习框架
9. [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) [Python]
   ⭐ 0 | 今日 +461
   AI 将文档或主题转为真正的原生 PowerPoint 演示文稿——支持原生形状、过渡与动画、按需生成数据图表和表格、根据演讲者备注生成音频旁白，并可使用你自己的 .pptx 模板。· 作者 Hugo He
10. [pytorch/pytorch](https://github.com/pytorch/pytorch) [Python]
   ⭐ 0 | 今日 +84
   Python 中的张量与动态神经网络，具备强大的 GPU 加速
