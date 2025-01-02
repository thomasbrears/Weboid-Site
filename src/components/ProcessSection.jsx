import React from "react";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaClipboardList,
  FaCode,
  FaCheckCircle,
  FaRocket,
  FaLifeRing,
} from "react-icons/fa";

const ProcessSection = () => {
  const steps = [
    {
      title: "Initial Consultation",
      content: "We engage with you to understand your unique challenges and opportunities, setting the stage for a solution that aligns with your vision.",
      icon: <FaHandshake />,
    },
    {
      title: "Research and Planning",
      content: "Our team dives deep into industry trends, audience behaviors, and competitor strategies to chart a course for success.",
      icon: <FaClipboardList />,
    },
    {
      title: "Development",
      content: "We meticulously design and build your digital solution, blending cutting-edge technology with seamless user experiences.",
      icon: <FaCode />,
    },
    {
      title: "Testing and Quality Assurance",
      content: "Every component is rigorously tested for functionality, performance, and reliability to ensure it’s launch-ready.",
      icon: <FaCheckCircle />,
    },
    {
      title: "Launch and Delivery",
      content: "From deployment to training, we guide you through every step, ensuring a smooth transition and immediate impact.",
      icon: <FaRocket />,
    },
    {
      title: "Ongoing Support",
      content: "We stay with you post-launch, offering enhancements, support, and updates as your needs evolve.",
      icon: <FaLifeRing />,
    },
  ];

  const slideInVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      id="faq-help-desk"
      className="bg-gray-50 dark:bg-black py-16 px-6 sm:px-8 lg:px-10"
    >
        {/* Title */}
        <h2 className="text-center text-3xl sm:text-3xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Process for Website Development
        </h2>
        <span className="block text-center text-xl text-gray-500 dark:text-gray-400 mt-1">
            Turning Ideas into Reality
        </span>
        <div className="h-1 w-20 bg-blue-600 dark:bg-blue-500 mx-auto mt-4 mb-10"></div>
        
      <div className="max-w-5xl mx-auto relative">
        <div className="border-l-4 border-blue-600 dark:border-blue-500 pl-8 space-y-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative flex items-start space-x-4 group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideInVariant}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Step Number */}
              <div className="absolute w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full -left-12 flex items-center justify-center text-white font-bold shadow-lg">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="text-blue-600 dark:text-blue-500 text-2xl group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-300">{step.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default ProcessSection;
