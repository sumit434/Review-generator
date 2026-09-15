/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#181715',
          soft: '#4A4744',
          faint: '#8B8781',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F6F5F2',
          line: '#EAE7E0',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          ink: 'var(--accent-ink)',
        },
        star: '#F5A524',
      },
      fontFamily: {
        display: ['"Manrope"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(24,23,21,0.04), 0 8px 24px -12px rgba(24,23,21,0.12)',
        pop: '0 10px 30px -10px rgba(24,23,21,0.22)',
      },
      spacing: {
        safe: 'env(safe-area-inset-bottom)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.18)' },
          '100%': { transform: 'scale(1)' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        checkPop: {
          '0%': { opacity: '0', transform: 'scale(0.8) translateY(4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        pop: 'pop 0.28s cubic-bezier(.34,1.56,.64,1)',
        riseIn: 'riseIn 0.28s ease-out',
        checkPop: 'checkPop 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
