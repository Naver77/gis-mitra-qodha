import React, { useState } from 'react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Konteks halaman untuk dikirim ke WA (Misal: "Tertarik Paket Distributor")
  sourceContext: string; 
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, sourceContext }) => {
  const [nama, setNama] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Jika modal tidak dibuka, jangan render apa-apa
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. NANTI DISINI: Kirim data (nama, phone, sourceContext) ke PHP API (backend/api/post_lead.php)
    console.log("Mengirim data ke backend...", { nama, phone, sourceContext });

    // 2. Simulasi loading singkat agar user merasa datanya diproses
    setTimeout(() => {
      setIsLoading(false);
      
      // 3. Format pesan WA otomatis berdasarkan halaman asal
      const adminWA = "6281717302223"; // Nomor WA Admin Qodha
      const textWA = `Halo Admin Qodha, perkenalkan saya *${nama}*.\nSaya ingin bertanya mengenai: *${sourceContext}*.\nMohon info lebih lanjut, terima kasih.`;
      const encodedText = encodeURIComponent(textWA);
      
      // 4. Tutup modal & Buka tab WA
      onClose();
      window.open(`https://wa.me/${adminWA}?text=${encodedText}`, '_blank');
      
      // Reset form
      setNama('');
      setPhone('');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop Hitam Blur */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Kotak Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        {/* Header Modal */}
        <div className="bg-brand-green p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition"
            title="Tutup"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          {/* Ikon WA */}
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <svg className="w-8 h-8 text-brand-green" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">Hubungi Admin Qodha</h3>
          <p className="text-green-100 text-xs">Tinggalkan kontak Anda agar kami bisa melayani dengan lebih baik.</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Nama Lengkap / Panggilan</label>
              <input 
                type="text" 
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-green-100 outline-none transition bg-gray-50"
                placeholder="Cth: Budi Santoso"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Nomor WhatsApp</label>
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-green-100 outline-none transition bg-gray-50"
                placeholder="Cth: 081234567890"
              />
            </div>
          </div>

          <div className="mt-8">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition transform flex justify-center items-center gap-2 
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-green hover:bg-green-700 hover:-translate-y-0.5 shadow-green-600/30'}`}
            >
              {isLoading ? (
                <span className="animate-pulse">Memproses Data...</span>
              ) : (
                <>
                  Lanjutkan ke WhatsApp 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </>
              )}
            </button>
          </div>
          
          <p className="text-center text-[10px] text-gray-400 mt-4 flex items-center justify-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Data Anda dijamin aman & rahasia.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LeadModal;