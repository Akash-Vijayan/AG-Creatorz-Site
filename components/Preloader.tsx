
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_PATH } from '../constants';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0); // 0: flow, 1: merge, 2: logo reveal, 3: fade out
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Timeline sequence
    const t1 = setTimeout(() => setStage(1), 1200); // Streams meet
    const t2 = setTimeout(() => setStage(2), 2200); // Logo appears
    const t3 = setTimeout(() => setStage(3), 3200); // Fade out text
    const t4 = setTimeout(onComplete, 3800); // Unmount

    // Escape to skip
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onComplete();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Liquid Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Stream 1 - Deep Violet */}
        <motion.div
          className="absolute w-32 h-32 bg-brandPrimary-dark rounded-full mix-blend-multiply dark:mix-blend-screen opacity-80"
          initial={{ x: '-120vw', scale: 0.5 }}
          animate={
            stage === 0 ? { x: -50, scale: 1.2 } :
            stage >= 1 ? { x: 0, scale: 3, opacity: 0 } : {}
          }
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Stream 2 - Light Violet */}
        <motion.div
          className="absolute w-32 h-32 bg-brandPrimary rounded-full mix-blend-multiply dark:mix-blend-screen opacity-80"
          initial={{ x: '120vw', scale: 0.5 }}
          animate={
            stage === 0 ? { x: 50, scale: 1.2 } :
            stage >= 1 ? { x: 0, scale: 3, opacity: 0 } : {}
          }
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>

      {/* Logo Container - Appears after liquid merge */}
      <AnimatePresence>
        {stage >= 1 ? (
          <motion.div 
            key="logo-container"
            className="absolute inset-0 flex flex-col items-center justify-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Ripple Effect Ring */}
            <motion.div 
              className="absolute w-40 h-40 border-2 border-brandPrimary rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1, repeat: 0 }}
            />
            
            <div className="relative flex flex-col items-center">
               {!imageError ? (
                 <img 
                   src={LOGO_PATH} 
                   alt="AG Creatorz Logo" 
                   className="w-24 h-24 object-contain mb-4 dark:invert"
                   onError={() => setImageError(true)}
                 />
               ) : (
                 <div className="w-24 h-24 bg-brandPrimary/10 text-brandPrimary border border-brandPrimary/20 rounded-full flex items-center justify-center font-bold text-2xl mb-4 shadow-xl">
                   AG
                 </div>
               )}

               {stage >= 2 ? (
                  <motion.h1
                    className="text-2xl font-display font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brandPrimary to-brandPrimary-dark"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    AG CREATORZ
                  </motion.h1>
                ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      
      {/* Skip Hint */}
      <motion.div 
        className="absolute bottom-8 text-xs text-mutedGray uppercase tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
      >
        Press ESC to skip
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
