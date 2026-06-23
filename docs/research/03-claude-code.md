# Research Notes: Ch3 · 上手 Claude Code

查证日期: 2026-06-23

---

## 1. Claude Code 安装方式与前置条件

### 1a. 推荐安装方式（Native Install）

**来源:** https://code.claude.com/docs/en/getting-started（原 docs.anthropic.com 301 重定向到此）  
已 WebFetch: 是  
查证日期: 2026-06-23

**macOS / Linux 安装命令（原文 verbatim）:**
```
curl -fsSL https://claude.ai/install.sh | bash
```

**Homebrew 备选:**
```
brew install --cask claude-code
```

**注意 Homebrew:** 不会自动更新，需手动 `brew upgrade claude-code`。Native Install 会自动后台更新。

### 1b. 系统要求（System Requirements）

**来源:** https://code.claude.com/docs/en/getting-started  
已 WebFetch: 是  
官方引用（verbatim）:
- 操作系统：macOS 13.0+；Windows 10 1809+ 或 Windows Server 2019+；Ubuntu 20.04+；Debian 10+；Alpine Linux 3.19+
- 硬件：4 GB+ RAM，x64 或 ARM64 处理器
- 网络：需要互联网连接
- Shell：Bash、Zsh、PowerShell 或 CMD

**关于 Node.js:** Native Install（curl 方式）**不需要** Node.js。npm 安装方式（`npm install -g @anthropic-ai/claude-code`）需要 Node.js 18 或以上（官方原文："The package requires Node.js 18 or later"）。本章对 macOS 新手只推荐 Native Install，不涉及 npm 方式。

### 1c. 验证安装

```
claude --version
```

更详细诊断：
```
claude doctor
```

---

## 2. 账号 / 登录 / 认证方式

**来源:** https://code.claude.com/docs/en/quickstart  
已 WebFetch: 是  
查证日期: 2026-06-23

官方引用（verbatim）:
> "Start an interactive session with the `claude` command and you'll be prompted to log in on first use"

```
claude
```

首次运行后按浏览器提示完成认证。之后在会话内用 `/login` 可切换账号。

认证支持的账号类型（官方原文）:
- "Claude Pro, Max, Team, or Enterprise (recommended)"
- "Claude Console (API access with pre-paid credits)"
- "Amazon Bedrock, Google Vertex AI, or Microsoft Foundry (enterprise cloud providers)"

> "Once logged in, your credentials are stored and you won't need to log in again."

---

## 3. 成本 / 订阅档位 / Claude Code 访问权限

**来源:** https://claude.com/pricing（原 anthropic.com/pricing 301 重定向到此）  
已 WebFetch: 是  
查证日期: 2026-06-23

### 3a. 各档位与 Claude Code 访问权限

| 档位 | 月费 | Claude Code 可用 |
|------|------|-----------------|
| Free | $0 | **不可用**（官网明确仅 Pro+ 列出 Claude Code）|
| Pro | $17/月（年付）/ $20/月（月付）| **可用**（"Includes Claude Code"）|
| Max | 从 $100/月起 | **可用**（Pro 的升级版，包含所有 Pro 功能）|
| Team | 标准席位 $20/座/月（年付）；高级席位 $100/座/月（年付）| **可用**（"Includes Claude Code and Claude Cowork"）|
| Enterprise | 按使用量计费（$20/座 + API 用量） | **可用** |

官方引用（Pro 档，verbatim）:"Includes Claude Code"  
官方引用（Team 档，verbatim）:"Includes Claude Code and Claude Cowork"

**来源二次确认:** https://code.claude.com/docs/en/getting-started  
已 WebFetch: 是  
引用: "Claude Code requires a Pro, Max, Team, Enterprise, or Console account. The free Claude.ai plan does not include Claude Code access."

### 3b. API 计费（Console / Bedrock / Vertex）

Console 账号（console.anthropic.com）：预付积分，按 token 用量计费，适合有技术背景且用量波动大的情况。

### 3c. 学生折扣 / 学生专项档位

**查证结论（重要）:** 官方定价页**无学生个人折扣档位**。  
定价页提及一个 "Education plan"——面向**大学机构整体**购买（"Get a comprehensive university-wide plan for an institution, including its students, faculty, and staff"），并非针对个人学生的低价订阅。具体折扣率未在定价页披露，且需机构采购，**不是个人学生可直接购买的档位**。

**教学结论（对本书受众）:** 对学生而言，**最低可行选项是 Pro 档（$17/月年付 或 $20/月月付）**。无任何已核实的个人学生折扣。若仅用 claude.ai 网页（第 1 层）或 Cowork（第 2 层），Pro 档同样覆盖。Claude Code 与 Cowork 同属 Pro+ 档权益，两者共享订阅，不需额外付费。

---

## 4. Cowork 与 Claude Code 的付费关系

**来源:** 01-interfaces.md（已核实于 2026-06-23）  
Cowork 与 Claude Code 均属 Pro / Max / Team / Enterprise 订阅权益，同一个付费订阅同时覆盖两者。  
官方原文（Team 档）："Includes Claude Code and Claude Cowork"

---

## 5. "Harness"（工作台）概念 — 官方表述

**来源:** https://code.claude.com/docs/en/how-claude-code-works  
已 WebFetch: 是  
查证日期: 2026-06-23

**官方 verbatim 引用（关键）:**
> "Claude Code serves as the **agentic harness** around Claude: it provides the tools, context management, and execution environment that turn a language model into a capable coding agent."

"harness"（工作台 / 套具）是官方正式用词。类比：模型是大脑，harness 是把大脑接到工具上、让它真正能动手的框架。

---

## 6. 官方对 Claude Code 的整体定位

**来源:** https://code.claude.com/docs/en/how-claude-code-works（已 WebFetch）  
官方引用: "Claude Code is an agentic assistant that runs in your terminal. While it excels at coding, it can help with anything you can do from the command line: writing docs, running builds, searching files, researching topics, and more."

**Agentic loop 三阶段（官方原文）:**
> "When you give Claude a task, it works through three phases: gather context, take action, and verify results."

---

## 7. 一手来源汇总

| 关键事实 | 来源 URL | 已 WebFetch | 查证日期 |
|---------|---------|------------|---------|
| macOS 安装命令 `curl -fsSL https://claude.ai/install.sh \| bash` | code.claude.com/docs/en/getting-started | 是 | 2026-06-23 |
| Native Install 无需 Node.js；npm 方式需 Node 18+ | code.claude.com/docs/en/getting-started | 是 | 2026-06-23 |
| 系统要求：macOS 13.0+，4GB RAM | code.claude.com/docs/en/getting-started | 是 | 2026-06-23 |
| 首次运行 `claude` 触发浏览器登录 | code.claude.com/docs/en/quickstart | 是 | 2026-06-23 |
| Free 档不含 Claude Code；Pro+ 含 | claude.com/pricing + code.claude.com/docs/en/getting-started | 是 | 2026-06-23 |
| Pro 定价 $17/月（年付）/ $20/月 | claude.com/pricing | 是 | 2026-06-23 |
| 无个人学生折扣档位 | claude.com/pricing | 是 | 2026-06-23 |
| Education plan = 机构整体方案，非个人 | claude.com/pricing | 是 | 2026-06-23 |
| "agentic harness" 官方用词 | code.claude.com/docs/en/how-claude-code-works | 是 | 2026-06-23 |
| Cowork 与 Claude Code 同一 agentic 架构 | support.claude.com/13345190（见 01-interfaces.md） | 是 | 2026-06-23 |
