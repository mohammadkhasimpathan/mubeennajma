import { motion, AnimatePresence } from 'framer-motion';
import { loaderVariants } from '@/animations/variants';

interface PageLoaderProps {
  isLoading: boolean;
}

/**
 * Cinematic loading screen shown before the site renders.
 */
export default function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          variants={loaderVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="page-loader"
          style={{ zIndex: 99999 }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo / Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold font-['Space_Grotesk'] gradient-text mb-2">
                MN
              </div>
              <div className="text-sm text-slate-500 tracking-[0.3em] uppercase">
                Loading Portfolio
              </div>
            </motion.div>

            {/* Animated loader bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-48 h-0.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
            </motion.div>

            {/* Pulsing dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-2"
            >
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#8B5CF6' }}
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
