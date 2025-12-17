// Skeleton loading component for search results
const SearchResultSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex items-center gap-3 animate-pulse">
          {/* Image skeleton */}
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />

          {/* Content skeleton */}
          <div className="flex-1 space-y-2">
            {/* Plant name skeleton */}
            <div className="h-4 bg-gray-200 rounded w-3/4" />

            {/* Scientific name skeleton */}
            <div className="h-3 bg-gray-200 rounded w-1/2" />

            {/* Description skeleton */}
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultSkeleton;
