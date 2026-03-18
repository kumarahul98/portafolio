# praveengorakala.com — CSS & Animation System

Next.js portfolio site. All animations are GSAP-driven — **zero `@keyframes` in the CSS**.

---

## Typography System

All fonts use `font-display: swap` and WOFF2 format, served from `/_next/static/media/`.

```css
/* Primary display font */
:root {
  --font-anton: 'Anton', 'Anton Fallback';
}

/* Geist Sans — variable weight sans-serif (body/UI text) */
@font-face {
  font-family: GeistSans;
  src: url('/media/Geist_Variable-s.p.92592eb2.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
/* Metric-matched fallback to prevent layout shift */
@font-face {
  font-family: 'GeistSans Fallback';
  src: local(Arial);
  ascent-override: 94.56%;
  descent-override: 27.76%;
  line-gap-override: 0%;
  size-adjust: 106.28%;
}
:root { --font-geist-sans: 'GeistSans', 'GeistSans Fallback'; }

/* Geist Mono — variable weight monospace */
@font-face {
  font-family: GeistMono;
  src: url('/media/GeistMono_Variable.p.2f937313.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}
:root {
  --font-geist-mono: 'GeistMono', ui-monospace, SFMono-Regular, 'Roboto Mono',
    Menlo, Monaco, 'Liberation Mono', 'DejaVu Sans Mono', 'Courier New', monospace;
}

/* Pixel Font Family — all weight 500, all decorative/display */
@font-face { font-family: GeistPixelSquare;   src: url('/media/GeistPixel_Square.p.31e87829.woff2')   format('woff2'); font-display: swap; font-weight: 500; }
@font-face { font-family: GeistPixelGrid;     src: url('/media/GeistPixel_Grid.p.2192fce6.woff2')     format('woff2'); font-display: swap; font-weight: 500; }
@font-face { font-family: GeistPixelCircle;   src: url('/media/GeistPixel_Circle.p.e967dc6b.woff2')   format('woff2'); font-display: swap; font-weight: 500; }
@font-face { font-family: GeistPixelTriangle; src: url('/media/GeistPixel_Triangle.p.41e14d68.woff2') format('woff2'); font-display: swap; font-weight: 500; }
@font-face { font-family: GeistPixelLine;     src: url('/media/GeistPixel_Line.p.e7444037.woff2')     format('woff2'); font-display: swap; font-weight: 500; }

:root {
  --font-geist-pixel-square:   'GeistPixelSquare',   GeistMono, ui-monospace, monospace;
  --font-geist-pixel-grid:     'GeistPixelGrid',     GeistMono, ui-monospace, monospace;
  --font-geist-pixel-circle:   'GeistPixelCircle',   GeistMono, ui-monospace, monospace;
  --font-geist-pixel-triangle: 'GeistPixelTriangle', GeistMono, ui-monospace, monospace;
  --font-geist-pixel-line:     'GeistPixelLine',     GeistMono, ui-monospace, monospace;
}
```

---

## Color Themes

Two switchable themes toggled as classes on `<body>`:

### Spiderman Theme (`.spiderman-theme`)
```css
--color-primary: #D51B1C;  /* bold red */
```

### Orange Theme (`.orange-theme`)
```css
--gradient-outer: rgba(255, 79, 0, 0.1);
--gradient-center: rgba(0, 0, 0, 0);
```

### Section contrast
```css
.dark-section-view, .dark { /* dark bg, inverted text */ }
.light { /* light bg treatment */ }
```

---

## Interactive Canvas Gradient (Mouse-Follow Effect)

A `<canvas>` sits behind all content as a full-bleed overlay rendering a radial gradient that follows the cursor:

```css
canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
}
```

```js
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function drawGradient(x, y) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, 400);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');        // transparent center
  gradient.addColorStop(1, 'rgba(255, 79, 0, 0.1)');   // orange outer glow
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('mousemove', (e) => drawGradient(e.clientX, e.clientY));
window.addEventListener('touchmove', (e) => {
  drawGradient(e.touches[0].clientX, e.touches[0].clientY);
});
```

---

## Animation System (GSAP + ScrollTrigger)

### Easing conventions
- Most tweens: `power2.out` or `quad.out`
- Scroll-triggered reveals: `power2.out`

### Scroll-triggered reveal pattern
```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

gsap.from('.section-element', {
  opacity: 0,
  y: 60,
  duration: 0.9,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.section-element',
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
});
```

### Dark/light section switching
```js
ScrollTrigger.create({
  trigger: '.dark-section-view',
  start: 'top center',
  end: 'bottom center',
  onEnter:     () => document.body.classList.add('dark'),
  onLeave:     () => document.body.classList.remove('dark'),
  onEnterBack: () => document.body.classList.add('dark'),
  onLeaveBack: () => document.body.classList.remove('dark'),
});
```

### 3D perspective context
```css
.perspective-container {
  perspective: 800px; /* varies per component */
}
```

### GSAP-injected classes
- `.gsap-marker-start` / `.gsap-marker-end` — ScrollTrigger debug markers
- `.pin-spacer` — inserted for pinned sections

---

## Navigation

```css
.navBar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  /* visibility toggled on scroll direction */
}
.navBar.visible   { /* shown when scrolling up */ }
.burgerMenu       { /* mobile hamburger */ }
.burgerMenu.open  { /* expanded state */ }
.menuItems        { /* nav link list */ }
.btn              { /* CTA — "Let's Talk" */ }
.pixel-font       { font-family: var(--font-geist-pixel-square); font-weight: 500; }
```

---

## Slick Carousel (Image Gallery)

```css
.slick-slider {
  box-sizing: border-box;
  user-select: none;
  -webkit-touch-callout: none;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
  display: block;
  position: relative;
}
.slick-list { margin: 0; padding: 0; display: block; position: relative; overflow: hidden; }
.slick-list.dragging { cursor: grab; }
.slick-slider .slick-track,
.slick-slider .slick-list { transform: translate(0, 0); }
.slick-track { margin-left: auto; margin-right: auto; display: block; position: relative; top: 0; left: 0; }
.slick-slide { float: left; height: 100%; min-height: 1px; display: none; }
[dir='rtl'] .slick-slide { float: right; }
.slick-slide img { display: block; }
.slick-initialized .slick-slide { display: block; }
.slick-arrow.slick-hidden { display: none; }
```

---

## Layout Patterns

| Pattern | Implementation |
|---|---|
| Full-bleed sections | `width: 100%; min-height: 100vh` |
| Hero dual-column | Flexbox/Grid, text left / image right |
| Responsive images | Next.js `<Image>` via `/_next/image` |
| SVG tech icons | Inline SVGs or `<img>` |
| Z-axis layering | Canvas `z-index: 0`, nav `z-index: 100` |

---

## Quick Reference — CSS Custom Properties

```css
:root {
  --font-anton:                'Anton', 'Anton Fallback';
  --font-geist-sans:           'GeistSans', 'GeistSans Fallback';
  --font-geist-mono:           'GeistMono', ui-monospace, monospace;
  --font-geist-pixel-square:   'GeistPixelSquare',   GeistMono, monospace;
  --font-geist-pixel-grid:     'GeistPixelGrid',     GeistMono, monospace;
  --font-geist-pixel-circle:   'GeistPixelCircle',   GeistMono, monospace;
  --font-geist-pixel-triangle: 'GeistPixelTriangle', GeistMono, monospace;
  --font-geist-pixel-line:     'GeistPixelLine',     GeistMono, monospace;
}
```

## Usage Tips

- **Big headings** → `--font-anton`
- **Body/UI text** → `--font-geist-sans`
- **Decorative labels/nav** → `--font-geist-pixel-square` + `.pixel-font`
- **Scroll animation default** → `opacity 0→1`, `y 60→0`, `power2.out`, trigger at `top 80%`
- **Mouse gradient** → canvas with `rgba(255,79,0,0.1)` outer stop, radius 400px
