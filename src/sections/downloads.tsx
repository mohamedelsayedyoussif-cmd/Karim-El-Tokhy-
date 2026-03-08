import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Download, FileText, Image as ImageIcon } from 'lucide-react';

const Card3D = ({ title, description, icon: Icon, fileType, size }: { title: string, description: string, icon: any, fileType: string, size: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

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
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-white/10 to-white/0 p-8 border border-white/10 backdrop-blur-md shadow-2xl group cursor-pointer"
    >
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 rounded-xl bg-bg-dark/80 border border-gold-primary/20 flex flex-col items-center justify-center gap-6 p-6 shadow-lg group-hover:border-gold-primary/50 transition-colors duration-500"
      >
        <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary mb-2 group-hover:scale-110 transition-transform duration-500">
          <Icon size={32} />
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-gold-primary transition-colors">{title}</h3>
          <p className="text-xs text-text-secondary-dark font-mono mb-4">{description}</p>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-mono text-gold-secondary uppercase tracking-widest border border-white/5 px-3 py-1 rounded-full bg-black/40">
          <span>{fileType}</span>
          <span className="w-px h-3 bg-white/20" />
          <span>{size}</span>
        </div>

        <button className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-gold-primary transition-colors group/btn">
          Download <Download size={14} className="group-hover/btn:translate-y-1 transition-transform" />
        </button>
      </div>

      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
    </motion.div>
  );
};

export const Downloads: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full py-32 bg-bg-dark overflow-hidden flex flex-col items-center justify-center" id="downloads">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-primary/5 via-bg-dark to-bg-dark pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono text-gold-secondary tracking-[0.3em] uppercase mb-4 block">Resources</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-gradient mb-6">
            Downloads
          </h2>
          <p className="text-text-secondary-dark font-light text-lg max-w-2xl mx-auto">
            Access my professional resume and media kit for press and collaborations.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 perspective-1000">
          <Card3D 
            title="Curriculum Vitae" 
            description="Comprehensive overview of my experience, skills, and achievements."
            icon={FileText}
            fileType="PDF"
            size="2.4 MB"
          />
          
          <Card3D 
            title="Media Kit" 
            description="Brand assets, bio, and high-resolution photos for press usage."
            icon={ImageIcon}
            fileType="ZIP"
            size="15.8 MB"
          />
        </div>
      </div>
    </section>
  );
};
