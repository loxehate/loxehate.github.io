---
title: "AI 开源趋势日报"
published: 2026-10-09
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-10-09

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-10-09 00:00 UTC

---

# AI 开源趋势日报（2026-10-09）

> **过滤说明**：Trending 榜单中，`AnyPS5`、`raddebugger`、`system-design-notes` 与 AI/ML 无明确关系；`artcraft` 按现有描述未体现 AI/ML，暂不纳入。AI 相关保留 `diagram-design`、`rea`、`mattpocock/skills`、`claude-mem`、`anthropics/knowledge-work-plugins`。主题搜索中排除 Julia、Airflow、CS 视频课程等通用/非 AI 核心项目。Trending 项目累计 stars 按榜单显示为 0，括号内为今日新增。

## 一、今日速览

1. 今日 AI 开源热榜的核心信号是 **Agent 工程化**：逆向工程 Agent、跨会话记忆、技能包、图表设计和 token 压缩集中爆发。
2. `morluto/rea` 今日新增 +7,738，成为 AI 相关 Trending 最高新增项目，说明 Agent 正进入二进制/应用行为逆向等硬核场景。
3. Claude Code、Codex、GitHub Copilot 生态的 skills/plugins 密集上榜，AI 编程助手正从模型能力竞争转向 **技能与上下文供给**。
4. 高星主题中，Agent 框架、本地模型运行、RAG/知识图谱和 AI 应用平台仍占据主赛道。
5. 开源社区关注点从“造模型”进一步转向“让 Agent 可靠、低成本、可记忆地完成任务”。

---

## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars | 一句话说明 |
|---|---|---|
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐166,861（topic:ml） | 模型定义/推理框架，覆盖文本、视觉、音频与多模态，是 AI 应用底座。 |
| [ollama/ollama](https://github.com/ollama/ollama) | ⭐182,411（topic:llm） | 本地一键运行 Kimi、GLM、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等模型。 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | ⭐0（今日 +1,774） | 工程师向 Agent Skills 集合，来自 `.agents` 目录，代表 coding agent 技能化趋势。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | ⭐0（今日 +1,160） | 为 Claude Code、Codex、Copilot 等提供 42 种图表类型的自包含 HTML+SVG 技能。 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | ⭐110,584（topic:llm） | 用“原始人语言”压缩 65% token 的 coding agent 技能/代理，直击调用成本。 |
| [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) | ⭐76,871（topic:ml） | OCR 引擎，文档数字化与多模态输入的重要基础工具。 |
| [roboflow/supervision](https://github.com/roboflow/supervision) | ⭐51,156（topic:ml） | 可复用计算机视觉工具库，加速检测、分割、追踪应用开发。 |

### 🤖 AI 智能体 / 工作流

| 项目 | Stars | 一句话说明 |
|---|---|---|
| [morluto/rea](https://github.com/morluto/rea) | ⭐0（今日 +7,738） | 用 Agent 反向工程从应用行为到原生二进制，今日 AI 相关 Trending 最高新增。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ⭐0（今日 +670） | 为所有 Agent 提供跨会话持久记忆，压缩并注入相关上下文。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | ⭐275,384（topic:llm） | Agent harness 性能优化系统，集成技能、本能、记忆、安全与研究优先开发。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | ⭐252,040（topic:llm） | 可成长的 Agent，代表自主、个性化智能体方向。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | ⭐147,397（topic:llm） | Agent 工程平台，连接模型、工具与工作流。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | ⭐117,320（topic:llm） | 浏览器 Agent，让智能体直接操作网页完成任务。 |
| [langgenius/dify](https://github.com/langgenius/dify) | ⭐157,927（topic:llm） | Agentic workflow 与 RAG 平台，支持云、VPC、自托管部署。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | ⭐187,487（topic:llm） | 经典自主 Agent 平台，仍是自动化任务入口。 |

### 📦 AI 应用

| 项目 | Stars | 一句话说明 |
|---|---|---|
| [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) | ⭐0（今日 +392） | Claude Cowork 官方开源插件集，面向知识工作者。 |
| [f/prompts.chat](https://github.com/f/prompts.chat) | ⭐172,184（topic:ml） | 社区提示词分享/发现平台，ChatGPT prompts 老牌入口。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | ⭐154,056（topic:llm） | 用户友好的 AI 界面，兼容 Ollama / OpenAI API。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | ⭐129,189（topic:llm） | 根据主题或关键词一键生成高清短视频的 AI 工作流。 |
| [microsoft/qlib](https://github.com/microsoft/qlib) | ⭐49,219（topic:ml） | AI 量化投资平台，覆盖研究到生产。 |
| [netdata/netdata](https://github.com/netdata/netdata) | ⭐80,846（topic:ml） | AI-powered 全栈可观测性，面向运维场景。 |

### 🧠 大模型 / 训练

| 项目 | Stars | 一句话说明 |
|---|---|---|
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | ⭐200,554（topic:ml） | 端到端机器学习框架，生产部署生态成熟。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | ⭐103,907（topic:ml） | 主流深度学习训练/推理框架，GPU 加速强。 |
| [keras-team/keras](https://github.com/keras-team/keras) | ⭐64,353（topic:ml） | 高层深度学习 API，适合快速建模与教学。 |
| [scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn) | ⭐67,497（topic:ml） | 经典机器学习库，覆盖分类、回归、聚类等。 |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | ⭐62,313（topic:ml） | YOLO27/YOLO26/YOLO11/YOLOv8 等视觉模型训练与推理套件。 |

### 🔍 RAG / 知识库

| 项目 | Stars | 一句话说明 |
|---|---|---|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | ⭐189,620（topic:llm） | 为 AI Agent 提供网页与外部数据抓取，RAG/工具调用数据入口。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | ⭐124,755（topic:llm） | 将代码库、文档、SQL、配置、PDF 转为可查询知识图谱，提供 `/graphify` 技能。 |
| [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) | ⭐59,523（topic:vector-db） | 快速搜索 API，支持 AI 驱动的混合搜索。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | ⭐66,834（topic:vector-db） | 本地优先 Agent/文档问答体验，强调私有化与自有智能。 |

---

## 三、趋势信号分析

今日热榜最强烈的信号是 Agent 基础设施从“框架”走向“技能、记忆与成本优化”。`rea` 以 +7,738 领跑 AI 相关新增，说明社区开始用 Agent 处理逆向工程、二进制分析等高门槛任务；`claude-mem`、`mattpocock/skills`、`diagram-design` 则分别补足跨会话记忆、工程技能和图表输出能力，Claude Code/Codex/Copilot 生态出现明显的 skills/plugins 化。与此同时，`ECC`、`caveman` 聚焦 harness 性能与 token 压缩，表明 Agent 竞争已进入可靠性与经济性阶段。高星主题中，`ollama`、`dify`、`langchain`、`browser-use`、`firecrawl`、`graphify` 仍占据主流，本地模型、多模型路由、RAG/知识图谱和浏览器操作构成完整落地栈。结合 `ollama` 已支持 Kimi、GLM、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等模型，以及 Anthropic 知识工作插件上榜，行业事件正推动开发者从“接入模型”转向“封装可复用工作能力”。

---

## 四、社区关注热点

- [morluto/rea](https://github.com/morluto/rea)：今日 +7,738，Agent 逆向工程方向爆发，适合关注自动化安全分析与二进制理解。
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)：跨会话持久记忆是 Agent 从玩具走向生产的关键短板，值得跟踪其压缩与注入策略。
- [affaan-m/ECC](https://github.com/affaan-m/ECC)：高星 Agent harness 优化系统，覆盖技能、记忆、安全与研究流程，代表 Agent 性能工程方向。
- [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)：把代码库、文档、SQL、PDF 转为可查询知识图谱，直接服务 Claude Code、Cursor、Codex 等 Agent。
- [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)：通过极端压缩 token 降低 coding agent 成本，反映社区对推理经济性的强烈关注。

---

## Trending top10项目

1. [boykopovar/AnyPS5](https://github.com/boykopovar/AnyPS5) [C++]
   ⭐ 0 | 今日 +4669
   将 PS5 可执行文件自动移植到 Linux 和 Windows 的工具
2. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +1160
   面向 Claude Code、Codex、GitHub Copilot、Factory Droid 和 Pi 的编辑级图表设计。42 种图表类型。自包含 HTML + SVG。无阴影。拒绝 Mermaid 劣质产出。
3. [morluto/rea](https://github.com/morluto/rea) [TypeScript]
   ⭐ 0 | 今日 +7738
   用智能体逆向分析任何东西，从应用行为到原生二进制文件。
4. [mattpocock/skills](https://github.com/mattpocock/skills) [Shell]
   ⭐ 0 | 今日 +1774
   面向真正工程师的技能。直接来自我的 .agents 目录。
5. [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) [TypeScript]
   ⭐ 0 | 今日 +670
   为每个智能体提供跨会话持久上下文——捕获智能体会话中的所有操作，用 AI 压缩，并把相关上下文注入未来会话。支持 Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot、OpenCode 等。
6. [EpicGames/raddebugger](https://github.com/EpicGames/raddebugger) [C]
   ⭐ 0 | 今日 +279
   原生、用户态、多进程图形化调试器。
7. [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) [Python]
   ⭐ 0 | 今日 +392
   面向知识工作者在 Claude Cowork 中使用的开源插件仓库。
8. [storytold/artcraft](https://github.com/storytold/artcraft) [Rust]
   ⭐ 0 | 今日 +2103
   ArtCraft 是面向艺术家、设计师和电影人的意图驱动创作引擎。
9. [liquidslr/system-design-notes](https://github.com/liquidslr/system-design-notes)
   ⭐ 0 | 今日 +393
   《System Design Interview - An Insider's Guide》读书笔记。
