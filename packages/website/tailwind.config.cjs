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
          100: '#E9F1FF',
          200: '#699CFF',
          500: '#2C6FF2',
          600: '#0057FF',
        },
        secondary: {
          400: '#95DFFF',
        },
        gray: {
          100: '#FAFBFF',
          200: '#F5F7FF',
          300: '#EDF0FC',
          400: '#DCE1F5',
          500: '#A1ADD4',
          600: '#6F80AD',
          650: '#5C6FA3',
          700: '#4C5C87',
          750: '#354570',
          800: '#21315C',
          900: '#061A40',
        },
        error: {
          light: '#FEF1F2',
          medium: '#FDE2E4',
          base: '#F22F44',
        },
        warning: {
          light: '#FFFCF5',
          medium: '#FFFAEB',
          base: '#FDB022',
        },
        success: {
          light: '#F4FBF5',
          medium: '#DEF2E0',
          base: '#22C55E',
        },
      },
      fontSize: {
        sm: ['16px', '1.28'],
        base: ['18px', '1.32'],
        lg: ['20px', '1.22'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
