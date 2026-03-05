import React from 'react';
import type { ProductPrice } from '../index';

const formatRupiah = (angka: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

const PricingTier: React.FC<{ data: ProductPrice[] }> = ({ data }) => {
  return (
    <section id="analisa" className="py-16 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10">
          <span className="text-green-600 font-bold tracking-widest text-sm uppercase bg-green-50 px-3 py-1 rounded-full border border-green-100">Analisa Modal</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-3">Perbandingan Harga Kemitraan</h2>
          <p className="text-gray-500 mt-2 text-sm">Lihat selisih harga modal yang didapatkan setiap tingkatan mitra.</p>
        </div>

        <div className="overflow-x-auto w-fit mx-auto rounded-xl border border-gray-200 shadow-md bg-white">
          <table className="w-auto text-sm text-left border-collapse">
            <thead className="bg-gray-900 text-white uppercase font-bold tracking-tight text-xs">
              <tr>
                <th className="px-4 py-3 text-center border-r border-gray-700 w-12">No</th>
                <th className="px-6 py-3 sticky left-0 bg-gray-900 z-20 border-r border-gray-700 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)] whitespace-nowrap">Produk</th>
                <th className="px-5 py-3 text-center bg-gray-800 border-r border-gray-700 whitespace-nowrap">Reseller <span className="block text-[10px] font-normal text-gray-400 capitalize mt-0.5">Tier 3</span></th>
                <th className="px-5 py-3 text-center bg-gray-800 border-r border-gray-700 whitespace-nowrap">Agen <span className="block text-[10px] font-normal text-gray-400 capitalize mt-0.5">Tier 2</span></th>
                <th className="px-5 py-3 text-center bg-brand-gold text-gray-900 whitespace-nowrap">Distributor <span className="block text-[10px] font-normal text-gray-800 capitalize mt-0.5">VIP</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700 text-xs sm:text-sm">
              {data.map((row, index) => {
                const hemat = (row.harga_reseller - row.harga_distributor) * row.qty;
                return (
                  <tr key={row.id} className={`hover:bg-blue-50/20 transition duration-150 group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-4 py-3 text-center font-semibold text-gray-500 border-r border-gray-100">{index + 1}</td>
                    <td className="px-6 py-3 font-bold text-gray-800 sticky left-0 bg-inherit z-10 border-r border-gray-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] align-middle whitespace-nowrap">
                      <div className="leading-tight">{row.nama_produk}</div>
                      <div className="text-[11px] text-gray-400 font-normal mt-1">{row.qty} {row.satuan}</div>
                    </td>
                    <td className="px-5 py-3 text-center border-r border-gray-100 align-middle">
                      <div className="font-bold text-gray-700 whitespace-nowrap">{formatRupiah(row.harga_reseller)}</div>
                      <div className="text-[10px] text-gray-400 mt-1 leading-none whitespace-nowrap">Total: {formatRupiah(row.harga_reseller * row.qty)}</div>
                    </td>
                    <td className="px-5 py-3 text-center border-r border-gray-100 bg-green-50/10 align-middle">
                      <div className="font-bold text-green-700 whitespace-nowrap">{formatRupiah(row.harga_agen)}</div>
                      <div className="text-[10px] text-green-600/60 mt-1 leading-none whitespace-nowrap">Total: {formatRupiah(row.harga_agen * row.qty)}</div>
                    </td>
                    <td className="px-5 py-3 text-center bg-yellow-50/40 relative group-hover:bg-yellow-100/40 transition align-middle">
                      <div className="font-extrabold text-gray-900 text-base whitespace-nowrap">{formatRupiah(row.harga_distributor)}</div>
                      <div className="text-[10px] text-gray-500 mt-1 font-semibold leading-none whitespace-nowrap">Total: {formatRupiah(row.harga_distributor * row.qty)}</div>
                      {hemat > 0 && (
                        <div className="mt-1.5 inline-block bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded border border-green-200 leading-none whitespace-nowrap">
                          Hemat {new Intl.NumberFormat('id-ID').format(hemat / 1000)}rb
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 italic bg-white px-4 py-2 rounded-full border border-gray-200 w-fit mx-auto shadow-sm">
          <i className="fa-solid fa-circle-info text-blue-400"></i>
          <span>Harga di atas adalah Harga Satuan (Pcs) & Total Per Karton/Lusin.</span>
        </div>
      </div>
    </section>
  );
};

export default PricingTier;