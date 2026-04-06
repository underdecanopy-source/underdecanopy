/**
 * Loading Skeleton Component
 * Displays while pages in the (main) route group are loading
 * Provides visual feedback to users during page transitions
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Navigation Skeleton */}
      <div className="sticky top-0 z-50 w-full bg-gray-200 h-16 drop-shadow-lg"></div>

      {/* Hero Section Skeleton */}
      <section className="bg-gray-100 py-16">
  <div className="page-container">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            {/* Text Content */}
            <div className="max-w-lg flex-1">
              <div className="h-10 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
              <div className="h-12 bg-gray-300 rounded w-40"></div>
            </div>

            {/* Image Placeholder */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-full max-w-md md:max-w-none aspect-square bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-16">
  <div className="page-container">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded mb-4 w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded mb-2 w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="h-6 bg-gray-300 rounded w-24"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Services Section Skeleton */}
      <section className="bg-gray-100 py-16">
  <div className="page-container">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded mb-4 w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded mb-2 w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>

          {/* Service Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-300 mx-auto mb-4"></div>
                <div className="h-5 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cafe Section Skeleton */}
      <section className="py-16">
  <div className="page-container">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-300 rounded mb-4 w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded mb-2 w-2/3 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>

          {/* Cafe Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 mx-auto mb-4"></div>
                <div className="h-5 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <div className="bg-gray-800 py-12">
  <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-6 bg-gray-700 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-700 rounded mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-700 rounded w-4/5"></div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

