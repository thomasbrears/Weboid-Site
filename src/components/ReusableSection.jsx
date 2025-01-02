import React from "react";
import { Link } from "react-router-dom";

const ReusableSection = ({
  title,
  subtitle,
  text,
  image,
  buttonText,
  buttonLink,
}) => {
  // Check if image should be used as background or side image
  const hasBackgroundImage = image && !image.isSideImage;
  const hasSideImage = image && image.isSideImage;

  // Determine text color classes based on light/dark theme and image presence
  const textClass = hasBackgroundImage ? "text-white" : "text-gray-900 dark:text-white";
  const subtitleClass = hasBackgroundImage ? "text-white" : "text-gray-600 dark:text-gray-300";
  const bodyTextClass = hasBackgroundImage ? "text-white" : "text-gray-700 dark:text-gray-400";

  // Background color for sections depending on light/dark mode
  const sectionBgClass = hasBackgroundImage
    ? "" // If an image is present, use no background color
    : "bg-white dark:bg-black";

  return (
    <div
      className={`py-16 px-6 sm:px-8 lg:px-10 ${sectionBgClass} ${hasBackgroundImage ? "relative" : ""}`}
      style={{
        backgroundImage: hasBackgroundImage ? `url(${image.src})` : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {hasBackgroundImage && (
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div> // Dark overlay for background image
      )}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center relative z-10">
        {/* Image on the Left (Side Image Option) */}
        {hasSideImage && (
          <div className="md:w-2/5 mb-6 md:mb-0 md:mr-6">
            <img
              src={image.src}
              alt={title}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Content Section */}
        <div
          className={`${
            hasSideImage ? "md:w-3/5" : "w-full text-center"
          } md:text-left md:pl-10`}
        >
          <h2
            className={`text-3xl font-bold ${textClass} ${
              !hasSideImage ? "text-center" : ""
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`mt-2 text-xl ${subtitleClass} ${
                !hasSideImage ? "text-center" : ""
              }`}
            >
              {subtitle}
            </p>
          )}

          {/* Blue Dash (separator) */}
          {subtitle && (
            <div
              className={`my-2 h-1 w-12 bg-blue-600 dark:bg-blue-500 ${
                !hasSideImage ? "mx-auto" : ""
              }`}
            ></div>
          )}

          <p
            className={`mt-6 text-lg ${bodyTextClass} ${
              !hasSideImage ? "text-center" : ""
            }`}
          >
            {text}
          </p>

          {/* CTA Button */}
          {buttonText && buttonLink && (
            <div
              className={`${!hasSideImage ? "flex justify-center" : ""} mt-6`}
            >
              <Link
                to={buttonLink}
                className="bg-blue-600 dark:bg-blue-800 text-white px-6 py-3 rounded-md text-md hover:bg-blue-800 dark:hover:bg-blue-600 transition"
              >
                {buttonText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReusableSection;
