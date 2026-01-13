
import React from 'react';
import { Leaf, ShieldCheck, Zap, Globe, Mail, Phone, MapPin, ChevronRight, Store, PackageSearch } from 'lucide-react';

interface LandingPageProps {
  onAuthStart: () => void;
}

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
            <a href="#about" className="hover:text-emerald-600 transition-colors">About Us</a>
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
              <div className="flex items-center gap-4 px-6 py-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="user" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">500+ Chemists</p>
                  <p className="text-xs text-slate-400 font-medium">Already joined the network</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative animate-in fade-in zoom-in duration-1000">
             <div className="bg-white p-4 rounded-[40px] shadow-2xl border border-emerald-100 transform rotate-3 hover:rotate-0 transition-transform duration-700">
               <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" className="rounded-[30px]" alt="Pharmacy dashboard" />
               <div className="absolute -bottom-6 -left-6 glass p-6 rounded-3xl shadow-xl border border-emerald-100 animate-bounce duration-[3000ms]">
                 <div className="flex items-center gap-3">
                   <div className="bg-emerald-500 p-2 rounded-xl text-white">
                     <PackageSearch className="w-6 h-6" />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase">New Stock Scanned</p>
                     <p className="text-lg font-black text-slate-900">Amoxicillin (500mg)</p>
                   </div>
                 </div>
               </div>
             </div>
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

      {/* About/Section */}
      <section id="about" className="py-24 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800" className="rounded-[40px] shadow-2xl border-4 border-white" alt="About us" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-600 rounded-full flex items-center justify-center text-white text-center p-4 transform rotate-12">
              <span className="font-bold text-lg leading-tight">100% Verified Network</span>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">Born in the Greenhouse, Built for the Chemist.</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Founded by pharmaceutical veterans and tech innovators, The Herb was created to bridge the gap between traditional medicine shops and the modern consumer.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700 font-semibold">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                Reduced medicine waste by 35% through B2B trading
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-semibold">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                Instantly update customer app from your camera
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-semibold">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">✓</div>
                Direct patient-to-chemist secure messaging
              </li>
            </ul>
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
