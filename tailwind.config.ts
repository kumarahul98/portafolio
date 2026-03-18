import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#D51B1C',
        'brand-dark': '#b01718',
        'brand-light': '#fde8e8',
        navy: '#162C5A',
        'app-bg': 'var(--c-bg)',
        'app-bg-subtle': 'var(--c-bg-subtle)',
        'app-heading': 'var(--c-heading)',
        'app-body': 'var(--c-body)',
        'app-muted': 'var(--c-muted)',
        'app-border': 'var(--c-border)',
        'app-card': 'var(--c-card)',
        'app-nav-bg': 'var(--c-nav-bg)',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
