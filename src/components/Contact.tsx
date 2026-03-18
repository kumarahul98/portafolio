import { useReveal } from '../hooks/useReveal'
import Icon from './ui/Icon'

export default function Contact() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6 flex flex-col items-center text-center">
        <h2 className="reveal font-anton text-5xl md:text-6xl lg:text-8xl text-[var(--c-heading)] leading-none tracking-tight mb-6">
          LET'S WORK<br />TOGETHER
        </h2>

        <p className="reveal text-[var(--c-body)] text-lg md:text-xl max-w-lg mb-12">
          Open to collaborations, speaking opportunities, and consulting.
        </p>

        <a
          href="mailto:rahulkumar@antstack.com"
          className="reveal bg-brand hover:bg-brand-dark text-white font-medium text-base px-10 py-4 transition-colors duration-200 mb-16"
        >
          rahulkumar@antstack.com
        </a>

        {/* Social links */}
        <div className="reveal flex items-center gap-10">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/kumarahul98/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--c-muted)] hover:text-brand transition-colors duration-200"
          >
            <Icon name="linkedin" />
          </a>

          {/* Twitter / X */}
          <a
            href="https://x.com/coolman9633"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="text-[var(--c-muted)] hover:text-brand transition-colors duration-200"
          >
            <Icon name="twitter" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/kumarahul98"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--c-muted)] hover:text-brand transition-colors duration-200"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/ping_to_passport/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[var(--c-muted)] hover:text-brand transition-colors duration-200"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </a>

          {/* AntStack */}
          <a
            href="https://www.antstack.com/author/rahul-kumar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AntStack blog"
            className="text-[var(--c-muted)] hover:text-brand transition-colors duration-200"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="4" width="20" height="4" rx="1.5"/>
              <rect x="2" y="10" width="20" height="4" rx="1.5" opacity="0.7"/>
              <rect x="2" y="16" width="20" height="4" rx="1.5" opacity="0.4"/>
            </svg>
          </a>
        </div>

        <p className="reveal text-[var(--c-muted)]/60 text-xs font-pixel mt-16">
          © {new Date().getFullYear()} Rahul Kumar
        </p>
      </div>
    </section>
  )
}
