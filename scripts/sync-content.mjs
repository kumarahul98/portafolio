import { mkdir, readFile, writeFile } from 'fs/promises'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const source = resolve(__dirname, '../data/content.md')
const target = resolve(__dirname, '../src/content/generated.ts')

function parseValue(raw) {
  const value = raw.trim()

  if (value === '[]') return []
  if (value.startsWith('"') && value.endsWith('"')) {
    return JSON.parse(value)
  }

  return value
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) {
    throw new Error('Could not locate frontmatter in public/content.md')
  }

  const data = {
    blogs: [],
    videos: [],
    links: [],
  }

  let section = null
  let item = null

  for (const line of match[1].split('\n')) {
    if (!line.trim()) continue

    const sectionMatch = line.match(/^([a-z]+):\s*(\[\])?$/)
    if (sectionMatch) {
      if (item && section) {
        data[section].push(item)
      }

      section = sectionMatch[1]
      item = null
      continue
    }

    const itemMatch = line.match(/^  - ([a-z]+):\s*(.+)$/)
    if (itemMatch && section) {
      if (item) {
        data[section].push(item)
      }

      item = {
        [itemMatch[1]]: parseValue(itemMatch[2]),
      }
      continue
    }

    const fieldMatch = line.match(/^    ([a-z]+):\s*(.+)$/)
    if (fieldMatch && item) {
      item[fieldMatch[1]] = parseValue(fieldMatch[2])
    }
  }

  if (item && section) {
    data[section].push(item)
  }

  return data
}

const raw = await readFile(source, 'utf8')
const contentData = parseFrontmatter(raw)
const fileContents = `import type { ContentFrontmatter } from '../types/content'

export const contentData: ContentFrontmatter = ${JSON.stringify(contentData, null, 2)}
`

await mkdir(dirname(target), { recursive: true })
await writeFile(target, fileContents, 'utf8')
