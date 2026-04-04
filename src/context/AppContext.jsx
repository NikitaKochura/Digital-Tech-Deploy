import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('dp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAdmin(JSON.parse(savedUser).role === 'admin');
    }
  }, []);

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
      setIsAdmin(data.user.role === 'admin');
      localStorage.setItem('dp_user', JSON.stringify(data.user));
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
      setIsAdmin(data.user.role === 'admin');
      localStorage.setItem('dp_user', JSON.stringify(data.user));
      return { success: true };
    } catch(err) { return { success: false, error: err.message }; }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('dp_user');
  };

  const addToCart = (product) => setCart([...cart, product]);
  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ user, isAdmin, login, register, logout, cart, addToCart, clearCart, authModalOpen, setAuthModalOpen, cartDrawerOpen, setCartDrawerOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
