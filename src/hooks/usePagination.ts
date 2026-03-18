import { useState } from 'react'

export function usePagination<T>(items: T[], initialCount: number, increment: number) {
  const [visibleCount, setVisibleCount] = useState(initialCount)

  const visibleItems = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  const loadMore = () => setVisibleCount((prev) => prev + increment)

  return { visibleItems, hasMore, loadMore }
}
