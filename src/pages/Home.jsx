import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Crosshair, Lightning, ShieldCheck } from '@phosphor-icons/react';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="flex flex-col relative w-full overflow-hidden" ref={containerRef}>
      
      {/* Оригинальная Главная Секция */}
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
            <div className="h-[1px] w-12 bg-white/50"></div>
            <span className="uppercase tracking-[0.3em] text-[10px] font-bold text-gray-400">Digital Tech Ecosystem</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6 uppercase leading-[0.9]"
          >
            Играй. <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Доминируй.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-400 text-lg md:text-xl font-light max-w-xl leading-relaxed mb-10"
          >
            Премиальные периферийные устройства для тех, кто не согласен на компромиссы. Высокоточные сенсоры, смазанные переключатели с завода и бескомпромиссный дизайн.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-6"
          >
            <Link to="/catalog" className="bg-white text-black px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gray-200 transition-colors flex items-center group shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Каталог
              <ArrowRight size={16} weight="bold" className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Индикаторы слайдера */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            <div className="w-8 h-1 bg-white cursor-pointer"></div>
            <div className="w-8 h-1 bg-white/20 hover:bg-white/50 transition-colors cursor-pointer"></div>
        </div>
      </section>

      {/* Бескомпромиссное качество Секция (аккуратно интегрирована ниже) */}
      <section className="relative z-20 bg-[#050505] px-8 md:px-20 py-24 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 text-white uppercase"
          >
            Бескомпромиссное<br/>качество.
          </motion.h2>
          
          <div className="w-full h-[2px] bg-red-600 mb-12 shadow-[0_0_20px_rgba(220,38,38,0.5)]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-[#0a0a0a] border border-white/5 p-10 flex flex-col group hover:border-white/20 hover:bg-[#0c0c0c] transition-all h-[320px]"
            >
              <Crosshair size={32} className="text-white mb-auto" />
              <div>
                 <h3 className="text-xl font-bold mb-4 tracking-tight text-white uppercase">Хирургическая точность</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">Оптические сенсоры последнего поколения Pixart гарантируют регистрацию каждого миллиметра.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-[#0a0a0a] border border-white/5 p-10 flex flex-col group hover:border-white/20 hover:bg-[#0c0c0c] transition-all h-[320px]"
            >
              <Lightning size={32} className="text-white mb-auto" />
              <div>
                 <h3 className="text-xl font-bold mb-4 tracking-tight text-white uppercase">Молниеносный отклик</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">Собственные переключатели с ходом до срабатывания в 1мм обеспечивают минимально возможную задержку.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="bg-[#0a0a0a] border border-white/5 p-10 flex flex-col group hover:border-white/20 hover:bg-[#0c0c0c] transition-all h-[320px]"
            >
              <ShieldCheck size={32} className="text-white mb-auto" />
              <div>
                 <h3 className="text-xl font-bold mb-4 tracking-tight text-white uppercase">Монолитная конструкция</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">Толстый PBT пластик, шумоизоляция на уровне корпуса и смазанные с завода стабилизаторы.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
