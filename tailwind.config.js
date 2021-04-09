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
    extend: {
      fontFamily: {
        header: ["Nokian"],
        text: ["McFont"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
