
import React from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Sparkles, ArrowRight } from 'lucide-react';

interface ContactStripProps {
  onContact: () => void;
}

const ContactStrip: React.FC<ContactStripProps> = ({ onContact }) => {
  return (
    <section className="py-32 md:py-48 px-6 bg-brandSurface-light dark:bg-brandSurface-dark overflow-hidden relative transition-colors duration-1000">
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      
      <div className="max-w-[85rem] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/5 rounded-[4rem] p-10 md:p-24 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.05)] dark:shadow-[0_50px_100px_rgba(124,58,237,0.05)]"
        >
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <div className="space-y-10 text-left">
              <div className="flex items-center gap-4">
                 <div className="w-2.5 h-2.5 rounded-full bg-brandPrimary animate-ping" />
                 <span className="text-brandPrimary text-[11px] font-black uppercase tracking-[0.6em]">System Termination // 05</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-display font-black text-black dark:text-white uppercase tracking-tighter leading-[0.85]">
                Ready to <br/>
                <span className="text-brandPrimary italic font-serif lowercase font-normal">Engage?</span>
              </h2>
              <p className="text-black/50 dark:text-white/40 text-lg md:text-2xl font-light leading-relaxed max-w-lg">
                Your vision, our architecture. Let's initiate the protocol for your digital legacy today.
              </p>
            </div>

            <div className="flex flex-col gap-6">
               <motion.button
                 onClick={onContact}
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="group w-full p-8 rounded-[3rem] bg-brandPrimary text-white flex items-center justify-between shadow-2xl shadow-brandPrimary/30 transition-all overflow-hidden relative"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                 <div className="flex items-center gap-6 relative z-10">
                   <div className="w-16 h-16 rounded-[2rem] bg-white/20 flex items-center justify-center backdrop-blur-md">
                     <Terminal size={28} />
                   </div>
                   <div className="text-left">
                     <div className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-70">Project Protocol</div>
                     <div className="text-xl md:text-2xl font-black uppercase tracking-tight">Initiate Inquiry</div>
                   </div>
                 </div>
                 <ArrowRight size={32} className="relative z-10 group-hover:translate-x-3 transition-transform duration-500" />
               </motion.button>

               <div className="grid grid-cols-2 gap-6">
                 <div className="p-10 rounded-[3rem] bg-brandSurface-light dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex flex-col gap-6 group hover:border-brandPrimary/40 transition-all shadow-lg">
                    <Sparkles size={24} className="text-brandPrimary" />
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">Studio Node</div>
                    <div className="text-sm font-black uppercase tracking-widest text-black dark:text-white">Active Now</div>
                 </div>
                 <div className="p-10 rounded-[3rem] bg-brandSurface-light dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex flex-col gap-6 group hover:border-brandPrimary/40 transition-all shadow-lg">
                    <Send size={24} className="text-brandPrimary" />
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">Global Delivery</div>
                    <div className="text-sm font-black uppercase tracking-widest text-black dark:text-white">High Speed</div>
                 </div>
               </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactStrip;
