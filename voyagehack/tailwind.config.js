/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Tailwind should scan all React components
  ],
  theme: {
    extend: {
      colors: {
        travelGreen: '#6CCF6C',  // Example green for travel
        travelBlue: '#00A9E0',   // Example blue for ocean/sky
        travelOrange: '#FF9F00',  // Example accent color (sunset tones)
      },
    },
  },
  plugins: [],
};


