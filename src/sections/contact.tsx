import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Send, Linkedin, Instagram, Dribbble, Mail, Phone, MapPin } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      setStatus('success');
      setFormData({ name: '', email: '', projectType: '', budget: '', message: '' });
    } catch (error) {
      console.error("Error submitting contact form", error);
      setStatus('error');
    }
  };

  return (
    <section className="relative w-full py-32 bg-bg-dark overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gold-primary/5 via-bg-dark to-bg-dark pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-gold-primary/20 to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs font-mono text-gold-secondary tracking-[0.3em] uppercase mb-6 block border border-gold-primary/20 py-2 px-6 rounded-full inline-block bg-gold-primary/5 backdrop-blur-sm">Let's Connect</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-6">
            {t('contactHeadline')}
          </h2>
          <p className="text-text-secondary-dark font-light text-lg max-w-2xl mx-auto">
            {t('contactSub')}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 flex flex-col gap-6"
          >
            <div className="p-8 glass-panel rounded-[2rem] hover:border-gold-primary/50 transition-all duration-500 group hover:shadow-[0_10px_30px_rgba(201,168,76,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/10 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-gold-primary/20 group-hover:bg-gold-primary/20">
                <Mail className="w-6 h-6 text-gold-primary" />
              </div>
              <h4 className="text-xl font-display font-bold text-white mb-2">Email</h4>
              <p className="text-text-secondary-dark font-light">karim.tokhy@outlook.com</p>
            </div>
            
            <div className="p-8 glass-panel rounded-[2rem] hover:border-gold-primary/50 transition-all duration-500 group hover:shadow-[0_10px_30px_rgba(201,168,76,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/10 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-gold-primary/20 group-hover:bg-gold-primary/20">
                <Phone className="w-6 h-6 text-gold-primary" />
              </div>
              <h4 className="text-xl font-display font-bold text-white mb-2">Phone</h4>
              <p className="text-text-secondary-dark font-light">+971 55 XXX XXXX</p>
            </div>
            
            <div className="p-8 glass-panel rounded-[2rem] hover:border-gold-primary/50 transition-all duration-500 group hover:shadow-[0_10px_30px_rgba(201,168,76,0.1)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/10 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-gold-primary/20 group-hover:bg-gold-primary/20">
                <MapPin className="w-6 h-6 text-gold-primary" />
              </div>
              <h4 className="text-xl font-display font-bold text-white mb-2">Location</h4>
              <p className="text-text-secondary-dark font-light">Dubai, UAE</p>
            </div>

            <div className="flex gap-4 mt-4">
              <a href="#" className="w-14 h-14 flex items-center justify-center glass-panel rounded-full hover:border-gold-primary hover:text-gold-primary transition-all duration-300 text-text-secondary-dark hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(201,168,76,0.2)]">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-14 h-14 flex items-center justify-center glass-panel rounded-full hover:border-gold-primary hover:text-gold-primary transition-all duration-300 text-text-secondary-dark hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(201,168,76,0.2)]">
                <Dribbble size={20} />
              </a>
              <a href="#" className="w-14 h-14 flex items-center justify-center glass-panel rounded-full hover:border-gold-primary hover:text-gold-primary transition-all duration-300 text-text-secondary-dark hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(201,168,76,0.2)]">
                <Instagram size={20} />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/3"
          >
            <form id="contact-form" onSubmit={handleSubmit} className="p-8 md:p-12 glass-panel rounded-[3rem] shadow-[0_0_100px_rgba(201,168,76,0.05)] relative overflow-hidden">
              {/* Form Decorative Background */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gold-primary/5 via-transparent to-transparent pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gold-secondary uppercase tracking-[0.2em] mb-3">{t('nameField')}</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-primary focus:bg-black/40 transition-all duration-300 font-light focus:shadow-[0_0_20px_rgba(201,168,76,0.1)]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gold-secondary uppercase tracking-[0.2em] mb-3">{t('emailField')}</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-primary focus:bg-black/40 transition-all duration-300 font-light focus:shadow-[0_0_20px_rgba(201,168,76,0.1)]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
                <div>
                  <label htmlFor="projectType" className="block text-xs font-bold text-gold-secondary uppercase tracking-[0.2em] mb-3">{t('projectType')}</label>
                  <select 
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-primary focus:bg-black/40 transition-all duration-300 font-light appearance-none cursor-pointer focus:shadow-[0_0_20px_rgba(201,168,76,0.1)]"
                  >
                    <option value="" className="bg-bg-dark text-white">Select a project type</option>
                    <option value="branding" className="bg-bg-dark text-white">Brand Identity</option>
                    <option value="uiux" className="bg-bg-dark text-white">UI/UX Design</option>
                    <option value="3d" className="bg-bg-dark text-white">3D Web Experience</option>
                    <option value="consulting" className="bg-bg-dark text-white">Consultancy</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-xs font-bold text-gold-secondary uppercase tracking-[0.2em] mb-3">{t('budget')}</label>
                  <select 
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-primary focus:bg-black/40 transition-all duration-300 font-light appearance-none cursor-pointer focus:shadow-[0_0_20px_rgba(201,168,76,0.1)]"
                  >
                    <option value="" className="bg-bg-dark text-white">Select budget range</option>
                    <option value="5k-10k" className="bg-bg-dark text-white">$5k - $10k</option>
                    <option value="10k-25k" className="bg-bg-dark text-white">$10k - $25k</option>
                    <option value="25k-50k" className="bg-bg-dark text-white">$25k - $50k</option>
                    <option value="50k+" className="bg-bg-dark text-white">$50k+</option>
                  </select>
                </div>
              </div>

              <div className="mb-10 relative z-10">
                <label htmlFor="message" className="block text-xs font-bold text-gold-secondary uppercase tracking-[0.2em] mb-3">{t('message')}</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold-primary focus:bg-black/40 transition-all duration-300 font-light resize-none focus:shadow-[0_0_20px_rgba(201,168,76,0.1)]"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full py-5 bg-gradient-to-r from-gold-primary to-gold-secondary text-bg-dark font-bold rounded-2xl hover:opacity-90 transition-opacity uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50 group relative z-10 hover:shadow-[0_10px_30px_rgba(201,168,76,0.3)] btn-ripple"
              >
                {status === 'submitting' ? 'Sending...' : t('send')} 
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              {status === 'success' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 mt-6 text-center font-light tracking-wide relative z-10"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 mt-6 text-center font-light tracking-wide relative z-10"
                >
                  Error sending message. Please try again or email directly.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
