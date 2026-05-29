import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Injects a "Copy" button into every <pre> inside the referenced container.
 * Used for blog post content rendered via dangerouslySetInnerHTML, where the
 * code blocks aren't React elements. Re-runs when `deps` change (new post).
 */
export function useCodeCopyButtons(
  ref: RefObject<HTMLElement | null>,
  deps: unknown[] = []
) {
  useEffect(() => {
    const root = ref.current
    if (!root || typeof navigator === 'undefined') return

    const cleanups: Array<() => void> = []

    root.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.code-copy-btn')) return

      // Capture the code text before adding the button so it never leaks in.
      const codeText = (pre.querySelector('code') ?? pre).textContent ?? ''

      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'code-copy-btn'
      btn.textContent = 'Copy'
      btn.setAttribute('aria-label', 'Copy code to clipboard')

      let timer: ReturnType<typeof setTimeout>
      const onClick = async () => {
        try {
          await navigator.clipboard.writeText(codeText)
          btn.textContent = 'Copied!'
          btn.classList.add('is-copied')
        } catch {
          btn.textContent = 'Failed'
        }
        clearTimeout(timer)
        timer = setTimeout(() => {
          btn.textContent = 'Copy'
          btn.classList.remove('is-copied')
        }, 2000)
      }

      btn.addEventListener('click', onClick)
      pre.appendChild(btn)
      cleanups.push(() => {
        btn.removeEventListener('click', onClick)
        clearTimeout(timer)
        btn.remove()
      })
    })

    return () => cleanups.forEach((fn) => fn())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
