"use client";
import React, { useState, useEffect } from 'react';
import { getTopProduk, getTopMitra } from './actions';

interface TopProduk {
  nama_produk: string;
  total_klik: number;
}

interface TopMitra {
  nama_toko: string;
  alamat: string;
  total_klik: number;
}

export default function LaporanPage() {
  const [topProduk, setTopProduk] = useState<TopProduk[]>([]);
  const [topMitra, setTopMitra] = useState<TopMitra[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([getTopProduk(), getTopMitra()]).then(([produkData, mitraData]) => {
      setTopProduk(produkData as unknown as TopProduk[]);
      setTopMitra(mitraData as unknown as TopMitra[]);
      setIsLoading(false);
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in-up">
      {/* HEADER (Sembunyikan saat dicetak) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Laporan Analisis Performa</h1>
          <p className="text-gray-500 text-sm mt-1">Insight interaksi pengunjung WebGIS Qodha Aromatic.</p>
        </div>
        <button onClick={handlePrint} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-gold hover:text-gray-900 transition-all shadow-lg flex items-center gap-2">
          <i className="fa-solid fa-print"></i> Cetak Laporan (PDF)
        </button>
      </div>

      {/* HEADER KHUSUS PRINT (Hanya muncul di kertas PDF) */}
      <div className="hidden print:block text-center mb-8 border-b-2 border-gray-900 pb-4">
        <h1 className="text-3xl font-black text-gray-900">QODHA AROMATIC</h1>
        <p className="text-gray-600">Laporan Statistik Kinerja Mitra & Produk WebGIS</p>
        <p className="text-sm text-gray-500 mt-2">Dicetak pada: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</p>
      </div>

      {/* KONTEN UTAMA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
        {/* TABEL TOP PRODUK */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 print:shadow-none print:border-gray-300">
          <h3 className="font-extrabold text-gray-900 mb-6 flex items-center gap-3 text-lg">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 print:hidden">
              <i className="fa-solid fa-fire"></i>
            </div>
            Produk Paling Diminati
          </h3>
          
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-widest font-black print:bg-gray-100">
              <tr>
                <th className="p-4 rounded-tl-xl rounded-bl-xl print:rounded-none">Nama Produk</th>
                <th className="p-4 text-center rounded-tr-xl rounded-br-xl print:rounded-none">Interaksi (Klik)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={2} className="p-6 text-center text-gray-400 font-bold"><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Memuat Data...</td></tr>
              ) : topProduk.length > 0 ? (
                topProduk.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-bold text-gray-800 text-base">{item.nama_produk}</td>
                    <td className="p-4 text-center">
                      <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-md font-black print:bg-transparent print:p-0">
                        {item.total_klik}x
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={2} className="p-6 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-lg m-2 block">Belum ada data interaksi produk.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TABEL TOP MITRA */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 print:shadow-none print:border-gray-300">
          <h3 className="font-extrabold text-gray-900 mb-6 flex items-center gap-3 text-lg">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 print:hidden">
              <i className="fa-solid fa-map-location-dot"></i>
            </div>
            Mitra Paling Dicari
          </h3>
          
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-widest font-black print:bg-gray-100">
              <tr>
                <th className="p-4 rounded-tl-xl rounded-bl-xl print:rounded-none">Informasi Mitra</th>
                <th className="p-4 text-center rounded-tr-xl rounded-br-xl print:rounded-none">Kunjungan Peta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={2} className="p-6 text-center text-gray-400 font-bold"><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Memuat Data...</td></tr>
              ) : topMitra.length > 0 ? (
                topMitra.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition">
                    <td className="p-4">
                      <p className="font-bold text-gray-800 text-base">{item.nama_toko}</p>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.alamat}</p>
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md font-black print:bg-transparent print:p-0">
                        {item.total_klik}x
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={2} className="p-6 text-center text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-lg m-2 block">Belum ada data pencarian mitra.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* TIPS PROFESIONAL */}
      <div className="mt-8 bg-linear-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100 text-sm text-blue-800 print:hidden flex gap-4 items-start shadow-inner">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <i className="fa-solid fa-lightbulb text-blue-600 text-lg"></i>
        </div>
        <div>
          <strong className="block mb-1 text-base">Saran Tindakan Bisnis:</strong>
          {/* FIX: Mengganti tanda kutip ganda dengan entitas HTML &quot; */}
          <p className="opacity-90 leading-relaxed">
            Gunakan data analitik di atas untuk mengambil keputusan strategis. Perbanyak stok untuk &quot;Produk Paling Diminati&quot; dan gencarkan promosi (Ads) pada area &quot;Mitra Paling Dicari&quot; untuk memaksimalkan ROI (Return of Investment).
          </p>
        </div>
      </div>

    </div>
  );
}