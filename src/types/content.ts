export interface BlogPost {
  slug: string
  title: string
  date: string
  description?: string
  tags?: string[]
  cover?: string
  html: string
}

export interface VideoEntry {
  title: string
  url: string
  date: string
  description?: string
  duration?: string
  views?: string
  /** Set to false while a video is deleted/being restored — hides embed + link. */
  available?: boolean
}

export interface LinkEntry {
  title: string
  url: string
  type: 'other'
  description?: string
}

export interface ContentFrontmatter {
  blogs: BlogPost[]
  videos: VideoEntry[]
  links: LinkEntry[]
}
