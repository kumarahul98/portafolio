import { useEffect, useState } from 'react'
import fm from 'front-matter'
import type { ContentFrontmatter } from '../types/content'

interface UseContentResult {
  data: ContentFrontmatter | null
  body: string
  loading: boolean
  error: string | null
}

export function useContent(): UseContentResult {
  const [data, setData] = useState<ContentFrontmatter | null>(null)
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/content.md')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch content.md: ${res.status}`)
        return res.text()
      })
      .then((text) => {
        const parsed = fm<ContentFrontmatter>(text)
        setData(parsed.attributes)
        setBody(parsed.body)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unknown error')
      })
      .finally(() => setLoading(false))
  }, [])

  return { data, body, loading, error }
}
