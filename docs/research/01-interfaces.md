# Research Notes: Ch1 · 两种界面各管什么

查证日期: 2026-06-23

---

## 1. Artifacts — 官方名称与功能

**结论:** 官方名称就是 "Artifacts"（无附加定语）。

**来源:** https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them  
已 WebFetch: 是  
引用: "Artifacts allow you to turn ideas into shareable apps, tools, or content—build tools, visualizations, and experiences by simply describing what you need."

支持的内容类型（官方文档）:
- Documents (Markdown or plain text)
- Code snippets
- Single-page HTML websites
- SVG images
- Diagrams and flowcharts
- Interactive React components

**另见:** https://claude.com/product/overview (已 WebFetch)  
引用: "Turn ideas into shareable creations. Build tools, visualizations, and experiences by simply describing what you need."

**结论:** Artifacts 支持实时可视化、互动组件（Interactive React components）、迷你网页（Single-page HTML websites）等。官方用的词是 "interactive" 和 "visualizations"。

---

## 2. Research 功能 — 官方名称

**结论:** 官方名称为 **"Research"**（不是 "Deep Research"）。

**来源:** https://support.claude.com/en/articles/11088861-using-research-on-claude  
已 WebFetch: 是  
引用: "Research is available for users with paid Claude plans (Pro, Max, Team, or Enterprise) using Claude on the web, Claude Desktop, or Claude Mobile."  
引用: "Claude operates agentively, conducting multiple searches that build on each other while determining exactly what to investigate next."

访问方式: 通过聊天界面左下角 "+" 按钮 → "Research" 激活。

**注意:** 社区/第三方文章常用 "Deep Research"，但官方 Anthropic/Claude Help Center 的官方名是 "Research"。本章一律用官方名 "Research"，并注明其性质。

---

## 3. Claude Code 官方定位 — 能碰文件/跑命令

**来源:** https://claude.com/product/claude-code  
已 WebFetch: 是  
官方 tagline 引用: "Claude Code is an agent that reads your codebase, edits files, and runs commands across your terminal, IDE, desktop app, and browser."  
引用: "Claude Code runs locally in your terminal and talks directly to model APIs without requiring a backend server or remote code index. It also asks for permission before making changes to your files or running commands."

同见 Ch0 index.html 已有表述: "an agentic coding tool that reads your codebase, edits files, runs commands"（引自 Anthropic 官方，Ch0 已核实）。

---

## 4. claude.ai 网页/App 定位 — 不碰本地文件

**来源:** https://claude.com/product/overview (已 WebFetch)  
claude.ai 网页/App 不提供读写用户本地文件系统的功能。文件分析限于用户上传的文件（PDFs, Word docs, Excel, images）。  
本地文件能力属于另一产品 Claude Cowork（桌面 App 额外功能）或 Claude Code（CLI）。

**来源:** https://www.anthropic.com/product/claude-cowork (已 WebFetch)  
Claude Cowork 官方说明: "Claude Cowork handles tasks autonomously. Give it a goal and Claude works on your computer, local files, and applications to return a finished deliverable." — 这是桌面端独立产品，不是 claude.ai 基础网页对话。

**教学结论:** 本章将 claude.ai 网页/App 定义为"不能持久碰本地文件"是正确的（相对于 Claude Code CLI 而言）；准确表述为"在对话里上传文件，结果只存在对话里，无法直接修改你硬盘上的文件"。

---

## 5. GitHub / 云盘备份做法

本章不深入展开（第 5 章再详细），仅作为 CLI 工作流的配套提及。无需专项核实，使用通用表述即可。

---

## 汇总：关键名称备查

| 功能 | 官方名称 | 来源 | 已 WebFetch |
|------|---------|------|------------|
| 网络搜索+多步研究 | Research | support.claude.com/11088861 | 是 |
| 交互产出/可视化/迷你页 | Artifacts | support.claude.com/9487310 | 是 |
| 命令行 agent | Claude Code | claude.com/product/claude-code | 是 |
| claude.ai 网页 | Claude (web) | claude.com/product/overview | 是 |
