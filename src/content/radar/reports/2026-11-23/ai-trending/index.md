---
title: "AI 开源趋势日报"
published: 2026-11-23
report: "ai-trending"
tags:
  - radar
---
# AI 开源趋势日报 2026-11-23

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-11-23 00:00 UTC

---

# AI 开源趋势日报（2026-11-23）

## 今日速览

今日 GitHub AI 开源生态呈现明显的“Agent 化”爆发态势，Claude Code 技能包、MCP 技能库及 Agent-Native CLI 工具集中登榜，反映开发者正将大模型能力从对话界面迁移至终端、编辑器及 CI/CD 流水线。轻量级模型训练（如 64M 参数 LLM 两小时训练）与本地推理优化（OpenVINO、Apple Silicon tiny-LLM）成为社区关注焦点，降低了个人开发者的模型定制门槛。同时，AI 视频剪辑等垂直应用开始进入实用化阶段，显示多模态生成正从研究走向桌面级产品。

## 各维度热门项目

### 🔧 AI 基础工具（框架、SDK、推理引擎、开发工具、CLI）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) | - / +158 | Intel 开源 AI 推理加速工具链，今日持续登榜，凸显边缘与本地部署需求。 |
| [cursor/plugins](https://github.com/cursor/plugins) | - / +294 | Cursor 官方插件规范与生态库，标志 AI 编辑器正向插件化平台演进。 |
| [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) | - / +699 | 致力于让所有软件变为“Agent-Native”的 CLI 中心，连接传统命令行与智能体。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | 5,803 / - | 针对 Apple Silicon 构建的微型 vLLM + Qwen 推理系统，适合系统工程师学习与本地部署。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | 7,624 / - | 支持 100+ 数据集的 LLM 评测平台，覆盖主流模型厂商，是模型能力对比的基础设施。 |

### 🤖 AI 智能体/工作流（Agent 框架、自动化、多智能体）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) | - / +1716 | 今日涨幅冠军，提供 82 项 Claude Code 安全技能与 681 个漏洞报告模板，推动 AI 红队实战化。 |
| [obra/superpowers](https://github.com/obra/superpowers) | - / +788 | Agentic 技能框架与软件开发方法论，主张通过技能组合构建智能化工作流。 |
| [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | - / +494 | 基于 Stitch MCP 服务器的 Agent 技能库，遵循 Agent Skills 开放标准，增强编码 Agent 能力。 |
| [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | - / +668 | 跨 Reddit、X、YouTube 等多源信息的 AI 调研技能，自动合成可引用的总结报告。 |
| [Tracer-Cloud/opensre](https://github.com/Tracer-Cloud/opensre) | - / +399 | 面向 CI/CD 可靠性的开源 Agent，将 AI 引入 DevOps 运维与故障排查。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 9,225 / - | Rust 编写的模块化 LLM 应用框架，适合构建可扩展的智能体系统。 |
| [Eigenwise/atomic-agents](https://github.com/Eigenwise/atomic-agents) | 6,345 / - | 主张“原子化”构建 AI Agent，通过细粒度组件降低多智能体开发复杂度。 |

### 📦 AI 应用（具体应用产品、垂直场景解决方案）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [zhouxiaoka/autoclip](https://github.com/zhouxiaoka/autoclip) | - / +641 | 开源 AI 视频剪辑桌面工具，一键将长视频转为短视频并生成字幕、封面与发布文案。 |
| [acon96/home-llm](https://github.com/acon96/home-llm) | 1,497 / - | Home Assistant 本地 LLM 集成，实现基于本地大模型的智能家居控制。 |

### 🧠 大模型/训练（模型权重、训练框架、微调工具）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | 68,631 / +473 | 两小时从零训练 64M 参数大模型，极大降低个人开发者的模型预训练门槛。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | 108,839 / - | PyTorch 逐步实现类 ChatGPT 大模型的经典教学仓库，持续受到社区追捧。 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | 79,852 / - | 从零学习 AI 工程化的综合资源，涵盖训练、部署与产品化全流程。 |
| [galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining) | 352 / - | 面向基础模型与世界模型的可扩展预训练库，强调稳定性与最小化设计。 |

### 🔍 RAG/知识库（向量数据库、检索增强、知识管理）

| 项目 | Stars（总量/今日新增） | 一句话说明 |
|------|----------------------|-----------|
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | - / +915 | 面向 AI Agent 的知识基础设施，统一接入 550+ 数据源，提供搜索、抓取与结构化访问。 |

## 趋势信号分析

今日热榜显示，**AI 智能体技能化与工具链 Agent-Native** 正获得社区爆发式关注。Claude-BugHunter 单日涨超 1700 星，超越传统基础设施项目，说明开发者更倾向于直接可用的“技能包”而非底层框架；Cursor 插件、Stitch MCP 技能库及 CLI-Anything 的集中出现，标志 AI 能力正从聊天界面向终端、编辑器及 CI/CD 流水线渗透。在模型层，minimind 的“两小时训 64M LLM”与 tiny-LLM 的 Apple Silicon 推理优化，反映轻量化、本地化模型训练与部署成为新兴方向，可能与近期端侧模型发布及隐私计算趋势相关。Firecrawl 的高涨幅则印证 RAG 领域对统一数据接入层的强烈需求。总体而言，2026 年底的开源 AI 正从“大模型竞赛”转向“Agent 应用化与工程化落地”。

## 社区关注热点

- **Claude-BugHunter**：今日涨幅最高的 AI 项目，适合安全研究员快速构建基于 Claude Code 的红队与漏洞挖掘工作流。
- **Firecrawl**：为 Agent 提供统一数据抓取与检索能力，是构建 RAG 与知识增强应用的关键基础设施。
- **minimind**：极低门槛的大模型预训练示例，适合希望快速理解模型训练全流程的开发者。
- **OpenVINO**：持续登榜的推理引擎，适合需要在边缘设备或本地环境部署 AI 模型的团队。
- **autoclip**：垂直 AI 应用代表，展示多模态生成在视频内容再创作中的实用化路径。

---

## Trending top10项目

1. [elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter) [Python]
   ⭐ 0 | 今日 +1716
   面向漏洞挖掘与外部红队工作的 Claude Code 技能包——82 项技能、15 个斜杠命令、跨 24 类核心漏洞的 681 个披露报告模式，外加企业身份与基础设施攻击矩阵。
2. [obra/superpowers](https://github.com/obra/superpowers) [Shell]
   ⭐ 0 | 今日 +788
   好用的智能体技能框架与软件开发方法论。
3. [HKUDS/CLI-Anything](https://github.com/HKUDS/CLI-Anything) [Python]
   ⭐ 0 | 今日 +699
   “CLI-Anything：让所有软件原生支持智能体”——CLI-Hub: https://clianything.cc/
4. [jingyaogong/minimind](https://github.com/jingyaogong/minimind) [Python]
   ⭐ 0 | 今日 +473
   🧠 两小时从零训练出你的 64M 大模型。从零开始，2 小时训练自己的 64M LLM。
5. [cursor/plugins](https://github.com/cursor/plugins) [TypeScript]
   ⭐ 0 | 今日 +294
   Cursor 插件规范与官方插件
6. [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) [TypeScript]
   ⭐ 0 | 今日 +915
   让智能体更智能的知识基础设施。通过一个 API 搜索、抓取并访问 550+ 个数据提供商。
7. [nginx/nginx](https://github.com/nginx/nginx) [C]
   ⭐ 0 | 今日 +163
   NGINX 开源版官方仓库。
8. [openvinotoolkit/openvino](https://github.com/openvinotoolkit/openvino) [C++]
   ⭐ 0 | 今日 +158
   OpenVINO™ 是用于优化和部署 AI 推理的开源工具包。
9. [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) [HTML]
   ⭐ 0 | 今日 +518
   面向 Claude Code、Codex、GitHub Copilot、Cursor、Factory Droid、Qoder 和 Pi 的编辑型图表设计。45 种图表类型。自包含 HTML + SVG。无阴影。无 Mermaid 垃圾。
10. [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) [Python]
   ⭐ 0 | 今日 +668
   AI 智能体技能，可在 Reddit、X、YouTube、HN、Polymarket 和网络上调研任何主题，然后合成有依据的摘要。
