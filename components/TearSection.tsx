
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
    stiffness: 35,
    damping: 25,
    restDelta: 0.001
  });

  // Tear Movement Logic - Pushes halves completely off screen
  const leftX = useTransform(smoothProgress, [0, 0.5], ["0%", "-100%"]);
  const rightX = useTransform(smoothProgress, [0, 0.5], ["0%", "100%"]);
  const leftRotate = useTransform(smoothProgress, [0, 0.5], [0, -10]);
  const rightRotate = useTransform(smoothProgress, [0, 0.5], [0, 10]);

  // Revealed Content Logic - Smooth scaling reveal
  const revealScale = useTransform(smoothProgress, [0.1, 0.6], [0.92, 1]);
  const revealOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);

  // Jagged Edge Paths
  const leftJagged = "polygon(0% 0%, 52% 0%, 48% 12%, 53% 25%, 47% 38%, 52% 52%, 48% 65%, 53% 78%, 47% 92%, 52% 100%, 0% 100%)";
  const rightJagged = "polygon(52% 0%, 100% 0%, 100% 100%, 52% 100%, 47% 92%, 53% 78%, 48% 65%, 52% 52%, 47% 38%, 53% 25%, 48% 12%)";

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#0A0514]">
      <div className="sticky top-0 h-screen w-full overflow-hidden perspective-[2000px]">
        
        {/* REVEALED CONTENT (SERVICES) - The underlying layer */}
        <motion.div 
          style={{ opacity: revealOpacity, scale: revealScale }}
          className="absolute inset-0 z-0 bg-[#0A0514]"
        >
          <Services onSelectService={onSelectService} />
        </motion.div>

        {/* TEARING TOP LAYER (HERO) - The top layer that splits */}
        <div className="absolute inset-0 z-20 pointer-events-none flex">
          {/* Left Paper Half */}
          <motion.div 
            style={{ 
              x: leftX,
              rotateZ: leftRotate,
              clipPath: leftJagged,
              originX: "0%",
              originY: "50%"
            }}
            className="absolute inset-0 w-full h-full pointer-events-auto bg-white"
          >
            <div className="w-full h-full shadow-[50px_0_100px_rgba(0,0,0,0.15)] overflow-hidden">
              <Hero onContact={onContact} />
            </div>
          </motion.div>

          {/* Right Paper Half */}
          <motion.div 
            style={{ 
              x: rightX,
              rotateZ: rightRotate,
              clipPath: rightJagged,
              originX: "100%",
              originY: "50%"
            }}
            className="absolute inset-0 w-full h-full pointer-events-auto bg-white"
          >
            <div className="w-full h-full shadow-[-50px_0_100px_rgba(0,0,0,0.15)] overflow-hidden">
              <Hero onContact={onContact} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TearSection;
