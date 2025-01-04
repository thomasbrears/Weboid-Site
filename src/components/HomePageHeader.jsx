import React from "react";
import Typewriter from "typewriter-effect";

const HomePageHeader = ({ backgroundImage }) => {
  return (
    <div
      className="relative text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className="bg-black bg-opacity-60 h-full flex flex-col justify-center items-center">
        {/* Main Header Text */}
        <div className="text-center px-6 sm:px-8 lg:px-10">
          <h3
            className="text-xl md:text-2xl font-sans font-semibold"
          >
            <span>Nau mai, haere mai ki Weboid</span>
          </h3>
          <h1
            className="text-4xl md:text-6xl font-bold mt-4"
          >
            Welcome to WEBOID
          </h1>
          <br />

          {/* Combined Text with Typewriter Effect */}
          <h3
            className="text-lg md:text-2xl mt-4 flex items-center justify-center"
            style={{
              color: "#fff",
            }}
          >
            {/* Typewriter Effect */}
            <span className="ml-2">
              <Typewriter
                options={{
                  strings: [
                    "We're proud to be creators of amazing websites!",
                    "We're proud to be 100% Kiwi owned & operated!",
                    "We're proud to build cost-effective & stunning websites!",
                    "We're proud to deliver responsive & user-friendly websites!",
                    "We're proud to build efficient & beautiful websites!",
                    "We're proud to handcraft and code our sites!",
                    "We're proud to develop stunning sites that come alive!",
                    "We're proud to turn ideas into digital success!",
                    "We're proud to support your business with innovative web solutions!",
                    "We're proud to bring your online vision to life!",
                    "We're proud to create eye-catching websites!",
                    "We're proud to build websites that drive results!",
                    "We're proud to craft websites that stand out!",
                    "We're proud to be your digital partner!",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 60, // Typing speed (ms)
                  deleteSpeed: 20, // Deleting speed (ms)
                  pauseFor: 1000, // Pause between text (ms)
                  cursor: "|", // Cursor character
                }}
              />
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HomePageHeader;
