import { Link } from 'react-router-dom';
import { useGallery } from '../hooks/useGallery';
import ArtCard from '../components/ArtCard';
import { ArrowLeft, Palette } from 'lucide-react';

const Gallery = () => {
  const { artworks, isLoading, error, handleDelete } = useGallery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <header className="py-8 px-6 border-b border-white/10 backdrop-blur-sm sticky top-0 z-10 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Gallery
              </h1>
              <p className="text-gray-400 mt-2">Your collection of zen flows</p>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <ArrowLeft size={20} />
              Back to Canvas
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

        {/* Gallery Grid */}
        {!isLoading && !error && artworks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <ArtCard key={artwork._id} artwork={artwork} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Gallery;
