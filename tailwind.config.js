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
      'sageish': '#62B273',
      'yellowy': '#FFD874',
      'bluei': '#B4D2FF',
      'egg-white': '#F5ECE9',
      'cute-purple': '#EAD1FF',
      'reddish': '#E8674D',
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
