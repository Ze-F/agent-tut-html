# LLM → Agent 教学笔记 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 产出一套中文为主、穿插英文术语的静态 HTML 教学笔记，以"与 AI 协作的心法（context→eval 闭环）"为主线，带 17 岁非技术受众从理解原理到上手 Claude Code、并把它用进学习/生活。

**Architecture:** 纯静态单页站点——`index.html`（一页内含全部章节）+ `styles.css` + `app.js`（侧栏 scroll-spy 与移动端开合）。无构建工具、无联网依赖，单文件夹用浏览器直接打开。内容生产分两步：每章先产出带来源的 research 笔记（`docs/research/NN-*.md`），再据此写入对应 HTML `<section>`。

**Tech Stack:** 手写 HTML5 + CSS（CSS 变量、Grid/Flex、`@media`）+ 原生 JavaScript（无框架、无依赖）。内容来源经 WebSearch/WebFetch 核实官方文档/仓库。

## Global Constraints

- **研究严谨性铁律：** 任何命令、版本号、定价、安装方式、工具真实名称、网页端功能形态，一律不得凭记忆填写。落笔前必须核实，且**关键事实（命令 / 版本 / 定价 / 安装方式 / 工具官方名 / 网页端功能名）必须用 WebFetch 打开一手官方页面确认，不能只凭 WebSearch 摘要**；优先级 ① 官方文档 → ② 官方 GitHub repo / release notes → ③ 权威二手资料。每条关键事实在 research 笔记里标注来源 URL、是否已 WebFetch、查证日期（today: 2026-06-22）。**无法核实的，标注"未核实"并以稳妥措辞呈现，绝不臆造（尤其不得编造定价档位、学生折扣、或某概念的归属人）。**
- **受众：** 17 岁、新加坡 CHS 全奖、明年 O-level、非技术、用 **macOS（已确认）**、几乎没用过命令行、兴趣是机械工程（mechanical engineering）。语气友好、循序渐进、生活化类比。
- **访问渠道（已确认）：** 受众有/会被配置可用的 Claude 访问，故 Ch3 起的"🙌 跟我做"按**真实可操作**写（非纯演示）。
- **语言：** 中文讲解为主，英文术语穿插（首次出现给中文+英文）。详见下方《写作风格样例》。
- **主线脊柱：** `交代清楚 context → 产出 → eval 验收 → 修正` 闭环；比喻"超聪明但对你一无所知的实习生"。三个主线示例见下方《主线示例 Canon》。
- **固定教学元素（每章按需）：** 开头"为什么要学这个"；🙌 跟我做盒；⚠️ 注意/安全盒；🧠 心法回扣标记；结尾"小结 + 一句话回顾"。
- **纯静态：** 产物（`index.html`/`styles.css`/`app.js`）不引入任何构建工具、包管理、CDN/外链脚本或字体（系统字体栈）；离线可用。（验证用的 `tools/check.mjs` 只在开发期跑、不属于产物，允许用 Node 内置模块。）
- **平台：** 命令示例**只**针对 macOS + zsh（已确认无需兼顾 Windows）。
- **来源平台：** 本笔记教学对象主要用 Claude（Claude Code / claude.ai），其余 harness 仅在第 8 章触类旁通。
- **执行顺序：** Tasks 2–11 均修改同一 `index.html`，**必须串行执行，不可并行**（否则同文件冲突）。

---

## 主线示例 Canon（所有内容任务必读，统一用这套设定，防止跨章漂移）

> 内容任务在写到主线示例时，**一律使用以下固定命名**，不得自创。若执行中发现 canon 需要调整，先改本节、再改正文，保持全篇一致。

- **学科载体：** 用他真实在学的科目 **Physics（物理）** 作为"课堂笔记"示例载体（与机械工程兴趣呼应；如你另有偏好可在执行前替换本行）。
- **主 workspace 文件夹：** `~/study/physics-notes/`
- **当天原始笔记文件：** `~/study/physics-notes/raw/2026-week3.md`
- **整理后的 HTML 产出：** `~/study/physics-notes/site/index.html`
- **GitHub 仓库名 / Pages 地址形态：** repo `physics-notes`，Pages 形态 `https://<他的用户名>.github.io/physics-notes/`（实际地址形态以 Ch5 research 核实为准）。
- **第二大脑库（Obsidian vault / 文件夹）：** `~/brain/`，机械兴趣笔记进 `~/brain/mechanical/`，物理沉淀进 `~/brain/physics/`。
- **示例推进节点：** Ch1 在网页/App 起步整理一段 `2026-week3` 笔记 → Ch3 把它放进 `~/study/physics-notes/` 让 Claude Code 整理 → Ch5 输出 HTML 并发到 Pages → Ch6 沉淀进 `~/brain/`，机械兴趣探索也并入。

## 写作风格样例（所有内容任务必读，统一文风）

- **中英处理：** 中文叙述为主；术语首次出现写成"中文（English）"，如"命令行（command line / terminal）"，之后用中文或公认英文简称均可，但同一术语全篇用法一致。
- **句长与类比：** 短句优先；每个新概念配 1 个生活化类比即可，别堆砌。
- **称呼/语气：** 第二人称"你"，朋友带朋友的口吻，不端着、不说教。
- **标准示范段（照此口径写）：**
  > **为什么要学这个：** 你想让 AI 帮你改一份笔记，但它看不见你电脑里的文件——除非你给它一双"手"。这一章就教你认识这双手：命令行（command line）。把它想成跟电脑直接对话的小窗口，比点来点去更快、也更适合让 AI 接管。
- **数字/事实：** 凡命令、版本、价格、步骤，只能来自本章 research 笔记，不在正文里临场发挥。

---

## File Structure

- `index.html` — 单页站点，含站点骨架 + 每章一个 `<section id="chN">`。
- `styles.css` — 全部样式：排版、侧栏、三类教学盒（跟我做/注意/心法回扣）、代码块、响应式。
- `app.js` — 侧栏 scroll-spy 高亮 + 移动端导航开合 + 回到顶部。
- `docs/research/NN-<chapter>.md` — 每章的带来源事实笔记（先于 HTML 产出）。
- `tools/check.mjs` — 无依赖的结构校验脚本（仅开发期跑，不属于产物）：断言 toc 与 section 一一对应、无空章节、标签大致闭合。
- `README.md` — 如何打开/部署到 GitHub Pages 的简短说明。

每章内容任务（Task 2–11）只新增/修改 `index.html` 中对应的一个 `<section>` 与一份 research 笔记，互不冲突，便于逐任务 review。

---

## Task 1: 站点骨架 + 视觉设计系统

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `app.js`

**Interfaces:**
- Produces（后续每个内容任务依赖这些固定结构与 class 名）：
  - 每章节点：`<section id="chN" class="chapter"> <h2>…</h2> … </section>`，其中 `N` 为 0–9。
  - 侧栏：`<nav id="toc">` 内每章一个 `<a href="#chN" class="toc-link">`。
  - 教学盒组件（class 名固定，内容任务直接复用）：
    - 跟我做：`<div class="box box-do"><p class="box-title">🙌 跟我做</p> … </div>`
    - 注意/安全：`<div class="box box-warn"><p class="box-title">⚠️ 注意</p> … </div>`
    - 心法回扣：`<div class="box box-core"><p class="box-title">🧠 心法回扣</p> … </div>`
    - 小结：`<div class="box box-summary"><p class="box-title">小结</p> … </div>`
  - 章首"为什么要学这个"：`<p class="why"><strong>为什么要学这个：</strong>…</p>`
  - 命令/代码：``<pre><code>…</code></pre>``；行内命令 `<code>`。
  - 术语首现：`<span class="term">中文（English）</span>`。
  - `app.js` 全局行为：`.toc-link` 对应 section 进入视口时加 `.active`；窄屏下 `#toc` 由 `#nav-toggle` 切换 `.open`。

- [ ] **Step 1: 写 `index.html` 骨架**

包含：`<!doctype html>`、`lang="zh-Hans"`、`<meta charset>`、`<meta name="viewport" content="width=device-width, initial-scale=1">`、`<title>`、链接 `styles.css`；body 结构为左侧 `<nav id="toc">`（含站点标题 + 全部 0–9 章锚点链接 + 一个 `<button id="nav-toggle">`）、右侧 `<main>`（含 10 个空的 `<section id="chN" class="chapter">`，每个只放 `<h2>` 占位标题）；底部 `<script src="app.js" defer>`。章标题用 spec 第 5 节的中文标题。

```html
<!doctype html>
<html lang="zh-Hans">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>从 LLM 到 Agent · 给弟弟的上手笔记</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <button id="nav-toggle" aria-label="目录">☰ 目录</button>
  <nav id="toc">
    <p class="site-title">从 LLM 到 Agent</p>
    <a class="toc-link" href="#ch0">0 · 心法先行</a>
    <a class="toc-link" href="#ch1">1 · 两种界面各管什么</a>
    <a class="toc-link" href="#ch2">2 · terminal 与文件系统</a>
    <a class="toc-link" href="#ch3">3 · 上手 Claude Code</a>
    <a class="toc-link" href="#ch4">4 · 把心法用熟</a>
    <a class="toc-link" href="#ch5">5 · 让产出沉淀</a>
    <a class="toc-link" href="#ch6">6 · 第二大脑</a>
    <a class="toc-link" href="#ch7">7 · MCP 与 Skills</a>
    <a class="toc-link" href="#ch8">8 · 触类旁通：其他 harness</a>
    <a class="toc-link" href="#ch9">9 · 用例画廊</a>
  </nav>
  <main>
    <section id="ch0" class="chapter"><h2>0 · 心法先行</h2></section>
    <section id="ch1" class="chapter"><h2>1 · 两种界面各管什么</h2></section>
    <section id="ch2" class="chapter"><h2>2 · terminal 与文件系统</h2></section>
    <section id="ch3" class="chapter"><h2>3 · 上手 Claude Code</h2></section>
    <section id="ch4" class="chapter"><h2>4 · 把心法用熟</h2></section>
    <section id="ch5" class="chapter"><h2>5 · 让产出沉淀</h2></section>
    <section id="ch6" class="chapter"><h2>6 · 第二大脑</h2></section>
    <section id="ch7" class="chapter"><h2>7 · MCP 与 Skills</h2></section>
    <section id="ch8" class="chapter"><h2>8 · 触类旁通：其他 harness</h2></section>
    <section id="ch9" class="chapter"><h2>9 · 用例画廊</h2></section>
  </main>
  <script src="app.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: 写 `styles.css`**

用 CSS 变量定义配色与间距；系统中文字体栈；左栏固定 + 右栏内容两列布局（Grid）；三类教学盒不同左边框色与底色；代码块等宽字体与浅底；`scroll-behavior: smooth`、`section { scroll-margin-top }` 让锚点不被遮挡；`@media (max-width: 800px)` 下侧栏默认隐藏、`#toc.open` 显示、`#nav-toggle` 显示。

```css
:root{
  --bg:#fcfbf8; --fg:#1f2328; --muted:#5b6168; --rule:#e6e2d8;
  --do:#2e7d52; --do-bg:#eaf6ef; --warn:#b4690e; --warn-bg:#fbf1e3;
  --core:#5b4bbf; --core-bg:#efedfb; --code-bg:#f4f2ec; --link:#1567c8;
  --maxw:760px; --tocw:260px;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0; color:var(--fg); background:var(--bg);
  font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
  font-size:17px; line-height:1.75;
  display:grid; grid-template-columns:var(--tocw) 1fr;
}
#toc{
  position:sticky; top:0; align-self:start; height:100vh; overflow:auto;
  padding:24px 18px; border-right:1px solid var(--rule); background:#faf8f2;
}
.site-title{font-weight:700; margin:0 0 16px; font-size:18px}
.toc-link{display:block; padding:6px 8px; color:var(--muted); text-decoration:none; border-radius:6px; font-size:14px}
.toc-link:hover{background:#efece3; color:var(--fg)}
.toc-link.active{background:#e7eefb; color:var(--link); font-weight:600}
main{max-width:var(--maxw); padding:48px 28px 120px; margin:0 auto}
.chapter{scroll-margin-top:24px; padding-bottom:40px; border-bottom:1px solid var(--rule); margin-bottom:40px}
h2{font-size:26px; margin:8px 0 20px}
h3{font-size:20px; margin:28px 0 10px}
a{color:var(--link)}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace; background:var(--code-bg); padding:2px 5px; border-radius:4px; font-size:.9em}
pre{background:var(--code-bg); padding:14px 16px; border-radius:8px; overflow:auto}
pre code{background:none; padding:0}
.why{color:var(--muted); border-left:3px solid var(--rule); padding-left:12px}
.term{font-weight:600}
.box{border-radius:8px; padding:14px 16px; margin:18px 0; border-left:4px solid}
.box-title{font-weight:700; margin:0 0 8px}
.box-do{background:var(--do-bg); border-color:var(--do)}
.box-warn{background:var(--warn-bg); border-color:var(--warn)}
.box-core{background:var(--core-bg); border-color:var(--core)}
.box-summary{background:#f3f1ea; border-color:var(--muted)}
#nav-toggle{display:none; position:fixed; top:12px; left:12px; z-index:20; padding:8px 12px; border:1px solid var(--rule); border-radius:8px; background:#fff}
@media(max-width:800px){
  body{grid-template-columns:1fr}
  #toc{position:fixed; z-index:15; width:var(--tocw); transform:translateX(-110%); transition:transform .2s}
  #toc.open{transform:none}
  #nav-toggle{display:block}
  main{padding-top:64px}
}
```

- [ ] **Step 3: 写 `app.js`（scroll-spy + 移动端开合）**

```javascript
const links = [...document.querySelectorAll('.toc-link')];
const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.classList.remove('active'));
      map.get(e.target.id)?.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('.chapter').forEach(s => obs.observe(s));

const toc = document.getElementById('toc');
document.getElementById('nav-toggle').addEventListener('click', () => toc.classList.toggle('open'));
toc.addEventListener('click', e => { if (e.target.classList.contains('toc-link')) toc.classList.remove('open'); });
```

- [ ] **Step 4: 写 `tools/check.mjs`（无依赖结构校验，后续每章都靠它机器验收）**

只用 Node 内置能力（读文件 + 正则/字符串）。校验：① toc 里的 `#chN` 与 `<section id="chN">` 集合一一对应；② 没有空章节（每个 section 除 `<h2>` 外要有实际内容，按字符数下限粗判）；③ `<div`/`</div>`、`<section`/`</section>`、`<pre`/`</pre>` 开合计数相等（粗测标签闭合）；④ `box` 盒子用的 class 都在白名单内。任何失败 `process.exit(1)` 并打印具体哪一章。

```javascript
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const errs = [];
const tocIds = [...html.matchAll(/class="toc-link"[^>]*href="#(ch\d+)"/g)].map(m => m[1]);
const secIds = [...html.matchAll(/<section id="(ch\d+)"/g)].map(m => m[1]);
if (tocIds.join(',') !== secIds.join(',')) errs.push(`toc/section 不一致: toc=[${tocIds}] sec=[${secIds}]`);
// 空章节粗判：相邻 section 之间正文 < 120 字符算空（Task 1 阶段允许空，故 MIN 由参数控制）
const MIN = Number(process.env.MIN_CHARS ?? 0);
const blocks = html.split(/<section id="ch\d+"/).slice(1);
blocks.forEach((b, i) => {
  const body = b.slice(0, b.indexOf('</section>')).replace(/<[^>]+>/g, '').trim();
  if (body.length < MIN) errs.push(`ch${i} 正文过短(${body.length}<${MIN})`);
});
for (const tag of ['div', 'section', 'pre']) {
  const open = (html.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
  const close = (html.match(new RegExp(`</${tag}>`, 'g')) || []).length;
  if (open !== close) errs.push(`<${tag}> 开合不等: ${open} vs ${close}`);
}
const allowed = new Set(['box', 'box-do', 'box-warn', 'box-core', 'box-summary', 'box-title']);
for (const m of html.matchAll(/class="(box[^"]*)"/g))
  for (const c of m[1].split(/\s+/)) if (!allowed.has(c)) errs.push(`未知 box class: ${c}`);
if (errs.length) { console.error('CHECK FAIL:\n' + errs.join('\n')); process.exit(1); }
console.log('CHECK OK:', secIds.length, 'chapters');
```

- [ ] **Step 5: 运行结构校验 + 你（人）过目排版**

Run: `node tools/check.mjs`
Expected: 打印 `CHECK OK: 10 chapters`，退出码 0。
然后**需要你本人**在浏览器确认观感（这一步 agent 无法替代）：`open index.html` —— 目录 10 条、点击平滑滚动、滚动时高亮、窗口拉窄到 <800px 出现"☰ 目录"可开合、无控制台报错。

- [ ] **Step 6: 提交**

```bash
git add index.html styles.css app.js tools/check.mjs
git commit -m "feat: scaffold static single-page site + design system + check script"
```

---

## 内容任务通用流程（Task 2–11 每个都遵循）

**开工前必读：** 本计划顶部的《主线示例 Canon》与《写作风格样例》——主线示例命名一律照 Canon，文风一律照样例。

每个内容任务有固定六步，下面各任务只列出**该章专属的 research 清单**与**该章 section 必含要素**，六步模板不再重复展开：

1. **Research：** 按该任务的 research 清单逐条核实，写入 `docs/research/NN-<chapter>.md`。**关键事实（命令/版本/定价/安装/官方工具名/网页端功能名）必须 WebFetch 一手官方页确认**，每条标：来源 URL、是否已 WebFetch、查证日期（today: 2026-06-22）。无法核实的标"未核实"，绝不臆造（尤其定价档位、学生折扣、概念归属人）。
2. **Verify research：** 打开该 md，确认清单每条都有来源或被显式标注未核实，且关键事实均已 WebFetch。
3. **Write HTML：** 据 research 笔记，把内容填入 `index.html` 对应 `<section id="chN">`，复用 Task 1 的 class 组件，落实"章首 why / 类比 / 跟我做 / 注意 / 心法回扣 / 小结"等要素（按该章"必含要素"清单）。命令/版本/定价/工具名只能来自 research 笔记；主线示例命名只能来自 Canon；文风照样例。
4. **机器校验：** 先跑全局结构检查 `node tools/check.mjs`（toc/section 一致、标签闭合、box class 合法）；再跑本章非空检查 `ONLY=chN MIN_CHARS=200 node tools/check.mjs`（把 `chN` 换成本章，如 `ch0`）。两条都要 `CHECK OK: 10 chapters`、退出码 0。失败按提示修。（全局 `MIN_CHARS=200`——要求所有章都非空——留到 Task 12 跑。）
5. **来源对账：** 逐句对照 research 笔记，确认本章正文出现的每个命令/版本/定价/工具名都能在 md 里找到来源；没有凭记忆杜撰的事实。（排版观感留到 Task 12 由你本人统一过目。）
6. **Commit：** `git add docs/research/NN-<chapter>.md index.html && git commit -m "docs(chN): <chapter title>"`。

---

## Task 2: 第 0 章 · 心法先行

**Files:** Create `docs/research/00-mindset.md`；Modify `index.html`（`#ch0`）

**Research 清单：**
- LLM 与 agent 的当前主流定义/区别表述（核实一个权威来源即可，如 Anthropic / 主流文档对 "agent" 的界定）。
- "为什么是现在"的三要素（模型能力、tool use / function calling、长上下文）各找一处可引用来源。
- 当前主流 CLI agent 工具的概览名单（仅取名字与一句话定位，详细留到第 8 章），来自各官方仓库/文档。

**该章 section 必含要素：**
- 章首"为什么要学这个"。
- LLM=大脑 / agent=大脑+手脚 的一句话区别（可用小对照）。
- 核心比喻盒：超聪明但对你一无所知的实习生。
- 心法闭环图解（纯文字/CSS，不引图片）：context → 产出 → eval → 修正。
- 两个坑 + 解药：被牵着走 / AI slop。
- 列出三个主线示例并说明它们会贯穿全篇（🧠 心法回扣首次登场）。
- 小结 + 一句话回顾。

---

## Task 3: 第 1 章 · 两种界面各管什么（网页/App vs CLI）

**Files:** Create `docs/research/01-interfaces.md`；Modify `index.html`（`#ch1`）

**Research 清单（重点核实，名称/形态易变）：**
- claude.ai 网页/桌面 App 当前真实功能名与形态：Deep Research（确认官方名称与是否可用）、Artifacts（实时可视化/交互页面）、文件上传等——以 Anthropic 官方说明为准。
- Claude Code 作为本地 CLI agent 能"碰文件/跑命令"的官方定位表述。
- GitHub / 云盘作为备份的通用做法（无需深入，第 5 章再展开 Pages）。

**该章 section 必含要素：**
- 章首 why。
- 用网页/App 整理一段课堂笔记的"立刻尝甜头"演示（主线示例①起点，无需 terminal）。
- 撞墙转折：产出留不下、碰不到本地文件。
- **决策框架**（用表或两列盒）：网页/App 更优 vs CLI 更优 的场景；本地可视化可用 Python/HTML。
- 一句话原则盒：用完即走→网页；要沉淀/维护/碰文件→本地+CLI+备份。
- 🧠 心法回扣（无论哪种界面，心法一致）。
- 小结 + 一句话回顾。

---

## Task 4: 第 2 章 · terminal 与文件系统

**Files:** Create `docs/research/02-terminal.md`；Modify `index.html`（`#ch2`）

**Research 清单：**
- 逐条核实命令在 macOS/zsh 下的当前行为与常用选项：`pwd ls cd cat mkdir cp mv rm open`（以 macOS man page / 官方为准）。
- `~ . ..` 与绝对/相对路径的标准定义。
- macOS Terminal.app 与 Homebrew 当前安装方式（核实 brew.sh 官方安装命令，不得凭记忆）。

**该章 section 必含要素：**
- 章首 why（为什么 agent 偏爱命令行）。
- 命令行 vs 图形界面的生活化类比。
- 路径与 `~ . ..` 讲解。
- 每个命令一个 🙌 跟我做（命令 + 预期输出），以文件浏览为主。
- ⚠️ 安全盒：`rm` 危险、先看清路径。
- Terminal.app / Homebrew 简介（Homebrew 安装命令来自 research）。
- 小结 + 一句话回顾。

---

## Task 5: 第 3 章 · 上手 Claude Code

**Files:** Create `docs/research/03-claude-code.md`；Modify `index.html`（`#ch3`）

**Research 清单（重点，定价/安装易变）：**
- Claude Code 当前安装方式与前置条件（官方 docs：安装命令、Node 等前置、支持平台）。
- 账号 / 登录 / API key 当前方式。
- **成本**：当前订阅档位与是否包含 Claude Code、API 计费方式，给出**对学生可行的选项**（以官方定价页为准，标查证日期）。
- "harness = 模型的工作台"概念的官方/权威表述。

**该章 section 必含要素：**
- 章首 why。
- harness 概念 + 工作台类比。
- 🙌 跟我做：安装 → 登录 → 进项目目录 → 第一次对话（命令来自 research）。
- ⚠️ 成本/权限注意盒（含学生可行选项）。
- "读→想→动手→再读"循环图解（文字/CSS）。
- 跑通主线示例①第一段：把课堂笔记放进一个 workspace 让它整理。
- 🧠 心法回扣；小结 + 一句话回顾。

---

## Task 6: 第 4 章 · 把心法用熟（灵魂章）

**Files:** Create `docs/research/04-context-eval.md`；Modify `index.html`（`#ch4`）

**Research 清单：**
- `CLAUDE.md` 的当前作用与官方说明（记忆/项目规矩）。
- 权限模式（permission modes）当前选项与含义（官方 docs）。
- 斜杠命令 `/`、计划模式（plan mode）当前形态（官方 docs）。
- 上下文管理/长任务的官方建议（如有）。

**该章 section 必含要素：**
- 章首 why（这是全篇灵魂：交代 context + 做 eval）。
- 怎么喂高质量 context：CLAUDE.md、workspace、把现状/profile/诉求讲清（结合他的 O-level/课程实际）。
- 怎么 eval：review 改动、不照单全收、把验收反馈回喂迭代。
- 权限模式 / 斜杠命令 / 计划模式 / 拆长任务——每个都挂回"怎么交代清楚 / 怎么验收"。
- 多个 🙌 跟我做 + ⚠️ 注意 + 🧠 心法回扣。
- 小结 + 一句话回顾。

---

## Task 7: 第 5 章 · 让产出沉淀（Markdown / HTML / GitHub Pages）

**Files:** Create `docs/research/05-markdown-html-pages.md`；Modify `index.html`（`#ch5`）

**Research 清单：**
- Markdown 基本语法（标准来源，如 CommonMark/GitHub 文档）。
- 为什么 Markdown/HTML 在 AI 工作流里通用（可引一处论述或基于事实自述，不夸大）。
- **新手把代码推上 GitHub 的最简认证路径**（重点核实，这是非技术读者最大的坑）：git 是否预装/如何装、GitHub 账号、以及当前**最省事的认证方式**（核实 `gh`（GitHub CLI）`gh auth login` 流程 vs GitHub Desktop vs 网页直接拖拽上传，三选一给出最适合新手的一条；以官方 docs 为准）。
- **GitHub Pages 当前启用步骤**（官方 docs：建 repo → 推送/上传 → Settings→Pages 启用 → 访问地址形态），逐步核实；地址形态对齐 Canon 的 `physics-notes`。

**该章 section 必含要素：**
- 章首 why。
- Markdown 速览（🙌 跟我做：写一小段 md）。
- 为什么 md/HTML 是 AI 时代通用格式。
- 🙌 跟我做：让 Claude Code 把整理好的笔记输出成 `~/study/physics-notes/site/index.html`。
- ⚠️ 注意盒 + 🙌 跟我做：**先把 GitHub 账号与认证一次配好**（按 research 选定的最简路径），再推送/上传。
- 🙌 跟我做：推上 GitHub `physics-notes` 仓库 → 开 Pages → 访问 `https://<用户名>.github.io/physics-notes/`（步骤来自 research）。
- 走完主线示例①（随时随地复习）。
- 🧠 心法回扣；小结 + 一句话回顾。

---

## Task 8: 第 6 章 · 第二大脑（Obsidian + Claude）

**Files:** Create `docs/research/06-second-brain.md`；Modify `index.html`（`#ch6`）

**Research 清单（重点核实出处）：**
- **Andrej Karpathy 关于"第二大脑 / second brain"或与 AI 共建知识库的原始表述与出处**（核实是他本人、在哪说的；找到原帖/原话再引用，找不到则如实说明"概念广为流传，Karpathy 亦有相关表述"并给可核实来源，绝不杜撰原文）。
- Obsidian 是什么、本地 Markdown 库的基本事实（obsidian.md 官方）。
- Obsidian + Claude/Claude Code 协作的可行做法（基于 Obsidian 库就是本地 md 文件夹这一事实推导，标明哪些是事实、哪些是建议性用法）。

**该章 section 必含要素：**
- 章首 why。
- "第二大脑"概念与 Karpathy 出处（如实标注核实结果；若核实发现"second brain"主要归属他人，照实写、不强行套到 Karpathy 头上）。
- **先讲最小形态**：第二大脑就是 `~/brain/` 一个 md 文件夹，Claude Code 能直接读写——不装任何东西就能开始。
- **Obsidian 作为可选增强层**：在这个文件夹上加双链/图谱/可视化；明确"可选，不装也行"，避免给非技术读者堆安装负担。
- 三个主线示例在此汇流（笔记沉淀 + 机械兴趣探索都进同一个库）。
- 🙌 跟我做：建库 → 让 agent 往里沉淀/检索一条。
- 🧠 心法回扣；小结 + 一句话回顾。

---

## Task 9: 第 7 章 · 扩展能力：MCP 与 Skills（做轻）

**Files:** Create `docs/research/07-mcp-skills.md`；Modify `index.html`（`#ch7`）

**Research 清单：**
- MCP（Model Context Protocol）官方定义与"统一接外部工具/数据"定位（modelcontextprotocol.io / Anthropic 官方）。
- Claude 的 Skills 当前定义与形态（官方 docs）。
- subagents、hooks 一句话定义（官方 docs）。

**该章 section 必含要素：**
- 章首 why。
- MCP = 统一插头类比 + 一句话官方定义。
- Skills = 专长/流程打包 + 一句话定义。
- subagents、hooks 各一句。
- 理念盒：按需添加，别一上来堆一堆。
- 小结 + 一句话回顾。

---

## Task 10: 第 8 章 · 触类旁通：其他 harness（做轻）

**Files:** Create `docs/research/08-other-harnesses.md`；Modify `index.html`（`#ch8`）

**Research 清单（核实真实存在与定位）：**
- 各工具当前定位与提供方，逐一核实官方仓库/文档：Codex CLI（OpenAI）、Gemini CLI（Google）、Goose（Block）、Aider、OpenCode 等当前主流 CLI agent。
- **核实用户提到的 "openclaw" 与 "hermes" 对应的真实工具**：**限定在"CLI agent / agent harness"语境**消歧（"hermes" 极易撞名——模型系列、编译器、消息库等都不是；只认 agent 工具语境）。搜索确认真实名称/项目；若有多个候选，列出候选不硬认；若对不上任何真实 agent 工具，如实标注"未找到对应工具，疑为口误/别名"，不臆造。
- 各工具与 Claude Code 的异同要点（用于对比表）。

**该章 section 必含要素：**
- 章首 why（底层相通，触类旁通）。
- 对比表：工具 / 提供方 / 定位 / 与 Claude Code 异同（仅含已核实工具）。
- openclaw / hermes 的核实结论（如实写）。
- 小结 + 一句话回顾。

---

## Task 11: 第 9 章 · 用例画廊（抛砖引玉）

**Files:** Create `docs/research/09-gallery.md`（仅需核实涉及的具体工具/事实，多为已成熟概念）；Modify `index.html`（`#ch9`）

**Research 清单：**
- 仅对画廊中提到的、需要事实支撑的具体工具或服务做轻核实（其余为场景设想，标明为"设想/进阶想象"）。

**该章 section 必含要素：**
- 章首 why（拓展想象力）。
- 卡片式罗列可迁移场景：counseling（学业/职业/生活）、日程课表、生活问题 research、考试 profile 与针对性复习、机械工程小项目；以及作为"进阶想象"的金融/数据科学 alpha 信号筛选 + 券商数据 + portfolio 建议（明确标注为进阶、非教学重点）。
- 每个场景一句"心法怎么用在这"。
- 全篇收束的一句话回顾。

---

## Task 12: 收尾打磨与发布说明

**Files:** Create `README.md`；Modify `index.html`、`styles.css`（仅微调）

**Interfaces:** Consumes 全部已写章节。

- [ ] **Step 1: 全篇一致性检查（主线示例 Canon 对齐）**

逐章核对：每章有"为什么要学这个"、有结尾小结；三个主线示例在 0/1/3/5/6 章串得上**且命名与《主线示例 Canon》完全一致**（`~/study/physics-notes/`、`~/brain/`、`physics-notes` 仓库等不得各章不一）；🧠 心法回扣标记前后呼应；术语首现有中英；文风符合《写作风格样例》。修正发现的问题。

- [ ] **Step 2: 来源回扫**

逐章打开 `docs/research/NN-*.md`，确认 HTML 里出现的每个命令/版本/定价/工具名都能在对应 research 笔记里找到来源、且关键事实标了已 WebFetch；任何"未核实"项在正文里要么补核实、要么以稳妥措辞呈现。

- [ ] **Step 3: 写 `README.md`**

简短中文说明：这是什么、怎么本地打开（`open index.html`）、怎么部署到 GitHub Pages（指向第 5 章），以及 `docs/` 里 research 笔记的作用。

- [ ] **Step 4: 机器全量校验 + 你（人）通读**

Run: `MIN_CHARS=200 node tools/check.mjs`
Expected: `CHECK OK: 10 chapters`、退出码 0。
然后**需要你本人**通读全篇并确认观感（agent 无法替代）：`open index.html` —— 10 章内容完整、盒子样式正确、scroll-spy 正常、窄屏导航可开合、无控制台报错、无明显排版破损。把你通读发现的问题反馈给执行者修正后再提交。

- [ ] **Step 5: 提交**

```bash
git add README.md index.html styles.css
git commit -m "docs: final polish, source recheck, and README"
```

---

## Self-Review（plan 作者已自检）

- **Spec coverage：** spec 第 4 节脊柱 → Task 2（心法/比喻/闭环/示例引入）+ 贯穿各章；第 5 节 0–9 章 → Task 2–11 一一对应；固定教学元素（第 6 节）→ Task 1 组件 + 各章必含要素 + Task 12 一致性检查；HTML 形式（第 7 节）→ Task 1；两步走工作流（第 8 节）→ 通用流程"先 research 后 HTML"；研究铁律（第 3 节）→ Global Constraints + 每章 research 清单 + Task 12 来源回扫；受众画像 → Global Constraints。无遗漏。
- **Placeholder scan：** 内容任务刻意不预填事实性正文（命令/版本/定价/工具名），这是研究铁律要求、非占位符遗漏；代码型任务（Task 1）给出完整可运行 HTML/CSS/JS。
- **Type/命名一致性：** class 名（`box-do/box-warn/box-core/box-summary/toc-link/why/term`）、`#chN`、`#toc`、`#nav-toggle` 在 Task 1 定义、被各内容任务与 Task 12 一致引用。

## Stress-Test 加固（第二轮，已并入上文）

- **跨章主线漂移** → 新增《主线示例 Canon》固定命名，列为内容任务必读，Task 12 Step 1 校验对齐。
- **`open` 验证 agent 验不了** → 新增 `tools/check.mjs` 机器校验（toc/section 对齐、非空、标签闭合、box class 合法）；肉眼观感明确划为"需你本人"的人工 gate（Task 1 Step 5、Task 12 Step 4）。
- **Ch5 git/GitHub 认证坑** → Task 7 research 清单与必含要素补"新手最简认证路径 + 账号配置"。
- **十章文风漂移** → 新增《写作风格样例》（含标准示范段），列为内容任务必读。
- **研究铁律焊缝** → 关键事实强制 WebFetch 一手页；明令禁止编造定价/学生折扣/概念归属；Karpathy 出处如实核实。
- **同文件串行** → Global Constraints 标注 Tasks 2–11 必须串行。
- **重章/消歧** → Obsidian 降为可选增强层；hermes 限定 agent 语境消歧、撞名不硬认。
