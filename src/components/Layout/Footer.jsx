import { Link } from 'react-router-dom';
import { EnvelopeSimple, ArrowRight } from '@phosphor-icons/react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 pt-20 pb-10 px-8 md:px-20 mt-auto z-10 relative">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

        <div className="md:col-span-4 flex flex-col">
          <h2 className="text-xl font-light tracking-[0.3em] uppercase mb-16 text-white">DIGITAL TECH</h2>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <h3 className="text-white font-bold mb-4">Навигация</h3>
          <Link to="/catalog" className="text-gray-500 text-sm hover:text-white transition-colors">Каталог устройств</Link>
          <Link to="/software" className="text-gray-500 text-sm hover:text-white transition-colors">Центр загрузки</Link>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <h3 className="text-white font-bold mb-4">Компания</h3>
          <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">Магазин</a>
          <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">О нас</a>
        </div>

        <div className="md:col-span-4 flex flex-col md:items-end text-left md:text-right">
          <h3 className="text-white font-bold mb-4">Служба поддержки</h3>
          <a href="mailto:opusgang@gmail.com" className="text-gray-500 text-sm hover:text-white transition-colors mb-4">opusgang@gmail.com</a>
          <p className="text-gray-500 text-xs mb-8 leading-relaxed">
            Рабочее время: 10:00-18:00<br />
            Понедельник-Пятница GMT+3<br />
            ВКонтакте: <a href="https://vk.com/id501932963" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">Связаться в ЛС</a>
          </p>

          <div className="flex flex-col gap-3 md:items-end mb-8">
            <Link to="/privacy" className="text-white text-xs hover:text-gray-300 transition-colors">Политика конфиденциальности</Link>
            <Link to="/terms" className="text-white text-xs hover:text-gray-300 transition-colors">Пользовательское соглашение</Link>
          </div>

          <div className="w-full max-w-xs mt-auto">
            <h4 className="text-gray-400 text-xs mb-3">Подпишись на важные новости</h4>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#111] border border-white/10 py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-white/40 transition-colors"
              />
              <button className="absolute right-0 top-0 h-full px-4 text-gray-500 group-focus-within:text-white hover:text-white transition-colors">
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
            <p className="text-[10px] text-gray-600 mt-3 leading-tight">
              Подписываясь на рассылку, вы соглашаетесь с условиями <Link to="/privacy" className="text-blue-500 hover:text-blue-400 underline transition-colors">политики конфиденциальности</Link>
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em]">© 2026 DIGITAL TECH. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
        <p className="text-gray-600 text-[10px] uppercase tracking-widest hidden md:block">«DIGITAL TECH»</p>
      </div>
    </footer>
  );
}
