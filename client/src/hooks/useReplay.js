import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for replaying artwork paths with animation
 * @param {Array} paths - Array of path objects from activeArtwork
 * @param {number} speed - Animation speed in milliseconds per point (default: 10ms)
 * @returns {Object} Replay state and controls
 */
export const useReplay = (paths = [], speed = 10) => {
  const [replayedPaths, setReplayedPaths] = useState([]);
  const [isReplaying, setIsReplaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);

  /**
   * Reset replay state
   */
  const resetReplay = () => {
    setReplayedPaths([]);
    setIsReplaying(false);
    setIsComplete(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  /**
   * Start or restart the replay animation
   */
  const startReplay = () => {
    resetReplay();
    setIsReplaying(true);
  };

  /**
   * Skip to the end of the replay
   */
  const skipToEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setReplayedPaths(paths);
    setIsReplaying(false);
    setIsComplete(true);
  };

  /**
   * Effect to handle the replay animation
   */
  useEffect(() => {
    // If no paths or not replaying, do nothing
    if (!paths || paths.length === 0 || !isReplaying) {
      return;
    }

    let currentPathIndex = 0;
    let currentPointIndex = 0;
    const animatedPaths = [];

    const animateNextPoint = () => {
      if (currentPathIndex >= paths.length) {
        // Animation complete
        setIsReplaying(false);
        setIsComplete(true);
        return;
      }

      const currentPath = paths[currentPathIndex];
      
      if (!animatedPaths[currentPathIndex]) {
        // Start a new path
        animatedPaths[currentPathIndex] = {
          ...currentPath,
          points: [],
        };
      }

      // Add the next point
      if (currentPointIndex < currentPath.points.length) {
        animatedPaths[currentPathIndex].points.push(currentPath.points[currentPointIndex]);
        setReplayedPaths([...animatedPaths]);
        currentPointIndex++;

        // Schedule next point
        timeoutRef.current = setTimeout(animateNextPoint, speed);
      } else {
        // Current path is complete, move to next path
        currentPathIndex++;
        currentPointIndex = 0;
        timeoutRef.current = setTimeout(animateNextPoint, speed);
      }
    };

    // Start the animation
    animateNextPoint();

    // Cleanup on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [paths, isReplaying, speed]);

  /**
   * Auto-start replay when paths change
   */
  useEffect(() => {
    if (paths && paths.length > 0) {
      startReplay();
    } else {
      resetReplay();
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [paths]);

  return {
    replayedPaths,
    isReplaying,
    isComplete,
    startReplay,
    skipToEnd,
    resetReplay,
  };
};
