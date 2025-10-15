/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7f3dff",
        secondary: "#6b7280",
        panel: "#1f1f1f",
        surface: "#121212",
        accent: "#ff3e00",
        "text-primary": "#ffffff",
        "text-secondary": "#d1d5db",
      },
    },
  },
  plugins: [],
};
