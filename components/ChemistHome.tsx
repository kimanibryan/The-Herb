
import React, { useState } from 'react';
import { Medicine } from '../types';
// Fixed missing Filter icon import
import { Camera, Package, AlertTriangle, TrendingDown, Users, Search, Plus, Loader2, CheckCircle2, Filter } from 'lucide-react';
import { parseMedicineImage } from '../services/geminiService';

const MOCK_INVENTORY: Medicine[] = [
  { id: '1', name: 'Amoxicillin', dosage: '500mg', price: 12.50, stock: 50, expiryDate: '2025-10-12', chemistId: 'c1', chemistName: 'My Chemist', category: 'Antibiotics', description: 'Sample desc' },
  { id: '2', name: 'Panadol Extra', dosage: '500mg', price: 6.00, stock: 120, expiryDate: '2025-04-10', chemistId: 'c1', chemistName: 'My Chemist', category: 'Pain Relief', description: 'Sample desc' },
  { id: '3', name: 'Antacid Gel', dosage: '200ml', price: 15.00, stock: 15, expiryDate: '2025-03-01', chemistId: 'c1', chemistName: 'My Chemist', category: 'Gastric', description: 'Sample desc' },
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
      chemistName: 'My Chemist',
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-sky-900 flex items-center gap-2">
          <Package className="w-8 h-8 text-sky-600" />
          Inventory Hub
        </h2>
        <p className="text-sky-700/70">Manage your pharmacy stock and peer networks.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-sky-100 shadow-sm">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total SKU</p>
          <p className="text-2xl font-black text-sky-600">{inventory.length}</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-sky-100 shadow-sm">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Low Stock</p>
          <p className="text-2xl font-black text-orange-500">{inventory.filter(i => i.stock < 20).length}</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-sky-100 shadow-sm">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Near Expiry</p>
          <p className="text-2xl font-black text-red-500">{nearExpiryMeds.length}</p>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-sky-100 shadow-sm">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Peer Deals</p>
          <p className="text-2xl font-black text-emerald-500">12</p>
        </div>
      </div>

      <div className="flex bg-sky-100/50 p-1.5 rounded-2xl gap-1">
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'inventory' ? 'bg-white text-sky-700 shadow-md' : 'text-sky-500 hover:bg-sky-100'}`}
        >
          <Package className="w-4 h-4" /> Stock
        </button>
        <button 
          onClick={() => setActiveTab('b2b')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'b2b' ? 'bg-white text-sky-700 shadow-md' : 'text-sky-500 hover:bg-sky-100'}`}
        >
          <Users className="w-4 h-4" /> Peer Trade
        </button>
        <button 
          onClick={() => setActiveTab('add')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'add' ? 'bg-white text-sky-700 shadow-md' : 'text-sky-500 hover:bg-sky-100'}`}
        >
          <Camera className="w-4 h-4" /> Scan New
        </button>
      </div>

      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-sky-100 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-sky-50 bg-sky-50/20 flex justify-between items-center">
            <h3 className="font-bold text-sky-900">Current Inventory</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-400" />
              <input type="text" placeholder="Quick find..." className="pl-9 pr-4 py-1.5 rounded-full border border-sky-100 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase text-slate-400 tracking-widest bg-slate-50">
                  <th className="px-6 py-4">Medicine</th>
                  <th className="px-6 py-4">Dosage</th>
                  <th className="px-6 py-4">Qty</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Expiry</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inventory.map(med => (
                  <tr key={med.id} className="hover:bg-sky-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{med.name}</p>
                      <p className="text-[10px] text-slate-400">{med.category}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{med.dosage}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${med.stock < 20 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                        {med.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-sky-600">${med.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{med.expiryDate}</td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-slate-400 hover:text-sky-600 transition-colors">
                        <Filter className="w-4 h-4" />
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
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-sky-600 to-indigo-600 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Peer Marketplace</h3>
              <p className="text-sky-100 text-sm max-w-md">List your inventory with 4-5 months expiry here to trade with other chemist owners at a discount. Save costs, reduce waste.</p>
            </div>
            <Users className="absolute -bottom-4 -right-4 w-48 h-48 text-white/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearExpiryMeds.length > 0 ? nearExpiryMeds.map(med => (
              <div key={med.id} className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm flex items-center justify-between group hover:border-orange-300 transition-all">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-50 p-3 rounded-2xl">
                    <AlertTriangle className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{med.name} <span className="text-xs font-normal text-slate-400">({med.dosage})</span></h4>
                    <p className="text-xs text-orange-600 font-medium">Expires: {med.expiryDate}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded uppercase font-bold text-slate-500">Stock: {med.stock}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm line-through text-slate-300">${med.price.toFixed(2)}</span>
                    <span className="text-lg font-black text-emerald-600">${(med.price * 0.6).toFixed(2)}</span>
                  </div>
                  <button className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg transition-all group-hover:scale-105 active:scale-95">
                    List to Peers
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-2 bg-slate-50 p-12 rounded-3xl border border-dashed border-slate-200 text-center flex flex-col items-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-slate-300" />
                <p className="text-slate-500 font-medium">No items expiring in the next 5 months. Good job!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'add' && (
        <div className="bg-white p-8 rounded-3xl border border-sky-100 shadow-lg flex flex-col items-center text-center gap-6">
          {!lastParsed ? (
            <>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isProcessing ? 'bg-sky-100 animate-pulse' : 'bg-sky-600 shadow-sky-200 shadow-2xl scale-110'}`}>
                {isProcessing ? <Loader2 className="w-12 h-12 text-sky-600 animate-spin" /> : <Camera className="w-12 h-12 text-white" />}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-sky-900 mb-2">{isProcessing ? 'AI is analyzing box...' : 'Scan Medicine Box'}</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Take a clear photo of the packaging. Our AI will automatically extract name, dosage, and expiry to update your stock instantly.</p>
              </div>
              <label className="cursor-pointer bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Capture & Analyze
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} disabled={isProcessing} />
              </label>
            </>
          ) : (
            <div className="w-full space-y-6 text-left animate-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-emerald-700 font-bold mb-4">
                <CheckCircle2 className="w-6 h-6" />
                Details Extracted Successfully
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Medicine Name</label>
                  <input value={lastParsed.name} readOnly className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dosage</label>
                  <input value={lastParsed.dosage} readOnly className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suggested Price</label>
                  <input value={`$${lastParsed.price}`} readOnly className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expiry Date</label>
                  <input value={lastParsed.expiryDate} readOnly className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl focus:outline-none" />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setLastParsed(null)} className="flex-1 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all">
                  Cancel
                </button>
                <button onClick={confirmAdd} className="flex-2 py-4 bg-sky-600 text-white font-bold rounded-2xl hover:bg-sky-700 shadow-lg shadow-sky-100 transition-all px-12">
                  Add to Inventory
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
