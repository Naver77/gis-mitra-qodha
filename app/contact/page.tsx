"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Memanggil peta secara dinamis khusus di Client
const DynamicContactMap = dynamic(() => import('@/components/ContactMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400 font-bold">Memuat Peta...</div>
});

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', subject: 'Pertanyaan Produk', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waNumber = "6281717302223"; 
    const text = `Halo Admin Qodha!%0A%0A*Nama:* ${formData.name}%0A*Subjek:* ${formData.subject}%0A*Pesan:*%0A${formData.message}`;
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-0">
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-gray-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold rounded-full filter blur-[120px] opacity-20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-3 block">Customer Service</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">Kami Siap Membantu Anda</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Hubungi kami untuk konsultasi produk, pendaftaran kemitraan, atau kunjungi langsung gallery store kami di Bogor.
          </p>
        </div>
      </section>

      {/* 2. CONTACT CARDS */}
      <section className="relative z-20 -mt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-b-4 border-green-500 hover:-translate-y-2 transition duration-300 group">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-green-500 group-hover:text-white transition">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">WhatsApp Official</h3>
              <p className="text-gray-500 text-sm mb-6">Respon cepat untuk konsultasi & order.</p>
              <a href="https://wa.me/6281717302223" target="_blank" rel="noreferrer" className="text-green-600 font-bold hover:underline flex items-center gap-2">
                +62 817-1730-2223 <i className="fa-solid fa-arrow-right text-xs"></i>
              </a>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-b-4 border-brand-gold hover:-translate-y-2 transition duration-300 group">
              <div className="w-16 h-16 bg-yellow-50 text-brand-gold rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-brand-gold group-hover:text-white transition">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Email Bisnis</h3>
              <p className="text-gray-500 text-sm mb-6">Untuk penawaran B2B & kerjasama.</p>
              <a href="mailto:cs@qodha.id" className="text-brand-gold font-bold hover:underline flex items-center gap-2">
                cs@qodha.id <i className="fa-solid fa-arrow-right text-xs"></i>
              </a>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border-b-4 border-gray-800 hover:-translate-y-2 transition duration-300 group">
              <div className="w-16 h-16 bg-gray-50 text-gray-800 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-gray-800 group-hover:text-white transition">
                <i className="fa-solid fa-store"></i>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2">Gallery Store</h3>
              <p className="text-gray-500 text-sm mb-6">Kunjungi toko fisik kami langsung.</p>
              <a href="#store" className="text-gray-800 font-bold hover:underline flex items-center gap-2">
                Lihat Peta Lokasi <i className="fa-solid fa-arrow-down text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STORE LOCATION & MAP */}
      <section id="store" className="py-20 bg-white border-t border-gray-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-brand-gold font-bold tracking-widest text-sm uppercase bg-yellow-50 px-4 py-1.5 rounded-full border border-yellow-100">Gallery Pusat</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Mampir & Cium Langsung Aromanya</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Kami berlokasi strategis di pusat kota Bogor. Ratusan varian produk siap Anda coba secara langsung di lokasi.
              </p>
              
              <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-200 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                    <i className="fa-solid fa-map-location-dot text-brand-gold text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Alamat Lengkap</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Jl. Empang No.29B, Empang, Kec. Bogor Sel., Kota Bogor, Jawa Barat 16132
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 border border-gray-100">
                    <i className="fa-solid fa-clock text-brand-gold text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Jam Operasional</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Senin - Sabtu: 08.00 - 17.00 WIB<br/>
                      <span className="text-red-500 font-bold">Minggu Tutup</span>
                    </p>
                  </div>
                </div>
              </div>

              <a href="https://maps.google.com/?q=-6.6071015,106.795234" target="_blank" rel="noreferrer" className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition shadow-lg w-full sm:w-auto justify-center group">
                <i className="fa-solid fa-diamond-turn-right mr-2 group-hover:-translate-y-1 transition-transform"></i> Petunjuk Arah
              </a>
            </div>

            <div className="relative h-112.5 md:h-125 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-200">
              <DynamicContactMap />
            </div>

          </div>
        </div>
      </section>

      {/* 4. FORM KIRIM PESAN */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Tinggalkan Pesan</h2>
            <p className="text-gray-500 text-lg">Punya pertanyaan khusus? Isi formulir di bawah ini.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-[100px] -z-10"></div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Nama Lengkap</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Nomor WhatsApp</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition font-medium" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Topik Pesan</label>
                <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition cursor-pointer font-medium text-gray-700">
                  <option>Pertanyaan Produk</option>
                  <option>Info Kemitraan</option>
                  <option>Komplain / Laporan</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Pesan Anda</label>
                <textarea rows={4} required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition resize-none font-medium"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-brand-gold text-gray-900 font-extrabold rounded-xl hover:bg-yellow-500 transition shadow-[0_10px_20px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2 group">
                <i className="fa-brands fa-whatsapp text-green-700 text-lg group-hover:scale-125 transition-transform"></i> Kirim via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}