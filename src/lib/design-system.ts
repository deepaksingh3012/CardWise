// Modern Minimal Design System for CardWise
// Clean, consistent, and accessible design tokens

// Colors - Minimal Dark Theme
export const colors = {
  // Primary brand colors
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },

  // Semantic colors
  background: {
    primary: '#0A0A0A',
    secondary: '#141414',
    tertiary: '#1A1A1A',
    elevated: '#212121',
  },

  surface: {
    default: '#1C1C1E',
    elevated: '#2C2C2E',
    glass: 'rgba(28, 28, 30, 0.8)',
  },

  text: {
    primary: '#FFFFFF',
    secondary: '#A1A1AA',
    tertiary: '#71717A',
    inverse: '#0A0A0A',
  },

  border: {
    default: 'rgba(255, 255, 255, 0.08)',
    subtle: 'rgba(255, 255, 255, 0.05)',
    focus: 'rgba(99, 102, 241, 0.5)',
  },

  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    secondary: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
    subtle: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
  },
};

// Typography - Modern & Accessible
export const typography = {
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },

  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },

  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },
};

// Spacing - Consistent 4px base system
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  '3xl': '3rem',   // 48px
  '4xl': '4rem',   // 64px
};

// Border Radius - Modern & Consistent
export const borderRadius = {
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  full: '9999px',
};

// Shadows - Subtle & Modern
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px rgba(0, 0, 0, 0.4)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.5)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.6)',
  glow: {
    primary: '0 0 20px rgba(99, 102, 241, 0.3)',
    secondary: '0 0 20px rgba(139, 92, 246, 0.3)',
  },
};

// Glassmorphism - Clean & Modern
export const glassmorphism = {
  base: 'backdrop-blur-xl bg-[rgba(28,28,30,0.8)]',
  light: 'backdrop-blur-lg bg-[rgba(28,28,30,0.6)]',
  heavy: 'backdrop-blur-2xl bg-[rgba(28,28,30,0.9)]',
};

// Animation - Smooth & Consistent
export const animation = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '400ms',
  },

  easing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  transitions: {
    default: 'transition-all duration-200 ease-out',
    smooth: 'transition-all duration-300 ease-out',
    fast: 'transition-all duration-150 ease-out',
  },
};

// Touch target sizes for mobile
export const touchTargets = {
  min: '44px',
  comfortable: '48px',
  large: '52px',
};

// Z-index scale
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 100,
  popover: 200,
  tooltip: 300,
};

// Component-specific tokens
export const button = {
  height: {
    sm: '36px',
    md: '44px',
    lg: '52px',
  },
  padding: {
    sm: '0.5rem 1rem',
    md: '0.75rem 1.5rem',
    lg: '1rem 2rem',
  },
};

export const input = {
  height: {
    sm: '36px',
    md: '44px',
    lg: '52px',
  },
  padding: {
    sm: '0.5rem 0.75rem',
    md: '0.75rem 1rem',
    lg: '1rem 1.25rem',
  },
};

export const card = {
  padding: {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
  },
  gap: {
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
  },
};