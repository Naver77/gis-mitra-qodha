"use client";
import React, { useState, useEffect, useTransition } from "react";
import { saveProduk } from "../actions";

interface KategoriOption {
  id_kategori: string;
  nama_kategori: string;
}

interface ProdukItem {
  id_produk: string;
  id_kategori: string;
  nama_produk: string;
  harga: string;
  deskripsi: string;
  foto_produk: string;
  gender: string;
}

interface ProdukModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  kategoris: KategoriOption[];
  editData: ProdukItem | null;
  showToast: (msg: string, type: "success" | "error") => void;
}

export default function ProdukModal({
  isOpen,
  onClose,
  onSuccess,
  kategoris,
  editData,
  showToast,
}: ProdukModalProps) {
  const [isPending, startTransition] = useTransition();
  const [isKategoriOpen, setIsKategoriOpen] = useState(false);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>("");
  const [displayHarga, setDisplayHarga] = useState("");

  const [formData, setFormData] = useState({
    id_kategori: "",
    nama_produk: "",
    harga: "",
    deskripsi: "",
    gender: "",
    foto_lama: "",
  });

  const getImageUrl = (foto: string) => {
    if (!foto) return "";
    if (foto.startsWith("data:image") || foto.startsWith("http")) return foto;
    return `/uploads/produk/${foto}`;
  };

  useEffect(() => {
    if (isOpen) {
      // PERBAIKAN: Gunakan setTimeout agar tidak terjadi cascading render error di React
      const timer = setTimeout(() => {
        if (editData) {
          setFormData({
            id_kategori: String(editData.id_kategori),
            nama_produk: editData.nama_produk,
            harga: String(editData.harga),
            deskripsi: editData.deskripsi || "",
            gender: editData.gender || "",
            foto_lama: editData.foto_produk || "",
          });
          setDisplayHarga(new Intl.NumberFormat("id-ID").format(Number(editData.harga)));
          setFotoPreview(getImageUrl(editData.foto_produk));
        } else {
          setFormData({
            id_kategori: "",
            nama_produk: "",
            harga: "",
            deskripsi: "",
            gender: "",
            foto_lama: "",
          });
          setDisplayHarga("");
          setFotoPreview("");
        }
        setFotoFile(null);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [isOpen, editData]);

  if (!isOpen) return null;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, harga: rawValue });
    setDisplayHarga(rawValue ? new Intl.NumberFormat("id-ID").format(Number(rawValue)) : "");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        showToast("Ukuran foto terlalu besar! Maksimal 1MB.", "error");
        e.target.value = "";
        return;
      }
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.id_kategori) return showToast("Kategori belum dipilih!", "error");
    if (!formData.harga) return showToast("Harga harus diisi!", "error");

    const dataToSend = new FormData();
    if (editData) dataToSend.append("id_produk", String(editData.id_produk));
    dataToSend.append("id_kategori", formData.id_kategori);
    dataToSend.append("nama_produk", formData.nama_produk);
    dataToSend.append("harga", formData.harga);
    dataToSend.append("deskripsi", formData.deskripsi);
    dataToSend.append("gender", formData.gender);
    dataToSend.append("foto_lama", formData.foto_lama);
    if (fotoFile) dataToSend.append("foto", fotoFile);

    startTransition(async () => {
      try {
        await saveProduk(null, dataToSend);
        showToast(editData ? "Produk diperbarui!" : "Produk baru ditambah!", "success");
        onSuccess();
        onClose();
      } catch (err) {
        // PERBAIKAN: Gunakan console.error untuk err
        console.error(err);
        showToast("Gagal menyimpan produk!", "error");
      }
    });
  };

  return (
    // PERBAIKAN: Mengganti z-[9999] menjadi z-9999
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: "rgba(17, 24, 39, 0.8)", backdropFilter: "blur(8px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col animate-zoom-in overflow-hidden relative">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
          <h2 className="text-xl font-black text-gray-900">{editData ? "Edit Data Produk" : "Tambah Produk Baru"}</h2>
          <button type="button" onClick={onClose} className="w-8 h-8 bg-gray-200 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors">
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
                  <input type="text" required value={formData.nama_produk} onChange={(e) => setFormData({ ...formData, nama_produk: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-900 transition-all" placeholder="Contoh: Parfum Jasmine" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Kategori</label>
                    <button type="button" onClick={() => setIsKategoriOpen(!isKategoriOpen)} className={`w-full px-4 py-3 bg-gray-50 border rounded-xl outline-none text-sm font-bold text-left flex justify-between items-center transition-all ${isKategoriOpen ? "border-brand-gold ring-2 ring-brand-gold/20" : "border-gray-200 text-gray-900 hover:bg-gray-100"}`}>
                      <span className={!formData.id_kategori ? "text-gray-400" : "text-gray-900"}>
                        {formData.id_kategori ? kategoris.find((k) => String(k.id_kategori) === formData.id_kategori)?.nama_kategori : "-- Pilih Kategori --"}
                      </span>
                      <i className={`fa-solid fa-chevron-down text-gray-400 transition-transform duration-300 ${isKategoriOpen ? "rotate-180 text-brand-gold" : ""}`}></i>
                    </button>
                    {isKategoriOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsKategoriOpen(false)}></div>
                        <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden animate-zoom-in">
                          <ul className="max-h-48 overflow-y-auto">
                            <li onClick={() => { setFormData({ ...formData, id_kategori: "" }); setIsKategoriOpen(false); }} className="px-4 py-3 text-sm font-bold text-gray-400 hover:bg-gray-50 cursor-pointer border-b border-gray-50 transition">-- Pilih Kategori --</li>
                            {kategoris.length === 0 ? (
                              <li className="px-4 py-4 text-xs text-center text-gray-400 font-bold italic">Belum ada kategori</li>
                            ) : (
                              kategoris.map((cat) => (
                                <li key={String(cat.id_kategori)} onClick={() => { setFormData({ ...formData, id_kategori: String(cat.id_kategori) }); setIsKategoriOpen(false); }} className={`px-4 py-3 text-sm font-bold cursor-pointer transition-colors flex items-center justify-between ${formData.id_kategori === String(cat.id_kategori) ? "bg-brand-gold/10 text-yellow-700" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`}>
                                  {cat.nama_kategori}
                                  {formData.id_kategori === String(cat.id_kategori) && <i className="fa-solid fa-check text-brand-gold"></i>}
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Harga Jual (Rp)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">Rp</span>
                      <input type="text" required value={displayHarga} onChange={handlePriceChange} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold text-gray-900 font-mono" placeholder="150.000" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase mb-2">Deskripsi Lengkap</label>
                  <textarea rows={4} value={formData.deskripsi} onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none text-sm font-medium text-gray-700 leading-relaxed" placeholder="Jelaskan detail aroma produk ini..."></textarea>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 border-b border-gray-100 pb-2">Foto Visual</h3>
                <p className="text-[10px] text-red-500 font-bold mb-3">* Maksimal 1MB (JPG/PNG/WEBP)</p>
                <div className="w-full aspect-4/5 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-brand-gold flex flex-col items-center justify-center overflow-hidden relative group transition-colors cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={fotoPreview || "https://placehold.co/400x500?text=Upload+Foto"} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = "https://placehold.co/400x500?text=Error"; }} />
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
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.gender === "" ? "bg-green-50 border-green-500 shadow-sm" : "border-gray-200 hover:bg-gray-50 bg-gray-50"}`}>
                    <input type="radio" name="gender" value="" checked={formData.gender === ""} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="text-green-500 focus:ring-green-500 w-4 h-4 accent-green-600" />
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-2"><i className="fa-solid fa-leaf text-green-500 w-4"></i> Netral / Ruangan</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.gender === "pria" ? "bg-brand-gold/10 border-brand-gold shadow-sm" : "border-gray-200 hover:bg-gray-50 bg-gray-50"}`}>
                    <input type="radio" name="gender" value="pria" checked={formData.gender === "pria"} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="text-brand-gold focus:ring-brand-gold w-4 h-4 accent-brand-gold" />
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-2"><i className="fa-solid fa-mars text-blue-500 w-4"></i> Khusus Pria</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.gender === "wanita" ? "bg-brand-gold/10 border-brand-gold shadow-sm" : "border-gray-200 hover:bg-gray-50 bg-gray-50"}`}>
                    <input type="radio" name="gender" value="wanita" checked={formData.gender === "wanita"} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="text-brand-gold focus:ring-brand-gold w-4 h-4 accent-brand-gold" />
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-2"><i className="fa-solid fa-venus text-pink-500 w-4"></i> Khusus Wanita</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.gender === "unisex" ? "bg-brand-gold/10 border-brand-gold shadow-sm" : "border-gray-200 hover:bg-gray-50 bg-gray-50"}`}>
                    <input type="radio" name="gender" value="unisex" checked={formData.gender === "unisex"} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="text-brand-gold focus:ring-brand-gold w-4 h-4 accent-brand-gold" />
                    <span className="text-sm font-bold text-gray-700 flex items-center gap-2"><i className="fa-solid fa-venus-mars text-purple-500 w-4"></i> Unisex (Bisa Semua)</span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 shrink-0 bg-gray-50 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900 transition">Batal</button>
          <button type="submit" form="produkForm" disabled={isPending} className="px-8 py-3 bg-gray-900 text-white font-black rounded-xl hover:bg-brand-gold hover:text-gray-900 transition-all duration-300 shadow-lg flex items-center gap-2 disabled:opacity-50">
            {isPending ? <><i className="fa-solid fa-circle-notch fa-spin"></i> MEMPROSES...</> : <><i className="fa-solid fa-save"></i> SIMPAN PRODUK</>}
          </button>
        </div>
      </div>
    </div>
  );
}