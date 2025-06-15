import { FaChevronDown, FaCode, FaUsers, FaCheckCircle, FaArrowRight, FaGlobe, FaMobile, FaSearch, FaPalette, FaSun, FaMoon, FaPhone, FaEnvelope, FaCalendarAlt, FaComments, FaHandshake, FaClipboardList, FaLaptopCode, FaRocket, FaLifeRing, FaHeadset, FaHeart, FaShieldAlt, FaClock, FaTimes } from 'react-icons/fa';
import { FaBoltLightning } from "react-icons/fa6";
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const LandingPage = () => {
  const [theme, setTheme] = useState('dark');
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    currentWebsite: '',
    challenges: '',
    goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form');
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          business: '',
          currentWebsite: '',
          challenges: '',
          goals: ''
        });
      }, 3000);
    }, 1500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    {
      icon: <FaGlobe className="w-8 h-8" />,
      title: "Custom Web Development",
      description: "Bespoke websites built with modern tools that actually do what you need them to do! Let's convert those visitors into customers"
    },
    {
      icon: <FaMobile className="w-8 h-8" />,
      title: "Mobile-First Design",
      description: "Stunning, responsive designs that look incredible on every device!"
    },
    {
      icon: <FaSearch className="w-8 h-8" />,
      title: "SEO Optimization", 
      description: "Get found on Google with websites optimized for search engines from day one"
    },
    {
      icon: <FaBoltLightning className="w-8 h-8" />,
      title: "Lightning Fast Performance",
      description: "Blazing fast load times that keep visitors engaged and search engines happy"
    }
  ];

  const portfolioSites = [
    {
      title: "Empire Clothing",
      description: "Modern online web store with seamless checkout experience.",
      image: "img/portfolio/ec.png",
      features: ["ECommerce", "Checkout", "Inventory Management", "Responsive Design"]
    },
    {
      title: "AUT Events Induction Portal",
      description: "Custom induction taking and management portal.",
      image: "img/portfolio/auteip.png",

      features: ["Custom", "Contact Forms", "Modern Design", "Induction Management"]
    },
    {
      title: "Bream Bay Home Grown",
      description: "Modern online web store to take a local business to all of Aotearoa.",
      image: "img/portfolio/bbhg.png",
      features: ["SEO Optimised", "ECommerce", "Customer Reviews", "Responsive Design"]
    },
    {
      title: "Pawderlands Doggy  Daycare",
      description: "Online presence for a local doggy daycare, with online bookings.",
      image: "img/portfolio/p.png",
      features: ["Online Bookings", "Responsive Design", "Contact Forms", "Visual Showcase"]
    }
  ];

  const benefits = [
    "100% Kiwi",
    "Direct access to me, anytime",
    "Modern designs that convert",
    "Custom solutions tailored to your needs",
    "Mobile-responsive across all devices", 
    "SEO optimised from day one",
    "Fast, secure, and reliable hosting",
    "Lightning-fast performance",
    "Ongoing support & maintenance",
    "Transparent, affordable pricing",
    "Quality craftsmanship guarantee",
    "I'm with you every step of the way",
  ];

  const themeClasses = isDark 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900';

  const cardClasses = isDark
    ? 'bg-gray-800 border-gray-700'
    : 'bg-white border-gray-200';

  const accentColor = isDark ? 'text-blue-600' : 'text-blue-600';
  const buttonPrimary = isDark 
    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
    : 'bg-blue-600 hover:bg-blue-700 text-white';
  const buttonSecondary = isDark
    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
    : 'border-gray-300 text-gray-700 hover:bg-gray-50';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses}`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full ${cardClasses} border shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
      </button>

      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-10 w-72 h-72 ${isDark ? 'bg-blue-600' : 'bg-blue-400'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse`}></div>
          <div className={`absolute top-40 right-10 w-72 h-72 ${isDark ? 'bg-purple-500' : 'bg-purple-400'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000`}></div>
          <div className={`absolute -bottom-8 left-20 w-72 h-72 ${isDark ? 'bg-pink-500' : 'bg-pink-400'} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000`}></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${cardClasses} border mb-8 animate-fade-in`}>
            <FaCode className={`w-4 h-4 mr-2 ${accentColor}`} />
            <span className="text-sm font-medium">Nau mai, haere mai ki Weboid</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight px-2 sm:px-0">
            Your Website Should
            <span className={`block ${accentColor} bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              Actually Work
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl md:text-2xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed px-4 sm:px-6 lg:px-0`}>
            Stop losing customers to slow, outdated websites. I'm a Kiwi who loves creating modern, lightning-fast sites that convert visitors into paying customers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4 sm:px-0">
            <button 
              onClick={scrollToForm}
              className={`w-full sm:w-auto px-6 sm:px-8 py-4 rounded-full ${buttonPrimary} font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group`}
            >
              <FaClipboardList className="w-5 h-5 mr-2" />
              Get a Free, No-Obligation Website Assessment
              <FaArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="tel:+64272690900"
              className={`w-full sm:w-auto px-6 sm:px-8 py-4 rounded-full border-2 ${buttonSecondary} font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
            >
              <FaPhone className="w-5 h-5 mr-2" />
              Call Thomas Now
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm opacity-75 px-6 sm:px-0">
            <div className="flex items-center">
              <FaCheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
              <span>No Obligation</span>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
              <span>24hr Response</span>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
              <span>100% Kiwi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <section className="relative h-20">
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <FaChevronDown className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </div>
      </section>

      {/* With You Every Step Section */}
      <section id="support" className={`py-20 px-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <div className="mb-8">
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${cardClasses} border mb-4`}>
                  <span className="text-sm font-medium">Personal Touch</span>
                  <FaHeart className={`w-4 h-4 ml-2 ${accentColor}`} />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  I'm With You
                  <span className={`block ${accentColor}`}>Every Step of the Way</span>
                </h2>
                <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-6`}>
                  When you work with Weboid, you're not just getting a website; You're getting a dedicated partner who genuinely cares about your success.
                </p>
              </div>

              <div className="space-y-6">
                <div className={`flex items-start p-6 ${cardClasses} border rounded-xl hover:shadow-lg transition-all duration-300`}>
                  <div className={`w-12 h-12 ${isDark ? 'bg-blue-600' : 'bg-blue-100'} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                    <FaPhone className={`w-6 h-6 ${isDark ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Direct Access to me</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      No call centers, no account managers. When you call or email, you're talking directly to Thomas - the person building your website.
                    </p>
                  </div>
                </div>

                <div className={`flex items-start p-6 ${cardClasses} border rounded-xl hover:shadow-lg transition-all duration-300`}>
                  <div className={`w-12 h-12 ${isDark ? 'bg-green-600' : 'bg-green-100'} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                    <FaShieldAlt className={`w-6 h-6 ${isDark ? 'text-white' : 'text-green-600'}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      I put my heart and soul into every website I create. If you're not completely satisfied, I'll keep working until you are. Weboid is built on trust and quality over everything else, including profit.
                    </p>
                  </div>
                </div>

                <div className={`flex items-start p-6 ${cardClasses} border rounded-xl hover:shadow-lg transition-all duration-300`}>
                  <div className={`w-12 h-12 ${isDark ? 'bg-purple-600' : 'bg-purple-100'} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                    <FaLifeRing className={`w-6 h-6 ${isDark ? 'text-white' : 'text-purple-600'}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ongoing Partnership</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Your website launch is just the beginning. I'm here for updates, questions, and growth as your business evolves.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              <div className={`${cardClasses} border rounded-2xl p-8 shadow-lg relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div>

                <div className="relative z-10 text-center">
                  <div className="mb-6 rounded-full overflow-hidden w-32 h-32 mx-auto border-4 border-blue-600 shadow-lg">
                    <img 
                      src="img/thomas.jpg" 
                      alt="Thomas" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  
                  <h3 className="text-2xl font-bold mb-2">Thomas</h3>
                  <p className={`${accentColor} font-semibold mb-4`}>Founder & Developer</p>
                  
                  <blockquote className={`${isDark ? 'text-gray-300' : 'text-gray-600'} italic text-lg mb-6`}>
                    "I believe every Kiwi business deserves a website that works as hard as they do. That's why I put everything I have into every project."
                  </blockquote>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={scrollToForm}
                      className="flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-300"
                    >
                      <FaClipboardList className="w-4 h-4 mr-2" />
                      Get a Free, No-Obligation Website Assessment today
                    </button>
                    <a 
                      href="tel:+64272690900"
                      className={`flex items-center justify-center px-4 py-3 ${buttonSecondary} border-2 rounded-lg font-semibold transition-all duration-300`}
                    >
                      <FaPhone className="w-4 h-4 mr-2" />
                      Or call me on +64 27 269 0900
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Some Recent
              <span className={`${accentColor}`}> Projects</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Here are some examples of websites we've created for Kiwi businesses like yours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioSites.map((site, index) => (
              <div
                key={index}
                className={`${cardClasses} border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group`}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img 
                    src={site.image} 
                    alt={site.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">{site.title}</h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3 text-sm leading-relaxed`}>
                    {site.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {site.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {/* CTA Card - Takes up 2 spaces on large screens */}
            <div className={`lg:col-span-2 ${cardClasses} border rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col justify-center items-center text-center`}>
              <div className="mb-4">
                <div className={`w-16 h-16 ${isDark ? 'bg-blue-600' : 'bg-blue-100'} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                  <FaRocket className={`w-8 h-8 ${isDark ? 'text-white' : 'text-blue-600'}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Your Project Could Be Next
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed mb-6 max-w-sm mx-auto`}>
                  Ready to join these successful Kiwi businesses? Let's create something amazing for your company.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <button 
                  onClick={scrollToForm}
                  className={`flex-1 inline-flex items-center justify-center px-4 py-3 ${buttonPrimary} rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group`}
                >
                  <FaClipboardList className="w-4 h-4 mr-2" />
                  Get a Free, No-Obligation Website Assessment today
                </button>
                
                <a 
                  href="https://weboid.dev/contact" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex-1 inline-flex items-center justify-center px-4 py-3 border-2 ${buttonSecondary} rounded-lg font-semibold text-sm transition-all duration-300`}
                >
                  <FaGlobe className="w-4 h-4 mr-2" />
                  Get in touch today!
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-20 px-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Makes Weboid 
              <span className={`${accentColor}`}> Different?</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              We don't just build websites; We create digital experiences that drive real results
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`${cardClasses} border rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group ${
                  isVisible.services ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${accentColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need,
              <span className={`${accentColor}`}> Nothing You Don't</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              When you choose Weboid, you're getting a complete solution that just works
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {/* Large feature card */}
            <div className={`md:col-span-2 lg:col-span-2 ${cardClasses} border rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-500/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${isDark ? 'bg-blue-600' : 'bg-blue-100'} rounded-xl flex items-center justify-center mr-4`}>
                    <FaHeart className={`w-6 h-6 ${isDark ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <h3 className="text-2xl font-bold">100% Kiwi</h3>
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg leading-relaxed`}>
                  Direct access to me, anytime. No call centers, no account managers - just honest Kiwi service and craftsmanship you can trust.
                </p>
              </div>
            </div>

            {/* Medium cards */}
            <div className={`${cardClasses} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group`}>
              <div className={`w-10 h-10 ${isDark ? 'bg-green-600' : 'bg-green-100'} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <FaBoltLightning className={`w-5 h-5 ${isDark ? 'text-white' : 'text-green-600'}`} />
              </div>
              <h4 className="font-bold mb-2">Lightning-fast performance</h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Optimised for speed</p>
            </div>

            <div className={`${cardClasses} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group`}>
              <div className={`w-10 h-10 ${isDark ? 'bg-purple-600' : 'bg-purple-100'} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <FaMobile className={`w-5 h-5 ${isDark ? 'text-white' : 'text-purple-600'}`} />
              </div>
              <h4 className="font-bold mb-2">Mobile-responsive</h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Perfect on all devices</p>
            </div>

            {/* Tall card */}
            <div className={`md:row-span-2 ${cardClasses} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-full"></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className={`w-12 h-12 ${isDark ? 'bg-orange-600' : 'bg-orange-100'} rounded-xl flex items-center justify-center mb-4`}>
                  <FaLifeRing className={`w-6 h-6 ${isDark ? 'text-white' : 'text-orange-600'}`} />
                </div>
                <h4 className="font-bold text-lg mb-3">Ongoing Support</h4>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 flex-grow`}>
                  We're with you every step of the way - from launch to growth and beyond.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <FaCheckCircle className="w-3 h-3 text-green-500 mr-2" />
                    <span>24hr response</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <FaCheckCircle className="w-3 h-3 text-green-500 mr-2" />
                    <span>Updates & maintenance</span>
                  </div>
                  <div className="flex items-center text-xs">
                    <FaCheckCircle className="w-3 h-3 text-green-500 mr-2" />
                    <span>Growth partnership</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Wide card */}
            <div className={`md:col-span-2 ${cardClasses} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-2">SEO Optimized from Day One</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Get found on Google with SEO best practices
                  </p>
                </div>
                <div className={`w-12 h-12 ${isDark ? 'bg-yellow-600' : 'bg-yellow-100'} rounded-xl flex items-center justify-center`}>
                  <FaSearch className={`w-6 h-6 ${isDark ? 'text-white' : 'text-yellow-600'}`} />
                </div>
              </div>
            </div>

            {/* Small cards */}
            <div className={`${cardClasses} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group text-center`}>
              <div className={`w-10 h-10 ${isDark ? 'bg-red-600' : 'bg-red-100'} rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                <FaShieldAlt className={`w-5 h-5 ${isDark ? 'text-white' : 'text-red-600'}`} />
              </div>
              <h4 className="font-bold text-sm mb-1">Secure & Reliable</h4>
              <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Hosting included</p>
            </div>

            <div className={`${cardClasses} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group text-center`}>
              <div className={`w-10 h-10 ${isDark ? 'bg-indigo-600' : 'bg-indigo-100'} rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                <FaPalette className={`w-5 h-5 ${isDark ? 'text-white' : 'text-indigo-600'}`} />
              </div>
              <h4 className="font-bold text-sm mb-1">Modern Design</h4>
              <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>That converts</p>
            </div>

            {/* Wide card for Custom Solutions */}
            <div className={`md:col-span-2 ${cardClasses} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}>
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <h4 className="font-bold text-lg mb-2">Custom Solutions Tailored to You</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    No cookie-cutter templates - every website is built specifically for your business needs
                  </p>
                </div>
                <div className={`w-12 h-12 ${isDark ? 'bg-purple-600' : 'bg-purple-100'} rounded-xl flex items-center justify-center flex-shrink-0 ml-4`}>
                  <FaLaptopCode className={`w-6 h-6 ${isDark ? 'text-white' : 'text-purple-600'}`} />
                </div>
              </div>
            </div>

            <div className={`${cardClasses} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group text-center`}>
              <div className={`w-10 h-10 ${isDark ? 'bg-teal-600' : 'bg-teal-100'} rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                <FaHeart className={`w-5 h-5 ${isDark ? 'text-white' : 'text-teal-600'}`} />
              </div>
              <h4 className="font-bold text-sm mb-1">Affordable Pricing</h4>
              <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Relationships over profit</p>
            </div>

            <div className={`${cardClasses} border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group text-center`}>
              <div className={`w-10 h-10 ${isDark ? 'bg-pink-600' : 'bg-pink-100'} rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                <FaHandshake className={`w-5 h-5 ${isDark ? 'text-white' : 'text-pink-600'}`} />
              </div>
              <h4 className="font-bold text-sm mb-1">Quality Guarantee</h4>
              <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>100% satisfaction</p>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={scrollToForm}
              className={`inline-flex items-center px-8 py-4 ${buttonPrimary} rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group`}
            >
              <FaClipboardList className="w-5 h-5 mr-2" />
              Start Your Website Journey
              <FaArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section id="contact-form" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-12">
                <div className={`inline-flex items-center px-4 py-2 rounded-full ${cardClasses} border mb-4`}>
                  <FaClipboardList className={`w-4 h-4 mr-2 ${accentColor}`} />
                  <span className="text-sm font-medium">Free, No-Obligation Website Assessment</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Get Your
                  <span className={`block ${accentColor}`}>Website Assessment within 24 hours</span>
                </h2>
                <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  I'll personally review your needs and call you back within 24 hours with a custom strategy for your business.
                </p>
              </div>

              <div className={`${cardClasses} border rounded-2xl p-8 shadow-xl`}>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Name</label>
                      <input
                        type="text"
                        name="business"
                        value={formData.business}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                        placeholder="Your Business Name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                        placeholder="john@business.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                        placeholder="+64 27 123 4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Current Website (if you have one)</label>
                    <input
                      type="url"
                      name="currentWebsite"
                      value={formData.currentWebsite}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                      placeholder="https://yourwebsite.com (or leave blank if you don't have one)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Current Website Challenges</label>
                    <textarea
                      name="challenges"
                      value={formData.challenges}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                      placeholder="Tell me about your current website issues (slow loading, not mobile-friendly, no leads, etc.) or what you need if starting fresh"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Main Goal for Your Website</label>
                    <textarea
                      name="goals"
                      value={formData.goals}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all`}
                      placeholder="What do you want your website to achieve? (more leads, online sales, better brand image, etc.)"
                    />
                  </div>

                  <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
                    <div className="flex items-start space-x-3">
                      <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold mb-2">What happens next:</p>
                        <ul className={`${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                          <li>• I'll personally review your information</li>
                          <li>• Call you back within 24 hours</li>
                          <li>• Provide honest advice about what would work best</li>
                          <li>• No obligation, no sales pressure</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 ${buttonPrimary} rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaClipboardList className="w-5 h-5 mr-2" />
                        Get My Assessment
                        <FaArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className={`${cardClasses} border rounded-2xl p-12 shadow-xl text-center`}>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Thank You!</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-xl mb-8 leading-relaxed`}>
                I've received your information and I'll call you back within 24 hours to discuss your website needs.
              </p>
              <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-6`}>
                <p className="text-lg font-semibold mb-3">What to expect:</p>
                <ul className={`${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
                  <li className="flex items-center justify-center">
                    <FaCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Personal call from Thomas
                  </li>
                  <li className="flex items-center justify-center">
                    <FaCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom website strategy
                  </li>
                  <li className="flex items-center justify-center">
                    <FaCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Honest pricing discussion
                  </li>
                  <li className="flex items-center justify-center">
                    <FaCheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Next steps if we're a good fit
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Fallback Section */}
      <section id="contact" className={`py-20 px-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get
              <span className={`${accentColor}`}> Started?</span>
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Choose your preferred way to get in touch
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <a
              href="tel:+64272690900"
              className={`${cardClasses} border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group block`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <FaPhone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Call Me</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4`}>
                Let's discuss your project - Call me!
              </p>
              <span className={`text-sm font-semibold ${accentColor} group-hover:underline`}>
                Call +64 27 269 0900
              </span>
            </a>

            <a
              href="https://weboid.dev/call"
              target="_blank"
              rel="noopener noreferrer"
              className={`${cardClasses} border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group block`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <FaCalendarAlt className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Schedule a Call</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4`}>
                Book a time that works for you
              </p>
              <span className={`text-sm font-semibold ${accentColor} group-hover:underline`}>
                Schedule a call
              </span>
            </a>

            <a
              href="mailto:thomas@weboid.dev"
              className={`${cardClasses} border rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group block`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <FaEnvelope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email Me</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4`}>
                Send me your project details
              </p>
              <span className={`text-sm font-semibold ${accentColor} group-hover:underline`}>
                thomas@weboid.dev
              </span>
            </a>
          </div>

          <div className="text-center">
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Or visit our main website to learn more and see our portfolio
            </p>
            <a 
              href="https://weboid.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-flex items-center ${accentColor} hover:underline font-semibold text-lg transition-all duration-300 group`}
            >
              Visit weboid.dev
              <FaArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;