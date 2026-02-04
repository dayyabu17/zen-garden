/**
 * Zen Garden Theme Configuration
 * Traditional Japanese aesthetic with Sumi-e, Washi, and Kintsugi elements
 */

// Color Palette
export const THEME_COLORS = {
  // Primary - Sumi (Japanese ink black)
  sumi: {
    dark: '#1a1a1a',
    light: '#2a2a2a',
  },
  
  // Secondary - Washi (handmade paper white)
  washi: {
    cream: '#f2f0e9',
    light: '#faf8f3',
    dust: '#ede9e0',
  },
  
  // Accent - Kintsugi (gold seams)
  kintsugi: {
    primary: '#af964b',
    light: '#c9ad70',
    dark: '#8b7a3d',
  },
  
  // Seasonal - Natural ink colors
  ink: {
    navy: '#2c3e5c',
    sage: '#4a5859',
    rust: '#6b4e4e',
    charcoal: '#5c5552',
  },
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: {
    serif: "'Noto Serif JP', 'Noto Serif', serif",
    sans: "'Inter', 'Segoe UI', sans-serif",
  },
  
  sizes: {
    h1: { size: '3.5rem', weight: 300, spacing: '0.15em' },
    h2: { size: '2.5rem', weight: 300, spacing: '0.1em' },
    h3: { size: '1.75rem', weight: 400, spacing: '0.08em' },
    body: { size: '1rem', weight: 400, spacing: '0.02em' },
    small: { size: '0.875rem', weight: 400, spacing: '0.05em' },
    tiny: { size: '0.75rem', weight: 400, spacing: '0.1em' },
  },
};

// Spacing
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
};

// Shadows
export const SHADOWS = {
  sm: '0 2px 4px rgba(26, 26, 26, 0.1)',
  md: '0 4px 12px rgba(26, 26, 26, 0.15)',
  lg: '0 8px 24px rgba(26, 26, 26, 0.2)',
  inner: 'inset 0 2px 4px rgba(26, 26, 26, 0.05)',
};

export default {
  THEME_COLORS,
  TYPOGRAPHY,
  SPACING,
  SHADOWS,
};
