/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./client/views/**/*.handlebars", "./client/views/*.handlebars"], // Adjust based on your EJS file locations
  theme: {
    extend: {
      colors: {
        google: {
          "text-gray": "#3c4043",
          "button-blue": "#1a73e8",
          "button-blue-hover": "#5195ee",
          "button-dark": "#202124",
          "button-dark-hover": "#555658",
          "button-border-light": "#dadce0",
          "logo-blue": "#4285f4",
          "logo-green": "#34a853",
          "logo-yellow": "#fbbc05",
          "logo-red": "#ea4335",
        },
      },
    },
  },
  plugins: [],
};

export default config;
