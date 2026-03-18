import type { VideoEntry } from '../types/content'
import { useReveal } from '../hooks/useReveal'
import { usePagination } from '../hooks/usePagination'
import { useState } from 'react'
import SkeletonCard from './ui/SkeletonCard'

interface Props {
  data: VideoEntry[]
  loading: boolean
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

function VideoCard({ video, id }: { video: VideoEntry; id: string | null }) {
  const [imgError, setImgError] = useState(false)

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="reveal group bg-[var(--c-card)] border border-[var(--c-border)] shadow-sm flex flex-col hover:border-brand/40 transition-colors duration-200"
    >
      {id && !imgError ? (
        <img
          src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
          alt={video.title}
          className="w-full aspect-video object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="w-full aspect-video bg-[#5C8DF2]/10 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-brand text-4xl">▶</span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-pixel text-[var(--c-muted)]">
            {new Date(video.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </span>
          {video.duration && (
            <span className="font-pixel text-[var(--c-muted)]">{video.duration}</span>
          )}
        </div>
        <h3 className="text-[var(--c-heading)] font-semibold text-lg leading-snug mb-3 group-hover:text-brand transition-colors duration-200 flex-1">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-[var(--c-body)] text-base leading-relaxed line-clamp-2 mb-4">
            {video.description}
          </p>
        )}
        <span className="text-brand text-base font-medium mt-auto">Watch →</span>
      </div>
    </a>
  )
}

export default function Videos({ data, loading }: Props) {
  const sectionRef = useReveal<HTMLElement>([data])

  const sorted = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const { visibleItems: visibleVideos, hasMore, loadMore } = usePagination(sorted, 6, 6)

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="relative z-10 bg-[var(--c-bg-subtle)] py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6">
        <h2 className="reveal font-anton text-5xl md:text-6xl text-[var(--c-heading)] mb-16 tracking-tight">
          TALKS &amp; VIDEOS
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} hasImage />)}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-base text-[var(--c-muted)]">No videos yet — check back soon.</p>
        ) : (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleVideos.map((video) => {
                const id = getYouTubeId(video.url)
                return <VideoCard key={video.url + video.title} video={video} id={id} />
              })}
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
