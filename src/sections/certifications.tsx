import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';

const certs = [
  { title: "Google UX Design Professional Certificate", issuer: "Google", year: "2023" },
  { title: "Adobe Certified Expert (ACE)", issuer: "Adobe", year: "2022" },
  { title: "Figma Professional Certificate", issuer: "Figma", year: "2023" },
  { title: "Webflow Expert Certification", issuer: "Webflow", year: "2022" },
  { title: "UX Master Certificate", issuer: "IxDF", year: "2021" },
  { title: "Design Thinking Certificate", issuer: "IDEO U", year: "2017" },
  { title: "Certified ScrumMaster (CSM)", issuer: "Scrum Alliance", year: "2020" },
  { title: "Project Management Professional (PMP)", issuer: "PMI", year: "2019" },
  { title: "AWS Certified Cloud Practitioner", issuer: "AWS", year: "2020" },
  { title: "Motion Design Specialization", issuer: "CalArts", year: "2018" },
  { title: "HubSpot Content Marketing", issuer: "HubSpot", year: "2021" },
  { title: "Meta Social Media Marketing", issuer: "Meta", year: "2019" }
];

const CertCard = ({ cert, index }: { cert: any, index: number }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onClick={() => setIsFlipped(!isFlipped)}
      className="relative h-64 perspective-1000 cursor-pointer group"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        {/* Front */}
        <div 
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 p-8 glass-panel rounded-2xl border-white/10 group-hover:border-gold-primary/50 transition-all duration-500 flex flex-col hover:shadow-[0_10px_30px_rgba(201,168,76,0.1)] overflow-hidden bg-bg-dark"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
          
          <div className="w-12 h-12 rounded-full bg-gold-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-gold-primary/20 group-hover:bg-gold-primary/20">
            <Award className="text-gold-primary w-5 h-5" />
          </div>
          
          <h3 className="text-lg font-display font-bold text-white mb-4 group-hover:text-gold-secondary transition-colors duration-300 leading-snug flex-grow">
            {cert.title}
          </h3>
          
          <div className="flex justify-between items-end mt-auto pt-6 border-t border-white/5 group-hover:border-gold-primary/20 transition-colors duration-500">
            <span className="text-sm text-text-secondary-dark font-light">{cert.issuer}</span>
            <span className="text-xs font-mono text-gold-secondary tracking-[0.2em] bg-gold-primary/10 px-2 py-1 rounded">{cert.year}</span>
          </div>
        </div>

        {/* Back */}
        <div 
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0 p-8 glass-panel rounded-2xl border-gold-primary/50 flex flex-col items-center justify-center text-center bg-gradient-to-br from-bg-dark to-gold-primary/10 shadow-[0_0_30px_rgba(201,168,76,0.2)]"
        >
          <Award className="text-gold-primary w-12 h-12 mb-4 opacity-50" />
          <h4 className="text-xl font-display font-bold text-gold-secondary mb-2">Verified</h4>
          <p className="text-sm text-text-secondary-dark font-light">Credential ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
          <p className="text-xs font-mono text-gold-primary mt-4 tracking-widest uppercase">Click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Certifications: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full py-32 bg-bg-dark overflow-hidden" id="certifications">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-primary/10 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gold-primary/10 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-xs font-mono text-gold-secondary tracking-[0.3em] uppercase mb-6 block border border-gold-primary/20 py-2 px-6 rounded-full inline-block bg-gold-primary/5 backdrop-blur-sm">Credentials</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-6">
            {t('certifications')}
          </h2>
          <p className="text-text-secondary-dark font-light text-lg max-w-2xl mx-auto">Continuous learning and professional development.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certs.map((cert, index) => (
            <CertCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
