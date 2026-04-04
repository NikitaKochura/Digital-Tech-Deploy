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

  const login = (email, password) => {
    // mock login logic
    const role = email === 'admin' ? 'admin' : 'user';
    const newUser = { email, role };
    setUser(newUser);
    setIsAdmin(role === 'admin');
    localStorage.setItem('dp_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('dp_user');
  };

  const addToCart = (product) => setCart([...cart, product]);
  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{ user, isAdmin, login, logout, cart, addToCart, clearCart, authModalOpen, setAuthModalOpen, cartDrawerOpen, setCartDrawerOpen }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
