---
title: "AI 开源趋势日报"
published: 2026-09-11
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-09-11

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-11 00:00 UTC

---

# AI 开源趋势日报

**日期：2026-09-11**


## 一、今日速览

今日 AI 开源领域最显著的趋势是 **Agent Skills（智能体技能）框架的集中爆发**——Trending 榜单前 16 名中超过一半与 AI 编码智能体相关，其中 `i-have-adhd`、`superpowers`、`vercel-labs/skills` 三个项目均围绕"如何让编码 Agent 输出更可控、更结构化"这一核心痛点展开。与此同时，**AI 网关/多模型路由**成为第二热点，`OmniRoute`（352 家提供商）和 `llmfit`（本地硬件适配）分别从云端聚合与本地推理两个方向切入。此外，**多智能体教育场景**（OpenMAIC）和**本地优先的 AI 编码桌面端**（PI-Desktop）显示出 AI 工具正在从云端向端侧、从通用向垂直场景纵深渗透。


## 二、各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars | 说明 |
|------|-------|------|
| [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) | ⭐0 (+258 today) | Rust 编写的本地模型适配工具，一条命令检测数百个模型在你的硬件上的可运行性，直击"我的机器能跑什么模型"的选型痛点 |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | ⭐0 (+98 today) | 纯 C 零依赖的 MoE 模型推理引擎，专家权重从磁盘流式加载，让前沿 MoE 模型跑在消费级硬件上成为可能 |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | ⭐0 (+626 today) | 免费 MIT 协议 AI 网关，统一端点接入 352 家提供商、1200+ 模型，兼容 Claude Code 等主流工具链 |
| [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) | ⭐0 (+841 today) | 腾讯出品的团队 AI 原生化 CLI 工具，将 AI 能力嵌入团队协作工作流 |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | ⭐0 (+122 today) | Vercel 官方开源的 Agent Skills 工具，`npx skills` 一键安装和管理智能体技能包 |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | ⭐0 (+624 today) | Electron + Rust 构建的本地优先 AI 编码桌面端，支持用户自装插件，强调数据主权与离线可用 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars | 说明 |
|------|------|------|
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | ⭐0 (+3882 today) | 今日增速最快的项目，一个"ADHD 友好"的编码 Agent 输出控制技能，防止 Agent 把答案埋在冗长输出中 |
| [obra/superpowers](https://github.com/obra/superpowers) | ⭐0 (+732 today) | Agentic Skills 框架 + 软件开发方法论，主张通过技能封装让 Agent 行为可预测、可复用 |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | ⭐0 (+277 today) | 开源 AI 交易智能体，自主运行于 1000+ 市场（Polymarket、Kalshi、Binance、Hyperliquid 等），跨 5 条 EVM 链 |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | ⭐0 (+837 today) | 清华大学开源的多智能体互动课堂，一键获得沉浸式多 Agent 学习体验 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | ⭐8,586 | Rust 生态的模块化 LLM 应用框架，为高性能、类型安全的 Agent 开发提供基础设施 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars | 说明 |
|------|------|------|
| [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) | ⭐0 (+1762 today) | 浏览器中的"间谍卫星模拟器"，使用真实开源空间情报数据在照片级 3D 地球上实时渲染 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | ⭐0 (+1294 today) | 38 种编辑类图表模板，专为 Claude Code、Codex、Pi 等编码 Agent 设计，自包含 HTML+SVG，无阴影无 Mermaid 冗余 |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | ⭐0 (+962 today) | GPT Image 2/2.5 提示词与案例库，530+ 案例、20+ 工业级模板，含同提示词版本对比专区 |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | ⭐0 (+142 today) | 跨平台桌面应用，自动将文档转化为有机关联的知识库，替代传统手动整理 |
| [acon96/home-llm](https://github.com/acon96/home-llm) | ⭐1,431 | Home Assistant 集成 + 本地 LLM 模型，实现智能家居的自然语言控制 |
| [ScrapeGraphAI/Scrapegraph-ai](https://github.com/ScrapeGraphAI/Scrapegraph-ai) | ⭐30,808 | 基于 AI 的 Python 爬虫框架，用自然语言描述即可完成网页数据提取 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars | 说明 |
|------|------|------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | ⭐60,543 | 2 小时从零训练一个 64M 参数的 LLM，极简教学级实现，是 LLM 入门训练的首选参考 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | ⭐4,557 | 面向系统工程师的 LLM 推理系统教程，在 Apple Silicon 上构建迷你版 vLLM + Qwen |
| [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) | ⭐3,090 | MatMul-free 语言模型的官方实现，探索无矩阵乘法的高效 LLM 架构 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | ⭐104,713 | 从零用 PyTorch 逐步实现 ChatGPT 类 LLM，经典 LLM 学习资源 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | ⭐165,089 | 业界标准的模型定义框架，覆盖文本、视觉、音频、多模态的推理与训练 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | ⭐7,414 | LLM 评测平台，支持 100+ 数据集，覆盖 Llama、Mistral、GPT-4、Qwen、Claude 等主流模型 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars | 说明 |
|------|------|------|
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | ⭐0 (+142 today) | 自动将文档转化为互联知识库的桌面应用，属于 RAG 在个人知识管理场景的落地 |
| [apache/casbin-gateway](https://github.com/apache/casbin-gateway) | ⭐623 | Casbin AI & MCP 安全网关，为 LLM 应用提供 HTTP 层的访问控制与安全防护 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | ⭐550 | 通用 LLM 网关，OpenAI/Anthropic 兼容端点 + 多提供商翻译 + 智能负载均衡 |
| [RiccardoBiosas/awesome-MLSecOps](https://github.com/RiccardoBiosas/awesome-MLSecOps) | ⭐467 | MLSecOps 工具与资源精选列表，涵盖对抗性 ML 防御、LLM 安全、AI 红队测试等 |


## 三、趋势信号分析

**Agent Skills 正在成为 AI 编码领域的新基础设施层。** 今日 Trending 榜单中，`i-have-adhd`（+3882）、`superpowers`（+732）、`vercel-labs/skills`（+122）三个项目不约而同地聚焦于同一个问题：如何让编码 Agent 的输出更可控、更结构化。这标志着社区关注点正从"让 Agent 能干活"转向"让 Agent 干得符合预期"——技能封装（Skill Packaging）正在成为继 Prompt Engineering、Function Calling 之后的第三层抽象。`i-have-adhd` 以单日近 4000 stars 的增速登顶，说明开发者对 Agent 输出质量的痛点感同身受。

**第二个显著信号是"本地优先"与"硬件适配"的崛起。** `colibri`（纯 C MoE 推理）、`llmfit`（硬件适配检测）、`PI-Desktop`（本地优先桌面端）三个项目同时上榜，反映出社区对云端 API 成本与数据主权的持续焦虑。这与近期开源 MoE 模型（如 Mixtral、DeepSeek-V3 系列）的成熟直接相关——模型能力提升使得本地部署的性价比拐点正在到来。

**第三个信号是 AI 网关赛道的白热化。** `OmniRoute`（+626）和 `LLM-API-Key-Proxy`（550 stars）代表了"一个端点接入所有模型"的聚合趋势，而 `llmfit` 则从硬件侧反向切入。多提供商路由、智能负载均衡、成本优化正在成为 AI 基础设施的标配能力。


## 四、社区关注热点

- **[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)** — 单日 +3882 stars 的爆发性增长，直击编码 Agent 输出冗长、重点淹没的核心痛点，值得所有使用 Claude Code / Codex 的开发者立即尝试
- **[JustVugg/colibri](https://github.com/JustVugg/colibri)** — 纯 C 零依赖的 MoE 推理引擎，如果其"专家流式加载"方案成熟，将大幅降低前沿模型的本地部署门槛，是硬件受限开发者的福音
- **[THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC)** — 清华开源的多智能体互动课堂，将多 Agent 协作从工程场景拓展到教育场景，代表了 AI 原生教学的新范式
- **[cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design)** — 专为编码 Agent 设计的图表模板库，解决了 Agent 生成图表"千篇一律 Mermaid 风"的审美疲劳问题，是 Agent 输出质量工程化的典型案例
- **[Tencent/teamai-cli](https://github.com/Tencent/teamai-cli)** — 腾讯在 AI 团队协作工具链的布局，+841 today 的增速表明企业级 AI 原生工作流正在成为大厂竞争的新战场

---

## Trending top10项目

1. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) [Python]
   ⭐ 0 | 今日 +3882
   一个技能，可阻止你的编程智能体埋没答案。适合 ADHD 的输出方式。
2. [bilawalsidhu/gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) [JavaScript]
   ⭐ 0 | 今日 +1762
   浏览器中的间谍卫星模拟器，但数据是真实的。在逼真的 3D 地球仪上提供实时开源空间情报。
3. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +732
   一个行之有效的智能体技能框架与软件开发方法论。
4. [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) [TypeScript]
   ⭐ 0 | 今日 +277
   开源 AI 交易智能体，可自主运行于 1000 多个市场——Polymarket、Kalshi、Binance、Hyperliquid、Solana DEX、5 条 EVM 链。扫描优势机会、即时执行、在你睡觉时管理风险。用于机器对机器支付的智能体商务协议。可自托管。基于 Claude 构建。
5. [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) [TypeScript]
   ⭐ 0 | 今日 +841
   让每个团队都成为 AI 原生团队
6. [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) [Rust]
   ⭐ 0 | 今日 +258
   数百个模型与提供商。一条命令即可找到可在你的硬件上运行的内容。
7. [liquidslr/system-design-notes](https://github.com/liquidslr/system-design-notes)
   ⭐ 0 | 今日 +900
   《系统设计面试——内行指南》一书的笔记
8. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +1294
   适用于 Claude Code、Codex 和 Pi 的 38 种编辑图表类型。自包含的 HTML + SVG。无阴影。无 Mermaid 劣质内容。
9. [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) [JavaScript]
   ⭐ 0 | 今日 +962
   提示词即代码 | GPT Image 2 / 2.5 提示词与案例库，530+ 个案例、20+ 套工业级模板与可复用 Skills，新增 2.5 同提示词对比专区，附完整提示词与生成记录，持续更新。
10. [armory3d/armorpaint](https://github.com/armory3d/armorpaint) [C]
   ⭐ 0 | 今日 +72
   图形创作工具
