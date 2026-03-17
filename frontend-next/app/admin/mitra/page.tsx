"use client";
import React, { useState, useEffect, useTransition } from 'react';
import dynamic from 'next/dynamic';
import { getMitraList, deleteMitra, saveMitra } from './actions';

const MapPicker = dynamic(() => import('./MapPicker'), { 
  ssr: false, 
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center font-bold text-gray-400">Memuat Peta...</div> 
});

interface MitraItem {
  id_mitra: string;
  nama_toko: string;
  pemilik: string;
  no_hp: string;
  alamat: string;
  latitude: string;
  longitude: string;
  jenis_mitra: string;
}

export default function MitraPage() {
  const [mitras, setMitras] = useState<MitraItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [lat, setLat] = useState<number>(-6.200000);
  const [lng, setLng] = useState<number>(106.816666);
  
  const [formData, setFormData] = useState({ nama_toko: '', pemilik: '', jenis_mitra: 'Reseller', no_hp: '', alamat: '' });

  const loadData = async () => {
    const data = await getMitraList();
    // FIX 1: TypeScript Double Type Casting (Sangat Aman)
    setMitras(data as unknown as MitraItem[]);
    setIsLoadingData(false);
  };

  useEffect(() => {
    // FIX 2: Menggunakan .then() secara eksplisit agar linter yakin ini adalah asinkron murni
    // Hal ini mencegah error "Calling setState synchronously within an effect"
    getMitraList().then((data) => {
      setMitras(data as unknown as MitraItem[]);
      setIsLoadingData(false);
    });
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ nama_toko: '', pemilik: '', jenis_mitra: 'Reseller', no_hp: '', alamat: '' });
    setLat(-6.200000);
    setLng(106.816666);
    setIsModalOpen(true);
  };

  const handleEdit = (mitra: MitraItem) => {
    setEditingId(mitra.id_mitra);
    setFormData({ nama_toko: mitra.nama_toko, pemilik: mitra.pemilik, jenis_mitra: mitra.jenis_mitra, no_hp: mitra.no_hp, alamat: mitra.alamat });
    setLat(parseFloat(mitra.latitude));
    setLng(parseFloat(mitra.longitude));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = new FormData();
    if (editingId) dataToSend.append('id_mitra', editingId);
    dataToSend.append('nama_toko', formData.nama_toko);
    dataToSend.append('pemilik', formData.pemilik);
    dataToSend.append('jenis_mitra', formData.jenis_mitra);
    dataToSend.append('no_hp', formData.no_hp);
    dataToSend.append('alamat', formData.alamat);
    dataToSend.append('latitude', lat.toString());
    dataToSend.append('longitude', lng.toString());

    startTransition(async () => {
      await saveMitra(null, dataToSend);
      setIsModalOpen(false);
      setIsLoadingData(true);
      await loadData();
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus mitra ini?')) {
      startTransition(async () => {
        setIsLoadingData(true);
        await deleteMitra(Number(id));
        await loadData();
      });
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Data Mitra Sebaran</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola lokasi titik agen dan reseller Qodha.</p>
        </div>
        <button onClick={handleAdd} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-gold hover:text-gray-900 transition-all shadow-lg flex items-center gap-2">
          <i className="fa-solid fa-map-pin"></i> Tambah Mitra Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-widest border-b border-gray-100">
                <th className="p-5 font-black">Informasi Mitra</th>
                <th className="p-5 font-black">Jenis</th>
                <th className="p-5 font-black">Lokasi</th>
                <th className="p-5 font-black text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {isLoadingData ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-400 font-bold"><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Memuat Data...</td></tr>
              ) : mitras.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-gray-400 font-bold">Belum ada data mitra.</td></tr>
              ) : (
                mitras.map((row) => (
                  <tr key={row.id_mitra} className="hover:bg-gray-50/50 transition">
                    <td className="p-5">
                      <p className="font-extrabold text-gray-900 text-base">{row.nama_toko}</p>
                      <p className="text-xs text-gray-500 mt-1"><i className="fa-solid fa-user text-gray-400 mr-1"></i> {row.pemilik}</p>
                      <a href={`https://wa.me/${row.no_hp}`} target="_blank" className="text-emerald-600 text-xs font-bold hover:underline mt-1 inline-block">
                        <i className="fa-brands fa-whatsapp"></i> +{row.no_hp}
                      </a>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                        row.jenis_mitra === 'Distributor' ? 'bg-yellow-50 border-yellow-200 text-yellow-600' : 
                        row.jenis_mitra === 'Agen' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-blue-50 border-blue-200 text-blue-600'
                      }`}>
                        {row.jenis_mitra}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="text-xs text-gray-600 mb-2 line-clamp-2 w-48 leading-relaxed">
                        {row.alamat}
                      </div>
                      <a href={`http://maps.google.com/maps?q=${row.latitude},${row.longitude}`} target="_blank" className="text-blue-500 hover:text-blue-700 text-[10px] font-bold border border-blue-200 bg-blue-50 px-2 py-1.5 rounded-lg inline-flex items-center gap-1 transition-colors">
                        <i className="fa-solid fa-location-arrow"></i> Buka Maps
                      </a>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(row)} className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-brand-gold hover:text-gray-900 transition">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onClick={() => handleDelete(row.id_mitra)} className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition" disabled={isPending}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto hide-scrollbar flex flex-col animate-fade-in-up">
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-black text-gray-900">{editingId ? 'Edit Data Mitra' : 'Tambah Mitra Baru'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nama Toko / Usaha</label>
                  <input type="text" required value={formData.nama_toko} onChange={e => setFormData({...formData, nama_toko: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-700" placeholder="Contoh: Agen Qodha Depok" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nama Pemilik</label>
                    <input type="text" required value={formData.pemilik} onChange={e => setFormData({...formData, pemilik: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-700" placeholder="Bpk. Fulan" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Jenis Kemitraan</label>
                    <select required value={formData.jenis_mitra} onChange={e => setFormData({...formData, jenis_mitra: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-700 cursor-pointer">
                      <option value="Reseller">🚀 Reseller</option>
                      <option value="Agen">💎 Agen</option>
                      <option value="Distributor">👑 Distributor</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">WhatsApp Aktif</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><i className="fa-brands fa-whatsapp text-lg"></i></span>
                    <input type="number" required value={formData.no_hp} onChange={e => setFormData({...formData, no_hp: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-700" placeholder="628123456789" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Alamat Lengkap</label>
                  <textarea required rows={3} value={formData.alamat} onChange={e => setFormData({...formData, alamat: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-700 leading-relaxed" placeholder="Jalan, Nomor Rumah, RT/RW, Kecamatan..."></textarea>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col">
                <h3 className="text-xs font-black text-gray-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-map-location-dot text-brand-gold"></i> Tentukan Titik Lokasi
                </h3>
                <div className="flex-1 w-full min-h-62.5 lg:min-h-0 rounded-xl overflow-hidden border border-gray-200 shadow-inner mb-4 relative z-0">
                  <MapPicker lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-2 rounded-lg border border-gray-200 text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase">Latitude</p>
                    <p className="text-xs font-mono font-black text-gray-800">{lat.toFixed(6)}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-200 text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase">Longitude</p>
                    <p className="text-xs font-mono font-black text-gray-800">{lng.toFixed(6)}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 pt-4 border-t border-gray-100">
                <button type="submit" disabled={isPending} className="w-full bg-gray-900 text-white font-black py-4 rounded-xl hover:bg-brand-gold hover:text-gray-900 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 group">
                  {isPending ? <><i className="fa-solid fa-circle-notch fa-spin"></i> MENYIMPAN...</> : <><i className="fa-solid fa-save group-hover:scale-110 transition-transform"></i> SIMPAN DATA MITRA</>}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}