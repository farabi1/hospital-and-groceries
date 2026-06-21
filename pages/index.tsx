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
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

type Tab = 'dashboard' | 'doctors' | 'groceries' | 'cart';

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const cartCount = useSelector(selectCartCount);
  const activeBookingsCount = useSelector(selectActiveAppointmentsCount);
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased font-sans">
      <Head>
        <title>MedGrocer | Integrated Wellness</title>
        <meta name="description" content="Book doctor checkups and shop tailored healthy groceries in one wellness hub." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Header navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
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
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600">Hi, {session.user?.name || 'User'}</span>
                <button onClick={() => signOut()} className="text-xs font-bold text-slate-400 hover:text-slate-600">Sign out</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition">Sign in</Link>
                <Link href="/register" className="text-xs font-bold bg-slate-800 text-white px-3 py-1.5 rounded-lg hover:bg-slate-900 transition">Register</Link>
              </div>
            )}
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
      <main className="mx-auto max-w-6xl px-3 sm:px-6 py-6 sm:py-8 md:py-10">
        {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'doctors' && <DoctorsPortal />}
        {activeTab === 'groceries' && <GroceryShop />}
        {activeTab === 'cart' && <CartAndBookings />}
      </main>

      {/* Mobile Sticky Navigation Footer */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 flex justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <button 
          onClick={() => setActiveTab('dashboard')} 
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold min-w-[60px] py-1 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <span className="text-lg">🏠</span>
          <span>Overview</span>
        </button>
        <button 
          onClick={() => setActiveTab('doctors')} 
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold min-w-[60px] py-1 rounded-xl transition-colors ${activeTab === 'doctors' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <span className="text-lg">🏥</span>
          <span>Doctors</span>
        </button>
        <button 
          onClick={() => setActiveTab('groceries')} 
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold min-w-[60px] py-1 rounded-xl transition-colors ${activeTab === 'groceries' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <span className="text-lg">🛒</span>
          <span>Groceries</span>
        </button>
        <button 
          onClick={() => setActiveTab('cart')} 
          className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold min-w-[60px] py-1 rounded-xl transition-colors ${activeTab === 'cart' ? 'text-teal-600' : 'text-slate-400'}`}
        >
          <span className="text-lg">📦</span>
          <span>Summary</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="mt-12 sm:mt-20 border-t border-slate-100 bg-white py-6 sm:py-8 text-center text-xs text-slate-400 pb-24 md:pb-8">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p>© 2026 MedGrocer wellness solutions. All rights reserved.</p>
            <p className="mt-1 text-[10px] text-slate-300">Empowering healthy lifestyles and medical consult management in one click.</p>
          </div>
          <div>
            <a href="/admin" className="text-[10px] font-bold text-slate-300 hover:text-indigo-600 transition">Admin Login</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
