/** Extract the 11-char YouTube video id from a watch/short/embed URL. */
export function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

export function youtubeEmbed(id: string): string {
  return `https://www.youtube.com/embed/${id}`
}

/** "MM:SS" or "HH:MM:SS" → total seconds (null if absent/unparseable). */
export function durationToSeconds(d?: string): number | null {
  if (!d) return null
  const parts = d.split(':').map(Number)
  if (parts.some(Number.isNaN)) return null
  return parts.reduce((acc, p) => acc * 60 + p, 0)
}

/** Total seconds → ISO 8601 duration ("PT21M30S") for VideoObject schema. */
export function secondsToIso(total: number): string {
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const out = 'PT' + (h ? `${h}H` : '') + (m ? `${m}M` : '') + (s ? `${s}S` : '')
  return out === 'PT' ? 'PT0S' : out
}
