import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Error 404 - We couldn't find the page you were looking for | Weboid</title>
      </Helmet>
      
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      {/* Container for Image and Text */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl p-6 space-x-0 md:space-x-6">
        
        {/* 404 Error Image */}
        <img
          src="/img/404img.png"
          alt="404 Error"
          className="mt-20 w-full md:w-1/2 max-w-md mb-6 md:mb-0"
        />
        
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-6xl font-Semibold text-gray-800 dark:text-white">404: Page Not Found</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
            Whoops! Something went wrong.
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
           It seems we've lost our way in the digital jungle and can't locate the page you were hunting for.
          </p>
          
          {/* Buttons */}
          <div className="mt-8 space-x-4">
          <button
              onClick={() => window.history.back()} // Go back to the previous page
              className="inline-block text-white bg-gray-600 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 text-lg px-6 py-3 rounded-md"
            >
              Go Back
            </button>

            <Link
              to="/"
              className="inline-block text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 text-lg px-6 py-3 rounded-md"
            >
              Return Home
            </Link>

            <Link
              to="/report-error"
              className="inline-block text-white bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-600 text-lg px-6 py-3 rounded-md"
            >
              Report Error
            </Link>
            
            
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default NotFoundPage;
