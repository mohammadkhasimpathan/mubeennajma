import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { fadeInUp } from '@/animations/variants';
import { Skeleton } from '@/components/ui/Skeleton';
import blogsData from '@/data/blogs.json';
import type { BlogPost } from '@/types';

// Map content filenames to static import paths (placed in public/content/blog/)
const contentMap: Record<string, string> = {
  'react19.md': '/content/blog/react19.md',
  'arduino-iot.md': '/content/blog/arduino-iot.md',
  'spring-boot.md': '/content/blog/spring-boot.md',
  'vlsi.md': '/content/blog/vlsi.md',
  'journey.md': '/content/blog/journey.md',
};

const gradients = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const allPosts = blogsData as BlogPost[];
  const post = allPosts.find(b => b.slug === slug);
  const currentIndex = allPosts.findIndex(b => b.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  useEffect(() => {
    if (!post) { navigate('/blog'); return; }
    setLoading(true);
    const url = contentMap[post.content];
    if (url) {
      fetch(url)
        .then(r => r.text())
        .then(text => {
          setContent(text);
          setLoading(false);
        })
        .catch(() => {
          setContent('Content could not be loaded.');
          setLoading(false);
        });
    } else {
      setContent('Content file not found.');
      setLoading(false);
    }
  }, [slug, post, navigate]);

  if (!post) return null;

  const gradient = gradients[currentIndex % gradients.length];

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm">
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl overflow-hidden mb-10 h-56"
          style={{ background: gradient }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/20 text-8xl font-bold font-['Space_Grotesk']">{post.title.charAt(0)}</span>
          </div>
        </motion.div>

        {/* Meta */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-violet-400"
              style={{ background: 'rgba(139,92,246,0.15)' }}>
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={11} /> {post.readTime}
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Calendar size={11} />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white font-['Space_Grotesk'] mb-4 leading-tight">{post.title}</h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">{post.excerpt}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-slate-400"
                style={{ background: 'rgba(255,255,255,0.06)' }}>
                <Tag size={10} />#{tag}
              </span>
            ))}
          </div>

          <div className="h-px mb-8" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className={`h-4 ${i % 3 === 2 ? 'w-3/4' : 'w-full'}`} />
              ))}
            </div>
          ) : (
            <div className="prose-portfolio">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    const { className, children, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    if (!match) {
                      return <code className={className} {...rest}>{children}</code>;
                    }
                    return (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          background: 'rgb(15,15,25)',
                          border: '1px solid rgba(139,92,246,0.2)',
                          borderRadius: '0.75rem',
                          padding: '1.25rem',
                          margin: '1.5rem 0',
                          fontSize: '0.875rem',
                        }}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </motion.div>

        {/* Share */}
        <div className="flex items-center gap-3 mt-10 pt-8 border-t border-white/6">
          <span className="text-slate-400 text-sm">Share:</span>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
              } else {
                navigator.clipboard?.writeText(window.location.href);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-slate-400 hover:text-white text-sm transition-all hover:glass-hover"
          >
            <Share2 size={14} /> Share
          </button>
        </div>

        {/* Prev / Next Navigation */}
        <div className="grid grid-cols-2 gap-4 mt-10">
          {prevPost ? (
            <Link to={`/blog/${prevPost.slug}`} className="glass gradient-border rounded-2xl p-4 group hover:glass-hover transition-all">
              <div className="flex items-center gap-2 text-slate-500 text-xs mb-2">
                <ArrowLeft size={12} /> Previous
              </div>
              <p className="text-white text-sm font-medium group-hover:text-violet-400 transition-colors line-clamp-2">
                {prevPost.title}
              </p>
            </Link>
          ) : <div />}

          {nextPost ? (
            <Link to={`/blog/${nextPost.slug}`} className="glass gradient-border rounded-2xl p-4 group hover:glass-hover transition-all text-right">
              <div className="flex items-center justify-end gap-2 text-slate-500 text-xs mb-2">
                Next <ArrowRight size={12} />
              </div>
              <p className="text-white text-sm font-medium group-hover:text-violet-400 transition-colors line-clamp-2">
                {nextPost.title}
              </p>
            </Link>
          ) : <div />}
        </div>

      </div>
    </div>
  );
}
