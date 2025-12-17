import { useState, useRef, useEffect } from 'react';
import { useSearchHistory } from '../../hooks/useSearchHistory';
import { useDebounce } from '../../hooks/useDebounce';
import { useClickOutside } from '../../hooks/useClickOutside';
import SearchDropdown from './SearchDropdown';

// Main search bar component
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchContainerRef = useRef(null);

  const { history, addSearch, clearHistory } = useSearchHistory();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Close dropdown when clicking outside
  useClickOutside(searchContainerRef, () => {
    setIsDropdownOpen(false);
  });

  // Simulate API search when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      // Simulate API delay (will be replaced with actual API call)
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [debouncedSearchTerm]);

  // Handle input focus - open dropdown
  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  // Handle input change
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (!isDropdownOpen) {
      setIsDropdownOpen(true);
    }
  };

  // Handle form submit or Enter key
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      addSearch(searchTerm.trim());
      // In the future, this is where you'd trigger the full search
      console.log('Search submitted:', searchTerm);
    }
  };

  // Handle clicking a previous search item
  const handlePreviousSearchClick = (term) => {
    setSearchTerm(term);
    addSearch(term); // Update lastAccessed timestamp
    // In the future, trigger API search here
    console.log('Previous search clicked:', term);
  };

  // Handle clear history
  const handleClearHistory = () => {
    clearHistory();
  };

  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div
        ref={searchContainerRef}
        className="w-full max-w-2xl relative"
      >
        {/* Search input container */}
        <form onSubmit={handleSubmit}>
          <div className="relative">
            {/* Magnifying glass icon */}
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {/* Search input */}
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              onFocus={handleFocus}
              placeholder="Search for houseplants..."
              className="w-full bg-white rounded-full px-12 py-3 shadow-md
                       focus:shadow-lg focus:outline-none focus:ring-2
                       focus:ring-green-500 transition-all duration-200
                       text-gray-700 placeholder-gray-400"
              role="searchbox"
              aria-label="Search for houseplants"
              aria-expanded={isDropdownOpen}
              aria-autocomplete="list"
            />

            {/* Clear button (X) - shows when there's text */}
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2
                         text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>

        {/* Dropdown */}
        <SearchDropdown
          isOpen={isDropdownOpen}
          searchHistory={history}
          currentSearchTerm={searchTerm}
          onSearchClick={handlePreviousSearchClick}
          onClearHistory={handleClearHistory}
          isSearching={isSearching}
        />
      </div>
    </div>
  );
};

export default SearchBar;
