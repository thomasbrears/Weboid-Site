import React, { useState, useEffect, useCallback, useRef } from 'react';

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search for help...", 
  initialValue = '',
  enableLiveSearch = false,
  debounceDelay = 400
}) => {
  const [query, setQuery] = useState(initialValue);
  const [isTyping, setIsTyping] = useState(false);
  const debounceTimer = useRef(null);
  const inputRef = useRef(null);

  // Update local state when initialValue changes (from URL params)
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback((searchValue) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setIsTyping(true);
    
    debounceTimer.current = setTimeout(() => {
      onSearch(searchValue);
      setIsTyping(false);
    }, debounceDelay);
  }, [onSearch, debounceDelay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Clear any pending debounced search
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    const trimmedQuery = query.trim();
    onSearch(trimmedQuery);
    setIsTyping(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Live search with debouncing if enabled
    if (enableLiveSearch) {
      debouncedSearch(value.trim());
    }
  };

  const clearSearch = () => {
    // Clear any pending debounced search
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    setQuery('');
    onSearch('');
    setIsTyping(false);
    
    // Refocus input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    // Clear search on Escape key
    if (e.key === 'Escape') {
      clearSearch();
    }
    // On Enter, immediately search (bypassing debounce)
    else if (e.key === 'Enter' && enableLiveSearch) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            className="w-full px-4 py-3 pl-12 pr-20 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            aria-label="Search knowledge base"
            autoComplete="off"
            spellCheck="false"
          />
          
          {/* Search Icon - Animated when typing */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-all duration-200 ${
                isTyping ? 'animate-pulse text-blue-600 dark:text-blue-400' : ''
              }`}
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          
          {/* Loading indicator when typing (for live search) */}
          {enableLiveSearch && isTyping && query && (
            <div className="absolute inset-y-0 right-20 flex items-center pr-2">
              <div className="w-4 h-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Clear button */}
          {query && !isTyping && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-16 px-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded transition-all duration-200 hover:scale-110"
              aria-label="Clear search"
              tabIndex={0}
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path 
                  fillRule="evenodd" 
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </button>
          )}
          
          {/* Search Button - Only show if live search is disabled */}
          {!enableLiveSearch && (
            <button
              type="submit"
              className="absolute inset-y-0 right-0 px-4 text-white bg-blue-600 dark:bg-blue-800 rounded-r-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50"
              aria-label="Search"
            >
              <span className="hidden sm:inline">Search</span>
              <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}
        </div>
      </form>
      
      {/* Search hints */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
        <div>
          {enableLiveSearch ? (
            <>
              {isTyping ? 'Searching...' : ''}
            </>
          ) : (
            'Press Enter to search'
          )}
          {query && ' • Press Escape to clear'}
        </div>
        {query.length > 0 && (
          <div className="text-right">
            {query.length} character{query.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;