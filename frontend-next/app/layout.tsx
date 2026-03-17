"use client";
import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadModal from "@/components/LeadModal";

// Konfigurasi Font Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('');

  const triggerLeadModal = (context: string) => {
    setModalContext(context);
    setIsModalOpen(true);
  };

  return (
    <html lang="id">
      <head>
        <title>Qodha Aromatic - Wewangian Sunnah Premium</title>
        <meta name="description" content="Pusat Kemitraan dan Produk Wewangian Qodha Aromatic" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      
      <body className={`${plusJakartaSans.className} flex flex-col min-h-screen bg-gray-50 text-gray-800 antialiased selection:bg-brand-orange selection:text-white`}>
        
        <Header />
        
        {/* PERBAIKAN EXPERT: 'pt-21.25' DIHAPUS. 
            Sekarang setiap halaman bebas mengatur batas atasnya sendiri (Edge-to-Edge) */}
        <main className="grow w-full relative flex flex-col">
          {children}
        </main>

        <Footer onFloatingWaClick={() => triggerLeadModal("Pertanyaan Umum (Dari Tombol Melayang Bawah)")} />

        <LeadModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          sourceContext={modalContext} 
        />
      </body>
    </html>
  );
}