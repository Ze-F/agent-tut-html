# CLAUDE.md — 项目说明（给未来继续 work on 这套笔记的 Claude / 我们）

## 这是什么
一套**中文为主、穿插英文术语**的静态 HTML 教学笔记，教一位**非技术的高中生**从「LLM」走到「agent」，并真正把 Claude Code 用进学习/生活。受众是作者的弟弟：17 岁、新加坡公教中学（CHS）全奖、明年考 O-level、用 macOS、几乎没碰过命令行、兴趣是机械工程（mechanical engineering）。

## 上线状态
- **仓库**：https://github.com/Ze-F/agent-tut-html （默认分支 `main`）
- **线上**：https://ze-f.github.io/agent-tut-html/ （GitHub Pages，源 `main` `/(root)`）
- **重新部署**：往 `main` push 即可，Pages 会自动重新构建（约 1 分钟）。`index.html` 在仓库根 → Pages `/(root)` 直接服务它。

## 核心铁律：研究严谨性（改内容前必读）
**任何命令、版本号、定价、安装方式、工具真实名称、网页端功能名，一律不得凭记忆写。** 落笔前必须用 WebFetch 打开一手官方页核实（① 官方文档 → ② 官方 GitHub/release → ③ 权威二手）。这些工具迭代极快，凭记忆必出过时/事实错误。
- 每条关键事实落进 `docs/research/NN-*.md`，标：来源 URL、是否已 WebFetch、查证日期。
- 无法核实的，标「未核实」并以稳妥措辞呈现，**绝不臆造**（尤其不要编造定价档位/学生折扣/某概念的归属人）。
- 正文里出现的每个事实，都应能在对应 research 笔记里找到来源。

## 贯穿全篇的脊柱（保持一致，别漂移）
- **四步闭环心法**：`交代清楚 context → 产出 → eval 验收 → 修正`（全书主线）。
- **比喻**：把 AI 当「超聪明、但对你一无所知的实习生」。
- **界面三层进阶模型**：① claude.ai 网页/App（用完即走）→ ② Claude Cowork（桌面 App，零 terminal，碰本地文件）→ ③ Claude Code CLI（完全掌控/可编程/可发布）。**不要退回「网页 vs CLI」二元。**
- **三条主线示例**（措辞固定）：① 课堂笔记 → 网页（HTML）→ 发布到 GitHub Pages；② 第二大脑（Obsidian + Claude）；③ 机械工程兴趣拓展。
- **重要事实核实结论**（已查，别推翻）：「second brain」是 Tiago Forte 的术语，**不是 Karpathy**；Karpathy 的相关概念叫「LLM Wiki」。Claude Cowork 是真实产品（桌面 agent，付费档）。「openclaw / hermes」是真实项目但**不是**命令行编程 agent。

## 命名 Canon（跨章必须一致）
- 课堂笔记 workspace：`~/study/physics-notes/`；原始笔记 `raw/2026-week3.md`；HTML 产出 `site/index.html`。
- 发布：仓库名 `physics-notes`，**从 `site/` 子目录推送**（让 `index.html` 落在仓库根，配 Pages `/(root)`），地址 `https://<用户名>.github.io/physics-notes/`。
- 第二大脑库：`~/brain/`（`~/brain/physics/`、`~/brain/mechanical/`）。
- 学科载体用 Physics（与机械兴趣呼应）。

## 文件结构
- `index.html` — 单页站点，每章一个 `<section id="chN">`（N=0..9）。10 章见侧栏目录。
- `styles.css` — 全部样式 + 配色变量。**深色模式**：`:root` 是浅色；深色值在 `@media (prefers-color-scheme: dark)`（系统默认）和 `:root[data-theme="dark"]`（手动切换）两处（两块要同步改）。颜色一律走 CSS 变量，**inline style 里别再写死 #hex 背景**——用 `var(--panel)` / `var(--link-bg)` 等。
- `app.js` — 侧栏 scroll-spy、移动端导航开合、**主题切换**（默认跟随系统；手动选择存 localStorage 并优先；`<head>` 里有防闪烁的内联脚本）。
- `tools/check.mjs` — 无依赖结构校验（开发期跑，不属于产物）。
- `docs/research/00..09-*.md` — 每章的带来源事实笔记（**改正文前先更新/核对这里**）。
- `docs/superpowers/specs/` 与 `plans/` — 设计 spec 与实现计划（背景与决策记录）。

## 固定教学元素 & 文风
- 每章：章首 `<p class="why">为什么要学这个…</p>`；结尾 `box-summary` 小结 + 一句话回顾。
- 教学盒（class 固定，`check.mjs` 有白名单）：`box box-do`（🙌 跟我做）、`box box-warn`（⚠️ 注意）、`box box-core`（🧠 心法回扣）、`box box-summary`（小结）。
- 术语首次出现写「中文（English）」，`<span class="term">`。命令用 `<pre><code>` / `<code>`。
- 语气：第二人称「你」，朋友带朋友，短句，每个新概念配 1 个生活化类比。不要 emoji 滥用（盒子标题的固定 emoji 除外）。
- 纯静态：不引入构建工具/包管理/外链脚本/字体；离线可用。命令只针对 macOS + zsh。

## 改完怎么验证（务必跑）
```bash
node tools/check.mjs                    # 结构：目录↔章节一致、标签闭合、box class 合法
MIN_CHARS=200 node tools/check.mjs      # 所有章节非空
# 改单章时：ONLY=chN MIN_CHARS=200 node tools/check.mjs
```
机器校验过后，**人要在浏览器里肉眼过一遍**（渲染、深/浅色、scroll-spy、窄屏 ☰ 目录）——agent 看不到渲染结果。

## 工作流（加/改一章时）
1. 先在 `docs/research/NN-*.md` 把要用的事实核实清楚（WebFetch 官方页）。
2. 再改 `index.html` 对应 `<section>`，复用既有 class 组件，命名照 Canon、文风照上文。
3. 跑校验 + 人肉眼过。
4. commit；push `main` 触发 Pages 重新部署。
