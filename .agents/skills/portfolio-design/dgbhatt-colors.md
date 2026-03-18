# dgbhatt.dev — Color Palette

Next.js + Tailwind CSS portfolio. Single brand accent (`#2563eb` blue-600) over a white/gray scale with a black contrast block.

---

## CSS Design Tokens (shadcn/ui HSL pattern)

```css
:root {
  --background:             0 0% 100%;          /* #ffffff */
  --foreground:             0 0% 0%;            /* #000000 */
  --card:                   0 0% 100%;          /* #ffffff */
  --card-foreground:        0 0% 0%;            /* #000000 */
  --popover:                0 0% 100%;          /* #ffffff */
  --popover-foreground:     0 0% 0%;            /* #000000 */
  --primary:                217.2 91.2% 59.8%;  /* ~#4a90e2 */
  --primary-foreground:     0 0% 100%;          /* #ffffff */
  --secondary:              0 0% 100%;          /* #ffffff */
  --secondary-foreground:   0 0% 0%;            /* #000000 */
  --muted:                  0 0% 96%;           /* ~#f5f5f5 */
  --muted-foreground:       0 0% 40%;           /* ~#666666 */
  --accent:                 217.2 91.2% 59.8%;  /* ~#4a90e2 */
  --accent-foreground:      0 0% 100%;          /* #ffffff */
  --destructive:            0 84.2% 60.2%;      /* ~#e84040 */
  --destructive-foreground: 210 40% 98%;        /* ~#f5f8ff */
  --border:                 0 0% 92%;           /* ~#ebebeb */
  --input:                  0 0% 96%;           /* ~#f5f5f5 */
  --ring:                   217.2 91.2% 59.8%;  /* ~#4a90e2 */
}
```

---

## Full Color Reference

### Brand / Accent — Blue Scale

| Role | Tailwind Class | Hex |
|---|---|---|
| Primary CTA background | `bg-blue-600` | `#2563eb` |
| CTA hover | `hover:bg-blue-700` | `#1d4ed8` |
| Headings / icons / links | `text-blue-600` | `#2563eb` |
| Icon container fill | `bg-blue-100` | `#dbeafe` |
| Section gradient start | `from-blue-50` | `#eff6ff` |
| Section gradient end | `to-indigo-50` | `#eef2ff` |
| Focus ring | `--tw-ring-color` | `rgba(59,130,246,0.5)` |

### Neutrals — Gray Scale

| Role | Tailwind Class | Hex |
|---|---|---|
| Primary headings | `text-gray-900` | `#111827` |
| Body / descriptions | `text-gray-700` | `#374151` |
| Supporting copy | `text-gray-600` | `#4b5563` |
| Labels / captions | `text-gray-500` | `#6b7280` |
| Page / card background | `bg-white` | `#ffffff` |
| Subtle section bg | `bg-gray-50` | `#f9fafb` |
| Muted bg / hover | `bg-gray-100` | `#f3f4f6` |
| Card borders / dividers | `border-gray-200` | `#e5e7eb` |
| Navbar (translucent) | `bg-white/95` | `rgba(255,255,255,0.95)` |

### Bold Contrast — Black

| Role | Tailwind Class | Hex |
|---|---|---|
| Bio section background | `bg-black` | `#000000` |
| Secondary button bg | `bg-black` | `#000000` |
| Secondary button border | `border-black` | `#000000` |
| Text on dark | `text-white` | `#ffffff` |

### Shadows

```css
shadow-sm:  0 1px 2px 0 rgba(0,0,0,0.05)
shadow-md:  0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)
shadow-lg:  0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)
```

---

## Palette at a Glance

```
Brand blue:       #2563eb  (blue-600)  — CTAs, headings, icons, hover states
Brand blue hover: #1d4ed8  (blue-700)  — button hover
Icon tint:        #dbeafe  (blue-100)  — icon container fills
Gradient start:   #eff6ff  (blue-50)   — section bg gradient
Gradient end:     #eef2ff  (indigo-50) — section bg gradient
Black:            #000000              — bold bio block, outline buttons
White:            #ffffff              — page bg, cards
Off-white:        #f9fafb  (gray-50)   — subtle section alternation
Light border:     #e5e7eb  (gray-200)  — card/divider borders
Body text:        #374151  (gray-700)  — descriptions
Heading text:     #111827  (gray-900)  — primary headings
Subdued text:     #6b7280  (gray-500)  — labels, captions
```

---

## Design Language

- **Single accent**: `#2563eb` — used for headings, CTAs, icon fills, all interactive hover states
- **Black contrast block**: `#000000` for bold bio/feature sections and outline buttons
- **White + gray scale** for everything else — no secondary accent colors
- **Gradient**: subtle `blue-50 → indigo-50` diagonal on section backgrounds
- **No dark mode** in the live build

---

## Usage Tips

- **Primary button** → `bg-blue-600 hover:bg-blue-700 text-white`
- **Secondary button** → `bg-black text-white border-2 border-black`
- **Section backgrounds** → `bg-white` or `bg-gray-50`, optional `from-blue-50 to-indigo-50` gradient
- **Typography hierarchy** → `text-gray-900` headings → `text-gray-700` body → `text-gray-500` captions
- **Bold section** → `bg-black text-white`
