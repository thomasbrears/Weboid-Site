import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import TitleHeader from '../components/TitleHeader';
import ContactSection from '../components/ContactSection';
import ReusableSection from '../components/ReusableSection';

const ReportErrorPage = () => {
    useEffect(() => {
        const scriptSrc = "https://tally.so/widgets/embed.js";
    
        const loadTallyScript = () => {
          if (typeof window.Tally !== "undefined") {
            window.Tally.loadEmbeds();
          } else {
            const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
            if (!existingScript) {
              const script = document.createElement("script");
              script.src = scriptSrc;
              script.onload = () => window.Tally.loadEmbeds();
              script.onerror = () => window.Tally.loadEmbeds();
              document.body.appendChild(script);
            }
          }
        };
    
        loadTallyScript();
      }, []);


  return (
    <>
      <Helmet>
      <title>Report a website Error | Weboid</title>
        <meta name="description" content="Report errors or issues on Weboid's website or our clients' websites. Your feedback helps us improve our services and user experience. Thank you for helping us maintain a high standard of quality."/>
        <meta name="keywords" content="Report errors, Error reporting, Issue reporting, Website errors, Error feedback, Quality improvement, Weboid feedback"/>

        <meta property="og:title" content="Report a website Error | Weboid"/>
        <meta property="og:description" content="Report errors or issues on Weboid's website or our clients' websites. Your feedback helps us improve our services and user experience. Thank you for helping us maintain a high standard of quality."/>
      </Helmet>

      <TitleHeader
        title="Report a website issue"
        subtitle="We're here to help"
        backgroundImage="img/error.jpg"
      />

      <ReusableSection 
        title="Report an issue"
        subtitle="Please use the form below to report a issue with a website created by Weboid (Including clients)."
      />

      <div id="report-error">
      <iframe
        data-tally-src="https://tally.so/embed/nWEv6j?align=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="700"
        style={{ border: "none" }}
        title="Report a website issue/error"
      ></iframe>
      </div>

      <ContactSection />

    </>
  );
};

export default ReportErrorPage;
