
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Hero from './Hero';
import Services from './Services';

interface TearSectionProps {
  onSelectService: (id: string) => void;
  onContact: () => void;
}

const TearSection: React.FC<TearSectionProps> = ({ onSelectService, onContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.001
  });

  // Aggressive 3D Tear Movement
  const leftX = useTransform(smoothProgress, [0, 0.45], ["0%", "-115%"]);
  const rightX = useTransform(smoothProgress, [0, 0.45], ["0%", "115%"]);
  
  const leftRotateY = useTransform(smoothProgress, [0, 0.45], [0, -40]);
  const rightRotateY = useTransform(smoothProgress, [0, 0.45], [0, 40]);
  
  const leftRotateZ = useTransform(smoothProgress, [0, 0.45], [0, -8]);
  const rightRotateZ = useTransform(smoothProgress, [0, 0.45], [0, 8]);

  // Content revealed from depth
  const revealScale = useTransform(smoothProgress, [0, 0.5], [0.85, 1]);
  const revealZ = useTransform(smoothProgress, [0, 0.5], [-300, 0]);
  const revealOpacity = useTransform(smoothProgress, [0, 0.35], [0, 1]);

  // Precise Jagged Paths with a tiny overlap (50.1%) to prevent the "purple line" gap
  const leftJagged = "polygon(0% 0%, 50.1% 0%, 48% 15%, 52% 35%, 48% 55%, 52% 75%, 48% 90%, 50.1% 100%, 0% 100%)";
  const rightJagged = "polygon(49.9% 0%, 100% 0%, 100% 100%, 49.9% 100%, 48% 90%, 52% 75%, 48% 55%, 52% 35%, 48% 15%)";

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#0A0514] perspective-2000 overflow-x-hidden">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* THE VOID (REVEALED CONTENT) - Unified into main page flow */}
        <motion.div 
          style={{ 
            opacity: revealOpacity, 
            scale: revealScale,
            z: revealZ,
            transformStyle: 'preserve-3d'
          }}
          className="absolute inset-0 z-0 bg-[#0A0514] will-change-transform flex items-center justify-center pointer-events-auto"
        >
          <div className="w-full max-h-full">
            <Services onSelectService={onSelectService} />
          </div>
        </motion.div>

        {/* THE PAPER (HERO TOP LAYER) */}
        <div className="absolute inset-0 z-20 pointer-events-none w-full h-full transform-gpu">
          
          {/* Left Peel */}
          <motion.div 
            style={{ 
              x: leftX,
              rotateY: leftRotateY,
              rotateZ: leftRotateZ,
              clipPath: leftJagged,
              originX: "0%",
              originY: "50%",
              transformStyle: 'preserve-3d'
            }}
            className="absolute inset-0 w-full h-full pointer-events-auto bg-white will-change-transform"
          >
            <div className="w-full h-full shadow-[40px_0_80px_rgba(0,0,0,0.2)] overflow-hidden">
              <Hero onContact={onContact} isInsideTear={true} />
            </div>
            {/* Edge Shadow */}
            <motion.div 
               style={{ opacity: useTransform(smoothProgress, [0, 0.2], [0, 0.4]) }}
               className="absolute top-0 right-[49%] bottom-0 w-40 bg-gradient-to-r from-transparent to-black/60 pointer-events-none"
            />
          </motion.div>

          {/* Right Peel */}
          <motion.div 
            style={{ 
              x: rightX,
              rotateY: rightRotateY,
              rotateZ: rightRotateZ,
              clipPath: rightJagged,
              originX: "100%",
              originY: "50%",
              transformStyle: 'preserve-3d'
            }}
            className="absolute inset-0 w-full h-full pointer-events-auto bg-white will-change-transform"
          >
            <div className="w-full h-full shadow-[-40px_0_80px_rgba(0,0,0,0.2)] overflow-hidden">
              <Hero onContact={onContact} isInsideTear={true} />
            </div>
            {/* Edge Shadow */}
            <motion.div 
               style={{ opacity: useTransform(smoothProgress, [0, 0.2], [0, 0.4]) }}
               className="absolute top-0 left-[49%] bottom-0 w-40 bg-gradient-to-l from-transparent to-black/60 pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TearSection;
