# Portfolio — Core Principles

## Tech Stack
- **Vite + React + TypeScript** — pure CSR, no SSR
- **Tailwind CSS** — all styling via utility classes, no custom CSS except in `index.css`
- **GSAP + ScrollTrigger** — the only animation system; zero `@keyframes` in CSS
- **`front-matter` v4** — browser-compatible YAML parser; never upgrade to v5+ (Node-only)

## Project Structure
```
src/components/   — one file per section (Canvas, Nav, Hero, About, Blogs, Videos, Projects, Contact)
src/hooks/        — useContent (fetch/parse), useReveal (GSAP scroll reveal)
src/types/        — TypeScript interfaces for content.md shape
src/data/         — hardcoded static data (projects)
public/           — static assets served at runtime; content.md lives here
```

## Content Architecture
- `public/content.md` is the single source of truth for all curated links and featured content
- It is **fetched at runtime** via `fetch('/content.md')`, not bundled — edit and deploy to update with no rebuild
- Structured as YAML frontmatter with three lists:
  - `blogs[]` — AntStack blog posts and external writing
  - `videos[]` — YouTube / AntStack TV episodes and conference talks
  - `links[]` — any other featured links (type: "other")
- To add a new blog, video, or featured post: append an entry to the relevant list in `content.md`, commit, and deploy — no code change required
- Static data (projects, bio) lives in `src/data/` and requires a code change to update

## GSAP Rules
- Register plugins **once**, in `main.tsx`, before `ReactDOM.createRoot` — never inside components
- Always use `gsap.context(() => { ... }, ref)` scoped to the section ref — never `ScrollTrigger.getAll().forEach(t => t.kill())`
- Clean up with `ctx.revert()` in `useEffect` return — this handles React 18 Strict Mode double-invocation
- Dynamic sections (Blogs, Videos) pass `[data]` as the `useEffect` dep array, not `[]` — triggers register only after content loads
- Call `ScrollTrigger.refresh()` after dynamic content renders and on debounced window resize

## Animation Patterns
- **Entrance (Hero)** — `gsap.from()` on mount, no ScrollTrigger; `power3.out`, staggered with delays
- **Scroll reveals (all other sections)** — `gsap.fromTo('.reveal', {opacity:0, y:60}, {opacity:1, y:0, duration:0.9, ease:'power2.out', stagger:0.12, scrollTrigger:{start:'top 80%'}})`
- **Nav hide/show** — `ScrollTrigger.create({ onUpdate })`, `y: '-100%'` on scroll down, `y: '0%'` on scroll up
- **Section theme toggle** — ScrollTrigger `onEnter/onLeave/onEnterBack/onLeaveBack` toggling `body.light-mode` class

## Color Palette
```
--dark:          #0a0a0a    page background
--brand:         #D51B1C    accent — buttons, headings, tags, logo
--canvas-glow:   rgba(255, 79, 0, 0.1)   outer stop of cursor gradient
--light-bg:      #f5f5f5    body.light-mode background (About section)
--light-text:    #0a0a0a
--body-text:     #e5e5e5
--muted-text:    #888888
```
- Card/section backgrounds use `bg-[#0a0a0a]/95` (semi-transparent) so the canvas glow bleeds through
- Never use fully opaque backgrounds on content sections

## Typography
- `font-anton` — all major headings (`font-family: 'Anton'`)
- `font-pixel` / `.font-pixel` — decorative labels, role tags (`font-family: 'Press Start 2P'`, `0.6rem`, uppercase)
- `font-sans` — body text (`Inter`)
- Fonts loaded via Google Fonts in `index.html` with `&display=swap`

## Canvas
- Single `<canvas>` rendered in `Canvas.tsx`, fixed full-bleed, `z-index: 0`, `pointer-events: none`
- Draws a radial gradient following the cursor via `requestAnimationFrame`; transparent center, `rgba(255,79,0,0.1)` outer, radius 400px
- Hidden on mobile (`hidden md:block`) — touch devices have no hover/cursor

## Mobile Friendly
- Desktop is the primary design target; mobile must not break or feel neglected
- Layouts are responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — but designed desktop-down, not mobile-up
- Nav collapses to a hamburger (`useState` toggle, no library) below `md`
- Section padding scales: `px-4 py-16` → `px-8 py-24` → `px-16 py-32`
- Hero heading scales: `text-5xl` → `text-7xl` → `text-8xl`

## Layering (z-index)
```
canvas (Canvas.tsx)     z-0   — always behind everything
main content            z-10  — sections sit above canvas
nav (Nav.tsx)           z-50  — always on top
```

## `useReveal` Hook Contract
- Returns a `ref` to attach to a section element
- Accepts optional `deps` array (default `[]`); pass `[data]` for async-loaded sections
- Internally uses `gsap.context()` scoped to the ref and calls `ScrollTrigger.refresh()`
- Cleanup is `ctx.revert()` — do not add additional cleanup

## Tailwind Conventions
- Custom tokens in `tailwind.config.ts`: `brand`, `brand-dark`, `brand-light`, `brand-orange`
- Use `bg-brand`, `text-brand`, `border-brand` — never hardcode `#D51B1C` in JSX
- Responsive prefix order: mobile-first (no prefix → `md:` → `lg:`)
- No `@apply` — keep styles in JSX classNames

## Skills & Agents
- Use the `portfolio-design` skill (`.agents/skills/portfolio-design/`) when working on any visual, CSS, or animation decisions — it contains the full design reference for both praveengorakala.com and dgbhatt.dev
  - `praveengorakala.md` — GSAP patterns, canvas gradient, font system, color themes
  - `dgbhatt-colors.md` — Tailwind color tokens, blue/gray palette, shadcn/ui design tokens
- Use the `next-best-practices` skill (`.agents/skills/next-best-practices/`) for any Next.js or React patterns, even though this project uses Vite — the RSC boundaries, data patterns, and error handling docs are still relevant
- Use the `knowledge-base.md` file at the project root as the authoritative source for all personal content (bio, experience, projects, certifications, links) — never invent or guess this data

## Working Through Tasks

When implementing this portfolio, follow this exact workflow for every task:

### Step 1 — Read the next task
Open `tasks.md` and find the first task that is still marked `[ ]` (todo). Read it fully before doing anything.

### Step 2 — Update the scratchpad
Open `scratchpad.md` (create it at the project root if it does not exist). Write down:
- Which task you are working on (number + title)
- What you are about to do (brief plan for this specific task)
- Any decisions or trade-offs relevant to this task

### Step 3 — Do exactly one task
Implement only the task you picked. Do not implement the next task. Do not refactor adjacent code. Do not add "nice to haves". Complete the task as described and stop.

### Step 4 — Mark it done in tasks.md
Go back to `tasks.md` and change `[ ]` to `[x]` on the task you just completed. Do not mark anything else done.

### Step 5 — Update the scratchpad
Add a short note to `scratchpad.md` under the completed task:
- What was actually done
- Any issues encountered or decisions made during implementation
- Anything the next task needs to know (e.g. a variable name, a file that was created)

### Step 6 — Stop and report
Tell the user which task was completed and what was done. Do not proceed to the next task automatically. Wait for the user to say "continue" or give other instructions.

### Rules
- Never skip a task or do two tasks in one turn
- Never mark a task done unless the code for it is fully written
- Always read `tasks.md` fresh before each task — do not rely on memory of what comes next
- Always write to `scratchpad.md` before starting and after finishing a task
- If a task is blocked or unclear, note it in `scratchpad.md` and ask the user before proceeding

## What NOT to Do
- Do not add a router — this is a single-page anchor-scroll site
- Do not add an icon library — use inline SVG for social icons
- Do not use `ScrollTrigger.getAll().forEach(t => t.kill())` in any cleanup
- Do not register GSAP plugins inside components
- Do not make section backgrounds fully opaque (breaks canvas glow)
- Do not use `front-matter` v5+ (breaks in the browser)
- Do not add `@keyframes` to CSS — GSAP handles all motion
