import type { VideoEntry } from '../types/content'

/**
 * TEMPORARY availability handling — some AntStack TV videos were deleted from
 * YouTube and are being restored. Mark each affected entry with `available: false`
 * in data/content.md. Unavailable videos render in a muted "temporarily
 * unavailable" state and are excluded from SEO schema + the video sitemap.
 *
 * TO RESTORE a video: remove its `available: false` line (or set it to true) in
 * data/content.md and re-run the build. The note disappears automatically once
 * no entries are unavailable.
 */
export const VIDEOS_UNAVAILABLE_NOTE =
  'Some talks & videos are temporarily unavailable while the channel is being restored. Please check back in a few days.'

/** A video is available unless it is explicitly marked `available: false`. */
export function isVideoAvailable(video: VideoEntry): boolean {
  return video.available !== false
}

/** Sort available videos first, then newest-first within each group. */
export function byAvailabilityThenDate(a: VideoEntry, b: VideoEntry): number {
  const rank = Number(isVideoAvailable(b)) - Number(isVideoAvailable(a))
  if (rank !== 0) return rank
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}

/** Whether to show the "temporarily unavailable" note. */
export function hasUnavailableVideos(videos: VideoEntry[]): boolean {
  return videos.some((v) => !isVideoAvailable(v))
}
