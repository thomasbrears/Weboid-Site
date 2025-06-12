import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FooterCTASection = () => {
  // Animation variants for the container and its children
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="bg-blue-600 text-white dark:bg-blue-900 dark:text-white py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is visible
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center space-y-3"
          variants={containerVariants}
        >
          {/* Logo and Title */}
          <motion.div
            className="flex items-center justify-center space-x-3"
            variants={itemVariants}
          >
            <img 
              src="/img/WIcon25-White-TransBG.svg" 
              alt="Weboid Logo" 
              className="h-11 w-auto"
            />
            <h2 className="text-2xl font-bold">
              Join the Weboid Whānau today
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-sm text-blue-100 dark:text-blue-200 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Unlocking Business Growth with Innovative Digital Solutions that Inspire, Engage, and Unleash Potential
          </motion.p>

          {/* CTA Button */}
          <motion.div className="mt-4" variants={itemVariants}>
            <Link
              to="/contact"
              className="inline-block bg-white text-blue-600 dark:bg-blue-700 dark:text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FooterCTASection;
