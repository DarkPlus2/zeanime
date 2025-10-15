/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7f3dff",          // main purple
        secondary: "#6b7280",        // gray secondary
        panel: "#1f1f1f",            // panel backgrounds
        surface: "#121212",          // page backgrounds
        accent: "#ff3e00",           // highlights
        "text-primary": "#ffffff",
        "text-secondary": "#d1d5db",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
