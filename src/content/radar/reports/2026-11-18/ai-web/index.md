---
title: "AI 官方内容追踪报告"
published: 2026-11-18
report: "ai-web"
tags:
  - radar
---
# AI 官方内容追踪报告 2026-11-18

> 今日更新 | 新增内容: 204 篇 | 生成时间: 2026-11-18 00:00 UTC

数据来源:
- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 3 篇（sitemap 共 499 条）
- OpenAI: [openai.com](https://openai.com) — 新增 201 篇（sitemap 共 1136 条）

---

# AI 官方内容追踪报告（2026-11-18）

**数据来源**：Anthropic（claude.com / anthropic.com）与 OpenAI（openai.com）官网增量抓取  
**抓取日期**：2026-11-18  
**内容时效**：聚焦 2026-11-17 发布/更新的增量内容

---

## 1. 今日速览

- **Anthropic** 同日发布 3 篇高密度内容，聚焦金融服务垂直化落地（Claude for Excel、实时行情连接器、预构建 Agent Skills）与两项前沿研究：大规模形式化软件验证（RISC-V 汇编层面，覆盖 100+ 开源库）和安全评估方法论框架（Design–Run–Report）。
- **OpenAI** 同日产出 201 条增量内容，标题矩阵高度密集，涵盖 GPT-6（Astra / Sol / Luna / Cyber）、GPT-5 系列、O3/O4 Mini、Sora 2、Codex 升级，以及 ChatGPT 在医疗、金融、销售、学术等垂直领域的专项产品；但抓取过程未能提取正文节选，以下分析基于标题与 URL 推断，并明确标注原文不可用。
- 两家公司在 11 月 17 日集中更新，显示出年底前模型发布、企业产品化与安全合规布局的高频节奏，竞争已从单一模型能力转向“垂直工作流嵌入 + 可证明安全 + 全栈生态”的综合比拼。

---

## 2. Anthropic / Claude 内容精选

Anthropic 今日增量共 3 篇，分布于 `news` 与 `research` 两个分类，无重复条目，内容完整可提取。

### 2.1 Product / News

| 标题 | 分类 | 发布日期 | 原文链接 |
|------|------|----------|----------|
| Advancing Claude for Financial Services | news | 2026-11-17（抓取日期；原文标注 Published Oct 27, 2025） | https://www.anthropic.com/news/advancing-claude-for-financial-services |

**核心提炼**：
- Anthropic 推出 **Claude for Excel（Beta/研究预览）**，用户可在 Excel 侧边栏直接与 Claude 交互，支持读取、分析、修改和创建工作簿，并提供完整操作透明度（可追溯至引用单元格）。
- 新增连接实时市场数据与投资组合分析的连接器，以及预构建 **Agent Skills**（如构建现金流折现 DCF 模型、发起覆盖报告），直接嵌入金融从业者的日常工具链。
- 依托 **Sonnet 4.5** 在 Vals AI Finance Agent 基准测试中取得 **55.3% 准确率**，标志着 Anthropic 正从通用模型能力向“金融领域可落地的 Agent 工作流”转型。

### 2.2 Research

| 标题 | 分类 | 发布日期 | 原文链接 |
|------|------|----------|----------|
| LLMs are making formal software verification feasible at a much larger scale | research | 2026-11-17（抓取日期；原文标注 Published Oct 22, 2026） | https://www.anthropic.com/research/formal-verification |

**核心提炼**：
- Anthropic 与 **Theorem** 合作，使用 Claude 在 **RISC-V 汇编代码层面** 对 100 多个真实世界开源软件库证明安全属性，宣称这是首次利用 AI 进行大规模形式化软件验证。
- 研究主张将传统测试转化为可机器检查的形式化证明，从根本上解决“软件漏洞被 AI 轻易发现并利用”的网络安全难题，为关键基础设施代码提供可验证的安全担保。
- 该工作隐含 Anthropic 对“可证明 AI（Provable AI）”的长期投入，与通用能力竞赛形成差异化定位。

| 标题 | 分类 | 发布日期 | 原文链接 |
|------|------|----------|----------|
| Building strong safety evaluations | research | 2026-11-17（抓取日期；原文标注 Published Nov 13, 2026） | https://www.anthropic.com/research/building-strong-safety-evaluations |

**核心提炼**：
- 发布安全评估（Safety Evals）方法论框架，涵盖 **Design、Run、Report、Where to start** 四个阶段，旨在解决“安全主张仅与其背后评估等同强弱”的问题。
- 明确区分“用户主动请求有害输出”与“看似无害但可能导致意外伤害的请求（如药物剂量咨询）”，强调安全评估应测量伤害发生的倾向性与严重度，而非单一能力指标。
- 文中自省式指出现有 AI 评估易被刷分（gaming）、指标漂移、文档不足以复现，体现 Anthropic 在安全治理上的透明度与方法论严谨性。

---

## 3. OpenAI 内容精选

OpenAI 今日增量共 201 条，但所有条目的“内容节选”均显示为“（无法提取文本内容）”，且大量标题重复出现（如 GPT-6 Astra、Introducing GPT-6 Sol And Luna、Introducing GPT-5-2 Codex 等各出现 2–3 次）。以下按主题对标题进行分类精选，**基于标题与 URL 推断其可能含义，并明确标注原文正文不可用**。

### 3.1 模型发布与前沿能力（Research / Release）

| 标题（推断主题） | 分类 | 发布日期 | 原文链接 |
|------------------|------|----------|----------|
| Gpt 6 Astra | index | 2026-11-17 | https://openai.com/index/gpt-6-astra/ |
| Introducing Gpt 6 Sol And Luna | index | 2026-11-17 | https://openai.com/index/introducing-gpt-6-sol-and-luna/ |
| Introducing Gpt 6 2 Astra Sol | index | 未知 | https://openai.com/index/introducing-gpt-6-2-astra-sol/ |
| Introducing O3 And O4 Mini | index | 2026-11-17 | https://openai.com/index/introducing-o3-and-o4-mini/ |
| Introducing Gpt 4 5 | index | 2026-11-17 | https://openai.com/index/introducing-gpt-4-5/ |
| Introducing Gpt 5 4 | index | 2026-11-17 | https://openai.com/index/introducing-gpt-5-4/ |
| Introducing Gpt 5 6 Frontier Intelligence Efficiency | index | 2026-11-17 | https://openai.com/index/gpt-5-6-frontier-intelligence-efficiency/ |
| Advancing The Price Performance Frontier With Gpt 5 6 | index | 2026-11-17 | https://openai.com/index/advancing-the-price-performance-frontier-with-gpt-5-6/ |
| Introducing Gpt 5 For Developers | index | 2026-11-17 | https://openai.com/index/introducing-gpt-5-for-developers/ |
| Introducing Sora 2 | index | 2026-11-17 | https://openai.com/index/sora-2/ |
| Introducing Our Next Generation Audio Models | index | 2026-11-17 | https://openai.com/index/introducing-our-next-generation-audio-models/ |
| Introducing Images 2 6 | index | 2026-11-17 | https://openai.com/index/introducing-images-2-6/ |
| Introducing Gpt Realtime | index | 2026-11-17 | https://openai.com/index/introducing-gpt-realtime/ |
| Introducing Gpt Live | index | 2026-11-17 | https://openai.com/index/introducing-gpt-live/ |
| Introducing Gpt Live 1 In The Api | index | 2026-11-17 | https://openai.com/index/introducing-gpt-live-1-in-the-api/ |

**推断与备注**：OpenAI 正在密集发布 GPT-6 系列（Astra/Sol/Luna/Cyber 等分支）与 GPT-5 系列多个子版本，同时伴随 O3/O4 Mini、Sora 2、下一代音频模型、Images 2.6 等多模态与实时模型。由于正文不可提取，无法确认具体发布状态（预览/正式/API 可用）及性能指标。

### 3.2 企业产品与垂直行业应用（Release / Product）

| 标题（推断主题） | 分类 | 发布日期 | 原文链接 |
|------------------|------|----------|----------|
| Introducing Chatgpt Financial Services | index | 2026-11-17 | https://openai.com/index/introducing-chatgpt-financial-services/ |
| More Ways To Move Care Forward With Chatgpt For Healthcare | index | 2026-11-17 | https://openai.com/index/more-ways-to-move-care-forward-with-chatgpt-for-healthcare/ |
| Making Chatgpt Better For Clinicians | index | 2026-11-17 | https://openai.com/index/making-chatgpt-better-for-clinicians/ |
| Advancing Computer Use For Healthcare Teams | index | 2026-11-17 | https://openai.com/index/advancing-computer-use-for-healthcare-teams/ |
| Introducing Chatgpt For Sales | index | 2026-11-17 | https://openai.com/index/introducing-chatgpt-for-sales/ |
| Chatgpt For Academic Researchers | index | 2026-11-17 | https://openai.com/index/chatgpt-for-academic-researchers/ |
| Expanding Chatgpt For Academic Researchers | index | 2026-11-17 | https://openai.com/index/expanding-chatgpt-for-academic-researchers/ |
| Introducing The Rosalind Academic Plan | index | 2026-11-17 | https://openai.com/index/introducing-the-rosalind-academic-plan/ |
| Introducing Workspace Agents In Chatgpt | index | 2026-11-17 | https://openai.com/index/introducing-workspace-agents-in-chatgpt/ |
| Introducing The Agents Api | index | 2026-11-17 | https://openai.com/index/introducing-the-agents-api/ |
| Dell Codex Enterprise Partnership | index | 2026-11-17 | https://openai.com/index/dell-codex-enterprise-partnership/ |
| Openai Servicenow Partnership Expansion | index | 2026-11-17 | https://openai.com/index/openai-servicenow-partnership-expansion/ |
| Oracle Apps In Chatgpt | index | 2026-11-17 | https://openai.com/index/oracle-apps-in-chatgpt/ |
| Chatgpt Enterprise Aws Marketplace | index | 2026-11-17 | https://openai.com/index/chatgpt-enterprise-aws-marketplace/ |
| Introducing Businesses Chatgpt | index | 2026-11-17 | https://openai.com/index/introducing-businesses-chatgpt/ |
| Premium Seats Chatgpt Business | index | 2026-11-17 | https://openai.com/index/premium-seats-chatgpt-business/ |

**推断与备注**：OpenAI 正在推进“ChatGPT for X”垂直化矩阵，直接对标 Anthropic 在金融、医疗领域的深耕。同时通过 Workspace Agents、Agents API、Dell/Servicenow/Oracle/AWS 等合作，构建企业级 Agent 基础设施。

### 3.3 开发者工具与 API（Release / Engineering）

| 标题（推断主题） | 分类 | 发布日期 | 原文链接 |
|------------------|------|----------|----------|
| Introducing Upgrades To Codex | index | 2026-11-17 | https://openai.com/index/introducing-upgrades-to-codex/ |
| Introducing Gpt 5 3 Codex | index | 2026-11-17 | https://openai.com/index/introducing-gpt-5-3-codex/ |
| Introducing Gpt 5 2 Codex | index | 2026-11-17 | https://openai.com/index/introducing-gpt-5-2-codex/ |
| Work With Codex From Anywhere | index | 2026-11-17 | https://openai.com/index/work-with-codex-from-anywhere/ |
| Introducing Improvements To The Fine Tuning Api And Expanding Our Custom Models Program | index | 2026-11-17 | https://openai.com/index/introducing-improvements-to-the-fine-tuning-api-and-expanding-our-custom-models-program/ |
| Decisions Api | index | 2026-11-17 | https://openai.com/index/decisions-api/ |
| Openai Api | index | 2026-11-17 | https://openai.com/index/openai-api/ |
| Openai Frontier Models And Codex Are Now Available On Aws | index | 2026-11-17 | https://openai.com/index/openai-frontier-models-and-codex-are-now-available-on-aws/ |
| Openai On Aws | index | 2026-11-17 | https://openai.com/index/openai-on-aws/ |
| Better Prompt Caching For Gpt 6 | index | 2026-11-17 | https://openai.com/index/better-prompt-caching-for-gpt-6/ |
| The Next Evolution Of The Agents Sdk | index | 2026-11-17 | https://openai.com/index/the-next-evolution-of-the-agents-sdk/ |

**推断与备注**：Codex 系列与 GPT-5 系列针对开发者场景进行细分，Fine-tuning API 与 Custom Models 程序扩张表明 OpenAI 在加强企业私有化模型定制能力；AWS 合作多条标题暗示其基础设施分销正在加速。

### 3.4 安全、合规与社会治理（Safety / Company）

| 标题（推断主题） | 分类 | 发布日期 | 原文链接 |
|------------------|------|----------|----------|
| Safety Overview Gpt 6 Astra | index | 2026-11-17 | https://openai.com/index/safety-overview-gpt-6-astra/ |
| How We Detect Frontier Model Misalignment | index | 2026-11-17 | https://openai.com/index/how-we-detect-frontier-model-misalignment/ |
| Introducing Lockdown Mode And Elevated Risk Labels In Chatgpt | index | 2026-11-17 | https://openai.com/index/introducing-lockdown-mode-and-elevated-risk-labels-in-chatgpt/ |
| Introducing Parental Controls | index | 2026-11-17 | https://openai.com/index/introducing-parental-controls/ |
| Strengthening Online Child Safety | index | 2026-11-17 | https://openai.com/index/strengthening-online-child-safety/ |
| Community Safety Report And New Protections For Teens | index | 2026-11-17 | https://openai.com/index/community-safety-report-and-new-protections-for-teens/ |
| Supporting California Bill Advance Ai Youth Safety | index | 2026-11-17 | https://openai.com/index/supporting-california-bill-advance-ai-youth-safety/ |
| Why Teens Deserve Access Safe Ai | index | 2026-11-17 | https://openai.com/index/why-teens-deserve-access-safe-ai/ |
| Our Approach To Age Prediction | index | 2026-11-17 | https://openai.com/index/our-approach-to-age-prediction/ |
| Introducing Data Residency In Europe | index | 2026-11-17 | https://openai.com/index/introducing-data-residency-in-europe/ |
| Introducing Data Residency In Asia | index | 2026-11-17 | https://openai.com/index/introducing-data-residency-in-asia/ |
| Coordinated Disclosure Of Critical Vulnerabilities | index | 2026-11-17 | https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities/ |
| Disrupting Malicious Uses Of Ai | index | 2026-11-17 | https://openai.com/index/disrupting-malicious-uses-of-ai/ |
| Introducing Gpt Oss Safeguard | index | 2026-11-17 | https://openai.com/index/introducing-gpt-oss-safeguard/ |
| Introducing Gpt Oss | index | 2026-11-17 | https://openai.com/index/introducing-gpt-oss/ |

**推断与备注**：OpenAI 在未成年人保护、数据驻留（欧洲/亚洲）、模型失配检测、锁定模式（Lockdown Mode）等合规与安全领域发布密集，可能与全球监管收紧及企业客户合规要求直接相关。

### 3.5 商业化、广告与增长（Company / Business）

| 标题（推断主题） | 分类 | 发布日期 | 原文链接 |
|------------------|------|----------|----------|
| Introducing Chatgpt Wallet | index | 2026-11-17 | https://openai.com/index/introducing-chatgpt-wallet/ |
| Expanding Access To Ai With Chatgpt Ads | index | 2026-11-17 | https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/ |
| New Chatgpt Ads Format And Measurement | index | 2026-11-17 | https://openai.com/index/new-chatgpt-ads-format-and-measurement/ |
| Testing Ads In Chatgpt | index | 2026-11-17 | https://openai.com/index/testing-ads-in-chatgpt/ |
| Reimagining Advertising With Ai | index | 2026-11-17 | https://openai.com/index/reimagining-advertising-with-ai/ |
| Our Approach To Advertising And Expanding Access | index | 2026-11-17 | https://openai.com/index/our-approach-to-advertising-and-expanding-access/ |
| Chatgpt Ads Expands 26 New Countries | index | 2026-11-17 | https://openai.com/index/chatgpt-ads-expands-26-new-countries/ |
| Powering Product Discovery In Chatgpt | index | 2026-11-17 | https://openai.com/index/powering-product-discovery-in-chatgpt/ |
| Openai To Acquire Pierre | index | 2026-11-17 | https://openai.com/index/openai-to-acquire-pierre/ |
| Dan Driscoll Joins Openai | index | 2026-11-17 | https://openai.com/index/dan-driscoll-joins-openai/ |
| Jill Hazelbaker Chief Corporate Affairs Officer | index | 2026-11-17 | https://openai.com/index/jill-hazelbaker-chief-corporate-affairs-officer/ |
| Introducing Openai Partner Network | index | 2026-11-17 | https://openai.com/index/introducing-openai-partner-network/ |
| Introducing Openai Presence | index | 2026-11-17 | https://openai.com/index/introducing-openai-presence/ |
| Expanding Our Presence In Brazil | index | 2026-11-17 | https://openai.com/index/expanding-our-presence-in-brazil/ |
| Apple Is Getting This Wrong | index | 2026-11-17 | https://openai.com/index/apple-is-getting-this-wrong/ |

**推断与备注**：ChatGPT Wallet、广告格式与测量、26 国广告扩张等标题表明 OpenAI 正在积极探索以广告和支付为核心的商业化路径；并购 Pierre 与高管任命（Dan Driscoll、Jill Hazelbaker）反映其企业事务与业务发展团队在扩张。

---

## 4. 战略信号解读

### 4.1 各自近期技术优先级

| 维度 | Anthropic | OpenAI |
|------|-----------|--------|
| **模型能力** | 以 Sonnet 4.5 为基础，强调在金融 Agent 基准上的具体准确率（55.3%），走“少而精”的垂直能力验证路线。 | 密集发布 GPT-6 系列（Astra/Sol/Luna/Cyber）、GPT-5 多子版本、O3/O4 Mini、Sora 2、音频与图像模型，保持全模态、全系列的快速迭代节奏。 |
| **安全与可证明性** | 两项研究分别指向“形式化软件验证（RISC-V 汇编层，100+ 库）”和“安全评估方法论框架”，核心信号是 **可证明安全（Provable Safety）** 与评估可复现性。 | 发布 Safety Overview、Misalignment 检测、Lockdown Mode、未成年人保护、数据驻留等，侧重产品层面的安全控制与合规响应。 |
| **产品化与企业落地** | Claude for Excel、实时行情连接器、预构建金融 Agent Skills，强调嵌入现有企业工作流（Excel）并提供操作可追溯性。 | ChatGPT for Healthcare/Financial Services/Sales/Academic Researchers、Workspace Agents、Agents API、Enterprise AWS Marketplace，试图通过垂直产品矩阵占据企业 SaaS 入口。 |
| **生态与基础设施** | 未见重大云厂商合作公告，更侧重模型本身与特定行业工具的集成。 | 多条 AWS、Dell、Servicenow、Oracle 相关标题，显示其正在构建多云、多合作伙伴的企业分销网络。 |

### 4.2 竞争态势：谁在引领议题，谁在跟进

- **Anthropic 引领“可证明 AI 与企业工作流深度嵌入”议题**：形式化验证研究将 AI 安全从“对齐哲学”落地到“汇编代码层的数学证明”，这是目前两家公司中更具技术壁垒的差异化方向；Claude for Excel 则直接切入金融从业者的日常操作界面，而非仅提供聊天界面。
- **OpenAI 引领“模型系列密集发布与全栈商业化”议题**：201 条增量内容的标题密度本身就是一种信号，显示 OpenAI 在模型迭代、多模态、API 生态、广告与支付等方面的扩张速度远超 Anthropic，但也带来信息碎片化与产品线复杂度的风险。
- **跟进关系**：OpenAI 的“ChatGPT for Financial Services /
