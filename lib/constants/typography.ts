/**
 * Typography System for Dwelloo
 * Based on iOS/SF Pro Display system font
 */

export const typography = {
  // Font families
  fontFamily: {
    sans: [
      '-apple-system',
      'BlinkMacSystemFont',
      'SF Pro Display',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(', '),
    mono: [
      'SF Mono',
      'Monaco',
      'Consolas',
      'Liberation Mono',
      'Courier New',
      'monospace',
    ].join(', '),
  },

  // Font sizes
  fontSize: {
    xxs: '0.625rem',   // 10px
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
  },

  // Font weights
  fontWeight: {
    thin: '100',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
    black: '900',
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Text styles - Tailwind class combinations
  textStyles: {
    // Headings
    h1: 'text-4xl font-bold leading-tight',
    h2: 'text-3xl font-semibold leading-tight',
    h3: 'text-2xl font-semibold leading-snug',
    h4: 'text-xl font-medium leading-snug',
    h5: 'text-lg font-medium leading-normal',
    h6: 'text-base font-semibold leading-normal',

    // Body text
    body: 'text-base font-regular leading-normal',
    bodySmall: 'text-sm font-regular leading-normal',
    bodyLarge: 'text-lg font-regular leading-relaxed',

    // UI text
    button: 'text-base font-medium',
    buttonSmall: 'text-sm font-medium',
    label: 'text-sm font-medium',
    caption: 'text-xs font-regular',
    overline: 'text-xs font-semibold uppercase tracking-wider',

    // Special text
    brand: 'text-2xl font-bold lowercase', // for "dwelloo." logo
    price: 'text-xl font-semibold',
    badge: 'text-xs font-medium',
    link: 'text-base font-regular underline',
  },
} as const;

// Type exports
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type TextStyle = keyof typeof typography.textStyles;