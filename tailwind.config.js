const colors = require('tailwindcss/colors')

module.exports = {
//  purge: ['.src/pages/**/*.{js,ts,jsx,tsx}', '.src/components/**/*.{js,ts,jsx,tsx}', '.src/layouts/**/*.{js,ts,jsx,tsx}'],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.warmGray,
      red: colors.red,
    },

    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      'screen-3/4': '75vh',
      'screen': '100vh',
     }
  },
  variants: {
    borderWidth: ['responsive', 'hover', 'focus'],
    extend: {
      backgroundColor: ['odd'],
    },
  },
  plugins: []
}
