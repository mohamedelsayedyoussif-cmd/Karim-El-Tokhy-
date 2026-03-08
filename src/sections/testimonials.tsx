import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Karim transformed our brand completely. The results exceeded every expectation. His strategic approach to design is unparalleled.",
    author: "Sarah Jenkins",
    role: "CEO, LuxStay",
    color: "from-gold-primary/10 to-transparent"
  },
  {
    quote: "Exceptional creative vision combined with strategic thinking. A rare talent who understands both business goals and aesthetic perfection.",
    author: "Ahmed Al-Fayed",
    role: "Marketing Director, Regional Energy Co.",
    color: "from-white/5 to-transparent"
  },
  {
    quote: "The FinWallet design set a new standard for fintech UX in the region. User engagement skyrocketed after the redesign.",
    author: "Elena Rodriguez",
    role: "Product Manager, FinTech Startup",
    color: "from-gold-secondary/10 to-transparent"
  }
];

export const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-32 bg-bg-dark overflow-hidden" id="testimonials">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs font-mono text-gold-secondary tracking-[0.3em] uppercase mb-6 block border border-gold-primary/20 py-2 px-6 rounded-full inline-block bg-gold-primary/5 backdrop-blur-sm">Client Voices</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-6">
            {t('testimonials')}
          </h2>
          <p className="text-text-secondary-dark font-light text-lg max-w-2xl mx-auto">What industry leaders say about my work and impact.</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto h-[500px] md:h-[400px] flex items-center justify-center perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, rotateY: -30, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, rotateY: 30, scale: 0.9, x: -50 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className={`absolute w-full max-w-4xl p-10 md:p-16 glass-panel bg-gradient-to-br ${testimonials[currentIndex].color} rounded-[3rem] border border-gold-primary/20 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-xl overflow-hidden group`}
            >
              {/* Holographic overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none mix-blend-color-dodge bg-[linear-gradient(120deg,transparent_0%,rgba(201,168,76,0.4)_20%,rgba(255,255,255,0.5)_40%,rgba(201,168,76,0.4)_60%,transparent_80%)] bg-[length:200%_200%] animate-shimmer" />
              
              {/* Decorative elements inside card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

              <Quote className="w-32 h-32 text-gold-primary/10 absolute top-8 left-8 -z-10 transform -scale-x-100" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <p className="text-2xl md:text-4xl font-display font-light text-white leading-relaxed mb-12 italic relative">
                  <span className="text-gold-primary/50 text-6xl absolute -top-6 -left-4 font-serif">"</span>
                  {testimonials[currentIndex].quote}
                  <span className="text-gold-primary/50 text-6xl absolute -bottom-8 -right-4 font-serif">"</span>
                </p>
                
                <div className="flex items-center gap-6 mt-auto pt-8 border-t border-white/10">
                  <div className="w-16 h-16 rounded-full bg-bg-dark border border-gold-primary/30 flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.3)] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gold-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="text-gold-primary font-display font-bold text-2xl relative z-10">
                      {testimonials[currentIndex].author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white tracking-wide mb-1">
                      {testimonials[currentIndex].author}
                    </h4>
                    <p className="text-sm font-mono text-gold-secondary uppercase tracking-widest">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-4 z-20">
            {testimonials.map((_, index) => (
               <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentIndex ? 'w-16 bg-gold-primary shadow-[0_0_15px_rgba(201,168,76,0.6)]' : 'w-3 bg-white/20 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
