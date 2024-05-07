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
      'egg-white': '#F5ECE9',
      'cute-purple': '#EAD1FF',
      'reddish': '#FA796B',
      'darker-text': '#374259',
      'dark-text': '#545B77',
    },
    extend: {},
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
