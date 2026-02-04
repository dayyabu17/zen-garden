import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Sketch from 'react-p5';
import { Trash2, Download, Eye } from 'lucide-react';
import { BG_COLOR, INK_OPACITY } from '../constants/canvas.js';

/**
 * ArtScroll Component - Kakemono (Hanging Scroll) styled Art Card
 * Uses p5.js with noLoop() for static one-time rendering
 * @param {Object} props - Component props
 * @param {Object} props.artwork - Artwork data with paths
 * @param {Function} props.onDelete - Delete handler
 * @param {Function} props.onReplay - Replay handler
 */
const ArtScroll = ({ artwork, onDelete, onReplay }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const p5InstanceRef = useRef(null);

  // p5.js setup - renders once with noLoop
  const setup = (p5, canvasParentRef) => {
    p5InstanceRef.current = p5;
    const canvas = p5.createCanvas(300, 400).parent(canvasParentRef);
    p5.background(...BG_COLOR);
    p5.noLoop(); // Static render - draw once and stop
    
    // Add paper grain
    p5.loadPixels();
    for (let x = 0; x < p5.width; x++) {
      for (let y = 0; y < p5.height; y++) {
        const index = (x + y * p5.width) * 4;
        const noise = p5.random(-8, 8);
        const baseColor = BG_COLOR[0] + noise;
        
        p5.pixels[index] = baseColor;
        p5.pixels[index + 1] = baseColor;
        p5.pixels[index + 2] = baseColor;
        p5.pixels[index + 3] = 255;
      }
    }
    p5.updatePixels();
  };

  // p5.js draw - renders all paths
  const draw = (p5) => {
    if (!artwork.paths || artwork.paths.length === 0) return;

    artwork.paths.forEach((path) => {
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
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    
    if (!window.confirm('この作品を削除しますか？ (Delete this artwork?)')) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(artwork._id);
    } catch (error) {
      alert('削除に失敗しました (Failed to delete)');
      setIsDeleting(false);
    }
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    
    if (!p5InstanceRef.current || !p5InstanceRef.current.canvas) {
      alert('Canvas not ready');
      return;
    }

    try {
      const canvas = p5InstanceRef.current.canvas;
      const dataURL = canvas.toDataURL('image/jpeg', 0.95);
      
      const sanitizedTitle = artwork.title
        .replace(/[^a-z0-9]/gi, '-')
        .toLowerCase()
        .substring(0, 50);
      
      const timestamp = new Date().getTime();
      const filename = `${sanitizedTitle}-${timestamp}.jpg`;
      
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`✅ Downloaded: ${filename}`);
    } catch (error) {
      console.error('Failed to download:', error);
      alert('ダウンロードに失敗しました (Download failed)');
    }
  };

  const handleReplay = (e) => {
    e.stopPropagation();
    if (onReplay) {
      onReplay(artwork);
    }
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scaleY: 1.05,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
      className="group relative bg-[#f2f0e9]/50 backdrop-blur-sm border-t-4 border-b-4 border-[#af964b]/30 shadow-lg transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(175,150,75,0.3)] overflow-hidden"
      style={{ 
        transformOrigin: 'top',
        fontFamily: "'Noto Serif JP', serif"
      }}
    >
      {/* Decorative Top Rod */}
      <div className="absolute -top-2 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-md z-10"></div>
      
      {/* Decorative Bottom Rod */}
      <div className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 shadow-md z-10"></div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-4 right-4 flex gap-2 z-20"
      >
        {/* View Replay Button */}
        {onReplay && (
          <button
            onClick={handleReplay}
            className="p-2 bg-[#af964b]/20 hover:bg-[#af964b]/40 text-[#af964b] rounded-sm transition-all duration-200 hover:scale-110 border border-[#af964b]/40 backdrop-blur-sm"
            aria-label="View Replay"
            title="リプレイを見る"
          >
            <Eye size={16} />
          </button>
        )}

        {/* Download JPG Button */}
        <button
          onClick={handleDownload}
          className="p-2 bg-[#af964b]/20 hover:bg-[#af964b]/40 text-[#af964b] rounded-sm transition-all duration-200 hover:scale-110 border border-[#af964b]/40 backdrop-blur-sm"
          aria-label="Download as JPG"
          title="JPGでダウンロード"
        >
          <Download size={16} />
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDeleteClick}
          disabled={isDeleting}
          className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-600 rounded-sm transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/40 backdrop-blur-sm"
          aria-label="Delete artwork"
          title="削除"
        >
          <Trash2 size={16} />
        </button>
      </motion.div>

      {/* Canvas Preview - p5.js with noLoop */}
      <div className="relative w-full aspect-[3/4] bg-[#1a1a1a] border-y border-[#af964b]/10 overflow-hidden">
        <Sketch
          setup={setup}
          draw={draw}
        />
        
        {/* Subtle overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a1a]/10 pointer-events-none"></div>
      </div>

      {/* Artwork Info - Washi Paper Aesthetic */}
      <div className="p-6 space-y-3 bg-gradient-to-b from-[#f2f0e9]/80 to-[#f2f0e9]/60">
        <h3 className="text-center text-base font-light text-[#1a1a1a] tracking-wider border-b border-[#af964b]/20 pb-2">
          {artwork.title}
        </h3>

        <div className="space-y-2 text-center">
          <div className="flex justify-center gap-4 text-xs text-[#1a1a1a]/60">
            <span>{artwork.paths?.length || 0} 筆</span>
            <span className="text-[#af964b]/60">•</span>
            <span>{artwork.paths?.reduce((total, path) => total + (path.points?.length || 0), 0)} 点</span>
          </div>

          <div className="text-xs text-[#1a1a1a]/50 font-light">
            {formatDate(artwork.createdAt)}
          </div>
        </div>

        {/* Decorative Hanko-style mark */}
        <div className="flex justify-center pt-2">
          <div className="w-8 h-8 border-2 border-red-600/40 bg-red-600/5 rounded-sm flex items-center justify-center transform rotate-3">
            <span className="text-red-600/60 text-xs font-bold" style={{ writingMode: 'vertical-rl' }}>
              禅
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtScroll;
