# Portfolio — Task List

Status legend: `[ ]` todo · `[x]` done · `[-]` skipped

---

## Phase 1 — Project Setup

- [x] **1.1** Initialise Vite project with React + TypeScript template (`npm create vite@latest . -- --template react-ts`)
- [x] **1.2** Install dependencies: `react`, `react-dom`, `gsap`, `front-matter@4`
- [x] **1.3** Install dev dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `@vitejs/plugin-react`
- [x] **1.4** Run `npx tailwindcss init -p` and configure `tailwind.config.ts` (content paths, font tokens, color tokens)
- [x] **1.5** Set up `postcss.config.ts`
- [x] **1.6** Replace generated `src/index.css` with Tailwind directives + `.reveal`, `body.light-mode`, `.font-pixel` base styles
- [x] **1.7** Update `index.html` — set page title, meta description, add Google Fonts preconnect + Anton / Press Start 2P / Inter link tags
- [x] **1.8** Update `vite.config.ts` — add `@vitejs/plugin-react`, set build target `es2020`, add `manualChunks: { gsap: ['gsap'] }`
- [x] **1.9** Update `tsconfig.json` — ensure `"moduleResolution": "bundler"` and `"esModuleInterop": true`
- [x] **1.10** Delete Vite boilerplate (`App.css`, `assets/react.svg`, contents of `App.tsx`)
- [x] **1.11** Create folder structure: `src/components/`, `src/hooks/`, `src/types/`, `src/data/`

---

## Phase 2 — Content & Data Files

- [x] **2.1** Create `src/types/content.ts` — define `BlogEntry`, `VideoEntry`, `LinkEntry`, `ContentFrontmatter` interfaces
- [x] **2.2** Create `src/data/projects.ts` — populate `PROJECTS` array with all 6 projects from `knowledge-base.md` (title, role, description, tags)
- [x] **2.3** Create `public/content.md` — write YAML frontmatter with `blogs[]`, `videos[]`, `links[]`; populate with all entries from `knowledge-base.md`

---

## Phase 3 — Hooks

- [x] **3.1** Create `src/hooks/useContent.ts`
  - `fetch('/content.md')` on mount
  - Parse with `import fm from 'front-matter'`
  - Return `{ data, body, loading, error }`
- [x] **3.2** Create `src/hooks/useReveal.ts`
  - Accept optional `deps` array
  - Use `gsap.context(() => { gsap.fromTo('.reveal', ...) }, ref)`
  - Call `ScrollTrigger.refresh()` after registering
  - Return `ctx.revert()` as cleanup
  - Return typed `ref`

---

## Phase 4 — Entry Point & App Shell

- [x] **4.1** Update `src/main.tsx`
  - Import and register `gsap` + `ScrollTrigger` **before** React renders
  - Render `<App />` inside `React.StrictMode`
- [x] **4.2** Create `src/App.tsx`
  - Call `useContent()`
  - Render: `<Canvas />`, `<Nav />`, `<main>` containing all sections in order
  - Pass `content.data?.blogs` and `content.data?.videos` to respective components
  - Add debounced `ScrollTrigger.refresh()` on `window.resize`

---

## Phase 5 — Components

### Canvas
- [x] **5.1** Create `src/components/Canvas.tsx`
  - `<canvas>` with `className="hidden md:block fixed inset-0 z-0 pointer-events-none"`
  - `useEffect`: set canvas dimensions, attach `mousemove` listener, run `requestAnimationFrame` draw loop
  - Draw loop: `clearRect`, `createRadialGradient(x, y, 0, x, y, 400)`, stop 0 = `rgba(255,79,0,0.10)`, stop 1 = `rgba(255,79,0,0)`
  - Cleanup: `cancelAnimationFrame`, remove resize + mousemove listeners

### Nav
- [x] **5.2** Create `src/components/Nav.tsx` — structure and styles
  - Fixed bar: `fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/60`
  - Logo "RK." — Anton font, `text-brand`
  - Desktop links: `#hero`, `#about`, `#blogs`, `#videos`, `#projects`, `#contact`
  - Mobile: hamburger icon, `useState` open/close, links shown/hidden
- [x] **5.3** Add GSAP hide/show to `Nav.tsx`
  - `ScrollTrigger.create({ onUpdate })` in `useEffect`
  - Scroll down > 80px: `gsap.to(navRef, { y: '-100%', duration: 0.4, ease: 'power2.in' })`
  - Scroll up: `gsap.to(navRef, { y: '0%', duration: 0.4, ease: 'power2.out' })`

### Hero
- [x] **5.4** Create `src/components/Hero.tsx` — structure and styles
  - `id="hero"`, `min-h-screen flex flex-col justify-center`
  - Pixel-font label: "PRINCIPAL SOLUTIONS ARCHITECT"
  - Anton heading: "RAHUL KUMAR" with `text-brand` on "RAHUL"
  - Bio line from `knowledge-base.md`
  - Two buttons: "View Projects ↓" (`bg-brand`) + "Get in Touch" (outline `border-brand`)
  - Responsive heading: `text-5xl md:text-7xl lg:text-8xl`
- [x] **5.5** Add entrance GSAP animations to `Hero.tsx` (on mount, no ScrollTrigger)
  - Heading: `{ y: 80, opacity: 0, duration: 1.2, ease: 'power3.out' }`
  - Label: `{ y: 40, opacity: 0, duration: 0.8, delay: 0.2 }`
  - Bio: `{ opacity: 0, duration: 1, delay: 0.5 }`
  - Buttons: `{ opacity: 0, y: 20, stagger: 0.15, delay: 0.7 }`

### About
- [x] **5.6** Create `src/components/About.tsx` — structure and styles
  - `id="about"`, light section background `bg-brand-light`
  - Sub-section 1: Experience timeline — AntStack (Jul 2021–Present), 9Logic (Oct 2020–Jul 2021), Neudesic (Jan–Apr 2020)
  - Sub-section 2: Skills grid — grouped by category (AWS / Data / Languages / DevOps); tag-pill style
  - Sub-section 3: Certifications — 5 badge cards (AWS SAP, SAA, DA, CCP, Databricks)
  - All sub-section elements have `.reveal` class
- [x] **5.7** Add light-mode ScrollTrigger toggle to `About.tsx`
  - `onEnter/onLeave/onEnterBack/onLeaveBack` toggle `body.light-mode`
  - `start: 'top 60%'`, `end: 'bottom 40%'`
- [x] **5.8** Add `useReveal()` scroll reveal to `About.tsx`

### Blogs
- [x] **5.9** Create `src/components/Blogs.tsx`
  - Props: `{ data: BlogEntry[], loading: boolean }`
  - `id="blogs"`, section heading "WRITINGS" (Anton)
  - Sort `data` by `date` descending before render
  - Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - Card: title, formatted date, 2-line clamped description (`line-clamp-2`), "Read →" external link (`target="_blank" rel="noopener noreferrer"`)
  - Card background: `bg-[#0a0a0a]/95 border border-white/10`
  - Loading state: 6 `animate-pulse` skeleton cards
  - Empty state: "No writings yet — check back soon."
  - Add `.reveal` class to each card
- [x] **5.10** Add `useReveal([data])` to `Blogs.tsx`

### Videos
- [x] **5.11** Create `src/components/Videos.tsx`
  - Props: `{ data: VideoEntry[], loading: boolean }`
  - `id="videos"`, section heading "TALKS & VIDEOS" (Anton)
  - Sort `data` by `date` descending
  - Same grid and card structure as Blogs
  - Extract YouTube video ID: `url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)`
  - Render thumbnail: `https://img.youtube.com/vi/{id}/mqdefault.jpg`
  - `<img onError>` → fallback to a solid `bg-brand/20` placeholder div
  - Add `.reveal` class to each card
- [x] **5.12** Add `useReveal([data])` to `Videos.tsx`

### Projects
- [x] **5.13** Create `src/components/Projects.tsx`
  - `id="projects"`, section heading "PROJECTS" (Anton)
  - Import `PROJECTS` from `src/data/projects.ts`
  - Grid: `grid-cols-1 lg:grid-cols-2 gap-8`
  - Card: pixel-font role label, Anton title, body description, tag pills (`border-brand text-brand text-xs`)
  - Card background: `bg-[#0a0a0a]/95 border border-white/10`
  - Add `.reveal` class to each card
- [x] **5.14** Add `useReveal()` to `Projects.tsx`

### Contact
- [x] **5.15** Create `src/components/Contact.tsx`
  - `id="contact"`, centered layout
  - Anton heading: "LET'S WORK TOGETHER"
  - Subtext: "Open to collaborations, speaking opportunities, and consulting."
  - `<a href="mailto:rahulkumar@antstack.com">` CTA button (`bg-brand`)
  - Social row with inline SVG icons:
    - LinkedIn → `https://www.linkedin.com/in/kumarahul98/`
    - Twitter/X → `https://twitter.com/kuma_r_ahul`
    - AntStack author → `https://www.antstack.com/author/rahul-kumar/`
  - Add `.reveal` class to all elements
- [x] **5.16** Add `useReveal()` to `Contact.tsx`

---

## Phase 6 — Polish & Responsive

- [x] **6.1** Verify canvas glow bleeds through all dark sections (check all section backgrounds are `bg-[#0a0a0a]/95` not fully opaque)
- [x] **6.2** Test Nav hamburger on mobile — links open/close correctly, close after selecting a link
- [x] **6.3** Test anchor scroll — all nav links scroll smoothly to the correct section
- [x] **6.4** Test dark/light transition — About section correctly toggles `body.light-mode` in both scroll directions
- [x] **6.5** Test skeleton loading states in Blogs and Videos (throttle network in DevTools)
- [x] **6.6** Test `content.md` update flow — add a dummy blog entry, verify it appears on hot-reload
- [x] **6.7** Verify all external links open in a new tab with `rel="noopener noreferrer"`
- [x] **6.8** Check YouTube thumbnail fallback — test with a broken video ID
- [x] **6.9** Resize to 375px — confirm 1-col layouts, hamburger nav, no canvas, no horizontal scroll
- [x] **6.10** Resize to 768px (tablet) — confirm 2-col grids, full nav links

---

## Phase 7 — Build & Final Check

- [x] **7.1** Run `npm run build` — confirm zero TypeScript errors
- [x] **7.2** Run `npm run preview` — verify production build works end-to-end
- [x] **7.3** Confirm `public/content.md` is included in the build output (`dist/content.md`)
- [x] **7.4** Check bundle size — GSAP chunk should be separate; total JS should be reasonable
- [x] **7.5** Check browser console — no errors, no GSAP double-registration warnings

---

---

## Phase 8 — Theme Overhaul

- [x] **8.1** Update `tailwind.config.ts` — swap color tokens to blue palette
- [x] **8.2** Update `src/index.css` — update CSS vars, remove body.light-mode rule
- [x] **8.3** Update `Canvas.tsx` — change gradient from orange to blue
- [x] **8.4** Update `App.tsx` — flip wrapper from dark to white
- [x] **8.5** Update `Nav.tsx` — white nav, gray text
- [x] **8.6** Update `Hero.tsx` — gray text hierarchy
- [x] **8.7** Update `About.tsx` — black contrast block, white text, remove ScrollTrigger light-mode toggle
- [x] **8.8** Update `Blogs.tsx` — white cards, gray text
- [x] **8.9** Update `Videos.tsx` — white cards, gray text
- [x] **8.10** Update `Projects.tsx` — white cards, gray text
- [x] **8.11** Update `Contact.tsx` — gray text
- [x] **8.12** Run `npm run build` — confirm zero TS errors, clean build

---

## Notes
- All personal content (bio, experience, certifications, links) must come from `knowledge-base.md` — never invented
- Refer to `.agents/skills/portfolio-design/praveengorakala.md` for GSAP animation values and canvas implementation
- Refer to `.agents/skills/portfolio-design/dgbhatt-colors.md` if adapting any color decisions
- `front-matter` must stay at v4 — v5 breaks in the browser
