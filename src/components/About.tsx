import { useReveal } from '../hooks/useReveal'
import { usePagination } from '../hooks/usePagination'
import { EXPERIENCE, SKILLS, CERTIFICATIONS } from '../data/about'

export default function About() {
  const sectionRef = useReveal<HTMLElement>()
  const { visibleItems: visibleExp, hasMore: hasMoreExp, loadMore: loadMoreExp } = usePagination(EXPERIENCE, EXPERIENCE.length, EXPERIENCE.length, 1)
  const { visibleItems: visibleCerts, hasMore: hasMoreCerts, loadMore: loadMoreCerts } = usePagination(CERTIFICATIONS, CERTIFICATIONS.length, CERTIFICATIONS.length, 2)

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 bg-[#162C5A] py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section heading */}
        <h2 className="reveal font-anton text-5xl md:text-6xl lg:text-7xl text-white mb-16 tracking-tight">
          ABOUT
        </h2>

        {/* Experience */}
        <div className="mb-20">
          <h3 className="reveal font-pixel text-xl md:text-2xl text-[#9CA3B0] mb-10">Experience</h3>
          <div className="flex flex-col gap-12">
            {visibleExp.map((job) => (
              <div key={job.company} className="reveal flex flex-col md:flex-row gap-4 md:gap-8 group hover:-translate-y-1 active:bg-white/5 transition-all duration-300 p-6 md:p-8 -mx-6 md:-mx-8 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 active:border-white/10">
                <div className="md:w-56 shrink-0">
                  <p className="font-pixel text-base md:text-lg text-brand leading-relaxed group-hover:brightness-125 transition-all duration-300">{job.period}</p>
                </div>
                <div className="flex-1 border-l-2 border-brand pl-6 group-hover:border-white transition-colors duration-300">
                  <p className="font-anton text-2xl md:text-3xl text-white tracking-tight mb-1 group-hover:text-brand-light transition-colors duration-300">{job.role}</p>
                  <p className="text-base md:text-lg text-[#9CA3B0] mb-4">{job.company}, {job.location}</p>
                  <ul className="flex flex-col gap-3">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="text-base md:text-lg text-white/70 leading-relaxed pl-3 border-l border-white/10">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          {hasMoreExp && (
            <div className="mt-8 flex justify-center md:hidden">
              <button
                onClick={loadMoreExp}
                className="px-6 py-3 min-h-[44px] border border-white/20 text-white/70 font-pixel text-sm hover:border-white/40 hover:text-white active:border-white/40 active:text-white active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                VIEW MORE
              </button>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h3 className="reveal font-pixel text-xl md:text-2xl text-[#9CA3B0] mb-10">Skills</h3>

          {/* Mobile: one pill per category */}
          <div className="reveal flex flex-wrap gap-3 md:hidden">
            {SKILLS.map(({ category, items }) => (
              <div key={category} className="flex flex-col gap-1 border border-brand/40 bg-white/5 px-4 py-3">
                <span className="font-pixel text-brand text-xs">{category}</span>
                <span className="text-white/50 text-xs leading-relaxed">
                  {items.slice(0, 3).join(' · ')}{items.length > 3 ? ` +${items.length - 3}` : ''}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop: full grid with all items */}
          <div className="hidden md:grid grid-cols-2 gap-8">
            {SKILLS.map(({ category, items }) => (
              <div key={category} className="reveal">
                <p className="font-pixel text-base md:text-lg text-brand mb-4">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm md:text-base px-3 py-1.5 border border-white/20 text-white/70 bg-white/5 hover:bg-brand hover:border-brand hover:text-white transition-all duration-300 hover:-translate-y-0.5 cursor-default shadow-sm hover:shadow-brand/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="reveal font-pixel text-xl md:text-2xl text-[#9CA3B0] mb-10">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleCerts.map((cert) => {
              const CardContent = (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-base md:text-lg text-brand group-hover:scale-105 origin-left transition-transform duration-300">{cert.abbr}</span>
                      {cert.issuer && (
                        <span className="text-xs font-mono uppercase bg-brand/10 border border-brand/30 text-brand px-2 py-0.5 rounded">
                          {cert.issuer}
                        </span>
                      )}
                    </div>
                    {cert.url && (
                      <svg className="w-4 h-4 text-white/50 group-hover:text-brand transition-colors duration-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </div>
                  <p className="text-base md:text-lg font-medium text-white leading-snug mb-2 group-hover:text-brand-light transition-colors duration-300">{cert.name}</p>
                  {cert.issued && (
                    <p className="text-sm md:text-base text-[#9CA3B0]">
                      Issued {cert.issued}{cert.expires ? ` · Expires ${cert.expires}` : ''}
                    </p>
                  )}
                </>
              )

              const cardClasses = "reveal bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-brand/40 active:bg-white/10 active:border-brand/40 transition-all duration-300 hover:-translate-y-1 group block text-left"

              return cert.url ? (
                <a
                  key={cert.abbr}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClasses}
                >
                  {CardContent}
                </a>
              ) : (
                <div key={cert.abbr} className={cardClasses}>
                  {CardContent}
                </div>
              )
            })}
          </div>
          {hasMoreCerts && (
            <div className="mt-8 flex justify-center md:hidden">
              <button
                onClick={loadMoreCerts}
                className="px-6 py-3 min-h-[44px] border border-white/20 text-white/70 font-pixel text-sm hover:border-white/40 hover:text-white active:border-white/40 active:text-white active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                VIEW MORE
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
