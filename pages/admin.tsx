import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAdminAuthenticated, adminLogin } from '../slices/adminSlice';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { AdminOrders } from '../components/admin/AdminOrders';
import { AdminAppointments } from '../components/admin/AdminAppointments';
import { AdminDoctors } from '../components/admin/AdminDoctors';
import { AdminInventory } from '../components/admin/AdminInventory';
import { AdminSettings } from '../components/admin/AdminSettings';

type AdminView = 'dashboard' | 'orders' | 'appointments' | 'doctors' | 'inventory' | 'settings';

const AdminPanel: NextPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAdminAuthenticated);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      dispatch(adminLogin());
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Head>
          <title>Admin Login | MedGrocer</title>
        </Head>
        <div className="max-w-sm w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center animate-fade-in">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-extrabold text-2xl shadow-lg mb-6">A</div>
          <h1 className="text-2xl font-extrabold text-slate-800 mb-2">Admin Access</h1>
          <p className="text-sm text-slate-500 mb-8">Enter your secure PIN to access the dashboard. (Hint: 1234)</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={pin} 
                onChange={e => setPin(e.target.value)}
                placeholder="Enter PIN" 
                className={`w-full text-center tracking-[0.5em] text-lg rounded-xl border ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:ring-indigo-500'} bg-slate-50 py-3 px-4 focus:outline-none focus:ring-2`}
                autoFocus
              />
              {error && <p className="text-xs text-red-500 font-bold mt-2">Incorrect PIN. Try again.</p>}
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3.5 font-bold shadow-md transition">
              Unlock Dashboard
            </button>
            <a href="/" className="block mt-4 text-xs font-bold text-slate-400 hover:text-slate-600 transition">← Back to main site</a>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      <Head>
        <title>Admin Dashboard | MedGrocer</title>
      </Head>

      <AdminSidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        <AdminHeader activeView={activeView} onMenuToggle={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            {activeView === 'dashboard' && <AdminDashboard setActiveView={setActiveView} />}
            {activeView === 'orders' && <AdminOrders />}
            {activeView === 'appointments' && <AdminAppointments />}
            {activeView === 'doctors' && <AdminDoctors />}
            {activeView === 'inventory' && <AdminInventory />}
            {activeView === 'settings' && <AdminSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
