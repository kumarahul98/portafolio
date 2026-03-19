import { useRef, useEffect, useState } from 'react'
import type { BlogEntry } from '../types/content'
import { useReveal } from '../hooks/useReveal'
import { usePagination } from '../hooks/usePagination'
import SkeletonCard from './ui/SkeletonCard'

interface Props {
  data: BlogEntry[]
  loading: boolean
}

function BlogCard({ post }: { post: BlogEntry }) {
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = descRef.current
    if (el) setOverflows(el.scrollHeight > el.clientHeight)
  }, [post.description])

  return (
    <div className="reveal group relative bg-app-card border border-app-border shadow-sm p-6 flex flex-col hover:border-brand/40 active:border-brand/40 transition-colors duration-200">
      {/* Stretched link — full-card click, hidden from tab order */}
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-0"
        tabIndex={-1}
        aria-hidden="true"
      />

      <span className="relative z-10 font-pixel text-app-muted mb-4 block">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </span>

      <h3 className="relative z-10 text-app-heading font-semibold text-lg md:text-xl leading-snug mb-3 group-hover:text-brand transition-colors duration-200">
        {post.title}
      </h3>

      {post.description && (
        <div className="relative z-10 mb-4 flex-1">
          <p
            ref={descRef}
            className={`text-app-body text-base md:text-lg leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}
          >
            {post.description}
          </p>
          {(overflows || expanded) && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="mt-1 text-brand text-sm font-medium hover:brightness-125 active:brightness-90 transition-all focus-visible:outline-none"
            >
              {expanded ? 'Show less ↑' : 'Read more ↓'}
            </button>
          )}
        </div>
      )}

      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 text-brand text-base font-medium mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        Read →
      </a>
    </div>
  )
}

export default function Blogs({ data, loading }: Props) {
  const sectionRef = useReveal<HTMLElement>([data])
  const sorted = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const { visibleItems: visibleBlogs, hasMore, loadMore } = usePagination(sorted, 6, 6, 2)

  return (
    <section
      id="blogs"
      ref={sectionRef}
      className="relative z-10 py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6">
        <h2 className="reveal font-anton text-5xl md:text-6xl lg:text-7xl text-app-heading mb-16 tracking-tight">
          WRITINGS
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-base text-app-muted">No writings yet — check back soon.</p>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleBlogs.map((post) => (
                <BlogCard key={post.url} post={post} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 min-h-[44px] bg-app-card border border-app-border text-app-heading font-pixel text-sm hover:border-brand hover:text-brand active:border-brand active:text-brand active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  VIEW MORE
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
