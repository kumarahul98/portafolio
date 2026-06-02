import React from 'react'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { dirname, resolve } from 'path'
import { renderToString } from 'react-dom/server'
import App from '../src/App'
import { RouterProvider } from '../src/lib/router'
import { contentData } from '../src/content/generated'
import { isVideoAvailable } from '../src/lib/videoStatus'
import {
  getYouTubeId,
  youtubeThumb,
  youtubeEmbed,
  durationToSeconds,
  secondsToIso,
} from '../src/lib/youtube'

const SITE = 'https://www.rahulkmr.com'
const AUTHOR = 'Rahul Kumar'
const DEFAULT_IMAGE = `${SITE}/herosection.webp`

interface RouteMeta {
  title: string
  description: string
  url: string
  type?: string
  image?: string
}

interface Route {
  path: string
  out: string[]
  meta?: RouteMeta
  post?: (typeof contentData.blogs)[number]
  videos?: typeof contentData.videos
  lastmod: string
  priority: string
}

function escapeAttr(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// JSON-LD safe for inline <script>: prevent premature </script> / HTML parsing.
function jsonLd(obj: unknown) {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}

function setValue(html: string, regex: RegExp, value: string) {
  return html.replace(regex, (_m, p1: string, p2: string) => p1 + escapeAttr(value) + p2)
}

function applyMeta(html: string, meta: RouteMeta) {
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(meta.title)}</title>`)
  html = setValue(html, /(<meta name="description" content=")[^"]*(")/, meta.description)
  html = setValue(html, /(<meta property="og:title" content=")[^"]*(")/, meta.title)
  html = setValue(html, /(<meta property="og:description" content=")[^"]*(")/, meta.description)
  html = setValue(html, /(<meta property="og:url" content=")[^"]*(")/, meta.url)
  html = setValue(html, /(<meta property="og:type" content=")[^"]*(")/, meta.type ?? 'website')
  html = setValue(html, /(<meta property="twitter:title" content=")[^"]*(")/, meta.title)
  html = setValue(html, /(<meta property="twitter:description" content=")[^"]*(")/, meta.description)
  html = setValue(html, /(<meta property="twitter:url" content=")[^"]*(")/, meta.url)
  html = setValue(html, /(<link rel="canonical" href=")[^"]*(")/, meta.url)
  if (meta.image) {
    html = setValue(html, /(<meta property="og:image" content=")[^"]*(")/, meta.image)
    html = setValue(html, /(<meta property="twitter:image" content=")[^"]*(")/, meta.image)
  }
  return html
}

// Article-specific <head> additions injected before </head> for post pages.
function articleHead(route: Route) {
  const post = route.post!
  const url = route.meta!.url
  const image = route.meta!.image || DEFAULT_IMAGE
  const published = new Date(post.date).toISOString()
  const tags = post.tags ?? []

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.title,
    image: [image],
    datePublished: published,
    dateModified: published,
    author: { '@type': 'Person', name: AUTHOR, url: SITE },
    publisher: {
      '@type': 'Organization',
      name: AUTHOR,
      logo: { '@type': 'ImageObject', url: `${SITE}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: tags.join(', '),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Writings', item: `${SITE}/blogs` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return [
    `<meta property="article:published_time" content="${escapeAttr(published)}" />`,
    `<meta property="article:author" content="${escapeAttr(AUTHOR)}" />`,
    ...tags.map((t) => `<meta property="article:tag" content="${escapeAttr(t)}" />`),
    `<script type="application/ld+json">${jsonLd(blogPosting)}</script>`,
    `<script type="application/ld+json">${jsonLd(breadcrumb)}</script>`,
  ].join('\n    ')
}

// VideoObject JSON-LD for each video shown on the /videos page.
function videosHead(route: Route) {
  return route
    .videos!.map((v) => {
      // Skip deleted/unavailable videos so Search Console doesn't flag dead VideoObjects.
      if (!isVideoAvailable(v)) return ''
      const id = getYouTubeId(v.url)
      if (!id) return ''
      const seconds = durationToSeconds(v.duration)
      const video = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: v.title,
        description: v.description || v.title,
        thumbnailUrl: [youtubeThumb(id)],
        uploadDate: new Date(v.date).toISOString(),
        ...(seconds ? { duration: secondsToIso(seconds) } : {}),
        embedUrl: youtubeEmbed(id),
        contentUrl: v.url,
        publisher: {
          '@type': 'Organization',
          name: AUTHOR,
          logo: { '@type': 'ImageObject', url: `${SITE}/favicon.svg` },
        },
      }
      return `<script type="application/ld+json">${jsonLd(video)}</script>`
    })
    .filter(Boolean)
    .join('\n    ')
}

// <video:video> children for a video sitemap entry (Google video sitemap ext).
function videoSitemapEntries(videos: typeof contentData.videos) {
  return videos
    .map((v) => {
      // Omit deleted/unavailable videos from the sitemap until they are live again.
      if (!isVideoAvailable(v)) return ''
      const id = getYouTubeId(v.url)
      if (!id) return ''
      const seconds = durationToSeconds(v.duration)
      return [
        '    <video:video>',
        `      <video:thumbnail_loc>${escapeAttr(youtubeThumb(id))}</video:thumbnail_loc>`,
        `      <video:title>${escapeAttr(v.title.slice(0, 100))}</video:title>`,
        `      <video:description>${escapeAttr((v.description || v.title).slice(0, 2048))}</video:description>`,
        `      <video:player_loc>${escapeAttr(youtubeEmbed(id))}</video:player_loc>`,
        `      <video:publication_date>${new Date(v.date).toISOString()}</video:publication_date>`,
        ...(seconds ? [`      <video:duration>${seconds}</video:duration>`] : []),
        '      <video:platform relationship="allow">web mobile tv</video:platform>',
        '    </video:video>',
      ].join('\n')
    })
    .filter(Boolean)
    .join('\n')
}

function buildSitemap(routes: Route[]) {
  const urls = routes
    .map((r) => {
      const videos = r.videos?.length ? `\n${videoSitemapEntries(r.videos)}` : ''
      return (
        `  <url>\n    <loc>${SITE}${r.path === '/' ? '/' : r.path}</loc>\n` +
        `    <lastmod>${r.lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n` +
        `    <priority>${r.priority}</priority>${videos}\n  </url>`
      )
    })
    .join('\n')
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ` +
    `xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n${urls}\n</urlset>\n`
  )
}

async function main() {
  const distDir = resolve(process.cwd(), 'dist')
  const template = await readFile(resolve(distDir, 'index.html'), 'utf8')
  const today = new Date().toISOString().slice(0, 10)

  const routes: Route[] = [
    { path: '/', out: ['index.html'], lastmod: today, priority: '1.0' },
    {
      path: '/blogs',
      out: ['blogs', 'index.html'],
      lastmod: today,
      priority: '0.8',
      meta: {
        title: 'Writings — Rahul Kumar',
        description:
          'Articles and writings by Rahul Kumar on AWS, serverless, data engineering, and GenAI.',
        url: `${SITE}/blogs`,
      },
    },
    {
      path: '/videos',
      out: ['videos', 'index.html'],
      lastmod: today,
      priority: '0.8',
      videos: contentData.videos,
      meta: {
        title: 'Talks & Videos — Rahul Kumar',
        description:
          'Talks, conference sessions, and videos by Rahul Kumar on AWS, serverless, data engineering, and GenAI.',
        url: `${SITE}/videos`,
      },
    },
    ...contentData.blogs.map((post) => ({
      path: `/blogs/${post.slug}`,
      out: ['blogs', post.slug, 'index.html'],
      lastmod: post.date || today,
      priority: '0.7',
      post,
      meta: {
        title: `${post.title} — Rahul Kumar`,
        description: post.description || post.title,
        url: `${SITE}/blogs/${post.slug}`,
        type: 'article',
        image: post.cover ? `${SITE}${post.cover}` : DEFAULT_IMAGE,
      },
    })),
  ]

  for (const route of routes) {
    const appHtml = renderToString(
      <RouterProvider initialPath={route.path}>
        <App />
      </RouterProvider>
    )

    let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    if (route.meta) html = applyMeta(html, route.meta)
    if (route.post) html = html.replace('</head>', `    ${articleHead(route)}\n  </head>`)
    if (route.videos) html = html.replace('</head>', `    ${videosHead(route)}\n  </head>`)

    const outPath = resolve(distDir, ...route.out)
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf8')
    console.log(`prerendered ${route.path} → ${route.out.join('/')}`)
  }

  await writeFile(resolve(distDir, 'sitemap.xml'), buildSitemap(routes), 'utf8')
  console.log(`sitemap.xml → ${routes.length} urls`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
