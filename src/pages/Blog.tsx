import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Tag, Clock, Calendar, ArrowRight, X } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { staggerContainer, fadeInUp } from '@/animations/variants';
import blogsData from '@/data/blogs.json';
import type { BlogPost } from '@/types';

const gradients = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('');

  const categories = ['All', ...Array.from(new Set((blogsData as BlogPost[]).map(b => b.category)))];
  const allTags = Array.from(new Set((blogsData as BlogPost[]).flatMap(b => b.tags)));

  const filtered = useMemo(() => {
    return (blogsData as BlogPost[]).filter(post => {
      const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchTag = !activeTag || post.tags.includes(activeTag);
      return matchSearch && matchCategory && matchTag;
    });
  }, [search, activeCategory, activeTag]);

  const featured = (blogsData as BlogPost[]).filter(b => b.featured);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="Thoughts & Insights"
          title="Blog"
          subtitle="I write about web development, embedded systems, electronics, and my journey as an engineer."
        />

        {/* Featured Post */}
        {featured.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4">Featured</p>
            <Link to={`/blog/${featured[0].slug}`} className="block group">
              <div className="glass gradient-border rounded-3xl overflow-hidden md:flex">
                <div className="md:w-2/5 h-56 md:h-auto relative"
                  style={{ background: gradients[0] }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/20 text-6xl font-bold font-['Space_Grotesk']">
                      {featured[0].title.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="p-8 md:w-3/5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium text-violet-400"
                      style={{ background: 'rgba(139,92,246,0.15)' }}>
                      {featured[0].category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock size={11} /> {featured[0].readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-3 group-hover:text-violet-400 transition-colors">
                    {featured[0].title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{featured[0].excerpt}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Calendar size={13} />
                      {new Date(featured[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-violet-400 font-medium flex items-center gap-1">
                      Read More <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Posts Grid */}
          <div className="lg:col-span-3">
            {/* Search & filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl glass border border-white/8 text-white placeholder:text-slate-500 text-sm outline-none focus:border-violet-500/50"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeCategory === cat ? 'text-white' : 'glass text-slate-400 hover:text-white'
                    }`}
                    style={activeCategory === cat ? { background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Active tag filter */}
            {activeTag && (
              <div className="flex items-center gap-2 mb-5">
                <span className="text-slate-400 text-sm">Filtered by tag:</span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs text-violet-400"
                  style={{ background: 'rgba(139,92,246,0.15)' }}>
                  #{activeTag}
                  <button onClick={() => setActiveTag('')}><X size={10} /></button>
                </span>
              </div>
            )}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filtered.length > 0 ? filtered.map((post, i) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Link to={`/blog/${post.slug}`} className="block glass gradient-border rounded-2xl overflow-hidden group hover:glass-hover transition-all"
                    style={{ textDecoration: 'none' }}>
                    <div className="h-40 relative" style={{ background: gradients[i % gradients.length] }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/20 text-5xl font-bold font-['Space_Grotesk']">{post.title.charAt(0)}</span>
                      </div>
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs text-white"
                        style={{ background: 'rgba(0,0,0,0.4)' }}>
                        {post.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                        <span className="flex items-center gap-1"><Calendar size={11} />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                      </div>
                      <h3 className="text-white font-bold font-['Space_Grotesk'] mb-2 group-hover:text-violet-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {post.tags.slice(0, 3).map(tag => (
                          <button
                            key={tag}
                            onClick={e => { e.preventDefault(); setActiveTag(tag); }}
                            className="px-2 py-0.5 rounded-md text-xs text-slate-500 hover:text-violet-400 transition-colors"
                            style={{ background: 'rgba(255,255,255,0.04)' }}
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )) : (
                <div className="col-span-2 text-center py-12 text-slate-500">
                  No posts found. <button onClick={() => { setSearch(''); setActiveCategory('All'); setActiveTag(''); }} className="text-violet-400 hover:underline">Clear filters</button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="glass rounded-2xl p-5">
              <h3 className="text-white font-bold font-['Space_Grotesk'] mb-4 text-sm">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all ${
                      activeTag === tag ? 'text-white' : 'text-slate-400 hover:text-violet-400'
                    }`}
                    style={activeTag === tag
                      ? { background: 'rgba(139,92,246,0.3)' }
                      : { background: 'rgba(255,255,255,0.04)' }
                    }
                  >
                    <Tag size={10} />#{tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <h3 className="text-white font-bold font-['Space_Grotesk'] mb-4 text-sm">Recent Posts</h3>
              <div className="space-y-3">
                {(blogsData as BlogPost[]).slice(0, 4).map(post => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="flex gap-3 group">
                    <div className="w-12 h-12 rounded-lg flex-shrink-0" style={{ background: gradients[Math.floor(Math.random() * gradients.length)] }} />
                    <div>
                      <p className="text-white text-xs font-medium group-hover:text-violet-400 transition-colors line-clamp-2">{post.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{post.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
}
