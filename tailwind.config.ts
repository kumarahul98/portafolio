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
        'off-white': '#F9F9FA',
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
