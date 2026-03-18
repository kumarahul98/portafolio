interface Props {
  hasImage?: boolean
}

export default function SkeletonCard({ hasImage = false }: Props) {
  return (
    <div className="bg-app-card border border-app-border animate-pulse flex flex-col">
      {hasImage && <div className="w-full aspect-video bg-app-border" />}
      <div className={hasImage ? "p-5" : "p-6"}>
        <div className="h-3 bg-app-border rounded mb-5 w-1/3" />
        <div className="h-6 bg-app-border rounded mb-4 w-3/4" />
        <div className="h-4 bg-app-border rounded mb-2 w-full" />
        <div className="h-4 bg-app-border rounded w-2/3" />
      </div>
    </div>
  )
}
