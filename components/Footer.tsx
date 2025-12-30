
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin, ArrowUp, ExternalLink } from 'lucide-react';
import { SERVICES, LOGO_PATH, CONTACT_INFO } from '../constants';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const tickerItems = [...SERVICES.map(s => s.title), "UI/UX Design", "Graphic Design", "Video Editing", "IT Consultation"];
  
  const handleLink = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    if (onNavigate) onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white dark:bg-[#020202] text-black dark:text-white pt-20 transition-colors duration-1000 overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

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
              Premium digital engineering collective focused on building high-conversion platforms and cinematic brand narratives.
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

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-brandPrimary">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', page: 'home' },
                { name: 'About Us', page: 'about-page' },
                { name: 'Portfolio', page: 'portfolio-page' },
                { name: 'Contact Us', page: 'contact-page' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href="#" 
                    onClick={(e) => handleLink(e, link.page)}
                    className="text-sm text-black/40 dark:text-white/30 hover:text-brandPrimary transition-all flex items-center gap-2 group"
                  >
                    {link.name} <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-brandPrimary">Capabilities</h4>
            <ul className="space-y-4">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-sm text-black/40 dark:text-white/30 hover:text-brandPrimary transition-all">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <div className="bg-black/5 dark:bg-white/[0.03] p-8 rounded-[2rem] border border-black/5 dark:border-white/5 relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-sm font-black uppercase tracking-widest mb-2">Weekly Transmission</h4>
                <p className="text-xs text-black/40 dark:text-white/20 mb-6">Latest digital strategies and creative updates.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="Email" className="flex-1 bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-brandPrimary transition-all" />
                  <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brandPrimary hover:text-white transition-all">Join</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <Phone size={20} />, label: CONTACT_INFO.phone, sub: CONTACT_INFO.phoneNote },
            { icon: <Mail size={20} />, label: CONTACT_INFO.email, sub: "Strategic Inquiry" },
            { icon: <MapPin size={20} />, label: "Tamil Nadu, India", sub: "Global Delivery" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6 p-8 rounded-3xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 transition-all hover:bg-brandPrimary/[0.02]">
              <div className="w-14 h-14 rounded-2xl bg-brandPrimary text-white flex items-center justify-center shadow-lg shadow-brandPrimary/20">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="text-sm font-black text-black dark:text-white mb-1 break-all">{item.label}</div>
                <div className="text-[10px] font-mono text-black/30 dark:text-white/20 uppercase tracking-widest">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="py-12 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-mono text-black/30 dark:text-white/20 uppercase tracking-[0.5em] text-center md:text-left">
            © 2025 AG Creatorz. Engineered for the future.
          </div>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brandPrimary"
          >
            Top of Protocol <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
