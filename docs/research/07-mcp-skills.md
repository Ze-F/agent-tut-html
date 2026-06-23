# Research Notes: Chapter 7 · MCP 与 Skills

查证日期：2026-06-23

---

## 1. MCP（Model Context Protocol）

**来源 URL：** https://modelcontextprotocol.io/introduction
**已 WebFetch：** 是

**官方定义（精确引用）：**
> "MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."

**官方类比（精确引用）：**
> "Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect electronic devices, MCP provides a standardized way to connect AI applications to external systems."

**官方定位补充：** MCP 让 AI 应用能连接数据来源（如本地文件、数据库）、工具（如搜索引擎）和工作流（如专项提示词）。属于开放标准，Claude、ChatGPT、VSCode Copilot、Cursor 等均支持。

**教学用中文核心句（来自以上官方内容的意译）：** MCP 是一套开放标准，作用是让 AI 连上外部工具和数据——官方比喻：它是 AI 的 USB-C 接口，统一了"AI 插外部系统"这件事的规格。

---

## 2. Skills（Agent Skills）

**来源 URL：** https://code.claude.com/docs/en/skills
**已 WebFetch：** 是（原 URL https://docs.anthropic.com/en/docs/claude-code/skills 重定向到此）

**官方定义（精确引用）：**
> "Skills extend what Claude can do. Create a `SKILL.md` file with instructions, and Claude adds it to its toolkit. Claude uses skills when relevant, or you can invoke one directly with `/skill-name`."

**官方背景说明（精确引用）：**
> "Create a skill when you keep pasting the same instructions, checklist, or multi-step procedure into chat, or when a section of CLAUDE.md has grown into a procedure rather than a fact. Unlike CLAUDE.md content, a skill's body loads only when it's used, so long reference material costs almost nothing until you need it."

**标准归属（精确引用）：**
> "Claude Code skills follow the [Agent Skills](https://agentskills.io) open standard, which works across multiple AI tools."

**教学用核心句：** Skills 是把一套重复用的指令或流程打包成一个"专长"——写好放在 `.claude/skills/` 里，Claude 在需要时自动调用，或者你用 `/技能名` 直接调。

---

## 3. Subagents（子智能体）

**来源 URL：** https://code.claude.com/docs/en/sub-agents
**已 WebFetch：** 是（原 URL https://docs.anthropic.com/en/docs/claude-code/sub-agents 重定向到此）

**官方定义（精确引用）：**
> "Subagents are specialized AI assistants that handle specific types of tasks. Use one when a side task would flood your main conversation with search results, logs, or file contents you won't reference again: the subagent does that work in its own context and returns only the summary."

**教学用核心句：** Subagents（子智能体）是在自己独立的上下文窗口里跑单项任务、只把结果汇报给主对话的专属助手。

---

## 4. Hooks（钩子）

**来源 URL：** https://code.claude.com/docs/en/hooks
**已 WebFetch：** 是（原 URL https://docs.anthropic.com/en/docs/claude-code/hooks 重定向到此）

**官方定义（精确引用）：**
> "Hooks are user-defined shell commands, HTTP endpoints, or LLM prompts that execute automatically at specific points in Claude Code's lifecycle."

**教学用核心句：** Hooks（钩子）是你写好、在 Claude Code 运行的特定节点自动触发的脚本——比如每次改完文件自动跑一遍格式检查。

---

## 总结与来源一览

| 概念 | 来源 URL | 已 WebFetch | 备注 |
|------|----------|-------------|------|
| MCP 定义与 USB-C 类比 | https://modelcontextprotocol.io/introduction | 是 | 官方首页，精确引用 |
| Skills 定义 | https://code.claude.com/docs/en/skills | 是 | 经 301 重定向 |
| Subagents 定义 | https://code.claude.com/docs/en/sub-agents | 是 | 经 301 重定向 |
| Hooks 定义 | https://code.claude.com/docs/en/hooks | 是 | 经 301 重定向 |

所有关键概念均已 WebFetch 官方页面确认。无需标注"未核实"。
