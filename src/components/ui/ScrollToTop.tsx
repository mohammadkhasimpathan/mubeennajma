import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from '@/hooks';

/** Floating scroll-to-top button that appears after scrolling 30% */
export default function ScrollToTop() {
  const progress = useScrollProgress();
  const visible = progress > 20;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass gradient-border flex items-center justify-center group hover:glow-purple transition-all"
          aria-label="Scroll to top"
          style={{ transition: 'box-shadow 0.3s' }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={18} className="text-violet-400 group-hover:text-violet-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
