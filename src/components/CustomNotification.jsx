import React, { useState, useEffect } from 'react';
import { MdInfoOutline } from 'react-icons/md'; // Notification icon
import { FaTimes } from 'react-icons/fa'; // Close icon

// Helper function to check if the current date is within range in NZST
const isDateInRange = (startDate, endDate) => {
  const currentDate = new Date();
  const NZSTOffset = 12 * 60; // NZST is UTC +12 hours (720 minutes)

  // Adjust current date to NZST by adding 12 hours
  const localCurrentDate = new Date(currentDate.getTime() + NZSTOffset * 60 * 1000);

  const start = new Date(startDate);
  const end = new Date(endDate);

  const adjustedStart = new Date(start.getTime() + NZSTOffset * 60 * 1000);
  const adjustedEnd = new Date(end.getTime() + NZSTOffset * 60 * 1000);

  return localCurrentDate >= adjustedStart && localCurrentDate <= adjustedEnd;
};

const CustomNotification = ({ title, subtext, extendedSubtext, startDate, endDate }) => {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [bottomPosition, setBottomPosition] = useState('20px');

  // Only show the notification if it's within the date range
  const shouldShowNotification = isDateInRange(startDate, endDate);

  // Handle closing the notification
  const closeNotification = () => {
    setIsVisible(false);
  };

  // Handle opening the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Dynamically adjust the notification position based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 700) {
        setBottomPosition('80px'); // For smaller screens
      } else {
        setBottomPosition('20px'); // For larger screens
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isVisible && shouldShowNotification && (
        <div
          className="fixed left-1/2 transform -translate-x-1/2 bg-white text-black p-4 rounded-lg shadow-lg z-50"
          style={{
            bottom: bottomPosition,
            maxWidth: '500px',
            width: '100%',
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <MdInfoOutline size={30} />
              <div className="flex-1">
                <h3 className="font-bold">{title}</h3>
                <p className="text-gray-600">{subtext}</p>
              </div>
            </div>

            {/* Close button and Learn More button in the same row */}
            <div className="flex items-center space-x-4">
              <button
                onClick={openModal}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-600 px-2 py-1 rounded-md text-white text-sm"
              >
                Learn More
              </button>
              <FaTimes
                size={20}
                className="cursor-pointer hover:text-blue-600"
                onClick={closeNotification}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal for more information */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl">{title}</h3>
              <FaTimes
                size={20}
                className="cursor-pointer hover:text-blue-600"
                onClick={closeModal}
              />
            </div>
            <div className="space-y-4 text-gray-700">
              <p>{subtext}</p>
              <p>{extendedSubtext}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomNotification;
