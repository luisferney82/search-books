// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        purple: {
          100: '#F3E5F5',
          800: '#6A1B9A',
        },
        orange: {
          500: '#FF9800',
        },
        blue: {
          500: '#2196F3',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}