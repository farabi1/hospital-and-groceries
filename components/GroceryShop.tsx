import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groceries, GroceryItem } from '../data/groceries';
import { addToCart } from '../slices/cartSlice';
import { selectAppointments } from '../slices/appointmentSlice';

export const GroceryShop: React.FC = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(selectAppointments);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedHealthTag, setSelectedHealthTag] = useState<string>('All');
  const [showAddedAlert, setShowAddedAlert] = useState<string | null>(null);

  const categories = ['All', 'Produce', 'Dairy & Eggs', 'Pantry', 'Bakery', 'Supplements'];
  const healthTags = ['All', 'Heart Healthy', 'Diabetic Friendly', 'Organic', 'High Protein', 'Keto'];

  // Check if they have specific medical appointments booked
  const activeBookings = appointments.filter(apt => apt.status === 'booked');
  const departmentsBooked = activeBookings.map(apt => apt.department);
  
  const hasCardiologyBooked = departmentsBooked.includes('Cardiology');
  const hasNutritionBooked = departmentsBooked.includes('Nutrition');
  const hasPediatricsBooked = departmentsBooked.includes('Pediatrics');
  const hasGeneralBooked = departmentsBooked.includes('General Medicine');
  const hasOrthopedicsBooked = departmentsBooked.includes('Orthopedics');

  // Filter grocery items
  const filteredGroceries = groceries.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesHealthTag = selectedHealthTag === 'All' || item.healthTag === selectedHealthTag;
    return matchesSearch && matchesCategory && matchesHealthTag;
  });

  const handleAddToCart = (item: GroceryItem) => {
    dispatch(addToCart(item));
    setShowAddedAlert(item.id);
    setTimeout(() => setShowAddedAlert(null), 1500);
  };

  const getTagStyles = (tag: string) => {
    switch (tag) {
      case 'Heart Healthy': return 'bg-red-50 text-red-700 border-red-200/50';
      case 'Diabetic Friendly': return 'bg-blue-50 text-blue-700 border-blue-200/50';
      case 'Organic': return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
      case 'High Protein': return 'bg-amber-50 text-amber-700 border-amber-200/50';
      case 'Keto': return 'bg-purple-50 text-purple-700 border-purple-200/50';
      default: return 'bg-slate-50 text-slate-700 border-slate-200/50';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-slate-800">Healthy Grocery Store</h2>
        <p className="text-sm text-slate-500">Shop premium, organic, and diet-specific items approved by nutritionists.</p>
      </div>

      {/* Medical Recommendations Banner */}
      {activeBookings.length > 0 && (
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs sm:text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Health Care Recommendations Based on Your Bookings:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {hasCardiologyBooked && (
              <button 
                onClick={() => setSelectedHealthTag('Heart Healthy')}
                className="flex items-center gap-1.5 rounded-xl bg-red-100/80 px-3 py-1.5 text-xs font-bold text-red-800 border border-red-200 hover:bg-red-200/70 transition"
              >
                ❤️ Heart Healthy (Recommended for Cardiologist Appointment)
              </button>
            )}
            {hasNutritionBooked && (
              <button 
                onClick={() => setSelectedHealthTag('High Protein')}
                className="flex items-center gap-1.5 rounded-xl bg-amber-100/80 px-3 py-1.5 text-xs font-bold text-amber-800 border border-amber-200 hover:bg-amber-200/70 transition"
              >
                🥗 High Protein / Organic (Recommended for Nutritionist)
              </button>
            )}
            {hasPediatricsBooked && (
              <button 
                onClick={() => setSelectedCategory('Supplements')}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-100/80 px-3 py-1.5 text-xs font-bold text-emerald-800 border border-emerald-200 hover:bg-emerald-200/70 transition"
              >
                👶 Calcium & Vitamin Supplements (Recommended for Pediatrics)
              </button>
            )}
            {hasOrthopedicsBooked && (
              <button 
                onClick={() => setSelectedCategory('Dairy & Eggs')}
                className="flex items-center gap-1.5 rounded-xl bg-purple-100/80 px-3 py-1.5 text-xs font-bold text-purple-800 border border-purple-200 hover:bg-purple-200/70 transition"
              >
                🦴 Dairy & Calcium Products (Recommended for Orthopedics)
              </button>
            )}
            {hasGeneralBooked && (
              <button 
                onClick={() => setSelectedHealthTag('Diabetic Friendly')}
                className="flex items-center gap-1.5 rounded-xl bg-blue-100/80 px-3 py-1.5 text-xs font-bold text-blue-800 border border-blue-200 hover:bg-blue-200/70 transition"
              >
                🩺 Diabetic Friendly (Recommended for Family Doctor Check)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search groceries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Filters Group */}
        <div className="flex flex-col gap-3">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Category:</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Health Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Health Tag:</span>
            {healthTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedHealthTag(tag)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  selectedHealthTag === tag
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grocery Items Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGroceries.length > 0 ? (
          filteredGroceries.map(item => (
            <div key={item.id} className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="space-y-3">
                {/* Image placeholder / badge */}
                <div className="flex h-28 sm:h-36 w-full items-center justify-center rounded-xl bg-slate-50 border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-2 left-2 rounded-lg border px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-white/95 shadow-sm">
                    {item.category}
                  </div>
                  <span className="text-4xl">
                    {item.category === 'Produce' && '🍎'}
                    {item.category === 'Dairy & Eggs' && '🥛'}
                    {item.category === 'Pantry' && '🌾'}
                    {item.category === 'Bakery' && '🍞'}
                    {item.category === 'Supplements' && '💊'}
                  </span>
                </div>

                {/* Rating & Health Tag */}
                <div className="flex items-center justify-between">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${getTagStyles(item.healthTag)}`}>
                    {item.healthTag}
                  </span>
                  <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                    <span>★</span>
                    <span className="text-slate-600">{item.rating}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 text-sm leading-snug">{item.name}</h3>
                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>

                {/* Nutrition Fact */}
                <div className="rounded-lg bg-slate-50/70 p-2 border border-slate-100/50 text-[10px] text-slate-600 space-y-0.5">
                  <div>🔥 <span className="font-semibold text-slate-700">{item.calorieInfo}</span></div>
                  <div>💪 <span className="font-semibold text-slate-700">{item.healthBenefit}</span></div>
                </div>
              </div>

              {/* Price & Add to Cart button */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
                <span className="text-lg font-black text-slate-800">${item.price.toFixed(2)}</span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition duration-200 ${
                    showAddedAlert === item.id
                      ? 'bg-slate-900 text-white scale-95'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  }`}
                >
                  {showAddedAlert === item.id ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-12 text-center text-slate-400">
            No grocery items match the chosen filters.
          </div>
        )}
      </div>
    </div>
  );
};
