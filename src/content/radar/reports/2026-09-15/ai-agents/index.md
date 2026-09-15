---
title: "OpenClaw 生态日报"
published: 2026-09-15
report: "ai-agents"
tags:
  - radar
---
# OpenClaw 生态日报 2026-09-15

> Issues: 97 | PRs: 500 | 覆盖项目: 9 个 | 生成时间: 2026-09-15 09:46 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目日报 — 2026-09-15

## 1. 今日速览

过去24小时项目保持高强度迭代：**97条Issue更新**（70条活跃/新开，27条已关闭）与**500条PR更新**（218条已合并/关闭）表明提交与审查节奏均处高位。稳定性类问题（内存泄漏、进程泄漏、崩溃循环）仍占Issue主导，但多个P0/P1高优先级缺陷已关闭或进入可修复队列（fix-shape-clear），修复管线运转有效。今日无新版本发布，当前版本线仍为2026.9.4。整体活跃度评估：**极高**，项目处于密集修复与性能加固期。


## 2. 版本发布

今日无新版本发布。


## 3. 项目进展

今日有218条PR被合并/关闭，27个Issue关闭，主要推进方向如下：

- **稳定性修复落地**：一批高优先级Bug关闭，包括多代理Codex迁移崩溃循环（[#123326](https://github.com/openclaw/openclaw/issues/123326)）、卡死会话恢复误报（[#145152](https://github.com/openclaw/openclaw/issues/145152)）、Telegram网关响应延迟（[#147016](https://github.com/openclaw/openclaw/issues/147016)）、Windows路径脱敏破坏诊断消息（[#147502](https://github.com/openclaw/openclaw/issues/147502)）、插件自有CLI后端启动跳过（[#148584](https://github.com/openclaw/openclaw/issues/148584)）等。
- **安全边界修正**：provider读门权限限制问题（[#115367](https://github.com/openclaw/openclaw/issues/115367)）已关闭。
- **主动性能优化**：多条新PR针对**减少SQLite同步读、降低文件系统与Git扫描开销**（[#148841](https://github.com/openclaw/openclaw/pull/148841)、[#148900](https://github.com/openclaw/openclaw/pull/148900)、[#148919](https://github.com/openclaw/openclaw/pull/148919)、[#148950](https://github.com/openclaw/openclaw/pull/148950)），延续#130741系列持久化饥饿治理。
- **CLI/诊断工具增强**：修复`triage --run`误报“已修复”（[#148968](https://github.com/openclaw/openclaw/pull/148968)）、root help加速（[#147932](https://github.com/openclaw/openclaw/pull/147932)）、拒绝未知代理查询预设（[#136158](https://github.com/openclaw/openclaw/pull/136158)）。
- **Codex扩展修复**：心跳响应工具在计划检查中不可用（[#146503](https://github.com/openclaw/openclaw/pull/146503)）、目录控制调用耗时诊断（[#148984](https://github.com/openclaw/openclaw/pull/148984)）。

整体来看，项目正从“修功能Bug”切换到“清性能债 + 加固诊断能力”阶段，218条PR合并量印证修复管线高效。


## 4. 社区热点

| Issue/PR | 评论数 | 核心诉求 |
|---|---|---|
| [#25592 Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592) | 40 | 工具调用间隙的代理内部文本被误发至Slack/iMessage等外部频道，造成严重UX与隐私问题，社区讨论热度最高 |
| [#97616 Zombie child processes accumulate](https://github.com/openclaw/openclaw/issues/97616) | 30 | hook/工具子进程未被回收，产生僵尸进程累积，导致运行时性能持续劣化，属回归问题 |
| [#91588 Gateway memory leak 350MB→15.5GB](https://github.com/openclaw/openclaw/issues/91588) | 25 | 网关内存泄漏至OOM被杀，触发反复重启，标记为stale但仍为P1 |

三个热点集中在**稳定性与信任感**：用户对代理“乱说话”、进程/内存失控这类影响长期运行的问题反馈最强烈，且均已有复现路径，但部分仍等待维护者决策。


## 5. Bug 与稳定性

### P0（发布阻断）
| 问题 | 状态 | Fix PR |
|---|---|---|
| [#143524](https://github.com/openclaw/openclaw/issues/143524) Windows下Agent SQLite WAL无限增长至2.8GB，阻塞Gateway启动 | OPEN（等待信息补充） | 无 |
| [#146637](https://github.com/openclaw/openclaw/issues/146637) 2026.9.3→9.4 npm全局更新在Linux Mint上失败 | OPEN | 无 |

### P1（高优先级）
| 问题 | 状态 | Fix PR |
|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) 工具调用间文本泄漏至消息频道 | OPEN（需产品决策+安全审查） | 无 |
| [#148707](https://github.com/openclaw/openclaw/issues/148707) 第二个run抢占导致回复丢失（9.4回归） | OPEN（需复现信息） | 无 |
| [#148755](https://github.com/openclaw/openclaw/issues/148755) 90s重试窗口被重试自身消耗，工具调用回合无后备 | OPEN（需产品决策） | 无 |
| [#148878](https://github.com/openclaw/openclaw/issues/148878) sandbox.scope "session"导致启动O(会话数×全表扫描)，1122会话=219s | OPEN（fix-shape-clear） | 无 |
| [#148898](https://github.com/openclaw/openclaw/issues/148898) claude-cli无输出看门狗将笔记本休眠计入静默时间 | OPEN（fix-shape-clear） | 无 |
| [#148837](https://github.com/openclaw/openclaw/issues/148837) Codex配置刷新无法恢复已沉淀的systemError线程 | OPEN（fix-shape-clear） | 无 |
| [#148793](https://github.com/openclaw/openclaw/issues/148793) 频道入口监控器单次使用——stop()后start()静默失效 | OPEN（需维护者审查） | 无 |
| [#148886](https://github.com/openclaw/openclaw/issues/148886) sessions_spawn visible:true将配置模型标记为用户覆盖，禁用回退 | OPEN | [✅ #148970](https://github.com/openclaw/openclaw/pull/148970) |
| [#145203](https://github.com/openclaw/openclaw/issues/145203) openai-completions SSE流挂起48.5分钟，看门狗不恢复 | OPEN（fix-shape-clear） | 无 |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) 混合终端requester-settle批次在所有权检查后永久重试 | OPEN（queueable-fix） | 无 |
| [#137488](https://github.com/openclaw/openclaw/issues/137488) 派发run完成通知发往过期内部sink（语音频道） | OPEN（queueable-fix） | 无 |

### 今日关闭/有修复的稳定性问题
- [#123326](https://github.com/openclaw/openclaw/issues/123326) 多代理Codex迁移崩溃循环（P0）— **已关闭**
- [#145152](https://github.com/openclaw/openclaw/issues/145152) 卡死会话恢复误报中止（P1）— **已关闭**
- [#148896](https://github.com/openclaw/openclaw/issues/148896) triage误报已修复 — **[#148968](https://github.com/openclaw/openclaw/pull/148968) 已开**


## 6. 功能请求与路线图信号

- **[#51572](https://github.com/openclaw/openclaw/issues/51572)（P2）session-memory hook应在重置/修剪时触发**：已有9条评论，需产品决策。与当前compaction-only机制形成体验缺口，社区关注度较高。
- **[#7406](https://github.com/openclaw/openclaw/issues/7406)（P2）Telegram话题可读名称**：从2026-02月挂起至今，属于日常UX摩擦，无PR。
- **[#148850](https://github.com/openclaw/openclaw/issues/148850)（P3）原生聊天紧凑来源预览**：web端已支持，macOS/iOS/Android对齐请求，今日新建，可能进入后续版本。
- **[#120179](https://github.com/openclaw/openclaw/issues/120179)（P3）直播通话本地麦克风静音**：等待维护者/产品决策。
- **[#126781](https://github.com/openclaw/openclaw/issues/126781)（P3）Detached managed Lobster runs**：已关闭——2026.9.1已覆盖大部分能力，表明功能落地闭环。

路线图信号：项目当前优先保障稳定性与性能，纯新功能请求多停留在P2/P3等待产品决策；`fix-shape-clear`与`queueable-fix`标记的Issue是下一波PR的主要来源。


## 7. 用户反馈摘要

- **代理“话痨”困扰**（[#25592](https://github.com/openclaw/openclaw/issues/25592)）：用户对工具调用间隙的叙述性文本/错误处理输出直接出现在Slack等频道表示强烈不满，认为“内部处理输出不应成为频道消息”，评论数40为全站最高，隐私与观感双输。
- **长期运行稳定性痛点**（[#97616](https://github.com/openclaw/openclaw/issues/97616)、[#91588](https://github.com/openclaw/openclaw/issues/91588)）：真实用户报告僵尸进程累积拖慢整体响应、网关RSS涨至15.5GB后OOM被杀，这解释了为何“进程/内存治理”类PR（[#148841](https://github.com/openclaw/openclaw/pull/148841)、[#148950](https://github.com/openclaw/openclaw/pull/148950)）成为今日PR主流。
- **Windows/macOS平台体验**：Windows WAL失控（[#143524](https://github.com/openclaw/openclaw/issues/143524)）、macOS Sparkle更新进程占77.8% CPU三天不退出（[#148714](https://github.com/openclaw/openclaw/issues/148714)）、macOS侧边栏下拉被遮挡（[#145099](https://github.com/openclaw/openclaw/issues/145099)）——桌面端平台适配仍是薄弱环节。
- **移动端短板**：手机Composer窄至5-6字符/行（[#139909](https://github.com/openclaw/openclaw/issues/139909)）影响长文输入，移动web UI尚不达可用标准。
- **肯定信号**：#126781用户确认2026.9.1已覆盖大部分需求并关闭，说明版本迭代对社区反馈响应及时。


## 8. 待处理积压

### 长期未关闭的高关注度Issue
| Issue | 创建时间 | 天数 | 状态 |
|---|---|---|---|
| [#7406](https://github.com/openclaw/openclaw/issues/7406) Telegram话题可读名称 | 2026-02-02 | 225天 | OPEN，需产品决策 |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) 工具调用间文本泄漏 | 2026-02-24 | 203天 | OPEN，40条评论，需安全审查+产品决策 |
| [#51572](https://github.com/openclaw/openclaw/issues/51572) session-memory hook扩展 | 2026-03-21 | 178天 | OPEN，需产品决策 |
| [#91588](https://github.com/openclaw/openclaw/issues/91588) 网关内存泄漏 | 2026-06-09 | 98天 | OPEN，已标记stale，P1 |
| [#90499](https://github.com/openclaw/openclaw/issues/90499) Discord DM allowlist读取被拒 | 2026-06-05 | 102天 | OPEN，未复现于main |

### 待合并PR
- **[#124438](https://github.com/openclaw/openclaw/pull/124438)**（2026-08-16创建，已30天）：恢复`openclaw/plugin-sdk/channel-runtime`导出。外部渠道插件（如微信）因此无法构建，属兼容性阻塞，需尽快审查。
- **[#136158](https://github.com/openclaw/openclaw/pull/136158)**（2026-09-02创建，已13天）：拒绝未知代理查询预设，避免错误配置下静默返回空集。

> 提醒维护者：`#25592`是当前社区头号热点（40评论）且涉及安全与UX双重影响，但已挂起近7个月，建议本周内给出产品决策；`#124438`阻塞外部插件生态，建议优先处理。


*报告生成时间：2026-09-15 · 数据来源：[github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)*

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告（2026-09-15）

## 1. 生态全景

当前个人 AI 助手与自主智能体开源生态正处于**密集迭代与平台化演进并行**的阶段。核心项目 OpenClaw 以单日 500 条 PR 更新的极高强度推进稳定性治理与性能优化，带动整个生态聚焦“生产可用性”建设；同时 CoPaw、NanoClaw、Zeroclaw 等垂直项目在向多租户、网关模块化、多智能体协作等平台能力扩展，展现从“工具”到“基础设施”的转型趋势。安全与隐私问题（消息泄漏、SSRF、认证）成为多个项目共同的高优先级关注点，移动端与跨端体验仍是普遍短板。整体而言，生态健康度良好，快速迭代与质量巩固并存，尚未出现垄断性技术路线，差异化竞争空间充足。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 健康度评估 |
|------|-----------|--------|---------|-----------|
| **OpenClaw** | 97（70 新/活跃，27 关闭） | 500（218 合并/关闭） | 无 | 极高，密集修复+性能加固期 |
| **CoPaw** | 17（6 新/活跃，11 关闭） | 49（20 合并/关闭，29 待合） | 无 | 高，功能扩展与稳定性并重 |
| **Zeroclaw** | 9（3 新/活跃，6 关闭） | 50（17 合并/关闭，33 待合） | 无 | 高，快速迭代，积压需关注 |
| **NanoClaw** | 4（2 新，2 关闭） | 50（35 合并/关闭，15 待合） | 无 | 高，网关架构重构期 |
| **LobsterAI** | 3（更新） | 42（23 合并/关闭，19 待合） | 无 | 较高，兼容性修复集中落地 |
| **NanoBot** | 6（1 关闭） | 23（9 合并/关闭，14 待合） | 无 | 中高，安全加固+WebUI 优化 |
| **PicoClaw** | 1（stale 更新） | 3（2 关闭，1 待合） | 无 | 中低，按冲刺计划稳步推进 |
| **IronClaw** | 1（失败分类） | 1（更新） | 无 | 中低，常规迭代与质量观测 |
| **Moltis** | 0 | 1（待合） | 无 | 低，稳定维护状态 |

## 3. OpenClaw 在生态中的定位

OpenClaw 是当前生态**绝对的核心参照项目**，社区规模与迭代强度远超同类（单日 97 条 Issue、500 条 PR，为第二梯队项目的 5-10 倍）。其技术路线侧重于：

- **多代理协调与 Codex 深度集成**——修复多代理崩溃循环、Codex 配置刷新等，体现对高级用法的支持。
- **系统级稳定性治理**——持续处理 SQLite 饿死、内存泄漏、僵尸进程等底层问题，并主动进行性能债清理（减少 SQLite 同步读、降低 FS/Git 扫描开销）。
- **诊断与工具链完善**——CLI `triage`、root help 加速、未知代理拒绝等，强化运营可维护性。

相对其他项目，OpenClaw 用户基数大，反馈丰富，但**移动端体验与部分平台适配（Windows/macOS）仍是短板**。其“大而全”的路线与 NanoBot（安全优先）、Zeroclaw（ACP/ZeroCode）、CoPaw（多租户 Hub）形成差异，生态位明确。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|------|---------|---------|
| **稳定性与资源治理** | OpenClaw、NanoBot、NanoClaw、CoPaw、Zeroclaw | 内存/进程泄漏、数据库锁竞争、任务停止失效、子进程持久化失败 |
| **消息/错误泄漏与安全边界** | OpenClaw、NanoClaw、Zeroclaw、IronClaw、NanoBot | 工具调用间文本泄漏、原始错误暴露至公共频道、媒体标记误投递、MCP 泄漏诊断、SSRF/邮件伪造防护 |
| **可观测性与诊断** | OpenClaw、Zeroclaw、IronClaw、PicoClaw | CLI 诊断增强、子代理活动可视化、每日失败分类、mesh 可观测性 |
| **多代理/多租户/平台化** | OpenClaw、Zeroclaw、CoPaw、NanoClaw | 多智能体内存共享粒度、Hub 多租户、网关模块化/OneCLI 技能化 |
| **WebUI 与移动端体验** | NanoBot、CoPaw、OpenClaw、LobsterAI | PWA 白屏/触摸焦点、侧边栏布局、移动端 Composer 行宽、广告开关 |
| **Provider 容错与降级** | NanoBot、Zeroclaw、IronClaw | NIM 超时误判、Anthropic refusal 回退、模型质量失败归因 |

## 5. 差异化定位分析

- **OpenClaw**：面向**高级用户与开发者**的全功能个人 AI 助手框架，主打多代理、多渠道、可扩展，生态最大，但配置复杂，移动端较弱。
- **NanoBot**：强调**安全防护与渠道可靠性**（Email、QQ、飞书），WebUI 轻量，适合对隐私与合规要求高的中小团队。
- **Zeroclaw**：深耕 **ACP 协议与 ZeroCode 开发环境**，侧重多智能体协作可视化，技术社区导向，但存在 S1 级持久化待修复。
- **PicoClaw**：**轻量嵌入式/边缘场景**（如 ARM 单板）的部署优化，mesh 网络是特色，冲刺计划清晰。
- **NanoClaw**：**网关架构创新**，将 OneCLI 技能化、Iron Proxy 网关，探索可插拔基础设施，适合深度定制者。
- **IronClaw**：围绕 **MCP 生态与模型质量评估**，聚焦运行时诊断与失败分类，更像质量平台。
- **LobsterAI**：作为 **OpenClaw 的客户端/兼容层**，提供本地化配置、广告管理等体验改进，用户面偏 C 端。
- **Moltis**：**OAuth 认证相关**的专项工具，活跃度低，属成熟稳定型。
- **CoPaw**：**Hub 多租户与企业能力**（模型网关、成员治理、审计日志）为核心，叠加语音/文件等交互增强，面向团队协作。

## 6. 社区热度与成熟度

- **快速迭代阶段**：OpenClaw、CoPaw、Zeroclaw、NanoClaw、LobsterAI —— 单日 PR 合并 20+，新功能与修复持续落地，但有积压风险，需平衡速度与稳定性。
- **质量巩固阶段**：NanoBot、PicoClaw —— 活跃度适中，集中在安全加固、冲刺计划执行，节奏稳健。
- **维护期**：IronClaw、Moltis —— 事件驱动式更新，以诊断/测试修复为主，社区讨论较少。

生态整体呈 **“金字塔”结构**：OpenClaw 塔尖引领，多个专业项目在细分领域形成特色，但尚无第二项目能撼动其核心地位。

## 7. 值得关注的趋势信号

1. **“稳定性即信任”**：多个项目遭遇用户对代理“乱说话”、进程失控、任务停止失效的强烈反馈（OpenClaw #25592 40 评论、CoPaw #7567 7 评论）。智能体长期运行的可控性成为用户最核心的期待。
2. **安全边界精细化**：消息泄漏、错误信息暴露、SSRF 等问题在 4 个项目中同时出现，安全审查从网络层深入到“代理行为层”，提示 AI 应用需建立**语义级防护**。
3. **从单机到团队/平台**：CoPaw 多租户 Hub、Zeroclaw 多智能体内存共享、NanoClaw 网关模块化，表明智能体正演变为**组织级基础设施**，企业级权限、审计、隔离成为新竞争点。
4. **可观测性成标配**：IronClaw 每日失败分类、OpenClaw CLI 诊断、Zeroclaw 子代理可视化、PicoClaw mesh 监控——开发者已不满足于“能跑”，而要求“看得懂”，**代理行为追踪与归因**将成为产品差异化的关键。
5. **Provider 容错与模型降级**：NIM 超时误判、Anthropic refusal 回退、DDG 挂起等案例，揭示外部依赖对智能体可用性的单点影响。**超时分类、失败重试、优雅降级**应由框架统一处理，而非依赖用户。
6. **移动端和跨端体验是洼地**：多项目存在 PWA 启动白屏、侧边栏布局、窄屏适配等基础问题，用户以原生应用标准审视智能体客户端。**补齐移动端体验**可能是获得大众市场的关键突破口。

---

*报告基于 2026-09-15 各项目公开 GitHub 数据自动生成，数据源详见各项目日报。*

---

## 同赛道项目详细报告

:::details{title="NanoBot" repo="HKUDS/nanobot"}

# NanoBot 项目动态日报 — 2026-09-15

## 1. 今日速览

过去 24 小时 NanoBot 社区保持高度活跃：共产生 6 条 Issue 更新（1 条关闭）和 23 条 PR 更新，其中 9 条 PR 已完成合并/关闭，14 条仍在等待审查。合并内容覆盖安全加固（Email 认证边界、QQ 附件 SSRF 防护）、长会话历史搜索修复、WebUI 移动端体验优化、流式文本处理性能优化等关键方向。今日新开 Issue 集中在 iOS PWA 与移动端 WebUI 体验缺陷，同一用户集中上报了 4 个相关界面问题，已有一条对应修复 PR 被提出。暂无新版本发布，但批量合并的 PR 表明项目正在为下一个版本积极整合改进。

## 2. 版本发布

今日无新版本发布。

## 3. 项目进展

今日合并/关闭的 9 条 PR 集中在稳定性、安全与 WebUI 体验三个方向，项目整体向"更安全、更可靠、跨端体验更一致"推进了一步。

**安全加固（2 条）**

- **[PR #5778] fix(email): require trusted authentication results** — 已合并。在消息入站边界强化发件人验证：要求显式配置接收服务、结构化解析认证结果、并核对认证身份与发件人域名一致性，并附带安装校验与 WebUI 配置更新。这是一个典型的防钓鱼/防伪造硬化和收敛。链接：https://github.com/HKUDS/nanobot/pull/5778
- **[PR #5697] fix(qq): protect inbound attachment downloads from SSRF** — 已合并。QQ 通道附件下载不再盲目信任消息内 URL：下载前校验 URL、规范化协议相对地址、禁用重定向且仅接受 HTTP 200。这消除了经过 QQ 通道发起 SSRF 的潜在攻击面。链接：https://github.com/HKUDS/nanobot/pull/5697

**功能修复与性能优化（5 条）**

- **[PR #5757] fix(session): search older pages of persisted conversation history** — 已合并。修复了 `search_sessions` 与 `read_session` 在长会话中静默漏掉更早消息的问题——此前 `build_webui_thread_response()` 即使省略 limit 也只返回最新一页。链接：https://github.com/HKUDS/nanobot/pull/5757
- **[PR #5768] fix(feishu): use /page/cli verification URL for QR onboarding** — 已合并。修复飞书渠道 QR 登录码被立即判定"Link expired"的回归问题，`channels login feishu` 现在可以正常完成。链接：https://github.com/HKUDS/nanobot/pull/5768
- **[PR #5774] fix(memory): recover archive tool calls before raw fallback** — 已合并。归档请求意外产生工具调用时，改为逐调用返回非执行结果并整体重试一次，同时复用 ProviderConversationStateController 避免 tool_choice 被改动，再退回到 RAW 兜底逻辑。链接：https://github.com/HKUDS/nanobot/pull/5774
- **[PR #5761] fix(tools): preserve edit line boundaries and unify success summaries** — 已合并。修复 `edit_file` 删除行尾换行导致相邻行被拼合的隐患，并将成功编辑与文件创建响应与 `apply_patch` 统一为同一套 before/after 行对齐逻辑。链接：https://github.com/HKUDS/nanobot/pull/5761
- **[PR #5728] perf: reduce streaming text processing and classic CLI redraws** — 已合并。流式文本重复扫描与 CLI 逐 chunk 全量重绘 Markdown 是本地 CPU 开销随回复长度增长的主因；该 PR 在无控制标签时跳过标签解析，并减少了 CLI 重绘频率。链接：https://github.com/HKUDS/nanobot/pull/5728

## 4. 社区热点

今日最受关注的议题集中在外部依赖不可靠对 agent 可用性的影响。

**[Issue #2804] web_search via DuckDuckGo hangs indefinitely**（已关闭，4 条评论）— 该问题创建于 4 月，今日正式关闭。DuckDuckGo 搜索在 `asyncio.to_thread(ddgs.text, ...)` 上可能无限期挂起，导致同一会话中所有后续消息被阻塞。4 条评论说明社区对这一定位明确、影响面广的可靠性问题有较多讨论。诉求核心是：搜索工具必须有超时控制，不能让第三方服务的单点故障拖垮整条会话链路。链接：https://github.com/HKUDS/nanobot/issues/2804

**[Issue #5674] agent stops working when provider Nvidia NIM returns a specific error**（1 条评论）— 当 NIM 返回 `timed out after 300s` / `timed out after 600s` 时，NanoBot 将错误文本误当作模型输出，agent 直接停止工作。这一案例反映了两个深层诉求：一是外部 provider 错误需要与模型内容严格区分，二是超时错误应触发重试而非静默停机。已有对应 PR #5769 提出修复。链接：https://github.com/HKUDS/nanobot/issues/5674

## 5. Bug 与稳定性

按严重程度排列：

| 严重度 | Issue / PR | 说明 | 状态 |
|--------|-----------|------|------|
| 高 | [#5674] provider 超时错误被当作模型输出，agent 全部停工 | NIM 返回超时报文后，agent 不退出、不重试、不再响应，生产环境直接不可用。 | Open，已有对应 fix PR **[#5769]**（expand timeout fail-over，开放中） |
| 高 | [#2804] DDG 搜索无限挂起，阻塞整个会话（已关闭） | 第三方搜索服务无超时控制，所有后续消息都被阻塞。今日关闭意味着已定位解决。 | Closed |
| 中 | [#5770] 移动端打开侧边栏自动聚焦搜索按钮并弹出 "Search ⌘K" tooltip | 在当前界面误显示搜索框，桌面端 hover 语义泄漏到了触摸设备。 | Open，已有对应 fix PR **[#5777]** |
| 中 | [#5773] PWA 冷启动长时间白屏后才首帧渲染 | 从主屏图标启动比 Safari 内打开更慢，直接影响 PWA 使用意愿。 | Open，无 fix PR |
| 中 | [#5772] iOS PWA standalone 模式下视口顶部 washed out | 侧边栏开关、右侧控制区及下方消息内容呈半透明/模糊状。 | Open，无 fix PR |
| 中 | [#5771] 移动端会话列表需点击两次才能打开会话 | 首次点击无任何反馈，列表读起来像是无响应。 | Open，无 fix PR |

其中 #5770 至 #5773 四个 WebUI 缺陷均由同一名 iOS 用户 @morandot 上报，聚焦移动端与 standalone 模式下的体验落差，项目对前两个的响应较快，已有对应修复 PR；后两个仍待处理。

## 6. 功能请求与路线图信号

以下开放 PR 反映了较强的路线图信号——如果被合并，将直接进入下一版本：

- **[PR #5769] fail over on NIM-style timeout errors** — 按异常文本分类 LLM 超时（不依赖类名），并允许 FallbackProvider 在 `error_should_retry=False` 但失败表现为超时/连接类错误时切换模型。这是对 #5674 的直接回应，也意味着 provider 故障转移策略将进一步精细化。链接：https://github.com/HKUDS/nanobot/pull/5769
- **[PR #5776] add search to provider pickers in settings** — 设置页 provider 下拉框升级为带搜索过滤的 combobox，同时固定置顶 "Custom provider"。模型/provider 数量变多后，这与用户体验直接相关。链接：https://github.com/HKUDS/nanobot/pull/5776
- **[PR #5777] stop mobile drawer stealing focus to search button** — 修复 #5770 的交互回归，将默认焦点从 sheet 内第一个可聚焦控件改为对话框容器。链接：https://github.com/HKUDS/nanobot/pull/5777
- **[PR #5750] expose stable per-invocation tool context** — 通过 ContextVar 暴露当前工具调用的 `tool_call_id` 给工具实现与生命周期钩子，为工具层开发提供稳定的上下文语义。链接：https://github.com/HKUDS/nanobot/pull/5750
- **[PR #5767] add Polish localization** — 完整波兰语翻译：1,536 条公共消息 + 497 条渠道配置面板消息，并同步应用于加载页与文档语言。国际化仍在持续投入。链接：https://github.com/HKUDS/nanobot/pull/5767
- **[PR #5666] add aimlapi.com as an OpenAI-compatible gateway provider** — 内置新聚合器 provider，附带 50/5 合作方案。若被接受，意味着 provider 生态继续扩展。链接：https://github.com/HKUDS/nanobot/pull/5666
- **[PR #4919] support custom Bot API base URL for Telegram** — 支持自建 Bot API Server/企业网关，满足私有化部署场景。已开放两个月，值得关注其审查进度。链接：https://github.com/HKUDS/nanobot/pull/4919

此外两条来自同一作者的 P2 修复（#5765 stream 参数需 boolean、#5766 cron 拒绝冲突调度字段）也在开放队列中，偏向 API 严格性与配置防御性校验，属于成熟度打磨信号。

## 7. 用户反馈摘要

- **搜索可靠性是真实痛点**：#2804 用户 @hoaresky 描述了 DDG 挂起导致整个会话瘫痪的过程，4 条评论印证了社区对这一问题的关注。该问题今日关闭，属于长期痛点得到解决。
- **provider 错误边界需要更清晰**：issue #5674 中，NIM 超时被 NanoBot 解释为模型输出，agent 既不报错也不降级，用户失去了对系统行为的判断力。评论指向"外部错误需要作为错误处理，而不是模型应答"的核心期望。
- **iOS PWA 体验仍有缺口**：@morandot 在 #5770～#5773 中连续上报了四个移动端 WebUI 问题——冷启动白屏、视口顶部渲染异常、侧边栏误弹 tooltip、会话行需要两次点击。从其描述（如对比 Safari 打开速度）来看，用户以原生应用的标准审视 PWA 体验，这些细节直接影响忠实用户的项目评价。
- **飞书渠道登录恢复可用**：#5768 合并解决了 `channels login feishu` 扫码后立即提示 "Link expired" 的问题，渠道接入的用户体验得到修复。

## 8. 待处理积压

以下条目长期开放或等待维护者关注，建议重点跟进：

- **[PR #4919] feat(telegram): support custom Bot API base URL and extra headers** — 开放已超过 2 个月（7 月 14 日创建，9 月 14 日更新），仍未合并。功能本身完备（api_base + 自定义请求头），长期未动可能受限于审查带宽。链接：https://github.com/HKUDS/nanobot/pull/4919
- **[PR #5601] fix(webui): roll back rejected message side effects** — 开放 17 天，且标记了 `conflict`，需解决冲突后继续推进。该 PR 修复被拒绝消息残留附件和 WebSocket 订阅的问题，属于 WebUI 消息链路的基础一致性修复。链接：https://github.com/HKUDS/nanobot/pull/5601
- **[PR #5666] feat(providers): add aimlapi.com as an OpenAI-compatible gateway provider** — 开放 11 天，涉及新 provider 接入与可能的商业合作协议，需要维护者明确是否纳入内置 provider 列表。链接：https://github.com/HKUDS/nanobot/pull/5666
- **[Issue #5674] agent stops working when provider Nvidia NIM returns a specific error** — 上报于 9 月 5 日，9 月 14 日迎来对应 PR #5769。该 issue 影响生产可用性，建议确保 #5769 及时进入合并序列，避免修复长期搁置。链接：https://github.com/HKUDS/nanobot/issues/5674

:::

:::details{title="Zeroclaw" repo="zeroclaw-labs/zeroclaw"}

# Zeroclaw 项目动态日报 — 2026-09-15

## 1. 今日速览

过去24小时项目保持高度活跃：共处理9条Issue（关闭6条、新增/活跃3条），PR活动达50条（其中33条待合并、17条已合并/关闭）。虽然无新版本发布，但多条高优先级修复（ACP turn持久化、Matrix TTS、Anthropic回退）已落地或进入可合并状态。值得关注的是，长期积压的 `zeroclaw-hardware` CI测试问题、Matrix语音回复、Anthropic safeguard fallback等跨月issue在今日集中关闭，说明维护团队正在系统性清理积压项。整体来看，项目处于快速迭代、稳定性修复与社区反馈消化并行的健康状态。


## 3. 项目进展

> 说明：无新版本发布，本节聚焦今日合并/关闭的重要PR。

### 3.1 已合并/关闭 PR — 功能推进

| PR | 说明 |
|---|---|
| [#9378 fix(acp): persist failed and cancelled turn transcripts](https://github.com/zeroclaw-labs/zeroclaw/pull/9378) | **ACP失败/取消turn持久化** — 修复了 `session/load` 丢弃失败或取消turn的问题，为后续 #10673 提供了修复基础。 |
| [#10489 feat(channels/matrix): deliver voice replies as MSC3245 voice notes](https://github.com/zeroclaw-labs/zeroclaw/pull/10489) | **Matrix语音回复支持** — 将TTS能力接入Matrix频道，闭环了 #10488 的feature request。 |
| [#10838 fix(providers): degrade media markers to prose](https://github.com/zeroclaw-labs/zeroclaw/pull/10838) | **媒体标记降级修复** — 解决非视觉模型下 `[media attachment]` 占位符被误投递的问题，对应 #10625。 |
| [#9338 feat(provider): add Crusoe Managed Inference](https://github.com/zeroclaw-labs/zeroclaw/pull/9338) | **新增Crusoe Managed Inference** 作为第一方OpenAI兼容provider，遵循8文件惯例。 |
| [#10402 feat(tools): add Serply web search provider](https://github.com/zeroclaw-labs/zeroclaw/pull/10402) | **新增Serply搜索provider**，为 `web_search_tool` 增加 `search_provider = "serply"` 选项。 |
| [#9772 feat(telegram): add per_user_session toggle](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) | **Telegram群组会话改进** — 允许群组/话题中按用户拆分会话，解决多用户协作场景的上下文冲突。 |
| [#10856 fix(channels): include weekday in per-turn context preamble](https://github.com/zeroclaw-labs/zeroclaw/pull/10856) | **上下文增加星期信息** — 修复模型基于旧时间戳推导星期的问题。 |

### 3.2 项目整体进展评估

- **今日关闭6条Issue**，其中包含3条跨月feature request（#10488 Matrix TTS、#9632 ACP --agent、#10104 CI测试），说明社区提出的合理需求正被逐步消化。
- **ACP turn持久化** 作为S1级阻塞问题，其修复PR #9378已合并，但仍有一半代码路径（ZeroCode Code pane，见 #10673）待处理，说明修复工作正在分步推进。
- **provider生态** 持续扩展（Crusoe、Serply），符合项目"多provider、多工具"的平台化战略。


## 4. 社区热点

今日讨论最活跃的条目（按评论数排名）：

| 条目 | 评论数 | 核心关注点 |
|---|---|---|
| [#10625 [CLOSED] `[media attachment]` 占位符被投递给用户](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | 3 | **非视觉模型下的媒体标记降级行为** — 当历史消息包含模型不可见的媒体标记时，系统用字面量 `[media attachment]` 替换，导致用户收到无意义文本。 |
| [#8983 [CLOSED] category-scoped `read_memory_from` 提案](https://github.com/zeroclaw-labs/zeroclaw/issues/8983) | 3 | **多智能体内存共享粒度** — 当前 `read_memory_from` 是all-or-nothing，无法按category选择性共享，限制多智能体协作模式。 |
| [#8763 [OPEN] ZeroCode中子代理活动可视化](https://github.com/zeroclaw-labs/zeroclaw/issues/8763) | 2 | **可观测性需求** — 用户在长时间Code/Chat回合中无法查看子代理活动和完整工具调用结果。 |

**分析**：社区关注点集中在三个方向——**AI行为可解释性**（#10625）、**多智能体协作控制**（#8983）、**开发体验/可观测性**（#8763）。#10625 和 #8983 都已关闭，说明维护者已给出解决方案或接受提案。#8763 仍开放，且与 #10673 同属 ZeroCode 体验改进，可能成为下一个迭代重点。


## 5. Bug 与稳定性

今日报告的Bug按严重程度排列：

### 5.1 S1 — 工作流阻塞

| Issue | 状态 | 说明 |
|---|---|---|
| [#10673 [OPEN] ZeroCode Code pane 无法持久化失败ACP turns](https://github.com/zeroclaw-labs/zeroclaw/issues/10673) | **开放，无fix PR** | #9378 仅修复了 ACP server 的 `session/prompt` 路径，ZeroCode Code pane 走 daemon RPC 路径仍受影响。**S1级阻塞问题，建议优先处理。** |

### 5.2 S2 — 行为降级

| Issue | 状态 | 说明 |
|---|---|---|
| [#10625 [CLOSED] `[media attachment]` 占位符误投递](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | 已关闭，fix PR [#10838](https://github.com/zeroclaw-labs/zeroclaw/pull/10838) 已合并 | 非视觉模型下媒体标记降级为字面量文本，影响用户体验但功能可用。 |
| [#10869 [OPEN] ZeroCode 重复解析专用工具输入](https://github.com/zeroclaw-labs/zeroclaw/issues/10869) | **开放，无fix PR** | `default_tool_disclosure` 重复解析完整的专用文件输入JSON来分类卡片，存在性能隐患。今日新建，尚无处理方案。 |

### 5.3 S3 — 轻微问题

| Issue | 状态 | 说明 |
|---|---|---|
| [#10104 [CLOSED] zeroclaw-hardware 测试从未在CI执行](https://github.com/zeroclaw-labs/zeroclaw/issues/10104) | 已关闭 | 因feature gate配置问题，硬件相关测试被跳过。已修复。 |

**稳定性评估**：S1级问题 #10673 值得重点关注——它意味着 ZeroCode 用户在 Code pane 中遇到失败 turn 时，对话记录可能丢失。建议维护者优先推动该问题的修复。


## 6. 功能请求与路线图信号

今日出现的功能请求及路线图信号：

### 6.1 已获明确支持的请求

| 请求 | 状态 | 依据 |
|---|---|---|
| **Matrix频道TTS支持** (#10488) | ✅ 已实现 | fix PR #10489 已合并，TTS已接入Matrix频道。 |
| **ACP standalone模式默认agent选择** (#9632) | ✅ 已实现 | PR已合并，支持 `--agent <alias>` 参数。 |
| **Anthropic refusal与safeguard fallback** (#9293) | 🔄 跟踪中 | 作为implementation batch tracker已关闭，相关PR #10480（recover from rejected image requests）仍在待合并列表，说明该功能可能分多批落地。 |

### 6.2 可能纳入下版本的信号

| 请求 | 状态 | 分析 |
|---|---|---|
| **category-scoped内存共享** (#8983) | 已关闭，但值得关注 | 该提案获3条评论、标记 `risk:high`，虽已关闭但设计讨论充分，可能作为后续多智能体增强的基础。 |
| **ZeroCode子代理可视化** (#8763) | 开放 | 与 #10673 同属ZeroCode体验改进，且项目近期在 ZeroCode 模块有多条PR（#10120、#10295），该需求有较大概率被纳入后续迭代。 |

### 6.3 路线图信号（从待合并PR推断）

- **安全加固方向**：多条 `domain:security` 标签PR待合并（#10381 host launcher解析、#10835 SQLite存储安全、#10241 supervised shell审批路由），安全是当前重点投入方向。
- **上下文管理**：PR #9535（context compaction按模型窗口比率）、#10351（执行树迭代预算）显示运行时上下文控制正在精细化。
- **agent生命周期治理**：PR #10621（协调agent生命周期变更）涉及daemon RPC、gateway、channels、ACP admission、CLI多个入口，是架构级增强。


## 7. 用户反馈摘要

从今日Issue与PR评论中提炼的用户反馈：

| 反馈来源 | 用户诉求/痛点 |
|---|---|
| [#10625 @sebkraemer](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | 非视觉模型处理含媒体标记的历史消息时，降级路径直接投递 `[media attachment]` 字面量，用户收到无意义文本。**痛点：降级策略缺乏语境感知。** |
| [#10488 @sebkraemer](https://github.com/zeroclaw-labs/zeroclaw/issues/10488) | Matrix频道配置了TTS provider但完全不生效，且**无任何诊断信息**。用户期望：功能不生效时至少应有明确报错。 |
| [#8763 @Audacity88](https://github.com/zeroclaw-labs/zeroclaw/issues/8763) | 长时间Code/Chat回合中，无法展开查看子代理生成的完整工具调用结果，只能看到紧凑行。**痛点：可观测性不足，影响调试效率。** |
| [#9632 @Audacity88](https://github.com/zeroclaw-labs/zeroclaw/issues/9632) | standalone stdio ACP客户端遵循one-agent-per-command模型，不发送ZeroClaw的 `agentAlias` 扩展，导致无法选择默认agent。**痛点：与其他ACP客户端互操作存在摩擦。** |
| [#10104 @Audacity88](https://github.com/zeroclaw-labs/zeroclaw/issues/10104) | 由于CI feature组合配置不当，`zeroclaw-hardware` 的集成测试从未真正执行过。**痛点：测试覆盖存在盲区，可能遗漏真实硬件问题。** |
| [#9293 @Audacity88](https://github.com/zeroclaw-labs/zeroclaw/issues/9293) | Anthropic refusal场景下，若配置了fallback模型，当前实现可能产生"空成功响应"或fallback未按预期触达。**诉求：refusal和safeguard行为应可预期、可观测。** |

**整体用户满意度**：从issue关闭速度和PR合并节奏看，用户反馈响应效率较高。但S1级问题 #10673 的用户（@Audacity88，同时也是多个PR的作者）已多次强调该问题，说明 ZeroCode 用户体验仍存在明显短板。


## 8. 待处理积压

以下重要Issue/PR长期未得到响应或处理，建议维护者关注：

### 8.1 高优先级开放问题

| 条目 | 创建时间 | 积压天数 | 说明 |
|---|---|---|---|
| [#10673 [Bug] ZeroCode Code pane ACP turn持久化失败](https://github.com/zeroclaw-labs/zeroclaw/issues/10673) | 2026-09-07 | 8天 | **S1级工作流阻塞**，是 #9378 修复的剩余部分。用户已明确指出影响，但目前无PR认领。 |
| [#10869 [Bug] ZeroCode重复解析专用工具输入](https://github.com/zeroclaw-labs/zeroclaw/issues/10869) | 2026-09-15（今日） | 0天 | S2级性能问题，新建于今日。建议尽快确认是否在 #10295 的后续优化中覆盖。 |

### 8.2 需维护者介入的PR

| PR | 创建时间 | 积压天数 | 阻塞标签 |
|---|---|---|---|
| [#9724 fix(approval): always_ask survives Full autonomy](https://github.com/zeroclaw-labs/zeroclaw/pull/9724) | 2026-08-04 | 42天 | `needs-maintainer-review`, `risk:high` — 维护者 @Audacity88 已刷新分支并修复兼容性，但仍待最终review。 |
| [#9324 feat(a2a): outbound client config, shared wire-model, tools](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) | 2026-07-24 | 53天 | `needs-author-action` — A2A outbound client Phase 1，涉及4个工具和共享wire-model，是A2A RFC #9106 的核心落地PR。 |
| [#10241 fix(channels): restore supervised shell approval routing](https://github.com/zeroclaw-labs/zeroclaw/pull/10241) | 2026-08-22 | 24天 | `status:blocked`, `needs-maintainer-review` — 渠道驱动的shell调用审批路径恢复，涉及全部9个channel，`risk:high`。 |
| [#10120 refactor(zerocode): remove unreachable TUI code](https://github.com/zeroclaw-labs/zeroclaw/pull/10120) | 2026-08-19 | 27天 | `needs-author-action` — 代码清理PR，作者需补充操作。 |

### 8.3 长期未关闭的跟踪类Issue

| Issue | 创建时间 | 积压天数 | 说明 |
|---|---|---|---|
| [#8763 ZeroCode子代理可视化](https://github.com/zeroclaw-labs/zeroclaw/issues/8763) | 2026-07-06 | 71天 | 功能请求，已获接受（`status:accepted`），但无对应PR出现。可能与 #10673 的修复一并规划。 |
| [#9293 Anthropic refusal和safeguard fallback](https://github.com/zeroclaw-labs/zeroclaw/issues/9293) | 2026-07-23 | 54天 | 作为跟踪器已关闭，但对应实现PR #10480 仍未合并，需要确认最终状态。 |

---

**总结**：Zeroclaw 项目今日整体活跃度高，修复与功能推进节奏稳定。最需要关注的是 **#10673（S1级ACP持久化剩余路径）** 和 **#10869（ZeroCode解析性能）** 两个开放Bug，以及 **#9724、#9324、#10241** 三个积压较久的 `needs-maintainer-review` PR。社区反馈的Issue处理效率良好，6条关闭中5条为已完成状态的正常闭环，项目健康度总体向好。

:::

:::details{title="PicoClaw" repo="sipeed/picoclaw"}

# PicoClaw 项目日报 — 2026-09-15

## 1. 今日速览

过去 24 小时项目整体活跃度中等偏上：共 1 条 Issue 更新（仍为旧 Issue 的 stale 状态）与 3 条 PR 更新，其中 2 条 PR 已关闭（含 1 条功能合并、1 条规划文档），1 条待合并。无新版本 Release。合并的 mesh 可观测性 PR 为 v0.10.0 冲刺周期内的实质性进展，同时 v0.10.0 冲刺计划文档已落地，项目路线图清晰度有所提升。社区侧讨论热度集中在 QQ 渠道认证失败的存量 Issue 上，暂未出现新爆发性问题。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日合并/关闭的 PR 反映了 v0.10.0 冲刺周期（Tracks 60–66）的推进情况：

- **#3380 [已合并] feat(mesh): observability — peer conns/score/bandwidth, activity feed, SSE events (Track 63)**  
  作者：@stpinkie，创建/更新：2026-09-15  
  为 mesh 模块补齐了可观测性能力：`PeerStatus` 新增 `conns[]`、`latency_ms`、`score`、`last_seen` 等字段；接入 libp2p `BandwidthReporter`；并配套 activity feed 与 SSE 事件。这标志着 Track 63 的实现完成，mesh 节点的运维排查能力得到实质增强。  
  https://github.com/sipeed/picoclaw/pull/3380

- **#3379 [已关闭] docs: v0.10.0 sprint plan**  
  作者：@stpinkie，创建/更新：2026-09-14  
  将 `.todo.md` 草稿深化为 `docs/design/v0.10.0-sprint.md` 实现级设计文档，明确 Track 60–66 的实施顺序（60 → 65 → 61 → 62 → 63 → 64 → 66），并基于代码验证了各 Track 的变更增量。为后续逐 Track 提交 PR 提供了清晰的执行蓝图。  
  https://github.com/sipeed/picoclaw/pull/3379

**整体评估**：v0.10.0 冲刺从规划步入实施阶段，今日完成第 3 个 Track（Track 63）的代码落地，项目按计划稳步前进。

---

## 4. 社区热点

- **#3365 [OPEN] [stale] QQ channel fails with 401 "Authorization参数格式错误" — root cause in botgo v0.2.1 + resty >= v2.17**  
  作者：@crazysarah，创建：2026-09-04，更新：2026-09-14，评论：2，👍：1  
  这是当前评论与反应最多的 Issue，讨论焦点在于腾讯 botgo 库与 resty v2.17 的兼容性问题导致 QQ 渠道认证失败。用户已定位到根因，但官方尚未给出修复方案或 workaround。其背后诉求是希望项目方尽快解决依赖兼容性问题，或提供绕过该问题的配置/补丁，以免阻塞使用 QQ 渠道的场景。  
  https://github.com/sipeed/picoclaw/issues/3365

---

## 5. Bug 与稳定性

今日活跃的 Bug 仅 1 条，且为存量问题，无新增崩溃或回归：

- **#3365 [OPEN] [stale] QQ channel fails with 401 "Authorization参数格式错误"**（严重程度：中高 — 功能完全不可用）  
  影响范围：使用 QQ 渠道的用户，作者环境为 Orange Pi 3B（aarch64） + nightly 构建（`0.3.1`）。  
  根因已定位：`github.com/tencent-connect/botgo v0.2.1` 与 `github.com/go-resty/resty/v2 v2.17.1` 的 HTTP 请求签名实现不兼容，导致 `Authorization` 参数格式错误。  
  修复状态：**尚无 fix PR**，Issue 已进入 stale 状态（最后更新 2026-09-14），需要维护者关注。  
  https://github.com/sipeed/picoclaw/issues/3365

---

## 6. 功能请求与路线图信号

- **#3370 [OPEN] [stale] feat(tools): add Keenable web search provider**  
  作者：@ilya-bogin-keenable，创建：2026-09-07，更新：2026-09-15，👍：0  
  新增 Keenable（keenable.ai）作为 `web_search` 提供方，主打“无 API key、开箱即用”，仅需在配置中启用 `tools.web.keenable.enabled` 即可调用其公共搜索端点。该 PR 已开放 8 天且未合并，可能处于等待评审或作者修订状态。若被纳入，将扩充 PicoClaw 内置搜索提供方的多样性，降低第三方搜索集成的使用门槛。  
  https://github.com/sipeed/picoclaw/pull/3370

- 结合 #3379 中 v0.10.0 sprint 计划的 Track 60–66 安排，上述功能 PR 未被列入冲刺范围，预计最早可能在 v0.10.0 之后的版本（或作为 sprint 外的小版本）合并。

---

## 7. 用户反馈摘要

基于 #3365 的评论与描述，可提炼以下用户诉求与痛点：

- **依赖兼容性是当前最突出的用户痛点**：作者已明确 root cause 在 botgo v0.2.1 与 resty v2.17.1 的交互上，但项目方迟迟未响应。用户希望得到一个明确的修复计划，或至少一个可用的 workaround（如固定 resty 版本、替换 botgo）。
- **nightly 构建的稳定性预期**：用户使用 `--version` 报告为 `0.3.1` 的 nightly 构建，说明有相当一部分用户愿意尝鲜测试版，但对 nightly 的已知损坏问题容忍度较低，期望能更早被发现并公开告警。
- **跨架构支持的真实使用场景**：作者在 Orange Pi 3B（aarch64）上运行，表明 PicoClaw 在 ARM 单板设备上存在实际部署需求，相关兼容性修复应优先验证 aarch64 环境。

---

## 8. 待处理积压

以下条目已进入 stale 或长时间未解决状态，建议维护者优先关注：

- **#3365 [OPEN] [stale] QQ channel fails with 401**（创建 2026-09-04，最后更新 2026-09-14）  
  无 fix PR、无维护者响应，已 stale。严重程度较高（核心渠道不可用），建议排期修复或至少在 Issue 中给出临时 workaround。  
  https://github.com/sipeed/picoclaw/issues/3365

- **#3370 [OPEN] [stale] feat(tools): add Keenable web search provider**（创建 2026-09-07，最后更新 2026-09-15）  
  8 天未合并，无评论、无评审意见。若维护者有意纳入，建议及时安排 review；若暂不计划，建议明确告知作者或关闭，避免社区贡献者长期等待。  
  https://github.com/sipeed/picoclaw/pull/3370

:::

:::details{title="NanoClaw" repo="qwibitai/nanoclaw"}

# NanoClaw 项目动态日报 — 2026-09-15

## 今日速览

NanoClaw 项目今日保持高活跃开发状态：过去 24 小时内共有 50 条 PR 更新（其中 35 条已合并/关闭，15 条待合并），4 条 Issue 更新（2 条新开、2 条已关闭），无新版本发布。当前开发主线集中在网关架构重构（OneCLI 技能化、Iron Proxy 网关、凭据网关契约集中化）以及 Telegram 集成修复，同时有 2 个新提交的稳定性/安全相关 Issue（#3811、#3814）等待响应。整体项目健康度良好，Issue 处理闭环速度快，但存在少量超过一周未合并的 PR 需要关注。

---

## 项目进展

今日共有 35 条 PR 被合并或关闭，覆盖渠道集成、技能系统、网关重构等多个方向，核心推进如下：

### 1. Telegram 集成修复（已合并/关闭）
- **[#3821] fix(add-telegram)**: 凭据检查的 `getMe` curl 请求尊重 `TELEGRAM_API_BASE_URL` 环境变量，修复了本地 Bot API 服务器场景下凭据校验失败的问题。由 @gabi-simons 提交，当日创建当日关闭。
- **[#3820] fix(telegram)**: 频道模块自身的 `getMe`、`sendMessage`、`getChat` 请求统一改用 `TELEGRAM_API_BASE_URL`，与适配器行为保持一致。同样由 @gabi-simons 当日提交并处理。

### 2. OpenCode 技能集成（已合并/关闭）
- **[#3747] feat(add-opencode)**: 在 setup 流程中集成 OpenCode 技能，并将认证与主机协助路由到 provider 拥有的适配器。@glifocat 提交，9月8日创建，9月15日关闭。
- **[#3733] feat(add-opencode)**: 通过 NanoClaw 的 host 和 runtime provider 契约，实现完整的 OpenCode 安装技能，涵盖原生工具、MCP、取消、压缩、续恢复、认证和模型选择。
- **[#3746] fix**: 保留 provider 取消、失败回合投递和技能文件，避免在 provider 操作期间丢失关键状态。

### 3. 网关架构重构（待合并）
围绕网关契约的系列重构 PR 正在推进中，均处于 OPEN 状态：
- **[#3815] refactor(gateway)**: 集中凭据网关契约和人工审批生命周期（@zvi-fried）
- **[#3816] refactor(gateway)**: 将 OneCLI 提取为可安装技能，由技能拥有 payload 和 pin 版本（@zvi-fried）
- **[#3817] feat(skills)**: 新增 Iron Proxy 网关技能，包含 Iron Control、凭据连接、provider 认证和审批桥接（@zvi-fried）
- **[#3818] feat(setup)**: 默认使用标准网关，在高级设置中暴露网关选择，且不影响 provider 登录（@zvi-fried）

这些改动将网关从硬编码集成转变为模块化、可插拔的技能体系，是项目架构演进的重要一步。

### 4. 其他合并的修复
- **[#3090] fix(templates)**: 前置所有顶级上下文 Markdown（@amit-shafnir，7月19日创建，今日关闭）
- **[#3093] fix(chat)**: 处理回合期间保持输入状态（@amit-shafnir）
- **[#3094] fix(telegram)**: 重试瞬时 bot 身份查找（@amit-shafnir）
- **[#3396] feat**: 支持从聊天中通过模板创建代理（@amit-shafnir）
- **[#3428] feat(slack-agent-flow)**: 通过 Slack 创建子代理时携带模板引用（@amit-shafnir）
- **[#3465] fix(channels)**: Chat SDK 4.29.0 → 4.32.0 锁定升级，同时保留 Telegram "/" 命令在入站路径上（@amit-shafnir）

> ⚠️ 注意：[#3396] 和 [#3428] 虽被标记为 CLOSED，但需要维护者确认是否实际合并，若为关闭而非合并，则对应的模板创建功能可能还未落地。

---

## 社区热点

今日讨论/评论最活跃的条目：

1. **[#3706] ncl groups config add-mount 绝对路径 bug（已关闭，2 条评论）**
   https://github.com/nanocoai/nanoclaw/issues/3706
   该 Issue 由 @DawoudIO 于 9月3日提交，讨论了 CLI 命令 `--container` 参数接受绝对路径但实际会生成损坏的双嵌套路径的问题。评论指出"传入 `/workspace/shared-repos` 是每个其他命令的自然输入方式"，反映出 CLI 文档约束不明确导致用户误操作。

2. **[#3660] Session DB 只读错误阻塞消息投递（已关闭，1 条评论）**
   https://github.com/nanocoai/nanoclaw/issues/3660
   8月29日报告的严重问题：SQLite 数据库变为只读，导致 Discord 等所有渠道无法发送消息。该问题已关闭，表明已有修复或缓解方案。

3. **网关重构系列 PR（#3815-#3818）**
   四位 PR 均由 @zvi-fried 在今日集中提交，涉及网关契约集中化、OneCLI 技能化、Iron Proxy 网关、setup 流程调整。这组 PR 标志着项目正在将网关体系从单一实现转向可插拔架构，是当前社区最集中的开发方向。

---

## Bug 与稳定性

按严重程度排列：

| 严重度 | Issue/PR | 描述 | 状态 |
|--------|----------|------|------|
| 🔴 高 | [#3814] | 原始进程/回合错误文本可能被投递到公共频道，`deliverErrorResult` 未检查目标频道是否为公开渠道，若 `claude` 子进程在公共频道问答中崩溃，原始错误信息将直接暴露给所有用户 | OPEN，无 fix PR |
| 🔴 高 | [#3811] | Central DB 未设置 `busy_timeout`，WAL 模式下锁竞争会直接抛出异常而非等待重试，多进程并发时误报为数据损坏 | OPEN，无 fix PR |
| 🟠 中 | [#3706] | `ncl groups config add-mount --container` 接受绝对路径时生成损坏的双嵌套路径 | CLOSED（9月14日更新，有2条评论） |
| 🟠 中 | [#3660] | Session SQLite 数据库变为只读，阻塞所有渠道的消息投递 | CLOSED（9月14日更新） |
| 🟡 低 | [#3654] | OneCLI 设置 `HTTP_PROXY` 导致 `host.docker.internal` 上的明文 HTTP MCP 服务器不可达，需设置 `NO_PROXY` | OPEN（8月29日创建，待合并） |

新提交的 #3814 和 #3811 均为今天（9月15日）由 @DawoudIO 报告，尚无对应的 fix PR，建议维护者优先关注——前者涉及公共频道信息泄漏（安全/隐私风险），后者可能导致分布式环境下的间歇性数据库故障。

---

## 功能请求与路线图信号

1. **网关体系模块化（强信号）**
   #3815、#3816、#3817、#3818 四连 PR 将网关从内置实现重构为可安装技能，支持 OneCLI 和 Iron Proxy 两种网关。这不仅是重构，更是为第三方网关接入铺平道路。预计将进入下一版本。

2. **投递模式可配置（较强信号）**
   - [#3713] feat(config): 记录每个 agent group 的投递模式（`delivery_mode`，迁移 26）
   - [#3781] feat(agent-runner): 强制 tools-only 投递，解决 provider 无法保持 final-text 信封契约的问题
   两个 PR 相互配合，为无法稳定输出最终文本的 provider 提供降级方案，可能在下一版本合入。

3. **Agent 模板在聊天中可用（已实现）**
   [#3396] 和 [#3428] 被关闭（合并或关闭），若已合并，则用户/Agent 可直接在聊天中通过模板创建子代理，而不需要登录终端。

4. **Durable handoff 与 mission control（早期信号）**
   [#3813] 提出主机侧的持久化交接账本、Slack agent-to-agent 交付的严格约束等，目前处于 OPEN 状态，概念较新，可能还需要社区讨论。

---

## 用户反馈摘要

从今日活跃的 Issue 评论中提炼的真实用户声音：

1. **CLI 参数约束不清晰导致误用（#3706）**：用户 @DawoudIO 指出 `--container` 参数"按 `--help` 的描述接受一个容器路径，但没有文档约束它必须是相对的"，而"传入绝对路径是每个其他命令的自然输入方式"。这反映出 CLI 文档需要明确标注路径类型约束，或者命令应内部规范化绝对路径。

2. **数据库只读问题严重影响消息投递（#3660）**：用户报告"Session SQLite 数据库变为只读，阻止所有消息投递。Discord 和其他渠道无法发送出站消息"，这属于阻断性故障，直接影响核心功能。虽然该问题已关闭，但值得关注是否已彻底修复或仅临时缓解。

3. **基础设施配置对开发者不友好（#3654）**：OneCLI 代理设置导致本地 MCP 服务器不可达，该问题从8月29日至今仍未合并修复（17天），可能影响依赖本地调试的开发者体验。

---

## 待处理积压

以下为需要维护者关注的长周期未处理条目：

### 超过 2 周未合并的 PR
- **[#3654]** fix(onecli): NO_PROXY for host.docker.internal（@tchopoorian，8月29日创建，17天未合并）
  https://github.com/nanocoai/nanoclaw/pull/3654
  影响：OneCLI 网关激活时，本机 HTTP MCP 服务器不可达。若该 PR 被阻塞，建议维护者说明原因或给出临时绕过方案。

### 超过 1 周未合并的 PR
- **[#3713]** feat(config): 记录每 agent group 的投递模式（@glifocat，9月3日创建，12天）
  https://github.com/nanocoai/nanoclaw/pull/3713
- **[#3719]** fix(a2a): 向源报告通信失败（@Koshkoshinsk，9月4日创建，11天）
  https://github.com/nanocoai/nanoclaw/pull/3719
- **[#3781]** feat(agent-runner): 强制 tools-only 投递（@glifocat，9月12日创建，3天）
  https://github.com/nanocoai/nanoclaw/pull/3781

### 高优 Issue 待响应
- **[#3814]** 原始错误文本可能泄漏到公共频道 — 安全风险，今日新开，无评论无 fix
  https://github.com/nanocoai/nanoclaw/issues/3814
- **[#3811]** Central DB 无 busy_timeout — 稳定性风险，今日新开，无评论无 fix
  https://github.com/nanocoai/nanoclaw/issues/3811

---

*本日报基于 NanoClaw 公开 GitHub 数据自动生成，数据截止 2026-09-15。*

:::

:::details{title="IronClaw" repo="nearai/ironclaw"}

# IronClaw 项目动态日报 — 2026-09-15

## 1. 今日速览

过去24小时项目活跃度处于中低水平：共1条Issue更新、1条PR更新，无新版本发布。Issue侧，团队延续了每日失败分类机制，发布了officeqa套件的失败归因分析；PR侧，MCP响应泄漏诊断修复（#8077）持续迭代，已于昨日推送新进展。整体来看，项目处于常规迭代与质量观测并行阶段，暂无紧急安全事件或大规模功能变更信号，健康度稳定。

## 2. 版本发布

无。

## 3. 项目进展

今日无新合并/关闭的PR。值得关注的是 **PR #8077**（`fix(mcp): classify response leak diagnostics`）在昨日（9月14日）有实质更新，目前仍处于待合并状态。该PR围绕MCP出口诊断进行集中化改造：

- 将`response_leak_blocked`哨兵统一收敛到`ironclaw_host_api::http`模块；
- 让MCP通道对该哨兵单独分类，使宿主层泄漏阻断保持安全，同时保留MCP可见的独立错误原因。

该改动直接关联并计划关闭 **Issue #8009**，属于对MCP子系统的健壮性加固，不涉及破坏性接口变更。PR已持续约9天，建议维护者近期安排评审。

🔗 [PR #8077](https://github.com/nearai/ironclaw/pull/8077)

## 4. 社区热点

今日社区讨论热度整体偏低，两条更新均无评论与点赞，但各自具有信号意义：

- **[Issue #8100](https://github.com/nearai/ironclaw/issues/8100)**（`Daily ironclaw failure taxonomy — 2026-09-14`）：由@pranavraja99发起的每日失败分类报告，聚焦officeqa套件的43个非通过任务。虽然是机器化/流程化更新的模式，但反映出项目维护者对模型质量指标的持续追踪，背后诉求是量化模型错误类型、识别系统性缺陷来源。
- **[PR #8077](https://github.com/nearai/ironclaw/pull/8077)**：技术向改动，无评论区互动，但“泄漏诊断分类”这一主题对于MCP生态的安全性调试具有直接价值，后续合并后预计会改善相关用户的排障体验。

## 5. Bug 与稳定性

今日通过Issue #8100暴露出一类模型质量层面的问题，按严重程度排列如下：

| 严重程度 | 描述 | 状态 |
|---------|------|------|
| 高 | **officeqa套件43个非通过任务**，初步归因“几乎全部是模型质量错误”，具体表现为DeepSeek-V4-Flash在导航类任务中的执行失败（摘要截断，未见完整结论） | 已记录，待深入分析 |
| 中 | **MCP响应泄漏诊断分类不明确**（对应#8009，#8077修复中）：此前泄漏阻断的诊断语义在MCP通道中区分度不足，影响开发者定位问题 | 已有修复PR |

其中模型质量问题（#8100）目前无独立fix PR关联，预计将作为后续模型选型或提示优化的输入；泄漏诊断问题已有明确修复方案，等待合并。

🔗 [Issue #8100](https://github.com/nearai/ironclaw/issues/8100) | [PR #8077](https://github.com/nearai/ironclaw/pull/8077)

## 6. 功能请求与路线图信号

今日数据中无新功能请求Issue。但可以从既有动作中提取两个路线图信号：

- **诊断体系标准化**：PR #8077将泄漏哨兵集中化并分类，叠加每日失败分类机制的例行运转，表明项目正在构建“统一诊断语义 + 周期性质量大盘”的基础设施，这可能是后续版本中可观测性模块的演进方向。
- **模型质量评估闭环**：Issue #8100系列报告持续产出失败归因，若搭配模型切换或配置修复PR，则意味着一套“发现问题 → 归因 → 修复/调优 → 再评估”的闭环流程正在成型，未来可能影响对DeepSeek-V4-Flash等模型的默认推荐策略。

## 7. 用户反馈摘要

本周期内无直接用户评论或互动数据，反馈信号主要来自维护侧的失败分类报告：

- **痛点**：DeepSeek-V4-Flash在officeqa导航类任务上错误率偏高（43个非通过任务），说明当前模型在复杂指令跟随与多步导航场景下表现不稳定，可能影响依赖该模型的端侧Agent体验。
- **场景**：officeqa套件倾向于办公自动化场景，失败集中在模型推理层而非基础设施层，侧面反映当前瓶颈主要在模型能力而非框架本身。
- **隐含诉求**：用户/维护者期望获得更细粒度的错误分类（如区分导航失败、检索失败、格式错误等），以便针对性替换模型或调整Prompt。

## 8. 待处理积压

- **PR #8077**（`fix(mcp): classify response leak diagnostics`）：自9月6日创建，已持续9天未合并，期间活跃更新。建议维护者安排评审，避免修复分支长期漂移。  
  🔗 https://github.com/nearai/ironclaw/pull/8077

- **Issue #8009**：作为#8077的目标关闭项，当前保持打开状态，若PR合并应同步关闭。  
  🔗 https://github.com/nearai/ironclaw/issues/8009

- **Issue #8100**：虽为昨日新开，但其系列每日报告模式若缺少后续归因动作，容易沉淀为“有报告、无闭环”的积压项，建议明确后续责任人。  
  🔗 https://github.com/nearai/ironclaw/issues/8100

---

**日报生成时间**：2026-09-15  
**数据源**：github.com/nearai/ironclaw（截至2026-09-15统计区间）

:::

:::details{title="LobsterAI" repo="netease-youdao/LobsterAI"}

# LobsterAI 项目动态日报 — 2026-09-15

---

## 今日速览

今日项目活跃度**较高**，共 42 条 PR 更新、3 条 Issue 更新，其中 23 条 PR 已合并/关闭、19 条待合并，显示开发节奏明显加快。项目当前重心集中在 **OpenClaw 引擎（v2026.8.1 升级后）的兼容性修复**上，包括输出预算、历史回放校验、配置同步等 6+ 个专项修复在今日集中落地。社区方面，用户对 v2026.7.15 引入的左下角广告问题持续关注（#2342），已有对应 PR 提交。无新版本发布。

---

## 版本发布

今日无新版本发布。

---

## 项目进展

今日合并/关闭了 **23 条 PR**，其中围绕 OpenClaw 兼容性的修复构成了主要进展，整体解决了升级至 OpenClaw v2026.8.1 后暴露的一批稳定性问题：

- **#2684** — `fix(openclaw): prevent heuristic output budget starvation`（已合并）：修复长会话输出预算被错误缩减至 1 token、导致推理模型有协议响应但无正文的问题
- **#2682** — `fix(openclaw): validate historical transcript replay`（已合并）：修复历史内容块缺失/字段错误导致任务反复无法继续的问题，增加字段校验与只读工具
- **#2681** — `fix(openclaw): recover invalid legacy dreaming state at startup`（已合并）：旧版 Memory Core 损坏 JSON 阻断网关启动的恢复机制
- **#2678** — `fix(openclaw): preserve compaction summary format and audit facts`（已合并）：统一压缩摘要模板，防止重排段落导致审计标识丢失
- **#2677** — `fix(cowork): restore technical error details`（已合并）：恢复请求失败卡片的异常详情展示
- **#2664** — `fix(openclaw): avoid POPO SDK loading races`（已合并）：修复 POPO 2.1.13 的 `ERR_REQUIRE_ESM_RACE_CONDITION` 插件加载竞态
- **#2679** — `feat(openclaw): add compatibility repair for post-upgrade gateway state`（已关闭）：升级后的网关状态修复（备份引擎数据 → 官方 doctor 修复 → 恢复损坏索引与插件 → 重新生成配置）

另有 **#2683**（openclaw compatibility repair，OPEN）、**#2680**（preserve model policy during config sync，OPEN）等 19 条 PR 待合并。

> 值得注意的是，今日处理了一批 3 月底创建的 stale PR（#1142-#1146）并标记关闭，同时有 2 条 stale Issue（#1149、#1151）被关闭，说明维护者在推进新开发的同时也在清理历史积压项。

---

## 社区热点

今日评论数与互动最集中的议题如下：

**1. 左下角广告可关闭性争议 — Issue #2342（OPEN）**
- 链接：https://github.com/netease-youdao/LobsterAI/issues/2342
- 用户 @PYUDNG 反馈 v2026.7.15 起左下角出现新广告，虽可手动点掉但会反复弹出，且设置中无彻底关闭选项。已有 2 条评论，持续 2 个月未关闭。
- **对应 PR #2374**：`feat: add permanent setting to hide sidebar ad banner`（OPEN，7/21 提交）已在 **Settings → General** 增加永久隐藏开关，但截至今日仍未合并。
- **诉求分析**：用户对商业化广告的基本容忍边界，以及“可永久关闭”作为基础功能预期的强烈需求。

**2. OpenClaw 输出预算饥饿问题 — PR #2684（已合并）**
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2684
- 影响面广（所有长会话 Chat Completions 请求），且“协议成功但无正文”的表现为用户直接感知，属于高频痛点。

此外，在 42 条 PR 中，@btc69m979y-dotcom 一人提交了 8 条 PR，且全部围绕 OpenClaw 兼容性，是当前最主要的贡献方向。

---

## Bug 与稳定性

按严重程度排序：

| 严重度 | 问题描述 | 状态 | 链接 |
|---|---|---|---|
| 🔴 严重 | 长会话输出预算被错误降至 1 token，推理模型无正文返回，重复续答无法恢复 | ✅ 已修复 (#2684) | https://github.com/netease-youdao/LobsterAI/pull/2684 |
| 🔴 严重 | 历史内容块缺失/字段错误导致任务反复无法继续 | ✅ 已修复 (#2682) | https://github.com/netease-youdao/LobsterAI/pull/2682 |
| 🟠 中等 | 旧版 Memory Core 的 `memory/.dreams/` 损坏 JSON 阻断网关启动 | ✅ 已修复 (#2681) | https://github.com/netease-youdao/LobsterAI/pull/2681 |
| 🟠 中等 | 升级后配置同步删除 `modelPolicy` 字段，导致配置反复写入与下发 | 🔶 待合并 (#2680) | https://github.com/netease-youdao/LobsterAI/pull/2680 |
| 🟠 中等 | POPO 2.1.13 插件加载时 `ERR_REQUIRE_ESM_RACE_CONDITION`，网关重启后无账户监听 | ✅ 已修复 (#2664) | https://github.com/netease-youdao/LobsterAI/pull/2664 |
| 🟡 较低 | 请求失败卡片仅显示 provider/model，日志异常详情丢失 | ✅ 已修复 (#2677) | https://github.com/netease-youdao/LobsterAI/pull/2677 |
| 🟡 较低 | Gemini baseURL 以 `/v1` 结尾时 URL 拼接缺少 `/` 分隔符（off-by-one） | ⚪ Stale Issue 已关闭 (#1151) | https://github.com/netease-youdao/LobsterAI/issues/1151 |
| 🟢 已解决 | `coworkMemoryExtractor.ts` 核心记忆模块无任何测试覆盖 | ✅ 已补充 35 个 Vitest 用例 (#1149 关闭) | https://github.com/netease-youdao/LobsterAI/issues/1149 |

> 今日 Bug 修复高度集中于 OpenClaw v2026.8.1 升级引入的兼容性问题，官方升级路径的回归测试值得在后续版本重点加强。

---

## 功能请求与路线图信号

| 功能请求 | 状态 | 对应实现 | 说明 |
|---|---|---|---|
| 设置中增加侧边栏广告永久隐藏开关 | Issue #2342 开放中（2 个月） | PR #2374 已有完整实现（7/21 提交，仍未合并） | 用户明确表达“彻底不弹出”诉求，若合入将有效提升满意度 |
| AI 回复消息朗读功能 | 无对应 Issue | PR #1682（基于 Web Speech API，零依赖） | 4/14 提交，长期搁置；属于体验增强类功能，路线图优先级可能偏低 |
| 切换 Agent 时自动清空主页输入框 | 无对应 Issue | PR #1707（根因：所有 Agent 共享 `__home__` 草稿 key） | 明确的 UX 缺陷修复，4/16 提交，长期未合并 |
| 隐藏 OpenClaw 主 Agent 内部会话 | 无对应 Issue | PR #1181（新增 `hidden` 列标记内部会话） | 避免用户在会话列表中看到 `[OpenClaw]` 标题产生困惑，4/1 提交 |
| 技能页面快捷创建入口 | 无对应 Issue | PR #1142（跳转 Cowork + 选中 skill-creator） | 3/31 提交，已被标记 stale 后关闭 |
| 团队配置模板导出/导入 | 无对应 Issue | PR #1145（Settings → About 入口） | 3/31 提交，已被标记 stale 后关闭 |

**路线图信号**：以上长期搁置的功能请求若在近期合入，大概率进入 v2026.9.x 或 v2026.10 版本。其中 #1682、#1707、#1181 代码完成度较高、无冲突迹象，合入成本低。

---

## 用户反馈摘要

- **对广告的负面情绪（#2342）**：用户 @PYUDNG 对 v2026.7.15 新引入的左下角广告表达了明确不满，使用“彻底不弹出”措辞，说明对非用户可控广告的容忍度较低。设置中缺少对应开关是主要槽点。
- **对 OpenClaw 升级后稳定性的抱怨（来自 PR #2684、#2682、#2677 关联的用户反馈）**：多位用户的共性问题集中在“升级到 2026.8.1 后任务中断”“长会话回复为空”“错误信息不透明”等现象。用户需要反复重试或手动操作才能恢复，体验受损明显。
- **历史遗留 issue 清理（#1149、#1151）**：这两个 3 月创建的 issue 今日被关闭，用户未新增评论，说明相关用户可能已通过其他渠道解决或放弃跟进。

---

## 待处理积压

**长期未合并 PR（提醒维护者关注）：**

| PR | 主题 | 提交日期 | 搁置时长 | 链接 |
|---|---|---|---|---|
| #1181 | 隐藏 OpenClaw 主 Agent 内部会话 | 2026-04-01 | ~5.5 个月 | https://github.com/netease-youdao/LobsterAI/pull/1181 |
| #1682 | AI 回复朗读功能（Web Speech API） | 2026-04-14 | ~5 个月 | https://github.com/netease-youdao/LobsterAI/pull/1682 |
| #1683 | 远程导入技能 URL 前置校验 | 2026-04-14 | ~5 个月 | https://github.com/netease-youdao/LobsterAI/pull/1683 |
| #1707 | 切换 Agent 时清空主页输入框 | 2026-04-16 | ~5 个月 | https://github.com/netease-youdao/LobsterAI/pull/1707 |
| #1773 | i18n 补全记忆条目编辑按钮翻译 | 2026-04-21 | ~5 个月 | https://github.com/netease-youdao/LobsterAI/pull/1773 |
| #2374 | 侧边栏广告永久隐藏设置 | 2026-07-21 | ~2 个月 | https://github.com/netease-youdao/LobsterAI/pull/2374 |

**长期未关闭 Issue：**

- **#2342**（左下角广告永久关闭，开放 2 个月，已有 PR 待合并）：https://github.com/netease-youdao/LobsterAI/issues/2342

**今日新开待合并 PR（需关注）：**

- **#2680** — `fix(openclaw): preserve model policy during config sync`：若不合并，OpenClaw 配置同步仍会反复误判字段变更，产生持续无效写入： https://github.com/netease-youdao/LobsterAI/pull/2680
- **#2683** — `feat: openclaw compatibility repair`：描述为空，需维护者补充说明并 review： https://github.com/netease-youdao/LobsterAI/pull/2683

---

*本报告基于 2026-09-15 GitHub 数据生成，数据来源：https://github.com/netease-youdao/LobsterAI*

:::

:::details{title="Moltis" repo="moltis-org/moltis"}

# Moltis 项目动态日报 — 2026-09-15

## 1. 今日速览

过去 24 小时内，Moltis 项目整体活跃度偏低：无新 Issue、无 Issue 关闭、无新版本发布，仅收到 1 个待合并的 Pull Request（#1269），内容为 OAuth 测试的稳定性修复。该 PR 针对此前 CI 中报告的失败（moltis-064r），通过等待持久的主页面认证状态来消除成功弹窗的时序竞争，属于测试可靠性的持续打磨。项目核心功能无新增，整体处于稳定维护节奏，无异常信号。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

**今日无已合并 PR，但有 1 个待合并修复。**

| PR | 状态 | 内容 |
|---|---|---|
| [#1269](https://github.com/moltis-org/moltis/pull/1269) | 待合并 | 修复 OAuth 测试中的 success-popup 时序竞争问题 |

该 PR 虽尚未合并，但指向明确的测试缺陷修复（issue moltis-064r 已在 CI 运行报告中定位）。若合并，将提升 PKCE 成功与断开连接测试的确定性，减少因弹窗关闭时序引发的随机失败——属于对 CI 稳定性和开发者体验的改进。

---

## 4. 社区热点

今日无高讨论量的 Issue 或 PR。唯一活跃项为 PR #1269，评论数量未提供（显示为 undefined），关注度较低，暂无社区热点的有效数据。

---

## 5. Bug 与稳定性

**低严重度（测试级）**

- **OAuth 成功弹窗时序竞争**（对应 issue moltis-064r）  
  在 PKCE 成功与断开连接测试中，依赖立即关闭的回调弹窗页面事件做断言，导致偶发时序失败。

  - ✅ **已有修复 PR**：[#1269](https://github.com/moltis-org/moltis/pull/1269)，改为等待持久的主页面认证状态，避免竞态。
  - 🔗 相关 CI 运行：[actions/runs/32917698826](https://github.com/moltis-org/moltis/actions/runs/32917698826/jobs/98024870973)

当前无其他用户可感知的 Bug 或回归报告。

---

## 6. 功能请求与路线图信号

今日无新功能请求。PR #1269 属于测试基础设施改进，不涉及新功能。尚未观察到显著的用户需求信号可纳入下一版本路线图。

---

## 7. 用户反馈摘要

今日无 Issue 评论或用户反馈可供分析。公开讨论较少，暂无法提炼用户痛点或满意度信息。

---

## 8. 待处理积压

今日数据中无长期未响应（如超过 30 天无更新）的重要 Issue 或 PR。唯一的 PR #1269 创建于今日，仍处于正常处理周期内，维护者应及时 review 以避免测试修复积压。

---

> **项目健康度评估**：Moltis 当前处于低活跃但稳定的维护状态。今日唯一 PR 聚焦测试可靠性，虽无功能进展，但体现了对 CI 质量的重视。建议关注 PR #1269 的合并进展，并留意后续 Issue 与社区讨论的活跃度变化。

:::

:::details{title="CoPaw" repo="agentscope-ai/CoPaw"}

# CoPaw 项目动态日报 — 2026-09-15

## 1. 今日速览

项目在过去 24 小时保持高活跃度：共产生 **17 条 Issue 更新**（新开/活跃 6 条，关闭 11 条）及 **49 条 PR 更新**（待合并 29 条，合并/关闭 20 条）。关闭量显著大于新开量，说明维护团队正在积极清理积压；PR 层面有 20 条被合并或关闭，其中包含 MCP 稳定性、Console UI 优化、Hub 审计日志等多个方向的修复与功能落地。社区讨论热度集中在 **QwenPaw Hub 多租户版路线图**（#7318，27 条评论）和**任务停止机制 Bug**（#7567，7 条评论）。整体来看，项目正处于功能扩展（Hub、语音、多租户）与稳定性加固并行的阶段，健康度良好。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日合并/关闭的 PR 覆盖以下关键方向：

### 3.1 MCP 稳定性修复（合并）

- **[#7787] fix(mcp): avoid double-decompressing gzip 4xx MCP responses** — 修复 Streamable-HTTP 握手时 gzip 压缩的 HTTP 400 响应被二次解压导致 `DecodingError` 的问题。由 @yuanxs21 提交，同日合并。[链接](https://github.com/agentscope-ai/CoPaw/pull/7787)
- **[#7504] fix(mcp): enforce per-tool whitelist on the agent runtime path** — 修复 2.0 Driver 重写后 MCP 工具白名单只在 Console 展示层生效、运行时仍可调用已禁用工具的问题。该 PR 直接提升 MCP 工具权限控制的安全性。[链接](https://github.com/agentscope-ai/CoPaw/pull/7504)
- **[#7649] feat(mcp): support configurable timeout for HTTP/SSE clients** — 为 HTTP/SSE MCP 客户端增加可配置超时（`http_timeout`，范围 `>0` 秒），并贯通 API schema 与 DriverCard 端点。[链接](https://github.com/agentscope-ai/CoPaw/pull/7649)

### 3.2 Console / 前端体验（合并）

- **[#7750] feat(console): show send_file_to_user files in response artifact list** — 将 Agent 通过 `send_file_to_user` 发送的文件直接展示在助手回复的工件网格中，无需用户手动展开工具步骤查找。回应了 #7744 的用户诉求。[链接](https://github.com/agentscope-ai/CoPaw/pull/7750)
- **[#7704] feat(console): move chat files drawer to the right** — 将聊天文件抽屉移至右侧，回应了多个关于"历史对话/文件区位置"的 UI 反馈（#7739、#7700）。[链接](https://github.com/agentscope-ai/CoPaw/pull/7704)
- **[#7681] fix(console): persist sidebar collapsed state across reloads** — 侧边栏折叠状态现在会持久化，不再在刷新后重置。[链接](https://github.com/agentscope-ai/CoPaw/pull/7681)
- **[#7682] fix(console): use semantic tokens in SettingsCenter** — 修复主题令牌重构后 21 处 `var(--color*, fallback)` 失效的问题。[链接](https://github.com/agentscope-ai/CoPaw/pull/7682)

### 3.3 Hub 安全审计（合并）

- **[#7683] fix(hub): audit login attempts and denied runtime creation** — 为 Hub 控制面补充两个最敏感的安全审计事件：**登录尝试**和**拒绝的 Runtime 创建**。此前 `GET /api/hub/admin/audit` 永远不会出现登录记录，失败的 `POST /api/hub/runtimes` 也不会产生任何审计事件。[链接](https://github.com/agentscope-ai/CoPaw/pull/7683)

### 3.4 Skill 与通道配置（合并）

- **[#7782] fix(skill): Enable customized channel for skill selection** — 修复自定义 channel 无法在 skill 的适用 channel 列表中选择的问题。直接关闭 #7746。[链接](https://github.com/agentscope-ai/CoPaw/pull/7782)

### 3.5 启动性能（合并）

- **[#7539] fix(browser): move managed Chromium install off startup critical path** — 将 Playwright Chromium 安装从启动关键路径中移除，改为首次 `Browser.connect()` 时懒加载，避免桌面版启动被阻塞约 60 秒。[链接](https://github.com/agentscope-ai/CoPaw/pull/7539)

> **小结**：今日合并的 PR 涉及 **MCP 稳定性、安全审计、Console 交互、Skill 配置、启动性能** 五大方向，直接关闭了 3 个用户报告的 Issue（#7746、#7744、#7716），项目整体在向 2.2.x 稳定版收敛的同时，也在为后续 Hub 多租户版铺路。

---

## 4. 社区热点

### 4.1 🔥 #7318 — QwenPaw Hub 多租户版路线图讨论（27 评论 / 4 👍）

> [链接](https://github.com/agentscope-ai/CoPaw/issues/7318)

**内容概述**：作者 @rayrayraykk 发起了关于 QwenPaw Hub 多租户版（将于 2.2.0 推出）的路线图讨论，征求社区对"接下来应该构建什么"的建议。关联了此前社区对多用户访问、管理员管理 skills 的需求（#2324）。

**背后的诉求**：从个人 AI 助手向团队级平台演进是社区长期呼声。讨论的高热度说明用户不满足于单机使用，期待多租户隔离、组织级模型网关、成员权限管理等企业级能力。这与同日新开的 PR #7779（Hub 模型网关、成员治理、用量仪表盘）形成呼应——**维护者正在将社区讨论快速转化为实际功能**。

### 4.2 #7567 — 任务停止后实际仍在执行（7 评论）

> [链接](https://github.com/agentscope-ai/CoPaw/issues/7567)

**内容概述**：用户报告在 2.2 web 版中点击停止后，UI 显示已停止（方形按钮变回上传箭头），但刷新页面后发现任务仍在执行，且错误的指令实际仍在运行。用户尝试发送修正指令时收到 409 冲突报错。

**背后的诉求**：这是一个**执行生命周期管理**的关键问题。用户需要的是：
1. 停止操作必须真正中断下游任务执行；
2. UI 状态与真实执行状态必须一致；
3. 停止后应允许立即发送新指令而非抛出 409。

该 Issue 已有 7 条评论，修复 PR 尚未出现，需要维护者重点关注。

### 4.3 #7739 — 历史对话移至右侧（6 评论 / 0 👍）

> [链接](https://github.com/agentscope-ai/CoPaw/issues/7739)

**内容概述**：用户反馈当前 Web 页面功能区和历史对话全部拥挤在左侧，14 寸笔记本上各区域内容被折叠需要滑动才能看清。希望增加历史对话右侧选项。

**背后的诉求**：窄屏/小屏笔记本用户的**布局可用性问题**。值得注意的是，PR #7704（文件抽屉移至右侧）已在同日合并，但历史对话列表仍固定在左侧。这是否会成为下一个 Console 布局调整方向值得关注。

---

## 5. Bug 与稳定性

以下按严重程度排列今日活跃的 Bug 类 Issue：

| 严重程度 | Issue | 描述 | 状态 | 对应修复 PR |
|---------|-------|------|------|------------|
| 🔴 严重 | [#7786](https://github.com/agentscope-ai/CoPaw/issues/7786) | **Cloud/NFS 部署下打开文件浏览器冻结整个进程 5–6 分钟**，且事件循环上存在阻塞式文件 I/O。2 vCPU 容器中整个 WebUI 无响应 | 新开（1 评论） | 无 |
| 🔴 严重 | [#7567](https://github.com/agentscope-ai/CoPaw/issues/7567) | **停止任务后实际仍在执行**，UI 状态与真实状态不一致，二次提交指令返回 409 | 活跃（7 评论） | 无 |
| 🟠 中等 | [#7689](https://github.com/agentscope-ai/CoPaw/issues/7689) | **PDF 文档块仍被发送至多模态 chat-completions 端点**：`#7621` 只修复了 `supports_multimodal=False` 的情况，多模态模型的 OpenAI 兼容端点仍收到 `{"type":"file"}` 内容块并被拒绝 | 活跃（3 评论） | [#7636](https://github.com/agentscope-ai/CoPaw/pull/7636)（Open，Under Review） |
| 🟠 中等 | [#7767](https://github.com/agentscope-ai/CoPaw/issues/7767) | **一组 guardrail-plugin 构建相关的 Bug**：① Console 附件陈旧 blob（第 2+ 张图片重复发送第 1 张的字节）；② 一次性 cron 触发丢失；③ Console tail-drop；④ `on_acting` 钩子从不触发 | 活跃（2 评论） | 无 |
| 🟡 较低 | [#7764](https://github.com/agentscope-ai/CoPaw/issues/7764) | **MCP 客户端 'dagu' 因 `httpx.DecodingError: zlib incorrect header check` 保持 inactive**（streamable_http） | 已关闭 | [#7787](https://github.com/agentscope-ai/CoPaw/pull/7787)（已合并）、[#7735](https://github.com/agentscope-ai/CoPaw/pull/7735)（Open） |
| 🟡 较低 | [#7743](https://github.com/agentscope-ai/CoPaw/issues/7743) | **Hub 模式下 agent 发送的文件预览返回 401**：前端使用查询参数携带 token，但服务端未识别 | 已关闭 | 无 |

> **稳定性趋势**：MCP gzip 双重解压问题已通过 #7787 修复，但暴露出的问题模式（HTTP 响应在重建 `httpx.Response` 时保留原始 `Content-Encoding`）提示 MCP 客户端层可能有更多类似隐患。另外，**两个严重 Bug（#7786 文件浏览器冻结、#7567 停止失效）均无修复 PR**，需要维护者优先响应。

---

## 6. 功能请求与路线图信号

| 功能需求 | 来源 Issue | 已有 PR / 信号 | 纳入下一版本可能性 |
|---------|-----------|---------------|-------------------|
| **Hub 多租户 + 组织模型网关** | [#7318](https://github.com/agentscope-ai/CoPaw/issues/7318) | **[#7779](https://github.com/agentscope-ai/CoPaw/pull/7779)（Open）**：Hub 作为组织模型网关，管理员发布模型并保留供应商密钥，成员不可见组织凭证 | ✅ 高 — 2.2.0 核心路线，PR 已提交 |
| **对话中明确调用指定工具**（`//` 模糊搜索） | [#7778](https://github.com/agentscope-ai/CoPaw/issues/7778)、[#7780](https://github.com/agentscope-ai/CoPaw/issues/7780)（重复，均关闭） | 无 | ⚠️ 中 — 解决多相似工具时 Agent 调用不准的痛点，但需设计 `//` 交互协议 |
| **实时语音对话** | — | **[#7785](https://github.com/agentscope-ai/CoPaw/pull/7785)（Open）**：新增 provider 可配置的实时语音聊天，支持语音输入、播放、打断、模型选择 | ✅ 高 — PR 已提交，与现有 Chat 执行路径共享 |
| **后台更新** | [#7543](https://github.com/agentscope-ai/CoPaw/issues/7543) | 无 | ⚠️ 中 — 用户明确反馈在线更新期间应用不可用，期望后台下载+提醒安装 |
| **频道参数透传 MCP 工具** | [#7650](https://github.com/agentscope-ai/CoPaw/issues/7650) | 无 | ⚠️ 中 — 用户需要将 QQ 号、电话等频道请求顶层 JSON 数据透传给 MCP 工具，目前仅能作为会话 userid |
| **文件发送展示优化** | [#7744](https://github.com/agentscope-ai/CoPaw/issues/7744) | **[#7750](https://github.com/agentscope-ai/CoPaw/pull/7750)（已合并）** | ✅ 已完成 |

> **路线图信号**：从 #7318 讨论热度和 #7779 的快速落地来看，**Hub 多租户化**是 2.2.0 的核心主线。语音功能（#7785）是新的增量亮点。社区对"工具调用精准性"（#7778）的呼声值得关注——如果多个相似工具导致 Agent 选错，`//` 手动指定机制可能成为提升用户控制感的重要特性。

---

## 7. 用户反馈摘要

### 7.1 反复出现的痛点

- **"停止"按钮不可信赖**（#7567）：用户指出即使 UI 上停止按钮已复位，实际任务仍在执行，且刷新后才发现。这直接导致用户对执行控制失去信任，属于**体验优先级极高**的问题。
- **文件查找困难**（#7744）：Agent 发送的文件被折叠在工具步骤中，用户需要手动展开才能找到。该问题已被 #7750 修复。
- **侧边栏布局拥挤**（#7739/#7700）：14 寸笔记本上左侧功能区+历史对话+文档预览挤在一起，内容被迫折叠/滑动。已有部分修复（文件抽屉右移），但历史对话位置仍未解决。

### 7.2 使用场景与期望

- **团队协作需求明确**（#7318）：用户希望以团队为单位运行 QwenPaw，需要多用户访问、管理员管理 skills。多租户 Hub 是社区反复提及的诉求。
- **自定义基础设施的适配诉求**：
  - [#7772](https://github.com/agentscope-ai/CoPaw/issues/7772)：使用 new-api（v1.0.0-rc.26）代理后配置模型连接测试失败，期望兼容更多第三方 API 网关。
  - [#7764](https://github.com/agentscope-ai/CoPaw/issues/7764)：Dagu MCP Server 无法连接，指向 HTTP 响应压缩处理兼容性问题。
  - [#7650](https://github.com/agentscope-ai/CoPaw/issues/7650)：期望频道元数据（QQ 号等）可以透传给 MCP 工具，以支持更丰富的自动化场景。

### 7.3 满意度信号

- 正面：PR #7782 合并后直接解决了自定义 channel 的 skill 适用问题（#7746），用户可以更精细地控制 skill 的渠道范围。
- 正面：PR #7750 回应了文件展示的反馈，将"发送文件"放在回复正文中作为工件卡片。
- 负面：**NFS 部署下文件浏览导致整个实例冻结 5-6 分钟**（#7786）是近期最严重的稳定性反馈，直接影响生产环境可用性。

---

## 8. 待处理积压

以下为值得维护者关注的长期未响应或停留时间较长的 Issue/PR：

| 项目 | 创建时间 | 停留时长 | 当前状态 | 说明 |
|------|---------|---------|---------|------|
| [#7650](https://github.com/agentscope-ai/CoPaw/issues/7650) 频道参数透传 MCP | 2026-09-09 | 6 天 | OPEN，2 评论 | 仅用户提问，无维护者回复，属于"如何开发"的指导请求 |
| [#7689](https://github.com/agentscope-ai/CoPaw/issues/7689) PDF 块发送至多模态端点 | 2026-09-11 | 4 天 | OPEN，3 评论 | 已有 PR #7636 待合并，但 PR 停留 Under Review 7 天，需要推进 |
| [#7613](https://github.com/agentscope-ai/CoPaw/pull/7613) OpenViking 记忆插件 | 2026-09-07 | 8 天 | OPEN，Under Review | first-time-contributor，长时间未获得明确合并信号 |
| [#7636](https://github.com/agentscope-ai/CoPaw/pull/7636) 剥离 PDF 文档块 | 2026-09-08 | 7 天 | OPEN，Under Review | 直接关系 #7689 的修复，建议优先评审 |
| [#7567](https://github.com/agentscope-ai/CoPaw/issues/7567) 停止任务失效 | 2026-09-04 | 11 天 | OPEN，7 评论 | 严重 Bug 但无对应修复 PR，长期未解决 |
| [#7543](https://github.com/agentscope-ai/CoPaw/issues/7543) 后台更新 | 2026-09-04 | 11 天 | CLOSED | 已关闭但未实现，需确认是否进入路线图 |
| [#7193](https://github.com/agentscope-ai/CoPaw/issues/7193) 跨会话记忆串扰 | 2026-08-21 | 25 天 | CLOSED（标记 invalid/need-info） | 用户报告记忆搜索到另一会话内容，虽已关闭但建议确认是误报还是数据隔离问题 |

---

**报告总结**：CoPaw 今日在 PR 合并速度上表现强劲（20 条合并/关闭），MCP 层修复、Console 体验优化和 Hub 审计补全均取得实质进展。但 **两个严重 Bug（#7786 文件浏览器冻结、#7567 停止失效）尚无修复 PR**，且 Hub 多租户化的架构性改动（#7779）正在快速推进中，需要平衡新功能开发与存量稳定性投入。社区对多租户、语音、工具调用控制的呼声正在被逐步响应，项目整体处于"功能扩张 + 稳定性加固"双线并行的健康节奏中。

---

*数据来源：[github.com/agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw) | 统计窗口：2026-09-14 至 2026-09-15*

:::
