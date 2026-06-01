"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SecurityWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Jangan aktifkan keamanan di halaman login
  const isLoginPage = pathname?.includes("/login");

  useEffect(() => {
    if (typeof window === "undefined" || isLoginPage) return;

    // FUNGSI UNTUK MEMASANG JEBAKAN HISTORY
    const armTrap = () => {
      // Hanya pasang jebakan jika state browser saat ini BUKAN jebakan kita
      if (!window.history.state?.isTrap) {
        window.history.pushState({ isTrap: true }, "", window.location.href);
      }
    };

    // 1. Pasang jebakan secara otomatis saat halaman pertama kali dirender
    armTrap();

    const handlePopState = (event: PopStateEvent) => {
      // 2. Saat user Swipe Back / Undo, mereka mundur ke history asli Next.js
      // yang mana TIDAK memiliki properti `isTrap: true`.
      if (!event.state?.isTrap) {
        
        // 3. Pasang kembali jebakannya SECEPAT KILAT!
        // Ini menggagalkan pergerakan mundur & sekaligus menghancurkan Redo (Forward History)
        armTrap();
        
        // 4. Tampilkan Modal UI Sistem Kita
        setShowSecurityModal(true);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname, isLoginPage]);

  const handleForceLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout gagal:", error);
    } finally {
      // Hancurkan cookie & lempar secara paksa ke login
      document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      setShowSecurityModal(false);
      window.location.href = "/admin/login"; 
    }
  };

  const handleStay = () => {
    // Jebakan history sudah otomatis dipasang ulang oleh handlePopState
    // Jadi di sini kita cukup menutup modal saja
    setShowSecurityModal(false);
  };

  if (isLoginPage) return <>{children}</>;

  return (
    <>
      {children}

      {/* 🛑 MODAL NOTIFIKASI SISTEM (Custom UI/UX) */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-999999 flex items-center justify-center p-4 sm:p-6 bg-gray-900/80 backdrop-blur-sm animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 text-center border-2 border-red-100 animate-zoom-in relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-500 to-orange-500"></div>
            
            <div className="w-16 h-16 mx-auto bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner">
              <i className="fa-solid fa-circle-exclamation"></i>
            </div>
            
            <p className="text-gray-800 font-bold mb-8 text-lg">
              Anda ingin keluar atau tetap pada halaman?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleStay}
                disabled={isLoggingOut}
                className="flex-1 px-4 py-3 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer outline-none"
              >
                Tetap Stay
              </button>
              <button 
                onClick={handleForceLogout}
                disabled={isLoggingOut}
                className="flex-1 px-4 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30 cursor-pointer outline-none disabled:opacity-50"
              >
                {isLoggingOut ? "Keluar..." : "Iya, Keluar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}