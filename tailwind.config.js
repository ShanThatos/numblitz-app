/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,hooks}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
}
