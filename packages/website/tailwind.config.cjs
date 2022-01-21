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
    extend: {
      colors: {
        brand: {
          500: '#4C89FF',
          600: '#2972FF',
        },
        secondary: {
          400: '#29DDFF',
        },
        gray: {
          100: '#FAFBFF',
          200: '#F5F7FF',
          400: '#DCE1F5',
          600: '#6F80AD',
          700: '#4C5C87',
          800: '#21315C',
          900: '#061A40',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
