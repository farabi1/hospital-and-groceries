import React from 'react';
import { useSelector } from 'react-redux';
import { selectOrders, selectTotalRevenue } from '../../slices/adminSlice';
import { selectAppointments } from '../../slices/appointmentSlice';
import { selectDoctors } from '../../slices/doctorSlice';
import { selectInventory, selectLowStockItems } from '../../slices/inventorySlice';

type AdminView = 'dashboard' | 'orders' | 'appointments' | 'doctors' | 'inventory' | 'settings';
interface Props { setActiveView: (v: AdminView) => void; }

const StatCard: React.FC<{ label: string; value: string | number; sub?: string; color: string; icon: string; onClick?: () => void }> = ({ label, value, sub, color, icon, onClick }) => (
  <div
    onClick={onClick}
    className={`rounded-2xl bg-white border border-slate-100 p-5 shadow-sm transition hover:shadow-md ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="mt-1 text-2xl font-extrabold text-slate-800">{value}</p>
        {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
      </div>
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl ${color}`}>{icon}</span>
    </div>
  </div>
);

const statusColor: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  processing: 'bg-blue-50 text-blue-700 border-blue-200',
  shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
};

export const AdminDashboard: React.FC<Props> = ({ setActiveView }) => {
  const orders = useSelector(selectOrders);
  const revenue = useSelector(selectTotalRevenue);
  const appointments = useSelector(selectAppointments);
  const doctors = useSelector(selectDoctors);
  const inventory = useSelector(selectInventory);
  const lowStock = useSelector(selectLowStockItems);

  const pending = orders.filter(o => o.status === 'pending').length;
  const booked = appointments.filter(a => a.status === 'booked').length;
  const completed = appointments.filter(a => a.status === 'completed').length;

  // Revenue by day (last 7 days)
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });
  const revenueByDay = days.map(day => ({
    label: new Date(day).toLocaleDateString('en-US', { weekday: 'short' }),
    value: orders.filter(o => o.createdAt.startsWith(day) && o.status !== 'cancelled').reduce((s, o) => s + o.total, 0),
  }));
  const maxRev = Math.max(...revenueByDay.map(d => d.value), 1);

  // Top products
  const productSales: Record<string, { name: string; qty: number; revenue: number }> = {};
  orders.filter(o => o.status !== 'cancelled').forEach(o => {
    o.items.forEach(item => {
      if (!productSales[item.productId]) productSales[item.productId] = { name: item.productName, qty: 0, revenue: 0 };
      productSales[item.productId].qty += item.quantity;
      productSales[item.productId].revenue += item.price * item.quantity;
    });
  });
  const topProducts = Object.values(productSales).sort((a, b) => b.qty - a.qty).slice(0, 5);

  // Dept breakdown
  const deptCount: Record<string, number> = {};
  appointments.forEach(a => { deptCount[a.department] = (deptCount[a.department] || 0) + 1; });
  const deptColors = ['bg-teal-500', 'bg-indigo-500', 'bg-amber-500', 'bg-purple-500', 'bg-rose-500'];
  const depts = Object.entries(deptCount).sort((a, b) => b[1] - a[1]);
  const maxDept = Math.max(...depts.map(d => d[1]), 1);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={`$${revenue.toFixed(2)}`} sub="All completed orders" color="bg-emerald-50" icon="💰" onClick={() => setActiveView('orders')} />
        <StatCard label="Total Orders" value={orders.length} sub={`${pending} pending`} color="bg-indigo-50" icon="📦" onClick={() => setActiveView('orders')} />
        <StatCard label="Appointments" value={appointments.length} sub={`${booked} upcoming · ${completed} done`} color="bg-teal-50" icon="📅" onClick={() => setActiveView('appointments')} />
        <StatCard label="Low Stock Items" value={lowStock.length} sub={`${inventory.length} total products`} color="bg-amber-50" icon="⚠️" onClick={() => setActiveView('inventory')} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-800 mb-4">Revenue – Last 7 Days</h3>
          <div className="flex items-end gap-2 h-40">
            {revenueByDay.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-[9px] font-bold text-slate-500">{d.value > 0 ? `$${d.value.toFixed(0)}` : ''}</span>
                <div className="w-full rounded-t-lg bg-indigo-100 relative overflow-hidden" style={{ height: '120px' }}>
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-700"
                    style={{ height: `${(d.value / maxRev) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dept breakdown */}
        <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-800 mb-4">Appointments by Dept.</h3>
          <div className="space-y-3">
            {depts.map(([dept, count], i) => (
              <div key={dept}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-semibold truncate max-w-[140px]">{dept}</span>
                  <span className="font-bold text-slate-800">{count}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full ${deptColors[i % deptColors.length]} transition-all duration-500`}
                    style={{ width: `${(count / maxDept) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {depts.length === 0 && <p className="text-xs text-slate-400">No appointment data yet.</p>}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-slate-800">Recent Orders</h3>
            <button onClick={() => setActiveView('orders')} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition">View All →</button>
          </div>
          <div className="space-y-2">
            {orders.slice(-5).reverse().map(order => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <div className="text-xs font-bold text-slate-800">{order.id}</div>
                  <div className="text-[10px] text-slate-400">{order.customerName} · {new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">${order.total.toFixed(2)}</span>
                  <span className={`rounded-lg border px-2 py-0.5 text-[9px] font-extrabold uppercase ${statusColor[order.status]}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-extrabold text-slate-800">Top Selling Products</h3>
            <button onClick={() => setActiveView('inventory')} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition">Manage →</button>
          </div>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-white text-[10px] font-extrabold ${
                    i === 0 ? 'bg-amber-400' : i === 1 ? 'bg-slate-400' : 'bg-slate-200 text-slate-600'
                  }`}>{i + 1}</span>
                  <span className="text-xs font-semibold text-slate-700 truncate max-w-[180px]">{p.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800">{p.qty} sold</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">${p.revenue.toFixed(2)}</div>
                </div>
              </div>
            ))}
            {topProducts.length === 0 && <p className="text-xs text-slate-400">No sales data yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
