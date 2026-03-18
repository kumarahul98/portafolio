interface Props {
  hasImage?: boolean
}

export default function SkeletonCard({ hasImage = false }: Props) {
  return (
    <div className="bg-[var(--c-card)] border border-[var(--c-border)] animate-pulse flex flex-col">
      {hasImage && <div className="w-full aspect-video bg-[var(--c-border)]" />}
      <div className={hasImage ? "p-5" : "p-6"}>
        <div className="h-3 bg-[var(--c-border)] rounded mb-5 w-1/3" />
        <div className="h-6 bg-[var(--c-border)] rounded mb-4 w-3/4" />
        <div className="h-4 bg-[var(--c-border)] rounded mb-2 w-full" />
        <div className="h-4 bg-[var(--c-border)] rounded w-2/3" />
      </div>
    </div>
  )
}
