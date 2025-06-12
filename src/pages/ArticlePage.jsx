// ArticlePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import TitleHeader from '../components/TitleHeader';
import articlesData from '../data/articles.json';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    // Find the article with the matching ID
    const foundArticle = articlesData.articles.find(article => article.id === id);
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Find related articles - use manual list if available, otherwise auto-generate
      let related = [];
      
      if (foundArticle.relatedArticles && foundArticle.relatedArticles.length > 0) {
        // Use manually specified related articles
        related = articlesData.articles.filter(a => 
          foundArticle.relatedArticles.includes(a.id)
        );
      } else {
        // Fall back to automatic related articles (same category or shared tags)
        related = articlesData.articles.filter(a => 
          a.id !== id && 
          (a.category === foundArticle.category || 
           a.tags.some(tag => foundArticle.tags.includes(tag)))
        );
      }
      
      setRelatedArticles(related.slice(0, 3)); // Limit to 3 related articles
    }
    
    setLoading(false);
  }, [id]);

  // Function to detect if content contains HTML
  const containsHTML = (str) => {
    return /<[a-z][\s\S]*>/i.test(str);
  };

  // Function to sanitize HTML by removing inline style attributes
  const sanitizeHTML = (htmlContent) => {
    // We'll keep the HTML structure but remove style attributes that might cause dark mode issues
    return htmlContent;
  };

  // Function to estimate reading time (fallback for old articles)
  const estimateReadingTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return Math.max(1, readingTime);
  };

  // Function to format date
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

  if (loading) {
    return (
      <>
        <TitleHeader
          title="Loading..."
          subtitle="Please wait while we load the article"
          backgroundImage="/img/knowledge-base.png"
        />
        
        <div className="pt-8 pb-16 px-6 sm:px-8 lg:px-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
              <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!article) {
    return (
      <>
        <TitleHeader
          title="Article Not Found"
          subtitle="The article you're looking for doesn't exist"
          backgroundImage="/img/knowledge-base.png"
        />
        
        <div className="pt-8 pb-16 px-6 sm:px-8 lg:px-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Article Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sorry, the article you are looking for doesn't exist or has been moved.
            </p>
            <Link 
              to="/support"
              className="bg-blue-600 dark:bg-blue-800 text-white px-6 py-3 rounded-md text-md hover:bg-blue-800 dark:hover:bg-blue-600 transition"
            >
              Return to Knowledge Base
            </Link>
          </div>
        </div>
      </>
    );
  }

  const categoryInfo = articlesData.categories.find(c => c.id === article.category);
  const isHTMLContent = containsHTML(article.content);

  return (
    <>
      <Helmet>
        <title>{article.seo?.metaTitle || `${article.title} | Weboid Support`}</title>
        <meta name="description" content={article.seo?.metaDescription || article.summary} />
        {article.seo?.keywords && (
          <meta name="keywords" content={Array.isArray(article.seo.keywords) ? article.seo.keywords.join(', ') : article.seo.keywords} />
        )}
      </Helmet>
      
      <TitleHeader
        title={article.title}
        subtitle={categoryInfo ? categoryInfo.name : 'Knowledge Base Article'}
        backgroundImage="/img/knowledge-base.png"
        customBreadcrumbs={[
          { label: 'Knowledge Base', href: '/support' },
          ...(categoryInfo ? [{ label: categoryInfo.name, href: `/support?category=${article.category}` }] : []),
          { label: article.title, href: '', isLast: true }
        ]}
      />
      
      <section className="pt-8 pb-16 px-6 sm:px-8 lg:px-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-3xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            {/* Article Image if available */}
            {article.image && (
              <div className="mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Article Meta Info */}
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-4">
                {/* Author */}
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {article.author || 'Weboid Team'}
                </span>

                {/* Reading Time */}
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {article.readingTime || estimateReadingTime(article.content)} min read
                </span>

                {/* Last Updated */}
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(article.lastUpdated) || 'Recently updated'}
                </span>
              </div>

              {/* Status indicator (only show if not published) */}
              {article.status && article.status !== 'published' && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  article.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  article.status === 'archived' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                </span>
              )}
            </div>

            {/* Category Badge */}
            {categoryInfo && (
              <Link
                to={`/support?category=${article.category}`}
                className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium mb-4"
              >
                {categoryInfo.name}
              </Link>
            )}
            
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <p className="text-gray-600 dark:text-gray-400 text-lg">{article.excerpt || article.summary}</p>
          </header>
          
          {/* Article Content */}
          <div className="article-content text-gray-800 dark:text-gray-200">
            {isHTMLContent ? (
              <div 
                className="article-html-content"
                dangerouslySetInnerHTML={{ __html: article.content }} 
              />
            ) : (
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <ReactMarkdown>{article.content}</ReactMarkdown>
              </div>
            )}
          </div>
          
          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map(relatedArticle => (
                  <div 
                    key={relatedArticle.id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      {relatedArticle.title}
                    </h3>
                    <Link
                      to={`/support/article/${relatedArticle.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium inline-flex items-center text-sm"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Help Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Was this article helpful?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you didn't find what you were looking for, our support team is here to help.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/support/ticket"
                className="bg-blue-600 dark:bg-blue-800 text-white px-6 py-3 rounded-md text-md hover:bg-blue-800 dark:hover:bg-blue-600 transition"
              >
                Submit a Support Ticket
              </Link>
              <Link
                to="/support"
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-3 rounded-md text-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Back to Knowledge Base
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArticlePage;