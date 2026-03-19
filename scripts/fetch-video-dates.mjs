/**
 * fetch-video-dates.mjs
 *
 * Developer utility — no API key required.
 * Scrapes YouTube watch pages for JSON-LD datePublished, updates content.md,
 * and sorts the videos block descending by date.
 *
 * Usage:  node scripts/fetch-video-dates.mjs
 */

import https from 'https'
import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const CONTENT_PATH = resolve(__dirname, '../data/content.md')

/** Fetch a URL and return the response body as a string. */
function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetch(res.headers.location).then(resolve).catch(reject)
          return
        }
        const chunks = []
        res.on('data', (c) => chunks.push(c))
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
        res.on('error', reject)
      }
    )
    req.on('error', reject)
    req.setTimeout(15_000, () => {
      req.destroy(new Error(`Timeout fetching ${url}`))
    })
  })
}

/** Extract datePublished from YouTube page JSON-LD. */
function extractDate(html) {
  const m = html.match(/"datePublished":"(\d{4}-\d{2}-\d{2})"/)
  return m ? m[1] : null
}

/**
 * Parse the videos block out of raw frontmatter text.
 * Returns an array of { raw: string (the full block for this entry), url, date }.
 */
function parseVideoBlocks(fm) {
  // Split on lines that start a new entry (  - title:)
  const blocks = fm.split(/(?=\n  - title:)/)
  return blocks
    .map((block) => {
      const urlMatch = block.match(/\n    url:\s*"([^"]+)"/)
      const dateMatch = block.match(/\n    date:\s*"(\d{4}-\d{2}-\d{2})"/)
      if (!urlMatch) return null
      return {
        raw: block,
        url: urlMatch[1],
        date: dateMatch ? dateMatch[1] : null,
      }
    })
    .filter(Boolean)
}

/** Replace the date field inside a single video block string. */
function updateBlockDate(block, newDate) {
  return block.replace(
    /(\n    date:\s*)"(\d{4}-\d{2}-\d{2})"/,
    `$1"${newDate}"`
  )
}

async function main() {
  const raw = await readFile(CONTENT_PATH, 'utf8')

  // Isolate the videos: section (between "videos:" and "links:")
  const videosMatch = raw.match(/(\nvideos:\n)([\s\S]*?)(\nlinks:)/)
  if (!videosMatch) {
    console.error('Could not locate videos: block in content.md')
    process.exit(1)
  }

  const [fullMatch, header, videosBody, linksHeader] = videosMatch
  const blocks = parseVideoBlocks(videosBody)

  console.log(`Found ${blocks.length} videos. Fetching dates...\n`)

  const updated = []
  for (const block of blocks) {
    const isYouTube = block.url.includes('youtube.com') || block.url.includes('youtu.be')
    if (!isYouTube) {
      console.log(`  SKIP  ${block.url}  (not YouTube)`)
      updated.push({ ...block, newDate: block.date })
      continue
    }

    let newDate = block.date
    try {
      const html = await fetch(block.url)
      const scraped = extractDate(html)
      if (scraped) {
        newDate = scraped
        const changed = scraped !== block.date ? ' ← CHANGED' : ''
        console.log(`  OK    ${block.url}`)
        console.log(`        ${block.date} → ${scraped}${changed}`)
      } else {
        console.log(`  WARN  ${block.url}  (datePublished not found, keeping ${block.date})`)
      }
    } catch (err) {
      console.log(`  ERR   ${block.url}  (${err.message}, keeping ${block.date})`)
    }

    updated.push({ ...block, newDate })
    // Be polite — small delay between requests
    await new Promise((r) => setTimeout(r, 500))
  }

  // Sort descending by newDate
  updated.sort((a, b) => b.newDate.localeCompare(a.newDate))

  // Rebuild videos body with updated dates and sorted order
  const newVideosBody = updated
    .map((entry) => updateBlockDate(entry.raw, entry.newDate))
    .join('')

  const newContent = raw.replace(
    fullMatch,
    `${header}${newVideosBody}${linksHeader}`
  )

  await writeFile(CONTENT_PATH, newContent, 'utf8')
  console.log('\ncontent.md updated and videos sorted descending by date.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
