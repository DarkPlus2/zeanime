/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        zbg: '#071024',
        zcard: '#0b1220',
        zaccent: '#6b21a8',
      }
    },
  },
  plugins: [],
}
