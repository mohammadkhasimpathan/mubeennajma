import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Search, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CommandItem } from '@/types';

const commandItems: CommandItem[] = [
  { id: 'home', title: 'Home', href: '/', section: 'Navigation', icon: '🏠' },
  { id: 'about', title: 'About Me', href: '/about', section: 'Navigation', icon: '👤' },
  { id: 'skills', title: 'Skills', href: '/skills', section: 'Navigation', icon: '⚡' },
  { id: 'experience', title: 'Experience', href: '/experience', section: 'Navigation', icon: '💼' },
  { id: 'projects', title: 'Projects', href: '/projects', section: 'Navigation', icon: '🚀' },
  { id: 'services', title: 'Services', href: '/services', section: 'Navigation', icon: '🛠' },
  { id: 'certificates', title: 'Certificates', href: '/certificates', section: 'Navigation', icon: '🏆' },
  { id: 'hackathons', title: 'Hackathons', href: '/hackathons', section: 'Navigation', icon: '💡' },
  { id: 'blog', title: 'Blog', href: '/blog', section: 'Navigation', icon: '📝' },
  { id: 'contact', title: 'Contact', href: '/contact', section: 'Navigation', icon: '📬' },
  { id: 'github', title: 'GitHub Profile', href: 'https://github.com/mubeennajma', section: 'Links', icon: '🐙' },
  { id: 'linkedin', title: 'LinkedIn Profile', href: 'https://linkedin.com/in/mubeennajma', section: 'Links', icon: '💼' },
  { id: 'resume', title: 'Download Resume', href: '/assets/resume.pdf', section: 'Actions', icon: '📄' },
];

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filtered = commandItems.filter(
    item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.section?.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback((item: CommandItem) => {
    if (item.href.startsWith('http') || item.href.startsWith('/assets')) {
      window.open(item.href, '_blank');
    } else {
      navigate(item.href);
    }
    onClose();
    setQuery('');
  }, [navigate, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % filtered.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + filtered.length) % filtered.length);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) handleSelect(filtered[selectedIndex]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, handleSelect, onClose]);

  useEffect(() => { setSelectedIndex(0); }, [query]);

  // Group items by section
  const grouped = filtered.reduce((acc, item) => {
    const key = item.section || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[9999] w-full max-w-xl"
          >
            <div className="glass gradient-border rounded-2xl overflow-hidden shadow-2xl"
              style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.15)' }}>
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8">
                <Search size={18} className="text-slate-500" />
                <input
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search pages, actions..."
                  className="flex-1 bg-transparent text-white placeholder:text-slate-500 outline-none text-sm"
                />
                <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
                  <X size={16} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-slate-500 text-sm">
                    No results for "{query}"
                  </div>
                ) : (
                  Object.entries(grouped).map(([section, items]) => (
                    <div key={section}>
                      <div className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-slate-600">
                        {section}
                      </div>
                      {items.map(item => {
                        const globalIndex = filtered.indexOf(item);
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                              selectedIndex === globalIndex
                                ? 'bg-violet-500/20 text-white'
                                : 'text-slate-300 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <span>{item.icon}</span>
                            <span>{item.title}</span>
                            <ArrowRight size={14} className="ml-auto opacity-40" />
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/5 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">↑↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">↵</kbd> select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 font-mono">esc</kbd> close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
