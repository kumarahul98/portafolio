import { useEffect } from 'react'
import { useContent } from '../hooks/useContent'
import { useReveal } from '../hooks/useReveal'
import { hideAppLoader } from '../lib/loader'
import { Link } from '../lib/router'
import { getYouTubeId } from '../lib/youtube'
import VideoEmbed from '../components/VideoEmbed'

export default function VideosPage() {
  const { data } = useContent()
  const videos = [...(data?.videos ?? [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const sectionRef = useReveal<HTMLElement>([videos.length])

  useEffect(() => {
    hideAppLoader()
    document.title = 'Talks & Videos — Rahul Kumar'
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 lg:pb-32"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Link
          to="/#videos"
          className="reveal inline-block font-pixel text-sm text-app-muted hover:text-brand transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          ← Back home
        </Link>

        <h1 className="reveal font-anton text-5xl md:text-6xl lg:text-7xl text-app-heading mb-16 tracking-tight">
          TALKS &amp; VIDEOS
        </h1>

        {videos.length === 0 ? (
          <p className="text-base text-app-muted">No videos yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video) => {
              const id = getYouTubeId(video.url)
              return (
                <article
                  key={video.url + video.title}
                  className="reveal flex flex-col bg-app-card border border-app-border shadow-sm overflow-hidden"
                >
                  {id ? (
                    <VideoEmbed id={id} title={video.title} />
                  ) : (
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex aspect-video items-center justify-center bg-[#5C8DF2]/10 text-4xl text-brand"
                      aria-label={`Watch ${video.title} on YouTube`}
                    >
                      ▶
                    </a>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-3">
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

                    <h2 className="text-app-heading font-semibold text-lg leading-snug mb-3">
                      {video.title}
                    </h2>

                    {video.description && (
                      <p className="text-app-body text-base leading-relaxed">
                        {video.description}
                      </p>
                    )}

                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-brand text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      Watch on YouTube →
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
