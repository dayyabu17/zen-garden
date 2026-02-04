import { useState, useRef } from 'react';
import { saveArtwork } from '../services/artService.js';
import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT, 
  DEFAULT_COLOR, 
  DEFAULT_BRUSH_SIZE, 
  COLORS, 
  BG_COLOR,
  INK_OPACITY,
  GRAIN_INTENSITY,
  TAPER_THRESHOLD,
  TAPER_MULTIPLIER
} from '../constants/canvas.js';

/**
 * Custom hook for p5.js drawing logic with Sumi-e aesthetics
 */
export const useDraw = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(DEFAULT_COLOR);
  const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE);
  const [isSaving, setIsSaving] = useState(false);
  const [brushPhysics, setBrushPhysics] = useState(true);
  const [smoothness, setSmoothness] = useState(0.3); // Lower for more responsive Sumi-e feel
  const [opacity, setOpacity] = useState(INK_OPACITY);
  
  // References for Sumi-e physics
  const prevMousePos = useRef({ x: 0, y: 0 });
  const velocityHistory = useRef([]); // Track velocity for tapering
  const backgroundGenerated = useRef(false); // Track if grain texture is generated

  /**
   * Generate paper grain texture on background
   */
  const generatePaperGrain = (p5) => {
    p5.loadPixels();
    for (let x = 0; x < p5.width; x++) {
      for (let y = 0; y < p5.height; y++) {
        const index = (x + y * p5.width) * 4;
        const noise = p5.random(-GRAIN_INTENSITY, GRAIN_INTENSITY);
        const baseColor = BG_COLOR[0] + noise;
        
        p5.pixels[index] = baseColor;     // R
        p5.pixels[index + 1] = baseColor; // G
        p5.pixels[index + 2] = baseColor; // B
        p5.pixels[index + 3] = 255;       // A
      }
    }
    p5.updatePixels();
    backgroundGenerated.current = true;
  };

  // p5.js setup with responsive canvas
  const setup = (p5, canvasParentRef) => {
    const container = canvasParentRef;
    const width = container.offsetWidth;
    const height = Math.min(container.offsetWidth * 0.75, window.innerHeight * 0.7);
    
    const canvas = p5.createCanvas(width, height).parent(canvasParentRef);
    p5.background(...BG_COLOR);
    generatePaperGrain(p5);
    
    // Store canvas reference for resize handling
    canvas.elt.style.maxWidth = '100%';
    canvas.elt.style.height = 'auto';
  };

  // Handle window resize for responsive canvas
  const windowResized = (p5) => {
    if (p5 && p5.drawingContext) {
      const container = p5.canvas.parentElement;
      const width = container.offsetWidth;
      const height = Math.min(container.offsetWidth * 0.75, window.innerHeight * 0.7);
      
      // Only resize if dimensions have actually changed
      if (p5.width !== width || p5.height !== height) {
        p5.resizeCanvas(width, height);
        p5.background(...BG_COLOR);
        generatePaperGrain(p5);
        
        // Redraw all paths with new dimensions
        paths.forEach((path) => {
          const color = p5.color(path.color);
          const pathOpacity = path.opacity !== undefined ? path.opacity : INK_OPACITY;
          color.setAlpha(pathOpacity * 255);
          p5.noFill();
          
          for (let i = 0; i < path.points.length - 1; i++) {
            const point = path.points[i];
            const nextPoint = path.points[i + 1];
            const weight = point.weight !== undefined ? point.weight : path.brushSize;
            
            p5.stroke(color);
            p5.strokeWeight(weight);
            p5.strokeCap(p5.ROUND);
            p5.line(point.x, point.y, nextPoint.x, nextPoint.y);
          }
        });
      }
    }
  };

  // p5.js draw loop with Sumi-e rendering
  const draw = (p5) => {
    // Regenerate grain if background was cleared
    if (!backgroundGenerated.current) {
      p5.background(...BG_COLOR);
      generatePaperGrain(p5);
    }

    // Draw all saved paths with Sumi-e aesthetics
    paths.forEach((path) => {
      const color = p5.color(path.color);
      const pathOpacity = path.opacity !== undefined ? path.opacity : INK_OPACITY;
      color.setAlpha(pathOpacity * 255);
      p5.noFill();
      
      // Draw path with variable stroke weights
      for (let i = 0; i < path.points.length - 1; i++) {
        const point = path.points[i];
        const nextPoint = path.points[i + 1];
        const weight = point.weight !== undefined ? point.weight : path.brushSize;
        
        p5.stroke(color);
        p5.strokeWeight(weight);
        p5.strokeCap(p5.ROUND);
        p5.line(point.x, point.y, nextPoint.x, nextPoint.y);
      }
    });

    // Draw current path being created
    if (currentPath.length > 0) {
      const color = p5.color(currentColor);
      color.setAlpha(opacity * 255);
      p5.noFill();
      
      for (let i = 0; i < currentPath.length - 1; i++) {
        const point = currentPath[i];
        const nextPoint = currentPath[i + 1];
        const weight = point.weight !== undefined ? point.weight : brushSize;
        
        p5.stroke(color);
        p5.strokeWeight(weight);
        p5.strokeCap(p5.ROUND);
        p5.line(point.x, point.y, nextPoint.x, nextPoint.y);
      }
    }
  };

  /**
   * Calculate velocity and apply Sumi-e physics
   * Includes tapering effect when stroke slows down
   */
  const calculateSumieStroke = (p5, baseSize) => {
    if (!brushPhysics) {
      return baseSize;
    }

    const dx = p5.mouseX - prevMousePos.current.x;
    const dy = p5.mouseY - prevMousePos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Track velocity history for tapering
    velocityHistory.current.push(distance);
    if (velocityHistory.current.length > 5) {
      velocityHistory.current.shift();
    }
    
    // Calculate average velocity for smoother transitions
    const avgVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length;
    
    // Highly dynamic range for Sumi-e effect
    const minSize = baseSize * 0.2;
    const maxSize = baseSize * 2.2;
    
    // Tapering: When movement is slow, apply ink bleeding effect
    let strokeSize;
    if (avgVelocity < TAPER_THRESHOLD) {
      // Slow movement = thick, bleeding stroke (ink soaking into paper)
      strokeSize = baseSize * TAPER_MULTIPLIER;
    } else {
      // Fast movement = thin, precise stroke
      const sensitivity = 1 - smoothness;
      const speedFactor = Math.min(avgVelocity * sensitivity, 30) / 30;
      strokeSize = maxSize - (speedFactor * (maxSize - minSize));
    }
    
    return Math.max(minSize, Math.min(maxSize * 1.2, strokeSize));
  };

  // Mouse pressed handler
  const mousePressed = (p5) => {
    if (p5.mouseX >= 0 && p5.mouseX <= p5.width && p5.mouseY >= 0 && p5.mouseY <= p5.height) {
      setIsDrawing(true);
      prevMousePos.current = { x: p5.mouseX, y: p5.mouseY };
      velocityHistory.current = [0]; // Reset velocity
      
      const weight = calculateSumieStroke(p5, brushSize);
      setCurrentPath([{ x: p5.mouseX, y: p5.mouseY, weight }]);
    }
  };

  // Mouse dragged handler
  const mouseDragged = (p5) => {
    if (isDrawing && p5.mouseX >= 0 && p5.mouseX <= p5.width && p5.mouseY >= 0 && p5.mouseY <= p5.height) {
      const weight = calculateSumieStroke(p5, brushSize);
      setCurrentPath((prev) => [...prev, { x: p5.mouseX, y: p5.mouseY, weight }]);
      
      // Update previous position for next calculation
      prevMousePos.current = { x: p5.mouseX, y: p5.mouseY };
    }
  };

  // Mouse released handler
  const mouseReleased = () => {
    if (isDrawing && currentPath.length > 0) {
      setPaths((prev) => [
        ...prev,
        {
          points: currentPath,
          color: currentColor,
          brushSize: brushSize,
          opacity: opacity,
        },
      ]);
      setCurrentPath([]);
      setIsDrawing(false);
      velocityHistory.current = []; // Reset velocity history
    }
  };

  // Clear canvas and regenerate grain
  const handleClear = () => {
    setPaths([]);
    setCurrentPath([]);
    backgroundGenerated.current = false; // Force grain regeneration
  };

  // Save artwork
  const handleSave = async () => {
    if (paths.length === 0) {
      alert('Create some art first!');
      return;
    }

    try {
      setIsSaving(true);
      const artworkData = {
        title: `Flow ${new Date().toLocaleString()}`,
        paths: paths,
      };
      
      await saveArtwork(artworkData);
      alert('✨ Artwork saved successfully!');
    } catch (error) {
      alert(`Failed to save: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    // State
    paths,
    currentPath,
    isDrawing,
    currentColor,
    brushSize,
    isSaving,
    brushPhysics,
    smoothness,
    opacity,
    
    // Setters
    setCurrentColor,
    setBrushSize,
    setBrushPhysics,
    setSmoothness,
    setOpacity,
    
    // p5 handlers
    setup,
    draw,
    windowResized,
    mousePressed,
    mouseDragged,
    mouseReleased,
    
    // Actions
    handleClear,
    handleSave,
  };
};
