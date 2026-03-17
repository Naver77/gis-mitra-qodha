"use client";
import React, { useState, useEffect, useTransition } from 'react';
import { getKategoriList, deleteKategori, saveKategori } from './actions';

interface KategoriItem {
  id_kategori: string;
  nama_kategori: string;
}

export default function KategoriPage() {
  const [kategoris, setKategoris] = useState<KategoriItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ nama_kategori: '' });

  const loadData = async () => {
    const data = await getKategoriList();
    setKategoris(data as unknown as KategoriItem[]);
    setIsLoadingData(false);
  };

  useEffect(() => {
    // Memanggil secara asinkron agar lolos sensor ESLint Ultra Strict
    getKategoriList().then((data) => {
      setKategoris(data as unknown as KategoriItem[]);
      setIsLoadingData(false);
    });
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ nama_kategori: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (kategori: KategoriItem) => {
    setEditingId(kategori.id_kategori);
    setFormData({ nama_kategori: kategori.nama_kategori });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend = new FormData();
    if (editingId) dataToSend.append('id_kategori', editingId);
    dataToSend.append('nama_kategori', formData.nama_kategori);

    startTransition(async () => {
      await saveKategori(null, dataToSend);
      setIsModalOpen(false);
      setIsLoadingData(true);
      await loadData();
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      startTransition(async () => {
        setIsLoadingData(true);
        await deleteKategori(Number(id));
        await loadData();
      });
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Master Kategori</h1>
          <p className="text-gray-500 text-sm mt-1">Atur pengelompokan produk Qodha Aromatic di sini.</p>
        </div>
        <button onClick={handleAdd} className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-gold hover:text-gray-900 transition-all shadow-lg flex items-center gap-2">
          <i className="fa-solid fa-plus"></i> Tambah Kategori
        </button>
      </div>

      {/* Tabel Kategori - Dibuat setengah layar agar proporsional karena datanya sedikit */}
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden w-full lg:w-2/3">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-widest border-b border-gray-100">
                <th className="p-5 font-black text-center w-20">ID</th>
                <th className="p-5 font-black">Nama Kategori</th>
                <th className="p-5 font-black text-center w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {isLoadingData ? (
                <tr><td colSpan={3} className="p-8 text-center text-gray-400 font-bold"><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Memuat Data...</td></tr>
              ) : kategoris.length === 0 ? (
                <tr><td colSpan={3} className="p-8 text-center text-gray-400 font-bold">Belum ada data kategori.</td></tr>
              ) : (
                kategoris.map((row) => (
                  <tr key={row.id_kategori} className="hover:bg-gray-50/50 transition">
                    <td className="p-5 text-center text-gray-400 font-mono font-bold">#{row.id_kategori}</td>
                    <td className="p-5 font-extrabold text-gray-900 text-base">{row.nama_kategori}</td>
                    <td className="p-5 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(row)} className="w-9 h-9 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-brand-gold hover:text-gray-900 transition">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onClick={() => handleDelete(row.id_kategori)} className="w-9 h-9 flex items-center justify-center bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition" disabled={isPending}>
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

      {/* Modal Form Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-fade-in-up">
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 className="text-xl font-black text-gray-900">{editingId ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Nama Kategori</label>
                <input type="text" required value={formData.nama_kategori} onChange={e => setFormData({...formData, nama_kategori: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-700 transition-all" placeholder="Contoh: Paket Hemat" />
              </div>

              <div className="mt-8">
                <button type="submit" disabled={isPending} className="w-full bg-gray-900 text-white font-black py-4 rounded-xl hover:bg-brand-gold hover:text-gray-900 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 group">
                  {isPending ? <><i className="fa-solid fa-circle-notch fa-spin"></i> MENYIMPAN...</> : <><i className="fa-solid fa-save group-hover:scale-110 transition-transform"></i> SIMPAN KATEGORI</>}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}