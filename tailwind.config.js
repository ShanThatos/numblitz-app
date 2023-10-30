const nativewind = require("nativewind/tailwind/css")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,contexts,hooks}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#FFF2F3",
          50: "#FFF2F3",
          100: "#FFDEE0",
          200: "#FFB5BB",
          300: "#FF8C95",
          400: "#FF636F",
          500: "#FF3A4A",
          600: "#FF1224",
          700: "#E80012",
          800: "#BF000F",
          900: "#96000C",
          950: "#82000A",
        },
        icon: {
          DEFAULT: "#E49D8E",
          inactive: "#8E8E8F",
          darker: "#DB7D69",
        },
      },
    },
  },
  plugins: [nativewind],
}
