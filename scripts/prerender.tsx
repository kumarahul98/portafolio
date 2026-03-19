import React from 'react'
import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { renderToString } from 'react-dom/server'
import App from '../src/App'

async function main() {
  const distIndexPath = resolve(process.cwd(), 'dist/index.html')
  const appHtml = renderToString(<App />)
  const indexHtml = await readFile(distIndexPath, 'utf8')

  const prerenderedHtml = indexHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  )

  await writeFile(distIndexPath, prerenderedHtml, 'utf8')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
