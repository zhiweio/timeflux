---
alwaysApply: false
description:
---

### 1. 核心技术栈 (AI 编程的最佳拍档)

- **框架**: **Next.js 14+ (App Router)**
  - _作用_: 负责路由、服务端渲染 (SSR)、API 接口。
- **语言**: **TypeScript**
- **原子样式**: **Tailwind CSS**
- **UI 组件库**: **shadcn/ui** (关键！)
  - _风格_: 类似 Vercel 或 Linear 的高端黑白灰风格，非常适合展示简历/经历。
- **动画**: **Framer Motion**
  - _作用_: 负责所有“时间轴生长”、“卡片飞入”的交互动画。
- **字体**: **Geist Sans** (或 Inter)
  - _作用_: Vercel 官方字体，专门为代码和 UI 设计，非常耐看。

### 2. 如何保证 UI 统一性 (给 Gemini 的“设计系统”指令)

> 1.  **UI 风格**: 'Modern Minimalist' (现代极简主义)。参考 Linear.app 或 Vercel 的设计风格。
> 2.  **配色系统**:
>     - **主色调 (Primary)**: Zinc (黑白灰为主)。
>     - **强调色 (Accent)**: Indigo-500 (用于时间轴连接点、链接、重要按钮)。
>     - **背景**: 支持深色模式 (Dark Mode)，使用深灰色 (`bg-zinc-950`) 而不是纯黑。
>     - **质感**: 使用 Glassmorphism (毛玻璃效果)，例如 `bg-white/5 backdrop-blur-md border-white/10`。
> 3.  **技术栈**: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion。
> 4.  **组件库**: 使用 shadcn/ui 的组件结构（Button, Card, Badge, Separator）。
> 5.  **圆角**: 全局统一使用 `rounded-xl` (中大圆角) 或 `rounded-2xl`。
> 6.  **间距**: 使用宽松的布局，利用 Whitespace 增加呼吸感。
>
> 所有生成的组件代码必须美观、响应式，并包含详细的 Tailwind 类名。"

### 3. 组件映射方案 (具体实现细节)

#### A. 整体容器

- **背景**: 使用 Tailwind 的 Grid Pattern 或 Dot Pattern 背景（让页面看起来不单调）。
- **Prompt**: "Create a page layout with a subtle radial gradient background and a dot pattern overlay."

#### B. 时间轴卡片 (Timeline Card)

- **外框**: 使用 `Card` 组件 (`Card`, `CardHeader`, `CardContent`)。
- **标签**: 使用 `Badge` 组件 (variant="outline" 或 "secondary") 来展示技能栈（如 React, Python）。
- **头像**: 使用 `Avatar` 组件展示公司/学校 Logo。
- **时间**: 使用 Tailwind 的 `text-muted-foreground text-sm` 来处理辅助文字颜色。

#### C. 时间轴连线 (The Line)

- **实现**: 这是一个自定义组件。
- **Prompt**: "Use Framer Motion to create a vertical line that draws itself (SVG path drawing animation) as the user scrolls down."

#### D. 顶部个人信息 (Header)

- **布局**: 建议使用 Bento Grid (便当盒布局) 风格。
- **Prompt**: "Create a profile header using a bento-grid layout to show Name, Bio, Social Links, and a 'Hire Me' button using shadcn Button component."
