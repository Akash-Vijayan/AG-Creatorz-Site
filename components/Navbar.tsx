
import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Moon, Sun, ChevronDown, Linkedin, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, LOGO_PATH } from '../constants';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  currentPage: string;
  onNavigate: (page: string, sectionId?: string) => void;
  onSelectService: (id: string) => void;
  showBack?: boolean;
  onBack?: () => void;
}

const XLogo = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ 
  isDarkMode, 
  toggleTheme, 
  currentPage, 
  onNavigate, 
  onSelectService,
  showBack = false,
  onBack
}) => {
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
    <div className="fixed w-full z-[120] top-0 left-0">
      {/* Top Protocol Strip */}
      <div className="w-full bg-brandSurface-light/60 dark:bg-brandSurface-dark/60 backdrop-blur-md border-b border-black/5 dark:border-white/5 py-1.5 hidden md:block">
        <div className="max-w-[95rem] mx-auto px-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-brandPrimary animate-pulse shadow-[0_0_8px_#7C3AED]" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Studio Registry // Secure Transmission v2.8</span>
          </div>
          <div className="flex items-center gap-6 text-black/40 dark:text-white/30">
            <a href="#" className="hover:text-brandPrimary transition-colors"><Instagram size={13} /></a>
            <a href="#" className="hover:text-brandPrimary transition-colors"><XLogo /></a>
            <a href="#" className="hover:text-brandPrimary transition-colors"><Linkedin size={13} /></a>
          </div>
        </div>
      </div>

      <nav 
        className={`w-full transition-all duration-500 ease-out flex items-center glass-nav ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-[95rem] mx-auto px-6 md:px-12 w-full">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center gap-4 md:gap-8">
              <AnimatePresence>
                {showBack && (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={onBack}
                    className="flex items-center gap-2 text-black/40 dark:text-white/40 hover:text-brandPrimary transition-colors group/back pr-4 border-r border-black/5 dark:border-white/5"
                  >
                    <ArrowLeft size={16} className="group-hover/back:-translate-x-1.5 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">Return</span>
                  </motion.button>
                )}
              </AnimatePresence>

              <div 
                className="flex items-center gap-3 md:gap-4 cursor-pointer group" 
                onClick={(e) => handleLinkClick(e, 'home', 'hero')}
              >
                <img src={LOGO_PATH} alt="AG" className="h-7 md:h-9 w-auto dark:invert group-hover:scale-105 transition-transform duration-500" />
                <span className="font-display font-black text-lg md:text-xl tracking-tighter text-black dark:text-white uppercase leading-none">
                  AG CREATORZ<span className="text-brandPrimary">.</span>
                </span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-10">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href="#" 
                    onClick={(e) => handleLinkClick(e, link.page, link.section)} 
                    className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group ${
                      currentPage === link.page ? 'text-brandPrimary' : 'text-black/60 dark:text-white/60 hover:text-brandPrimary'
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-brandPrimary transition-all duration-500 ${currentPage === link.page ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </a>
                ))}

                {/* Services Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                >
                  <button className="text-[10px] font-black text-black/60 dark:text-white/60 hover:text-brandPrimary uppercase tracking-[0.3em] flex items-center gap-2 transition-all">
                    Services <ChevronDown size={12} className={`transition-transform duration-500 ${servicesDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {servicesDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full -left-6 pt-5 w-64"
                      >
                        <div className="bg-brandSurface-light dark:bg-brandSurface-dark border border-black/10 dark:border-white/10 rounded-[2rem] shadow-2xl p-4 backdrop-blur-3xl overflow-hidden">
                          {SERVICES.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => { onSelectService(s.id); setServicesDropdown(false); }}
                              className="w-full text-left px-4 py-3.5 rounded-xl hover:bg-brandPrimary/10 text-black/70 dark:text-white/70 hover:text-brandPrimary transition-all uppercase text-[9px] font-black tracking-[0.2em]"
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

              <div className="flex items-center gap-6 pl-8 border-l border-black/10 dark:border-white/10">
                 <button onClick={toggleTheme} className="text-black/60 dark:text-white/60 hover:text-brandPrimary transition-colors">
                   {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                 </button>
                 
                 <button 
                   onClick={(e) => handleLinkClick(e as any, 'contact-page')}
                   className="px-7 py-3 bg-brandPrimary text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brandPrimary/20"
                 >
                   Let's Talk
                 </button>
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-5">
              <button onClick={toggleTheme} className="text-black dark:text-white">{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
              <button onClick={() => setIsOpen(!isOpen)} className="text-black dark:text-white">{isOpen ? <X size={26} /> : <Menu size={26} />}</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-brandSurface-light dark:bg-brandSurface-dark z-[200] flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <img src={LOGO_PATH} alt="AG" className="h-9 dark:invert" />
              <X size={32} onClick={() => setIsOpen(false)} />
            </div>
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href="#" 
                  onClick={(e) => handleLinkClick(e, link.page, link.section)}
                  className="text-5xl font-display font-bold uppercase tracking-tighter"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-12 border-t border-black/10 dark:border-white/10 mt-10">
                <button 
                  onClick={(e) => handleLinkClick(e as any, 'contact-page')}
                  className="w-full py-6 bg-brandPrimary text-white rounded-[2rem] text-sm font-black uppercase tracking-[0.3em]"
                >
                  Initiate Project
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
