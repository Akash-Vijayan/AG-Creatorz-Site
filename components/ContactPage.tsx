
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, Mail, Phone, MapPin, ArrowLeft, MessageSquare, Globe, Target } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-32 pb-20 relative transition-colors duration-1000">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brandPrimary/30 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 blur-[200px] rounded-full" />
      </div>

      <div className="max-w-[95rem] mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          
          {/* Left Column: Info */}
          <div className="space-y-16">
            <div className="space-y-6">
              <span className="text-brandPrimary font-black uppercase tracking-[0.8em] text-[10px]">Transmission Hub</span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.85] text-black dark:text-white">
                LET'S <span className="text-brandPrimary italic font-serif lowercase font-normal">connect</span>
              </h1>
              <p className="text-xl text-black/50 dark:text-white/40 max-w-lg leading-relaxed font-light">
                Have a vision that needs engineering? We're ready to translate your abstract ideas into high-performance digital reality.
              </p>
            </div>

            <div className="grid gap-10">
              {[
                { icon: <Mail />, label: "Email Address", val: "hello@agcreators.com" },
                { icon: <Phone />, label: "Direct Line", val: "+91 89035 74460" },
                { icon: <MapPin />, label: "Studio HQ", val: "Tamil Nadu, India" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/10 flex items-center justify-center text-brandPrimary group-hover:bg-brandPrimary group-hover:text-white transition-all shadow-xl">
                    {item.icon}
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-mono text-black/30 dark:text-white/20 uppercase tracking-widest">{item.label}</span>
                    <div className="text-xl font-bold">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10 border-t border-black/5 dark:border-white/10 flex gap-6">
               <span className="text-[10px] font-mono text-black/30 dark:text-white/20 uppercase tracking-widest">Connect:</span>
               {['Instagram', 'Linkedin', 'Behance'].map(social => (
                 <a key={social} href="#" className="text-xs font-black uppercase tracking-widest hover:text-brandPrimary transition-colors">{social}</a>
               ))}
            </div>
          </div>

          {/* Right Column: Detailed Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/[0.02] dark:bg-white/[0.02] p-10 md:p-16 rounded-[3rem] border border-black/5 dark:border-white/10 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-24 h-24 rounded-full bg-brandPrimary text-white flex items-center justify-center mb-8 shadow-2xl shadow-brandPrimary/40">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-display font-bold uppercase tracking-tighter mb-4">Transmission Successful</h3>
                <p className="text-black/50 dark:text-white/40 mb-10 max-w-xs">We've received your request. Our strategy team will reach out within 24 hours.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-brandPrimary font-bold hover:underline uppercase text-xs tracking-widest"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/30">Client Name</label>
                    <input required className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 outline-none focus:border-brandPrimary transition-colors" placeholder="Full name" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/30">Email Address</label>
                    <input required type="email" className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 outline-none focus:border-brandPrimary transition-colors" placeholder="email@company.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/30">Phone Number</label>
                    <input className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 outline-none focus:border-brandPrimary transition-colors" placeholder="+91" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/30">Service Category</label>
                    <select className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 outline-none focus:border-brandPrimary transition-colors cursor-pointer appearance-none">
                      <option className="bg-white dark:bg-black">Web Engineering</option>
                      <option className="bg-white dark:bg-black">Visual Identity</option>
                      <option className="bg-white dark:bg-black">Video Post-Production</option>
                      <option className="bg-white dark:bg-black">Full Brand Audit</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/30">Project Description</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-3 outline-none focus:border-brandPrimary transition-colors resize-none" placeholder="Tell us about your goals..." />
                </div>

                <button 
                  disabled={status === 'submitting'}
                  className="w-full py-6 bg-black dark:bg-brandPrimary text-white rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-4 shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  {status === 'submitting' ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Initiate Strategy</>}
                </button>

                <p className="text-[9px] text-center text-black/20 dark:text-white/20 uppercase tracking-[0.2em]">
                  By initiating, you agree to our privacy protocols.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
