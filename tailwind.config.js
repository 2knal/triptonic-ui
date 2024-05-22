/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      'bricolage': ['bricolage'],
      'rethink': ['rethink']
    },
    colors: {
      'powder-gold': '#E8A13A',
      'orangish': '#FFA977',
      'sageish': '#9FD29D',
      'yellowy': '#FFD874',
      'bluei': '#AFE1F0',
      'egg-white': '#FFF7F5',
      'cute-purple': '#EAD1FF',
      'reddish': '#FA796B',
      'darker-text': '#374259',
      'dark-text': '#545B77',
      'white': '#FFFFFF',
      'gray': '#9CA3AF',
      'gray-light': '#C4C4C4'
    },
    extend: {},
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
