import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectInventory, createProduct, updateProductAsync, deleteProduct, toggleAvailabilityAsync, InventoryItem } from '../../slices/inventorySlice';

export const AdminInventory: React.FC = () => {
  const dispatch = useDispatch();
  const inventory = useSelector(selectInventory);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const defaultForm: Omit<InventoryItem, 'id'> = {
    name: '', category: 'Produce', price: 0, rating: 5.0, healthTag: 'General', description: '', calorieInfo: '', healthBenefit: '', stock: 0, available: true
  };
  const [formData, setFormData] = useState(defaultForm);

  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  
  const categories = ['All', 'Produce', 'Dairy & Eggs', 'Pantry', 'Bakery', 'Supplements'];
  const tags = ['Heart Healthy', 'Diabetic Friendly', 'Organic', 'High Protein', 'Keto', 'General'];

  const filtered = inventory.filter(i => {
    const matchCat = catFilter === 'All' || i.category === catFilter;
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenModal = (item?: InventoryItem) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData(defaultForm);
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateProductAsync({ ...formData, id: editingId }) as any);
    } else {
      dispatch(createProduct(formData) as any);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id) as any);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative max-w-xs flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </span>
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none" />
          </div>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 focus:border-indigo-500 focus:outline-none">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2.5 text-sm font-bold shadow-sm transition">
          + Add Product
        </button>
      </div>

      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Product</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Price</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Stock</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400 hidden md:table-cell">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-800">{item.name}</div>
                    <div className="text-[10px] text-indigo-600 font-semibold">{item.healthTag}</div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-xs text-slate-500">{item.category}</td>
                  <td className="px-4 py-3 font-extrabold text-slate-800">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-extrabold ${item.stock > 20 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : item.stock > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                      {item.stock} in stock
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <button onClick={() => dispatch(toggleAvailabilityAsync(item.id) as any)} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${item.available ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${item.available ? 'translate-x-5' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenModal(item)} className="text-xs font-bold text-slate-600 hover:text-indigo-600">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-xs font-bold text-red-500 hover:text-red-700">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-xs text-slate-400">No products found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl animate-fade-in border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-extrabold text-slate-800 mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Product Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm">
                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Health Tag</label>
                  <select value={formData.healthTag} onChange={e => setFormData({...formData, healthTag: e.target.value as any})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm">
                    {tags.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Price ($)</label>
                  <input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: +e.target.value})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Stock</label>
                  <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: +e.target.value})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                  <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={2} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Calorie Info</label>
                  <input required value={formData.calorieInfo} onChange={e => setFormData({...formData, calorieInfo: e.target.value})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Health Benefit</label>
                  <input required value={formData.healthBenefit} onChange={e => setFormData({...formData, healthBenefit: e.target.value})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-200">Cancel</button>
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-sm">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
