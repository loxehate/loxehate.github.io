---
title: "AI 开源趋势日报"
published: 2026-09-17
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-09-17

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-17 02:26 UTC

---

以下为 **2026-09-17《AI 开源趋势日报》**。已从 Trending 中剔除 Ever Gauzy、Anki、Ghidra、Supabase、Tinycast、vphone-cli 等非 AI/ML 项目；从 AI 主题搜索结果中选取与 AI 应用、Agent、RAG、训练框架等强相关的代表项目。

---

## 今日速览

今日 GitHub AI 热点集中在两条主线：**AI 编码智能体与“技能/插件”生态爆发**，Alibaba open-code-review、Claude Code、Cline、agent-skills 等同时冲入热榜，代码审查、安全审计与工程技能正被封装成可复用 Agent 能力。**本地与垂直场景 AI 加速落地**，纯 C 的 MoE 本地推理引擎 colibri、音乐生成 YuE、AI 语音工作室 voicebox 均获得高热度。Tencent WeKnora 与 alphaXiv/OpenResearch 则显示 RAG/知识平台与“研究智能体”是企业侧关注焦点。基础框架如 PyTorch、Transformers 仍有庞大 stars 基数，但今日新增集中在 Agent 生态与应用层。

---

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

- [JustVugg/colibri](https://github.com/JustVugg/colibri) — 今日 +1,546 stars。纯 C、零依赖的 MoE 推理引擎，通过磁盘流式加载专家模块，让前沿 MoE 模型跑在普通硬件上，今日最受关注的本地推理方向。
- [pytorch/pytorch](https://github.com/pytorch/pytorch) — 103k stars。动态神经网络训练框架，AI 研究与生产的底层底座。
- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) — 200k stars。经典机器学习框架，生态成熟且持续迭代。
- [roboflow/supervision](https://github.com/roboflow/supervision) — 50.6k stars，今日 +260。可复用的计算机视觉工具库，覆盖检测、分割、追踪等日常 CV 开发。
- [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) — 61.7k stars。YOLO 系列目标检测/分割/姿态估计框架，是 CV 工程落地的热门选择。
- [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) — 37.4k stars。面向 Agent 与 Generative UI 的前端栈，支持 React、Angular、Mobile、Slack 等，是 Agent 应用的前端基础设施。
- [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) — 76.5k stars。经典开源 OCR 引擎，持续服务文档数字化 AI 流程。

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

- [alibaba/open-code-review](https://github.com/alibaba/open-code-review) — 今日 +3,231 stars。阿里大规模生产验证的代码审查工具，确定性管道 + LLM Agent，支持行级评论，今日最大黑马。
- [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) — 今日 +927 stars。面向 coding-agent 的多阶段安全审计技能，输出机器可读、可独立验证的审计结果。
- [anthropics/claude-code](https://github.com/anthropics/claude-code) — 今日 +165 stars。Claude 官方终端编码智能体，能理解代码库并执行日常开发任务。
- [cline/cline](https://github.com/cline/cline) — 今日 +112 stars。自治编码 Agent，可以 SDK、IDE 扩展或 CLI 形式接入。
- [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) — 今日 +1,017 stars。把编码 Agent 转化为“研究 Agent”，适合文献综述、知识探索与自动化研究。
- [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — 今日 +658 stars。面向 AI 编码 Agent 的生产级工程技能集，正在推动 Agent 技能标准化。
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — 246k stars。“与你一起成长的 Agent”，社区高热度 Agent 框架。
- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) — 48.2k stars。超轻量、可自托管的个人 AI Agent 框架，支持 MCP、多智能体、自动化与 WebUI。

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

- [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) — 今日 +332 stars。YuE2 前沿音乐生成模型，支持符号规划、zero-shot 翻唱与 agentic 音乐编辑。
- [jamiepine/voicebox](https://github.com/jamiepine/voicebox) — 今日 +417 stars。开源 AI 语音工作室：克隆声音、听写、创作一站式完成。
- [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) — 71.8k stars。开源 AI 求职代理，自动扫描职位、结构化评估、定制简历并跟踪申请。
- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) — 54.8k stars。AI 根据文档或主题生成原生 PowerPoint，支持动画、图表和数据驱动内容。
- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) — 51.9k stars。AI 生产力工作室，统一访问前沿 LLM，支持 300+ 助手与自主 Agent。
- [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) — 33.6k stars。个人交易 Agent，面向行情分析与交易辅助。
- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) — 65.2k stars。LLM 驱动的多市场股票智能分析系统，含多源行情、新闻、决策看板与自动推送。
- [netdata/netdata](https://github.com/netdata/netdata) — 80.6k stars。AI 驱动的全栈可观测性平台，面向精益团队的 AIOps 方案。

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

- [huggingface/transformers](https://github.com/huggingface/transformers) — 166.3k stars。最主流的模型定义/训练/推理框架，覆盖文本、视觉、音频与多模态。
- [keras-team/keras](https://github.com/keras-team/keras) — 64.3k stars。面向人的深度学习框架，适合快速原型、训练与部署。
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) — 105.1k stars。从零实现 ChatGPT-like LLM 的教学项目，是理解大模型训练原理的最佳入口之一。

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

- [Tencent/WeKnora](https://github.com/Tencent/WeKnora) — 今日 +1,197 stars。开源 LLM 知识平台，可将原始文档转化为可查询 RAG、自主推理 Agent 和自维护 Wiki。
- [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) — 46.4k stars。开源、隐私优先、自托管的知识工作空间，让人类与 AI Agent 在同一笔记库中协作。
- [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) — 82.5k stars。让 AI Agent 获得“互联网眼睛”，通过一个 CLI 搜索阅读 Twitter、Reddit、YouTube、GitHub、B站、小红书等，零 API 费用，适合作为检索增强层。

---

## 趋势信号分析

今日最明确信号是 **Agent 技能生态爆发**：[Cloudflare security-audit-skill](https://github.com/cloudflare/security-audit-skill)、[addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)、[SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red)、[anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) 等均以 SKILL.md 形式向 Agent 注入可复用能力，“技能包”正在成为继 MCP 之后的新一层 Agent 标准。其次，[Alibaba open-code-review](https://github.com/alibaba/open-code-review) 单日 +3.2k stars，说明 AI 代码审查已从 demo 走向大规模生产验证，代码智能仍是企业付费意愿最高的场景。第三，[JustVugg/colibri](https://github.com/JustVugg/colibri) 以纯 C、零依赖、磁盘流式专家加载运行 MoE 模型，代表“本地优先/边缘推理”方向首次以独立引擎形态登上热榜。最后，[Tencent/WeKnora](https://github.com/Tencent/WeKnora)、[alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) 与 [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) 显示 RAG 正从文档问答升级为“自维护 Wiki + 自主推理”的知识工作平台。总体看，社区关注正从基础模型训练转向 Agent 工程化、技能生态与垂直场景落地。

---

## 社区关注热点

- **Agent Skills 标准化**：重点关注 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)、[cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill)、[SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red)。SKILL.md 或将成为 Agent 扩展的通用格式，类似浏览器插件生态初现。
- **生产级 AI 代码审查**：[alibaba/open-code-review](https://github.com/alibaba/open-code-review) 单日 +3,231 stars，LLM Agent + 确定性管道的混合架构值得想接入 CI 的团队参考。
- **本地 MoE 推理**：[JustVugg/colibri](https://github.com/JustVugg/colibri) 用纯 C 在普通硬件上流式运行 MoE 模型，可能重新定义端侧大模型部署边界。
- **企业知识平台一体化**：[Tencent/WeKnora](https://github.com/Tencent/WeKnora) 将 RAG、推理 Agent 与 Wiki 自维护整合，是知识管理方向不可忽略的架构样本。
- **创意生成进入“可编辑”阶段**：[multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) 与 [jamiepine/voicebox](https://github.com/jamiepine/voicebox) 显示 AI 音乐/语音生成正从单次生成走向可控编辑与工作流化，创意工具开发者可以快速跟进。

---

## Trending top10项目

1. [alibaba/open-code-review](https://github.com/alibaba/open-code-review) [Go]
   ⭐ 0 | 今日 +3231
   快速、高效，在阿里巴巴规模下久经考验。混合架构代码审查工具：确定性流水线 + LLM Agent，精确的行级注释，内置多语言规则集（NPE、线程安全、XSS、SQL注入），兼容 OpenAI 和 Anthropic。
2. [cloudflare/security-audit-skill](https://github.com/cloudflare/security-audit-skill) [JavaScript]
   ⭐ 0 | 今日 +927
   用于多阶段安全审计的编码代理技能，提供独立验证的机器可读结果。
3. [JustVugg/colibri](https://github.com/JustVugg/colibri) [C]
   ⭐ 0 | 今日 +1546
   在你已有的硬件上运行前沿 MoE 模型——纯 C 实现，零依赖，专家从磁盘流式加载。小巧引擎，庞大模型。🐦
4. [abue-ammar/tinycast](https://github.com/abue-ammar/tinycast) [Swift]
   ⭐ 0 | 今日 +1179
   Tinycast — 一个微型、完全原生的 macOS 启动器、热键和剪贴板历史工具。
5. [jamiepine/voicebox](https://github.com/jamiepine/voicebox) [TypeScript]
   ⭐ 0 | 今日 +417
   开源 AI 语音工作室。克隆、听写、创作。
6. [Lakr233/vphone-cli](https://github.com/Lakr233/vphone-cli) [Swift]
   ⭐ 0 | 今日 +547
7. [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) [Python]
   ⭐ 0 | 今日 +110
   主要面向知识工作者的插件开源仓库，用于 Claude Cowork。
8. [ever-co/ever-gauzy](https://github.com/ever-co/ever-gauzy) [TypeScript]
   ⭐ 0 | 今日 +778
   Ever® Gauzy™ - 开放商业管理平台（ERP/CRM/HRM/ATS/PM）- https://gauzy.co
9. [ankitects/anki](https://github.com/ankitects/anki) [Rust]
   ⭐ 0 | 今日 +58
   Anki 是一款智能间隔重复抽认卡程序。
10. [NationalSecurityAgency/ghidra](https://github.com/NationalSecurityAgency/ghidra) [Java]
   ⭐ 0 | 今日 +1059
   Ghidra 是一个软件逆向工程（SRE）框架。
