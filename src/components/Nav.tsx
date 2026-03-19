import { useState } from 'react'
import Icon from './ui/Icon'
import { printResume } from './Resume'
interface Props {
  dark: boolean
  onToggleTheme: () => void
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Videos', href: '#videos' },
  { label: 'Projects', href: '#projects' },
  { label: "Let's Talk", href: '#contact' },
]

export default function Nav({ dark, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)



  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md">
      {/* Nav background: solid on top, fades to transparent at the bottom edge */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'linear-gradient(to bottom, var(--c-nav-bg) 85%, transparent 100%)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-2 md:px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" onClick={close} className="inline-flex items-end gap-1 text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm">
          <Icon name="logo" className="block h-10 w-10 shrink-0 translate-y-1" />
          <span className="font-anton text-3xl tracking-wide leading-none pb-[1px]">RK.</span>
        </a>

        {/* Desktop links + theme toggle */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={label === "Let's Talk"
                    ? "block px-4 py-1.5 text-base font-semibold text-white bg-brand hover:bg-brand-dark active:bg-brand-dark active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-full"
                    : "block px-2 py-2 -mx-2 -my-2 text-base font-semibold text-app-heading drop-shadow-sm hover:text-brand active:text-brand transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                  }
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Download Resume */}
          <button
            onClick={() => printResume()}
            aria-label="Download resume as PDF"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-app-heading border border-app-border hover:border-brand hover:text-brand active:border-brand active:text-brand active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Resume
          </button>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 flex items-center justify-center text-app-heading hover:text-brand active:text-brand transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
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
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={onToggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-11 h-11 flex items-center justify-center text-app-heading hover:text-brand active:text-brand transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
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
            className="flex flex-col justify-center items-center gap-1.5 w-11 h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`block h-0.5 w-6 bg-app-heading transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-6 bg-app-heading transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-app-heading transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="relative z-10 md:hidden flex flex-col border-t border-app-border bg-app-bg">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={close}
                className={label === "Let's Talk"
                  ? "block px-6 py-4 min-h-[44px] text-base font-semibold text-brand hover:bg-app-bg-subtle active:bg-app-bg-subtle transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-brand"
                  : "block px-6 py-4 min-h-[44px] text-base font-semibold text-app-body drop-shadow-sm hover:text-brand hover:bg-app-bg-subtle active:text-brand active:bg-app-bg-subtle transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-brand"
                }
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => { printResume(); close() }}
              className="w-full text-left block px-6 py-4 min-h-[44px] text-base font-semibold text-app-body drop-shadow-sm hover:text-brand hover:bg-app-bg-subtle active:text-brand active:bg-app-bg-subtle transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-brand"
            >
              ↓ Download Resume
            </button>
          </li>
        </ul>
      )}
    </nav>
  )
}
