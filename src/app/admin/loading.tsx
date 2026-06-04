export default function AdminLoading() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-56 bg-border animate-pulse" />
          <div className="h-4 w-40 bg-border animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-background p-5 space-y-2">
            <div className="h-3 w-24 bg-border animate-pulse" />
            <div className="h-8 w-16 bg-border animate-pulse" />
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-border animate-pulse" />
        ))}
      </div>
    </div>
  )
}
