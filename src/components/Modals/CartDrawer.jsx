import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Trash } from '@phosphor-icons/react';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';

export default function CartDrawer() {
  const { cartDrawerOpen, setCartDrawerOpen, cart, clearCart } = useAppContext();
  const [paymentMode, setPaymentMode] = useState(false);
  const [card, setCard] = useState('');
  const [exp, setExp] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState('');
  
  if (!cartDrawerOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    // Basic validation
    if (card.length < 16) {
      setError('Номер карты должен содержать 16 цифр!'); return;
    }
    if (!/^\d{2}\/\d{2}$/.test(exp)) {
      setError('Срок действия должен быть в формате MM/YY!'); return;
    }
    if (cvc.length !== 3) {
      setError('CVC должен содержать 3 цифры!'); return;
    }
    
    setError('');
    clearCart();
    setPaymentMode(false);
    setCartDrawerOpen(false);
    alert("Оплата прошла успешно! Заказ оформлен.");
    setCard(''); setExp(''); setCvc('');
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex justify-end bg-black/80 backdrop-blur-md"
      >
        <motion.div 
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-[#0a0a0a] border-l border-white/10 w-full max-w-lg h-full flex flex-col shadow-2xl relative"
        >
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-xl font-bold tracking-[0.2em] uppercase">Корзина</h2>
            <button onClick={() => { setCartDrawerOpen(false); setPaymentMode(false); }} className="text-gray-500 hover:text-white transition-colors"><X size={24}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-4">
            {paymentMode ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                 <h3 className="tracking-widest uppercase text-xs mb-4 text-gray-400">Оплата заказа</h3>
                 
                 {error && <div className="text-red-500 text-xs font-bold tracking-widest bg-red-500/10 p-4 border border-red-500/20">{error}</div>}

                 <div className="bg-[#111] p-6 border border-white/5 space-y-6">
                    <input type="text" maxLength="16" placeholder="Номер карты (16 цифр)" value={card} onChange={e => setCard(e.target.value)} className="w-full bg-transparent border-b border-white/10 pb-3 text-sm outline-none text-white focus:border-white transition-colors font-mono" />
                    <div className="flex gap-6">
                      <input type="text" maxLength="5" placeholder="MM/YY" value={exp} onChange={e => setExp(e.target.value)} className="w-1/2 bg-transparent border-b border-white/10 pb-3 text-sm outline-none text-white focus:border-white transition-colors font-mono" />
                      <input type="password" maxLength="3" placeholder="CVC" value={cvc} onChange={e => setCvc(e.target.value)} className="w-1/2 bg-transparent border-b border-white/10 pb-3 text-sm outline-none text-white focus:border-white transition-colors font-mono" />
                    </div>
                 </div>
                 <button 
                  onClick={handleCheckout} 
                  className="w-full bg-white text-black py-5 uppercase font-bold text-xs tracking-widest hover:bg-gray-200 transition-colors"
                 >
                   Оплатить {total.toLocaleString()} ₽
                 </button>
                 <button onClick={() => setPaymentMode(false)} className="w-full text-center text-gray-500 hover:text-white tracking-widest uppercase text-xs font-bold mt-4">Назад в корзину</button>
              </motion.div>
            ) : cart.length > 0 ? (
              <>
                {cart.map((item, i) => (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} key={i} className="flex gap-6 items-center bg-[#111] p-4 border border-white/5">
                    <div className="w-20 h-20 bg-black flex-shrink-0 flex items-center justify-center p-2">
                       <img src={item.images[0]} className="max-w-full max-h-full object-contain filter grayscale mix-blend-lighten" alt="" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium mb-2 leading-tight">{item.name}</div>
                      <div className="text-sm text-gray-400 font-mono">{item.price.toLocaleString()} ₽</div>
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-600 text-xs tracking-[0.2em] uppercase">Корзина пуста</div>
            )}
          </div>
          
          {!paymentMode && cart.length > 0 && (
            <div className="p-8 border-t border-white/5 bg-[#050505]">
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-500 text-xs uppercase tracking-widest">Итого:</span>
                <span className="font-mono text-3xl font-bold">{total.toLocaleString()} ₽</span>
              </div>
              <div className="flex gap-4">
                <button onClick={clearCart} className="p-5 bg-[#111] hover:bg-red-500/20 text-red-500 transition-colors border border-white/5"><Trash size={22}/></button>
                <button onClick={() => setPaymentMode(true)} className="flex-1 bg-white text-black py-5 uppercase font-bold text-xs tracking-widest flex justify-center items-center gap-3 hover:bg-gray-200 transition-colors">
                  <CreditCard size={20} /> Оформить заказ
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
