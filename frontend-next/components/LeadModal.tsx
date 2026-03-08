"use client";
import React, { useState, useEffect } from 'react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  sourceContext?: string; 
}

const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, sourceContext = "Pertanyaan Umum" }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const waNumber = "6281717302223"; 
    const text = `Halo Admin Qodha!%0A%0ASaya *${formData.name}*.%0A%0ASaya tertarik dengan info: *${sourceContext}*.%0A%0APesan / Pertanyaan:%0A${formData.message}%0A%0AMohon info lebih lanjut. Terima kasih!`;
    
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden animate-fade-in-up">
        
        {/* Header Modal */}
        <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl"></div>
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">Hubungi Kami</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Kami akan merespon via WhatsApp</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-400 hover:text-red-500 hover:bg-red-50 transition shadow-sm z-10"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="bg-yellow-50 text-yellow-800 text-xs font-bold px-3 py-2 rounded-lg mb-4 flex items-center gap-2 border border-yellow-200/50">
            <i className="fa-solid fa-circle-info text-brand-gold"></i>
            Konteks: {sourceContext}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Nama Lengkap</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition text-sm font-medium"
              placeholder="Contoh: Budi Santoso"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Nomor WhatsApp</label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition text-sm font-medium"
              placeholder="Contoh: 08123456789"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Pesan / Pertanyaan</label>
            <textarea 
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold outline-none transition text-sm resize-none font-medium"
              placeholder="Tulis pesan atau pertanyaan Anda di sini..."
            ></textarea>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2 group"
            >
              Kirim via WhatsApp 
              <i className="fa-brands fa-whatsapp text-green-400 text-lg group-hover:scale-110 transition-transform"></i>
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-3 font-medium">
              Data Anda aman dan hanya digunakan untuk keperluan komunikasi terkait Qodha.
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default LeadModal;