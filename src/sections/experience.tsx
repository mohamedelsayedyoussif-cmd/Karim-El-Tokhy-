import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'motion/react';

const experiences = [
  {
    year: "2019–Present",
    role: "Creative Director",
    company: "Brand Fusion Agency, Dubai",
    details: [
      "Leading creative team of 25 designers & developers",
      "Managing projects with $2M+ annual budgets",
      "Developed 40+ regional and international brand identities",
      "Won 12 international design awards"
    ]
  },
  {
    year: "2015–2019",
    role: "Senior UI/UX Designer",
    company: "Digitize Agency, London",
    details: [
      "Designed 60+ mobile and web applications",
      "Clients: Vodafone UK, BBC Digital",
      "Improved e-commerce conversion rates by 35%",
      "Managed team of 8 designers"
    ]
  },
  {
    year: "2011–2015",
    role: "Graphic Designer",
    company: "Nile Creative Studio, Cairo",
    details: [
      "80+ complete visual identities for startups",
      "Product packaging for major FMCG brands",
      "Advertising campaigns for telecom companies"
    ]
  },
  {
    year: "2009–2011",
    role: "Junior Designer",
    company: "Al-Ahram Printing Studio, Cairo",
    details: [
      "Print design and magazine layout",
      "Learned printing and production fundamentals"
    ]
  }
];

export const Experience: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full py-32 bg-bg-dark overflow-hidden" id="experience" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs font-mono text-gold-secondary tracking-[0.3em] uppercase mb-6 block border border-gold-primary/20 py-2 px-6 rounded-full inline-block bg-gold-primary/5 backdrop-blur-sm">Career Path</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-6">
            {t('experience')}
          </h2>
          <p className="text-text-secondary-dark font-light text-lg max-w-2xl mx-auto">A journey of continuous growth and creative evolution.</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-gradient-to-b from-gold-primary via-gold-secondary to-transparent origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Experience Nodes */}
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center justify-between mb-24 group ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-8 md:left-1/2 w-8 h-8 rounded-full bg-bg-dark border-2 border-white/20 -translate-x-1/2 z-10 transition-all duration-500 group-hover:border-gold-primary group-hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] group-hover:scale-110 flex items-center justify-center">
                <div className="w-3 h-3 bg-white/20 rounded-full group-hover:bg-gold-primary transition-colors duration-500" />
                <div className="absolute inset-0 bg-gold-primary rounded-full opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500" />
              </div>
              
              {/* Content Card */}
              <div className={`w-full md:w-5/12 pl-20 md:pl-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <div className="p-10 glass-panel rounded-[2rem] hover:border-gold-primary/40 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {/* Decorative Gradient */}
                  <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-32 h-32 bg-gold-primary/10 blur-[50px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <span className="inline-block px-5 py-2 rounded-full bg-gold-primary/10 text-gold-primary font-mono text-xs tracking-[0.2em] mb-6 border border-gold-primary/20 backdrop-blur-sm">
                    {exp.year}
                  </span>
                  <h3 className="text-3xl font-display font-bold text-white mb-2 group-hover:text-gold-secondary transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <h4 className="text-lg text-text-secondary-dark mb-8 font-light tracking-wide">
                    {exp.company}
                  </h4>
                  <ul className={`space-y-4 ${index % 2 === 0 ? 'text-left' : 'md:text-right text-left'}`}>
                    {exp.details.map((detail, i) => (
                      <li key={i} className={`text-sm md:text-base text-text-secondary-dark flex items-start gap-4 ${index % 2 === 0 ? 'flex-row' : 'md:flex-row-reverse flex-row'}`}>
                        <span className="text-gold-primary mt-1 opacity-50 group-hover:opacity-100 transition-opacity duration-300 text-xs">✦</span>
                        <span className="font-light leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
