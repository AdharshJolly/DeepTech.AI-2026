export default function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-ieee-gray/10 rounded-xl ${className}`}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-ieee-gray/10">
      <div className="flex items-start gap-4">
        <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
}

export function SkeletonLeaderboard() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl flex items-center justify-between border border-ieee-gray/5 bg-white"
        >
          <div className="flex items-center gap-3.5">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-2 w-16" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-8 ml-auto" />
            <Skeleton className="h-2 w-10 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonPost() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-ieee-gray/10">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-2 w-16" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white rounded-3xl border border-ieee-gray/10 overflow-hidden">
      <div className="bg-ieee-gray/5 border-b border-ieee-gray/10 px-6 py-4">
        <Skeleton className="h-4 w-32" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="px-6 py-4 border-b border-ieee-gray/5 flex items-center gap-4"
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24 hidden md:block" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
      ))}
    </div>
  );
}
