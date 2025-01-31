import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // HelmetProvider for dynamicly setting page head including titles
import { ThemeProvider } from './ThemeContext';

// Toastify message container and style
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

// pages
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import NotFoundPage from './pages/errorpages/NotFoundPage';
import PortfolioPage from './pages/PortfolioPage';
import ReportErrorPage from './pages/ReportErrorPage';

// components
import Footer from './components/Footer';
import FooterCTASection from './components/FooterCTASection';
import Navbar from './components/NavBar';
import CustomNotification from './components/CustomNotification';
import ExternalRedirect from './components/ExternalRedirect';
import ScrollToTop from './components/ScrollToTop';
//import Loading from './components/Loading';

// Global style sheet
import './style/Global.css'; 

const App = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const section = document.querySelector(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    // Scroll to section on hash change
    window.addEventListener("hashchange", handleHashChange);

    // Scroll to hash if present on page load
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return (
    <HelmetProvider>
      <ThemeProvider>
        {/* Custom Notification */}
        <CustomNotification
          title="Extended Holiday Hours"
          subtext="Limited Support: We're Still Here (Kinda)"
          extendedSubtext="
          During January, we will not be as active and available as we usually are but don't worry; we won't disappear entirely! From January 3rd to February 2nd, Thomas (thomas@weboid.dev) will be on standby for any urgent or emergency situations, although we do not foresee being able to do any active website development.  
          We'll be back in full swing on February 3rd, ready to tackle 2025 with renewed energy! Stay tuned for what we have planned! Happy Holidays from Weboid."
          startDate="2024-12-20T00:00:00"  // Start Date in NZST
          endDate="2025-01-31T23:59:59"    // End Date in NZST
        />

        {/* Toastify message container with default actions*/}
        <ToastContainer
            theme="light" // Set light theme
            position="top-center" // Set default position
            draggable={true} // Allow toasts to be draggable
            closeOnClick={true} // Close toast on click
            autoClose={5000} // Auto close after 5 seconds
            hideProgressBar={false} // Show progress bar
            pauseOnHover={true} // Pause on hover
            pauseOnFocusLoss={false} // Keep toast running even when focus is lost
          />
        <Router>
        <ScrollToTop />
        <Navbar />
        <ToastContainer/>
          <Routes>
            {/* External Link Redirect */}
            <Route path="/status" element={<ExternalRedirect url="https://weboid.statuspage.io" />} />
            <Route path="/call" element={<ExternalRedirect url="https://cal.com/webooid" />} />

            {/* Internal link redirects */}
            <Route path="/proposal" element={<Navigate to="/pricing#proposal" />} />

            {/* pages */}  
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/report-error" element={<ReportErrorPage />} />
          </Routes>
          <FooterCTASection />
          <Footer />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;