import type { VideoEntry } from '../types/content'
import { useReveal } from '../hooks/useReveal'
import { Link } from '../lib/router'
import { getYouTubeId } from '../lib/youtube'
import { useState, useRef, useEffect } from 'react'
import SkeletonCard from './ui/SkeletonCard'

interface Props {
  data: VideoEntry[]
  loading: boolean
}

const HOME_LIMIT = 3

function VideoCard({ video, id }: { video: VideoEntry; id: string | null }) {
  const [imgError, setImgError] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = descRef.current
    if (el) setOverflows(el.scrollHeight > el.clientHeight)
  }, [video.description])

  return (
    <div className="reveal group relative bg-app-card border border-app-border shadow-sm flex flex-col hover:border-brand/40 active:border-brand/40 transition-colors duration-200">
      {/* Stretched link — full-card click, hidden from tab order */}
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-0"
        tabIndex={-1}
        aria-hidden="true"
      />

      {id && !imgError ? (
        <img
          src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
          srcSet={`https://img.youtube.com/vi/${id}/mqdefault.jpg 320w, https://img.youtube.com/vi/${id}/hqdefault.jpg 480w`}
          sizes="(max-width: 768px) 320px, 480px"
          alt={video.title}
          width="480"
          height="360"
          loading="lazy"
          decoding="async"
          className="relative z-10 w-full aspect-video object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="relative z-10 w-full aspect-video bg-[#5C8DF2]/10 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-brand text-4xl">▶</span>
        </div>
      )}

      <div className="relative z-10 p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-pixel text-app-muted">
            {new Date(video.date + 'T12:00:00').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </span>
          {video.duration && (
            <span className="font-pixel text-app-muted">{video.duration}</span>
          )}
        </div>
        <h3 className="text-app-heading font-semibold text-lg leading-snug mb-3 group-hover:text-brand transition-colors duration-200 flex-1">
          {video.title}
        </h3>
        {video.description && (
          <div className="mb-4">
            <p
              ref={descRef}
              className={`text-app-body text-base leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}
            >
              {video.description}
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
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand text-base font-medium mt-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Watch →
        </a>
      </div>
    </div>
  )
}

export default function Videos({ data, loading }: Props) {
  const sectionRef = useReveal<HTMLElement>([data])

  const sorted = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const latest = sorted.slice(0, HOME_LIMIT)

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="relative z-10 bg-app-bg-subtle py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6">
        <h2 className="reveal font-anton text-5xl md:text-6xl text-app-heading mb-16 tracking-tight">
          TALKS &amp; VIDEOS
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: HOME_LIMIT }).map((_, i) => <SkeletonCard key={i} hasImage />)}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-base text-app-muted">No videos yet — check back soon.</p>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((video) => {
                const id = getYouTubeId(video.url)
                return <VideoCard key={video.url + video.title} video={video} id={id} />
              })}
            </div>
            <div className="mt-12 flex justify-center">
              <Link
                to="/videos"
                className="reveal px-6 py-3 min-h-[44px] inline-flex items-center bg-app-card border border-app-border text-app-heading font-pixel text-sm hover:border-brand hover:text-brand active:border-brand active:text-brand active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                VIEW ALL VIDEOS →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
