import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('dt_cookie_consent')) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('dt_cookie_consent', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-6 z-[200] max-w-3xl w-[calc(100%-3rem)] bg-[#0a0a0a] border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl rounded-sm"
        >
          <p className="text-gray-400 text-xs tracking-wide leading-relaxed">
            Данный веб-сайт использует cookie-файлы с целью повышения удобства и эффективности работы пользователя.
          </p>
          <button 
            onClick={accept}
            className="shrink-0 border border-white/20 text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:border-white transition-colors rounded-[32px] whitespace-nowrap"
          >
            Согласиться
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
