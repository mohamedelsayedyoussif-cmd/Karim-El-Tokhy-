import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Camera, Music, Activity, BookOpen } from 'lucide-react';
import { gsap, ScrollTrigger, initGSAP } from '../js/gsap-init';

initGSAP();

export const About: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-image", 
        { opacity: 0, scale: 0.8, rotateY: 15 },
        { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0,
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-image",
            start: "top 75%",
          }
        }
      );
      
      gsap.fromTo(".about-text > *", 
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0,
          duration: 1, 
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 75%",
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-bg-dark overflow-hidden" id="about">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[1000px] h-[1000px] bg-gold-secondary/5 rounded-full blur-[180px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          {/* Photo Side */}
          <div className="w-full lg:w-5/12 flex justify-center relative about-image">
            <div className="relative w-full max-w-lg aspect-[4/5] rounded-[3rem] overflow-hidden border border-gold-primary/20 shadow-[0_30px_100px_rgba(0,0,0,0.6)] group perspective-1000">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full h-full relative"
              >
                <img 
                  src="https://picsum.photos/seed/karim_portrait/800/1000" 
                  alt="Karim El-Tokhy" 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
                
                {/* Decorative Frame */}
                <div className="absolute inset-8 border border-gold-primary/30 rounded-[2.5rem] pointer-events-none transition-all duration-700 group-hover:inset-10 group-hover:border-gold-primary/60" />
              </motion.div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -right-10 md:-right-16 w-48 h-48 bg-bg-dark/80 backdrop-blur-xl rounded-full border border-gold-primary/30 flex items-center justify-center shadow-[0_20px_50px_rgba(201,168,76,0.2)] animate-spin-slow z-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text className="text-[10px] uppercase tracking-[0.25em] fill-gold-primary font-mono font-bold">
                  <textPath href="#curve" startOffset="0%">
                    • 15 YEARS EXPERIENCE • CREATIVE DIRECTOR
                  </textPath>
                </text>
              </svg>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-7/12 about-text">
            <span className="text-xs font-mono text-gold-secondary tracking-[0.3em] uppercase mb-8 block border border-gold-primary/20 py-2 px-6 rounded-full inline-block bg-gold-primary/5 backdrop-blur-sm">The Architect</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-10 leading-tight">
              {t('about')}
            </h2>
            <p className="text-2xl md:text-4xl text-white font-light leading-relaxed mb-10 font-display">
              I craft digital experiences that blend <span className="text-gold-primary italic font-serif">artistic vision</span> with strategic thinking.
            </p>
            <p className="text-lg text-text-secondary-dark leading-relaxed mb-16 font-light max-w-2xl tracking-wide">
              {t('aboutText')}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 pt-12 border-t border-white/10">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gold-secondary mb-4">Age</h4>
                <p className="text-3xl font-display text-white font-light">38</p>
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gold-secondary mb-4">Nationality</h4>
                <p className="text-3xl font-display text-white font-light">Egyptian</p>
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gold-secondary mb-4">Based In</h4>
                <p className="text-3xl font-display text-white font-light">Dubai</p>
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gold-secondary mb-4">Languages</h4>
                <p className="text-3xl font-display text-white font-light">EN, AR, FR</p>
              </div>
            </div>

            {/* Hobbies */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-gold-secondary mb-8">Interests</h4>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Camera, label: "Street Photography" },
                  { icon: Music, label: "Guitar" },
                  { icon: Activity, label: "Running" },
                  { icon: BookOpen, label: "Philosophy" }
                ].map((hobby, i) => (
                  <div key={i} className="flex items-center gap-4 px-8 py-4 glass-panel rounded-full text-text-secondary-dark hover:text-gold-primary hover:border-gold-primary/50 transition-all duration-500 group cursor-default shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.15)] hover:-translate-y-1">
                    <hobby.icon size={20} className="group-hover:scale-110 transition-transform text-gold-primary/50 group-hover:text-gold-primary" />
                    <span className="text-sm tracking-widest uppercase font-light">{hobby.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
