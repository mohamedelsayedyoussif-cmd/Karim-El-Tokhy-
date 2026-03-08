import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const { isPreloaderDone, setPreloaderDone } = useStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPreloaderDone(true), 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [setPreloaderDone]);

  return (
    <AnimatePresence>
      {!isPreloaderDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg-dark overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-primary/10 via-transparent to-transparent opacity-60 blur-[100px]" />

          <div className="relative flex flex-col items-center z-10">
            {/* Abstract K forming */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="relative mb-16"
            >
              <div className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gold-secondary to-gold-primary text-9xl md:text-[14rem] font-display font-bold leading-none tracking-tighter drop-shadow-2xl">
                K.
              </div>
              <motion.div 
                className="absolute inset-0 bg-gold-primary/30 blur-3xl rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            {/* Progress counter */}
            <div className="flex items-end gap-3 mb-8">
              <motion.div 
                className="text-white font-mono text-5xl md:text-7xl font-light tracking-tighter drop-shadow-lg"
                key={progress}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {Math.min(progress, 100)}
              </motion.div>
              <span className="text-gold-secondary font-mono text-2xl md:text-3xl mb-2">%</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-72 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-primary to-gold-secondary"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "circOut", duration: 0.2 }}
              />
              {/* Glow effect on the tip of the progress bar */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-gold-primary rounded-full blur-md"
                initial={{ left: "0%" }}
                animate={{ left: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "circOut", duration: 0.2 }}
                style={{ translateX: '-50%' }}
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-10 text-xs font-mono tracking-[0.4em] uppercase text-gold-secondary"
            >
              Loading Experience
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
