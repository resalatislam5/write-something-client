/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
   extend:{
      colors: {
        'cool-mint': '#E8F3F3',
        'dark-cyan': '#00AAA1',
        'erie-black': '#222222',
        'davy-gray': '#555555'
      },
   }
  },
  plugins: [],
}
