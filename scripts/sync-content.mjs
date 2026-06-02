import { mkdir, readdir, readFile, writeFile } from 'fs/promises'
import { basename, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import fm from 'front-matter'
import { marked } from 'marked'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const source = resolve(__dirname, '../data/content.md')
const postsDir = resolve(__dirname, '../data/posts')
const target = resolve(__dirname, '../src/content/generated.ts')

function parseValue(raw) {
  const value = raw.trim()

  if (value === '[]') return []
  if (value === 'true') return true
  if (value === 'false') return false
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

// Read every markdown file in data/posts/, parse frontmatter, and convert the
// body to HTML at build time. Returns a BlogPost[] sorted newest-first.
async function readPosts() {
  let files = []
  try {
    files = (await readdir(postsDir)).filter((name) => name.endsWith('.md'))
  } catch {
    // data/posts/ may not exist yet — emit an empty blog list.
    return []
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(resolve(postsDir, file), 'utf8')
      const { attributes, body } = fm(raw)

      return {
        slug: basename(file, '.md'),
        title: attributes.title ?? basename(file, '.md'),
        date: attributes.date ?? '',
        description: attributes.description ?? '',
        tags: attributes.tags ?? [],
        cover: attributes.cover ?? '',
        html: marked.parse(body, { async: false }),
      }
    })
  )

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const raw = await readFile(source, 'utf8')
const contentData = parseFrontmatter(raw)
// Blogs now come from data/posts/*.md, not content.md.
contentData.blogs = await readPosts()
const fileContents = `import type { ContentFrontmatter } from '../types/content'

export const contentData: ContentFrontmatter = ${JSON.stringify(contentData, null, 2)}
`

await mkdir(dirname(target), { recursive: true })
await writeFile(target, fileContents, 'utf8')
