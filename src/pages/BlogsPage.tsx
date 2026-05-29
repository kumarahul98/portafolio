import { useEffect } from 'react'
import { useContent } from '../hooks/useContent'
import { useReveal } from '../hooks/useReveal'
import { usePagination } from '../hooks/usePagination'
import { hideAppLoader } from '../lib/loader'
import { Link } from '../lib/router'
import BlogCard from '../components/BlogCard'

export default function BlogsPage() {
  const { data } = useContent()
  const posts = [...(data?.blogs ?? [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const sectionRef = useReveal<HTMLElement>([posts.length])
  const { visibleItems, hasMore, loadMore } = usePagination(posts, 9, 9, 6)

  useEffect(() => {
    hideAppLoader()
    document.title = 'Writings — Rahul Kumar'
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 lg:pb-32"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Link
          to="/#blogs"
          className="reveal inline-block font-pixel text-sm text-app-muted hover:text-brand transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          ← Back home
        </Link>

        <h1 className="reveal font-anton text-5xl md:text-6xl lg:text-7xl text-app-heading mb-16 tracking-tight">
          WRITINGS
        </h1>

        {posts.length === 0 ? (
          <p className="text-base text-app-muted">No writings yet — check back soon.</p>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleItems.map((post) => (
                <BlogCard key={post.slug} post={post} />
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
