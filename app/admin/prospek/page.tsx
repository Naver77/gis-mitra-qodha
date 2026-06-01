"use client";
import React, { useState, useEffect, useCallback } from "react";
import { customConfirm } from "../GlobalConfirmModal";

interface LeadData {
  id_lead: number;
  nama_prospek: string;
  no_whatsapp: string;
  sumber_halaman: string;
  nama_mitra_target: string | null;
  konteks_pesan: string;
  status_lead: "Belum Dibalas" | "Sudah Dibalas";
  waktu_klik: string;
}

export default function ProspekPage() {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // STATE UNTUK FILTER WAKTU, PENCARIAN, & DROPDOWN AKSI
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<"Terbaru" | "Terlama">("Terbaru");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Kembalikan ke halaman 1 setiap kali admin mengetik pencarian atau mengubah filter
  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, searchQuery]);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/prospek");
      const data = await res.json();
      if (res.ok && Array.isArray(data)) setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // LOGIKA PENCARIAN & PENGURUTAN (SORTING)
  const processedLeads = [...leads]
    .filter((lead) => {
      // Jika kolom pencarian kosong, tampilkan semua
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        lead.nama_prospek.toLowerCase().includes(query) ||
        lead.no_whatsapp.includes(query) ||
        lead.konteks_pesan.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.waktu_klik).getTime();
      const dateB = new Date(b.waktu_klik).getTime();
      return sortOrder === "Terbaru" ? dateB - dateA : dateA - dateB;
    });

  const totalPages = Math.ceil(processedLeads.length / itemsPerPage) || 1;
  const currentData = processedLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // DATA REKAPITULASI (SUMMARY) - Dihitung dari data asli (bukan yang di-search)
  const totalLeads = leads.length;
  const belumDibalas = leads.filter(
    (l) => l.status_lead === "Belum Dibalas",
  ).length;
  const sudahDibalas = leads.filter(
    (l) => l.status_lead === "Sudah Dibalas",
  ).length;

  const handleMarkAsReplied = async (lead: LeadData) => {
    const isDone = await customConfirm(
      "Tandai Sudah Dibalas?",
      `Konfirmasi bahwa prospek atas nama ${lead.nama_prospek} sudah ditangani/dihubungi oleh Admin.`,
      "info",
      "Ya, Tandai Selesai",
      "Batal",
    );

    if (isDone) {
      try {
        await fetch("/api/prospek", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_lead: lead.id_lead,
            status_lead: "Sudah Dibalas",
          }),
        });
        fetchLeads(); // Reload data
      } catch (error) {
        console.error("Gagal update status:", error);
      }
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="animate-fade-in-up">
      {/* HEADER & REKAP KARTU */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">
          Data Prospek (Leads)
        </h1>
        <p className="text-gray-500 font-medium mt-1">
          Daftar pengunjung publik yang telah mengisi form kontak.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl">
              <i className="fa-solid fa-users"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">
                Total Prospek Masuk
              </p>
              <p className="text-2xl font-black text-gray-900">{totalLeads}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
            {belumDibalas > 0 && (
              <div className="absolute top-0 right-0 w-2 h-full bg-red-500 animate-pulse"></div>
            )}
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl">
              <i className="fa-solid fa-envelope-open-text"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">
                Menunggu Balasan
              </p>
              <p className="text-2xl font-black text-red-600">{belumDibalas}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl">
              <i className="fa-solid fa-check-double"></i>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">
                Telah Dihubungi
              </p>
              <p className="text-2xl font-black text-gray-900">
                {sudahDibalas}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
        
        {/* FILTER BAR & KOLOM PENCARIAN (Sudah Digabung & Dirapikan) */}
        <div className="p-4 border-b border-gray-800 bg-gray-900 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* KIRI: KOLOM PENCARIAN */}
          <div className="relative w-full sm:w-1/3">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Cari prospek, no WA, atau pesan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 text-white text-sm font-medium rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-brand-gold outline-none placeholder-gray-500 transition-all shadow-inner"
            />
          </div>

          {/* KANAN: DROPDOWN URUTAN */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0">
              Urutkan Waktu:
            </label>
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "Terbaru" | "Terlama")
              }
              className="border border-gray-700 rounded-lg px-4 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-brand-gold cursor-pointer bg-gray-800"
            >
              <option value="Terbaru">Paling Baru</option>
              <option value="Terlama">Paling Lama</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto min-h-100">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900 border-b border-gray-800 text-gray-300 font-bold tracking-widest uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4 w-16 text-center border-x border-gray-800">
                  No
                </th>
                <th className="px-6 py-4 border-x border-gray-800">
                  Info Kontak Prospek
                </th>
                <th className="px-6 py-4 border-x border-gray-800 min-w-62.5">
                  Konteks & Isi Pesan
                </th>
                <th className="px-6 py-4 border-x border-gray-800 text-center">
                  Status
                </th>
                <th className="px-6 py-4 border-x border-gray-800 text-center w-28">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium bg-white">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-10 text-center text-gray-400 font-bold animate-pulse"
                  >
                    Memuat Data Leads...
                  </td>
                </tr>
              ) : processedLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-10 text-center text-gray-400 font-bold italic"
                  >
                    {searchQuery ? "Data tidak ditemukan." : "Belum ada prospek masuk."}
                  </td>
                </tr>
              ) : (
                currentData.map((row, idx) => (
                  <tr
                    key={row.id_lead}
                    className={`transition ${row.status_lead === "Belum Dibalas" ? "bg-red-50/20" : "hover:bg-gray-50"}`}
                  >
                    <td className="px-6 py-4 text-center text-gray-400 font-bold border-x border-gray-100">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>

                    <td className="px-6 py-4 border-x border-gray-100">
                      <div className="font-bold text-gray-900 text-base">
                        {row.nama_prospek}
                      </div>
                      <div className="text-xs text-brand-green font-mono mt-1 font-bold">
                        <i className="fa-brands fa-whatsapp mr-1"></i>+
                        {row.no_whatsapp}
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">
                        <i className="fa-regular fa-clock"></i>{" "}
                        {formatDate(row.waktu_klik)}
                      </p>
                    </td>

                    <td className="px-6 py-4 border-x border-gray-100">
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-gray-200">
                          Asal: {row.sumber_halaman}
                        </span>
                        {row.nama_mitra_target && (
                          <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-blue-200">
                            🎯 Mitra Tujuan: {row.nama_mitra_target}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 italic text-xs leading-relaxed bg-gray-50 p-2 rounded-lg border border-gray-100">
                        &quot;{row.konteks_pesan}&quot;
                      </p>
                    </td>

                    <td className="px-6 py-4 text-center border-x border-gray-100 whitespace-nowrap min-w-35">
                      <span
                        className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md border block w-full text-center ${
                          row.status_lead === "Belum Dibalas"
                            ? "bg-red-50 text-red-600 border-red-200 shadow-sm"
                            : "bg-green-50 text-green-600 border-green-200"
                        }`}
                      >
                        {row.status_lead === "Belum Dibalas" ? (
                          <>
                            <i className="fa-solid fa-circle-exclamation mr-1 animate-pulse"></i>{" "}
                            Belum Dibalas
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-check-double mr-1"></i>{" "}
                            Telah Dibalas
                          </>
                        )}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center border-x border-gray-100 relative">
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === String(row.id_lead)
                                ? null
                                : String(row.id_lead),
                            )
                          }
                          className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition flex items-center justify-center focus:outline-none"
                        >
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </button>

                        {activeDropdown === String(row.id_lead) && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setActiveDropdown(null)}
                            ></div>
                            <div className="absolute right-12 top-4 w-44 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-zoom-in">
                              {row.status_lead === "Belum Dibalas" && (
                                <button
                                  onClick={() => {
                                    handleMarkAsReplied(row);
                                    setActiveDropdown(null);
                                  }}
                                  className="w-full text-left px-4 py-3 text-xs font-bold text-gray-700 hover:bg-green-50 hover:text-green-600 transition flex items-center gap-3"
                                >
                                  <i className="fa-solid fa-check"></i> Tandai Selesai
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(row.no_whatsapp);
                                  alert("Nomor WA tersalin!");
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-left px-4 py-3 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition flex items-center gap-3 border-t border-gray-100"
                              >
                                <i className="fa-regular fa-copy"></i> Copy No WA
                              </button>
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
        
        {/* BAR PAGINASI FOOTER */}
        {!isLoading && processedLeads.length > 0 && (
          <div className="p-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-900">
            <div className="text-xs font-bold text-gray-400">
              Menampilkan{" "}
              <span className="text-white">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              hingga{" "}
              <span className="text-white">
                {Math.min(currentPage * itemsPerPage, processedLeads.length)}
              </span>{" "}
              dari <span className="text-white">{processedLeads.length}</span>{" "}
              entri
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 transition"
              >
                <i className="fa-solid fa-chevron-left text-xs"></i>
              </button>
              <div className="text-xs font-bold px-3 py-1 bg-gray-800 border border-gray-700 text-white rounded-lg">
                {currentPage} / {totalPages}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white disabled:opacity-50 transition"
              >
                <i className="fa-solid fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}