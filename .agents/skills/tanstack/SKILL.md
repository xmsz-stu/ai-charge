---
name: tanstack
description: 提供了使用 @tanstack/cli 管理和排查 TanStack 生态工具（Start, Router, Query, Table 等）的能力。适用于项目初始化、官方文档检索、以及解决部署 (Deployment)、路由 (Routing) 或库相关的 404 报错与故障排查 (Troubleshooting)。Manage and troubleshoot TanStack ecosystem tools. Use for project setup, documentation search, and fixing deployment, routing, or library-related errors and 404 issues.
---

# TanStack Skill

本 Skill 旨在协助开发者利用 `@tanstack/cli` 高效地探索和管理 TanStack 生态系统中的工具，包括 React Query, TanStack Router, TanStack Table, TanStack Start 等。

## 核心功能

### 1. 项目创建与配置
使用 CLI 交互式或通过参数快速初始化新项目。

- **查看可用附加组件（Add-ons）**:
  ```bash
  npx @tanstack/cli create --list-add-ons --framework React --json
  ```
- **查看特定附加组件详情**:
  ```bash
  npx @tanstack/cli create --addon-details drizzle --framework React --json
  ```
- **创建带特定附加组件的项目**:
  ```bash
  npx @tanstack/cli create my-app --framework React --add-ons drizzle,clerk
  ```

### 2. 生态系统与库管理
查询 TanStack 官方库信息及社区生态插件。

- **列出所有库**:
  ```bash
  npx @tanstack/cli libraries --json
  ```
- **按分类查看生态系统工具（如数据库、表单等）**:
  ```bash
  npx @tanstack/cli ecosystem --category database --json
  ```

### 3. 文档查询与搜索
直接从终端访问官方文档，获取 API 参考和概念指南。

- **查询特定文档路径**:
  ```bash
  npx @tanstack/cli doc query framework/react/overview --json
  ```
- **搜索文档内容**:
  ```bash
  npx @tanstack/cli search-docs "server functions" --library start --json
  ```

## 使用指南

1. **JSON 输出**: 建议始终带上 `--json` 参数，以便于解析和在对话中处理数据。
2. **框架指定**: 许多命令需要指定 `--framework`（如 `React`, `Solid`, `Vue`, `Svelte`）。
3. **结合工具使用**: 
   - 使用 `run_command` 执行 CLI 命令。
   - 获取 JSON 后，可以使用这些信息来生成代码或解释配置。

## 示例工作流

如果您需要为一个项目集成 Drizzle ORM，首先可以运行:
`npx @tanstack/cli create --addon-details drizzle --framework React --json`
来了解所需的依赖和配置建议。
