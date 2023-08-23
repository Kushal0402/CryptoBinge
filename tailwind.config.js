/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4682A9",
        secondary: "#749BC2",
        ltPrimary: "#91C8E4",
        ltSecondary: "#F6F4EB",
      },

      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [],
};
