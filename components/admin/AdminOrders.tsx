import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectOrders, updateOrderStatusAsync, Order } from '../../slices/adminSlice';

const STATUS_OPTIONS: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusColor: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  processing: 'bg-blue-50 text-blue-700 border-blue-200',
  shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
};

export const AdminOrders: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [filter, setFilter] = useState<Order['status'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter(o => {
    const matchStatus = filter === 'all' || o.status === filter;
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  }).slice().reverse();

  return (
    <div className="space-y-5 animate-fade-in">
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
            placeholder="Search by order ID or name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', ...STATUS_OPTIONS] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold capitalize transition ${
                filter === s ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Order ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Customer</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Items</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Total</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400 hidden md:table-cell">Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(order => (
                <tr key={order.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-bold text-indigo-700">{order.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold text-slate-700">{order.customerName}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-xs text-slate-500">{order.items.reduce((s, i) => s + i.quantity, 0)} items</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-extrabold text-slate-800">${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-lg border px-2 py-0.5 text-[10px] font-extrabold uppercase ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 text-[10px] font-bold text-slate-700 transition"
                      >
                        View
                      </button>
                      <select
                        value={order.status}
                        onChange={e => dispatch(updateOrderStatusAsync({ id: order.id, status: e.target.value as Order['status'] }) as any)}
                        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-bold text-slate-700 focus:border-indigo-500 focus:outline-none"
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="py-12 text-center text-xs text-slate-400">No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 p-0 sm:p-4 backdrop-blur-sm">
          <div className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-100 max-h-[90dvh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h3 className="font-extrabold text-slate-800">Order {selectedOrder.id}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Customer: {selectedOrder.customerName}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600 transition text-xl leading-none">✕</button>
            </div>
            <div className="space-y-3">
              <div className="divide-y divide-slate-50">
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-2.5 text-sm">
                    <span className="text-slate-700 font-semibold">{item.productName} <span className="text-slate-400 font-normal">×{item.quantity}</span></span>
                    <span className="font-bold text-slate-800">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500"><span>Subtotal</span><span className="font-bold text-slate-700">${selectedOrder.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-500"><span>Tax</span><span className="font-bold text-slate-700">${selectedOrder.tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-slate-500"><span>Delivery</span><span className="font-bold text-slate-700">${selectedOrder.deliveryFee.toFixed(2)}</span></div>
                <div className="flex justify-between font-extrabold text-slate-800 border-t border-slate-200 pt-1.5 mt-1.5 text-sm">
                  <span>Total</span><span className="text-indigo-700">${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold">Method:</span><span className="capitalize">{selectedOrder.deliveryMethod}</span>
                <span className="ml-3 font-semibold">Date:</span><span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
              </div>
              <select
                value={selectedOrder.status}
                onChange={e => { dispatch(updateOrderStatusAsync({ id: selectedOrder.id, status: e.target.value as Order['status'] }) as any); setSelectedOrder(null); }}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 focus:border-indigo-500 focus:outline-none"
              >
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
