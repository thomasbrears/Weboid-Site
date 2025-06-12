import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import TitleHeader from '../components/TitleHeader';
import SearchBar from '../components/SearchBar';
import ArticleCard from '../components/ArticleCard';
import CategoryFilter from '../components/CategoryFilter';
import ContactButton from '../components/ContactButton';
import articlesData from '../data/articles.json';

const KnowledgeBase = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Calculate article counts for categories
  const articleCounts = useMemo(() => {
    return articles.reduce((acc, article) => {
      acc[article.category] = (acc[article.category] || 0) + 1;
      return acc;
    }, {});
  }, [articles]);

  // Refs for scroll management
  const articlesRef = useRef(null);
  const searchBarRef = useRef(null);

  // Load articles on mount
  useEffect(() => {
    // Load articles from JSON
    if (articlesData && articlesData.articles) {
      setArticles(articlesData.articles);
      // Apply initial filters based on URL params
      filterArticles(searchQuery, selectedCategory, articlesData.articles);
      setIsInitialLoad(false);
    }
  }, []);

  // TEMPORARILY DISABLED: URL updates might be causing scroll issues
  // useEffect(() => {
  //   if (isInitialLoad) return;
    
  //   const timeoutId = setTimeout(() => {
  //     const params = new URLSearchParams();
  //     if (searchQuery) params.set('search', searchQuery);
  //     if (selectedCategory !== 'all') params.set('category', selectedCategory);
      
  //     // Use replace to avoid adding to browser history for every keystroke
  //     setSearchParams(params, { replace: true });
  //   }, 500); // Debounce URL updates

  //   return () => clearTimeout(timeoutId);
  // }, [searchQuery, selectedCategory, setSearchParams, isInitialLoad]);

  
  // Smooth scroll to articles section (only for category changes)
  const scrollToArticles = useCallback(() => {
    // Only scroll if articles section exists and we're not near it
    if (articlesRef.current) {
      const element = articlesRef.current;
      const rect = element.getBoundingClientRect();
      const isNearArticles = rect.top >= -200 && rect.top <= 200;
      
      // Don't scroll if we're already near the articles section
      if (!isNearArticles) {
        const yOffset = -100; // Offset for fixed header
        const y = rect.top + window.pageYOffset + yOffset;
        
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, []);

  const handleSearch = useCallback((query) => {
    // Prevent any scrolling during initial load
    if (isInitialLoad) return;
    
    // Store current scroll position
    const currentScrollY = window.scrollY;
    
    setSearchQuery(query);
    
    // Don't show loading for empty searches
    if (!query.trim() && searchQuery.trim()) {
      filterArticles('', selectedCategory, articles);
      // Restore scroll position
      requestAnimationFrame(() => {
        window.scrollTo({ 
          top: currentScrollY, 
          left: 0, 
          behavior: 'instant' 
        });
      });
      return;
    }
    
    // Only show loading for actual searches
    if (query.trim()) {
      setIsLoading(true);
      
      // Simulate search delay for better UX
      setTimeout(() => {
        filterArticles(query, selectedCategory, articles);
        setIsLoading(false);
        
        // Restore scroll position after search completes
        requestAnimationFrame(() => {
          window.scrollTo({ 
            top: currentScrollY, 
            left: 0, 
            behavior: 'instant' 
          });
        });
      }, 300);
    } else {
      filterArticles(query, selectedCategory, articles);
      // Restore scroll position
      requestAnimationFrame(() => {
        window.scrollTo(0, currentScrollY);
      });
    }
  }, [searchQuery, selectedCategory, articles, isInitialLoad]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    
    // Quick category switch without loading
    filterArticles(searchQuery, category, articles);
    
    // Smooth scroll to articles only for category changes
    setTimeout(() => {
      scrollToArticles();
    }, 100);
  }, [searchQuery, articles, scrollToArticles]);

  const filterArticles = useCallback((query, category, articlesList = articles) => {
    let filtered = [...articlesList];
    
    // Filter by category first
    if (category && category !== 'all') {
      filtered = filtered.filter(article => article.category === category);
    }
    
    // Then filter by search query if provided
    if (query && query.trim()) {
      const lowerCaseQuery = query.toLowerCase().trim();
      const searchTerms = lowerCaseQuery.split(' ').filter(term => term.length > 0);
      
      filtered = filtered.filter(article => {
        // Create searchable content
        const searchableContent = [
          article.title,
          article.summary,
          article.content,
          ...(article.tags || []),
          article.categoryName || ''
        ].join(' ').toLowerCase();
        
        // Check if all search terms are found
        return searchTerms.every(term => 
          searchableContent.includes(term)
        );
      });
      
      // Sort by relevance (title matches first, then summary, then content)
      filtered.sort((a, b) => {
        const getRelevanceScore = (article) => {
          let score = 0;
          const title = article.title.toLowerCase();
          const summary = article.summary.toLowerCase();
          
          searchTerms.forEach(term => {
            if (title.includes(term)) score += 10;
            if (summary.includes(term)) score += 5;
            if (article.tags?.some(tag => tag.toLowerCase().includes(term))) score += 3;
          });
          
          return score;
        };
        
        return getRelevanceScore(b) - getRelevanceScore(a);
      });
    } else {
      // Sort by featured first, then by date
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        
        // Then by date (most recent first)
        const dateA = new Date(a.lastUpdated || a.dateCreated || '');
        const dateB = new Date(b.lastUpdated || b.dateCreated || '');
        return dateB - dateA;
      });
    }
    
    setFilteredArticles(filtered);
  }, [articles]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    filterArticles('', 'all', articles);
    // Don't scroll when clearing filters
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';
  const categoryName = selectedCategory !== 'all' 
    ? articlesData.categories?.find(c => c.id === selectedCategory)?.name 
    : null;

  return (
    <>
      <Helmet>
        <title>Knowledge Base | Weboid Support</title>
        <meta name="description" content="Browse our knowledge base for answers to common questions about web development, website management, and technical support." />
      </Helmet>
      
      <TitleHeader
        title="Knowledge Base"
        subtitle="Pātai me ngā whakautu - How can we help you?"
        backgroundImage="img/knowledge-base.png"
      />

      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Search our knowledge base or browse by category to find answers to your questions
            </p>
            
            <div ref={searchBarRef} className="mb-8 max-w-2xl mx-auto">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Search articles, topics, or keywords..." 
                initialValue={searchQuery}
                enableLiveSearch={true}
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">Browse by Category</h2>
            <CategoryFilter 
              categories={articlesData.categories || []}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              articleCounts={articleCounts}
            />
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => handleSearch('')}
                    className="ml-2 hover:text-blue-600 dark:hover:text-blue-300 focus:outline-none"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                </span>
              )}
              {categoryName && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  Category: {categoryName}
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className="ml-2 hover:text-green-600 dark:hover:text-green-300 focus:outline-none"
                    aria-label="Clear category filter"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline focus:outline-none"
              >
                Clear all filters
              </button>
            </div>
          )}
          
          {/* Articles List */}
          <div ref={articlesRef} className="scroll-mt-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {searchQuery 
                  ? `Search Results for "${searchQuery}"` 
                  : categoryName
                    ? `${categoryName} Articles`
                    : 'All Articles'}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {isLoading ? 'Searching...' : `${filteredArticles.length} article${filteredArticles.length !== 1 ? 's' : ''}`}
              </span>
            </div>
            
            {/* Loading State with Skeleton */}
            {isLoading && searchQuery ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="mb-4">
                  <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20a7.962 7.962 0 01-5.207-1.954c-.058-.046-.119-.094-.185-.144H6a2 2 0 01-2-2V6a2 2 0 012 2v8a2 2 0 01-2 2h-1.172z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {searchQuery ? 'No search results found' : 'No articles found'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {searchQuery 
                    ? `Try different keywords or check the spelling. You searched for "${searchQuery}".`
                    : 'No articles are available in this category.'
                  }
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="mb-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline focus:outline-none"
                  >
                    Clear all filters and view all articles
                  </button>
                )}
                <div>
                  <ContactButton />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300" key="articles-grid">
                {filteredArticles.map((article, index) => (
                  <div
                    key={article.id}
                    className="transition-all duration-300 ease-out opacity-0"
                    style={{
                      animationDelay: `${Math.min(index * 50, 300)}ms`,
                      animation: 'fadeInUp 0.5s ease-out forwards',
                      animationFillMode: 'forwards'
                    }}
                  >
                    <ArticleCard 
                      article={article} 
                      searchQuery={searchQuery}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Contact Support */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Need More Help?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Contact our team for assistance or submit a support ticket. We're here to help you with any questions or issues you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/support/ticket"
                className="bg-blue-600 dark:bg-blue-800 text-white px-6 py-3 rounded-md text-md hover:bg-blue-800 dark:hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                Submit a Support Ticket
              </Link>
              <Link
                to="/contact"
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-md text-md hover:bg-gray-300 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Prevent layout shift during animations */
        .grid > div {
          will-change: opacity, transform;
        }
      `}} />
    </>
  );
};

export default KnowledgeBase;