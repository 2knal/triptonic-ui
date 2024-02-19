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
      'powder-gold': '#FFC674',
      'mintish': '#A4F3C4',
      'egg-white': '#FFF2EE',
      'cute-purple': '#ECC5FB',
      'cute-pink': '#FF72AA',
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
