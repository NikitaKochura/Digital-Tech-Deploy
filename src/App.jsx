import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import CookieBanner from './components/Layout/CookieBanner';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Software from './pages/Software';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AuthModal from './components/Modals/AuthModal';
import CartDrawer from './components/Modals/CartDrawer';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col items-center max-w-[100vw] overflow-x-hidden bg-[#050505] text-white selection:bg-white selection:text-black">
        <Header />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/software" element={<Software />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
        <AuthModal />
        <CartDrawer />
      </div>
    </AppProvider>
  );
}

export default App;
