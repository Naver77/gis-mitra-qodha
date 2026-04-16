"use client";
import React, { useState, useEffect } from 'react';
import { customConfirm } from '../GlobalConfirmModal';

interface LeadData {
  id_lead: number;
  nama_prospek: string;
  no_whatsapp: string;
  sumber_halaman: string;
  nama_mitra_target: string | null;
  konteks_pesan: string;
  status_lead: 'Baru' | 'Dihubungi';
  waktu_klik: string;
}

export default function ProspekPage() {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/prospek');
      const data = await res.json();
      if (res.ok && Array.isArray(data)) setLeads(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleFollowUp = async (lead: LeadData) => {
    const waUrl = `https://wa.me/${lead.no_whatsapp}?text=Halo%20Kak%20${encodeURIComponent(lead.nama_prospek)},%20saya%20Admin%20Qodha%20Aromatic.%20Terkait%20pesan%20Kakak:%20"${encodeURIComponent(lead.konteks_pesan)}"`;
    window.open(waUrl, '_blank');

    const isDone = await customConfirm(
      "Tandai Telah Dihubungi?",
      `Apakah Anda sudah selesai merespon ${lead.nama_prospek} di WhatsApp? Statusnya akan diubah menjadi 'Dihubungi'.`,
      "info",
      "Ya, Tandai Selesai",
      "Belum"
    );

    if (isDone) {
      await fetch('/api/prospek', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_lead: lead.id_lead, status_lead: 'Dihubungi' })
      });
      fetchLeads();
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">Data Prospek (Leads)</h1>
        <p className="text-gray-500 font-medium mt-1">Daftar pengunjung publik yang telah mengisi form kontak.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="h-4 bg-gray-900 w-full"></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-900 border-b border-gray-800 text-gray-300 font-bold tracking-widest uppercase text-[10px]">
              <tr>
                <th className="px-6 py-4 w-16 text-center border-x border-gray-800">No</th>
                <th className="px-6 py-4 border-x border-gray-800">Nama & Kontak</th>
                <th className="px-6 py-4 border-x border-gray-800">Konteks Info</th>
                <th className="px-6 py-4 border-x border-gray-800 text-center w-32">Status</th>
                <th className="px-6 py-4 border-x border-gray-800 text-center w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm font-medium bg-white">
              {isLoading ? (
                <tr><td colSpan={5} className="p-10 text-center text-gray-400 font-bold animate-pulse">Memuat Data Leads...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center text-gray-400 font-bold italic">Belum ada prospek masuk.</td></tr>
              ) : (
                leads.map((row, idx) => (
                  <tr key={row.id_lead} className={`transition ${row.status_lead === 'Baru' ? 'bg-red-50/30' : 'hover:bg-gray-50'}`}>
                    <td className="px-6 py-4 text-center text-gray-400 font-bold border-x border-gray-100">{idx + 1}</td>
                    <td className="px-6 py-4 border-x border-gray-100">
                      <div className="font-bold text-gray-900">{row.nama_prospek}</div>
                      <div className="text-xs text-brand-green font-mono mt-1 font-bold">
                        <i className="fa-brands fa-whatsapp mr-1"></i>+{row.no_whatsapp}
                      </div>
                    </td>
                    <td className="px-6 py-4 border-x border-gray-100">
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="text-[9px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-gray-200">
                          {row.sumber_halaman}
                        </span>
                        {row.nama_mitra_target && (
                          <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider border border-blue-200">
                            🎯 Mitra: {row.nama_mitra_target}
                          </span>
                        )}
                      </div>
                      
                      {/* FIX LINTER 3: Menggunakan &quot; pengganti tanda kutip asli */}
                      <p className="text-gray-600 italic text-xs line-clamp-2">&quot;{row.konteks_pesan}&quot;</p>
                      
                      <p className="text-[9px] text-gray-400 font-bold uppercase mt-2"><i className="fa-regular fa-clock"></i> {formatDate(row.waktu_klik)}</p>
                    </td>
                    <td className="px-6 py-4 text-center border-x border-gray-100">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                        row.status_lead === 'Baru' ? 'bg-red-100 text-red-600 border-red-200 animate-pulse shadow-sm' : 'bg-green-50 text-green-600 border-green-200'
                      }`}>
                        {row.status_lead || 'Baru'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center border-x border-gray-100">
                      <button onClick={() => handleFollowUp(row)} className="bg-brand-green text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-green-600 transition flex items-center gap-2 mx-auto">
                        <i className="fa-brands fa-whatsapp text-lg"></i> Balas
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}