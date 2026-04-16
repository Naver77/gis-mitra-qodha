"use client";
import React, { useState, useMemo } from 'react';

// --- DATA FAQ LENGKAP & TERSTRUKTUR ---
const faqData = [
  { id: 'produk', label: 'Produk & Keunggulan', icon: 'fa-box-open', items: [
      { q: 'Apa itu Qodha Aromatic?', a: 'Qodha Aromatic merupakan produsen wewangian sunnah yang memproduksi wewangian aromatic berkualitas dalam bentuk produk bukhur, dupa, hio dan juga parfum. Dikemas dalam berbagai macam jenis kemasan menarik, ukuran dan berbagai varian aroma mengesankan, elegan dengan harga yang terjangkau.' },
      { q: 'Apa Keunggulan Qodha Aromatic?', a: '<ul class="list-disc pl-4 space-y-1 text-gray-700"><li>Join Kemitraan rendah mulai dari 1jt saja.</li><li>Kemudahan Bermitra & Berbelanja.</li><li>Banyak Keuntungan & Program promo.</li><li>Pilihan aroma yang beragam & banyak pilihan.</li><li>Kualitas premium & kemasan sangat menarik.</li><li>Harga sangat terjangkau tentunya.</li></ul>' },
      { q: 'Apakah Produk Qodha Halal & sudah bersertifikat BPOM?', a: 'Alhamdulillah, inSyaAllah sudah dipastikan aman Halal. Sudah melalui tahapan pemeriksaan dan sudah mendapatkan Izin Edar resmi dari BPOM RI. Sehingga 💯 aman untuk digunakan dan produknya pun sudah tidak diragukan lagi.' },
      { q: 'Apakah Produk Qodha aman digunakan untuk ibadah?', a: 'Produk Qodha Aromatic dibuat mengunakan bahan yang halal dan sudah Bersertifikasi Halal MUI. Pastinya Produk Qodha bisa digunakan untuk kegiatan Ibadah seperti: <strong>Sholat, Pengajian, Tabligh, Dzikir, dan Kegiatan Ibadah lainnya.</strong>' },
      { q: 'Apakah parfum Qodha mengandung alkohol?', a: 'Produk Qodha Perfumes terbagi 2 Jenis:<br/><br/><strong>1. Eau De Perfume:</strong> Memiliki bahan campuran Absolute termasuk alkohol namun kandungannya 0% (aman untuk Ibadah). Absolute membuat spray yang menyebar, wanginya semerbak.<br/><br/><strong>2. Concentrate:</strong> Teksturnya lebih oily dibanding jenis parfum lainnya karena 100% concentrate tanpa bahan campuran (Non Alkohol).' }
    ]
  },
  { id: 'kemitraan', label: 'Kemitraan & Bisnis', icon: 'fa-handshake', items: [
      { q: 'Bagaimana Menjadi Mitra Qodha Aromatic?', a: 'Qodha Aromatic membuka 3 Level kemitraan yaitu: <strong>Distributor, Agen, dan Reseller</strong>. Masing-masing memiliki Harga Spesial dan Fasilitas Bonus Menarik.<br/><br/><strong class="text-brand-gold">Syarat Menjadi Mitra:</strong><br/><br/><strong>👑 Distributor:</strong><ul class="list-disc pl-4 mb-2 text-sm text-gray-600"><li>Pembelian pertama 6 karton / senilai Rp 6 Juta (Bisa Mix)</li><li>Pembelian ke-2 dst min 3 karton / senilai Rp 3 Juta</li></ul><strong>💎 Agen:</strong><ul class="list-disc pl-4 mb-2 text-sm text-gray-600"><li>Pembelian pertama 3 karton / senilai Rp 3 Juta (Bisa Mix)</li><li>Pembelian ke-2 dst min 1 karton / senilai Rp 1 Juta</li></ul><strong>🚀 Reseller:</strong><ul class="list-disc pl-4 mb-2 text-sm text-gray-600"><li>Pembelian pertama 1 Karton / senilai Rp 1 Juta (Bisa Mix)</li><li>Pembelian ke-2 dst min Lusinan</li></ul><br/><strong class="text-red-500">Ketentuan MITRA:</strong><ul class="list-disc pl-4 text-sm text-gray-600"><li>Repeat order min 1x / Bulan.</li><li>Lebih dari 3 bulan vakum akan dihapus dari member kemitraan (tidak mendapatkan harga mitra lagi).</li></ul>' },
      { q: 'Bagaimana cara order / join Kemitraan?', a: '<ol class="list-decimal pl-4 space-y-2 text-gray-700"><li>Hubungi kami melalui WhatsApp untuk konsultasi dan tanya info lebih lanjut.</li><li>Pilih Kategori Kemitraan sesuai S&K.</li><li>Pilih jenis produk & aroma yg mau diorder.</li><li>Lakukan pembayaran sesuai rincian invoice yg dikirim.</li><li>Setelah selesai, pesanan dikirim ke alamat Anda, atau siap diambil.</li></ol>' },
      { q: 'Apa Keuntungan Menjadi Mitra Qodha Aromatic?', a: 'Mendapatkan harga terbaik mitra sesuai kategori, serta:<ul class="list-none pl-0 mt-2 space-y-1 text-gray-700"><li>✅ Hard & Soft Copy Katalog</li><li>✅ Bonus Akrilik / Display Tempat Parfum (jika ambil parfum)</li><li>✅ Dibuatkan Spanduk Resmi Kemitraan</li><li>✅ Free Konsultasi Advertising, Content Marketing & Sosmed</li><li>✅ Free Konsultasi Manajemen & Training</li><li>✅ Free Produk Tester / Sample Produk Terbaru</li><li>✅ Program Promo Bulanan & Event Tertentu</li></ul>' }
    ]
  },
  { id: 'pemesanan', label: 'Pemesanan & Konsultasi', icon: 'fa-headset', items: [
      { q: 'Berapa jumlah minimum pemesanan (MOQ)?', a: '<strong>Tanpa minimum order.</strong> Jadi Anda bisa order eceran satuan juga dengan harga HET (Harga Eceran Tertinggi). Jika ingin mendapatkan harga lebih murah, silakan order dengan kategori kemitraan 😊' },
      { q: 'Apakah bisa mix aroma dalam pesanan?', a: '<strong>Ya, Bisa Banget!</strong> Anda dapat memilih berbagai pilihan aroma yang tersedia dari katalog Kami dalam satu pesanan tertentu. Saat ini kami menyediakan puluhan aroma tercipta di setiap jenis produknya.<br/><br/>Jika Anda membutuhkan rekomendasi aroma Bestseller, silakan menghubungi CS kami.' },
      { q: 'Apakah bisa mencoba aroma awalan terlebih dahulu?', a: 'Ya, kami menyediakan sampel tester setiap aroma untuk Anda coba sebelum memesan dalam jumlah besar di store.' },
      { q: 'Apakah bisa konsultasi sebelum order?', a: 'Tentu! Kami siap membantu Anda dengan senang hati 😊. Jangan ragu untuk menghubungi nomor resmi Customer Service kami untuk informasi lebih lanjut.' },
      { q: 'Bagaimana cara menghubungi customer service?', a: 'Anda bisa menghubungi kami melalui:<br/><br/>📞 <strong>WhatsApp:</strong> +62817-1730-2223<br/><br/>🏢 <strong>Gallery Store:</strong><br/>Jl. Empang No.29B, Empang, Kec. Bogor Sel., Kota Bogor, Jawa Barat 16132, Indonesia.' }
    ]
  },
  { id: 'pengiriman', label: 'Pembayaran & Pengiriman', icon: 'fa-truck-fast', items: [
      { q: 'Apakah pembayaran bisa dilakukan dengan sistem COD?', a: 'Pemesanan Qodha melalui pusat dilakukan dengan sistem <strong>Transfer Bank</strong>. Barang akan dikirim setelah pembayaran diterima.<br/><br/>Sistem COD hanya tersedia untuk pembelian retail melalui e-commerce resmi kami seperti Shopee, Lazada, dan Tokopedia / Tiktok Shop.' },
      { q: 'Apa saja ekspedisi yang digunakan untuk pengiriman Qodha?', a: 'Kami telah bekerjasama dengan beberapa perusahaan Logistik ternama, Baik layanan Cargo maupun Express. Dengan biaya tarif yang relatif Ekonomis dan keamanannya terjamin 👌' },
      { q: 'Apakah Produk Qodha bisa dikirim ke luar negeri?', a: 'Produk Qodha sudah tersebar ke berbagai wilayah di seluruh Indonesia. Tidak hanya itu, Qodha Aromatic juga sudah berhasil melakukan ekspor dan tersebar ke Luar Negeri seperti negara <strong>Malaysia & Singapura</strong>.' }
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
    <div className="bg-gray-50 min-h-screen pb-20">
      
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
        
        {/* TABS - FIX UI: Tombol Aktif berwarna Emas/Orange dengan teks gelap */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm border ${activeTab === 'all' ? 'bg-brand-gold text-gray-900 border-brand-gold scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-gold hover:text-brand-gold'}`}
          >
            Semua Topik
          </button>
          {faqData.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-sm border flex items-center gap-2 ${activeTab === cat.id ? 'bg-brand-gold text-gray-900 border-brand-gold scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-gold hover:text-brand-gold'}`}
            >
              <i className={`fa-solid ${cat.icon}`}></i> {cat.label}
            </button>
          ))}
        </div>

        {/* LIST KONTEN */}
        <div className="space-y-10">
          {filteredData.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm animate-fade-in-up">
              <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300 text-3xl">
                <i className="fa-solid fa-face-frown-open"></i>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900">Pertanyaan tidak ditemukan</h3>
              <p className="text-gray-500 mt-2 font-medium">Coba gunakan kata kunci lain atau hubungi kami langsung.</p>
            </div>
          ) : (
            filteredData.map((category, catIdx) => (
              <div key={category.id} className="animate-fade-in-up" style={{ animationDelay: `${catIdx * 0.1}s` }}>
                
                {/* FIX UI: Judul tanpa shape/background, tampil bersih dan elegan */}
                {activeTab === 'all' && (
                  <div className="flex items-center gap-3 mb-5 px-2">
                    <i className={`fa-solid ${category.icon} text-brand-gold text-2xl`}></i>
                    <h3 className="text-xl font-extrabold text-gray-900">
                      {category.label}
                    </h3>
                  </div>
                )}
                
                {/* Accordion List */}
                <div className="space-y-4">
                  {category.items.map((item, idx) => (
                    <details key={idx} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 [&_summary::-webkit-details-marker]:hidden">
                      
                      <summary className="flex items-center justify-between w-full p-5 md:p-6 cursor-pointer select-none bg-white relative z-10 list-none outline-none">
                        <h4 className="text-base font-bold text-gray-900 pr-8 group-hover:text-brand-gold transition leading-tight">{item.q}</h4>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-open:bg-brand-gold group-open:text-gray-900 transition shrink-0 border border-gray-100 group-open:border-brand-gold">
                          <i className="fa-solid fa-plus transition-transform duration-300 group-open:rotate-45"></i>
                        </div>
                      </summary>
                      
                      {/* Jawaban dengan Line Height dan Typography yang baik */}
                      <div className="px-5 md:px-6 pb-6 pt-0 text-gray-600 text-sm md:text-base leading-relaxed border-t border-transparent group-open:border-gray-100 bg-gray-50/30">
                        <div className="pt-5 font-medium" dangerouslySetInnerHTML={{ __html: item.a }} />
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