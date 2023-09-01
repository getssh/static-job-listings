/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        league: ['League', 'sans-serif'],
      },
      colors: {
        primary: 'hsl(var(--primary) / <alpha-value>)',
        lighbg: 'hsl(var(--light-gray-bg) / <alpha-value>)',
        lightfiler: 'hsl(var(--light-gray-filter) / <alpha-value>)',
        darkgray: 'hsl(var(--dark-gray) / <alpha-value>)',
        verydark: 'hsl(var(--very-dark-gray) / <alpha-value>)',
      },
    },
  plugins: [],
}}
