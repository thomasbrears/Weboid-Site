import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaCalendarAlt, FaFileAlt } from "react-icons/fa"; // Import relevant icons
import { motion } from "framer-motion";

const ContactSection = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
      },
    }),
    
  };

  return (
    <section
      id="contact-section"
      className="bg-white dark:bg-gray-900 py-16 px-6 sm:px-8 lg:px-10 w-full"
    >
      <div className="w-full mx-auto flex flex-col lg:flex-row">
        {/* Left Column - Contact Cards */}
        <div className="flex flex-col lg:w-full">
          {/* Title and Subtitle */}
          <h2 className="text-3xl sm:text-3xl lg:text-3xl text-center font-bold text-gray-900 dark:text-white mb-4">
            Contact us
          </h2>
          <span className="block text-center text-xl text-gray-500 dark:text-gray-400 mt-1">
            Whakapā mai
          </span>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 mb-10"></div>

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center">
            We are here to assist you and provide the support you need! <br />
            Please don't hesitate to reach out to us using your preferred
            method of communication. We look forward to hearing from you soon!
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
            {[
              {
                icon: <FaFileAlt />,
                title: "Knowledge Base",
                description: "Explore our resources and find answers to common questions.",
                link: (
                  <Link
                    to="/support/"
                    className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 px-6 py-3 text-sm rounded-md font-semibold transition"
                  >
                    Visit our Knowledge Base
                  </Link>
                ),
              },
              {
                icon: <FaEnvelope />,
                title: "Flick Us a Message",
                description: "Send us your message using our ticket form.",
                link: (
                  <a 
                    href="/support/ticket"
                    className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 mr-2 text-sm px-6 py-3 rounded-md font-semibold transition"
                  >
                    Create a Ticket
                  </a>
                ),
              },
              {
                icon: <FaEnvelope />,
                title: "Email Us",
                description: "If you have any questions, koa īmēra (please email) us!",
                link: (
                  <div className="space-y-4">
                    <a
                      href="mailto:hello@weboid.dev"
                      className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 mr-2 text-sm px-6 py-3 rounded-md font-semibold transition"
                    >
                      General Enquiries (Hello@weboid.dev)
                    </a>
                    <a
                      href="mailto:support@weboid.dev"
                      className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 mr-2 text-sm px-6 py-3 rounded-md font-semibold transition"
                    >
                      Support (Support@weboid.dev)
                    </a>
                    <a
                      href="mailto:accounts@weboid.dev"
                      className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 text-sm px-6 py-3 rounded-md font-semibold transition"
                    >
                      Billing & Accounts (Accounts@weboid.dev)
                    </a>
                  </div>
                ),
              },
              {
                icon: <FaPhone />,
                title: "Call us",
                description: "If you'd like to speak with us, please call or text us on the number below.",
                link: (
                  <a 
                    href="tel:+64272690900"
                    className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 mr-2 text-sm px-6 py-3 rounded-md font-semibold transition"
                  >
                    Call us (+64272690900)
                  </a>
                ),
              },
              {
                icon: <FaCalendarAlt />,
                title: "Schedule a call",
                description: "Book a call or meeting with our team at a time convenient for you.",
                link: (
                    <a 
                    href="https://cal.com/weboid"
                    className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 mr-2 text-sm px-6 py-3 rounded-md font-semibold transition"
                  >
                    Schedule
                  </a>
                ),
              },

              {
                icon: <FaFileAlt />,
                title: "Request a Proposal",
                description: "Submit a proposal request to discuss your project in detail.",
                link: (
                  <Link
                    to="/proposal"
                    className="text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 px-6 py-3 text-sm rounded-md font-semibold transition"
                  >
                    Request a Proposal
                  </Link>
                ),
              },
              

            ].map((card, index) => (
              <motion.div
                key={card.title}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={index}
              >
                <div className="flex items-center gap-4 mb-4 text-gray-900 dark:text-white">
                  {card.icon}
                  <h3 className="text-xl text-gray-900 dark:text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  {card.description}
                </p>
                {card.link}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
