import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onFloatingWaClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onFloatingWaClick }) => {
  // State untuk mengontrol akordion menu di versi mobile
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    // Jika di desktop, abaikan klik (karena menu selalu terbuka)
    if (window.innerWidth >= 768) return;
    
    // Toggle buka/tutup
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  // Fungsi untuk API Analitik (Berjalan di background)
  const catatKlik = (tipe: string, id: string) => {
    const formData = new FormData();
    formData.append('type', tipe);
    formData.append('id', id);
    
    // Catatan: Pastikan endpoint URL ini disesuaikan nanti dengan lokasi backend Anda
    fetch('/api/log_click.php', {
      method: 'POST',
      body: formData
    }).catch(err => console.log('Log error:', err));
  };

  return (
    <>
      <footer className="bg-gray-950 text-gray-400 border-t border-gray-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Kolom 1: Profil */}
            <div className="space-y-4">
              <img src="/assets/img/qodhawhite.png" className="h-10 brightness-0 invert opacity-90" alt="Logo White" />
              <p className="text-xs leading-relaxed text-gray-400">
                Produsen wewangian Sunnah berkualitas tinggi dengan bahan alami. Menghadirkan ketenangan dan keberkahan aroma di setiap aktivitas ibadah Anda.
              </p>
              <div className="pt-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Terverifikasi Oleh</p>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white rounded p-1 h-8 w-auto flex items-center justify-center shadow-lg">
                    <img src="/assets/img/banggabuatanindonesia.png" className="h-full w-auto object-contain" alt="BBI" />
                  </div>
                  <div className="bg-white rounded p-1 h-8 w-auto flex items-center justify-center shadow-lg">
                    <img src="/assets/img/halal.png" className="h-full w-auto object-contain" alt="Halal" />
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom 2: Jelajahi */}
            <div className="border-t border-gray-800 md:border-none pt-4 md:pt-0">
              <button onClick={() => toggleSection('jelajahi')} className="w-full flex justify-between items-center text-left md:cursor-default group focus:outline-none">
                <h4 className="text-white font-bold uppercase text-xs tracking-wider border-l-2 border-brand-gold pl-3">Jelajahi</h4>
                <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 md:hidden ${openSection === 'jelajahi' ? 'rotate-180' : ''}`}></i>
              </button>
              <ul className={`space-y-2 text-sm mt-4 md:block ${openSection === 'jelajahi' ? 'block' : 'hidden'}`}>
                <li><Link to="/" className="hover:text-brand-gold transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px] text-gray-600"></i> Beranda</Link></li>
                <li><Link to="/products" className="hover:text-brand-gold transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px] text-gray-600"></i> Katalog Produk</Link></li>
                <li><Link to="/distributor" className="hover:text-brand-gold transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px] text-gray-600"></i> Peta Sebaran Mitra</Link></li>
                <li><Link to="/partnership" className="hover:text-brand-gold transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px] text-gray-600"></i> Peluang Kemitraan</Link></li>
                <li><Link to="/faq" className="hover:text-brand-gold transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px] text-gray-600"></i> Bantuan & FAQ</Link></li>
              </ul>
            </div>

            {/* Kolom 3: Store & Sosmed */}
            <div className="flex flex-col gap-0 md:gap-10 border-t border-gray-800 md:border-none">
              
              <div className="pt-4 md:pt-0 pb-4 md:pb-0 border-b border-gray-800 md:border-none">
                <button onClick={() => toggleSection('store')} className="w-full flex justify-between items-center text-left md:cursor-default group focus:outline-none">
                  <h4 className="text-white font-bold uppercase text-xs tracking-wider border-l-2 border-brand-gold pl-3">Official Store</h4>
                  <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 md:hidden ${openSection === 'store' ? 'rotate-180' : ''}`}></i>
                </button>
                <div className={`mt-4 md:block ${openSection === 'store' ? 'block' : 'hidden'}`}>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.tokopedia.com/qodha" target="_blank" rel="noreferrer" onClick={() => catatKlik('store', 'tokopedia')} className="group w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:ring-2 hover:ring-[#42b549]" title="Tokopedia">
                      <img src="/assets/img/tokopedia.png" className="w-6 h-6 object-contain" alt="Tokopedia" />
                    </a>
                    <a href="https://shopee.co.id/qodha.id" target="_blank" rel="noreferrer" onClick={() => catatKlik('store', 'shopee')} className="group w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:ring-2 hover:ring-[#ee4d2d]" title="Shopee">
                      <img src="/assets/img/shopee.png" className="w-6 h-6 object-contain" alt="Shopee" />
                    </a>
                    <a href="https://www.tiktok.com/@qodhaaromatic" target="_blank" rel="noreferrer" onClick={() => catatKlik('store', 'tiktok')} className="group w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:ring-2 hover:ring-[#0f146d]" title="TikTok">
                      <img src="/assets/img/tiktok.png" className="w-6 h-6 object-contain" alt="TikTok" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 md:pt-0">
                <button onClick={() => toggleSection('sosmed')} className="w-full flex justify-between items-center text-left md:cursor-default group focus:outline-none">
                  <h4 className="text-white font-bold uppercase text-xs tracking-wider border-l-2 border-gray-700 pl-3">Ikuti Kami</h4>
                  <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 md:hidden ${openSection === 'sosmed' ? 'rotate-180' : ''}`}></i>
                </button>
                <div className={`mt-4 md:block ${openSection === 'sosmed' ? 'block' : 'hidden'}`}>
                  <div className="flex gap-3">
                    <a href="https://www.instagram.com/qodha.id/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 shadow-lg text-sm" title="Instagram">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://www.facebook.com/qodhaaromatic" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg text-sm" title="Facebook">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="https://www.youtube.com/channel/UC3MouHTaJ5rD90jzYENTzqQ" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg text-sm" title="YouTube">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom 4: Kontak */}
            <div className="border-t border-gray-800 md:border-none pt-4 md:pt-0">
              <button onClick={() => toggleSection('kontak')} className="w-full flex justify-between items-center text-left md:cursor-default group focus:outline-none">
                <h4 className="text-white font-bold uppercase text-xs tracking-wider border-l-2 border-brand-gold pl-3">Hubungi Kami</h4>
                <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 md:hidden ${openSection === 'kontak' ? 'rotate-180' : ''}`}></i>
              </button>
              
              <div className={`mt-4 md:block ${openSection === 'kontak' ? 'block' : 'hidden'}`}>
                <ul className="space-y-3 text-sm mb-6">
                  <li className="flex items-start gap-3">
                    <i className="fa-solid fa-map-location-dot text-brand-gold mt-1"></i>
                    <span className="leading-snug text-xs">Bogor, Jawa Barat<br /><span className="text-[10px] text-gray-500">(Pusat Distribusi)</span></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-brands fa-whatsapp text-brand-gold"></i>
                    <a href="https://wa.me/6281717302223" target="_blank" rel="noreferrer" className="hover:text-white font-semibold transition text-xs">+62 817 1730 2223</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fa-regular fa-envelope text-brand-gold"></i>
                    <a href="mailto:info@qodha.id" className="hover:text-white transition text-xs">info@qodha.id</a>
                  </li>
                </ul>

                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-800">
                  <h5 className="text-white text-[10px] font-bold uppercase mb-2 flex items-center gap-2">
                    <i className="fa-regular fa-clock text-brand-green"></i> Jam Operasional
                  </h5>
                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between">
                      <span>Senin - Sabtu</span>
                      <span className="text-white font-mono">08:00 - 16:45</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Minggu / Libur</span>
                      <span className="text-red-400">Tutup</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="border-t border-gray-800 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-gray-500">
              <p>&copy; 2026 Qodha Aromatic WebGIS. All rights reserved.</p>
              <div className="flex gap-4">
                <Link to="#" className="hover:text-white transition">Privacy Policy</Link>
                <Link to="#" className="hover:text-white transition">Terms</Link>
                <Link to="#" className="hover:text-white transition">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button - Terhubung dengan Lead Modal */}
      <button 
        onClick={onFloatingWaClick}
        className="fixed bottom-6 right-6 z-[99] group flex items-center justify-center outline-none"
        aria-label="Chat Admin"
      >
        <div className="absolute right-16 bg-white text-gray-800 px-3 py-1.5 rounded-lg shadow-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
          Chat Admin
          <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
        </div>
        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-green-600 transition transform hover:scale-110 animate-bounce-slow">
          <i className="fa-brands fa-whatsapp text-3xl"></i>
        </div>
        <span className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping opacity-75"></span>
      </button>
    </>
  );
};

export default Footer;