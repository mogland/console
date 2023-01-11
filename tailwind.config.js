/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.tsx",
    "./src/pages/**/*.tsx",
    "./src/App.tsx",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
  },
}