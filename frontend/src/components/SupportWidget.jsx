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
  FaLightbulb,
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
      title: 'Browse Knowledge Base',
      description: 'Self-service help articles and guides for quick answers',
      icon: <FaBook className="w-7 h-7" />,
      link: '/support',
      gradient: 'from-blue-500 to-blue-600',
      internal: true,
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Email us',
      description: 'Send us a detailed message - we love hearing from you!',
      icon: <FaEnvelope className="w-7 h-7" />,
      link: 'mailto:support@weboid.dev',
      gradient: 'from-green-500 to-emerald-600',
      internal: false,
      subtitle: 'support@weboid.dev',
      badgeColor: 'bg-green-100 text-green-800'
    },
    {
      title: 'Submit a Ticket',
      description: 'Create a tracked request for technical support or questions',
      icon: <FaTicketAlt className="w-7 h-7" />,
      link: '/support/ticket',
      gradient: 'from-purple-500 to-purple-600',
      internal: true
    },
    {
      title: 'Schedule a Call',
      description: 'Book a convenient time to chat about your project',
      icon: <FaCalendarAlt className="w-7 h-7" />,
      link: 'https://weboid.dev/call',
      gradient: 'from-orange-500 to-red-500',
      internal: false
    },
    {
      title: 'Call Us Directly',
      description: 'For urgent matters, give us a call or text',
      icon: <FaPhone className="w-7 h-7" />,
      link: 'tel:+64272690900',
      gradient: 'from-gray-500 to-gray-600',
      internal: false,
      subtitle: '+64 27 269 0900'
    }
  ];

  return (
    <div ref={widgetRef} className="fixed bottom-4 right-4 z-50 support-widget" onKeyDown={handleKeyDown}>
      {/* Widget Panel */}
      {isOpen && (
        <div className="mb-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-[28rem] max-h-[40rem] overflow-hidden support-widget-animate backdrop-blur-sm">
          {/* Decorative Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900 text-white p-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
              <div className="absolute top-8 right-8 w-4 h-4 border border-white rounded-full"></div>
              <div className="absolute bottom-4 left-8 w-6 h-6 border border-white rounded-full"></div>
              <div className="absolute bottom-2 right-4 w-3 h-3 bg-white rounded-full"></div>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-3 rounded-xl mr-3 backdrop-blur-sm">
                  <FaHeart className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">We're Here to Help!</h3>
                  <p className="text-blue-100 text-sm">Let's solve this together</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-200 transform hover:scale-110"
                aria-label="Close support widget"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto max-h-[32rem] custom-scrollbar">
            <div className="p-6">
              {/* Welcome Message */}
              {/* <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center mb-2">
                  <FaLightbulb className="w-5 h-5 text-yellow-500 mr-2" /> 
                  <p className="font-semibold text-gray-800 dark:text-gray-200">Quick Tip</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Email us first!</strong> We provide better support via email as we can share screenshots, links, and detailed solutions. 📧
                </p>
              </div>*/}

              {/* Support Options */}
              <div className="space-y-4">
                {supportOptions.map((option, index) => (
                  option.internal ? (
                    <Link
                      key={index}
                      to={option.link}
                      className="group block p-5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transform hover:-translate-y-1"
                      onClick={handleLinkClick}
                    >
                      <div className="flex items-start">
                        <div className={`bg-gradient-to-br ${option.gradient} text-white p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                          {option.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
                              {option.title}
                            </h4>
                            {option.badge && (
                              <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${option.badgeColor}`}>
                                {option.badge}
                              </span>
                            )}
                          </div>
                          {option.subtitle && (
                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                              {option.subtitle}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                        <FaChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0 mt-2" />
                      </div>
                    </Link>
                  ) : (
                    <a
                      key={index}
                      href={option.link}
                      className="group block p-5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transform hover:-translate-y-1"
                      target={option.link.startsWith('http') ? '_blank' : '_self'}
                      rel={option.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={handleLinkClick}
                    >
                      <div className="flex items-start">
                        <div className={`bg-gradient-to-br ${option.gradient} text-white p-4 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                          {option.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg">
                              {option.title}
                            </h4>
                            {option.badge && (
                              <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${option.badgeColor}`}>
                                {option.badge}
                              </span>
                            )}
                          </div>
                          {option.subtitle && (
                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                              {option.subtitle}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {option.description}
                          </p>
                        </div>
                        {option.link.startsWith('http') ? (
                          <FaExternalLinkAlt className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0 mt-2" />
                        ) : (
                          <FaChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1 flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </a>
                  )
                ))}
              </div>

              {/* Bottom CTA Section */}
              <div className="mt-8 p-5 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <FaRocket className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-bold text-gray-900 dark:text-white">Need Something Else?</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    We're always happy to help! No question is too small.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/contact"
                    onClick={handleLinkClick}
                    className="bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 text-center shadow-sm hover:shadow-md transform hover:scale-105"
                  >Contact Page
                  </Link>
                  <a
                    href="mailto:hello@weboid.dev"
                    onClick={handleLinkClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 text-center shadow-sm hover:shadow-md transform hover:scale-105"
                  >
                    Email us
                  </a>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                  💝 We genuinely care about your success and we'll help where we can!
                </p>
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
          text-white rounded-full px-6 py-4 shadow-xl transition-all duration-300 
          hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
          flex items-center space-x-3 font-semibold text-base backdrop-blur-sm
          ${animatePulse ? 'animate-pulse' : ''}
          border-2 border-white border-opacity-20
        `}
        aria-label={isOpen ? 'Close support widget' : 'Open support widget'}
        aria-expanded={isOpen}
      >
        <div className="relative">
          <FaQuestionCircle className="w-6 h-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <span className="font-bold tracking-wide">Support</span>
      </button>
    </div>
  );
};

export default SupportWidget;