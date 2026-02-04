const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Vertical Typography - Left Side */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-10">
        <div className="writing-mode-vertical text-amber-100/30 text-sm tracking-[0.5em] font-light">
          <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
            禅庭園
          </span>
        </div>
        <div className="mt-8 writing-mode-vertical text-amber-100/20 text-xs tracking-widest font-light">
          <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.3em' }}>
            ZEN GARDEN
          </span>
        </div>
      </div>

      {/* Vertical Typography - Right Side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-10">
        <div className="writing-mode-vertical text-amber-100/20 text-xs tracking-widest font-light">
          <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.3em' }}>
            墨絵
          </span>
        </div>
      </div>

      {/* Minimalist Gold Borders */}
      {/* Top elegant line */}
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent z-10"></div>
      
      {/* Bottom elegant line */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent z-10"></div>

      {/* Hanko (Stamp) Style Logo - Top Right Corner */}
      <div className="fixed top-6 right-6 z-10">
        <div className="w-16 h-16 border-2 border-red-600/60 rounded-sm bg-red-600/10 backdrop-blur-sm flex items-center justify-center transform rotate-3">
          <div className="text-center">
            <div className="text-red-100 text-xs font-bold tracking-wider" style={{ writingMode: 'vertical-rl' }}>
              禅
            </div>
          </div>
        </div>
      </div>

      {/* Corner Accents - Subtle gold lines */}
      <div className="fixed top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-amber-500/30 z-10"></div>
      <div className="fixed bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-amber-500/30 z-10"></div>
      <div className="fixed bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-amber-500/30 z-10"></div>

      {/* Main Content */}
      {children}
    </div>
  );
};

export default MainLayout;
