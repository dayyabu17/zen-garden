/**
 * Export utility for saving p5.js canvas as image
 */

/**
 * Download the current canvas as a high-quality PNG
 * @param {Object} p5 - The p5.js instance
 * @param {string} filename - Optional custom filename (default: zen-flow-timestamp)
 */
export const downloadCanvas = (p5, filename) => {
  if (!p5) {
    console.error('p5 instance is required to export canvas');
    return;
  }

  const timestamp = new Date().getTime();
  const defaultFilename = `zen-flow-${timestamp}`;
  const finalFilename = filename || defaultFilename;

  // Save the canvas as PNG
  p5.saveCanvas(finalFilename, 'png');
};

/**
 * Get the canvas as a data URL
 * @param {Object} p5 - The p5.js instance
 * @returns {string} Data URL of the canvas
 */
export const getCanvasDataURL = (p5) => {
  if (!p5 || !p5.canvas) {
    console.error('p5 instance with canvas is required');
    return null;
  }

  return p5.canvas.toDataURL('image/png');
};

/**
 * Download with custom quality settings
 * @param {Object} p5 - The p5.js instance
 * @param {Object} options - Export options
 * @param {string} options.filename - Custom filename
 * @param {string} options.format - Image format ('png' or 'jpg')
 * @param {number} options.quality - JPEG quality (0-1)
 */
export const downloadCanvasWithOptions = (p5, options = {}) => {
  if (!p5 || !p5.canvas) {
    console.error('p5 instance with canvas is required');
    return;
  }

  const {
    filename = `zen-flow-${new Date().getTime()}`,
    format = 'png',
    quality = 0.95
  } = options;

  if (format === 'png') {
    p5.saveCanvas(filename, 'png');
  } else if (format === 'jpg' || format === 'jpeg') {
    // For JPEG, we need to convert via canvas
    const canvas = p5.canvas;
    const dataURL = canvas.toDataURL('image/jpeg', quality);
    
    // Create download link
    const link = document.createElement('a');
    link.download = `${filename}.jpg`;
    link.href = dataURL;
    link.click();
  }
};

/**
 * Export a static canvas (from ArtScroll component) as JPG
 * @param {HTMLCanvasElement} canvas - The canvas element
 * @param {string} title - Artwork title for filename
 * @param {number} quality - JPEG quality (0-1), default 0.9
 */
export const exportScrollAsJPG = (canvas, title = 'artwork', quality = 0.9) => {
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    console.error('Valid canvas element is required');
    return;
  }

  try {
    // Convert canvas to JPEG data URL
    const dataURL = canvas.toDataURL('image/jpeg', quality);
    
    // Sanitize filename
    const sanitizedTitle = title
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .substring(0, 50);
    
    const timestamp = new Date().getTime();
    const filename = `${sanitizedTitle}-${timestamp}.jpg`;
    
    // Create and trigger download
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`✅ Exported: ${filename}`);
  } catch (error) {
    console.error('Failed to export canvas as JPG:', error);
    alert('Failed to export artwork. Please try again.');
  }
};
