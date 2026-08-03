import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import SectionHeader from '@/components/ui/SectionHeader';
import { fadeInLeft, fadeInRight } from '@/animations/variants';
import profile from '@/data/profile.json';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setError('');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(serviceId, templateId, {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
        }, publicKey);
        setIsSuccess(true);
        reset();
      } catch {
        setError('Failed to send message. Please try emailing me directly.');
      }
    } else {
      // Demo mode — simulate success
      await new Promise(r => setTimeout(r, 1200));
      setIsSuccess(true);
      reset();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="Let's Connect"
          title="Get In Touch"
          subtitle="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-2">Contact Information</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
                { icon: MapPin, label: 'Location', value: profile.location, href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="flex items-center gap-4 glass rounded-2xl p-4 hover:glass-hover transition-all group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(139,92,246,0.2)' }}>
                    <Icon size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">{label}</div>
                    <div className="text-white text-sm font-medium group-hover:text-violet-400 transition-colors">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">Follow Me</h4>
              <div className="flex gap-3">
                {[
                  { icon: FaGithub, href: profile.social.github, label: 'GitHub' },
                  { icon: FaLinkedin, href: profile.social.linkedin, label: 'LinkedIn' },
                  { icon: FaTwitter, href: profile.social.twitter, label: 'Twitter' },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-violet-400 hover:glass-hover transition-all"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass gradient-border rounded-2xl overflow-hidden h-40 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <MapPin size={24} className="mx-auto mb-2 text-violet-400" />
                <p className="text-sm">Hyderabad, Telangana, India</p>
                <p className="text-xs mt-1">UTC+5:30 IST</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass gradient-border rounded-3xl p-8">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={56} className="text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white font-['Space_Grotesk'] mb-3">Message Sent!</h3>
                  <p className="text-slate-400 mb-6">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-6">Send Me a Message</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name *</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl glass border text-white placeholder:text-slate-500 text-sm outline-none transition-colors ${
                          errors.name ? 'border-red-500/50' : 'border-white/8 focus:border-violet-500/50'
                        }`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address *</label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
                        })}
                        type="email"
                        placeholder="john@example.com"
                        className={`w-full px-4 py-3 rounded-xl glass border text-white placeholder:text-slate-500 text-sm outline-none transition-colors ${
                          errors.email ? 'border-red-500/50' : 'border-white/8 focus:border-violet-500/50'
                        }`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number</label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-3 rounded-xl glass border border-white/8 focus:border-violet-500/50 text-white placeholder:text-slate-500 text-sm outline-none transition-colors"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Subject *</label>
                      <input
                        {...register('subject', { required: 'Subject is required' })}
                        placeholder="Project Collaboration"
                        className={`w-full px-4 py-3 rounded-xl glass border text-white placeholder:text-slate-500 text-sm outline-none transition-colors ${
                          errors.subject ? 'border-red-500/50' : 'border-white/8 focus:border-violet-500/50'
                        }`}
                      />
                      {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Message *</label>
                    <textarea
                      {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Please write at least 20 characters' } })}
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      className={`w-full px-4 py-3 rounded-xl glass border text-white placeholder:text-slate-500 text-sm outline-none transition-colors resize-none ${
                        errors.message ? 'border-red-500/50' : 'border-white/8 focus:border-violet-500/50'
                      }`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
