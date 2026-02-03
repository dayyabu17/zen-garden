import { useState } from 'react';
import { saveArtwork } from '../services/artService.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT, DEFAULT_COLOR, DEFAULT_BRUSH_SIZE, COLORS, BG_COLOR } from '../constants/canvas.js';

/**
 * Custom hook for p5.js drawing logic and state management
 */
export const useDraw = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(DEFAULT_COLOR);
  const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE);
  const [isSaving, setIsSaving] = useState(false);

  // p5.js setup
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT).parent(canvasParentRef);
    p5.background(...BG_COLOR);
  };

  // p5.js draw loop
  const draw = (p5) => {
    p5.background(...BG_COLOR);

    // Draw all saved paths
    paths.forEach((path) => {
      p5.stroke(path.color);
      p5.strokeWeight(path.brushSize);
      p5.noFill();
      
      p5.beginShape();
      path.points.forEach((point) => {
        p5.vertex(point.x, point.y);
      });
      p5.endShape();
    });

    // Draw current path being created
    if (currentPath.length > 0) {
      p5.stroke(currentColor);
      p5.strokeWeight(brushSize);
      p5.noFill();
      
      p5.beginShape();
      currentPath.forEach((point) => {
        p5.vertex(point.x, point.y);
      });
      p5.endShape();
    }
  };

  // Mouse pressed handler
  const mousePressed = (p5) => {
    if (p5.mouseX >= 0 && p5.mouseX <= p5.width && p5.mouseY >= 0 && p5.mouseY <= p5.height) {
      setIsDrawing(true);
      setCurrentPath([{ x: p5.mouseX, y: p5.mouseY }]);
    }
  };

  // Mouse dragged handler
  const mouseDragged = (p5) => {
    if (isDrawing && p5.mouseX >= 0 && p5.mouseX <= p5.width && p5.mouseY >= 0 && p5.mouseY <= p5.height) {
      setCurrentPath((prev) => [...prev, { x: p5.mouseX, y: p5.mouseY }]);
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
        },
      ]);
      setCurrentPath([]);
      setIsDrawing(false);
    }
  };

  // Clear canvas
  const handleClear = () => {
    setPaths([]);
    setCurrentPath([]);
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
    
    // Setters
    setCurrentColor,
    setBrushSize,
    
    // p5 handlers
    setup,
    draw,
    mousePressed,
    mouseDragged,
    mouseReleased,
    
    // Actions
    handleClear,
    handleSave,
  };
};
