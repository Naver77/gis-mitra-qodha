import React from 'react';
import type { ProductPrice } from '../index'; // Import tipe data

// Helper pemformatan rupiah
const formatRupiah = (angka: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

const PricingHET: React.FC<{ data: ProductPrice[] }> = ({ data }) => {
  // Logika Grouping Data (Sama persis seperti PHP Anda)
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.kategori]) acc[item.kategori] = [];
    acc[item.kategori].push(item);
    return acc;
  }, {} as Record<string, ProductPrice[]>);

  let noUrut = 1;

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <i className="fa-solid fa-tag text-blue-600"></i>Harga Eceran Terendah (HET)
          </h1>
          <p className="text-sm text-gray-500">Harga jual kepada konsumen akhir (End User).</p>
        </div>
        
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="w-full text-sm text-left border-collapse border-2 border-gray-300">
            <thead className="bg-gray-800 text-white uppercase font-bold text-xs tracking-wide">
              <tr>
                <th className="px-4 py-4 w-12 text-center border-2 border-gray-400">No</th>
                <th className="px-4 py-4 w-32 text-center border-2 border-gray-400">Kategori</th>
                <th className="px-4 py-4 border-2 border-gray-400">Nama Produk</th>
                <th className="px-4 py-4 text-center w-24 border-2 border-gray-400">Isi</th>
                <th className="px-4 py-4 text-center w-24 border-2 border-gray-400">Qty</th>
                <th className="px-4 py-4 text-right border-2 border-gray-400">Harga Satuan</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-700">
              {Object.entries(groupedData).map(([kategori, items]) => (
                <React.Fragment key={kategori}>
                  {items.map((row, index) => (
                    <tr key={row.id} className="hover:bg-blue-50/30 transition">
                      {/* Hanya render Kolom No & Kategori di baris pertama dari setiap grup */}
                      {index === 0 && (
                        <>
                          <td className="px-4 py-3 text-center font-bold text-gray-900 border-2 border-gray-300 bg-gray-50 align-middle" rowSpan={items.length}>
                            {noUrut++}
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-blue-800 border-2 border-gray-300 bg-blue-50/50 align-middle uppercase tracking-wider text-xs" rowSpan={items.length}>
                            {kategori}
                          </td>
                        </>
                      )}
                      <td className="px-4 py-3 font-medium text-gray-800 border-2 border-gray-300">{row.nama_produk}</td>
                      <td className="px-4 py-3 text-center border-2 border-gray-300 font-semibold bg-yellow-50/20">{row.isi}</td>
                      <td className="px-4 py-3 text-center border-2 border-gray-300 text-gray-500">{row.qty2}</td>
                      <td className="px-4 py-3 text-right font-bold text-blue-600 border-2 border-gray-300 bg-gray-50/30">{formatRupiah(row.harga_het)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PricingHET;