const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Vertical Typography - Left Side (Desktop Only) */}
      <div className="hidden md:fixed md:left-4 md:top-1/2 md:-translate-y-1/2 md:z-10 md:flex md:flex-col md:items-center md:gap-8">
        <div className="writing-mode-vertical text-amber-100/30 text-xs tracking-[0.5em] font-light">
          <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}>
            禅庭園
          </span>
        </div>
        <div className="writing-mode-vertical text-amber-100/20 text-xs tracking-widest font-light">
          <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.3em' }}>
            ZEN GARDEN
          </span>
        </div>
      </div>

      {/* Vertical Typography - Right Side (Desktop Only) */}
      <div className="hidden md:fixed md:right-4 md:top-1/2 md:-translate-y-1/2 md:z-10">
        <div className="writing-mode-vertical text-amber-100/20 text-xs tracking-widest font-light">
          <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.3em' }}>
            墨絵
          </span>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-20 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#af964b]/20 py-3 px-4">
        <h1 className="text-center text-lg font-light text-[#af964b] tracking-widest" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          墨庭
        </h1>
      </div>

      {/* Minimalist Gold Borders - Desktop Only */}
      <div className="hidden md:block fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent z-10"></div>
      <div className="hidden md:block fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent z-10"></div>

      {/* Hanko (Stamp) Logo - Responsive */}
      <div className="fixed top-4 right-4 z-10">
        {/* Desktop Hanko */}
        <div className="hidden md:flex w-16 h-16 border-2 border-red-600/60 rounded-sm bg-red-600/10 backdrop-blur-sm items-center justify-center transform rotate-3">
          <div className="text-center">
            <div className="text-red-100 text-xs font-bold tracking-wider" style={{ writingMode: 'vertical-rl' }}>
              禅
            </div>
          </div>
        </div>
        
        {/* Mobile Hanko - Smaller */}
        <div className="md:hidden flex w-10 h-10 border-2 border-red-600/50 rounded-sm bg-red-600/5 items-center justify-center transform rotate-3">
          <div className="text-red-100 text-[10px] font-bold" style={{ writingMode: 'vertical-rl' }}>
            禅
          </div>
        </div>
      </div>

      {/* Corner Accents - Desktop Only */}
      <div className="hidden md:block fixed top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-amber-500/30 z-10"></div>
      <div className="hidden md:block fixed bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-amber-500/30 z-10"></div>
      <div className="hidden md:block fixed bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-amber-500/30 z-10"></div>

      {/* Main Content */}
      {children}
    </div>
  );
};

export default MainLayout;
