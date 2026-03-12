# 项目规范 (Project Conventions)

## 1. 样式与设计 (Styling & Design)
- **CSS**: 统一使用 **Tailwind CSS v4**。
- **配置**: 颜色、字体、圆角等必须在 `src/styles.css` 的 `@theme` 中定义 Token，禁止硬编码颜色值。
- **品牌色**: 统一使用 `brand-primary` (#0606f9)。

## 2. 日期与时间处理 (Date & Time Handling)
为了保证全站日期展示的一致性，并解决 SSR (服务端渲染) 与客户端 Hydration 导致的日期格式不匹配问题，项目统一使用 **dayjs** 库。

- **依赖**: 必须通过 `pnpm` 安装。
- **标准**:
  - 完整日期时间: `YYYY-MM-DD HH:mm:ss` (示例: `2024-03-12 13:45:00`)
  - 仅日期: `YYYY-MM-DD`
  - 仅时间: `HH:mm:ss`
- **代码规范**:
  - ✅ **推荐**: `dayjs(date).format('YYYY-MM-DD HH:mm:ss')`
  - ❌ **禁止**: `new Date().toLocaleString()` (会导致 SSR 冲突)

## 3. UI 组件 (UI Components)
- **原子组件**: 优先使用 **Shadcn UI**。
- **图标**: 统一使用 **lucide-react** 或 **Material Symbols** (作为辅助)。
- **交互**: 复杂交互（如弹窗、下拉）使用 Radix UI 或 Base UI 驱动，不要手动模拟蒙层逻辑。

## 4. 路由管理 (Routing)
- **框架**: 使用 **TanStack Router**。
- **规范**: 路由定义应保持简洁，复杂的业务逻辑应抽离到组件或 `createServerFn` 中。

## 5. 数据库 (Database)
- **ORM**: 使用 **Drizzle ORM**。
- **变更**: 所有架构变更需同步更新 `src/db/schema.ts`。
