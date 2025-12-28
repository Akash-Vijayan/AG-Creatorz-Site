
import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Moon, Sun, ChevronDown, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, LOGO_PATH } from '../constants';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentPage: string;
  onNavigate: (page: string, sectionId?: string) => void;
  onSelectService: (id: string) => void;
}

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme, currentPage, onNavigate, onSelectService }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, page: string, section?: string) => {
    e.preventDefault();
    setIsOpen(false);
    onNavigate(page, section);
  };

  const navLinks = [
    { name: 'Home', section: 'hero', page: 'home' },
    { name: 'About', section: '', page: 'about-page' },
    { name: 'Portfolio', section: '', page: 'portfolio-page' },
    { name: 'Contact', section: '', page: 'contact-page' },
  ];

  return (
    <div className="fixed w-full z-[100] top-0 left-0">
      {/* Top Banner Socials */}
      <div className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-2 hidden md:block">
        <div className="max-w-[95rem] mx-auto px-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brandPrimary animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/50 dark:text-white/40">Your Digital Evolution Starts Here. 📖</span>
          </div>
          <div className="flex items-center gap-6 text-black/40 dark:text-white/30">
            <a href="#" className="hover:text-brandPrimary transition-colors"><Instagram size={14} /></a>
            <a href="#" className="hover:text-brandPrimary transition-colors"><XLogo /></a>
            <a href="#" className="hover:text-brandPrimary transition-colors"><Linkedin size={14} /></a>
          </div>
        </div>
      </div>

      <nav 
        className={`w-full transition-all duration-700 ease-out flex items-center ${
          scrolled 
            ? 'bg-white/90 dark:bg-black/95 backdrop-blur-2xl py-4 border-b border-black/5 dark:border-white/5 shadow-xl' 
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-[95rem] mx-auto px-6 md:px-12 w-full">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <div 
              className="flex items-center gap-4 cursor-pointer group" 
              onClick={(e) => handleLinkClick(e, 'home', 'hero')}
            >
              <img src={LOGO_PATH} alt="AG" className="h-10 w-auto dark:invert group-hover:scale-110 transition-transform duration-500" />
              <span className="font-display font-black text-xl tracking-tighter text-black dark:text-white uppercase leading-none">
                AG CREATORZ<span className="text-brandPrimary">.</span>
              </span>
            </div>
            
            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-12">
              <div className="flex items-center space-x-10">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href="#" 
                    onClick={(e) => handleLinkClick(e, link.page, link.section)} 
                    className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all relative group ${
                      currentPage === link.page ? 'text-brandPrimary' : 'text-black/60 dark:text-white/60 hover:text-brandPrimary'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-2 left-0 h-[2px] bg-brandPrimary transition-all duration-500 ${currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </a>
                ))}

                <div 
                  className="relative"
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                >
                  <button className="text-[11px] font-black text-black/60 dark:text-white/60 hover:text-brandPrimary uppercase tracking-[0.3em] flex items-center gap-2 transition-all">
                    Services <ChevronDown size={12} className={`transition-transform duration-500 ${servicesDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {servicesDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full -left-4 pt-6 w-64"
                      >
                        <div className="bg-white dark:bg-black border border-black/5 dark:border-white/10 rounded-[2rem] shadow-2xl p-4 backdrop-blur-3xl overflow-hidden">
                          {SERVICES.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => { onSelectService(s.id); setServicesDropdown(false); }}
                              className="w-full text-left px-5 py-4 rounded-2xl hover:bg-brandPrimary/10 text-black/70 dark:text-white/70 hover:text-brandPrimary transition-all uppercase text-[10px] font-bold tracking-widest"
                            >
                              {s.title}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-10 pl-10 border-l border-black/5 dark:border-white/10">
                 <button onClick={toggleTheme} className="text-black/60 dark:text-white/60 hover:text-brandPrimary transition-colors">
                   {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                 </button>
                 
                 <button 
                   onClick={(e) => handleLinkClick(e as any, 'contact-page')}
                   className="px-10 py-4 bg-white dark:bg-white text-black rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-brandPrimary hover:text-white transition-all shadow-xl active:scale-95"
                 >
                   Let's Talk
                 </button>
              </div>
            </div>

            {/* Mobile Burger */}
            <div className="md:hidden flex items-center gap-6">
              <button onClick={toggleTheme} className="text-black dark:text-white">{isDarkMode ? <Sun size={24} /> : <Moon size={24} />}</button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-black dark:text-white">{isOpen ? <X size={32} /> : <Menu size={32} />}</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
