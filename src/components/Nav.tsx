import { useRef, useState } from 'react'
import Icon from './ui/Icon'
interface Props {
  dark: boolean
  onToggleTheme: () => void
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Videos', href: '#videos' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav({ dark, onToggleTheme }: Props) {
  const navRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)



  return (
    <nav
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
    >
      {/* Nav background: solid on top, fades to transparent at the bottom edge */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(to bottom, var(--c-nav-bg) 85%, transparent 100%)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-2 md:px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={close} className="flex items-center gap-2 text-brand">
          <Icon name="logo" />
          <span className="font-anton text-3xl tracking-wide leading-none">RK.</span>
        </a>

        {/* Desktop links + theme toggle */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-base text-[var(--c-heading)] hover:text-brand transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 flex items-center justify-center text-[var(--c-heading)] hover:text-brand transition-colors duration-200"
          >
            {dark ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 flex items-center justify-center text-[var(--c-heading)] hover:text-brand transition-colors duration-200"
          >
            {dark ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            className="flex flex-col justify-center items-center gap-1.5 w-8 h-8"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`block h-0.5 w-6 bg-[var(--c-heading)] transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[var(--c-heading)] transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[var(--c-heading)] transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden flex flex-col border-t border-[var(--c-border)] bg-[var(--c-bg)]">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={close}
                className="block px-6 py-4 text-base text-[var(--c-body)] hover:text-brand hover:bg-[var(--c-bg-subtle)] transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
