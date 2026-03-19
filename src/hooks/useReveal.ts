import { useEffect, useRef } from 'react'
import { loadGsap } from '../lib/gsap'

export function useReveal<T extends HTMLElement = HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cleanup: (() => void) | undefined
    let cancelled = false

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (cancelled || !ref.current) return

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.reveal',
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
            },
          },
        )
        ScrollTrigger.refresh()
      }, ref)

      cleanup = () => ctx.revert()
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
