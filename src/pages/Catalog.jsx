import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, CATEGORIES } from '../data';
import { MagnifyingGlass, Funnel } from '@phosphor-icons/react';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');

  useEffect(() => { getProducts().then(setProducts); }, []);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category) result = result.filter(p => p.category === category);
    if (sort === 'priceAsc') result.sort((a, b) => a.price - b.price);
    if (sort === 'priceDesc') result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, search, category, sort]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 pb-20 pt-32 min-h-[100dvh]">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
      >
        <div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">Оборудование.</h1>
          <p className="text-gray-400 max-w-md text-sm leading-relaxed">Высокоточные инструменты для достижения абсолютного превосходства.</p>
        </div>
        
        <div className="flex bg-[#111] p-1 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] rounded-sm h-12 w-full md:w-96 relative">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Поиск по арсеналу..." 
            className="w-full bg-transparent pl-12 pr-4 text-sm focus:outline-none text-white placeholder:text-gray-600"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </motion.div>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
          className="w-full lg:w-56 flex-shrink-0 space-y-10"
        >
          <div>
            <div className="flex items-center space-x-2 mb-5 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <Funnel size={14} /> <span>Категории</span>
            </div>
            <div className="flex flex-col space-y-1">
              <button onClick={() => setCategory('')} className={`text-left text-sm py-2 px-3 transition-colors ${!category ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>ВСЕ КАТЕГОРИИ</button>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)} className={`text-left text-sm py-2 px-3 transition-colors ${category === c ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>{c.toUpperCase()}</button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">Сортировка</h3>
            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)}
              className="w-full bg-[#111] border border-white/5 p-3 text-sm text-gray-300 outline-none appearance-none cursor-pointer"
            >
              <option value="newest">Новинки</option>
              <option value="priceAsc">Сначала дешевые</option>
              <option value="priceDesc">Сначала дорогие</option>
            </select>
          </div>
        </motion.div>
        
        <motion.div 
          layout
          className="flex-grow grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((p, i) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 20 }}
              >
                <Link to={`/product/${p.id}`} className="group block h-full bg-[#111] hover:bg-[#161616] p-6 border border-white/5 hover:border-white/20 transition-all duration-500">
                  <div className="relative aspect-square mix-blend-lighten overflow-hidden mb-8">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      src={p.images[0]} alt={p.name} className="w-full h-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                    />
                    {!p.inStock && (
                      <div className="absolute top-0 right-0 bg-white text-black text-[10px] px-2 py-1 font-bold tracking-widest uppercase">Sold Out</div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-mono">{p.brand}</span>
                    <h3 className="text-lg font-medium text-gray-200 mb-4 tracking-tight leading-snug">{p.name}</h3>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-mono">{p.price.toLocaleString()} ₽</span>
                      <span className="text-xs uppercase tracking-widest font-bold text-gray-600 group-hover:text-white transition-colors">Смотреть &rarr;</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredProducts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-32 text-center text-gray-500">
              Нет данных, удовлетворяющих запросу.
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
