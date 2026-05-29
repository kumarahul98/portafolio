import type { BlogPost } from '../types/content'
import { Link } from '../lib/router'

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="reveal group relative flex flex-col bg-app-card border border-app-border shadow-sm overflow-hidden hover:border-brand/40 active:border-brand/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      {post.cover && (
        <div className="aspect-[16/9] overflow-hidden border-b border-app-border">
          <img
            src={post.cover}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <span className="font-pixel text-app-muted mb-4 block">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>

        <h3 className="text-app-heading font-semibold text-lg md:text-xl leading-snug mb-3 group-hover:text-brand transition-colors duration-200">
          {post.title}
        </h3>

        {post.description && (
          <p className="text-app-body text-base md:text-lg leading-relaxed line-clamp-3 mb-4 flex-1">
            {post.description}
          </p>
        )}

        <span className="text-brand text-base font-medium mt-auto">Read post →</span>
      </div>
    </Link>
  )
}
