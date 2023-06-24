/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#effafb',
        secondary: '#64babb',
        keyword: '#5ea4a3'
      }
    }
  },
  plugins: []
}
