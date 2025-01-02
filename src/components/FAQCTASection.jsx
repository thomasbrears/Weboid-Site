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
          along your website development journey. That’s why we have a knowledge
          base (KB) dedicated to addressing a range of frequently asked
          questions (FAQs). Explore our wealth of resources to find answers and
          solutions to common queries.
        </p>

        {/* Knowledge Base CTA */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
          <Link
            to="https://weboid.freshdesk.com/support/solutions/"
            className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 px-6 py-3 rounded-md transition text-lg"
          >
            Visit our Knowledge Base
          </Link>
        </div>

        {/* Contact Support */}
        <div>
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
