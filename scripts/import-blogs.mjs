/**
 * One-time importer: crawls the listed AntStack blog posts, extracts the
 * article body with Mozilla Readability, converts it to markdown (Turndown +
 * GFM), downloads inline images to public/blog-images/<slug>/, rewrites image
 * references to local paths, and writes data/posts/<slug>.md.
 *
 * Requires dev deps (install transiently, not part of the app build):
 *   npm i --no-save jsdom @mozilla/readability turndown turndown-plugin-gfm
 *
 * Run: node scripts/import-blogs.mjs
 */
import { mkdir, writeFile } from 'fs/promises'
import { basename, extname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { JSDOM } from 'jsdom'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const postsDir = resolve(__dirname, '../data/posts')
const imagesRoot = resolve(__dirname, '../public/blog-images')

const POSTS = [
  {
    slug: 'optimizing-rls-performance-with-supabase',
    url: 'https://www.antstack.com/blog/optimizing-rls-performance-with-supabase/',
    title: 'Optimizing RLS Performance with Supabase (Postgres)',
    date: '2025-01-13',
    description:
      'Deep dive into Row Level Security performance tuning on Supabase — indexes, policy design, and query patterns that keep multi-tenant apps fast.',
    tags: ['supabase', 'postgres', 'rls', 'performance'],
  },
  {
    slug: 'multi-tenant-applications-with-rls-on-supabase',
    url: 'https://www.antstack.com/blog/multi-tenant-applications-with-rls-on-supabase-postgress/',
    title: 'Multi-Tenant Applications with RLS on Supabase (Postgres)',
    date: '2024-12-23',
    description:
      'How to architect multi-tenant SaaS apps using Postgres Row Level Security on Supabase — tenant isolation, policy patterns, and real-world trade-offs.',
    tags: ['supabase', 'postgres', 'rls', 'multi-tenant'],
  },
  {
    slug: 'streaming-dynamodb-data-into-a-hudi-table',
    url: 'https://www.antstack.com/blog/Streaming-DynamoDB-Data-into-a-Hudi-Table/',
    title: 'Streaming DynamoDB Data into a Hudi Table: AWS Glue in Action',
    date: '2024-10-14',
    description:
      'Step-by-step walkthrough of streaming DynamoDB change data into an Apache Hudi table using AWS Glue, enabling near-real-time lakehouse updates.',
    tags: ['aws', 'dynamodb', 'hudi', 'glue', 'data-engineering'],
  },
  {
    slug: 'bigquery-basics-quick-start-guide',
    url: 'https://www.antstack.com/blog/big-query-basics-a-quick-start-guide-for-newbies/',
    title: 'BigQuery Basics: A Quick Start Guide for Newbies',
    date: '2024-05-08',
    description:
      'A practical introduction to Google BigQuery — serverless SQL, partitioning, clustering, and cost control for engineers new to the platform.',
    tags: ['gcp', 'bigquery', 'sql', 'data-engineering'],
  },
  {
    slug: 'getting-started-with-opensearch',
    url: 'https://www.antstack.com/blog/getting-started-with-open-search/',
    title: 'Getting Started with OpenSearch',
    date: '2021-10-27',
    description:
      'Introduction to OpenSearch — setting up clusters, indexing data, and running full-text and aggregation queries on AWS.',
    tags: ['aws', 'opensearch', 'search'],
  },
]

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
  emDelimiter: '_',
})
turndown.use(gfm)

function yamlQuote(str) {
  return `"${String(str).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
}

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

async function downloadImage(imgUrl, slug, nameOverride) {
  const res = await fetch(imgUrl)
  if (!res.ok) throw new Error(`image ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const ext = extname(new URL(imgUrl).pathname) || '.png'
  const file = nameOverride ? `${nameOverride}${ext}` : sanitizeFilename(basename(new URL(imgUrl).pathname))
  const dir = resolve(imagesRoot, slug)
  await mkdir(dir, { recursive: true })
  await writeFile(resolve(dir, file), buf)
  return `/blog-images/${slug}/${file}`
}

async function importPost(post) {
  const res = await fetch(post.url, { headers: { 'user-agent': 'Mozilla/5.0' } })
  if (!res.ok) throw new Error(`fetch ${res.status} for ${post.url}`)
  const html = await res.text()

  const dom = new JSDOM(html, { url: post.url })
  const { document } = dom.window

  // Un-lazy images so they survive conversion (content imgs use data-src).
  document.querySelectorAll('img[data-src]').forEach((img) => {
    if (!img.getAttribute('src') || img.getAttribute('src').startsWith('data:')) {
      img.setAttribute('src', img.getAttribute('data-src'))
    }
  })

  // The rendered post body lives in <article id="element"> — everything else
  // in the page (byline, "Summarize" buttons, CTA, author bio, related posts)
  // is chrome we deliberately exclude.
  // Cover image from the original page's og:image — used for social cards,
  // structured data, and the post hero.
  let cover = ''
  const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content')
  if (ogImage) {
    try {
      cover = await downloadImage(new URL(ogImage, post.url).href, post.slug, 'cover')
    } catch (err) {
      console.warn(`\n  ! skip cover ${ogImage}: ${err.message}`)
    }
  }

  const article = document.querySelector('article#element')
  if (!article) throw new Error(`article#element not found for ${post.slug}`)

  // Resolve any remaining relative image src to absolute against the post URL.
  article.querySelectorAll('img[src]').forEach((img) => {
    try {
      img.setAttribute('src', new URL(img.getAttribute('src'), post.url).href)
    } catch {
      /* leave as-is */
    }
  })

  let markdown = turndown.turndown(article.innerHTML)

  // Download every remote image referenced in the markdown, rewrite to local.
  const imgRe = /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)([^)]*)\)/g
  const seen = new Map()
  const matches = [...markdown.matchAll(imgRe)]
  for (const m of matches) {
    const remote = m[2]
    if (!seen.has(remote)) {
      try {
        seen.set(remote, await downloadImage(remote, post.slug))
        process.stdout.write('.')
      } catch (err) {
        console.warn(`\n  ! skip image ${remote}: ${err.message}`)
        seen.set(remote, remote)
      }
    }
  }
  for (const [remote, local] of seen) {
    markdown = markdown.split(remote).join(local)
  }

  // Tidy excessive blank lines.
  markdown = markdown.replace(/\n{3,}/g, '\n\n').trim()

  const frontmatter = [
    '---',
    `title: ${yamlQuote(post.title)}`,
    `date: ${yamlQuote(post.date)}`,
    `description: ${yamlQuote(post.description)}`,
    `tags: [${post.tags.map(yamlQuote).join(', ')}]`,
    ...(cover ? [`cover: ${yamlQuote(cover)}`] : []),
    `source: ${yamlQuote(post.url)}`,
    '---',
    '',
  ].join('\n')

  await mkdir(postsDir, { recursive: true })
  await writeFile(resolve(postsDir, `${post.slug}.md`), frontmatter + markdown + '\n', 'utf8')
  console.log(` ${post.slug} (${matches.length} imgs, ${markdown.length} chars)`)
}

for (const post of POSTS) {
  try {
    await importPost(post)
  } catch (err) {
    console.error(`FAILED ${post.slug}: ${err.message}`)
  }
}
console.log('done')
