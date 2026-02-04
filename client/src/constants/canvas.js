// Canvas dimensions
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// Zen Garden - Sumi-e aesthetic colors
export const BG_COLOR = [26, 26, 26]; // Sumi black #1a1a1a
export const PAPER_TEXTURE_COLOR = [26, 26, 26];

// Calligraphy color palette - Natural ink tones
export const COLORS = [
  '#f2f0e9', // Washi white (default)
  '#2c3e5c', // Navy ink
  '#4a5859', // Sage green
  '#6b4e4e', // Rust brown
  '#5c5552', // Charcoal
  '#af964b', // Kintsugi gold
];

// Default brush settings
export const DEFAULT_COLOR = '#f2f0e9'; // Washi white
export const DEFAULT_BRUSH_SIZE = 8;
export const MIN_BRUSH_SIZE = 2;
export const MAX_BRUSH_SIZE = 30;

// Sumi-e specific settings
export const INK_OPACITY = 0.85; // Bleed effect transparency
export const GRAIN_INTENSITY = 15; // Paper texture noise
export const TAPER_THRESHOLD = 2; // Slow brush detection
export const TAPER_MULTIPLIER = 1.8; // Ink bleeding factor

// Calligraphy brush physics (p5.js based)
export const BRUSH_PHYSICS = {
  minWeight: 1,  // Thin strokes for fast movement
  maxWeight: 8,  // Thick strokes for slow movement
  maxDistance: 50, // Distance threshold for weight mapping
};

