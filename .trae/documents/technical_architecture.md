## 1. Architecture Design

```mermaid
graph TD
    A[User Browser] --> B[Next.js App Router]
    C[GitHub README] --> D[Vercel Edge Function]

    B --> E[React Components]
    B --> F[YAML Parser]
    D --> F

    E --> G[Framer Motion]
    E --> H[shadcn/ui]
    E --> I[Tailwind CSS]

    F --> J[data.yaml]
    D --> K[@vercel/og]
    K --> L[SVG Output]

    subgraph "Frontend Layer"
        B
        E
        G
        H
        I
    end

    subgraph "Data Layer"
        J
    end

    subgraph "GitHub Integration"
        D
        K
        L
    end
```

## 2. Technology Description

- **Frontend**: Next.js 14+ (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS 3 + PostCSS
- **UI Components**: shadcn/ui + Radix UI primitives
- **Animation**: Framer Motion 11
- **Icons**: Lucide React
- **Data Parsing**: yaml + js-yaml
- **SVG Generation**: @vercel/og (Satori)
- **Deployment**: Vercel
- **Initialization Tool**: create-next-app

## 3. Route Definitions

| Route                | Purpose                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| `/`                  | Main timeline page, displays personal profile and interactive timeline |
| `/api/timeline-card` | Edge API route generating SVG image for GitHub embedding               |
| `/api/og`            | Open Graph image generation for social media sharing                   |

## 4. API Definitions

### 4.1 Timeline Card API

```
GET /api/timeline-card
```

Query Parameters:
| Param Name | Param Type | Required | Description |
|------------|------------|----------|-------------|
| theme | string | false | Theme preference: "light" or "dark" (default: "dark") |
| count | number | false | Number of events to display (default: 3, max: 5) |
| type | string | false | Filter by event type: "work", "education", "project", "award" |

Response: SVG image with Content-Type: image/svg+xml

### 4.2 Data Schema (TypeScript)

```typescript
// lib/types.ts
export interface Profile {
  name: string;
  avatar: string;
  bio: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface TimelineEvent {
  date: string; // YYYY-MM format
  title: string;
  type: "work" | "education" | "project" | "award";
  org: string;
  description?: string;
  tags?: string[];
  link?: string;
  logo?: string; // Organization logo URL
}

export interface TimelineData {
  profile: Profile;
  timeline: TimelineEvent[];
}
```

## 5. Directory Structure

```
/
├── app/
│   ├── api/
│   │   ├── timeline-card/
│   │   │   └── route.ts      # SVG generation endpoint
│   │   └── og/
│   │       └── route.ts      # OG image generation
│   ├── components/
│   │   ├── timeline/
│   │   │   ├── container.tsx # Main timeline container
│   │   │   ├── item.tsx      # Individual event card
│   │   │   ├── line.tsx      # Animated connecting line
│   │   │   └── filter.tsx    # Type filter buttons
│   │   ├── profile/
│   │   │   ├── header.tsx    # Profile header (Bento grid)
│   │   │   └── social.tsx    # Social links
│   │   ├── ui/               # shadcn/ui components
│   │   └── theme-toggle.tsx   # Dark/light mode switch
│   ├── layout.tsx             # Root layout with providers
│   ├── page.tsx              # Homepage with timeline
│   └── globals.css           # Global styles + Tailwind
├── lib/
│   ├── yaml-parser.ts        # YAML parsing utilities
│   ├── types.ts              # TypeScript definitions
│   ├── utils.ts              # Helper functions
│   └── constants.ts          # App constants
├── public/
│   └── data.yaml             # Personal timeline data
├── styles/
│   └── animations.css        # Custom animation keyframes
├── config/
│   └── timeline.ts           # Timeline configuration
└── types/
    └── index.ts              # Global type definitions
```

## 6. Component Architecture

### 6.1 Timeline Container Component

- **Props**: events[], filterType, onFilterChange
- **Features**:
  - Scroll progress tracking with useScroll
  - Layout animation for filtering
  - Responsive layout switching

### 6.2 Timeline Item Component

- **Props**: event, index, total
- **Features**:
  - Expandable description with animateHeight
  - Staggered entrance animation
  - Left/right positioning based on index

### 6.3 Animated Line Component

- **Implementation**: SVG path with stroke-dasharray animation
- **Trigger**: Linked to scroll progress (0-100%)
- **Style**: 2px width, gradient stroke from zinc-400 to indigo-500

## 7. Data Management

### 7.1 YAML Structure

```yaml
profile:
  name: "Alex Chen"
  avatar: "https://github.com/alexchen.png"
  bio: "Full-stack developer passionate about AI and open source"
  social:
    github: "alexchen"
    linkedin: "alexchen-dev"
    email: "alex@example.com"

timeline:
  - date: "2024-01"
    title: "Senior Frontend Engineer"
    type: "work"
    org: "Vercel"
    description: "Leading Next.js performance optimizations"
    tags: ["React", "Next.js", "Performance"]
    link: "https://vercel.com"
    logo: "https://vercel.com/logo.png"
```

### 7.2 Data Validation

- Date format validation (YYYY-MM)
- Type enumeration checking
- Required field validation
- URL format validation for links and images

## 8. Performance Optimization

### 8.1 Static Generation

- YAML data parsed at build time using generateStaticParams
- Timeline events sorted and cached
- Images optimized with Next.js Image component

### 8.2 Runtime Optimization

- Framer Motion animations use GPU acceleration
- Virtual scrolling for large timelines (>50 events)
- SVG generation cached at edge with Vercel Cache API

### 8.3 Bundle Size

- Dynamic imports for heavy components
- Tree shaking for unused shadcn/ui components
- Tailwind CSS purging for production builds
