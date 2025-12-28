
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Target, ShieldCheck, Activity, Layers, Zap, CheckCircle2, Plus, Minus, Info } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const operatingIntent = [
    "Deliver professionally crafted digital solutions",
    "Maintain accuracy, consistency, and quality standards",
    "Communicate with clarity at every project stage",
    "Develop solutions aligned with practical business needs",
    "Support long-term digital growth for clients"
  ];

  const professionalStandards = [
    { title: "Accuracy", desc: "Work is executed with attention to structure and detail." },
    { title: "Accountability", desc: "Each project is handled with responsibility and ownership." },
    { title: "Clarity in Process", desc: "Workflows are transparent, structured, and predictable." },
    { title: "Sustainable Growth Focus", desc: "Solutions are designed with longevity in mind." },
    { title: "Client Alignment", desc: "Every decision supports client objectives." },
    { title: "Execution Excellence", desc: "High standards guide every deliverable." }
  ];

  const faqData = [
    { q: "How long does a project typically take?", a: "Timelines are defined based on scope and confirmed before project initiation." },
    { q: "How are changes handled?", a: "Revisions are managed through an organized review process to ensure alignment." },
    { q: "Is support available after delivery?", a: "Ongoing support can be arranged based on project needs." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-black dark:text-white pt-32 pb-24 transition-colors duration-1000 overflow-x-hidden relative">
      
      {/* Structural Background Pattern - Neat grid */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="max-w-[85rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* 1. Digital Foundation */}
        <section className="mb-40 grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-brandPrimary animate-pulse" />
              <span className="text-[9px] font-mono font-black uppercase tracking-[0.5em] text-black/40 dark:text-white/20">Protocol Archive // 01</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none">
              Digital <br/><span className="text-brandPrimary italic font-serif lowercase font-normal">Foundation</span>
            </h1>
          </div>
          <div className="lg:col-span-7 pt-4">
            <p className="text-lg md:text-xl text-black/50 dark:text-white/30 leading-relaxed font-light border-l border-brandPrimary/20 pl-10">
              AG Creatorz operates as a freelance digital creative practice delivering structured and refined digital solutions. The work spans web development, graphic design, and video editing—focused on building clarity, credibility, and consistency across digital touchpoints.
              <br/><br/>
              <span className="text-black dark:text-white font-medium">Each project is guided by thoughtful planning and precise execution to ensure results that are both functional and visually compelling.</span>
            </p>
          </div>
        </section>

        {/* 2. Origins & Progress */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-40 relative"
        >
          <div className="grid lg:grid-cols-2 gap-px bg-black/5 dark:bg-white/5 rounded-[3rem] overflow-hidden border border-black/5 dark:border-white/5">
            <div className="bg-white dark:bg-[#080808] p-12 md:p-16 space-y-8">
              <div className="w-12 h-12 rounded-2xl bg-brandPrimary/5 text-brandPrimary flex items-center justify-center">
                <Activity size={24} />
              </div>
              <h2 className="text-3xl font-display font-bold uppercase tracking-tight">Origins & Progress</h2>
              <p className="text-base text-black/40 dark:text-white/20 leading-relaxed font-light">
                AG Creatorz was established with a clear intention: to provide dependable, high-quality digital services without unnecessary complexity. Over time, this approach has shaped long-term client relationships built on trust, transparency, and consistent delivery.
              </p>
              <div className="h-px w-20 bg-brandPrimary/20" />
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-brandPrimary font-bold">
                Engagement reflects a commitment to detail and discipline.
              </p>
            </div>
            <div className="bg-brandPrimary p-12 md:p-16 flex flex-col justify-center text-white relative">
               <div className="relative z-10 space-y-6">
                 <Layers size={40} className="opacity-40" />
                 <h3 className="text-2xl font-display font-bold uppercase tracking-widest leading-tight">Strategic Outlook</h3>
                 <p className="text-xl font-light text-white/90 italic leading-relaxed">
                   "To position AG Creatorz as a respected freelance digital brand recognized for precision, reliability, and modern digital execution."
                 </p>
               </div>
            </div>
          </div>
        </motion.section>

        {/* 4. Operating Intent */}
        <section className="mb-40 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
             <div className="sticky top-32 space-y-6">
                <Target size={32} className="text-brandPrimary" />
                <h2 className="text-4xl font-display font-bold uppercase tracking-tighter">Operating <br/><span className="text-brandPrimary">Intent</span></h2>
                <p className="text-black/30 dark:text-white/10 text-[9px] font-mono uppercase tracking-widest">Protocol v2.5 // Clean-State</p>
             </div>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {operatingIntent.map((intent, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 p-6 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] border border-black/5 dark:border-white/5 hover:border-brandPrimary/30 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-brandPrimary/5 text-brandPrimary flex items-center justify-center shrink-0 group-hover:bg-brandPrimary group-hover:text-white transition-all">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-lg font-medium text-black/60 dark:text-white/60">{intent}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Professional Standards */}
        <section className="mb-40">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-b border-black/5 dark:border-white/5 pb-10">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter">Professional <br/><span className="text-brandPrimary italic font-serif lowercase font-normal">Standards</span></h2>
            <div className="flex items-center gap-3 text-[9px] font-mono text-black/20 dark:text-white/10 uppercase tracking-[0.4em]">
              <ShieldCheck size={14} className="text-brandPrimary" />
              Verified Performance Criteria
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionalStandards.map((std, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-10 rounded-[2rem] bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex flex-col gap-6 group hover:border-brandPrimary transition-all duration-500"
              >
                <div className="w-10 h-10 rounded-xl bg-brandPrimary/5 text-brandPrimary flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white transition-all">
                  <Zap size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold uppercase tracking-tight mb-3 text-black dark:text-white transition-colors">{std.title}</h3>
                  <p className="text-xs text-black/40 dark:text-white/20 font-light leading-relaxed">
                    {std.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. Information & Support */}
        <section className="max-w-3xl mx-auto">
          <div className="text-center space-y-6 mb-20">
            <Info size={32} className="text-brandPrimary mx-auto" />
            <h2 className="text-4xl font-display font-bold uppercase tracking-tighter">Information & Support</h2>
            <p className="text-black/30 dark:text-white/10 text-[9px] font-mono uppercase tracking-[0.4em]">Engagement FAQ</p>
          </div>
          
          <div className="space-y-4">
            {faqData.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="rounded-2xl border border-black/5 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] overflow-hidden">
                   <button 
                     onClick={() => setOpenFaq(isOpen ? null : i)}
                     className="w-full p-6 flex items-center justify-between text-left group"
                   >
                     <span className={`text-base font-bold transition-colors ${isOpen ? 'text-brandPrimary' : 'text-black/50 dark:text-white/40'}`}>
                       {item.q}
                     </span>
                     <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-brandPrimary' : 'text-black/20'}`}>
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                     </div>
                   </button>
                   <AnimatePresence>
                     {isOpen && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: 'auto', opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="px-6 pb-6"
                       >
                         <p className="text-sm text-black/40 dark:text-white/30 leading-relaxed font-light">
                           {item.a}
                         </p>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
