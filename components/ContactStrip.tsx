
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, ArrowRight } from 'lucide-react';

interface ContactStripProps {
  onContact: () => void;
}

const ContactStrip: React.FC<ContactStripProps> = ({ onContact }) => {
  return (
    <section className="py-24 px-6 bg-[#0A0514] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-[95rem] mx-auto rounded-[4rem] bg-brandPrimary overflow-hidden relative shadow-[0_20px_80px_rgba(124,58,237,0.3)]"
      >
        {/* Animated Abstract Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 -translate-y-1/2 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">Final Protocol // 05</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter leading-tight">
              Ready to engineer your <span className="italic font-serif font-normal lowercase">evolution?</span>
            </h2>
            <p className="text-white/80 text-lg font-light leading-relaxed max-w-2xl">
              From conceptual design to high-performance code, we translate your abstract vision into global digital standards. Let's start the transformation.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#7C3AED' }}
              whileTap={{ scale: 0.95 }}
              onClick={onContact}
              className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-full flex items-center gap-4 font-black text-xs uppercase tracking-widest transition-all shadow-2xl"
            >
              <Phone size={18} />
              Contact Strategy
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white px-10 py-5 rounded-full flex items-center gap-4 font-black text-xs uppercase tracking-widest shadow-2xl transition-all"
            >
              <Calendar size={18} />
              Book Roadmap Session
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactStrip;
