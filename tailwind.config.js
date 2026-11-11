import animate from 'tailwindcss-animate'

/** Helper: color backed by a space-separated RGB CSS variable (supports /opacity). */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Site tokens (see src/index.css)
        background: v('background'),
        surface: v('surface'),
        border: v('border'),
        card: { DEFAULT: v('card'), foreground: v('foreground') },
        accent: { DEFAULT: '#6366f1', foreground: v('accent-foreground') },
        'accent-dim': '#4f46e5',

        // shadcn / 21st.dev aliases, mapped onto the site palette
        foreground: v('foreground'),
        muted: { DEFAULT: v('muted'), foreground: v('muted-foreground') },
        primary: { DEFAULT: v('primary'), foreground: v('primary-foreground') },
        secondary: { DEFAULT: v('secondary'), foreground: v('secondary-foreground') },
        popover: { DEFAULT: v('popover'), foreground: v('foreground') },
        destructive: { DEFAULT: v('destructive'), foreground: v('destructive-foreground') },
        input: v('input'),
        ring: v('ring'),
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'blink': 'blink 1s step-end infinite',
        'drift': 'drift 12s ease-in-out infinite',
        'drift-slow': 'drift 18s ease-in-out infinite reverse',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [animate],
}
