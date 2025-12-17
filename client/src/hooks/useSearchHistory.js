import { useState, useEffect, useCallback } from 'react';
import { getSearchHistory, addSearch as addSearchToStorage, clearSearchHistory as clearStorage } from '../utils/searchStorage';

// Hook to manage search history with localStorage
export const useSearchHistory = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load search history on mount
  useEffect(() => {
    const loadHistory = () => {
      const data = getSearchHistory();
      setHistory(data.searches);
      setIsLoading(false);
    };

    loadHistory();

    // Listen for storage changes (handles multi-tab scenarios)
    const handleStorageChange = (e) => {
      if (e.key === 'houseplants_search_history') {
        loadHistory();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Add a new search to history
  const addSearch = useCallback((term) => {
    const success = addSearchToStorage(term);
    if (success) {
      const data = getSearchHistory();
      setHistory(data.searches);
    }
    return success;
  }, []);

  // Clear all search history
  const clearHistory = useCallback(() => {
    const success = clearStorage();
    if (success) {
      setHistory([]);
    }
    return success;
  }, []);

  return {
    history,
    addSearch,
    clearHistory,
    isLoading
  };
};
