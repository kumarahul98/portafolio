import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#5C8DF2',
        'brand-dark': '#3b6fe0',
        'brand-light': '#e8effe',
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
