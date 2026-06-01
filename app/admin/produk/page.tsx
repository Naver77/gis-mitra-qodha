"use client";
import React, { useState, useEffect, useTransition, useCallback } from "react";
import { useAdmin } from "../AdminProvider";
import { getProdukList, getKategoriOptions, deleteProduk } from "./actions";
import ProdukModal from "./components/ProdukModal";

interface KategoriOption { id_kategori: string; nama_kategori: string; }
interface ProdukItem { id_produk: string; id_kategori: string; nama_kategori?: string; nama_produk: string; harga: string; deskripsi: string; foto_produk: string; gender: string; }

export default function ProdukPage() {
  const [produks, setProduks] = useState<ProdukItem[]>([]);
  const [kategoris, setKategoris] = useState<KategoriOption[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [filterKategori, setFilterKategori] = useState<string>("Semua");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const { role } = useAdmin();
  const [, startTransition] = useTransition();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<ProdukItem | null>(null);

  const [toast, setToast] = useState<{ show: boolean; msg: string; type: "success" | "error"; }>({ show: false, msg: "", type: "success" });
  
  const showToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  }, []);

  const loadData = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const [produkData, kategoriData] = await Promise.all([getProdukList(), getKategoriOptions()]);
      setProduks(produkData as unknown as ProdukItem[]);
      setKategoris(kategoriData as unknown as KategoriOption[]);
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat data dari server", "error");
    } finally {
      setIsLoadingData(false);
    }
  }, [showToast]);

  useEffect(() => { loadData(); }, [loadData]);

  const filteredProduks = produks.filter((produk) => filterKategori === "Semua" || String(produk.id_kategori) === String(filterKategori));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProduks.length / itemsPerPage) || 1;
  const currentData = filteredProduks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => { setCurrentPage(1); }, [filterKategori]);

  const handleAdd = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (produk: ProdukItem) => {
    setEditData(produk);
    setIsModalOpen(true);
  };

  const getImageUrl = (foto: string) => {
    if (!foto) return "";
    if (foto.startsWith("data:image") || foto.startsWith("http")) return foto;
    return `/uploads/produk/${foto}`;
  };

  const handleDelete = (id: string | number) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini secara permanen?")) {
      startTransition(async () => {
        try {
          await deleteProduk(Number(id));
          showToast("Produk berhasil dihapus!", "success");
          if (currentData.length === 1 && currentPage > 1) setCurrentPage((prev) => prev - 1);
          await loadData();
        } catch (err) {
          console.error(err);
          showToast("Gagal menghapus produk!", "error");
        }
      });
    }
  };

  const formatRupiah = (angka: string | number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(angka));

  return (
    <>
      <div className="p-4 md:p-8 animate-fade-in-up relative">
        {toast.show && (
          <div className={`fixed top-6 right-6 z-9999 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-fade-in-up transition-colors ${toast.type === "success" ? "bg-gray-900 text-white" : "bg-red-50 text-red-600 border border-red-100"}`}>
            <i className={`fa-solid ${toast.type === "success" ? "fa-circle-check text-brand-gold" : "fa-triangle-exclamation"} text-xl`}></i>
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
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Total Produk</p>
                <p className="text-2xl font-black text-gray-900">{produks.length}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-gold/20 text-brand-gold rounded-xl flex items-center justify-center text-xl"><i className="fa-solid fa-tags"></i></div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Kategori</p>
                <p className="text-2xl font-black text-gray-900">{kategoris.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 bg-gray-900 flex justify-end">
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Filter Kategori:</label>
              <select value={filterKategori} onChange={(e) => setFilterKategori(e.target.value)} className="border border-gray-700 rounded-lg px-4 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-brand-gold cursor-pointer bg-gray-800">
                <option value="Semua">Semua Kategori</option>
                {kategoris.map((kat) => (
                  <option key={String(kat.id_kategori)} value={String(kat.id_kategori)}>{kat.nama_kategori}</option>
                ))}
              </select>
            </div>
          </div>

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
                  <tr><td colSpan={5} className="p-10 text-center text-gray-400 font-bold italic border-x border-gray-100">{filterKategori === "Semua" ? "Belum ada data produk." : "Tidak ada produk dalam kategori ini."}</td></tr>
                ) : (
                  currentData.map((row, idx) => (
                    <tr key={String(row.id_produk)} className="hover:bg-blue-50/10 transition">
                      <td className="px-6 py-4 text-center text-gray-400 font-bold border-x border-gray-100">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="px-6 py-4 border-x border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0 shadow-inner">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={row.foto_produk ? getImageUrl(row.foto_produk) : "https://placehold.co/100x100?text=No+Image"} alt={row.nama_produk} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = "https://placehold.co/100x100?text=Error"; }} />
                          </div>
                          <div className="max-w-50">
                            <p className="font-bold text-gray-900 text-sm truncate" title={row.nama_produk}>{row.nama_produk}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-x border-gray-100">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest mb-1 inline-block">{row.nama_kategori || "Tanpa Kategori"}</span>
                        <div className="text-[11px] font-bold text-gray-500 capitalize flex items-center gap-1.5 mt-1">
                          {row.gender === "pria" ? <i className="fa-solid fa-mars text-blue-500"></i> : row.gender === "wanita" ? <i className="fa-solid fa-venus text-pink-500"></i> : row.gender === "unisex" ? <i className="fa-solid fa-venus-mars text-purple-500"></i> : <i className="fa-solid fa-leaf text-green-500"></i>}
                          {row.gender || "Netral"}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-black text-gray-900 text-sm border-x border-gray-100">{formatRupiah(row.harga)}</td>
                      <td className="px-6 py-4 border-x border-gray-100 relative">
                        <div className="flex justify-center">
                          <button onClick={() => setActiveDropdown(activeDropdown === String(row.id_produk) ? null : String(row.id_produk))} className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition flex items-center justify-center focus:outline-none">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          {activeDropdown === String(row.id_produk) && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                              <div className="absolute right-12 top-4 w-36 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-zoom-in">
                                <button onClick={() => { handleEdit(row); setActiveDropdown(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-3">
                                  <i className="fa-solid fa-pen"></i> Edit Data
                                </button>
                                {role === "Super Admin" && (
                                  <button onClick={() => { handleDelete(row.id_produk); setActiveDropdown(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition flex items-center gap-3 border-t border-gray-100">
                                    <i className="fa-solid fa-trash"></i> Hapus
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!isLoadingData && filteredProduks.length > 0 && (
            <div className="p-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900">
              <div className="text-xs font-bold text-gray-400">
                Menampilkan <span className="text-white">{(currentPage - 1) * itemsPerPage + 1}</span> hingga <span className="text-white">{Math.min(currentPage * itemsPerPage, filteredProduks.length)}</span> dari <span className="text-white">{filteredProduks.length}</span> entri
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 transition"><i className="fa-solid fa-chevron-left text-xs"></i></button>
                <div className="text-xs font-bold px-3 py-1 bg-gray-800 border border-gray-700 text-white rounded-lg">{currentPage} / {totalPages}</div>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 transition"><i className="fa-solid fa-chevron-right text-xs"></i></button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProdukModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadData} 
        kategoris={kategoris} 
        editData={editData} 
        showToast={showToast} 
      />
    </>
  );
}