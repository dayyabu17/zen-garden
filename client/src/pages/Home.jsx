import ZenCanvas from '../components/ZenCanvas';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <header className="py-8 px-6 border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Zen Garden
          </h1>
          <p className="text-gray-400 mt-2">Create flowing generative art with mindful strokes</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <ZenCanvas />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>Draw freely, save beautifully ✨</p>
      </footer>
    </div>
  );
};

export default Home;
