import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Calendar } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeInUp } from '@/animations/variants';
import hackathonsData from '@/data/hackathons.json';
import type { Hackathon } from '@/types';

const gradients: Record<string, string> = {
  'from-pink-500 to-rose-500': 'linear-gradient(135deg, #ec4899, #f43f5e)',
  'from-amber-500 to-orange-500': 'linear-gradient(135deg, #f59e0b, #f97316)',
};

export default function Hackathons() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="Innovation & Competition"
          title="Hackathons"
          subtitle="Competing in hackathons to solve real-world problems with innovative tech solutions."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)' }} />

          <div className="space-y-10">
            {(hackathonsData as Hackathon[]).map((hackathon, i) => (
              <motion.div
                key={hackathon.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-8"
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center flex-shrink-0 pt-6 hidden md:flex">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ background: gradients[hackathon.color] || 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
                    {hackathon.badge}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1">
                  <div className="glass gradient-border rounded-3xl p-6 md:p-8 relative overflow-hidden">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-5 blur-3xl"
                      style={{ background: gradients[hackathon.color] }} />

                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="md:hidden text-2xl mb-2">{hackathon.badge}</div>
                        <h3 className="text-white font-bold font-['Space_Grotesk'] text-2xl mb-1">{hackathon.name}</h3>
                        <p className="text-violet-400 font-medium">{hackathon.organizer}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-white text-center"
                          style={{ background: gradients[hackathon.color] || 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
                          {hackathon.achievement}
                        </span>
                        {hackathon.certificate && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium text-green-400 border border-green-500/30 text-center"
                            style={{ background: 'rgba(34,197,94,0.1)' }}>
                            Certified ✓
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Trophy size={14} className="text-amber-400" /> Theme: {hackathon.theme}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={14} className="text-blue-400" /> Team Size: {hackathon.teamSize}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-violet-400" />
                        {new Date(hackathon.date + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{hackathon.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {hackathon.techUsed.map(tech => (
                        <span key={tech} className="px-2.5 py-1 rounded-lg text-xs text-violet-300"
                          style={{ background: 'rgba(139,92,246,0.15)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
