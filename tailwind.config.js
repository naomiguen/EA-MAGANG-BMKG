/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:{
          50: '#f0f7ff',  
          100: '#bfe2ff', 
          200: '#99d4ff', 
          300: '#80c6ff', 
          400: '#3e9cff',
          500: '#0064b5', //(WARNA UTAMA / BRAND)
          600: '#00569b', // (Hover State / Tombol Tekan)
          700: '#00467f', // (Navbar / Footer / Teks Gelap)
          800: '#003660', 
          900: '#002541', 
          950: '#001325',
        },
        secondary:{
          500: '#fbbf24',
          600: '#d97706',
        }
      },
      fontFamily:{
        sans: ['Iter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}