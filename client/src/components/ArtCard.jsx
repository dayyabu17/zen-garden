import { useState } from 'react';
import { Palette, Trash2 } from 'lucide-react';

/**
 * Reusable Art Card component with glassmorphism design
 * @param {Object} props - Component props
 * @param {Object} props.artwork - Artwork data
 * @param {Function} props.onDelete - Delete handler
 */
const ArtCard = ({ artwork, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
    <div className="group relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/20 hover:scale-105 cursor-pointer">
      {/* Delete Button */}
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className="absolute top-4 right-4 p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
        aria-label="Delete artwork"
      >
        <Trash2 size={16} />
      </button>

      {/* Artwork Preview Placeholder */}
      <div className="w-full aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        <Palette
          size={48}
          className="text-gray-600 group-hover:text-cyan-400 transition-colors duration-300"
        />
      </div>

      {/* Artwork Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white truncate group-hover:text-cyan-400 transition-colors duration-300">
          {artwork.title}
        </h3>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {artwork.paths?.length || 0} {artwork.paths?.length === 1 ? 'path' : 'paths'}
          </span>
          <span className="text-gray-500">{formatDate(artwork.createdAt)}</span>
        </div>

        {/* Stats Badge */}
        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-xs text-gray-400">Zen Flow</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
