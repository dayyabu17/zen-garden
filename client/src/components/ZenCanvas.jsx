import { useRef, useEffect } from 'react';
import Sketch from 'react-p5';
import { motion } from 'framer-motion';

/**
 * ZenCanvas Component - Handles p5.js canvas rendering within flex container
 * Properly sized to fill parent with working mouse interactions
 */
const ZenCanvas = ({ setup, draw, windowResized, mousePressed, mouseDragged, mouseReleased }) => {
  const canvasContainerRef = useRef(null);
  const p5InstanceRef = useRef(null);

  // Wrapped setup to use proper parent reference
  const wrappedSetup = (p5, canvasParentRef) => {
    p5InstanceRef.current = p5;
    
    // Get actual dimensions from the container
    const parent = canvasParentRef;
    const width = parent.clientWidth || 800;
    const height = parent.clientHeight || 600;
    
    // Create canvas with proper dimensions
    const canvas = p5.createCanvas(width, height).parent(canvasParentRef);
    
    // Ensure canvas fills container and is interactive
    canvas.elt.style.display = 'block';
    canvas.elt.style.width = '100%';
    canvas.elt.style.height = '100%';
    canvas.elt.style.touchAction = 'none'; // Enable touch drawing
    canvas.elt.style.cursor = 'crosshair'; // Drawing cursor
    
    // Call original setup if provided
    if (setup) {
      setup(p5, canvasParentRef);
    }
  };

  // Wrapped windowResized to use parent dimensions
  const wrappedWindowResized = (p5) => {
    if (p5 && p5.canvas && p5.canvas.parentElement) {
      const parent = p5.canvas.parentElement;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      
      if (width > 0 && height > 0) {
        p5.resizeCanvas(width, height);
        
        // Call original windowResized if provided
        if (windowResized) {
          windowResized(p5);
        }
      }
    }
  };

  // Handle resize observer for flex container changes
  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      // Trigger a small delay to allow the p5 instance to be ready
      setTimeout(() => {
        const p5 = p5InstanceRef.current;
        if (p5 && p5.canvas && canvasContainerRef.current) {
          const parent = canvasContainerRef.current;
          const width = parent.clientWidth;
          const height = parent.clientHeight;
          
          if (width > 0 && height > 0 && (p5.width !== width || p5.height !== height)) {
            p5.resizeCanvas(width, height);
            if (windowResized) {
              windowResized(p5);
            }
          }
        }
      }, 100);
    });

    resizeObserver.observe(canvasContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [windowResized]);

  return (
    <motion.div
      ref={canvasContainerRef}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full border-2 border-[#af964b]/30 bg-[#1a1a1a] shadow-2xl relative"
      style={{ 
        minHeight: 0, // Important for flex children
        minWidth: 0,  // Important for flex children
        isolation: 'isolate', // Create new stacking context
        zIndex: 1, // Ensure canvas is interactive
      }}
    >
      <Sketch
        setup={wrappedSetup}
        draw={draw}
        windowResized={wrappedWindowResized}
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}
      />
    </motion.div>
  );
};

export default ZenCanvas;
