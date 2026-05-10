/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          hover: '#4338ca',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.45)',
          hover: 'rgba(255, 255, 255, 0.65)',
          border: 'rgba(255, 255, 255, 0.6)'
        }
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards',
        float: 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
