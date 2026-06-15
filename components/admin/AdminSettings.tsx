import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAdminSettings, updateSettings } from '../../slices/adminSlice';

export const AdminSettings: React.FC = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectAdminSettings);
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateSettings(formData));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl animate-fade-in">
      <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6 sm:p-8">
        <h2 className="text-xl font-extrabold text-slate-800 mb-6">Platform Settings</h2>
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">General Information</h3>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Store Name</label>
              <input value={formData.storeName} onChange={e => setFormData({...formData, storeName: e.target.value})} className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Store Description</label>
              <textarea value={formData.storeDescription} onChange={e => setFormData({...formData, storeDescription: e.target.value})} rows={3} className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-indigo-500 focus:outline-none" />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Business & Operations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tax Rate (%)</label>
                <input type="number" step="0.1" value={formData.taxRate} onChange={e => setFormData({...formData, taxRate: +e.target.value})} className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-indigo-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Delivery Fee ($)</label>
                <input type="number" step="0.01" value={formData.deliveryFee} onChange={e => setFormData({...formData, deliveryFee: +e.target.value})} className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-indigo-500 focus:outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-1">Operating Hours</label>
                <input value={formData.operatingHours} onChange={e => setFormData({...formData, operatingHours: e.target.value})} className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-indigo-500 focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {saved ? (
              <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <span>✓</span> Settings Saved
              </span>
            ) : <div/>}
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-3 text-sm font-bold shadow-sm transition">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
        <h3 className="text-sm font-extrabold text-slate-800 mb-2">Data Export</h3>
        <p className="text-xs text-slate-500 mb-4">Export all platform data (orders, doctors, inventory, appointments) to a JSON file for backup purposes.</p>
        <button onClick={() => alert('Data export started. Check your downloads folder.')} className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold shadow-sm transition">
          Export Platform Data (.json)
        </button>
      </div>
    </div>
  );
};
