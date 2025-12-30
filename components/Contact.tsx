
import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, Instagram, Mail, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contact" className="py-32 bg-white dark:bg-black text-black dark:text-white transition-colors duration-1000">
      <div className="max-w-[90rem] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-bold mb-8 tracking-tighter leading-[0.85] uppercase">
              Let's <span className="italic font-serif font-normal text-brandPrimary lowercase">work</span> together
            </h2>
            <div className="space-y-8 mt-16">
              {[
                { icon: <Mail size={24} />, text: CONTACT_INFO.email, sub: null },
                { icon: <Instagram size={24} />, text: "@ag.creators", sub: null },
                { icon: <MessageCircle size={24} />, text: CONTACT_INFO.phone, sub: CONTACT_INFO.phoneNote }
              ].map((link, i) => (
                <div key={i} className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-brandPrimary group-hover:bg-brandPrimary group-hover:text-white transition-all">
                    {link.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-xl break-all">{link.text}</span>
                    {link.sub && <span className="text-[10px] font-mono text-brandPrimary uppercase tracking-widest">{link.sub}</span>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="bg-black/[0.02] dark:bg-white/[0.02] p-14 rounded-[3rem] border border-black/5 dark:border-white/5 backdrop-blur-xl">
            {status === 'success' ? (
              <div className="text-center py-20">
                <CheckCircle size={60} className="mx-auto text-brandPrimary mb-8" />
                <h3 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Received</h3>
                <button onClick={() => setStatus('idle')} className="text-brandPrimary font-bold hover:underline">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-black/30 dark:text-white/30 mb-4">Name</label>
                  <input required className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-brandPrimary transition-colors text-xl" />
                </div>
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-black/30 dark:text-white/30 mb-4">Email</label>
                  <input required type="email" className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-brandPrimary transition-colors text-xl" />
                </div>
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-black/30 dark:text-white/30 mb-4">Message</label>
                  <textarea rows={3} className="w-full bg-transparent border-b border-black/10 dark:border-white/10 py-4 outline-none focus:border-brandPrimary transition-colors text-xl resize-none" />
                </div>
                <button className="w-full py-6 bg-black dark:bg-brandPrimary text-white dark:text-white font-black uppercase tracking-widest text-[11px] rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02] transition-transform">
                  {status === 'submitting' ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Send Transmission</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
