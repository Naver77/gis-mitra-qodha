import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Mengambil info URL halaman saat ini untuk efek "active"
  const location = useLocation();

  // Fungsi pengganti navClass di PHP
  const getNavClass = (path: string) => {
    const isActive = location.pathname === path;
    return `px-3 py-2 text-sm font-bold transition flex items-center gap-1 ${
      isActive ? 'text-brand-gold' : 'text-gray-600 hover:text-brand-gold'
    }`;
  };

  // Logika Scroll (Pengganti JavaScript lama)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Sembunyikan navbar jika scroll ke bawah > 100px
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        if (isMobileMenuOpen) setIsMobileMenuOpen(false); // Tutup menu jika terbuka
      } else {
        setIsVisible(true);
      }

      // Tambahkan efek shadow/glass saat di-scroll > 50px
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // Dynamic Classes untuk efek Navbar
  const navbarClasses = `
    fixed z-50 transition-all duration-300 h-[85px] top-0 
    bg-white/95 backdrop-blur-md border-b-2 border-brand-gold
    ${isVisible ? 'translate-y-0' : '-translate-y-full'}
    ${isScrolled ? 'shadow-md' : ''}
    ${isScrolled && window.innerWidth < 768 ? 'w-[90%] left-[5%] top-4 rounded-2xl border border-gray-200' : 'w-full rounded-none left-0'}
  `;

  return (
    <nav className={navbarClasses}>
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-full">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/assets/img/qodhablack.png" alt="Qodha" className="h-10 md:h-12 w-auto object-contain transition transform group-hover:scale-105" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            
            <Link to="/" className={getNavClass('/')}>
              Beranda
            </Link>

            {/* Dropdown Produk */}
            <div className="relative group h-full flex items-center">
              <button className="px-3 py-2 text-sm font-bold text-gray-600 hover:text-brand-gold transition group-hover:text-brand-gold flex items-center gap-1">
                Produk <i className="fa-solid fa-chevron-down text-[10px] mt-0.5 ml-1 transition-transform group-hover:rotate-180"></i>
              </button>
              
              {/* Menu Dropdown via Tailwind group-hover */}
              <div className="absolute top-[60px] left-0 w-64 pt-4 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 ease-out">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black ring-opacity-5">
                  <Link to="/products?category=all" className="block px-4 py-3 text-sm font-bold text-gray-800 hover:bg-orange-50 hover:text-brand-gold border-b border-gray-100 transition">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center text-xs"><i className="fa-solid fa-box-open"></i></div>
                      <span>Semua Katalog</span>
                    </div>
                  </Link>
                  <div className="py-2">
                    <p className="px-4 text-[10px] uppercase font-extrabold text-gray-400 tracking-wider mb-1">Kategori</p>
                    <Link to="/products?category=bukhur" className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition flex items-center gap-2"><i className="fa-solid fa-cloud text-stone-400 w-4 text-center"></i> Bukhur</Link>
                    <Link to="/products?category=dupa" className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition flex items-center gap-2"><i className="fa-solid fa-fire text-orange-400 w-4 text-center"></i> Dupa</Link>
                    <Link to="/products?category=parfum" className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition flex items-center gap-2"><i className="fa-solid fa-spray-can text-purple-400 w-4 text-center"></i> Parfum</Link>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/distributor" className="px-4 py-2 text-sm font-bold text-white bg-brand-green rounded-full shadow-md hover:bg-emerald-600 hover:shadow-glow transition transform hover:-translate-y-0.5 flex items-center gap-2">
              <i className="fa-solid fa-map-location-dot"></i> Peta Sebaran
            </Link>

            <Link to="/partnership" className={getNavClass('/partnership')}>
              Kemitraan
            </Link>
            
            {/* Dropdown Bantuan */}
            <div className="relative group h-full flex items-center">
              <button className="px-3 py-2 text-sm font-bold text-gray-600 hover:text-brand-gold transition group-hover:text-brand-gold flex items-center gap-1">
                Bantuan <i className="fa-solid fa-chevron-down text-[10px] mt-0.5 ml-1 transition-transform group-hover:rotate-180"></i>
              </button>
              <div className="absolute top-[60px] right-0 w-56 pt-4 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200 ease-out">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black ring-opacity-5">
                  <Link to="/about" className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition border-b border-gray-50">
                    <i className="fa-regular fa-building mr-2 text-gray-400"></i> Profil Qodha
                  </Link>
                  <Link to="/faq" className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition border-b border-gray-50">
                    <i className="fa-regular fa-circle-question mr-2 text-gray-400"></i> Tanya Jawab (FAQ)
                  </Link>
                  <Link to="/contact" className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition">
                    <i className="fa-regular fa-envelope mr-2 text-gray-400"></i> Hubungi Kami
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-brand-gold p-2 transition rounded-full hover:bg-gray-50">
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-[80px] left-0 w-full bg-white/95 backdrop-blur-md rounded-b-2xl shadow-xl border-t border-gray-100 md:hidden max-h-[80vh] overflow-y-auto transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
        <div className="p-4 space-y-2">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-brand-gold">Beranda</Link>
          <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-brand-gold">Katalog Produk</Link>
          <Link to="/distributor" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl font-bold text-white bg-brand-green text-center shadow-md"><i className="fa-solid fa-map-location-dot mr-2"></i> Peta Mitra</Link>
          <Link to="/partnership" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl font-bold text-gray-700 hover:bg-orange-50 hover:text-brand-gold">Kemitraan</Link>
          
          <div className="border-t border-gray-100 mt-2 pt-2">
            <p className="px-4 text-xs font-bold text-gray-400 uppercase mb-1">Bantuan</p>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:text-brand-gold">Profil Perusahaan</Link>
            <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:text-brand-gold">FAQ</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-600 hover:text-brand-gold">Hubungi Kami</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;