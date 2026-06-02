import { useState } from 'react'
import { youtubeEmbed, youtubeThumb } from '../lib/youtube'

/**
 * Click-to-play YouTube facade: shows the thumbnail until clicked, then swaps
 * in the iframe. Keeps the video playable on-page without loading an iframe
 * per video up front (good for LCP).
 */
export default function VideoEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="relative w-full aspect-video bg-black">
        <iframe
          src={`${youtubeEmbed(id)}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
      className="group/embed relative block w-full aspect-video overflow-hidden bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <img
        src={youtubeThumb(id)}
        alt={title}
        loading="lazy"
        className="h-full w-full object-cover opacity-90 transition duration-300 group-hover/embed:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/90 text-white shadow-lg transition duration-300 group-hover/embed:scale-110">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  )
}
