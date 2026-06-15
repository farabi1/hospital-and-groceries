import React from 'react';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../slices/adminSlice';

type AdminView = 'dashboard' | 'orders' | 'appointments' | 'doctors' | 'inventory' | 'settings';

interface AdminSidebarProps {
  activeView: AdminView;
  setActiveView: (v: AdminView) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems: { id: AdminView; label: string; icon: string; }[] = [
  { id: 'dashboard',    label: 'Dashboard',     icon: '📊' },
  { id: 'orders',       label: 'Orders',         icon: '📦' },
  { id: 'appointments', label: 'Appointments',   icon: '📅' },
  { id: 'doctors',      label: 'Doctors',        icon: '👨‍⚕️' },
  { id: 'inventory',    label: 'Inventory',      icon: '🛒' },
  { id: 'settings',     label: 'Settings',       icon: '⚙️' },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const handleNav = (view: AdminView) => {
    setActiveView(view);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:z-auto`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-extrabold text-base shadow-lg">A</span>
          <div>
            <div className="text-white font-extrabold text-sm tracking-tight">MedGrocer</div>
            <div className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest">Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Main Menu</div>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left
                ${activeView === item.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              <span>{item.label}</span>
              {activeView === item.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-slate-800 space-y-2">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition text-left"
          >
            <span className="text-base w-5 text-center">🌐</span>
            <span>View Site</span>
          </a>
          <button
            onClick={() => dispatch(adminLogout())}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition text-left"
          >
            <span className="text-base w-5 text-center">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
