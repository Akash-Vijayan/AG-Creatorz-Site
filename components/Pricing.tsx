
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

type PlanType = 'monthly' | 'onetime';

const Pricing: React.FC = () => {
  const [planType, setPlanType] = useState<PlanType>('onetime');

  const plans = [
    {
      name: 'Basic',
      price: planType === 'onetime' ? '$199' : '$49',
      period: planType === 'onetime' ? '' : '/mo',
      features: ['One-page website', 'Standard design', '3 Revisions', 'Mobile Responsive', 'Speed Optimized'],
      cta: 'Choose Basic'
    },
    {
      name: 'Pro',
      price: planType === 'onetime' ? '$499' : '$99',
      period: planType === 'onetime' ? '' : '/mo',
      features: ['Multi-page website', 'Premium animations', 'Unlimited revisions', 'SEO Optimization', 'Admin Dashboard', '2 Weeks Support'],
      highlight: true,
      cta: 'Go Pro'
    },
    {
      name: 'Custom',
      price: 'Let\'s Talk',
      period: '',
      features: ['Complex Web Apps', 'Custom Branding', 'Video Production', 'Dedicated Support', 'Priority Delivery', 'Consultation'],
      cta: 'Contact Me'
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-black dark:text-white mb-6 uppercase tracking-tighter">Pricing</h2>
          <p className="text-xl text-mutedGray dark:text-gray-400 mb-10">Simple packages for every stage of your journey.</p>
          
          {/* Toggle */}
          <div className="inline-flex bg-gray-100 dark:bg-gray-900 p-1.5 rounded-full relative shadow-inner">
            <div className="absolute inset-0 flex">
               <motion.div 
                 className="w-1/2 bg-white dark:bg-black rounded-full shadow-md m-1.5 border border-black/5 dark:border-white/5"
                 animate={{ x: planType === 'monthly' ? '100%' : '0%' }}
                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
               />
            </div>
            <button 
              onClick={() => setPlanType('onetime')}
              className={`relative z-10 px-8 py-3 rounded-full text-base font-bold transition-colors ${planType === 'onetime' ? 'text-black dark:text-white' : 'text-mutedGray'}`}
            >
              One-time
            </button>
            <button 
              onClick={() => setPlanType('monthly')}
              className={`relative z-10 px-8 py-3 rounded-full text-base font-bold transition-colors ${planType === 'monthly' ? 'text-black dark:text-white' : 'text-mutedGray'}`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative p-10 rounded-[2.5rem] flex flex-col h-full transition-all duration-300 overflow-hidden ${
                plan.highlight 
                  ? 'bg-white dark:bg-charcoal border-2 border-brandPrimary shadow-2xl scale-105 z-10 py-12' 
                  : 'bg-softWhite dark:bg-gray-900 border border-black/5 dark:border-white/5 hover:border-brandPrimary transition-all'
              }`}
            >
              {plan.highlight && (
                <>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brandPrimary text-white text-sm font-bold uppercase px-6 py-2 rounded-full tracking-wider shadow-lg z-20">
                    Most Popular
                  </div>
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 3, ease: "easeInOut" }}
                  />
                </>
              )}
              
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2 relative z-10 uppercase tracking-tighter">{plan.name}</h3>
              <div className="flex items-baseline mb-8 h-16 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={plan.price}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-5xl lg:text-6xl font-display font-bold text-black dark:text-white tracking-tight"
                  >
                    {plan.price}
                  </motion.span>
                </AnimatePresence>
                <span className="text-lg text-mutedGray ml-2 font-medium">{plan.period}</span>
              </div>

              <ul className="space-y-5 mb-10 flex-1 relative z-10">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-4">
                    <div className="bg-brandPrimary/10 p-1 rounded-full">
                       <Check className="w-4 h-4 text-brandPrimary flex-shrink-0" />
                    </div>
                    <span className="text-base text-black/70 dark:text-gray-300">{feat}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#contact"
                className={`w-full py-4 rounded-full font-bold text-lg text-center transition-all duration-300 transform hover:scale-105 active:scale-95 relative z-10 ${
                  plan.highlight 
                    ? 'bg-black dark:bg-white text-white dark:text-black hover:shadow-xl hover:bg-brandPrimary dark:hover:bg-brandPrimary dark:hover:text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-brandPrimary hover:text-white'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
