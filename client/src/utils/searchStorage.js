// localStorage key and schema version for search history
export const STORAGE_KEY = 'houseplants_search_history';
export const SCHEMA_VERSION = '1.0.0';
export const MAX_SEARCHES = 5;

// Generate a simple unique ID
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get search history from localStorage
export const getSearchHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return { version: SCHEMA_VERSION, searches: [] };
    }

    const parsed = JSON.parse(data);

    // Version validation for future migrations
    if (parsed.version !== SCHEMA_VERSION) {
      console.warn('Schema version mismatch, clearing history');
      return { version: SCHEMA_VERSION, searches: [] };
    }

    return parsed;
  } catch (error) {
    console.error('Failed to read search history:', error);
    return { version: SCHEMA_VERSION, searches: [] };
  }
};

// Save search history to localStorage
export const saveSearchHistory = (searches) => {
  try {
    const data = {
      version: SCHEMA_VERSION,
      searches: searches.slice(0, MAX_SEARCHES) // Ensure max 5 searches
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
      // Fallback: try to save with fewer items
      try {
        const reducedData = {
          version: SCHEMA_VERSION,
          searches: searches.slice(0, 3)
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reducedData));
        return true;
      } catch (retryError) {
        console.error('Failed to save even with reduced data');
        return false;
      }
    }
    console.error('Failed to save search history:', error);
    return false;
  }
};

// Add a new search to history
export const addSearch = (term) => {
  if (!term || typeof term !== 'string' || term.trim() === '') {
    return false;
  }

  const history = getSearchHistory();
  const normalizedTerm = term.trim();

  // Check if this exact search already exists
  const existingIndex = history.searches.findIndex(
    search => search.term.toLowerCase() === normalizedTerm.toLowerCase()
  );

  const now = Date.now();

  if (existingIndex !== -1) {
    // Update existing search - move to front and update lastAccessed
    const existingSearch = history.searches[existingIndex];
    existingSearch.lastAccessed = now;
    history.searches.splice(existingIndex, 1);
    history.searches.unshift(existingSearch);
  } else {
    // Create new search entry
    const newSearch = {
      id: generateId(),
      term: normalizedTerm,
      timestamp: now,
      resultCount: null, // Placeholder for future API integration
      source: 'manual',
      lastAccessed: now
    };

    // Add to front of array
    history.searches.unshift(newSearch);

    // Maintain max 5 searches (FIFO)
    if (history.searches.length > MAX_SEARCHES) {
      history.searches = history.searches.slice(0, MAX_SEARCHES);
    }
  }

  return saveSearchHistory(history.searches);
};

// Clear all search history
export const clearSearchHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear search history:', error);
    return false;
  }
};

// Update result count for a search (for future API integration)
export const updateSearchResultCount = (term, count) => {
  const history = getSearchHistory();
  const search = history.searches.find(
    s => s.term.toLowerCase() === term.toLowerCase()
  );

  if (search) {
    search.resultCount = count;
    return saveSearchHistory(history.searches);
  }

  return false;
};
