# AI CLI 工具社区动态日报 2026-07-27

> 生成时间: 2026-07-27 00:40 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [DeepSeek Reasonix](https://github.com/esengine/DeepSeek-Reasonix)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Hermes](https://github.com/NousResearch/hermes-agent)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具生态对比分析报告 (2026-07-27)

## 1. 生态全景

当前 AI CLI 工具整体处于“能力高速扩展 vs 信任成本陡增”的焦灼期。一方面，各工具密集补齐 Agent 自动化、MCP 集成、多模态交互等核心能力，版本迭代节奏普遍为周级或日级；另一方面，安全边界漏洞（权限绕过、沙箱逃逸、凭据泄漏）和基础稳定性问题（启动崩溃、会话数据丢失、平台兼容性断裂）正在成为社区最尖锐的摩擦点。**“让 Agent 能干更多事”与“让 Agent 不干坏事”之间的平衡，已成为决定工具成熟度的分水岭。**

## 2. 各工具活跃度对比（2026-07-24 UTC 至 2026-07-27）

| 工具 | 过去 24h Issues | 过去 24h PR | 版本发布 |
|------|----------------|------------|---------|
| **Claude Code** | 10（热点） | 7（全部） | 无 |
| **OpenAI Codex** | 10（热点） | 10（重要） | 无 |
| **Gemini CLI** | 10（热点） | 10（重要） | v0.54.0-nightly |
| **DeepSeek Reasonix** | 10（热点） | 10（重要） | desktop-v1.17.21 |
| **OpenCode** | 10（热点） | 10（重要） | 无 |
| **Qwen Code** | 10（热点） | 10（重要） | v0.21.0-nightly |
| **Hermes** | **14（全部）** | **50（全部）** | 无 |

> *数据来源：各工具社区动态日报；部分工具仅列出主要 Issue/PR，未披露全局总数，但热点条目已能反映当日核心关注。*

**活跃度梯队判断：**
- **第一梯队（极高）**：Hermes（PR 50，贡献溢出）
- **第二梯队（中高）**：Claude Code、OpenAI Codex、Gemini CLI、DeepSeek Reasonix、OpenCode、Qwen Code（PR 7-10，持续迭代）
- **版本节奏差异**：DeepSeek Reasonix 与 Qwen Code 保持稳定版/nightly 双轨道发布；Gemini CLI 以夜间构建为主；Claude Code 与 OpenAI Codex 当日未发版，集中精力修复回归。

## 3. 共同关注的功能方向

以下方向跨越 3 个以上工具，为当前社区共识性需求：

| 方向 | 涉及工具 | 具体诉求 |
|------|----------|----------|
| **Agent 安全与权限治理** | **全部 7 个工具** | 细粒度声明式权限（ReadOnly/Destructive）、MCP 调用授权不可绕过、配置与凭据隔离、Hook 静默失败阻断。DeepSeek (#6963)、Qwen Code (#7769)、Claude Code (#81458) 为典型高危案例。 |
| **思考过程透明化 / TUI 可观测性** | Claude Code、Hermes、DeepSeek Reasonix、Gemini CLI（部分） | 实时流式显示推理 Token、全局“始终展开”开关、子代理轨迹导出、Token 消耗与分类 Dashboard。Claude Code #8477 热度最高，Hermes 本日合并 `/context` 与 `/focus`。 |
| **MCP 生态深度适配** | Qwen Code、Hermes、OpenAI Codex、Gemini CLI、OpenCode | OAuth 认证序列化、Schema 兼容性（`definitions` vs `$defs`）、递归限制提升、工具数量超限自动裁剪。Qwen Code 安全挖掘集中在 MCP 通道，Hermes PR 50 条含多个 MCP 相关修复。 |
| **跨平台稳定性（尤其是 Windows）** | Claude Code、OpenAI Codex、DeepSeek Reasonix、Qwen Code | MSIX 包损坏、`claude.exe` 无限挂起、GPU 进程崩溃、WMI 耗尽、便携式构建缺失。Claude Code #81484 与 OpenAI Codex #34260 为当日用户反应最激烈的问题。 |
| **成本控制与配额透明** | Claude Code、OpenAI Codex、OpenCode、Qwen Code | 用量消耗审计、Prompt Caching 穿透、子 Agent 模型分级计费、批量调用优化。OpenAI Codex #35050 量化显示 batching 可节省 27-45% 用量，OpenCode #39009 反映缓存未生效。 |

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术/架构侧重点 | 社区角色 |
|------|---------|----------|----------------|----------|
| **Claude Code** | Anhtropic 生态的企业级 Agent 平台 | 大型组织、安全敏感团队 | 严苛的安全基线（Hook、沙箱 Fail-Close）、TUI 克制、企业合规优先；发布节奏稳健 | 用户基数大，但回归问题引发信任动摇 |
| **OpenAI Codex** | 云原生 + Desktop IDE 的重度协作者 | OpenAI 重度用户、IDE 依赖者 | 云会话持久化、VS Code 集成深度、OAuth 体系；最近侧重于平台基础架构（MCP OAuth 序列化、线程卸载） | 社区活跃但 Windows 体验损害口碑 |
| **Gemini CLI** | Google 与企业级安全加固的 CLI 工具 | Google Cloud 使用者、合规导向团队 | 依赖升级激进（`@google/genai` v2.12）、Shell 注入 / 密钥链安全补丁密集、Subagent 透明化 | 社区稳健增长，安全 PR 居多，功能迭代同步 |
| **DeepSeek Reasonix** | 面向桌面体验的多模态 Agent | 独立开发者、多模态用户 | 快照冲突修复、视觉模型、技能插件化、全球化定价；核心维护者响应迅速 | 稳定版节奏好，但长尾 Bug（视觉失效）消耗耐心 |
| **OpenCode** | 云中立的轻量多提供商 Agent | 跨提供商开发者、CI/CD 场景 | 便携部署（无安装）、Web/TUI 双模式、插件权限覆盖、模型门控自动审批 | 社区偏小但需求明确（i18n、便携 Win） |
| **Qwen Code** | 零信任架构的 MCP 原生 Agent | 安全意识强、使用 MCP 生态的开发者 | MCP 通道纵深防御（IPC/沙箱/SSE）、P0 守护进程锁机制、长冷启动链路优化 | 安全风暴后加速重构，CI 稳定性待改善 |
| **Hermes** | 高度可扩展的去中心化 Agent 框架 | 社区贡献者、自建 Agent 的团队 | 社区驱动（PR 50）、功能补全快（对标 Claude Code）、记忆系统、Nostr 去中心化社交 | 贡献最活跃，但成熟度较低（依赖冲突、平台差异） |

**关键差异维度总结：**
- **安全深度**：Claude Code > Qwen Code > Gemini CLI > OpenAI Codex > Hermes > DeepSeek > OpenCode
- **功能扩展速度**：Hermes（社区爆发）> Gemini CLI / DeepSeek（稳定发版）> OpenAI Codex / Qwen Code（夜版+修复）> Claude Code（谨慎）
- **平台覆盖广度**：OpenCode（便携全平台）> Claude Code / OpenAI Codex（Mac/Win/Linux）> DeepSeek / Hermes（重点桌面）
- **模型/提供商绑定度**：Claude Code（Anthropic）= OpenAI Codex（OpenAI）> Gemini CLI（Google）> Qwen Code（Qwen 为主）= DeepSeek（DeepSeek）> OpenCode（多提供商）> Hermes（Ollama/OpenAI 兼容）

## 5. 社区热度与成熟度

- **社区最活跃（按贡献者参与度）**：**Hermes** 以 14 issues / 50 PR 的日活跃度领跑，但大量 PR 来源于社区个人贡献者，核心维护团队负载高；**Claude Code** 与 **OpenAI Codex** 用户基数大，Issue 讨论热度高（#8477 获 324 👍），但 PR 数量相对保守，反映出成熟产品更重视审核控制。

- **快速迭代阶段**：**Qwen Code** 和 **Gemini CLI** 在安全加固与架构优化上并行推进，夜间构建频繁，但 CI 不稳定（Qwen Code #7773）等迹象表明处于激进入轨期；**OpenCode** 虽社区较小，但持续有小而精的 feature PR（自动审批 MCP session），开始从单工具向平台演进。

- **相对成熟（高稳定性要求）**：**Claude Code** 和 **DeepSeek Reasonix** 拥有明确的稳定版发布周期和快速 hotfix 能力（DeepSeek 本日合并快照冲突修复 #6952），但遗留问题（Claude Code Windows 回归、DeepSeek 视觉失效）的修复效率正受社区审视。

- **社区情绪特征**：
  - **Claude Code** 社区：专业用户主导，反馈质量高但“信任成本增加”（配额疑云、Hook 静默失败、自动模式混乱）。
  - **OpenAI Codex** 社区：Linux 客户端呼声强、Windows 问题引爆点，模型行为不可控（`passwd -d`）触发了深层安全焦虑。
  - **Hermes** 社区：热情但不乏抱怨（依赖冲突、缺乏稳定版），对标功能密集合入后对稳定性的期待迅速提高。
  - **DeepSeek Reasonix** 社区：对核心维护者信任度高，但对长尾问题的沉默容忍度正在下降。

## 6. 值得关注的趋势信号

### 1. Agent 安全正从“功能配置”升级为“供应链安全级别”
`MCP 调用拒绝后可绕过`（Qwen Code #7769）、`Bash 前缀规则可被命令替换绕过`（DeepSeek #6963）等漏洞表明，简单的字符串白名单已无法满足 Agent 自动化场景。社区对 **声明式权限属性（ReadOnly / Idempotent / Destructive）** 和 **统一 MCP 授权层** 的需求，标志 Agent 安全正在向 API 网关与零信任架构看齐。

### 2. TUI “黑箱”打破是交互演进的核心矛盾
Claude Code #8477 324 个 👍 与 Hermes 同日合并 `/focus`、`/context` 两条 PR，显示用户不再容忍“只有 spinner 没有推理过程”的 CLI 体验。实时 Token 流式输出、Token 消耗分类面板、子代理轨迹可视化将成为 CLI 工具的基础体验门槛。

### 3. Windows 平台已成差异化竞争的“堵点”
Claude Code、OpenAI Codex、Qwen Code 三家的 Windows 问题同日集中爆发（启动挂起、MSIX 损坏、WMI 耗尽、GPU 崩溃），严重影响用户信任。Windows 下的便携式部署、代码签名、系统 API 兼容性已成为衡量工具成熟度的关键标尺。

### 4. MCP 从“可选项”变为“必选项”，其治理能力决定平台上限
各工具均在 MCP OAuth、Schema 转换、递归限制、代理路由层面密集 PR。OpenAI Codex 本日合并 5 条 MCP OAuth 相关 PR，Hermes 50 条 PR 中多处涉及 MCP，Qwen Code 安全漏洞一半与 MCP 相关。MCP 已不是接口协议，而是 **Agent 的“外围总线”**——其可靠性、安全性和扩展性将直接决定工具生态的广度。

### 5. 成本与配额透明成为信任基石
Claude Code 的“用量瞬间 100%”疑云（#80199）、OpenAI Codex 的“batching 可省 27-45%”量化分析（#35050）、OpenCode 的 Prompt Caching 穿透（#39009）共同指向一个趋势：开发者对 Agent 的计费模型不再盲目接受，而是要求 **按类别审计的消耗日志** 和 **最优调用策略的可配置性**。提供清晰的配额计算逻辑与成本优化建议，将成为企业采购决策的加分项。

### 6. “配置即代码”的回归：Agent 可篡改自身配置引发安全悖论
Hermes #42727（Agent 自配置写入脱敏占位符导致中断）以及 DeepSeek #6949（机密与配置文件分离）表明，当 Agent 可以自由读写自身的 `config.yaml` 时，它的自主性可能反噬安全性。**核心配置的不可变层或审批式变更**，将是下一代 Agent 框架的必需设计模式。

---

**总结**：2026 年 7 月下旬的 AI CLI 生态正处于“从 Demo 到生产”的关键跃迁期。安全、透明、可审计正在取代“能干什么”成为最热议题；Windows 适配和 MCP 治理决定工具的平台落地能力；而社区最领先的工具（Claude Code）也暴露了因功能堆叠导致的基础信任裂痕。对于技术决策者，**优先选择在安全基线、配额透明度和跨平台稳定性上投资最多的工具**，同时关注 MCP 生态的可管控性，将是降低 Agent 生产部署风险的核心策略。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

好的，各位读者。以下是基于 github.com/anthropics/skills 截至 2026-07-27 数据生成的 Claude Code Skills 社区热点洞察报告。

---

## Claude Code Skills 社区热点洞察报告 (2026-07-27)

### 1. 热门 Skills/改动排行

当前社区热度最高的主题并非某个单一 Skill，而是集中在 **Skill-Creator 工具链的修复** 与 **新兴的高阶治理技能** 两大阵营。

**🥇 [集团] Skill-Creator 工具链故障集中修复** (`#1298`, `#1099`, `#1050`, `#1323`, `#362`, `#361`, `#539`)
*   **功能与热度**：核心工具 `run_eval.py` 持续报告 **recall=0%**（#1298），直接导致技能描述优化循环失效；Windows 平台因子进程和编码问题完全崩溃（#1099 #1050）。超过 7 个独立开发者提交了 PR，相关 Issue #556 获得了 12 条讨论。社区共识是：**“优化循环正在对抗噪音”**。这是当前生态最大的阻塞点。
*   **状态**：全部 **Open**。
*   **链接**：[PR #1298](https://github.com/anthropics/skills/pull/1298) | [核心 Issue #556](https://github.com/anthropics/skills/issues/556)

**🥈 testing-patterns 全栈测试技能** (`#723`)
*   **功能**：填补官方技能集在软件质量保障领域的空白，涵盖测试 Trophy 模型、AAA 模式、React Testing Library 及边界条件。
*   **热度分析**：是纯功能型 Skill 中关注度最高的 PR。社区对“系统化测试能力”的需求非常一致。
*   **状态**：**Open**。
*   **链接**：[PR #723](https://github.com/anthropics/skills/pull/723)

**🥉 self-audit 推理质量门禁** (`#1367`) / **Reasoning Quality Gate Pipeline** (`#1385`)
*   **功能**：AI 交付前先进行“机械文件验证”，再按“损害严重性”进行四维推理审计。这是一项典型的**元技能**。
*   **热度分析**：体现了社区从“关心输出数量”到“关心输出可信度”的转变。它是一个跨技术栈的通用解决方案，与 #1385 提案形成联动，讨论极具深度。
*   **状态**：**Open**。
*   **链接**：[PR #1367](https://github.com/anthropics/skills/pull/1367) | [Issue #1385](https://github.com/anthropics/skills/issues/1385)

**④ document-typography 文档排版精校** (`#514`)
*   **功能**：自动修复孤词换行、标题断页、编号错位等 AI 生成文档的“最后一公里”排版问题。
*   **热度分析**：每个文档都会触发的痛点，用最小成本换取最直观的质量提升。被视为“小而美”的复合典范。
*   **状态**：**Open**。
*   **链接**：[PR #514](https://github.com/anthropics/skills/pull/514)

**⑤ skill-quality-analyzer & skill-security-analyzer 元技能** (`#83`) & **安全信任边界讨论** (`#492`)
*   **功能**：对 Skill 本身进行质量评分和权限安全分析。
*   **热度分析**：Issue #492（43 条评论，2 个👍）揭露了社区 Skill 冒充官方、命名空间滥用的信任危机。该 PR 的价值被重新审视，是治理社区 Skill 供应链安全的基石。
*   **状态**：**Open**。
*   **链接**：[PR #83](https://github.com/anthropics/skills/pull/83) | [安全 Issue #492](https://github.com/anthropics/skills/issues/492)

**⑥ ODT (OpenDocument) 技能** (`#486`)
*   **功能**：支持创建、读取和转换 OpenDocument 格式（.odt, .ods）。
*   **热度分析**：直接回应企业的合规需求。配合 SAP-RPT-1-OSS (#181) 等技能，说明社区正在向企业级纵深渗透。
*   **状态**：**Open**。
*   **链接**：[PR #486](https://github.com/anthropics/skills/pull/486)

---

### 2. 社区需求趋势（Issues 提炼）

*   **开发者体验（DevEx）救火**：Issue #556（0% 召回率）、#1061（Windows 兼容性）、#1169（优化循环失灵）。社区最大的呼声是 **“先让基础工具跑起来”**。Skill-Creator 的质量问题已经严重抑制了社区贡献。
*   **安全与信任治理体系**：Issue #492（43 条评论）关于命名空间伪造的安全风波，催生了对 Skill 签名/审核机制的需求。社区不愿成为下一个“恶意包投毒”的牺牲品。
*   **企业级集成与共享**：Issue #228（组织级技能共享）、#1175（SPO 权限控制）。企业用户希望将技能从单机文件升级为可跨团队共享、且安全可控的企业资产。
*   **AI Agent 输出的可审计性**：Issue #1385、#412。社区不再盲目信任 AI 的生成结果，而是希望内置一套 “事前校准（Prompt Gate）→ 事中审查（Adversarial Review）→ 事后验证（Delivery Audit）” 的能力闭环。

---

### 3. 高潜力待合并 Skills

以下 PR 活跃度高、功能定义明确，符合社区主要矛盾点，预计近期落地概率较大：

*   **testing-patterns (#723)**：官方技能集的明显缺口，代码质量是永恒话题，基础扎实且无体系冲突。
*   **document-typography (#514)**：改动范围极小，价值极其直观，存在编辑器级别的美学加成。
*   **self-audit (#1367)**：虽然概念激进，但精准命中了社区对“推理质量”的集体焦虑。若 Anthropic 计划在下一波更新中强化稳定性，该技能有极高潜力被整合进官方管线。
*   **ODT skill (#486)**：属于合规性基础能力，合并阻力在于维护成本，但其战略价值非常高。

---

### 4. Skills 生态洞察

**一句话共识：当前社区最核心的双线诉求是“止血”与“建制”——优先修复 Skill-Creator 工具链的根本性故障以恢复生态贡献能力，同时必须立刻补位构建面向“输出质量审计”与“供应链安全治理”的元技能体系，以支撑 Claude Code 从个人实验工具向企业级可信开发伙伴的角色跃迁。**

---

好的，以下是根据您提供的 GitHub 数据生成的 Claude Code 社区动态日报（2026-07-27）。

---

## Claude Code 社区动态日报 | 2026-07-27

**数据来源:** `github.com/anthropics/claude-code`

### 1. 今日速览

过去 24 小时官方未发布新版本，但社区围绕近期 **2.1.21x 系列的严重回归问题**展开了高强度讨论。**Windows 平台进入稳定性危机**，多起“程序完全无法启动”（#81484）和“崩溃后数据丢失”（#81306）的报告集中爆发。此外，**“实时显示模型思考过程”**（#8477、#30660）作为长期积压的顶端功能需求，在本周再次获得大量声援，开发者要求打破当前“只看到转圈”的黑箱状态。

---

### 2. 社区热点 Issues (Top 10)

1.  **[#8477] 增加“始终显示思考过程”的选项**
    - 社区热度之冠，获 **324 👍**，共 92 条评论。自 v2.0.0 重构 TUI 后，思考过程默认折叠为 `Think` 标签，大量高级用户抗议失去对模型推理过程的感知。该提议要求一个全局开关保持思考过程始终展开。
    - 链接: https://github.com/anthropics/claude-code/issues/8477

2.  **[#30660] 交互模式下实时流式输出扩展思考/推理**
    - 与 #8477 并列核心 TUI 诉求。用户指出在长推理链中，CLI 仅显示转圈 Spinner，缺乏进度指引。请求在模型思考阶段就开始流式输出 Token。
    - 链接: https://github.com/anthropics/claude-code/issues/30660

3.  **[#80716] Auto-mode 在 Plan 模式下误判权限变更，导致反复人工审批**
    - **严重破坏自动化工作流的 Bug**。自动模式分类器错误地将 `cd`、`cat`、`git status` 等只读工具判定为需要权限转换，强制降级为手动审批，评论区普遍认为这基本摧毁了 Plan 模式的自动化体验。
    - 链接: https://github.com/anthropics/claude-code/issues/80716

4.  **[#81306] Windows 桌面崩溃导致 MSIX 包损坏，恢复需手动删除包并丢失所有本地数据**
    - Windows 平台严重的可靠性事故。崩溃后 MSIX 包发生 Wedge 状态，用户不得不手动清理包，导致 Code-tab 分组、崩溃转储等本地配置全部丢失。**属于数据灾难性事件**。
    - 链接: https://github.com/anthropics/claude-code/issues/81306

5.  **[#81484] Windows 原生 claude.exe 在 2.1.58 版本后出现回归，任何命令均无限挂起**
    - **启动器级别的阻断性回归**。无论执行 `--version`、`--help` 还是直接运行，程序均无限挂起。用户已确认为 2.1.58 之后的回归，目前只能回滚版本。
    - 链接: https://github.com/anthropics/claude-code/issues/81484

6.  **[#64479] Edit 工具在混合字面量/转义 Unicode 的多行 old_string 上失败**
    - 影响处理国际化/多语言代码库开发者的硬核 Bug（源自 #52813 的复现）。当同一个 Unicode 字符同时以字面量和 `\uXXXX` 形式出现时，Edit 工具的字符串匹配出错，全量回退策略也失败。
    - 链接: https://github.com/anthropics/claude-code/issues/64479

7.  **[#80199] 更新后 Max X5 用量瞬间飙升至 100%**
    - 用户对配额消耗的信任度产生动摇。更新软件后（可能伴随模型升级或上下文算法更改），使用量瞬间触顶。评论区出现多个相似遭遇，要求披露配额计算逻辑的透明度。
    - 链接: https://github.com/anthropics/claude-code/issues/80199

8.  **[#71757] macOS 26 系统睡眠后 Auth 会话失效，后台 Token 刷新损坏钥匙串**
    - 影响 Mac 重度用户。笔记本合盖恢复后，后台 Token 刷新逻辑出错，不仅未能保留旧 Token，反而损坏了钥匙串中的凭证，导致需要完全重新登录，工作流连续性被迫中断。
    - 链接: https://github.com/anthropics/claude-code/issues/71757

9.  **[#78915] Subagent 错误地返回 “[Request interrupted by user for tool use]” 字符串**
    - **误导性极强的异步 Bug**。用户并未中断操作，但 Foreground Subagent 返回了“用户中断”的预设字符串，导致 Agent 逻辑误判，触发非预期的工具调用。
    - 链接: https://github.com/anthropics/claude-code/issues/78915

10. **[#81458] Hook 启动失败 (exit 127) 静默忽略，单会话跳过近 7000 次闸门调用**
    - **严重的安全与合规隐患**。用户配置的安全 Hook（Guardrails）如果命令不可执行，Claude Code 选择静默跳过并放行 Tool Call。开发者完全不知情，属于 Fail-Open 的不安全设计，企业用户反馈强烈。
    - 链接: https://github.com/anthropics/claude-code/issues/81458

---

### 3. 重要 PR 进展

由于过去 24 小时 PR 数量较少（共 7 条），以下全部覆盖：

1.  **[#81500] 修复 AWS 网关示例中的 404 链接**
    - 修复了 `examples/gateway/aws` 中引用的 7 处指向 `code.claude.com` 的失效文档链接，改善新用户引导体验。
    - 链接: https://github.com/anthropics/claude-code/pull/81500

2.  **[#20448] 新增 Web4 治理插件：集成 T3 信任张量与 R6 审计跟踪**
    - 为 Claude Code 引入轻量级 AI 治理框架，支持密码学层面的实体见证与审计追踪。面向 AI Agent 时代的可验证互联网基础设施实验。
    - 链接: https://github.com/anthropics/claude-code/pull/20448

3.  **[#38167] Devcontainer 改进：支持 GH_TOKEN 认证的 GitHub API 请求**
    - 解决在共享 IP 环境下 Devcontainer 初始化因触发 GitHub API 未认证速率限制而失败的问题，提升团队开发环境的部署可靠性。
    - 链接: https://github.com/anthropics/claude-code/pull/38167

4.  **[#81426] 修复 security-guidance 在 Windows 上的 VENV 布局兼容性**
    - 移除 Windows 环境下 Agent 审查器启动时的静默跳过逻辑，使得 agentic commit reviewer 功能可在 Win32 正常运作，补齐了 Windows 端的安全工具链。
    - 链接: https://github.com/anthropics/claude-code/pull/81426

5.  **[#68693] 修复关闭重复 Issue 脚本的标签覆盖问题**
    - 修复 GitHub API 的 `PATCH` 请求会替换整个标签集的副作用。现在关闭重复 Issue 时会增量添加 `duplicate` 标签，而不是覆盖原有的 `area:`、`platform:` 等分类标签，提升 Issue 管理质量。
    - 链接: https://github.com/anthropics/claude-code/pull/68693

6.  **[#81423] 修复 Devcontainer 防火墙：阻止 IPv6 绕过**
    - **安全修复**。原有的 `iptables` 规则仅限制 IPv4 出站，导致所有 IPv6 流量可以完全绕过白名单。该 PR 新增 `ip6tables` 规则，在双栈 Docker 网络中严格限制出站，构建更完善的安全基线。
    - 链接: https://github.com/anthropics/claude-code/pull/81423

7.  **[#81421] 修正 Bash 沙箱示例配置：确保 Fail-Close 安全行为**
    - 官方 Example 配置中缺少 `failIfUnavailable` 参数，与文档“Bash 工具必须运行在沙箱内”的描述相悖。修复后当沙箱不可用时会直接报错，**防止在无沙箱环境下意外执行命令**。
    - 链接: https://github.com/anthropics/claude-code/pull/81421

---

### 4. 功能需求趋势

从近 24 小时更新的 Issues 中，提炼出社区最关注的三大方向：

1.  **TUI / 交互透明化**：连续出现多个围绕“思考过程可视化”的头部 Issue（#8477、#30660），用户对 CLI 的“黑箱”状态忍受度接近极限。核心诉求是提供实时 Token 流式显示和/或全局“始终展开”开关。

2.  **企业级稳定性与合规性**：随着 Agent 功能的增强，企业级 Bug 的报告比重急剧上升。重点体现在：
    - **平台稳定性**：Windows 端的 MSIX 损坏（#81306）和启动挂起（#81484）已构成第一优先级阻断性问题。
    - **安全基线**：Hook 静默失败（#81458）、沙箱环境未强制 Fail-Close（#81421）、防火墙泄漏（#81423）等问题正在被严格审视。
    - **配额管理**：Max 计划用量异常消耗（#80199、#70758）正在引发信任危机，用户要求更精细的消耗审计日志。

3.  **Agent 工作流可靠性**：Subagent 状态管理（#74116、#78915）、Channels 通道唤醒（#44380）、Auto-mode 权限判断（#80716）等围绕 Agent 自动化的微操可靠性不足，开发者期待一个更稳定、“不捣乱”的后台执行环境。

---

### 5. 开发者关注点

*   **最大的痛点：Windows 端成为重灾区。** `claude.exe` 完全无法启动 (#81484) 和崩溃导致数据丢失 (#81306) 是目前社区反应最激烈的两个问题，严重阻碍了该平台用户的正常工作，甚至出现对版本回滚的求助。
*   **高频诉求反弹：** “思维链可见性”（#8477 等）的讨论再次冲上榜首，许多用户表示这是 2.0 版本以来“最后一块缺失的核心拼图”，也是日常使用中最大的 UX 障碍。
*   **信任成本在增加：** 多个高度敏感领域的 Bug（自动模式误判 #80716、Token 消耗异常 #80199、Hook 静默失败 #81458）正在系统性削弱开发者对 Claude Code 在无人值守场景下的信任。
*   **工具链严谨性：** 对 Edit 工具 Unicode 兼容性（#64479）和 `/code-review` 回归（#81496）的细致报告，反映出用户社区的高技术水平和极高期待值。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

好的，以下是根据你提供的 GitHub 数据生成的 **2026-07-27 OpenAI Codex 社区动态日报**，聚焦社区讨论、关键进展与开发者反馈。

---

## 📰 今日速览

今日无新版本发布，但社区对 **Linux 桌面客户端** 的呼声仍是最热议题（#11023，187 评论、852 👍）。Windows 平台集中爆发多个严重崩溃与性能问题（GPU 进程崩溃、WMI 耗尽、磁盘写入风暴），引发高度关注。开发团队在 **MCP OAuth 认证序列化** 和 **会话/线程卸载** 方面合并了一系列 PR，持续改进后端稳定性。

---

## 📌 社区热点 Issues（10 条）

1. **[#11023] Codex desktop app for Linux**  
   [查看](https://github.com/openai/codex/issues/11023)  
   **重要性**：社区最强烈的功能请求。用户因 macOS 功耗问题无法使用现有 App，强烈要求推出 Linux 原生客户端。评论 187，👍 852。

2. **[#34260] Windows Desktop: unbounded taskkill.exe/conhost.exe cleanup storm exhausts WMI**  
   [查看](https://github.com/openai/codex/issues/34260)  
   **重要性**：Windows 下进程清理循环失控，数百个 `taskkill` 进程耗尽 WMI，导致系统整体卡死。严重影响 Windows 用户体验。

3. **[#31573] OAuth authentication fails at issuer validation**  
   [查看](https://github.com/openai/codex/issues/31573)  
   **重要性**：CLI 认证在 issuer 校验环节失败，Free 用户无法正常登录。评论 24，👍 55，影响面广。

4. **[#34133] Page.captureScreenshot crashes GPU process after Code Integrity rejects vk_swiftshader.dll**  
   [查看](https://github.com/openai/codex/issues/34133)  
   **重要性**：Windows 上内置浏览器截屏时 GPU 进程崩溃，因系统 Code Integrity 阻止未签名 SwiftShader 导致应用卡死或无法重启。

5. **[#17320] Excessive SQLite WAL writes during streaming due to TRACE logs ignoring RUST_LOG**  
   [查看](https://github.com/openai/codex/issues/17320)  
   **重要性**：流式响应时 TRACE 日志无视 `RUST_LOG` 设置，大量写入 SQLite WAL，造成磁盘 IO 瓶颈。评论 27，👍 39。

6. **[#35050] GPT-5.6 often serializes independent Code Mode calls; explicit batching reduces weighted usage by 27–45%**  
   [查看](https://github.com/openai/codex/issues/35050)  
   **重要性**：模型默认串行化独立调用，若显式批量处理可显著降低加权使用量，直接影响 Pro 用户的成本与效率。

7. **[#24610] Add explicit deletion controls for archived Codex cloud sessions**  
   [查看](https://github.com/openai/codex/issues/24610)  
   **重要性**：归档不等于删除，用户无法彻底清除包含敏感项目内容的会话，隐私与数据留存问题突出。评论 13，👍 17。

8. **[#32530] VS Code Codex panel intermittently stuck loading on Linux**  
   [查看](https://github.com/openai/codex/issues/32530)  
   **重要性**：Linux 下 VS Code 侧边栏 Codex 面板反复卡在加载中，本地 WebView 资源加载失败，严重影响 IDE 用户。

9. **[#34061] Insane Codex Disk Usage from Subagents**  
   [查看](https://github.com/openai/codex/issues/34061)  
   **重要性**：Subagent 产生大量磁盘写入，磁盘占用异常膨胀，macOS 用户反馈分明。影响长期会话的可用性。

10. **[#35492] Model issue – Codex CLI can brick Arch Linux devices running "passwd -d James"**  
    [查看](https://github.com/openai/codex/issues/35492)  
    **重要性**：模型在 Arch Linux 下执行 `passwd -d` 删除用户密码，可能导致系统无法启动。安全性极高，已引发社区警惕。

---

## 🔧 重要 PR 进展（10 条）

1. **[#35530] Track model and personality in world state**  
   [查看](https://github.com/openai/codex/pull/35530)  
   **功能**：将模型与个性信息持久化到 world-state 快照，通过 diff 生成切换指令并保留推断状态。已合并。

2. **[#35525] Skip inactive TUI threads without pending user interaction**  
   [查看](https://github.com/openai/codex/pull/35525)  
   **功能**：TUI 仅收集有等待输入的线程请求，避免无关请求阻塞交互。提升终端 UI 响应速度。已合并。

3. **[#35524] Preserve terminal turn errors in replayed history**  
   [查看](https://github.com/openai/codex/pull/35524)  
   **功能**：回放历史时将 turn 完成事件中嵌入的错误保留下来，避免重试失败被错误标记为成功。已合并。

4. **[#35523] Shut down the in-process outbound router explicitly**  
   [查看](https://github.com/openai/codex/pull/35523)  
   **功能**：在关闭时明确发送信号关闭出站路由器，防止 detached processor 阻止进程退出。已合并。

5. **[#30295] Serialize MCP OAuth login and logout**  
   [查看](https://github.com/openai/codex/pull/30295)  
   **功能**：将 MCP OAuth 的登录与登出操作序列化，防止竞态与状态不一致。已合并。

6. **[#30296] Report MCP OAuth Auto store drift**  
   [查看](https://github.com/openai/codex/pull/30296)  
   **功能**：监控 MCP OAuth 自动存储的偏移，确保令牌存储与预期一致。已合并。

7. **[#30294] Route MCP OAuth recovery through Codex**  
   [查看](https://github.com/openai/codex/pull/30294)  
   **功能**：将 OAuth 恢复流程统一路由到 Codex 服务，增强恢复可靠性。已合并。

8. **[#30416] Serialize authoritative MCP OAuth refresh transactions**  
   [查看](https://github.com/openai/codex/pull/30416)  
   **功能**：对 MCP OAuth 刷新事务进行序列化，避免并发刷新导致的令牌覆盖问题。已合并。

9. **[#30985] Let idle auto-attached threads unload**  
   [查看](https://github.com/openai/codex/pull/30985)  
   **功能**：允许隐式观察者附加的空闲线程进入 30 分钟卸载周期，释放服务端资源。目前 Open 状态，等待 review。

10. **[#35414] Raise the MCP server recursion limit**  
    [查看](https://github.com/openai/codex/pull/35414)  
    **功能**：将 MCP Server 的 Rust 递归限制提升至 256，防止深层调用栈溢出。已合并。

---

## 📊 功能需求趋势

从近期 Issue 中可提炼出以下社区最关注的方向：

- **跨平台桌面支持**：尤其是 Linux 原生客户端（#11023），以及 Windows 平台的稳定性修复（#34260, #34133, #33368）。
- **性能与资源优化**：减少磁盘写入（#17320, #34061, #35092）、降低 GPU/CPU 占用、解决 WMI 耗尽与内存膨胀。
- **隐私与数据管理**：提供显式的云端会话删除机制（#24610），控制本地会话存储膨胀（#34268）。
- **模型交互效率**：恢复更大的上下文窗口（#34619），改进任务 batching 减少加权调用量（#35050）。
- **IDE 集成可靠性**：修复 VS Code 侧边栏加载失败（#32530）、工具调用解析错误（#35532）。

---

## 💡 开发者关注点

- **Windows 平台问题集中爆发**：多处 GPU 崩溃、后台进程清理风暴、WMI 耗尽、WSL 文件路径错误、浏览器功能异常。
- **Linux 缺少 App**：虽可通过 CLI 使用，但缺少桌面应用让许多开发者感到体验断层。
- **流式写入 IO 过高**：SQLite WAL 与 TRACE 日志导致高频磁盘写，缩短 SSD 寿命并拖慢系统。
- **模型行为不可控**：模型可能执行破坏性命令（如 `passwd -d`），缺乏充分的安全沙箱约束。
- **OAuth 认证断裂**：CLI 用户因 issuer 校验失败无法登录，影响第一印象。
- **会话存储膨胀**：长期会话数据可达 100 GiB+，缺乏自动清理或用户干预手段。

---

需要进一步深入分析某个 Issue 或 PR 时，随时可以继续探讨。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

好的，这是为您生成的 2026-07-27 Gemini CLI 社区动态日报。

---

# Gemini CLI 社区动态日报 | 2026-07-27

## 今日速览
今日社区围绕安全加固与核心可靠性展开激烈讨论。关键安全补丁（Shell 注入绕过、密钥链加密）处于收尾审核阶段，同时 P1 级 Bug——“Shell 命令执行卡死”和“Subagent 任务中断误报成功”成为用户反馈痛度最高的区域。依赖方面，`@google/genai` 与 `execa` 等核心库完成了重大版本升级，为后续能力迭代奠定基础。

## 版本发布
**v0.54.0-nightly.20260726.g3818efbbf**
- 内容：常规夜间构建，主要包含前序版本 v0.53.0-preview.0 及 v0.52.0 的 Changelog 回溯与版本号自动更新。
- 链接：https://github.com/google-gemini/gemini-cli/releases/tag/v0.54.0-nightly.20260726.g3818efbbf

## 社区热点 Issues
**1. #22323 [P1/Bug] Subagent 在 MAX_TURNS 后误报 Goal Success**
- **摘要**：`codebase_investigator` 子代理即便在达到最大轮次限制被强制中断时，系统仍将其状态标记为 `success` 并报告达成目标。这向用户传递了强烈的错误信号，严重破坏了任务追踪的可信度。
- **社区反响**：12 条评论，是当日讨论热度最高的议题。开发者已打上 `need-retesting` 标签。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/22323

**2. #24353 [P1/Epic] 组件级鲁棒性评估**
- **摘要**：作为评估基础设施的跟进议题，计划将现有的 76 个行为评估测试扩展到更细粒度的组件级别，覆盖 6 个支持模型，旨在建立更科学的回归防御体系。
- **社区反响**：7 条评论，开发者内部对评估框架的扩展走向进行深度研讨。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/24353

**3. #22745 [P2/Epic] 评估 AST 感知的文件读取与代码映射**
- **摘要**：调研引入 AST（抽象语法树）工具链（如 `tilth`、`glyph`）的可行性。期望通过精确识别方法边界，减少误读和 Token 浪费，从而提升 Agent 的大型代码库导航能力。
- **社区反响**：7 条评论，1 个 👍。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/22745

**4. #25166 [P1/Bug] Shell 命令执行后因 "Waiting input" 卡死**
- **摘要**：核心体验问题。执行极简的 CLI 命令后，界面持续显示“等待输入”，尽管实际进程已结束。这迫使开发者频繁手动干预，严重破坏自动化流程。
- **社区反响**：4 条评论，3 个 👍，点赞数全榜单日最高，反映普适性和高痛度。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/25166

**5. #21968 [P2/Bug] 模型主动使用 Skills 和 Subagers 的频率极低**
- **摘要**：即便注册了 gradle、git 等自定义技能，模型仍倾向于使用基础原始工具，仅在用户明确指令下才调用。这违背了扩展性设计初衷。
- **社区反响**：6 条评论，用户普遍需要更强的工具调用内驱力。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/21968

**6. #26522 [P2/Bug] Auto Memory 对低信号会话触发无限重试**
- **摘要**：后台提取代理判定某个会话“低价值”并跳过读取后，该会话不会被标记为已处理，导致系统反复对其进行判定，造成资源浪费与队列拥堵。
- **社区反响**：5 条评论，核心内存系统的稳定性和算法策略亟待优化。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/26522

**7. #26525 [P2/Bug] Auto Memory 需增加确定性脱敏并减少日志输出**
- **摘要**：安全与隐私痛点。当前指令将内容送入模型上下文后才让其执行脱敏，而先于脱敏的日志可能泄露 Secrets。须在前置管道执行确定性脱敏。
- **社区反响**：4 条评论，讨论重点集中在日志架构调整。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/26525

**8. #21983 [P1/Bug] Browser Subagent 在 Wayland 环境下崩溃**
- **摘要**：平台兼容性问题。在 Linux Wayland 显示协议下，浏览器子代理启动失败，限制了 GNU/Linux 发行版用户的 Agent 功能。
- **社区反响**：4 条评论，1 个 👍，请求较迫切。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/21983

**9. #24246 [P2/Bug] 启用超过 128 个工具时遭遇 400 错误**
- **摘要**：随着 MCP Server 激增，工具调用规模急剧膨胀，超过 128 个时请求长度超限。期望 Agent 具备“工具范围感知”能力以自动裁剪。
- **社区反响**：3 条评论，影响广泛使用 MCP 的高级用户。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/24246

**10. #22186 [P1/Bug] `get-shit-done` 输出钩子在收尾阶段崩溃**
- **摘要**：在使用特定输出钩子时，任务收尾段的总结打印环节频繁引发客户端崩溃，严重影响大规模任务完成率。
- **社区反响**：3 条评论，问题复现率极高。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/22186

## 重要 PR 进展
**1. #28523 [Security] 强制文件密钥链中的认证标签长度与验证**
- **内容**：增强文件凭据存储加密安全性，显式配置 128 位标签长度并增加格式校验，防止非标 Node.js Runtime 导致的逻辑歧义。
- **状态**：Open
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28523

**2. #28403 [Security] 阻断 `$VAR` 变量注入绕过（GHSA-wpqr-6v78-jr5g）**
- **内容**：关键防御性加固。修复 `detectBashSubstitution()` 等函数中的逻辑盲区，防止攻击者通过变量扩展绕过安全门禁。
- **状态**：Open
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28403

**3. #28386 [Fix/VS Code] 正确跟踪 VS Code 激活上下文中的 Disposables**
- **内容**：修复插件激活路径中括号表达式导致部分 Disposables 未正确入栈的问题，防止资源回收残留引发的状态追踪困难。
- **状态**：Open
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28386

**4. #28359 [Security] 增强 `stripShellWrapper` 对登录/交互 Shell 的剥离能力**
- **内容**：新增对 `bash -lc`、`bash -ic` 等带标志的包装器的解析，确保安全引擎重新校验负载时不会漏检。
- **状态**：Closed (Merged)
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28359

**5. #28438 [Bug] 去除工具名称中的前后空白字符**
- **内容**：修复因工具名带空格导致无法被注册表正确识别的问题，提升工具调用解析的鲁棒性。
- **状态**：Open
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28438

**6. #28543 [Dependency] `@google/genai` 从 v1.30.0 升级至 v2.12.0**
- **内容**：核心 SDK 的重大跨版本升级，引入 Google AI 库最新特性，为后续模型能力增强奠基。
- **状态**：Closed (Merged)
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28543

**7. #28541 [Dependency] `execa` 从 v9.6.1 升级至 v10.0.0**
- **内容**：进程执行库的重大版本升级，涉及 Node.js 版本要求与核心 API 调整，属于基础设施现代化。
- **状态**：Closed (Merged)
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28541

**8. #28539 [Dependency] 批量更新 75 个 npm 依赖**
- **内容**：大规模依赖刷新，涵盖 `simple-git`、`@modelcontextprotocol/sdk` 等关键库，积极跟进生态并消除技术债务。
- **状态**：Closed (Merged)
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28539

**9. #28540 [Dependency] `chrome-devtools-mcp` 从 v0.19.0 升级至 v1.6.0**
- **内容**：浏览器自动化底层库的大幅升版，为 Browser Agent 提供更稳定、更强大的支持。
- **状态**：Closed (Merged)
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28540

**10. #28536 [Release] 版本号自动更新至 Nightly**
- **内容**：标准化 CI 流程产物，为每日构建打上专属版本戳。
- **状态**：Open (Merged)
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28536

## 功能需求趋势
- **Agent 自省与透明化**：要求子代理的完整轨迹能被导出（`/chat share`），以及 Bug Report 必须包含子代理上下文，让决策过程可审计。
- **代码智能深度（AST 感知）**：聚焦利用 AST 实现更精确的代码搜索、方法边界读取和代码库映射，减少 Token 浪费。
- **记忆系统工程化**：处理无效内存补丁隔离、低信号对话判定优化以及确定性脱敏，社区对记忆系统的健壮性提出更高要求。
- **工具治理与动态规划能力**：当注册工具超过 128 个时，Agent 必须具备自动裁剪或范围感知能力，而非暴力提交导致请求超长错误。
- **浏览器 Agent 企业级可靠性**：涵盖持久会话锁恢复、完全遵循 `settings.json` 配置，以及跨显示协议（Wayland）的兼容。

## 开发者关注点
- **稳定性是首要诉求**：“Shell 卡死”和“输出钩子崩溃”是最直观的体验槽点，从简单命令到复杂任务收尾均有可靠性隐患。
- **Agent“智能”不及预期**：不按配置执行、不使用预设技能、随机位置创建临时文件等现象普遍，需大量 Prompt 纠正模型行为。
- **安全与隐私焦虑加剧**：从 Shell 注入绕过到 Secrets 日志泄露，用户在深度使用 AI 操作本地环境时，对“安全护栏”的需求空前高涨。
- **扩展规模瓶颈凸显**：工具数量膨胀带来的 400 错误表明当前管道在处理大规模工具注册时存在架构短板。

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报 | 2026-07-27

> 数据来源：github.com/esengine/DeepSeek-Reasonix | 这是一份由 AI 开发工具技术分析师撰写的社区观察日报，基于过去 24 小时的公开仓库活动。

---

## 1. 今日速览

DeepSeek Reasonix 于昨日发布 v1.17.21 稳定版，重点聚焦 Windows 代码签名、崩溃诊断与插件 Hook 强化。社区层面，**Agent 安全成为绝对热点**——Bash 前缀规则绕过漏洞（#6963）的披露让整个权限模型面临信任重建；与此同时，**桌面端会话快照冲突（#6948）** 和**视觉功能长期失效（#6947）** 等稳定性痛点持续发酵。值得肯定的是，核心维护者 @clearnature 和 @erphenheimer 已针对快照冲突、会话死锁等关键问题提交修复 PR，反应迅速。

---

## 2. 版本发布

### desktop-v1.17.21 （稳定版）

- **核心功能**：确定性规划、可靠的粘贴撤销、内嵌正则搜索、原生崩溃诊断。
- **架构改进**：CLI 诊断与终端界面隔离、提供程序重试可取消、解决会话所有权冲突、强化插件 Hooks。
- **安全加固**：所有 Windows 可执行文件 Authenticode 签名、日志凭据脱敏、更新依赖以关闭 12 项安全公告。

> [完整更新日志](https://reasonix.io/changelog/v1.17.21/?lang=en)

---

## 3. 社区热点 Issues（10 条）

### 🔴 1. #6963 — Bash 前缀允许规则可被命令替换绕过
**严重性：高（安全漏洞）**  
已保存的 `allow = ["Bash(git *)"]` 规则在命令结构分析前匹配完整 subject，因此 `git stat$(rm -rf /)` 可直接判定为 Allow。这意味着所有基于前缀的白名单规则形同虚设。社区获赞 1，讨论热度极高。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6963)

### 🟠 2. #6948 — 快照冲突导致每 ~1 分钟一次 force-save
**严重性：高（系统稳定性）**  
v1.17.20 起 `checkSnapshotWrite` 将合法追加误判为 diverged，触发 recovery → depth cap（3） → force-save 循环，22 分钟内 20 次全量 replace event，彻底破坏 prefix-cache。作者 @clearnature 已提交修复 PR #6952。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6948)

### 🟠 3. #6947 — 视觉模型失效已久
**严重性：中（核心功能退化）**  
用户反馈从某个版本起图片理解能力完全失效，“以为是版本更新错了，之后会修复，到现在好像也没人提”。作为多模态基础能力，此问题长期无人跟进，社区信任成本上升。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6947)

### 🟡 4. #6966 — 文件视图无法选中并复制文本（Windows）
**严重性：中（UI 阻塞）**  
v1.17.21 新增 Bug：“添加到聊天”按钮弹出逻辑打断文本选中操作，用户无法在文件视图中保持选择状态。无评论，疑似新版本未覆盖的回归。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6966)

### 🟡 5. #6965 — "Session already open" 频繁误报
**严重性：中（工作流中断）**  
会话运行中切换窗口或重启后持续报错 `this session is already open in another window or still running in the background`，窗口已彻底关闭仍无法释放锁。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6965)

### 🔴 6. #6950 — 细粒度权限设置完全不生效
**严重性：高（安全功能失效）**  
用户设置阻止 `Set-Content`、`Add-Content` 等命令，Agent 在自动模式下依然成功写文件，引发乱码。切换到询问模式后，该命令仍弹出允许对话框。权限系统形同虚设。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6950)

### 🟡 7. #6951 — 请求细粒度工具权限声明
**严重性：中（功能增强）**  
社区希望引入 MCP 协议风格的 `ReadOnly`、`Idempotent`、`Destructive` 声明式权限属性，实现对工具调用级别的精细化控制。这是 Agent 安全成熟度的标志性需求。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6951)

### 🟡 8. #6953 — 外置复制文本到聊天框导致技能未生效
**严重性：中（核心交互 Bug）**  
用户先选择技能，再将外部文本复制到聊天框发送，技能逻辑完全未被触发。此交互路径覆盖率高，影响面广。关联修复 PR #6964。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6953)

### 🟡 9. #6949 — 分离普通配置与机密文件
**严重性：中（安全架构）**  
当前 MCP 配置、API Key 等敏感信息混杂在同一文件中，Agent 可自由读写。社区强烈要求将机密文件隔离，防止 Agent 权限滥用导致凭据泄露。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6949)

### 🟠 10. #6962 — Remote Workbench catalog/workspace 返回 null 导致验证失败
**严重性：中（新功能阻塞）**  
WSL2 环境下 Remote Workbench 初始化时 `catalog/workspace` 的 `levels` 字段为 null，验证逻辑拒绝通过。新功能上线阻塞 Bug。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/issues/6962)

---

## 4. 重要 PR 进展（10 条）

### ✅ 1. #6930 — feat(bash): 一次性细粒度沙箱能力增量授权
**贡献者：@ffff2004**  
在已有 `sandbox.allow_read/write` 和 Auto Guard 基础上，实现了 Bash 执行时的动态单次权限授予机制。可针对具体文件临时开放读写或网络访问，配合审计日志，是 Agent 沙箱安全的重要补完。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6930)

### ✅ 2. #6952 — fix(agent): 快照冲突修复（Closes #6948）
**贡献者：@clearnature**  
通过 `revision CAS` 证明同运行时所有权，跳过字节级 `messagesHavePrefix` 比较。当 `baseState.revision == currentRevision` 时直接信任，消除误报的 divergence。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6952)

### ✅ 3. #6967 — fix(desktop): 修复新建项目会话错误归类为全局工作空间
**贡献者：@zdjmrq**  
`createEmptySessionFile` 写入的 `BranchMeta` 中 `Scope` 为空，导致 `resolveSessionBinding` 将项目级会话误判为全局会话，影响文件隔离。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6967)

### ✅ 4. #6964 — fix(desktop): 允许在 Composer 任意位置调用技能（Related #6953）
**贡献者：@par73e**  
将斜杠命令菜单从“空 Composer / 行首”限制扩展为从当前光标位置弹出，支持在任务中间、末尾插入技能和子代理作为结构化内联实体。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6964)

### ✅ 5. #6957 — fix(desktop): 修复快速切换保存会话时的运行时死锁（Closes #6955）
**贡献者：@erphenheimer**  
同标签页快速切换会话时，旧会话的运行时被分离（detached）。当切换回来时重建路径尝试获取已被分离控制器持有的 OS 文件锁，导致死锁。PR 重新实现了 runtime 的重新附加逻辑。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6957)

### ✅ 6. #6961 — refactor(goal): 提取 intercept 到 goalAdvanceResult，净化 FSM 输出
**贡献者：@erphenheimer**  
`advance()` 将 `interceptMsg` 直接写入结构体字段作为副作用。多个机制（todo 检查、严格模式自检、空闲检测）共享同一通道，依赖 switch-case 顺序，存在严重交叉污染风险。此次重构将其提取到返回值中。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6961)

### ✅ 7. #6960 — fix(goal): 在 [goal:blocked] 时重置 idleTurns
**贡献者：@erphenheimer**  
Agent 显式发出 `[goal:blocked]` 信号后，空闲计数器未清零。若 blocks < 3（不触发 notice）且后续 2 轮无工具调用，空闲检测会覆盖 Agent 已经声明的阻塞状态。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6960)

### ✅ 8. #6931 — feat(desktop): 底部信息栏新增 TPS 吞吐、缓存 Token 和输出 Token 显示
**贡献者：@HaoyueQin**  
三个新的可配置状态栏项：`turn_tps`（输出 Token 吞吐量）、缓存 Token 计数和输出 Token 计数。运行中的 Composer strip 也新增流式吞吐读数。填补了运行时透明度的关键缺失。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6931)

### ✅ 9. #6946 — feat(memory): 分离常备指令与作用域化记忆事实（Closes #6928）
**贡献者：@SivanCola**  
将始终有效的系统指令文件与可衰退、有作用域的记忆事实分离。引入项目/全局两级作用域，通过推断文件结构（如 `.reasonix/instructions` vs `.reasonix/memory`）实现向后兼容。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6946)

### ✅ 10. #6945 — feat(desktop): 新增美元区域定价与英文国际化
**贡献者：@SivanCola**  
内置官方 DeepSeek 美元和人民币双区域价格表，跟随桌面语言环境自动切换，并可通过明确 API 覆盖。此外新增结构化会话货币字段，用于区域变更后的重新定价和遥测。  
[查看详情](https://github.com/esengine/DeepSeek-Reasonix/pull/6945)

---

## 5. 功能需求趋势

1. **Agent 安全从“朴素规则”走向“供应链安全”**  
   命令前缀绕过（#6963）直接宣告了纯文本匹配白名单的死亡。社区对 `ReadOnly`、`Destructive` 等声明式权限（#6951）和配置机密隔离（#6949）的呼声，标志 Agent 安全正进入类似软件供应链安全的时代。

2. **会话状态管理的可靠性重写**  
   快照 conflict（#6948）、运行时死锁（#6955）、Session 锁残留（#6965）集中爆发，暴露出基于简单文件锁和版本号的并发模型在高频切换场景下的脆弱性。LSM 或 MVCC 风格的状态管理层可能是终局方案。

3. **核心 Agent 能力的防退化需求**  
   视觉模型失效（#6947）多版本无人问津，技能触发随版本更新而断裂（#6953）。社区不再接受“先上后修”的迭代策略，要求将多模态和 Agent 协作能力纳入回归测试管线。

4. **从“黑盒运行”到“全透明可见”**  
   用户不仅需要任务结果，更希望看到运行中的 Token 消耗（#6931）、任务完成提醒（#6954）、工具调用完整预览（#6264）。Agent 运行时的可观察性正在成为基础设施级需求。

5. **全球化定价与多模型生态并举**  
   美元区域定价（#6945）和 Kimi K3 模型适配（#6921）同时推进，表明项目正从单一的开发者工具定位，向具有国际竞争力和多模型生态的平台演进。

---

## 6. 开发者关注点

1. **安全信任修复是最高优先级**  
   权限规则绕过（#6963）和权限配置不生效（#6950）直接瓦解了 Agent 的可信基础。如果开发者无法确信白名单能真正阻止危险操作，Agent 自动化将永远停留在“演示阶段”。这两个问题的修复速度将直接影响社区对 v2 安全架构的判断。

2. **基本交互稳定性仍需加强**  
   v1.17.21 作为稳定版，仍携带文件视图无法选中等 UI 阻断 Bug（#6966），以及会话锁残留（#6965）。这说明发布前的集成测试覆盖仍然不足，尤其是跨窗口和跨平台（WSL2）场景。

3. **长尾 Bug “静静腐烂”消耗社区热情**  
   视觉问题（#6947）持续数个版本无人跟进，直到昨天才被重新提出。这种对已知能力退化的“静默”处理方式，叠加用户反馈“以为……之后会修复，到现在好像也没人提”，是在缓慢消耗社区耐心。

4. **Agent 自我修改能力带来的安全悖论**  
   Agent 能自如读写配置文件是一把双刃剑。社区（#6949）的解决方案——将 API Key 等机密从 MCP 配置中分离出来——是一个务实的自救方案，也提醒项目组：Agent 的能力边界立法必须走在能力增长的前面。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 | 2026-07-27

---

## 今日速览

Desktop v1.18.5 升级后出现的项目启动崩溃 Bug（#38789）成为今日社区讨论焦点，引发了 13 条评论与广泛担忧；与此同时，社区贡献者 @AAliKKhan 密集提交了一系列代码清理与类型安全修复 PR，涵盖 CORS 安全修复、NPM 路径错误和 Schema 类型推导等问题；功能方面，基于模型门控的自动审批模式（#39015）和子代理会话面板（#39010）两项新特性 PR 正在推进，值得关注。

---

## 版本发布

过去 24 小时无新版本发布。

---

## 社区热点 Issues

**1. #38789 Desktop v1.18.5 升级后项目重载报错 `UnsupportedContentType`**
- **重要性：** ⭐⭐⭐⭐⭐ 升级后无法正常启动，影响所有升级到 v1.18.5 的桌面端用户。13 条评论、5 个点赞表明这是一个高发性严重回归 Bug。
- **链接：** https://github.com/anomalyco/opencode/issues/38789

**2. #39017 `opencode web` 模式大量 API 路由返回 SPA HTML 而非 JSON**
- **重要性：** ⭐⭐⭐⭐⭐ Web 模式的核心数据通道异常，前端无法解析响应导致 `ClientError`。直接影响所有通过浏览器使用 OpenCode Web 的用户。
- **链接：** https://github.com/anomalyco/opencode/issues/39017

**3. #39009 OpenRouter 路由未能为 Anthropic 模型设置 `cache_control`**
- **重要性：** ⭐⭐⭐⭐ 导致通过 OpenRouter 调用 Claude 等模型时每次请求都按完整价格计费，无法享受 Prompt Caching 带来的成本节省，直接影响开发者支出。
- **链接：** https://github.com/anomalyco/opencode/issues/39009

**4. #39022 插件 Agent 的 `question: true` 权限声明无法覆盖默认的 `deny` 权限**
- **重要性：** ⭐⭐⭐⭐ 暴露了 Agent 权限系统的继承与覆盖机制缺陷。限制插件开发者的自定义能力，影响整个插件生态的安全灵活性。
- **链接：** https://github.com/anomalyco/opencode/issues/39022

**5. #15789 请求提供官方便携式包装脚本（无需全局安装）**
- **重要性：** ⭐⭐⭐⭐ 长期高赞需求（6 👍），时隔数月再次更新。反映社区对免安装、零侵入使用方式（如 CI 环境）的刚性需求。
- **链接：** https://github.com/anomalyco/opencode/issues/15789

**6. #26205 CLI + WSL2 使用 Vertex AI 提供者时反复报错 "API keys are not supported by this API"**
- **重要性：** ⭐⭐⭐ 长期未解决的 Google Cloud 集成问题，影响 WSL2 开发者使用 Vertex AI 后端。
- **链接：** https://github.com/anomalyco/opencode/issues/26205

**7. #39024 请求增加类似 ZCode 的"模式切换"功能**
- **重要性：** ⭐⭐⭐ 来自中文社区的明确功能需求，期望在 Agent 执行前配置“变更前确认”、“完全访问”等访问控制模式，反映用户对 Agent 可控性的进阶要求。
- **链接：** https://github.com/anomalyco/opencode/issues/39024

**8. #38280 请求增加多语言界面支持（i18n）**
- **重要性：** ⭐⭐⭐ 界面提示、快捷键说明和错误信息目前仅有英文。来自非英语母语开发者的呼声，表明社区正在走向全球化。
- **链接：** https://github.com/anomalyco/opencode/issues/38280

**9. #39013 [2.0] TUI 模式下无法导航进入嵌套的子 Agent 会话**
- **重要性：** ⭐⭐⭐ 2.0 版本 TUI 的明确 UX 短板。当 Agent 产生多层委托时，用户只能查看第一层子会话，无法审查完整的委托树。
- **链接：** https://github.com/anomalyco/opencode/issues/39013

**10. #37893 请求发布完全便携的 Windows 构建版本（Portable ZIP）**
- **重要性：** ⭐⭐⭐ 与 #15789 呼应的 Windows 平台部署需求，用户希望在无管理员权限的环境中使用 OpenCode Desktop。
- **链接：** https://github.com/anomalyco/opencode/issues/37893

---

## 重要 PR 进展

**1. #39015 `feat: add model-gated auto-approve mode`**
- **功能：** 引入基于模型门控的自动审批模式，在原有 TUI 自动审批路径上增加了分类器过滤，不在无模型判断的情况下直接批准危险操作。
- **状态：** OPEN | 作者：@mayanksingh09
- **链接：** https://github.com/anomalyco/opencode/pull/39015

**2. #39010 `feat(session): add subagents tab with status and cost tracking`**
- **功能：** 在会话侧边栏增加专属“子代理”Tab，以折叠列表形式展示子会话的状态、成本信息，解决 #37267。
- **状态：** OPEN | 作者：@sdpfigueiredo
- **链接：** https://github.com/anomalyco/opencode/pull/39010

**3. #39008 `fix(llm): enable Anthropic prompt caching on the OpenRouter route`**
- **修复：** 针对 #39009 的修复。在 OpenRouter 路由中正确应用 `cache_control` 策略，大幅降低高频用户的 API 成本。
- **状态：** OPEN | 作者：@sergical
- **链接：** https://github.com/anomalyco/opencode/pull/39008

**4. #39016 `fix(app): add scroll to project selector dropdown`**
- **修复：** 修复 #37149。用户在项目数过多时，项目选择下拉框无限生长的问题，增加滚动限制。
- **状态：** OPEN | 作者：@david1gp
- **链接：** https://github.com/anomalyco/opencode/pull/39016

**5. #39004 `fix(sdk): use local v2 type owners`**
- **重构：** 将生成式 V2 DTO 类型来源从外部包迁移至 `@opencode-ai/client` 与 `@opencode-ai/schema`，减少对旧兼容性 SDK 的依赖，提升类型一致性。
- **状态：** OPEN | 作者：@rekram1-node
- **链接：** https://github.com/anomalyco/opencode/pull/39004

**6. #38999 `fix(core): align grep behavior and guidance`**
- **修复：** 规范 Grep 工具行为，包括对外部目录路径的审批、返回更清晰的正则错误信息、以及对齐参数命名规范。
- **状态：** CLOSED | 作者：@rekram1-node
- **链接：** https://github.com/anomalyco/opencode/pull/38999

**7. #39023 `fix(schema): break circular type reference in Prompt by inlining parameter type`**
- **修复：** 解决 Prompt 接口与 `Schema.Schema.Type<typeof Prompt>` 相互引用导致的 TypeScript TS7022 循环类型引用问题，恢复下游消费者的类型安全检查。
- **状态：** OPEN | 作者：@AAliKKhan
- **链接：** https://github.com/anomalyco/opencode/pull/39023

**8. #39021 `fix(server): treat undefined origin as non-CORS, reject empty origin string`**
- **安全修复：** 修复 CORS 校验逻辑。之前使用 `!input` 判断空白字符串，导致客户端可发送 `Origin:`（空字符串）绕过 CORS 跨域检查。
- **状态：** OPEN | 作者：@AAliKKhan
- **链接：** https://github.com/anomalyco/opencode/pull/39021

**9. #39019 `fix(core): resolve npm edge by package name instead of first entry`**
- **修复：** 修复 npm 安装带有 peer depedency 的包时，`tree.edgesOut` 迭代返回错误节点的问题，确保正确返回被安装包本身的信息。
- **状态：** OPEN | 作者：@AAliKKhan
- **链接：** https://github.com/anomalyco/opencode/pull/39019

**10. #39020 `fix(core): propagate download failures as Effect errors in skill discovery`**
- **修复：** 修复技能更新下载失败时，代码使用 `return` 而非 `Effect.fail` 导致错误被静默吞掉、系统无诊断信息地使用旧缓存的问题。
- **状态：** OPEN | 作者：@AAliKKhan
- **链接：** https://github.com/anomalyco/opencode/pull/39020

---

## 功能需求趋势

**1. Agent 权限与访问控制精细化**
从 #39024（模式切换）、#39022（插件权限覆盖）可以看出，社区不再满足于“放权”或“拒绝”的二元选择，而是期望拥有类似“只读执行”、“变更前确认”、“完全访问”等分级控制，这是 Agent 走向“生产可用”的必经之路。

**2. 多平台与便携式部署诉求强烈**
#15789 和 #37893 表明用户希望打破全局安装的限制，在严格受限的企业环境、CI 流水线或便携 U 盘中无感使用 OpenCode。官方提供官方签名便携构建是社区长期期待的方向。

**3. LLM 提供商深度优化与成本控制**
从 #39008 和 #26205 来看，社区关心的不仅是“能否接入”，更是“能否用好”。如何在不同代理场景下（如 OpenRouter）利用对口优化（如 Prompt Caching），以及如何在复杂认证环境（如 WSL2 + Vertex）下稳定工作，是重要的痛点。

**4. 国际化（i18n）需求浮出水面**
#38280 是全球化社区扩张的自然信号。随着非英语用户增多，硬编码的英文界面提示、快捷键说明将成为新用户入门的障碍。

**5. 2.0 版本的交互体验打磨**
#39013 暴露了 TUI 模式在多层 Agent 委托场景下的交互短板，#39017 则指向 Web 模式的 API 路由基础架构问题。随着 2.0 核心功能趋于稳定，交互体验的完善优先级正在上升。

---

## 开发者关注点

**1. 升级稳定性焦虑**
- #38789 的 13 条评论和大量关注表明，**小版本升级（v1.18.5）引发的启动崩溃**对用户信心打击巨大。开发者强烈依赖平滑升级路径，任何破坏基础工作流的回归都是最高优先级问题。

**2. 成本透明度与优化**
- #39009 揭示了一个高频情景：**开发者通过代理（如 OpenRouter）使用大模型时，难以察觉自己的 Prompt Caching 并未生效，导致成本悄然增加。** 这是开销敏感用户的硬核痛点。

**3. 安全与灵活性之间的张力**
- #39022（权限覆盖失败）和 #39021（CORS 空字符串绕过）同时出现，生动展示了社区对一个 **灵活且安全** 的 Agent 平台的渴求。开发者既要求插件能够自定义权限覆盖（灵活性），也依赖框架在基础面上不出现安全漏洞（安全性）。

**4. 环境兼容性挑战**
- Windows 便携版（#37893）、WSL2 + Vertex 认证（#26205）等 Issue 持续活跃，说明 **非理想开发环境下的兼容性** 仍是阻碍用户大规模采用的重要摩擦点。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

好的，这是为您生成的 2026-07-27 Qwen Code 社区动态日报。

---

### 1. 今日速览

今日社区呈现“安全风暴”与“性能攻坚”交织的局面。安全研究员 @rishavkumar-thecoder 密集披露的 MCP 授权绕过及 Electron 配置漏洞引发高度关注，多项漏洞已被快速定位并关闭。与此同时，核心团队针对守护进程冷启动延迟与 Session 管理锁问题正在进行 P0 级别的紧急攻坚，多项关键的 gitignore 解析与工具 Schema 修复也集中合并。

---

### 2. 版本发布

**v0.21.0-nightly.20260726.9d19eafa9**
- **修复**：修复了 CLI 数据洞察时间的时区本地化问题。
- **重构**：对自动修复（Autofix）扩展机制进行了重构。
- [查看完整更新](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.0-nightly.20260726.9d19eafa9)

---

### 3. 社区热点 Issues

**1. [Security] MCP 工具调用拒绝可被绕过** (#7769 - *已关闭*)
- **影响极高（P1）**：用户拒绝 MCP 工具调用后，AI 可通过新建 SSE Session 无视拒绝历史，直接重试该工具。社区对此逻辑安全性反馈激烈，6 条评论深度讨论了 Session 生命周期权限继承的设计缺陷。
- [链接](https://github.com/QwenLM/qwen-code/issues/7769)

**2. [Security] Desktop IPC 桥接缺乏用户授权** (#7768 - *已关闭*)
- **影响极高（P1）**：`mcp_client_tool_call` IPC 接口直接透传请求至 MCP 服务端，渲染进程可绕过用户授权执行任意 MCP 工具，是典型的权限校验缺失。
- [链接](https://github.com/QwenLM/qwen-code/issues/7768)

**3. [Security] Desktop BrowserWindow 缺乏 Sandbox 隔离** (#7772 - *已关闭*)
- **安全加固（P3）**：Electron 主窗口未启用 `sandbox`，增加了渲染进程权限提升的攻击面，属于防御纵深缺失。
- [链接](https://github.com/QwenLM/qwen-code/issues/7772)

**4. [Security] 沙箱可通过暴露的 MCP 代理逃逸** (#7770 - *开放中*)
- **新颖攻击面（P2）**：代码解释器沙箱具备外网访问能力，若 MCP 代理暴露在互联网，沙箱内代码可通过 MCP 服务回写宿主机文件系统，削弱了沙箱的安全价值。
- [链接](https://github.com/QwenLM/qwen-code/issues/7770)

**5. [P0] 守护进程 Session 写锁无可信交接机制** (#7752 - *开放中*)
- **当前最高优先级的开发任务**：管理守护进程停止或替换后，旧 Session 的写入锁残留会导致新实例启动时误报锁冲突，直接导致服务不可用。
- [链接](https://github.com/QwenLM/qwen-code/issues/7752)

**6. [P2] 守护进程首个模型输出延迟量化与优化** (#7757 - *开放中*)
- **性能基线建设**：继 #7264 进程创建优化后，正式将“冷进程启动到首次模型输出”纳入性能指标，目标是系统性地降低端到端延迟。
- [链接](https://github.com/QwenLM/qwen-code/issues/7757)

**7. ACP 子进程冷启动 Eager-Closure 审计闭环** (#7264 - *已关闭*)
- **深度性能审计**：完成了对 ACP 进程 17.24 MiB 静态导入闭包的审计，识别出所有可懒加载模块，为大幅降低冷启动内存与时间消耗提供依据。
- [链接](https://github.com/QwenLM/qwen-code/issues/7264)

**8. [Feature] 新增直接外部上下文提供者配置文件** (#7585 - *开放中*)
- **社区热议（8 条评论）**：提案希望添加扩展机制，让 CLI 能从外部队列或知识服务中拉取「仓库共享上下文」，实现管理员统一管控上下文源。
- [链接](https://github.com/QwenLM/qwen-code/issues/7585)

**9. [P1] Main 分支 E2E 测试持续失败** (#7773 - *开放中*)
- **CI 健康告警**：Main 分支 E2E 测试再次失败，已打上 `autofix/in-progress` 标签，说明团队正在修复多次出现的自动化回归问题。
- [链接](https://github.com/QwenLM/qwen-code/issues/7773)

**10. [Feature] 子 Agent 模型等级选择** (#7685 - *已关闭*)
- **架构演进方向**：提议在 `agent` 工具中加入 `model` 参数，让 AI 能根据任务复杂度选择 small/medium/high 不同等级的模型来运行子 Agent，优化成本与性能平衡。
- [链接](https://github.com/QwenLM/qwen-code/issues/7685)

---

### 4. 重要 PR 进展

**1. 安全加固措施跨通道移植** (#7753)
- 将 `/verify` 通道的五项攻击防御策略（硬编码控制）同步至 `/tmux` 通道，消除多个功能通道间的防御落差。
- [PR 链接](https://github.com/QwenLM/qwen-code/pull/7753)

**2. 确定性代码 Lint 门禁** (#7751)
- 将代码审查脚本从「Agent 主观判断」改为「确定性规则执行」，避免因模型行为不可控导致的安全检查遗漏。
- [PR 链接](https://github.com/QwenLM/qwen-code/pull/7751)

**3. 修复 Web Shell 新任务 Shell 命令体验** (#7724)
- 允许在全新 Web Shell 任务中直接执行 `!` Shell 命令，无需手动创建 Session，显著提升启动流畅度。
- [PR 链接](https://github.com/QwenLM/qwen-code/pull/7724)

**4. 修复 toOpenAPI30 工具 Schema 生成错误** (#7760)
- 修复 `toOpenAPI30` 将属性名误判为 JSON Schema 关键字，导致 MCP 工具定义在特定属性名下生成错误 Schema 的问题。
- [PR 链接](https://github.com/QwenLM/qwen-code/pull/7760)

**5. 修复 gitignore 解析逻辑（多个 PR 联动）** (#7763, #7764, #7765)
- 修复 `gitignore` 模式中的**开头空格被错误 `trim()`**、**嵌套目录尾部斜杠导致锚定逻辑错误**、以及**Windows 反斜杠转义符被全局路径格式化替换**三大核心缺陷，大幅提升文件排除规则的准确性。
- [#7763](https://github.com/QwenLM/qwen-code/pull/7763) / [#7764](https://github.com/QwenLM/qwen-code/pull/7764) / [#7765](https://github.com/QwenLM/qwen-code/pull/7765)

**6. 修复 sed 模拟器 `]` 开头字符集解析错误** (#7775)
- `ShellToolInvocation.getSedEditInfo()` 在解析 `sed` 命令时，正确处理 POSIX BRE/ERE 中 `]` 开头字符集，防止模拟执行产生错误的文件写入。
- [PR 链接](https://github.com/QwenLM/qwen-code/pull/7775)

**7. 修复 Git Worktree 下 Stash 日志路径错误** (#7774)
- `countStashEntries` 从 per-worktree 的 Git 目录读取日志，而 Stash 日志存储在公共目录中，修复后可在 linked worktree 下正确报告 Stash 条目。
- [PR 链接](https://github.com/QwenLM/qwen-code/pull/7774)

**8. ACP 层预加载 Provider 减少响应延迟** (#7767)
- 在 Session 创建成功后立即在后台预加载内部的大模型 Provider，使紧随而来的首次 Prompt 可以复用预加载资源，减少等待时间。
- [PR 链接](https://github.com/QwenLM/qwen-code/pull/7767)

**9. 修复 Destructive Git 操作的守卫间隙** (#7531)
- 补全了 `git clean` 和 `git checkout` 在特定参数变形下的守卫漏洞，防止 AI 无意中执行强制覆盖或破坏性分支操作。
- [PR 链接](https://github.com/QwenLM/qwen-code/pull/7531)

**10. 提示词溯源功能** (#7762)
- 新增可选的 `submitted_prompt` 字段到 `UserPromptSubmit` 事件中，支持追踪用户提交的原文，为审计和会话管理提供更完整的数据来源。
- [PR 链接](https://github.com/QwenLM/qwen-code/pull/7762)

---

### 5. 功能需求趋势

- **安全体系重塑**：围绕 MCP 授权、IPC 通信与 Desktop 沙箱的漏洞挖掘与修复成为当前压倒性的焦点。社区不再满足于单体功能的迭代，对于 Agent 执行链路的“零信任”安全架构要求空前提高。
- **MCP 生态平台化**：从外部上下文提供者（#7585）到配置持久化（#7771），社区正在将 MCP 从“工具调用”进化为“Agent 感知层”，作为连接外部世界与智能体的核心数据管道。
- **端到端性能攻坚**：开发重心从单一的 Prompt 推理延迟转向“全过程冷启动延迟”，包括进程创建（ACP）、Session 建立、Provider 初始化，直至首 Token 产生的全链路优化。
- **Agent 资源精细运营**：子 Agent 模型等级选择功能（#7685）反映了社区对大规模 Agent 调用成本的关切，需求正从“能用”向“经济高效”转变。

---

### 6. 开发者关注点 / 痛点

- **MCP 信任危机**：开发者发现“拒绝 MCP 调用”可以被轻易绕过（#7769）。这是目前最大的 UX 信任危机，用户可能因此停止使用依赖 MCP 的自动化功能。
- **P0 守护进程可用性问题**：Session 写锁无法交接（#7752）和配置无法热加载（#7771），暴露了守护进程在高可用与断线重连场景下的薄弱环节，是影响企业级用户部署的头号障碍。
- **跨平台核心逻辑可靠性**：围绕 `gitignore` 解析的连续 Bug（空格、转义符、路径分隔符），揭示了基于 Node.js 跨平台工具在处理文件路径时极易出现隐性 Bug，是开发者长期诟病的痛点。
- **沙箱功能的“半隔离”状态**：沙箱不能直接访问主机但能访问外网（#7770），这种半隔离状态催生了独特的远程攻击面。开发者期望能有更精细的网络策略，而不是简单的“全关”或“全开”。
- **CI 稳定性焦虑**：Main 分支 E2E 测试多次非预期失败（#7755、#7759、#7773），已引发社区对发布质量保障流程的担忧。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报 | 2026-07-27

## 1. 今日速览

Hermes 项目在过去 24 小时迎来高度活跃的社区贡献期，共更新 **14 个 Issues** 和 **50 个 Pull Requests**，动态密集。安全方面，GitLab 令牌全面脱敏已完成合并；功能层面，社区集中贡献了多处对标 Claude Code 的开发体验特性（`/loop`、`/focus`、`/context`）。同时，多个 P2 级别的高影响 Bug 取得关键进展，涵盖 macOS 屏幕捕获失效、MCP 架构兼容性以及 Ollama Cloud 连接异常等问题，社区整体的安全意识和稳定性诉求明显升温。

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 社区热点 Issues（Top 10）

#### 1. `#72329` [P2] 长度截断绕过持续守卫导致会话死循环
- **重要性**：刚刚上报的严重逻辑缺陷。模型因 `finish_reason="length"` 被截断，但该截断恰好发生在**包含工具调用**的回合，导致重试计数器永远无法触发，会话进入无限循环且不生成任何有效内容，直接威胁生产环境的会话稳定性。
- **社区反应**：刚发布就被快速标记为 P2 + `risk-session-state`，社区高度关注。
- [GitHub Issue](https://github.com/NousResearch/hermes-agent/issues/72329)

#### 2. `#42727` [P2] 智能体自配置可持久化脱敏凭据导致网关中断
- **重要性**：一个非常隐蔽的安全问题。Agent 在自主排查提供商故障时，只能看到工具输出中被脱敏的密钥占位符（如 `sk-...abcd`），如果它将占位符写回 `config.yaml`，网关配置将直接失效。这是 AI 自主运维场景下的经典安全边界陷阱。
- **社区反应**：讨论深入，开发者对"如何限制 Agent 写入敏感字段"和"自配置是否需要加审批环节"展开了激烈辩论。
- [GitHub Issue](https://github.com/NousResearch/hermes-agent/issues/42727)

#### 3. `#55081` [P2] MCP Schema 规范化重命名参数引发兼容性问题
- **重要性**：`_normalize_mcp_input_schema` 在注册 MCP 工具时会将参数 `definitions` 重命名为 `$defs`。这对于依赖严格 Jackson 反序列化（`FAIL_ON_UNKNOWN_PROPERTIES=true`）的 Java 系 MCP 服务器是致命错误，直接导致握手失败，严重限制了 Hermes 对接企业级 MCP Server 的能力。
- **社区反应**：收到了较多共鸣，多个用户反馈遇到过类似由于 Schema 转换导致的对接异常。
- [GitHub Issue](https://github.com/NousResearch/hermes-agent/issues/55081)

#### 4. `#67165` [P2] macOS 屏幕捕获失效（ScreenCaptureKit）
- **重要性**：在 macOS 26.5.2 (Apple Silicon) 上，即时 TCC 权限完全通过，`action='capture'` 依然返回宽高为 0 且无元素。这直接导致了 macOS 场景下 "Computer Use" 功能完全不可用。
- **社区反应**：苹果平台用户反馈强烈，期待快速定位 ScreenCaptureKit 的调用差异。
- [GitHub Issue](https://github.com/NousResearch/hermes-agent/issues/67165)

#### 5. `#9812` [P2] ACP 会话元数据丢失
- **重要性**：`SessionManager` 的 `create_session` 未即时持久化 `provider/base_url` 元数据。如果 Hermes 在首次 save 之前重启，恢复会话时将完全丢失原始提供者信息，无法重建连接。这是多 Provider 管理场景下的一个关键数据可靠性隐患。
- **社区反应**：用户确认这是一个"在云部署中很容易踩到"的坑。
- [GitHub Issue](https://github.com/NousResearch/hermes-agent/issues/9812)

#### 6. `#64533` [P2] 后台进程 Poll 永久挂起
- **重要性**：对已经退出的后台进程调用 `process(action="poll")`，网关会无限挂起直至全局 30 分钟超时。严重破坏任何依赖后台进程管理的自动化工作流。
- **社区反应**：该 Issue 被标记为 `needs-repro`，但社区贡献者已经给出了清晰的复现路径，修复方案已开始讨论。
- [GitHub Issue](https://github.com/NousResearch/hermes-agent/issues/64533)

#### 7. `#60783` [Closed] huggingface-hub 依赖版本冲突
- **重要性**：经典的环境依赖事故。`tools/lazy_deps.py` 锁定了 `huggingface-hub==1.2.3`，但 `sentence-transformers`（通过 Hindsight 本地嵌入拉入）需要 `>=1.5.0`，导致 `hermes update` 后部分内存工具直接崩溃。该 Issue 最终通过 lazy_deps 重定向解决，对依赖管理策略有参考价值。
- **社区反应**：依赖锁导致的兼容性问题引发了社区对"是否应该收紧密封工具依赖"的讨论。
- [GitHub Issue](https://github.com/NousResearch/hermes-agent/issues/60783)

#### 8. `#40518` [P2] web_search 工具缺乏 Firecrack 回退机制
- **重要性**：未配置 Firecrawl API Key 时，`web_search` 直接报错而不是优雅降级到内置的 DuckDuckGo 后端（无需 Key）。这违背了 "开箱即用" 的核心用户体验，且降低了 Agent 的信息获取鲁棒性。
- **社区反应**：用户对此表达了明显的挫败感——明明内置了免费的后端却无法自动启用。
- [GitHub Issue](https://github.com/NousResearch/hermes-agent/issues/40518)

#### 9. `#3506` [P3] 持久化反馈路由
- **重要性**：社区长久以来期待的核心能力。Hermes 已具备记忆（memory）、技能（skill_manage）和对话搜索（session_search）等原语，但缺乏一个稳定的机制将这些上下文持久化地应用到后续对话和规划中。这直接关乎 Agent 的"长期学习"能力。
- **社区反应**：Issue 长期保持活跃，社区正在讨论如何将反馈与 `memory`、`skill_manage` 和 `session_search` 三个模块有机连接。
- [GitHub Issue](https://github.com/NousResearch/hermes-agent/issues/3506)

#### 10. `#72267` [P3] 可选传输负载调试模式
- **重要性**：开发者在进行 Token 消耗审计和 Prompt 尺寸优化时，无法确定实际发送给 OpenAI 兼容 API 的完整负载。请求增加一个无需侵入式修改源代码即可查看最终 `messages`/`tools` 结构的 opt-in 调试开关。
- **社区反应**：仅一天就获得了关注量，说明该痛点具有普遍性。
- [GitHub Issue](https://github.com/NousResearch/hermes-agent/issues/72267)

---

## 4. 重要 PR 进展（Top 10）

#### 1. `#72333` feat: `/loop` 循环命令
- **内容**：跨所有界面（CLI、TUI、Gateway、桌面端）实现 `/loop` 命令。支持设定循环间隔（如 `/loop 5m check deploy`），融合了活跃度检查、退避策略和停止逻辑。这是对标 Claude Code 功能集的一个重要抓手。
- **标签**：`type/feature` | `sweeper:risk-session-state`
- [GitHub PR](https://github.com/NousResearch/hermes-agent/pull/72333)

#### 2. `#72327` fix: 扩展 GitLab 令牌脱敏
- **内容**：将密钥脱敏覆盖范围扩展到 14 个 GitLab 令牌家族（`glpat-`、`gloas-`、`gldt-` 以及遗留 `GR1348941` 等），防止这些令牌在日志和显示界面明文输出。
- **标签**：`type/security` | `P3`
- [GitHub PR](https://github.com/NousResearch/hermes-agent/pull/72327)

#### 3. `#72302` feat: `/focus` 聚焦模式
- **内容**：新增 只渲染用户提示和最终回复，隐藏中间工具调用和思考过程 /focus 显示模式。支持恢复隐藏行，并在状态栏提供明确的 `focus` 视图标识。显著降低复杂任务场景下的信息噪音。
- **标签**：`type/feature` | `sweeper:risk-compatibility`
- [GitHub PR](https://github.com/NousResearch/hermes-agent/pull/72302)

#### 4. `#72242` feat: `/context` 上下文分析
- **内容**：复用桌面端已有的上下文分析引擎（`agent/context_breakdown.py`），将每轮请求的 Token 消耗按类别（Prompt/工具输出/系统提示）暴露给 CLI 和 Gateway。开发者无需打开桌面端即可精确定位上下文溢出来源。
- **标签**：`type/feature` | `area/usage-cost`
- [GitHub PR](https://github.com/NousResearch/hermes-agent/pull/72242)

#### 5. `#72259` feat: `approvals suggest` 审批建议
- **内容**：`hermes approvals suggest` 命令可以挖掘用户的审批历史，自动生成排序后的 `command_allowlist` 提案。将反复手动批准的权限请求转化为一次性策略，减少交互打扰的同时提升安全性。
- **标签**：`type/feature` | `area/auth`
- [GitHub PR](https://github.com/NousResearch/hermes-agent/pull/72259)

#### 6. `#71610` feat: Buzz（Nostr）平台适配器
- **内容**：社区贡献的 Nostr 协议平台适配器。允许 Agent 连接到 Buzz（Block/Nostr）中继器，参与频道和私信对话。对 Hermes 的去中心化社交连接能力是一次重要扩展。
- **标签**：`type/feature` | `comp/plugins`
- [GitHub PR](https://github.com/NousResearch/hermes-agent/pull/71610)

#### 7. `#72324` fix: 后台进程 UTF-8 解码
- **内容**：修复后台进程输出中多字节 UTF-8 字符在管道/PTY 读取边界处被截断（产生乱码）的问题。采用递增式 UTF-8 解码器，与前台处理路径保持一致的高健壮性。
- **标签**：`type/bug` | `tool/terminal` | `P2`
- [GitHub PR](https://github.com/NousResearch/hermes-agent/pull/72324)

#### 8. `#72335` fix: 内存提供者依赖安装路径
- **内容**：修复通过 Dashboard 安装内存提供者（Honcho、mem0、Hindsight 等）时，因 `uv pip install` 路径硬编码导致托管环境权限错误的问题。现在安装重定向到 `lazy_deps` 持久化目标，确保合规性。
- **标签**：`type/bug`
- [GitHub PR](https://github.com/NousResearch/hermes-agent/pull/72335)

#### 9. `#69205` fix: API Server 会话恢复
- **内容**：修复 `POST /v1/runs` 在延续已有 `session_id` 时，未从持久化存储中加载历史对话记录的问题。修复前 Agent 在恢复会话时处于"失忆"状态，这直接破坏了 Gateway 场景下的会话连续性。
- **标签**：`type/bug` | `comp/gateway` | `P2`
- [GitHub PR](https://github.com/NousResearch/hermes-agent/pull/69205)

#### 10. `#72332` fix: Ollama Cloud 停止信号误判及 SSE 状态传播修复
- **内容**：修复两个连锁 BUG：① `_is_ollama_glm_backend()` 在匹配 Ollama Cloud 时产生误判（错误绕过标准完成逻辑）；② 流式终止时 SSE 状态未正确传播，导致 `finish_reason` 无法从 `"stop"` 被正确识别。解决了特定模型在 Ollama Cloud 上无法正常使用的问题。
- **标签**：`type/bug` | `provider/ollama` | `P2`
- [GitHub PR](https://github.com/NousResearch/hermes-agent/pull/72332)

---

## 5. 功能需求趋势

基于过去 24 小时的所有动态，社区关注的功能方向高度聚焦：

1. **安全合规自动化**：社区对 Agent 自主行为的风险极为敏感。从凭据脱敏（`#72327`）到智能体自配置防护（`#42727`），再到基于审批历史的策略自动生成（`#72259`），"构建可控、可审计的自主 Agent" 已经成为明确的主流需求。

2. **对标 Claude Code 的极致开发体验**：Hermes 社区正密集补齐交互短板。`/loop`（`#72333`）、`/focus`（`#72302`）、`/context`（`#72242`）以及可选的传输负载调试模式（`#72267`）的密集出现，表明开发者希望拥有更精细的会话控制、更低的信息噪音和完全的 Token 消耗透明度。

3. **MCP 生态深度适配**：社区不仅仅是满足于 MCP 协议的基本接入（如 `#71610` Buzz 适配器），更深层次的需求在于 Schema 转换的高保真度（`#55081`）以及握手阶段的服务器严格模式兼容（`#5468`）。这标志着 Hermes 正在经历从单机工具向跨协议平台的泛化演进。

4. **长期记忆与持久化规划**：`#3506` 的持续活跃，叠加多个与会话持久化丢失相关的 P2 Bug（`#9812`、`#69205`），反映出社区对 Agent “用完即忘”、无法稳定保留用户反馈和数据状态这一现状表现出明显疲劳。长对话的可靠性是最底层且最迫切的需求之一。

5. **跨设备/跨平台一致性**：macOS 屏幕捕获（`#67165`）、Ollama Cloud 连接差异（`#72332`）、Windows 启动器迁移（`#72334`）等问题的频繁出现，表明多平台下的行为一致性已成为维护重点。

---

## 6. 开发者关注点

1. **依赖管理之痛**：`#60783` 的低层级 Pin 版本与上层依赖冲突，直接导致核心功能崩溃。这反映了 Python 生态中多工具链普遍存在且非常棘手的依赖协调难题。开发者倾向于更强的环境隔离或更智能的 lazy import 策略。

2. **MCP 互操作性的隐形成本**：与不同语言（特别是 Java/Spring）编写的 MCP 服务器对接时，极细微的 Schema 差异（`definitions` vs `$defs`、`FAIL_ON_UNKNOWN_PROPERTIES`）就会造成通信完全中断。开发者投入了大量的精力进行适配和测试，呼吁建立更严格的标准规范或提供兼容性日志工具。

3. **Agent 自主性的安全边界**：`#42727` 让开发者看到了 Agent 自主修改核心配置文件的真实风险——它甚至不需要越狱，单纯完成 "修复提供商" 的任务就可能导致配置损坏。如何在高级自主性和不可逆的系统安全之间建立"熔断"机制，是当下社区讨论的重点。

4. **平台特定问题持续消耗精力**：macOS 的 ScreenCaptureKit（`#67165`）与 Windows 的 `pythonw` 启动器迁移（`#72334`），以及后台进程的跨平台处理（`#64533`），显示桌面端跨平台支持中硬件加速、进程管理和系统级权限管理的差异仍旧是持续难题。

5. **配置与体验的一致性缺陷**：`#4848` 反映的 `display.compact: true` 在代码中被硬编码为 `False` 的问题，暴露了 CLI 配置与代码逻辑之间可能存在版本脱节或重构遗漏。这类问题虽不致命，但持续消耗着开发者对 "配置即代码" 这一承诺的信任。

</details>