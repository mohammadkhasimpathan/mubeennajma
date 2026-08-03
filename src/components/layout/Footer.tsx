import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowUp, Download, Send } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import profile from '@/data/profile.json';

const footerLinks = [
  {
    heading: 'Navigation',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Skills', href: '/skills' },
      { label: 'Projects', href: '/projects' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'More',
    links: [
      { label: 'Experience', href: '/experience' },
      { label: 'Services', href: '/services' },
      { label: 'Certificates', href: '/certificates' },
      { label: 'Hackathons', href: '/hackathons' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/6 mt-24">
      {/* Gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white font-['Space_Grotesk']"
                style={{ background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)' }}>
                MN
              </div>
              <span className="font-bold text-white font-['Space_Grotesk'] text-lg">Mubeen<span className="text-violet-400">.</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Full Stack Developer & ECE Engineer building innovative digital experiences.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaGithub, href: profile.social.github, label: 'GitHub' },
                { icon: FaLinkedin, href: profile.social.linkedin, label: 'LinkedIn' },
                { icon: FaTwitter, href: profile.social.twitter, label: 'Twitter' },
                { icon: Mail, href: profile.social.email, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-violet-400 hover:glass-hover transition-all"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          {footerLinks.map(group => (
            <div key={group.heading}>
              <h3 className="text-white font-semibold mb-4 font-['Space_Grotesk']">{group.heading}</h3>
              <ul className="space-y-2.5">
                {group.links.map(link => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-violet-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-['Space_Grotesk']">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-4">Get notified about new blog posts and projects.</p>
            {subscribed ? (
              <div className="text-green-400 text-sm font-medium">
                ✓ Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-3 py-2.5 rounded-xl glass text-white placeholder:text-slate-500 text-sm outline-none border border-white/8 focus:border-violet-500/50 transition-colors"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
                >
                  <Send size={14} />
                  Subscribe
                </button>
              </form>
            )}

            {/* Download Resume */}
            <a
              href={profile.resumeUrl}
              download
              className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors"
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/6">
          <p className="text-slate-500 text-sm text-center">
            © {new Date().getFullYear()} Shaik Mubeen Najma. Crafted with ❤️ and lots of ☕
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 text-xs">Built with React + Vite</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-violet-400 transition-colors"
            >
              <ArrowUp size={12} />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
