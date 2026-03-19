import { useEffect, useRef } from 'react'

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rocketRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.innerWidth < 768) return

    const canvas = canvasRef.current
    const rocket = rocketRef.current
    if (!canvas) return
    const rawContext = canvas.getContext('2d')
    if (!rawContext) return
    const context: CanvasRenderingContext2D = rawContext

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let previousX = x
    let previousY = y
    let angle = 0
    let rafId = 0
    let needsRender = true
    let isInteractive = false

    document.body.classList.add('cursor-rocket')

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      needsRender = true
      scheduleDraw()
    }
    resize()

    const onPointerMove = (e: PointerEvent) => {
      const interactiveTarget = e.target instanceof Element
        ? e.target.closest('a, button, input, textarea, select, summary, [role="button"], [data-cursor="pointer"]')
        : null
      const deltaX = e.clientX - previousX
      const deltaY = e.clientY - previousY

      if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
        angle = Math.atan2(deltaY, deltaX)
      }

      x = e.clientX
      y = e.clientY
      previousX = x
      previousY = y
      isInteractive = Boolean(interactiveTarget)

      if (rocket) {
        rocket.dataset.interactive = isInteractive ? 'true' : 'false'
        rocket.style.transform = `translate(${x - 14}px, ${y - 14}px) rotate(${angle + Math.PI / 2}rad) scale(${isInteractive ? 0 : 1})`
      }

      needsRender = true
      scheduleDraw()
    }

    function draw() {
      rafId = 0
      if (!needsRender) return

      needsRender = false
      const isDarkTheme = document.documentElement.classList.contains('dark')
      context.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const outerGlow = context.createRadialGradient(x, y, 0, x, y, 360)
      outerGlow.addColorStop(0, isDarkTheme ? 'rgba(92, 141, 242, 0.14)' : 'rgba(37, 99, 235, 0.12)')
      outerGlow.addColorStop(0.35, isDarkTheme ? 'rgba(92, 141, 242, 0.07)' : 'rgba(37, 99, 235, 0.06)')
      outerGlow.addColorStop(1, isDarkTheme ? 'rgba(92, 141, 242, 0)' : 'rgba(37, 99, 235, 0)')
      context.fillStyle = outerGlow
      context.fillRect(0, 0, window.innerWidth, window.innerHeight)

      const coreGlow = context.createRadialGradient(x, y, 0, x, y, 110)
      coreGlow.addColorStop(0, isDarkTheme ? 'rgba(255, 255, 255, 0.14)' : 'rgba(59, 130, 246, 0.1)')
      coreGlow.addColorStop(0.4, isDarkTheme ? 'rgba(92, 141, 242, 0.1)' : 'rgba(37, 99, 235, 0.1)')
      coreGlow.addColorStop(1, isDarkTheme ? 'rgba(92, 141, 242, 0)' : 'rgba(37, 99, 235, 0)')
      context.fillStyle = coreGlow
      context.fillRect(0, 0, window.innerWidth, window.innerHeight)
    }

    function scheduleDraw() {
      if (rafId) return
      rafId = requestAnimationFrame(draw)
    }

    scheduleDraw()
    if (rocket) {
      rocket.dataset.interactive = 'false'
      rocket.style.transform = `translate(${x - 14}px, ${y - 14}px) rotate(${Math.PI / 2}rad) scale(1)`
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      document.body.classList.remove('cursor-rocket')
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="hidden md:block fixed inset-0 z-30 pointer-events-none opacity-100"
      />
      <div
        ref={rocketRef}
        className="hidden md:block fixed top-0 left-0 z-40 pointer-events-none will-change-transform text-slate-500 transition-[filter,color] duration-150"
        aria-hidden="true"
      >
        <svg width="26" height="36" viewBox="0 0 26 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 2C8.03 2 4 6.03 4 11v14c0 4.97 4.03 9 9 9s9-4.03 9-9V11c0-4.97-4.03-9-9-9Z"
            fill="currentColor"
          />
          <path
            d="M13 2C8.03 2 4 6.03 4 11v14c0 4.97 4.03 9 9 9s9-4.03 9-9V11c0-4.97-4.03-9-9-9Z"
            stroke="#F8FAFC"
            strokeWidth="1.2"
          />
          <path d="M13 6.5v8.5" stroke="#F8FAFC" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M8.8 10.8h8.4" stroke="#F8FAFC" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>
    </>
  )
}
