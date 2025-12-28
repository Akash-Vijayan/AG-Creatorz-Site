
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Target, Activity, Send, ArrowDown } from 'lucide-react';

const steps = [
  { 
    id: 1, 
    title: 'Discovery', 
    desc: 'Analyzing brand DNA and architecture to define a roadmap and core mission.', 
    code: 'SYS_INIT',
    icon: <Activity size={24} />
  },
  { 
    id: 2, 
    title: 'Ideation', 
    desc: 'Crafting visual narratives through moodboards and cinematic concepts.', 
    code: 'VIS_AUTH',
    icon: <Zap size={24} />
  },
  { 
    id: 3, 
    title: 'Fabrication', 
    desc: 'High-precision engineering of assets, code, and motion sequences.', 
    code: 'FAB_CORE',
    icon: <Cpu size={24} />
  },
  { 
    id: 4, 
    title: 'Calibration', 
    desc: 'Frame-by-frame optimization for maximum impact and performance.', 
    code: 'OPT_SYNC',
    icon: <Target size={24} />
  },
  { 
    id: 5, 
    title: 'Deployment', 
    desc: 'Executing final launch and scaling your digital presence globally.', 
    code: 'EXE_LIVE',
    icon: <Send size={24} />
  },
];

const WorkProcess: React.FC = () => {
  return (
    <section id="process" className="relative py-32 md:py-48 bg-[#0A0514] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #7C3AED 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-32">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-10 h-[1px] bg-brandPrimary-light/30" />
               <span className="text-brandPrimary-light text-[10px] font-black uppercase tracking-[0.6em]">Pipeline // 03</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-display font-bold text-white uppercase tracking-tighter leading-none">
              Execution <span className="italic font-serif font-normal text-brandPrimary-light lowercase">Protocol</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] block mb-2">System Status</span>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[11px] font-mono font-bold text-white/60">v4.2 STABLE_LOAD</span>
            </div>
          </div>
        </div>

        {/* Staggered Vertical List - The "Neat" Solution */}
        <div className="relative">
          {/* Vertical Pipeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brandPrimary via-brandPrimary/20 to-transparent hidden lg:block opacity-30" />

          <div className="space-y-24 md:space-y-40">
            {steps.map((step, i) => (
              <div 
                key={step.id} 
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-0 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Card Content */}
                <motion.div 
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-[45%]"
                >
                  <div className="p-10 md:p-16 rounded-[4rem] bg-[#120B26] border border-white/5 shadow-2xl relative overflow-hidden group transition-all hover:border-brandPrimary/40 backdrop-blur-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-brandPrimary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="relative z-10 flex flex-col gap-8">
                       <div className="flex justify-between items-center">
                          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-brandPrimary-light group-hover:bg-brandPrimary group-hover:text-white transition-all">
                            {step.icon}
                          </div>
                          <span className="text-[10px] font-mono text-white/10 font-black uppercase tracking-[0.5em]">Phase // 0{step.id}</span>
                       </div>

                       <div className="space-y-4">
                         <h3 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter leading-none">
                           {step.title}
                         </h3>
                         <p className="text-white/40 text-lg font-light leading-relaxed">
                           {step.desc}
                         </p>
                       </div>

                       <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                         <span className="text-[9px] font-mono text-brandPrimary-light uppercase tracking-widest font-black">{step.code}</span>
                         <div className="w-8 h-8 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 flex items-center justify-center">
                            <div className="w-2 h-2 bg-brandPrimary rounded-full shadow-[0_0_15px_#7C3AED]" />
                         </div>
                       </div>
                    </div>
                  </div>
                </motion.div>

                {/* Center Node (Hidden on mobile) */}
                <div className="hidden lg:flex w-[10%] justify-center relative z-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="w-12 h-12 rounded-full bg-brandPrimary flex items-center justify-center text-white shadow-[0_0_30px_#7C3AED] relative border-4 border-[#0A0514]"
                  >
                    <span className="text-xs font-black">0{step.id}</span>
                  </motion.div>
                </div>

                {/* Empty spacer for grid alignment */}
                <div className="hidden lg:block w-[45%]" />
              </div>
            ))}
          </div>

          {/* Final Protocol Signal */}
          <div className="flex flex-col items-center mt-32 space-y-8">
             <div className="w-px h-24 bg-gradient-to-b from-brandPrimary to-transparent" />
             <div className="w-20 h-20 rounded-full border border-brandPrimary/20 flex items-center justify-center animate-bounce">
               <ArrowDown size={32} className="text-brandPrimary/40" />
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WorkProcess;
