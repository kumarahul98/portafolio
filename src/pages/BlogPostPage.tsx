import { useEffect } from 'react'
import { useContent } from '../hooks/useContent'
import { useReveal } from '../hooks/useReveal'
import { useCodeCopyButtons } from '../hooks/useCodeCopyButtons'
import { hideAppLoader } from '../lib/loader'
import { Link } from '../lib/router'

export default function BlogPostPage({ slug }: { slug: string }) {
  const { data } = useContent()
  const post = data?.blogs.find((p) => p.slug === slug)
  const sectionRef = useReveal<HTMLElement>([slug])
  useCodeCopyButtons(sectionRef, [post])

  useEffect(() => {
    hideAppLoader()
    document.title = post ? `${post.title} — Rahul Kumar` : 'Writings — Rahul Kumar'
  }, [post])

  return (
    <article
      ref={sectionRef}
      className="relative z-10 min-h-screen pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <Link
          to="/blogs"
          className="reveal inline-block font-pixel text-sm text-app-muted hover:text-brand transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          ← All writings
        </Link>

        {!post ? (
          <div className="reveal">
            <h1 className="font-anton text-4xl md:text-5xl text-app-heading mb-4 tracking-tight">
              Post not found
            </h1>
            <p className="text-app-body">
              That writing doesn’t exist.{' '}
              <Link to="/blogs" className="text-brand underline underline-offset-2">
                Browse all writings
              </Link>
              .
            </p>
          </div>
        ) : (
          <>
            <span className="reveal font-pixel text-app-muted mb-4 block">
              {post.date &&
                new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
            </span>

            <h1 className="reveal font-anton text-4xl md:text-5xl lg:text-6xl text-app-heading mb-3 tracking-tight">
              {post.title}
            </h1>

            {post.tags && post.tags.length > 0 && (
              <div className="reveal mb-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-pixel text-xs text-brand border border-brand/40 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {post.cover && (
              <img
                src={post.cover}
                alt={post.title}
                width={1200}
                height={630}
                className="reveal mb-10 w-full rounded-lg border border-app-border object-cover"
              />
            )}

            {/* Self-authored content converted to HTML at build time (trusted). */}
            <div
              className="reveal prose-blog"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </>
        )}
      </div>
    </article>
  )
}
