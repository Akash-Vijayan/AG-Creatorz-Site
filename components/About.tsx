
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Fingerprint, Zap, Target, Cpu } from 'lucide-react';
import { PROFILE_CONTENT } from '../constants';

const About: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="bg-white dark:bg-black text-black dark:text-white min-h-screen relative py-32 md:py-48 overflow-hidden transition-colors duration-1000"
    >
      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        <div className="flex flex-col mb-40 md:mb-56">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: "circOut" }}
          >
            <span className="text-brandPrimary dark:text-brandPrimary-light font-black uppercase tracking-[1em] text-[10px] mb-12 block">Company Profile // AG.C</span>
            <h2 className="text-[12vw] sm:text-[10vw] md:text-[8rem] font-display font-bold leading-[0.8] tracking-tighter uppercase mb-20">
              <span className="block overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="block text-black dark:text-white"
                >
                  DIGITAL
                </motion.span>
              </span>
              <span className="block overflow-hidden -mt-4">
                <motion.span 
                   initial={{ y: "100%" }}
                   animate={isInView ? { y: 0 } : {}}
                   transition={{ duration: 1, delay: 0.4 }}
                   className="block italic font-serif font-normal text-brandPrimary dark:text-brandPrimary-light lowercase"
                >
                  alchemy.
                </motion.span>
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 mt-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="lg:col-start-6 lg:col-span-7"
            >
              <div className="space-y-8">
                <p className="text-xl md:text-3xl font-light text-black/70 dark:text-white/40 leading-tight border-l-2 border-brandPrimary pl-10">
                  <span className="text-black dark:text-white font-bold">AG Creatorz</span> is a creative powerhouse led by <span className="text-brandPrimary dark:text-brandPrimary-light font-medium">{PROFILE_CONTENT.name}</span>. We specialize in transforming abstract ideas into high-impact digital realities.
                </p>
                <p className="text-lg md:text-xl font-light text-black/50 dark:text-white/30 leading-relaxed max-w-2xl pl-10">
                  Our mission is to bridge the gap between technical complexity and creative storytelling. We don't just build websites or edit videos; we engineer experiences that capture attention and drive meaningful engagement.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              icon: <Cpu />, 
              title: "Tech-Forward", 
              desc: "We leverage the latest in web technologies to build lightning-fast, future-proof digital platforms for businesses and creators." 
            },
            { 
              icon: <Target />, 
              title: "Result Driven", 
              desc: "Every design choice and frame edit is calculated to serve your primary goal: growth and brand recognition." 
            },
            { 
              icon: <Fingerprint />, 
              title: "Bespoke Identity", 
              desc: "Generic is the enemy. We craft unique visual identities that ensure you stand out in an increasingly crowded digital landscape." 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 + (i * 0.1) }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[3rem] bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 backdrop-blur-3xl group transition-all duration-500 hover:border-brandPrimary/30"
            >
              <div className="w-12 h-12 rounded-2xl bg-brandPrimary/10 text-brandPrimary dark:text-brandPrimary-light flex items-center justify-center mb-10 transition-transform group-hover:scale-110">
                {/* Fix: Casting icon element to any to allow size prop in cloneElement */}
                {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24 })}
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 uppercase tracking-tighter text-black dark:text-white">{item.title}</h3>
              <p className="text-sm sm:text-base text-black/60 dark:text-white/40 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 pt-20 border-t border-black/5 dark:border-white/5 grid md:grid-cols-3 gap-12 text-center"
        >
          <div>
            <div className="text-5xl md:text-7xl font-display font-black text-brandPrimary dark:text-brandPrimary-light mb-2">50+</div>
            <div className="text-[10px] font-mono text-black/40 dark:text-white/20 uppercase tracking-[0.4em]">Projects Completed</div>
          </div>
          <div>
            <div className="text-5xl md:text-7xl font-display font-black text-brandPrimary dark:text-brandPrimary-light mb-2">₹1M+</div>
            <div className="text-[10px] font-mono text-black/40 dark:text-white/20 uppercase tracking-[0.4em]">Client Value Created</div>
          </div>
          <div>
            <div className="text-5xl md:text-7xl font-display font-black text-brandPrimary dark:text-brandPrimary-light mb-2">100%</div>
            <div className="text-[10px] font-mono text-black/40 dark:text-white/20 uppercase tracking-[0.4em]">Commitment Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
