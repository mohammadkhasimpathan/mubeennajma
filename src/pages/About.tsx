import React from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { fadeInUp, staggerContainer, fadeInLeft, fadeInRight } from '@/animations/variants';
import profile from '@/data/profile.json';
import education from '@/data/education.json';
import type { Education } from '@/types';

// Timeline milestone data
const milestones = [
  { year: '2018', event: 'Completed SSC with 9.2 GPA', icon: '🎓' },
  { year: '2020', event: 'Completed Intermediate (MPC) with 94.5%', icon: '📚' },
  { year: '2020', event: 'Started B.Tech at JNTU Hyderabad', icon: '🏛️' },
  { year: '2022', event: 'South Central Railways Telecom Internship', icon: '🚂' },
  { year: '2023', event: 'Line Following Robot Project', icon: '🤖' },
  { year: '2023', event: 'VLSI Internship at Skill Dzire', icon: '💾' },
  { year: '2023', event: 'Myntra & L\'Oréal Hackathon Participation', icon: '🏆' },
  { year: '2024', event: 'Java Full Stack Internship at ExcelR Solutions', icon: '💼' },
  { year: '2024', event: 'Completed B.Tech with 7.8 CGPA', icon: '🎉' },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===================== INTRO ===================== */}
        <section className="mb-24">
          <SectionHeader eyebrow="Who I Am" title="About Me" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image Placeholder */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-3xl opacity-30 blur-2xl animate-pulse-glow"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }} />
                {/* Avatar */}
                <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl gradient-border overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))' }}>
                    {/* Large initials */}
                    <div className="text-center">
                      <div className="text-7xl font-bold gradient-text font-['Space_Grotesk'] mb-2">MN</div>
                      <div className="text-slate-400 text-sm tracking-wider">Shaik Mubeen Najma</div>
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-4 -right-4 glass gradient-border rounded-2xl px-4 py-2 text-sm font-medium text-white"
                >
                  🎓 B.Tech ECE
                </motion.div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white font-['Space_Grotesk'] mb-6">
                Electronics Engineer turned{' '}
                <span className="gradient-text">Full Stack Developer</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                {profile.bio}
              </p>

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { icon: MapPin, label: 'Location', value: profile.location },
                  { icon: Mail, label: 'Email', value: profile.email },
                  { icon: Phone, label: 'Phone', value: profile.phone },
                  { icon: Calendar, label: 'Experience', value: `${profile.yearsOfExperience}+ Years` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 glass rounded-xl p-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(139,92,246,0.2)' }}>
                      <Icon size={15} className="text-violet-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">{label}</div>
                      <div className="text-white text-sm font-medium">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
              >
                <Download size={18} />
                Download Resume
              </a>
            </motion.div>
          </div>
        </section>

        {/* ===================== CAREER TIMELINE ===================== */}
        <section className="mb-24">
          <SectionHeader eyebrow="My Journey" title="Career Timeline" subtitle="Key milestones that shaped my professional and academic path." />

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent hidden md:block" />

            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div className={`glass gradient-border rounded-2xl p-5 max-w-md ${i % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{milestone.icon}</span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full text-violet-400 bg-violet-500/10">
                          {milestone.year}
                        </span>
                      </div>
                      <p className="text-white text-sm font-medium">{milestone.event}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-4 h-4 rounded-full border-2 border-violet-500 flex-shrink-0"
                    style={{ background: 'rgb(10,10,15)', boxShadow: '0 0 10px rgba(139,92,246,0.5)' }} />

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== EDUCATION ===================== */}
        <section>
          <SectionHeader eyebrow="Academic Background" title="Education" subtitle="My educational journey from school to engineering graduate." />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {(education as Education[]).map(edu => (
              <motion.div
                key={edu.id}
                variants={fadeInUp}
                className="glass gradient-border rounded-2xl p-6"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${edu.color} flex items-center justify-center mb-4`}>
                  <span className="text-white text-xl">
                    {edu.type === 'graduation' ? '🎓' : edu.type === 'intermediate' ? '📚' : '🏫'}
                  </span>
                </div>
                <div className="text-xs text-violet-400 font-semibold tracking-wider uppercase mb-2">
                  {edu.startYear} – {edu.endYear}
                </div>
                <h3 className="text-white font-bold font-['Space_Grotesk'] text-lg mb-1">{edu.degree}</h3>
                <p className="text-violet-300 text-sm mb-1">{edu.field}</p>
                <p className="text-slate-400 text-sm mb-3">{edu.shortInstitution}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(139,92,246,0.15)', color: '#A78BFA' }}>
                  Grade: {edu.grade}
                </div>
                <p className="text-slate-500 text-xs mt-3 leading-relaxed">{edu.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
    </div>
  );
}
