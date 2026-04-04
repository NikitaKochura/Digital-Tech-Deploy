import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, saveProducts, CATEGORIES } from '../data';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', category: CATEGORIES[0], brand: '', price: '', description: '', inStock: true });

  useEffect(() => { setProducts(getProducts()); }, []);

  const handleSave = () => {
    if (!formData.name) return;
    let result = [...products];
    if (formData.id) {
       result = result.map(p => p.id === formData.id ? { ...formData, price: Number(formData.price), specs: p.specs, images: p.images } : p);
    } else {
       const newProduct = { ...formData, id: Date.now(), price: Number(formData.price), specs: {}, images: [`https://picsum.photos/seed/dp${Date.now()}/800/600`] };
       result.push(newProduct);
    }
    setProducts(result);
    saveProducts(result);
    setFormData({ id: '', name: '', category: CATEGORIES[0], brand: '', price: '', description: '', inStock: true });
  };

  const handleDelete = (id) => {
    const result = products.filter(p => p.id !== id);
    setProducts(result);
    saveProducts(result);
  };

  const startEdit = (p) => {
    setFormData({ id: p.id, name: p.name, category: p.category, brand: p.brand, price: p.price, description: p.description, inStock: p.inStock });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 pb-12 pt-32 min-h-screen">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-12 tracking-tighter uppercase"
      >
        Терминал Управления
      </motion.h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="xl:col-span-4 bg-[#0a0a0a] border border-white/10 p-8 shadow-2xl relative overflow-hidden h-fit"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-white" />
          <h2 className="text-xs font-bold mb-8 uppercase tracking-[0.2em] text-gray-500">{formData.id ? 'Редактировать запись' : 'Добавить позицию'}</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-2">Название</label>
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#111] border border-white/5 p-4 text-sm text-white focus:border-white outline-none transition-colors" />
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-2">Категория</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#111] border border-white/5 p-4 text-sm text-white focus:border-white outline-none appearance-none">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-2">Бренд</label>
                <input value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full bg-[#111] border border-white/5 p-4 text-sm text-white focus:border-white outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-2">Описание</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#111] border border-white/5 p-4 text-sm text-white resize-none h-24 focus:border-white outline-none leading-relaxed" />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-2">Цена (Руб)</label>
              <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#111] border border-white/5 p-4 text-sm text-white font-mono focus:border-white outline-none" />
            </div>
            
            <div className="flex items-center pt-2 pb-6 border-b border-white/5">
              <input type="checkbox" checked={formData.inStock} onChange={e => setFormData({...formData, inStock: e.target.checked})} id="inStock" className="w-4 h-4 mr-3 bg-[#111] border-white/10" />
              <label htmlFor="inStock" className="text-xs font-bold uppercase tracking-[0.1em] text-gray-400 cursor-pointer hover:text-white transition-colors">Товар в наличии</label>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={handleSave} 
              className="w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors"
            >
              {formData.id ? 'Обновить данные' : 'Записать в базу'}
            </motion.button>
            {formData.id && (
              <button 
                onClick={() => setFormData({ id: '', name: '', category: CATEGORIES[0], brand: '', price: '', description: '', inStock: true })} 
                className="w-full border border-white/10 text-gray-400 py-3 text-xs font-bold uppercase tracking-[0.2em] mt-3 hover:text-white hover:border-white/30 transition-colors"
              >
                Отмена
              </button>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="xl:col-span-8 bg-[#0a0a0a] border border-white/5 overflow-x-auto"
        >
          <table className="w-full text-left whitespace-nowrap min-w-[700px]">
            <thead className="border-b border-white/10">
              <tr>
                <th className="p-6 text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500 w-16">ID</th>
                <th className="p-6 text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500">Товар</th>
                <th className="p-6 text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500 w-32">Цена</th>
                <th className="p-6 text-[10px] tracking-[0.2em] font-bold uppercase text-gray-500 text-right w-40">Система</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {products.map(p => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0, opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, opacity: 0 }}
                    key={p.id} 
                    className="border-b border-white/5 hover:bg-[#111] transition-colors group"
                  >
                    <td className="p-6 text-gray-600 font-mono text-xs">{p.id.toString().slice(-4)}</td>
                    <td className="p-6">
                      <div className="font-medium text-gray-200">{p.name}</div>
                      <div className="flex items-center space-x-3 mt-1 text-[10px] uppercase tracking-widest">
                        <span className="text-gray-500">{p.category}</span>
                        <span className="text-white/20">•</span>
                        <span className={p.inStock ? 'text-green-500/70' : 'text-red-500/70'}>{p.inStock ? 'ОК' : 'ПУСТО'}</span>
                      </div>
                    </td>
                    <td className="p-6 font-mono text-sm tracking-tight">{p.price} ₽</td>
                    <td className="p-6 text-right space-x-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(p)} className="text-white hover:text-gray-400 uppercase text-[10px] font-bold tracking-[0.1em] border-b border-white/20 pb-1 transition-colors">Ред</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-400 uppercase text-[10px] font-bold tracking-[0.1em] border-b border-red-500/20 pb-1 transition-colors">Удал</button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {products.length === 0 && <div className="p-20 text-center text-gray-600 font-mono uppercase tracking-widest text-xs">База данных пуста</div>}
        </motion.div>
      </div>
    </div>
  );
}
