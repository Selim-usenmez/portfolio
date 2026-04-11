import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: '#030303',
        surface: 'rgba(255,255,255,0.03)',
        border: 'rgba(255,255,255,0.07)',
        'text-1': '#f1f5f9',
        'text-2': '#64748b',
        accent: '#818cf8',
        'accent-2': '#c084fc',
        'accent-3': '#22d3ee',
      },
      animation: {
        'aurora-1': 'aurora1 12s ease-in-out infinite',
        'aurora-2': 'aurora2 15s ease-in-out infinite',
        'aurora-3': 'aurora3 18s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 22s linear infinite',
      },
      keyframes: {
        aurora1: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(3%, -3%) scale(1.05)' },
          '66%': { transform: 'translate(-2%, 2%) scale(0.97)' },
        },
        aurora2: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(-4%, 2%) scale(1.08)' },
          '66%': { transform: 'translate(3%, -3%) scale(0.95)' },
        },
        aurora3: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(2%, 3%) scale(0.98)' },
          '66%': { transform: 'translate(-3%, -2%) scale(1.06)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
