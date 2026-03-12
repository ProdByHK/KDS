'use client';

import '../globals.css';
import { ShieldAlert, LogOut, LayoutDashboard, BarChart3, Users, Bot, Settings } from 'lucide-react';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import AdminLogin from '../../src/components/admin/AdminLogin';

const inter = Inter({ subsets: ['latin'] });

// Moved to page level or separate metadata file since this is now a client component
// export const metadata = {
//   title: 'KDS Sentinel Admin | King David Service',
//   description: 'Enterprise Management Console',
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Basic persistence via sessionStorage for the demo
    const authStatus = window.sessionStorage.getItem('kds_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setMounted(true);
  }, []);

  const handleLogin = () => {
    window.sessionStorage.setItem('kds_admin_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem('kds_admin_auth');
    setIsAuthenticated(false);
  };

  if (!mounted) return null; // Prevent hydration mismatch

  if (!isAuthenticated) {
    return (
      <html lang="en">
        <body className={`${inter.className} min-h-screen bg-[#0a0f1c] antialiased`}>
          <AdminLogin onLogin={handleLogin} />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#0a0f1c] text-slate-300 flex antialiased`}>
        {/* Sidebar */}
        <aside className="w-64 bg-[#111827] border-r border-[#1f2937] flex flex-col hidden md:flex">
          <div className="h-16 flex items-center px-6 border-b border-[#1f2937]">
            <ShieldAlert className="w-5 h-5 text-gold-400 mr-3" />
            <span className="font-bold text-white tracking-widest text-sm uppercase">KDS Admin</span>
          </div>
          
          <nav className="flex-1 py-6 px-3 space-y-1">
            <Link href="/admin" className="flex items-center px-3 py-2 bg-blue-600/10 text-blue-400 rounded-lg group">
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">Dashboard</span>
            </Link>
            <a href="#" className="flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-[#1f2937] rounded-lg group transition-colors">
              <BarChart3 className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">Analytics</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-[#1f2937] rounded-lg group transition-colors">
              <Users className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">Clients</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-[#1f2937] rounded-lg group transition-colors">
              <Bot className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">AI Control</span>
            </a>
            <a href="#" className="flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-[#1f2937] rounded-lg group transition-colors">
              <Settings className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">Settings</span>
            </a>
          </nav>

          <div className="p-4 border-t border-[#1f2937]">
            <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 text-slate-400 hover:text-white hover:bg-[#1f2937] rounded-lg group transition-colors">
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium text-sm">Exit Console</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Topbar */}
          <header className="h-16 bg-[#111827] border-b border-[#1f2937] flex items-center justify-between px-6 md:px-8">
            <div className="flex items-center md:hidden">
              <ShieldAlert className="w-5 h-5 text-gold-400 mr-2" />
              <span className="font-bold text-white tracking-widest text-sm">KDS Admin</span>
            </div>
            <div className="hidden md:flex items-center text-xs text-slate-500">
              Secure Enterprise Connection Enabled
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-slate-400">System Online</span>
              <div className="w-8 h-8 rounded-full bg-[#1f2937] border border-[#374151] flex items-center justify-center text-sm font-medium text-white">
                A
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
