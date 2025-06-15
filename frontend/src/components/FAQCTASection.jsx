import React from "react";
import { Link } from "react-router-dom";

const FAQCTASection = () => {
  return (
    <section
      id="faq-help-desk"
      className="bg-gray-900 dark:bg-gray-900 py-16 px-6 sm:px-8 lg:px-10"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-3xl lg:text-3xl font-bold text-white mb-6">
            Need Help? We've Got You Covered!
        </h2>
        <span className="block text-center text-xl text-gray-50 mt-1">
            Explore our Knowledge Base for answers to common queries
        </span>
        <div className="h-1 w-20 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 mb-10"></div>

        {/* Intro Text */}
        <p className="text-lg text-gray-300 mb-8">
          At Weboid, we understand that you may have questions and enquiries
          along your website development journey. That's why we have a knowledge
          base (KB) dedicated to addressing a range of frequently asked
          questions (FAQs). Explore our wealth of resources to find answers and
          solutions to common queries.
        </p>

        {/* Knowledge Base CTA */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
          <Link
            to="/support"
            className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 px-6 py-3 rounded-md transition text-lg"
          >
            Visit our Knowledge Base
          </Link>
          <Link
            to="/support/ticket"
            className="text-white bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-md transition text-lg"
          >
            Submit a Support Ticket
          </Link>
        </div>

        {/* Featured Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {[
            {
              title: "What is SSL/TLS Encryption",
              description: "At Weboid, we prioritize the security of your website and the protection of sensitive data. That's why we include Secure Sockets Layer (SSL) / Transp...",
              link: "/support/article/51000362212"
            },
            {
              title: "How do I contact Weboid?",
              description: "That's a easy, Send us a email, txt or message! We understand the importance of convenient and efficient communication. Here are...",
              link: "/support/article/51000362750"
            },
            {
              title: "Why do I need a website?",
              description: "Having a website is crucial for businesses in today's digital age.  Here are some reasons why you need a website: 1) Establish an online presen...",
              link: "/support/article/51000362755"
            }
          ].map((article, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition">
              <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
              <p className="text-gray-300 mb-4">{article.description}</p>
              <Link
                to={article.link}
                className="text-blue-400 hover:text-blue-300 inline-flex items-center"
              >
                Read More
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12">
          <p className="text-gray-400 text-base">
            Can't find what you're looking for or have a specific question? <br />
            <Link
              to="/contact"
              className="text-gray-400 text-base underline hover:text-white transition-colors duration-200"
            >
              Contact our support team for further assistance.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQCTASection;