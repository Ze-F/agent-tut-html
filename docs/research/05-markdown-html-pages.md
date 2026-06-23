# 第 5 章研究笔记：让产出沉淀（Markdown / HTML / GitHub Pages）

研究日期：2026-06-23

---

## 1. Markdown 基本语法

**来源：** [Basic writing and formatting syntax — GitHub Docs](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
**已WebFetch：** 是（2026-06-23）

GitHub 使用的是 GitHub Flavored Markdown（GFM），与 CommonMark 高度兼容。以下为官方文档的逐字示例：

### 标题（Headings）

> "The number of `#` you use will determine the hierarchy level and typeface size of the heading."

```markdown
# A first-level heading
## A second-level heading
### A third-level heading
```

### 粗体（Bold）

```markdown
**This is bold text**
```

### 无序列表（Unordered Lists）

```markdown
- George Washington
* John Adams
+ Thomas Jefferson
```

### 有序列表（Ordered Lists）

```markdown
1. James Madison
2. James Monroe
3. John Quincy Adams
```

### 链接（Links）

```markdown
[GitHub Pages](https://pages.github.com/)
```

### 行内代码（Inline Code）

```markdown
Use `git status` to list all new or modified files that haven't yet been committed.
```

---

## 2. 为什么 Markdown/HTML 是 AI 工作流的通用格式

**来源：** 基于事实推断（非直接引用官方文档；无需 WebFetch）

以下为合理陈述，不夸大：

- **纯文本，AI 可直接读写。** Markdown 文件是 `.md` 文本文件，Claude Code 等工具无需插件即可生成、编辑、搜索。相比之下，Word/PDF 文件需要转换。
- **渲染为 HTML 的管道成熟。** Markdown → HTML 的转换工具（如 Pandoc、marked.js）已标准化，Claude Code 可直接输出 HTML 文件供浏览器打开，无需本地服务器。
- **版本控制友好。** 纯文本文件在 git 中可以 `diff`，追踪每次改动；二进制文件（Word、Keynote）则无法做到。
- **GitHub Pages 原生支持。** GitHub 可将 `.md` 或 `.html` 文件直接发布为网站，学习成本极低。

---

## 3. 新手把代码推上 GitHub 的最简认证路径

### 3a. git 是否预装于 macOS？

**来源：** [Apple Developer Forums — "Is git already installed…"](https://developer.apple.com/forums/thread/672087)；WebFetch 未直接获取该页，但通过 WebSearch 摘要确认（已WebFetch：否，通过 WebSearch 摘要）

**结论（已确认）：**
- macOS 的 `/usr/bin/git` 是一个 shim（占位符），实际指向 Xcode Command Line Tools。
- 在**全新 Mac** 上第一次运行 `git` 时，macOS 会弹出对话框提示安装 Command Line Tools。
- 也可在 Terminal 手动触发：`xcode-select --install`
- 若想要最新版 git，可通过 Homebrew：`brew install git`

**对非技术读者的实用建议：** 在 Terminal 输入 `git --version`，若提示安装则点击「安装」按钮即可，整个过程约 5 分钟，不需要额外配置。

### 3b. 三种认证方式比较

| 方式 | 优点 | 缺点 |
|---|---|---|
| **GitHub CLI (`gh`)** | 交互式引导，自动配置 git credential，官方维护 | 需先安装 gh |
| **GitHub Desktop** | 图形界面，鼠标点击 | 需下载大型 App；命令行技能无迁移性 |
| **网页拖拽上传** | 零安装，浏览器即可 | 每次上传操作繁琐；每批限 100 文件；不支持 push 后自动触发等高级流程 |

**来源：**
- GitHub CLI: [gh auth login — cli.github.com](https://cli.github.com/manual/gh_auth_login)（已WebFetch：是，2026-06-23）
- GitHub CLI quickstart: [docs.github.com/en/github-cli/github-cli/quickstart](https://docs.github.com/en/github-cli/github-cli/quickstart)（已WebFetch：是，2026-06-23）
- 网页上传: [Adding a file to a repository — GitHub Docs](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)（已WebFetch：是，2026-06-23）

### 3c. 推荐路径：GitHub CLI（`gh`）

**推荐理由：**
- 一条命令完成认证，无需手动配置 SSH key 或 personal access token。
- `gh auth login` 选 HTTPS 后，当被问到「是否用 GitHub 账号进行 Git 认证」选 Yes，此后 `git push` 不再需要输入密码（官方文档逐字引用：*"GitHub CLI automatically stores your Git credentials for you when you choose HTTPS as your preferred protocol for Git operations and answer 'yes' to the prompt asking if you would like to authenticate to Git with your GitHub credentials."*）
- 后续可继续用 CLI 做其他 GitHub 操作（`gh repo create`、`gh pr create`），学到的技能有迁移性。
- 比 GitHub Desktop 更轻量，不依赖图形界面。

### 3d. 完整新手步骤（GitHub CLI on macOS）

```bash
# 第一步：安装 Homebrew（如未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 第二步：安装 GitHub CLI
brew install gh

# 第三步：登录 GitHub
gh auth login
```

`gh auth login` 交互流程（来自官方文档）：
1. 选择平台 → **GitHub.com**
2. 选择协议 → **HTTPS**（推荐新手；不需要 SSH key）
3. 「Authenticate Git with your GitHub credentials?」→ **Yes**
4. 选择认证方式 → **Login with a web browser**
5. 复制一次性代码，浏览器自动打开，粘贴代码，点击授权

完成后，`git push` 不再需要输入任何密码。

**官方来源：**
- 安装命令 `brew install gh`：[cli.github.com](https://cli.github.com/)（已WebFetch：是，2026-06-23）
- `gh auth login` 流程：[cli.github.com/manual/gh_auth_login](https://cli.github.com/manual/gh_auth_login)（已WebFetch：是，2026-06-23）；[quickstart](https://docs.github.com/en/github-cli/github-cli/quickstart)（已WebFetch：是，2026-06-23）

---

## 4. GitHub Pages 当前启用步骤

**来源：**
- [Creating a GitHub Pages site — GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)（已WebFetch：是，2026-06-23）
- [Configuring a publishing source — GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)（已WebFetch：是，2026-06-23）

### 步骤（从官方文档提炼，逐步核实）

**Step 1：在 GitHub 创建仓库**
- 点击右上角 **+** → **New repository**
- 命名仓库（例：`physics-notes`）
- 选择 Public（GitHub Pages 对私有仓库也支持，但免费用户限制较多）
- **不勾「Add a README file」（建空仓库）** —— 教学选定路径。原因：若勾了 README，远端就有一次本地没有的提交，本地 `git init` 后直接 `git push` 会被拒（non-fast-forward / unrelated histories）。建空仓库则 `git init → add → commit → push` 一气呵成，对新手最不易卡。
- 点击「Create repository」

**Step 2：上传 / 推送文件（本章选定：空仓库 + 本地 git init 路径）**
- 选定路径（针对上面的空仓库）：在本地项目目录依次 `git init`、`git add`、`git commit -m "..."`、`git branch -M main`、`git remote add origin https://github.com/<用户名>/physics-notes.git`、`git push -u origin main`。这是 GitHub 新建空仓库页面给出的标准 "…or push an existing repository from the command line" 序列。配合上面 `gh auth login` 已存好凭据，push 不需输密码。
- 方式 B（完全不想碰命令行）：仓库页 **Add file** → **Upload files** → 拖入 `site/index.html` → Commit changes。

**Step 3：在 Settings 开启 Pages**
官方文档逐字 UI 路径：
1. 进入仓库页面
2. 点击 **Settings**（顶部导航栏）
3. 左侧边栏「Code and automation」分区下，点击 **Pages**
4. 在「Build and deployment」→「Source」下拉菜单，选择 **Deploy from a branch**
5. 在「Branch」下拉菜单，选择 **main**（或 master）
6. 在文件夹下拉菜单，选择 **/(root)**
7. 点击 **Save**

**Step 4：等待发布 & 访问**
- 官方文档：*"It can take up to 10 minutes for changes to your site to publish after you push the changes to GitHub."*
- 发布后在 Settings → Pages 页面出现「Visit site」按钮

### 已发布 URL 格式（逐字核实）

| 类型 | URL 格式 |
|---|---|
| 用户/组织主站 | `https://<username>.github.io` |
| **项目仓库站（本章场景）** | `https://<username>.github.io/<repository>` |

对于教程中的 `physics-notes` 仓库：
```
https://<用户名>.github.io/physics-notes/
```

官方原文（逐字）：
> "For project sites: `https://<user>.github.io/<repository>`"

---

## 来源汇总表

| # | 内容 | 来源 URL | 已WebFetch | 日期 |
|---|---|---|---|---|
| 1 | Markdown 基本语法（标题/粗体/列表/链接/代码） | [docs.github.com/.../basic-writing-and-formatting-syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) | 是 | 2026-06-23 |
| 2 | Markdown/HTML AI 友好性 | 基于事实推断 | — | 2026-06-23 |
| 3a | macOS git 预装状态（Xcode CLT shim） | [developer.apple.com/forums/thread/672087](https://developer.apple.com/forums/thread/672087)（WebSearch 摘要） | 否（WebSearch） | 2026-06-23 |
| 3b | `gh auth login` 完整流程 | [cli.github.com/manual/gh_auth_login](https://cli.github.com/manual/gh_auth_login) | 是 | 2026-06-23 |
| 3c | GitHub CLI quickstart + Git credentials 自动存储 | [docs.github.com/.../quickstart](https://docs.github.com/en/github-cli/github-cli/quickstart) | 是 | 2026-06-23 |
| 3d | `brew install gh` | [cli.github.com](https://cli.github.com/) | 是 | 2026-06-23 |
| 3e | 网页上传文件（限制：100文件/批，25MB/文件） | [docs.github.com/.../adding-a-file-to-a-repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository) | 是 | 2026-06-23 |
| 4a | GitHub Pages 创建步骤 | [docs.github.com/.../creating-a-github-pages-site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) | 是 | 2026-06-23 |
| 4b | GitHub Pages 配置发布源（UI 路径） | [docs.github.com/.../configuring-a-publishing-source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) | 是 | 2026-06-23 |

---

## 无法官方确认的项目

- **macOS git 预装行为**（首次运行弹 Xcode CLT 安装框）：未 WebFetch 到 Apple 官方文档原文（`developer.apple.com` 页面 WebFetch 返回「无法访问内容」），通过 WebSearch 摘要和 Apple Developer Forums 确认。建议读者实测：Terminal 输入 `git --version`，若弹安装框则点「安装」。
- **Homebrew 安装 git 是否必须**：不必须。macOS 自带的 git（通过 Xcode CLT）对本章使用场景已足够；`brew install git` 仅用于获取最新版本。
