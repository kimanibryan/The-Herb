
import React, { useState, useMemo } from 'react';
import { Medicine } from '../types';
import { Search, Filter, Leaf, Plus, Star, MapPin, Tag } from 'lucide-react';

const MOCK_MEDS: Medicine[] = [
  { id: '1', name: 'Amoxicillin', dosage: '500mg', price: 12.50, stock: 50, expiryDate: '2025-10-12', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Antibiotics', description: 'Used to treat a wide variety of bacterial infections.' },
  { id: '2', name: 'Organic Echinacea', dosage: '250mg', price: 15.99, stock: 20, expiryDate: '2026-01-15', chemistId: 'c2', chemistName: 'The Herb Wellness', category: 'Herbal', description: 'Natural immune support supplement made from fresh extracts.' },
  { id: '3', name: 'Loratadine', dosage: '10mg', price: 8.90, stock: 30, expiryDate: '2025-05-20', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Allergy', description: 'Non-drowsy relief from seasonal allergy symptoms.', nearExpiryDiscount: 20 },
  { id: '4', name: 'Vitamin C + Zinc', dosage: '1000mg', price: 18.00, stock: 200, expiryDate: '2025-08-01', chemistId: 'c3', chemistName: 'Nature Path', category: 'Vitamins', description: 'Double action support for the immune system.' },
  { id: '5', name: 'Panadol Extra', dosage: '500mg', price: 6.50, stock: 120, expiryDate: '2026-04-10', chemistId: 'c2', chemistName: 'The Herb Wellness', category: 'Pain Relief', description: 'Fast and effective relief of pain and fever.' },
  { id: '6', name: 'Ashwagandha', dosage: '500mg', price: 22.00, stock: 15, expiryDate: '2026-03-01', chemistId: 'c2', chemistName: 'The Herb Wellness', category: 'Herbal', description: 'Traditional adaptogen used for stress and energy.' },
  { id: '7', name: 'Omeprazole', dosage: '20mg', price: 11.20, stock: 45, expiryDate: '2025-11-20', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Gastric', description: 'Relief for frequent heartburn and acid reflux.' },
  { id: '8', name: 'Magnesium Citrate', dosage: '200mg', price: 14.50, stock: 80, expiryDate: '2026-02-14', chemistId: 'c3', chemistName: 'Nature Path', category: 'Vitamins', description: 'Supports muscle function and relaxation.' },
  { id: '9', name: 'Salbutamol', dosage: '100mcg', price: 25.00, stock: 12, expiryDate: '2025-04-30', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Respiratory', description: 'Quick-relief inhaler for breathing difficulties.', nearExpiryDiscount: 15 },
  { id: '10', name: 'Chamomile Tea', dosage: '20 Bags', price: 5.99, stock: 50, expiryDate: '2026-10-10', chemistId: 'c2', chemistName: 'The Herb Wellness', category: 'Herbal', description: 'Soothing herbal tea for better sleep.' },
  { id: '11', name: 'Metformin', dosage: '500mg', price: 14.00, stock: 90, expiryDate: '2025-07-15', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Diabetes', description: 'Blood sugar control for type 2 diabetes.' },
  { id: '12', name: 'Iron Bisglycinate', dosage: '25mg', price: 19.50, stock: 35, expiryDate: '2026-05-01', chemistId: 'c3', chemistName: 'Nature Path', category: 'Vitamins', description: 'Gentle on the stomach iron supplement.' },
  { id: '13', name: 'Ibuprofen', dosage: '400mg', price: 7.20, stock: 200, expiryDate: '2025-09-12', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Pain Relief', description: 'Anti-inflammatory for moderate pain.' },
  { id: '14', name: 'Melatonin', dosage: '3mg', price: 13.00, stock: 65, expiryDate: '2025-06-20', chemistId: 'c3', chemistName: 'Nature Path', category: 'Sleep', description: 'Natural sleep aid for jet lag or insomnia.', nearExpiryDiscount: 10 },
  { id: '15', name: 'Probiotic Multi', dosage: '50bn CFU', price: 34.99, stock: 10, expiryDate: '2025-12-31', chemistId: 'c2', chemistName: 'The Herb Wellness', category: 'Vitamins', description: 'Complete gut health and immunity support.' },
  { id: '16', name: 'Turmeric Curcumin', dosage: '1000mg', price: 24.50, stock: 40, expiryDate: '2026-08-15', chemistId: 'c2', chemistName: 'The Herb Wellness', category: 'Herbal', description: 'Powerful natural anti-inflammatory support.' },
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
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-emerald-900 flex items-center gap-3 leading-tight">
            <Leaf className="w-12 h-12 text-emerald-600" />
            Your Daily<br/>Wellness
          </h2>
          <p className="text-emerald-700/60 text-lg font-medium max-w-xl">Find prescriptions and herbal wellness from licensed local chemists on The Herb.</p>
        </div>
        <div className="bg-emerald-100/50 p-4 rounded-3xl flex items-center gap-3 border border-emerald-100">
          <Tag className="w-5 h-5 text-emerald-600" />
          <p className="text-sm font-bold text-emerald-800">14 Active Discounts Today</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-600 w-6 h-6 group-focus-within:scale-110 transition-transform" />
          <input 
            type="text"
            placeholder="Search medicine, symptoms, or pharmacy..."
            className="w-full bg-white border border-emerald-100 rounded-[32px] py-6 pl-16 pr-8 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-lg font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          <button 
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-4 rounded-[24px] font-black transition-all whitespace-nowrap border-2 ${!selectedCategory ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-200 scale-105' : 'bg-white border-emerald-50 text-emerald-800 hover:bg-emerald-50'}`}
          >
            Explore All
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-4 rounded-[24px] font-black transition-all whitespace-nowrap border-2 ${selectedCategory === cat ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-200 scale-105' : 'bg-white border-emerald-50 text-emerald-800 hover:bg-emerald-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-12">
        {filteredMeds.map(med => (
          <div key={med.id} className="group bg-white rounded-[40px] overflow-hidden border border-emerald-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <div className="h-60 bg-emerald-50 relative overflow-hidden">
              <img src={`https://picsum.photos/seed/${med.id}herb/500/400`} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" alt={med.name} />
              <div className="absolute top-5 right-5 flex flex-col gap-3">
                {med.nearExpiryDiscount && (
                  <span className="bg-orange-500 text-white text-[10px] font-black px-4 py-2 rounded-2xl shadow-xl animate-pulse">
                    {med.nearExpiryDiscount}% OFF
                  </span>
                )}
                <span className="bg-white/95 backdrop-blur-md text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border border-emerald-100 shadow-sm">
                  {med.category}
                </span>
              </div>
            </div>
            <div className="p-8 space-y-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-2xl text-slate-900 leading-none mb-2">{med.name}</h3>
                  <p className="text-sm text-slate-400 font-bold tracking-tight">{med.dosage}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-emerald-600">${med.price.toFixed(2)}</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">{med.description}</p>
              
              <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                <div className="bg-emerald-50 p-1.5 rounded-lg">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-[10px] font-black text-emerald-800 truncate uppercase">{med.chemistName}</p>
                </div>
                <span className="flex items-center gap-1 font-black text-yellow-500 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  4.8
                </span>
              </div>

              <button 
                onClick={() => addToCart(med)}
                className="w-full mt-2 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 font-black py-4 rounded-[24px] transition-all flex items-center justify-center gap-2 group-active:scale-95 shadow-sm hover:shadow-emerald-200"
              >
                <Plus className="w-5 h-5" />
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerHome;
