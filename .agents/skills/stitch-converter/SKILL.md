---
name: stitch-converter
description: 提供了将 Stitch 生成的单体 HTML 设计稿高效转换为模块化 React (TanStack/Tailwind v4) 组件的方法。
---

# Stitch Converter Skill

本 Skill 旨在指导开发者如何将来自 Stitch 的高保真 HTML 设计稿，平滑且高效地迁移到基于 TanStack Start 和 Tailwind CSS v4 的生产应用中。

## 转换原则

### 1. 从单体到模块 (Monolith to Modules)
Stitch 生成的 HTML 通常是巨大的单体文件。转换的首要任务是识别**重复模式**并将其拆分为组件，分三个层次：

- **布局层 (Layout)**: `MainLayout.tsx` — 包含 Header、Footer、全局字体和背景色。**全站公用一个**，不同页面都通过 `<MainLayout>` 包裹。
- **区块层 (Section)**: 按设计稿的视觉区块划分，如 `HomeHero`, `RecommendationGrid`, `HomeServiceList`。
- **原子层 (Atomic)**: 单个可复用 UI 元素，如 `Button`, `Badge`, `Card`，放入 `src/components/ui/`。

### 2. 先看已有组件，再造新轮子 (Reuse Over Create)
在动手拆分新页面之前，**必须先浏览 `src/components/` 目录**：
- 是否已有 Header/Footer/Layout 组件？ → 直接复用，不要另起炉灶。
- **协同 Shadcn UI**: 对于交互复杂的组件（Select, Dialog, Switch, Tabs），优先运行 `npx shadcn add` 获取功能完备的原子组件，再将设计稿中的 class 迁移过去，而不是手动模拟 HTML 结构。
- 各页面共用同一个 `MainLayout`，避免分别实现各自的导航栏和页脚。

### 3. 设计标记同步 (Design Token Sync)
在转换任何组件之前，先确保 `src/styles.css` 中的 `@theme` 包含：
- **颜色**: `--color-brand-primary`（品牌主色，Tailwind 类名 `brand-primary`）、`background-light`、`background-dark`。
- **字体**: `--font-display`（Space Grotesk）、`--font-sans`（IBM Plex Sans）、`--font-mono`（IBM Plex Mono）。
- **风格**: 直角设计时设 `--radius-none: 0px`。

> **重要**: 组件中统一使用 `text-brand-primary`、`bg-brand-primary`、`border-brand-primary`，避免混用 `primary` 和 `brand-primary`，防止 Tailwind v4 解析错误。

### 4. 字体全局统一 (Global Font Consistency)
- 全局字体在 `__root.tsx` 的 `<body>` 标签上声明（`font-display`/`font-sans`）。
- 各页面的 `<MainLayout>` 不需要重复声明字体——只有当页面有特殊需要时才覆盖。
- 不要在主题切换脚本或 `<html>` 上依赖暗色模式，如果项目不需要主题切换则移除相关的 `THEME_INIT_SCRIPT` 和 `suppressHydrationWarning`。

### 5. 数据驱动 (Data Driven)
将 HTML 中的硬编码内容替换为 Props 或数据数组：
- 识别重复的列表项（服务卡片、导航链接），将其提取为 `const ITEMS = [...]`，通过 `.map()` 渲染。
- 为数据对象定义明确的 TypeScript 接口。

### 6. 逻辑与表现分离 (Logic/UI Separation)
Stitch 生成的 HTML 通常包含 `fixed inset-0` 这种蒙层模拟逻辑：
- **不要直接复制蒙层定位代码**。
- 使用项目已有的 UI 库（如 `@shadcn/dialog`）作为逻辑容器，只将 Stitch 的**内容区域 (Content Area)** 代码迁移进去，以保证无障碍性和状态管理的统一。

---

## 核心转换流程

### 第一步：环境预设 (Environment Setup)
1. 查看设计稿 HTML 的 `<style>` 或 `<script id="tailwind-config">` 区域，提取颜色和字体。
2. 将其同步到 `src/styles.css` 的 `@theme` 块，确保 `brand-primary` 与设计稿一致。
3. **检查路径别名**: 查看 `tsconfig.json` 的 `paths` 配置。如果工程对 `@/*` 指向不稳定，在组件内部互相引用时推荐使用**相对路径**（如 `../ui/button`），以增强组件的迁移性。
4. 检查 `__root.tsx` 的 `<head>` 是否加载了所需的 Google Fonts。

### 第二步：确认或创建 `MainLayout`
1. 检查 `src/components/MainLayout.tsx` 是否存在。
2. **若不存在**：从已有的 Header/Footer 组件创建它，包含全局的背景色和字体类。
3. **若已存在**：直接在新页面中使用 `<MainLayout>`，无需任何修改。

### 第三步：识别页面区块 (Section Identification)
逐段扫描 Stitch HTML，规划组件拆分方案：
```
设计稿分区 → 组件名称 → 存放路径
────────────────────────────────────────────────────────
Hero 搜索区 → HomeHero.tsx → src/components/home/
推荐卡片区 → RecommendationGrid.tsx → src/components/home/
过滤+列表区 → HomeServiceList.tsx → src/components/home/
```

### 第四步：逐组件实现 (Component Implementation)
- 直接复用 HTML 中的 Tailwind 类，将 `text-[#0606f9]` 等硬编码色值替换为 `text-brand-primary`。
- 对于复杂交互/动画，迁移至 `src/styles.css`。
- **图标转换**: 设计稿默认使用 `Material Symbols`，将其替换为 `lucide-react`。移除设计稿中专有的 `<script>` 标签和多余的图标 CDN。
- **层级覆盖**: 若 shadcn 默认样式难以覆盖，使用 Tailwind v4 的 `!` 重要性标记（如 `text-white!`）。

### 第五步：组装路由 (Route Assembly)
在 `src/routes/` 中创建对应路由文件，保持简洁：
```tsx
function MyPage() {
  return (
    <MainLayout>
      <SectionA />
      <SectionB />
      <SectionC />
    </MainLayout>
  )
}
```
路由文件只负责组合区块，不含任何布局逻辑。

---

## 最佳实践 & 反模式

| ✅ 正确做法 | ❌ 错误做法 |
| :--- | :--- |
| 使用 `MainLayout` 包裹所有页面 | 每个页面分别实现自己的 Header/Footer |
| 颜色类统一用 `brand-primary` | 混用 `primary`、`text-blue-600`、`#0606f9` 等 |
| 使用已有的 Dialog/Modal 逻辑组件 | 直接复制 Stitch 的 `fixed inset-0` 蒙层 HTML |
| 使用 `lucide-react` 图标库 | 依赖 Material Symbols 外部字体引用 |
| 全局字体在 `__root.tsx body` 上声明 | 每个组件/页面各自重复声明字体 |
| 先复用现有组件，再创建新的 | 盲目新建与已有代码重复的组件 |
| 使用 `import type` 导入 TS 类型 | 直接 `import { ReactNode }` 违反 `verbatimModuleSyntax` |

## 常见映射表

| 设计稿元素 | 推荐 React 组件 | 关键样式类 |
| :--- | :--- | :--- |
| 主按钮 | `src/components/ui/Button.tsx` | `bg-brand-primary uppercase font-bold tracking-widest` |
| 产品卡片 | `src/components/Card.tsx` | `hover:border-brand-primary transition-all border` |
| 单选/多选 | `src/components/ui/Checkbox.tsx` | `rounded-none border-slate-300 text-brand-primary` |
| 价格文本 | `span` | `font-display font-bold text-2xl` |
| 图标 | `lucide-react` | 替换原有的 `material-symbols-outlined` |
| 蒙层/弹窗 | `@shadcn/dialog` | 移除 `fixed inset-0 bg-slate-900/60` 等容器代码 |
| 导航/页脚 | `MainLayout.tsx` | 全站公用，不在页面中单独引入 |
