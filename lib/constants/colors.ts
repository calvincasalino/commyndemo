/**
 * Color System for Dwelloo
 * Based on Figma design screens (Dwelloo-MVP-v1.0)
 */

export const colors = {
  // Brand colors - From Figma design
  brand: {
    primary: '#0276C1', // Main brand blue from Figma
    secondary: '#0284C7', // Darker blue
    light: '#E0F2FE', // Light blue background
    dark: '#0C4A6E', // Dark blue
    gray: '#949494', // Text gray from Figma
    surface: '#F5F5F5', // Background gray from Figma
  },

  // Base colors from Figma design tokens
  base: {
    foreground: '#0A0A0A', // base/foreground
    primaryForeground: '#FAFAFA', // base/primary-foreground (white text)
    mutedForeground: '#737373', // base/muted-foreground (gray text)
    muted: '#F5F5F5', // base/muted (backgrounds)
    input: '#E5E5E5', // base/input (border color)
  },

  // Dark overlays for modals/scrims
  darkOverlay: {
    base: '#002035', // Community voices modal gradient end
    gradient: {
      from: 'rgba(0, 32, 53, 0.3)', // Community voices gradient start
      to: '#002035', // Community voices gradient end
    },
  },

  // Scrim gradients for thumbnails
  scrim: {
    from: 'rgba(15, 23, 42, 0)', // Transparent start
    to: '#0F172A', // Dark slate end
  },

  // Neutral colors
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

  // Semantic colors
  semantic: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#0276C1',
  },

  // Base colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Overlay colors
  overlay: {
    light: 'rgba(255, 255, 255, 0.9)',
    medium: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.8)',
  },

  // Social media colors
  social: {
    facebook: '#1877F2',
    google: '#4285F4',
    instagram: '#E4405F',
    twitter: '#1DA1F2',
  },

  // Component-specific colors
  components: {
    border: '#E5E7EB',
    divider: '#F3F4F6',
    background: '#FFFFFF',
    backgroundSecondary: '#F9FAFB',
    text: '#111827',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    link: '#0276C1',
    linkHover: '#0284C7',
  },
} as const;

// Type exports
export type ColorToken = typeof colors;
export type BrandColor = keyof typeof colors.brand;
export type GrayShade = keyof typeof colors.gray;
export type SemanticColor = keyof typeof colors.semantic;