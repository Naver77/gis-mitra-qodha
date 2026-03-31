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

  // === FITUR BARU: NOTIFIKASI TOAST ===
  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
  };

  // === FITUR BARU: PAGINATION ===
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(kategoris.length / itemsPerPage);
  const currentData = kategoris.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const data = await getKategoriList();
      setKategoris(data as unknown as KategoriItem[]);
    } catch (error) {
      console.error(error);
      showToast("Gagal memuat data", "error");
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      try {
        await saveKategori(null, dataToSend);
        setIsModalOpen(false);
        showToast(editingId ? "Kategori berhasil diperbarui!" : "Kategori baru berhasil ditambah!");
        await loadData();
      } catch (error) {
        console.error(error);
        showToast("Gagal menyimpan kategori!", "error");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      startTransition(async () => {
        try {
          await deleteKategori(Number(id));
          showToast("Kategori berhasil dihapus!", "success");
          
          if (currentData.length === 1 && currentPage > 1) {
            setCurrentPage(prev => prev - 1);
          }
          await loadData();
        } catch (error) {
          console.error(error);
          showToast("Gagal menghapus kategori!", "error");
        }
      });
    }
  };

  return (
    <div className="p-4 md:p-8 animate-fade-in-up relative">
      
      {/* TOAST NOTIFICATION */}
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
            <h1 className="text-3xl font-black text-gray-900">Master Kategori</h1>
            <p className="text-gray-500 font-medium mt-1">Atur pengelompokan produk Qodha Aromatic di sini.</p>
          </div>
          <button onClick={handleAdd} className="bg-brand-gold hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-bold transition shadow-lg flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> Tambah Kategori
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full lg:w-2/3">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl"><i className="fa-solid fa-tags"></i></div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Total Kategori</p>
              <p className="text-2xl font-black text-gray-900">{kategoris.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TABEL KATEGORI */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col w-full lg:w-2/3">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold tracking-widest uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4 w-16 text-center">No</th>
                <th className="px-6 py-4 w-24 text-center">ID</th>
                <th className="px-6 py-4">Nama Kategori</th>
                <th className="px-6 py-4 text-center w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium">
              {isLoadingData ? (
                <tr><td colSpan={4} className="p-10 text-center text-gray-400 font-bold animate-pulse">Memuat Data dari Database...</td></tr>
              ) : currentData.length === 0 ? (
                <tr><td colSpan={4} className="p-10 text-center text-gray-400 font-bold italic">Belum ada data kategori.</td></tr>
              ) : (
                currentData.map((row, idx) => (
                  <tr key={row.id_kategori} className="hover:bg-blue-50/10 transition">
                    <td className="px-6 py-4 text-center text-gray-400 font-bold">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400 font-mono font-bold text-[10px]">
                      #{row.id_kategori}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 text-base">
                      {row.nama_kategori}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(row)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center" title="Edit">
                          <i className="fa-solid fa-pen text-xs"></i>
                        </button>
                        <button onClick={() => handleDelete(row.id_kategori)} disabled={isPending} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center disabled:opacity-50" title="Hapus">
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
        {!isLoadingData && kategoris.length > 0 && (
          <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 rounded-b-3xl">
            <div className="text-xs font-bold text-gray-500">
              Menampilkan <span className="text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> hingga <span className="text-gray-900">{Math.min(currentPage * itemsPerPage, kategoris.length)}</span> dari <span className="text-gray-900">{kategoris.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
              >
                <i className="fa-solid fa-chevron-left text-xs"></i>
              </button>
              <div className="text-xs font-bold px-3 py-1 bg-white border border-gray-200 rounded-lg">
                {currentPage} / {totalPages}
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
              >
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL FORM TAMBAH/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-4 sm:p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[95vh] flex flex-col animate-fade-in-up overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h2 className="text-xl font-black text-gray-900">{editingId ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-gray-200 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto hide-scrollbar flex-1 bg-white">
              <form id="kategoriForm" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Nama Kategori</label>
                  <input type="text" required value={formData.nama_kategori} onChange={e => setFormData({...formData, nama_kategori: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-900 transition-all" placeholder="Contoh: Parfum Premium" />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 shrink-0 bg-gray-50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900 transition">Batal</button>
              <button type="submit" form="kategoriForm" disabled={isPending} className="px-6 py-3 bg-gray-900 text-white font-black rounded-xl hover:bg-brand-gold hover:text-gray-900 transition-all duration-300 shadow-lg flex items-center gap-2 disabled:opacity-50">
                {isPending ? <><i className="fa-solid fa-circle-notch fa-spin"></i> PROSES...</> : <><i className="fa-solid fa-save"></i> SIMPAN</>}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}