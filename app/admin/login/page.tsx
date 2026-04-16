"use client";
import React, { useState, useTransition } from 'react';
import { loginAdmin } from '@/lib/auth'; // FIX: Mengarah ke file lib/auth.ts Anda
import Link from 'next/link';

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    
    const formData = new FormData(e.currentTarget);
    
    // Menjalankan Server Action di Background
    startTransition(async () => {
      const result = await loginAdmin(null, formData);
      
      if (result?.error) {
        setErrorMsg(result.error);
      } else if (result?.success) {
        // MENGHANCURKAN CACHE: Paksa browser memuat ulang halaman dari awal (Hard Reload)
        // Agar browser lupa kalau sebelumnya halaman menu-menu admin pernah dikunci
        window.location.href = '/admin';
      }
    });
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen relative overflow-hidden">
      
      {/* Background Ornamen (Sesuai Desain PHP Anda) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-amber-500 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
      {/* FIX: class diubah menjadi className */}
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20 animate-pulse"></div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 animate-fade-in-up">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gray-900/20">
            <i className="fa-solid fa-shield-halved text-2xl text-brand-gold"></i>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Qodha Admin</h1>
          <p className="text-gray-500 text-sm mt-1.5 font-medium">Pusat Kendali Sistem Kemitraan</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm text-center font-bold flex items-center justify-center gap-2">
            <i className="fa-solid fa-triangle-exclamation"></i> {errorMsg}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 text-[10px] md:text-xs font-black mb-2 uppercase tracking-widest">Username</label>
            <div className="relative">
              <input 
                type="text" 
                name="username" 
                required 
                autoFocus
                disabled={isPending}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:outline-none transition-all font-medium disabled:opacity-50" 
                placeholder="Masukkan username" 
              />
              <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 text-[10px] md:text-xs font-black mb-2 uppercase tracking-widest">Password</label>
            <div className="relative">
              <input 
                type="password" 
                name="password" 
                required 
                disabled={isPending}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 focus:bg-white focus:outline-none transition-all font-medium disabled:opacity-50" 
                placeholder="••••••••" 
              />
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-gray-900 text-white font-black py-4 rounded-xl hover:bg-brand-gold hover:text-gray-900 transition-all duration-300 shadow-xl shadow-gray-900/20 mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isPending ? (
              <><i className="fa-solid fa-circle-notch fa-spin"></i> MEMPROSES...</>
            ) : (
              <>MASUK DASHBOARD <i className="fa-solid fa-arrow-right-to-bracket group-hover:translate-x-1 transition-transform"></i></>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center gap-1.5 w-fit mx-auto">
            <i className="fa-solid fa-arrow-left"></i> Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </div>
  );
}