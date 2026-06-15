import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Dashboard } from '../components/Dashboard'
import { DoctorsPortal } from '../components/DoctorsPortal'
import { GroceryShop } from '../components/GroceryShop'
import { CartAndBookings } from '../components/CartAndBookings'
import { selectCartCount } from '../slices/cartSlice'
import { selectActiveAppointmentsCount } from '../slices/appointmentSlice'

type Tab = 'dashboard' | 'doctors' | 'groceries' | 'cart';

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const cartCount = useSelector(selectCartCount);
  const activeBookingsCount = useSelector(selectActiveAppointmentsCount);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased font-sans">
      <Head>
        <title>MedGrocer | Integrated Wellness</title>
        <meta name="description" content="Book doctor checkups and shop tailored healthy groceries in one wellness hub." />
        <link rel="icon" href="/favicon.ico" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Main Header navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-white font-extrabold text-lg shadow-sm">
              M
            </span>
            <div>
              <span className="font-extrabold tracking-tight text-slate-800 text-base sm:text-lg">Med</span>
              <span className="font-semibold tracking-tight text-emerald-600 text-base sm:text-lg">Grocer</span>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === 'dashboard' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === 'doctors' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Doctors Portal
            </button>
            <button
              onClick={() => setActiveTab('groceries')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                activeTab === 'groceries' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Healthy Groceries
            </button>
            
            {/* Cart & Bookings button */}
            <button
              onClick={() => setActiveTab('cart')}
              className={`relative rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'cart' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <span>Cart & Bookings</span>
              {cartCount > 0 && (
                <span className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-extrabold ${
                  activeTab === 'cart' ? 'bg-white text-emerald-700' : 'bg-emerald-600 text-white'
                }`}>
                  {cartCount}
                </span>
              )}
              {activeBookingsCount > 0 && (
                <span className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-extrabold ${
                  activeTab === 'cart' ? 'bg-white text-emerald-700' : 'bg-teal-600 text-white'
                }`}>
                  🏥{activeBookingsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Cart Shortcut */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setActiveTab('cart')}
              className="relative p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 text-white text-[8px] font-extrabold px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10">
        {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'doctors' && <DoctorsPortal />}
        {activeTab === 'groceries' && <GroceryShop />}
        {activeTab === 'cart' && <CartAndBookings />}
      </main>

      {/* Mobile Sticky Navigation Footer */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-slate-100 flex justify-around py-2 shadow-lg">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === 'dashboard' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <span>🏠</span>
          <span>Overview</span>
        </button>
        <button 
          onClick={() => setActiveTab('doctors')} 
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === 'doctors' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <span>🏥</span>
          <span>Doctors</span>
        </button>
        <button 
          onClick={() => setActiveTab('groceries')} 
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === 'groceries' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <span>🛒</span>
          <span>Groceries</span>
        </button>
        <button 
          onClick={() => setActiveTab('cart')} 
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${activeTab === 'cart' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <span>📦</span>
          <span>Summary</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-100 bg-white py-8 text-center text-xs text-slate-400 pb-20 md:pb-8">
        <div className="mx-auto max-w-6xl px-4">
          <p>© 2026 MedGrocer wellness solutions. All rights reserved.</p>
          <p className="mt-1 text-[10px] text-slate-300">Empowering healthy lifestyles and medical consult management in one click.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
