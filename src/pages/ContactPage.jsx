import React, { useState, useEffect } from "react";
import TitleHeader from "../components/TitleHeader";
import ContactSection from "../components/ContactSection";
import FAQCTASection from "../components/FAQCTASection";
import { Helmet } from "react-helmet-async";

// Main Services Page Component
const ContactPage = () => {

  return (
    <div>
      <Helmet>
        <title>Contact us | Innovative Digital Solutions | Weboid</title>
        <meta name="description" content="Contact the team at Weboid for all support requests or questions. We specialise in web development and more. Explore how we can empower your online presence."/>
        <meta name="keywords" content="Weboid Services, Digital services, Web development, Website design, E-commerce solutions, Innovative solutions, support, contact us, contact, contact weboid, weboid support, help, Online presence enhancement"/>
      
        <meta property="og:title" content="Contact us | Innovative Digital Solutions | Weboid"/>
        <meta property="og:description" content="Contact the team at Weboid for all support requests or questions. We specialise in web development and more. Explore how we can empower your online presence."/>
      </Helmet>

      <TitleHeader
        title="Get in Touch"
        subtitle="Reach out to the Weboid team with any questions you may have"
        backgroundImage="img/error.jpg"
      />        

        {/* Contact Section */}
        <ContactSection />
        

        {/* FAQ / Help Desk Section */}
        <FAQCTASection />
        
        </div>
  );
};

export default ContactPage;
