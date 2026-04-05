import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, Truck, SignOut, User, Clock, Receipt } from '@phosphor-icons/react';

export default function Profile() {
  const { user, orders, fetchOrders, logout } = useAppContext();
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (!user || !user.id) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [user]);

  if (!user || !user.id) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Оформлен': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5';
      case 'В обработке': return 'text-blue-400 border-blue-400/30 bg-blue-400/5';
      case 'Доставлен': return 'text-green-400 border-green-400/30 bg-green-400/5';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/5';
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-20 min-h-screen pt-32">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-16"
      >
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
            <User size={28} weight="light" className="text-gray-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{user.name || user.email}</h1>
            <p className="text-gray-500 text-sm font-mono mt-1">{user.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-colors text-xs uppercase tracking-widest font-bold border border-white/5 px-6 py-3 hover:border-red-500/30">
          <SignOut size={16} /><span className="hidden sm:inline">Выйти</span>
        </button>
      </motion.div>

      {/* Orders */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center gap-4 mb-8">
          <Receipt size={20} className="text-gray-500" />
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">История заказов</h2>
          <span className="bg-white/5 text-gray-400 text-[10px] px-3 py-1 font-mono border border-white/5">{orders.length}</span>
        </div>

        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="border border-white/5 bg-[#0a0a0a] p-16 text-center"
          >
            <Package size={48} className="mx-auto text-gray-700 mb-4" />
            <p className="text-gray-600 text-sm tracking-widest uppercase">Заказов пока нет</p>
            <button onClick={() => navigate('/catalog')} className="mt-6 bg-white text-black px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-gray-200 transition-colors">
              Перейти в каталог
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border border-white/5 bg-[#0a0a0a] overflow-hidden"
              >
                {/* Order header */}
                <button 
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className="text-left">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-mono text-sm font-bold text-white">Заказ #{order.id}</span>
                        <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 border ${statusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} />
                          {formatDate(order.created_at)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          {order.delivery_type === 'pickup' ? <MapPin size={12} /> : <Truck size={12} />}
                          {order.delivery_type === 'pickup' ? 'Самовывоз' : 'Курьер'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xl font-bold">{order.total?.toLocaleString()} ₽</div>
                    <div className="text-[10px] text-gray-500 mt-1">{order.items?.length} товар(ов)</div>
                  </div>
                </button>

                {/* Expanded details */}
                <AnimatePresence>
                  {expandedOrder === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-white/5 pt-6 space-y-4">
                        {/* Delivery info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-[#111] p-4 border border-white/5">
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">Получатель</div>
                            <div className="text-sm text-white">{order.customer_name}</div>
                            <div className="text-xs text-gray-400 font-mono mt-1">{order.customer_phone}</div>
                          </div>
                          <div className="bg-[#111] p-4 border border-white/5">
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-2">
                              {order.delivery_type === 'pickup' ? 'Пункт выдачи' : 'Адрес доставки'}
                            </div>
                            <div className="text-sm text-white">
                              {order.delivery_type === 'pickup' ? order.pickup_point : order.delivery_address}
                            </div>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Товары</div>
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 bg-[#111] p-3 border border-white/5">
                            {item.image && (
                              <div className="w-12 h-12 bg-black flex-shrink-0 flex items-center justify-center p-1">
                                <img src={item.image} className="max-w-full max-h-full object-contain mix-blend-lighten" alt="" />
                              </div>
                            )}
                            <span className="flex-1 text-sm text-gray-300 truncate">{item.name}</span>
                            <span className="font-mono text-sm font-medium">{item.price?.toLocaleString()} ₽</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
