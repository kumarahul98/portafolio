import { useEffect, useState } from 'react'

export function usePagination<T>(
  items: T[],
  initialCount: number,
  increment: number,
  mobileCount = initialCount
) {
  const getPageSize = () => (typeof window !== 'undefined' && window.innerWidth < 768 ? mobileCount : initialCount)
  const [visibleCount, setVisibleCount] = useState(getPageSize)

  useEffect(() => {
    const onResize = () => {
      setVisibleCount((prev) => {
        const nextBaseCount = getPageSize()
        return Math.max(nextBaseCount, Math.min(prev, items.length))
      })
    }

    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [initialCount, mobileCount, items.length])

  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  const loadMore = () =>
    setVisibleCount((prev) => prev + (window.innerWidth < 768 ? mobileCount : increment))

  return { visibleItems, hasMore, loadMore }
}
