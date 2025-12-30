
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Send, CheckCircle, Loader2, Mail, MapPin, ArrowLeft, MessageCircle, ArrowRight, Instagram, Linkedin, Globe, Zap, ShieldCheck, Clock, Shield } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface ContactPageProps {
  onBack: () => void;
}

const Counter = ({ value, duration = 2, delay = 0 }: { value: string; duration?: number; delay?: number }) => {
  const count = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState("0");
  
  // Extract number and suffix (e.g., "100" and "%" from "100%")
  const numberMatch = value.match(/(\d+(\.\d+)?)/);
  const targetNumber = numberMatch ? parseFloat(numberMatch[0]) : 0;
  const suffix = value.replace(numberMatch ? numberMatch[0] : "", "");
  const prefix = value.startsWith(suffix) && suffix !== "" ? suffix : "";
  const actualSuffix = prefix ? "" : suffix;

  useEffect(() => {
    if (!numberMatch) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(count, targetNumber, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (targetNumber % 1 === 0) {
          setDisplayValue(Math.floor(latest).toString());
        } else {
          setDisplayValue(latest.toFixed(1));
        }
      }
    });

    return () => controls.stop();
  }, [targetNumber, duration, delay, value]);

  return (
    <span>
      {prefix}{displayValue}{actualSuffix}
    </span>
  );
};

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 2000);
  };

  const stats = [
    { label: "Active Nodes", val: "24/7" },
    { label: "Completion Rate", val: "100%" },
    { label: "Global Reach", val: "Wide" },
    { label: "Trust Score", val: "A+" }
  ];

  return (
    <div className="min-h-screen bg-brandSurface-light dark:bg-brandSurface-dark text-black dark:text-white transition-colors duration-1000 pt-24 pb-12 overflow-x-hidden">
      
      {/* Subtle Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-1/4 right-0 w-[40vw] h-[40vh] bg-brandPrimary/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[85rem] mx-auto px-6 md:px-12">
        
        {/* Compact Header Area */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <motion.button 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onBack}
              className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-brandPrimary hover:gap-4 transition-all mb-2"
            >
              <ArrowLeft size={10} />
              Return
            </motion.button>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brandPrimary animate-pulse" />
              <span className="text-[8px] font-mono font-black uppercase tracking-[0.4em] opacity-40">Portal // Active</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter leading-none">
              Inquiry <span className="text-brandPrimary italic font-serif lowercase font-normal">Node</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
             <div className="px-4 py-2 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center gap-3">
               <Clock size={12} className="text-brandPrimary" />
               <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Avg Response: 4h</span>
             </div>
             <div className="px-4 py-2 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center gap-3">
               <Shield size={12} className="text-brandPrimary" />
               <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Secure SSL</span>
             </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Widgets Grid - Small Modular Pieces */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Map Mini-Widget */}
            <div className="relative h-48 rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/5 shadow-lg group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15797.90483864195!2d77.38799445!3d8.18193005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f128be7c0c1b%3A0xc6c7d7e35496417b!2sChunkankadai%2C%20Nagercoil%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716382900000!5m2!1sen!2sin" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" 
                className="grayscale-[1] group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <MapPin size={12} className="text-brandPrimary" />
                <span className="text-[8px] font-black uppercase tracking-widest text-white/80">Tamil Nadu, IN</span>
              </div>
            </div>

            {/* Direct Channel Pills */}
            <div className="grid grid-cols-1 gap-3">
              {[
                { icon: <Mail size={16} />, label: "Email", val: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
                { icon: <MessageCircle size={16} />, label: "WhatsApp", val: CONTACT_INFO.phone, href: `https://wa.me/${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}` }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  whileHover={{ y: -2 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/10 group transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brandPrimary/10 text-brandPrimary flex items-center justify-center group-hover:bg-brandPrimary group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[7px] font-mono text-black/30 dark:text-white/20 uppercase tracking-widest">{item.label}</div>
                      <div className="text-[11px] font-bold">{item.val}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>

            {/* Verification Widget */}
            <div className="p-5 rounded-[2rem] bg-brandPrimary/[0.03] border border-brandPrimary/10 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-brandPrimary" />
                <span className="text-[9px] font-black uppercase tracking-widest text-brandPrimary">Privacy Protocol</span>
              </div>
              <p className="text-[10px] text-black/40 dark:text-white/30 leading-relaxed font-light">
                Secure end-to-end encryption for all inquiries. Data is processed via secure studio gateway.
              </p>
            </div>
          </div>

          {/* Form Module - Primary Interaction */}
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#0A0A0A] h-full p-8 md:p-12 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-xl relative overflow-hidden"
            >
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <div className="w-20 h-20 rounded-full bg-brandPrimary text-white flex items-center justify-center shadow-xl animate-bounce">
                    <CheckCircle size={32} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-display font-bold uppercase tracking-tighter">Transmission Sent</h2>
                    <p className="text-[9px] text-black/40 dark:text-white/30 uppercase tracking-[0.3em]">We will initiate contact shortly.</p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="text-brandPrimary text-[9px] font-black uppercase tracking-widest hover:underline">New Brief</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[8px] font-black uppercase tracking-widest opacity-30">Client Name</label>
                      <input required className="w-full bg-transparent border-b border-black/10 dark:border-white/10 pb-2 outline-none focus:border-brandPrimary transition-all text-base font-medium" placeholder="Ex: John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-black uppercase tracking-widest opacity-30">Email Address</label>
                      <input required type="email" className="w-full bg-transparent border-b border-black/10 dark:border-white/10 pb-2 outline-none focus:border-brandPrimary transition-all text-base font-medium" placeholder="hello@company.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-widest opacity-30">Mission Category</label>
                    <select className="w-full bg-transparent border-b border-black/10 dark:border-white/10 pb-2 outline-none focus:border-brandPrimary transition-all text-sm font-bold cursor-pointer appearance-none">
                      <option className="bg-white dark:bg-black">Web Engineering</option>
                      <option className="bg-white dark:bg-black">Brand Identity</option>
                      <option className="bg-white dark:bg-black">Motion Post-Production</option>
                      <option className="bg-white dark:bg-black">Full Digital Package</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[8px] font-black uppercase tracking-widest opacity-30">Project Brief</label>
                    <textarea required rows={3} className="w-full bg-transparent border-b border-black/10 dark:border-white/10 pb-2 outline-none focus:border-brandPrimary transition-all text-sm font-light resize-none leading-relaxed" placeholder="Describe the goal..." />
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-6 bg-black dark:bg-brandPrimary text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 group shadow-lg"
                    >
                      {status === 'submitting' ? <Loader2 className="animate-spin" size={16} /> : (
                        <>
                          Initiate <Zap size={14} className="group-hover:scale-110 transition-transform" />
                        </>
                      )}
                    </button>
                    <div className="flex justify-center mt-6">
                      <div className="flex items-center gap-4 text-[7px] font-mono opacity-20 uppercase tracking-[0.5em]">
                        <span>End-to-End Encryption</span>
                        <div className="w-1 h-1 rounded-full bg-brandPrimary" />
                        <span>AG.CREATORZ Gateway</span>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom Trust Row - Compact Counters */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
           {stats.map((stat, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 + i * 0.1 }}
               className="py-4 px-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 text-center"
             >
               <div className="text-xs font-display font-black text-brandPrimary mb-0.5">
                 <Counter value={stat.val} delay={0.6 + i * 0.1} />
               </div>
               <div className="text-[7px] font-mono uppercase tracking-widest opacity-30">{stat.label}</div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
