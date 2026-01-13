
import React, { useState, useMemo } from 'react';
import { Medicine } from '../types';
import { Camera, Package, AlertTriangle, Users, Search, Plus, Loader2, CheckCircle2, Filter, Leaf, Clock, X, BarChart3, History, Globe } from 'lucide-react';
import { parseMedicineImage } from '../services/geminiService';

const MOCK_INVENTORY: Medicine[] = [
  { id: '1', name: 'Amoxicillin', dosage: '500mg', price: 12.50, stock: 50, expiryDate: '2025-06-12', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Antibiotics', description: 'A broad-spectrum antibiotic used to treat bacterial infections. Effective against many respiratory infections.' },
  { id: '2', name: 'Panadol Extra', dosage: '500mg', price: 6.00, stock: 120, expiryDate: '2025-04-10', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Pain Relief', description: 'Provides fast, effective relief of pain and fever. Contains Caffeine to increase pain-relieving effects.' },
  { id: '3', name: 'Antacid Gel', dosage: '200ml', price: 15.00, stock: 15, expiryDate: '2025-03-25', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Gastric', description: 'Sugar-free gel for the symptomatic relief of heartburn and acid indigestion.' },
  { id: '4', name: 'Cetirizine', dosage: '10mg', price: 6.50, stock: 60, expiryDate: '2025-05-15', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Allergy', description: 'Daily allergy relief for hay fever and other allergies.' },
  { id: '5', name: 'Atorvastatin', dosage: '20mg', price: 22.00, stock: 30, expiryDate: '2025-08-01', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Cholesterol', description: 'Statin medication used to lower lipid levels and reduce cardiovascular risk.' },
  { id: '6', name: 'Vitamin D3', dosage: '1000IU', price: 14.00, stock: 150, expiryDate: '2026-10-10', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Vitamins', description: 'Essential vitamin for bone health and immune system regulation.' },
  { id: '7', name: 'Ashwagandha Extract', dosage: '500mg', price: 19.99, stock: 12, expiryDate: '2025-11-20', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Herbal', description: 'Natural adaptogen used for stress reduction and energy balance.' },
  { id: '8', name: 'Salbutamol Inhaler', dosage: '100mcg', price: 25.00, stock: 8, expiryDate: '2025-03-30', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Respiratory', description: 'Bronchodilator that opens up the airways to make breathing easier.' },
  { id: '9', name: 'Omega-3 Fish Oil', dosage: '1000mg', price: 18.50, stock: 45, expiryDate: '2025-12-05', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Vitamins', description: 'High-potency EPA/DHA for heart and cognitive health support.' },
  { id: '10', name: 'Metformin', dosage: '500mg', price: 11.00, stock: 200, expiryDate: '2025-07-28', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Diabetes', description: 'Standard treatment for type 2 diabetes management.' },
];

const ChemistHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'b2b' | 'add'>('inventory');
  const [inventory, setInventory] = useState<Medicine[]>(MOCK_INVENTORY);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastParsed, setLastParsed] = useState<any>(null);
  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const result = await parseMedicineImage(base64);
        setLastParsed(result);
        setIsProcessing(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
      alert("AI processing failed. Please try again.");
    }
  };

  const confirmAdd = () => {
    if (!lastParsed) return;
    const newMed: Medicine = {
      ...lastParsed,
      id: Math.random().toString(36).substr(2, 9),
      chemistId: 'c1',
      chemistName: 'The Herb Admin',
      description: 'Auto-added via AI scan',
    };
    setInventory(prev => [newMed, ...prev]);
    setLastParsed(null);
    setActiveTab('inventory');
  };

  const calculateDaysLeft = (expiryDateStr: string) => {
    const expiry = new Date(expiryDateStr);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getUrgencyStyles = (expiryDateStr: string) => {
    const expiry = new Date(expiryDateStr);
    const now = new Date();
    const diffMonths = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());

    if (diffMonths <= 1) return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', label: '1 Month Left' };
    if (diffMonths <= 2) return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', label: '2 Months Left' };
    if (diffMonths <= 3) return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', label: '3 Months Left' };
    return { bg: 'bg-sky-50', border: 'border-sky-100', text: 'text-sky-700', label: 'B2B Eligible' };
  };

  const nearExpiryMeds = useMemo(() => {
    return inventory
      .map(m => ({ ...m, daysLeft: calculateDaysLeft(m.expiryDate) }))
      .filter(m => {
        const expiry = new Date(m.expiryDate);
        const now = new Date();
        const diffMonths = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
        return diffMonths <= 5;
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, [inventory]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl font-black text-sky-900 flex items-center gap-3">
          <Leaf className="w-10 h-10 text-sky-600" />
          The Herb | Admin
        </h2>
        <p className="text-sky-700/60 font-semibold">Real-time inventory intelligence for your chemist shop.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total SKU', val: inventory.length, color: 'sky' },
          { label: 'Low Stock', val: inventory.filter(i => i.stock < 20).length, color: 'orange' },
          { label: 'Near Expiry', val: nearExpiryMeds.length, color: 'red' },
          { label: 'Peer Deals', val: 12, color: 'emerald' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-sky-100 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-4xl font-black text-${stat.color}-600`}>{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="flex bg-sky-100/40 p-2 rounded-[32px] gap-2">
        {['inventory', 'b2b', 'add'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-[24px] font-black transition-all ${activeTab === tab ? 'bg-white text-sky-700 shadow-xl shadow-sky-900/10' : 'text-sky-500 hover:bg-sky-50'}`}
          >
            {tab === 'inventory' && <Package className="w-5 h-5" />}
            {tab === 'b2b' && <Users className="w-5 h-5" />}
            {tab === 'add' && <Camera className="w-5 h-5" />}
            <span className="capitalize">{tab === 'inventory' ? 'Stock' : tab === 'b2b' ? 'Peer Trade' : 'Scan Pack'}</span>
          </button>
        ))}
      </div>

      {activeTab === 'inventory' && (
        <div className="bg-white rounded-[40px] border border-sky-100 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-sky-50 bg-sky-50/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="font-black text-xl text-sky-900">Current Medicine Stock</h3>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-400" />
              <input type="text" placeholder="Search stock..." className="w-full pl-12 pr-6 py-3 rounded-2xl border border-sky-100 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-sky-500/10" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase text-slate-400 font-black tracking-widest bg-slate-50">
                  <th className="px-10 py-6">Medicine Detail</th>
                  <th className="px-10 py-6 text-center">Dosage</th>
                  <th className="px-10 py-6 text-center">Qty</th>
                  <th className="px-10 py-6 text-center">Unit Price</th>
                  <th className="px-10 py-6 text-center">Expiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inventory.map(med => (
                  <tr 
                    key={med.id} 
                    onClick={() => setSelectedMed(med)}
                    className="hover:bg-sky-50/40 transition-colors group cursor-pointer"
                  >
                    <td className="px-10 py-8">
                      <p className="font-black text-lg text-slate-800">{med.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{med.category}</p>
                    </td>
                    <td className="px-10 py-8 text-center font-bold text-slate-600">{med.dosage}</td>
                    <td className="px-10 py-8 text-center">
                      <span className={`px-4 py-2 rounded-xl text-xs font-black ${med.stock < 20 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                        {med.stock} UNITS
                      </span>
                    </td>
                    <td className="px-10 py-8 text-center font-black text-sky-600 text-lg">${med.price.toFixed(2)}</td>
                    <td className="px-10 py-8 text-center">
                       <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase ${calculateDaysLeft(med.expiryDate) < 120 ? 'bg-red-50 text-red-600 border border-red-100' : 'text-slate-400 bg-slate-50'}`}>
                        {med.expiryDate}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'b2b' && (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
          <div className="bg-gradient-to-br from-sky-700 to-indigo-800 p-12 rounded-[50px] text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h3 className="text-4xl font-black">Zero-Waste Marketplace</h3>
              <p className="text-sky-100 text-lg max-w-xl font-medium opacity-80 leading-relaxed">Trade stock expiring in 4-5 months with other chemists at a 40% discount. Keep medicine accessible and reduce losses.</p>
              <button className="bg-white text-sky-900 px-8 py-3 rounded-2xl font-black shadow-lg hover:scale-105 transition-transform active:scale-95">Invite Nearby Chemists</button>
            </div>
            <Users className="absolute -bottom-10 -right-10 w-72 h-72 text-white/10" />
          </div>

          {/* Expiry Urgency Monitor Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-sky-600" />
              <h3 className="text-2xl font-black text-slate-900">Expiry Urgency Monitor</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nearExpiryMeds.map((med) => {
                const style = getUrgencyStyles(med.expiryDate);
                return (
                  <div key={med.id} className={`p-8 rounded-[40px] border-2 flex flex-col justify-between group transition-all hover:scale-[1.02] ${style.bg} ${style.border}`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl bg-white shadow-sm ${style.text}`}>
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-black text-xl text-slate-900">{med.name}</h4>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{med.dosage}</p>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white shadow-sm border ${style.border} ${style.text}`}>
                        {style.label}
                      </span>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-black text-slate-900">{med.daysLeft}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Days Remaining</p>
                      </div>
                      <button className="bg-sky-600 hover:bg-sky-700 text-white font-black px-6 py-2.5 rounded-2xl text-xs shadow-lg transition-all active:scale-95">
                        List to Peers
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'add' && (
        <div className="bg-white p-16 rounded-[50px] border border-sky-100 shadow-2xl flex flex-col items-center text-center gap-8 animate-in slide-in-from-bottom-12 duration-500">
          {!lastParsed ? (
            <>
              <div className={`w-32 h-32 rounded-[40px] flex items-center justify-center transition-all duration-700 ${isProcessing ? 'bg-sky-100 animate-pulse' : 'bg-sky-600 shadow-2xl shadow-sky-200 rotate-6 hover:rotate-0'}`}>
                {isProcessing ? <Loader2 className="w-16 h-16 text-sky-600 animate-spin" /> : <Camera className="w-16 h-16 text-white" />}
              </div>
              <div className="space-y-3">
                <h3 className="text-4xl font-black text-sky-900">{isProcessing ? 'AI Processing...' : 'AI Box Scanner'}</h3>
                <p className="text-slate-400 max-w-sm mx-auto font-medium text-lg leading-relaxed">
                  Snap a photo of the medicine packaging. Our AI will automatically index the name, dosage, and expiry into your digital shop.
                </p>
              </div>
              <label className="cursor-pointer bg-sky-600 hover:bg-sky-700 text-white font-black py-6 px-16 rounded-[24px] shadow-2xl shadow-sky-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 text-lg">
                <Camera className="w-6 h-6" />
                Capture Medicine
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} disabled={isProcessing} />
              </label>
            </>
          ) : (
            <div className="w-full space-y-8 text-left animate-in zoom-in-95 duration-500">
              <div className="flex items-center gap-4 bg-emerald-50 p-6 rounded-[32px] border border-emerald-100 text-emerald-800 font-black text-lg">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                Neural Analysis Complete
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: 'Medicine Name', val: lastParsed.name },
                  { label: 'Dosage Strength', val: lastParsed.dosage },
                  { label: 'Market Price', val: `$${lastParsed.price}` },
                  { label: 'Verified Expiry', val: lastParsed.expiryDate },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{item.label}</label>
                    <input value={item.val} readOnly className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl font-black text-slate-700 focus:outline-none" />
                  </div>
                ))}
              </div>
              <div className="flex gap-4 pt-6">
                <button onClick={() => setLastParsed(null)} className="flex-1 py-5 border-2 border-slate-100 text-slate-400 font-black rounded-[24px] hover:bg-slate-50 transition-all">
                  Discard
                </button>
                <button onClick={confirmAdd} className="flex-[2] py-5 bg-sky-600 text-white font-black rounded-[24px] hover:bg-sky-700 shadow-2xl shadow-sky-100 transition-all px-12 text-lg">
                  Add to The Herb Stock
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Medicine Details Modal */}
      {selectedMed && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 backdrop-blur-md bg-slate-900/40 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[60px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 border border-sky-100 flex flex-col lg:flex-row max-h-[90vh]">
            <div className="w-full lg:w-1/3 bg-sky-600 p-12 text-white relative">
              <button 
                onClick={() => setSelectedMed(null)}
                className="absolute top-8 right-8 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="space-y-6">
                <div className="bg-white/20 p-4 rounded-3xl w-fit">
                  <Package className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-4xl font-black mb-1">{selectedMed.name}</h3>
                  <p className="text-sky-100 font-bold uppercase tracking-widest text-xs opacity-80">{selectedMed.category} • {selectedMed.dosage}</p>
                </div>
                <div className="space-y-4 pt-8 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase opacity-60">Inventory ID</span>
                    <span className="font-mono text-sm">#{selectedMed.id.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase opacity-60">Status</span>
                    <span className="bg-emerald-400 text-emerald-950 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Active Stock</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-12 overflow-y-auto space-y-12">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-sky-900 font-black text-lg">
                  <BarChart3 className="w-5 h-5" />
                  Market Position
                </div>
                <p className="text-slate-500 leading-relaxed font-medium">{selectedMed.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stock</p>
                    <p className="text-xl font-black text-slate-900">{selectedMed.stock}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price</p>
                    <p className="text-xl font-black text-sky-600">${selectedMed.price}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Profit/U</p>
                    <p className="text-xl font-black text-emerald-600">+12%</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Demand</p>
                    <p className="text-xl font-black text-orange-500">High</p>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-sky-900 font-black text-lg">
                  <History className="w-5 h-5" />
                  Stock Movement History
                </div>
                <div className="space-y-2">
                  {[
                    { date: '2025-02-28', event: 'Restocked via AI Scan', change: '+20 Units', color: 'emerald' },
                    { date: '2025-02-25', event: 'Online Sale (The Herb App)', change: '-3 Units', color: 'sky' },
                    { date: '2025-02-20', event: 'Physical Store Sale', change: '-12 Units', color: 'slate' },
                  ].map((log, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <p className="text-sm font-black text-slate-800">{log.event}</p>
                        <p className="text-[10px] font-bold text-slate-400">{log.date}</p>
                      </div>
                      <span className={`text-sm font-black text-${log.color}-600`}>{log.change}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4 bg-sky-50 p-8 rounded-[40px] border border-sky-100">
                <div className="flex items-center gap-2 text-sky-900 font-black text-lg">
                  <Globe className="w-5 h-5" />
                  Active Peer Opportunities
                </div>
                <p className="text-sm font-medium text-sky-700/70">There are currently 4 other chemists in your 5km radius looking for this medicine dosage. B2B deals could reduce holding costs.</p>
                <button className="w-full bg-sky-600 text-white font-black py-4 rounded-[24px] shadow-lg shadow-sky-200">Initiate B2B Peer Deal</button>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChemistHome;
