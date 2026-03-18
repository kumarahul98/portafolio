import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useContent } from './hooks/useContent'
import { useTheme } from './hooks/useTheme'
import Canvas from './components/Canvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Blogs from './components/Blogs'
import Videos from './components/Videos'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function App() {
  const content = useContent()
  const { dark, toggle } = useTheme()

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const onResize = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[var(--c-bg)] text-[var(--c-heading)]">
      <Canvas />
      <Nav dark={dark} onToggleTheme={toggle} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Blogs data={content.data?.blogs ?? []} loading={content.loading} />
        <Videos data={content.data?.videos ?? []} loading={content.loading} />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}
