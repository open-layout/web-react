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
			olayoutBlue: '#2f3448',
			olayoutPeach: '#ffd5bd',
			olayoutBlueLight: '#474f6e',
			olayoutBlueDark: '#3F4763',
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
  