
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PortfolioPage from './components/PortfolioPage';
import ContactStrip from './components/ContactStrip';
import TearSection from './components/TearSection';
import ServiceDetail from './components/ServiceDetail';
import Portfolio from './components/Portfolio';
import WorkProcess from './components/WorkProcess';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AiCompanion from './components/AiCompanion';
import { SERVICES } from './constants';
import { ViewState, Theme } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let shouldBeDark = false;
      if (theme === 'system') {
        shouldBeDark = mediaQuery.matches;
      } else {
        shouldBeDark = theme === 'dark';
      }
      
      setIsDarkMode(shouldBeDark);
      if (shouldBeDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    };

    applyTheme();
    
    const listener = () => {
      if (theme === 'system') applyTheme();
    };
    
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const handleNavigate = (page: string, sectionId?: string) => {
    if (page === 'home') {
      setCurrentView('home');
      setSelectedServiceId(null);
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setCurrentView(page as ViewState);
      setSelectedServiceId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    setCurrentView('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeService = SERVICES.find(s => s.id === selectedServiceId) || null;

  return (
    <div className="bg-white dark:bg-[#050505] min-h-screen text-black dark:text-white transition-colors duration-700">
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} 
        currentPage={currentView} 
        onNavigate={handleNavigate}
        onSelectService={handleSelectService}
      />
      
      <AiCompanion currentTheme={theme} onSetTheme={setTheme} />

      <main className="relative">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* VIOLET (Under Hero reveal) */}
              <TearSection 
                onSelectService={handleSelectService} 
                onContact={() => handleNavigate('contact-page')} 
              />
              {/* WHITE */}
              <Portfolio onViewAll={() => handleNavigate('portfolio-page')} />
              {/* VIOLET */}
              <WorkProcess />
              {/* WHITE */}
              <Testimonials />
              {/* VIOLET */}
              <ContactStrip onContact={() => handleNavigate('contact-page')} />
            </motion.div>
          ) : currentView === 'about-page' ? (
            <AboutPage key="about-view" onBack={() => handleNavigate('home')} />
          ) : currentView === 'contact-page' ? (
            <ContactPage key="contact-view" onBack={() => handleNavigate('home')} />
          ) : currentView === 'portfolio-page' ? (
            <PortfolioPage key="portfolio-view" onBack={() => handleNavigate('home')} />
          ) : (currentView === 'service-detail' && activeService) ? (
            <ServiceDetail 
              key="service-detail"
              service={activeService} 
              onBack={() => handleNavigate('home')}
              onContact={() => handleNavigate('contact-page')}
            />
          ) : null}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
