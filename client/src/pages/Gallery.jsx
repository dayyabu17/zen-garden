import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGallery } from '../hooks/useGallery';
import ArtScroll from '../components/ArtScroll';
import { ArrowLeft, Palette } from 'lucide-react';

const Gallery = () => {
  const { artworks, isLoading, error, handleDelete } = useGallery();

  const handleReplay = (artwork) => {
    // TODO: Implement replay functionality with navigation to home
    console.log('Replay artwork:', artwork);
    alert('リプレイ機能は開発中です (Replay feature coming soon)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header with Zen Aesthetic */}
      <header className="py-8 md:py-12 px-4 md:px-6 border-b border-[#af964b]/20 backdrop-blur-sm sticky top-0 z-20 bg-[#1a1a1a]/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Title Section */}
            <div className="text-center md:text-left">
              <h1 
                className="text-4xl md:text-5xl font-light text-[#f2f0e9] tracking-widest mb-2"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                石庭
              </h1>
              <p className="text-[#af964b] text-xs md:text-sm tracking-widest font-light">
                Art Collection • 作品集
              </p>
            </div>

            {/* Back Button */}
            <Link
              to="/"
              className="flex items-center gap-2 bg-[#af964b]/10 hover:bg-[#af964b]/20 text-[#af964b] border border-[#af964b]/40 hover:border-[#af964b] font-light py-2 md:py-3 px-4 md:px-6 rounded-sm transition-all duration-200 hover:shadow-lg text-sm md:text-base"
            >
              <ArrowLeft size={16} className="md:w-5 md:h-5" />
              <span className="hidden md:inline">Back to Canvas</span>
              <span className="md:hidden">戻る</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content with Ma (Negative Space) */}
      <main className="max-w-7xl mx-auto p-12">
        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-[#af964b]/20 border-t-[#af964b] rounded-full"
              ></motion.div>
              <Palette className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#af964b]" size={24} />
            </div>
            <p className="text-[#f2f0e9]/60 mt-6 font-light tracking-wider" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              読み込み中...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-sm p-6 text-center backdrop-blur-sm">
            <p className="text-red-400 font-light">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && artworks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 border-4 border-[#af964b]/20 rounded-sm mb-6 flex items-center justify-center">
              <Palette size={48} className="text-[#af964b]/40" />
            </div>
            <h2 
              className="text-2xl font-light text-[#f2f0e9]/70 mb-3 tracking-wider"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              まだ作品がありません
            </h2>
            <p className="text-[#f2f0e9]/50 mb-8 font-light">No artworks yet • Create your first zen flow</p>
            <Link
              to="/"
              className="flex items-center gap-2 bg-[#af964b]/20 hover:bg-[#af964b]/30 text-[#af964b] border border-[#af964b]/40 font-light py-3 px-6 rounded-sm transition-all duration-200 hover:shadow-lg"
            >
              <ArrowLeft size={20} />
              Canvas へ戻る
            </Link>
          </div>
        )}

        {/* Gallery Grid - Responsive with Ma (Negative Space) */}
        {!isLoading && !error && artworks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {artworks.map((artwork, index) => (
              <motion.div
                key={artwork._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ArtScroll 
                  artwork={artwork} 
                  onDelete={handleDelete}
                  onReplay={handleReplay}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Collection Stats */}
        {!isLoading && !error && artworks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 pt-8 border-t border-[#af964b]/20 text-center"
          >
            <p className="text-[#f2f0e9]/50 text-sm font-light tracking-wider">
              コレクション • {artworks.length} 作品
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Gallery;
