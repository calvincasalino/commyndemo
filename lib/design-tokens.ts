/**
 * Design Tokens for Dwelloo
 * Central source of truth for all design system values
 */

export { colors } from './constants/colors';
export { typography } from './constants/typography';
export { spacing } from './constants/spacing';
export { animations } from './constants/animations';

// Re-export commonly used tokens for convenience
export const tokens = {
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '12px',
    '2xl': '16px',
    '3xl': '20px',
    full: '9999px',
  },
  shadows: {
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
    modal: '0 4px 20px rgba(0, 0, 0, 0.15)',
    button: '0 2px 4px rgba(14, 165, 233, 0.24)',
    navbar: '0 -1px 3px rgba(0, 0, 0, 0.05)',
  },
  breakpoints: {
    xs: '375px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    fixed: 30,
    modalBackdrop: 40,
    modal: 50,
    popover: 60,
    tooltip: 70,
  },
} as const;