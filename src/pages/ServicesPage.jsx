import React, { useState, useEffect } from "react";
import TitleHeader from "../components/TitleHeader";
import FAQCTASection from "../components/FAQCTASection";
import { Helmet } from "react-helmet-async";

// Service Card Component
const ServiceCard = ({ service, onClick }) => {
  return (
    <div
    className="relative bg-cover bg-center h-30 w-50 rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-105"
      style={{ backgroundImage: `url(${service.imageUrl})` }}
      onClick={() => onClick(service)}
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

      <div className="relative z-10 p-6 flex flex-col justify-center items-center text-white">
        <h3 className="text-2xl">{service.title}</h3>
      </div>
    </div>
  );
};

// Service Details Section
const ServiceDetails = ({ service }) => {
  if (!service) return <p className="text-center text-gray-500">Select a service to see details.</p>;

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mt-8">
      <h3 className="mb-4 text-3xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
      
      <p className="mb-6 font-base text-gray-900 dark:text-white">{service.description}</p>
      <p className="font-semibold text-gray-900 dark:text-white">Estimated time: {service.estimatedTime} working days</p>
      <p className="font-semibold text-gray-900 dark:text-white">Cost: {service.cost}</p>
    </div>
  );
};

// Main Services Page Component
const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: "Website Development",
      imageUrl: "img/services/websitedev.jpg",
      description:
        "At Weboid, we take great pride in offering top-notch web development services to our valued customers in Aotearoa New Zealand. When you choose us, you can expect nothing less than a website that embodies stunning design and embodies powerful branding. Our goal is to create a static or ECommerce website that not only captivates visually but also delivers exceptional user experience. We of experts ensures that your website is visually captivating, leaving a lasting impression on your visitors. We pay special attention to creating an intuitive user experience, making your website easy to navigate and engaging for every user. Choose Weboid for web development services that prioritize aesthetics, functionality, and results. Let us transform your online presence and empower your business's growth. Contact us today to get started!",
      estimatedTime: "12 - 18",
      cost: "Charged per hour, package, or bundle basis",
      category: "Web Development",
      id: "website-development"
    },
    {
      title: "ECommerce Sites",
      imageUrl: "img/services/ecom.jpg",
      description:
        "Whether you're a budding entrepreneur or an established business, our ECommerce packages are designed to empower your online success. With our user-friendly Content Management System (CMS) and a wide range of powerful tools, you'll have everything you need to showcase and sell physical or digital products effortlessly. Our full-fledged, stand-alone ECommerce plans provide a seamless online shopping experience for your customers, enhancing your business growth and reach. With our tailored ECommerce solutions, you can take your business to new heights, connect with a broader audience, and tap into the vast opportunities of the digital marketplace. Whether you're just starting or expanding your online presence, we have the ideal ECommerce plan to meet your unique needs.",
      estimatedTime: " 2-4",
      cost: "This service will be charged on a per hour, package or bundle basis based on your needs",
      category: "Web Development",
      id: "ecommerce-site"
    },
    {
      title: "Responsive Design",
      imageUrl: "img/services/responsive.jpg",
      description:
        "At Weboid, we prioritize seamless user experiences on all devices. We excels in responsive website design, ensuring your site adapts flawlessly to any screen size. With complete compatibility across mobile, tablet, and desktop, engage your audience effectively. Say goodbye to maintaining separate versions for devices. Our responsive design approach eliminates multiple sites, providing consistent experiences regardless of the device. Whether smartphone, tablet, or desktop, your site looks and functions flawlessly. Choose Weboid for 100% mobile responsiveness. Embrace the future of web design. Contact us today to discuss your responsive needs!",
      estimatedTime: "0",
      cost: "Seamless responsive website are on us! - no extra cost, no delays!",
      category: "Web Development",
      id: "responsive-design"
    },
    {
      title: "Top-notch Support",
      imageUrl: "img/services/support.jpg",
      description:
        "At Weboid, we believe in providing exceptional support that matches the quality of our amazing websites. Your dedicated developer and our expert team are always just an email or phone call away, ready to assist you whenever you need it. We understand that timely and reliable support is crucial for the smooth operation of your website. Whether you have questions, need assistance with updates, or encounter any issues; Please reach out to us by email to support@weboid.dev or by phone on +64 27 269 0900. Choose Weboid for not only amazing websites but also unparalleled support. Experience peace of mind knowing that our dedicated team is here to support your online success. Contact us today and let us exceed your expectations!",
      estimatedTime: "0",
      cost: "Top-notch support is included - no extra cost, no delays!",
      category: "Web Development",
      id: "top-notch-support"
    },
    {
      title: "Unique & Custom Solutions",
      imageUrl: "img/services/unique-custom-solutions.jpg",
      description:
        "Enhance your brand identity with our custom email solutions at Weboid. We understand the importance of a professional contact method that aligns with your new domain. By choosing us, you can have email addresses that reflect your domain name, such as hello@weboid.dev, establishing credibility and trust with your audience. We will assist you in setting up custom email accounts or forwarders tailored to your needs. With Weboid, you'll have a seamless and personalized communication experience that showcases your commitment to excellence. Elevate your communication, strengthen your brand, and make it effortless for customers to reach out to your amazing team. Contact us now and experience the benefits of custom email solutions from Weboid.",
      estimatedTime: " TBC - depends on your needs",
      cost: "This service will be charged on a per hour, package or bundle basis based on your needs",
      category: "Web Development",
      id: "unique-custom-solutions"
    },
    {
      title: "Custom Email Solutions",
      imageUrl: "img/services/email.jpg",
      description:
        "Enhance your brand identity with our custom email solutions at Weboid. We understand the importance of a professional contact method that aligns with your new domain. By choosing us, you can have email addresses that reflect your domain name, such as hello@weboid.dev, establishing credibility and trust with your audience. We will assist you in setting up custom email accounts or forwarders tailored to your needs. With Weboid, you'll have a seamless and personalized communication experience that showcases your commitment to excellence. Elevate your communication, strengthen your brand, and make it effortless for customers to reach out to your amazing team. Contact us now and experience the benefits of custom email solutions from Weboid.",
      estimatedTime: "1",
      cost: "Custom email forwarders included in all plans! - no extra cost, no delays!",
      category: "Web Development",
      id: "custom-email-solutions"
    },
    {
      title: "Google Workspace | Microsoft Office",
      imageUrl: "img/services/email.jpg",
      description:
        "Upgrade your business communication with the power of Google Workspace or Microsoft Office, leading providers of professional email accounts. Leave a lasting impression on clients and partners with a personalized email address that reflects your brand's identity. With enhanced features and advanced security measures, you can communicate with confidence, knowing your emails are in safe hands. Seamlessly integrate your email accounts with your website, ensuring a cohesive online presence that fosters trust and credibility. But that's not all – with Google Workspace or Microsoft Office, you gain access to additional benefits like Google Drive or Microsoft Office, empowering you and your team to collaborate effortlessly and boost productivity. Elevate your professionalism to new heights and experience the seamless integration of email, cloud storage, and productivity tools. Join the league of successful businesses that rely on Google Workspace or Microsoft Office for streamlined communication and unmatched efficiency.",
      estimatedTime: "1-2",
      cost: "This add-on will be approximately $189 per user, annually",
      category: "Web Development",
      id: "googleworkspace-microsoftoffice"
    },
    {
      title: "Designed for your customers",
      imageUrl: "img/services/ecom1.jpg",
      description:
        "",
      estimatedTime: " 2-4",
      cost: "At Weboid, we understand that your website is not just a digital presence, but a powerful tool to engage and convert your customers. That's why we design websites that are specifically tailored to meet the expectations of your target audience. Our customer-centric approach ensures that your website is designed to address your customers' pain points, showcase your unique selling propositions, and create a seamless experience that fosters trust and encourages action. We go beyond aesthetics to create functional, conversion-driven websites that drive real results for your business. Choose Weboid to design a website that not only meets your business objectives but also exceeds your customers' expectations. Contact us today and let us create a website that speaks directly to your target audience and helps you achieve your online goals.",
      category: "Web Development",
      id: "designed-for-your-customers"
    },
    {
      title: "Online Bookings",
      imageUrl: "img/services/online-bookings.jpg",
      description:
        "Elevate your website's functionality and customer experience with our cutting-edge Online Bookings add-on. Say goodbye to traditional appointment booking hassles and welcome a seamless, user-friendly system that empowers your customers to schedule appointments, reserve tables, or book services directly from your website. With our expert integration, your website will transform into a dynamic hub for bookings, enhancing customer satisfaction and streamlining your business operations. Our user-friendly booking system allows customers to easily select their preferred date, time, and service, all in just a few clicks. Embrace the convenience of real-time availability updates, automatic reminders, and easy rescheduling options, ensuring a seamless booking experience for your valued customers. Maximize your business's efficiency and eliminate the need for manual booking management. Our Online Bookings add-on syncs seamlessly with your calendar, providing you with a centralized platform to manage all appointments effortlessly. Whether you run a salon, restaurant, medical practice, or any service-based business, our Online Bookings add-on will be the game-changer that drives customer loyalty and business growth. Step into the future of booking management with Weboid and unlock the full potential of your website as a dynamic and customer-centric platform.",
      estimatedTime: "1",
      cost: "The price of this add-on will be determined based on your requirements and software",
      category: "Web Development",
      id: "online-bookings"
    },
    {
      title: "Website Migration",
      imageUrl: "img/services/websitedev.jpg",
      description:
        "Seamlessly transition from your current website to a brand-new online experience with our top-notch website migration services. Our skilled team will take charge of the entire migration process, ensuring a smooth transfer of all your valuable data and content to the new website we create for you. Say goodbye to downtime and data loss worries as we meticulously handle every detail, guaranteeing a hassle-free migration. Experience the convenience of upgrading to a custom-designed website tailored to your specific needs and goals. Our website migration services ensure that your new site not only retains all the essential elements from the previous one but also gains enhanced functionality, improved user experience, and a fresh, modern look. From seamless data transfer to testing and fine-tuning, we'll ensure that your new website is fully optimized and ready to wow your audience from the moment it goes live. At Weboid, we prioritize your satisfaction and success, which is why our website migration services are designed to deliver a seamless transition and a website that exceeds your expectations. Trust us to handle the technical intricacies, while you can focus on growing your business and engaging your audience with an upgraded digital presence that truly shines.",
      estimatedTime: "9",
      cost: "The price of this add-on will be determend based on your requirements",
      category: "Web Development",
      id: "website-migration"
    },
    {
      title: "Blog",
      imageUrl: "img/services/blog.jpg",
      description:
        "Elevate your website's online presence and establish yourself as a thought leader in your industry with our captivating blog add-on. Our expert team will create a stunning blog platform that seamlessly integrates with your website, allowing you to regularly share informative and engaging articles with your audience. With our blog and content writing add-ons working in harmony, you can deliver valuable insights, industry news, and compelling stories that resonate with your readers and keep them coming back for more. Unlock the power of content marketing with this perfect match of blog and content writing services. Our team will craft well-researched and engaging blog posts that not only capture your brand's essence but also drive website traffic and enhance your credibility. From attracting new visitors to fostering customer loyalty, our blog add-on will be a valuable asset in your marketing arsenal. Trust Weboid to help you shine as an industry expert and build a loyal readership that elevates your brand to new heights.",
      estimatedTime: "1",
      cost: "The price of this add-on will be determend based on your requirements",
      category: "Web Development",
      id: "blog"
    },
    {
      title: "Newsletter / Marketing Setup",
      imageUrl: "img/services/marketing.jpg",
      description:
        "Unleash the potential of email marketing with our expert setup service. Seamlessly integrate a professional newsletter or marketing software account into your website, taking your customer engagement to the next level. Our dedicated team will guide you through the process, helping you build a loyal subscriber base and customize captivating email templates that align with your brand identity. With our automation expertise, your campaigns will be executed effortlessly, maximizing their impact and driving exceptional results. Prepare to witness increased customer engagement, higher sales, and the achievement of your marketing goals with our seamless setup service.",
      estimatedTime: "1",
      cost: "This add-on will be charged per hour, package or bundle basis, based on your requirements and the selected software",
      category: "Web Development",
      id: "newsletter-marketing-setup"
    },
    {
      title: "Newsletter / Marketing Management",
      imageUrl: "img/services/management.jpg",
      description:
        "Unleash the full potential of your email marketing strategy with our expert email campaign management service. Our skilled team will craft compelling and personalized email campaigns that resonate with your audience and drive action. From captivating subject lines to engaging content and strategic call-to-actions, each email will be carefully curated to deliver maximum impact and boost your conversion rates. With our comprehensive email management service, you can sit back and relax as we handle all aspects of your email campaigns. We'll manage your subscriber lists, segment your audience for targeted messaging, and ensure timely and consistent email delivery. Our team will monitor the performance of each campaign, providing valuable insights to refine your strategy and achieve even greater success. Whether you're nurturing leads, promoting new products, or building customer loyalty, our email campaign management service will elevate your marketing efforts and help you achieve your business goals. Trust Weboid to deliver exceptional email campaigns that inspire, engage, and drive results.",
      estimatedTime: "ongoing",
      cost: "This add-on will be charged per hour, package or bundle basis, based on your requirements and the selected software",
      category: "Web Development",
      id: "newsletter-marketing-management"
    },
    {
      title: "Donations",
      imageUrl: "img/services/donations.jpg",
      description:
        "Welcome our Donations Add-On, the perfect solution for effortless online giving. Designed to support your cause with ease, our secure and user-friendly donation software enables you to create low-cost and highly customizable donation forms. With just a few clicks, visitors can now contribute to your mission, making a positive impact on your organization's goals. Embrace the power of seamless online giving with our Donations Add-On, as you track donations in real-time and gain valuable insights into your fundraising efforts. No more hassle or complications – our software ensures a smooth and enjoyable giving experience for your supporters. Empower your cause, rally your community, and watch the impact multiply as you advance towards your mission. Let Weboid's Donations Add-On take your fundraising efforts to new heights, allowing you to focus on what matters most – making a difference.",
      estimatedTime: "1",
      cost: "The price of this add-on will be determend based on your requirements and the selected software",
      category: "Web Development",
      id: "donations"
    },
    {
      title: "Advanced SEO",
      imageUrl: "img/services/seo.jpg",
      description:
        "Unlock the full potential of your online presence with our cutting-edge Advanced SEO services. By partnering with a trusted contractor, we'll ensure your website is strategically optimized to dominate search engine rankings. Our dedicated team will conduct extensive keyword research to identify the most relevant and high-impact terms for your industry. Implementing powerful SEO strategies, we'll enhance your website's structure and content, making it more attractive to search engines and boosting your online visibility. With Weboid's Advanced SEO services, be prepared to witness remarkable results. As organic traffic surges and your website climbs the search engine ladder, you'll experience a surge in conversions and an influx of targeted leads. Establish your brand as an industry authority and the go-to choice for your audience. Leave no room for competitors to overshadow your online presence. Trust Weboid and our esteemed partners to take your SEO game to new heights, driving sustainable growth and long-term success for your business.",
      estimatedTime: " 2-4",
      cost: "The price of this add-on will be determend based on your requirements",
      category: "Web Development",
      id: "advanced-seo"
    },
    {
      title: "Logo Creation",
      imageUrl: "img/services/brand.jpg",
      description:
        "Elevate your brand identity with a remarkable logo that leaves a lasting impression. At Weboid, our skilled team is passionate about creating visually captivating and meaningful logos that embody the very essence of your business. We delve deep into understanding your brand's values, mission, and personality, ensuring that every element of the logo reflects your unique identity. With our professional logo design, you'll stand out from the competition and establish a strong brand presence. Your logo will serve as a powerful visual representation of your business, instilling confidence and trust in your target audience. As your brand recognition grows, so will your customer loyalty and market credibility. At Weboid, we believe in the power of a well-crafted logo to speak volumes about your brand, making a profound impact on both current and potential customers. Partner with us to create a logo that truly sets you apart and paves the way for a successful and memorable brand journey",
      estimatedTime: " 2-3",
      cost: "This service will be charged on a per hour, package or bundle basis based on your needs",
      category: "Web Development",
      id: "logo"
    },
    {
      title: "Marketing/Print Materials",
      imageUrl: "img/services/bismat.jpg",
      description:
        "Ignite your marketing campaigns, both online and offline, with captivating digital and print materials that command attention. Our expert team will craft visually stunning posters, banners, and digital assets that seamlessly blend with your brand identity and website, leaving a memorable impression on your target audience. Whether it's for online promotions, social media campaigns, or physical displays at events, we have you covered with compelling designs that highlight your unique value proposition. With our tailored print and digital materials, your business gains the power to stand out in the crowded digital landscape and make a lasting impact on potential customers. From striking digital posters to captivating social media graphics, we infuse creativity and expertise into every design, ensuring your marketing efforts shine across all platforms. Plus, we offer a comprehensive service, handling the organization, printing, and digital distribution of these materials, providing you with a hassle-free experience from concept to execution. Elevate your marketing endeavors and take your brand to new heights with our top-notch print and digital materials, making a lasting impression online and offline.",
      estimatedTime: "3 (plus delivery and printing time)",
      cost: "This service add-on will be charged on a per hour, package or bundle basis",
      category: "Web Development",
      id: "marketing-materials"
    },
    {
      title: "Content Writing and Copywriting",
      imageUrl: "img/services/content-writing-copywriting.jpg",
      description:
        "Unlock the art of captivating storytelling and drive unrivaled conversions with Weboid's exceptional Content Writing and Copywriting services. Our wordsmiths are dedicated to crafting compelling narratives that resonate with your audience on a profound level. From website copy that entices and informs to blog articles that inspire and educate, we tailor every word to reflect your brand's essence and speak directly to your target audience. At Weboid, we understand the power of persuasive language in captivating hearts and minds. We expertly communicate your unique value proposition, leaving a lasting impression on your customers. With each word carefully chosen, we aim to build an emotional connection with your audience, inspiring them to take action and forge meaningful relationships with your brand. Let Weboid's Content Writing and Copywriting services be your gateway to exceptional storytelling and unparalleled success. Elevate your brand's presence, compel your audience to act, and embark on a journey of communication that sparks lasting loyalty and engagement. Trust us to breathe life into your brand's message and watch as your story unfolds in the hearts of your customers, propelling your business to new heights.",
      estimatedTime: " 2-3",
      cost: "This add-on will be charged on a per hour, word or bundle basis",
      category: "Web Development",
      id: "content-writing-copywriting"
    },
    {
      title: "Social Media Management",
      imageUrl: "img/services/management.jpg",
      description:
        "Elevate your brand's social media game with Weboid's dynamic management services. Our team of social media gurus is equipped with the expertise to supercharge your online presence, leaving a lasting impact on your target audience. We carefully curate engaging content that resonates with your followers and builds authentic connections. With Weboid at the helm, you can confidently leave the complexities of social media management to us. We take care of content creation, ensuring every post is captivating and aligned with your brand's identity. Our community engagement efforts foster meaningful interactions with your audience, encouraging loyalty and advocacy. Plus, we diligently track performance metrics, providing insightful analytics that empower you to make data-driven decisions for future growth. Step into the spotlight and let Weboid's social media management services unleash your brand's full potential. With our comprehensive approach, you can focus on what you do best while we navigate the ever-evolving social media landscape, ensuring your brand shines brightly and captures the hearts of your audience. Trust Weboid to make your social media journey a resounding success.",
      estimatedTime: "ongoing",
      cost: "This service add-on will be charged on a per hour, package or bundle basis",
      category: "Web Development",
      id: "social-media-management"
    },
    {
      title: "ECommerce Store Managament",
      imageUrl: "img/services/management.jpg",
      description:
        "Take the stress out of running your eCommerce store with Weboid's comprehensive store management services. We handle all the setup and behind-the-scenes work to optimize your online store, allowing you to focus on what you do best – serving your customers and growing your business. Our experienced team will expertly set up your products and listings, ensuring they are finely tuned for maximum visibility and sales. From inventory optimization to managing the flow of your store, we take care of the complexities, so you can efficiently pack and fulfill orders, ensuring seamless customer experiences. With Weboid's store management services by your side, you can rest assured that your ECommerce business is in capable hands. Let us handle the technicalities while you concentrate on building lasting customer relationships and achieving your business goals. Trust Weboid to streamline your ECommerce operations and unlock the full potential of your online store.",
      estimatedTime: "ongoing",
      cost: "This service add-on will be charged on a per hour, package or bundle basis",
      category: "Web Development",
      id: "ecommerce-store-management"
    },
    {
      title: "Online Advertising Management",
      imageUrl: "img/services/management.jpg",
      description:
        "Discover the true potential of online advertising with Weboid's comprehensive management services. Our expert team handles every aspect of your campaigns, from setup to optimization and monitoring, ensuring you achieve exceptional ROI. We tailor each campaign to your specific goals, maximizing your ad spend and reaching your target audience across platforms like Google Ads, Facebook Ads, and Instagram Ads. Experience the ease of seamless setup and expert optimization as we keep a watchful eye on campaign performance, providing data-driven insights to refine strategies. With Weboid by your side, you can elevate your online presence, driving qualified leads and remarkable business growth. Maximize your impact and unleash the power of online advertising today",
      estimatedTime: "1-2",
      cost: "This service will be charged on a per hour, package or bundle basis based on your needs",
      category: "Web Development",
      id: "online-advertising-management"
    },

  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    window.location.hash = service.id; // Update the URL hash
  };

  // Scroll to the correct service based on the URL hash when the page loads
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Get the hash from the URL without the '#'
    const serviceToOpen = services.find(service => service.id === hash);
    if (serviceToOpen) {
      setSelectedService(serviceToOpen);
    }
  }, []); // Empty dependency array means this runs once when the page loads

  return (
    <div>
      <Helmet>
        <title>Weboid's Services | Innovative Digital Solutions</title>
        <meta name="description" content="Discover Weboid's comprehensive range of innovative digital services. We specialise in web development, website design, ECommerce solutions, and more. Explore how we can empower your online presence."/>
        <meta name="keywords" content="Weboid Services, Digital services, Web development, Website design, E-commerce solutions, Innovative solutions, Online presence enhancement"/>

        <meta property="og:title" content="Weboid's Services | Innovative Digital Solutions"/>
        <meta property="og:description" content="Discover Weboid's comprehensive range of innovative digital services. We specialise in web development, website design, ECommerce solutions, and more. Explore how we can empower your online presence."/>
      </Helmet>

      <TitleHeader
        title="Our Services"
        subtitle="Discover the services we offer"
        backgroundImage="img/services.jpg"
      />

      <div className="py-16 px-6 sm:px-8 lg:px-10 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto">
          {/* Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} onClick={handleServiceClick} />
            ))}
          </div>

          {/* Service Details Section */}
          <ServiceDetails service={selectedService} />
        </div>
      </div>
      {/* FAQ / Help Desk Section */}
      <FAQCTASection />
    </div>
  );
};

export default ServicesPage;
