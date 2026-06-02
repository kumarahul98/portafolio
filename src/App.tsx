import { useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
import { loadGsap } from './lib/gsap'
import { useRouter } from './lib/router'
import Canvas from './components/Canvas'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import BlogsPage from './pages/BlogsPage'
import BlogPostPage from './pages/BlogPostPage'
import VideosPage from './pages/VideosPage'

function cleanPath(path: string) {
  return path.replace(/\/+$/, '') || '/'
}

function isBlogRoute(path: string) {
  const clean = cleanPath(path)
  return clean === '/blogs' || clean.startsWith('/blogs/')
}

function renderRoute(path: string) {
  const clean = cleanPath(path)
  if (clean === '/blogs') return <BlogsPage />
  if (clean.startsWith('/blogs/')) {
    return <BlogPostPage slug={decodeURIComponent(clean.slice('/blogs/'.length))} />
  }
  if (clean === '/videos') return <VideosPage />
  return <HomePage />
}

export default function App() {
  const { dark, toggle } = useTheme()
  const { path } = useRouter()

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const onResize = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        loadGsap().then(({ ScrollTrigger }) => ScrollTrigger.refresh())
      }, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-app-bg text-app-heading">
      {/* The rocket cursor + glow are part of the landing experience — keep the
          native cursor on blog pages for comfortable reading. */}
      {!isBlogRoute(path) && <Canvas />}
      <Nav dark={dark} onToggleTheme={toggle} />
      <main className="relative z-10">{renderRoute(path)}</main>
    </div>
  )
}
