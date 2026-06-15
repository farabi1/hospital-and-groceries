import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems, 
  selectCartTotal, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  checkout, 
  selectCheckoutStatus,
  resetCheckout
} from '../slices/cartSlice';
import { selectAppointments, cancelAppointment } from '../slices/appointmentSlice';

export const CartAndBookings: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const appointments = useSelector(selectAppointments);
  const checkoutStatus = useSelector(selectCheckoutStatus);

  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const deliveryFee = deliveryMethod === 'delivery' ? 4.99 : 0;
  const taxRate = 0.08;
  const taxAmount = cartTotal * taxRate;
  const finalTotal = cartTotal > 0 ? cartTotal + taxAmount + deliveryFee : 0;

  const handleCheckout = () => {
    dispatch(checkout());
  };

  const handleCancelAppointment = (id: string) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(cancelAppointment(id));
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3 animate-fade-in">
      {/* Success Modal / Banner */}
      {checkoutStatus === 'success' && (
        <div className="col-span-full rounded-2xl border border-emerald-100 bg-emerald-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white text-xl font-bold">✓</span>
            <div>
              <h4 className="font-extrabold text-emerald-950 text-sm">Grocery Order Placed Successfully!</h4>
              <p className="text-xs text-emerald-700 mt-0.5">Your healthy ingredients have been ordered and are being prepared for delivery.</p>
            </div>
          </div>
          <button 
            onClick={() => dispatch(resetCheckout())}
            className="rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 text-xs font-bold transition"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Shopping Cart Section (2 Cols on desktop) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-slate-800">Shopping Cart</h2>
            {cartItems.length > 0 && (
              <button 
                onClick={() => dispatch(clearCart())}
                className="text-xs text-red-500 hover:text-red-700 font-bold transition"
              >
                Clear Cart
              </button>
            )}
          </div>

          {cartItems.length > 0 ? (
            <div className="mt-4 divide-y divide-slate-50">
              {cartItems.map(item => (
                <div key={item.product.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                      {item.product.category === 'Produce' && '🍎'}
                      {item.product.category === 'Dairy & Eggs' && '🥛'}
                      {item.product.category === 'Pantry' && '🌾'}
                      {item.product.category === 'Bakery' && '🍞'}
                      {item.product.category === 'Supplements' && '💊'}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">{item.product.name}</h4>
                      <div className="text-[10px] text-indigo-600 font-bold mt-0.5">{item.product.healthTag}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    <span className="text-sm font-bold text-slate-800">${(item.product.price * item.quantity).toFixed(2)}</span>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1">
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity - 1 }))}
                        className="h-6 w-6 flex items-center justify-center rounded hover:bg-slate-100 font-extrabold text-slate-600 transition"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity + 1 }))}
                        className="h-6 w-6 flex items-center justify-center rounded hover:bg-slate-100 font-extrabold text-slate-600 transition"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="text-slate-400 hover:text-red-500 transition"
                      title="Remove product"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              Your cart is empty. Check out the store tab to add nutritionist-approved groceries!
            </div>
          )}
        </div>

        {/* Medical Bookings Section */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-4">My Appointments</h2>
          {appointments.length > 0 ? (
            <div className="mt-4 divide-y divide-slate-50">
              {appointments.map(apt => (
                <div key={apt.id} className="py-4 flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-800 text-sm">{apt.doctorName}</h4>
                      <span className={`rounded-lg px-2 py-0.5 text-[9px] font-bold ${
                        apt.status === 'booked' 
                          ? 'bg-teal-50 text-teal-700 border border-teal-200/50' 
                          : 'bg-slate-100 text-slate-500 border border-slate-200/50 line-through'
                      }`}>
                        {apt.status === 'booked' ? 'Scheduled' : 'Cancelled'}
                      </span>
                    </div>
                    <div className="text-xs text-indigo-600 font-semibold">{apt.department}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100/60">
                      <span className="font-semibold text-slate-700">{apt.date}</span>
                      <span>•</span>
                      <span>{apt.timeSlot}</span>
                    </div>
                    {apt.notes && (
                      <p className="text-[10px] text-slate-500 italic bg-slate-50/50 p-2 rounded-lg">
                        Reason: "{apt.notes}"
                      </p>
                    )}
                  </div>

                  {apt.status === 'booked' && (
                    <button
                      onClick={() => handleCancelAppointment(apt.id)}
                      className="rounded-xl border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 text-xs font-bold transition self-end sm:self-center"
                    >
                      Cancel Consultation
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs">
              No appointments scheduled yet.
            </div>
          )}
        </div>
      </div>

      {/* Order Summary Sidebar (1 Col) */}
      {cartItems.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Checkout Details</h3>
            
            {/* Delivery/Pickup Select */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
              <button 
                onClick={() => setDeliveryMethod('delivery')}
                className={`py-2 rounded-lg text-xs font-bold transition ${
                  deliveryMethod === 'delivery' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                Delivery
              </button>
              <button 
                onClick={() => setDeliveryMethod('pickup')}
                className={`py-2 rounded-lg text-xs font-bold transition ${
                  deliveryMethod === 'pickup' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'
                }`}
              >
                Pickup (Free)
              </button>
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs border-b border-slate-100 pb-3">
              <div className="flex justify-between text-slate-500">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-800">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Sales Tax (8%)</span>
                <span className="font-bold text-slate-800">${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{deliveryMethod === 'delivery' ? 'Delivery Fee' : 'Store Pickup'}</span>
                <span className="font-bold text-slate-800">${deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm font-extrabold text-slate-800">
              <span>Total Price</span>
              <span className="text-xl text-emerald-600">${finalTotal.toFixed(2)}</span>
            </div>

            {/* Pay Button */}
            <button 
              onClick={handleCheckout}
              className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 py-3.5 text-xs font-bold text-white transition shadow-sm"
            >
              Confirm and Order Groceries
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
