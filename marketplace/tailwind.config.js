/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, js, ts, vue}", 
    "./src/**/*"
],
  theme: {
    extend: {
      backgroundImage:{
        "background" : "url('../src/assets/elephant2.jpeg')"
      }
    },
  },
  plugins: [],
}