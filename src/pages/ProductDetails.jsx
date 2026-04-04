import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts } from '../data';
import { ShoppingBag, ArrowLeft } from '@phosphor-icons/react';
import { useAppContext } from '../context/AppContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const { addToCart, setCartDrawerOpen } = useAppContext();

  useEffect(() => {
    const p = getProducts().find(x => x.id === parseInt(id));
    if (p) {
      setProduct(p);
      setMainImage(p.images[0]);
    }
  }, [id]);

  if (!product) return <div className="min-h-screen pt-32 text-center text-gray-500 font-mono tracking-widest uppercase">Загрузка данных...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-20 min-h-screen pt-32 flex flex-col items-start lg:flex-row gap-16 lg:gap-24">
      
      <div className="w-full lg:w-7/12 flex flex-col gap-6">
        <Link to="/catalog" className="inline-flex items-center text-gray-500 hover:text-white transition-colors group mb-6">
          <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase text-[10px] tracking-[0.2em] font-bold">Назад в каталог</span>
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="bg-[#050505] border border-white/5 p-12 min-h-[600px] flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none opacity-50" />
          <AnimatePresence mode="wait">
            <motion.img 
              key={mainImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={mainImage} alt={product.name} 
              className="w-full max-w-2xl h-auto object-contain z-10 drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity mix-blend-lighten pointer-events-none" 
            />
          </AnimatePresence>
        </motion.div>

        {product.images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setMainImage(img)}
                className={`w-28 h-28 bg-[#050505] p-2 border transition-all shrink-0 ${mainImage === img ? 'border-white opacity-100' : 'border-white/10 opacity-50 hover:opacity-80'}`}
              >
                <img src={img} className="w-full h-full object-contain mix-blend-lighten pointer-events-none" alt="" />
              </button>
            ))}
          </div>
        )}
      </div>
        
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 20 }}
        className="w-full lg:w-5/12 flex flex-col justify-center pt-10 lg:pt-0 sticky top-32"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-gray-500 text-[10px] tracking-[0.25em] font-bold uppercase">{product.category}</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="text-white text-[10px] tracking-[0.25em] font-bold uppercase">{product.brand}</span>
        </div>
        
        <h1 className="text-4xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tighter text-white">{product.name}</h1>
        <p className="text-gray-400 text-base mb-12 leading-relaxed max-w-md">{product.description}</p>
        
        <div className="flex items-center justify-between mb-12 border-t border-b border-white/5 py-8">
          <span className="text-4xl font-mono tracking-tight text-white">{product.price.toLocaleString()} ₽</span>
          <span className={`text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 border ${product.inStock ? 'border-white/20 text-white' : 'border-red-500/30 text-red-500'}`}>
            {product.inStock ? 'В НАЛИЧИИ' : 'РАСПРОДАНО'}
          </span>
        </div>
        
        <motion.button 
          whileHover={{ scale: product.inStock ? 1.02 : 1 }}
          whileTap={{ scale: product.inStock ? 0.98 : 1 }}
          disabled={!product.inStock} 
          onClick={() => {
            addToCart(product);
            setCartDrawerOpen(true);
          }}
          className={`w-full py-6 uppercase tracking-[0.2em] text-xs font-bold flex items-center justify-center transition-colors bg-white text-black
            ${product.inStock ? 'hover:bg-gray-200' : 'opacity-30 cursor-not-allowed grayscale'}
          `}
        >
          <ShoppingBag size={18} weight="bold" className="mr-3" />
          Добавить в корзину
        </motion.button>
        
        <div className="mt-16 space-y-2">
          <h3 className="text-[10px] font-bold mb-6 uppercase tracking-[0.2em] text-gray-500">Технические Характеристики</h3>
          {Object.entries(product.specs).map(([key, val]) => (
            <div key={key} className="flex justify-between py-3 border-b border-white/5 text-sm group hover:border-white/20 transition-colors">
              <span className="text-gray-500 font-mono capitalize">{key}</span>
              <span className="font-medium text-gray-300 text-right">{val}</span>
            </div>
          ))}
          {Object.keys(product.specs).length === 0 && (
            <div className="text-gray-600 text-xs italic font-mono pt-4">Производитель не предоставил данные.</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
