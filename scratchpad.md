# Scratchpad

## Task 1.1 — Initialise Vite project with React + TypeScript template

**Plan:** Run `npm create vite@latest . -- --template react-ts` inside the portafolio directory. The directory already has files (CLAUDE.md, knowledge-base.md, etc.) — need to confirm Vite can scaffold into a non-empty directory.

**Done:** Scaffolded into /tmp/vite-temp then copied files over (Vite refuses non-empty dir interactively). Files present: src/, public/, index.html, package.json, vite.config.ts, tsconfig*.json, eslint.config.js.

---

## Phase 8 — Theme Overhaul (dgbhatt.dev color palette)

**Plan:** Full theme swap from dark (#0a0a0a bg, red brand, orange glow) to light (#ffffff bg, blue-600 brand, blue glow). About section becomes the sole dark block (bg-black, white text). Remove body.light-mode ScrollTrigger toggle entirely. Update all 11 files + run build.

**Files to touch:** tailwind.config.ts, src/index.css, Canvas.tsx, App.tsx, Nav.tsx, Hero.tsx, About.tsx, Blogs.tsx, Videos.tsx, Projects.tsx, Contact.tsx

**Done:** All 11 files updated + build passes clean (zero TS errors, 392ms). Key decisions:
- About.tsx: removed `useEffect`, `ScrollTrigger` import entirely — section is statically `bg-black text-white`
- Videos.tsx: added `bg-gray-50` to section for subtle rhythm break (matches plan's alternation note)
- body.light-mode rule removed from index.css; body now defaults to `background-color: #ffffff`
- brand-orange token removed from tailwind.config.ts (was unused after color swap)

---

## Phase 1 complete — notes

- Scaffolded via temp dir (Vite won't scaffold into non-empty dir interactively)
- tailwindcss v4 was pulled in by default — downgraded to v3 for config-based setup
- `manualChunks` type changed in Rollup — used function form `(id) => id.includes('gsap') ? 'gsap' : undefined`
- `moduleResolution: bundler` and `esModuleInterop` already correct in scaffolded tsconfig.app.json
- Boilerplate deleted: App.css, src/assets/; App.tsx cleared to minimal shell
- Profile photo: `IMG_0241.jpg` (professional headshot) copied to `public/profile.jpg`
- Build passes clean: `npm run build` ✓

---
