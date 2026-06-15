import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAppointments, cancelAppointment, completeAppointment, Appointment } from '../../slices/appointmentSlice';

type Filter = 'all' | 'booked' | 'completed' | 'cancelled';

const statusColor: Record<string, string> = {
  booked: 'bg-teal-50 text-teal-700 border-teal-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
};

export const AdminAppointments: React.FC = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(selectAppointments);
  const [filter, setFilter] = useState<Filter>('all');
  const [deptFilter, setDeptFilter] = useState('All');
  const [search, setSearch] = useState('');

  const departments = ['All', ...Array.from(new Set(appointments.map(a => a.department)))];

  const filtered = appointments.filter(a => {
    const matchStatus = filter === 'all' || a.status === filter;
    const matchDept = deptFilter === 'All' || a.department === deptFilter;
    const matchSearch = a.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      a.patientName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchDept && matchSearch;
  }).slice().reverse();

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Summary counts */}
      <div className="grid grid-cols-3 gap-3">
        {(['booked', 'completed', 'cancelled'] as const).map(s => {
          const count = appointments.filter(a => a.status === s).length;
          return (
            <div key={s} className={`rounded-xl border p-3 text-center cursor-pointer transition hover:opacity-80 ${statusColor[s]}`} onClick={() => setFilter(s)}>
              <div className="text-xl font-extrabold">{count}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider capitalize">{s}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search doctor or patient..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'booked', 'completed', 'cancelled'] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold capitalize transition ${filter === s ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Department filter */}
      <div className="flex flex-wrap gap-2">
        {departments.map(d => (
          <button key={d} onClick={() => setDeptFilter(d)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${deptFilter === d ? 'bg-teal-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
            {d}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Patient</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Doctor</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Department</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400 hidden md:table-cell">Date & Time</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(apt => (
                <tr key={apt.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold text-slate-700">{apt.patientName}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold text-slate-800">{apt.doctorName}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-slate-500">{apt.department}</span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="text-xs text-slate-700 font-semibold">{apt.date}</div>
                    <div className="text-[10px] text-slate-400">{apt.timeSlot}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-extrabold uppercase ${statusColor[apt.status]}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {apt.status === 'booked' && (
                        <>
                          <button
                            onClick={() => dispatch(completeAppointment(apt.id))}
                            className="rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700 transition"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => dispatch(cancelAppointment(apt.id))}
                            className="rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1.5 text-[10px] font-bold text-red-600 transition"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {apt.status !== 'booked' && (
                        <span className="text-[10px] text-slate-300 italic">No actions</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="py-12 text-center text-xs text-slate-400">No appointments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
