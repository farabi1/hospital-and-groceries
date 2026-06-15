import React from 'react';
import { useSelector } from 'react-redux';
import { selectAppointments } from '../slices/appointmentSlice';
import { selectCartCount, selectCartTotal } from '../slices/cartSlice';

interface DashboardProps {
  setActiveTab: (tab: 'dashboard' | 'doctors' | 'groceries' | 'cart') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveTab }) => {
  const appointments = useSelector(selectAppointments);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);

  const upcomingAppointments = appointments.filter(apt => apt.status === 'booked');
  const nextAppointment = upcomingAppointments[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-teal-600 to-emerald-600 p-5 sm:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute bottom-0 left-1/3 h-28 w-28 translate-y-10 rounded-full bg-emerald-400/20 blur-xl"></div>
        
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            Wellness Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold md:text-4xl">Your Health, Integrated.</h2>
          <p className="text-emerald-50 text-xs sm:text-sm md:text-base">
            Book medical consultations and order tailored, nutritionist-approved grocery lists. Track everything on a single, clean dashboard.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button 
              onClick={() => setActiveTab('doctors')}
              className="rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-teal-800 transition duration-300 hover:bg-emerald-50 hover:scale-[1.02] shadow-sm"
            >
              Book Doctor
            </button>
            <button 
              onClick={() => setActiveTab('groceries')}
              className="rounded-xl bg-emerald-800/40 border border-emerald-400/30 px-5 py-2.5 text-xs font-bold text-white transition duration-300 hover:bg-emerald-800/60 hover:scale-[1.02]"
            >
              Shop Healthy Groceries
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Stats & Highlights */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {/* Next Appointment Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Next Appointment</h3>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
          {nextAppointment ? (
            <div className="space-y-3">
              <div className="text-lg font-bold text-slate-800">{nextAppointment.doctorName}</div>
              <div className="text-xs text-teal-600 font-semibold">{nextAppointment.department}</div>
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-700">{nextAppointment.date}</span>
                <span>•</span>
                <span>{nextAppointment.timeSlot}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <p className="text-xs text-slate-400">No upcoming appointments booked.</p>
              <button 
                onClick={() => setActiveTab('doctors')}
                className="w-full rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 py-2.5 text-xs font-bold text-slate-700 transition"
              >
                Schedule Checkup
              </button>
            </div>
          )}
        </div>

        {/* Grocery Cart Status Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Shopping Cart</h3>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-black text-slate-800">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</div>
              <div className="text-sm text-slate-500">Subtotal: <span className="font-bold text-emerald-600">${cartTotal.toFixed(2)}</span></div>
            </div>
            <button 
              onClick={() => setActiveTab('cart')}
              className="w-full rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/50 py-2.5 text-xs font-bold text-emerald-700 transition"
            >
              View Cart / Checkout
            </button>
          </div>
        </div>

        {/* Wellness Score Card */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Daily Wellness</h3>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Diet Health Score</span>
                <span className="font-bold text-indigo-600">85%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-indigo-500 transition-all duration-500" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Hydration Target</span>
                <span className="font-bold text-sky-500">60%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-sky-500 transition-all duration-500" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wellness & Doctor Referral Section */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-slate-50/60 p-4 sm:p-6 md:p-8">
        <h3 className="text-lg font-bold text-slate-800">Dynamic Recommendation</h3>
        
        {nextAppointment ? (
          <div className="mt-4 flex flex-col items-start gap-4 md:flex-row md:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-slate-800 text-sm">
                Tailoring groceries for your consultation with {nextAppointment.doctorName}:
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {nextAppointment.department === 'Cardiology' && 'Dr. Connor specializes in Cardiology. Consider visiting the Grocery tab and filtering by "Heart Healthy" to add antioxidant-rich blueberries, high-fiber chia seeds, and wild-caught salmon to your cart!'}
                {nextAppointment.department === 'Nutrition' && 'Working with Dr. Marcus Vance will be great for building custom diets. We suggest looking at our "Organic" and "High Protein" items, like Omega-3 eggs and Organic Spinach.'}
                {nextAppointment.department === 'Pediatrics' && 'Dr. Elena Rostova recommends healthy fats and bone-strengthening vitamins for growing children. Look at our Unsweetened Almond Milk and Vitamin D3 drops.'}
                {nextAppointment.department === 'General Medicine' && 'For general medicine consultations, maintaining blood glucose and hydration is key. Search our pantry for Gluten-Free Rolled Oats and Greek Yogurt.'}
                {nextAppointment.department === 'Orthopedics' && 'Bone and joint care requires rich Calcium, Protein, and Vitamin D. Visit our shop and check out Vitamin D3 drops, almond milk, and Greek Yogurt.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-start gap-4 md:flex-row md:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-slate-800 text-sm">No Active Consultations</div>
              <p className="text-xs text-slate-600">
                Book an appointment with one of our specialized doctors to unlock dietary recommendations tailored specifically to your medical goals and wellness needs.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
