/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        gold: "rgb(252, 252, 72)", // Add your custom color here
      },
      fontFamily: {
        title: ["Luckiest Guy", "cursive"],
        subtitle: ["Bakbak One", "cursive"],
      },
    },
  },
  plugins: [],
};
