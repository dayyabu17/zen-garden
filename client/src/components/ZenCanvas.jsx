import { useRef, useState } from 'react';
import Sketch from 'react-p5';
import { saveArtwork } from '../services/artService.js';
import { Save, Trash2 } from 'lucide-react';

const ZenCanvas = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#4ECDC4');
  const [brushSize, setBrushSize] = useState(5);
  const [isSaving, setIsSaving] = useState(false);

  const colors = ['#4ECDC4', '#FF6B6B', '#95E1D3', '#F38181', '#AA96DA', '#FCBAD3'];

  // p5.js setup
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 600).parent(canvasParentRef);
    p5.background(20, 20, 30);
  };

  // p5.js draw loop
  const draw = (p5) => {
    p5.background(20, 20, 30);

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

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      {/* Canvas Container */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
        <Sketch
          setup={setup}
          draw={draw}
          mousePressed={mousePressed}
          mouseDragged={mouseDragged}
          mouseReleased={mouseReleased}
        />
      </div>

      {/* Controls Panel */}
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl">
        {/* Color Palette */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-300 mb-3 block">Color</label>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setCurrentColor(color)}
                className={`w-12 h-12 rounded-full transition-all duration-200 hover:scale-110 ${
                  currentColor === color ? 'ring-4 ring-white/50 scale-110' : 'ring-2 ring-white/20'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Brush Size */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-300 mb-3 block">
            Brush Size: {brushSize}px
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving || paths.length === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Save size={20} />
            {isSaving ? 'Saving...' : 'Save Artwork'}
          </button>

          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg border border-white/10"
          >
            <Trash2 size={20} />
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZenCanvas;
