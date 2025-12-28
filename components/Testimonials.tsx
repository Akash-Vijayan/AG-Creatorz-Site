
import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-32 bg-white overflow-hidden transition-colors duration-1000">
      <div className="max-w-[95rem] mx-auto px-6 mb-20 text-center">
        <span className="text-brandPrimary text-[10px] font-black uppercase tracking-[0.8em] block mb-6">Testimonials // 04</span>
        <h2 className="text-5xl md:text-7xl font-display font-bold text-black uppercase tracking-tighter">
          Strategic <span className="italic font-serif font-normal text-brandPrimary lowercase">impact</span>
        </h2>
      </div>
      
      <div 
        className="relative w-full overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}
      >
        <motion.div 
          className="flex gap-8 px-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          style={{ width: "max-content" }}
        >
          {duplicatedTestimonials.map((t, i) => (
            <div key={i} className="w-[400px] md:w-[500px] p-10 md:p-12 rounded-[3.5rem] bg-black/[0.02] border border-black/5 flex flex-col justify-between shadow-xl transition-all hover:border-brandPrimary/30">
              <Quote size={48} className="text-brandPrimary/10 mb-8" />
              <p className="text-xl md:text-2xl text-black font-medium leading-relaxed italic mb-12">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-5 border-t border-black/5 pt-8">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full grayscale hover:grayscale-0 transition-all shadow-lg" />
                <div>
                  <h4 className="font-bold text-black text-lg">{t.name}</h4>
                  <p className="text-[10px] font-mono text-brandPrimary font-black uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
