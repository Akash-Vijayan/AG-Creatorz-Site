
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../constants';
import { ArrowUpRight, Target } from 'lucide-react';

interface PortfolioProps {
  onViewAll: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onViewAll }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const limitedItems = PORTFOLIO_ITEMS.slice(0, 5);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const xSpring = useSpring(x, { stiffness: 45, damping: 25 });
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={targetRef} id="portfolio" className="relative h-[300vh] bg-white transition-colors duration-1000 overflow-clip">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background Ticker Text - White Theme */}
        <motion.div 
          style={{ x: bgX }}
          className="absolute inset-0 flex items-center justify-start pointer-events-none opacity-[0.03] whitespace-nowrap z-0"
        >
          <span className="text-[25vw] font-display font-black uppercase tracking-tighter leading-none select-none text-black">
            ARCHIVE ARCHIVE ARCHIVE
          </span>
        </motion.div>

        <motion.div style={{ x: xSpring }} className="flex gap-12 md:gap-20 px-[8vw] items-center z-10">
          
          {/* Section Introduction */}
          <div className="flex-shrink-0 w-[85vw] md:w-[450px] flex flex-col justify-center mr-10 md:mr-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <Target size={14} className="text-brandPrimary" />
                <span className="text-brandPrimary font-black text-[9px] tracking-[0.5em] uppercase">Visual Artifacts // 02</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.85] mb-8 uppercase text-black">
                SELECTED<br/>
                <span className="text-brandPrimary italic font-serif font-normal lowercase">work</span>
              </h2>
              <p className="text-sm md:text-base text-black/40 max-w-sm leading-relaxed border-l border-brandPrimary/20 pl-6">
                A showcase of refined digital assets where precision meets cinematic aesthetics.
              </p>
            </motion.div>
          </div>

          {/* Portfolio Cards */}
          {limitedItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}

          {/* Final CTA */}
          <div className="flex-shrink-0 w-[40vw] flex flex-col items-center justify-center">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               onClick={onViewAll}
               className="group cursor-pointer text-center"
             >
               <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-brandPrimary/20 flex items-center justify-center mb-8 mx-auto group-hover:bg-brandPrimary group-hover:border-brandPrimary transition-all duration-700 shadow-xl">
                 <ArrowUpRight size={32} className="text-brandPrimary group-hover:text-white transition-colors" />
               </div>
               <span className="text-brandPrimary text-[10px] font-black uppercase tracking-[0.6em] group-hover:tracking-[0.8em] transition-all">View Full Vault</span>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PortfolioCard: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="flex-shrink-0 group relative w-[75vw] sm:w-[350px] md:w-[420px]"
    >
      <div className="aspect-[10/14] overflow-hidden rounded-[3rem] bg-black/5 border border-black/5 relative shadow-xl transition-all duration-700 group-hover:border-brandPrimary/50 group-hover:shadow-[0_0_80px_rgba(124,58,237,0.1)]">
        <motion.img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
        <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-all duration-700">
           <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brandPrimary-light opacity-80 mb-2">{item.category}</span>
           <h3 className="text-4xl font-display font-bold text-white mb-6 uppercase tracking-tight leading-none">{item.title}</h3>
           <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 shadow-xl border border-white/5">
             <ArrowUpRight size={18} />
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;
