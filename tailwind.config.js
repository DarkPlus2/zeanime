module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        accent: '#00FFD1',
        bg: '#0B0B0F'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
