import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash, MapPin, Truck, Package, User, Phone, NavigationArrow, CheckCircle } from '@phosphor-icons/react';
import { useAppContext } from '../../context/AppContext';
import { useState } from 'react';

const PICKUP_POINTS = [
  { id: 1, name: 'ТРЦ «Галерея Краснодар»', address: 'ул. Уральская, 79/1' },
  { id: 2, name: 'ТРЦ «OZ Mall»', address: 'ул. Крылатская, 2' },
  { id: 3, name: 'ТРЦ «Красная Площадь»', address: 'ул. Дзержинского, 100' },
  { id: 4, name: 'ТЦ «СБС Мегамолл»', address: 'ул. Уральская, 98/11' },
  { id: 5, name: 'ТРЦ «Мега Адыгея»', address: 'Тургеневское шоссе, 27' },
];

export default function CartDrawer() {
  const { cartDrawerOpen, setCartDrawerOpen, cart, removeFromCart, clearCart, user, setAuthModalOpen, createOrder } = useAppContext();
  const [step, setStep] = useState('cart'); // cart | delivery | confirm | success
  const [deliveryType, setDeliveryType] = useState('');
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [courierAddress, setCourierAddress] = useState('');
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!cartDrawerOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const resetForm = () => {
    setStep('cart');
    setDeliveryType('');
    setSelectedPickup(null);
    setCustomerName('');
    setCustomerPhone('');
    setCourierAddress('');
    setError('');
    setOrderId(null);
  };

  const handleClose = () => {
    setCartDrawerOpen(false);
    if (step === 'success') resetForm();
  };

  const handleProceedToDelivery = () => {
    if (!user || !user.id) {
      setCartDrawerOpen(false);
      setAuthModalOpen(true);
      return;
    }
    setError('');
    setStep('delivery');
    // Pre-fill name from user
    if (user.name && !customerName) setCustomerName(user.name);
  };

  const handleProceedToConfirm = () => {
    setError('');
    
    if (!customerName || customerName.trim().length < 2) {
      setError('Введите ФИО (минимум 2 символа)'); return;
    }
    const cleanPhone = customerPhone.replace(/[\s\-()]/g, '');
    if (!cleanPhone || !/^\+?\d{10,12}$/.test(cleanPhone)) {
      setError('Введите корректный номер телефона (10-12 цифр)'); return;
    }
    if (!deliveryType) {
      setError('Выберите способ доставки'); return;
    }
    if (deliveryType === 'pickup' && !selectedPickup) {
      setError('Выберите пункт выдачи'); return;
    }
    if (deliveryType === 'courier' && (!courierAddress || courierAddress.trim().length < 5)) {
      setError('Введите адрес доставки (минимум 5 символов)'); return;
    }
    
    setStep('confirm');
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    setError('');

    const orderData = {
      items: cart.map(item => ({ id: item.id, name: item.name, price: item.price, image: item.images?.[0] || '' })),
      total,
      delivery_type: deliveryType,
      delivery_address: deliveryType === 'courier' ? courierAddress : null,
      pickup_point: deliveryType === 'pickup' ? PICKUP_POINTS.find(p => p.id === selectedPickup)?.name + ' — ' + PICKUP_POINTS.find(p => p.id === selectedPickup)?.address : null,
      customer_name: customerName.trim(),
      customer_phone: customerPhone.trim(),
    };

    const result = await createOrder(orderData);
    setLoading(false);

    if (result.success) {
      setOrderId(result.orderId);
      setStep('success');
    } else {
      setError(result.error || 'Ошибка при оформлении заказа');
      setStep('delivery');
    }
  };

  const renderCart = () => (
    <>
      <div className="flex-1 overflow-y-auto p-8 space-y-4">
        {cart.length > 0 ? cart.map((item, i) => (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} key={i} className="flex gap-4 items-center bg-[#111] p-4 border border-white/5 group">
            <div className="w-20 h-20 bg-black flex-shrink-0 flex items-center justify-center p-2">
              <img src={item.images?.[0]} className="max-w-full max-h-full object-contain filter grayscale mix-blend-lighten" alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium mb-1 leading-tight truncate">{item.name}</div>
              <div className="text-sm text-gray-400 font-mono">{item.price?.toLocaleString()} ₽</div>
            </div>
            <button onClick={() => removeFromCart(i)} className="p-2 text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"><Trash size={18}/></button>
          </motion.div>
        )) : (
          <div className="h-full flex items-center justify-center text-gray-600 text-xs tracking-[0.2em] uppercase">Корзина пуста</div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="p-8 border-t border-white/5 bg-[#050505]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500 text-xs uppercase tracking-widest">Итого:</span>
            <span className="font-mono text-3xl font-bold">{total.toLocaleString()} ₽</span>
          </div>
          <div className="flex gap-4">
            <button onClick={clearCart} className="p-5 bg-[#111] hover:bg-red-500/20 text-red-500 transition-colors border border-white/5"><Trash size={22}/></button>
            <button onClick={handleProceedToDelivery} className="flex-1 bg-white text-black py-5 uppercase font-bold text-xs tracking-widest flex justify-center items-center gap-3 hover:bg-gray-200 transition-colors">
              <Package size={20} weight="bold" /> Оформить заказ
            </button>
          </div>
          {!user && (
            <p className="text-center text-gray-500 text-[10px] mt-4 tracking-wider uppercase">Для оформления заказа необходима авторизация</p>
          )}
        </div>
      )}
    </>
  );

  const renderDelivery = () => (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="flex-1 overflow-y-auto p-8 space-y-6">
      <button onClick={() => { setStep('cart'); setError(''); }} className="text-gray-500 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors">← Назад в корзину</button>
      
      <h3 className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">Данные получателя</h3>
      
      {error && <div className="text-red-500 text-xs font-bold tracking-widest bg-red-500/10 p-4 border border-red-500/20">{error}</div>}

      <div className="space-y-4">
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="ФИО *" value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full bg-[#111] border border-white/5 focus:border-white/20 pl-12 pr-4 py-4 text-sm outline-none text-white transition-colors" />
        </div>
        <div className="relative">
          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="tel" placeholder="Телефон * (+7XXXXXXXXXX)" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} className="w-full bg-[#111] border border-white/5 focus:border-white/20 pl-12 pr-4 py-4 text-sm outline-none text-white transition-colors font-mono" />
        </div>
      </div>

      <h3 className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold pt-4">Способ доставки</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => { setDeliveryType('pickup'); setCourierAddress(''); }}
          className={`p-5 border text-center transition-all ${deliveryType === 'pickup' ? 'border-white bg-white/5 text-white' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
        >
          <MapPin size={28} className="mx-auto mb-3" weight={deliveryType === 'pickup' ? 'fill' : 'regular'} />
          <span className="text-[10px] uppercase tracking-widest font-bold block">Самовывоз</span>
          <span className="text-[10px] text-gray-500 mt-1 block">Бесплатно</span>
        </button>
        <button 
          onClick={() => { setDeliveryType('courier'); setSelectedPickup(null); }}
          className={`p-5 border text-center transition-all ${deliveryType === 'courier' ? 'border-white bg-white/5 text-white' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
        >
          <Truck size={28} className="mx-auto mb-3" weight={deliveryType === 'courier' ? 'fill' : 'regular'} />
          <span className="text-[10px] uppercase tracking-widest font-bold block">Курьер</span>
          <span className="text-[10px] text-gray-500 mt-1 block">По Краснодару</span>
        </button>
      </div>

      {deliveryType === 'pickup' && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Пункты выдачи (Краснодар)</h4>
          {PICKUP_POINTS.map(point => (
            <button 
              key={point.id}
              onClick={() => setSelectedPickup(point.id)}
              className={`w-full text-left p-4 border transition-all flex items-start gap-3 ${selectedPickup === point.id ? 'border-white bg-white/5' : 'border-white/5 hover:border-white/20 bg-[#111]'}`}
            >
              <NavigationArrow size={16} className={`mt-0.5 flex-shrink-0 ${selectedPickup === point.id ? 'text-white' : 'text-gray-600'}`} weight={selectedPickup === point.id ? 'fill' : 'regular'} />
              <div>
                <div className="text-sm font-medium">{point.name}</div>
                <div className="text-xs text-gray-500 mt-1">{point.address}</div>
              </div>
            </button>
          ))}
        </motion.div>
      )}

      {deliveryType === 'courier' && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Адрес доставки</h4>
          <div className="relative">
            <NavigationArrow size={16} className="absolute left-4 top-4 text-gray-500" />
            <textarea 
              placeholder="Улица, дом, квартира *" 
              value={courierAddress} 
              onChange={e => setCourierAddress(e.target.value)} 
              rows={3}
              className="w-full bg-[#111] border border-white/5 focus:border-white/20 pl-12 pr-4 py-4 text-sm outline-none text-white transition-colors resize-none"
            />
          </div>
        </motion.div>
      )}

      {deliveryType && (
        <motion.button 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          onClick={handleProceedToConfirm}
          className="w-full bg-white text-black py-5 uppercase font-bold text-xs tracking-widest hover:bg-gray-200 transition-colors mt-4"
        >
          Подтвердить заказ
        </motion.button>
      )}
    </motion.div>
  );

  const renderConfirm = () => {
    const pickupInfo = selectedPickup ? PICKUP_POINTS.find(p => p.id === selectedPickup) : null;
    return (
      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="flex-1 overflow-y-auto p-8 space-y-6">
        <button onClick={() => setStep('delivery')} className="text-gray-500 hover:text-white text-[10px] uppercase tracking-widest font-bold transition-colors">← Изменить данные</button>
        
        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-400 font-bold">Подтверждение заказа</h3>

        {error && <div className="text-red-500 text-xs font-bold tracking-widest bg-red-500/10 p-4 border border-red-500/20">{error}</div>}

        <div className="bg-[#111] border border-white/5 p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Получатель:</span>
            <span className="font-medium">{customerName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Телефон:</span>
            <span className="font-mono">{customerPhone}</span>
          </div>
          <div className="border-t border-white/5 pt-4 flex justify-between text-sm">
            <span className="text-gray-500">Доставка:</span>
            <span className="font-medium">{deliveryType === 'pickup' ? 'Самовывоз' : 'Курьер'}</span>
          </div>
          {deliveryType === 'pickup' && pickupInfo && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Пункт:</span>
              <span className="font-medium text-right max-w-[200px]">{pickupInfo.name}<br/><span className="text-gray-500 text-xs">{pickupInfo.address}</span></span>
            </div>
          )}
          {deliveryType === 'courier' && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Адрес:</span>
              <span className="font-medium text-right max-w-[200px]">{courierAddress}</span>
            </div>
          )}
          <div className="border-t border-white/5 pt-4">
            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Товары ({cart.length})</div>
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-1">
                <span className="text-gray-400 truncate max-w-[220px]">{item.name}</span>
                <span className="font-mono text-white">{item.price?.toLocaleString()} ₽</span>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-4 flex justify-between">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">Итого:</span>
            <span className="font-mono text-2xl font-bold">{total.toLocaleString()} ₽</span>
          </div>
        </div>

        <button 
          onClick={handleSubmitOrder}
          disabled={loading}
          className="w-full bg-white text-black py-5 uppercase font-bold text-xs tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? 'Оформляем...' : `Оплатить ${total.toLocaleString()} ₽`}
        </button>
      </motion.div>
    );
  };

  const renderSuccess = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
        <CheckCircle size={80} weight="fill" className="text-green-500 mb-6" />
      </motion.div>
      <h3 className="text-2xl font-bold mb-3">Заказ оформлен!</h3>
      <p className="text-gray-400 text-sm mb-2">Номер заказа: <span className="font-mono text-white font-bold">#{orderId}</span></p>
      <p className="text-gray-500 text-xs mb-8">Информация о заказе доступна в вашем профиле</p>
      <button onClick={handleClose} className="bg-white text-black px-10 py-4 uppercase font-bold text-xs tracking-widest hover:bg-gray-200 transition-colors">
        Закрыть
      </button>
    </motion.div>
  );

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
            <h2 className="text-xl font-bold tracking-[0.2em] uppercase">
              {step === 'cart' && 'Корзина'}
              {step === 'delivery' && 'Оформление'}
              {step === 'confirm' && 'Подтверждение'}
              {step === 'success' && 'Готово'}
            </h2>
            <button onClick={handleClose} className="text-gray-500 hover:text-white transition-colors"><X size={24}/></button>
          </div>

          {step === 'cart' && renderCart()}
          {step === 'delivery' && renderDelivery()}
          {step === 'confirm' && renderConfirm()}
          {step === 'success' && renderSuccess()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
