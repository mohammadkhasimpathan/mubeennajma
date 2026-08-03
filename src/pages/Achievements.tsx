import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeInUp } from '@/animations/variants';
import { useInView } from '@/hooks';
import achievementsData from '@/data/achievements.json';
import type { Achievement } from '@/types';

const iconMap: Record<string, string> = {
  Heart: '❤️', Users: '👥', Trophy: '🏆', BookOpen: '📖',
};

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const { ref, inView } = useInView(0.3);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={fadeInUp}
      className="glass gradient-border rounded-3xl p-8 text-center group hover:glass-hover transition-all"
      whileHover={{ y: -6 }}
    >
      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-3xl mx-auto mb-5 group-hover:scale-110 transition-transform`}>
        {iconMap[achievement.icon] || '⭐'}
      </div>

      {/* Animated counter */}
      <div className="text-4xl font-bold gradient-text font-['Space_Grotesk'] mb-1">
        {inView ? achievement.stat : '0'}
      </div>
      <div className="text-violet-400 text-sm font-medium mb-3">{achievement.statLabel}</div>

      <h3 className="text-white font-bold font-['Space_Grotesk'] text-lg mb-2">{achievement.title}</h3>
      <p className="text-slate-500 text-xs mb-2">{achievement.organization}</p>
      <p className="text-slate-400 text-sm leading-relaxed">{achievement.description}</p>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="Extracurricular"
          title="Achievements"
          subtitle="Beyond academics and internships — my contributions to community, leadership, and personal growth."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {(achievementsData as Achievement[]).map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </motion.div>

      </div>
    </div>
  );
}
