import type { BlogPost } from '../types/content'
import { useReveal } from '../hooks/useReveal'
import { Link } from '../lib/router'
import BlogCard from './BlogCard'
import SkeletonCard from './ui/SkeletonCard'

interface Props {
  data: BlogPost[]
  loading: boolean
}

const HOME_LIMIT = 2

export default function Blogs({ data, loading }: Props) {
  const sectionRef = useReveal<HTMLElement>([data])
  const sorted = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const latest = sorted.slice(0, HOME_LIMIT)

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: HOME_LIMIT }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-base text-app-muted">No writings yet — check back soon.</p>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {latest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Link
                to="/blogs"
                className="reveal px-6 py-3 min-h-[44px] inline-flex items-center bg-app-card border border-app-border text-app-heading font-pixel text-sm hover:border-brand hover:text-brand active:border-brand active:text-brand active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                VIEW ALL WRITINGS →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
