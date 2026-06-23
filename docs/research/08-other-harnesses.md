# 第 8 章研究笔记 · 触类旁通：其他 harness（其他 CLI agent 工具）

> 研究日期：2026-06-23。所有条目均已 WebFetch 官方仓库/主页核实，来源见文末表。
> 研究规则：不凭记忆下结论；对不上真实工具的名字如实标注，不臆造。

## 章首 why（底层相通，触类旁通）

Claude Code 不是孤例。市面上有一批"CLI agent / agent harness"——它们共享同一套底层范式：
一个 LLM + 一组工具（读写文件、跑命令、搜索）+ 一个在终端里反复"思考 → 调工具 → 看结果"的循环。
搞懂了 Claude Code 的工作方式，再看这些工具就是触类旁通：差别主要在**提供方、模型锁定、免费额度、实现语言、定位侧重**，内核高度一致。

---

## (a) 主流 CLI agent 对比表（仅含已核实工具）

| 工具 | 提供方 | 一句话定位 | 与 Claude Code 的异同要点 |
|---|---|---|---|
| **Claude Code** | Anthropic | 跑在终端里的 Anthropic 编码 agent（本章基准） | 基准。Node.js/TS 实现；只用 Anthropic 模型；按 Anthropic API/订阅计费；无免费额度。 |
| **Codex CLI** | OpenAI | "在终端里与 Codex 结对编程"——本地运行的 OpenAI 编码 agent | 同：终端编码 agent。异：Rust 实现；只用 OpenAI 模型；可随 ChatGPT Plus/Pro/Business 等订阅使用（订阅者无需另开 API 计费）。 |
| **Gemini CLI** | Google | "把 Gemini 的能力直接带进终端"的开源 AI agent | 同：终端 agent。异：TypeScript 实现；只用 Gemini；**有慷慨免费额度**（OAuth 登录约 1000 次/天）；自带 1M token 上下文与原生 Google 搜索接地。 |
| **Goose** | Block 创建，2025-12 捐给 Linux Foundation 旗下 **Agentic AI Foundation (AAIF)** | "开源、可扩展、不止于代码建议"的 AI agent | 同：终端 agent + 工具循环。异：**模型无锁定**（支持 15+ 提供方：Anthropic/OpenAI/Google/Ollama/Bedrock 等）；定位更宽（研究/写作/自动化/数据分析）；有桌面 app；70+ MCP 扩展。仓库已从 `block/goose` 迁到 `aaif-goose/goose`。 |
| **Aider** | Aider-AI（独立开源，Paul Gauthier） | "在终端里做 AI 结对编程" | 同：终端编码。异：Python 实现；**模型无锁定**（任意 LLM）；招牌是 **repo-map**（自动给整库建语义地图，LLM 无需手点文件）+ **git-first**（每次改动自动 commit、便于 review/回滚，可自动跑 lint/test）。 |
| **OpenCode** | Anomaly（前 SST/Serverless Stack 团队），独立开源 | "为终端打造的开源 AI 编码 agent" | 同：终端编码 agent。异：Go 实现；**模型无锁定**（经 Models.dev 接 75+ 提供方，含本地模型，可用 Claude/GPT/Gemini/Copilot 账号）；TUI 用 Bubble Tea，含 vim 键位、SQLite 会话持久化、集成 LSP、auto-compact。 |

**关于 OpenCode 仓库的说明（核实要点）：**
官方主页 `opencode.ai` 当前指向 **`anomalyco/opencode`**（Anomaly = 原 SST 团队）；广为人知的旧家 **`sst/opencode`** 仍是同一项目的主要仓库之一。另存在一个**同名但不同**的 `opencode-ai/opencode`（较早/独立的另一项目），不要混淆——本章所指的主流 OpenCode 是 Anomaly/SST 这一支（主页 opencode.ai）。

> 备注：以上 GitHub star/用户量等数字在搜索结果中出现但未逐一核对，**本笔记不引用具体星标数**（非本章载荷，避免转述误差）。

---

## (b) "openclaw / hermes" 核实结论（如实写）

### openclaw —— 存在同名真实工具，但**不是 CLI 编码 agent**

- 核实到真实项目 **OpenClaw**（仓库 `github.com/openclaw/openclaw`，已 WebFetch 2026-06-23）。
- 它的定位是"**你自己设备上运行的个人 AI 助手**，在你已经用的渠道上回你消息"——即一个**自托管、多渠道消息网关 / agent 运行时**，对接 Telegram/WhatsApp/Slack/Discord/iMessage/Signal 等 20+ 平台，强调本地优先与隐私。
- **它不是** Claude Code / Codex / Aider 那一类"在终端里写代码的 CLI 编码 agent"。它的 CLI 是用来管理 agent 工作区、路由、鉴权，不是用来编码。
- **结论**：若用户是在"CLI 编码 agent"语境下提到 openclaw，这个归类不准确——OpenClaw 属于"自托管多渠道个人 AI 助手"另一类。本章如要提它，须加澄清，不应与 Claude Code/Codex/Aider 并列。
- （旁证：社区另有第三方项目 `Enderfga/claw-orchestrator` 把 Claude Code/Codex/OpenCode 当后端包进 OpenClaw 式运行时——但那是独立社区项目，非 OpenClaw 本身。）

### hermes —— 存在同名真实 agent 框架，但**不是 CLI 编码 agent**；且极易撞名

- 核实到真实项目 **Hermes Agent**（Nous Research，仓库 `github.com/NousResearch/hermes-agent`，已 WebFetch 2026-06-23）。
- 它的定位是"**自我改进的 AI agent**"——一个通用、自主、带学习闭环（从经验中生成/改进技能）、持久记忆、cron 调度、多渠道（Telegram/Discord/Slack/WhatsApp/Signal 等）的 agent 框架；有终端 UI，也能当消息网关跑。支持 200+ 模型（OpenRouter + OpenAI/Anthropic 等）。
- **它不是** Claude Code 那类 CLI 编码 agent；官方文档明确说它"不是绑在 IDE 上的编码副驾"。可接 MCP，但核心身份是通用自主 agent，不是软件开发 harness。
- **撞名提醒（本章用于澄清）**：「Hermes」在别处通常指——**Nous Hermes 模型系列**（LLM 微调，非工具）、**Hermes**（Meta 的 JS 引擎）、各种消息库——这些**都不是 agent harness**。Hermes Agent 与 Nous Hermes 模型同出 Nous Research，但一个是 agent 框架、一个是模型，按"创建者"相关而非"功能"相关。
- **结论**：作为 agent harness，"Hermes"确有真实对应物（Nous Research 的 Hermes Agent），但它**不是 CLI 编码 agent**。本章若提及，应注明它是"通用自主 agent 框架"，并提醒「Hermes」一词在 LLM/编译器/消息库等语境下的常见歧义。

### 一句话汇总

| 用户用词 | 真实对应工具 | 核实链接 | 是 CLI 编码 agent 吗 |
|---|---|---|---|
| "openclaw" | OpenClaw | github.com/openclaw/openclaw | 否——自托管多渠道个人 AI 助手 |
| "hermes" | Hermes Agent（Nous Research） | github.com/NousResearch/hermes-agent | 否——通用自我改进自主 agent；且「Hermes」极易与模型/编译器/消息库撞名 |

> 二者均为真实可查项目，但都不属于本章聚焦的"CLI 编码 agent"。建议本章要么不列入主对比表，要么加括注澄清其真实功能。

---

## (c) 来源表（均已 WebFetch，日期 2026-06-23）

| 工具 / 名字 | 来源 URL | 状态 |
|---|---|---|
| Codex CLI | https://github.com/openai/codex | 已核实 confirmed |
| Gemini CLI | https://github.com/google-gemini/gemini-cli | 已核实 confirmed |
| Goose | https://github.com/block/goose → 重定向至 https://github.com/aaif-goose/goose | 已核实 confirmed（仓库已迁 AAIF/Linux Foundation） |
| Aider | https://github.com/Aider-AI/aider ；docs https://aider.chat | 已核实 confirmed |
| OpenCode（主流） | https://opencode.ai/ → https://github.com/anomalyco/opencode（旧家 https://github.com/sst/opencode） | 已核实 confirmed |
| OpenCode（同名易混的另一项目） | https://github.com/opencode-ai/opencode | 已核实存在，但非主流 OpenCode，勿混淆 |
| openclaw | https://github.com/openclaw/openclaw | 已核实 confirmed——非 CLI 编码 agent |
| hermes | https://github.com/NousResearch/hermes-agent | 已核实 confirmed——非 CLI 编码 agent |

---

## 小结 + 一句话回顾

- **小结**：Codex CLI / Gemini CLI / Goose / Aider / OpenCode 都是当前主流 CLI agent，与 Claude Code 内核相通，差别集中在提供方、模型锁定、免费额度、实现语言与定位侧重。"openclaw"与"hermes"虽各有真实同名项目，但都不是 CLI 编码 agent，须澄清而非并列。
- **一句话回顾**：底层范式一通百通——认清"LLM + 工具 + 终端循环"这个共同骨架，换个 harness 也能立刻上手；遇到撞名的工具，先确认它到底属于哪一类，再决定要不要并排比较。
