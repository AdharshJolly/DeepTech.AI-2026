import Skeleton from "./Skeleton";

export default function SpeakersSkeleton() {
  return (
    <section className="py-16 md:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-20">
          <Skeleton className="h-8 w-48 mx-auto mb-6 rounded-full" />
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        {/* Featured Speaker Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="bg-white rounded-3xl p-8 border border-ieee-gray/10 flex flex-col md:flex-row gap-8">
            <Skeleton className="w-full md:w-80 h-64 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Speakers Grid Skeleton */}
        <Skeleton className="h-6 w-40 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-ieee-gray/10"
            >
              <Skeleton className="w-full h-48 rounded-2xl mb-4" />
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-3 w-24 mb-1" />
              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
