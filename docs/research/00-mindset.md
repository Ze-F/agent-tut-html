# Research · 第 0 章 心法先行

查证日期（verification date）：**2026-06-23**
方法：WebSearch 定位权威 URL → WebFetch 打开一手官方页确认。优先 Anthropic 官方文档。

---

## 1. LLM 与 agent 的区别（核心定义）

**Claim：** LLM 本身是「大脑」（语言模型，给输入产文字）；agent 是 LLM「在一个循环里自主使用工具、根据环境反馈推进，直到完成任务」——即多出了「手脚」。Anthropic 把 agent 定义为「LLMs autonomously using tools in a loop」，并明确区分 workflow（预定义代码路径编排）与 agent（LLM 动态主导自己的流程和工具使用）。

- **逐字引用（Anthropic, Building Effective Agents）：**
  - Workflows：「systems where LLMs and tools are orchestrated through predefined code paths.」
  - Agents：「systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks.」
  - 「They are typically just LLMs using tools based on environmental feedback in a loop.」
  - agent「require ground truth from the environment at each step (such as tool call results or code execution) to assess its progress.」
- **来源 URL：** https://www.anthropic.com/engineering/building-effective-agents （重定向自 /research/building-effective-agents）
- **是否已 WebFetch：** 已 WebFetch ✅
- 备注：「大脑 / 大脑+手脚」是我为受众做的类比包装，核心事实（tools in a loop / environmental feedback）来自上面逐字引用。chatbot=一次 LLM 调用、agent=循环调用工具直到完成，属业界通行表述（WebSearch 摘要佐证），正文以稳妥措辞呈现。

---

## 2. 「为什么是现在」三要素

### 2a. 模型能力（更强的推理 / agentic 能力）
- **Claim：** 当前旗舰模型主打复杂推理与「long-horizon agentic」工作；Anthropic 现以 Claude Opus 4.8 为最强 Opus 档，定位「complex reasoning, long-horizon agentic coding, and high-autonomy work」。
- **逐字引用：**「start with Claude Opus 4.8 for the most complex tasks. It is Anthropic's most capable Opus-tier model for complex reasoning, long-horizon agentic coding, and high-autonomy work.」
- **来源 URL：** https://platform.claude.com/docs/en/about-claude/models/overview （重定向自 docs.anthropic.com/.../models/overview）
- **是否已 WebFetch：** 已 WebFetch ✅

### 2b. 工具使用 / function calling（让模型「动手」）
- **Claim：** 「工具使用（tool use，又叫 function calling）」让 Claude 调用你定义的或 Anthropic 提供的函数/工具，由模型决定何时调用，再返回结构化调用、由应用或 Anthropic 执行。这是给模型「手脚」的机制。给 agent 工具是「最有效的能力之一」，在 SWE-bench 等基准上加基础工具就有大幅提升。
- **逐字引用：**
  - 「Tool use lets Claude call functions you define or that Anthropic provides. Claude decides when to call a tool based on the user's request and the tool's description, then returns a structured call that your application executes (client tools) or that Anthropic executes (server tools).」
  - 「Tool access is one of the most effective capabilities you can give an agent. On benchmarks like ... SWE-bench ... adding even basic tools produces large gains, often surpassing human expert baselines.」
- **来源 URL：** https://platform.claude.com/docs/en/docs/agents-and-tools/tool-use/overview （重定向自 docs.anthropic.com/.../tool-use/overview）
- **是否已 WebFetch：** 已 WebFetch ✅

### 2c. 长上下文（long context）
- **Claim：** 当前 Claude 模型上下文窗口很大——Opus 4.8 与 Sonnet 4.6 为 **1M tokens**，Haiku 4.5 为 **200k tokens**。窗口越大，越能一次性「读进」整批笔记/整个项目，agent 才能跨多文件工作。
- **逐字引用（Latest models comparison 表）：** Claude Opus 4.8 Context window「1M tokens」；Claude Sonnet 4.6「1M tokens」；Claude Haiku 4.5「200k tokens」。
- **来源 URL：** https://platform.claude.com/docs/en/about-claude/models/overview
- **是否已 WebFetch：** 已 WebFetch ✅
- 备注：正文只说「长上下文 / 大到能装下整批笔记」这一稳妥层面，不在 ch0 硬塞具体 token 数（数字留给后续章节按需引用，避免过时）。

---

## 3. 当前主流 CLI agent 工具概览名单（仅取名字 + 一句话定位，详情留第 8 章）

### 3a. Claude Code（Anthropic）
- **官方定位（逐字）：**「Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Available in your terminal, IDE, desktop app, and browser.」
- **来源 URL：** https://code.claude.com/docs/en/overview （重定向自 docs.anthropic.com/en/docs/claude-code/overview）
- **是否已 WebFetch：** 已 WebFetch ✅

### 3b. Gemini CLI（Google）
- **官方定位（逐字，仓库简介）：**「An open-source AI agent that brings the power of Gemini directly into your terminal.」开源（Apache 2.0）。
- **来源 URL：** https://github.com/google-gemini/gemini-cli ；公告 https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-cli-open-source-ai-agent/
- **是否已 WebFetch：** 未 WebFetch（仅 WebSearch 摘要，含官方仓库简介逐字）。ch0 只列名字+一句话定位，详情/命令留第 8 章再 WebFetch 核实。
- 备注：2026-05-12 有「Gemini CLI 过渡到 Antigravity CLI」的二手报道（未在官方一手页核实），故 ch0 不写过渡细节，仅以「Gemini CLI（Google）」中性列名。

### 3c. Codex CLI（OpenAI）
- **官方定位（逐字，仓库标题）：**「Lightweight coding agent that runs in your terminal.」开源，Rust 实现。
- **来源 URL：** https://github.com/openai/codex ；https://developers.openai.com/codex/cli
- **是否已 WebFetch：** 未 WebFetch（WebSearch 摘要含官方仓库标题逐字）。ch0 仅列名，详情留第 8 章。

> ch0 用法：正文只点「市面上已有 Claude Code、Gemini CLI、Codex CLI 等命令行 agent 工具，本笔记主要用 Claude Code，其余第 8 章触类旁通」，不展开命令/定价（符合 brief：详细留第 8 章）。

---

## 4. 三个主线示例（Canon，来自 content-playbook，非外部事实）

来源：`.superpowers/sdd/content-playbook.md`《主线示例 Canon》。这些是教学设定，不是需外部核实的事实。
1. 课堂笔记 → HTML → GitHub Pages（载体 Physics；`~/study/physics-notes/`，repo `physics-notes`，Pages `https://<用户名>.github.io/physics-notes/`）。
2. 第二大脑（Obsidian vault `~/brain/`，机械兴趣进 `~/brain/mechanical/`，物理进 `~/brain/physics/`）。
3. 机械工程兴趣拓展（并入第二大脑探索）。

---

## 5. 两个坑（教学论点，非外部事实）
- 「被 AI 牵着走」「AI slop（AI 糊弄出来、看着像样但没价值的产物）」是行业常用说法，作为教学告诫呈现，不归属特定人、不引具体定价/数据，无需一手核实。解药=主线闭环（context → 产出 → eval → 修正）+ 你来当验收者。

---

## 小结：本章关键事实全部可溯源
- agent 定义、tool use、long context、Claude Code 定位 → 均已 WebFetch 一手 Anthropic 官方页（2026-06-23）。
- Gemini CLI / Codex CLI → 仅列名+官方仓库一句话定位，标注未 WebFetch，详情留第 8 章。
- 主线示例、两个坑 → 教学设定/通行说法，非需外部核实的事实。
