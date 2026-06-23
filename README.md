# 从 LLM 到 Agent · 给弟弟的上手笔记

这是哥哥给弟弟写的一份 LLM→Agent 上手笔记，共 10 章（Ch0–Ch9）。目标：让一个没用过命令行的高中生，学会用 Claude Code 把课堂笔记整理成 HTML 网页、发布到 GitHub Pages，并建立自己的第二大脑知识库。

## 本地打开

不需要任何服务器，直接双击 `index.html`，或在 terminal 里运行：

```
open index.html
```

用浏览器打开后，左侧导航可跳章节，右上角「☰ 目录」按钮在窄屏下开合。

## 部署到 GitHub Pages

详细步骤见 **第 5 章「让产出沉淀」**（页面内 `#ch5`）。简要流程：

1. 在 GitHub 建一个 Public 仓库（例如 `llm-agent-tut`）
2. 把 `index.html`、`styles.css`、`app.js` push 到 `main` 分支
3. 仓库 Settings → Pages → Deploy from a branch → main / (root) → Save
4. 约 10 分钟后访问 `https://<你的用户名>.github.io/<仓库名>/`

## 目录结构

```
index.html          主文件，10 章内容全在这里
styles.css          样式
app.js              scroll-spy 与导航开合
docs/research/      每章的研究笔记（事实来源）
tools/check.mjs     开发期结构校验脚本（非产物）
```

## docs/research/

`docs/research/` 里存放的是每一章的事实核查笔记（`00-mindset.md` 对应 Ch0，以此类推）。每个关键命令、版本号、工具名、定价，都在对应的 `.md` 里标注了来源 URL 和是否已 WebFetch 核实。这是本笔记遵循的「研究铁律」：不凭记忆写事实，写了就要有来源。

## 开发工具

```
node tools/check.mjs              # 基础结构检查
MIN_CHARS=200 node tools/check.mjs  # 含非空校验
```

需要 Node.js；正式阅读只需浏览器，不依赖 Node。
