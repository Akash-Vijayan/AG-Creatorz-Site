
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';
import { ArrowRight, Globe, Box, PlayCircle } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section 
      id="services" 
      className="relative py-20 sm:py-32 bg-white dark:bg-[#050505] transition-colors duration-1000 overflow-hidden"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 sm:mb-24 border-b border-black/5 dark:border-white/5 pb-8 sm:pb-12">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 sm:w-8 h-[1px] bg-brandPrimary" />
              <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-brandPrimary">Capability Archive</span>
            </div>
            <h2 className="text-4xl sm:text-7xl font-display font-bold uppercase tracking-tighter leading-none">
              OUR <span className="text-brandPrimary italic font-serif lowercase font-normal">Expertise</span>
            </h2>
          </div>
          <div className="hidden md:block max-w-[240px] text-right">
             <p className="text-black/40 dark:text-white/20 text-[10px] font-mono uppercase tracking-widest leading-relaxed">
               Disciplined digital execution across three core domains of the modern web.
             </p>
          </div>
        </div>

        {/* Services List - Architectural Stack */}
        <div className="space-y-4 sm:space-y-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
              onClick={() => onSelectService(service.id)}
            >
              <div className="relative flex flex-col md:flex-row gap-6 md:gap-16 p-8 sm:p-14 rounded-[2rem] sm:rounded-[2.5rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:border-brandPrimary/30 transition-all duration-700 cursor-pointer overflow-hidden">
                
                {/* Visual Number Indicator */}
                <div className="absolute top-6 right-6 sm:top-10 sm:right-10 text-6xl sm:text-9xl font-display font-black text-black/[0.03] dark:text-white/[0.02] group-hover:text-brandPrimary/5 transition-colors pointer-events-none">
                  0{i + 1}
                </div>

                {/* Left: Icon & Category */}
                <div className="flex flex-col gap-6 w-12 sm:w-24 shrink-0">
                   <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-brandPrimary/5 text-brandPrimary flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white transition-all duration-500 shadow-xl">
                      {service.icon === 'web' ? <Globe className="w-6 h-6 sm:w-7 sm:h-7" /> : null}
                      {service.icon === 'design' ? <Box className="w-6 h-6 sm:w-7 sm:h-7" /> : null}
                      {service.icon === 'video' ? <PlayCircle className="w-6 h-6 sm:w-7 sm:h-7" /> : null}
                   </div>
                </div>

                {/* Center: Title & Description */}
                <div className="flex-1 space-y-4 sm:space-y-6 relative z-10">
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-2xl sm:text-5xl font-display font-bold uppercase tracking-tight text-black dark:text-white group-hover:text-brandPrimary transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-lg text-black/50 dark:text-white/40 leading-relaxed font-light max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Service Keywords */}
                  <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                    {service.details?.features.slice(0, 3).map((feat, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full border border-black/5 dark:border-white/5 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-widest text-black/60 dark:text-white/30 whitespace-nowrap">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Pricing & Action */}
                <div className="flex flex-row md:flex-col justify-between items-center md:items-end shrink-0 relative z-10 pt-4 md:pt-0 border-t md:border-t-0 border-black/5">
                  <div className="text-left md:text-right">
                    <span className="text-[8px] font-mono text-black/30 dark:text-white/20 uppercase tracking-widest block mb-1">Engage</span>
                    <span className="text-xl sm:text-3xl font-mono font-bold text-black dark:text-white">{service.price}</span>
                  </div>
                  
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white group-hover:border-brandPrimary transition-all duration-500 shadow-lg">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
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
