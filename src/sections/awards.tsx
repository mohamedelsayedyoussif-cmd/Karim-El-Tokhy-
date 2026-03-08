import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Trophy } from 'lucide-react';

const awards = [
  { title: "Red Dot Design Award", subtitle: "Best Brand Identity", year: "2023" },
  { title: "Awwwards", subtitle: "Site of the Day × 3", year: "2021, 2022, 2023" },
  { title: "CSS Design Awards", subtitle: "Best UI Design", year: "2022" },
  { title: "Dubai Lynx", subtitle: "Gold in Digital Advertising", year: "2021" },
  { title: "Behance Featured", subtitle: "Adobe Pick × 7 times", year: "Multiple" },
  { title: "German Design Award", subtitle: "Special Mention", year: "2020" },
  { title: "Webby Awards", subtitle: "Honoree, Best Visual Design", year: "2019" },
  { title: "A' Design Award", subtitle: "Silver", year: "2018" }
];

const AwardCard = ({ award, index }: { award: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-full perspective-1000 cursor-pointer group"
    >
      <div 
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="absolute inset-0 p-10 glass-panel rounded-[2rem] hover:border-gold-primary/50 transition-all duration-500 flex flex-col items-center text-center overflow-hidden hover:shadow-[0_20px_50px_rgba(201,168,76,0.15)] bg-bg-dark"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gold-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* 3D Trophy Placeholder */}
        <div 
          style={{ transform: "translateZ(30px)" }}
          className="w-24 h-24 mb-8 relative flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gold-primary/20 rounded-full blur-[30px] group-hover:bg-gold-primary/40 transition-colors duration-500 animate-pulse" />
          <Trophy className="w-12 h-12 text-gold-primary group-hover:scale-110 transition-transform duration-500 relative z-10 drop-shadow-[0_0_20px_rgba(201,168,76,0.8)]" />
        </div>

        <h3 
          style={{ transform: "translateZ(20px)" }}
          className="text-2xl font-display font-bold text-white mb-3 group-hover:text-gold-secondary transition-colors duration-300"
        >
          {award.title}
        </h3>
        <p 
          style={{ transform: "translateZ(15px)" }}
          className="text-sm text-text-secondary-dark mb-6 font-light"
        >
          {award.subtitle}
        </p>
        
        <div 
          style={{ transform: "translateZ(25px)" }}
          className="mt-auto"
        >
          <span className="text-xs font-mono text-gold-secondary tracking-[0.2em] px-4 py-2 bg-black/50 rounded-full border border-white/10 group-hover:border-gold-primary/30 transition-colors duration-300 backdrop-blur-sm">
            {award.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const Awards: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full py-32 bg-bg-dark overflow-hidden" id="awards">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-primary/5 via-bg-dark to-bg-dark pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs font-mono text-gold-secondary tracking-[0.3em] uppercase mb-6 block border border-gold-primary/20 py-2 px-6 rounded-full inline-block bg-gold-primary/5 backdrop-blur-sm">Accolades</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-6">
            {t('awardsShowcase')}
          </h2>
          <p className="text-text-secondary-dark font-light text-lg max-w-2xl mx-auto">Recognition of excellence on a global scale.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => (
            <AwardCard key={index} award={award} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
