/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  presets: [],
  darkMode: 'media', // or 'class'
  theme: {
    screens: {
      sm: '400px',
      md: '768px',
      al: '800px',
      lg: '976px',
      xl: '1440px',
      '2xl': '1800px',
    },
    extend: {
      colors: {
        brand: "#909090",
        dark: "#252525",
        mid: "#BBBBBB",
        light: "#FFFFFF",
        overlay: "#00000077",
      },
      fontFamily: {
        shoulders: ['Big Shoulders Text', 'cursive'],
        bebas: ['Bebas Neue', 'cursive'],
      },
      boxShadow: {
        // 'card': '0 12px 12px -3px rgba(0, 0, 0, 0.3)',
        'card': '0px 5px 15px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  
  plugins: [],
}
