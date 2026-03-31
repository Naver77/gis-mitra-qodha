"use client";
import React, { useState, useEffect, useTransition } from 'react';
import { getProdukList, getKategoriOptions, deleteProduk, saveProduk } from './actions';

interface KategoriOption {
  id_kategori: string;
  nama_kategori: string;
}

interface ProdukItem {
  id_produk: string;
  id_kategori: string;
  nama_kategori?: string;
  nama_produk: string;
  harga: string;
  deskripsi: string;
  foto_produk: string;
  gender: string;
}

export default function ProdukPage() {
  const [produks, setProduks] = useState<ProdukItem[]>([]);
  const [kategoris, setKategoris] = useState<KategoriOption[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ id_kategori: '', nama_produk: '', harga: '', deskripsi: '', gender: '', foto_lama: '' });
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>('');
  
  // State khusus untuk tampilan harga (berformat titik)
  const [displayHarga, setDisplayHarga] = useState('');

  const [toast, setToast] = useState<{ show: boolean; msg: string; type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(produks.length / itemsPerPage) || 1;
  const currentData = produks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const [produkData, kategoriData] = await Promise.all([getProdukList(), getKategoriOptions()]);
      setProduks(produkData as unknown as ProdukItem[]);
      setKategoris(kategoriData as unknown as KategoriOption[]);
    } catch (error) {
      console.error("Gagal load data:", error);
      showToast("Gagal memuat data dari server", "error");
    } finally {
      setIsLoadingData(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadData(); }, []);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ id_kategori: '', nama_produk: '', harga: '', deskripsi: '', gender: '', foto_lama: '' });
    setDisplayHarga('');
    setFotoFile(null);
    setFotoPreview('');
    setIsModalOpen(true);
  };

  const handleEdit = (produk: ProdukItem) => {
    setEditingId(produk.id_produk);
    setFormData({ 
      id_kategori: produk.id_kategori, 
      nama_produk: produk.nama_produk, 
      harga: produk.harga, 
      deskripsi: produk.deskripsi || '', 
      gender: produk.gender || '',
      foto_lama: produk.foto_produk || ''
    });
    // Format harga asli ke tampilan bertitik saat diedit
    setDisplayHarga(new Intl.NumberFormat('id-ID').format(Number(produk.harga)));
    setFotoFile(null);
    setFotoPreview(produk.foto_produk ? `/uploads/produk/${produk.foto_produk}` : '');
    setIsModalOpen(true);
  };

  // FITUR: Auto-format harga saat mengetik
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Hilangkan semua huruf/titik/koma
    setFormData({ ...formData, harga: rawValue }); // Simpan angka murni ke state
    setDisplayHarga(rawValue ? new Intl.NumberFormat('id-ID').format(Number(rawValue)) : ''); // Tampilkan dengan titik
  };

  // FITUR: Validasi Maksimal 2MB
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB dalam bytes
      if (file.size > maxSize) {
        showToast("Ukuran foto terlalu besar! Maksimal 2MB.", "error");
        e.target.value = ''; // Reset input file
        return;
      }
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.harga) {
      showToast("Harga produk harus diisi!", "error");
      return;
    }

    const dataToSend = new FormData();
    if (editingId) dataToSend.append('id_produk', editingId);
    dataToSend.append('id_kategori', formData.id_kategori);
    dataToSend.append('nama_produk', formData.nama_produk);
    dataToSend.append('harga', formData.harga);
    dataToSend.append('deskripsi', formData.deskripsi);
    dataToSend.append('gender', formData.gender);
    dataToSend.append('foto_lama', formData.foto_lama);
    if (fotoFile) dataToSend.append('foto', fotoFile);

    startTransition(async () => {
      try {
        await saveProduk(null, dataToSend);
        setIsModalOpen(false);
        showToast(editingId ? "Produk berhasil diperbarui!" : "Produk baru berhasil ditambah!");
        await loadData(); 
      } catch (error) {
        console.error(error);
        showToast("Gagal menyimpan produk!", "error");
      }
    });
  };

  const handleDelete = (id: string, imgName: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini secara permanen?')) {
      startTransition(async () => {
        try {
          await deleteProduk(Number(id), imgName);
          showToast("Produk berhasil dihapus!", "success");
          if (currentData.length === 1 && currentPage > 1) setCurrentPage(prev => prev - 1);
          await loadData();
        } catch { showToast("Gagal menghapus produk!", "error"); }
      });
    }
  };

  const formatRupiah = (angka: string) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(angka));

  return (
    <>
      <div className="p-4 md:p-8 animate-fade-in-up relative">
        
        {toast.show && (
          <div className={`fixed top-6 right-6 z-9999 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-fade-in-up transition-colors ${
            toast.type === 'success' ? 'bg-gray-900 text-white' : 'bg-red-50 text-red-600 border border-red-100'
          }`}>
            <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check text-brand-gold' : 'fa-triangle-exclamation'} text-xl`}></i>
            <span className="font-bold text-sm">{toast.msg}</span>
          </div>
        )}

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900">Katalog Produk B2C</h1>
              <p className="text-gray-500 font-medium mt-1">Kelola etalase produk dan harga jual konsumen.</p>
            </div>
            <button onClick={handleAdd} className="bg-brand-gold hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-bold transition shadow-lg flex items-center gap-2">
              <i className="fa-solid fa-plus"></i> Tambah Produk
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl"><i className="fa-solid fa-box"></i></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase">Total Produk</p><p className="text-2xl font-black text-gray-900">{produks.length}</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-gold/20 text-brand-gold rounded-xl flex items-center justify-center text-xl"><i className="fa-solid fa-tags"></i></div>
              <div><p className="text-xs font-bold text-gray-400 uppercase">Kategori</p><p className="text-2xl font-black text-gray-900">{kategoris.length}</p></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
          <div className="h-4 bg-gray-900 w-full"></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 border-b border-gray-800 text-gray-300 font-bold tracking-widest uppercase text-[10px]">
                <tr>
                  <th className="px-6 py-4 w-16 text-center border-x border-gray-800">No</th>
                  <th className="px-6 py-4 border-x border-gray-800">Detail Produk</th>
                  <th className="px-6 py-4 border-x border-gray-800">Kategori & Gender</th>
                  <th className="px-6 py-4 border-x border-gray-800">Harga Jual</th>
                  <th className="px-6 py-4 text-center w-28 border-x border-gray-800">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium bg-white">
                {isLoadingData ? (
                  <tr><td colSpan={5} className="p-10 text-center text-gray-400 font-bold animate-pulse border-x border-gray-100">Memuat Data dari Database...</td></tr>
                ) : currentData.length === 0 ? (
                  <tr><td colSpan={5} className="p-10 text-center text-gray-400 font-bold italic border-x border-gray-100">Belum ada data produk.</td></tr>
                ) : (
                  currentData.map((row, idx) => (
                    <tr key={row.id_produk} className="hover:bg-blue-50/10 transition">
                      <td className="px-6 py-4 text-center text-gray-400 font-bold border-x border-gray-100">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="px-6 py-4 border-x border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0 shadow-inner">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={row.foto_produk ? `/uploads/produk/${row.foto_produk}` : 'https://placehold.co/100x100?text=No+Image'} alt={row.nama_produk} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100?text=Error'; }} />
                          </div>
                          <div className="max-w-50">
                            <p className="font-bold text-gray-900 text-sm truncate" title={row.nama_produk}>{row.nama_produk}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">ID: #{row.id_produk}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-x border-gray-100">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest mb-1 inline-block">
                          {row.nama_kategori || 'Tanpa Kategori'}
                        </span>
                        <div className="text-[11px] font-bold text-gray-500 capitalize flex items-center gap-1.5 mt-1">
                          {row.gender === 'pria' ? <i className="fa-solid fa-mars text-blue-500"></i> : 
                           row.gender === 'wanita' ? <i className="fa-solid fa-venus text-pink-500"></i> : 
                           row.gender === 'unisex' ? <i className="fa-solid fa-venus-mars text-purple-500"></i> :
                           <i className="fa-solid fa-leaf text-green-500"></i>}
                          {row.gender || 'Netral'}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-black text-gray-900 text-sm border-x border-gray-100">{formatRupiah(row.harga)}</td>
                      <td className="px-6 py-4 border-x border-gray-100">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEdit(row)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center" title="Edit"><i className="fa-solid fa-pen text-xs"></i></button>
                          <button onClick={() => handleDelete(row.id_produk, row.foto_produk)} disabled={isPending} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center disabled:opacity-50" title="Hapus"><i className="fa-solid fa-trash text-xs"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoadingData && produks.length > 0 && (
            <div className="p-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900">
              <div className="text-xs font-bold text-gray-400">
                Menampilkan <span className="text-white">{(currentPage - 1) * itemsPerPage + 1}</span> hingga <span className="text-white">{Math.min(currentPage * itemsPerPage, produks.length)}</span> dari <span className="text-white">{produks.length}</span> entri
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 transition"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                <div className="text-xs font-bold px-3 py-1 bg-gray-800 border border-gray-700 text-white rounded-lg">{currentPage} / {totalPages}</div>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 transition"><i className="fa-solid fa-chevron-right text-xs"></i></button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(8px)' }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col animate-zoom-in overflow-hidden relative">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h2 className="text-xl font-black text-gray-900">{editingId ? 'Edit Data Produk' : 'Tambah Produk Baru'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-gray-200 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div className="p-6 overflow-y-auto hide-scrollbar flex-1 bg-white">
              <form id="produkForm" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-5">
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-5">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-100 pb-3">Informasi Dasar</h3>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Nama Produk</label>
                      <input type="text" required value={formData.nama_produk} onChange={e => setFormData({...formData, nama_produk: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-900 transition-all" placeholder="Contoh: Parfum Jasmine" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Kategori</label>
                        <select required value={formData.id_kategori} onChange={e => setFormData({...formData, id_kategori: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-900 cursor-pointer">
                          <option value="">-- Pilih --</option>
                          {kategoris.map(cat => (
                            <option key={cat.id_kategori} value={cat.id_kategori}>{cat.nama_kategori}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Harga Jual (Rp)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">Rp</span>
                          {/* FITUR AUTO-FORMATTER: Tipe diganti text, value pakai displayHarga */}
                          <input type="text" required value={displayHarga} onChange={handlePriceChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-900 font-mono" placeholder="150.000" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Deskripsi Lengkap</label>
                      <textarea rows={4} value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-medium text-gray-700 leading-relaxed" placeholder="Jelaskan detail aroma produk ini..."></textarea>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 border-b border-gray-100 pb-2">Foto Visual</h3>
                    <p className="text-[10px] text-red-500 font-bold mb-3">* Maksimal 2MB (JPG/PNG/WEBP)</p>
                    <div className="w-full aspect-4/5 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-brand-gold flex flex-col items-center justify-center overflow-hidden relative group transition-colors cursor-pointer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={fotoPreview || 'https://placehold.co/400x500?text=Upload+Foto'} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x500?text=Error'; }} />
                      <div className="absolute inset-0 bg-gray-900/60 hidden group-hover:flex flex-col items-center justify-center text-white transition-all backdrop-blur-sm">
                        <i className="fa-solid fa-cloud-arrow-up text-3xl mb-2 text-brand-gold"></i>
                        <span className="text-xs font-bold">Klik Ganti Foto</span>
                      </div>
                      <input type="file" accept="image/jpeg, image/png, image/webp" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-3">Kategori Aroma / Gender</h3>
                    <div className="space-y-2">
                      {/* OPSI GENDER TELAH DIPERBARUI */}
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.gender === '' ? 'bg-green-50 border-green-500 shadow-sm' : 'border-gray-200 hover:bg-gray-50 bg-gray-50'}`}>
                        <input type="radio" name="gender" value="" checked={formData.gender === ''} onChange={e => setFormData({...formData, gender: e.target.value})} className="text-green-500 focus:ring-green-500 w-4 h-4 accent-green-600" />
                        <span className="text-sm font-bold text-gray-700 flex items-center gap-2"><i className="fa-solid fa-leaf text-green-500 w-4"></i> Netral / Ruangan</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.gender === 'pria' ? 'bg-brand-gold/10 border-brand-gold shadow-sm' : 'border-gray-200 hover:bg-gray-50 bg-gray-50'}`}>
                        <input type="radio" name="gender" value="pria" checked={formData.gender === 'pria'} onChange={e => setFormData({...formData, gender: e.target.value})} className="text-brand-gold focus:ring-brand-gold w-4 h-4 accent-brand-gold" />
                        <span className="text-sm font-bold text-gray-700 flex items-center gap-2"><i className="fa-solid fa-mars text-blue-500 w-4"></i> Khusus Pria</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.gender === 'wanita' ? 'bg-brand-gold/10 border-brand-gold shadow-sm' : 'border-gray-200 hover:bg-gray-50 bg-gray-50'}`}>
                        <input type="radio" name="gender" value="wanita" checked={formData.gender === 'wanita'} onChange={e => setFormData({...formData, gender: e.target.value})} className="text-brand-gold focus:ring-brand-gold w-4 h-4 accent-brand-gold" />
                        <span className="text-sm font-bold text-gray-700 flex items-center gap-2"><i className="fa-solid fa-venus text-pink-500 w-4"></i> Khusus Wanita</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.gender === 'unisex' ? 'bg-brand-gold/10 border-brand-gold shadow-sm' : 'border-gray-200 hover:bg-gray-50 bg-gray-50'}`}>
                        <input type="radio" name="gender" value="unisex" checked={formData.gender === 'unisex'} onChange={e => setFormData({...formData, gender: e.target.value})} className="text-brand-gold focus:ring-brand-gold w-4 h-4 accent-brand-gold" />
                        <span className="text-sm font-bold text-gray-700 flex items-center gap-2"><i className="fa-solid fa-venus-mars text-purple-500 w-4"></i> Unisex (Bisa Semua)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 shrink-0 bg-gray-50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900 transition">Batal</button>
              <button type="submit" form="produkForm" disabled={isPending} className="px-8 py-3 bg-gray-900 text-white font-black rounded-xl hover:bg-brand-gold hover:text-gray-900 transition-all duration-300 shadow-lg flex items-center gap-2 disabled:opacity-50">
                {isPending ? <><i className="fa-solid fa-circle-notch fa-spin"></i> MEMPROSES...</> : <><i className="fa-solid fa-save"></i> SIMPAN PRODUK</>}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}