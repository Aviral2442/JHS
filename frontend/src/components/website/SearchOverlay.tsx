// components/SearchOverlay.tsx
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

export interface SearchResult {
  id: string;
  type: 'service' | 'product' | 'category' | 'article';
  title: string;
  description: string;
  url: string;
  image?: string;
  price?: number;
  rating?: number;
  tags: string[];
  serviceName?: string;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  resultCount: number;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// API service functions
const searchApi = {
  // Fetch search results from API
  async search(query: string, abortSignal?: AbortSignal): Promise<SearchResult[]> {
    try {
      // In production, replace with your actual API endpoint
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        signal: abortSignal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  },

  // Fetch search suggestions
  async getSuggestions(): Promise<string[]> {
    try {
      const response = await fetch('/api/search/suggestions', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();
      return data.suggestions || [];
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
      return [];
    }
  },

  // Fetch popular searches
  async getPopularSearches(): Promise<string[]> {
    try {
      const response = await fetch('/api/search/popular', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch popular searches');
      }

      const data = await response.json();
      return data.popular || [];
    } catch (error) {
      console.error('Failed to fetch popular searches:', error);
      return [];
    }
  },

  // Get search history from localStorage
  getSearchHistory(): SearchHistoryItem[] {
    try {
      const history = localStorage.getItem('searchHistory');
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Failed to get search history:', error);
      return [];
    }
  },

  // Save search to history
  saveToHistory(query: string, resultCount: number): SearchHistoryItem[] {
    try {
      const history = this.getSearchHistory();
      const now = new Date().toISOString();
      
      // Remove duplicates and keep only last 10 items
      const newItem: SearchHistoryItem = {
        id: `${Date.now()}`,
        query,
        timestamp: now,
        resultCount,
      };

      const filteredHistory = history.filter(item => item.query.toLowerCase() !== query.toLowerCase());
      const updatedHistory = [newItem, ...filteredHistory].slice(0, 10);
      
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    } catch (error) {
      console.error('Failed to save search history:', error);
      return [];
    }
  },

  // Clear search history
  clearSearchHistory(): void {
    try {
      localStorage.removeItem('searchHistory');
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  },
};

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [history, suggestionsData, popularData] = await Promise.all([
          Promise.resolve(searchApi.getSearchHistory()),
          searchApi.getSuggestions(),
          searchApi.getPopularSearches(),
        ]);
        
        setSearchHistory(history);
        setSuggestions(suggestionsData);
        setPopularSearches(popularData);
      } catch (error) {
        console.error('Failed to load initial data:', error);
      }
    };

    if (isOpen) {
      loadInitialData();
    }
  }, [isOpen]);

  // Handle search with debounce
  useEffect(() => {
    const search = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setShowHistory(true);
        setError(null);
        return;
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();
      
      setIsLoading(true);
      setError(null);
      setShowHistory(false);

      try {
        const results = await searchApi.search(
          searchQuery, 
          abortControllerRef.current.signal
        );
        
        setSearchResults(results);
        
        // Save to history if we have results
        if (results.length > 0) {
          const updatedHistory = searchApi.saveToHistory(searchQuery, results.length);
          setSearchHistory(updatedHistory);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setError('Failed to fetch search results. Please try again.');
          console.error('Search error:', error);
        }
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(search, 300); // 300ms debounce

    return () => {
      clearTimeout(timer);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchQuery]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      // Close on Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }

      // Navigate results with arrow keys
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const results = modalRef.current?.querySelectorAll('[data-search-result]');
        if (results && results.length > 0) {
          const currentIndex = Array.from(results).findIndex(el => 
            el === document.activeElement
          );
          
          let nextIndex = 0;
          if (e.key === 'ArrowDown') {
            nextIndex = currentIndex < results.length - 1 ? currentIndex + 1 : 0;
          } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : results.length - 1;
          }
          
          (results[nextIndex] as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowHistory(true);
    setError(null);
    searchInputRef.current?.focus();
  };

  const handleHistoryItemClick = (query: string) => {
    setSearchQuery(query);
    searchInputRef.current?.focus();
  };

  const handleClearHistory = () => {
    searchApi.clearSearchHistory();
    setSearchHistory([]);
  };

  const handleResultClick = (result: SearchResult) => {
    console.log('Navigating to:', result.url);
    // In a real app, you would use:
    // router.push(result.url);
    // or
    // window.location.href = result.url;
    onClose();
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'service': return '🎨';
      case 'product': return '🛒';
      case 'category': return '📁';
      case 'article': return '📝';
      default: return '🔍';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-9999">
        {/* Blur Background */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div 
          ref={modalRef}
          className="absolute inset-0 md:inset-x-auto md:top-20 md:left-1/2 md:transform md:-translate-x-1/2 md:w-full md:max-w-3xl md:max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col bg-white/95 backdrop-blur-sm md:rounded-2xl md:shadow-2xl md:border md:border-gray-200/50 overflow-hidden">
            {/* Search Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </div>

                {/* Search Input */}
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search for services, products, or articles..."
                  className="w-full pl-12 pr-24 py-3 text-base bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Search"
                />

                {/* Action Buttons */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label="Clear search"
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  
                  <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg">
                    <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">ESC</kbd>
                    <span className="text-xs text-gray-500">to close</span>
                  </div>
                  
                  <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close search"
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Results Container */}
            <div className="flex-1 overflow-y-auto">
              {error ? (
                // Error State
                <div className="p-8 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-red-100 rounded-full">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Error</h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : searchQuery && searchResults.length > 0 ? (
                // Search Results
                <div>
                  {/* Results Header */}
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                      </h3>
                      <span className="text-sm text-gray-500">
                        Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">↑↓</kbd> to navigate
                      </span>
                    </div>
                  </div>

                  {/* Results List */}
                  <div className="divide-y divide-gray-100">
                    {searchResults.map((result, index) => (
                      <button
                        key={`${result.id}-${index}`}
                        data-search-result
                        onClick={() => handleResultClick(result)}
                        className="w-full text-left px-6 py-4 hover:bg-gray-50/80 transition-colors group focus:outline-none focus:bg-blue-50"
                        tabIndex={0}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-lg bg-blue-50">
                            <span className="text-xl">{getResultIcon(result.type)}</span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 truncate">
                                {result.title}
                              </h4>
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                                {result.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {result.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                              {result.serviceName && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                  </svg>
                                  {result.serviceName}
                                </span>
                              )}
                              {result.price && (
                                <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">
                                  ${result.price}
                                </span>
                              )}
                              {result.rating && (
                                <span className="flex items-center gap-1 px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded">
                                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  {result.rating}
                                </span>
                              )}
                              {result.tags.slice(0, 2).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : searchQuery && !isLoading ? (
                // No Results
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">
                    Try different keywords or check out our popular searches
                  </p>
                  {popularSearches.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {popularSearches.slice(0, 4).map((search, index) => (
                        <button
                          key={index}
                          onClick={() => setSearchQuery(search)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : showHistory && !searchQuery ? (
                // History & Suggestions
                <div className="divide-y divide-gray-100">
                  {/* Search History */}
                  {searchHistory.length > 0 && (
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Recent Searches
                        </h3>
                        <button
                          onClick={handleClearHistory}
                          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          Clear all
                        </button>
                      </div>
                      <div className="space-y-2">
                        {searchHistory.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleHistoryItemClick(item.query)}
                            className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg group transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-gray-700 group-hover:text-blue-600">
                                {item.query}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500">
                                {item.resultCount} results
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatTimeAgo(item.timestamp)}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  {popularSearches.length > 0 && (
                    <div className="p-6">
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                        Popular Searches
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {popularSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(search)}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg group transition-colors text-left"
                          >
                            <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 text-xs font-bold rounded">
                              {index + 1}
                            </span>
                            <span className="text-gray-700 group-hover:text-blue-600 flex-1 truncate">
                              {search}
                            </span>
                            <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Suggestions */}
                  {suggestions.length > 0 && (
                    <div className="p-6">
                      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                        You might be looking for
                      </h3>
                      <div className="space-y-2">
                        {suggestions.slice(0, 5).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(suggestion)}
                            className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg group transition-colors text-left"
                          >
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700 group-hover:text-blue-600 flex-1">
                              {suggestion}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 bg-gray-50 p-4">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">↑↓</kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">↵</kbd>
                  <span>Select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-xs">ESC</kbd>
                  <span>Close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchOverlay;