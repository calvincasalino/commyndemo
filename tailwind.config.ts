import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',   // iPhone SE/8
      'sm': '390px',   // iPhone 14
      'md': '430px',   // iPhone Pro Max
      'lg': '768px',   // Tablet
      'xl': '1024px',  // Desktop
      '2xl': '1280px', // Large desktop
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Neutral colors from Figma
        neutral: {
          400: '#9CA3AF',              // From Figma's neutral/400
        },
        // Extended gray scale for UI
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        geist: ['var(--font-geist-sans)'],
      },
      fontSize: {
        'xxs': '0.625rem', // 10px
        'xs': '0.75rem',   // 12px
        'sm': '0.875rem',  // 14px
        'base': '1rem',    // 16px
        'lg': '1.125rem',  // 18px
        'xl': '1.25rem',   // 20px
        '2xl': '1.5rem',   // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem',  // 36px
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'modal': '0 4px 20px rgba(0, 0, 0, 0.15)',
        'button': '0 2px 4px rgba(14, 165, 233, 0.24)',
      },
      animation: {
        'heart': 'heart 0.3s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
      keyframes: {
        heart: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-overlay': 'linear-gradient(to top, #0F172A 0%, transparent 100%)',
        'gradient-overlay-60': 'linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
