import { motion } from 'framer-motion';
import { Save, Trash2, Image, Settings } from 'lucide-react';

/**
 * Minimalist Washi Paper Dock
 * Ghost-style buttons with gold hover states
 */
const WashiDock = ({ onSave, onClear, onExport, onSettings, isSaving }) => {
  const dockVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    hover: {
      backgroundColor: 'rgba(175, 150, 75, 0.1)',
      borderColor: '#af964b',
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={dockVariants}
      initial="hidden"
      animate="visible"
      className="fixed bottom-0 left-0 right-0 z-40"
    >
      {/* Washi Paper Background */}
      <div className="bg-gradient-to-t from-[#f2f0e9]/95 to-[#faf8f3]/90 backdrop-blur-sm border-t border-[#af964b]/30 shadow-lg">
        <div className="max-w-4xl mx-auto px-8 py-6">
          {/* Dock Container */}
          <div className="flex items-center justify-center gap-8">
            {/* Save Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              onClick={onSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-5 py-2 text-[#1a1a1a] border border-[#1a1a1a]/20 rounded-sm transition-all duration-300 hover:shadow-md disabled:opacity-50"
            >
              <Save size={18} />
              <span className="text-sm font-light tracking-wider">
                {isSaving ? '保存中...' : '保存'}
              </span>
            </motion.button>

            {/* Export Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              onClick={onExport}
              className="flex items-center gap-2 px-5 py-2 text-[#1a1a1a] border border-[#1a1a1a]/20 rounded-sm transition-all duration-300 hover:shadow-md"
            >
              <Image size={18} />
              <span className="text-sm font-light tracking-wider">出力</span>
            </motion.button>

            {/* Settings Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              onClick={onSettings}
              className="flex items-center gap-2 px-5 py-2 text-[#1a1a1a] border border-[#1a1a1a]/20 rounded-sm transition-all duration-300 hover:shadow-md"
            >
              <Settings size={18} />
              <span className="text-sm font-light tracking-wider">設定</span>
            </motion.button>

            {/* Clear Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              onClick={onClear}
              className="flex items-center gap-2 px-5 py-2 text-[#1a1a1a] border border-[#1a1a1a]/20 rounded-sm transition-all duration-300 hover:shadow-md"
            >
              <Trash2 size={18} />
              <span className="text-sm font-light tracking-wider">消去</span>
            </motion.button>
          </div>

          {/* Decorative bottom line */}
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[#af964b]/40 to-transparent"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default WashiDock;
