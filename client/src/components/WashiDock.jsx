import { motion } from 'framer-motion';
import { Save, Trash2, Download, Settings2 } from 'lucide-react';

/**
 * Floating Action Dock - Responsive Washi Paper Toolbar
 * Adapts to mobile and desktop viewports
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
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={dockVariants}
      initial="hidden"
      animate="visible"
      className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-4 md:pb-6 px-4"
    >
      {/* Floating Dock Container */}
      <div className="w-full md:w-96 bg-[#f2f0e9]/95 backdrop-blur-md border border-[#af964b]/30 rounded-full shadow-2xl">
        <div className="flex items-center justify-around px-4 md:px-6 py-3 md:py-4">
          {/* Save Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onClick={onSave}
            disabled={isSaving}
            className="flex flex-col items-center gap-1 p-2 text-[#1a1a1a] hover:text-[#af964b] transition-colors disabled:opacity-50"
            aria-label="Save"
            title="保存"
          >
            <Save size={20} />
            <span className="text-xs hidden md:inline tracking-wider">保存</span>
          </motion.button>

          {/* Export Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onClick={onExport}
            className="flex flex-col items-center gap-1 p-2 text-[#1a1a1a] hover:text-[#af964b] transition-colors"
            aria-label="Export"
            title="出力"
          >
            <Download size={20} />
            <span className="text-xs hidden md:inline tracking-wider">出力</span>
          </motion.button>

          {/* Divider */}
          <div className="w-px h-6 bg-[#af964b]/20"></div>

          {/* Settings Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onClick={onSettings}
            className="flex flex-col items-center gap-1 p-2 text-[#1a1a1a] hover:text-[#af964b] transition-colors"
            aria-label="Settings"
            title="設定"
          >
            <Settings2 size={20} />
            <span className="text-xs hidden md:inline tracking-wider">設定</span>
          </motion.button>

          {/* Clear Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            onClick={onClear}
            className="flex flex-col items-center gap-1 p-2 text-[#1a1a1a] hover:text-[#af964b] transition-colors"
            aria-label="Clear"
            title="消去"
          >
            <Trash2 size={20} />
            <span className="text-xs hidden md:inline tracking-wider">消去</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default WashiDock;

