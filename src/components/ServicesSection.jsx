import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    title: "Website Development",
    image: "/img/services/websitedev.jpg",
    link: "/services#website-development",
  },
  {
    title: "ECommerce Stores",
    image: "/img/services/ecom.jpg",
    link: "/services#ecommerce-site",
  },
  {
    title: "Responsive Designs",
    image: "/img/services/responsive.jpg",
    link: "/services#responsive-design",
  },
  {
    title: "Top-notch Support",
    image: "/img/services/support.jpg",
    link: "/services#top-notch-support",
  },
  {
    title: "Unique & Custom Solutions",
    image: "/img/services/custom.jpg",
    link: "/services#unique-custom-solutions",
  },
  {
    title: "Brand Development",
    image: "/img/services/brand.jpg",
    link: "/services#logo",
  },
  {
    title: "Printable Materials",
    image: "/img/services/bismat.jpg",
    link: "/services#marketing-materials",
  },
  {
    title: "Service Management",
    image: "/img/services/management.jpg",
    link: "/services#social-media-management",
  },
  {
    title: "Marketing",
    image: "/img/services/marketing.jpg",
    link: "/services#new-marketing-setup",
  },
];

const ServicesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="services">
      <div className="container mx-auto px-6 lg:px-10">
        <h2 className="text-center text-3xl text-gray-900 dark:text-white">
          <b>Our Services</b>
        </h2>
        <span className="block text-center text-xl text-gray-500 dark:text-gray-400 mt-1">
          Ratonga
        </span>
        <div className="my-2 h-1 w-12 bg-blue-600 dark:bg-blue-500 mx-auto mt-4"></div>
        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 text-center">
          Unleash the power of your online presence with our comprehensive web
          solutions. Our exceptional team creates eye-catching websites built
          to drive results and turn heads!
        </p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg group"
              variants={cardVariants}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to={service.link} className="text-center">
                  <span className="bg-blue-600 dark:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-800 dark:hover:bg-blue-600 transition">
                    Learn More
                  </span>
                </Link>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 py-2 px-4 text-white text-sm font-medium">
                {service.title}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="bg-blue-600 dark:bg-blue-800 text-white px-6 py-3 rounded-md text-md font-semibold hover:bg-blue-800 dark:hover:bg-blue-600 transition"
          >
            Explore all services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
