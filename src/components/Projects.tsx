import { PROJECTS } from '../data/projects'
import { useReveal } from '../hooks/useReveal'
import { usePagination } from '../hooks/usePagination'

export default function Projects() {
  const sectionRef = useReveal<HTMLElement>()
  const { visibleItems: visibleProjects, hasMore, loadMore } = usePagination(PROJECTS, 4, 4, 3)

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
            <div
              key={project.title}
              className="reveal bg-app-card border border-app-border shadow-sm p-8 md:p-10 flex flex-col"
            >
              <span className="font-pixel text-brand mb-5 block">{project.role}</span>
              <h3 className="font-anton text-3xl md:text-4xl text-app-heading leading-tight tracking-tight mb-4">
                {project.title}
              </h3>
              <p className="text-app-body text-base leading-relaxed flex-1 mb-8">
                {project.description}
              </p>
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
          ))}
          </div>
          {hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={loadMore}
                className="px-6 py-3 bg-app-card border border-app-border text-app-heading font-pixel text-sm hover:border-brand hover:text-brand transition-colors duration-200"
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
