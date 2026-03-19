import type { ContentFrontmatter } from '../types/content'
import { contentData } from '../content/generated'

interface UseContentResult {
  data: ContentFrontmatter | null
  loading: boolean
}

export function useContent(): UseContentResult {
  return {
    data: contentData,
    loading: false,
  }
}
