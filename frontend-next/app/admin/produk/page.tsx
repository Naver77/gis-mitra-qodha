"use client";
import React, { useState, useEffect, useTransition } from 'react';
// PENTING: Pastikan file actions.ts ini benar-benar ADA di dalam folder app/admin/produk/
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
  
  const [formData, setFormData] = useState({ id_kategori: '', nama_produk: '', harga: '', deskripsi: '', gender: 'unisex', foto_lama: '' });
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>('');

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const [produkData, kategoriData] = await Promise.all([getProdukList(), getKategoriOptions()]);
      setProduks(produkData as unknown as ProdukItem[]);
      setKategoris(kategoriData as unknown as KategoriOption[]);
    } catch (error) {
      console.error("Gagal load data:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({ id_kategori: '', nama_produk: '', harga: '', deskripsi: '', gender: 'unisex', foto_lama: '' });
    setFotoFile(null);
    setFotoPreview(''); // Kosongkan agar placeholder bawaan CSS yang muncul
    setIsModalOpen(true);
  };

  const handleEdit = (produk: ProdukItem) => {
    setEditingId(produk.id_produk);
    setFormData({ 
      id_kategori: produk.id_kategori, 
      nama_produk: produk.nama_produk, 
      harga: produk.harga, 
      deskripsi: produk.deskripsi || '', 
      gender: produk.gender || 'unisex',
      foto_lama: produk.foto_produk || ''
    });
    setFotoFile(null);
    setFotoPreview(produk.foto_produk ? `/uploads/produk/${produk.foto_produk}` : '');
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        await loadData(); // Reload tabel otomatis
      } catch (error) {
        // FIX ESLINT: Variabel error kini digunakan untuk logging di browser console
        console.error("Error Simpan:", error);
        alert("Gagal menyimpan produk. Cek koneksi atau file actions.ts");
      }
    });
  };

  const handleDelete = (id: string, imgName: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      startTransition(async () => {
        try {
          await deleteProduk(Number(id), imgName);
          await loadData();
        } catch (error) {
          // FIX ESLINT: Variabel error kini digunakan
          console.error("Error Hapus:", error);
          alert("Gagal menghapus produk!");
        }
      });
    }
  };

  const formatRupiah = (angka: string) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(angka));
  };

  return (
    <div className="p-4 md:p-8 animate-fade-in-up">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Katalog Produk B2C</h1>
          <p className="text-gray-500 font-medium mt-1">Kelola data etalase produk Qodha Aromatic.</p>
        </div>
        <button onClick={handleAdd} className="bg-brand-gold hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-bold transition shadow-lg flex items-center gap-2">
          <i className="fa-solid fa-plus"></i> Tambah Produk
        </button>
      </div>

      {/* TABEL PRODUK */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900 text-white font-bold tracking-widest uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Detail Produk</th>
                <th className="px-6 py-4">Kategori & Gender</th>
                <th className="px-6 py-4">Harga Jual</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium">
              {isLoadingData ? (
                <tr><td colSpan={4} className="p-10 text-center text-gray-400 font-bold animate-pulse">Memuat Data dari Database...</td></tr>
              ) : produks.length === 0 ? (
                <tr><td colSpan={4} className="p-10 text-center text-gray-400 font-bold italic">Belum ada data produk.</td></tr>
              ) : (
                produks.map((row) => (
                  <tr key={row.id_produk} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0 shadow-inner">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img 
                            src={row.foto_produk ? `/uploads/produk/${row.foto_produk}` : 'https://placehold.co/100x100?text=No+Image'} 
                            alt={row.nama_produk} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100?text=Error'; }} 
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-base">{row.nama_produk}</p>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">ID: #{row.id_produk}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
                        {row.nama_kategori || 'Tanpa Kategori'}
                      </span>
                      <div className="text-xs font-bold text-gray-500 capitalize flex items-center gap-1.5">
                        {row.gender === 'pria' ? <i className="fa-solid fa-mars text-blue-500"></i> : 
                         row.gender === 'wanita' ? <i className="fa-solid fa-venus text-pink-500"></i> : 
                         <i className="fa-solid fa-venus-mars text-purple-500"></i>}
                        {row.gender}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-gray-900 text-base">
                      {formatRupiah(row.harga)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(row)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition flex items-center justify-center" title="Edit">
                          <i className="fa-solid fa-pen text-xs"></i>
                        </button>
                        <button onClick={() => handleDelete(row.id_produk, row.foto_produk)} disabled={isPending} className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center disabled:opacity-50" title="Hapus">
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
      </div>

      {/* MODAL FORM TAMBAH/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar flex flex-col animate-fade-in-up">
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-gray-50 z-10 rounded-t-3xl">
              <h2 className="text-xl font-black text-gray-900">{editingId ? 'Edit Data Produk' : 'Tambah Produk Baru'}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-gray-200 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Kolom Kiri: Form Text */}
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
                      <input type="number" required value={formData.harga} onChange={e => setFormData({...formData, harga: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-900 font-mono" placeholder="150000" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Deskripsi Lengkap</label>
                    <textarea rows={4} value={formData.deskripsi} onChange={e => setFormData({...formData, deskripsi: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-medium text-gray-700 leading-relaxed" placeholder="Jelaskan detail aroma produk ini..."></textarea>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Gambar & Gender */}
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-3">Foto Visual</h3>
                  <div className="w-full aspect-4/5 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-brand-gold flex flex-col items-center justify-center overflow-hidden relative group transition-colors cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={fotoPreview || 'https://placehold.co/400x500?text=Upload+Foto'} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                      onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x500?text=Error'; }} 
                    />
                    <div className="absolute inset-0 bg-gray-900/60 hidden group-hover:flex flex-col items-center justify-center text-white transition-all backdrop-blur-sm">
                      <i className="fa-solid fa-cloud-arrow-up text-3xl mb-2 text-brand-gold"></i>
                      <span className="text-xs font-bold">Klik untuk Ganti Foto</span>
                    </div>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold mt-3 text-center uppercase tracking-wider">Format JPG / PNG. Maks 2MB.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-3">Target Gender</h3>
                  <div className="space-y-2">
                    {['pria', 'wanita', 'unisex'].map((g) => (
                      <label key={g} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.gender === g ? 'bg-brand-gold/10 border-brand-gold shadow-sm' : 'border-gray-200 hover:bg-gray-50 bg-gray-50'}`}>
                        <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={e => setFormData({...formData, gender: e.target.value})} className="text-brand-gold focus:ring-brand-gold w-4 h-4 accent-brand-gold" />
                        <span className="text-sm font-bold text-gray-700 capitalize flex items-center gap-2">
                          {g === 'pria' ? <i className="fa-solid fa-mars text-blue-500 w-4"></i> : 
                           g === 'wanita' ? <i className="fa-solid fa-venus text-pink-500 w-4"></i> : 
                           <i className="fa-solid fa-venus-mars text-purple-500 w-4"></i>} {g}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tombol Simpan */}
              <div className="lg:col-span-3 pt-6 border-t border-gray-100">
                <button type="submit" disabled={isPending} className="w-full bg-gray-900 text-white font-black py-4 rounded-xl hover:bg-brand-gold hover:text-gray-900 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 group">
                  {isPending ? <><i className="fa-solid fa-circle-notch fa-spin"></i> MENYIMPAN DATA...</> : <><i className="fa-solid fa-save group-hover:scale-110 transition-transform"></i> SIMPAN PRODUK</>}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}