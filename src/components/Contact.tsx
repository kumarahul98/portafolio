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
        <h2 className="reveal font-anton text-5xl md:text-6xl lg:text-8xl text-app-heading leading-none tracking-tight mb-6">
          LET'S WORK<br />TOGETHER
        </h2>

        <p className="reveal text-app-body text-lg md:text-xl max-w-lg mb-12">
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
            className="text-app-muted hover:text-brand transition-colors duration-200"
          >
            <Icon name="linkedin" />
          </a>

          {/* Twitter / X */}
          <a
            href="https://x.com/coolman9633"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="text-app-muted hover:text-brand transition-colors duration-200"
          >
            <Icon name="twitter" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/kumarahul98"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-app-muted hover:text-brand transition-colors duration-200"
          >
            <Icon name="github" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/ping_to_passport/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-app-muted hover:text-brand transition-colors duration-200"
          >
            <Icon name="instagram" />
          </a>

          {/* AntStack */}
          <a
            href="https://www.antstack.com/author/rahul-kumar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AntStack blog"
            className="text-app-muted hover:text-brand transition-colors duration-200"
          >
            <Icon name="antstack" />
          </a>
        </div>

        <p className="reveal text-app-muted/60 text-xs font-pixel mt-16">
          © {new Date().getFullYear()} Rahul Kumar
        </p>
      </div>
    </section>
  )
}
