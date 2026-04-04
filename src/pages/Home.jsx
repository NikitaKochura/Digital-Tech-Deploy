import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Crosshair, Lightning, ShieldCheck, CaretLeft, CaretRight } from '@phosphor-icons/react';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="flex flex-col relative w-full bg-[#050505] min-h-screen font-sans" ref={containerRef}>
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-8 md:px-20 pt-32 overflow-hidden">
        <motion.div 
          style={{ y: y1 }}
          className="relative z-20 w-full md:w-1/2 flex flex-col pt-10 md:pr-10"
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

        {/* Hero Video Background */}
        <motion.video 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-3/4 lg:w-2/3 max-w-6xl h-auto object-cover opacity-60 pointer-events-none mix-blend-lighten z-10"
        />
      </section>

      {/* 2. CAROUSEL SECTION */}
      <section className="relative z-20 px-4 md:px-12 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-[1800px] mx-auto bg-gradient-to-r from-[#9ca3af] to-[#d1d5db] rounded-[24px] md:rounded-[40px] overflow-hidden flex flex-col-reverse md:flex-row items-center relative min-h-[500px] md:min-h-[700px] px-8 md:px-20 shadow-2xl"
        >
          <div className="relative z-20 w-full md:w-1/2 flex flex-col py-16 md:py-0">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-8 leading-[1.1] max-w-xl drop-shadow-md">
              Превосходное качество сборки и исключительный комфорт
            </h2>
            <div>
              <button className="border border-blue-400 text-white rounded-full px-8 py-3 text-sm hover:bg-blue-400/20 transition-colors bg-white/10 backdrop-blur-sm">
                Показать ещё
              </button>
            </div>
          </div>
          
          <div className="relative z-10 w-full md:w-1/2 h-full flex items-center justify-center min-h-[300px]">
             <img src="/images/headset_pro_1775225554646.png" className="w-full max-w-[600px] object-contain drop-shadow-2xl scale-125 md:scale-150 transform md:-translate-y-10" alt="Headset" />
          </div>

          {/* Navigation Arrows */}
          <button className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-30">
            <CaretLeft size={48} weight="light" />
          </button>
          <button className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-30">
            <CaretRight size={48} weight="light" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-800 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-800 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-800 rounded-full"></div>
          </div>
        </motion.div>
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
          {/* Card 1 */}
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

          {/* Card 2 */}
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

          {/* Card 3 */}
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
