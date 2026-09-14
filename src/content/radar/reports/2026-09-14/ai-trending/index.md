---
title: "AI 开源趋势日报"
published: 2026-09-14
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-09-14

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-14 03:17 UTC

---

## AI 开源趋势日报（2026-09-14）

> 已过滤 Trending 榜单中的非 AI 项目：ever-gauzy、gods-eye-view、SmartTube、omniget、douyin-downloader、cool-retro-term。

### 1. 今日速览

- **Agent 技能生态爆发**：agent-skills、Claude-Red、OpenMontage 等把“技能包”变成可注册、可复用、可审计的新一层基础设施。
- **本地优先 + 高效推理**：colibri 用纯 C 流式运行 MoE，VoiceStudio 提供完全本地语音方案，anything-llm 主打本地 RAG，隐私与成本敏感需求升温。
- **垂直 AI 应用密集涌现**：渗透测试、音乐生成、销售 CRM、数学建模、视频制作等场景均有今日高热度项目。
- **RAG/向量数据库底座依旧稳固**：主题搜索结果中 LlamaIndex、Milvus、Qdrant、anything-llm 等持续保持高关注。
- **前沿模型信息追踪成新话题**：system_prompts_leaks 将多家前沿模型的 system prompt 做成了可研究资源。

### 2. 各维度热门项目

#### 🔧 AI 基础工具

- [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) — Stars: 37,339  
  Agent 前端开发栈与 Generative UI 协议，让 Agent 能力快速嵌入 React、Angular 等界面。

- [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) — Stars: 13,083  
  JVM 生态的 LLM 应用开发库，统一接入主流模型与向量存储，降低 Java 开发者 AI 工程门槛。

- [neuml/txtai](https://github.com/neuml/txtai) — Stars: 12,947  
  轻量一体化 AI 框架，覆盖语义搜索、LLM 编排与语言模型工作流。

- [alibaba/open-code-review](https://github.com/alibaba/open-code-review) — Stars: 今日 +443  
  阿里大规模实践验证的混合架构代码审查工具：确定性流水线 + LLM Agent，输出行级评审意见。

#### 🤖 AI 智能体/工作流

- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — Stars: 245,196  
  “与你一起成长的 Agent”，是当前 ai-agent 主题下星标最高的通用智能体框架。

- [HKUDS/nanobot](https://github.com/HKUDS/nanobot) — Stars: 48,122  
  超轻量、自托管的个人 AI Agent 框架，支持 WebUI、工具调用、MCP、多智能体与自动化。

- [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) — Stars: 46,960  
  开源超级 AI 助手与 Agent Harness，具备任务规划、工具调用、记忆管理与自我进化能力。

- [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) — Stars: 今日 +265  
  面向专业编码 Agent 的安全技能注册表，可扩展 Claude Code、Cursor、Copilot 等工具。

- [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) — Stars: 今日 +289  
  Rust 实现的并行研究 Agent 系统，支持任意模型驱动的自动调研与报告生成。

- [Hmbown/Codewhale](https://github.com/Hmbown/Codewhale) — Stars: 40,969  
  Rust 编写的终端编码 Agent，强调社区共建与持续迭代。

- [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) — Stars: 35,533  
  DeepSeek 原生的终端编码 Agent，针对 prefix-cache 稳定性进行长期运行优化。

- [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) — Stars: 今日 +506  
  Claude Skills 形式的攻防安全技能库，将结构化 SKILL.md 转化为 Agent 可执行的安全能力。

#### 📦 AI 应用

- [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) — Stars: 今日 +2632  
  完全本地的 ElevenLabs 替代品，支持语音克隆、视频配音、字幕与有声书创作，今日热度极高。

- [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) — Stars: 今日 +590  
  全自主 AI Agent 渗透测试系统，将复杂攻防任务自动化。

- [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) — Stars: 今日 +432  
  开源 AI 销售操作系统：自托管 CRM + 原生 AI Agent + WhatsApp，替代 Kommo、Intercom 等。

- [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) — Stars: 今日 +380  
  开源 Agentic 视频制作系统，12 条生产管线、100+ 工具、700+ Agent 技能/知识文件。

- [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) — Stars: 今日 +246  
  为数学建模设计的 Agent，可自动完成建模并生成可直接提交的论文。

- [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) — Stars: 71,500  
  开源 AI 求职代理：扫描职位、A-H 评分、定制简历并跟踪申请流程。

- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) — Stars: 65,006  
  LLM 驱动的多市场股票分析系统，聚合行情、新闻、决策看板与自动推送。

- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) — Stars: 54,131  
  用 AI 将文档或主题生成为原生 PowerPoint，支持动画、图表与数据表格。

#### 🧠 大模型/训练

- [huggingface/transformers](https://github.com/huggingface/transformers) — Stars: 今日 +152  
  文本、视觉、语音与多模态模型的标准定义/训练/推理框架，AI 开源生态的基石项目。

- [JustVugg/colibri](https://github.com/JustVugg/colibri) — Stars: 今日 +868  
  纯 C、零依赖的 MoE 推理引擎，通过磁盘流式加载专家权重，在普通硬件上运行前沿 MoE 模型。

- [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) — Stars: 今日 +487  
  YuE2 前沿音乐生成模型，支持符号规划、零样本翻唱与 Agentic 音乐编辑。

- [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) — Stars: 今日 +706  
  ​提取并整理 Anthropic、OpenAI、Google 等前沿模型的 system prompt，是研究模型行为与提示工程的独特资源。

#### 🔍 RAG/知识库

- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) — Stars: 65,991  
  本地优先的 RAG/Agent 应用，支持多种向量库与模型，强调“拥有自己的智能”。

- [meilisearch/meilisearch](https://github.com/meilisearch/meilisearch) — Stars: 59,285  
  高性能搜索 API，提供全文 + 向量混合搜索能力，适合 AI 驱动的站点与应用。

- [run-llama/llama_index](https://github.com/run-llama/llama_index) — Stars: 52,153  
  面向 AI 应用的文档处理与 RAG 平台，是检索增强生态的核心框架之一。

- [milvus-io/milvus](https://github.com/milvus-io/milvus) — Stars: 46,094  
  云原生高性能向量数据库，专为大规模向量 ANN 搜索设计。

- [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) — Stars: 35,635  
  “无向量、基于推理”的 RAG 文档索引方案，探索替代传统向量检索的新路径。

- [qdrant/qdrant](https://github.com/qdrant/qdrant) — Stars: 34,525  
  高性能大规模向量数据库与向量搜索引擎，是 AI/Agent 应用常用基础设施。

- [topoteretes/cognee](https://github.com/topoteretes/cognee) — Stars: 30,670  
  开源 AI 记忆平台，为 Agent 提供跨会话的长期记忆与知识图谱能力。

- [lancedb/lancedb](https://github.com/lancedb/lancedb) — Stars: 11,419  
  开发者友好的嵌入式多模态检索库，主打“搜索更多、管理更少”。

### 3. 趋势信号分析

今日最明显信号是 **Agent 技能生态的兴起**：agent-skills、Claude-Red 等不再仅强调通用 Agent 框架，而是把“技能包”做成可注册、可审计、可插拔的单元，说明 Agent 工程正从框架竞争走向工具链与生态治理。

第二个信号是 **本地化与高效推理获得高热度**：colibri 用纯 C 流式加载 MoE，VoiceStudio 完全本地化替代闭源语音 API，anything-llm 主打本地 RAG，反映开发者对成本、隐私与自主可控的强烈偏好。

第三个信号是 **安全与垂直场景的 Agent 落地加速**：pentagi、open-code-review 将 AI 用于渗透测试和代码审查；OpenMontage、YuE、MathModelAgent 则深入视频、音乐、科研写作等具体生产流程。

RAG/向量数据库仍是稳定底座，LlamaIndex、Milvus、Qdrant 等持续活跃。与此同时，Rust/Go 项目在 AI 基础设施中频繁出现，显示系统级 AI 工具正在向高性能原生语言迁移。

### 4. 社区关注热点

- **Agent Skills / 技能注册表**：agent-skills、Claude-Red 等将能力封装为可验证、可复用的 SKILL.md 文件，可能成为下一代 Agent 生态的标准件。
- **本地优先 AI**：VoiceStudio、anything-llm、colibri 等强调“不依赖云端/API”，值得关注其在隐私与成本敏感场景的进一步扩散。
- **AI 安全攻防**：pentagi、Claude-Red、open-code-review 将 LLM Agent 用于渗透测试、红队与代码安全审查，安全自动化方向升温明显。
- **前沿 System Prompt 研究**：system_prompts_leaks 以公开方式整理多家模型厂商的提示词，成为理解模型边界与产品策略的非官方资料库。
- **垂直 Agent 快速落地**：从数学建模、股票分析、求职、视频制作到音乐生成，Agent 已从 demo 走向可交付的具体工作流。

---

## Trending top10项目

1. [JustVugg/colibri](https://github.com/JustVugg/colibri) [C]
   ⭐ 0 | 今日 +868
   在您已有的硬件上运行前沿MoE模型——纯C实现，零依赖，专家从磁盘流式加载。引擎极小，模型巨大。🐦
2. [ever-co/ever-gauzy](https://github.com/ever-co/ever-gauzy) [TypeScript]
   ⭐ 0 | 今日 +191
   Ever® Gauzy™ - 开放式业务管理平台（ERP/CRM/HRM/ATS/PM）- https://gauzy.co
3. [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) [JavaScript]
   ⭐ 0 | 今日 +2680
   浏览器中的间谍卫星模拟器，但数据是真实的。在照片级逼真的3D地球上实时开源空间智能。
4. [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) [TypeScript]
   ⭐ 0 | 今日 +265
   面向专业AI编程智能体的安全、经过验证的技能注册表。自信地扩展Antigravity、Claude Code、Cursor、Copilot等。
5. [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) [TypeScript]
   ⭐ 0 | 今日 +432
   开源AI销售操作系统——自带AI智能体和WhatsApp (WAHA)的自托管CRM。对于任何通过聊天销售的企业，是Kommo、Octadesk和Intercom的开放替代品。支持MCP、多租户、符合LGPD。
6. [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) [Python]
   ⭐ 0 | 今日 +380
   全球首个开源、智能体驱动的视频制作系统。12条制作流水线、100多个工具、700多个智能体技能和制作知识文件。将您的AI编程助手变成完整的视频制作工作室。
7. [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) [JavaScript]
   ⭐ 0 | 今日 +706
   从Anthropic提取的系统提示词——Claude Fable 5.1、Opus 5、Claude Design、Claude Code。OpenAI——ChatGPT GPT-6-Astra、Codex。Google——Gemini 3.8 Flash、3.1 Pro、Antigravity。xAI——Grok、Grok Bot、Cursor、Kimi等！定期更新。
8. [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) [Go]
   ⭐ 0 | 今日 +590
   能够执行复杂渗透测试任务的完全自主AI智能体系统。
9. [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) [Python]
   ⭐ 0 | 今日 +487
   YuE2：前沿音乐生成，具备符号规划、零样本翻唱和智能体音乐编辑。
10. [yuliskov/SmartTube](https://github.com/yuliskov/SmartTube) [Java]
   ⭐ 0 | 今日 +233
   在Android TV上按自己的规则浏览媒体内容。
