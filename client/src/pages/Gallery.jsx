import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGallery } from '../hooks/useGallery';
import ArtCard from '../components/ArtCard';
import { ArrowLeft, Palette } from 'lucide-react';

const Gallery = () => {
  const { artworks, isLoading, error, handleDelete } = useGallery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header - Scroll-like styling */}
      <header className="py-8 md:py-12 px-4 md:px-6 border-b border-amber-500/20 backdrop-blur-sm sticky top-0 z-10 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-100 tracking-widest mb-2" style={{ fontFamily: 'serif' }}>
                蔵
              </h1>
              <p className="text-amber-200/60 text-xs md:text-sm tracking-widest font-light text-center md:text-left">Collection of Zen Flows</p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-2 md:py-3 px-4 md:px-6 rounded-sm transition-all duration-200 hover:shadow-lg border border-amber-500/30 text-sm md:text-base"
            >
              <ArrowLeft size={16} className="md:w-5 md:h-5" />
              <span className="hidden md:inline">Back to Canvas</span>
              <span className="md:hidden">戻る</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin"></div>
              <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cyan-400" size={24} />
            </div>
            <p className="text-gray-400 mt-4">Loading your artworks...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && artworks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Palette size={64} className="text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-400 mb-2">No artworks yet</h2>
            <p className="text-gray-500 mb-6">Create your first zen flow on the canvas</p>
            <Link
              to="/"
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <ArrowLeft size={20} />
              Go to Canvas
            </Link>
          </div>
        )}

      {/* Gallery Grid - Kakemono (Hanging Scroll) Layout - Responsive */}
        {!isLoading && !error && artworks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 py-12 px-4">
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork._id}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ originY: 0 }}
              >
                <ArtCard artwork={artwork} onDelete={handleDelete} />
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Gallery;
