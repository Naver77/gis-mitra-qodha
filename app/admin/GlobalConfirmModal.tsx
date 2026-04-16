"use client";
import React, { useState, useEffect } from 'react';

// FIX 1: Mendefinisikan tipe data yang jelas untuk membuang error 'any'
interface ConfirmConfig {
  title: string;
  message: string;
  type: 'warning' | 'danger' | 'info';
  confirmText: string;
  cancelText: string;
  resolve: (value: boolean | PromiseLike<boolean>) => void;
}

// Fungsi sakti yang bisa dipanggil dari file manapun!
export const customConfirm = (
  title: string, 
  message: string, 
  type: 'warning' | 'danger' | 'info' = 'warning',
  confirmText = 'Ya, Lanjutkan',
  cancelText = 'Batal'
): Promise<boolean> => {
  return new Promise((resolve) => {
    // Memancarkan sinyal ke komponen Modal yang ada di Layout
    const event = new CustomEvent('show-custom-confirm', {
      detail: { title, message, type, confirmText, cancelText, resolve }
    });
    window.dispatchEvent(event);
  });
};

export default function GlobalConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);
  // Menggunakan ConfirmConfig yang telah kita buat
  const [config, setConfig] = useState<ConfirmConfig | null>(null);

  useEffect(() => {
    const handleShowConfirm = (e: Event) => {
      const customEvent = e as CustomEvent;
      setConfig(customEvent.detail);
      setIsOpen(true);
    };

    window.addEventListener('show-custom-confirm', handleShowConfirm);
    return () => window.removeEventListener('show-custom-confirm', handleShowConfirm);
  }, []);

  if (!isOpen || !config) return null;

  const handleAction = (result: boolean) => {
    setIsOpen(false);
    config.resolve(result); // Mengirim jawaban (true/false) kembali ke fungsi pemanggil
  };

  // Tema warna icon & tombol berdasarkan tipe bahaya
  const theme = {
    warning: { icon: 'fa-triangle-exclamation text-yellow-500', bg: 'bg-yellow-50', btn: 'bg-brand-gold text-gray-900 hover:bg-yellow-500' },
    danger: { icon: 'fa-circle-xmark text-red-500', bg: 'bg-red-50', btn: 'bg-red-600 text-white hover:bg-red-700' },
    info: { icon: 'fa-circle-info text-blue-500', bg: 'bg-blue-50', btn: 'bg-gray-900 text-white hover:bg-gray-800' }
  }[config.type];

  return (
    // FIX 2: z-[9999] menjadi z-9999
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-4 animate-fade-in-up">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-zoom-in">
        
        <div className="p-6 md:p-8 text-center">
          <div className={`w-20 h-20 mx-auto rounded-full ${theme.bg} flex items-center justify-center mb-6 shadow-inner`}>
            <i className={`fa-solid ${theme.icon} text-4xl`}></i>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">{config.title}</h2>
          <p className="text-gray-500 font-medium text-sm leading-relaxed">
            {config.message}
          </p>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => handleAction(false)}
            className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          >
            {config.cancelText}
          </button>
          <button 
            onClick={() => handleAction(true)}
            className={`flex-1 px-6 py-3.5 rounded-xl font-black shadow-lg transition-all ${theme.btn}`}
          >
            {config.confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}