import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowUp, Download, Send, Eye } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
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

function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://api.counterapi.dev/v1/mubeen-portfolio/visits/up')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setCount(data.count))
      .catch(() => setError(true));
  }, []);

  const formatCount = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num).split('');
  };

  return (
    <div title="Total unique visitors to this portfolio" className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
      {/* Badge / Label */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/5 text-xs font-medium text-slate-300 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        <Eye size={14} className="text-violet-400" />
        <span className="tracking-wider">LIVE</span>
      </div>

      {/* Odometer Display */}
      <div className="flex items-end gap-2">
        {error ? (
          <span className="text-slate-500 text-sm">--</span>
        ) : count === null ? (
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-7 h-9 rounded-lg bg-white/5 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="flex items-end gap-0.5">
            {formatCount(count).map((char, index) => (
              char === ',' ? (
                <span key={index} className="text-white/50 font-['Space_Grotesk'] font-bold text-lg mb-0.5 px-0.5">
                  ,
                </span>
              ) : (
                <div key={index} className="w-7 h-10 flex items-center justify-center rounded-lg glass border border-violet-500/30 shadow-[0_4px_15px_rgba(139,92,246,0.15)] overflow-hidden bg-black/40">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1, 
                      type: "spring",
                      stiffness: 100
                    }}
                    className="text-white font-['Space_Grotesk'] font-bold text-lg"
                  >
                    {char}
                  </motion.span>
                </div>
              )
            ))}
          </div>
        )}
        {!error && count !== null && (
          <span className="text-xs text-slate-500 ml-1.5 mb-1.5 hidden sm:block">Portfolio Visitors</span>
        )}
      </div>
    </div>
  );
}

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
              download="Shaik_Mubeen_Najma_Resume.pdf"
              className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-violet-400 transition-colors"
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-8 border-t border-white/6">
          {/* Left Side: Copyright */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <p className="text-slate-500 text-sm mb-1">
              © {new Date().getFullYear()} Shaik Mubeen Najma.
            </p>
            <p className="text-slate-500 text-sm">
              Crafted with ❤️ and lots of ☕
            </p>
          </div>
          
          {/* Right Side: Odometer & Top Scroll */}
          <div className="flex flex-col sm:flex-row items-center gap-6 order-1 lg:order-2">
            <VisitorCounter />
            <div className="hidden sm:block w-px h-8 bg-white/10"></div>
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
