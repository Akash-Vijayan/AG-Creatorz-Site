
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-24 md:py-32 bg-[#0A0514] text-white transition-colors duration-1000 overflow-hidden relative">
      {/* Decorative Command Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #7C3AED 1px, transparent 1px), linear-gradient(to bottom, #7C3AED 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-[95rem] mx-auto px-6 mb-16 relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-px bg-brandPrimary" />
          <span className="text-brandPrimary text-[10px] font-black uppercase tracking-[0.8em]">Endorsements // 04</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter leading-none">
          Client <span className="italic font-serif font-normal text-brandPrimary lowercase">Reflections</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="relative grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Main Cinematic Spotlight */}
          <div className="lg:col-span-8 relative">
            <div className="absolute -top-6 -left-6 md:-top-10 md:-left-10 text-brandPrimary/10">
              <Quote size={100} className="md:w-[120px] md:h-[120px]" />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="relative z-10 space-y-8 md:space-y-12"
              >
                <div className="flex gap-1 text-brandPrimary">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-2xl md:text-5xl font-display font-medium text-white leading-tight tracking-tight">
                  "{TESTIMONIALS[index].quote}"
                </p>
                <div className="flex items-center gap-6 pt-8 border-t border-white/5">
                   <div className="space-y-1">
                      <h4 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">{TESTIMONIALS[index].name}</h4>
                      <p className="text-[10px] font-mono text-brandPrimary font-black uppercase tracking-widest">{TESTIMONIALS[index].role}</p>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 mt-12 md:mt-16">
              <button onClick={prev} className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-brandPrimary hover:text-white hover:border-brandPrimary transition-all duration-500">
                <ChevronLeft size={24} />
              </button>
              <button onClick={next} className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center hover:bg-brandPrimary hover:text-white hover:border-brandPrimary transition-all duration-500">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Thumbnail Strip / Film Look */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="space-y-6">
               {TESTIMONIALS.map((t, i) => (
                 <motion.div
                   key={t.id}
                   onClick={() => setIndex(i)}
                   animate={{ 
                     opacity: index === i ? 1 : 0.3,
                     scale: index === i ? 1.05 : 1,
                     x: index === i ? 20 : 0
                   }}
                   className={`p-6 rounded-[2.5rem] border cursor-pointer transition-all duration-500 flex items-center gap-6 ${
                     index === i ? 'bg-brandPrimary/10 border-brandPrimary/20 shadow-xl' : 'border-transparent hover:border-white/5'
                   }`}
                 >
                   <img src={t.image} alt={t.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg grayscale group-hover:grayscale-0" />
                   <div className="flex-1">
                      <div className="font-bold text-white uppercase tracking-tighter text-sm">{t.name}</div>
                      <div className="text-[8px] font-mono opacity-40 uppercase tracking-widest">{t.role}</div>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
