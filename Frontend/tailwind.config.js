/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    colors: {
      transparent: 'transparent',
      fondo: '#DDBD8C',
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
  })],

}