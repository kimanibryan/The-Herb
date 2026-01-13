
import React, { useState } from 'react';
import { Medicine } from '../types';
import { Camera, Package, AlertTriangle, Users, Search, Plus, Loader2, CheckCircle2, Filter, Leaf } from 'lucide-react';
import { parseMedicineImage } from '../services/geminiService';

const MOCK_INVENTORY: Medicine[] = [
  { id: '1', name: 'Amoxicillin', dosage: '500mg', price: 12.50, stock: 50, expiryDate: '2025-10-12', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Antibiotics', description: 'Sample desc' },
  { id: '2', name: 'Panadol Extra', dosage: '500mg', price: 6.00, stock: 120, expiryDate: '2025-04-10', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Pain Relief', description: 'Sample desc' },
  { id: '3', name: 'Antacid Gel', dosage: '200ml', price: 15.00, stock: 15, expiryDate: '2025-03-01', chemistId: 'c1', chemistName: 'The Herb Admin', category: 'Gastric', description: 'Sample desc' },
];

const ChemistHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'b2b' | 'add'>('inventory');
  const [inventory, setInventory] = useState<Medicine[]>(MOCK_INVENTORY);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastParsed, setLastParsed] = useState<any>(null);

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

  const nearExpiryMeds = inventory.filter(m => {
    const expiry = new Date(m.expiryDate);
    const now = new Date();
    const diffMonths = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
    return diffMonths <= 5;
  });

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
                  <th className="px-10 py-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inventory.map(med => (
                  <tr key={med.id} className="hover:bg-sky-50/40 transition-colors group">
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
                      <button className="bg-slate-50 hover:bg-sky-100 p-3 rounded-xl transition-colors text-sky-600">
                        <Filter className="w-5 h-5" />
                      </button>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {nearExpiryMeds.length > 0 ? nearExpiryMeds.map(med => (
              <div key={med.id} className="bg-white p-10 rounded-[40px] border border-orange-100 shadow-sm flex items-center justify-between group hover:border-orange-300 transition-all">
                <div className="flex items-center gap-6">
                  <div className="bg-orange-50 p-5 rounded-[24px]">
                    <AlertTriangle className="w-10 h-10 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-2xl text-slate-800">{med.name}</h4>
                    <p className="text-sm text-orange-600 font-bold uppercase tracking-widest mt-1">Exp: {med.expiryDate}</p>
                    <div className="flex gap-2 mt-4">
                      <span className="text-[10px] bg-slate-100 px-3 py-1.5 rounded-xl uppercase font-black text-slate-500 tracking-wider">STOCK: {med.stock}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm line-through text-slate-300 font-bold">${med.price.toFixed(2)}</span>
                    <span className="text-3xl font-black text-emerald-600">${(med.price * 0.6).toFixed(2)}</span>
                  </div>
                  <button className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-black px-8 py-3 rounded-2xl shadow-xl shadow-sky-100 transition-all hover:-translate-y-1 active:scale-95">
                    Peer Deal
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-2 bg-slate-50 py-24 rounded-[50px] border-4 border-dashed border-slate-100 text-center flex flex-col items-center gap-4">
                <CheckCircle2 className="w-16 h-16 text-slate-300" />
                <p className="text-slate-400 font-black text-xl uppercase tracking-widest">Perfect Shelf Life</p>
                <p className="text-slate-400 font-medium max-w-xs">You have no items expiring in the next 5 months. Excellent inventory management!</p>
              </div>
            )}
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
    </div>
  );
};

export default ChemistHome;
