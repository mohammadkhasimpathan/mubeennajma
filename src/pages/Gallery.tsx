import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeInUp, backdropVariants, modalVariants } from '@/animations/variants';

// Gallery items with gradient placeholder colors
const galleryItems = [
  { id: 1, title: 'ExcelR Internship', category: 'Internship', color: 'linear-gradient(135deg, #667eea, #764ba2)', aspect: 'tall' },
  { id: 2, title: 'Robotics Project', category: 'Projects', color: 'linear-gradient(135deg, #f093fb, #f5576c)', aspect: 'wide' },
  { id: 3, title: 'Hackathon 2023', category: 'Hackathon', color: 'linear-gradient(135deg, #4facfe, #00f2fe)', aspect: 'normal' },
  { id: 4, title: 'College Fest', category: 'Events', color: 'linear-gradient(135deg, #43e97b, #38f9d7)', aspect: 'tall' },
  { id: 5, title: 'NSS Volunteer', category: 'Volunteer', color: 'linear-gradient(135deg, #fa709a, #fee140)', aspect: 'normal' },
  { id: 6, title: 'VLSI Internship', category: 'Internship', color: 'linear-gradient(135deg, #30cfd0, #5614d4)', aspect: 'wide' },
  { id: 7, title: 'IoT Demo', category: 'Projects', color: 'linear-gradient(135deg, #a18cd1, #fbc2eb)', aspect: 'normal' },
  { id: 8, title: 'Team Collaboration', category: 'Events', color: 'linear-gradient(135deg, #ffecd2, #fcb69f)', aspect: 'normal' },
  { id: 9, title: 'Arduino Workshop', category: 'Events', color: 'linear-gradient(135deg, #a1c4fd, #c2e9fb)', aspect: 'tall' },
];

const categories = ['All', 'Internship', 'Projects', 'Hackathon', 'Events', 'Volunteer'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(g => g.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="Moments"
          title="Gallery"
          subtitle="A visual journey through my projects, events, internships, and memorable moments."
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat ? 'text-white' : 'glass text-slate-400 hover:text-white hover:glass-hover'
              }`}
              style={activeCategory === cat ? { background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          <AnimatePresence>
            {filtered.map(item => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                layout
                className="break-inside-avoid cursor-pointer group relative rounded-2xl overflow-hidden"
                onClick={() => setLightboxItem(item)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: '1rem' }}
              >
                <div
                  className="w-full"
                  style={{
                    background: item.color,
                    height: item.aspect === 'tall' ? '320px' : item.aspect === 'wide' ? '200px' : '240px',
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="text-white/30 text-4xl font-bold font-['Space_Grotesk'] mb-2">
                      {item.id.toString().padStart(2, '0')}
                    </div>
                    <div className="text-white/60 text-sm">{item.category}</div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                  <p className="text-white font-medium text-sm">{item.title}</p>
                  <p className="text-white/70 text-xs">{item.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[9990] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-3xl overflow-hidden"
            >
              <div className="w-full h-80" style={{ background: lightboxItem.color }} />
              <div className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                <p className="text-white font-bold text-xl font-['Space_Grotesk']">{lightboxItem.title}</p>
                <p className="text-white/70 text-sm">{lightboxItem.category}</p>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
