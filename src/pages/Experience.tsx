import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Calendar, ExternalLink } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { fadeInUp, timelineItem } from '@/animations/variants';
import experienceData from '@/data/experience.json';
import type { Experience } from '@/types';

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  const formatDate = (d: string) => new Date(d + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

  return (
    <motion.div
      variants={timelineItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative flex gap-6"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-4 h-4 rounded-full border-2 border-violet-500 mt-6 z-10"
          style={{ background: 'rgb(10,10,15)', boxShadow: '0 0 12px rgba(139,92,246,0.6)' }} />
        {index < experienceData.length - 1 && (
          <div className="flex-1 w-px mt-2"
            style={{ background: 'linear-gradient(to bottom, rgba(139,92,246,0.4), transparent)' }} />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-8">
        <div className="glass gradient-border rounded-2xl overflow-hidden">
          {/* Header */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-start gap-4 p-6 text-left"
          >
            {/* Company Logo */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${exp.color} flex items-center justify-center flex-shrink-0 text-white font-bold text-lg font-['Space_Grotesk']`}>
              {exp.company.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-white font-bold font-['Space_Grotesk'] text-lg">{exp.role}</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium text-violet-400"
                  style={{ background: 'rgba(139,92,246,0.15)' }}>
                  {exp.type}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="font-semibold text-violet-300">{exp.company}</span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} /> {exp.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                </span>
              </div>
            </div>

            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-slate-400 flex-shrink-0 mt-1"
            >
              <ChevronDown size={20} />
            </motion.div>
          </button>

          {/* Expandable content */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="px-6 pb-6">
                  <div className="h-px mb-5" style={{ background: 'rgba(255,255,255,0.06)' }} />

                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{exp.description}</p>

                  <h4 className="text-white font-semibold mb-3 text-sm">Key Responsibilities</h4>
                  <ul className="space-y-2 mb-5">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-white font-semibold mb-3 text-sm">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map(tech => (
                      <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-medium text-violet-300"
                        style={{ background: 'rgba(139,92,246,0.15)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="Professional Background"
          title="Work Experience"
          subtitle="My internship experiences that gave me hands-on exposure to real-world engineering and development challenges."
        />

        <div className="mt-8">
          {(experienceData as Experience[]).map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 glass gradient-border rounded-2xl p-8 text-center"
        >
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-white font-bold font-['Space_Grotesk'] text-xl mb-3">
            Ready for New Opportunities
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            I'm actively looking for full-time positions where I can contribute my skills in Full Stack Development and Embedded Systems.
          </p>
          <a
            href="mailto:mubeennajma@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
          >
            <ExternalLink size={16} />
            Get In Touch
          </a>
        </motion.div>

      </div>
    </div>
  );
}
