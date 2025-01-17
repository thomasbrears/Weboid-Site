import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setVisible(isScrollingUp || currentScrollPos < 10);
      setIsAtTop(currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Determine the navbar text color based on theme and scroll position
  const textColor = isAtTop
  ? (theme === 'light' ? 'text-black' : 'text-white') 
  : (theme === 'light' ? 'text-black' : 'text-white'); 


  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed w-full transition-all duration-300 z-50 ${visible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div
          className={`transition-all duration-300 ${
            isAtTop
              ? theme === 'light'
                ? 'bg-white h-20 md:h-24'
                : 'bg-black h-20 md:h-24'
              : theme === 'light'
              ? 'bg-white shadow-lg h-12 md:h-16'
              : 'bg-black shadow-lg h-12 md:h-16'
          }`}
        >
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex justify-between items-center h-full">
              {/* Logo Section */}
              <div className="flex-shrink-0 transition-all duration-300">
                <Link to="/" className="block">
                  <img
                    src={theme === 'dark' ? "img/Logo25-WhiteTEXT-TransBG.png" : "img/Logo25-BlackTEXT-TransBG.png"}
                    alt="Weboid Logo"
                    className="transition-all duration-300"
                    style={{
                      width: isAtTop ? '190px' : '150px',
                      height: 'auto', 
                    }}
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/" className={`px-3 py-2 rounded-md transition-colors duration-200 ${textColor} hover:text-blue-600`}>Home</Link>
                <Link to="/#about" className={`px-3 py-2 rounded-md transition-colors duration-200 ${textColor} hover:text-blue-600`}>About</Link>
                <Link to="/services" className={`px-3 py-2 rounded-md transition-colors duration-200 ${textColor} hover:text-blue-600`}>Services</Link>
                <Link to="/contact" className={`px-3 py-2 rounded-md transition-colors duration-200 ${textColor} hover:text-blue-600`}>Contact</Link>
                <Link to="/pricing" className={`px-3 py-2 rounded-md transition-colors duration-200 ${textColor} hover:text-blue-600`}>Pricing</Link>
                <Link to="/pricing#proposal" className={`px-3 py-2 rounded-md transition-colors duration-200 ${textColor} hover:text-blue-600`}>Propsoal</Link>
                <Link to="/portfolio" className={`px-3 py-2 rounded-md transition-colors duration-200 ${textColor} hover:text-blue-600`}>Portfolio</Link>

                {/* Theme Toggle Button */}
                <div
                  className="relative w-16 h-8 bg-gray-800 rounded-full cursor-pointer p-1"
                  onClick={toggleTheme}
                >
                  <div
                    className={`absolute w-6 h-6 bg-white rounded-full transition-all duration-300 transform ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'}`}
                  />
                  <div className="absolute inset-0 flex justify-between items-center px-1">
                    <FiSun className={`text-yellow-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
                    <FiMoon className={`text-white ${theme === 'light' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
                  </div>
                </div>
              </div>

              {/* Hamburger Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative w-6 h-6 focus:outline-none"
                  aria-label="Toggle menu"
                >
                  <div className="absolute w-6 h-0.5 transform transition-all duration-300 ease-in-out">
                    <span
                      className={`absolute h-0.5 w-6 transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'} ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
                    />
                    <span
                      className={`absolute h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'} ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
                    />
                    <span
                      className={`absolute h-0.5 w-6 transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'} ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden fixed left-0 w-64 h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'} shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ top: isAtTop ? '96px' : '64px' }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className={`block ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200`}>Home</Link>
              <Link to="/#about" className={`block ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200`}>About</Link>
              <Link to="/services" className={`block ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200`}>Services</Link>
              <Link to="/contact" className={`block ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200`}>Contact</Link>
              <Link to="/pricing" className={`block ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200`}>Pricing</Link>
              <Link to="/pricing#proposal" className={`block ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200`}>Proposal</Link>
              <Link to="/portfolio" className={`block ${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200`}>Portfolio</Link>

              {/* Theme Toggle Button */}
              <div
                className="relative w-16 h-8 bg-gray-800 rounded-full cursor-pointer p-1"
                onClick={toggleTheme}
              >
                <div
                  className={`absolute w-6 h-6 bg-white rounded-full transition-all duration-300 transform ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'}`}
                />
                <div className="absolute inset-0 flex justify-between items-center px-1">
                  <FiSun className={`text-yellow-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
                  <FiMoon className={`text-white ${theme === 'light' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
