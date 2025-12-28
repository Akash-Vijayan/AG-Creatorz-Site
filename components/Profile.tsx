import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE_CONTENT } from '../constants';

const Profile: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-white dark:bg-charcoal transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, type: "spring" }}
        whileHover={{ scale: 1.02 }}
        className="max-w-5xl mx-auto bg-softWhite dark:bg-charcoalLight border border-gray-100 dark:border-gray-800 shadow-2xl rounded-[3rem] p-10 sm:p-16 overflow-hidden relative group"
      >
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
          {/* Photo */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-[2rem] overflow-hidden shadow-2xl ring-8 ring-white dark:ring-gray-800 transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://picsum.photos/400/400?random=100" 
                alt={PROFILE_CONTENT.name} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          
          {/* Content */}
          <div className="text-center md:text-left flex-1">
            <motion.h3 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl font-bold font-display text-charcoal dark:text-white mb-2"
            >
              {PROFILE_CONTENT.name}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl text-brandPrimary font-semibold mb-6"
            >
              {PROFILE_CONTENT.title}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-mutedGray dark:text-gray-300 mb-8 leading-relaxed max-w-xl font-light"
            >
              {PROFILE_CONTENT.intro}
            </motion.p>
            <motion.a 
              href="#about"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-block px-8 py-3 border-2 border-charcoal dark:border-white/20 text-charcoal dark:text-white rounded-full text-base font-bold hover:bg-charcoal dark:hover:bg-white hover:text-white dark:hover:text-charcoal transition-all hover:scale-105"
            >
              {PROFILE_CONTENT.button}
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;