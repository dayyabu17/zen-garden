import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDraw } from '../hooks/useDraw.js';
import { COLORS, MIN_BRUSH_SIZE, MAX_BRUSH_SIZE } from '../constants/canvas.js';
import WashiDock from '../components/WashiDock.jsx';
import ZenCanvas from '../components/ZenCanvas.jsx';

const Home = () => {
  const {
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
    windowResized,
    mousePressed,
    mouseDragged,
    mouseReleased,
    handleClear,
    handleSave,
  } = useDraw();

  const [showMobileSettings, setShowMobileSettings] = useState(false);

  const handleExport = () => {
    alert('📥 Downloading your zen flow as PNG...');
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden bg-[#1a1a1a]">
      {/* Left Side - Canvas Area */}
      <div className="flex-1 flex flex-col relative" style={{ minHeight: 0, minWidth: 0 }}>
        {/* Canvas Header - Mobile Only */}
        <div className="md:hidden bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#af964b]/20 px-4 py-3 z-10">
          <h1 className="text-xl font-light text-[#f2f0e9] tracking-widest text-center" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            墨庭
          </h1>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative z-10" style={{ minHeight: 0 }}>
          <ZenCanvas
            setup={setup}
            draw={draw}
            windowResized={windowResized}
            mousePressed={mousePressed}
            mouseDragged={mouseDragged}
            mouseReleased={mouseReleased}
          />
        </div>
      </div>

      {/* Right Side - Settings Sidebar (Desktop) / Bottom Sheet (Mobile) */}
      <motion.aside
        initial={{ x: 20, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          y: showMobileSettings ? 0 : '60%'
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="
          md:w-80 md:h-full md:overflow-y-auto
          fixed md:relative bottom-0 left-0 right-0
          bg-[#f2f0e9]/95 backdrop-blur-md
          border-t md:border-t-0 md:border-l border-[#af964b]/20
          shadow-2xl md:shadow-none
          z-30
          md:translate-y-0
        "
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        {/* Mobile Drag Handle */}
        <button
          onClick={() => setShowMobileSettings(!showMobileSettings)}
          className="md:hidden w-full flex justify-center py-2 border-b border-[#af964b]/10"
          aria-label="Toggle settings"
        >
          <div className="w-12 h-1 bg-[#1a1a1a]/20 rounded-full"></div>
        </button>

        {/* Washi Paper Sidebar Content */}
        <div className="p-6 md:p-8 space-y-8 pb-24 md:pb-8">
          {/* Header - Desktop Only */}
          <div className="hidden md:block text-center border-b border-[#af964b]/20 pb-6">
            <h2 className="text-2xl font-light text-[#1a1a1a] tracking-widest mb-1">墨庭</h2>
            <p className="text-[#af964b] text-xs tracking-wider">Sumi-e Studio</p>
          </div>

          {/* Ink Color Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-light text-[#1a1a1a] tracking-widest border-b border-[#af964b]/20 pb-2">
              墨 • Ink Color
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {COLORS.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentColor(color)}
                  className={`
                    w-full aspect-square rounded-full transition-all duration-200
                    ${currentColor === color 
                      ? 'ring-4 ring-[#af964b] shadow-lg' 
                      : 'ring-2 ring-[#1a1a1a]/20 hover:ring-[#af964b]/60'
                    }
                  `}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Brush Strength Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-light text-[#1a1a1a] tracking-widest border-b border-[#af964b]/20 pb-2">
              筆 • Brush Strength
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-[#1a1a1a]/60">
                <span>細</span>
                <span className="text-[#af964b] font-medium">{brushSize}px</span>
                <span>太</span>
              </div>
              <input
                type="range"
                min={MIN_BRUSH_SIZE}
                max={MAX_BRUSH_SIZE}
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full h-2 bg-[#1a1a1a]/10 rounded-full appearance-none cursor-pointer accent-[#af964b]"
              />
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-light text-[#1a1a1a] tracking-widest border-b border-[#af964b]/20 pb-2">
              設定 • Settings
            </h3>
            
            {/* Smoothness */}
            <div className="space-y-2">
              <label className="block text-xs text-[#1a1a1a]/70 tracking-wider">
                滑らかさ • Smoothness
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={smoothness}
                  onChange={(e) => setSmoothness(Number(e.target.value))}
                  className="flex-1 h-1.5 bg-[#1a1a1a]/10 rounded-full appearance-none cursor-pointer accent-[#af964b]"
                />
                <span className="text-xs text-[#af964b] font-medium w-10 text-right">
                  {Math.round(smoothness * 100)}%
                </span>
              </div>
            </div>

            {/* Opacity */}
            <div className="space-y-2">
              <label className="block text-xs text-[#1a1a1a]/70 tracking-wider">
                透明度 • Opacity
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="flex-1 h-1.5 bg-[#1a1a1a]/10 rounded-full appearance-none cursor-pointer accent-[#af964b]"
                />
                <span className="text-xs text-[#af964b] font-medium w-10 text-right">
                  {Math.round(opacity * 100)}%
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-4 border-t border-[#af964b]/20">
            <Link
              to="/gallery"
              className="block text-center text-[#1a1a1a] text-xs tracking-widest border-2 border-[#1a1a1a]/30 px-4 py-3 rounded-sm hover:border-[#af964b] hover:bg-[#af964b]/5 transition-all"
            >
              蔵を見る • View Gallery
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Washi Dock - Floating Actions */}
      <WashiDock
        onSave={handleSave}
        onClear={handleClear}
        onExport={handleExport}
        onSettings={() => setShowMobileSettings(!showMobileSettings)}
        isSaving={isSaving}
      />
    </div>
  );
};

export default Home;
