import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { MdEmail, MdPhone, MdContactSupport } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="img/white_trans.png" 
                alt="Weboid Logo" 
                className="h-20 w-auto"
              />
              <h2 className="text-white text-2xl font-SemiBold">
                WEBOID
              </h2>
            </div>
            <p className="text-sm">
              Welcome to Weboid, where we specialize in crafting tailored websites that captivate your audience and drive desired actions. With our expert team and dedication to your success, we'll create a website that embodies your brand and empowers your online presence. Our goal is to make the website design process seamless and stress-free for you.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/weboid.dev" className="hover:text-white transition-colors duration-200">
                <FaFacebookF size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 flex justify-center">
            <div className="w-full max-w-[250px]">
              <h3 className="text-white text-lg font-SemiBold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-blue-600 transition-colors duration-200">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-blue-600 transition-colors duration-200">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-600 transition-colors duration-200">Contact us</Link>
                </li>
                <li>
                  <a href="https://weboid.freshdesk.com" target="_blank" className="hover:text-blue-600 transition-colors duration-200">Support Portal</a>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-blue-600 transition-colors duration-200">Our Pricing</Link>
                </li>
                <li>
                  <Link to="/pricing#proposal" className="hover:text-blue-600 transition-colors duration-200">Request a Proposal</Link>
                </li>
                <li>
                  <Link to="/portfolio" className="hover:text-blue-600 transition-colors duration-200">Our Work</Link>
                </li>
                <li>
                  <a href="https://weboid.statuspage.io" target="_blank" className="hover:text-blue-600 transition-colors duration-200">Status</a>
                </li>
                <li>
                  <Link to="/report-error" className="hover:text-blue-600 transition-colors duration-200">Report a website issue</Link>
                </li>
                <li>
                  <Link to="/sitemap.xml" className="hover:text-blue-600 transition-colors duration-200">Sitemap</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-SemiBold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <MdPhone size={20} />
                <span><a className="hover:text-blue-600 transition-colors duration-200" href="tel:+64272690900">+64 27 269 0900</a></span>
              </li>
              <li className="flex items-center space-x-3">
                <MdEmail size={20} />
                <span><a className="hover:text-blue-600 transition-colors duration-200" href="mailto:hello@weboid.dev">hello@weboid.dev</a></span>
              </li>
              <li className="flex items-center space-x-3">
                <MdContactSupport size={20} />
                <span><a className="hover:text-blue-600 transition-colors duration-200" href="/contact">Contact us</a></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              © {currentYear} Weboid. All rights reserved. 
              <br /> New Zealand Business Number, 9429050012305
              <br /> Website made with ❤️ by Weboid in Aotearoa New Zealand.
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                <li>
                  <a href="https://weboid.freshdesk.com/support/solutions/articles/51000372586-terms-of-use" target="_blank" className="hover:text-blue-600 transition-colors duration-200">Terms of Use</a>
                </li>
                <li>
                  <a href="https://weboid.freshdesk.com/support/solutions/articles/51000372061-privacy-policy" target="_blank" className="hover:text-blue-600 transition-colors duration-200">Privacy Policy</a>
                </li>
                <li>
                  <a href="https://weboid.freshdesk.com/support/solutions/articles/51000372062-cookie-notice" target="_blank" className="hover:text-blue-600 transition-colors duration-200">Cookie Policy</a>
                </li>
                <li>
                  <a href="https://weboid.freshdesk.com/" target="_blank" className="hover:text-blue-600 transition-colors duration-200"></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
