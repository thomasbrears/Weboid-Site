import React from 'react';
import { Helmet } from 'react-helmet-async';
import TitleHeader from '../components/TitleHeader';
import ReusableSection from '../components/ReusableSection';

const PortfolioPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Portfolio | Showcase of Innovative Projects | Weboid</title>
        <meta name="description" content="Explore Weboid's portfolio of innovative digital projects. See how we've helped businesses succeed with our web development and digital solutions."/>
        <meta name="keywords" content="Weboid Portfolio, Digital projects, Web development showcase, Innovative projects, Weboid success stories"/>

        <meta property="og:title" content="Portfolio | Showcase of Innovative Projects | Weboid"/>
        <meta property="og:description" content="Explore Weboid's portfolio of innovative digital projects. See how we've helped businesses succeed with our web development and digital solutions."/>
      </Helmet>

      <TitleHeader
        title="Our work"
        subtitle="Portfolio"
        backgroundImage="img/general-cover.jpg"
      />

      <ReusableSection
        title="Our portfolio is currently getting an upgrade!"
        subtitle="Itll be back as soon as our upgrade is complete."
        text=" "
        buttonText="Contact us"
        buttonLink="/contact"
      />

    </>
  );
};

export default PortfolioPage;
