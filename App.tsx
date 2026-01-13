
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { UserRole, Medicine, CartItem } from './types';
import CustomerHome from './components/CustomerHome';
import ChemistHome from './components/ChemistHome';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import { ShoppingCart, LayoutDashboard, User, LogOut, PackageSearch, Store, Leaf } from 'lucide-react';

type AppView = 'landing' | 'auth' | 'roleSelection' | 'app';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [role, setRole] = useState<UserRole | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (medicine: Medicine) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === medicine.id);
      if (existing) {
        return prev.map(i => i.id === medicine.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  const logout = () => {
    setView('landing');
    setRole(null);
  };

  if (view === 'landing') {
    return <LandingPage onAuthStart={() => setView('auth')} />;
  }

  if (view === 'auth') {
    return <AuthPage onAuthComplete={() => setView('roleSelection')} />;
  }

  if (view === 'roleSelection') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-12 space-y-4 animate-in fade-in slide-in-from-top-8 duration-700">
          <div className="bg-emerald-600 w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-emerald-200">
            <Leaf className="text-white w-12 h-12" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Welcome to The Herb</h1>
          <p className="text-slate-500 text-lg">Tell us how you'll be using the platform today.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <button 
            onClick={() => { setRole(UserRole.CUSTOMER); setView('app'); }}
            className="group relative bg-white border-2 border-emerald-100 hover:border-emerald-500 rounded-[50px] p-12 transition-all duration-500 shadow-xl hover:shadow-emerald-100 flex flex-col items-center gap-6"
          >
            <div className="bg-emerald-100 p-8 rounded-3xl group-hover:bg-emerald-500 transition-colors">
              <PackageSearch className="w-16 h-16 text-emerald-600 group-hover:text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-800 mb-2 leading-tight">I'm a Patient</h2>
              <p className="text-slate-500 leading-relaxed font-medium">Order medicines and wellness products from local shops.</p>
            </div>
            <div className="text-emerald-600 font-bold text-lg group-hover:translate-x-2 transition-transform">Start Shopping &rarr;</div>
          </button>

          <button 
            onClick={() => { setRole(UserRole.CHEMIST); setView('app'); }}
            className="group relative bg-white border-2 border-sky-100 hover:border-sky-500 rounded-[50px] p-12 transition-all duration-500 shadow-xl hover:shadow-sky-100 flex flex-col items-center gap-6"
          >
            <div className="bg-sky-100 p-8 rounded-3xl group-hover:bg-sky-500 transition-colors">
              <Store className="w-16 h-16 text-sky-600 group-hover:text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black text-slate-800 mb-2 leading-tight">I'm a Chemist</h2>
              <p className="text-slate-500 leading-relaxed font-medium">Manage stock, scan box packaging, and trade with peers.</p>
            </div>
            <div className="text-sky-600 font-bold text-lg group-hover:translate-x-2 transition-transform">Dashboard Admin &rarr;</div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className={`min-h-screen flex flex-col ${role === UserRole.CUSTOMER ? 'bg-emerald-50' : 'bg-sky-50'}`}>
        <Header role={role!} cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} onLogout={logout} />
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 pb-24">
          <Routes>
            <Route path="/" element={role === UserRole.CUSTOMER ? <CustomerHome addToCart={addToCart} /> : <ChemistHome />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Nav role={role!} />
      </div>
    </HashRouter>
  );
};

const Header: React.FC<{ role: UserRole, cartCount: number, onLogout: () => void }> = ({ role, cartCount, onLogout }) => (
  <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${role === UserRole.CUSTOMER ? 'bg-emerald-50/80 border-emerald-100' : 'bg-sky-50/80 border-sky-100'} px-4 py-4`}>
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-xl ${role === UserRole.CUSTOMER ? 'bg-emerald-600 shadow-emerald-200' : 'bg-sky-600 shadow-sky-200'} shadow-lg`}>
          <Leaf className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-black tracking-tight text-slate-900">The Herb <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase ml-2 ${role === UserRole.CUSTOMER ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}`}>{role === UserRole.CUSTOMER ? 'Patient' : 'Chemist'}</span></span>
      </div>
      <div className="flex items-center gap-4">
        {role === UserRole.CUSTOMER && (
          <button className="relative p-2 hover:bg-emerald-100 rounded-full transition-colors group">
            <ShoppingCart className="w-6 h-6 text-emerald-700" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">{cartCount}</span>}
          </button>
        )}
        <button onClick={onLogout} className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500 group">
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
);

const Nav: React.FC<{ role: UserRole }> = ({ role }) => (
  <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 rounded-[32px] border shadow-2xl px-10 py-4 flex items-center gap-12 backdrop-blur-xl z-50 ${role === UserRole.CUSTOMER ? 'bg-emerald-950/90 border-emerald-800 shadow-emerald-900/40' : 'bg-sky-950/90 border-sky-800 shadow-sky-900/40'}`}>
    <Link to="/" className="flex flex-col items-center gap-1 text-white hover:scale-110 transition-transform">
      <LayoutDashboard className="w-6 h-6" />
      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Home</span>
    </Link>
    <Link to="/orders" className="flex flex-col items-center gap-1 text-white/60 hover:text-white hover:scale-110 transition-transform">
      <ShoppingCart className="w-6 h-6" />
      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{role === UserRole.CUSTOMER ? 'Cart' : 'Sales'}</span>
    </Link>
    <Link to="/profile" className="flex flex-col items-center gap-1 text-white/60 hover:text-white hover:scale-110 transition-transform">
      <User className="w-6 h-6" />
      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">You</span>
    </Link>
  </nav>
);

export default App;
