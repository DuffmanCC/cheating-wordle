/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        17: "4.25rem",
      },
      fontSize: {
        "2xs": ".625rem",
      },
    },
  },
  plugins: [],
};
