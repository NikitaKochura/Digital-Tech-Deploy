import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('dp_user');
    const savedToken = localStorage.getItem('dp_token');
    if (savedUser) {
      const u = JSON.parse(savedUser);
      setUser(u);
      setIsAdmin(u.role === 'admin');
    }
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Fetch orders when user logs in
  useEffect(() => {
    if (token && user && user.id) {
      fetchOrders();
    }
  }, [token, user]);

  const fetchOrders = async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch(err) { console.error('Failed to fetch orders:', err); }
  };

  const login = async (email, password) => {
    try {
      // Fallback for easy coursework testing
      if (email === 'admin') {
         const user = { email: 'admin', role: 'admin' };
         setUser(user); setIsAdmin(true);
         localStorage.setItem('dp_user', JSON.stringify(user));
         return { success: true };
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setUser(data.user);
      setToken(data.token);
      setIsAdmin(data.user.role === 'admin');
      localStorage.setItem('dp_user', JSON.stringify(data.user));
      localStorage.setItem('dp_token', data.token);
      return { success: true };
    } catch(err) { return { success: false, error: err.message }; }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      setUser(data.user);
      setToken(data.token);
      setIsAdmin(data.user.role === 'admin');
      localStorage.setItem('dp_user', JSON.stringify(data.user));
      localStorage.setItem('dp_token', data.token);
      return { success: true };
    } catch(err) { return { success: false, error: err.message }; }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    setOrders([]);
    localStorage.removeItem('dp_user');
    localStorage.removeItem('dp_token');
  };

  const addToCart = (product) => setCart(prev => [...prev, product]);
  const removeFromCart = (index) => setCart(prev => prev.filter((_, i) => i !== index));
  const clearCart = () => setCart([]);

  const createOrder = async (orderData) => {
    if (!token) return { success: false, error: 'Необходима авторизация' };
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      clearCart();
      await fetchOrders();
      return { success: true, orderId: data.orderId };
    } catch(err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, token, isAdmin, 
      login, register, logout, 
      cart, addToCart, removeFromCart, clearCart, 
      orders, createOrder, fetchOrders,
      authModalOpen, setAuthModalOpen, 
      cartDrawerOpen, setCartDrawerOpen 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
