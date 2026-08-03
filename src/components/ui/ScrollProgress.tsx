import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks';

/** Fixed scroll progress bar at the top of the viewport */
export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
    />
  );
}
