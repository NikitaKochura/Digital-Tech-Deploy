import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass, User, ShoppingBag, List, X } from '@phosphor-icons/react';
import { useAppContext } from '../../context/AppContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setAuthModalOpen, setCartDrawerOpen, cart, isAdmin } = useAppContext();

  return (
    <motion.header 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 w-full z-50 glass-panel h-[72px] flex items-center justify-between px-8"
    >
      <div className="flex items-center space-x-8">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-400 hover:text-white transition-colors active:scale-95 flex md:hidden">
          {menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
        <Link to="/" className="text-xl font-light tracking-[0.3em] uppercase flex items-center space-x-3">
          <span>DIGITAL TECH</span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-10 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
        <Link to="/" className="hover:text-white transition-colors">Главная</Link>
        <Link to="/catalog" className="hover:text-white transition-colors">Каталог</Link>
        <Link to="/software" className="hover:text-white transition-colors">Центр загрузки</Link>
        {isAdmin && <Link to="/admin" className="hover:text-white text-white transition-colors border-b border-white pb-1">Терминал (Админ)</Link>}
      </nav>

      <div className="flex items-center space-x-6 text-gray-400">
        <button className="hover:text-white transition-colors active:scale-95"><MagnifyingGlass size={20} weight="bold" /></button>
        <button onClick={() => setAuthModalOpen(true)} className="hover:text-white transition-colors active:scale-95"><User size={20} weight="bold" /></button>
        <button onClick={() => setCartDrawerOpen(true)} className="hover:text-white transition-colors active:scale-95 relative">
          <ShoppingBag size={20} weight="bold" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center h-4 w-4 rounded-full bg-white text-black text-[10px] font-bold">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-100%", opacity: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-[72px] left-0 w-[400px] max-w-full h-[calc(100vh-72px)] glass-panel border-r border-t-0 p-10 flex flex-col space-y-8"
          >
            {[
              { name: 'Главная', path: '/' },
              { name: 'Каталог устройств', path: '/catalog' },
              { name: 'Центр загрузки ПО', path: '/software' },
              ...(isAdmin ? [{ name: 'Терминал (Админ)', path: '/admin' }] : [])
            ].map((item, i) => (
              <motion.div key={item.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}>
                <Link to={item.path} onClick={() => setMenuOpen(false)} className="text-3xl font-bold tracking-tighter hover:text-gray-400 transition-colors block">
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
