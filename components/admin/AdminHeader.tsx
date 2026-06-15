import React from 'react';
import { useSelector } from 'react-redux';
import { selectPendingOrderCount } from '../../slices/adminSlice';

type AdminView = 'dashboard' | 'orders' | 'appointments' | 'doctors' | 'inventory' | 'settings';

const viewTitles: Record<AdminView, string> = {
  dashboard: 'Dashboard Overview',
  orders: 'Orders Management',
  appointments: 'Appointments',
  doctors: 'Doctors Management',
  inventory: 'Inventory Management',
  settings: 'Platform Settings',
};

interface AdminHeaderProps {
  activeView: AdminView;
  onMenuToggle: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ activeView, onMenuToggle }) => {
  const pendingOrders = useSelector(selectPendingOrderCount);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-6">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition md:hidden"
          aria-label="Toggle sidebar"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-sm font-extrabold text-slate-800">{viewTitles[activeView]}</h1>
          <p className="text-[10px] text-slate-400 hidden sm:block">MedGrocer Admin Panel</p>
        </div>
      </div>

      {/* Right: Notifications + Admin */}
      <div className="flex items-center gap-2">
        {/* Notification Bell */}
        <div className="relative">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          {pendingOrders > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 text-white text-[9px] font-extrabold px-1">
              {pendingOrders}
            </span>
          )}
        </div>

        {/* Admin Avatar */}
        <div className="flex items-center gap-2 rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-extrabold">A</span>
          <div className="hidden sm:block">
            <div className="text-xs font-bold text-slate-800 leading-none">Admin</div>
            <div className="text-[9px] text-slate-400 leading-none mt-0.5">Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};
