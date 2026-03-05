import React from 'react';

const Benefits: React.FC = () => {
  const iconYes = <i className="fa-solid fa-circle-check text-green-500 text-lg"></i>;
  const iconNo = <i className="fa-solid fa-minus text-gray-300"></i>;
  const iconVip = <i className="fa-solid fa-crown text-brand-gold text-lg drop-shadow-sm"></i>;

  const keuntungan = [
    ['Mendapatkan harga termurah di kategori kemitraan', iconYes, iconYes, iconVip],
    ['Mendapatkan Banner 3 x 1 m (Free Desain, Cetak & Kirim)', iconNo, iconYes, iconYes],
    ['Jaminan Kemudahan Bermitra', iconNo, iconNo, iconVip],
    ['Mendapatkan Soft Copy Katalog', iconYes, iconYes, iconYes],
    ['Mendapatkan Hard Copy Katalog', iconNo, iconNo, iconYes],
    ['Free Konsultasi Advertising, Content Marketing & Sosial Media', iconYes, iconYes, iconYes],
    ['Free Konsultasi Manajemen & Training', iconNo, iconNo, iconVip],
    ['Free Produk Tester', iconNo, iconNo, iconYes],
    ['Free Sample Produk Terbaru', iconNo, iconYes, iconYes],
    ['Program Promo Kemitraan', iconYes, iconYes, iconVip],
    ['Mendapatkan Akrilik display parfum 6ml & 35ml jika ambil produk parfum.', iconNo, iconNo, iconYes],
    ['Full Support : (Katalog lengkap GDrive, Media Desain & video promosi, Cek update stok, Info produk terbaru)', iconYes, iconYes, iconVip],
  ];

  return (
    <section id="keuntungan" className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Keuntungan Jadi Mitra <span className="text-brand-gold">Qodha Aromatic</span>
          </h1>
          <p className="text-gray-500 mt-2">Detail lengkap apa saja yang Anda dapatkan di setiap level.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-4 py-4 text-center w-16 font-bold tracking-wide border-r border-gray-700">No</th>
                <th className="px-6 py-4 text-left w-1/2 font-bold tracking-wide border-r border-gray-700">Fasilitas / Keuntungan</th>
                <th className="px-4 py-4 text-center w-1/6 font-bold tracking-wide border-r border-gray-700">Reseller</th>
                <th className="px-4 py-4 text-center w-1/6 font-bold tracking-wide border-r border-gray-700">Agen</th>
                <th className="px-4 py-4 text-center w-1/6 bg-brand-gold text-gray-900 font-bold tracking-wide">Distributor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {keuntungan.map((row, index) => (
                <tr key={index} className={`hover:bg-gray-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="px-4 py-4 text-center font-medium text-gray-500 border-r border-gray-100">{index + 1}</td>
                  <td className="px-6 py-4 text-left font-medium text-gray-800 border-r border-gray-100">{row[0]}</td>
                  <td className="px-4 py-4 text-center border-r border-gray-100">{row[1]}</td>
                  <td className="px-4 py-4 text-center border-r border-gray-100">{row[2]}</td>
                  <td className="px-4 py-4 text-center bg-yellow-50/30 border-l border-yellow-100">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Benefits;