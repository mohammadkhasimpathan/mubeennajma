import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Award } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeInUp, modalVariants, backdropVariants } from '@/animations/variants';
import certificatesData from '@/data/certificates.json';
import type { Certificate } from '@/types';

const gradients: Record<string, string> = {
  'from-orange-500 to-red-500': 'linear-gradient(135deg, #f97316, #ef4444)',
  'from-purple-500 to-indigo-500': 'linear-gradient(135deg, #a855f7, #6366f1)',
  'from-green-500 to-teal-500': 'linear-gradient(135deg, #22c55e, #14b8a6)',
  'from-blue-500 to-cyan-500': 'linear-gradient(135deg, #3b82f6, #06b6d4)',
};

function CertificateModal({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[9990] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={e => e.stopPropagation()}
          className="w-full max-w-lg glass gradient-border rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
        >
          {/* Certificate visual */}
          <div className="relative h-48 flex items-center justify-center overflow-hidden"
            style={{ background: gradients[cert.color] || 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
            <div className="text-center text-white">
              <Award size={48} className="mx-auto mb-2 opacity-80" />
              <div className="text-sm font-semibold opacity-80">Certificate of Completion</div>
            </div>
            <button onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white">
              <X size={16} />
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-1">{cert.title}</h2>
            <p className="text-violet-400 text-sm mb-4">{cert.issuer} · {new Date(cert.date + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">{cert.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {cert.skills.map(s => (
                <span key={s} className="px-2.5 py-1 rounded-lg text-xs text-violet-300"
                  style={{ background: 'rgba(139,92,246,0.15)' }}>
                  {s}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-slate-300 hover:text-white text-sm transition-all">
                <ExternalLink size={14} /> View Credential
              </a>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
                onClick={() => alert('Certificate download coming soon!')}
              >
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="Credentials"
          title="Certificates"
          subtitle="Professional certifications and course completions that validate my technical expertise."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {(certificatesData as Certificate[]).map(cert => (
            <motion.div
              key={cert.id}
              variants={fadeInUp}
              className="glass gradient-border rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => setSelectedCert(cert)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {/* Visual */}
              <div className="h-36 flex items-center justify-center relative overflow-hidden"
                style={{ background: gradients[cert.color] || 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
                <Award size={40} className="text-white/70" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>

              <div className="p-4">
                <h3 className="text-white font-bold text-sm font-['Space_Grotesk'] mb-1 line-clamp-2">{cert.title}</h3>
                <p className="text-slate-500 text-xs mb-2">{cert.issuer}</p>
                <p className="text-violet-400 text-xs">
                  {new Date(cert.date + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {selectedCert && (
        <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </div>
  );
}
