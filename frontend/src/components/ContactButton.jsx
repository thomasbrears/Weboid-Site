// ContactButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ContactButton = () => {
  return (
    <Link
      to="/support/ticket"
      className="inline-flex items-center justify-center bg-blue-600 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium px-5 py-2.5 rounded-md transition-colors"
    >
      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
      </svg>
      Contact Support
    </Link>
  );
};

export default ContactButton;