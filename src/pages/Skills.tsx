import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeInUp } from '@/animations/variants';
import { useInView } from '@/hooks';
import skills from '@/data/skills.json';
import type { SkillCategory } from '@/types';

// ---- Animated skill bar ----
function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const { ref, inView } = useInView(0.3);

  return (
    <div className="mb-4" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-sm text-slate-400">{level}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
}

// ---- Circular progress ----
function CircularSkill({ name, level, color }: { name: string; level: number; color: string }) {
  const { ref, inView } = useInView(0.3);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={fadeInUp}
      className="flex flex-col items-center gap-3 p-4 glass rounded-2xl hover:glass-hover transition-all"
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <motion.circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference - (level / 100) * circumference } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-sm">{level}%</span>
        </div>
      </div>
      <span className="text-white text-sm font-medium text-center">{name}</span>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...(skills as SkillCategory[]).map(s => s.category)];

  const filteredCategories = activeCategory === 'All'
    ? (skills as SkillCategory[])
    : (skills as SkillCategory[]).filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="Technical Expertise"
          title="Skills & Technologies"
          subtitle="A comprehensive overview of my technical skills across various domains, from web development to embedded systems."
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'text-white shadow-lg'
                  : 'glass text-slate-400 hover:text-white hover:glass-hover'
              }`}
              style={activeCategory === cat ? { background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Display */}
        {filteredCategories.map((category: SkillCategory) => (
          <div key={category.category} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(139,92,246,0.2)' }}>
                <span className="text-violet-400 text-lg">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk']">{category.category}</h3>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            </div>

            {/* Two views: circular for smaller categories, bars for larger */}
            {category.skills.length <= 4 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
              >
                {category.skills.map(skill => (
                  <CircularSkill key={skill.name} {...skill} />
                ))}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                {category.skills.map(skill => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* GitHub Stats Placeholder */}
        <section className="mt-8">
          <SectionHeader
            eyebrow="Open Source"
            title="GitHub Activity"
            subtitle="My contributions and open-source involvement on GitHub."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Total Repos', value: '15+', icon: '📦', color: 'from-violet-500 to-purple-600' },
              { label: 'Total Stars', value: '20+', icon: '⭐', color: 'from-amber-500 to-orange-600' },
              { label: 'Contributions', value: '200+', icon: '💚', color: 'from-green-500 to-emerald-600' },
            ].map(stat => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass gradient-border rounded-2xl p-6 text-center"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-3xl font-bold font-['Space_Grotesk'] gradient-text mb-1`}>{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Contribution graph placeholder */}
          <div className="glass gradient-border rounded-2xl p-6">
            <h4 className="text-white font-semibold mb-4 text-sm">Contribution Calendar</h4>
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(52, minmax(0,1fr))' }}>
              {Array.from({ length: 365 }).map((_, i) => {
                const intensity = Math.random();
                const opacity = intensity < 0.3 ? 0.06 : intensity < 0.6 ? 0.3 : intensity < 0.8 ? 0.6 : 1;
                return (
                  <div
                    key={i}
                    className="aspect-square rounded-sm"
                    style={{ background: `rgba(139,92,246,${opacity})` }}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-end gap-2 mt-3 text-xs text-slate-500">
              <span>Less</span>
              {[0.06, 0.3, 0.6, 1].map(o => (
                <div key={o} className="w-3 h-3 rounded-sm" style={{ background: `rgba(139,92,246,${o})` }} />
              ))}
              <span>More</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
