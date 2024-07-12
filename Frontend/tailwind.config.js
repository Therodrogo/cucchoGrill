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
      fondo: '#DDBD8C',
      primario:"#1F1120",
      primary:"#1F1120",
      otro:"#DD79E5"
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
  })],

}