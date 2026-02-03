import Sketch from 'react-p5';
import { useDraw } from '../hooks/useDraw.js';
import { COLORS, MIN_BRUSH_SIZE, MAX_BRUSH_SIZE } from '../constants/canvas.js';
import { Save, Trash2 } from 'lucide-react';

const ZenCanvas = () => {
  const {
    currentColor,
    brushSize,
    isSaving,
    setCurrentColor,
    setBrushSize,
    setup,
    draw,
    mousePressed,
    mouseDragged,
    mouseReleased,
    handleClear,
    handleSave,
  } = useDraw();

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
            {COLORS.map((color) => (
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
            min={MIN_BRUSH_SIZE}
            max={MAX_BRUSH_SIZE}
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
