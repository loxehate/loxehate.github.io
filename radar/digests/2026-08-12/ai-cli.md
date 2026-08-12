# AI CLI 工具社区动态日报 2026-08-12

> 生成时间: 2026-08-12 01:52 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-08-12）


## 1. 生态全景

当前 AI CLI 工具已从"单点代码辅助"演进为**覆盖编码、自动化、多 Agent 编排、桌面端交互的完整开发平台**。头部工具（Claude Code、Codex）以周级频率滚动发版，功能迭代速度极快；二线工具（Gemini CLI、Qwen Code、OpenCode）在特定场景（Google 生态、Web Shell、TUI）构建差异化壁垒。但高速迭代的代价已经显现：**稳定性回归、资源消耗失控、计费信任危机**成为全行业普遍性噪音——各工具社区不约而同地出现"先求稳定"的呼声，用户对"每次更新都带来新 bug"的耐受度正在降低。一个值得注意的信号是：**跨工具的共同痛点（Windows 平台问题、MCP 生态可靠性、Agent 行为可控性）远多于差异化优势**，说明行业仍处于"基础体验尚未夯实"的早期阶段。


## 2. 各工具活跃度对比

| 工具 | 今日 Issues | 今日 PRs | 版本发布 | 迭代信号 |
|------|------------|----------|---------|----------|
| **Claude Code** | 10 个热点（评论最高 72） | 7 个 | v2.1.228（补丁） | 稳定补丁 + 长期 Issue 积压 |
| **OpenAI Codex** | 10 个热点（评论最高 96） | 10 个 | 3 个 alpha（连续发版） | 高频 CI 驱动滚动发布 |
| **Gemini CLI** | 10 个热点（评论最高 12） | 10 个 | 4 个（stable/preview/nightly） | 三通道并行，节奏清晰 |
| **DeepSeek Reasonix** | 10 个热点（评论密集） | 10 个 | v1.24.0/v1.24.1（双端） | 紧急修复 + 社区信任危机 |
| **OpenCode** | 10 个热点 | 10 个 | 无 | V2 密集修复期，50 个 PR 更新 |
| **Qwen Code** | 6 条（全部列出） | 10 个 | v0.21.10（正式版） | 自动化修复流程（autofix）运转中 |
| **Hermes** | 10 个热点（含 1 个 Epic） | 10 个 | 无 | 架构治理 + Windows 稳定性补强 |

> 注：各工具 Issue 数据为日报中精选的热点条目，非仓库全量增量。


## 3. 共同关注的功能方向

| 功能方向 | 涉及工具 | 具体诉求 |
|----------|----------|----------|
| **Agent 行为可控性** | Claude Code、Gemini CLI、Hermes、OpenCode | 模型不遵守指令/静默覆盖用户配置（#80988、#85677）；子代理未经许可自动启用（#22093）；空响应误报成功（#22323、#41898）；破坏性命令无防护（#22672） |
| **Windows 平台稳定性** | 全部 7 个工具 | 控制台窗口闪烁（CC #14828）、应用卡顿（Codex #20214，96💬）、启动闪窗/网关静默死亡（Reasonix #8425、Hermes #84185）、子进程编码问题（OpenCode #31658，关联合并 5 个 issue） |
| **MCP 生态可靠性** | Claude Code、Codex、Gemini CLI | 多账户支持（CC #36024，77👍）、工具"宣布但不派发"（CC #79986）、OAuth/CIMD 增强（Codex #38089）、会话中动态工具发现缺失（Codex #37417） |
| **资源消耗与成本控制** | Claude Code、Gemini CLI、Hermes、Reasonix | 并行 Agent token 失控（CC #67636）、工具 schema 全量注入浪费 token（Hermes #6839，18👍）、recovery 分支膨胀消耗磁盘（Reasonix #8421，300MB+）、无限重试消耗 token（OpenCode #41848） |
| **会话/上下文管理** | Reasonix、OpenCode、Hermes、Gemini CLI | 会话重复/丢失（Reasonix #8443/#8441）、新会话 cwd 继承错误（OpenCode #41905）、压缩死循环（OpenCode #27924）、会话切换渲染状态不同步（Hermes #80149） |
| **长任务可靠性** | Qwen Code、Codex、Gemini CLI | 自动模式数小时任务卡死（Qwen #8963）、SSE 流建立前无限挂起（Codex #31376）、generalist agent 永久挂起（Gemini #21409） |


## 4. 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线 |
|------|----------|----------|----------|
| **Claude Code** | 企业级深度工作流：Cowork VM、MCP 集成、GUI 桌面端 | 企业开发团队、重度 Anthropic 生态用户 | 闭源 + 商业版，以"托管工作区 + 插件扩展"构建封闭但完整的体验 |
| **OpenAI Codex** | 跨端协同 + 插件生态：Browser Use / Computer Use、远程控制、gRPC code-mode | Microsoft/OpenAI 生态开发者、Windows 重度用户 | Rust 重写 + 高频 alpha 滚动发布，插件化浏览器自动化是核心差异化 |
| **Gemini CLI** | Google 云生态深度绑定：Vertex AI、Gemini API、sandbox、多通道版本管理 | GCP 企业客户、Google 生态开发者 | 三通道发布（stable/preview/nightly），工具注册表 + eval 体系，工程化程度高 |
| **DeepSeek Reasonix** | 会话数据安全与恢复机制 + 桌面端体验 | 对会话连续性/数据安全敏感的专业用户 | 双端（CLI+Desktop）同步发版；强调 WAL/CAS/租约等数据安全底层架构 |
| **OpenCode** | 终端体验（TUI）+ 多运行时互操作（ACP 接入 Claude Code） | 终端党、多工具混用用户、TUI 爱好者 | 开源 + V2 重写，以"运行时抽象层"整合多种后端模型/Agent |
| **Qwen Code** | Web Shell 交互 + 远程/多场景终端适配 + 自动化修复流水线 | 远程开发（SSH/tmux）、Web 端用户、阿里云生态 | live-host 架构 + autofix 自动化运维，Web Shell 与终端体验为核心战场 |
| **Hermes** | 多租户/多账号、消息网关（微信/QQ/Telegram）、记忆/技能系统 | 个人自动化重度用户、多平台消息机器人开发者 | 开源 + 网关架构，以消息平台接入和长期记忆为核心，社区驱动（Nix/插件/kanban） |


## 5. 社区热度与成熟度

**成熟度第一梯队：Claude Code / OpenAI Codex**
- Claude Code 社区体量最大，Issue 讨论深度高（#27801 达 72 评论），但长期未决问题（Cowork 稳定性、Windows 闪烁）已持续近 6 个月，说明官方对存量问题的响应速度跟不上社区预期。
- Codex 迭代节奏最快（24 小时 3 个 alpha），PR 合入效率高（10 个 PR 全部合并），但其"滚动发布 + 无详细变更日志"的模式正在消耗用户信任——#20214 以 96 评论登顶今日热榜，Windows 插件生命周期问题呈现"同根因多版本复发"特征。

**快速迭代 / 修复驱动型：DeepSeek Reasonix / OpenCode**
- Reasonix 正处于**社区信任危机**——v1.24.x 连续爆出 recovery 分支爆炸、会话重复/丢失等数据安全问题，#8454"先求稳定"获得广泛共鸣。但团队响应极快（多个 hotfix PR 密集提交），属"快速修复、但代价是稳定性波动"的典型状态。
- OpenCode 处于 V2 重写后的密集打磨期，50 个 PR 更新表明开发极其活跃；但"无限重试、死循环、静默失败"等基础稳定性问题仍多，说明 V2 尚未达到生产级成熟度。

**差异化深耕型：Gemini CLI / Qwen Code / Hermes**
- Gemini CLI 工程化最扎实：三通道发布 + eval 体系 + 安全修复（CVE）优先级明确，但社区规模相对较小（Issue 评论数普遍个位数），处于"产品质量 > 社区声量"的阶段。
- Qwen Code 社区反馈量最小（24h 仅 6 条），但有 autofix 流水线自动处理 CI 问题，体现出产品化运营思维；其 Web Shell + tmux 子代理路线在远程开发场景有独特价值。
- Hermes 社区在"架构治理"层面表现出罕见的组织度（god-file 拆分 Epic 67 评论），且 P1 级 Windows 问题获得快速 PR 响应，属于社区驱动 + 开发响应敏捷的典型开源项目。


## 6. 值得关注的趋势信号

1. **"稳定性"正在成为新的竞争壁垒**：从 Reasonix 的"先求稳定"、Claude Code 的长期 Issue 积压、到 Codex 的滚动发布引发不满，各工具在功能竞赛后开始为"迭代速度过快"付出代价。**对开发者的启示：评估 AI CLI 工具时，"发布纪律"应作为与功能清单同等重要的考量维度**——关注项目是否有 stable/preview 通道隔离、是否有回归测试保障，而非仅看新功能数量。

2. **Windows 已成为 AI CLI 的主战场，而非附属平台**：今日几乎所有工具的 Top Issue 都包含 Windows 专属问题（闪烁、卡顿、插件消失、进程管理）。**对开发者的启示：如果你在 Windows 环境工作，需要为"工具在 Windows 上的成熟度"做额外尽职调查**——检查 GitHub Issues 中 platform-windows 标签的数量与解决周期，而非只看首页宣传。

3. **Agent 行为可控性（治理）需求从"高级话题"变为"基础要求"**：模型不遵守指令、子代理未经许可运行、空响应误报成功——这些问题跨越所有工具普遍出现。**对开发者的启示：将 AI CLI 纳入生产流程时，应优先验证权限模型（能否彻底关闭子代理、能否设置无审批模式）、审计能力（能否追踪 agent 实际行为），而不是先关注模型编码能力**。"Agent 的自主性阈值"与"用户的实际控制权"之间的张力，将决定谁适合进入 CI/CD 等自动化链路。

4. **资源消耗失控是隐藏的成本黑洞**：并行 Agent token 失控（CC）、无限重试 24 天（OpenCode）、recovery 分支膨胀数 GB（Reasonix）、工具 schema 每轮消耗数千 token（Hermes）——这类问题在官方文档中通常不会醒目提示，但实际账单/磁盘占用会让用户猝不及防。**对开发者的启示：在配置默认预算（token/磁盘/超时）时，应参考社区 Issue 了解最坏情况，而非仅按理想工作流估算。**

5. **MCP 生态进入"标准化阵痛期"**：从"能否连接"（基础阶段）进入到"连接后是否可靠"（多账户、动态工具发现、OAuth、审批统一）的深水区。**对开发者的启示：如果你正在基于 MCP 构建工具链，需要警惕"握手成功 ≠ 调用可靠"的现实**，建议在架构中为 MCP 工具添加超时、重试和降级策略。

6. **"远程开发"与"终端体验"场景正在被重新定义**：Qwen Code 的 tmux 子代理、Codex 的 Remote Control、Claude Code 的 Cowork VM——各头部玩家都在押注"Agent 不只是编辑器内的助手，而是远程环境的常驻协作者"。**对开发者的启示：评估工具时建议测试 SSH/容器/云开发环境下的表现**（如 tmux 兼容性、sandbox 隔离、代理支持），这些场景将成为下一阶段 AI CLI 的必争之地。

---

*报告基于 2026-08-12 七个 AI CLI 工具社区日报数据整理，所有 Issue/PR 编号均可溯源至对应 GitHub 仓库。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills 摘要生成失败。

---

# 🗞️ Claude Code 社区动态日报 · 2026-08-12

## 今日速览

今日发布补丁版本 **v2.1.228**，修复了交互式会话停止重绘、Windows 下 Git 路径识别失败及 `/tui` 回退问题。社区热度集中在两个长期未决的 Issue：Cowork VM 启动失败（72 评论 / 41 👍）与 Windows 控制台窗口闪烁（60 评论 / 36 👍）；功能需求上，Gmail MCP 多账户支持以 77 👍 成为最高赞请求。值得警惕的是，关于模型不遵守指令、资源消耗失控和计费争议的投诉仍在持续累积。

---

## 版本发布

### v2.1.228
[查看 Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.228)

- 修复罕见的内部布局错误，导致交互式会话完全停止重绘、但进程仍在运行的问题
- 修复从 Git 安装目录的父文件夹启动 Claude Code 时，Windows 无法找到 `git` / Git Bash 的问题
- 修复 `/tui` 命令的回退逻辑

---

## 社区热点 Issues

### 1. [BUG] Cowork: 工作区启动失败 — VM 服务未运行，重启依旧
[#27801](https://github.com/anthropics/claude-code/issues/27801) · 72 💬 · 41 👍

Cowork 启动工作区时报 “Failed to start Claude's workspace”，底层 VM 服务未拉起且重启无法解决。这是当前评论数最高的 Issue，已持续近 6 个月，Cowork 在部分环境下的稳定性缺口值得官方重视。

### 2. [BUG] Windows: 执行工具时控制台窗口闪烁
[#14828](https://github.com/anthropics/claude-code/issues/14828) · 60 💬 · 36 👍

Windows 上每次执行工具都会闪现控制台窗口，严重干扰体验。带 `has repro` 标签但长期未修复，Windows 开发者呼声很高。

### 3. [Feature] Gmail MCP 集成支持多账户
[#36024](https://github.com/anthropics/claude-code/issues/36024) · 25 💬 · 77 👍

当前 Gmail MCP 一次只能连接一个账户，个人 + 工作多邮箱用户希望可同时接入多个 Google 账户。77 👍 为今日数据中最高，社区需求明确。

### 4. [BUG] v2.1.219 注入额外提示段，覆盖用户委派策略
[#80988](https://github.com/anthropics/claude-code/issues/80988) · 21 💬 · 48 👍

名为 `heron_brook` 的系统提示段在 Opus 5 上注入 “除非用户要求，否则不要调用 AgentTool”，静默覆盖用户配置且无法关闭。涉及模型行为控制权，社区反应强烈。

### 5. [BUG] ugrep 包装器放大正则回溯，WSL2 宿主冻结
[#54394](https://github.com/anthropics/claude-code/issues/54394) · 27 💬 · 4 👍

v2.1.117 引入的内嵌 ugrep 将 grep 进程 OOM 放大为 V8 堆 OOM（8 GB 上限），WSL2 上导致宿主机冻结。虽点赞数不高，但评论活跃，波及面可能较大。

### 6. [Feature] GUI 最近文件夹支持删除
[#33502](https://github.com/anthropics/claude-code/issues/33502) · 21 💬 · 37 👍

GUI 中新建的文件夹会进入最近列表但无法删除。看似小问题，但关乎日常体验，获得 37 👍。

### 7. [BUG] Claude Desktop: 外部 stdio MCP 工具从不派发
[#79986](https://github.com/anthropics/claude-code/issues/79986) · 15 💬 · 8 👍

升级 Desktop 1.24012.1 后，外部 MCP 工具完成握手但应用从不发送 `tools/call`，所有 MCP 调用失败。跨平台、全安装方式受影响，属 MCP 生态严重回归。

### 8. [Reggression] 桌面版会话时间筛选器显示异常
[#78775](https://github.com/anthropics/claude-code/issues/78775) · 8 💬 · 28 👍

会话时间范围筛选只有在 “Group by” 设为 “State” 时才出现，明显是 UI 回归。28 👍 说明不少桌面用户遇到同样困惑。

### 9. [BUG] macOS 沙箱因 ARG_MAX 完全不可用
[#73468](https://github.com/anthropics/claude-code/issues/73468) · 7 💬 · 5 👍

macOS 上每条沙箱命令均以 `E2BIG: argument list too long` 失败，原因是 `sandbox-exec -p` 内联 Seatbelt profile 在 git worktree 较多时超出 ARG_MAX。影响所有开启沙箱的 macOS 用户。

### 10. 7·17 计费事件：额度内用量被扣费，争议 604.71 美元
[#81703](https://github.com/anthropics/claude-code/issues/81703) · 12 💬

订阅额度未用完的情况下，用量被路由到付费额度并触发自动充值。Anthropic 已承认事件但未完全对账，涉及资金与用户信任。

---

## 重要 PR 进展

本次共 7 个 PR，全部列出：

### 文档与链接清理
- [**#85925** docs: 将残留的旧文档链接指向 code.claude.com](https://github.com/anthropics/claude-code/pull/85925)（OPEN）— 清理 `docs.claude.com` 旧域名链接至 `code.claude.com`，覆盖插件、技能与 issue 模板。

- [**#85822** docs: 修复插件和示例中的过时文档链接及 README 漂移](https://github.com/anthropics/claude-code/pull/85822)（OPEN）— 更新 hooks 与 plugins 文档链接，所有改动均验证了实际重定向。

### 缺陷修复
- [**#70173** fix(commit-commands): 用 `git branch -vv` 检测 gone 分支](https://github.com/anthropics/claude-code/pull/70173)（CLOSED）— `/clean_gone` 原本用 `git branch -v` + `grep '[gone]'` 检测已删除分支，但 `-v` 不输出该标记导致命令从不生效。改用 `-vv` 修复。

- [**#85716** fix(hookify): 从祖先 .claude 目录加载规则，防止静默绕过](https://github.com/anthropics/claude-code/pull/85716)（OPEN）— 修复 hookify 插件安全规则未加载导致被静默绕过的问题（Fixes #85613），覆盖 Linux/macOS/Windows。

- [**#85806** fix(security-guidance): 跳过文档中的 XSS 警告](https://github.com/anthropics/claude-code/pull/85806)（OPEN）— 对 4 条 XSS 子串规则复用 `_DOC_EXTS` 过滤器，文档/散文语境下不误报，可执行源码仍保留警告，并补充回归测试。

- [**#85243** fix(skills): 在 plugin-dev 和 hookify 技能中使用符合规范的名称](https://github.com/anthropics/claude-code/pull/85243)（OPEN）— 修正 8 个内置技能中 title-case 且含空格的 `name` 字段，使其符合技能规范。

### 其他
- [**#85834** fix: HackerOne Bug Bounty 项目访问问题](https://github.com/anthropics/claude-code/pull/85834)（OPEN）— 调整 `devcontainer.json` 以正确安装 hookify 插件，从而访问 HackerOne 赏金项目（AI 生成描述，需人工复核）。

---

## 功能需求趋势

从近 24 小时更新的 Issues 中，社区关注度最高的功能方向：

1. **MCP 生态扩展** — 用户不再满足于基础连接，开始要求多账户支持（#36024，77 👍），同时对 MCP 调用的可靠性提出更高要求（#79986）。
2. **Agent 编排与协同** — 多会话协调原语缺失（#76727）、子 Agent 回复通道不可达（#85949）、并行 Agent token 消耗失控（#67636），重度用户正在触碰当前 Agent 架构的天花板。
3. **GUI / 桌面端 UX 打磨** — 最近文件夹管理（#33502）、会话筛选器回归（#78775）、长提示折叠（#61675），桌面端体验细节成为新焦点。
4. **沙箱与安全加固** — macOS 沙箱 ARG_MAX（#73468）、MSIX 写重定向误判为攻击（#84841）、hookify 规则绕过（#85716），安全类问题的上报密度在上升。
5. **跨平台稳定性** — Windows 控制台闪烁（#14828）、WSL2 OOM（#54394）、macOS 大图片读取死锁（#85884），平台适配仍是长期短板。

---

## 开发者关注点

- **模型行为与指令遵循是最大痛点**：一位用户连续提交 7+ 个 Issue（#71576、#72061、#76044、#74848、#75232、#76512、#77322），集中反馈“模型不遵守用户指令、擅自执行未授权操作、输出未经核实的内容”；#85677 也报告了指令被读取并确认、随后被忽略的问题。这不是个例，而是社区对 Agent 行为可控性的普遍焦虑。
- **资源消耗失控**：#67636 中 Claude 并行启动 10~15 个 Agent 导致数百万 token 消耗；#54394 中 ugrep 正则在 8 GB 堆下把宿主机冻结。成本与稳定性双重压力。
- **计费信任危机**：7 月 17 日计费事件尚未完全解决（#81703），紧接着又出现 8 月 1 日的自动充值争议（#83062），付费用户的不满情绪在累积。
- **稳定性回归频发**：SSE 流式连接在 2.1.139 后重置（#84404）、桌面版会话恢复错乱（#85798）、MCP 工具“宣布但不派发”（#79986），用户对更新的谨慎态度在增加。
- **平台长尾问题持续**：Windows 控制台闪烁（#14828）、Git Bash 路径（v2.1.228 已修）、macOS 大图片读取死锁（#85884）、Chrome file_upload 拒绝计划任务会话（#84880），平台细节占据了不少 Issue 数量。

---

*数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code) · 统计周期：2026-08-11 ~ 2026-08-12*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-12

## 今日速览

今日 Codex 连续发布 3 个 alpha 版本（rust-v0.148.0-alpha.7/8/9），迭代节奏依旧高频。社区讨论焦点集中在 **Windows 平台稳定性** 上：插件安装/更新后丢失、应用卡顿与内存增长是用户反馈最多的三类问题。PR 侧则密集合入了多项针对 **Windows 沙箱、MCP OAuth 与 gRPC code-mode 会话** 的修复与改进。

---

## 版本发布

### rust-v0.148.0-alpha.7 / alpha.8 / alpha.9
过去 24 小时内连续发布三个 alpha 版本，版本号从 0.148.0-alpha.7 递增至 alpha.9。官方 Release 说明未附带详细变更日志，推测为 CI 驱动的滚动发布，包含近期合入的沙箱、MCP 与 TUI 修复。

- [rust-v0.148.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.7)
- [rust-v0.148.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.8)
- [rust-v0.148.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.9)

---

## 社区热点 Issues

以下按评论数/关注度挑选 10 个值得关注的 Issue：

### 1. Codex App 在 Windows 11 Pro 上频繁卡顿
**#20214** | 💬 96 | 👍 81

> 用户报告在系统资源充足（Ryzen 5 5600 + 32GB RAM）的情况下，Microsoft Store 版 Codex App 仍频繁冻结/卡顿。这是目前评论数和点赞数最高的 Issue，反映 Windows 桌面端性能问题的普遍性。

[https://github.com/openai/codex/issues/20214](https://github.com/openai/codex/issues/20214)

### 2. macOS 桌面无法恢复 Remote Control / CLI 线程（回归）
**#37403** | 💬 10 | 👍 9

> 8 月 7 日更新后，macOS 桌面端在“移动端 Remote Control 继续 CLI 线程”与“桌面打开同一线程”之间切换时报 `already has an active writer` 错误，属于较新的回归问题。

[https://github.com/openai/codex/issues/37403](https://github.com/openai/codex/issues/37403)

### 3. 请支持 Ubuntu 24.04 RISC-V (riscv64)
**#6150** | 💬 9 | 👍 9

> 用户希望在 RISC-V 架构上运行 Codex CLI，目前 `codex` 启动时直接抛出 `Unsupported platform: linux (riscv64)`。这是社区对非 x86/ARM 架构支持的最高呼声。

[https://github.com/openai/codex/issues/6150](https://github.com/openai/codex/issues/6150)

### 4. Windows Chrome 插件与 Browser Use 设置挂起，卸载报错
**#21670** | 💬 15 | 👍 7

> Windows 桌面端 Chrome 插件和共享浏览器自动化桥接不稳定：设置页面调用挂起直至超时，插件 UI 无法正常卸载并报 `os error 5`（访问被拒绝）。

[https://github.com/openai/codex/issues/21670](https://github.com/openai/codex/issues/21670)

### 5. 已配置完全访问权限，Codex 仍反复请求权限
**#29235** | 💬 3 | 👍 16

> 即使线程已配置完整文件系统访问权限且关闭审批提示，Codex 仍频繁在普通操作前请求用户授权，严重打断工作流。点赞数高，说明该问题影响面广。

[https://github.com/openai/codex/issues/29235](https://github.com/openai/codex/issues/29235)

### 6. Windows Computer Use 插件无法启动：native pipe 路径不可用
**#25391** | 💬 23

> ChatGPT Pro 用户反馈，Computer Use 插件在 Windows 上反复出现 “Windows Computer Use helper paths are unavailable”，与权限/entitlement 无关，属于插件运行时路径解析问题。

[https://github.com/openai/codex/issues/25391](https://github.com/openai/codex/issues/25391)

### 7. Windows 上 Computer Use native pipe 失败（26.527.31326）
**#25571** | 💬 14

> 与 #25391 类似，运行时可访问性检查已通过，但 native Computer Use pipe 反复报 helper 路径不可用，用户在多个版本上均遇到。

[https://github.com/openai/codex/issues/25571](https://github.com/openai/codex/issues/25571)

### 8. Windows 启动时 Chrome 原生主机锁导致 bundled 插件缓存损坏
**#22114** | 💬 12

> 当 Chrome 已运行且 Codex 扩展已启动 native messaging host 时，重启 Codex 会导致 bundled 插件缓存被破坏，插件不可用。涉及 `extension-host.exe` 的文件锁竞争。

[https://github.com/openai/codex/issues/22114](https://github.com/openai/codex/issues/22114)

### 9. Windows 应用更新后 Bundled Browser/Chrome/Computer Use 插件消失
**#30270** | 💬 12

> Windows 应用更新后，内置插件因 bundled marketplace 路径过期而全部消失。这已是同类问题中较新的一条，社区多次反馈“更新后插件丢失”。

[https://github.com/openai/codex/issues/30270](https://github.com/openai/codex/issues/30270)

### 10. `codex exec` 在 SSE 流开始前无限挂起
**#31376** | 💬 8

> 长时间非交互式 `codex exec` 运行中，连接池死连接导致挂起 23 分钟以上，`response-header` 等待没有超时和重试机制。影响自动化流水线的稳定性。

[https://github.com/openai/codex/issues/31376](https://github.com/openai/codex/issues/31376)

---

## 重要 PR 进展

以下 10 个 PR 反映了当前 Codex 在沙箱、MCP 与协议层的最新改进：

### 1. 允许 Windows 沙箱中的嵌套 Git 仓库
**#38080** | 已合并

> 修复 Git 拒绝“沙箱用户执行属于主用户的嵌套仓库命令”的问题，将 worktree 根目录及其 `/*` 通配符加入 Git 信任列表。

[https://github.com/openai/codex/pull/38080](https://github.com/openai/codex/pull/38080)

### 2. 向 Windows 沙箱授予 Codex 应用根目录访问权限
**#38064** | 已合并

> 对本地 Codex 应用根目录应用沙箱读/执行 ACL 并使其可继承，同时将 managed runtime 缓存单独处理。提升 Windows 沙箱环境下的兼容性。

[https://github.com/openai/codex/pull/38064](https://github.com/openai/codex/pull/38064)

### 3. 保留 Windows 沙箱调试会话的代理设置
**#38061** | 已合并

> Windows `codex sandbox` 调试命令不再重置已有沙箱会话建立的持久代理设置，修复调试会话与正常会话的代理不一致问题。

[https://github.com/openai/codex/pull/38061](https://github.com/openai/codex/pull/38061)

### 4. MCP OAuth 注册添加 CIMD 支持
**#38089** | 已合并

> 自动 MCP OAuth 注册优先使用 Client ID Metadata Documents（CIMD），在授权服务器支持 public client 且 Codex 使用原生 loopback callback 时生效；否则回退到 Dynamic Client Registration。

[https://github.com/openai/codex/pull/38089](https://github.com/openai/codex/pull/38089)

### 5. gRPC code-mode 会话通过共享 HTTP 客户端路由
**#38087** | 已合并

> gRPC code-mode 连接改用 `HttpClientFactory`，从而支持应用的外网代理与自定义 CA 配置；同时拒绝不支持的 endpoint 协议。

[https://github.com/openai/codex/pull/38087](https://github.com/openai/codex/pull/38087)

### 6. 使用 `ReviewDecision` 统一 MCP 工具审批
**#38081** | 已合并

> 新增 `ApprovedMcpPolicyAmendment` 表示跨会话持久化的 MCP 审批，并将 MCP 审批响应统一接入 `ReviewDecision` 类型，保留会话级审批、拒绝原因和超时语义。

[https://github.com/openai/codex/pull/38081](https://github.com/openai/codex/pull/38081)

### 7. TUI 历史记录遵循渲染宽度
**#38075** | 已合并

> 修复 TUI 中新增历史单元时未考虑终端宽度的问题，包括侧边栏占位（ambient-pet）后的可用宽度计算，以及 diff 摘要宽度饱和处理。

[https://github.com/openai/codex/pull/38075](https://github.com/openai/codex/pull/38075)

### 8. 允许空输入开始新回合
**#38084** | 已合并

> 当 `Op::UserInput` 无实际内容时，允许直接开始一个回合（生成环境上下文，不产生用户消息条目），但仍拒绝持久化空消息的准入。

[https://github.com/openai/codex/pull/38084](https://github.com/openai/codex/pull/38084)

### 9. 简化排队用户消息准入
**#38092** | 已合并

> 当 Core 接受新回合或转向（steer）时立即完成用户消息准入，不再等待 rollout 持久化，并移除相关的持久化/钩子错误与任务簿记逻辑。

[https://github.com/openai/codex/pull/38092](https://github.com/openai/codex/pull/38092)

### 10. 为文件上传附加托管应用上下文
**#38101** | 已合并

> 在托管应用工具调用的文件创建请求中附上 connector ID、action 名称和模型信息；上传完成后优先使用服务器返回的文件大小，旧接口回退到本地大小。

[https://github.com/openai/codex/pull/38101](https://github.com/openai/codex/pull/38101)

---

## 功能需求趋势

从今日活跃的 Issues 和 PR 中可以提炼出社区最关注的几个方向：

1. **Windows 平台稳定性（最突出）**
   在评论数前 10 的 Issue 中，超过半数直接与 Windows 相关：应用卡顿（#20214）、插件安装/卸载失败（#21670、#28950）、插件更新后丢失（#30270、#33738）、native pipe 不可用（#25391、#25571）、文件锁导致缓存损坏（#22114、#26109）。Windows 上的插件生命周期管理是当前最集中的痛点。

2. **插件生态与 Browser Use / Computer Use**
   围绕 Chrome 插件、Browser Use 和 Computer Use 的 Issue 数量庞大，且存在多起“相同根因、不同版本复发”的案例（如 bundled marketplace 路径残留）。社区期待官方彻底解决插件状态与更新机制的一致性问题。

3. **MCP 协议能力的持续增强**
   多个 PR 在完善 MCP 相关能力：OAuth 注册支持 CIMD（#38089）、审批机制统一到 ReviewDecision（#38081）。同时 Issue #37417 指出“MCP 工具列表变更在会话中无法被动态捕获”，说明社区对 MCP 标准化能力有更高期待。

4. **远程控制与多端协同**
   #37403（macOS 回归）、#35030（定时任务挂在 `list_threads`）显示用户对“移动端/桌面端/CLI 多端协同”场景有明确需求，且对回归非常敏感。

5. **架构与平台扩展**
   #6150（RISC-V）连续多日保持高赞，社区对非主流架构（riscv64）的支持意愿较强，希望 CLI 能覆盖更多 Linux 环境。

6. **性能与资源占用**
   除了 #20214 的 Windows 卡顿外，#38059（空闲内存涨至 8.8GB）和 #34244（插件 reconcile 阻塞 61 秒）也表明桌面端性能优化是长期诉求。

---

## 开发者关注点

1. **Windows 插件生命周期管理的“老大难”**
   多个 Issue 指向同一类根因：应用更新后 bundled marketplace 路径残留或缓存损坏，导致 Chrome/Computer Use 插件不可用。开发者需要一种可靠的“清理-重装”机制，而不是靠手动删除 `%USERPROFILE%\.codex\.tmp` 等目录来恢复。

2. **沙箱权限与 Git 仓库兼容性**
   Windows 沙箱用户与主用户权限隔离带来的 Git 仓库不可见问题（#38080）已获修复，但开发者仍需关注沙箱下 ACL 与文件锁对日常操作的影响（如 #32525 的 `apply_patch` 因 deny-read ACL 失败）。

3. **MCP 动态工具发现的缺失**
   在嵌入式场景（通过 app-server）中，MCP 服务器在会话中途新增工具时，Codex 无法感知并更新工具列表（#37417）。对于基于 Codex 构建 Agent 产品的开发者来说，这是影响集成体验的关键缺口。

4. **长任务稳定性**
   `codex exec` 在 SSE 流建立前的挂起（#31376）以及 `functions.wait` 在子进程仍存活时提前返回（#38093），会影响 CI/CD 和自动化脚本的可靠性。开发者希望官方在等待/重试/超时方面增加更明确的配置项。

5. **“权限系统”与“用户预期”的错位**
   #29235（已关闭审批仍频繁请求权限）获得 16 个 👍，说明当前权限模型的判定逻辑在“完全信任”配置下仍有较多误报，影响“无人值守”场景的使用体验。

---

> 数据来源：GitHub `openai/codex` 仓库，统计窗口为 2026-08-11 至 2026-08-12。本日报由 AI 自动整理，仅供参考。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-12）

## 今日速览

今日发布 v0.55.1 稳定版，修复了发布验证流程中的关键 CI 问题，并引入工具注册表（tool registry）功能。Nightly 版本重点关注容量耗尽误报问题的修复。社区讨论热度集中在 **subagent 稳定性**（误报成功/永久挂起）、**浏览器代理兼容性**（Wayland、锁恢复）以及 **安全漏洞修复**（CVE-2026-9277、CVE-2026-28292）等方向。

## 版本发布

| 版本 | 类型 | 亮点 |
|------|------|------|
| [v0.56.0-nightly.20260812.g5024443c7](https://github.com/google-gemini/gemini-cli/releases) | nightly | 修复 false model capacity exhaustion（虚假容量耗尽误报）；修正核心配额查询的模型映射；新增 eval 本地报告命令及开发文档 |
| [v0.56.0-preview.1](https://github.com/google-gemini/gemini-cli/releases) | preview | 版本号升格与 changelog 更新（自 v0.55.0-preview.1 以来的累积变更） |
| [v0.55.1](https://github.com/google-gemini/gemini-cli/releases) | stable | 修复 release 验证中 npm ci 忽略脚本的问题；防止 workspace 二进制遮蔽干扰验证；引入 tool registry 功能 |
| [v0.55.0-preview.3](https://github.com/google-gemini/gemini-cli/releases) | preview | 将修复 cherry-pick 至 v0.55.0-preview.2 分支，产出 patch 版本 v0.55.0-preview.3 |

---

## 社区热点 Issues

### 1. Subagent 误报成功：MAX_TURNS 中断被隐藏（#22323）
`codebase_investigator` 子代理在达到最大轮次、未做任何分析的情况下，仍返回 `status: "success"` / `Termination Reason: "GOAL"`。这会直接误导用户判断任务是否真正完成，是 agent 可信度的严重缺陷。社区已有 12 条评论，持续关注中。
🔗 https://github.com/google-gemini/gemini-cli/issues/22323

### 2. Generalist agent 永久挂起（#21409）
一旦 CLI 委托给 generalist agent 便会无限挂起，即使创建文件夹这种简单操作也要等一小时。用户只能通过强制“不要使用子代理”绕过。点赞 8，是当前社区反馈最强烈的问题之一。
🔗 https://github.com/google-gemini/gemini-cli/issues/21409

### 3. Shell 命令执行完成却卡在 “Waiting input”（#25166）
简单命令执行后终端仍显示命令活跃、等待用户输入，极易误判为任务未完成。点赞 3，影响日常操作手感。
🔗 https://github.com/google-gemini/gemini-cli/issues/25166

### 4. Sandbox 不透传 `GOOGLE_GENAI_API_VERSION`（#24828）
`GEMINI_SANDBOX=true` 时，`sandbox.ts` 仅转发硬编码环境变量列表，导致使用 Vertex 兼容 API 路径的场景出现 404 `ModelNotFoundError`。5 条评论，涉及企业级 Vertex 用户。
🔗 https://github.com/google-gemini/gemini-cli/issues/24828

### 5. Browser subagent 在 Wayland 下失败（#21983）
浏览器子代理在 Wayland 会话中直接失败，对使用 Wayland 的 Linux 开发者是硬阻塞。已有 4 条评论和复现讨论。
🔗 https://github.com/google-gemini/gemini-cli/issues/21983

### 6. Browser agent 锁恢复机制缺失（#22232）
`BrowserManager.ts` 在遇到锁定的浏览器 profile（如 persistent 模式的残留进程）时直接 fail-fast，缺少自动会话接管。期望增强为自动接管与锁恢复。4 条评论。
🔗 https://github.com/google-gemini/gemini-cli/issues/22232

### 7. 工具超过 128 个时触发 400 错误（#24246）
当启用工具数量过多（描述中提及 400+ 工具）时，Gemini CLI 直接报 400。社区期望 agent 能按作用域智能裁剪工具列表，而非一次性全量携带。
🔗 https://github.com/google-gemini/gemini-cli/issues/24246

### 8. Gemini 不会主动使用 skills 和 sub-agents（#21968）
虽然提供了自定义 skills（如 gradle、git）和 sub-agents，但模型几乎不会主动调用，即使当前任务高度相关。这严重削弱了用户的扩展投入价值。6 条评论。
🔗 https://github.com/google-gemini/gemini-cli/issues/21968

### 9. 子代理未经许可运行（v0.33.0 起）（#22093）
用户已禁用所有配置中的 agents 模式，但 generalist 等子代理仍会被自动使用，突破用户权限预期。涉及权限模型回归，3 条评论。
🔗 https://github.com/google-gemini/gemini-cli/issues/22093

### 10. Agent 需要抑制破坏性行为（#22672）
在复杂 git 操作（`git reset`、`--force`）或数据库维护中，模型可能选取破坏性命令而非安全替代方案，社区呼吁增加风险操作防护。点赞 1。
🔗 https://github.com/google-gemini/gemini-cli/issues/22672

---

## 重要 PR 进展

### 1. 修复虚假容量耗尽与配额映射（#28730，已合并）
修复 CLI 中虚假的 `MODEL_CAPACITY_EXHAUSTED` 误报，修正核心配额查询的模型映射，并保留瞬时容量高峰时的 “Keep trying” 选项。属于被多个 issue 追踪的关键修复，已进入 nightly 版本。
🔗 https://github.com/google-gemini/gemini-cli/pull/28730

### 2. 升级 shell-quote 修复 CVE-2026-9277（#28780，OPEN）
Trivy 扫描发现 CRITICAL 级漏洞，将 `shell-quote` 从 1.8.3 升级到 1.8.4。安全相关，建议尽快合并。
🔗 https://github.com/google-gemini/gemini-cli/pull/28780

### 3. 升级 simple-git 修复 CVE-2026-28292（#28778，OPEN）
同样为 CRITICAL 级漏洞修复，`simple-git` 从 3.28.0 升至 3.32.3。
🔗 https://github.com/google-gemini/gemini-cli/pull/28778

### 4. 修复 IDE 连接目录不匹配（#28729，已关闭）
解决 Cider/VS Code 远程工作区中因 FUSE/虚拟目录路径差异导致 IDE 扩展连接失败的问题。对云开发环境用户友好。
🔗 https://github.com/google-gemini/gemini-cli/pull/28729

### 5. 新增 eval 本地报告命令（#28369，已合并）
新增 `npm run eval:report` 命令，可从 Vitest `report.json` 按模型聚合 pass rates，并支持重复测试映射回 inventory policies。配套开发者文档。
🔗 https://github.com/google-gemini/gemini-cli/pull/28369

### 6. eval 失败摘要与工具调用时间线（#28305，OPEN）
当 eval 失败时，自动打印紧凑编号的 agent 工具调用时间线（含参数、状态、错误详情），大幅降低调试成本。
🔗 https://github.com/google-gemini/gemini-cli/pull/28305

### 7. 将容量耗尽归类为终止错误（#28599，已合并）
明确将 `MODEL_CAPACITY_EXHAUSTED`（HTTP 429）在无重试延迟时归类为终止性错误，立即触发 fallback 链，避免客户端无限重试挂起。
🔗 https://github.com/google-gemini/gemini-cli/pull/28599

### 8. Vertex AI 401 错误信息改进（#28679，OPEN）
检测到用户配置了 `vertex-ai` 但仅提供标准 Gemini API key 时，给出明确提示，避免失败后一脸茫然。
🔗 https://github.com/google-gemini/gemini-cli/pull/28679

### 9. 跳过 diff hunk 标记的 @ 处理（#28581，OPEN）
防止 unified/combined diff 的 hunk 标记被误识别为 `@file` 引用，避免大型 diff prompt 中触发递归全工作区 glob 搜索导致堆增长。
🔗 https://github.com/google-gemini/gemini-cli/pull/28581

### 10. 修复 CI nightly 发布与性能测试（#28768，OPEN）
修复 Wombat 上静态 tag 导致的 403 DELETE 错误，并解决 perf 测试套件中 ripgrep 解析问题。
🔗 https://github.com/google-gemini/gemini-cli/pull/28768

---

## 功能需求趋势

从今日活跃的 50 个 Issues 中可提炼出以下社区关注度最高的方向：

1. **Agent 稳定性与可信度**：subagent 误报成功、generalist 挂起、shell 卡死——这些是当前最集中的痛点，直接影响 CLI 的可用性。
2. **安全性与权限控制**：CVE 修复（shell-quote、simple-git）、子代理未经许可自动启用、破坏性命令防护，都体现了社区对安全边界的强烈诉求。
3. **浏览器代理（Browser Agent）可靠性**：Wayland 兼容性、锁文件恢复、settings.json 覆盖失效，浏览器自动化是高风险场景，用户期望更强的韧性。
4. **环境兼容性**：沙箱环境变量透传、IDE 远程工作区目录映射、Cloud Workstations OAuth 重定向，云/容器开发场景的用户越来越多。
5. **可观测性**：subagent 轨迹分享（#22598）、bugreport 包含子代理上下文（#21763）、eval 报告工具，开发者希望更透明地观察 agent 内部行为。
6. **工具/技能扩展**：工具数量上限（128+ 即 400）、AST 感知文件工具（#22745/#22746）的探索，说明社区在思考如何更高效地扩展 agent 能力边界。
7. **终端体验细节**：resize 闪烁（#21924）、外部编辑器退出后画面损坏（#24935），终端渲染的打磨需求持续存在。

---

## 开发者关注点

- **“挂起”问题是最强噪音**：无论是 generalist agent 挂起还是 shell “Waiting input”，这类不确定性会直接导致用户放弃任务，需要将超时/自动恢复机制置于优先级前列。
- **错误只报失败原因不够，还需要可执行路径**：例如 400 工具数超限、Vertex 401 配置错误，社区期望 CLI 主动给出“怎么办”的提示。
- **权限改动需要更谨慎**：v0.33.0 后子代理未经许可启用，用户明确表示“我关闭了 agents 却被偷偷使用”，可见默认关闭/显式 opt-in 的权限模型对信任至关重要。
- **低信号记忆会话消耗资源**：Auto Memory 反复重试低质量会话（#26522）、无效内存补丁静默跳过（#26523），后台任务的资源管理被关注。
- **安全漏洞修复的时效性**：两个 CRITICAL 级 CVE PR 均在等待合并（OPEN 状态），社区会关注其进入 stable 版本的节奏。

---

*日报数据来源：github.com/google-gemini/gemini-cli（截至 2026-08-12）*

</details>

<details>
<summary><strong>DeepSeek Reasonix</strong> — <a href="https://github.com/esengine/DeepSeek-Reasonix">esengine/DeepSeek-Reasonix</a></summary>

# DeepSeek Reasonix 社区动态日报（2026-08-12）

## 1. 今日速览

- 过去 24 小时连续发布 v1.24.0 / v1.24.1 两个稳定版：v1.24.1 紧急修复恢复会话目录与 Windows 启动回归，但 v1.24.x 在社区引发「会话重复 / recovery 分支爆炸 / 数据错乱」集中反馈。
- 开发者正通过多个修复 PR（#8457、#8444、#8425 等）紧急收敛 recovery 误判与分支无限增长问题，并计划推出 v1.24.2。
- 社区最强烈的声音是「先求稳定」，大量用户建议隔离稳定版与预览版，同时性能优化（启动、滚动、渲染）与桌面端功能增强 PR 也在持续推进。

## 2. 版本发布

### CLI v1.24.1 与 Desktop v1.24.1（稳定版）
- 修复恢复会话目录与 Windows 启动回归问题。
- 改进压缩逻辑，逐字保留用户约束。
- 变更日志：https://reasonix.io/changelog/v1.24.1/?lang=zh  
  GitHub Release：https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v1.24.1

### CLI v1.24.0 与 Desktop v1.24.0（稳定版）
- 目标默认连续执行直至完成，支持可选 token 预算。
- 执行设定（轻量 / 均衡 / 交付）取代工作模式，统一工具面。
- 桌面端新增崩溃诊断、精简任务控制、改进聊天区滚动。
- 计费全链路统一，支持多币种。
- 变更日志：https://reasonix.io/changelog/v1.24.0/?lang=zh  
  GitHub Release：https://github.com/esengine/DeepSeek-Reasonix/releases/tag/v1.24.0

## 3. 社区热点 Issues

以下 10 个 Issue 是当前社区最关注的问题，集中在 v1.24.x 升级后的稳定性与数据安全：

1. **升级后会话列表出现数百个 recovery 分支条目**  
   [#8423](https://github.com/esengine/DeepSeek-Reasonix/issues/8423)  
   一个工作区仅 1 个真实会话，却出现约 284 个 `-recovery-*` 分支被当作独立会话展示，社区认为这是恢复机制与目录索引的严重回归。

2. **v1.24.1 打开对话显示多份重复内容（最多 16 份）**  
   [#8443](https://github.com/esengine/DeepSeek-Reasonix/issues/8443)  
   重启后重复数量继续增长，一个 `topic_id` 对应 N 个会话文件，用户担心恢复流程反复复制会话文件，造成数据冗余。

3. **recovery 分支每 30 秒 fork 一次，链式扩散至深度上限**  
   [#8294](https://github.com/esengine/DeepSeek-Reasonix/issues/8294)  
   v1.22.0 回归，v1.23.0 仍复现：单窗口单标签下，自动快照把合法追加写误判为 diverged，触发 recovery fork 风暴，直到 `recovery_depth_cap_isolated` 隔离。

4. **45 轮新会话产生 284 个 recovery 分支，约 300MB 磁盘占用**  
   [#8421](https://github.com/esengine/DeepSeek-Reasonix/issues/8421)  
   recovery 风暴与真实会话活动极不成比例，用户质疑 GC 未对 diverged 分支生效。

5. **v1.24 更新后会话被拆分为大量 topic 文件，自定义标题被覆盖**  
   [#8427](https://github.com/esengine/DeepSeek-Reasonix/issues/8427)  
   两个长会话被自动拆成大量衍生会话文件，且用户手动重命名的标题被自动标题覆盖，涉及 Windows Desktop + CLI 双端。

6. **Windows 桌面版点击工作区会话后出现大量同源新会话，且一个会话消失**  
   [#8428](https://github.com/esengine/DeepSeek-Reasonix/issues/8428)  
   热更新时段内点击会话会生成“本不该存在的大量同源新会话”，随后又恢复，但一个会话永久消失，行为难以预测。

7. **历史对话信息重复，侧边栏出现大量同名会话**  
   [#8434](https://github.com/esengine/DeepSeek-Reasonix/issues/8434)  
   v1.24.1 升级后历史列表突然出现大量重复对话，怀疑恢复副本被错误计入主列表。

8. **recovery 副本在持续 snapshot conflict 下无限累积，GC 对 diverged 永久豁免**  
   [#8451](https://github.com/esengine/DeepSeek-Reasonix/issues/8451)  
   #6622 关闭后仍复现，单会话族可达数百副本、数 GB 磁盘占用，用户指出 GC 机制存在设计缺陷。

9. **更新时程序未重启，手动结束后项目会话被清空**  
   [#8441](https://github.com/esengine/DeepSeek-Reasonix/issues/8441)  
   Windows 11 下 v1.24.1 更新过程异常，重新打开后历史会话全部消失，属于严重数据丢失事故，用户情绪强烈。

10. **建议先做一版稳定版，隔离稳定版与前瞻版**  
    [#8454](https://github.com/esengine/DeepSeek-Reasonix/issues/8454)  
    用户表示“现在几乎每更新一次都有新功能，然后诞生新 bug”，希望官方发布稳定版与前瞻版隔离，避免自动推送非稳定更新。

其他值得参考的高频 Issue：  
- [#8450](https://github.com/esengine/DeepSeek-Reasonix/issues/8450) 重名会话显示为多个未命名会话  
- [#8437](https://github.com/esengine/DeepSeek-Reasonix/issues/8437) v1.24.1 项目对话全部重复显示  
- [#8415](https://github.com/esengine/DeepSeek-Reasonix/issues/8415) 桌面端启动/新建对话需约 5 分钟才能加载完成  
- [#8376](https://github.com/esengine/DeepSeek-Reasonix/issues/8376) 大上下文压缩因 token 估算不一致失败

## 4. 重要 PR 进展

以下 10 个 PR 是当前社区和开发团队关注的核心修复与功能开发：

1. **fix(session): v1.24.2 会话写权限与 recovery 误判根治**  
   [#8457](https://github.com/esengine/DeepSeek-Reasonix/pull/8457)  
   整合 v1.24.2 会话快照与 recovery 根修复，保留 #7982 的 WAL 权威、CAS 修订/摘要、跨进程租约等数据安全基础。

2. **fix(session): 停止误判 diverged fork，并限制 depth-cap 隔离副本**  
   [#8444](https://github.com/esengine/DeepSeek-Reasonix/pull/8444)  
   修复桌面端 mid-turn autosave 在相同修订 reshape 时误判为 diverged 的问题，并限制每个 writer 仅保留一个 depth-cap 副本，避免会话目录被灌满。

3. **fix(session): 修复 v1.24.1 recovery catalog 与 Windows 启动闪窗**  
   [#8425](https://github.com/esengine/DeepSeek-Reasonix/pull/8425)  
   恢复分支失去 `RecoveryCopy` 分类导致项目树出现大量重复会话；同时解决 Windows 冷启动弹两个 `git.exe` 控制台窗口的问题。

4. **fix(desktop): 稳定异步行高变化导致的对话内容跳动**  
   [#8429](https://github.com/esengine/DeepSeek-Reasonix/pull/8429)  
   滚轮/触摸手势持有视口时冻结行高测量，手势结束后批量重测并恢复可视锚点，解决对话输出时内容频繁抖动/回退。

5. **fix(agent): 限制 depth-cap 隔离恢复分支无限增长**  
   [#8430](https://github.com/esengine/DeepSeek-Reasonix/pull/8430)  
   普通恢复链达到最大深度后，隔离副本文件名不再基于 transcript digest 生成，避免下一个 autosave 再次 fork 出无限新副本。

6. **fix(desktop): 防止并发启动时出现虚假会话租赁冲突**  
   [#8422](https://github.com/esengine/DeepSeek-Reasonix/pull/8422)  
   为并发新会话路径增加 nonce，兼容旧文件名解析；stale-subagent 清理在父会话活跃时主动让位，避免误报 “session already open”。

7. **fix(compaction): 折叠用户轮次不参与摘要判定，逐字保留**  
   [#8419](https://github.com/esengine/DeepSeek-Reasonix/pull/8419)  
   之前仅首个用户轮次被 pin 住，后续轮次可能被摘要器折叠丢失；该 PR 让所有折叠用户轮次在预算内逐字保留。

8. **feat(compaction): 报告保留预算无法容纳的用户轮次**  
   [#8424](https://github.com/esengine/DeepSeek-Reasonix/pull/8424)  
   当压缩保留预算不足时，不再静默丢弃用户轮次，而是明确报告哪些轮次被折叠，提升可观测性。

9. **fix(desktop): STT 首次启动自动授权 + 静默超时默认值 + opencode.ai 思考级别支持**  
   [#8067](https://github.com/esengine/DeepSeek-Reasonix/pull/8067)  
   修复语音输入首次启用需反复手动点击、权限授权后不自动隐藏等体验问题；静默超时默认 6s；并补全 opencode.ai 思考级别支持。

10. **chore(repolint): 用结构体状态机收敛 Agent 标量状态膨胀**  
    [#8436](https://github.com/esengine/DeepSeek-Reasonix/pull/8436)  
    将 `Agent` 上大量独立 bool/atomic 标量按业务语义分组为结构体，降低并发状态不一致风险，为后续稳定性重构铺路（配套 PR #8439、#8447、#8453）。

其他值得关注的 PR：  
- [#7916](https://github.com/esengine/DeepSeek-Reasonix/pull/7916) 批量合并桌面端 session telemetry checkpoint，减少重复写盘  
- [#8023](https://github.com/esengine/DeepSeek-Reasonix/pull/8023) 防止 reasoning-only 停止后 Plan/Goal 结果复用旧文本  
- [#8164](https://github.com/esengine/DeepSeek-Reasonix/pull/8164) 修复 OpenAI-compatible 网关 tool-call ID 冲突问题  
- [#8261](https://github.com/esengine/DeepSeek-Reasonix/pull/8261) 自动化面板整体优化（页面式布局 + 运行历史 + 分组视图）

## 5. 功能需求趋势

从当前 Issues 和 PR 中可以看出社区对以下方向有强烈需求：

- **稳定性与数据安全（第一优先级）**  
  大量用户要求停止自动推送非稳定版（#8454）、提供稳定版/预览版双通道；同时期望修复 recovery 分支无限增长、会话重复/丢失等数据安全问题。

- **会话与恢复机制可观测、可控**  
  用户希望自定义会话标题不被覆盖（#8427）；恢复副本能明确标识或一键删除（#8440）；会话列表不展示 recovery 分支（#8423）；删除的会话不应被自动恢复（#8431）。

- **性能优化**  
  启动时侧边栏会话列表空白数秒（#8284）；新建对话后长时间无法发送（#8415）；输出过程中内容抖动、滚动跳动（#8435、#8438、#8452）——这些高频性能痛点急需解决。

- **模型与渠道兼容性**  
  如 OpenCode Go 渠道调用 DeepSeek V4 时被强制限制 128k 上下文，用户期望支持套餐原有的 1M 长上下文（#7978）。

- **桌面端体验增强**  
  语音输入（STT）、自动化面板页面化、主题变更后历史标题同步刷新、思考过程保持展开等（#8067、#8261、#8418、#8312）。

- **多币种与全链路计费**  
  v1.24.0 已引入统一计费和多币种支持，未来可能继续强化成本管理与预算控制。

## 6. 开发者关注点

- **恢复（Recovery）机制过度敏感**  
  每次自动快照都可能误判 diverged，导致分支每秒按 30s 节奏无限 fork，直到深度上限；GC 对这类 diverged 副本永久豁免，最终造成数百个副本、数 GB 磁盘占用（#8294、#8421、#8451）。

- **升级引发的数据错乱**  
  v1.24.x 升级后普遍出现“一个会话变成多个同名会话”、“自定义标题被覆盖”、“被删除的会话复活”等问题，社区对升级信心不足，强烈希望官方先做稳定版（#8454、#8427、#8431）。

- **Windows 平台问题集中**  
  Windows 启动闪窗、会话文件写入导致新会话凭空出现、热更新后工作区行为异常等多个 Windows 专属 bug 频繁出现（#8425、#8428、#8415）。

- **大上下文处理不可靠**  
  约 103 万 token 的会话压缩失败，错误信息显示 summary 输入只差几个 token 就突破单请求限制，说明 token 估算与实际请求不一致（#8376）。

- **交互细节影响生产力**  
  对话输出时内容抖动/乱跳、滚动无法准确定位、右键菜单自动关闭等问题在 v1.24.1 中仍存在，且“bug 必现”，直接影响日常使用（#8435、#8438、#8452）。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 · 2026-08-12

## 今日速览

过去 24 小时仓库无新版本发布，共有 13 个 Issue、50 个 PR 更新。V2 稳定性是当前最大焦点：会话压缩死循环、LLM 无限重试、Linux 下 ALSA 刷屏等问题讨论集中；同时大量 TUI 修复 PR 正在快速补全 V2 交互细节。生态方面，Claude Code ACP 运行时 PR 已提交，GBK 等文件编码支持需求持续升温。

## 社区热点 Issues

- **#27924 [OPEN] 会话压缩死循环**  
  `prompt.ts` 中上下文溢出后压缩失败，会进入 `overflow → compact → overflow` 无限循环，会话卡死且不断消耗 token。该问题有 8 条评论，是今日讨论热度最高的稳定性问题。  
  https://github.com/anomalyco/opencode/issues/27924

- **#41763 [OPEN] [2.0] ALSA 错误刷屏并破坏 TUI 显示**  
  Linux 无声卡环境下，V2 TUI 交互会反复初始化 ALSA，诊断信息直接打印到界面上。4 条评论、1 个 👍；重复 issue #41890 已关闭，修复 PR #41770 已提交。  
  https://github.com/anomalyco/opencode/issues/41763

- **#41848 [OPEN] LLM 重试没有最大次数，无限重试卡在“Thinking...”**  
  `RETRY_MAX_DELAY` 约为 24 天；DeepSeek 等模型返回流式错误后会无限重试，UI 永远没有错误反馈。2 条评论，反馈称已导致 5 个进程卡死在 `llm runtime selected`。  
  https://github.com/anomalyco/opencode/issues/41848

- **#41806 [OPEN] Linux 实例启动永久挂起**  
  `git` 子进程退出后未被 reaped，bootstrap await 永不结束；TUI 能正常渲染，但按 Enter 无法开始会话。2 条评论，属于 Linux 下间歇性阻塞问题。  
  https://github.com/anomalyco/opencode/issues/41806

- **#41875 [CLOSED] apply_patch Add File 可覆盖已有文件**  
  当前实现未校验 `add` 目标是否已存在，存在覆盖用户数据的风险，已在 dev 分支复现。2 条评论，应属于高优数据安全问题。  
  https://github.com/anomalyco/opencode/issues/41875

- **#41869 [CLOSED] V1→V2 迁移遇单引号即 SQL 报错**  
  旧消息/部件 JSON 中的撇号导致 SQL 拼接错误，V1 migration 每次启动都会失败。2 条评论，需要改为参数化查询。  
  https://github.com/anomalyco/opencode/issues/41869

- **#41777 [CLOSED] [2.0] webfetch 在 Code Mode 返回 null**  
  V2 next 中 `webfetch` 报告成功但始终返回 `null`，且从顶层工具列表消失；已定位回归窗口在 `next-202606301613` 与 `next-16365` 之间。3 条评论。  
  https://github.com/anomalyco/opencode/issues/41777

- **#41751 [OPEN] git 仓库中 server/web 模式静默丢弃 project skills**  
  v1.18.16 server/web 模式下，只要项目是 git 仓库，恰好 2 个项目 skills 会被静默丢弃；CLI/TUI 模式正常，无 `.git` 时也正常。2 条评论，问题与 git 仓库状态存在强相关。  
  https://github.com/anomalyco/opencode/issues/41751

- **#37602 [OPEN] [功能] edit/write 支持文件编码参数（如 GBK）**  
  内置编辑/写入工具固定输出 UTF-8，处理 GBK 等遗留编码项目困难。2 条评论、2 个 👍，是本期少有的高赞功能需求。  
  https://github.com/anomalyco/opencode/issues/37602

- **#41905 [OPEN] 新会话继承上一会话 cwd，而非启动目录**  
  通过共享 daemon 从不同目录启动 `opencode2` 时，新会话仍使用上一会话的工作目录，破坏多项目工作流。0 条评论，新提交 bug。  
  https://github.com/anomalyco/opencode/issues/41905

## 重要 PR 进展

- **#41904 [OPEN] feat(opencode): 添加 Claude Code ACP 运行时**  
  通过 `@agentclientprotocol/claude-agent-acp` 将 Claude Code 接入 OpenCode 运行时，关联 #5182 / #20002 / #24038。重复提交 #41901 已关闭。  
  https://github.com/anomalyco/opencode/pull/41904

- **#41770 [OPEN] fix(tui): 停止重试不可用的音频设备**  
  音频设备不可用时销毁 native engine，不再反复初始化导致 ALSA 刷屏；直接关闭 #41763。  
  https://github.com/anomalyco/opencode/pull/41770

- **#41898 [OPEN] fix(session): 空助手响应应标记失败而非成功**  
  V2 当前会把“只有推理、无文本、无工具调用”的响应记录为成功；该 PR 改为失败，关闭 #37372。  
  https://github.com/anomalyco/opencode/pull/41898

- **#41895 [OPEN] fix(llm): 完成时结束 pending 的 OpenAI Responses 工具调用**  
  流式响应声明函数调用但未正常完成时，本地工具会永久 pending；该 PR 在流结束时完成收尾，关闭 #37159。  
  https://github.com/anomalyco/opencode/pull/41895

- **#41883 [OPEN] fix(tui): 显示 write 完成后的文件内容**  
  将 #41352 移植到 V2，`write` 工具完成后展示带语法高亮的文件内容，改善写文件后的反馈。  
  https://github.com/anomalyco/opencode/pull/41883

- **#41900 [OPEN] fix(tui): 指令更新渲染为紧凑通知**  
  不再将整个 Code Mode 目录等长文本塞入 transcript，改为一行摘要 `◈ Instructions updated: core/codemode`，大幅提升 V2 TUI 可读性。  
  https://github.com/anomalyco/opencode/pull/41900

- **#41899 [OPEN] feat(session): 记录目录切换**  
  新增 `location-switched` 时间线消息，目录变化会进入后续模型上下文并随压缩保留，同时在 V2 TUI 中渲染。  
  https://github.com/anomalyco/opencode/pull/41899

- **#41902 [OPEN] docs(skill): 补充项目级外部 skills 路径文档**  
  关闭 #41850，明确项目级 `.claude/skills` 与 `.agents/skills` 的自动发现路径。  
  https://github.com/anomalyco/opencode/pull/41902

- **#41793 [OPEN] fix(client): 展示受管服务启动时的 stderr**  
  `opencode2 service start` 等命令不再把错误简化为退出码，而是显示可操作的 stderr 信息，例如端口冲突引导；关闭 #41696。  
  https://github.com/anomalyco/opencode/pull/41793

- **#31658 [OPEN] fix: Windows 子进程默认使用 UTF-8 编码**  
  修复 zh-CN Windows 下多个依赖子进程输出的编码问题，关闭 #23636 / #31187 / #30205 / #31830 / #26882；仍处开放状态，今日有更新。  
  https://github.com/anomalyco/opencode/pull/31658

## 功能需求趋势

- **稳定性和自愈能力**：社区最关注“卡死、无限循环、缺乏错误反馈”，如 #27924、#41848、#41806。
- **V2 TUI 体验打磨**：大量 PR 围绕输出格式、提示、音频初始化、write 结果展示，说明 V2 正在密集测试与交互优化阶段。
- **文件编码与多语言支持**：GBK 参数需求（#37602）和 Windows UTF-8 子进程修复（#31658）显示中文/遗留编码项目用户活跃。
- **运行时与模型生态扩展**：Claude Code ACP 运行时 PR、Grok API 套餐问题（#41886）反映社区希望接入更多模型和外部 agent 协议。
- **会话上下文管理**：新会话 cwd 继承、目录切换记录、压缩保留上下文等，体现多项目与长会话场景的重要性。

## 开发者关注点

- **无限重试与“永远 Thinking”**：多个 issue 都涉及没有错误反馈的卡死，开发者期望更激进的重试上限、超时和可诊断错误输出。
- **终端显示被污染**：ALSA 错误直接打印到 TUI 是当前 V2 在 Linux 上最直观的体验问题，修复优先级较高。
- **数据安全与迁移风险**：`apply_patch` 覆盖已有文件、V1 迁移 SQL 报错，都可能导致数据丢失或阻塞升级，需要尽快修复。
- **V2 回归问题**：webfetch 返回 null、write 输出不展示、skills 加载不一致等，社区对 V2 功能完整性要求明确。
- **非 UTF-8 项目支持不足**：中文本地化用户尤其关注 GBK 等编码，在 edit/write 和子进程编码场景都需要默认处理。
- **技能发现路径不透明**：server/web 下 skills 丢失、文档未体现项目级自动发现，开发者希望 rules/skills 行为可预期。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## 📰 Qwen Code 社区动态日报 — 2026-08-12

---

### 1. 今日速览

**v0.21.10 正式版发布**，新增 ACP reasoning effort 配置能力与 Web Shell 图片预览。终端体验问题成为社区焦点：多条 Issue 集中反馈 **tmux/SSH 远程场景下的闪屏与卡顿**，并有对应修复 PR 在推进中。此外，自动化修复流程（autofix）持续运转，多个 takeover PR 正在解决 CI 与工作区隔离问题。

---

### 2. 版本发布

#### 🔹 v0.21.10（正式版）
- **新增** ACP 支持通过会话配置将 reasoning effort 从 Default 调整至 Max（[#8526](https://github.com/QwenLM/qwen-code/pull/8526)）
- **Web Shell**：点击上传或粘贴的图片，现在可在 artifact 中预览
- 同期发布 `live-host-v0.1.1`，修复 CLI 沙箱运行时探测顺序及 autofix 扫描串行化问题（[#7734](https://github.com/QwenLM/qwen-code/pull/7734)）

#### 🔹 v0.21.11-preview.0 / v0.21.10-nightly
- 修复 Web Shell 会话导航的 prompt 安全校验（[#8931](https://github.com/QwenLM/qwen-code/pull/8931)）
- serve 增加会话续接放行日志

---

### 3. 社区热点 Issues

> 过去 24 小时共 6 条更新，以下全部列出。

| Issue | 标题 | 关键信息 |
|-------|------|----------|
| [#8962](https://github.com/QwenLM/qwen-code/issues/8962) | cannot use qwen under tmux | **P2 高优 bug**。用户反馈 tmux 或远程环境下屏幕闪烁严重，缩小窗口到 400x300 才勉强可用，体验极差 |
| [#8963](https://github.com/QwenLM/qwen-code/issues/8963) | 不能自动运行 | **P2 bug**。用户反馈 yolo/auto 模式下执行长任务（Python 脚本耗时数小时）会卡住不动，对比 Kimi Code 后认为 Qwen 在 UI 稳定性、闪烁、mode 准确性上均需改进 |
| [#8562](https://github.com/QwenLM/qwen-code/issues/8562) | tmux 里闪屏（iTerm2 + SSH + tmux） | **P2 bug**。创建一周后仍在讨论，用户附上详细复现环境与排查看法；已有 6 条评论，是近期被引用最多的终端兼容性问题 |
| [#8738](https://github.com/QwenLM/qwen-code/issues/8738) | feat(ui): word-wise drag after double-click... | **已关闭的功能请求**。希望 VP 模式支持双击拖拽按词选择、三击拖拽按行扩展（对应 PR #8739 已合并，可视为已解决） |
| [#8959](https://github.com/QwenLM/qwen-code/issues/8959) | Main CI failed: E2E Tests on a64d1291d2f6 | **CI 自动化报告**。`a64d1291d2` 提交的 E2E 测试在报告结果前失败，已按 commit 追踪 |
| [#7167](https://github.com/QwenLM/qwen-code/issues/7167) | Fleet Shepherd Dashboard | **机器人维护的看板**。持续跟踪 PR 检查状态，当前 #8927 处于 checks in flight |

---

### 4. 重要 PR 进展

| PR | 标题 | 说明 |
|----|------|------|
| [#8613](https://github.com/QwenLM/qwen-code/pull/8613) | feat(web-shell): tmux-backed interactive terminal sub-agent | **重磅特性**。让 agent 在 tmux 会话中运行 REPL / CLI / TUI 应用，并在 Web Shell 展示实时终端视图；与多个 tmux 问题直接相关 |
| [#8525](https://github.com/QwenLM/qwen-code/pull/8525) | fix(core): resolve Qwen 3.8 reasoning budget conflicts | **已合并**。修复 DashScope 请求同时携带 `reasoning_effort` 与 `thinking_budget` 的冲突，按既有优先级解析 |
| [#8152](https://github.com/QwenLM/qwen-code/pull/8152) | fix(acp): isolate workspace settings and context file for worktrees | 修复 git worktree 会话中 `settings.json` 与 `QWEN.md` 错误解析到项目根目录的问题 |
| [#8777](https://github.com/QwenLM/qwen-code/pull/8777) | feat(review): add Maven multi-module verification | `review build-test` 新增 Maven 识别与多模块映射，扩展 review 工具链适配层 |
| [#8872](https://github.com/QwenLM/qwen-code/pull/8872) | feat(web-shell): improve thinking and tool progress display | 紧凑模式下 Ctrl+O 隐藏思考行、合并工具组，优化进度展示 |
| [#8675](https://github.com/QwenLM/qwen-code/pull/8675) | feat(web-shell): add model-specific reasoning controls | 内置模型推理控制注册表，端到端支持 thinking/effort 分级，首个注册模型为 `qwen3...` |
| [#8874](https://github.com/QwenLM/qwen-code/pull/8874) | feat(web-shell): support workspace file uploads | 支持拖拽/选择文件上传到 composer，带进度、取消、冲突重命名 |
| [#8687](https://github.com/QwenLM/qwen-code/pull/8687) | feat(daemon): guard cross-worktree Git mutations | 内置守护进程，识别 `-C`/`--work-tree`/`--git-dir` 并阻断越界 Git 变更 |
| [#8925](https://github.com/QwenLM/qwen-code/pull/8925) | fix(cli): fail structured output on API errors | 非交互模式下将 provider 错误视为终止失败，不再返回“含错误文本的成功结果” |
| [#8905](https://github.com/QwenLM/qwen-code/pull/8905) | feat(serve): adaptively grow live-journal caps | 当回合数据超过会话日志上限时，先扩容再丢弃，避免中途截断 |

---

### 5. 功能需求趋势

从近期 Issues 与 PR 中可提炼出四个明确方向：

- **终端体验与远程场景**：tmux / SSH / iTerm2 下的稳定性是当前最大痛点，社区既在报告 bug（#8562、#8962），也在推动解决方案（#8613 tmux 子代理）。
- **长任务与自动执行模式**：yolo/auto 模式无法稳定运行数小时级任务，用户呼吁“无脑接受模式”（#8963），提示 agent 自主决策的阈值与用户期望存在错位。
- **推理控制精细化**：reasoning effort 分级（Default→Max）与模型级 reasoning 注册表成为主线（#8526、#8675），预计后续支持更多模型的细粒度控制。
- **多工作区 / worktree 支持**：ACP 会话设置隔离（#8152）、跨 worktree Git 保护（#8687）表明对多仓库复杂布局的支持正从“可用”走向“安全”。

---

### 6. 开发者关注点

- **高频痛点 — tmux 闪屏**：多起 Issue 指向同一现象（远程 + tmux 分屏闪烁），用户在 #8562 中详细复盘了排查过程，并调用 Qwen 3.8 Max 定位到版本回归。该问题已有多条 PR 相关（#8613、#7837），建议后续版本优先验证。
- **长任务可靠性焦虑**：#8963 中用户以“Kimi Code 完胜”作为对照，情绪表达直白，反映对自动执行模式信心的缺失，尤其是任务卡住时缺少反馈与恢复机制。
- **版本更新回归担忧**：v0.21.10 虽然带来新功能，但 terminal 相关修改（#7837 teardown 重构、#8931 prompt 安全修复）可能是闪屏回归的关联点，社区期待快速补丁。
- **CI 自动化与自愈**：Fleet Shepherd 与 autofix takeover 机制持续运转（#8958、#8959、#8960），保证社区提交在自动化检查下及时暴露问题并触发修复。

---

> **总结**：今日社区动态呈现“功能推进与体验反馈并存”的典型面貌——正式版带来 reasoning 控制新能力，但 tmux 场景的闪烁问题已成为影响用户口碑的关键短板，值得团队在下一次 release 优先回应。

</details>

<details>
<summary><strong>Hermes</strong> — <a href="https://github.com/NousResearch/hermes-agent">NousResearch/hermes-agent</a></summary>

# Hermes 社区动态日报 — 2026-08-12

## 今日速览

今日 Hermes 仓库无新版本发布，社区焦点集中在 **Windows 平台网关稳定性回归**（#83683、#84185、#84109 等多个 P1 级 Bug）和 **全仓库 god-file 拆分史诗**（#78647）的持续进展上。与此同时，多个对应修复 PR 已提交，其中 #83720、#84198 直接针对网关重启与会话可见性回归。

---

## 社区热点 Issues

### 1. #78647 — Epic: 拆分全部 20 个 god 文件（仓库级重构）
- **标签**: refactor / P3 / needs-decision
- **作者**: @andrexibiza | 创建于 2026-08-04 | 67 条评论
- **链接**: https://github.com/NousResearch/hermes-agent/issues/78647

> 仓库级 god-file 拆分史诗，2026-08 已确立"所有 god 文件必须拆分、永不回退"的硬性政策。此 issue 作为总纲领，追踪 20 个超大模块的分解进度，是当前社区最活跃的架构话题。

### 2. #6839 — Lazy Tool Schema Loading：两段式工具注入，降低 Token 开销
- **标签**: feature / P2 / needs-decision / area-usage-cost
- **作者**: @jarviszomine | 创建于 2026-04-09 | 38 条评论 | 👍 18
- **链接**: https://github.com/NousResearch/hermes-agent/issues/6839

> 每次 API 调用都会注入全部 50+ 工具集的完整 schema，单次消耗约 3,500–5,000 token，本地模型尤为吃力。该 issue 提议改为按需加载，18 个 👍 表明社区对 token 成本优化有强烈诉求。

### 3. #34352 — 解决多租户 Hermes 问题
- **标签**: feature / P3 / needs-decision / area-memory
- **作者**: @NimbleCoAI | 创建于 2026-05-29 | 25 条评论 | 👍 3
- **链接**: https://github.com/NousResearch/hermes-agent/issues/34352

> 记忆操作完全绕过 hook 系统，导致不 fork 核心代码就无法实现租户隔离。作者声称已生产运行数月，方案成熟度较高，是"多智能体共存"愿景的关键前置。

### 4. #83683 — Desktop 重启后网关被回收且不再拉起（微信/QQ 静默掉线）
- **标签**: bug / P1 / platform-windows
- **作者**: @zuowen7 | 创建于 2026-08-11 | 8 条评论
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83683

> Windows 桌面版 0.20.0 回归：每次桌面重启都会强制杀死正在运行的消息网关，且不自动重启，导致微信、QQ 机器人、Telegram 全部静默离线，必须手动拉起。

### 5. #84185 — Windows 上执行 `hermes update` 后网关静默死亡（无日志、无 PID、无退出记录）
- **标签**: bug / P1 / platform-windows
- **作者**: @linfeng961 | 创建于 2026-08-12 | 2 条评论
- **链接**: https://github.com/NousResearch/hermes-agent/issues/84185

> 更新程序声称成功启动了网关（打印了 PID），但进程立刻无声消失：不写 gateway.log、不生成 PID 文件、无退出记录，服务保持离线直到手动重启。与 #83683 同为 Windows 进程管理链路问题。

### 6. #84109 — reset 后创建的网关会话在所有会话列表中不可见
- **标签**: bug / P1 / comp-desktop / area-sessions
- **作者**: @shaggy2626 | 创建于 2026-08-11 | 2 条评论
- **链接**: https://github.com/NousResearch/hermes-agent/issues/84109

> 回归自提交 d2a4d373eb（2026-08-09 会话身份持久化）：reset 后新会话携带 `parent_session_id` 血缘，但 `list_sessions` 查询未适配新血缘关系，导致桌面侧边栏、`/api/sessions`、会话选择器全部看不到新会话。

### 7. #83213 — 后台进程完成通知在 `/new` 之后被误路由到错误会话
- **标签**: bug / P2 / area-gateway / area-process-registry
- **作者**: @Xdd-xund | 创建于 2026-08-10 | 4 条评论
- **链接**: https://github.com/NousResearch/hermes-agent/issues/83213

> 后台进程完成通知被投递到"当前活跃会话"，而非发起该进程的原始会话。若用户中途执行 `/new` 或切换会话，通知便会出现在错误上下文，造成消息串台。

### 8. #84102 — 本地 TTS 提供商把 Ogg/Vorbis 写入 .ogg 路径，平台语音气泡静默降级
- **标签**: bug / P2 / tool-tts
- **作者**: @smfed | 创建于 2026-08-11 | 2 条评论
- **链接**: https://github.com/NousResearch/hermes-agent/issues/84102

> 三个本地 TTS 提供商调用 ffmpeg 转换时未指定音频编码器，ffmpeg 对 `.ogg` 容器默认使用 Vorbis 而非 Opus，导致不兼容 Opus 的平台语音气泡无法播放。一个"默认值陷阱"式的隐蔽 bug。

### 9. #84194 — MoA 引用不轮换 OpenCode Go 凭据（主账号额度耗尽后不会切换备用账号）
- **标签**: bug / P2 / area-auth
- **作者**: @guilhermeraiuga | 创建于 2026-08-12 | 0 条评论
- **链接**: https://github.com/NousResearch/hermes-agent/issues/84194

> 凭据池轮换在直接调用 `opencode-go` 时工作正常，但 OpenCode Go 模型作为 MoA（Mixture-of-Agents）reference 执行时不会触发轮换。主凭据额度耗尽后，MoA 子引用持续失败。

### 10. #80149 — 桌面端：Agent 运行中切换会话，返回后看不到新回复
- **标签**: bug / P3 / comp-desktop / area-streaming
- **作者**: @linfeng961 | 创建于 2026-08-06 | 1 条评论
- **链接**: https://github.com/NousResearch/hermes-agent/issues/80149

> 桌面端在 agent 运行期间切换到其他会话，新回复不会在切回时渲染，聊天视图停留在切换前的状态。流式输出的渲染状态与会话切换之间存在同步缺失。

---

## 重要 PR 进展

### 1. #83720 — fix(gateway): 永不回收受监管网关 + 桌面（重新）启动时自动拉起（修复 #83683）
- **链接**: https://github.com/NousResearch/hermes-agent/pull/83720

> 直接修复 #83683：桌面重启时后端强制杀死活动消息网关但未重新拉起。此 PR 调整进程监管模型，确保受监管网关实例在桌面重启期间存活或自动重建。

### 2. #84198 — fix(gateway): 使 reset 后创建的会话在会话列表中可见（修复 #84109）
- **链接**: https://github.com/NousResearch/hermes-agent/pull/84198

> 针对 #84109 的回归，修复了 reset 血缘变更后 `list_sessions` 查询未包含新子会话的问题。涉及桌面侧边栏、`/api/sessions`、会话选择器多处。

### 3. #84199 — fix(cli): 尊重 model_aliases 的 api_key，阻断跨提供商密钥泄漏（修复 #83612）
- **链接**: https://github.com/NousResearch/hermes-agent/pull/84199

> 修复自定义 `model_aliases` 端点认证失败且泄漏凭据的双重问题：`DirectAlias` 从未读取别名的 key，且回退逻辑把默认凭证发往了错误的目标端点。

### 4. #69076 — fix(windows): 将派生的 shell 分配给 kill-on-exit Job Object（修复 #69033）
- **链接**: https://github.com/NousResearch/hermes-agent/pull/69076

> Windows 上终端工具派生的子进程在 Hermes 父进程退出后变成孤儿进程，用户报告累积 20+ 个 `bash.exe`/`find.exe`/`grep.exe` 进程，其中一个累计占用 ~8 CPU 小时。此 PR 通过 Windows Job Object 保证杀死进程树。

### 5. #68948 — fix(terminal): 移除复合后台重写器
- **链接**: https://github.com/NousResearch/hermes-agent/pull/68948

> 最初为 #68915（后台服务器死锁）而开，该死锁已由 #71008 在进程层修复。此 PR 现在反其道而行之：移除有副作用的复合后台重写器，并将 #71008 的修复扩展到 Windows 平台。

### 6. #68908 — fix(memory): 让全息记忆在跨会话 hrr_dim 漂移时存活（修复 #68682）
- **链接**: https://github.com/NousResearch/hermes-agent/pull/68908

> 全息记忆在跨会话存储事实携带混合 `hrr_dim` 配置时崩溃，`similarity()` 和 `unbind()` 没有维度保护，8 个 `bytes_to_phases()` 解码点全部受影响。修复波及搜索、探测、推理、矛盾检测全链路。

### 7. #83787 — fix(tools): 阻止来自消息平台会话的执行信任写入（安全补丁）
- **链接**: https://github.com/NousResearch/hermes-agent/pull/83787

> 消息平台会话即使在工具过滤配置下也能触达文件工具，可写入 `<home>/cron/jobs.json` 并配合脚本实现执行。此 PR 收紧了消息平台会话的文件写入权限边界。

### 8. #84192 — feat(desktop): 富插件 OS 通知 + deeplink 激活
- **链接**: https://github.com/NousResearch/hermes-agent/pull/84192

> 扩展 `ctx.os` 插件 API，使原生通知支持图标、操作按钮和可序列化的 `activate` 目标，可驱动插件自有 UI（导航 + 可选渲染回调）。已实现 deeplink 激活链路。

### 9. #84178 — feat(nix): home-manager 模块，与 NixOS 模块共享实现
- **链接**: https://github.com/NousResearch/hermes-agent/pull/84178

> 新增 `homeManagerModules.default` 用户级 Nix 模块，并将 NixOS 模块与 home-manager 模块的公共代码抽取到 `nix/moduleCommon.nix`，避免两份实现漂移。Hermes 面向单用户，凭据和配置天然适合 home-manager 管理。

### 10. #83645 — fix(kanban): 区分不同输入阻塞原因，防止误判为 triage
- **链接**: https://github.com/NousResearch/hermes-agent/pull/83645

> 修复 Kanban 任务在连续多次 `needs_input` 时，因第二次阻塞原因不同而被错误提升到 triage 的问题。循环保护现在基于"阻塞类型 + SHA-256 原因指纹"来识别同因循环，而不是只按次数判断。

---

## 功能需求趋势

- **架构治理成为主线**：Epic #78647 推动的 god-file 强制拆分政策得到社区广泛参与，mcp_tool.py（7,230 行）等巨型模块正在被逐一拆解，表明项目已进入有意识的"架构债务偿还"阶段。
- **Token/成本优化**：#6839（Lazy Tool Schema Loading）获得 18 个 👍，社区对"每请求注入全部工具 schema"的 token 浪费有明显痛点，期望按需注入和两段式加载。
- **多租户/多账号能力**：#34352（多租户 Hermes）与 #84194（MoA 凭据轮换）共同指向同一方向——Hermes 需要在一套部署中支持多个租户/多个账号，且凭据管理要覆盖所有执行模式（含 MoA 引用）。
- **Windows 平台进程管理**：多个 P1 级 Bug（#83683、#84185）都指向 Windows 上网关进程的生命周期管理缺陷（重启不拉起、更新后静默死亡、子进程孤儿化），这是当前最集中的稳定性短板。
- **桌面端体验细化**：会话切换渲染问题（#80149）、通知 deeplink（#84192）、记忆/技能写入审批弹窗（#84189，支持预览 diff、审批/拒绝、保存前编辑）表明桌面端正在从"能用"走向"好用"。

---

## 开发者关注点

- **Windows 网关稳定性是最大痛点**：一周内连续出现桌面重启不拉起网关（#83683）、update 后静默死亡（#84185）、后台通知误路由（#83213）、reset 后会话不可见（#84109）四个 P1/P2 级问题，社区对 Windows 平台的进程生命周期管理信任度下降。
- **回归频率引起警惕**：#83683、#84109 均被明确标记为"regression"，且可追溯到近期提交（如 d2a4d373eb 的会话身份持久化改动）。开发者希望核心改动前有更充分的回归测试覆盖。
- **Token 开销是持续付费痛点**：工具 schema 全量注入导致本地模型每轮调用多花费数千 token，社区对 lazy loading、schema 缓存等优化诉求强烈。
- **技能/记忆写入审批缺少可视化界面**：#84189 指出，启用写入审批后，桌面端完全没有可见审批面，只能靠 `/memory pending`、`/skills pending` 命令手动审查，非 CLI 用户基本无感知。
- **硬编码截断引起争议**：#84195 实测 150+ 技能场景下完整描述与截断的 token 差异极小，却损失了路由价值——社区希望以数据而非猜测为准调整这类硬编码限制。

</details>