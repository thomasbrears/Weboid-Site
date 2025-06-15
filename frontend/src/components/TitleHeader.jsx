import React from "react";
import { useLocation, Link } from "react-router-dom";

const TitleHeader = ({ title, subtitle, backgroundImage, customBreadcrumbs }) => {
    const location = useLocation();
  
    // Generate breadcrumbs based on the URL path or use custom ones
    const breadcrumbs = customBreadcrumbs || location.pathname
      .split("/")
      .filter(Boolean)
      .map((path, index, arr) => {
        const isLast = index === arr.length - 1;
        const href = "/" + arr.slice(0, index + 1).join("/");
        return {
          label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
          href,
          isLast,
        };
      });
  
    return (
      <div
        className="relative"
        style={{
          paddingTop: "7rem", // Ensure this matches or exceeds the navbar height
        }}
      >
        {/* Background Image Section */}
        <div
          className="text-white"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "50vh",
            marginTop: "-2rem",
          }}
        >
          <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
              {subtitle && (
                <p className="mt-2 text-lg md:text-xl text-gray-300">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
  
        {/* Breadcrumbs */}
        <div className="bg-gray-100 dark:bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-300">
              <ol className="flex items-center space-x-2 flex-wrap">
                <li>
                  <Link to="/" className="hover:underline text-gray-600 dark:text-gray-200">
                    Home
                  </Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mx-2 text-gray-400 dark:text-gray-500">/</span>
                    {crumb.isLast || !crumb.href ? (
                      <span className="text-gray-600 dark:text-gray-300 line-clamp-1" title={crumb.label}>
                        {crumb.label.length > 50 ? `${crumb.label.substring(0, 50)}...` : crumb.label}
                      </span>
                    ) : (
                      <Link
                        to={crumb.href}
                        className="hover:underline text-gray-600 dark:text-gray-200 line-clamp-1"
                        title={crumb.label}
                      >
                        {crumb.label.length > 30 ? `${crumb.label.substring(0, 30)}...` : crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    );
};

export default TitleHeader;