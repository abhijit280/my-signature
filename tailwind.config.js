/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'cursive': ['Dancing Script', 'cursive'],
        'handwriting': ['Kalam', 'cursive'],
        'signature': ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}