/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
	extend: {
		fontFamily: {
		poppins: ['Poppins', 'sans-serif'],
		lato: ['Lato', 'sans-serif']
		},
		colors: {
			code: '#23262d',
			title: '#6633ef',
		},	
		keyframes: {
			bounce: {
			'0%, 100%': { transform: 'translateY(-5%)' },
			'50%': { transform: 'translateY(0%)' }
			}
		},
	},
	},
	plugins: [],
  }
  