import { lazy, Suspense, useEffect, useState } from 'react'
import { useTheme } from './hooks/useTheme'
import { loadGsap } from './lib/gsap'
import Canvas from './components/Canvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import SectionPlaceholder from './components/SectionPlaceholder'

const DeferredSections = lazy(() => import('./components/DeferredSections'))

export default function App() {
  const { dark, toggle } = useTheme()
  const [showDeferredSections, setShowDeferredSections] = useState(false)

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

  useEffect(() => {
    const win = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
      cancelIdleCallback?: (handle: number) => void
    }

    let idleId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    if (typeof win.requestIdleCallback === 'function') {
      idleId = win.requestIdleCallback(() => setShowDeferredSections(true), { timeout: 1200 })
    } else {
      timeoutId = setTimeout(() => setShowDeferredSections(true), 400)
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      if (idleId !== null && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleId)
      }
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-app-bg text-app-heading">
      <Canvas />
      <Nav dark={dark} onToggleTheme={toggle} />
      <main className="relative z-10">
        <Hero />
        <About />
        {showDeferredSections ? (
          <Suspense fallback={<SectionPlaceholder subtle />}>
            <DeferredSections />
          </Suspense>
        ) : (
          <>
            <SectionPlaceholder subtle />
            <SectionPlaceholder />
            <SectionPlaceholder />
            <SectionPlaceholder />
          </>
        )}
      </main>
    </div>
  )
}
