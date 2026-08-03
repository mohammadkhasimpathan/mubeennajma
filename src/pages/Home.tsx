import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Mail, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTypingEffect } from '@/hooks';
import { fadeInUp, staggerContainer } from '@/animations/variants';
import SectionHeader from '@/components/ui/SectionHeader';
import profile from '@/data/profile.json';
import techstack from '@/data/techstack.json';
import type { TechItem } from '@/types';

const HeroCanvas = lazy(() => import('@/components/3d/HeroCanvas'));

// -------- Tech logo strip component --------
function TechStrip() {
  return (
    <div className="relative overflow-hidden py-8 border-y border-white/6 my-16">
      <div className="flex gap-8 animate-[scroll_30s_linear_infinite]"
        style={{
          width: 'max-content',
          animation: 'scroll 30s linear infinite',
        }}
      >
        {[...techstack, ...techstack].map((tech: TechItem, i: number) => (
          <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-slate-400 whitespace-nowrap text-sm">
            <span style={{ color: tech.color }}>◆</span>
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// -------- Stat Counter Card --------
function StatCard({ stat }: { stat: { label: string; value: number; suffix: string } }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass gradient-border rounded-2xl p-6 text-center"
    >
      <div className="text-3xl md:text-4xl font-bold gradient-text font-['Space_Grotesk'] mb-1">
        {stat.value}{stat.suffix}
      </div>
      <div className="text-slate-400 text-sm">{stat.label}</div>
    </motion.div>
  );
}

export default function Home() {
  const typedRole = useTypingEffect(profile.roles, 80, 40, 2000);

  return (
    <div className="min-h-screen">
      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center pt-32 pb-16 overflow-hidden px-4">
        {/* Animated blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 animate-blob"
          style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 animate-blob-delay-2"
          style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-6 animate-blob-delay-4"
          style={{ background: 'radial-gradient(circle, #06B6D4, transparent 70%)' }} />

        {/* Three.js canvas */}
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-green-500/30 text-green-400 text-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {profile.availability}
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 text-lg mb-2"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl min-[360px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black font-['Space_Grotesk'] tracking-tighter leading-[1.1] mb-6"
          >
            <span className="text-white">Shaik </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#6D28D9] to-[#3B82F6] filter drop-shadow-lg">
              Mubeen
            </span>
            <br />
            <span className="text-white">Najma</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-slate-400 text-lg mb-3"
          >
            {profile.tagline}
          </motion.p>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-semibold mb-12 h-8 font-['Space_Grotesk']"
          >
            <span className="gradient-text">{typedRole}</span>
            <span className="animate-pulse text-violet-400">|</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto gap-3 sm:gap-4"
          >
            <a
              href={profile.resumeUrl}
              download="Shaik_Mubeen_Najma_Resume.pdf"
              className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
            >
              <Download size={18} />
              Download Resume
            </a>
            <Link
              to="/projects"
              className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 rounded-xl font-medium glass gradient-border text-white transition-all hover:glass-hover"
            >
              <Eye size={18} />
              View Projects
            </Link>
            <Link
              to="/contact"
              className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 rounded-xl font-medium text-violet-400 border border-violet-500/30 hover:bg-violet-500/10 transition-all"
            >
              <Mail size={18} />
              Hire Me
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={16} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Strip */}
      <div className="max-w-7xl mx-auto px-4">
        <TechStrip />
      </div>

      {/* ===================== STATS ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <SectionHeader
          eyebrow="At a Glance"
          title="Numbers That Define My Journey"
          subtitle="A snapshot of my professional growth and technical accomplishments."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {profile.stats.map(stat => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>
      </section>

      {/* ===================== CURRENTLY LEARNING ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <SectionHeader
          eyebrow="Growth Mindset"
          title="Currently Learning"
          subtitle="Technologies and concepts I'm actively studying right now."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {profile.currentlyLearning.map((item, i) => (
            <motion.div
              key={item}
              variants={fadeInUp}
              custom={i}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass gradient-border text-white text-sm font-medium"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#8B5CF6' }} />
              {item}
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
