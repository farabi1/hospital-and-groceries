import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-white font-extrabold text-lg shadow-sm">
            M
          </span>
          <div>
            <span className="font-extrabold tracking-tight text-slate-800 text-base sm:text-lg">Med</span>
            <span className="font-semibold tracking-tight text-emerald-600 text-base sm:text-lg">Grocer</span>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
        </Link>

        <nav className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-600">
                Hi, {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="text-sm font-medium text-slate-500 hover:text-slate-800 transition"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition">
                Sign in
              </Link>
              <Link href="/register" className="text-sm font-medium bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition shadow-sm">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
