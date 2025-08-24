/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        primary: {
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6'
        },
        secondary: {
          500: '#EC4899',
          600: '#DB2777'
        },
        accent: {
          500: '#06B6D4',
          600: '#0891B2'
        },
        surface: '#1E1B29',
        background: '#0F0E13'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)'
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.6), 0 0 60px rgba(236, 72, 153, 0.3)'
          }
        }
      }
    },
  },
  plugins: [],
}