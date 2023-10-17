/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,contexts,hooks}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
}
