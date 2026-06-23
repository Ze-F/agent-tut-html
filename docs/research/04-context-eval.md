# 第4章 研究笔记：把心法用熟 — Context & Control 功能核实

> 研究者：Claude Sonnet 4.6  
> 核实日期：2026-06-23  
> 主要来源：code.claude.com 官方文档（已 WebFetch）

---

## 1. CLAUDE.md — 项目记忆 / 行为指令

### 核实结论：已确认 ✅

**是什么：**  
CLAUDE.md 是你用 Markdown 写给 Claude 的"持久指令文件"。每次会话开始时，Claude 自动把它读入上下文（context window）。官方原话：

> "CLAUDE.md files are markdown files that give Claude persistent instructions for a project, your personal workflow, or your entire organization. **You write these files in plain text; Claude reads them at the start of every session.**"

**为什么重要：**  
Claude Code 每次开新会话都是全新上下文，不记得上次说了什么。CLAUDE.md 是跨会话保持一致性的核心机制。

**放在哪里（优先级从低到高）：**

| 范围 | 位置 | 适合内容 |
|------|------|---------|
| 机构策略 | `/Library/Application Support/ClaudeCode/CLAUDE.md`（macOS） | 公司代码规范，不可被用户覆盖 |
| 个人全局 | `~/.claude/CLAUDE.md` | 你的个人偏好，所有项目通用 |
| 项目共享 | `./CLAUDE.md` 或 `./.claude/CLAUDE.md` | 团队共享的项目规则（commit 进 git） |
| 个人本地 | `./CLAUDE.local.md` | 私人项目偏好，加入 .gitignore |

**关键行为细节：**
- CLAUDE.md 是 context，不是强制配置。Claude 会尽力遵守，但不保证 100%。官方说："Claude treats them as context, not enforced configuration."
- 官方建议每个文件 **控制在 200 行以内**，过长会降低遵守率。
- 可以用 `/init` 命令让 Claude 自动分析项目生成 CLAUDE.md 草稿。
- 用 `/memory` 命令查看当前会话加载了哪些 CLAUDE.md 文件。

**什么内容适合写进 CLAUDE.md：**
- 构建和测试命令（如 `npm run dev`、`pnpm test`）
- 编码规范（"使用 2 空格缩进"而不是"格式化好"）
- 项目架构说明
- "永远不要做 X"的规则

**什么不适合：**
- 一次性任务的指令（放到对话里说即可）
- 需要强制执行的安全边界（用 hooks 或 deny rules）

**与 auto memory 的区别：**

| | CLAUDE.md | Auto memory (MEMORY.md) |
|--|-----------|------------------------|
| 谁写 | 你 | Claude 自动写 |
| 内容 | 规则和指令 | Claude 学到的规律和经验 |
| 加载 | 每次会话完整加载 | 前 200 行或 25KB |

**来源：** https://code.claude.com/docs/en/memory  
**已 WebFetch：** 是  
**日期：** 2026-06-23

---

## 2. 权限模式（Permission Modes）

### 核实结论：已确认，共 6 个模式 ✅

**官方来源：** https://code.claude.com/docs/en/permission-modes  
**已 WebFetch：** 是  
**日期：** 2026-06-23

### 6 个模式完整列表（官方名称）：

| 模式名 | 中文说明 | 不需要确认就能执行的操作 | 适合场景 |
|--------|---------|----------------------|---------|
| `default` | 默认模式 | 只有读操作 | 入门、敏感工作 |
| `acceptEdits` | 自动接受编辑 | 读 + 文件编辑 + 常见文件系统命令（mkdir/touch/mv/cp 等） | 正在迭代代码时减少打断 |
| `plan` | 计划模式 | 只有读操作（但不会写文件） | 在修改代码前先探索、规划 |
| `auto` | 自动模式 | 几乎一切（有后台安全检查） | 长任务、减少授权疲劳 |
| `dontAsk` | 拒绝未授权 | 只有预先在 allow 规则里设定的操作 | CI/CD、受限脚本环境 |
| `bypassPermissions` | 跳过所有检查 | 一切（包括受保护路径） | 仅限隔离容器/VM |

### 如何切换（CLI）：

- **会话中按 `Shift+Tab`** 循环切换：`default` → `acceptEdits` → `plan`
  - `auto` 模式满足条件时出现在循环中
  - `bypassPermissions` 只在用特定启动参数时出现
- **启动时指定：** `claude --permission-mode plan`
- **设为默认：** 在 `.claude/settings.json` 里设 `"permissions": {"defaultMode": "acceptEdits"}`
- **会话中切换：** `/permissions` 命令查看和管理权限规则

### 重要说明：
- 所有模式（除 `bypassPermissions`）下，对受保护路径（`.git`、`.claude`、`~/.zshrc` 等）的写操作都会被询问
- `auto` 模式需要 Claude Code v2.1.83+，且需特定模型（Claude Opus 4.6/Sonnet 4.6 及以上）

---

## 3. 计划模式（Plan Mode）

### 核实结论：已确认 ✅

**来源：** https://code.claude.com/docs/en/permission-modes（plan mode 章节）  
**已 WebFetch：** 是  
**日期：** 2026-06-23

**官方定义：**

> "Plan mode tells Claude to research and propose changes without making them. Claude reads files, runs shell commands to explore, and writes a plan, **but does not edit your source**."

**如何进入计划模式：**
1. 按 `Shift+Tab` 循环到 plan
2. 输入 `/plan` 命令（可带说明：`/plan fix the auth bug`）
3. 启动时：`claude --permission-mode plan`

**计划完成后的选项（官方）：**
- Approve and start in auto mode（批准，进入自动模式执行）
- Approve and accept edits（批准，进入 acceptEdits 模式执行）
- Approve and review each edit manually（批准，逐一确认每个改动）
- Keep planning with feedback（继续规划）
- Refine with Ultraplan（在浏览器中深度规划）

**退出计划模式：** 再按一次 `Shift+Tab`

**为什么有用：**  
大改动（重构、数据库迁移、auth 系统）先让 Claude 只读探索并列计划，你审核计划后再执行，避免 Claude 中途做了你不想要的事。

---

## 4. 斜杠命令（Slash Commands）

### 核实结论：已确认，命令列表来自官方 ✅

**来源：** https://code.claude.com/docs/en/commands  
**已 WebFetch：** 是  
**日期：** 2026-06-23

**什么是斜杠命令：**  
在对话输入框最前面输入 `/` 触发的快捷命令。官方说明：

> "Commands control Claude Code from inside a session. They provide a quick way to switch models, manage permissions, clear context, run a workflow, and more."

**用法：** 在消息开头输入 `/` 显示所有命令；输入 `/关键字` 过滤。

### 关键命令（按场景分类）：

**项目初始化（第一次用这个项目时）：**
| 命令 | 作用 |
|------|------|
| `/init` | 自动分析项目，生成 CLAUDE.md 草稿 |
| `/memory` | 查看和编辑所有 CLAUDE.md 及 auto memory 文件 |
| `/permissions` | 查看并管理工具权限规则 |

**任务进行中：**
| 命令 | 作用 |
|------|------|
| `/plan [说明]` | 进入计划模式；可附带任务说明 |
| `/context` | 可视化当前 context 占用情况 |
| `/compact [指示]` | 压缩对话历史，释放 context 空间 |
| `/btw <问题>` | 问一个"题外话"，不污染主对话历史 |
| `/model` | 切换 AI 模型 |
| `/effort` | 调整模型思考力度 |

**完成/收尾：**
| 命令 | 作用 |
|------|------|
| `/diff` | 查看所有未提交改动的 diff |
| `/code-review` | 对当前 diff 做代码审查（可加 `--fix` 自动修复） |
| `/clear [名字]` | 清空上下文开新对话（旧对话保存可恢复） |
| `/resume` | 恢复之前的对话 |

**调试/修复：**
| 命令 | 作用 |
|------|------|
| `/rewind` | 回滚代码和对话到之前的检查点 |
| `/doctor` | 诊断 Claude Code 安装问题 |

**自定义命令：**  
在 `.claude/commands/` 目录下放 Markdown 文件，可创建自己的斜杠命令（称为 skills）。

---

## 5. 上下文管理 / 长任务策略

### 核实结论：已确认 ✅

**来源：** https://code.claude.com/docs/en/sessions，https://code.claude.com/docs/en/memory（compaction 章节）  
**已 WebFetch：** 是  
**日期：** 2026-06-23

### 三个核心命令：

| 命令 | 效果 |
|------|------|
| `/clear` | 清空上下文，开新会话（旧对话保存，可用 `/resume` 恢复） |
| `/compact [指示]` | 把对话历史压缩成摘要，释放空间，继续同一会话 |
| `/context` | 显示当前 context 使用情况（类似进度条） |

### /compact 压缩后什么被保留：

官方从 memory 文档提炼的关键点：

> "Project-root CLAUDE.md **survives compaction**: after /compact, Claude re-reads it from disk and re-injects it into the session."

保留的内容：
- 项目根目录的 CLAUDE.md（重新从磁盘加载）
- Auto memory（MEMORY.md 的前 200 行/25KB）
- 系统提示（system prompt）
- MCP 工具列表

**不保留（会丢失）：**
- 子目录的嵌套 CLAUDE.md（下次读到那个目录的文件时才重新加载）
- 只在对话中说过的指令（没写入 CLAUDE.md 的）
- 详细的工具输出、中间推理过程

### /clear vs /compact 该用哪个：

- **用 `/clear`：** 完全换新任务，不需要之前的上下文
- **用 `/compact`：** 同一个长任务，context 快满了，但还需要继续工作的关键信息

### 长任务最佳实践（官方 sessions 文档）：

把重要指令和约束写进 CLAUDE.md，而不是只在对话里说——因为对话内容在 `/compact` 后会被压缩，但 CLAUDE.md 会被重新加载。

**context 占用警告：**  
当 context 接近上限时，Claude Code 会提示可以运行 `/compact`。

---

## 来源汇总表

| 主题 | 来源 URL | 已 WebFetch | 日期 | 置信度 |
|------|---------|------------|------|--------|
| CLAUDE.md 机制 | https://code.claude.com/docs/en/memory | 是 | 2026-06-23 | 高（直接 WebFetch 原文） |
| 权限模式（6个） | https://code.claude.com/docs/en/permission-modes | 是 | 2026-06-23 | 高（直接 WebFetch 原文） |
| 权限模式补充 | https://code.claude.com/docs/en/permissions | 是 | 2026-06-23 | 高（直接 WebFetch 原文） |
| 斜杠命令列表 | https://code.claude.com/docs/en/commands | 是 | 2026-06-23 | 高（直接 WebFetch 原文，完整命令表） |
| 计划模式 | https://code.claude.com/docs/en/permission-modes | 是 | 2026-06-23 | 高（同权限模式页面） |
| 上下文管理 | https://code.claude.com/docs/en/sessions | 是 | 2026-06-23 | 高（直接 WebFetch 原文） |
| compaction 细节 | https://code.claude.com/docs/en/memory（troubleshoot 章节） | 是 | 2026-06-23 | 高（来自 CLAUDE.md 文档页） |

---

## 注意事项 / 写章时需标注的不确定点

1. **`auto` 模式**：官方标注为"research preview"，功能随版本更新，写章时宜轻描，以 `default`/`acceptEdits`/`plan` 为主。
2. **模式数量**：官方列出 6 个模式，但日常 `Shift+Tab` 只循环 3 个（`default`、`acceptEdits`、`plan`）；其余需特殊启用。写章时需说明这个区别，不然读者困惑。
3. **CLAUDE.md 是"建议"不是"强制"**：官方明确说是 context 而非 enforced configuration，若要强制执行需用 hooks——这是很多用户的误解，值得在章中专门提一下。
4. **上下文窗口交互式页面**：https://code.claude.com/docs/en/context-window 是一个 React 交互页，WebFetch 得到的是 JSX 源码，无法直接提取文本内容；上面的 compaction 信息来自 memory 文档页的 troubleshoot 章节和 sessions 文档页，已 WebFetch 确认。
