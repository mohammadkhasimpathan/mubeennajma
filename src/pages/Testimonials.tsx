import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import testimonialsData from '@/data/testimonials.json';
import type { Testimonial } from '@/types';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const totalCount = testimonialsData.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!autoplay) return;
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % totalCount);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [autoplay, totalCount]);

  const prev = () => { setAutoplay(false); setCurrent(i => (i - 1 + totalCount) % totalCount); };
  const next = () => { setAutoplay(false); setCurrent(i => (i + 1) % totalCount); };

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="Kind Words"
          title="Testimonials"
          subtitle="What colleagues, mentors, and collaborators say about working with me."
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="glass gradient-border rounded-3xl p-8 md:p-10 relative overflow-hidden"
            >
              {/* Decorative quote */}
              <Quote size={64} className="absolute top-4 right-6 opacity-5 text-violet-400" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: (testimonialsData as Testimonial[])[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white text-lg md:text-xl leading-relaxed mb-8 font-light italic">
                "{(testimonialsData as Testimonial[])[current].testimonial}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                  {(testimonialsData as Testimonial[])[current].name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold font-['Space_Grotesk']">
                    {(testimonialsData as Testimonial[])[current].name}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {(testimonialsData as Testimonial[])[current].role} · {(testimonialsData as Testimonial[])[current].company}
                  </div>
                  <div className="text-violet-400 text-xs mt-0.5">
                    {(testimonialsData as Testimonial[])[current].relation}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button onClick={prev}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:glass-hover transition-all"
              aria-label="Previous">
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {(testimonialsData as Testimonial[]).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoplay(false); setCurrent(i); }}
                  className={`h-2 rounded-full transition-all ${i === current ? 'w-6' : 'w-2 opacity-30'}`}
                  style={{ background: i === current ? '#8B5CF6' : 'rgba(255,255,255,0.3)' }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button onClick={next}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white hover:glass-hover transition-all"
              aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* All testimonials grid (desktop) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(testimonialsData as Testimonial[]).slice(0, 3).map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3 italic">"{t.testimonial}"</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white text-xs font-semibold">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
