import { useReveal } from '../hooks/useReveal'

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
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* Twitter / X */}
          <a
            href="https://twitter.com/kuma_r_ahul"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="text-[var(--c-muted)] hover:text-brand transition-colors duration-200"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-13h2v6h-2zm0 8h2v2h-2z" />
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
