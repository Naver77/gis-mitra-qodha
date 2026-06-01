"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { useAdmin } from "@/app/admin/AdminProvider";

interface AdminMitraData {
  id: number;
  nama_toko: string;
  pemilik: string;
  level: "Distributor" | "Agen" | "Reseller";
  provinsi: string;
  kota: string;
  kecamatan: string;
  alamat_lengkap: string;
  lat: number;
  lng: number;
}

const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400 font-bold">
      Memuat Peta...
    </div>
  ),
});

export default function AdminMitraPage() {
  const [mitras, setMitras] = useState<AdminMitraData[]>([]);
  const [officialCities, setOfficialCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<AdminMitraData>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>("Semua");
  const [isDirty, setIsDirty] = useState(false);
  const { role } = useAdmin();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    show: boolean;
    msg: string;
    type: "success" | "error";
  }>({ show: false, msg: "", type: "success" });

  const showToast = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 4000);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState(""); // STATE PENCARIAN BARU

  // LOGIKA FILTER GANDA (Berdasarkan Level & Teks Pencarian)
  const filteredMitras = mitras.filter((m) => {
    const matchLevel = filterLevel === "Semua" || m.level === filterLevel;
    const matchSearch = 
      (m.nama_toko && m.nama_toko.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.pemilik && m.pemilik.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.kota && m.kota.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchLevel && matchSearch;
  });

  const totalPages = Math.ceil(filteredMitras.length / itemsPerPage) || 1;
  const currentData = filteredMitras.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset ke halaman 1 setiap kali filter/pencarian berubah
  }, [filterLevel, searchQuery]);

  // FETCH DATA MITRA
  const fetchMitra = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/mitra");
      const data = await res.json();
      if (res.ok && Array.isArray(data)) setMitras(data);
      else setMitras([]);
    } catch {
      setMitras([]);
      showToast("Gagal memuat data dari server", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  // FETCH DATA KOTA (GEOJSON) UNTUK DROPDOWN
  useEffect(() => {
    fetchMitra();
    
    fetch('/assets/geojson/batas_kabupaten.geojson')
      .then(res => res.json())
      .then(data => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawCities = data.features.map((f: any) => f.properties?.WADMKK).filter((c: string) => c);
        setOfficialCities(Array.from(new Set(rawCities)).sort() as string[]);
      })
      .catch(err => console.error("Gagal load kota:", err));
  }, [fetchMitra]);

  const handleExtractLocation = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawText = e.target.value;
    if (!rawText) return;

    const regexLatLng = /(-?\d+\.\d+)[,\s]+(-?\d+\.\d+)/;
    const matchLatLng = rawText.match(regexLatLng);
    const regexPlace = /\/place\/([^\/]+)\//;
    const matchPlace = rawText.match(regexPlace);
    let extractedName = "";
    if (matchPlace && matchPlace[1]) extractedName = decodeURIComponent(matchPlace[1].replace(/\+/g, " "));

    if (matchLatLng) {
      const lat = parseFloat(matchLatLng[1]);
      const lng = parseFloat(matchLatLng[2]);
      showToast("Mengekstrak data wilayah...", "success");

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const geoData = await res.json();

        if (geoData && geoData.address) {
          const addr = geoData.address;
          const kecamatan = addr.suburb || addr.village || addr.district || "";
          const rawKota = (addr.city || addr.town || addr.county || "").replace(/kabupaten\s/i, "").replace(/kota\s/i, "");
          const provinsi = addr.state || "";
          
          let matchedCity = "";
          if (rawKota) {
            const found = officialCities.find(c => c.toLowerCase().includes(rawKota.toLowerCase()));
            if (found) matchedCity = found;
          }

          setFormData((prev) => ({
            ...prev, lat, lng,
            nama_toko: extractedName || prev.nama_toko || "",
            kecamatan: kecamatan || prev.kecamatan || "",
            kota: matchedCity || prev.kota || "", 
            provinsi: provinsi || prev.provinsi || "",
            alamat_lengkap: geoData.display_name || prev.alamat_lengkap || "",
          }));
          setIsDirty(true);
          showToast("Koordinat & Alamat otomatis terisi!", "success");
        } else {
          setFormData((prev) => ({ ...prev, lat, lng, nama_toko: extractedName || prev.nama_toko || "" }));
          setIsDirty(true);
          showToast("Koordinat berhasil dipasang", "success");
        }
      } catch {
        setFormData((prev) => ({ ...prev, lat, lng, nama_toko: extractedName || prev.nama_toko || "" }));
        setIsDirty(true);
      }
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lat || !formData.lng) {
      showToast("Klik pada peta untuk mengatur titik koordinat!", "error");
      return;
    }
    
    setIsPending(true);
    try {
      const url = "/api/mitra";
      const method = isEditing ? "PUT" : "POST";
      
      // FIX DATABASE: Samakan payload dengan struktur kolom Database
      const payload = {
        ...formData,
        latitude: formData.lat,
        longitude: formData.lng
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(isEditing ? "Data Mitra berhasil diupdate!" : "Mitra baru berhasil ditambah!", "success");
        setIsDirty(false);
        setIsModalOpen(false); // Otomatis tertutup
        await fetchMitra();
      } else {
        const errData = await res.json().catch(() => ({}));
        showToast(errData.message || "Gagal menyimpan ke database. Cek API Anda!", "error");
      }
    } catch {
      showToast("Koneksi ke server terputus", "error");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus mitra ini?")) {
      try {
        const res = await fetch(`/api/mitra?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          showToast("Data Mitra berhasil dihapus!", "success");
          if (currentData.length === 1 && currentPage > 1) setCurrentPage((prev) => prev - 1);
          await fetchMitra();
        }
      } catch {
        showToast("Gagal menghapus data", "error");
      }
    }
  };

  const openModal = (mitra?: AdminMitraData) => {
    if (mitra) {
      setFormData(mitra);
      setIsEditing(true);
    } else {
      setFormData({ level: "Reseller", lat: 0, lng: 0, nama_toko: "", pemilik: "", provinsi: "", kota: "", kecamatan: "", alamat_lengkap: "" });
      setIsEditing(false);
    }
    setIsDirty(false);
    setIsModalOpen(true);
  };

  // FIX CLOSE BUTTON: Menggunakan native confirm agar tidak hang
  const handleCloseModal = () => {
    if (isDirty) {
      const isConfirmed = window.confirm("Perubahan belum disimpan. Yakin ingin menutup form ini?");
      if (!isConfirmed) return;
    }
    setIsModalOpen(false);
  };

  return (
    <>
      {/* FIX TOAST: Dipindah ke Luar (Root Level) dengan z-[999999] agar bebas dari jebakan animasi Modal */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-999999 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-fade-in-up transition-colors ${toast.type === "success" ? "bg-gray-900 text-white" : "bg-red-50 text-red-600 border border-red-200"}`}>
          <i className={`fa-solid ${toast.type === "success" ? "fa-circle-check text-brand-gold" : "fa-triangle-exclamation"} text-xl`}></i>
          <span className="font-bold text-sm">{toast.msg}</span>
        </div>
      )}

      <div className="p-4 md:p-8 animate-fade-in-up relative z-10">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900">Manajemen Mitra</h1>
              <p className="text-gray-500 font-medium">Kelola jaringan Mitra dan koordinat peta WebGIS.</p>
            </div>
            <button onClick={() => openModal()} className="bg-brand-gold hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-bold transition shadow-lg flex items-center gap-2">
              <i className="fa-solid fa-plus"></i> Tambah Mitra
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 text-gray-600 rounded-xl flex items-center justify-center text-xl"><i className="fa-solid fa-users"></i></div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Total Mitra</p>
                <p className="text-2xl font-black text-gray-900">{mitras.length}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center text-xl"><i className="fa-solid fa-crown"></i></div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Distributor</p>
                <p className="text-2xl font-black text-gray-900">{mitras.filter((m) => m.level === "Distributor").length}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl"><i className="fa-solid fa-store"></i></div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Agen</p>
                <p className="text-2xl font-black text-gray-900">{mitras.filter((m) => m.level === "Agen").length}</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl"><i className="fa-solid fa-handshake"></i></div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Reseller</p>
                <p className="text-2xl font-black text-gray-900">{mitras.filter((m) => m.level === "Reseller").length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-800 bg-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* KIRI: KOLOM PENCARIAN BARU */}
            <div className="relative w-full sm:w-1/3">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Cari toko, pemilik, atau kota..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white text-sm font-medium rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-brand-gold outline-none placeholder-gray-500 transition-all shadow-inner"
              />
            </div>

            {/* KANAN: FILTER LEVEL (TIDAK DIHAPUS) */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0">
                Filter Level:
              </label>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="border border-gray-700 rounded-xl px-4 py-2 text-sm font-bold text-white bg-gray-800 outline-none focus:ring-2 focus:ring-brand-gold cursor-pointer transition-all shadow-inner"
              >
                <option value="Semua">Semua Level</option>
                <option value="Distributor">Distributor</option>
                <option value="Agen">Agen</option>
                <option value="Reseller">Reseller</option>
              </select>
            </div>
            
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 border-b border-gray-800 text-gray-300 font-bold tracking-widest uppercase text-[10px]">
                <tr>
                  <th className="px-6 py-4 w-16 text-center border-x border-gray-800">No</th>
                  <th className="px-6 py-4 border-x border-gray-800">Toko & Pemilik</th>
                  <th className="px-6 py-4 border-x border-gray-800">Level</th>
                  <th className="px-6 py-4 border-x border-gray-800">Wilayah & Koordinat</th>
                  <th className="px-6 py-4 text-center w-28 border-x border-gray-800">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-sm bg-white">
                {isLoading ? (
                  <tr><td colSpan={5} className="p-10 text-center text-gray-400 font-bold animate-pulse">Memuat Data dari Database...</td></tr>
                ) : currentData.length === 0 ? (
                  <tr><td colSpan={5} className="p-10 text-center text-gray-400 font-bold italic">Belum ada data mitra.</td></tr>
                ) : (
                  currentData.map((m, idx) => (
                    <tr key={m.id} className="hover:bg-blue-50/10 transition">
                      <td className="px-6 py-4 text-center text-gray-400 font-bold border-x border-gray-100">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="px-6 py-4 border-x border-gray-100">
                        <div className="font-bold text-gray-900">{m.nama_toko}</div>
                        <div className="text-xs text-gray-500 mt-0.5"><i className="fa-solid fa-user text-[10px] mr-1"></i>{m.pemilik}</div>
                      </td>
                      <td className="px-6 py-4 border-x border-gray-100">
                        <span className={`px-2 py-1 text-[9px] font-black uppercase rounded-md border inline-block ${m.level === "Distributor" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : m.level === "Agen" ? "bg-green-50 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                          {m.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-x border-gray-100">
                        <div className="font-bold text-gray-700 text-sm"><i className="fa-solid fa-map-pin text-red-500 mr-1"></i>{m.kota || "Belum diatur"}</div>
                        <div className="text-[10px] text-gray-500 mt-1 truncate max-w-62.5">{m.alamat_lengkap}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-1 bg-gray-50 inline-block px-1.5 py-0.5 rounded border border-gray-200">{m.lat}, {m.lng}</div>
                      </td>
                      <td className="px-6 py-4 border-x border-gray-100 relative">
                        <div className="flex justify-center">
                          <button onClick={() => setActiveDropdown(activeDropdown === String(m.id) ? null : String(m.id))} className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-200 transition">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          {activeDropdown === String(m.id) && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                              <div className="absolute right-12 top-4 w-36 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-zoom-in">
                                <button onClick={() => { openModal(m); setActiveDropdown(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-3">
                                  <i className="fa-solid fa-pen"></i> Edit Data
                                </button>
                                {role === "Super Admin" && (
                                  <button onClick={() => { handleDelete(m.id); setActiveDropdown(null); }} className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition flex items-center gap-3 border-t border-gray-100">
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

          {!isLoading && mitras.length > 0 && (
            <div className="p-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900">
              <div className="text-xs font-bold text-gray-400">
                Menampilkan <span className="text-white">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="text-white">{Math.min(currentPage * itemsPerPage, mitras.length)}</span> dari <span className="text-white">{mitras.length}</span> entri
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 disabled:opacity-50">
                  <i className="fa-solid fa-chevron-left text-xs"></i>
                </button>
                <div className="text-xs font-bold px-3 py-1 bg-gray-800 border border-gray-700 text-white rounded-lg">{currentPage} / {totalPages}</div>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 disabled:opacity-50">
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: "rgba(17, 24, 39, 0.8)", backdropFilter: "blur(8px)" }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] flex flex-col animate-zoom-in overflow-hidden relative">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
              <h2 className="text-xl font-black text-gray-900">{isEditing ? "Edit Data Mitra" : "Tambah Mitra Baru"}</h2>
              <button type="button" onClick={handleCloseModal} className="w-8 h-8 bg-gray-200 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            {/* FIX BROWSER POPUP: Tambahkan autoComplete="off" di form utama */}
            <form id="mitraForm" onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden" autoComplete="off">
              <div className="p-6 overflow-y-auto hide-scrollbar flex-1 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Nama Toko</label>
                        <input required type="text" autoComplete="off" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold" value={formData.nama_toko || ""} onChange={(e) => { setFormData({ ...formData, nama_toko: e.target.value }); setIsDirty(true); }} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Nama Pemilik</label>
                        <input required type="text" autoComplete="off" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold" value={formData.pemilik || ""} onChange={(e) => { setFormData({ ...formData, pemilik: e.target.value }); setIsDirty(true); }} />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Level Mitra</label>
                        <select required autoComplete="off" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none font-bold text-sm" value={formData.level || "Reseller"} onChange={(e) => { setFormData({ ...formData, level: e.target.value as "Distributor" | "Agen" | "Reseller" }); setIsDirty(true); }}>
                          <option value="Distributor">Distributor</option>
                          <option value="Agen">Agen</option>
                          <option value="Reseller">Reseller</option>
                        </select>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Provinsi</label>
                        {/* FIX CHROME AUTOFILL: Gunakan new-password untuk menipu Chrome agar tidak menawarkan simpan alamat */}
                        <input required type="text" autoComplete="new-password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none text-sm" value={formData.provinsi || ""} onChange={(e) => { setFormData({ ...formData, provinsi: e.target.value }); setIsDirty(true); }} />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-[10px] font-bold text-brand-green uppercase mb-1">Kota / Kab (Sesuai Peta)</label>
                        <select required autoComplete="off" className="w-full border-2 border-green-200 rounded-xl px-4 py-2.5 bg-green-50 focus:ring-2 focus:ring-brand-gold outline-none text-sm font-bold cursor-pointer" value={formData.kota || ""} onChange={(e) => { setFormData({ ...formData, kota: e.target.value }); setIsDirty(true); }}>
                          <option value="" disabled>-- Pilih Wilayah --</option>
                          {officialCities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Kecamatan</label>
                        <input required type="text" autoComplete="new-password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none text-sm" value={formData.kecamatan || ""} onChange={(e) => { setFormData({ ...formData, kecamatan: e.target.value }); setIsDirty(true); }} />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Alamat Lengkap</label>
                        <textarea required rows={2} autoComplete="new-password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none text-sm" value={formData.alamat_lengkap || ""} onChange={(e) => { setFormData({ ...formData, alamat_lengkap: e.target.value }); setIsDirty(true); }} />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 flex flex-col space-y-4">
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl shadow-inner">
                      <label className="text-[10px] font-bold text-blue-700 uppercase mb-2 flex items-center justify-between">
                        <span><i className="fa-solid fa-wand-magic-sparkles mr-1"></i> Auto-Isi dari G-Maps</span>
                      </label>
                      <input type="text" onChange={handleExtractLocation} placeholder="Paste Link Maps (opsional) atau koordinat: -6.4024, 106.7942" className="w-full px-4 py-2.5 bg-white border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none text-sm font-mono text-gray-700 shadow-sm" />
                      <p className="text-[9px] text-blue-600 mt-2 font-medium bg-blue-100/50 p-2 rounded-lg border border-blue-100">
                        * Sistem akan <b>Otomatis</b> mengisi lokasi yang sesuai di sebelah kiri berdasarkan koordinat yang dicari.
                      </p>
                    </div>

                    <div className="flex-1 min-h-75 border-2 border-gray-200 rounded-2xl overflow-hidden bg-gray-100 relative">
                      <MapPicker
                        lat={formData.lat || 0}
                        lng={formData.lng || 0}
                        setLat={(val) => { setFormData((prev) => ({ ...prev, lat: val })); setIsDirty(true); }}
                        setLng={(val) => { setFormData((prev) => ({ ...prev, lng: val })); setIsDirty(true); }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 shrink-0">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Latitude</label>
                        <input readOnly type="number" step="any" className="w-full border border-gray-200 rounded-xl px-4 py-2 bg-gray-100 text-gray-700 font-mono text-sm cursor-not-allowed font-bold" value={formData.lat || ""} placeholder="Otomatis" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Longitude</label>
                        <input readOnly type="number" step="any" className="w-full border border-gray-200 rounded-xl px-4 py-2 bg-gray-100 text-gray-700 font-mono text-sm cursor-not-allowed font-bold" value={formData.lng || ""} placeholder="Otomatis" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER TOMBOL SEKARANG BERADA DI DALAM FORM */}
              <div className="px-6 py-4 border-t border-gray-100 shrink-0 bg-gray-50 flex justify-end gap-3">
                <button type="button" onClick={handleCloseModal} className="px-6 py-3 font-bold text-gray-500 hover:text-gray-900 transition">
                  Batal
                </button>
                <button type="submit" disabled={isPending} className="px-8 py-3 bg-gray-900 text-white font-black rounded-xl hover:bg-brand-gold hover:text-gray-900 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50">
                  {isPending ? <><i className="fa-solid fa-circle-notch fa-spin"></i> MEMPROSES...</> : <><i className="fa-solid fa-save"></i> SIMPAN MITRA</>}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}