import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Crosshair, Lightning, ShieldCheck, CaretLeft, CaretRight } from '@phosphor-icons/react';

const SLIDES = [
  {
    bg: '/images/carousel/Уши.png',
    text: 'Превосходное\nкачество сборки и\nисключительный\nкомфорт',
  },
  {
    bg: '/images/carousel/Клава.png',
    text: 'Матовые клавиши\nбесшумные\nмеханические\nкомпоненты -\nидеал для побед',
  },
  {
    bg: '/images/carousel/Геймпад.png',
    text: 'Легкие стики\nмалый вес\nсиликон высокого\nкачества -\nбудущее внутри\nгеймпада',
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = Math.abs(page % SLIDES.length);

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setPage(prev => prev + newDirection);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const slide = SLIDES[current];

  return (
    <div className="flex flex-col relative w-full bg-[#050505] min-h-screen font-sans overflow-x-hidden" ref={containerRef}>

      {/* 1. Блок-видос и Hero */}
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
            ИГРАЙ.<br />ДОМИНИРУЙ.
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

      {/* 2. Блок-карусель*/}
      <section className="relative z-20 w-full py-12 md:py-24 flex items-center justify-center min-h-[600px] md:min-h-[800px] bg-[#050505]">

        {/* Левая стрелка */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors z-30"
        >
          <CaretLeft size={48} weight="light" />
        </button>

        {/* Карусель */}
        <div className="relative w-[85%] max-w-[1600px] h-[500px] md:h-[650px] rounded-[24px] md:rounded-[32px] overflow-hidden bg-[#111] shadow-2xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slide.bg}
                alt="Product Slide"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent pointer-events-none" />

              <div className="relative z-10 w-full h-full flex flex-col justify-center px-8 md:px-24">
                <h2
                  className="text-white mb-10 leading-[1.3] whitespace-pre-line drop-shadow-xl font-medium tracking-wide"
                  style={{ fontFamily: "'Benzin', sans-serif", fontSize: '36px' }}
                >
                  {slide.text}
                </h2>
                <Link to="/catalog" className="w-fit">
                  <button className="border border-blue-400 text-[#e0e0e0] hover:text-white rounded-full px-8 py-3 text-sm hover:bg-blue-500/20 transition-colors backdrop-blur-md shadow-lg">
                    Показать ещё
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Средние кнопки карусель */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
            {SLIDES.map((_, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > current ? 1 : -1);
                    setPage(Math.floor(page / SLIDES.length) * SLIDES.length + idx);
                  }}
                  className={`w-1.5 rounded-full transition-all duration-300 ${isActive ? "bg-blue-500 h-5" : "bg-gray-500 h-3 hover:bg-gray-300"
                    }`}
                />
              );
            })}
          </div>
        </div>

        {/* Правая стрелка */}
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors z-30"
        >
          <CaretRight size={48} weight="light" />
        </button>

      </section>

      {/* 3.Блок - качество*/}
      <section className="relative z-20 px-8 md:px-20 py-24 max-w-[1600px] mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-16 uppercase leading-tight"
        >
          ТОЛЬКО<br />КАЧЕСТВО
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-[#0a0a0a] p-10 flex flex-col h-[380px] justify-between border border-transparent shadow-lg"
          >
            <Crosshair size={32} className="text-white mb-auto" weight="regular" />
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight text-white uppercase">ТОЧНОСТЬ</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Оптические сенсоры последнего поколения гарантируют регистрацию каждого миллиметра.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] p-10 flex flex-col h-[380px] justify-between border border-transparent shadow-lg"
          >
            <Lightning size={32} className="text-white mb-auto" weight="regular" />
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-4 tracking-tight text-white uppercase">ОТКЛИК</h3>
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
