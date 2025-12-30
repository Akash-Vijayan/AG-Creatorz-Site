
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Filter, Layout } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../constants';

interface PortfolioPageProps {
  onBack: () => void;
}

const CATEGORIES = ["All", "Brand Design", "Web Platforms", "Motion/Video", "Visual Identity", "Web Design", "Social Content", "Modern UI"];

const PortfolioPage: React.FC<PortfolioPageProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-20 transition-colors duration-1000 overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-brandPrimary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.85]">
              Project <span className="text-brandPrimary italic font-serif lowercase font-normal">archive</span>
            </h1>
            <p className="text-xl text-black/50 dark:text-white/40 max-w-lg leading-relaxed font-light">
              A curated selection of our finest digital artifacts, spanning across multiple disciplines and industries.
            </p>
          </div>

          <div className="flex flex-col items-end gap-4">
            <span className="text-[10px] font-mono text-black/30 dark:text-white/20 uppercase tracking-[0.4em]">Vault Stats</span>
            <div className="flex gap-8">
              <div className="text-right">
                <div className="text-4xl font-display font-black text-brandPrimary">24+</div>
                <div className="text-[8px] font-mono opacity-40 uppercase tracking-widest">Global Brands</div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-display font-black text-brandPrimary">500+</div>
                <div className="text-[8px] font-mono opacity-40 uppercase tracking-widest">Assets Built</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-16 border-b border-black/5 dark:border-white/5 pb-8">
          <div className="flex items-center gap-3 text-brandPrimary mr-6">
            <Filter size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Filter Vault</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-brandPrimary text-white shadow-xl shadow-brandPrimary/20' 
                  : 'bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:bg-brandPrimary/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <ArchiveCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-40 text-center space-y-6">
            <Layout size={48} className="mx-auto text-brandPrimary/20" />
            <h3 className="text-2xl font-display font-bold uppercase tracking-tighter opacity-40">No items found in this category</h3>
            <button onClick={() => setActiveCategory("All")} className="text-brandPrimary font-bold uppercase text-xs tracking-widest hover:underline">Show All Projects</button>
          </div>
        )}
      </div>
    </div>
  );
};

const ArchiveCard: React.FC<{ item: any; index: number }> = ({ item, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 15 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="aspect-[10/12] overflow-hidden rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 relative shadow-2xl"
      >
        <motion.img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
          style={{ transform: 'translateZ(-10px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
        
        <div 
          className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 z-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.span 
            style={{ transform: 'translateZ(20px)' }}
            className="text-[9px] font-black uppercase tracking-widest text-brandPrimary-light mb-2"
          >
            {item.category}
          </motion.span>
          <motion.h3 
            style={{ transform: 'translateZ(35px)' }}
            className="text-2xl font-display font-bold text-white uppercase tracking-tighter mb-4"
          >
            {item.title}
          </motion.h3>
          <motion.div 
            style={{ transform: 'translateZ(50px)' }}
            className="w-10 h-10 rounded-full bg-brandPrimary text-white flex items-center justify-center shadow-lg"
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>
      </motion.div>
      
      <div className="mt-5 flex justify-between items-center px-4">
        <div className="text-[9px] font-mono text-black/30 dark:text-white/20 uppercase tracking-widest">AG-ARC-0{index + 1}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-white/40">{item.title}</div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
