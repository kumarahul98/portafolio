import { useEffect, useRef } from 'react'

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rafId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const onMouseMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 400)
      gradient.addColorStop(0, 'rgba(92, 141, 242, 0.15)')
      gradient.addColorStop(1, 'rgba(92, 141, 242, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block fixed inset-0 z-30 pointer-events-none"
    />
  )
}
