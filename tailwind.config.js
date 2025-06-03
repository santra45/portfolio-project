/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50, #f0f7ff)',
          100: 'var(--color-primary-100, #e0efff)',
          200: 'var(--color-primary-200, #c2dfff)',
          300: 'var(--color-primary-300, #99ccff)',
          400: 'var(--color-primary-400, #66b3ff)',
          500: 'var(--color-primary-500, #007bff)',
          600: 'var(--color-primary-600, #0062cc)',
          700: 'var(--color-primary-700, #004999)',
          800: 'var(--color-primary-800, #003166)',
          900: 'var(--color-primary-900, #001833)',
        },
        secondary: {
          50: 'var(--color-secondary-50, #f5f5f5)',
          100: 'var(--color-secondary-100, #ebebeb)',
          200: 'var(--color-secondary-200, #d6d6d6)',
          300: 'var(--color-secondary-300, #c2c2c2)',
          400: 'var(--color-secondary-400, #9e9e9e)',
          500: 'var(--color-secondary-500, #7a7a7a)',
          600: 'var(--color-secondary-600, #565656)',
          700: 'var(--color-secondary-700, #424242)',
          800: 'var(--color-secondary-800, #333333)',
          900: 'var(--color-secondary-900, #222222)',
        },
        dark: 'var(--color-dark, #222222)',
        light: 'var(--color-light, #ffffff)',
        neutral: 'var(--color-neutral, #f5f5f5)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
