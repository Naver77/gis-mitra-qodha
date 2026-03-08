"use client";
import React, { useState, useMemo } from 'react';

// --- DATA ---
const faqData = [
  { id: 'umum', label: 'Umum & Tentang Kami', icon: 'fa-circle-info', items: [
      { q: 'Apa itu Qodha Aromatic?', a: 'Qodha Aromatic merupakan produsen wewangian sunnah yang memproduksi wewangian aromatic berkualitas dalam bentuk produk bukhur, dupa, hio dan juga parfum. Di kemas dalam berbagai macam jenis kemasan menarik, ukuran dan berbagai varian aroma elegan.' },
      { q: 'Apakah produk Qodha Halal & bersertifikat BPOM?', a: 'Alhamdulillah, inSyaAllah sudah dipastikan aman Halal. Sudah melalui tahapan pemeriksaan dan mendapatkan Izin Edar resmi dari BPOM RI. Sehingga 100% aman untuk digunakan.' }
    ]
  },
  { id: 'kemitraan', label: 'Kemitraan & Bisnis', icon: 'fa-handshake', items: [
      { q: 'Bagaimana Menjadi Mitra Qodha Aromatic?', a: 'Qodha Aromatic membuka 3 Level kemitraan: <strong>Distributor, Agen, dan Reseller</strong>. Modal awal sangat terjangkau mulai dari Rp 1 Jutaan saja.' },
      { q: 'Apa Keuntungan Menjadi Mitra?', a: '<ul class="list-disc pl-4 mt-2 space-y-1"><li>Harga khusus mitra dengan margin besar</li><li>Support materi marketing (Foto & Video)</li><li>Free produk tester & brosur cetak</li></ul>' }
    ]
  },
  { id: 'pemesanan', label: 'Pemesanan & Pengiriman', icon: 'fa-truck-fast', items: [
      { q: 'Berapa minimum order (MOQ)?', a: 'Tanpa minimum order jika berbelanja sebagai retail. Anda bisa order satuan ecer.' },
      { q: 'Apakah bisa sistem COD?', a: 'Pemesanan langsung ke pusat melalui <strong>Transfer Bank</strong>. COD hanya tersedia di Marketplace resmi kami (Shopee/Tokopedia).' }
    ]
  }
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredData = useMemo(() => {
    return faqData.map(category => {
      const matchedItems = category.items.filter(item => 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...category, items: matchedItems };
    }).filter(category => {
      const matchTab = activeTab === 'all' || category.id === activeTab;
      return matchTab && category.items.length > 0;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-[85px]">
      
      {/* HEADER SEARCH */}
      <section className="relative bg-gray-900 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-gold rounded-full filter blur-[100px] opacity-20"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-3 block animate-fade-in-up">Pusat Bantuan</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Apa yang bisa kami bantu?</h1>
          
          <div className="relative max-w-xl mx-auto group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari (misal: Mitra, Reseller, Halal)..." 
              className="w-full py-4 pl-14 pr-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:bg-white/20 transition shadow-lg font-medium"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-brand-gold transition"></i>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        
        {/* TABS */}
        <div className="flex overflow-x-auto pb-4 gap-3 mb-8 justify-start md:justify-center hide-scrollbar">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm border ${activeTab === 'all' ? 'bg-gray-900 text-brand-gold border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-gold hover:text-brand-gold'}`}
          >
            Semua Topik
          </button>
          {faqData.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm border flex items-center gap-2 ${activeTab === cat.id ? 'bg-gray-900 text-brand-gold border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-gold hover:text-brand-gold'}`}
            >
              <i className={`fa-solid ${cat.icon}`}></i> {cat.label}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="space-y-8">
          {filteredData.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-[2rem] border border-gray-100 shadow-sm animate-fade-in-up">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300 text-3xl">
                <i className="fa-solid fa-face-frown-open"></i>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900">Pertanyaan tidak ditemukan</h3>
              <p className="text-gray-500 mt-2 font-medium">Coba gunakan kata kunci lain atau hubungi kami langsung.</p>
            </div>
          ) : (
            filteredData.map(category => (
              <div key={category.id} className="animate-fade-in-up">
                {activeTab === 'all' && (
                  <h3 className="text-xl font-extrabold text-gray-900 mb-4 px-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-brand-gold">
                      <i className={`fa-solid ${category.icon}`}></i>
                    </div> 
                    {category.label}
                  </h3>
                )}
                <div className="space-y-3">
                  {category.items.map((item, idx) => (
                    <details key={idx} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between w-full p-5 md:p-6 cursor-pointer select-none bg-white relative z-10 list-none">
                        <h4 className="text-base font-bold text-gray-900 pr-8 group-hover:text-brand-gold transition">{item.q}</h4>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-open:bg-brand-gold group-open:text-gray-900 transition flex-shrink-0">
                          <i className="fa-solid fa-plus transition-transform duration-300 group-open:rotate-45"></i>
                        </div>
                      </summary>
                      <div className="px-5 md:px-6 pb-6 pt-0 text-gray-600 text-sm md:text-base leading-relaxed border-t border-transparent group-open:border-gray-100 bg-gray-50/50">
                        <div className="pt-4 font-medium" dangerouslySetInnerHTML={{ __html: item.a }} />
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}