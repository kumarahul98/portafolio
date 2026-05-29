import { useEffect, lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'

const DeferredSections = lazy(() => import('../components/DeferredSections'))

export default function HomePage() {
  // Home-specific loading sequence: drives the #app-loader progress off the
  // hero image, then dismisses it. Other routes use hideAppLoader() instead.
  useEffect(() => {
    let cancelled = false
    const loader = document.getElementById('app-loader')
    const brain = loader?.querySelector<HTMLElement>('.app-loader__brain')
    const heroImage = document.querySelector<HTMLImageElement>('#hero img')
    let progress = 0
    let driftTimer: ReturnType<typeof setInterval> | null = null
    let paintRaf = 0
    let removeTimer: ReturnType<typeof setTimeout> | null = null

    const setLoaderProgress = (value: number, immediate = false) => {
      progress = value
      if (immediate) {
        brain?.style.setProperty('transition-duration', '0ms')
      }
      brain?.style.setProperty('--brain-progress', `${value}%`)
      if (immediate) {
        window.requestAnimationFrame(() => {
          brain?.style.removeProperty('transition-duration')
        })
      }
    }

    const advanceTo = (target: number) => {
      if (target <= progress) return
      setLoaderProgress(target)
    }

    const hideLoader = () => {
      advanceTo(100)
      paintRaf = window.requestAnimationFrame(() => {
        paintRaf = window.requestAnimationFrame(() => {
          if (!cancelled && loader) {
            loader.classList.add('is-hidden')
            removeTimer = window.setTimeout(() => loader.remove(), 360)
          }
        })
      })
    }

    const stopDrift = () => {
      if (driftTimer) {
        clearInterval(driftTimer)
        driftTimer = null
      }
    }

    // No loader present (e.g. client-side nav back to home) — nothing to drive.
    if (!loader) return

    setLoaderProgress(4, true)

    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        if (!cancelled) advanceTo(24)
      })
    } else {
      advanceTo(18)
    }

    driftTimer = window.setInterval(() => {
      const next = Math.min(progress + (progress < 40 ? 2.4 : 1.2), 58)
      if (next > progress) {
        setLoaderProgress(next)
      }
      if (next >= 58) {
        stopDrift()
      }
    }, 180)

    const onHeroReady = () => {
      stopDrift()
      advanceTo(84)
      hideLoader()
    }

    if (heroImage?.complete) {
      onHeroReady()
    } else if (heroImage) {
      heroImage.addEventListener('load', onHeroReady, { once: true })
      heroImage.addEventListener('error', onHeroReady, { once: true })
    } else {
      // Home rendered without a hero image — dismiss immediately.
      onHeroReady()
    }

    return () => {
      cancelled = true
      stopDrift()
      if (paintRaf) window.cancelAnimationFrame(paintRaf)
      if (removeTimer !== null) clearTimeout(removeTimer)
      if (heroImage) {
        heroImage.removeEventListener('load', onHeroReady)
        heroImage.removeEventListener('error', onHeroReady)
      }
    }
  }, [])

  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={null}>
        <DeferredSections />
      </Suspense>
    </>
  )
}
