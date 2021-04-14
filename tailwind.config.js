const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: [
    "./src/components/GameOfLife.js",
    "./src/components/Tutorial.js",
    "./src/components/TutorialButton.js",
    "./src/components/WelcomeScreen.js",
    "./src/components/WikiButton.js",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "555px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        header: ["Nokian", "sans-serif"],
        text: ["McFont", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
