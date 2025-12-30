
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Hero from './Hero';

interface TearSectionProps {
  onContact: () => void;
}

const TearSection: React.FC<TearSectionProps> = ({ onContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    restDelta: 0.001
  });

  // Tear Movement Logic - Quicker exit to let user scroll the rest of the page
  const leftX = useTransform(smoothProgress, [0, 0.7], ["0%", "-110%"]);
  const rightX = useTransform(smoothProgress, [0, 0.7], ["0%", "110%"]);
  const opacity = useTransform(smoothProgress, [0.6, 0.9], [1, 0]);

  // Jagged Edge Paths
  const leftJagged = "polygon(0% 0%, 50.1% 0%, 48% 15%, 52% 35%, 48% 55%, 52% 75%, 48% 90%, 50.1% 100%, 0% 100%)";
  const rightJagged = "polygon(49.9% 0%, 100% 0%, 100% 100%, 49.9% 100%, 48% 90%, 52% 75%, 48% 55%, 52% 35%, 48% 15%)";

  return (
    <div ref={containerRef} className="relative h-[200vh] z-20">
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
        
        <div className="absolute inset-0 z-20 pointer-events-none flex">
          {/* Left Paper Half */}
          <motion.div 
            style={{ 
              x: leftX,
              opacity,
              clipPath: leftJagged,
            }}
            className="absolute inset-0 w-full h-full pointer-events-auto bg-white dark:bg-[#050505]"
          >
            <div className="w-full h-full shadow-[20px_0_50px_rgba(0,0,0,0.1)] overflow-hidden">
              <Hero onContact={onContact} isInsideTear={true} />
            </div>
          </motion.div>

          {/* Right Paper Half */}
          <motion.div 
            style={{ 
              x: rightX,
              opacity,
              clipPath: rightJagged,
            }}
            className="absolute inset-0 w-full h-full pointer-events-auto bg-white dark:bg-[#050505]"
          >
            <div className="w-full h-full shadow-[-20px_0_50px_rgba(0,0,0,0.1)] overflow-hidden">
              <Hero onContact={onContact} isInsideTear={true} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TearSection;
