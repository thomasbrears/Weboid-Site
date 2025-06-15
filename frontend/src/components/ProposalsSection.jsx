import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProposalsSection = () => {
    useEffect(() => {
        // Dynamically load the Typeform script
        const script = document.createElement("script");
        script.src = "//embed.typeform.com/next/embed.js";
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          // Clean up script on component unmount
          document.body.removeChild(script);
        };
      }, []);

  return (
    <section
      id="proposals"
      className="py-16 px-6 bg-white dark:bg-black text-gray-900 dark:text-white"
    >
        {/* Title and Subtitle */}
        <h2 className="text-3xl sm:text-3xl lg:text-3xl text-center font-bold text-gray-900 dark:text-white mb-4">
            Request a Proposal
          </h2>
          <span className="block text-center text-xl text-gray-500 dark:text-gray-400 mt-1">
            It's time to take the next step and see the magic happen!
          </span>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 mb-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section 1: View the Magic */}
        <motion.div
          className="flex flex-col md:flex-row gap-12 items-center group"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-1 text-center md:text-left group-hover:shadow-lg group-hover:scale-105 transition-all rounded-lg p-4">
            <h2 className="text-3xl font-bold">View the Magic</h2>
            <p className="text-lg mt-4">
                Take a glimpse into the enchanting world of possibilities! Explore our mesmerizing example proposal, igniting your imagination for your own dream website.
            </p>
            <a href="img/WebsiteProposal-JoesBurgers.pdf " target="_blank" className="mt-6 inline-block text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 px-6 py-3 rounded-md transition text-base"
            >View Our Example Proposal
            </a>
          </div>
          <div className="flex-1">
            <motion.img
              src="/img/proposal-cover1.png"
              alt="Proposal Example"
              className="w-full max-h-80 object-cover rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            />
          </div>
        </motion.div>

        {/* Section 2: Ignite Your Dreams */}
        <motion.div
          className="flex flex-col md:flex-row gap-12 items-center group"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-1">
            <motion.img
              src="/img/proposal-edit.png"
              alt="Custom Proposal"
              className="w-full max-h-80 object-cover rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            />
          </div>
          <div className="flex-1 text-center md:text-left group-hover:shadow-lg group-hover:scale-105 transition-all rounded-lg p-4">
            <h2 className="text-3xl font-bold">Ignite Your Dreams</h2>
            <p className="text-lg mt-4">
              Unleash the magic! Request a custom-made, obligation-free proposal
              tailored exclusively to your business. The magic is free, but the
              possibilities are boundless!
            </p>

            {/* Typeform Button */}
            <button
              data-tf-slider="PGfbpZXJ"
              data-tf-position="left"
              data-tf-opacity="100"
              data-tf-iframe-props="title=Request a estimate"
              data-tf-auto-close="20000"
              data-tf-transitive-search-params
              data-tf-medium="snippet"
              data-tf-hidden="utm_source=weboid.dev,utm_medium=weboidwebsite,utm_campaign=requestaproposal-website"
              className="mt-6 inline-block text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 px-6 py-3 rounded-md transition text-base"
            >
              Request a Proposal
            </button>
            
          </div>
        </motion.div>

        {/* Section 3: Let’s Connect */}
        <motion.div
          className="text-center group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="group-hover:shadow-lg group-hover:scale-105 transition-all rounded-lg p-4">
            <h2 className="text-3xl font-bold">Let’s Connect</h2>
            <p className="text-lg mt-4">
              We understand that every project is unique. Reach out and let's
              start the conversation about your specific needs. We're here to
              help!
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-block text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 px-6 py-3 rounded-md transition text-base"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProposalsSection;
