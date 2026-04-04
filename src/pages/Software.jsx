import { DownloadSimple, SlidersHorizontal, AppleLogo, WindowsLogo } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export default function Software() {
  return (
    <div className="flex flex-col w-full relative min-h-screen bg-[#050505]">
      <section className="max-w-[1400px] mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
           <SlidersHorizontal size={48} className="mx-auto text-white mb-6" />
           <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase">Engine V2.0</h1>
           <p className="text-gray-400 max-w-xl mx-auto leading-relaxed text-lg mb-12">
             Полный контроль над устройствами Digital Tech. Создавайте макросы, настраивайте слои подсветки и обновляйте прошивки в пару кликов.
           </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
           <button className="flex-1 bg-white text-black p-6 flex flex-col items-start text-left hover:bg-gray-200 transition-all hover:scale-105 group relative overflow-hidden">
             <WindowsLogo size={24} weight="bold" className="mb-4 text-black" />
             <span className="font-bold uppercase tracking-widest text-sm">Скачать для Windows</span>
             <span className="text-gray-600 text-xs mt-1">Версия 2.4.1 • 135 MB</span>
             <DownloadSimple size={120} weight="thin" className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform" />
           </button>

           <button className="flex-1 bg-[#111] border border-white/5 text-white p-6 flex flex-col items-start text-left hover:bg-[#161616] transition-all hover:border-white/20 group relative overflow-hidden">
             <AppleLogo size={24} weight="bold" className="mb-4" />
             <span className="font-bold uppercase tracking-widest text-sm">Скачать для macOS</span>
             <span className="text-gray-500 text-xs mt-1">Apple Silicon / Intel (Beta)</span>
             <DownloadSimple size={120} weight="thin" className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform text-white" />
           </button>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-20 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-left">
           <div>
             <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Настраиваемые Слои (Layers)</h3>
             <p className="text-gray-400 text-sm">Переназначайте любую клавишу оборудования на уровне контроллера. Engine сохраняет ваши настройки прямо в память устройства, так что софт больше не нужно держать открытым.</p>
           </div>
           <div>
             <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">Студийный RGB-редактор</h3>
             <p className="text-gray-400 text-sm">Тончайшая настройка каждого диода. Создавайте собственные плавные градиентные заливки или используйте предустановленные турнирные профили.</p>
           </div>
        </motion.div>
      </section>
    </div>
  );
}
