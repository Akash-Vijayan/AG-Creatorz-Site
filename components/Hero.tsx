
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HERO_CONTENT } from '../constants';

interface HeroProps {
  onContact?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onContact }) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const yParallax = useTransform(scrollY, [0, 800], [0, -120]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  const scaleHero = useTransform(scrollY, [0, 500], [1, 0.98]);

  const splitText = (text: string, delayBase = 0) => text.split(" ").map((word, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: delayBase + (i * 0.08), 
        ease: [0.23, 1, 0.32, 1] 
      }}
      className="inline-block mr-[0.25em]"
    >
      {word}
    </motion.span>
  ));

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-[#050505] px-6 transition-colors duration-1000"
    >
      <motion.div 
        style={{ y: yParallax, opacity: opacityText, scale: scaleHero }}
        className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center"
      >
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-brandPrimary animate-pulse" />
             <span className="text-brandPrimary text-[9px] font-black uppercase tracking-[0.6em] px-4 py-2 border border-brandPrimary/10 rounded-full bg-brandPrimary/5 backdrop-blur-md">
               Crafting Digital Legacies
             </span>
          </div>
        </motion.div>

        <div className="text-center w-full">
          <h1 className="font-display font-bold text-huge tracking-tighter text-black dark:text-white uppercase leading-[0.9]">
            <div className="overflow-hidden pb-1">
              {splitText("BUILDING DIGITAL", 0.2)}
            </div>
            <div className="overflow-hidden flex flex-wrap justify-center items-baseline gap-y-2">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                className="italic font-serif font-normal text-brandPrimary lowercase mr-4 text-[0.9em]"
              >
                excellence
              </motion.span>
              <div className="inline-block">
                {splitText("FROM SCRATCH", 0.8)}
              </div>
            </div>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.2 }}
            className="mt-10 text-base md:text-lg text-black/50 dark:text-white/30 font-light max-w-lg mx-auto leading-relaxed tracking-wide"
          >
            {HERO_CONTENT.subhead}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#7C3AED', color: '#fff' }}
            whileTap={{ scale: 0.95 }}
            onClick={onContact}
            className="px-10 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-black uppercase tracking-widest text-[11px] transition-all shadow-xl"
          >
            Start Project
          </motion.button>
          <motion.a 
            whileHover={{ scale: 1.05, borderColor: '#7C3AED', color: '#7C3AED' }}
            whileTap={{ scale: 0.95 }}
            href="#portfolio" 
            className="px-10 py-4 border border-black/10 dark:border-white/10 text-black dark:text-white rounded-full font-black uppercase tracking-widest text-[11px] transition-all"
          >
            View Work
          </motion.a>
        </motion.div>
      </motion.div>
      
      {/* Refined Background Gradient */}
      <motion.div 
        animate={{ 
          opacity: [0.02, 0.05, 0.02],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-brandPrimary/20 blur-[150px] rounded-full pointer-events-none -z-10"
      />
    </section>
  );
};

export default Hero;
