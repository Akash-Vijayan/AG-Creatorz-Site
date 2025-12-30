
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../constants';
import { ArrowUpRight, Target } from 'lucide-react';

interface PortfolioProps {
  onViewAll: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onViewAll }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const limitedItems = PORTFOLIO_ITEMS.slice(0, 5);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const xSpring = useSpring(x, { stiffness: 45, damping: 25 });
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  if (isMobile) {
    return (
      <section id="portfolio" className="relative py-24 bg-[#0A0514] overflow-hidden">
         <div className="max-w-[95rem] mx-auto px-6">
            <div className="space-y-6 mb-16">
              <div className="flex items-center gap-4">
                <Target size={14} className="text-brandPrimary" />
                <span className="text-brandPrimary font-black text-[9px] tracking-[0.5em] uppercase">Visual Archive // 02</span>
              </div>
              <h2 className="text-5xl font-display font-bold tracking-tighter leading-none uppercase text-white">
                SELECTED<br/>
                <span className="text-brandPrimary italic font-serif font-normal lowercase">work</span>
              </h2>
            </div>

            <div className="grid gap-12">
              {limitedItems.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </div>

            <div className="mt-16 flex justify-center">
               <motion.button 
                 onClick={onViewAll}
                 className="flex flex-col items-center gap-6 group"
               >
                 <div className="w-20 h-20 rounded-full border border-brandPrimary/20 flex items-center justify-center group-active:bg-brandPrimary transition-all">
                   <ArrowUpRight size={24} className="text-brandPrimary group-active:text-white" />
                 </div>
                 <span className="text-brandPrimary text-[9px] font-black uppercase tracking-[0.6em]">Enter Vault</span>
               </motion.button>
            </div>
         </div>
      </section>
    );
  }

  return (
    <section ref={targetRef} id="portfolio" className="relative h-[300vh] bg-[#0A0514] transition-colors duration-1000 overflow-clip">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <motion.div 
          style={{ x: bgX }}
          className="absolute inset-0 flex items-center justify-start pointer-events-none opacity-[0.03] whitespace-nowrap z-0"
        >
          <span className="text-[25vw] font-display font-black uppercase tracking-tighter leading-none select-none text-white">
            ARCHIVE ARCHIVE ARCHIVE
          </span>
        </motion.div>

        <motion.div style={{ x: xSpring }} className="flex gap-20 px-[8vw] items-center z-10">
          
          <div className="flex-shrink-0 w-[450px] flex flex-col justify-center mr-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Target size={14} className="text-brandPrimary" />
                <span className="text-brandPrimary font-black text-[9px] tracking-[0.5em] uppercase">Visual Artifacts // 02</span>
              </div>
              <h2 className="text-8xl font-display font-bold tracking-tighter leading-[0.85] mb-8 uppercase text-white">
                SELECTED<br/>
                <span className="text-brandPrimary italic font-serif font-normal lowercase">work</span>
              </h2>
              <p className="text-base text-white/30 max-w-sm leading-relaxed border-l border-brandPrimary/20 pl-6">
                Refined digital assets where structural precision meets cinematic depth.
              </p>
            </motion.div>
          </div>

          {limitedItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}

          <div className="flex-shrink-0 w-[40vw] flex flex-col items-center justify-center">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               onClick={onViewAll}
               className="group cursor-pointer text-center"
             >
               <div className="w-32 h-32 rounded-full border border-brandPrimary/20 flex items-center justify-center mb-8 mx-auto group-hover:bg-brandPrimary group-hover:border-brandPrimary transition-all duration-700 shadow-xl">
                 <ArrowUpRight size={32} className="text-brandPrimary group-hover:text-white transition-colors" />
               </div>
               <span className="text-brandPrimary text-[10px] font-black uppercase tracking-[0.6em] group-hover:tracking-[0.8em] transition-all">View Vault</span>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PortfolioCard: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  // Glare effect
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 });
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize values between -0.5 and 0.5
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.2, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex-shrink-0 group relative w-full lg:w-[420px]"
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="aspect-[10/13] lg:aspect-[10/14] overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] bg-white/5 border border-white/5 relative shadow-[0_30px_100px_rgba(0,0,0,0.5)] transition-colors duration-700 group-hover:border-brandPrimary/40"
      >
        {/* Dynamic Image with subtle parallax */}
        <motion.img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-105 grayscale-[40%] group-hover:grayscale-0"
          style={{ transform: 'translateZ(-20px) scale(1.1)' }}
        />
        
        {/* Glare/Shine Effect */}
        <motion.div 
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 80%)`,
          }}
          className="absolute inset-0 pointer-events-none z-20"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-100 lg:opacity-90 z-10" />

        {/* Content Layers with Z-Depth */}
        <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end z-30" style={{ transformStyle: 'preserve-3d' }}>
           <motion.span 
              style={{ transform: 'translateZ(30px)' }}
              className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.4em] text-brandPrimary-light opacity-80 mb-3"
           >
              {item.category}
           </motion.span>
           
           <motion.h3 
              style={{ transform: 'translateZ(50px)' }}
              className="text-3xl lg:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tighter leading-[0.85]"
           >
              {item.title}
           </motion.h3>

           <motion.div 
              style={{ transform: 'translateZ(70px)' }}
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-brandPrimary/20 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 shadow-2xl border border-white/10"
           >
             <ArrowUpRight size={24} />
           </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;
