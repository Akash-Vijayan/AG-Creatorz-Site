
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Service } from '../types';
import { ArrowLeft, CheckCircle, Package, ArrowRight, DollarSign } from 'lucide-react';

interface ServiceDetailProps {
  service: Service | null;
  onBack: () => void;
  onContact: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack, onContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Move the early return check after all hooks are initialized to maintain hook order consistency
  if (!service || !service.details) return null;

  return (
    <div ref={containerRef} className="bg-white dark:bg-black min-h-screen relative z-40 overflow-hidden transition-colors duration-1000">
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-24 overflow-hidden">
        <motion.div 
           style={{ y: heroY, opacity: heroOpacity }}
           className="max-w-[90rem] mx-auto px-6 relative z-10 w-full"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-5xl"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
               <span className="px-4 py-1.5 rounded-full bg-brandPrimary/10 text-brandPrimary dark:text-brandPrimary-light font-black uppercase tracking-[0.3em] text-[10px] border border-brandPrimary/20 backdrop-blur-md">
                 {service.title}
               </span>
               <div className="w-12 h-px bg-brandPrimary/30" />
               <span className="text-black/40 dark:text-white/30 text-[10px] font-mono font-bold uppercase tracking-widest">Premium Capability Archive</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-black dark:text-white mb-10 leading-[0.9] tracking-tight uppercase">
              {service.details.headline}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-black/60 dark:text-white/40 max-w-2xl mb-12 leading-relaxed font-light border-l-4 border-brandPrimary pl-6 italic">
              {service.details.subhead}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
              <button
                onClick={onContact}
                className="px-12 py-5 bg-black dark:bg-white text-white dark:text-black rounded-full font-black uppercase tracking-[0.2em] text-[12px] shadow-2xl hover:bg-brandPrimary dark:hover:bg-brandPrimary dark:hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-4 group"
              >
                Start Conversation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features & Why Us */}
      <section className="py-32 relative z-20 border-t border-black/5 dark:border-white/5">
        <div className="max-w-[90rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl sm:text-6xl font-display font-bold text-black dark:text-white mb-10 uppercase tracking-tighter">
                Strategic <span className="text-brandPrimary italic font-serif lowercase font-normal">Execution</span> excellence.
              </h2>
              <div className="space-y-4">
                {service.details.whyChooseUs?.map((reason, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 p-6 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-transparent hover:border-brandPrimary/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brandPrimary/10 flex items-center justify-center text-brandPrimary transition-transform group-hover:scale-110">
                      <CheckCircle size={22} />
                    </div>
                    <span className="text-xl font-medium text-black/80 dark:text-white/80">{reason}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
               {service.details.features.map((feature, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="p-8 rounded-[2.5rem] bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex flex-col justify-between group hover:border-brandPrimary transition-all backdrop-blur-3xl"
                 >
                   <div className="w-14 h-14 rounded-2xl bg-white dark:bg-black shadow-xl flex items-center justify-center text-brandPrimary mb-6 group-hover:bg-brandPrimary group-hover:text-white transition-all">
                     <Package size={24} />
                   </div>
                   <h3 className="text-xl font-display font-bold text-black dark:text-white uppercase tracking-tighter">{feature}</h3>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Plan Selection */}
      {service.details.pricingPlans ? (
        <section className="py-32 bg-black dark:bg-black/80 text-white relative overflow-hidden">
          <div className="max-w-[90rem] mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-20 uppercase tracking-tighter">Engagement Tiers</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.details.pricingPlans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 hover:border-brandPrimary/50 transition-all duration-500 flex flex-col group text-left"
                >
                  <h3 className="text-xl font-display font-bold text-brandPrimary-light mb-6 flex items-center gap-3">
                    <DollarSign size={18} />
                    {plan.name}
                  </h3>
                  <div className="text-4xl font-display font-bold text-white mb-8 pb-8 border-b border-white/10">{plan.price}</div>
                  <button onClick={onContact} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brandPrimary hover:text-white transition-all">Select Tier</button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default ServiceDetail;
