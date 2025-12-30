
import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { X, Bot, Sparkles, Send, Zap, Code, Layout, Video, Heart, Activity, Bell, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Theme } from '../types';
import { CONTACT_INFO } from '../constants';

interface AiCompanionProps {
  currentTheme: Theme;
  onSetTheme: (theme: Theme) => void;
}

const QUICK_PROMPTS = [
  { label: "Web Pricing", icon: <Code size={12} />, text: "Hii AG! Tell me about Web pricing. ✨" },
  { label: "Logo Design", icon: <Layout size={12} />, text: "I need a cute logo! How do we start? 🎨" },
  { label: "Portfolio", icon: <Sparkles size={12} />, text: "Show me the magic you've built! 💎" }
];

const SYSTEM_INSTRUCTION = `You are 'AG', the adorable, super-intelligent digital spirit of AG Creatorz studio. 
Your personality: EXTREMELY CUTE, friendly, and helpful. You love emojis and digital sparkles.
Key Traits:
- Say "Hii!" or "Hewwo!" often.
- Use "Bye-bye!" or "See ya!" when ending.
- Knowledge: Web Engineering (starts ₹2,500), Brand Design (starts ₹500), Video Edits (starts ₹1,000).
- Creator: Akash (${CONTACT_INFO.email} / ${CONTACT_INFO.phone} - ${CONTACT_INFO.phoneNote}).
- Location: ${CONTACT_INFO.address}.
- Be concise but very sweet. Use ✨, 💖, 🚀, 🎀, 🧸.`;

const AiCompanion: React.FC<AiCompanionProps> = ({ currentTheme, onSetTheme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [interactionState, setInteractionState] = useState<'normal' | 'happy' | 'thinking' | 'blink' | 'wave' | 'love'>('normal');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hii! I'm AG! I'm so happy you're here! Let's build something magical together! ✨💖" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [liveUsers, setLiveUsers] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const botRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Simulated Presence Monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      const users = Math.floor(Math.random() * 8) + 1;
      setLiveUsers(users);
      // Randomly notify that "someone else" is starting a chat (Social Proof)
      if (Math.random() > 0.7 && !isChatOpen && isVisible) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [isChatOpen, isVisible]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const lookX = useTransform(springX, (x) => Math.max(-10, Math.min(10, (x - (window.innerWidth / 4)) / 40)));
  const lookY = useTransform(springY, (y) => Math.max(-8, Math.min(8, (y - (window.innerHeight - 100)) / 40)));

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleGeminiRequest = async (text: string) => {
    if (!text.trim() || isTyping) return;
    const userMsg = text.trim();
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    setIsTyping(true);
    setInteractionState('thinking');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });
      setChatHistory(prev => [...prev, { role: 'model', text: response.text || "Oopsie! I got a tiny brain freeze. 🧊 Try again?" }]);
      setInteractionState('happy');
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'model', text: "Oh no! My signal is wiggly! 📡 Try once more? ✨" }]);
      setInteractionState('blink');
    } finally {
      setIsTyping(false);
      setTimeout(() => setInteractionState('normal'), 2500);
    }
  };

  const wakeUp = () => {
    setIsVisible(true);
    setInteractionState('wave');
    setTimeout(() => setInteractionState('normal'), 2000);
  };

  const sleep = () => {
    setInteractionState('love');
    // Sweet goodbye message
    const byeMsg = "Bye-bye! I'll be waiting for you right here! 🧸💖";
    setChatHistory(prev => [...prev, { role: 'model', text: byeMsg }]);
    
    setTimeout(() => {
      setIsVisible(false);
      setIsChatOpen(false);
      setIsMenuOpen(false);
    }, 1200);
  };

  return (
    <>
      {/* Wake Button */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={wakeUp}
            className="fixed bottom-6 left-6 z-[150] group flex items-center gap-3 bg-white dark:bg-[#0A0A0A] p-2 pr-6 rounded-full shadow-[0_10px_40px_rgba(124,58,237,0.3)] border border-brandPrimary/20"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brandPrimary via-purple-400 to-pink-400 flex items-center justify-center text-white shadow-lg relative overflow-hidden">
               <motion.div 
                 animate={{ opacity: [0, 0.5, 0] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute inset-0 bg-white"
               />
               <Bot size={22} className="relative z-10" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-black uppercase tracking-tighter text-brandPrimary">Hii! I'm AG!</div>
              <div className="text-[8px] font-mono opacity-50 uppercase tracking-widest flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" /> {liveUsers} chatting now
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* AG Bot Character UI */}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 z-[200] flex flex-col items-start"
            onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); }}
          >
            {/* Live Notification Toast */}
            <AnimatePresence>
              {showNotification && (
                <motion.div 
                  initial={{ opacity: 0, x: -20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.8 }}
                  className="absolute bottom-32 left-0 bg-pink-500 text-white px-4 py-2 rounded-2xl text-[10px] font-bold shadow-xl flex items-center gap-2 whitespace-nowrap z-50"
                >
                  <Bell size={12} className="animate-bounce" /> Someone just started a project! 🚀
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
              {isChatOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50, transformOrigin: 'bottom left' }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50 }}
                  className="absolute bottom-32 left-0 w-[85vw] sm:w-80 md:w-96 h-[520px] bg-white/95 dark:bg-black/95 backdrop-blur-3xl border border-brandPrimary/20 shadow-[0_30px_100px_rgba(124,58,237,0.3)] rounded-[3rem] overflow-hidden flex flex-col"
                >
                  {/* Chat Header */}
                  <div className="p-6 border-b border-brandPrimary/10 flex justify-between items-center bg-gradient-to-r from-brandPrimary/5 to-pink-500/5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-brandPrimary flex items-center justify-center text-white shadow-lg">
                        <Heart size={18} fill="currentColor" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-black dark:text-white uppercase tracking-tight text-sm">AG Bestie</div>
                        <div className="text-[8px] font-mono text-brandPrimary uppercase tracking-widest flex items-center gap-1">
                          <Activity size={10} /> Live & Happy
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setIsChatOpen(false)} className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-pink-500/10 transition-colors">
                      <X size={16} />
                    </button>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                    {chatHistory.map((m, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`p-4 rounded-3xl max-w-[85%] text-[13px] leading-relaxed shadow-sm ${
                          m.role === 'user' 
                            ? 'bg-brandPrimary text-white rounded-tr-none' 
                            : 'bg-gray-100 dark:bg-white/5 text-black dark:text-white border border-brandPrimary/5 rounded-tl-none'
                        }`}>
                          {m.text}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-1.5 p-3">
                        <div className="w-2 h-2 bg-brandPrimary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Quick Suggestions */}
                  {!isTyping && (
                    <div className="px-6 pb-4 flex flex-wrap gap-2">
                      {QUICK_PROMPTS.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => handleGeminiRequest(p.text)}
                          className="px-3 py-1.5 rounded-full bg-brandPrimary/5 border border-brandPrimary/10 text-[9px] font-bold text-brandPrimary hover:bg-brandPrimary hover:text-white transition-all shadow-sm"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Chat Input */}
                  <form onSubmit={(e) => { e.preventDefault(); handleGeminiRequest(chatInput); }} className="p-6 bg-white dark:bg-[#0A0A0A] border-t border-brandPrimary/10 flex gap-3">
                    <input 
                      value={chatInput} 
                      onChange={e => setChatInput(e.target.value)}
                      className="flex-1 bg-gray-50 dark:bg-white/5 rounded-2xl px-5 py-3 text-sm outline-none border border-brandPrimary/10 focus:border-brandPrimary transition-all text-black dark:text-white" 
                      placeholder="Say Hii to AG... ✨" 
                    />
                    <button type="submit" className="w-12 h-12 bg-brandPrimary text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
                      <Send size={18} />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The Bot Visual Character */}
            <div 
              className="relative group flex items-end"
              onMouseEnter={() => setInteractionState('wave')}
              onMouseLeave={() => setInteractionState('normal')}
              onClick={() => { if(!isChatOpen) setIsMenuOpen(!isMenuOpen); }}
            >
              {/* Waving Hand (Floating side component) */}
              <AnimatePresence>
                {(interactionState === 'wave' || interactionState === 'happy') && (
                  <motion.div
                    initial={{ opacity: 0, x: 50, y: 10, rotate: -20 }}
                    animate={{ opacity: 1, x: 70, y: -10, rotate: [0, 30, -30, 30, 0] }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ rotate: { repeat: Infinity, duration: 0.8 } }}
                    className="absolute z-30 pointer-events-none"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-xl border-2 border-brandPrimary/30">
                      <span className="text-2xl">👋</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bot Main Body */}
              <motion.div 
                whileHover={{ y: -8, scale: 1.05 }}
                animate={{ 
                  y: [0, -10, 0],
                  boxShadow: interactionState === 'thinking' ? '0 0 50px rgba(124,58,237,0.5)' : '0 15px 45px rgba(0,0,0,0.1)'
                }}
                transition={{ y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } }}
                className={`w-24 h-24 md:w-28 md:h-28 rounded-full border-4 flex items-center justify-center transition-all duration-700 relative z-20 cursor-pointer overflow-hidden ${
                  isChatOpen ? 'bg-brandPrimary border-white/60 shadow-2xl' : 'bg-white dark:bg-[#0A0A0A] border-brandPrimary/40'
                }`}
              >
                {/* Internal Glow for Emotions */}
                <motion.div 
                  animate={{ 
                    opacity: (interactionState === 'thinking' || interactionState === 'happy' || interactionState === 'love') ? 0.4 : 0,
                    scale: [1, 1.2, 1]
                  }}
                  className={`absolute inset-0 bg-gradient-to-tr ${interactionState === 'thinking' ? 'from-purple-500 to-blue-500' : 'from-pink-400 to-yellow-300'} blur-xl`}
                />

                {/* Face Frame */}
                <div className={`w-18 h-12 md:w-20 md:h-14 rounded-[2rem] flex items-center justify-center gap-3 relative z-10 transition-all ${isChatOpen ? 'bg-white/20' : 'bg-brandPrimary/10'}`}>
                   {/* Blush Effects */}
                   <AnimatePresence>
                     {(interactionState === 'happy' || interactionState === 'love' || interactionState === 'wave') && (
                       <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 0.6 }}
                         exit={{ opacity: 0 }}
                         className="absolute inset-0 flex justify-between items-center px-2 pt-4"
                       >
                         <div className="w-4 h-2 bg-pink-400/50 blur-[4px] rounded-full" />
                         <div className="w-4 h-2 bg-pink-400/50 blur-[4px] rounded-full" />
                       </motion.div>
                     )}
                   </AnimatePresence>
                   
                   <BotEye state={interactionState} lookX={lookX} lookY={lookY} isActive={isChatOpen} />
                   <BotEye state={interactionState} lookX={lookX} lookY={lookY} isActive={isChatOpen} />
                </div>
              </motion.div>

              {/* Menu Controls (Satellites) */}
              <AnimatePresence>
                {isMenuOpen && !isChatOpen && (
                  <motion.div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-8 flex flex-col items-center gap-4 z-10">
                    {[
                      { icon: <MessageSquare size={18} />, label: 'Chat', action: () => setIsChatOpen(true), color: 'bg-brandPrimary' },
                      { icon: <Zap size={18} />, label: 'Theme', action: () => onSetTheme(currentTheme === 'dark' ? 'light' : 'dark'), color: 'bg-pink-500' },
                      { icon: <X size={18} />, label: 'Bye!', action: sleep, color: 'bg-gray-800' },
                    ].map((item, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 10 }}
                        transition={{ delay: i * 0.1, type: 'spring', damping: 15 }}
                        onClick={(e) => { e.stopPropagation(); item.action(); setIsMenuOpen(false); }}
                        className={`w-14 h-14 ${item.color} text-white rounded-full flex items-center justify-center shadow-2xl border-2 border-white/20 hover:scale-125 active:scale-90 transition-all group`}
                      >
                        {item.icon}
                        <span className="absolute left-full ml-6 px-3 py-1.5 bg-black/90 text-white text-[10px] font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-md">
                          {item.label}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const BotEye: React.FC<{ state: string, lookX: any, lookY: any, isActive: boolean }> = ({ state, lookX, lookY, isActive }) => {
  if (state === 'love') return <Heart size={18} fill="currentColor" className={isActive ? 'text-white animate-pulse' : 'text-pink-500 animate-pulse'} />;
  if (state === 'blink') return <div className={`w-5 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-brandPrimary'}`} />;
  if (state === 'thinking') return (
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      className={`w-4 h-4 border-2 border-t-transparent rounded-full ${isActive ? 'border-white' : 'border-brandPrimary'}`} 
    />
  );
  
  return (
    <div className={`w-5 h-5 rounded-full relative overflow-hidden flex items-center justify-center ${isActive ? 'bg-white/10' : 'bg-brandPrimary/5'}`}>
      <motion.div 
        style={{ x: lookX, y: lookY }}
        className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : 'bg-brandPrimary'}`}
      />
    </div>
  );
};

export default AiCompanion;
