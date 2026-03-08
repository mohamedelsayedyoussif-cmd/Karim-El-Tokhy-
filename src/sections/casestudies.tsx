import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "LuxStay",
    subtitle: "Luxury Hotel Booking Platform",
    tags: ["Branding", "UI/UX", "Mobile App"],
    result: "120% increase in downloads in 3 months",
    award: "Awwwards Winner",
    image: "https://picsum.photos/seed/luxstay/800/600",
    description: "Full visual identity and app redesign for a premium hotel booking platform targeting high-net-worth individuals."
  },
  {
    id: 2,
    title: "Think Green",
    subtitle: "Renewable Energy Campaign",
    tags: ["Branding", "Campaign", "Digital"],
    result: "14 million social media views",
    award: "Dubai Lynx Gold",
    image: "https://picsum.photos/seed/thinkgreen/800/600",
    description: "Visual identity and integrated digital campaign for a major renewable energy initiative in Saudi Arabia."
  },
  {
    id: 3,
    title: "FinWallet",
    subtitle: "Digital Wallet App",
    tags: ["UI/UX", "Fintech", "Mobile"],
    result: "1 million downloads in first 6 months",
    award: "Best Fintech App 2022",
    image: "https://picsum.photos/seed/finwallet/800/600",
    description: "Complete UI/UX design from scratch for a modern digital wallet, tested with 500+ real users."
  },
  {
    id: 4,
    title: "Artisan Collective",
    subtitle: "Digital Art Gallery",
    tags: ["3D Web", "WebGL", "Interactive"],
    result: "Featured in top design magazines",
    award: "Awwwards Site of the Day + FWA",
    image: "https://picsum.photos/seed/artisan/800/600",
    description: "Interactive 3D web experience using WebGL to showcase digital art in a virtual gallery space."
  },
  {
    id: 5,
    title: "Saffron & Silk",
    subtitle: "Restaurant Brand Identity",
    tags: ["Branding", "F&B", "Print"],
    result: "Featured in Wallpaper magazine",
    award: "DesignBoom Feature",
    image: "https://picsum.photos/seed/saffron/800/600",
    description: "Complete identity from logo to interior design guidelines for a high-end fusion restaurant."
  }
];

export const CaseStudies: React.FC = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section className="relative w-full py-32 bg-bg-dark overflow-hidden" id="case-studies">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />
      <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs font-mono text-gold-secondary tracking-[0.3em] uppercase mb-6 block border border-gold-primary/20 py-2 px-6 rounded-full inline-block bg-gold-primary/5 backdrop-blur-sm">Portfolio</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-6">
            {t('caseStudies')}
          </h2>
          <p className="text-text-secondary-dark font-light text-lg max-w-2xl mx-auto">Selected works showcasing design excellence and strategic thinking.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={(e) => {
                // Ensure ripple effect triggers before state update if needed, 
                // but since it's delegated, the click event bubbles up.
                setSelectedProject(project.id);
              }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project.id); }}
              role="button"
              tabIndex={0}
              className="relative group cursor-pointer rounded-[2rem] overflow-hidden glass-panel hover:border-gold-primary/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-2 focus:ring-gold-primary btn-ripple"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
              <div className="p-8 relative z-10 -mt-10 bg-gradient-to-t from-bg-dark via-bg-dark to-transparent pt-12">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-gold-secondary bg-black/50 backdrop-blur-md rounded-full border border-gold-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2 group-hover:text-gold-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary-dark mb-6 font-light">{project.subtitle}</p>
                
                <div className="flex items-center gap-3 text-sm font-bold text-gold-primary group-hover:translate-x-2 transition-transform duration-300 uppercase tracking-widest">
                  View Project <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-bg-dark/80"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-bg-dark border border-gold-primary/30 rounded-[2.5rem] p-8 md:p-16 shadow-[0_0_100px_rgba(201,168,76,0.15)]"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center text-text-secondary-dark hover:text-white transition-colors bg-white/5 hover:bg-gold-primary/20 rounded-full border border-white/10 z-10 btn-ripple"
              >
                <X size={24} />
              </button>

              {projects.filter(p => p.id === selectedProject).map(project => (
                <div key={project.id} className="flex flex-col lg:flex-row gap-16 relative">
                  {/* Decorative Background in Modal */}
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-gold-primary/5 via-transparent to-transparent pointer-events-none" />

                  <div className="w-full lg:w-1/2 relative z-10">
                    <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 border border-gold-primary/20 rounded-[2rem] pointer-events-none" />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10">
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-gold-secondary bg-gold-primary/10 rounded-full border border-gold-primary/20 backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-4 leading-tight">
                      {project.title}
                    </h2>
                    <h3 className="text-2xl text-white mb-8 font-light tracking-wide">{project.subtitle}</h3>
                    <p className="text-xl text-text-secondary-dark leading-relaxed mb-12 font-light">
                      {project.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] text-gold-secondary mb-3">Result</h4>
                        <p className="text-xl text-white font-display">{project.result}</p>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-[0.2em] text-gold-secondary mb-3">Award</h4>
                        <p className="text-xl text-white font-display">{project.award}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
