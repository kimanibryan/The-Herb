
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { UserRole, Medicine, CartItem } from './types';
import CustomerHome from './components/CustomerHome';
import ChemistHome from './components/ChemistHome';
import { ShoppingCart, LayoutDashboard, User, LogOut, PackageSearch, Store } from 'lucide-react';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const toggleRole = () => {
    setRole(prev => prev === UserRole.CUSTOMER ? UserRole.CHEMIST : UserRole.CUSTOMER);
  };

  const addToCart = (medicine: Medicine) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === medicine.id);
      if (existing) {
        return prev.map(i => i.id === medicine.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  if (!role) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">PharmaConnect</h1>
          <p className="text-slate-500 text-lg">Your neighborhood digital pharmacy and stock manager.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <button 
            onClick={() => setRole(UserRole.CUSTOMER)}
            className="group relative bg-white border-2 border-emerald-100 hover:border-emerald-500 rounded-3xl p-10 transition-all duration-300 shadow-xl hover:shadow-emerald-100 flex flex-col items-center gap-6"
          >
            <div className="bg-emerald-100 p-6 rounded-2xl group-hover:bg-emerald-500 transition-colors">
              <PackageSearch className="w-16 h-16 text-emerald-600 group-hover:text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Order Medicine</h2>
              <p className="text-slate-500">Shop for prescriptions and wellness products with ease.</p>
            </div>
            <div className="text-emerald-600 font-semibold group-hover:translate-x-2 transition-transform">Get Started &rarr;</div>
          </button>

          <button 
            onClick={() => setRole(UserRole.CHEMIST)}
            className="group relative bg-white border-2 border-sky-100 hover:border-sky-500 rounded-3xl p-10 transition-all duration-300 shadow-xl hover:shadow-sky-100 flex flex-col items-center gap-6"
          >
            <div className="bg-sky-100 p-6 rounded-2xl group-hover:bg-sky-500 transition-colors">
              <Store className="w-16 h-16 text-sky-600 group-hover:text-white" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Pharmacy Owner</h2>
              <p className="text-slate-500">Manage inventory and trade near-expiry stock with peers.</p>
            </div>
            <div className="text-sky-600 font-semibold group-hover:translate-x-2 transition-transform">Admin Dashboard &rarr;</div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <div className={`min-h-screen flex flex-col ${role === UserRole.CUSTOMER ? 'bg-emerald-50' : 'bg-sky-50'}`}>
        <Header role={role} cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} onLogout={() => setRole(null)} />
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 pb-24">
          <Routes>
            <Route path="/" element={role === UserRole.CUSTOMER ? <CustomerHome addToCart={addToCart} /> : <ChemistHome />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Nav role={role} />
      </div>
    </HashRouter>
  );
};

const Header: React.FC<{ role: UserRole, cartCount: number, onLogout: () => void }> = ({ role, cartCount, onLogout }) => (
  <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${role === UserRole.CUSTOMER ? 'bg-emerald-50/80 border-emerald-100' : 'bg-sky-50/80 border-sky-100'} px-4 py-3`}>
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-xl ${role === UserRole.CUSTOMER ? 'bg-emerald-500' : 'bg-sky-500'}`}>
          {role === UserRole.CUSTOMER ? <PackageSearch className="text-white w-6 h-6" /> : <Store className="text-white w-6 h-6" />}
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">PharmaConnect <span className="text-sm font-normal opacity-50">| {role === UserRole.CUSTOMER ? 'Patient' : 'Chemist'}</span></span>
      </div>
      <div className="flex items-center gap-4">
        {role === UserRole.CUSTOMER && (
          <button className="relative p-2 hover:bg-emerald-100 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6 text-emerald-700" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>}
          </button>
        )}
        <button onClick={onLogout} className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500">
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
);

const Nav: React.FC<{ role: UserRole }> = ({ role }) => (
  <nav className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full border shadow-2xl px-6 py-3 flex items-center gap-8 backdrop-blur-xl z-50 ${role === UserRole.CUSTOMER ? 'bg-emerald-900/90 border-emerald-700' : 'bg-sky-900/90 border-sky-700'}`}>
    <Link to="/" className="flex flex-col items-center gap-1 text-white opacity-100 hover:opacity-100 transition-opacity">
      <LayoutDashboard className="w-6 h-6" />
      <span className="text-[10px] font-medium">Home</span>
    </Link>
    <Link to="/orders" className="flex flex-col items-center gap-1 text-white opacity-60 hover:opacity-100 transition-opacity">
      <ShoppingCart className="w-6 h-6" />
      <span className="text-[10px] font-medium">{role === UserRole.CUSTOMER ? 'Orders' : 'Sales'}</span>
    </Link>
    <Link to="/profile" className="flex flex-col items-center gap-1 text-white opacity-60 hover:opacity-100 transition-opacity">
      <User className="w-6 h-6" />
      <span className="text-[10px] font-medium">Profile</span>
    </Link>
  </nav>
);

export default App;
