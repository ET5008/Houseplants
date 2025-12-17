import { useMemo } from 'react';
import PreviousSearchItem from './PreviousSearchItem';
import SearchResultSkeleton from './SearchResultSkeleton';

// Dropdown component for showing previous searches and search results
const SearchDropdown = ({
  isOpen,
  searchHistory,
  currentSearchTerm,
  onSearchClick,
  onClearHistory,
  isSearching = false
}) => {
  if (!isOpen) return null;

  // Filter history to show matches if user is typing
  const filteredHistory = useMemo(() => {
    if (!currentSearchTerm) return searchHistory;

    return searchHistory.filter(search =>
      search.term.toLowerCase().startsWith(currentSearchTerm.toLowerCase())
    );
  }, [currentSearchTerm, searchHistory]);

  const hasHistory = searchHistory.length > 0;
  const hasMatches = filteredHistory.length > 0;

  return (
    <div
      className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50"
      role="listbox"
      aria-label="Search suggestions"
    >
      {/* Previous Searches Section */}
      {hasHistory && (
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-500">
              Recent Searches
            </span>
            <button
              onClick={onClearHistory}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search history"
            >
              Clear
            </button>
          </div>

          {/* Previous search items */}
          {hasMatches ? (
            <div>
              {filteredHistory.map((search) => (
                <PreviousSearchItem
                  key={search.id}
                  term={search.term}
                  timestamp={search.timestamp}
                  onClick={onSearchClick}
                  isMatched={currentSearchTerm.length > 0}
                />
              ))}
            </div>
          ) : currentSearchTerm ? (
            <div className="px-4 py-3 text-sm text-gray-500">
              No matching previous searches
            </div>
          ) : (
            <div>
              {searchHistory.map((search) => (
                <PreviousSearchItem
                  key={search.id}
                  term={search.term}
                  timestamp={search.timestamp}
                  onClick={onSearchClick}
                  isMatched={false}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* API Results Section (skeleton placeholder) */}
      {currentSearchTerm && (
        <div className={hasHistory ? 'border-t border-gray-200' : ''}>
          <div className="px-4 py-2 text-sm font-medium text-gray-500">
            Plant Results
          </div>

          {isSearching ? (
            <SearchResultSkeleton count={5} />
          ) : (
            <div className="px-4 py-3 text-sm text-gray-400 italic">
              API integration coming soon...
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!hasHistory && !currentSearchTerm && (
        <div className="px-4 py-8 text-center text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-3 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-sm">No recent searches</p>
          <p className="text-xs text-gray-400 mt-1">
            Start typing to search for plants
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
