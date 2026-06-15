import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDoctors, createDoctor, updateDoctorAsync, deleteDoctor, Doctor } from '../../slices/doctorSlice';

export const AdminDoctors: React.FC = () => {
  const dispatch = useDispatch();
  const doctors = useSelector(selectDoctors);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Doctor, 'id'>>({
    name: '', specialty: '', department: 'General Medicine', experience: 0, rating: 5.0, fee: 0, bio: '', availableSlots: ['09:00 AM']
  });

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  
  const departments = ['All', 'Cardiology', 'Pediatrics', 'Nutrition', 'General Medicine', 'Orthopedics'];

  const filtered = doctors.filter(d => {
    const matchDept = deptFilter === 'All' || d.department === deptFilter;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  const handleOpenModal = (doc?: Doctor) => {
    if (doc) {
      setEditingId(doc.id);
      setFormData(doc);
    } else {
      setEditingId(null);
      setFormData({ name: '', specialty: '', department: 'General Medicine', experience: 0, rating: 5.0, fee: 0, bio: '', availableSlots: ['09:00 AM'] });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateDoctorAsync({ ...formData, id: editingId }) as any);
    } else {
      dispatch(createDoctor(formData) as any);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      dispatch(deleteDoctor(id) as any);
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
            <input type="text" placeholder="Search doctors..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none" />
          </div>
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 focus:border-indigo-500 focus:outline-none">
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <button onClick={() => handleOpenModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-2.5 text-sm font-bold shadow-sm transition">
          + Add Doctor
        </button>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(doc => (
          <div key={doc.id} className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-slate-800">{doc.name}</h3>
                  <p className="text-xs text-indigo-600 font-bold">{doc.department}</p>
                </div>
                <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg text-[10px] font-extrabold border border-amber-200">★ {doc.rating}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{doc.bio}</p>
              <div className="flex justify-between text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span>Exp: {doc.experience} yrs</span>
                <span>Fee: ${doc.fee}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-50">
              <button onClick={() => handleOpenModal(doc)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg py-2 text-xs font-bold transition">Edit</button>
              <button onClick={() => handleDelete(doc.id)} className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg py-2 text-xs font-bold transition border border-red-100">Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="col-span-full py-12 text-center text-sm text-slate-400">No doctors found.</div>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl animate-fade-in border border-slate-100 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-extrabold text-slate-800 mb-4">{editingId ? 'Edit Doctor' : 'Add New Doctor'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Name</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Department</label>
                  <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value as any})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm">
                    {departments.filter(d => d !== 'All').map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Specialty</label>
                  <input required value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Experience (yrs)</label>
                  <input type="number" required value={formData.experience} onChange={e => setFormData({...formData, experience: +e.target.value})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Consultation Fee ($)</label>
                  <input type="number" required value={formData.fee} onChange={e => setFormData({...formData, fee: +e.target.value})} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 mb-1">Bio</label>
                  <textarea required value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} rows={3} className="w-full rounded-xl border border-slate-200 p-2.5 text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold hover:bg-slate-200">Cancel</button>
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-sm">Save Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
