import React from 'react';
import { Helmet } from 'react-helmet-async';
import TitleHeader from '../components/TitleHeader';
import ReusableSection from '../components/ReusableSection';
import ProposalsSection from '../components/ProposalsSection';
import FAQCTASection from '../components/FAQCTASection';

const PricingPage = () => {
  return (
    <>
      <Helmet>
        <title>Pricing - Quote/Proposal | Exceptional Digital Solutions Auckland New Zealand | Weboid</title>
        <meta name="description" content="Explore Weboid's pricing options, request quotes, review proposals, and discover available add-ons for exceptional digital solutions."/>
        <meta name="keywords" content="Pricing, Quotes, Proposals, Add-ons, Weboid Digital Solutions"/>

        <meta property="og:title" content="Pricing - Quote - Proposal - Add-ons | Exceptional Digital Solutions | Weboid"/>
        <meta property="og:description" content="Explore Weboid's pricing options, request quotes, review proposals, and discover available add-ons for exceptional digital solutions."/>
        
      </Helmet>

      <TitleHeader
        title="Our Pricing"
        subtitle="Utu hoko"
        backgroundImage="img/pricing.webp"
      />

      {/* Pricing First Section */}
      <ReusableSection
        
        text="Here at Weboid, we recognize the importance of affordable website development. That's why we only charge for what we create, with a hourly rate of only NZD $75. This straightforward approach ensures you pay only for the services you need, tailored specifically to your project's requirements.
              We are proud to support not-for-profit, charity, and community organizations with special rates. Please reach out to us to discuss these options further.
              At Weboid, we believe that everyone should have access to affordable and high-quality website services. Contact us today to explore our payment options and find a plan that fits your budget and meets your needs."
       
      />

      <div id="pricing">
      <ReusableSection
        title="Customised Pricing for each solution"
        subtitle="Every website project is unique and so is our pricing."
        text="We tailor our charges to the specific services you choose, ensuring they match the complexity and scope of your requirements. Our goal is to provide high-quality, affordable digital solutions that align with your budget.
            Flexibility: We understand financial constraints and work to find solutions that fit within your budget.
            Transparency: Before any work begins, we provide a detailed pricing estimate so you know what to expect.
            Part of the decision-making: At the end of the day, this is for you and your business, so we will work closely with you from day one, ensuring you are at the table and have your voice heard.
            To get started, simply fill out a proposal request or contact us. We'll review your needs and return with a personalised proposal with a pricing estimate."
        image={{ src: "img/monthlyplan.webp", isSideImage: false }}
        buttonText="Get started today with a proposal"
        buttonLink="#proposal"
      />
      </div>

      {/* Request a Proposal Section */}
      <div id="proposal">
      <ProposalsSection />
      </div>

      {/* FAQ / Help Desk Section */}
      <FAQCTASection />
    </>
  );
};

export default PricingPage;
