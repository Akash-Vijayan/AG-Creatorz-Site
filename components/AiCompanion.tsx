
import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence, useScroll } from 'framer-motion';
import { Moon, Sun, X, Bot, Sparkles, Copy, MessageCircle, Send, Heart, Laptop } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Theme } from '../types';

interface AiCompanionProps {
  currentTheme: Theme;
  onSetTheme: (theme: Theme) => void;
}

const SECTION_MESSAGES: Record<string, string[]> = {
  hero: ["Welcome! I'm so glad you're here. ✨", "Let's build something beautiful today. 🚀"],
  about: ["I love the vision behind this brand! 🎨", "Every project has a unique story. 📂"],
  services: ["What can we create for you today? ⚙️", "I'm ready to bring your ideas to life! 🛠️"],
  portfolio: ["I'm so proud of these projects! 💎", "Notice the detail in this one? 📸"],
  process: ["We make the complex feel simple. ⚡", "Precision is our love language. 🎯"],
  contact: ["I'm waiting to hear from you! 📡", "Let's start our journey together. 📬"]
};

const SYSTEM_INSTRUCTION = `You are 'AG', the friendly and enthusiastic creative spirit of AG Creatorz. 
You are a passionate design enthusiast and tech helper. 
Your tone is warm, encouraging, premium, and very helpful. 
You love talking about Web development (₹2500+), Graphic Design (₹500+), and Video Editing (₹1000+).
Keep responses concise but filled with creative energy and professional emojis like ✨, 🚀, 🎨, and 💎. 
Your goal is to make the user feel inspired and supported.`;

const AiCompanion: React.FC<AiCompanionProps> = ({ currentTheme, onSetTheme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("Hi there! Ready to create?");
  const [activeSection, setActiveSection] = useState('hero');
  const [interactionState, setInteractionState] = useState<'normal' | 'happy' | 'thinking' | 'dizzy' | 'blink'>('normal');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hello! I'm AG. I'd love to help you build your dream brand with AG Creatorz. What's on your mind? ✨" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [botCenter, setBotCenter] = useState({ x: 0, y: 0 });

  const botRef = useRef<HTMLDivElement>(null);
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const updateBotPosition = () => {
      if (botRef.current) {
        const rect = botRef.current.getBoundingClientRect();
        setBotCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };
    if (isVisible) {
      updateBotPosition();
      window.addEventListener('scroll', updateBotPosition);
      window.addEventListener('resize', updateBotPosition);
    }
    return () => {
      window.removeEventListener('scroll', updateBotPosition);
      window.removeEventListener('resize', updateBotPosition);
    };
  }, [isVisible]);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  const lookX = useTransform(springX, (x) => Math.max(-12, Math.min(12, (x - botCenter.x) / 25)));
  const lookY = useTransform(springY, (y) => Math.max(-8, Math.min(8, (y - botCenter.y) / 25)));

  useEffect(() => {
    if (!isVisible) return;
    const scheduleBlink = () => {
      blinkTimer.current = setTimeout(() => {
        if (interactionState === 'normal') {
          setInteractionState('blink');
          setTimeout(() => setInteractionState('normal'), 120);
        }
        scheduleBlink();
      }, Math.random() * 5000 + 4000);
    };
    scheduleBlink();
    return () => {
      if (blinkTimer.current) clearTimeout(blinkTimer.current);
    };
  }, [interactionState, isVisible]);

  useEffect(() => {
    if (!isVisible || isChatOpen) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id && id !== activeSection) {
            setActiveSection(id);
            const msgs = SECTION_MESSAGES[id] || SECTION_MESSAGES.hero;
            setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
            setInteractionState('happy');
            setTimeout(() => setInteractionState('normal'), 1500);
          }
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [activeSection, isVisible, isChatOpen]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setIsMenuOpen(false);
    setIsThemeMenuOpen(false);
    if (!isVisible) setInteractionState('happy');
  };

  const sendMessageToGemini = async (text: string) => {
     if (!text.trim()) return;
     setChatHistory(prev => [...prev, { role: 'user', text }]);
     setIsTyping(true);
     setInteractionState('thinking');
     try {
       const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
       const response = await ai.models.generateContent({
         model: 'gemini-3-flash-preview',
         contents: text,
         config: { systemInstruction: SYSTEM_INSTRUCTION }
       });
       setChatHistory(prev => [...prev, { role: 'model', text: response.text || "Oops, I lost my train of thought for a second! 😵‍💫" }]);
       setInteractionState('happy');
     } catch (e) {
       setChatHistory(prev => [...prev, { role: 'model', text: "My circuits are a little fuzzy right now, but I'm still here for you! 🔌" }]);
       setInteractionState('dizzy');
     } finally {
       setIsTyping(false);
       setTimeout(() => setInteractionState('normal'), 3000);
     }
  };

  const themeOptions: { id: Theme; icon: React.ReactNode; label: string }[] = [
    { id: 'light', icon: <Sun size={14} />, label: 'Light' },
    { id: 'dark', icon: <Moon size={14} />, label: 'Dark' },
    { id: 'system', icon: <Laptop size={14} />, label: 'System' }
  ];

  return (
    <>
      <AnimatePresence>
        {!isVisible ? (
          <motion.button
            key="awaken-btn"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggleVisibility}
            className="fixed bottom-10 left-10 z-[150] flex items-center gap-4 bg-black border border-white/10 shadow-2xl rounded-full pl-2 pr-6 py-2 cursor-pointer group hover:border-brandPrimary/50 transition-all"
          >
             <div className="w-12 h-12 rounded-full bg-brandPrimary flex items-center justify-center text-white shadow-[0_0_25px_rgba(124,58,237,0.5)] group-hover:scale-105 transition-transform">
               <Bot size={22} />
             </div>
             <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white">Meet AG</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible ? (
          <motion.div 
            key="bot-container"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-10 left-10 z-[200] flex flex-col items-start" 
            ref={botRef}
          >
            <div className="relative flex flex-col items-center">
              
              <AnimatePresence mode='wait'>
                {(!isMenuOpen && !isChatOpen && !isThemeMenuOpen) ? (
                  <motion.div
                    key={message}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute bottom-[125%] left-0 w-64 bg-white/95 dark:bg-black/95 backdrop-blur-3xl border border-brandPrimary/20 shadow-2xl rounded-[1.5rem] p-4 text-[11px] font-medium leading-relaxed text-black dark:text-white text-center z-10"
                  >
                    {message}
                    <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white dark:bg-black rotate-45 border-r border-b border-brandPrimary/10 dark:border-white/10" />
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence>
                {isChatOpen ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute bottom-[130%] left-0 w-[calc(100vw-3rem)] sm:w-80 md:w-96 h-[500px] bg-white/98 dark:bg-black/98 backdrop-blur-3xl border border-brandPrimary/20 shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col z-20"
                  >
                    <div className="p-5 border-b border-brandPrimary/10 flex justify-between items-center text-black dark:text-white bg-brandPrimary/5 shrink-0">
                      <div className="flex items-center gap-3">
                        <Sparkles size={16} className="text-brandPrimary animate-pulse" />
                        <span className="font-display font-bold text-sm tracking-tight">AG Assistant</span>
                      </div>
                      <X size={18} className="cursor-pointer opacity-40 hover:opacity-100 transition-opacity" onClick={() => setIsChatOpen(false)} />
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-5 flex flex-col">
                      {chatHistory.map((m, i) => (
                        <div key={i} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-4 rounded-[1.5rem] max-w-[85%] text-[12px] leading-relaxed shadow-sm ${
                            m.role === 'user' 
                              ? 'bg-brandPrimary text-white font-semibold rounded-tr-none' 
                              : 'bg-brandPrimary/10 text-black dark:text-gray-200 border border-brandPrimary/5 rounded-tl-none'
                          }`}>
                            {m.text}
                          </div>
                        </div>
                      ))}
                      {isTyping ? <div className="flex gap-1"><div className="w-1.5 h-1.5 bg-brandPrimary rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-brandPrimary rounded-full animate-bounce delay-75" /><div className="w-1.5 h-1.5 bg-brandPrimary rounded-full animate-bounce delay-150" /></div> : null}
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); sendMessageToGemini(chatInput); setChatInput(""); }} className="p-5 border-t border-brandPrimary/10 flex gap-3 bg-brandPrimary/[0.02]">
                      <input value={chatInput} onChange={e => setChatInput(e.target.value)} className="flex-1 bg-white/50 dark:bg-white/5 rounded-2xl px-5 py-3 text-[12px] text-black dark:text-white outline-none border border-brandPrimary/10 focus:border-brandPrimary transition-all" placeholder="Ask AG anything..." />
                      <button type="submit" className="p-3 bg-brandPrimary text-white rounded-2xl"><Send size={18} /></button>
                    </form>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="relative group cursor-pointer" onClick={() => { if(!isThemeMenuOpen) setIsMenuOpen(!isMenuOpen); else setIsThemeMenuOpen(false); }}>
                <motion.div 
                  animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className={`w-24 h-24 rounded-full border-2 relative z-20 flex items-center justify-center transition-all duration-700 ${
                    isChatOpen || interactionState === 'thinking' 
                    ? 'bg-brandPrimary border-white/40 shadow-[0_0_60px_rgba(124,58,237,0.8)]' 
                    : 'bg-white dark:bg-black border-brandPrimary/20 shadow-2xl'
                  }`}
                >
                  <div className={`w-16 h-10 rounded-[1.2rem] flex items-center justify-center gap-3 relative shadow-inner overflow-hidden border transition-colors ${isChatOpen || interactionState === 'thinking' ? 'bg-white/10 border-white/20' : 'bg-brandPrimary/5 border-brandPrimary/10'}`}>
                    <Eye state={interactionState} lookX={lookX} lookY={lookY} isActive={isChatOpen || interactionState === 'thinking'} />
                    <Eye state={interactionState} lookX={lookX} lookY={lookY} isActive={isChatOpen || interactionState === 'thinking'} />
                  </div>
                </motion.div>

                <AnimatePresence>
                  {isMenuOpen && !isThemeMenuOpen ? (
                    <motion.div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 flex flex-col items-center gap-5 z-10">
                      {[
                        { icon: <MessageCircle size={18} />, label: 'Chat', action: () => setIsChatOpen(true), color: 'bg-brandPrimary' },
                        { icon: <Copy size={18} />, label: 'Email', action: () => { navigator.clipboard.writeText("hello@agcreators.com"); setMessage("Copied! ✨"); }, color: 'bg-brandPrimary-light' },
                        { icon: <Heart size={18} />, label: 'Close', action: toggleVisibility, color: 'bg-gray-800' },
                      ].map((item, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, scale: 0, y: 30 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0, y: 20 }}
                          onClick={(e) => { e.stopPropagation(); item.action(); setIsMenuOpen(false); }}
                          className={`relative w-14 h-14 ${item.color} text-white rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 active:scale-95 transition-all group`}
                        >
                          {item.icon}
                        </motion.button>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

const Eye: React.FC<{ state: string, lookX: any, lookY: any, isActive: boolean }> = ({ state, lookX, lookY, isActive }) => {
  if (state === 'blink') return <div className={`w-3.5 h-0.5 rounded-full opacity-60 self-center ${isActive ? 'bg-white' : 'bg-brandPrimary'}`} />;
  return (
    <div className={`w-3.5 h-3.5 rounded-full relative overflow-hidden ring-1 ${isActive ? 'bg-white/10 ring-white/20' : 'bg-brandPrimary/5 ring-brandPrimary/10'}`}>
      <motion.div style={{ x: lookX, y: lookY }} className={`w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isActive ? 'bg-white' : 'bg-brandPrimary'}`} />
    </div>
  );
};

export default AiCompanion;
