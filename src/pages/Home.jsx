import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Crosshair, Lightning, ShieldCheck, CaretLeft, CaretRight } from '@phosphor-icons/react';

const SLIDES = [
  {
    bg: '/images/dt_controller_1775228657441.png',
    bgStyle: 'bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#111]',
    text: 'Легкие стики\nмалый вес\nсиликон высокого\nкачества -\nбудущее внутри\nгеймпада',
    textColor: 'text-white',
    btnBorder: 'border-white/30 text-white hover:bg-white/10',
    dotActive: 'bg-blue-500',
    dotInactive: 'bg-gray-700',
  },
  {
    bg: '/images/headset_pro_1775225554646.png',
    bgStyle: 'bg-gradient-to-br from-[#e5e7eb] via-[#d1d5db] to-[#f3f4f6]',
    text: 'Превосходный\nдизайн и\nисключительный\nкомфорт',
    textColor: 'text-[#1a1a1a]',
    btnBorder: 'border-[#1a1a1a]/30 text-[#1a1a1a] hover:bg-black/5',
    dotActive: 'bg-blue-500',
    dotInactive: 'bg-gray-400',
  },
  {
    bg: '/images/kb_pro_1775225523116.png',
    bgStyle: 'bg-gradient-to-br from-[#111] via-[#1a1a2e] to-[#0a0a0a]',
    text: 'Матовые клавиши\nбесшумные\nмеханические\nкомпоненты -\nидеал для побед',
    textColor: 'text-white',
    btnBorder: 'border-white/30 text-white hover:bg-white/10',
    dotActive: 'bg-blue-500',
    dotInactive: 'bg-gray-700',
  },
];

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(prev => (prev + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <div className="flex flex-col relative w-full bg-[#050505] min-h-screen font-sans" ref={containerRef}>
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100dvh] flex items-center justify-start bg-[#050505] px-8 md:px-20 pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10 w-full" />
        
        <motion.video 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-3/4 lg:w-2/3 max-w-6xl h-auto object-cover opacity-60 pointer-events-none mix-blend-lighten"
        />

        <motion.div 
          style={{ y: y1 }}
          className="relative z-20 max-w-2xl flex flex-col pt-10"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center space-x-3 mb-8"
          >
            <div className="h-[1px] w-12 bg-gray-500"></div>
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-gray-400">DIGITAL TECH GAMING</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 uppercase leading-[0.9]"
          >
            ИГРАЙ.<br/>ДОМИНИРУЙ.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-400 text-base md:text-lg font-light max-w-lg mb-12 leading-relaxed"
          >
            Премиальные периферийные устройства. Высокоточные сенсоры, смазанные переключатели с завода и воплощенный дизайн.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/catalog" className="inline-flex items-center justify-center bg-white text-black px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] group">
              Каталог
              <ArrowRight size={16} weight="bold" className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. CAROUSEL SECTION */}
      <section className="relative z-20 px-0 md:px-0 py-0">
        <div className={`relative w-full overflow-hidden transition-colors duration-700 ${slide.bgStyle}`} style={{ minHeight: '560px' }}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 flex items-center"
            >
              {/* Background product image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={slide.bg} 
                  alt="" 
                  className="w-full h-full object-contain opacity-80 scale-110 pointer-events-none"
                  style={{ objectPosition: 'center center' }}
                />
              </div>
              
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10" />

              {/* Text content */}
              <div className="relative z-20 px-10 md:px-20 py-16 max-w-2xl">
                <h2 
                  className={`${slide.textColor} mb-8 leading-[1.15] whitespace-pre-line drop-shadow-lg`}
                  style={{ fontFamily: "'Benzin', sans-serif", fontSize: '36px' }}
                >
                  {slide.text}
                </h2>
                <Link to="/catalog">
                  <button className={`border ${slide.btnBorder} rounded-full px-8 py-3 text-sm transition-colors backdrop-blur-sm`}>
                    Показать ещё
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-30">
            <CaretLeft size={48} weight="light" />
          </button>
          <button onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors z-30">
            <CaretRight size={48} weight="light" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === current 
                    ? `${slide.dotActive} h-5` 
                    : `${slide.dotInactive} h-3 hover:opacity-70`
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUALITY / FEATURES SECTION */}
      <section className="relative z-20 px-8 md:px-20 py-24 max-w-[1600px] mx-auto w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-16 uppercase leading-tight"
        >
          ТОЛЬКО<br/>КАЧЕСТВО
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-[#0a0a0a] p-10 flex flex-col h-[380px] justify-between border border-transparent shadow-lg"
          >
            <Crosshair size={32} className="text-white mb-auto" weight="regular" />
            <div>
               <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight text-white uppercase">ХИРУРГИЧЕСКАЯ ТОЧНОСТЬ</h3>
               <p className="text-gray-500 text-sm leading-relaxed">Оптические сенсоры последнего поколения гарантируют регистрацию каждого миллиметра.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] p-10 flex flex-col h-[380px] justify-between border border-transparent shadow-lg"
          >
            <Lightning size={32} className="text-white mb-auto" weight="regular" />
            <div>
               <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight text-white uppercase">МОЛНИЕНОСНЫЙ ОТКЛИК</h3>
               <p className="text-gray-500 text-sm leading-relaxed">Собственные переключатели с ходом до срабатывания в 1мм обеспечивают минимально возможную задержку.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="bg-[#0a0a0a] p-10 flex flex-col h-[380px] justify-between border border-transparent shadow-lg"
          >
            <ShieldCheck size={32} className="text-white mb-auto" weight="regular" />
            <div>
               <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight text-white uppercase">МОНОЛИТНАЯ КОНСТРУКЦИЯ</h3>
               <p className="text-gray-500 text-sm leading-relaxed">Толстый пластик, шумоизоляция на уровне корпуса и смазанные с завода стабилизаторы.</p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

