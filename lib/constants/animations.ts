/**
 * Animation System for Dwelloo
 * Smooth, native-feeling animations
 */

export const animations = {
  // Timing functions
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    // iOS-like easing
    ios: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    // Material Design easing
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
    // Custom spring-like easing
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },

  // Durations
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },

  // Keyframe animations
  keyframes: {
    // Heart/like animation
    heart: {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.2)' },
      '100%': { transform: 'scale(1)' },
    },
    // Slide up from bottom
    slideUp: {
      '0%': { transform: 'translateY(100%)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    // Slide down from top
    slideDown: {
      '0%': { transform: 'translateY(-100%)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    // Fade in
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    // Fade out
    fadeOut: {
      '0%': { opacity: '1' },
      '100%': { opacity: '0' },
    },
    // Scale in
    scaleIn: {
      '0%': { transform: 'scale(0.9)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    // Pulse
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
    // Bounce
    bounce: {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-25%)' },
    },
    // Spin
    spin: {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
    // Skeleton loading
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
  },

  // Transition presets
  transitions: {
    all: 'all 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    colors: 'color, background-color, border-color 150ms ease',
    opacity: 'opacity 300ms ease',
    transform: 'transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    shadow: 'box-shadow 300ms ease',
    // Button transitions
    button: 'all 150ms ease',
    // Modal transitions
    modal: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    // Navigation transitions
    nav: 'all 200ms ease-out',
  },

  // Animation classes
  classes: {
    // Heart/like animation
    heart: 'animate-[heart_0.3s_ease-in-out]',
    // Slide animations
    slideUp: 'animate-[slideUp_0.3s_ease-out]',
    slideDown: 'animate-[slideDown_0.3s_ease-out]',
    // Fade animations
    fadeIn: 'animate-[fadeIn_0.2s_ease-out]',
    fadeOut: 'animate-[fadeOut_0.2s_ease-out]',
    // Scale animations
    scaleIn: 'animate-[scaleIn_0.2s_ease-out]',
    // Loading animations
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
    shimmer: 'animate-[shimmer_2s_linear_infinite]',
  },
} as const;

// Type exports
export type EasingFunction = keyof typeof animations.easing;
export type Duration = keyof typeof animations.duration;
export type AnimationClass = keyof typeof animations.classes;