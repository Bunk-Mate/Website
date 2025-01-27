/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic':
               'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
         animation: {
            'infinite-scroll-y': 'infinite-scroll-y 25s linear infinite',
            'infinite-scroll-x': 'infinite-scroll-x 25s linear infinite',
         },
         keyframes: {
            'infinite-scroll-y': {
               from: { transform: 'translateY(0)' },
               to: { transform: 'translateY(-164%)' },
            },
            'infinite-scroll-x': {
               from: { transform: 'translateX(0)' },
               to: { transform: 'translateX(-50%)' },
            },
         },
      },
   },
   plugins: [],
};
