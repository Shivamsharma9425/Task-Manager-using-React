/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      exm:"460px",
      sm: '640px',
      md: '768px',
      lg: '1024px',
      llg: '1094px',
      xl: '1280px',
      xxl: '1380px',
      lxl: '1711px',
    },
    extend: {},
  },
  plugins: [],
}