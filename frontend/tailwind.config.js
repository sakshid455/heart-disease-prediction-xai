/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Distinctive Warm Ivory & Deep Forest Healthcare Research Palette
        ivory: {
          DEFAULT: '#F7F4ED',
          subtle: '#FAF8F4',
          muted: '#EFECE3',
        },
        sage: {
          DEFAULT: '#E8EEE8',
          subtle: '#F0F5F0',
          dark: '#D8E2D8',
        },
        forest: {
          DEFAULT: '#17352D',
          hover: '#102721',
          light: '#23493E',
          muted: '#2A554A',
        },
        charcoal: {
          DEFAULT: '#28302D',
          muted: '#4A5550',
          light: '#6E7A75',
        },
        emerald: {
          DEFAULT: '#3D8068',
          hover: '#326B57',
          light: '#4C9C80',
          subtle: '#EAF3EF',
        },
        coral: {
          DEFAULT: '#C87868',
          subtle: '#FAEEEB',
          dark: '#B06050',
        },
        sand: {
          DEFAULT: '#D9C7A5',
          subtle: '#F3EDE1',
          dark: '#C4AE88',
        },
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#102A43',
          950: '#0B1D2E',
        },
        crimson: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
          700: '#BE123C',
          800: '#9F1239',
          900: '#881337',
          950: '#4C0519',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      maxWidth: {
        'content': '1340px',
        'reading': '760px',
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(23, 53, 45, 0.06), 0 1px 4px -1px rgba(23, 53, 45, 0.04)',
        'elevated': '0 12px 28px -6px rgba(23, 53, 45, 0.12), 0 4px 12px -2px rgba(23, 53, 45, 0.06)',
      },
      keyframes: {
        softPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.06)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.04)' },
          '56%': { transform: 'scale(1)' },
        },
        pulseRing: {
          '0%': { opacity: '0.6', transform: 'translate(-50%, -50%) scale(0.8)' },
          '100%': { opacity: '0', transform: 'translate(-50%, -50%) scale(1.4)' },
        },
        fadeSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'soft-pulse': 'softPulse 6s ease-in-out infinite',
        'float-y': 'floatY 4s ease-in-out infinite',
        'heartbeat': 'heartbeat 2s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'fade-slide-up': 'fadeSlideUp 0.8s ease-out both',
      },
    },
  },
  plugins: [],
}
