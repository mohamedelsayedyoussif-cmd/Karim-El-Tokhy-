import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="relative w-full pt-32 pb-16 bg-bg-dark border-t border-white/5 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gold-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-5">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold-primary font-display text-7xl font-bold tracking-tighter relative group cursor-pointer inline-block mb-8"
            >
              K.
              <div className="absolute -inset-4 bg-gold-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <p className="text-text-secondary-dark font-light text-lg max-w-md leading-relaxed">
              Crafting digital experiences that merge strategic thinking with aesthetic perfection. Let's build something extraordinary together.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-white font-display font-bold text-xl mb-6">Navigation</h4>
              <ul className="space-y-4 text-text-secondary-dark font-light">
                <li><a href="#about" className="hover:text-gold-primary transition-colors duration-300">About</a></li>
                <li><a href="#experience" className="hover:text-gold-primary transition-colors duration-300">Experience</a></li>
                <li><a href="#case-studies" className="hover:text-gold-primary transition-colors duration-300">Work</a></li>
                <li><a href="#contact" className="hover:text-gold-primary transition-colors duration-300">Contact</a></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-white font-display font-bold text-xl mb-6">Socials</h4>
              <ul className="space-y-4 text-text-secondary-dark font-light">
                <li><a href="#" className="hover:text-gold-primary transition-colors duration-300">LinkedIn</a></li>
                <li><a href="#" className="hover:text-gold-primary transition-colors duration-300">Dribbble</a></li>
                <li><a href="#" className="hover:text-gold-primary transition-colors duration-300">Instagram</a></li>
                <li><a href="#" className="hover:text-gold-primary transition-colors duration-300">Behance</a></li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="col-span-2 md:col-span-1"
            >
              <h4 className="text-white font-display font-bold text-xl mb-6">Contact</h4>
              <ul className="space-y-4 text-text-secondary-dark font-light">
                <li><a href="mailto:karim.tokhy@outlook.com" className="hover:text-gold-primary transition-colors duration-300">karim.tokhy@outlook.com</a></li>
                <li><a href="tel:+971550000000" className="hover:text-gold-primary transition-colors duration-300">+971 55 XXX XXXX</a></li>
                <li className="pt-4">
                  <span className="block text-xs font-mono text-gold-secondary uppercase tracking-widest mb-1">Location</span>
                  Dubai, UAE
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-text-secondary-dark text-sm font-light tracking-wide text-center md:text-left"
          >
            &copy; {new Date().getFullYear()} Karim El-Tokhy. All rights reserved.
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex gap-8 text-xs font-mono tracking-[0.2em] uppercase text-gold-secondary"
          >
            <a href="#" className="hover:text-gold-primary transition-colors duration-300 relative group">
              Privacy Policy
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#" className="hover:text-gold-primary transition-colors duration-300 relative group">
              Terms of Service
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold-primary group-hover:w-full transition-all duration-300" />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
