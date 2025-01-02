import React from "react";
import { Link } from "react-router-dom";

const SloganSection = () => {
  return (
    <section
      id="slogan"
      className="bg-gray-50 dark:bg-gray-900 py-16 px-6 sm:px-8 lg:px-10"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Slogan */}
        <h2 className="text-3xl sm:text-3xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          "Unlocking Business Growth with Innovative Digital Solutions & Websites
          that Inspire, Engage, & Unleash Potential"
        </h2>
        <span className="block text-center text-xl text-gray-500 dark:text-gray-400 mt-1">
          This is what we do best!
        </span>
        <div className="h-1 w-20 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 mb-10"></div>

        {/* Slogan Breakdown */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <li className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-lg text-gray-900 dark:text-white mb-3">
              Unlock Your Business Growth with Cutting-Edge Digital Solutions
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              At Weboid, we are passionate about fueling the success of businesses
              by providing innovative websites and other digital solutions that
              ignite inspiration, foster engagement, and unlock their full
              potential. With our expertise and forward-thinking approach, we
              empower our clients to thrive in the dynamic digital landscape.
            </p>
          </li>
          <li className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-lg text-gray-900 dark:text-white mb-3">
              Inspire and Engage with Innovative Digital Strategies
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              We believe in the power of creativity and innovation to captivate
              audiences and leave a lasting impact. We combine our artistic flair
              with technical excellence to craft visually stunning websites and
              captivating digital experiences. Every design element, from sleek
              aesthetics to intuitive user interfaces, is meticulously tailored to
              inspire and engage your target audience.
            </p>
          </li>
          <li className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-lg text-gray-900 dark:text-white mb-3">
              Unleash the Full Potential of Your Business
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Your growth is our top priority. Through our comprehensive digital
              solutions, we unlock the untapped potential of your business, paving
              the way for unprecedented success. With a deep understanding of
              industry trends and consumer behavior, we leverage our knowledge and
              expertise to position your brand at the forefront of your market,
              driving measurable results and sustainable growth.
            </p>
          </li>
          <li className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-700">
            <h3 className="text-lg text-gray-900 dark:text-white mb-3">
              Choose Weboid for Digital Excellence and Transformation
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Partner with Weboid to experience digital excellence and embark on a
              transformative journey for your business. We're committed to
              delivering innovative strategies, personalized service, and
              remarkable outcomes. Together, we will unlock your business's true
              potential and position you for long-term success in the
              ever-evolving digital landscape.
            </p>
          </li>
        </ul>

        {/* Call to Action Button */}
        <div className="mt-10">
          <Link
            to="/contact"
            className="text-white bg-blue-600 dark:bg-blue-800 hover:bg-blue-700 dark:hover:bg-blue-600 px-6 py-3 rounded-md font-semibold transition"
          >
            Haere mai, let's embark on a web journey like no other!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SloganSection;
