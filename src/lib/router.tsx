import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'

interface RouterValue {
  path: string
  navigate: (to: string) => void
}

const RouterContext = createContext<RouterValue>({ path: '/', navigate: () => {} })

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter() {
  return useContext(RouterContext)
}

/**
 * Tiny path-based router. The client reads the path from `window.location`;
 * the prerender step passes `initialPath` so each route renders server-side.
 */
export function RouterProvider({
  initialPath,
  children,
}: {
  initialPath?: string
  children: ReactNode
}) {
  const [path, setPath] = useState(
    () => initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  )

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to: string) => {
    if (to !== window.location.pathname) {
      window.history.pushState({}, '', to)
      setPath(to)
    }
    // Jump instantly — `behavior: 'instant'` overrides the `scroll-behavior:
    // smooth` CSS rule, which would otherwise animate toward the top while the
    // (shorter) new page mounts and leave the scroll stranded mid-page.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

type LinkProps = { to: string; children: ReactNode } & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
>

/** Client-side navigation link. Falls back to a normal anchor for modified clicks. */
export function Link({ to, children, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return
    }
    e.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
