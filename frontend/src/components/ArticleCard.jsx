// Enhanced ArticleCard.jsx - Updated to use new article fields
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article, searchQuery = '', showCategory = true }) => {
  const [imageError, setImageError] = useState(false);
  
  // Function to highlight search terms in text
  const highlightText = (text, query) => {
    if (!query || !text) return text;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      highlightedText = highlightedText.replace(regex, (match) => 
        `<mark class="bg-yellow-200 dark:bg-yellow-900 px-1 rounded">${match}</mark>`
      );
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  // Estimate reading time (fallback for articles without readingTime field)
  const estimateReadingTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(1, readingTime);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString('en-NZ', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Use new fields with fallbacks
  const readingTime = article.readingTime || estimateReadingTime(article.content || '');
  const formattedDate = formatDate(article.lastUpdated);
  const categoryInfo = article.categoryName || 'General';
  const author = article.author || 'Weboid Team';
  const displayContent = article.excerpt || article.summary;

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700 relative">
      {/* Article Image (use new image field or fallback) */}
      {(article.image && !imageError) && (
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={article.image}
            alt={`Illustration for ${article.title}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        </div>
      )}
      
      <div className="p-6">
        {/* Article Meta Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {/* Featured Badge */}
            {article.featured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
            )}
            
            {/* Priority Badge (if high priority) */}
            {article.priority && article.priority > 5 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                High Priority
              </span>
            )}
            
            {/* Category Badge - Only show if showCategory is true and we have a category */}
            {showCategory && categoryInfo && (
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full font-medium">
                {categoryInfo}
              </span>
            )}

            {/* Status Badge (only show if not published) */}
            {article.status && article.status !== 'published' && (
              <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                article.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                article.status === 'archived' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
              </span>
            )}
          </div>
          
          {/* Reading Time */}
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readingTime} min read
          </div>
        </div>

        {/* Article Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {highlightText(article.title, searchQuery)}
        </h3>

        {/* Article Summary/Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {highlightText(displayContent, searchQuery)}
        </p>

        {/* Tags - Show first 3 tags only */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {article.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Article Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Date */}
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate ? `Updated ${formattedDate}` : 'Recently updated'}
          </div>
          
          {/* Read More Link */}
          <Link 
            to={`/support/article/${article.id}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium inline-flex items-center text-sm group focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded transition-colors"
            aria-label={`Read full article: ${article.title}`}
          >
            Read More
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Invisible overlay for full card click */}
      <Link 
        to={`/support/article/${article.id}`}
        className="absolute inset-0 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-lg z-0"
        aria-label={`Read full article: ${article.title}`}
        tabIndex={-1}
      >
        <span className="sr-only">Read article: {article.title}</span>
      </Link>
    </article>
  );
};

export default ArticleCard;