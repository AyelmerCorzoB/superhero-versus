/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'marvel-primary': '#ed1d24',
        'marvel-secondary': '#b11a1f',
        'marvel-accent': '#f0131e',
        'dc-primary': '#0476f2',
        'dc-secondary': '#0266d6',
        'dc-accent': '#034ea2',
        'neutral-dark': '#121212',
        'neutral-medium': '#2a2a2a',
        'neutral-light': '#e0e0e0',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse': 'pulse 2s infinite',
        'glow': 'glow 1.5s infinite',
        'battle-pulse': 'battlePulse 1s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)' },
          '100%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)' },
        },
        battlePulse: {
          '0%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(1.1)' },
          '20%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};