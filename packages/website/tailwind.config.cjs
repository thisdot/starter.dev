module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Sora', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
