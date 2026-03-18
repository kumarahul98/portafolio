# Plan: Rahul Kumar Portfolio Website

## Context
Build a personal portfolio for Rahul Kumar (Principal Solutions Architect, AntStack) using a lightweight CSR stack with GSAP animations inspired by praveengorakala.com. Content (blogs, videos, links) is driven by a `public/content.md` file fetched at runtime — no rebuild needed to update links.

---

## Tech Stack
- **Vite + React + TypeScript** — pure CSR, lightest option
- **Tailwind CSS** — utility styling
- **GSAP + ScrollTrigger** — all animations
- **`front-matter` v4** — browser-compatible YAML frontmatter parser (v5+ is Node-only, do NOT use)
- **Google Fonts** — Anton + Press Start 2P + Inter

---

## File List

```
portafolio/
├── public/
│   └── content.md
├── src/
│   ├── components/
│   │   ├── Canvas.tsx
│   │   ├── Nav.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Blogs.tsx
│   │   ├── Videos.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── hooks/
│   │   ├── useContent.ts
│   │   └── useReveal.ts
│   ├── types/
│   │   └── content.ts
│   ├── data/
│   │   └── projects.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.ts
└── package.json
```

---

## `package.json`

```json
{
  "name": "rahul-kumar-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "gsap": "^3.12.5",
    "front-matter": "^4.0.2"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.4.5",
    "vite": "^5.3.1"
  }
}
```

---

## `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: { gsap: ['gsap'] },
      },
    },
  },
})
```

---

## `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        anton: ['"Anton"', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#D51B1C',
          orange: '#FF4F00',
          dark: '#0a0a0a',
          light: '#f5f5f5',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
```

---

## `index.html`

```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rahul Kumar — Principal Solutions Architect</title>
    <meta name="description" content="Principal Solutions Architect at AntStack. Serverless, GenAI, AWS." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Press+Start+2P&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-brand-dark text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  .reveal {
    opacity: 0;
    transform: translateY(60px);
  }

  body.light-mode {
    background-color: #f5f5f5;
    color: #0a0a0a;
  }

  .font-pixel {
    font-family: 'Press Start 2P', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
}
```

---

## `src/main.tsx`

```tsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)   // ← must be before React renders

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

## `src/types/content.ts`

```ts
export interface BlogEntry {
  title: string
  url: string
  date: string
  description: string
}

export interface VideoEntry {
  title: string
  url: string
  date: string
  description: string
}

export interface LinkEntry {
  title: string
  url: string
  type: string
}

export interface ContentFrontmatter {
  blogs: BlogEntry[]
  videos: VideoEntry[]
  links?: LinkEntry[]
}
```

---

## `src/hooks/useContent.ts`

```ts
import { useEffect, useState } from 'react'
import fm from 'front-matter'
import type { ContentFrontmatter } from '../types/content'

interface ContentState {
  data: ContentFrontmatter | null
  body: string
  loading: boolean
  error: string | null
}

export function useContent(): ContentState {
  const [state, setState] = useState<ContentState>({
    data: null, body: '', loading: true, error: null,
  })

  useEffect(() => {
    fetch('/content.md')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch content.md: ${res.status}`)
        return res.text()
      })
      .then((text) => {
        const parsed = fm<ContentFrontmatter>(text)
        setState({ data: parsed.attributes, body: parsed.body, loading: false, error: null })
      })
      .catch((err) => {
        setState({ data: null, body: '', loading: false, error: err.message })
      })
  }, [])

  return state
}
```

---

## `src/hooks/useReveal.ts`

```ts
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useReveal<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        }
      )
    }, ref)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, deps)

  return ref
}
```

---

## `src/data/projects.ts`

```ts
export interface Project {
  title: string
  role: string
  description: string
  tags: string[]
}

export const PROJECTS: Project[] = [
  {
    title: 'Health Tech — FHIR Data Pipeline',
    role: 'Principal Solutions Architect',
    description: 'Scalable ETL pipeline to process FHIR healthcare data, calculate patient metrics, and sync with the app layer. Integrated multiple EMR systems.',
    tags: ['AWS', 'Databricks', 'FHIR', 'Step Functions', 'EventBridge'],
  },
  {
    title: 'Counterfeit Detection Platform',
    role: 'Principal Solutions Architect',
    description: 'AI-powered platform detecting unauthorized product listings via image analysis. Batch-processing on AWS Bedrock orchestrated via Lambda, EventBridge, DynamoDB, S3.',
    tags: ['AWS Bedrock', 'Lambda', 'GenAI', 'DynamoDB', 'EventBridge'],
  },
  {
    title: 'Global Cruise Replication Engine',
    role: 'Principal Solutions Architect',
    description: 'Offline-tolerant data replication POC for shore-to-ship sync using Debezium, Kafka, and Python services on EKS.',
    tags: ['Kafka', 'Debezium', 'EKS', 'Kubernetes', 'Python'],
  },
  {
    title: 'Warehouse Analytics Pipeline',
    role: 'Senior Data Engineer',
    description: 'Analytics lakehouse ingesting CSV, NFS, DDB streams into S3, transformed via AWS Glue, surfaced in QuickSight dashboards.',
    tags: ['AWS Glue', 'S3', 'Athena', 'QuickSight', 'Lakehouse'],
  },
  {
    title: 'CouchBase → OpenSearch Migration',
    role: 'Data Engineer',
    description: 'Migrated ~32 million records from CouchBase to OpenSearch with minimal downtime. Built a private API for application integration.',
    tags: ['OpenSearch', 'CouchBase', 'Lambda', 'API Gateway'],
  },
  {
    title: 'OnLeave — Slack Leave Management',
    role: 'Tech Lead',
    description: 'Leave management app built on top of Slack with a fully serverless backend. Event-driven via SQS and EventBridge. TypeScript + React + Amplify.',
    tags: ['Serverless', 'DynamoDB', 'SQS', 'EventBridge', 'React', 'Amplify'],
  },
]
```

---

## `src/App.tsx`

```tsx
import Canvas from './components/Canvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Blogs from './components/Blogs'
import Videos from './components/Videos'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { useContent } from './hooks/useContent'

export default function App() {
  const content = useContent()

  return (
    <>
      <Canvas />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Blogs data={content.data?.blogs ?? []} loading={content.loading} />
        <Videos data={content.data?.videos ?? []} loading={content.loading} />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
```

---

## Component Details

### `Canvas.tsx`
- Fixed full-bleed `<canvas>`, `z-0`, `pointer-events-none`
- `requestAnimationFrame` loop: radial gradient at cursor, outer stop `rgba(255,79,0,0.1)`, radius 400px
- Hidden on mobile: `className="hidden md:block fixed inset-0 z-0 pointer-events-none"`
- Resize handler keeps canvas dimensions in sync

```tsx
useEffect(() => {
  const canvas = canvasRef.current!
  const ctx = canvas.getContext('2d')!
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  let raf: number
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY })
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 400)
    grad.addColorStop(0, 'rgba(255, 79, 0, 0.10)')
    grad.addColorStop(1, 'rgba(255, 79, 0, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    raf = requestAnimationFrame(draw)
  }
  draw()
  return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
}, [])
```

### `Nav.tsx`
- `position: fixed; top: 0; z-50; backdrop-blur-md; bg-black/60`
- Links scroll to: `#hero`, `#about`, `#blogs`, `#videos`, `#projects`, `#contact`
- Logo: "RK." in Anton font, `text-brand` red
- Mobile: `useState` hamburger, links hidden below `md`
- GSAP scroll hide/show:
```ts
ScrollTrigger.create({
  onUpdate: (self) => {
    if (self.direction === 1 && self.scroll() > 80)
      gsap.to(navRef.current, { y: '-100%', duration: 0.4, ease: 'power2.in' })
    else
      gsap.to(navRef.current, { y: '0%', duration: 0.4, ease: 'power2.out' })
  },
})
```

### `Hero.tsx`
- Full viewport: `min-h-screen flex flex-col justify-center`
- Layout:
  - `[pixel font]` "PRINCIPAL SOLUTIONS ARCHITECT" — small label
  - `[Anton, text-5xl md:text-7xl lg:text-8xl]` "RAHUL KUMAR" — accent `text-brand` on "RAHUL"
  - Bio: "Principal Solutions Architect at AntStack. Serverless, GenAI, AWS."
  - Two buttons: "View Projects ↓" (filled `bg-brand`) + "Get in Touch" (outline `border-brand`)
- Entrance anims on mount (NOT scroll-triggered):
```ts
gsap.from(headingRef.current, { y: 80, opacity: 0, duration: 1.2, ease: 'power3.out' })
gsap.from(labelRef.current,   { y: 40, opacity: 0, duration: 0.8, delay: 0.2 })
gsap.from(bioRef.current,     { opacity: 0, duration: 1, delay: 0.5 })
gsap.from(btnsRef.current,    { opacity: 0, y: 20, stagger: 0.15, delay: 0.7 })
```

### `About.tsx`
- Three sub-sections with `.reveal` class:
  1. Experience timeline (AntStack → 9Logic → Neudesic)
  2. Skills grid (AWS / Data / Languages / DevOps tag groups)
  3. Certifications (5 badge cards: AWS SAP, SAA, DA, CCP, Databricks)
- **Light-mode toggle** via ScrollTrigger:
```ts
ScrollTrigger.create({
  trigger: sectionRef.current, start: 'top 60%', end: 'bottom 40%',
  onEnter:     () => document.body.classList.add('light-mode'),
  onLeave:     () => document.body.classList.remove('light-mode'),
  onEnterBack: () => document.body.classList.add('light-mode'),
  onLeaveBack: () => document.body.classList.remove('light-mode'),
})
```

### `Blogs.tsx`
- Props: `{ data: BlogEntry[], loading: boolean }`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Card: title, formatted date, 2-line truncated description, "Read →" external link
- Skeleton: `animate-pulse` gray blocks when `loading === true`
- Sort by date descending; `useReveal([data])`

### `Videos.tsx`
- Same grid as Blogs
- YT thumbnail: `https://img.youtube.com/vi/{id}/mqdefault.jpg`
- ID extraction: `url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)`
- `onError` fallback div if thumbnail 404s
- `useReveal([data])`

### `Projects.tsx`
- Source: `PROJECTS` from `src/data/projects.ts`
- Grid: `grid-cols-1 lg:grid-cols-2 gap-8`
- Card: pixel-font role label, Anton title, description, tag pills (`border-brand text-brand`)
- `useReveal()`

### `Contact.tsx`
- Centered, Anton heading "LET'S WORK TOGETHER"
- `mailto:rahulkumar@antstack.com` CTA button
- Social icons (inline SVG): LinkedIn, Twitter/X, AntStack author page
- `useReveal()`

---

## Color Palette

```
Background (dark):   #0a0a0a
Brand red accent:    #D51B1C   — buttons, headings, tags, logo
Canvas outer glow:   rgba(255, 79, 0, 0.1)
Canvas center:       rgba(0, 0, 0, 0)   transparent
Light section bg:    #f5f5f5   (body.light-mode)
Light section text:  #0a0a0a
Body text:           #e5e5e5
Muted text:          #888888
Card sections:       bg-[#0a0a0a]/95    semi-transparent → glow shows through
```

---

## `public/content.md` — Initial Content (pre-populated from knowledge base)

```yaml
---
blogs:
  - title: "Optimizing RLS Performance with Supabase (Postgres)"
    url: "https://www.antstack.com/blog/optimizing-rls-performance-with-supabase/"
    date: "2025-01-13"
    description: "Deep dive into Row-Level Security performance tuning in Supabase using Postgres policies, indexes, and query analysis."

  - title: "Multi-Tenant Applications with RLS on Supabase (Postgres)"
    url: "https://www.antstack.com/blog/multi-tenant-applications-with-rls-on-supabase-postgress/"
    date: "2024-12-23"
    description: "How to architect multi-tenant SaaS applications using Supabase Row-Level Security with Postgres."

  - title: "Streaming DynamoDB Data into a Hudi Table: AWS Glue in Action"
    url: "https://www.antstack.com/blog/Streaming-DynamoDB-Data-into-a-Hudi-Table/"
    date: "2024-10-14"
    description: "Using AWS Glue to stream DynamoDB change data capture into an Apache Hudi lakehouse table on S3."

  - title: "BigQuery Basics: A Quick Start Guide for Newbies"
    url: "https://www.antstack.com/blog/big-query-basics-a-quick-start-guide-for-newbies/"
    date: "2024-05-08"
    description: "Beginner-friendly walkthrough of Google BigQuery: datasets, SQL, BI Engine, and real-time streaming."

  - title: "Getting Started with OpenSearch"
    url: "https://www.antstack.com/blog/getting-started-with-open-search/"
    date: "2021-10-27"
    description: "Introduction to AWS OpenSearch: indexing, querying, and integrating with serverless Lambda functions."

videos:
  - title: "AWS re:Invent Highlights: GenAI, S3 Vectors, Nova Models & Durable Lambda"
    url: "https://www.youtube.com/watch?v=AWS-reInvent-highlights"
    date: "2025-02-01"
    description: "AntStack TV breakdown of AWS re:Invent's biggest announcements — S3 Vectors, Bedrock Nova, AgentCore, Durable Lambda, and Security Agents."

  - title: "AntStack TV Ep 7: AWS re:Invent's Biggest Data Engineering Reveals"
    url: "https://www.youtube.com/watch?v=Episode7"
    date: "2025-03-01"
    description: "S3 Tables, SageMaker Lake House, Zero-ETL, AWS Glue 5.0, DynamoDB Global Tables, Aurora DSQL, QuickSight AI — all explained."

  - title: "AntStack TV Ep 4: BigQuery — Google's Data Warehouse Service"
    url: "https://www.youtube.com/watch?v=Episode4"
    date: "2024-03-01"
    description: "Deep dive into Google BigQuery: serverless architecture, SQL, BI Engine, and real-time streaming."

  - title: "Cloudflare's Quiet Shift into an AI + Data Platform"
    url: "https://www.youtube.com/watch?v=Cloudflare-AntStack"
    date: "2025-01-01"
    description: "Workers, R2, D1, AI Gateway, RAG, Apache Iceberg, and Remote MCP — Cloudflare as a full AI data platform."

  - title: "Getting Started with DynamoDB Single Table Design"
    url: "https://www.youtube.com/watch?v=DynamoDB-Single-Table"
    date: "2024-03-01"
    description: "47-minute deep dive into DynamoDB single-table architecture with a real-life case study. 2,300+ views."

  - title: "Efficient ETL on the Cloud: Embracing the Serverless Paradigm"
    url: "https://www.youtube.com/watch?v=acdkochi23"
    date: "2023-09-01"
    description: "Conference talk at AWS Community Day Kochi 2023. ETL design patterns on AWS serverless."

links:
  - title: "Author page on AntStack"
    url: "https://www.antstack.com/author/rahul-kumar/"
    type: "other"
---

Technical writings and talks by Rahul Kumar on cloud architecture, serverless, and data engineering.
```

> **To add new content:** edit this file, commit & deploy — no code rebuild needed.

---

## Mobile Responsiveness

| Element | Mobile | md (768px+) | lg (1024px+) |
|---|---|---|---|
| Hero heading | `text-5xl` | `text-7xl` | `text-8xl` |
| Nav | hamburger (`useState`) | full links | full links |
| Card grids | `grid-cols-1` | `grid-cols-2` | `grid-cols-3` |
| Project cards | `grid-cols-1` | `grid-cols-1` | `grid-cols-2` |
| Canvas | `hidden` | `block` | `block` |
| Section padding | `px-4 py-16` | `px-8 py-24` | `px-16 py-32` |

---

## Key Gotchas

1. **GSAP + React 18 Strict Mode** — always use `gsap.context()` + `ctx.revert()`. Never `ScrollTrigger.getAll().forEach(t => t.kill())`.
2. **Dynamic content timing** — Blogs/Videos `useEffect` dep array must be `[data]`, not `[]`; call `ScrollTrigger.refresh()` after content renders.
3. **Section bg transparency** — use `bg-[#0a0a0a]/95` (not fully opaque) so canvas glow bleeds through.
4. **YouTube thumbnails** — add `onError` fallback; placeholder video IDs in seed content won't resolve to real thumbnails.
5. **`front-matter` v4** — import as `import fm from 'front-matter'`; requires `"esModuleInterop": true` in tsconfig.
6. **ScrollTrigger refresh on resize** — debounce a `window.resize` listener in `App.tsx` calling `ScrollTrigger.refresh()`.
7. **GSAP plugin registration** — register once only in `main.tsx`, before `ReactDOM.createRoot`.

---

## Sections & Backgrounds

| Section | ID | Background | Animation |
|---|---|---|---|
| Nav | — | `bg-black/60 backdrop-blur` | GSAP hide/show on scroll direction |
| Hero | `#hero` | Transparent over canvas | Entrance anims on mount |
| About | `#about` | `#f5f5f5` (light) | `body.light-mode` class toggle |
| Blogs | `#blogs` | `bg-[#0a0a0a]/95` | Scroll reveal |
| Videos | `#videos` | `bg-[#0a0a0a]/95` | Scroll reveal |
| Projects | `#projects` | `bg-[#0a0a0a]/95` | Scroll reveal |
| Contact | `#contact` | `#0a0a0a` | Scroll reveal |

---

## Verification Checklist
1. `npm run dev` → site loads, canvas gradient follows mouse on desktop
2. Scroll down > 80px → nav hides; scroll up → nav reappears
3. Scroll to About → background transitions to light (`#f5f5f5`)
4. Blogs and Videos populate from `content.md`
5. Add a new blog entry to `content.md`, save → hot-reload shows new card
6. `npm run build && npm run preview` → production build works
7. Resize to 375px → hamburger nav, 1-col cards, canvas hidden
