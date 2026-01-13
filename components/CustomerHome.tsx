
import React, { useState, useMemo } from 'react';
import { Medicine } from '../types';
import { Search, Filter, Leaf, Plus, Star, MapPin } from 'lucide-react';

const MOCK_MEDS: Medicine[] = [
  { id: '1', name: 'Amoxicillin', dosage: '500mg', price: 12.50, stock: 50, expiryDate: '2025-10-12', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Antibiotics', description: 'Broad-spectrum antibiotic for bacterial infections.' },
  { id: '2', name: 'Paracetamol', dosage: '1000mg', price: 4.20, stock: 100, expiryDate: '2026-05-15', chemistId: 'c2', chemistName: 'The Herb Wellness', category: 'Pain Relief', description: 'Effective relief for mild to moderate pain and fever.' },
  { id: '3', name: 'Loratadine', dosage: '10mg', price: 8.90, stock: 30, expiryDate: '2025-05-20', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Allergy', description: 'Non-drowsy antihistamine for seasonal allergy relief.', nearExpiryDiscount: 20 },
  { id: '4', name: 'Vitamin C', dosage: '500mg', price: 15.00, stock: 200, expiryDate: '2025-08-01', chemistId: 'c3', chemistName: 'Nature Path', category: 'Vitamins', description: 'Essential nutrient for immune support and skin health.' },
  { id: '5', name: 'Ibuprofen', dosage: '400mg', price: 7.50, stock: 85, expiryDate: '2025-12-20', chemistId: 'c2', chemistName: 'The Herb Wellness', category: 'Pain Relief', description: 'Anti-inflammatory for pain, swelling, and fever.' },
  { id: '6', name: 'Metformin', dosage: '850mg', price: 18.00, stock: 40, expiryDate: '2025-06-15', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Diabetes', description: 'Management of type 2 diabetes.' },
  { id: '7', name: 'Cetirizine', dosage: '10mg', price: 6.50, stock: 60, expiryDate: '2025-04-10', chemistId: 'c3', chemistName: 'Nature Path', category: 'Allergy', description: 'Relief from sneezing, runny nose, and itchy eyes.', nearExpiryDiscount: 30 },
  { id: '8', name: 'Omega-3 Fish Oil', dosage: '1000mg', price: 22.00, stock: 45, expiryDate: '2026-02-14', chemistId: 'c3', chemistName: 'Nature Path', category: 'Vitamins', description: 'Supports heart, brain, and eye health.' },
  { id: '9', name: 'Salbutamol Inhaler', dosage: '100mcg', price: 25.00, stock: 12, expiryDate: '2025-04-30', chemistId: 'c2', chemistName: 'The Herb Wellness', category: 'Respiratory', description: 'Quick relief for asthma and COPD symptoms.', nearExpiryDiscount: 15 },
  { id: '10', name: 'Magnesium Citrate', dosage: '200mg', price: 14.50, stock: 55, expiryDate: '2025-11-05', chemistId: 'c3', chemistName: 'Nature Path', category: 'Vitamins', description: 'Supports muscle function and nerve health.' },
  { id: '11', name: 'Omeprazole', dosage: '20mg', price: 10.20, stock: 70, expiryDate: '2025-07-22', chemistId: 'c1', chemistName: 'Green Cross Pharma', category: 'Gastric', description: 'Treatment for acid reflux and heartburn.' },
  { id: '12', name: 'B-Complex', dosage: 'High Potency', price: 13.00, stock: 90, expiryDate: '2026-08-30', chemistId: 'c3', chemistName: 'Nature Path', category: 'Vitamins', description: 'Energy metabolism and nervous system support.' },
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
      <div className="flex flex-col gap-4">
        <h2 className="text-5xl font-black text-emerald-900 flex items-center gap-3">
          <Leaf className="w-12 h-12 text-emerald-600" />
          Fresh Wellness
        </h2>
        <p className="text-emerald-700/60 text-lg font-medium max-w-xl">Find prescriptions and herbal wellness from licensed local chemists on The Herb.</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
