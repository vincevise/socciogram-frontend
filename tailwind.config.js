/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend:{
      fontFamily:{ 
        handrawn: ["'Delicious Handrawn', cursive", ...defaultTheme.fontFamily.sans],
        roboto:["'Roboto', sans-serif", ...defaultTheme.fontFamily.sans]
      }, 
      colors:{
        'comp-theme':'#fbc56f',
        'main-theme':'#2c6150'
      }
    },
    screens: {
      'sm':'480px',
      'md':'768px',
      'lg':'976px',
      'xl':'1440px'
    },
    animation: {
      fade: 'fadeOut 2s ease-in-out',
    },

    // that is actual animation
    keyframes: theme => ({
      fadeOut: {
        '0%': { opacity: 0},
        '100%': { opacity: 1},
      },
    }),
  },
  plugins: [],
}
