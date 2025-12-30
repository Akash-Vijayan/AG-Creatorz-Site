
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Target, ShieldCheck, Activity, Layers, Zap, CheckCircle2, Plus, Minus, Info, Globe, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-brandSurface-light dark:bg-brandSurface-dark text-black dark:text-white transition-colors duration-1000 overflow-x-hidden">
      
      {/* Dynamic Background Auras */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-brandPrimary/5 dark:bg-brandPrimary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-blue-500/5 dark:bg-brandPrimary/5 blur-[150px] rounded-full" />
      </div>

      {/* 1. Cinematic Header */}
      <section className="pt-40 pb-24 px-6 md:px-12 max-w-[90rem] mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-3 text-brandPrimary font-black uppercase tracking-[0.4em] text-[10px] mb-16 hover:gap-6 transition-all group"
        >
          <ArrowLeft size={16} />
          <span>Exit Protocol</span>
        </motion.button>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-brandPrimary" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.6em] text-black/40 dark:text-white/30">Registry Entry // 01</span>
          </div>
          <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-display font-bold uppercase tracking-tighter leading-[0.8] text-black dark:text-white">
            DIGITAL <br/><span className="text-brandPrimary italic font-serif lowercase font-normal">alchemy</span>
          </h1>
          <div className="max-w-3xl pt-10">
            <p className="text-xl md:text-2xl text-black/50 dark:text-white/40 leading-relaxed font-light">
              AG Creatorz is a premium digital engineering practice specialized in translating complex visions into <span className="text-black dark:text-white font-bold">high-conversion digital artifacts</span>. We operate at the intersection of structure and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Full Width - Origins Narrative */}
      <section className="py-32 px-6 md:px-12 border-y border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="max-w-[85rem] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4">
              <div className="sticky top-40 space-y-6">
                <Activity size={32} className="text-brandPrimary" />
                <h2 className="text-4xl font-display font-bold uppercase tracking-tighter">Origins & <br/><span className="text-brandPrimary">Progress</span></h2>
                <div className="w-16 h-1 bg-brandPrimary rounded-full" />
              </div>
            </div>
            <div className="lg:col-span-8 space-y-10">
              <p className="text-2xl md:text-3xl font-light text-black/70 dark:text-white/60 leading-tight">
                Established with a clear directive: To provide <span className="text-brandPrimary font-bold">dependable</span>, high-quality digital services without the friction of traditional agency overhead.
              </p>
              <p className="text-lg text-black/50 dark:text-white/40 leading-relaxed font-light">
                Over the years, our approach has matured into a disciplined methodology that favors long-term client partnerships over quick transactions. We treat every project as a piece of digital architecture—requiring a strong foundation, optimized performance, and a visually arresting facade.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-10 pt-12">
                {[
                  { label: "Stability", val: "99.9%" },
                  { label: "Precision", val: "Pixel" },
                  { label: "Delivery", val: "Elite" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-4xl font-display font-black text-brandPrimary">{stat.val}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest opacity-40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Immersive Statement - Full Screen Width */}
      <section className="relative w-full py-40 bg-brandPrimary text-white overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-[85rem] mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-12">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
            >
              <Target size={32} />
            </motion.div>
            <div className="space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.8em] opacity-60">Mission Statement</h2>
              <p className="text-4xl md:text-7xl font-display font-bold leading-[0.9] tracking-tighter uppercase max-w-5xl">
                To position AG Creatorz as a respected <span className="italic font-serif lowercase font-normal opacity-80">digital brand</span> recognized for precision and modern execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Operating Intent - The Grid Refined */}
      <section className="py-40 px-6 md:px-12 max-w-[85rem] mx-auto">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-5xl font-display font-bold uppercase tracking-tighter leading-none">Operating <br/><span className="text-brandPrimary">Intent</span></h2>
            <p className="text-xl text-black/50 dark:text-white/40 font-light leading-relaxed">
              Our core values are encoded into every line of code we write and every frame we edit.
            </p>
            <div className="pt-10">
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-black/[0.03] dark:bg-white/[0.05] rounded-full border border-black/5 dark:border-white/10">
                 <ShieldCheck size={16} className="text-brandPrimary" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Protocol Verified</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 grid gap-4">
            {operatingIntent.map((intent, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 p-8 rounded-[2rem] bg-brandCard-light dark:bg-brandCard-dark border border-black/5 dark:border-white/5 hover:border-brandPrimary/30 transition-all group shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-brandPrimary/5 text-brandPrimary flex items-center justify-center shrink-0 group-hover:bg-brandPrimary group-hover:text-white transition-all">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-lg md:text-xl font-bold text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors">
                  {intent}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Professional Standards Grid */}
      <section className="py-40 px-6 md:px-12 bg-black/[0.02] dark:bg-white/[0.01] border-t border-black/5 dark:border-white/5">
        <div className="max-w-[90rem] mx-auto">
          <div className="text-center mb-24 space-y-4">
             <div className="inline-block p-4 rounded-3xl bg-brandPrimary/10 text-brandPrimary mb-4">
               <Layers size={24} />
             </div>
             <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter">Professional <span className="text-brandPrimary italic font-serif lowercase font-normal">Standards</span></h2>
             <p className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-40">System Architecture v2.8</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionalStandards.map((std, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 rounded-[3.5rem] bg-brandCard-light dark:bg-brandCard-dark border border-black/5 dark:border-white/5 flex flex-col gap-8 group hover:border-brandPrimary transition-all duration-700 shadow-xl"
              >
                <div className="w-14 h-14 rounded-2xl bg-brandPrimary/5 text-brandPrimary flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white transition-all duration-500 shadow-md">
                  <Zap size={24} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-black dark:text-white">{std.title}</h3>
                  <p className="text-base text-black/50 dark:text-white/30 font-light leading-relaxed italic">
                    {std.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ - Clean & Centered */}
      <section className="py-40 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center space-y-8 mb-20">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-brandPrimary/5 border border-brandPrimary/10 flex items-center justify-center text-brandPrimary">
              <Info size={28} />
            </div>
          </div>
          <h2 className="text-5xl font-display font-bold uppercase tracking-tighter">Information Hub</h2>
          <div className="w-20 h-1 bg-brandPrimary mx-auto rounded-full" />
        </div>
        
        <div className="space-y-4">
          {faqData.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="rounded-[2rem] border border-black/5 dark:border-white/5 bg-brandCard-light dark:bg-brandCard-dark overflow-hidden transition-all hover:border-brandPrimary/20">
                 <button 
                   onClick={() => setOpenFaq(isOpen ? null : i)}
                   className="w-full p-8 flex items-center justify-between text-left group"
                 >
                   <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-brandPrimary' : 'text-black/60 dark:text-white/40'}`}>
                     {item.q}
                   </span>
                   <div className={`w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center transition-all ${isOpen ? 'rotate-180 bg-brandPrimary text-white shadow-lg' : 'text-black/20 dark:text-white/20'}`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                   </div>
                 </button>
                 <AnimatePresence>
                   {isOpen && (
                     <motion.div
                       initial={{ height: 0, opacity: 0 }}
                       animate={{ height: 'auto', opacity: 1 }}
                       exit={{ height: 0, opacity: 0 }}
                       className="px-8 pb-8"
                     >
                       <p className="text-lg text-black/40 dark:text-white/30 leading-relaxed font-light border-l border-brandPrimary/20 pl-6">
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
  );
};

export default AboutPage;
