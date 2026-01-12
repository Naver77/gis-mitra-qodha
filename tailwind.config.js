/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.php",
    "./public/**/*.html",
    "./public/assets/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f79c54',
        'primary-dark': '#e67e2d',
        'primary-light': '#fce7d9',
        secondary: '#1f2937',
      },
    },
  },
  plugins: [],
}
