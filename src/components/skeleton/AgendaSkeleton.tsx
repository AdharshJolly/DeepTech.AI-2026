import Skeleton from "./Skeleton";

export default function AgendaSkeleton() {
  return (
    <section className="py-16 md:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-40 mx-auto mb-6 rounded-full" />
          <Skeleton className="h-12 w-56 mx-auto mb-4" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>

        {/* Day Tabs Skeleton */}
        <div className="flex justify-center gap-3 mb-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full" />
          ))}
        </div>

        {/* Timeline Skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-ieee-gray/10 flex flex-col md:flex-row gap-6"
            >
              <div className="md:w-32 shrink-0">
                <Skeleton className="h-6 w-20 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-64" />
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
