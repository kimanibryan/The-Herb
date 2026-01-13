
import React from 'react';
import { Leaf, ShieldCheck, Zap, Globe, Mail, Phone, MapPin, ChevronRight, Store, PackageSearch, Star } from 'lucide-react';

interface LandingPageProps {
  onAuthStart: () => void;
}

const FEATURED_MEDS = [
  { name: 'Organic Echinacea', price: 15.99, cat: 'Herbal', img: '101' },
  { name: 'Amoxicillin', price: 12.50, cat: 'Antibiotics', img: '102' },
  { name: 'Vitamin D3', price: 9.99, cat: 'Vitamins', img: '103' },
  { name: 'Salbutamol', price: 25.00, cat: 'Respiratory', img: '104' },
];

const LandingPage: React.FC<LandingPageProps> = ({ onAuthStart }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass border-b border-emerald-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold text-emerald-900 tracking-tight">The Herb</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
            <a href="#catalog" className="hover:text-emerald-600 transition-colors">Browse Catalog</a>
            <a href="#contact" className="hover:text-emerald-600 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onAuthStart} className="text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors">Log In</button>
            <button onClick={onAuthStart} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-emerald-200 transition-all active:scale-95">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-emerald-50 rounded-bl-[200px]" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold">
              <Zap className="w-4 h-4" />
              <span>Next Gen Pharmacy Management</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1]">
              Bridging <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-8">Chemists</span> and <span className="text-emerald-600">Care</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
              The Herb is the first dual-sided ecosystem where medicine ordering meets zero-waste B2B inventory trading. Powered by AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={onAuthStart} className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-5 rounded-3xl text-lg font-black shadow-2xl shadow-emerald-200 transition-all flex items-center justify-center gap-2">
                Launch App <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="relative animate-in fade-in zoom-in duration-1000">
             <div className="bg-white p-4 rounded-[40px] shadow-2xl border border-emerald-100 transform rotate-3 hover:rotate-0 transition-transform duration-700">
               <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" className="rounded-[30px]" alt="Pharmacy dashboard" />
             </div>
          </div>
        </div>
      </section>

      {/* Live Catalog Section */}
      <section id="catalog" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-slate-900">Live Inventory</h2>
              <p className="text-slate-500 max-w-lg font-medium">Browse what's currently available in your neighborhood chemists. Verified, fresh, and ready for pickup.</p>
            </div>
            <button onClick={onAuthStart} className="flex items-center gap-2 text-emerald-600 font-black hover:translate-x-2 transition-transform">
              See All 1,200+ Products <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_MEDS.map((med, i) => (
              <div key={i} className="group cursor-pointer" onClick={onAuthStart}>
                <div className="h-64 bg-slate-50 rounded-[40px] mb-4 overflow-hidden relative border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img src={`https://picsum.photos/seed/${med.img}/500/500`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={med.name} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl text-[10px] font-black uppercase text-emerald-700 border border-emerald-50">
                    {med.cat}
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-black text-lg text-slate-900">{med.name}</h3>
                    <span className="font-black text-emerald-600">${med.price}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 font-bold">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    4.9 • Verified Local Shop
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black text-slate-900">Engineered for Efficiency</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We've combined deep pharmaceutical expertise with cutting-edge AI to solve the biggest pains in medicine distribution.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-emerald-600" />}
              title="AI Vision Entry"
              desc="Just take a photo of your inventory. Our Gemini-powered AI extracts name, dosage, and expiry in seconds."
            />
            <FeatureCard 
              icon={<Globe className="w-8 h-8 text-blue-600" />}
              title="Peer B2B Trading"
              desc="Don't let stock expire. List near-expiry meds at a discount to fellow chemists in your local region."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-emerald-600" />}
              title="Verified Sourcing"
              desc="Every medicine on The Herb is verified by licensed local chemists, ensuring patient safety first."
            />
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-emerald-950 text-emerald-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <Leaf className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white">The Herb</span>
            </div>
            <p className="max-w-sm text-emerald-200/60 leading-relaxed">
              Redefining how the world accesses medicine. Join our network of over 500 licensed chemists today.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-black uppercase text-xs tracking-widest">Connect</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-3"><Mail className="w-4 h-4" /> support@theherb.ai</p>
              <p className="flex items-center gap-3"><Phone className="w-4 h-4" /> +1 (800) HERB-CARE</p>
              <p className="flex items-center gap-3"><MapPin className="w-4 h-4" /> Silicon Valley, Innovation Way</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-black uppercase text-xs tracking-widest">Legal</h4>
            <div className="space-y-3 text-sm flex flex-col">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Pharmacy Licensing</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-emerald-900 text-center text-xs text-emerald-200/40 font-medium">
          © 2025 The Herb Technologies Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group">
    <div className="mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-black text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
