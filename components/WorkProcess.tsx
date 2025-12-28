
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const steps = [
  { id: 1, title: 'Discovery', desc: 'Analyzing brand DNA and architecture to define a roadmap.', code: 'SYS_INIT' },
  { id: 2, title: 'Ideation', desc: 'Crafting visual narratives through moodboards and cinematic concepts.', code: 'VIS_AUTH' },
  { id: 3, title: 'Fabrication', desc: 'High-precision engineering of assets, code, and motion sequences.', code: 'FAB_CORE' },
  { id: 4, title: 'Calibration', desc: 'Frame-by-frame optimization for maximum impact and performance.', code: 'OPT_SYNC' },
  { id: 5, title: 'Deployment', desc: 'Executing final launch and scaling your digital presence.', code: 'EXE_LIVE' },
];

const WorkProcess: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 30, damping: 20 });

  return (
    <section ref={containerRef} id="process" className="relative h-[500vh] bg-[#0A0514] transition-colors duration-1000 overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        
        {/* Violet Core Background Effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            style={{ 
              scale: useTransform(smoothProgress, [0, 1], [0.8, 1.3]),
              opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.05, 0.1, 0.05])
            }}
            className="w-[800px] h-[800px] rounded-full bg-brandPrimary/20 blur-[150px]"
          />
        </div>

        {/* HUD Overlay */}
        <div className="absolute inset-x-0 top-16 px-16 flex justify-between items-start z-50">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-brandPrimary-light font-black uppercase tracking-[0.5em]">Execution Pipeline // 03</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brandPrimary rounded-full animate-pulse" />
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Protocol v4.2 Stable</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest mb-2 block">Progression</span>
            <div className="w-48 h-[1px] bg-white/5 relative">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-brandPrimary"
                style={{ width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
              />
            </div>
          </div>
        </div>

        {/* Stack View */}
        <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">
          {steps.map((step, index) => (
            <ProcessLayer key={step.id} step={step} index={index} progress={smoothProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessLayer: React.FC<{ step: any; index: number; progress: any }> = ({ step, index, progress }) => {
  const stepSize = 1 / steps.length;
  const start = index * stepSize;
  const scale = useTransform(progress, [start - 0.2, start, start + 0.1, start + 0.25], [0.7, 1, 1.2, 2.5]);
  const opacity = useTransform(progress, [start - 0.15, start, start + 0.1, start + 0.2], [0, 1, 1, 0]);
  const blur = useTransform(progress, [start - 0.2, start, start + 0.1], ["10px", "0px", "0px"]);
  const filter = useTransform(blur, (b) => `blur(${b})`);

  return (
    <motion.div style={{ scale, opacity, filter }} className="absolute inset-0 flex items-center justify-center">
      <div className="w-full max-w-xl aspect-[1.3/1] bg-white/[0.02] backdrop-blur-3xl rounded-[3.5rem] border border-white/10 p-12 md:p-16 relative overflow-hidden">
        <div className="h-full flex flex-col justify-between relative z-10">
          <div className="space-y-6">
            <span className="text-brandPrimary-light font-mono text-[10px] font-black tracking-[0.4em]">PHASE_0{index + 1}</span>
            <h3 className="text-5xl md:text-7xl font-display font-bold text-white uppercase tracking-tighter leading-none">{step.title}</h3>
            <p className="text-white/40 text-lg font-light leading-relaxed max-w-sm">{step.desc}</p>
          </div>
          <div className="flex justify-between items-end border-t border-white/5 pt-10">
            <div className="space-y-1">
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest block">Node Link</span>
              <span className="text-[10px] font-mono text-white/60 block">{step.code}</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-brandPrimary/10 border border-brandPrimary/20 flex items-center justify-center">
               <div className="w-3 h-3 bg-brandPrimary rounded-full shadow-[0_0_15px_#7C3AED]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkProcess;
