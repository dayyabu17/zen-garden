import { motion } from 'framer-motion';

/**
 * Page transition wrapper component with fade and slide effects
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to animate
 */
const PageTransition = ({ children }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      x: -20,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth motion
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
