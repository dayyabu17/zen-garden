import { useState } from 'react';
import Sketch from 'react-p5';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDraw } from '../hooks/useDraw.js';
import { COLORS, MIN_BRUSH_SIZE, MAX_BRUSH_SIZE } from '../constants/canvas.js';
import WashiDock from './WashiDock.jsx';

const ZenCanvas = () => {
  const {
    paths,
    currentColor,
    brushSize,
    isSaving,
    smoothness,
    opacity,
    setCurrentColor,
    setBrushSize,
    setSmoothness,
    setOpacity,
    setup,
    draw,
    mousePressed,
    mouseDragged,
    mouseReleased,
    handleClear,
    handleSave,
  } = useDraw();

  const [showSettings, setShowSettings] = useState(false);

  const handleExport = () => {
    alert('📥 Downloading your zen flow as PNG...');
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8 pb-32 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h1 className="text-5xl font-light text-[#f2f0e9] tracking-widest mb-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          墨庭
        </h1>
        <p className="text-[#af964b] text-sm tracking-widest font-light">Sumi-e Canvas</p>
      </motion.div>

      {/* Canvas Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative shadow-2xl border-2 border-[#af964b]/30 bg-[#1a1a1a]"
      >
        <Sketch
          setup={setup}
          draw={draw}
          mousePressed={mousePressed}
          mouseDragged={mouseDragged}
          mouseReleased={mouseReleased}
        />
      </motion.div>

      {/* Color Palette */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <p className="text-[#af964b] text-xs tracking-widest mb-4 text-center">色 • Colors</p>
        <div className="flex gap-4">
          {COLORS.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.15, y: -4 }}
              onClick={() => setCurrentColor(color)}
              className={`w-10 h-10 rounded-full transition-all duration-200 ${
                currentColor === color 
                  ? 'ring-4 ring-[#af964b] shadow-lg' 
                  : 'ring-2 ring-[#af964b]/30 hover:ring-[#af964b]/60'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Brush Size Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-64"
      >
        <label className="block text-[#af964b] text-xs tracking-widest mb-3 text-center">筆の太さ • Size: {brushSize}px</label>
        <input
          type="range"
          min={MIN_BRUSH_SIZE}
          max={MAX_BRUSH_SIZE}
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-full h-1 bg-[#af964b]/20 rounded-full appearance-none cursor-pointer accent-[#af964b] hover:accent-[#c9ad70]"
        />
      </motion.div>

      {/* Settings Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setShowSettings(!showSettings)}
        className="text-[#af964b] text-xs tracking-widest border border-[#af964b]/40 px-4 py-2 rounded-sm hover:border-[#af964b] transition-all"
      >
        {showSettings ? '設定を閉じる' : '詳細設定'}
      </motion.button>

      {/* Advanced Settings */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-64 bg-[#2a2a2a]/50 border border-[#af964b]/30 rounded-sm p-6 space-y-4"
        >
          <div>
            <label className="block text-[#af964b] text-xs tracking-widest mb-2">滑らかさ • Smoothness: {Math.round(smoothness * 100)}%</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={smoothness}
              onChange={(e) => setSmoothness(Number(e.target.value))}
              className="w-full h-1 bg-[#af964b]/20 rounded-full appearance-none cursor-pointer accent-[#af964b]"
            />
          </div>
          <div>
            <label className="block text-[#af964b] text-xs tracking-widest mb-2">透明度 • Opacity: {Math.round(opacity * 100)}%</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full h-1 bg-[#af964b]/20 rounded-full appearance-none cursor-pointer accent-[#af964b]"
            />
          </div>
        </motion.div>
      )}

      {/* Navigation Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <Link
          to="/gallery"
          className="text-[#af964b] text-xs tracking-widest border border-[#af964b]/40 px-6 py-2 rounded-sm hover:border-[#af964b] transition-all hover:shadow-md inline-block"
        >
          蔵を見る • View Gallery
        </Link>
      </motion.div>

      {/* Washi Dock */}
      <WashiDock
        onSave={handleSave}
        onClear={handleClear}
        onExport={handleExport}
        onSettings={() => setShowSettings(!showSettings)}
        isSaving={isSaving}
      />
    </div>
  );
};

export default ZenCanvas;
