import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeInUp } from '@/animations/variants';
import servicesData from '@/data/services.json';
import type { Service } from '@/types';

// Icon map using emoji as fallback (saves bundle size vs importing all lucide icons)
const iconMap: Record<string, string> = {
  Globe: '🌐', Server: '🖥️', Layout: '🎨', Wifi: '📡',
  Cpu: '🔬', Code2: '☕', Zap: '⚡', Database: '🗄️',
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="glass gradient-border rounded-2xl p-6 group hover:glass-hover transition-all"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform`}>
        {iconMap[service.icon] || '🛠️'}
      </div>

      <h3 className="text-white font-bold font-['Space_Grotesk'] text-xl mb-3">{service.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-5">{service.description}</p>

      {/* Features */}
      <ul className="space-y-2 mb-5">
        {service.features.map(feature => (
          <li key={feature} className="flex items-center gap-2 text-sm text-slate-400">
            <CheckCircle size={14} className="text-violet-400 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/6">
        {service.technologies.map(tech => (
          <span key={tech} className="px-2 py-0.5 rounded-md text-xs text-violet-300"
            style={{ background: 'rgba(139,92,246,0.15)' }}>
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="What I Offer"
          title="Services"
          subtitle="From embedded firmware to full-stack web apps, I bring end-to-end technical capabilities to your projects."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {(servicesData as Service[]).map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>

        {/* CTA section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 glass gradient-border rounded-3xl p-10 text-center relative overflow-hidden"
        >
          {/* Blob */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)' }} />

          <h2 className="text-3xl font-bold text-white font-['Space_Grotesk'] mb-4">
            Ready to Build Something <span className="gradient-text">Amazing?</span>
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
            Whether it's a complex web application, an IoT system, or a Java backend, I'm ready to bring your vision to life.
          </p>
          <a
            href="mailto:mubeennajma@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
          >
            Let's Work Together
          </a>
        </motion.div>

      </div>
    </div>
  );
}
