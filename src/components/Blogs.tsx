import type { BlogEntry } from '../types/content'
import { useReveal } from '../hooks/useReveal'
import { usePagination } from '../hooks/usePagination'
import SkeletonCard from './ui/SkeletonCard'

interface Props {
  data: BlogEntry[]
  loading: boolean
}

export default function Blogs({ data, loading }: Props) {
  const sectionRef = useReveal<HTMLElement>([data])
  const sorted = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const { visibleItems: visibleBlogs, hasMore, loadMore } = usePagination(sorted, 6, 6)

  return (
    <section
      id="blogs"
      ref={sectionRef}
      className="relative z-10 py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6">
        <h2 className="reveal font-anton text-5xl md:text-6xl lg:text-7xl text-[var(--c-heading)] mb-16 tracking-tight">
          WRITINGS
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-base text-[var(--c-muted)]">No writings yet — check back soon.</p>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleBlogs.map((post) => (
                <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group bg-[var(--c-card)] border border-[var(--c-border)] shadow-sm p-6 flex flex-col hover:border-brand/40 transition-colors duration-200"
              >
                <span className="font-pixel text-[var(--c-muted)] mb-4 block">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <h3 className="text-[var(--c-heading)] font-semibold text-lg md:text-xl leading-snug mb-3 group-hover:text-brand transition-colors duration-200">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="text-[var(--c-body)] text-base md:text-lg leading-relaxed line-clamp-2 flex-1 mb-4">
                    {post.description}
                  </p>
                )}
                <span className="text-brand text-base font-medium mt-auto">Read →</span>
              </a>
              ))}
            </div>
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-[var(--c-card)] border border-[var(--c-border)] text-[var(--c-heading)] font-pixel text-sm hover:border-brand hover:text-brand transition-colors duration-200"
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
