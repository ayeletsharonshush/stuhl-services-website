/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './index.tsx', './App.tsx', './constants.tsx', './components/**/*.{ts,tsx}', './data/**/*.ts'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0F2557',
          red: '#DC2626',
          // Darkened from #B8860B so gold text on light backgrounds (even on the
          // tinted pills) and white text on gold buttons pass WCAG AA.
          gold: '#8A6508',
          // Gold for text and icons on navy, where the dark gold is too dim.
          'gold-light': '#D4A017',
          // Darkened from #0891B2 for the same reason (5.4:1 on white).
          cyan: '#0E7490',
          cream: '#FAF8F5',
          charcoal: '#1A1A2E',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-right': 'slideRight 0.8s ease-out forwards',
        counter: 'counter 2s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
};
