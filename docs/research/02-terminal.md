# Research Notes · Chapter 2: terminal 与文件系统

查证日期：2026-06-23

---

## 1. Homebrew 官方安装命令

**来源 URL：** https://brew.sh  
**已 WebFetch：** 是  
**查证日期：** 2026-06-23

安装命令（原文，逐字照录）：

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

官方说明：将此命令粘贴到 macOS Terminal 或 Linux shell 运行即可安装 Homebrew。

---

## 2. Terminal.app 开启方式与默认 shell

**来源 URL：** https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac  
**已 WebFetch：** 是  
**查证日期：** 2026-06-23

打开 Terminal.app 的两种方式（Apple 官方）：
1. 点 Dock 中 Launchpad 图标 → 搜索栏输入 "Terminal" → 点 Terminal
2. Finder → /Applications/Utilities 文件夹 → 双击 Terminal

补充：也可用 Spotlight（⌘ + Space → 输入 "Terminal" → 回车），官方页面未提此法但为常见方式，标注未直接出自此页。

**默认 shell：**  
来源 URL：https://support.apple.com/guide/terminal/change-the-default-shell-trml113/mac  
已 WebFetch：是  
查证日期：2026-06-23  
原文："The default shell is zsh."  
注：macOS Catalina（2019）起 Apple 将默认 shell 从 bash 改为 zsh，但具体版本号此 WebFetch 页未明确列出，WebSearch 结果确认为 Catalina，标注为二手信息。

---

## 3. 基础命令（macOS/zsh）

**来源 URL：** https://ss64.com/mac/  
**已 WebFetch：** 是  
**查证日期：** 2026-06-23  
（ss64.com 是权威 macOS/Unix 命令参考站；以下描述来自该页面及各命令子页面定义，与 macOS man pages 行为一致。）

| 命令   | 含义（英文全称）                             | 基本用法                             | macOS/zsh 行为说明 |
|--------|----------------------------------------------|--------------------------------------|---------------------|
| `pwd`  | Print Working Directory                      | `pwd`                                | 输出当前所在目录的绝对路径 |
| `ls`   | List information about file(s)               | `ls`、`ls -l`、`ls -la`              | 列出目录内容；`-l` 详细格式；`-a` 含隐藏文件 |
| `cd`   | Change Directory                             | `cd 路径`、`cd ..`、`cd ~`           | 切换目录；`cd ..` 返回上一级；`cd ~` 回家目录 |
| `cat`  | Concatenate and print (display) the content of files | `cat 文件名`                | 将文件内容打印到终端 |
| `mkdir`| Make Directory                               | `mkdir 文件夹名`                     | 新建文件夹；`-p` 建好多层父目录且目录已存在时不报错（幂等），来源 ss64.com/mac/mkdir.html + `man mkdir`，2026-06-23 |
| `cp`   | Copy one or more files to another location   | `cp 源 目标`                         | 复制文件；`cp -r` 复制整个文件夹（递归） |
| `mv`   | Move or rename files or directories          | `mv 源 目标`                         | 移动文件或重命名（改名就是移到同目录新名） |
| `rm`   | Remove files                                 | `rm 文件名`                          | **永久删除，不经过废纸篓**；无法撤销（除非有 Time Machine） |
| `open` | Open a file/folder/URL/Application          | `open .`、`open 文件名`              | macOS 专有命令；`open .` 在 Finder 里打开当前目录 |

---

## 4. `rm` 的危险性

**来源 URL：** https://ss64.com/mac/rm.html（WebSearch 找到，内容经 WebSearch 结果摘录）  
**已 WebFetch：** 否（WebSearch 摘录）  
**查证日期：** 2026-06-23

关键事实：
- `rm` 删除文件是**立即永久性的**，不会移入废纸篓（Trash）
- 不像 Finder 的"移到废纸篓"，`rm` 无法撤销（除非有 Time Machine 备份）
- `-f` 标志强制删除、跳过确认提示，更危险
- 如需"删除到废纸篓"，需要 Homebrew 安装的第三方 `trash` 命令（非系统内置）

---

## 5. 路径、~ . .. 定义

来源：ss64.com/mac（通用 Unix/macOS 约定，属于标准事实，以下参考 ss64.com 与 macOS 通用行为）  
已 WebFetch：是（ss64.com/mac 页面已 WebFetch）

- **绝对路径（absolute path）**：从根目录 `/` 开始的完整路径，如 `/Users/你的用户名/study/physics-notes/`
- **相对路径（relative path）**：从当前目录开始计算，如 `study/physics-notes/`（不以 `/` 开头）
- **`~`（tilde）**：当前用户的家目录（home directory）的快捷符号，等价于 `/Users/你的用户名/`
- **`.`（dot）**：当前目录自身
- **`..`（double dot）**：上一级目录（父目录）

---

## 6. Homebrew 简介

**来源 URL：** https://brew.sh  
**已 WebFetch：** 是

Homebrew 是 macOS（和 Linux）上最流行的包管理器（package manager），用来在 terminal 里安装开发工具、命令行程序等，例如 `git`、`node`、`python` 等。官网介绍："The Missing Package Manager for macOS (or Linux)"。

---

## 核实状态总表

| 事实 | 来源 | 已 WebFetch |
|------|------|-------------|
| Homebrew 安装命令 | brew.sh | 是 |
| Terminal.app 打开方式 | support.apple.com | 是 |
| 默认 shell 为 zsh | support.apple.com | 是 |
| 各命令行为 (pwd/ls/cd/cat/mkdir/cp/mv/rm/open) | ss64.com/mac | 是（概览页） |
| rm 永久删除、不经废纸篓 | ss64.com/mac/rm.html | 否（WebSearch 摘录，可信度高） |
| 路径/~/./.. 定义 | 通用 Unix 规范 + ss64.com | 是 |
| Spotlight 打开 Terminal（⌘+Space） | 未直接 WebFetch Apple 文档 | 未核实（标注） |
| macOS Catalina 起切换 zsh | WebSearch 搜索结果摘录 | 未直接 WebFetch 此版本信息 |
