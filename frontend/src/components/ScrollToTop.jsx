import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      // Scroll to the top only if no hash is present
      window.scrollTo(0, 0);
    } else {
      // Scroll to the section with the hash
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return null;
};

export default ScrollToTop;