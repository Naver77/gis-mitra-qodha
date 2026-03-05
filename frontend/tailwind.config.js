/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-gold': '#d4af37', // Warna emas khas Qodha
        'brand-green': '#15803d', // Warna hijau khas Qodha
      }
    },
  },
  plugins: [],
}