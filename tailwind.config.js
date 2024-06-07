/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#121212',
          800: '#1a1a1a',
          700: '#282828',
          600: '#3f3f3f',
          500: '#737373',
          400: '#a3a3a3',
        },
      },
    },
  },
  plugins: [],
};