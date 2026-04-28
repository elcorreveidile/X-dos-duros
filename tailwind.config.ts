import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        foreground: '#FFFFFF',
        muted: '#CCCCCC',
        neon: '#39FF14',
        'neon-dim': '#2BC510',
        border: '#222222',
        card: '#111111',
        'card-hover': '#1A1A1A',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'flicker': 'flicker 3s linear infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'count-tick': 'countTick 0.2s ease-in-out',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 5px #39FF14, 0 0 10px #39FF14' },
          '50%': { boxShadow: '0 0 20px #39FF14, 0 0 40px #39FF14, 0 0 60px #39FF14' },
        },
        flicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%': { opacity: '0.8' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.9' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        countTick: {
          '0%': { transform: 'scale(1.1)', color: '#39FF14' },
          '100%': { transform: 'scale(1)', color: 'inherit' },
        },
      },
    },
  },
  plugins: [],
}

export default config
