import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, Menu, X, Download } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import profile from '@/data/profile.json';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

interface NavbarProps {
  onCommandPalette: () => void;
}

export default function Navbar({ onCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-4 md:mx-8 lg:mx-16 px-4 md:px-6 rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'glass border border-white/8 shadow-2xl'
              : 'bg-transparent'
          }`}
          style={scrolled ? { boxShadow: '0 8px 32px rgba(0,0,0,0.4)' } : {}}
        >
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm font-['Space_Grotesk']"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                MN
              </div>
              <span className="font-semibold text-white hidden sm:block font-['Space_Grotesk']">
                Mubeen<span className="text-violet-400">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.href;
                return (
                  <motion.li
                    key={link.href}
                    custom={i}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                  >
                    <Link
                      to={link.href}
                      className={`relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-lg"
                          style={{ background: 'rgba(139, 92, 246, 0.2)' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative">{link.label}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Command Palette Trigger */}
              <button
                onClick={onCommandPalette}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-slate-400 hover:text-white text-xs transition-all hover:glass-hover"
                aria-label="Open command palette"
              >
                <Command size={13} />
                <span className="hidden lg:inline">Search</span>
                <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] opacity-60">
                  <span>⌘</span><span>K</span>
                </kbd>
              </button>

              <ThemeToggle />

              {/* Download CV */}
              <a
                href={profile.resumeUrl}
                download="Shaik_Mubeen_Najma_Resume.pdf"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
              >
                <Download size={13} />
                <span>Resume</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 rounded-lg glass flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} className="text-white" /> : <Menu size={18} className="text-slate-300" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 mx-4 rounded-2xl glass border border-white/8 py-4 px-4 lg:hidden"
            style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map(link => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-violet-500/20 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2 border-t border-white/6">
                <a
                  href={profile.resumeUrl}
                  download="Shaik_Mubeen_Najma_Resume.pdf"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
                >
                  <Download size={14} />
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
