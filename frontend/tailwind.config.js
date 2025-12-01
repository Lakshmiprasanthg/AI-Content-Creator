/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'deep-indigo': '#2C3E50',
        'neo-mint': '#C7E9C0',
        'soft-white': '#F9FAFB',
        'charcoal': '#333333',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
