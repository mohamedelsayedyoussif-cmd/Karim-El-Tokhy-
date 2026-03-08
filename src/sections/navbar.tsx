import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import { Moon, Sun, Globe, LogIn, LogOut } from 'lucide-react';
import { signInWithGoogle, logOut } from '../firebase';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, language, toggleLanguage, user, setUser } = useStore();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
  }, [theme]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleLogin = async () => {
    try {
      const u = await signInWithGoogle();
      setUser(u);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-700 ${
        isScrolled 
          ? 'py-4 bg-bg-dark/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' 
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="relative group flex items-center justify-center w-14 h-14">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-primary to-gold-secondary rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-gold-primary font-display text-4xl font-bold tracking-tighter relative z-10 drop-shadow-lg">
            K.
          </span>
        </a>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-10 mr-4 text-xs font-mono tracking-[0.25em] uppercase text-text-secondary-dark">
            <a href="#about" className="hover:text-gold-primary transition-colors duration-300 relative group py-2">
              About
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold-primary to-transparent group-hover:w-full transition-all duration-500 ease-out" />
            </a>
            <a href="#case-studies" className="hover:text-gold-primary transition-colors duration-300 relative group py-2">
              Work
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold-primary to-transparent group-hover:w-full transition-all duration-500 ease-out" />
            </a>
            <a href="#blog" className="hover:text-gold-primary transition-colors duration-300 relative group py-2">
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold-primary to-transparent group-hover:w-full transition-all duration-500 ease-out" />
            </a>
            <a href="#downloads" className="hover:text-gold-primary transition-colors duration-300 relative group py-2">
              Resources
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold-primary to-transparent group-hover:w-full transition-all duration-500 ease-out" />
            </a>
            <a href="#contact" className="hover:text-gold-primary transition-colors duration-300 relative group py-2">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-gold-primary to-transparent group-hover:w-full transition-all duration-500 ease-out" />
            </a>
          </div>

          <div className="w-px h-6 bg-white/10 hidden md:block" />

          <button 
            onClick={toggleTheme}
            className="text-text-secondary-dark hover:text-gold-primary transition-all duration-300 p-2.5 rounded-full hover:bg-white/5 hover:shadow-[0_0_15px_rgba(201,168,76,0.1)] btn-ripple"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-text-secondary-dark hover:text-gold-primary transition-all duration-300 font-mono uppercase text-xs tracking-widest p-2.5 rounded-full hover:bg-white/5 hover:shadow-[0_0_15px_rgba(201,168,76,0.1)] btn-ripple"
          >
            <Globe size={18} />
            {language === 'en' ? 'AR' : 'EN'}
          </button>

          {user ? (
            <div className="flex items-center gap-4 pl-2 md:pl-6 border-l border-white/10">
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-gold-primary to-gold-secondary rounded-full blur-md opacity-40 group-hover:opacity-100 transition duration-500" />
                <img src={user.photoURL || ''} alt="User" className="relative w-10 h-10 rounded-full border-2 border-gold-primary/50 object-cover shadow-[0_0_15px_rgba(0,0,0,0.5)]" />
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-text-secondary-dark hover:text-red-400 transition-all duration-300 p-2.5 rounded-full hover:bg-red-500/10 btn-ripple"
                title={t('logout')}
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-bg-dark bg-gradient-to-r from-gold-primary to-gold-secondary hover:opacity-90 transition-all duration-500 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_40px_rgba(201,168,76,0.5)] hover:scale-105 ml-2 md:ml-6 btn-ripple"
            >
              <LogIn size={18} />
              <span className="hidden md:inline font-bold">{t('login')}</span>
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
