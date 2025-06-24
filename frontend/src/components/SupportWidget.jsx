// components/SupportWidget.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBook, 
  FaTicketAlt, 
  FaPhone, 
  FaCalendarAlt, 
  FaEnvelope, 
  FaTimes,
  FaQuestionCircle,
  FaExternalLinkAlt,
  FaChevronRight,
  FaHeart,
  FaRocket
} from 'react-icons/fa';

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [animatePulse, setAnimatePulse] = useState(false);
  const widgetRef = useRef(null);

  // Close widget when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Animate pulse on mount to draw attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatePulse(true);
      setTimeout(() => setAnimatePulse(false), 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const supportOptions = [
    {
      title: 'View our Knowledge Base',
      description: 'Self-service help articles',
      icon: <FaBook className="w-4 h-4" />,
      link: '/support',
      gradient: 'from-blue-500 to-blue-600',
      internal: true
    },
    {
      title: 'Email Support',
      description: 'support@weboid.dev',
      icon: <FaEnvelope className="w-4 h-4" />,
      link: 'mailto:support@weboid.dev',
      gradient: 'from-green-500 to-emerald-600',
      internal: false
    },
    {
      title: 'Submit a Support Ticket',
      description: 'Track your request',
      icon: <FaTicketAlt className="w-4 h-4" />,
      link: '/support/ticket',
      gradient: 'from-purple-500 to-purple-600',
      internal: true
    },
    {
      title: 'Schedule a Call',
      description: 'Book a meeting',
      icon: <FaCalendarAlt className="w-4 h-4" />,
      link: 'https://weboid.dev/call',
      gradient: 'from-orange-500 to-red-500',
      internal: false
    },
    {
      title: 'Call us',
      description: '+64 27 269 0900',
      icon: <FaPhone className="w-4 h-4" />,
      link: 'tel:+64272690900',
      gradient: 'from-gray-500 to-gray-600',
      internal: false
    }
  ];

  return (
    <div ref={widgetRef} className="fixed bottom-4 right-4 z-50 support-widget" onKeyDown={handleKeyDown}>
      {/* Widget Panel */}
      {isOpen && (
        <div className="mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-80 max-h-96 overflow-hidden support-widget-animate backdrop-blur-sm">
          {/* Compact Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900 text-white p-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-2 backdrop-blur-sm">
                  <FaHeart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Need Help?</h3>
                  <p className="text-blue-100 text-xs">We're here for you</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-200"
                aria-label="Close support widget"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-72 custom-scrollbar">
            <div className="p-4">
              {/* Support Options */}
              <div className="space-y-2">
                {supportOptions.map((option, index) => (
                  option.internal ? (
                    <Link
                      key={index}
                      to={option.link}
                      className="group block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                      onClick={handleLinkClick}
                    >
                      <div className="flex items-center">
                        <div className={`bg-gradient-to-br ${option.gradient} text-white p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                          {option.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {option.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {option.description}
                          </p>
                        </div>
                        <FaChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 flex-shrink-0" />
                      </div>
                    </Link>
                  ) : (
                    <a
                      key={index}
                      href={option.link}
                      className="group block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                      target={option.link.startsWith('http') ? '_blank' : '_self'}
                      rel={option.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={handleLinkClick}
                    >
                      <div className="flex items-center">
                        <div className={`bg-gradient-to-br ${option.gradient} text-white p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                          {option.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {option.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {option.description}
                          </p>
                        </div>
                        {option.link.startsWith('http') ? (
                          <FaExternalLinkAlt className="w-3 h-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 flex-shrink-0" />
                        ) : (
                          <FaChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 flex-shrink-0" />
                        )}
                      </div>
                    </a>
                  )
                ))}
              </div>

              {/* Compact Bottom CTA */}
              <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="text-center mb-3">
                  <div className="flex items-center justify-center mb-1">
                    <FaRocket className="w-4 h-4 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Need More Help?</h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    We're always happy to help! No question is too small.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 text-center shadow-sm"
                  >Contact
                  </Link>
                  <a
                    href="mailto:hello@weboid.dev"
                    onClick={handleLinkClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 text-center shadow-sm"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Support Button */}
      <button
        onClick={toggleWidget}
        className={`
          bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
          dark:from-blue-800 dark:to-purple-800 dark:hover:from-blue-700 dark:hover:to-purple-700
          text-white rounded-full px-4 py-3 shadow-xl transition-all duration-300 
          hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
          flex items-center space-x-2 font-semibold text-sm backdrop-blur-sm
          ${animatePulse ? 'animate-pulse' : ''}
          border-2 border-white border-opacity-20
        `}
        aria-label={isOpen ? 'Close support widget' : 'Open support widget'}
        aria-expanded={isOpen}
      >
        <div className="relative">
          <FaQuestionCircle className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <span className="font-medium">Support</span>
      </button>
    </div>
  );
};

export default SupportWidget;