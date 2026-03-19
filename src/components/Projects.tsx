import { useRef, useEffect, useState } from 'react'
import type { Project } from '../data/projects'
import { PROJECTS } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import { usePagination } from '../hooks/usePagination'

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = descRef.current
    if (el) setOverflows(el.scrollHeight > el.clientHeight)
  }, [project.description])

  return (
    <div className="reveal bg-app-card border border-app-border shadow-sm p-8 md:p-10 flex flex-col">
      <span className="font-pixel text-brand mb-5 block">{project.role}</span>
      <h3 className="font-anton text-3xl md:text-4xl text-app-heading leading-tight tracking-tight mb-4">
        {project.title}
      </h3>
      <div className="flex-1 mb-8">
        <p
          ref={descRef}
          className={`text-app-body text-base leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}
        >
          {project.description}
        </p>
        {(overflows || expanded) && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="mt-1 text-brand text-sm font-medium hover:brightness-125 active:brightness-90 transition-all focus-visible:outline-none"
          >
            {expanded ? 'Show less ↑' : 'Read more ↓'}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-sm px-3 py-1.5 border border-brand text-brand"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useReveal<HTMLElement>()
  const { visibleItems: visibleProjects, hasMore, loadMore } = usePagination(PROJECTS, 4, 4, 2)

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-6">
        <h2 className="reveal font-anton text-5xl md:text-6xl text-app-heading mb-16 tracking-tight">
          PROJECTS
        </h2>

        <div className="flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={loadMore}
                className="px-6 py-3 min-h-[44px] bg-app-card border border-app-border text-app-heading font-pixel text-sm hover:border-brand hover:text-brand active:border-brand active:text-brand active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
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
