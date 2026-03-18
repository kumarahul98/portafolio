export interface BlogEntry {
  title: string
  url: string
  date: string
  description?: string
}

export interface VideoEntry {
  title: string
  url: string
  date: string
  description?: string
  duration?: string
  views?: string
}

export interface LinkEntry {
  title: string
  url: string
  type: 'other'
  description?: string
}

export interface ContentFrontmatter {
  blogs: BlogEntry[]
  videos: VideoEntry[]
  links: LinkEntry[]
}
