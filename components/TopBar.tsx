
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';
import { BRAND_QUOTES } from '../constants';

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3 h-3 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TopBar: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % BRAND_QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] bg-brandSurface-light dark:bg-brandSurface-dark border-b border-black/5 dark:border-white/5 h-10 flex items-center transition-colors duration-400">
      <div className="max-w-[95rem] mx-auto w-full px-6 md:px-12 flex justify-between items-center">
        
        {/* Left Side: Rotating Quotes */}
        <div className="flex items-center gap-4">
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-brandPrimary shadow-[0_0_10px_#7C3AED]"
          />
          <AnimatePresence mode="wait">
            <motion.p
              key={quoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-black/70 dark:text-white/70 whitespace-nowrap"
            >
              {BRAND_QUOTES[quoteIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Right Side: Social Media */}
        <div className="flex items-center gap-6">
          <a href="#" className="text-black/30 dark:text-white/20 hover:text-brandPrimary transition-all duration-300 transform hover:scale-110">
            <Instagram size={14} />
          </a>
          <a href="#" className="text-black/30 dark:text-white/20 hover:text-brandPrimary transition-all duration-300 transform hover:scale-110">
            <XLogo />
          </a>
          <a href="#" className="text-black/30 dark:text-white/20 hover:text-brandPrimary transition-all duration-300 transform hover:scale-110">
            <Linkedin size={14} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;
