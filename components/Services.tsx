
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { Globe, Box, PlayCircle, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section 
      id="services" 
      className="relative min-h-screen flex items-center py-24 md:py-32 bg-[#0A0514] overflow-hidden"
    >
      {/* Background Subtle Tech Grid - Violet Theme */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #7C3AED 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 w-full relative z-10">
        {/* Header - Neat & Clean */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 space-y-4">
           <div className="flex items-center gap-3">
             <div className="w-10 h-[1px] bg-brandPrimary-light/30" />
             <span className="text-brandPrimary-light text-[10px] font-black uppercase tracking-[0.6em]">Registry // 01</span>
             <div className="w-10 h-[1px] bg-brandPrimary-light/30" />
           </div>
           <h2 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter">
             Core <span className="italic font-serif font-normal text-brandPrimary-light lowercase">Expertise</span>
           </h2>
           <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em] max-w-sm">
             Architectural precision across primary creative domains.
           </p>
        </div>

        {/* The Grid: Perfectly Aligned */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              onClick={() => onSelectService(service.id)}
              className="group relative cursor-pointer"
            >
              {/* Card Container: Deep dark glassmorphism */}
              <div className="relative h-full p-10 md:p-12 rounded-[3.5rem] bg-[#0F0A1F] border border-white/5 overflow-hidden transition-all duration-700 group-hover:border-brandPrimary/40 shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[500px]">
                
                {/* Glow Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brandPrimary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Top Section */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center text-brandPrimary-light group-hover:bg-brandPrimary group-hover:text-white transition-all duration-500 shadow-xl">
                      {service.icon === 'web' ? <Globe size={28} /> : null}
                      {service.icon === 'design' ? <Box size={28} /> : null}
                      {service.icon === 'video' ? <PlayCircle size={28} /> : null}
                    </div>
                    <span className="text-[10px] font-mono text-white/10 uppercase tracking-[0.4em] font-black group-hover:text-brandPrimary-light transition-colors">
                      MOD_{i + 1}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white leading-[0.9] flex flex-col">
                      {service.title.split(' ').map((word, idx) => (
                        <span key={idx}>{word}</span>
                      ))}
                    </h3>
                    <p className="text-base text-white/40 leading-relaxed font-light max-w-[260px]">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10 pt-10 mt-10 border-t border-white/5 space-y-8">
                  <div className="flex flex-wrap gap-2">
                    {service.details?.features.slice(0, 2).map((feat: string, idx: number) => (
                      <span key={idx} className="px-4 py-2 rounded-xl bg-white/[0.03] text-[9px] font-mono font-bold uppercase tracking-widest text-white/50 border border-white/5">
                        {feat}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center group/btn">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Investment</span>
                      <span className="text-2xl font-mono font-bold text-brandPrimary-light">{service.price}</span>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:bg-brandPrimary group-hover/btn:text-white transition-all duration-500">
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
