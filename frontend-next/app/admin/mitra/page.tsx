"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// 1. KITA BUAT INTERFACE LOKAL YANG COCOK 100% DENGAN DATABASE KITA SEKARANG
interface AdminMitraData {
  id: number;
  nama_toko: string;
  pemilik: string;
  level: 'Distributor' | 'Agen' | 'Reseller';
  provinsi: string;
  kota: string;
  kecamatan: string;
  alamat_lengkap: string;
  lat: number;
  lng: number;
}

const MapPicker = dynamic(() => import('./MapPicker'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400 font-bold">Memuat Peta...</div>
});

export default function AdminMitraPage() {
  const [mitras, setMitras] = useState<AdminMitraData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<AdminMitraData>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // === FITUR BARU: NOTIFIKASI TOAST ===
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
  };

  // === FITUR BARU: PAGINATION ===
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mitras.length / itemsPerPage);
  const currentData = mitras.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const fetchMitra = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/mitra');
      const data = await res.json();
      setMitras(data);
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat data dari server", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMitra();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lat || !formData.lng) {
      showToast("Klik pada peta untuk mengatur koordinat!", "error");
      return;
    }

    setIsPending(true);
    try {
      const url = '/api/mitra';
      const method = isEditing ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showToast(isEditing ? 'Data Mitra berhasil diupdate!' : 'Mitra baru berhasil ditambah!');
        setIsModalOpen(false);
        await fetchMitra(); 
      } else {
        showToast('Terjadi kesalahan sistem', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Gagal menyimpan data', 'error');
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (confirm('Apakah Anda yakin ingin menghapus mitra ini?')) {
      try {
        const res = await fetch(`/api/mitra?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          showToast('Data Mitra berhasil dihapus!', 'success');
          if (currentData.length === 1 && currentPage > 1) setCurrentPage(prev => prev - 1);
          await fetchMitra();
        }
      } catch (err) {
        console.error(err);
        showToast('Gagal menghapus data', 'error');
      }
    }
  };

  const openModal = (mitra?: AdminMitraData) => {
    if (mitra) {
      setFormData(mitra);
      setIsEditing(true);
    } else {
      setFormData({ level: 'Reseller', lat: 0, lng: 0 }); 
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8 animate-fade-in-up relative">
      
      {/* TOAST NOTIFICATION (Fix Class Tailwind z-200) */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-200 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-fade-in-up transition-colors ${
          toast.type === 'success' ? 'bg-gray-900 text-white' : 'bg-red-50 text-red-600 border border-red-100'
        }`}>
          <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check text-brand-gold' : 'fa-triangle-exclamation'} text-xl`}></i>
          <span className="font-bold text-sm">{toast.msg}</span>
        </div>
      )}
      
      {/* HEADER & STATS */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Manajemen Mitra (WebGIS)</h1>
            <p className="text-gray-500 font-medium">Kelola jaringan Mitra dan koordinat peta WebGIS.</p>
          </div>
          <button onClick={() => openModal()} className="bg-brand-gold hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-bold transition shadow-lg flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> Tambah Mitra
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl"><i className="fa-solid fa-users"></i></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Total Mitra</p>
              <p className="text-2xl font-black text-gray-900">{mitras.length}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-gold/20 text-yellow-700 rounded-xl flex items-center justify-center text-xl"><i className="fa-solid fa-crown"></i></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Distributor</p>
              <p className="text-2xl font-black text-gray-900">{mitras.filter(m => m.level === 'Distributor').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TABEL MITRA */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold tracking-widest uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4">Toko & Pemilik</th>
                <th className="px-6 py-4">Level</th>
                <th className="px-6 py-4">Wilayah & Koordinat</th>
                <th className="px-6 py-4 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-sm">
              {isLoading ? (
                <tr><td colSpan={5} className="p-10 text-center text-gray-400 font-bold animate-pulse">Memuat Data dari Database...</td></tr>
              ) : currentData.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center text-gray-400 font-bold italic">Belum ada data mitra.</td></tr>
              ) : (
                currentData.map((m, idx) => (
                  <tr key={m.id} className="hover:bg-blue-50/10 transition">
                    <td className="px-6 py-4 text-center text-gray-400 font-bold">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="px-6 py-4">
                      {/* Fix Class Tailwind max-w-50 */}
                      <div className="font-bold text-gray-900 max-w-50 truncate" title={m.nama_toko}>{m.nama_toko}</div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate max-w-50" title={m.pemilik}><i className="fa-solid fa-user text-[10px] mr-1"></i>{m.pemilik}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded-md border ${
                        m.level === 'Distributor' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        m.level === 'Agen' ? 'bg-green-50 text-green-700 border-green-200' :
                        'bg-blue-50 text-blue-700 border-blue-200'
                      }`}>
                        {m.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-700"><i className="fa-solid fa-map-pin text-red-500 mr-1"></i> {m.kota || m.kecamatan}</div>
                      <div className="text-[10px] text-gray-400 font-mono mt-1 bg-gray-50 inline-block px-1.5 py-0.5 rounded border border-gray-100">{m.lat}, {m.lng}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openModal(m)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center" title="Edit">
                          <i className="fa-solid fa-pen text-xs"></i>
                        </button>
                        <button onClick={() => handleDelete(m.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center" title="Hapus">
                          <i className="fa-solid fa-trash text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION CONTROLS */}
        {!isLoading && mitras.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 rounded-b-3xl">
            <div className="text-xs font-bold text-gray-500">
              Menampilkan <span className="text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> hingga <span className="text-gray-900">{Math.min(currentPage * itemsPerPage, mitras.length)}</span> dari <span className="text-gray-900">{mitras.length}</span> entri
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition">
                <i className="fa-solid fa-chevron-left text-xs"></i>
              </button>
              <div className="text-xs font-bold px-3 py-1 bg-white border border-gray-200 rounded-lg">{currentPage} / {totalPages}</div>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition">
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL FORM TAMBAH/EDIT (FIXED SCROLLING & TAILWIND) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-4 sm:p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col animate-fade-in-up overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h2 className="text-xl font-black text-gray-900">{isEditing ? 'Edit Data Mitra' : 'Tambah Mitra Baru'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-gray-200 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            
            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto hide-scrollbar flex-1 bg-white">
              <form id="mitraForm" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* KIRI: TEKS */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Nama Toko</label>
                      <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold" 
                        value={formData.nama_toko || ''} onChange={e => setFormData({...formData, nama_toko: e.target.value})} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Nama Pemilik</label>
                      <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold" 
                        value={formData.pemilik || ''} onChange={e => setFormData({...formData, pemilik: e.target.value})} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Level Mitra</label>
                      {/* Fix Error TS Types: as "Distributor" | "Agen" | "Reseller" */}
                      <select required className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none font-bold text-sm"
                        value={formData.level || 'Reseller'} onChange={e => setFormData({...formData, level: e.target.value as 'Distributor' | 'Agen' | 'Reseller'})}>
                        <option value="Distributor">Distributor</option>
                        <option value="Agen">Agen</option>
                        <option value="Reseller">Reseller</option>
                      </select>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Provinsi</label>
                      <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none text-sm" 
                        value={formData.provinsi || ''} onChange={e => setFormData({...formData, provinsi: e.target.value})} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-[10px] font-bold text-brand-green uppercase mb-1">Kota / Kab (Wajib Kapital)</label>
                      <input required type="text" placeholder="Ex: BOGOR" className="w-full border-2 border-green-200 rounded-xl px-4 py-2.5 bg-green-50 focus:ring-2 focus:ring-brand-gold outline-none uppercase text-sm font-bold" 
                        value={formData.kota || ''} onChange={e => setFormData({...formData, kota: e.target.value.toUpperCase()})} />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Kecamatan</label>
                      <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none text-sm" 
                        value={formData.kecamatan || ''} onChange={e => setFormData({...formData, kecamatan: e.target.value})} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Alamat Lengkap</label>
                      <textarea required rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none text-sm" 
                        value={formData.alamat_lengkap || ''} onChange={e => setFormData({...formData, alamat_lengkap: e.target.value})} />
                    </div>
                  </div>
                </div>

                {/* KANAN: MAP (Fix Class min-h-75) */}
                <div className="lg:col-span-7 flex flex-col space-y-4">
                  <div className="flex-1 min-h-75 border-2 border-gray-200 rounded-2xl overflow-hidden bg-gray-100 relative">
                    <MapPicker 
                      lat={formData.lat || 0} 
                      lng={formData.lng || 0} 
                      setLat={(val) => setFormData(prev => ({...prev, lat: val}))}
                      setLng={(val) => setFormData(prev => ({...prev, lng: val}))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 shrink-0">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Latitude</label>
                      <input readOnly type="number" step="any" className="w-full border border-gray-200 rounded-xl px-4 py-2 bg-gray-100 text-gray-700 font-mono text-sm cursor-not-allowed font-bold" 
                        value={formData.lat || ''} placeholder="Otomatis" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Longitude</label>
                      <input readOnly type="number" step="any" className="w-full border border-gray-200 rounded-xl px-4 py-2 bg-gray-100 text-gray-700 font-mono text-sm cursor-not-allowed font-bold" 
                        value={formData.lng || ''} placeholder="Otomatis" />
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 shrink-0 bg-gray-50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900 transition">Batal</button>
              <button type="submit" form="mitraForm" disabled={isPending} className="px-8 py-3 bg-gray-900 text-white font-black rounded-xl hover:bg-brand-gold hover:text-gray-900 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50">
                {isPending ? <><i className="fa-solid fa-circle-notch fa-spin"></i> MEMPROSES...</> : <><i className="fa-solid fa-save"></i> SIMPAN MITRA</>}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}