
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Target, Activity, Send, ArrowDown } from 'lucide-react';

const steps = [
  { 
    id: 1, 
    title: 'Discovery', 
    desc: 'Analyzing brand DNA and architecture to define a roadmap and core mission.', 
    code: 'SYS_INIT',
    icon: <Activity size={20} />
  },
  { 
    id: 2, 
    title: 'Ideation', 
    desc: 'Crafting visual narratives through moodboards and cinematic concepts.', 
    code: 'VIS_AUTH',
    icon: <Zap size={20} />
  },
  { 
    id: 3, 
    title: 'Fabrication', 
    desc: 'High-precision engineering of assets, code, and motion sequences.', 
    code: 'FAB_CORE',
    icon: <Cpu size={20} />
  },
  { 
    id: 4, 
    title: 'Calibration', 
    desc: 'Frame-by-frame optimization for maximum impact and performance.', 
    code: 'OPT_SYNC',
    icon: <Target size={20} />
  },
  { 
    id: 5, 
    title: 'Deployment', 
    desc: 'Executing final launch and scaling your digital presence globally.', 
    code: 'EXE_LIVE',
    icon: <Send size={20} />
  },
];

const WorkProcess: React.FC = () => {
  return (
    <section id="process" className="relative py-24 md:py-48 bg-white transition-colors duration-1000 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.01] sm:opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #7C3AED 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 md:mb-32">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-8 sm:w-10 h-[1px] bg-brandPrimary/30" />
               <span className="text-brandPrimary text-[9px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]">Pipeline // 03</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-bold text-black uppercase tracking-tighter leading-none">
              Execution <span className="italic font-serif font-normal text-brandPrimary lowercase">Protocol</span>
            </h2>
          </div>
          <div className="text-left md:text-right">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono font-bold text-black/40 uppercase tracking-widest">v4.2 STABLE</span>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Main vertical line - Always centered in mobile/desktop */}
          <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brandPrimary via-brandPrimary/10 to-transparent opacity-20" />

          <div className="space-y-16 md:space-y-40">
            {steps.map((step, i) => (
              <div 
                key={step.id} 
                className={`flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-0 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Visual Connector Line (Mobile) */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-brandPrimary z-30 lg:hidden" />

                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-[45%] pl-12 lg:pl-0"
                >
                  <div className="p-8 sm:p-14 rounded-[2.5rem] sm:rounded-[3.5rem] bg-black/[0.02] border border-black/5 shadow-xl relative overflow-hidden group transition-all hover:border-brandPrimary/40">
                    <div className="relative z-10 flex flex-col gap-6 sm:gap-8 text-left">
                       <div className="flex justify-between items-center">
                          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-brandPrimary/5 border border-brandPrimary/10 flex items-center justify-center text-brandPrimary group-hover:bg-brandPrimary group-hover:text-white transition-all">
                            {step.icon}
                          </div>
                          <span className="text-[8px] sm:text-[10px] font-mono text-black/10 font-black uppercase tracking-[0.5em]">Phase // 0{step.id}</span>
                       </div>

                       <div className="space-y-2 sm:space-y-4">
                         <h3 className="text-2xl sm:text-4xl font-display font-bold text-black uppercase tracking-tighter leading-none">
                           {step.title}
                         </h3>
                         <p className="text-black/40 text-sm sm:text-lg font-light leading-relaxed">
                           {step.desc}
                         </p>
                       </div>

                       <div className="pt-6 sm:pt-8 border-t border-black/5 flex justify-between items-center">
                         <span className="text-[8px] sm:text-[9px] font-mono text-brandPrimary uppercase tracking-widest font-black">{step.code}</span>
                         <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-brandPrimary/5 border border-brandPrimary/10 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-brandPrimary rounded-full" />
                         </div>
                       </div>
                    </div>
                  </div>
                </motion.div>

                {/* Desktop Center Indicator */}
                <div className="hidden lg:flex w-[10%] justify-center relative z-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-brandPrimary flex items-center justify-center text-white shadow-xl relative border-4 border-white"
                  >
                    <span className="text-xs font-black">0{step.id}</span>
                  </motion.div>
                </div>

                <div className="hidden lg:block w-[45%]" />
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center mt-24 sm:mt-32 space-y-6 sm:space-y-8">
             <div className="w-px h-16 sm:h-24 bg-gradient-to-b from-brandPrimary to-transparent" />
             <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-brandPrimary/10 flex items-center justify-center animate-bounce">
               <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-brandPrimary/30" />
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WorkProcess;
