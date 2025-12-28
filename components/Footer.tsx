
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin, Send, ArrowUp, MessageSquare, ExternalLink } from 'lucide-react';
import { SERVICES, LOGO_PATH } from '../constants';

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer: React.FC = () => {
  const tickerItems = [...SERVICES.map(s => s.title), "UI/UX Design", "Graphic Design", "Video Editing", "IT Consultation"];
  
  return (
    <footer className="relative bg-white dark:bg-[#020202] text-black dark:text-white pt-20 transition-colors duration-1000 overflow-hidden">
      
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Top Ticker */}
      <div className="relative py-4 border-y border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01] overflow-hidden whitespace-nowrap mb-24">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12"
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em]">{item}</span>
              <span className="text-brandPrimary text-lg">★</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-[95rem] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <img src={LOGO_PATH} alt="AG" className="h-12 w-auto dark:invert transition-transform hover:scale-110 duration-500" />
              <div className="flex flex-col">
                <h3 className="text-2xl font-display font-black tracking-tighter uppercase leading-none">
                  AG Creatorz<span className="text-brandPrimary">.</span>
                </h3>
              </div>
            </div>
            <p className="text-sm md:text-base text-black/50 dark:text-white/40 leading-relaxed font-light max-w-sm">
              AG Creatorz is a premium Digital Engineering Agency specializing in high-performance Web Platforms, bespoke UI/UX, and cinematic visual storytelling for brands aiming for the global stage.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Linkedin size={18} />, link: "#" },
                { icon: <Instagram size={18} />, link: "#" },
                { icon: <Facebook size={18} />, link: "#" },
                { icon: <XLogo />, link: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  whileHover={{ scale: 1.1, backgroundColor: '#7C3AED', color: '#fff' }}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 transition-all duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-brandPrimary">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Portfolio', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm text-black/40 dark:text-white/30 hover:text-brandPrimary dark:hover:text-white transition-all flex items-center gap-2 group">
                    {link} <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-brandPrimary">Legal</h4>
            <ul className="space-y-4">
              {['Privacy', 'Terms', 'Cookies', 'License'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-black/40 dark:text-white/30 hover:text-brandPrimary dark:hover:text-white transition-all flex items-center gap-2 group">
                    {link} <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-10">
            <div className="bg-black/5 dark:bg-white/[0.03] p-8 rounded-[2rem] border border-black/5 dark:border-white/5 relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-sm font-black uppercase tracking-widest mb-2">Subscribe to our Newsletter</h4>
                <p className="text-xs text-black/40 dark:text-white/20 mb-6">Stay updated with our latest digital strategies.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-brandPrimary transition-all"
                  />
                  <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brandPrimary hover:text-white transition-all">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-brandPrimary/5 blur-3xl group-hover:bg-brandPrimary/10 transition-all" />
            </div>

            <button className="flex items-center gap-4 px-8 py-4 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl border border-black/5 dark:border-white/5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brandPrimary hover:text-white transition-all group">
              Admin Login <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <Phone size={20} />, label: "+91 89035 74460", sub: "Call us anytime" },
            { icon: <Mail size={20} />, label: "hello@agcreators.com", sub: "Send a transmission" },
            { icon: <MapPin size={20} />, label: "Tamil Nadu, India", sub: "Global digital HQ" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6 p-8 rounded-3xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 transition-all hover:bg-brandPrimary/[0.02]">
              <div className="w-14 h-14 rounded-2xl bg-brandPrimary text-white flex items-center justify-center shadow-lg shadow-brandPrimary/20">
                {item.icon}
              </div>
              <div>
                <div className="text-sm font-black text-black dark:text-white mb-1">{item.label}</div>
                <div className="text-[10px] font-mono text-black/30 dark:text-white/20 uppercase tracking-widest">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-12 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-mono text-black/30 dark:text-white/20 uppercase tracking-[0.5em]">
            © 2025 AG Creatorz. All rights reserved.
          </div>
          <div className="flex gap-4">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-mono text-black/40 dark:text-white/30 uppercase tracking-widest">System Status: Operational</span>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">
        {/* WhatsApp */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-2xl relative group"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="absolute right-full mr-4 px-3 py-1 bg-white dark:bg-black rounded-lg text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl border border-black/5 dark:border-white/10">We're Online!</span>
        </motion.a>

        {/* Scroll to top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1, backgroundColor: '#7C3AED' }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-black/80 dark:bg-white/10 text-white flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/10 group"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      </div>

    </footer>
  );
};

export default Footer;
