import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, X, ChevronRight, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeInUp, modalVariants, backdropVariants } from '@/animations/variants';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types';

const categories = ['All', 'Full Stack', 'IoT / Embedded', 'Embedded Systems'];

// Placeholder gradient images for projects
const projectGradients: Record<string, string> = {
  ecommerce: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'movie-ticket': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'traffic-monitoring': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'line-follower': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      variants={fadeInUp}
      layout
      className="glass gradient-border rounded-2xl overflow-hidden cursor-pointer group"
      onClick={onClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <div className="w-full h-full transition-transform duration-500 group-hover:scale-105"
          style={{ background: projectGradients[project.id] || projectGradients.ecommerce }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/30 text-6xl font-bold font-['Space_Grotesk']">
              {project.title.charAt(0)}
            </span>
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-amber-400"
            style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)' }}>
            <Star size={10} fill="currentColor" />
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs text-white/80"
          style={{ background: 'rgba(0,0,0,0.4)' }}>
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-bold font-['Space_Grotesk'] text-lg leading-tight flex-1">{project.title}</h3>
          <ChevronRight size={18} className="text-slate-500 group-hover:text-violet-400 transition-colors mt-0.5 flex-shrink-0" />
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.shortDescription}</p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 4).map(tech => (
            <span key={tech} className="px-2 py-0.5 rounded-md text-xs text-violet-300"
              style={{ background: 'rgba(139,92,246,0.15)' }}>
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-xs text-slate-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-slate-300 hover:text-white text-xs transition-all hover:glass-hover"
          >
            <FaGithub size={13} />
            Code
          </a>
          {project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
            >
              <ExternalLink size={13} />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
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
          className="w-full max-w-2xl max-h-[85vh] overflow-y-auto glass gradient-border rounded-3xl"
          style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
        >
          {/* Hero */}
          <div className="relative h-52 rounded-t-3xl overflow-hidden">
            <div className="w-full h-full"
              style={{ background: projectGradients[project.id] || projectGradients.ecommerce }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/20 text-8xl font-bold font-['Space_Grotesk']">
                  {project.title.charAt(0)}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white font-['Space_Grotesk']">{project.title}</h2>
                <span className="text-violet-400 text-sm">{project.category} · {project.year}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium text-green-400`}
                style={{ background: 'rgba(34,197,94,0.15)' }}>
                {project.status}
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.description}</p>

            <h4 className="text-white font-semibold mb-3 text-sm">Key Features</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <h4 className="text-white font-semibold mb-2 text-sm">Challenges & Solutions</h4>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{project.challenges}</p>

            <h4 className="text-white font-semibold mb-3 text-sm">Technologies</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map(tech => (
                <span key={tech} className="px-3 py-1 rounded-xl text-sm text-violet-300"
                  style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-slate-300 hover:text-white text-sm transition-all">
                <FaGithub size={15} /> View Code
              </a>
              {project.liveUrl !== '#' && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    return (projectsData as Project[]).filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="My Work"
          title="Projects"
          subtitle="A collection of projects that demonstrate my skills in full-stack development, IoT, and embedded systems."
        />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl glass border border-white/8 text-white placeholder:text-slate-500 text-sm outline-none focus:border-violet-500/50 transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'text-white'
                    : 'glass text-slate-400 hover:text-white hover:glass-hover'
                }`}
                style={activeCategory === cat ? { background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filtered.length > 0 ? (
              filtered.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))
            ) : (
              <motion.div
                variants={fadeInUp}
                className="col-span-2 text-center py-16 text-slate-500"
              >
                No projects found for "{searchQuery}"
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
