/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        raleway: ['Raleway', 'Helvetica'],
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        code: '#23262d',
        title: '#6633ef',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0%)' },
        },
      },
      rotate: {
        full: '360deg',
      },
      blur: {
        xs: '1px',
      },
    },
  },
  plugins: [],
};
