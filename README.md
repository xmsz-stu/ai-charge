# AI Charge (AI 代充渠道信息聚合网站)

AI Charge 是一个专业的数字服务代充渠道信息展示与对比平台。旨在为用户提供透明、实时、全面的代充服务信息，包括 ChatGPT、YouTube Premium、GitHub Copilot 等热门服务的渠道价格、付费周期及折扣优惠。

## 🌟 核心功能

- **服务全面展示**：详细列出各类 AI 工具、娱乐订阅及开发者工具的代充服务。
- **渠道深度对比**：展示不同供应商的价格、评分、评价及支付方式（Visa、加密货币、PayPal 等）。
- **灵活计费选择**：支持按月、按季、按年等多种计费周期的套餐对比。
- **优惠码聚合**：集成各渠道有效折扣码（Promo Codes），帮助用户获取最低价格。
- **暗黑模式支持**：提供现代感十足的 UI 设计，支持深色/浅色模式切换。
- **管理后台**：内置管理面板，方便快速维护服务 SKU 及渠道数据。

## 🛠️ 技术栈

- **框架**: [TanStack Start](https://tanstack.com/start) (基于 React 19)
- **路由**: [TanStack Router](https://tanstack.com/router) (文件系统路由)
- **样式**: [Tailwind CSS v4](https://tailwindcss.com/)
- **组件库**: [Shadcn UI](https://ui.shadcn.com/)
- **表格**: [TanStack Table](https://tanstack.com/table)
- **图标**: [Lucide React](https://lucide.dev/) & [Google Material Symbols](https://fonts.google.com/icons)

## 📁 项目结构

```text
src/
├── components/          # 可复用组件
│   ├── admin/          # 管理后台专用组件
│   ├── detail/         # 详情页组件（详情、供应商表格、购买弹窗）
│   ├── home/           # 首页组件（Hero、服务列表、推荐网格）
│   └── ui/             # Shadcn 基础 UI 组件
├── routes/             # TanStack Router 路由定义
│   ├── __root.tsx      # 根布局与全局配置
│   ├── index.tsx       # 首页路由
│   ├── detail.$id.tsx  # 服务详情页路由
│   └── admin.tsx       # 管理后台路由
├── lib/                # 工具函数与库配置
└── styles.css          # 全局样式与 Tailwind v4 配置
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 生产构建

```bash
pnpm build
```

## 📝 许可证

MIT License
