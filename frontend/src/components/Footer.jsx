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
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/img/Logo25-WhiteTEXT-TransBG.png" 
                alt="Weboid Logo" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-sm">
              Welcome to Weboid, where we specialize in crafting tailored websites that captivate your audience and drive desired actions. With our expert team and dedication to your success, we'll create a website that embodies your brand and empowers your online presence. Our goal is to make the website design process seamless and stress-free for you.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/weboid.dev" rel="noreferrer" className="hover:text-white transition-colors duration-200">
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
                  <Link to="/support" className="hover:text-blue-600 transition-colors duration-200">Support</Link>
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
                  <a href="https://weboid.statuspage.io" rel="noreferrer" target="_blank" className="hover:text-blue-600 transition-colors duration-200">Status</a>
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
                <span><a className="hover:text-blue-600 transition-colors duration-200" rel="noreferrer" href="tel:+64272690900">+64 27 269 0900</a></span>
              </li>
              <li className="flex items-center space-x-3">
                <MdEmail size={20} />
                <span><a className="hover:text-blue-600 transition-colors duration-200" rel="noreferrer" href="mailto:hello@weboid.dev">hello@weboid.dev</a></span>
              </li>
              <li className="flex items-center space-x-3">
                <MdContactSupport size={20} />
                <span><a className="hover:text-blue-600 transition-colors duration-200" rel="noreferrer" href="/contact">Contact us</a></span>
              </li>
            </ul>

            {/* Design Rush Link */}
            <a href="https://www.designrush.com/agency/profile/weboid" rel="noreferrer" target="_blank" className="hover:text-white transition-colors duration-200"
              ><img src="/img/DesignRushBlue.png" alt="Design Rush Profile" className="pt-5 h-20 w-15" />
              </a>
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
                  <Link to="/support/article/51000372586" className="hover:text-blue-600 transition-colors duration-200">Terms of Use</Link>
                </li>
                <li>
                  <Link to="/support/article/51000372061" className="hover:text-blue-600 transition-colors duration-200">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/support/article/51000372062" className="hover:text-blue-600 transition-colors duration-200">Cookie Policy</Link>
                </li>

                <a href="#" rel="noreferrer" className="hover:text-white transition-colors duration-200"
                ><img src="/img/WIcon25-White-TransBG.svg" alt="Weboid" className="h-auto w-7" />
                </a>

              </ul>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-900">
			hello@weboid.dev | Website Developers | 0272690900 | Developing for all of Aotearoa New Zealand - Northland, Whangarei, Auckland, Waikato, Bay of Plenty, Gisborne, Hawke's Bay, Taranaki, Manawatū-Whanganui, Wellington, Tasman, Nelson, Marlborough, West Coast, Canterbury, Otago, Southland, Queenstown and more...
		  </p>
      </div>
    </footer>
  );
};

export default Footer;
