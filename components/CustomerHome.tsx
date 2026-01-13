
import React, { useState, useMemo } from 'react';
import { Medicine } from '../types';
import { Search, Filter, Leaf, Plus, Star, MapPin } from 'lucide-react';

const MOCK_MEDS: Medicine[] = [
  { id: '1', name: 'Amoxicillin', dosage: '500mg', price: 12.50, stock: 50, expiryDate: '2025-10-12', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Antibiotics', description: 'Used to treat bacterial infections.' },
  { id: '2', name: 'Paracetamol', dosage: '1000mg', price: 4.20, stock: 100, expiryDate: '2026-05-15', chemistId: 'c2', chemistName: 'Health First', category: 'Pain Relief', description: 'Quick relief for fever and mild pain.' },
  { id: '3', name: 'Loratadine', dosage: '10px', price: 8.90, stock: 30, expiryDate: '2025-02-20', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Allergy', description: 'Non-drowsy relief from allergic rhinitis.', nearExpiryDiscount: 20 },
  { id: '4', name: 'Vitamin C', dosage: '500mg', price: 15.00, stock: 200, expiryDate: '2025-08-01', chemistId: 'c3', chemistName: 'Pure Health', category: 'Vitamins', description: 'Boosts immune system.' },
];

const CustomerHome: React.FC<{ addToCart: (m: Medicine) => void }> = ({ addToCart }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(MOCK_MEDS.map(m => m.category))), []);

  const filteredMeds = MOCK_MEDS.filter(m => 
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase())) &&
    (!selectedCategory || m.category === selectedCategory)
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-emerald-900 flex items-center gap-2">
          <Leaf className="w-8 h-8 text-emerald-600" />
          Wellness Awaits
        </h2>
        <p className="text-emerald-700/70">Find the medicine you need from local trusted chemists.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 w-5 h-5" />
          <input 
            type="text"
            placeholder="Search medicine, symptoms, or brand..."
            className="w-full bg-white border border-emerald-100 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-4 rounded-2xl border transition-all whitespace-nowrap ${!selectedCategory ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-white border-emerald-100 text-emerald-700 hover:bg-emerald-50'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-4 rounded-2xl border transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' : 'bg-white border-emerald-100 text-emerald-700 hover:bg-emerald-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMeds.map(med => (
          <div key={med.id} className="group bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="h-48 bg-emerald-50 relative overflow-hidden">
              <img src={`https://picsum.photos/seed/${med.id}/400/300`} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" alt={med.name} />
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                {med.nearExpiryDiscount && (
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {med.nearExpiryDiscount}% OFF
                  </span>
                )}
                <span className="bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider">
                  {med.category}
                </span>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 leading-tight">{med.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{med.dosage}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-emerald-600">${med.price.toFixed(2)}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{med.description}</p>
              
              <div className="flex items-center gap-1.5 pt-2 text-[10px] text-slate-400 border-t border-slate-50 mt-4">
                <MapPin className="w-3 h-3 text-emerald-500" />
                <span className="font-medium">{med.chemistName}</span>
                <span className="ml-auto flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  4.8
                </span>
              </div>

              <button 
                onClick={() => addToCart(med)}
                className="w-full mt-4 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-600 font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2 group-active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerHome;
