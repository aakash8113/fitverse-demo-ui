export const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#0066cc',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    background: '#ffffff',
    text: '#333333',
    lightGray: '#f5f5f5',
    mediumGray: '#999999',
    darkGray: '#666666',
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 2px 6px rgba(0,0,0,0.15)',
    lg: '0 4px 12px rgba(0,0,0,0.1)',
    xl: '0 8px 24px rgba(0,0,0,0.15)',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
} as const;

// Type for the theme
export type Theme = typeof theme;

// Utility types for working with theme values
export type ColorKeys = keyof typeof theme.colors;
export type SpacingKeys = keyof typeof theme.spacing;
export type BreakpointKeys = keyof typeof theme.breakpoints;

// Function to get theme values with TypeScript support
export const getThemeValue = <T extends keyof Theme, K extends keyof Theme[T]>(
  category: T,
  key: K
): Theme[T][K] => theme[category][key];