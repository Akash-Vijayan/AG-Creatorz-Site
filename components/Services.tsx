
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Globe, Box, PlayCircle, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

const SERVICES_DATA = [
  {
    id: 'web',
    title: 'Web Engineering',
    description: 'Modern, high-performance websites built for scalability and professional presence.',
    icon: <Globe size={28} />,
  },
  {
    id: 'design',
    title: 'Graphic Design',
    description: 'Impactful visual identities created to communicate your brand clearly.',
    icon: <Box size={28} />,
  },
  {
    id: 'video',
    title: 'Video Editing',
    description: 'Engaging edits focused on retention, flow, and high-quality storytelling.',
    icon: <PlayCircle size={28} />,
  }
];

const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section 
      id="services" 
      className="relative w-full py-6 md:py-10 bg-transparent overflow-visible"
    >
      <div className="max-w-[85rem] mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header Section - More Compact */}
        <div className="flex flex-col items-center text-center mb-10 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
          >
            <Sparkles size={10} className="text-brandPrimary-light" />
            <span className="text-brandPrimary-light text-[8px] font-black uppercase tracking-[0.4em]">Expert Registry</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white uppercase tracking-tighter leading-none">
            DIGITAL <span className="italic font-serif font-normal text-brandPrimary-light lowercase">services</span>
          </h2>
          
          <p className="text-white/40 text-[11px] md:text-xs font-light max-w-lg leading-relaxed px-4">
            Professional digital solutions designed to strengthen online presence through clarity and reliable execution.
          </p>
        </div>

        {/* 3D Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 perspective-2000">
          {SERVICES_DATA.map((service, i) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={i} 
              onClick={() => onSelectService(service.id)} 
            />
          ))}
        </div>

        {/* Section Action */}
        <div className="mt-10 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-3.5 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore All Services <ArrowRight size={14} />
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ 
  service: any; 
  index: number; 
  onClick: () => void;
}> = ({ service, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative cursor-pointer transform-gpu"
    >
      <div 
        className="relative bg-[#120B26]/60 border border-white/5 rounded-[2rem] p-8 h-full flex flex-col justify-between shadow-2xl transition-all duration-700 group-hover:border-brandPrimary/40 backdrop-blur-xl min-h-[340px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-brandPrimary-light group-hover:bg-brandPrimary group-hover:text-white transition-all duration-500 mb-6">
            {service.icon}
          </div>

          <h3 className="text-xl md:text-2xl font-display font-bold text-white uppercase tracking-tight leading-none mb-3 group-hover:translate-x-1 transition-transform">
            {service.title}
          </h3>
          
          <p className="text-white/40 text-[11px] leading-relaxed font-light group-hover:text-white/60 transition-colors">
            {service.description}
          </p>
        </div>

        <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex justify-between items-center" style={{ transform: 'translateZ(50px)' }}>
          <span className="text-[9px] font-mono font-bold text-brandPrimary-light uppercase tracking-widest">Protocol.0{index+1}</span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white transition-all">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
