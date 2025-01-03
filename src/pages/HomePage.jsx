import React from 'react';
import { Helmet } from 'react-helmet-async';
import HomePageHeader from '../components/HomePageHeader';
import ReusableSection from '../components/ReusableSection';
import ServicesSection from '../components/ServicesSection';
import SloganSection from '../components/SloganSection';
import FAQCTASection from '../components/FAQCTASection';
import ProcessSection from '../components/ProcessSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Weboid | Innovative Digital Solutions & Inspiring Websites in Auckland & New Zealand Wide</title>
        <meta name="description" content="Welcome to Weboid, where we specialise in crafting tailored websites that captivate your audience and drive desired actions. With our expert team and dedication to your success, we'll create a website that embodies your brand and empowers your online presence. Contact us today for exceptional results, and let's create a website that truly represents your business, inspires visitors, and helps you achieve your goals." />
        <meta name="keywords" content="Web development, Website design, Custom website development, Website design and development, Web development services, Website development company, Responsive web design, E-commerce website development, Auckland web development, Northland website design, Whangarei web development, Bream Bay website development, New Zealand web design, Online store development, Blog website design, Portfolio website development, Small business website design, Corporate website development, Non-profit website design, SEO-friendly web design, Mobile-responsive websites, Expert website developers, Professional web designers, Innovative web solutions, Top web development company, High-quality website design, Customized website solutions, Creative web development, Website solutions for businesses, Improve online presence, Increase website traffic, Boost online sales, Enhance user experience, Optimize website performance, Web development, Websites to amaze, Tailored website solutions, Exceptional results, Dedicated web development, Unlock business growth, Inspire, engage, and empower, Stress-free web design, Affordable e-commerce website development, WordPress website design services, SEO optimization, Website maintenance and support, Weboid, Weboid Developments, Weboid web development, A1 Web Development" />

        <meta property="og:title" content="Weboid | Innovative Digital Solutions & Inspiring Websites in Auckland & New Zealand Wide" />
        <meta property="og:description" content="Welcome to Weboid, where we specialise in crafting tailored websites that captivate your audience and drive desired actions. With our expert team and dedication to your success, we'll create a website that embodies your brand and empowers your online presence. Contact us today for exceptional results, and let's create a website that truly represents your business, inspires visitors, and helps you achieve your goals." />
      </Helmet>

      {/* Home Page Header */}
      <HomePageHeader backgroundImage="img/br1.jpg" />

      
      {/* About Us Section */}
      <div id="about">
      <ReusableSection
        title="About us"
        subtitle="Nau mai, haere mai ko Weboid"
        text="At Weboid, we're fully committed to creating a special website just for you. We prioritize your needs and focus on bringing your vision to life. Your success is our success, and we are dedicated to unlocking business growth with innovative digital solutions that inspire, engage, and unleash potential.
        Website design and development can often be a complex and overwhelming process. However, at Weboid, we take care of the critical details, so you can concentrate on what matters most – your business. We steer clear of technical jargon and provide you with the information and guidance you need to achieve your business goals and maximize the potential of your online presence.
        Our goal is to make the website design process as seamless and stress-free as possible for you. We listen to your requirements, pay attention to every detail, and guide you through the process, ensuring that your website reflects your brand, resonates with your target audience, and propels your success.
        With Weboid, you can trust that we are fully invested in your project. We go above and beyond to deliver exceptional results and provide ongoing support to ensure that your online presence continues to thrive. Choose Weboid and experience the dedication and expertise that sets us apart. Contact us today, and let's create a website that truly represents your business, inspires and engages visitors, and helps you achieve your goals"
        image={{ src: "img/welcome.jpg", isSideImage: true }}
        buttonText="Learn More"
        buttonLink="/services"
      />
      </div>
    
      {/* Services Section */}
      <div id="serivces">
      <ServicesSection />
      </div>

      {/* Pricing Section */}
      <ReusableSection
        title="Our Pricing"
        subtitle="Utu hoko"
        text="At Weboid, we offer high-quality website development at affordable prices. Our fully packed and low-cost pricing plans provide exceptional value, ensuring that you receive a website that exceeds your expectations. We have transparent pricing options tailored to different budgets and business sizes, allowing you to choose the plan that suits you best.
              We're proud to support not-for-profit, charity, and community organizations with special reduced rates. We recognize the importance of their work and aim to help enhance their online presence. If you belong to this category, Please email us to discuss available options.
              At Weboid, we believe that every business deserves an affordable, high-quality website. Let us help you establish a strong online presence without breaking the bank. Visit our pricing page to explore our plans and contact us today to start your website development journey."
        buttonText="See Pricing"
        buttonLink="/pricing"
      />

      {/* FAQ / Help Desk Section */}
      <FAQCTASection />

      {/* Slogan Section */}
      <div id="slogan"> 
      <SloganSection />
      </div>

      {/* Our Process Section */}
      <div id="process">
      <ProcessSection />
      </div>

      {/* Contact Section */}
      <div id="contact">
      <ContactSection />
      </div>
    </>
  );
};

export default Home;
