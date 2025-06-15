import React, { useState } from 'react';

const CategoryFilter = ({ 
  categories = [], 
  selectedCategory, 
  onCategoryChange,
  articleCounts = {}
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Ensure we have categories to work with
  if (!categories || categories.length === 0) {
    return null;
  }

  // Calculate total articles
  const totalArticles = Object.values(articleCounts).reduce((sum, count) => sum + count, 0);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === selectedCategory) return; // Don't transition if already selected
    
    setIsTransitioning(true);
    
    // Small delay for visual feedback
    setTimeout(() => {
      onCategoryChange(categoryId);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {/* All Categories Button */}
        <button
          className={`
            px-4 py-2 rounded-md text-sm font-medium 
            transition-all duration-300 transform
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
            ${selectedCategory === 'all'
              ? 'bg-blue-600 dark:bg-blue-800 text-white shadow-lg scale-105 ring-2 ring-blue-600 ring-opacity-50'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-md hover:scale-105'
            }
          `}
          onClick={() => handleCategoryClick('all')}
          aria-pressed={selectedCategory === 'all'}
          disabled={isTransitioning}
        >
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            All Categories
            <span className={`
              ml-2 px-2 py-0.5 rounded-full text-xs font-bold
              transition-all duration-300
              ${selectedCategory === 'all' 
                ? 'bg-blue-500 dark:bg-blue-700 text-white' 
                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }
            `}>
              {totalArticles}
            </span>
          </span>
        </button>
        
        {/* Individual Category Buttons */}
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const articleCount = articleCounts[category.id] || 0;
          
          // Category icons mapping
          const categoryIcons = {
            'general': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            'technical': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
            'billing': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
            'hosting': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
            'development': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
          };
          
          const icon = categoryIcons[category.id] || category.icon;
          
          return (
            <button
              key={category.id}
              className={`
                px-4 py-2 rounded-md text-sm font-medium 
                transition-all duration-300 transform
                focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
                ${isSelected
                  ? 'bg-blue-600 dark:bg-blue-800 text-white shadow-lg scale-105 ring-2 ring-blue-600 ring-opacity-50'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-md hover:scale-105'
                }
                ${articleCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => articleCount > 0 && handleCategoryClick(category.id)}
              aria-pressed={isSelected}
              title={category.description || `View ${category.name} articles`}
              disabled={isTransitioning || articleCount === 0}
            >
              <span className="flex items-center">
                {/* Category Icon */}
                {icon && (
                  <span className="mr-1.5" aria-hidden="true">{icon}</span>
                )}
                {category.name}
                {/* Article count */}
                <span className={`
                  ml-2 px-2 py-0.5 rounded-full text-xs font-bold
                  transition-all duration-300
                  ${isSelected 
                    ? 'bg-blue-500 dark:bg-blue-700 text-white' 
                    : articleCount === 0
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-500'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }
                `}>
                  {articleCount}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Category description tooltip */}
      {selectedCategory !== 'all' && (
        <div className="mt-4 text-center">
          {categories.find(c => c.id === selectedCategory)?.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 italic animate-fadeIn">
              {categories.find(c => c.id === selectedCategory).description}
            </p>
          )}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CategoryFilter;