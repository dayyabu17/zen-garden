import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Trash2 } from 'lucide-react';

/**
 * Kakemono (Hanging Scroll) styled Art Card component
 * Tall, narrow portrait orientation with traditional Japanese aesthetics
 * @param {Object} props - Component props
 * @param {Object} props.artwork - Artwork data
 * @param {Function} props.onDelete - Delete handler
 */
const ArtCard = ({ artwork, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    
    if (!window.confirm('Are you sure you want to delete this artwork?')) {
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(artwork._id);
    } catch (error) {
      alert('Failed to delete artwork');
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      className="group relative w-48 bg-gradient-to-b from-gray-800/40 to-gray-900/60 backdrop-blur-lg border-l-2 border-r-2 border-amber-500/30 border-t border-b border-amber-400/20 shadow-2xl transition-all duration-300 cursor-pointer hover:shadow-amber-500/20"
    >
      {/* Scroll Rod Top */}
      <div className="absolute -top-3 left-0 right-0 h-2 bg-amber-900/80 border-y border-amber-700/60 shadow-lg"></div>

      {/* Delete Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className="absolute top-4 right-4 p-2 bg-red-500/30 hover:bg-red-500/50 text-red-300 rounded-sm transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10 border border-red-500/40"
        aria-label="Delete artwork"
      >
        <Trash2 size={14} />
      </motion.button>

      {/* Artwork Preview - Tall and Narrow */}
      <div className="w-full h-64 bg-gradient-to-br from-gray-700/40 to-gray-900/80 flex items-center justify-center overflow-hidden border-b border-amber-500/20">
        <Palette
          size={56}
          className="text-amber-200/40 group-hover:text-amber-300/60 transition-colors duration-300"
        />
      </div>

      {/* Artwork Info */}
      <div className="p-5 space-y-3">
        <h3 className="text-center text-sm font-light text-amber-100 truncate group-hover:text-amber-50 transition-colors duration-300 tracking-wide">
          {artwork.title}
        </h3>

        <div className="space-y-2 text-center">
          <div className="text-xs text-amber-200/60">
            {artwork.paths?.length || 0} stroke{artwork.paths?.length !== 1 ? 's' : ''}
          </div>
          <div className="text-xs text-amber-200/40">
            {formatDate(artwork.createdAt)}
          </div>
        </div>

        {/* Stats Badge */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          className="pt-3 border-t border-amber-500/20"
        >
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ scale: isHovered ? 1.2 : 1 }}
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
            ></motion.div>
            <span className="text-xs text-amber-200/50">Zen Flow</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Rod Bottom */}
      <div className="absolute -bottom-3 left-0 right-0 h-2 bg-amber-900/80 border-y border-amber-700/60 shadow-lg"></div>

      {/* Shadow/Depth Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent pointer-events-none rounded-sm"></div>
    </motion.div>
  );
};

export default ArtCard;
