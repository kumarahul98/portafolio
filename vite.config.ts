import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
// Inlines the single app CSS file into a <style> tag to eliminate the render-blocking <link>
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html
        for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
          if (fileName.endsWith('.css') && chunk.type === 'asset') {
            const css = (chunk as { source: string | Uint8Array }).source
            const cssStr = typeof css === 'string' ? css : Buffer.from(css).toString('utf-8')
            // Replace the <link rel="stylesheet"> with an inline <style>
            html = html.replace(
              new RegExp(`<link[^>]+rel=["']stylesheet["'][^>]+href=["'][^"']*${fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`),
              `<style>${cssStr}</style>`
            )
          }
        }
        return html
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), inlineCss()],
  server: { host: true },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('gsap')) return 'gsap'
        },
      },
    },
  },
})
