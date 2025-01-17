/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        title: ['Ahkio', 'sans-serif'], // Add Ahkio font for titles
        body: ['Open Sans', 'sans-serif'], // Use Open Sans for body text
      },
    },
  },
  plugins: [],
};

