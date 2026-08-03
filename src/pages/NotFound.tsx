import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[120px] md:text-[180px] font-black font-['Space_Grotesk'] gradient-text leading-none mb-0">
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['Space_Grotesk'] mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
            >
              <Home size={18} />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium glass gradient-border text-white transition-all hover:glass-hover"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </motion.div>

        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-5 animate-blob"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-5 animate-blob-delay-2"
          style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
      </div>
    </div>
  );
}
