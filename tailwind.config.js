/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#1f9bf0",
        },
        blue: "#1f9bf0",
        green: "#05b97c",
        pink: "#f9197f",
        yellow: "#ffd401",
        purple: "#7956ff",
        orange: "#ff7a00",
        externalRed: "#ff0000",
        white: "#ffffff",
        black: "#000000",
        grayMain: "#f2f2f2",
        darkGray: "#333333",
        lightGray: "#999999",
        gray: {
          main: "#71767B",
        },
      },
      spacing: {
        small: 42,
        medium: 64,
        large: 128,
      },
    },
  },

  plugins: [],
};
