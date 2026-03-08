import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const articles = [
  {
    title: "The Evolution of Dark Luxury in Digital Design",
    category: "Design",
    date: "Oct 15, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    excerpt: "Exploring how premium brands are shifting towards dark interfaces to convey exclusivity and focus."
  },
  {
    title: "Spatial Computing: The Next Frontier for UI/UX",
    category: "Technology",
    date: "Sep 28, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=2000&auto=format&fit=crop",
    excerpt: "How 3D interfaces and AR/VR are reshaping our approach to user experience and interaction design."
  },
  {
    title: "Building Brand Identity Beyond the Logo",
    category: "Branding",
    date: "Aug 12, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop",
    excerpt: "A comprehensive guide to creating a holistic brand system that resonates across all touchpoints."
  }
];

export const Blog: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full py-32 bg-bg-dark overflow-hidden" id="blog">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-primary/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-gold-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
        >
          <div>
            <span className="text-xs font-mono text-gold-secondary tracking-[0.3em] uppercase mb-6 block border border-gold-primary/20 py-2 px-6 rounded-full inline-block bg-gold-primary/5 backdrop-blur-sm">Insights</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-6">
              Latest Articles
            </h2>
            <p className="text-text-secondary-dark font-light text-lg max-w-2xl">Thoughts on design, technology, and the creative process.</p>
          </div>
          <a href="#" className="flex items-center gap-2 text-gold-primary hover:text-gold-secondary transition-colors duration-300 font-mono text-sm uppercase tracking-widest group">
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 mb-6 overflow-hidden rounded-2xl border border-white/10 group-hover:border-gold-primary/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-mono text-gold-secondary uppercase tracking-widest">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs font-mono text-text-secondary-dark mb-4 uppercase tracking-wider">
                <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                <span className="w-1 h-1 rounded-full bg-gold-primary/50" />
                <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
              </div>
              
              <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-gold-primary transition-colors duration-300 line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-text-secondary-dark font-light line-clamp-2 mb-6">
                {article.excerpt}
              </p>
              
              <div className="w-full h-px bg-white/10 group-hover:bg-gold-primary/30 transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-gold-primary to-gold-secondary group-hover:w-full transition-all duration-700 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
